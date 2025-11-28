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
    date: str
    amount: float
    positive: bool

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

# Schemas para Statement
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

# Schemas para PIX
class PixKey(BaseModel):
    type: str
    value: str

class RecentPixTransaction(BaseModel):
    id: str
    name: str
    time: str
    amount: float
    key_type: str

class PixSendRequest(BaseModel):
    pix_key: str
    amount: float
    description: Optional[str] = None

class PixSendResponse(BaseModel):
    success: bool
    transaction_id: str
    message: str

class PixQRCodeResponse(BaseModel):
    qr_code: str
    qr_code_value: str

class PixKeysResponse(BaseModel):
    keys: List[PixKey]

class PixRecentResponse(BaseModel):
    transactions: List[RecentPixTransaction]

class UpcomingBill(BaseModel):
    id: str
    name: str
    due_date: str
    amount: float
    status: str
    barcode: Optional[str] = None

class PaidBill(BaseModel):
    id: str
    name: str
    paid_date: str
    amount: float
    payment_method: str

class UpcomingBillsResponse(BaseModel):
    bills: List[UpcomingBill]
    total_amount: float
    count: int

class PaidBillsResponse(BaseModel):
    bills: List[PaidBill]
    total_amount: float
    count: int

class PaymentsSummary(BaseModel):
    total_pending: float
    total_paid: float
    pending_count: int
    paid_count: int
    next_due_date: str
