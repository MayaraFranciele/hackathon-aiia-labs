import { StatCard } from "@/components/StatCard";
import { QuickAction } from "@/components/QuickAction";
import { CategorizedTransaction } from "@/components/CategorizedTransaction";
import { CategorySummary } from "@/components/CategorySummary";
import { categories } from "@/utils/categories";
import { Wallet, TrendingUp, TrendingDown, Send, Download, CreditCard, Smartphone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Bem-vindo ao seu hub financeiro!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <StatCard
          title="Saldo Total"
          value="R$ 12.450,00"
          change="+12.5%"
          positive={true}
          icon={Wallet}
          gradient={true}
        />
        <StatCard
          title="Receitas"
          value="R$ 8.230,00"
          change="+8.2%"
          positive={true}
          icon={TrendingUp}
        />
        <StatCard
          title="Despesas"
          value="R$ 3.180,00"
          change="-3.1%"
          positive={false}
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
            <CategorizedTransaction
              icon={TrendingUp}
              title="Salário - Empresa XYZ"
              date="Hoje, 14:30"
              amount="R$ 5.000,00"
              positive={true}
              category={categories.utilities}
            />
            <CategorizedTransaction
              icon={CreditCard}
              title="Netflix - Assinatura Mensal"
              date="Ontem, 18:45"
              amount="R$ 55,90"
              positive={false}
              category={categories.entertainment}
            />
            <CategorizedTransaction
              icon={categories.food.icon}
              title="Restaurante - Jantar"
              date="Ontem, 20:30"
              amount="R$ 127,50"
              positive={false}
              category={categories.food}
            />
            <CategorizedTransaction
              icon={categories.transport.icon}
              title="Uber - Corrida"
              date="15/11/2025, 08:15"
              amount="R$ 32,00"
              positive={false}
              category={categories.transport}
            />
            <CategorizedTransaction
              icon={categories.shopping.icon}
              title="Amazon - Compras Online"
              date="15/11/2025, 14:22"
              amount="R$ 245,90"
              positive={false}
              category={categories.shopping}
            />
            <CategorizedTransaction
              icon={categories.health.icon}
              title="Farmácia - Medicamentos"
              date="14/11/2025, 11:30"
              amount="R$ 89,90"
              positive={false}
              category={categories.health}
            />
            <CategorizedTransaction
              icon={TrendingUp}
              title="Rendimento - Investimentos"
              date="13/11/2025, 09:00"
              amount="R$ 320,00"
              positive={true}
              category={categories.utilities}
            />
          </TabsContent>

          <TabsContent value="categories" className="space-y-3">
            <CategorySummary
              icon={categories.food.icon}
              label={categories.food.label}
              amount="R$ 856,40"
              percentage={27}
              color={categories.food.color}
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
            <CategorySummary
              icon={categories.housing.icon}
              label={categories.housing.label}
              amount="R$ 980,00"
              percentage={31}
              color={categories.housing.color}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
