import { useEffect, useState } from "react";
import { CategorizedTransaction } from "@/components/CategorizedTransaction";
import { categories } from "@/utils/categories";
import { TrendingUp, CreditCard, Search, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { statementService, Transaction } from "@/services/statementService";

const Statement = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("month");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await statementService.getTransactions();
      setTransactions(response.transactions);
      setError(null);
    } catch (err) {
      setError("Erro ao carregar transações");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();

    // Atualizar dados a cada 30 segundos
    const interval = setInterval(() => {
      fetchTransactions();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const parseDate = (dateStr: string): Date => {
    // Formato: "Hoje, 14:30" ou "Ontem, 18:45" ou "15/11/2025, 08:15"
    const now = new Date();

    if (dateStr.startsWith("Hoje")) {
      const time = dateStr.split(", ")[1];
      const [hours, minutes] = time.split(":").map(Number);
      now.setHours(hours, minutes, 0, 0);
      return now;
    }

    if (dateStr.startsWith("Ontem")) {
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      const time = dateStr.split(", ")[1];
      const [hours, minutes] = time.split(":").map(Number);
      yesterday.setHours(hours, minutes, 0, 0);
      return yesterday;
    }

    // Formato: "15/11/2025, 08:15"
    const [datePart, timePart] = dateStr.split(", ");
    const [day, month, year] = datePart.split("/").map(Number);
    const [hours, minutes] = timePart.split(":").map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  };

  const filterByPeriod = (dateStr: string) => {
    const transactionDate = parseDate(dateStr);
    const now = new Date();

    switch (periodFilter) {
      case "week": {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return transactionDate >= weekAgo && transactionDate <= now;
      }
      case "month":
        return transactionDate.getMonth() === now.getMonth() && transactionDate.getFullYear() === now.getFullYear();
      case "3months": {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(now.getMonth() - 3);
        return transactionDate >= threeMonthsAgo && transactionDate <= now;
      }
      case "year":
        return transactionDate.getFullYear() === now.getFullYear();
      default:
        return true;
    }
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || t.category_type === categoryFilter;
    const matchesPeriod = filterByPeriod(t.date);
    return matchesSearch && matchesCategory && matchesPeriod;
  });

  const mapTransactionToComponent = (transaction: Transaction) => {
    const category = categories[transaction.category_type as keyof typeof categories];

    return {
      icon: category?.icon || TrendingUp,
      title: transaction.title,
      date: transaction.date,
      amount: `R$ ${transaction.amount.toFixed(2).replace('.', ',')}`,
      positive: transaction.positive,
      category: {
        ...category,
        value: transaction.category_type
      }
    };
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando transações...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
        <Card className="p-6 border-destructive/50">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle size={24} />
            <p className="font-medium">{error}</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold">Extrato Completo</h1>
        <p className="text-muted-foreground">Visualização detalhada de todas as transações</p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Buscar transação..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas categorias</SelectItem>
              <SelectItem value="food">Alimentação</SelectItem>
              <SelectItem value="transport">Transporte</SelectItem>
              <SelectItem value="shopping">Compras</SelectItem>
              <SelectItem value="entertainment">Entretenimento</SelectItem>
              <SelectItem value="health">Saúde</SelectItem>
              <SelectItem value="housing">Moradia</SelectItem>
              <SelectItem value="utilities">Utilidades</SelectItem>
            </SelectContent>
          </Select>

          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Última semana</SelectItem>
              <SelectItem value="month">Este mês</SelectItem>
              <SelectItem value="3months">Últimos 3 meses</SelectItem>
              <SelectItem value="year">Este ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="p-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">
              Todas ({filteredTransactions.length})
            </TabsTrigger>
            <TabsTrigger value="income">
              Receitas ({filteredTransactions.filter(t => t.positive).length})
            </TabsTrigger>
            <TabsTrigger value="expenses">
              Despesas ({filteredTransactions.filter(t => !t.positive).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-2">
            {filteredTransactions.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhuma transação encontrada
              </p>
            ) : (
              filteredTransactions.map((transaction) => (
                <CategorizedTransaction
                  key={transaction.id}
                  {...mapTransactionToComponent(transaction)}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="income" className="space-y-2">
            {filteredTransactions.filter((t) => t.positive).length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhuma receita encontrada
              </p>
            ) : (
              filteredTransactions
                .filter((t) => t.positive)
                .map((transaction) => (
                  <CategorizedTransaction
                    key={transaction.id}
                    {...mapTransactionToComponent(transaction)}
                  />
                ))
            )}
          </TabsContent>

          <TabsContent value="expenses" className="space-y-2">
            {filteredTransactions.filter((t) => !t.positive).length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhuma despesa encontrada
              </p>
            ) : (
              filteredTransactions
                .filter((t) => !t.positive)
                .map((transaction) => (
                  <CategorizedTransaction
                    key={transaction.id}
                    {...mapTransactionToComponent(transaction)}
                  />
                ))
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Statement;
