import { StatCard } from "@/components/StatCard";
import { QuickAction } from "@/components/QuickAction";
import { CategorizedTransaction } from "@/components/CategorizedTransaction";
import { CategorySummary } from "@/components/CategorySummary";
import { categories } from "@/utils/categories";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Send,
  Download,
  CreditCard,
  Smartphone,
  Sparkles
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dashboardService } from "@/services/dashboardServices";
import { useEffect, useState } from "react";

const Index = () => {
  const userName = "Mayara";

  const [stats, setStats] = useState({
    balance: {
      value: "R$ 0,00",
      change: "+0%",
      positive: true
    },
    income: {
      value: "R$ 0,00",
      change: "+0%",
      positive: true
    },
    expenses: {
      value: "R$ 0,00",
      change: "0%",
      positive: false
    }
  });

  const [transactions, setTransactions] = useState([]);
  const [categorySummary, setCategorySummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Buscar resumo do dashboard
        const summaryData = await dashboardService.getSummary();
        setStats({
          balance: {
            value: `R$ ${summaryData.total_balance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            change: `${summaryData.total_balance_change > 0 ? '+' : ''}${summaryData.total_balance_change}%`,
            positive: summaryData.total_balance_change >= 0
          },
          income: {
            value: `R$ ${summaryData.total_income.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            change: `${summaryData.total_income_change > 0 ? '+' : ''}${summaryData.total_income_change}%`,
            positive: summaryData.total_income_change >= 0
          },
          expenses: {
            value: `R$ ${summaryData.total_expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            change: `${summaryData.total_expenses_change > 0 ? '+' : ''}${summaryData.total_expenses_change}%`,
            positive: summaryData.total_expenses_change < 0
          }
        });

        // Buscar transações
        const transactionsData = await dashboardService.getTransactions();
        const mappedTransactions = transactionsData.transactions.map(t => ({
          icon: t.positive ? TrendingUp : categories[t.category_type]?.icon || CreditCard,
          title: t.title,
          date: t.date,
          amount: `R$ ${t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          positive: t.positive,
          category: categories[t.category_type] || categories.utilities
        }));
        setTransactions(mappedTransactions);

        // Buscar resumo por categoria
        const categoryData = await dashboardService.getCategorySummary();
        const mappedCategories = categoryData.categories.map(c => ({
          icon: categories[c.type]?.icon || CreditCard,
          label: c.label,
          amount: `R$ ${c.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          percentage: c.percentage,
          color: c.color
        }));
        setCategorySummary(mappedCategories);

      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Olá {userName}, seja bem-vindo(a) ao seu Hub Financeiro!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <StatCard
          title="Saldo Total"
          value={stats.balance.value}
          change={stats.balance.change}
          positive={stats.balance.positive}
          icon={Wallet}
          gradient={true}
        />
        <StatCard
          title="Receitas"
          value={stats.income.value}
          change={stats.income.change}
          positive={stats.income.positive}
          icon={TrendingUp}
        />
        <StatCard
          title="Despesas"
          value={stats.expenses.value}
          change={stats.expenses.change}
          positive={stats.expenses.positive}
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
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">Extrato Inteligente</h2>

              <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="w-3 h-3" />
                IA Ativa
              </span>
            </div>

            <p className="text-sm text-muted-foreground mt-1">
              Suas despesas categorizadas automaticamente por inteligência artificial
            </p>
          </div>

          <button className="text-sm text-primary hover:underline font-medium">
            Ver todas
          </button>
        </div>

        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="transactions" tabIndex={0}>Transações</TabsTrigger>
            <TabsTrigger value="categories" tabIndex={0}>Por Categoria</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-2">
            {transactions.map((transaction, index) => (
              <CategorizedTransaction
                key={index}
                icon={transaction.icon}
                title={transaction.title}
                date={transaction.date}
                amount={transaction.amount}
                positive={transaction.positive}
                category={transaction.category}
              />
            ))}
          </TabsContent>

          <TabsContent value="categories" className="space-y-3">
            {categorySummary.map((category, index) => (
              <CategorySummary
                key={index}
                icon={category.icon}
                label={category.label}
                amount={category.amount}
                percentage={category.percentage}
                color={category.color}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
