from fastapi import APIRouter, HTTPException
from app.models.schemas import (
    UpcomingBillsResponse,
    PaidBillsResponse,
    PaymentsSummary,
    UpcomingBill,
    PaidBill
)
import uuid
from datetime import datetime

router = APIRouter()

@router.get("/upcoming", response_model=UpcomingBillsResponse)
async def get_upcoming_bills():
    """Retorna as contas a vencer"""
    bills = [
        {
            "id": "1",
            "name": "Energia Elétrica",
            "due_date": "25/11/2025",
            "amount": 195.00,
            "status": "pending",
            "barcode": "12345678901234567890123456789012345678901234567890"
        },
        {
            "id": "2",
            "name": "Internet",
            "due_date": "28/11/2025",
            "amount": 99.90,
            "status": "pending",
            "barcode": "98765432109876543210987654321098765432109876543210"
        },
        {
            "id": "3",
            "name": "Água",
            "due_date": "30/11/2025",
            "amount": 67.50,
            "status": "pending",
            "barcode": "45678901234567890123456789012345678901234567890123"
        },
        {
            "id": "6",
			"name": "Gás",
			"due_date": "05/12/2025",
			"amount": 120.00,
			"status": "pending",
			"barcode": "32109876543210987654321098765432109876543210987654"
		}
    ]

    total = sum(bill["amount"] for bill in bills)

    return {
        "bills": bills,
        "total_amount": total,
        "count": len(bills)
    }

@router.get("/paid", response_model=PaidBillsResponse)
async def get_paid_bills():
    """Retorna as contas já pagas"""
    bills = [
        {
            "id": "4",
            "name": "Netflix",
            "paid_date": "20/11/2025",
            "amount": 55.90,
            "payment_method": "card"
        },
        {
            "id": "5",
            "name": "Spotify",
            "paid_date": "18/11/2025",
            "amount": 21.90,
            "payment_method": "pix"
        }
    ]

    total = sum(bill["amount"] for bill in bills)

    return {
        "bills": bills,
        "total_amount": total,
        "count": len(bills)
    }

@router.get("/summary", response_model=PaymentsSummary)
async def get_payments_summary():
    """Retorna resumo de pagamentos do mês"""
    return {
        "total_pending": 362.40,
        "total_paid": 77.80,
        "pending_count": 3,
        "paid_count": 2,
        "next_due_date": "25/11/2025"
    }
