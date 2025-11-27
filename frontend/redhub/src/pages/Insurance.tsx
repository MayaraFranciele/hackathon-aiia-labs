import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Car, Home, Heart, Smartphone, CheckCircle2 } from "lucide-react";

const Insurance = () => {
  const insuranceTypes = [
    { 
      icon: Car, 
      title: "Seguro Auto", 
      description: "Proteção completa para seu veículo",
      price: "A partir de R$ 89/mês",
      color: "bg-blue-500/10 text-blue-600"
    },
    { 
      icon: Home, 
      title: "Seguro Residencial", 
      description: "Segurança para sua casa e família",
      price: "A partir de R$ 45/mês",
      color: "bg-purple-500/10 text-purple-600"
    },
    { 
      icon: Heart, 
      title: "Seguro Vida", 
      description: "Tranquilidade para você e seus entes queridos",
      price: "A partir de R$ 65/mês",
      color: "bg-pink-500/10 text-pink-600"
    },
    { 
      icon: Smartphone, 
      title: "Seguro Celular", 
      description: "Proteção contra roubo e danos",
      price: "A partir de R$ 19/mês",
      color: "bg-green-500/10 text-green-600"
    },
  ];

  const activeInsurance = {
    type: "Seguro Auto",
    vehicle: "Honda Civic 2022",
    coverage: "Completa",
    nextPayment: "25/12/2025",
    amount: "R$ 89,00"
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold">Seguros</h1>
        <p className="text-muted-foreground">Proteção e tranquilidade para o que você mais valoriza</p>
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Seguro Ativo</h2>
            <p className="text-sm text-muted-foreground mt-1">{activeInsurance.type}</p>
          </div>
          <div className="p-3 rounded-full bg-primary/10">
            <Shield size={24} className="text-primary" />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border/50">
            <span className="text-sm text-muted-foreground">Veículo</span>
            <span className="font-medium">{activeInsurance.vehicle}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border/50">
            <span className="text-sm text-muted-foreground">Cobertura</span>
            <span className="font-medium">{activeInsurance.coverage}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-muted-foreground">Próximo Pagamento</span>
            <div className="text-right">
              <p className="font-medium">{activeInsurance.nextPayment}</p>
              <p className="text-sm text-primary font-bold">{activeInsurance.amount}</p>
            </div>
          </div>
        </div>

        <Button className="w-full mt-4" variant="outline">
          Ver Detalhes da Apólice
        </Button>
      </Card>

      <div>
        <h2 className="text-xl font-bold mb-4">Outros Seguros Disponíveis</h2>
        <div className="grid gap-4">
          {insuranceTypes.map((insurance, index) => (
            <Card key={index} className="p-6 hover:border-primary transition-all cursor-pointer hover:scale-[1.01]">
              <div className="flex items-start gap-4">
                <div className={`p-4 rounded-lg ${insurance.color}`}>
                  <insurance.icon size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{insurance.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{insurance.description}</p>
                  <p className="text-primary font-bold">{insurance.price}</p>
                </div>
                <Button className="bg-gradient-primary">
                  Contratar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Por que contratar um seguro?</h2>
        <div className="space-y-3">
          {[
            "Proteção financeira em situações inesperadas",
            "Assistência 24 horas todos os dias",
            "Cobertura personalizada para suas necessidades",
            "Pagamento facilitado e parcelado",
          ].map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle2 size={20} className="text-success" />
              <span className="text-sm">{benefit}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Insurance;
