from app.models.database import SessionLocal, User, Transaction, PixKey, Bill, Cashback, CashbackOffer, Budget
from datetime import datetime
import uuid

def seed_database():
    db = SessionLocal()

    # Limpar dados existentes
    db.query(Transaction).delete()
    db.query(PixKey).delete()
    db.query(Bill).delete()
    db.query(Cashback).delete()
    db.query(CashbackOffer).delete()
    db.query(Budget).delete()
    db.query(User).delete()

    # Criar usuário padrão
    user = User(
        id="default",
        name="Mayara",
        email="mayara@example.com",
        cpf="123.456.789-00",
        phone="(11) 99999-9999",
        balance=15452.30
    )
    db.add(user)

    # Criar transações
    transactions = [
        Transaction(id="1", user_id="default", title="Salário - Empresa XYZ", amount=5000.00, positive=True, category_type="utilities", date=datetime.now()),
        Transaction(id="2", user_id="default", title="Netflix - Assinatura Mensal", amount=55.90, positive=False, category_type="entertainment"),
        Transaction(id="3", user_id="default", title="Restaurante - Jantar", amount=127.50, positive=False, category_type="food"),
        Transaction(id="4", user_id="default", title="Uber - Corrida", amount=32.00, positive=False, category_type="transport"),
        Transaction(id="5", user_id="default", title="Amazon - Compras Online", amount=245.90, positive=False, category_type="shopping"),
        Transaction(id="6", user_id="default", title="Farmácia - Medicamentos", amount=89.90, positive=False, category_type="health"),
        Transaction(id="7", user_id="default", title="Rendimento - Investimentos", amount=320.00, positive=True, category_type="utilities"),
        Transaction(id="8", user_id="default", title="Supermercado - Compras da Semana", amount=412.30, positive=False, category_type="food"),
        Transaction(id="9", user_id="default", title="Gasolina - Posto Shell", amount=180.00, positive=False, category_type="transport"),
        Transaction(id="10", user_id="default", title="Aluguel - Apartamento", amount=1500.00, positive=False, category_type="housing"),
    ]
    db.add_all(transactions)

    # Criar chaves PIX
    pix_keys = [
        PixKey(user_id="default", type="CPF", value="***.***.***-**"),
        PixKey(user_id="default", type="E-mail", value="usuario@email.com"),
        PixKey(user_id="default", type="Telefone", value="(11) *****-****"),
    ]
    db.add_all(pix_keys)

    # Criar contas
    bills = [
        Bill(id="1", user_id="default", name="Energia Elétrica", amount=195.00, due_date="25/11/2025", status="pending", barcode="12345678901234567890123456789012345678901234567890"),
        Bill(id="2", user_id="default", name="Internet", amount=99.90, due_date="28/11/2025", status="pending", barcode="98765432109876543210987654321098765432109876543210"),
        Bill(id="3", user_id="default", name="Água", amount=67.50, due_date="30/11/2025", status="pending", barcode="45678901234567890123456789012345678901234567890123"),
        Bill(id="4", user_id="default", name="Netflix", amount=55.90, paid_date="20/11/2025", status="paid", payment_method="card"),
        Bill(id="5", user_id="default", name="Spotify", amount=21.90, paid_date="18/11/2025", status="paid", payment_method="pix"),
    ]
    db.add_all(bills)

    # Criar cashback
    cashback_items = [
        Cashback(user_id="default", store="Amazon", amount=12.50, date="20/11/2025", status="confirmed"),
        Cashback(user_id="default", store="Starbucks", amount=25.00, date="18/11/2025", status="pending"),
        Cashback(user_id="default", store="iFood", amount=40.00, date="15/11/2025", status="confirmed"),
    ]
    db.add_all(cashback_items)

    # Criar ofertas de cashback
    offers = [
        CashbackOffer(store="Amazon", cashback_percentage="5%", category="Eletrônicos", icon="ShoppingBag", color="bg-blue-500/10 text-blue-600"),
        CashbackOffer(store="Starbucks", cashback_percentage="10%", category="Cafés", icon="Coffee", color="bg-green-500/10 text-green-600"),
        CashbackOffer(store="iFood", cashback_percentage="8%", category="Delivery", icon="Food", color="bg-red-500/10 text-red-600"),
    ]
    db.add_all(offers)

    # Criar orçamento
    budget = Budget(user_id="default", month="2025-11", budget_limit=5000.00, total_spent=3150.20)
    db.add(budget)

    db.commit()
    db.close()
    print("✅ Database seeded successfully!")
