from fastapi import APIRouter
from app.routes.cashback import router as cashback_router
from app.routes.dashboard import router as dashboard_router
from app.routes.spending import router as spending_router
from app.routes.statement import router as statement_router

router = APIRouter(prefix="/api")

router.include_router(cashback_router, prefix="/cashback")
router.include_router(dashboard_router, prefix="/dashboard")
router.include_router(spending_router, prefix="/spending")
router.include_router(statement_router, prefix="/statement")
