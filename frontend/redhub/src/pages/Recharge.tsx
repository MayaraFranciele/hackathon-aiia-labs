import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Smartphone, Wifi, Tv, Zap } from "lucide-react";

const Recharge = () => {
  const quickValues = ["R$ 10", "R$ 20", "R$ 30", "R$ 50"];
  
  const services = [
    { icon: Smartphone, label: "Celular", color: "bg-blue-500/10 text-blue-600" },
    { icon: Wifi, label: "Internet", color: "bg-purple-500/10 text-purple-600" },
    { icon: Tv, label: "TV", color: "bg-green-500/10 text-green-600" },
    { icon: Zap, label: "Transporte", color: "bg-yellow-500/10 text-yellow-600" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold">Recargas</h1>
        <p className="text-muted-foreground">Recarregue celular, bilhete único e muito mais</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {services.map((service, index) => (
          <Card
            key={index}
            className="p-6 flex flex-col items-center gap-3 hover:border-primary transition-all cursor-pointer hover:scale-105"
          >
            <div className={`p-4 rounded-full ${service.color}`}>
              <service.icon size={24} />
            </div>
            <span className="font-medium text-sm text-center">{service.label}</span>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-6">Recarga de Celular</h2>
        <div className="space-y-6">
          <div>
            <Label htmlFor="phone">Número do Celular</Label>
            <Input
              id="phone"
              placeholder="(11) 99999-9999"
              className="mt-2"
            />
          </div>

          <div>
            <Label>Operadora</Label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {["Vivo", "Claro", "TIM"].map((operator) => (
                <Button key={operator} variant="outline" className="w-full">
                  {operator}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label>Valores Rápidos</Label>
            <div className="grid grid-cols-4 gap-3 mt-2">
              {quickValues.map((value) => (
                <Button key={value} variant="outline" className="w-full">
                  {value}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="customAmount">Ou digite o valor</Label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
              <Input id="customAmount" type="number" placeholder="0,00" className="pl-10" />
            </div>
          </div>

          <Button className="w-full bg-gradient-primary">
            Realizar Recarga
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Recargas Recentes</h2>
        <div className="space-y-3">
          {[
            { operator: "Vivo", phone: "(11) 99999-9999", date: "Há 3 dias", amount: "R$ 20,00" },
            { operator: "Claro", phone: "(11) 98888-8888", date: "Há 1 semana", amount: "R$ 30,00" },
          ].map((recharge, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Smartphone size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{recharge.operator} - {recharge.phone}</p>
                  <p className="text-xs text-muted-foreground">{recharge.date}</p>
                </div>
              </div>
              <span className="font-bold text-sm">{recharge.amount}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Recharge;
