import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scan, FileText, Calendar, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import {
  PaidBill,
  paymentsService,
  PaymentsSummary,
  UpcomingBill,
} from "@/services/paymentsServices";

const Payments = () => {
  const [upcomingBills, setUpcomingBills] = useState<UpcomingBill[]>([]);
  const [paidBills, setPaidBills] = useState<PaidBill[]>([]);
  const [summary, setSummary] = useState<PaymentsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPaymentsData = async () => {
    try {
      setLoading(true);
      const [upcomingResponse, paidResponse, summaryResponse] =
        await Promise.all([
          paymentsService.getUpcomingBills(),
          paymentsService.getPaidBills(),
          paymentsService.getSummary(),
        ]);

      setUpcomingBills(upcomingResponse.bills);
      setPaidBills(paidResponse.bills);
      setSummary(summaryResponse);
      setError(null);
    } catch (err) {
      setError("Erro ao carregar pagamentos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentsData();

    // Atualizar dados a cada 30 segundos
    const interval = setInterval(() => {
      fetchPaymentsData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando pagamentos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[400px]">
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
            {upcomingBills.map((bill) => (
              <div
                key={bill.id}
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
                        Vencimento: {bill.due_date}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <p className="font-bold text-sm">{formatCurrency(bill.amount)}</p>
                  <Button size="sm" className="bg-gradient-primary">
                    Pagar
                  </Button>
                </div>
              </div>
            ))}

            {upcomingBills.length > 0 && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mt-4">
                <AlertCircle size={20} className="text-amber-600" />
                <p className="text-sm font-medium text-amber-600">
                  Você tem {upcomingBills.length} contas a vencer este mês
                </p>
              </div>
            )}

            {upcomingBills.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>Nenhuma conta a vencer no momento</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="paid" className="space-y-3">
            {paidBills.map((bill) => (
              <div
                key={bill.id}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-success/10">
                    <FileText size={20} className="text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{bill.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Pago em: {bill.paid_date}
                    </p>
                  </div>
                </div>
                <p className="font-bold text-sm text-success">{formatCurrency(bill.amount)}</p>
              </div>
            ))}

            {paidBills.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>Nenhuma conta paga ainda</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Payments;
