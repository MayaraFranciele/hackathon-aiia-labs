import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Send, Download, Copy, Clock } from "lucide-react";
import { toast } from "sonner";

const pixKeys = [
  {
    type: "CPF",
    value: "***.***.***-**",
  },
  {
    type: "E-mail",
    value: "usuario@email.com",
  },
];

const recentPix = [
  {
    name: "João Silva",
    time: "Há 2 horas",
    amount: 160.0,
  },
  {
    name: "Maria Santos",
    time: "Ontem",
    amount: 80.0,
  },
  {
    name: "Pedro Costa",
    time: "2 dias atrás",
    amount: 200.0,
  },
];

const pixQrCodeValue = "PIX_QR_CODE_MOCK";

const Pix = () => {
  const handleCopyKey = () => {
    toast.success("Chave PIX copiada!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold">PIX</h1>
        <p className="text-muted-foreground">Transferências instantâneas 24/7</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-6 flex flex-col items-center gap-3 hover:border-primary transition-colors cursor-pointer">
          <div className="p-4 rounded-full bg-primary/10">
            <Send size={24} className="text-primary" />
          </div>
          <span className="font-medium text-sm text-center">Enviar PIX</span>
        </Card>

        <Card className="p-6 flex flex-col items-center gap-3 hover:border-primary transition-colors cursor-pointer">
          <div className="p-4 rounded-full bg-primary/10">
            <Download size={24} className="text-primary" />
          </div>
          <span className="font-medium text-sm text-center">Receber PIX</span>
        </Card>

        <Card className="p-6 flex flex-col items-center gap-3 hover:border-primary transition-colors cursor-pointer">
          <div className="p-4 rounded-full bg-primary/10">
            <QrCode size={24} className="text-primary" />
          </div>
          <span className="font-medium text-sm text-center">QR Code</span>
        </Card>

        <Card className="p-6 flex flex-col items-center gap-3 hover:border-primary transition-colors cursor-pointer">
          <div className="p-4 rounded-full bg-primary/10">
            <Copy size={24} className="text-primary" />
          </div>
          <span className="font-medium text-sm text-center">Pix Copia e Cola</span>
        </Card>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="send" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="send">Enviar</TabsTrigger>
            <TabsTrigger value="receive">Receber</TabsTrigger>
          </TabsList>

          <TabsContent value="send" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="pixKey">Chave PIX ou dados do destinatário</Label>
                <Input
                  id="pixKey"
                  placeholder="CPF, CNPJ, E-mail, Telefone ou Chave Aleatória"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="amount">Valor</Label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    R$
                  </span>
                  <Input id="amount" type="number" placeholder="0,00" className="pl-10" />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrição (opcional)</Label>
                <Input id="description" placeholder="Ex: Almoço" className="mt-2" />
              </div>

              <Button className="w-full bg-gradient-primary">
                <Send size={20} className="mr-2" />
                Enviar PIX
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="receive" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-center p-8 bg-muted rounded-lg">
                <QrCode size={200} className="text-primary" />
              </div>

              <div>
                <Label>Suas Chaves PIX</Label>
                <div className="space-y-2 mt-2">
                  {pixKeys.map((key, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div>
                        <p className="font-medium text-sm">{key.type}</p>
                        <p className="text-xs text-muted-foreground">{key.value}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={handleCopyKey}>
                        <Copy size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">PIX Recentes</h2>
          <Clock size={20} className="text-muted-foreground" />
        </div>

        <div className="space-y-3">
          {recentPix.map((pix, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div>
                <p className="font-medium text-sm">{pix.name}</p>
                <p className="text-xs text-muted-foreground">{pix.time}</p>
              </div>
              <span className="font-bold text-sm">
                - R$ {pix.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Pix;
