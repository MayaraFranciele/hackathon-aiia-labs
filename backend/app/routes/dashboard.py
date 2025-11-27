from fastapi import APIRouter
from app.models.schemas import DashboardSummary, TransactionList, CategorySummaryList

router = APIRouter()

@router.get("/summary", response_model=DashboardSummary)
async def get_dashboard_summary():
	"""Retorna estatísticas do dashboard: saldo, receitas e despesas"""
	return {
		"total_balance": 15452.00,
		"total_balance_change": 12.5,
		"total_income": 8230.00,
		"total_income_change": 8.2,
		"total_expenses": 3180.00,
		"total_expenses_change": -3.1
	}

@router.get("/transactions", response_model=TransactionList)
async def get_transactions():
	"""Retorna lista de transações categorizadas"""
	return {
		"transactions": [
			{
				"id": "1",
				"title": "Salário - Empresa XYZ",
				"date": "Hoje, 14:30",
				"amount": 5000.00,
				"positive": True,
				"category_type": "utilities"
			},
			{
				"id": "2",
				"title": "Netflix - Assinatura Mensal",
				"date": "Ontem, 18:45",
				"amount": 55.90,
				"positive": False,
				"category_type": "entertainment"
			},
			{
				"id": "3",
				"title": "Restaurante - Jantar",
				"date": "Ontem, 20:30",
				"amount": 127.50,
				"positive": False,
				"category_type": "food"
			},
			{
				"id": "4",
				"title": "Uber - Corrida",
				"date": "15/11/2025, 08:15",
				"amount": 32.00,
				"positive": False,
				"category_type": "transport"
			},
			{
				"id": "5",
				"title": "Amazon - Compras Online",
				"date": "15/11/2025, 14:22",
				"amount": 245.90,
				"positive": False,
				"category_type": "shopping"
			},
			{
				"id": "6",
				"title": "Farmácia - Medicamentos",
				"date": "14/11/2025, 11:30",
				"amount": 89.90,
				"positive": False,
				"category_type": "health"
			},
			{
				"id": "7",
				"title": "Rendimento - Investimentos",
				"date": "13/11/2025, 09:00",
				"amount": 320.00,
				"positive": True,
				"category_type": "utilities"
			}
		]
	}

@router.get("/category-summary", response_model=CategorySummaryList)
async def get_category_summary():
	"""Retorna resumo de gastos por categoria"""
	return {
		"categories": [
			{
				"type": "food",
				"label": "Alimentação",
				"amount": 856.40,
				"percentage": 27,
				"color": "from-orange-500 to-red-500"
			},
			{
				"type": "transport",
				"label": "Transporte",
				"amount": 512.00,
				"percentage": 16,
				"color": "from-blue-500 to-cyan-500"
			},
			{
				"type": "shopping",
				"label": "Compras",
				"amount": 445.90,
				"percentage": 14,
				"color": "from-purple-500 to-pink-500"
			},
			{
				"type": "entertainment",
				"label": "Entretenimento",
				"amount": 355.90,
				"percentage": 11,
				"color": "from-pink-500 to-rose-500"
			},
			{
				"type": "housing",
				"label": "Moradia",
				"amount": 980.00,
				"percentage": 31,
				"color": "from-green-500 to-emerald-500"
			}
		]
	}
