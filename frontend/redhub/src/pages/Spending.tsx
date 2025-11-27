import { useState, useEffect } from "react";
import { StatCard } from "@/components/StatCard";
import { CategorySummary } from "@/components/CategorySummary";
import { categories } from "@/utils/categories";
import { TrendingDown, TrendingUp, Wallet, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { spendingService } from "@/services/spendingService";

const Spending = () => {
	const [budgetData, setBudgetData] = useState<any>(null);
	const [dailyStats, setDailyStats] = useState<any>(null);
	const [categoryList, setCategoryList] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const overview = await spendingService.getBudgetSummary();
				setBudgetData(overview.budget);
				setDailyStats(overview.daily_stats);
				setCategoryList(overview.categories);
			} catch (error) {
				console.error('Erro ao carregar dados de gastos:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		}).format(value);
	};

	const formatChange = (value: number) => {
		const sign = value >= 0 ? '+' : '';
		return `${sign}${value.toFixed(1)}%`;
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<p className="text-muted-foreground">Carregando dados de gastos...</p>
			</div>
		);
	}

	const highestCategory = categories[dailyStats?.highest_category as keyof typeof categories] || categories.food;

	return (
		<div className="max-w-7xl mx-auto space-y-8">
			<div className="space-y-2">
				<h1 className="text-3xl lg:text-4xl font-bold">Controle de Gastos</h1>
				<p className="text-muted-foreground">Acompanhe seus gastos em tempo real</p>
			</div>

			<Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h2 className="text-2xl font-bold">Orçamento Mensal</h2>
						<div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10">
							<div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
							<span className="text-sm font-medium text-primary">Tempo Real</span>
						</div>
					</div>

					<div className="space-y-2">
						<div className="flex items-end justify-between">
							<div>
								<p className="text-sm text-muted-foreground">Gasto atual</p>
								<p className="text-4xl font-bold text-primary">
									{formatCurrency(budgetData?.total_spent || 0)}
								</p>
							</div>
							<div className="text-right">
								<p className="text-sm text-muted-foreground">Orçamento</p>
								<p className="text-2xl font-bold">
									{formatCurrency(budgetData?.budget_limit || 0)}
								</p>
							</div>
						</div>

						<Progress value={budgetData?.percentage_used || 0} className="h-3" />

						<div className="flex items-center justify-between text-sm">
							<span className="text-muted-foreground">
								{budgetData?.percentage_used?.toFixed(1) || 0}% utilizado
							</span>
							<span className={budgetData?.is_over_budget ? "text-destructive font-medium" : "text-success font-medium"}>
								{formatCurrency(budgetData?.remaining || 0)} restante
							</span>
						</div>
					</div>

					{budgetData?.is_over_budget && (
						<div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
							<AlertCircle size={20} className="text-destructive" />
							<p className="text-sm font-medium text-destructive">
								Atenção! Você está próximo do limite do seu orçamento.
							</p>
						</div>
					)}
				</div>
			</Card>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
				<StatCard
					title="Gasto Hoje"
					value={formatCurrency(dailyStats?.spent_today || 0)}
					change={formatChange(dailyStats?.today_change || 0)}
					positive={dailyStats?.today_change < 0}
					icon={TrendingDown}
				/>
				<StatCard
					title="Média Diária"
					value={formatCurrency(dailyStats?.daily_average || 0)}
					change={formatChange(dailyStats?.average_change || 0)}
					positive={dailyStats?.average_change < 0}
					icon={Wallet}
				/>
				<StatCard
					title="Maior Gasto"
					value={formatCurrency(dailyStats?.highest_amount || 0)}
					change={highestCategory.label}
					positive={false}
					icon={highestCategory.icon}
				/>
			</div>

			<Card className="p-6">
				<h2 className="text-xl font-bold mb-6">Gastos por Categoria</h2>
				<div className="space-y-3">
					{categoryList.map((categoryItem) => {
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
				</div>
			</Card>
		</div>
	);
};

export default Spending;
