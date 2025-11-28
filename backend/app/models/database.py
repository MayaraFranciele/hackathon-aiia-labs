from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from datetime import datetime

SQLALCHEMY_DATABASE_URL = "sqlite:///./redhub.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    cpf = Column(String, unique=True)
    phone = Column(String)
    balance = Column(Float, default=0.0)

    transactions = relationship("Transaction", back_populates="user")
    pix_keys = relationship("PixKey", back_populates="user")
    bills = relationship("Bill", back_populates="user")
    cashback = relationship("Cashback", back_populates="user")

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    title = Column(String)
    amount = Column(Float)
    positive = Column(Boolean)
    category_type = Column(String)
    description = Column(String, nullable=True)
    date = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="transactions")

class PixKey(Base):
    __tablename__ = "pix_keys"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    type = Column(String)  # CPF, Email, Telefone, Chave Aleatória
    value = Column(String)

    user = relationship("User", back_populates="pix_keys")

class PixTransaction(Base):
    __tablename__ = "pix_transactions"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    recipient_name = Column(String)
    pix_key = Column(String)
    amount = Column(Float)
    description = Column(String, nullable=True)
    date = Column(DateTime, default=datetime.utcnow)
    key_type = Column(String)

class Bill(Base):
    __tablename__ = "bills"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    name = Column(String)
    amount = Column(Float)
    due_date = Column(String)
    paid_date = Column(String, nullable=True)
    status = Column(String)  # pending, paid
    barcode = Column(String, nullable=True)
    payment_method = Column(String, nullable=True)

    user = relationship("User", back_populates="bills")

class Cashback(Base):
    __tablename__ = "cashback"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    store = Column(String)
    amount = Column(Float)
    date = Column(String)
    status = Column(String)  # confirmed, pending

    user = relationship("User", back_populates="cashback")

class CashbackOffer(Base):
    __tablename__ = "cashback_offers"

    id = Column(Integer, primary_key=True, index=True)
    store = Column(String)
    cashback_percentage = Column(String)
    category = Column(String)
    icon = Column(String)
    color = Column(String)

class Budget(Base):
    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    month = Column(String)  # formato: YYYY-MM
    budget_limit = Column(Float)
    total_spent = Column(Float, default=0.0)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    Base.metadata.create_all(bind=engine)
