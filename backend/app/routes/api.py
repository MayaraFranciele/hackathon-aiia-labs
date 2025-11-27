from fastapi import APIRouter
from app.routes.cashback import router as cashback_router
from app.routes.dashboard import router as dashboard_router

router = APIRouter(prefix="/api")

router.include_router(cashback_router, prefix="/cashback")
router.include_router(dashboard_router, prefix="/dashboard")
