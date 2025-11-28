from fastapi import FastAPI
from app.routes.api import router as api_router
from fastapi.middleware.cors import CORSMiddleware
from app.models.database import init_db, SessionLocal, User
from app.utils.seed_data import seed_database
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar banco de dados
@app.on_event("startup")
def startup_event():
    init_db()

    # Verificar se o banco está vazio e fazer seed
    db = SessionLocal()
    user_count = db.query(User).count()
    db.close()

    if user_count == 0:
        print("🌱 Seeding database...")
        seed_database()

app.include_router(api_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to RedHub API!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
