import { useState, useEffect } from "react";
import { CategorizedTransaction } from "@/components/CategorizedTransaction";
import { categories } from "@/utils/categories";
import { TrendingUp, CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";
import { statementService } from "@/services/statementService";

const Statement = () => {
	const [transactions, setTransactions] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const data = await statementService.getTransactions();
				setTransactions(data.transactions);
			} catch (error) {
				console.error('Erro ao carregar transações:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchTransactions();
	}, []);

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		}).format(value);
	};

	// Calcular estatísticas no frontend
	const totalIncome = transactions
		.filter(t => t.positive)
		.reduce((sum, t) => sum + t.amount, 0);

	const totalExpenses = transactions
		.filter(t => !t.positive)
		.reduce((sum, t) => sum + t.amount, 0);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<p className="text-muted-foreground">Carregando extrato...</p>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto space-y-8">
			<div className="space-y-2">
				<h1 className="text-3xl lg:text-4xl font-bold">Extrato Completo</h1>
				<p className="text-muted-foreground">Visualização detalhada de todas as transações</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card className="p-4">
					<p className="text-sm text-muted-foreground mb-1">Total de Transações</p>
					<p className="text-2xl font-bold">{transactions.length}</p>
				</Card>
				<Card className="p-4 border-green-500/20 bg-green-500/5">
					<p className="text-sm text-muted-foreground mb-1">Total Receitas</p>
					<p className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
				</Card>
				<Card className="p-4 border-red-500/20 bg-red-500/5">
					<p className="text-sm text-muted-foreground mb-1">Total Despesas</p>
					<p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
				</Card>
			</div>

			<Card className="p-6">
				<h2 className="text-xl font-bold mb-6">Todas as Transações</h2>
				<div className="space-y-2">
					{transactions.length === 0 ? (
						<div className="text-center py-8">
							<p className="text-muted-foreground">Nenhuma transação encontrada</p>
						</div>
					) : (
						transactions.map((transaction) => {
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
						})
					)}
				</div>
			</Card>
		</div>
	);
};

export default Statement;
