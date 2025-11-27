import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Landmark, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const Loans = () => {
  const [loanAmount, setLoanAmount] = useState(5000);
  const [installments, setInstallments] = useState(12);
  
  const interestRate = 1.99; 
  const monthlyPayment = (loanAmount * (1 + (interestRate / 100) * installments)) / installments;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold">Empréstimos</h1>
        <p className="text-muted-foreground">Crédito rápido e com as melhores taxas</p>
      </div>

      <Card className="p-6 bg-gradient-primary text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm">Crédito Pré-Aprovado</p>
            <p className="text-4xl font-bold mt-1">R$ 15.000,00</p>
            <p className="text-white/80 text-sm mt-2">Taxa a partir de 1,99% ao mês</p>
          </div>
          <div className="p-4 rounded-full bg-white/20">
            <Landmark size={32} />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-6">Simular Empréstimo</h2>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Valor Desejado</Label>
              <span className="text-2xl font-bold text-primary">
                R$ {loanAmount.toLocaleString('pt-BR')}
              </span>
            </div>
            <Slider
              value={[loanAmount]}
              onValueChange={(value) => setLoanAmount(value[0])}
              min={1000}
              max={15000}
              step={500}
              className="mt-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>R$ 1.000</span>
              <span>R$ 15.000</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Número de Parcelas</Label>
              <span className="text-xl font-bold">{installments}x</span>
            </div>
            <Slider
              value={[installments]}
              onValueChange={(value) => setInstallments(value[0])}
              min={3}
              max={24}
              step={1}
              className="mt-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>3 meses</span>
              <span>24 meses</span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-muted space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Valor da parcela</span>
              <span className="text-2xl font-bold text-primary">
                R$ {monthlyPayment.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total a pagar</span>
              <span className="font-medium">
                R$ {(monthlyPayment * installments).toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Taxa de juros</span>
              <span className="font-medium">{interestRate}% ao mês</span>
            </div>
          </div>

          <Button className="w-full bg-gradient-primary">
            Solicitar Empréstimo
          </Button>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-success/10">
              <CheckCircle2 size={24} className="text-success" />
            </div>
            <h3 className="font-bold">Vantagens</h3>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-success mt-0.5" />
              <span>Aprovação em até 24 horas</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-success mt-0.5" />
              <span>Dinheiro direto na conta</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-success mt-0.5" />
              <span>Sem consulta ao SPC/Serasa</span>
            </li>
          </ul>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <AlertCircle size={24} className="text-amber-600" />
            </div>
            <h3 className="font-bold">Importante</h3>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Empréstimo sujeito à análise de crédito</li>
            <li>• Taxas e valores podem variar</li>
            <li>• Pague suas parcelas em dia</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Loans;
