from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.database import get_db, User, Transaction
from app.models.schemas import DashboardSummary, TransactionList, CategorySummaryList

router = APIRouter()

@router.get("/summary", response_model=DashboardSummary)
async def get_dashboard_summary(db: Session = Depends(get_db)):
    """Retorna estatísticas do dashboard: saldo, receitas e despesas"""
    user = db.query(User).filter(User.id == "default").first()

    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado. Execute o seed do banco de dados.")

    transactions = db.query(Transaction).filter(Transaction.user_id == "default").all()

    total_income = sum(t.amount for t in transactions if t.positive)
    total_expenses = sum(t.amount for t in transactions if not t.positive)

    return {
        "total_balance": user.balance,
        "total_balance_change": 12.5,
        "total_income": total_income,
        "total_income_change": 8.2,
        "total_expenses": total_expenses,
        "total_expenses_change": -3.1
    }

@router.get("/transactions", response_model=TransactionList)
async def get_transactions(db: Session = Depends(get_db)):
    """Retorna lista de transações categorizadas"""
    transactions = db.query(Transaction).filter(Transaction.user_id == "default").order_by(Transaction.date.desc()).all()

    return {
        "transactions": [
            {
                "id": t.id,
                "title": t.title,
                "date": t.date.strftime("%d/%m/%Y, %H:%M") if hasattr(t.date, 'strftime') else str(t.date),
                "amount": t.amount,
                "positive": t.positive,
                "category_type": t.category_type
            }
            for t in transactions
        ]
    }
