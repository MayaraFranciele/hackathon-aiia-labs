import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Send, Download, Copy, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { pixService, PixKey, RecentPixTransaction } from "@/services/pixServices";

const Pix = () => {
  const [pixKeys, setPixKeys] = useState<PixKey[]>([]);
  const [recentPix, setRecentPix] = useState<RecentPixTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qrCodeValue, setQrCodeValue] = useState("");

  // Form states
  const [pixKey, setPixKey] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [sending, setSending] = useState(false);

  const fetchPixData = async () => {
    try {
      setLoading(true);
      const [keysResponse, recentResponse] = await Promise.all([
        pixService.getPixKeys(),
        pixService.getRecentTransactions()
      ]);

      setPixKeys(keysResponse.keys);
      setRecentPix(recentResponse.transactions);
      setError(null);
    } catch (err) {
      setError("Erro ao carregar dados do PIX");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateQRCode = async () => {
    try {
      const response = await pixService.generateQRCode();
      setQrCodeValue(response.qr_code_value);
      toast.success("QR Code gerado com sucesso!");
    } catch (err) {
      toast.error("Erro ao gerar QR Code");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPixData();
    generateQRCode();

    // Atualizar dados a cada 30 segundos
    const interval = setInterval(() => {
      fetchPixData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("Chave PIX copiada!");
  };

  const handleCopyQRCode = () => {
    navigator.clipboard.writeText(qrCodeValue);
    toast.success("Código PIX copiado!");
  };

  const handleSendPix = async () => {
    if (!pixKey || !amount) {
      toast.error("Preencha a chave PIX e o valor");
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      toast.error("Valor inválido");
      return;
    }

    try {
      setSending(true);
      const response = await pixService.sendPix({
        pix_key: pixKey,
        amount: amountValue,
        description: description || undefined
      });

      if (response.success) {
        toast.success(response.message);
        setPixKey("");
        setAmount("");
        setDescription("");
        fetchPixData(); // Atualizar transações recentes
      }
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Erro ao enviar PIX");
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dados do PIX...</p>
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

        <Card className="p-6 flex flex-col items-center gap-3 hover:border-primary transition-colors cursor-pointer" onClick={generateQRCode}>
          <div className="p-4 rounded-full bg-primary/10">
            <Download size={24} className="text-primary" />
          </div>
          <span className="font-medium text-sm text-center">Receber PIX</span>
        </Card>

        <Card className="p-6 flex flex-col items-center gap-3 hover:border-primary transition-colors cursor-pointer" onClick={generateQRCode}>
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
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="amount">Valor</Label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    R$
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0,00"
                    className="pl-10"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrição (opcional)</Label>
                <Input
                  id="description"
                  placeholder="Ex: Almoço"
                  className="mt-2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <Button
                className="w-full bg-gradient-primary"
                onClick={handleSendPix}
                disabled={sending}
              >
                {sending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={20} className="mr-2" />
                    Enviar PIX
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="receive" className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-lg relative">
                <QrCode size={200} className="text-primary" />
                {qrCodeValue && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4"
                    onClick={handleCopyQRCode}
                  >
                    <Copy size={16} className="mr-2" />
                    Copiar código
                  </Button>
                )}
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyKey(key.value)}
                      >
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
          {recentPix.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Nenhuma transação recente
            </p>
          ) : (
            recentPix.map((pix) => (
              <div
                key={pix.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="font-medium text-sm">{pix.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {pix.time} • {pix.key_type}
                  </p>
                </div>
                <span className="font-bold text-sm text-destructive">
                  - R$ {pix.amount.toFixed(2)}
                </span>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default Pix;
