from fastapi import APIRouter
from app.models.schemas import BudgetSummary, DailyStats, SpendingOverview, CategorySummaryItem

router = APIRouter()

@router.get("/summary", response_model=SpendingOverview)
async def get_spending_summary():
    """Retorna resumo completo de gastos: orçamento + estatísticas + categorias"""
    total_spent = 3150.20
    budget_limit = 5000.00
    percentage_used = (total_spent / budget_limit) * 100

    return {
        "budget": {
            "total_spent": total_spent,
            "budget_limit": budget_limit,
            "percentage_used": percentage_used,
            "remaining": budget_limit - total_spent,
            "is_over_budget": percentage_used > 90
        },
        "daily_stats": {
            "spent_today": 127.50,
            "today_change": 15.0,
            "daily_average": 105.00,
            "average_change": -8.0,
            "highest_category": "food",
            "highest_amount": 856.40
        },
        "categories": [
            {
                "type": "food",
                "label": "Alimentação",
                "amount": 856.40,
                "percentage": 27,
                "color": "from-orange-500 to-red-500"
            },
            {
                "type": "housing",
                "label": "Moradia",
                "amount": 980.00,
                "percentage": 31,
                "color": "from-green-500 to-emerald-500"
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
            }
        ]
    }
