import { CategorizedTransaction } from "@/components/CategorizedTransaction";
import { categories } from "@/utils/categories";
import { TrendingUp, CreditCard, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Statement = () => {
  const allTransactions = [
    {
      icon: TrendingUp,
      title: "Salário - Empresa XYZ",
      date: "Hoje, 14:30",
      amount: "R$ 5.000,00",
      positive: true,
      category: categories.utilities,
    },
    {
      icon: CreditCard,
      title: "Netflix - Assinatura Mensal",
      date: "Ontem, 18:45",
      amount: "R$ 55,90",
      positive: false,
      category: categories.entertainment,
    },
    {
      icon: categories.food.icon,
      title: "Restaurante - Jantar",
      date: "Ontem, 20:30",
      amount: "R$ 127,50",
      positive: false,
      category: categories.food,
    },
    {
      icon: categories.transport.icon,
      title: "Uber - Corrida",
      date: "15/11/2025, 08:15",
      amount: "R$ 32,00",
      positive: false,
      category: categories.transport,
    },
    {
      icon: categories.shopping.icon,
      title: "Amazon - Compras Online",
      date: "15/11/2025, 14:22",
      amount: "R$ 245,90",
      positive: false,
      category: categories.shopping,
    },
    {
      icon: categories.health.icon,
      title: "Farmácia - Medicamentos",
      date: "14/11/2025, 11:30",
      amount: "R$ 89,90",
      positive: false,
      category: categories.health,
    },
    {
      icon: TrendingUp,
      title: "Rendimento - Investimentos",
      date: "13/11/2025, 09:00",
      amount: "R$ 320,00",
      positive: true,
      category: categories.utilities,
    },
  ];

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
            <Input placeholder="Buscar transação..." className="pl-10" />
          </div>
          <Select defaultValue="all">
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
          <Select defaultValue="month">
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
            {allTransactions.map((transaction, index) => (
              <CategorizedTransaction key={index} {...transaction} />
            ))}
          </TabsContent>

          <TabsContent value="income" className="space-y-2">
            {allTransactions
              .filter((t) => t.positive)
              .map((transaction, index) => (
                <CategorizedTransaction key={index} {...transaction} />
              ))}
          </TabsContent>

          <TabsContent value="expenses" className="space-y-2">
            {allTransactions
              .filter((t) => !t.positive)
              .map((transaction, index) => (
                <CategorizedTransaction key={index} {...transaction} />
              ))}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Statement;
