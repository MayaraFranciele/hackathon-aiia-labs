from fastapi import APIRouter

router = APIRouter()

@router.get("/summary")
async def get_cashback_data(user_id: str = "default"):
	return {
		"balance": 248.50,
		"nextReward": 500
	}

@router.get("/offers")
async def get_offers():
	return [
		{
			"store": "Amazon",
			"cashback": "5%",
			"category": "Eletrônicos",
			"icon": "ShoppingBag",
			"color": "bg-blue-500/10 text-blue-600"
		},
		{
			"store": "Starbucks",
			"cashback": "10%",
			"category": "Cafés",
			"icon": "Coffee",
			"color": "bg-green-500/10 text-green-600"
		},
		{
			"store": "iFood",
			"cashback": "8%",
			"category": "Delivery",
			"icon": "Food",
			"color": "bg-red-500/10 text-red-600"
		}
	]

@router.get("/history")
async def get_history(user_id: str = "default"):
	return [
		{
			"store": "Amazon",
			"date": "20/11/2025",
			"amount": "R$ 12,50",
			"status": "confirmed"
		},
		{
			"store": "Starbucks",
			"date": "18/11/2025",
			"amount": "R$ 25,00",
			"status": "pending"
		},
		{
			"store": "iFood",
			"date": "15/11/2025",
			"amount": "R$ 40,00",
			"status": "confirmed"
		}
	]

@router.post("/redeem")
async def redeem_cashback(user_id: str = "default", amount: float = 0):
	print(f"Resgatando R$ {amount} para o usuário {user_id}")
	return {"success": True, "message": "Cashback resgatado com sucesso"}
