import { useState, useEffect } from "react";
import { StatCard } from "@/components/StatCard";
import { CategorySummary } from "@/components/CategorySummary";
import { categories } from "@/utils/categories";
import { TrendingDown, Wallet, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SpendingOverview, spendingService } from "@/services/spendingService";

// Tipos para os dados
interface CategorySpending {
  categoryKey: keyof typeof categories;
  amount: number;
  percentage: number;
}

interface SpendingStats {
  dailySpent: number;
  dailyChange: number;
  dailyAverage: number;
  averageChange: number;
  highestSpending: {
    amount: number;
    category: string;
  };
}

const Spending = () => {
  const [data, setData] = useState<SpendingOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSpendingData = async () => {
    try {
      setLoading(true);
      const response = await spendingService.getBudgetSummary();
      setData(response);
      setError(null);
    } catch (err) {
      setError("Erro ao carregar dados de gastos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpendingData();

    // Atualizar dados a cada 30 segundos
    const interval = setInterval(() => {
      fetchSpendingData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
        <Card className="p-6 border-destructive/50">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle size={24} />
            <p className="font-medium">{error || "Erro ao carregar dados"}</p>
          </div>
        </Card>
      </div>
    );
  }

  const { budget, daily_stats, categories: categoryData } = data;

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
                  R$ {budget.total_spent.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Orçamento</p>
                <p className="text-2xl font-bold">R$ {budget.budget_limit.toFixed(2)}</p>
              </div>
            </div>

            <Progress value={budget.percentage_used} className="h-3" />

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {budget.percentage_used.toFixed(1)}% utilizado
              </span>
              <span className={budget.is_over_budget ? "text-destructive font-medium" : "text-success font-medium"}>
                R$ {budget.remaining.toFixed(2)} restante
              </span>
            </div>
          </div>

          {budget.percentage_used > 90 && (
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
          value={`R$ ${daily_stats.spent_today.toFixed(2)}`}
          change={`${daily_stats.today_change > 0 ? '+' : ''}${daily_stats.today_change}%`}
          positive={false}
          icon={TrendingDown}
        />
        <StatCard
          title="Média Diária"
          value={`R$ ${daily_stats.daily_average.toFixed(2)}`}
          change={`${daily_stats.average_change > 0 ? '+' : ''}${daily_stats.average_change}%`}
          positive={daily_stats.average_change < 0}
          icon={Wallet}
        />
        <StatCard
          title="Maior Gasto"
          value={`R$ ${daily_stats.highest_amount.toFixed(2)}`}
          change={categories[daily_stats.highest_category as keyof typeof categories]?.label || daily_stats.highest_category}
          positive={false}
          icon={categories[daily_stats.highest_category as keyof typeof categories]?.icon || TrendingDown}
        />
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-6">Gastos por Categoria</h2>
        <div className="space-y-3">
          {categoryData.map((item) => {
            const category = categories[item.type as keyof typeof categories];
            return (
              <CategorySummary
                key={item.type}
                icon={category?.icon || TrendingDown}
                label={item.label}
                amount={`R$ ${item.amount.toFixed(2)}`}
                percentage={item.percentage}
                color={category?.color || item.color}
              />
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Spending;
