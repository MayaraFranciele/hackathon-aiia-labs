import { useState } from "react";
import { CategorizedTransaction } from "@/components/CategorizedTransaction";
import { categories } from "@/utils/categories";
import { TrendingUp, CreditCard, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Statement = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("month");

  const allTransactions = [
    {
      icon: TrendingUp,
      title: "Salário - Empresa XYZ",
      date: "2025-11-27T14:30",
      amount: "R$ 5.000,00",
      positive: true,
      category: { ...categories.utilities, value: "utilities" },
    },
    {
      icon: CreditCard,
      title: "Netflix - Assinatura Mensal",
      date: "2025-11-26T18:45",
      amount: "R$ 55,90",
      positive: false,
      category: { ...categories.entertainment, value: "entertainment" },
    },
    {
      icon: categories.food.icon,
      title: "Restaurante - Jantar",
      date: "2025-11-26T20:30",
      amount: "R$ 127,50",
      positive: false,
      category: { ...categories.food, value: "food" },
    },
    {
      icon: categories.transport.icon,
      title: "Uber - Corrida",
      date: "2025-11-15T08:15",
      amount: "R$ 32,00",
      positive: false,
      category: { ...categories.transport, value: "transport" },
    },
    {
      icon: categories.shopping.icon,
      title: "Amazon - Compras Online",
      date: "2025-11-15T14:22",
      amount: "R$ 245,90",
      positive: false,
      category: { ...categories.shopping, value: "shopping" },
    },
    {
      icon: categories.health.icon,
      title: "Farmácia - Medicamentos",
      date: "2025-11-14T11:30",
      amount: "R$ 89,90",
      positive: false,
      category: { ...categories.health, value: "health" },
    },
    {
      icon: TrendingUp,
      title: "Rendimento - Investimentos",
      date: "2025-11-13T09:00",
      amount: "R$ 320,00",
      positive: true,
      category: { ...categories.utilities, value: "utilities" },
    },
  ];

  const filterByPeriod = (transactionDateStr: string) => {
    const transactionDate = new Date(transactionDateStr);
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

  const filteredTransactions = allTransactions.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || t.category.value === categoryFilter;
    const matchesPeriod = filterByPeriod(t.date);
    return matchesSearch && matchesCategory && matchesPeriod;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return (
      date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }) +
      ", " +
      date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    );
  };

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
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="income">Receitas</TabsTrigger>
            <TabsTrigger value="expenses">Despesas</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-2">
            {filteredTransactions.map((transaction, index) => (
              <CategorizedTransaction
                key={index}
                {...transaction}
                date={formatDate(transaction.date)}
              />
            ))}
          </TabsContent>

          <TabsContent value="income" className="space-y-2">
            {filteredTransactions
              .filter((t) => t.positive)
              .map((transaction, index) => (
                <CategorizedTransaction
                  key={index}
                  {...transaction}
                  date={formatDate(transaction.date)}
                />
              ))}
          </TabsContent>

          <TabsContent value="expenses" className="space-y-2">
            {filteredTransactions
              .filter((t) => !t.positive)
              .map((transaction, index) => (
                <CategorizedTransaction
                  key={index}
                  {...transaction}
                  date={formatDate(transaction.date)}
                />
              ))}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Statement;
