# RedHub - Plataforma Financeira Inteligente

Bem-vindo ao **RedHub**, uma solução completa de gestão financeira desenvolvida para o Hackathon AIIA Labs. Este projeto integra um Dashboard Web moderno com um Assistente de IA no Telegram para revolucionar a forma como você lida com seu dinheiro.

---

## 🚀 Como Rodar o Projeto

Para facilitar a execução de todos os componentes (Frontend, Backend e Bot), criamos um script de automação.

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- **Python 3.x**
- **Node.js** e **npm**

### Execução Rápida

Na raiz do projeto, execute os seguintes comandos no seu terminal:

1. Dê permissão de execução ao script:

	```bash
	chmod +x start.sh
	```

2. Inicie a aplicação:

	```bash
	./start.sh
	```

#### O que este script faz?

- Verifica se você tem Python e Node instalados.
- Configura o ambiente virtual do Python e instala as dependências do Backend.
- Instala as dependências do Frontend (Node modules).
- Inicia simultaneamente:
  - **API (Backend):** [http://localhost:8000](http://localhost:8000)
  - **Aplicação Web (Frontend):** [http://localhost:5173](http://localhost:5173) (ou porta disponível)
  - **Bot do Telegram:** Em execução em background.

---

## 📂 Estrutura do Projeto

O projeto é dividido em dois módulos principais:

```plaintext
hackathon-aiia-labs/
├── start.sh               # Script de inicialização automática
├── backend/               # API Python e Lógica de IA
│   ├── app/               # Aplicação FastAPI (Rotas, Models, Schemas)
│   ├── bot/               # Bot do Telegram integrado com Gemini
│   └── requirements.txt   # Dependências Python
└── frontend/
	 └── redhub/            # Aplicação React + Vite
		  ├── src/           # Componentes, Páginas e Serviços
		  └── package.json   # Dependências Node
```

---

## 🛠 Tecnologias Utilizadas

### Frontend (Web)

- **React com Vite:** Para uma interface rápida e reativa.
- **TailwindCSS:** Para estilização moderna e responsiva.
- **Shadcn/ui:** Componentes de interface elegantes e acessíveis.
- **Axios:** Para comunicação com a API.

### Backend (API & IA)

- **FastAPI:** Framework Python de alta performance para a API.
- **Google GenAI (Gemini):** Inteligência Artificial para análise de gastos e categorização.
- **Telebot:** Integração com o Telegram.
- **SQLAlchemy:** ORM para gerenciamento de dados.

---

## ✨ Funcionalidades Principais

- **Dashboard Interativo:** Visão geral de saldo, receitas e despesas.
- **Assistente IA (Bot):** Pergunte sobre seus gastos no Telegram e receba análises inteligentes.
- **Transações:** Extrato detalhado, categorização automática e filtros.
- **Serviços Financeiros:**
  - **PIX:** Simulação de envio, recebimento e Copia e Cola.
  - **Cashback:** Sistema de recompensas e ofertas.
  - **Empréstimos:** Simulação com cálculo de parcelas em tempo real.
  - **Seguros:** Contratação simplificada de seguros.

---

## 📝 Notas

- O banco de dados é reiniciado com dados de exemplo (seed) a cada inicialização do backend para fins de demonstração.
- Para parar a execução, basta pressionar `CTRL+C` no terminal onde o script `start.sh` está sendo executado.
