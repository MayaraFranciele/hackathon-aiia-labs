from fastapi import APIRouter
from app.models.schemas import StatementResponse

router = APIRouter()

@router.get("/transactions", response_model=StatementResponse)
async def get_statement_transactions():
    """Retorna todas as transações - filtros aplicados no frontend"""

    return {
        "transactions": [
            {
                "id": "1",
                "title": "Salário - Empresa XYZ",
                "date": "Hoje, 14:30",
                "amount": 5000.00,
                "positive": True,
                "category_type": "utilities",
                "description": "Pagamento mensal"
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
            },
            {
                "id": "8",
                "title": "Supermercado - Compras da Semana",
                "date": "12/11/2025, 16:45",
                "amount": 412.30,
                "positive": False,
                "category_type": "food"
            },
            {
                "id": "9",
                "title": "Gasolina - Posto Shell",
                "date": "11/11/2025, 09:20",
                "amount": 180.00,
                "positive": False,
                "category_type": "transport"
            },
            {
                "id": "10",
                "title": "Aluguel - Apartamento",
                "date": "05/11/2025, 10:00",
                "amount": 1500.00,
                "positive": False,
                "category_type": "housing"
            }
        ]
    }
