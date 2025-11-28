import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scan, FileText, Calendar, AlertCircle } from "lucide-react";

const ENERGY_AMOUNT = "R$ 195,00";
const INTERNET_AMOUNT = "R$ 99,90";
const WATER_AMOUNT = "R$ 67,50";
const NETFLIX_AMOUNT = "R$ 55,90";
const SPOTIFY_AMOUNT = "R$ 21,90";

const upcomingBillsMock = [
  {
    name: "Energia Elétrica",
    dueDate: "25/11/2025",
    amount: ENERGY_AMOUNT,
    status: "pending",
  },
  {
    name: "Internet",
    dueDate: "28/11/2025",
    amount: INTERNET_AMOUNT,
    status: "pending",
  },
  {
    name: "Água",
    dueDate: "30/11/2025",
    amount: WATER_AMOUNT,
    status: "pending",
  },
];

const paidBillsMock = [
  {
    name: "Netflix",
    paidDate: "20/11/2025",
    amount: NETFLIX_AMOUNT,
  },
  {
    name: "Spotify",
    paidDate: "18/11/2025",
    amount: SPOTIFY_AMOUNT,
  },
];


const Payments = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold">Pagamentos</h1>
        <p className="text-muted-foreground">Gerencie boletos e contas</p>
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <h2 className="text-xl font-bold mb-4">Pagamento Rápido</h2>
        <div className="space-y-4">
          <Input placeholder="Digite o código de barras" />
          <Button className="w-full bg-gradient-primary">
            <Scan size={20} className="mr-2" />
            Escanear Código de Barras
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upcoming">A Vencer</TabsTrigger>
            <TabsTrigger value="paid">Pagos</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-3">
            {upcomingBillsMock.map((bill, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-muted">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{bill.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar size={14} className="text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">
                        Vencimento: {bill.dueDate}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <p className="font-bold text-sm">{bill.amount}</p>
                  <Button size="sm" className="bg-gradient-primary">
                    Pagar
                  </Button>
                </div>
              </div>
            ))}

            {upcomingBillsMock.length > 0 && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mt-4">
                <AlertCircle size={20} className="text-amber-600" />
                <p className="text-sm font-medium text-amber-600">
                  Você tem {upcomingBillsMock.length} contas a vencer este mês
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="paid" className="space-y-3">
            {paidBillsMock.map((bill, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-success/10">
                    <FileText size={20} className="text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{bill.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Pago em: {bill.paidDate}
                    </p>
                  </div>
                </div>
                <p className="font-bold text-sm text-success">
                  {bill.amount}
                </p>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Payments;
