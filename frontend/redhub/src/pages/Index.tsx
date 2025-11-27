import { StatCard } from "@/components/StatCard";
import { QuickAction } from "@/components/QuickAction";
import { CategorizedTransaction } from "@/components/CategorizedTransaction";
import { CategorySummary } from "@/components/CategorySummary";
import { categories } from "@/utils/categories";
import { Wallet, TrendingUp, TrendingDown, Send, Download, CreditCard, Smartphone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { dashboardService } from "@/services/dashboardServices";

const Index = () => {
	const [summary, setSummary] = useState(null);
	const [transactions, setTransactions] = useState([]);
	const [categorySummary, setCategorySummary] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [summaryData, transactionsData, categoryData] = await Promise.all([
					dashboardService.getSummary(),
					dashboardService.getTransactions(),
					dashboardService.getCategorySummary()
				]);

				setSummary(summaryData);
				setTransactions(transactionsData.transactions);
				setCategorySummary(categoryData.categories);
			} catch (error) {
				console.error('Error fetching dashboard data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<p className="text-muted-foreground">Carregando dashboard...</p>
			</div>
		);
	}

	// Função para formatar valores monetários
	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		}).format(value);
	};

	// Função para formatar mudanças percentuais
	const formatChange = (value: number) => {
		const sign = value >= 0 ? '+' : '';
		return `${sign}${value.toFixed(1)}%`;
	};


	return (
		<div className="max-w-7xl mx-auto space-y-8">
			<div className="space-y-2">
				<h1 className="text-3xl lg:text-4xl font-bold">Dashboard</h1>
				<p className="text-muted-foreground">Bem-vindo ao seu hub financeiro!</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
				<StatCard
					title="Saldo Total"
					value={formatCurrency(summary?.total_balance || 0)}
					change={formatChange(summary?.total_balance_change || 0)}
					positive={summary?.total_balance_change >= 0}
					icon={Wallet}
					gradient={true}
				/>
				<StatCard
					title="Receitas"
					value={formatCurrency(summary?.total_income || 0)}
					change={formatChange(summary?.total_income_change || 0)}
					positive={summary?.total_income_change >= 0}
					icon={TrendingUp}
				/>
				<StatCard
					title="Despesas"
					value={formatCurrency(summary?.total_expenses || 0)}
					change={formatChange(summary?.total_expenses_change || 0)}
					positive={summary?.total_expenses_change >= 0}
					icon={TrendingDown}
				/>
			</div>

			<div className="bg-card rounded-xl border border-border p-6">
				<h2 className="text-xl font-bold mb-4">Ações Rápidas</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<QuickAction icon={Send} label="Transferir" />
					<QuickAction icon={Download} label="Receber" />
					<QuickAction icon={CreditCard} label="Pagar Conta" />
					<QuickAction icon={Smartphone} label="Pix" />
				</div>
			</div>

			<div className="bg-card rounded-xl border border-border p-6">
				<div className="flex items-center justify-between mb-6">
					<div>
						<h2 className="text-xl font-bold">Extrato Inteligente</h2>
						<p className="text-sm text-muted-foreground mt-1">
							Suas despesas categorizadas automaticamente
						</p>
					</div>
					<button className="text-sm text-primary hover:underline font-medium">
						Ver todas
					</button>
				</div>

				<Tabs defaultValue="transactions" className="w-full">
					<TabsList className="grid w-full grid-cols-2 mb-6">
						<TabsTrigger value="transactions">Transações</TabsTrigger>
						<TabsTrigger value="categories">Por Categoria</TabsTrigger>
					</TabsList>

					<TabsContent value="transactions" className="space-y-2">
						{transactions.map((transaction) => {
							const category = categories[transaction.category_type as keyof typeof categories];
							return (
								<CategorizedTransaction
									key={transaction.id}
									icon={transaction.positive ? TrendingUp : category?.icon || CreditCard}
									title={transaction.title}
									date={transaction.date}
									amount={formatCurrency(transaction.amount)}
									positive={transaction.positive}
									category={category}
								/>
							);
						})}
					</TabsContent>

					<TabsContent value="categories" className="space-y-3">
						{categorySummary.map((categoryItem) => {
							const category = categories[categoryItem.type as keyof typeof categories];
							return (
								<CategorySummary
									key={categoryItem.type}
									icon={category?.icon}
									label={categoryItem.label}
									amount={formatCurrency(categoryItem.amount)}
									percentage={categoryItem.percentage}
									color={categoryItem.color}
								/>
							);
						})}
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default Index;
