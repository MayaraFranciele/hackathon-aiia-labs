from pydantic import BaseModel
from typing import List, Optional

class Item(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float
    tags: List[str] = []

class DashboardSummary(BaseModel):
    total_balance: float
    total_balance_change: float
    total_income: float
    total_income_change: float
    total_expenses: float
    total_expenses_change: float

class Transaction(BaseModel):
    id: str
    title: str
    date: str  # Formato: "Hoje, 14:30" ou "15/11/2025, 08:15"
    amount: float
    positive: bool
    category_type: str  # "food", "transport", "shopping", etc.

class TransactionList(BaseModel):
    transactions: List[Transaction]

class CategorySummaryItem(BaseModel):
    type: str
    label: str
    amount: float
    percentage: int
    color: str

class CategorySummaryList(BaseModel):
    categories: List[CategorySummaryItem]

# Schemas para Spending
class BudgetSummary(BaseModel):
    total_spent: float
    budget_limit: float
    percentage_used: float
    remaining: float
    is_over_budget: bool

class DailyStats(BaseModel):
    spent_today: float
    today_change: float
    daily_average: float
    average_change: float
    highest_category: str
    highest_amount: float

class SpendingOverview(BaseModel):
    budget: BudgetSummary
    daily_stats: DailyStats
    categories: List[CategorySummaryItem]

class StatementTransaction(BaseModel):
    id: str
    title: str
    date: str
    amount: float
    positive: bool
    category_type: str
    description: Optional[str] = None

class StatementResponse(BaseModel):
    transactions: List[StatementTransaction]
