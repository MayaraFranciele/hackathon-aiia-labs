import { useState, useEffect } from "react";
import { StatCard } from "@/components/StatCard";
import { CategorySummary } from "@/components/CategorySummary";
import { categories } from "@/utils/categories";
import { TrendingDown, Wallet, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Spending = () => {
  const [totalSpent, setTotalSpent] = useState(3150.20);
  const budget = 5000;
  const percentage = (totalSpent / budget) * 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSpent((prev) => prev + Math.random() * 10);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
                  R$ {totalSpent.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Orçamento</p>
                <p className="text-2xl font-bold">R$ {budget.toFixed(2)}</p>
              </div>
            </div>
            
            <Progress value={percentage} className="h-3" />
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {percentage.toFixed(1)}% utilizado
              </span>
              <span className={percentage > 90 ? "text-destructive font-medium" : "text-success font-medium"}>
                R$ {(budget - totalSpent).toFixed(2)} restante
              </span>
            </div>
          </div>

          {percentage > 90 && (
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
          value="R$ 127,50"
          change="+15%"
          positive={false}
          icon={TrendingDown}
        />
        <StatCard
          title="Média Diária"
          value="R$ 105,00"
          change="-8%"
          positive={true}
          icon={Wallet}
        />
        <StatCard
          title="Maior Gasto"
          value="R$ 856,40"
          change="Alimentação"
          positive={false}
          icon={categories.food.icon}
        />
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-6">Gastos por Categoria</h2>
        <div className="space-y-3">
          <CategorySummary
            icon={categories.food.icon}
            label={categories.food.label}
            amount="R$ 856,40"
            percentage={27}
            color={categories.food.color}
          />
          <CategorySummary
            icon={categories.housing.icon}
            label={categories.housing.label}
            amount="R$ 980,00"
            percentage={31}
            color={categories.housing.color}
          />
          <CategorySummary
            icon={categories.transport.icon}
            label={categories.transport.label}
            amount="R$ 512,00"
            percentage={16}
            color={categories.transport.color}
          />
          <CategorySummary
            icon={categories.shopping.icon}
            label={categories.shopping.label}
            amount="R$ 445,90"
            percentage={14}
            color={categories.shopping.color}
          />
          <CategorySummary
            icon={categories.entertainment.icon}
            label={categories.entertainment.label}
            amount="R$ 355,90"
            percentage={11}
            color={categories.entertainment.color}
          />
        </div>
      </Card>
    </div>
  );
};

export default Spending;
