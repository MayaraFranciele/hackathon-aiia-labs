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
