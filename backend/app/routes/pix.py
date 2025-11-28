from fastapi import APIRouter, HTTPException
from app.models.schemas import (
    PixKeysResponse,
    PixRecentResponse,
    PixSendRequest,
    PixSendResponse,
    PixQRCodeResponse,
    PixKey,
    RecentPixTransaction
)
import uuid

router = APIRouter()

@router.get("/keys", response_model=PixKeysResponse)
async def get_pix_keys():
    """Retorna as chaves PIX cadastradas do usuário"""
    return {
        "keys": [
            {
                "type": "CPF",
                "value": "***.***.***-**"
            },
            {
                "type": "E-mail",
                "value": "usuario@email.com"
            },
            {
                "type": "Telefone",
                "value": "(11) *****-****"
            }
        ]
    }

@router.get("/recent", response_model=PixRecentResponse)
async def get_recent_pix():
    """Retorna as transações PIX recentes"""
    return {
        "transactions": [
            {
                "id": "1",
                "name": "João Silva",
                "time": "Há 2 horas",
                "amount": 160.0,
                "key_type": "CPF"
            },
            {
                "id": "2",
                "name": "Maria Santos",
                "time": "Ontem",
                "amount": 80.0,
                "key_type": "E-mail"
            },
            {
                "id": "3",
                "name": "Pedro Costa",
                "time": "2 dias atrás",
                "amount": 200.0,
                "key_type": "Telefone"
            },
            {
                "id": "4",
                "name": "Ana Oliveira",
                "time": "3 dias atrás",
                "amount": 450.0,
                "key_type": "CPF"
            }
        ]
    }

@router.post("/send", response_model=PixSendResponse)
async def send_pix(request: PixSendRequest):
    """Envia um PIX para a chave especificada"""

    # Validação básica
    if request.amount <= 0:
        raise HTTPException(status_code=400, detail="Valor inválido")

    if not request.pix_key:
        raise HTTPException(status_code=400, detail="Chave PIX não informada")

    # Simular envio de PIX
    transaction_id = str(uuid.uuid4())

    return {
        "success": True,
        "transaction_id": transaction_id,
        "message": f"PIX de R$ {request.amount:.2f} enviado com sucesso!"
    }

@router.get("/qrcode", response_model=PixQRCodeResponse)
async def generate_qr_code():
    """Gera um QR Code PIX para recebimento"""

    # Simular geração de QR Code
    qr_code_value = f"00020126580014BR.GOV.BCB.PIX0136{uuid.uuid4()}520400005303986540510.005802BR5925SEU NOME COMPLETO AQUI6009SAO PAULO62070503***63041D3D"

    return {
        "qr_code": qr_code_value,
        "qr_code_value": qr_code_value
    }

@router.post("/copy-paste", response_model=PixSendResponse)
async def pix_copy_paste(request: PixSendRequest):
    """Processa pagamento via PIX Copia e Cola"""

    # Validar se é um código PIX válido
    if not request.pix_key.startswith("00020126"):
        raise HTTPException(status_code=400, detail="Código PIX inválido")

    transaction_id = str(uuid.uuid4())

    return {
        "success": True,
        "transaction_id": transaction_id,
        "message": f"PIX de R$ {request.amount:.2f} processado com sucesso!"
    }
