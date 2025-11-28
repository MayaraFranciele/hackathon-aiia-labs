#!/bin/bash

# Cores para facilitar a leitura dos logs
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Inicializando RedHub Project ===${NC}"

# ---------------------------------------------------------
# 1. Verificação de Pré-requisitos do Sistema
# ---------------------------------------------------------
echo -e "${BLUE}Verificando ferramentas instaladas...${NC}"

if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Erro: Python3 não encontrado.${NC}"
    echo "Por favor, instale o Python 3 antes de continuar."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}Erro: npm (Node.js) não encontrado.${NC}"
    echo "Por favor, instale o Node.js e npm antes de continuar."
    exit 1
fi

echo -e "${GREEN}Pré-requisitos do sistema OK.${NC}"

# ---------------------------------------------------------
# 2. Configuração e Instalação do Backend & Bot
# ---------------------------------------------------------
echo -e "${BLUE}Configurando Backend e Bot...${NC}"

cd backend || { echo -e "${RED}Pasta 'backend' não encontrada.${NC}"; exit 1; }

# Criação do ambiente virtual se não existir
if [ ! -d ".venv" ]; then
    echo "Criando ambiente virtual Python (.venv)..."
    python3 -m venv .venv
fi

# Ativação do ambiente virtual
source .venv/bin/activate

# Instalação das dependências
echo "Instalando dependências do Python (requirements.txt)..."
pip install -r requirements.txt

# Volta para a raiz
cd ..

# ---------------------------------------------------------
# 3. Configuração e Instalação do Frontend
# ---------------------------------------------------------
echo -e "${BLUE}Configurando Frontend...${NC}"

cd frontend/redhub || { echo -e "${RED}Pasta 'frontend/redhub' não encontrada.${NC}"; exit 1; }

# Instalação das dependências do Node
echo "Instalando dependências do Node (npm install)..."
npm install

# Volta para a raiz
cd ../..

# ---------------------------------------------------------
# 4. Execução dos Serviços
# ---------------------------------------------------------
echo -e "${GREEN}=== Iniciando Serviços ===${NC}"
echo "Pressione CTRL+C para parar todos os serviços."

# Função para matar os processos filhos ao sair
trap 'kill $(jobs -p); echo -e "${RED}Serviços encerrados.${NC}";' SIGINT SIGTERM EXIT

# Iniciar Backend (API)
echo -e "${BLUE}Iniciando API (Porta 8000)...${NC}"
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Iniciar Bot
echo -e "${BLUE}Iniciando Bot do Telegram...${NC}"
# O bot roda em background. Certifique-se que as chaves de API estão configuradas no arquivo bot.py
python bot/bot.py &
BOT_PID=$!

# Iniciar Frontend
echo -e "${BLUE}Iniciando Frontend (Vite)...${NC}"
cd ../frontend/redhub
npm run dev &
FRONTEND_PID=$!

# Aguarda os processos rodarem
wait
