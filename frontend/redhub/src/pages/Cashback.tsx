import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Gift, TrendingUp, Star, ShoppingBag } from "lucide-react";
import { cashbackService } from "@/services/cashbackService";

const Cashback = () => {
//   const totalCashback = 247.50;
//   const nextReward = 500;
//   const progress = (totalCashback / nextReward) * 100;
//
//   const offers = [
//	 {
//	   store: "Amazon",
//	   cashback: "5%",
//	   category: "Eletrônicos",
//	   icon: ShoppingBag,
//	   color: "bg-blue-500/10 text-blue-600"
//	 },
//	 {
//	   store: "Magazine Luiza",
//	   cashback: "3%",
//	   category: "Casa e Decoração",
//	   icon: ShoppingBag,
//	   color: "bg-purple-500/10 text-purple-600"
//	 },
//	 {
//	   store: "iFood",
//	   cashback: "10%",
//	   category: "Alimentação",
//	   icon: ShoppingBag,
//	   color: "bg-red-500/10 text-red-600"
//	 },
//	 {
//		 store: "Netshoes",
//		 cashback: "4%",
//		 category: "Esportes",
//		 icon: ShoppingBag,
//		 color: "bg-green-500/10 text-green-600"
//	 },
//	 {
//		 store: "Submarino",
//		 cashback: "6%",
//		 category: "Livros e Mídia",
//		 icon: ShoppingBag,
//		 color: "bg-yellow-500/10 text-yellow-600"
//	 }
//   ];
//
//   const history = [
//	 { store: "Amazon", date: "20/11/2025", amount: "R$ 12,50", status: "confirmed" },
//	 { store: "iFood", date: "18/11/2025", amount: "R$ 8,90", status: "confirmed" },
//	 { store: "Magazine Luiza", date: "15/11/2025", amount: "R$ 15,30", status: "pending" },
//   ];

	const [totalCashback, setTotalCashback] = useState(0);
	const [nextReward, setNextReward] = useState(500);
	const [offers, setOffers] = useState([]);
	const [history, setHistory] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [cashbackData, offersData, historyData] = await Promise.all([
					cashbackService.getCashbackData(),
					cashbackService.getOffers(),
					cashbackService.getHistory()
				]);

				setTotalCashback(cashbackData.balance);
				setNextReward(cashbackData.nextReward);
				setOffers(offersData);
				setHistory(historyData);
			} catch (error) {
				console.error('Erro ao carregar dados:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const progress = (totalCashback / nextReward) * 100;

	// if (loading) return <div>Carregando...</div>;

  return (
	<div className="max-w-4xl mx-auto space-y-8">
	  <div className="space-y-2">
		<h1 className="text-3xl lg:text-4xl font-bold">Cashback</h1>
		<p className="text-muted-foreground">Compre e ganhe dinheiro de volta</p>
	  </div>

	  <Card className="p-6 bg-gradient-primary text-white">
		<div className="space-y-4">
		  <div className="flex items-center justify-between">
			<div>
			  <p className="text-white/80 text-sm">Saldo Disponível</p>
			  <p className="text-4xl font-bold mt-1">R$ {totalCashback.toFixed(2)}</p>
			</div>
			<div className="p-4 rounded-full bg-white/20">
			  <Gift size={32} />
			</div>
		  </div>

		  <Button className="w-full bg-white text-primary hover:bg-white/90">
			Resgatar Cashback
		  </Button>
		</div>
	  </Card>

	  <Card className="p-6">
		<div className="space-y-4">
		  <div className="flex items-center justify-between">
			<div>
			  <h2 className="text-xl font-bold">Próxima Recompensa</h2>
			  <p className="text-sm text-muted-foreground mt-1">
				Faltam R$ {(nextReward - totalCashback).toFixed(2)} para seu próximo bônus
			  </p>
			</div>
			<Star size={24} className="text-primary" />
		  </div>
		  <Progress value={progress} className="h-3" />
		  <div className="flex justify-between text-sm">
			<span className="text-muted-foreground">R$ {totalCashback.toFixed(2)}</span>
			<span className="font-medium text-primary">R$ {nextReward.toFixed(2)}</span>
		  </div>
		</div>
	  </Card>

	  <div>
		<h2 className="text-xl font-bold mb-4">Ofertas em Destaque</h2>
		<div className="grid gap-4">
		  {offers.map((offer, index) => (
			<Card key={index} className="p-6 hover:border-primary transition-all cursor-pointer hover:scale-[1.02]">
			  <div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
				  <div className={`p-3 rounded-lg ${offer.color}`}>
					<offer.icon size={24} />
				  </div>
				  <div>
					<p className="font-bold text-lg">{offer.store}</p>
					<p className="text-sm text-muted-foreground">{offer.category}</p>
				  </div>
				</div>
				<div className="text-right">
				  <p className="text-2xl font-bold text-primary">{offer.cashback}</p>
				  <p className="text-xs text-muted-foreground">de cashback</p>
				</div>
			  </div>
			</Card>
		  ))}
		</div>
	  </div>

	  <Card className="p-6">
		<h2 className="text-xl font-bold mb-4">Histórico de Cashback</h2>
		<div className="space-y-3">
		  {history.map((item, index) => (
			<div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
			  <div className="flex items-center gap-3">
				<div className={`p-2 rounded-lg ${
				  item.status === "confirmed" ? "bg-success/10" : "bg-amber-500/10"
				}`}>
				  <TrendingUp size={20} className={
					item.status === "confirmed" ? "text-success" : "text-amber-600"
				  } />
				</div>
				<div>
				  <p className="font-medium text-sm">{item.store}</p>
				  <p className="text-xs text-muted-foreground">{item.date}</p>
				</div>
			  </div>
			  <div className="text-right">
				<p className="font-bold text-sm text-success">+{item.amount}</p>
				<p className="text-xs text-muted-foreground capitalize">{item.status === "confirmed" ? "Confirmado" : "Pendente"}</p>
			  </div>
			</div>
		  ))}
		</div>
	  </Card>
	</div>
  );
};

export default Cashback;
