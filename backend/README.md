# RedHub Backend

Este é o servidor backend do projeto RedHub, desenvolvido com Python e FastAPI.
Ele fornece a API para o frontend e gerencia a lógica de IA utilizando LangChain e
Groq, além de integrar um bot para o Telegram.

## Tecnologias Utilizadas

*   **FastAPI**: Framework web moderno e rápido para construção de APIs.
*   **LangChain**: Framework para orquestração de LLMs e fluxos de IA.
*   **Groq**: Plataforma de inferência de IA de alta performance.
*   **ChromaDB**: Banco de dados vetorial para armazenamento de embeddings (RAG).
*   **Tavily**: API de busca na web otimizada para agentes de IA.
*   **Python-Telegram-Bot**: Biblioteca para integração com o Telegram.
*   **SQLAlchemy**: ORM para interação com bancos de dados SQL.
*   **Pydantic**: Validação de dados e configurações.

## Estrutura do Projeto

```plaintext
backend/
├── app/                   # Núcleo da aplicação FastAPI
│   ├── models/            # Definição de dados
│   │   └── schemas.py     # Modelos Pydantic para validação de entrada/saída da API
│   ├── routes/            # Endpoints da API
│   │   └── api.py         # Rotas (ex: /chat, /upload) que o frontend consome
│   ├── utils/             # Ferramentas auxiliares
│   │   └── helpers.py     # Funções de suporte (ex: processamento de texto)
│   ├── main.py            # Ponto de entrada: Inicia o servidor e configura rotas/CORS
│   └── __init__.py        # Torna a pasta um pacote Python
├── bot/                   # Módulo do Bot do Telegram
│   └── bot.py             # Script que roda o bot e conecta com a IA
├── requirements.txt       # Lista de bibliotecas necessárias (FastAPI, LangChain, etc.)
└── README.md              # Documentação do backend
```

## Instalação

Siga os passos abaixo para configurar o ambiente:

1. **Crie um ambiente virtual (opcional, mas recomendado):**
	```bash
	python -m venv .venv
	source .venv/bin/activate  # Linux/Mac
	```

2. **Instale as dependências do projeto:**
	```bash
	pip install -r requirements.txt
	```

## Uso

Para iniciar o servidor, execute:

```bash
uvicorn app.main:app --reload
```

O servidor estará disponível em: [http://127.0.0.1:8000](http://127.0.0.1:8000).

## Documentação da API

Acesse a documentação interativa da API em: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

# Iniciar o Bot
Para rodar o bot do Telegram (em um terminal separado):

```python
python bot/bot.py
```
