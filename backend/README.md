# My FastAPI App

Este é um projeto simples de servidor back end utilizando Python e FastAPI.

## Estrutura do Projeto

```
my-fastapi-app
├── app
│   ├── __init__.py
│   ├── main.py
│   ├── routes
│   │   ├── __init__.py
│   │   └── api.py
│   ├── models
│   │   ├── __init__.py
│   │   └── schemas.py
│   └── utils
│       ├── __init__.py
│       └── helpers.py
├── requirements.txt
└── README.md
```

## Instalação

1. **Crie um ambiente virtual (opcional, mas recomendado):**
```bash
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
```


2. **Para instalar as dependências do projeto, execute o seguinte comando:**

```
pip install -r requirements.txt
```

## Uso

Para iniciar o servidor, execute o seguinte comando:

```
uvicorn app.main:app --reload
```

O servidor estará disponível em `http://127.0.0.1:8000`.

## Documentação da API

A documentação interativa da API pode ser acessada em `http://127.0.0.1:8000/docs`.
