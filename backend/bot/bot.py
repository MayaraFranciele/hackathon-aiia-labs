import telebot
import random
import datetime
from google import genai
from google.genai import types

TOKEN = "8091599447:AAE3GSFUdXOQ7S2uNpQlTnETBaXgHemlznc"
bot = telebot.TeleBot(TOKEN)

# ==========================================
# 1. GERADOR DE DADOS FICTÍCIOS (EM MEMÓRIA)
# ==========================================

# Esta lista vai funcionar como nosso "Banco de Dados" temporário
BASE_DADOS_MEMORIA = []

def gerar_cenario_cliente():
    """Cria dados aleatórios para simular um cliente."""
    global BASE_DADOS_MEMORIA
    BASE_DADOS_MEMORIA = [] # Limpa anterior

    categorias = ["alimentacao", "transporte", "lazer", "assinaturas", "saude"]
    locais = {
        "alimentacao": ["McDonalds", "Mercado Extra", "Restaurante Kg", "Ifood"],
        "transporte": ["Uber", "99 Taxi", "Posto Shell", "Bilhete Unico"],
        "lazer": ["Cinema", "Steam", "Bar do Ze", "Ingresso Show"],
        "assinaturas": ["Netflix", "Spotify", "Amazon Prime", "ChatGPT Plus"],
        "saude": ["Farmacia", "Dentista", "Academia"]
    }

    # Gera 30 transações aleatórias em datas recentes
    hoje = datetime.date.today()
    for _ in range(30):
        cat = random.choice(categorias)
        nome = random.choice(locais[cat])
        # Valor aleatório entre 10 e 200
        valor = round(random.uniform(10.0, 200.0), 2)
        # Data aleatória nos últimos 30 dias
        dias_atras = random.randint(0, 30)
        data = (hoje - datetime.timedelta(days=dias_atras)).strftime("%Y-%m-%d")

        BASE_DADOS_MEMORIA.append({
            "descricao": nome,
            "valor": valor,
            "categoria": cat,
            "data": data
        })

    print(f"🎲 Cenario gerado com {len(BASE_DADOS_MEMORIA)} transações na memória RAM.")

# Gera os dados assim que o script roda
gerar_cenario_cliente()


# ==========================================
# 2. A FERRAMENTA (PYTHON PURO, SEM SQL)
# ==========================================

def buscar_transacoes(
    categorias: list[str] = None,
    valor_min: float = None,
    data_inicio: str = None
):
    """
    Filtra a lista de transações do cliente baseada nos critérios.

    Args:
        categorias: Lista de categorias desejadas (ex: ['lazer', 'alimentacao']).
        valor_min: Valor mínimo do gasto.
        data_inicio: Data inicial 'YYYY-MM-DD'.
    """
    print(f"\n[SISTEMA] 🔎 Buscando na memória: Cat={categorias}, ValMin={valor_min}, Data={data_inicio}...")

    resultados = []

    # Lógica de filtro usando Python puro (Loop na lista)
    for item in BASE_DADOS_MEMORIA:

        # 1. Filtro de Categoria
        if categorias:
            if item['categoria'] not in categorias:
                continue # Pula se não for da categoria pedida

        # 2. Filtro de Valor
        if valor_min is not None:
            if item['valor'] < valor_min:
                continue

        # 3. Filtro de Data (Comparação de String funciona para formato YYYY-MM-DD)
        if data_inicio:
            if item['data'] < data_inicio:
                continue

        # Se passou por tudo, adiciona ao resultado
        resultados.append(item)

    if not resultados:
        return "Nenhum gasto encontrado com esses critérios."

    # Formata como texto para o Gemini ler
    texto_saida = []
    for r in resultados:
        texto_saida.append(f"- {r['data']}: {r['descricao']} (R$ {r['valor']}) [{r['categoria']}]")

    return "\n".join(texto_saida)


# ==========================================
# 3. O CHATBOT
# ==========================================

client = genai.Client(api_key="AIzaSyChOR5UTCxt20zVm2xQhUo-m79UhdGFgo4")

hoje_str = datetime.date.today().strftime("%Y-%m-%d")

chat = client.chats.create(
    model="gemini-2.0-flash",
    config=types.GenerateContentConfig(
        tools=[buscar_transacoes], # Aponta para nossa função Python
        automatic_function_calling=types.AutomaticFunctionCallingConfig(disable=False),
        system_instruction=f"""
        Você é um Analista Financeiro Pessoal.
        Hoje é {hoje_str}.

        Você tem acesso aos dados do cliente através da ferramenta (voce deve criar as informações).
        Seu trabalho é:
        1. Buscar os dados brutos usando a ferramenta.
        2. Analisar, somar e criar insights sobre os gastos.
        3. Se o gasto for muito alto, dê uma dica de economia (invente algo relevante).
        4. Não pergunte novamente ao usuário por critérios - use o que ele der, ou assuma valores padrão razoáveis.
        5. Se o usuário não falar uma categoria, assuma todas as categorias.
        6. Se o usuário não falar um valor mínimo, assuma R$0.
        7. Se o usuário não falar uma data inicial, assuma 30 dias atrás.
        8. Sempre responda em português.

        Sempre mapeie termos do usuário para as categorias válidas:
        ['alimentacao', 'transporte', 'lazer', 'assinaturas', 'saude'].
        """
    )
)

@bot.message_handler(func=lambda m: True)
def receber_mensagem(message):
    texto = message.text.strip()

#     # Exemplo: usuário manda "Quanto eu gastei no mes de novembro?"
#     if texto.lower().startswith("quanto eu gastei"):
#         # Aqui você chama a lógica que quiser
#         # --------------------------------------------------
#         #   SUA LÓGICA PARA PROCESSAR A MENSAGEM
#         # --------------------------------------------------
#         print("Mensagem recebida para processamento:", texto)
#
#         # Opcional: dar um feedback ao usuário
#         bot.reply_to(message, "Ok! Estou processando sua solicitação...")
#     else:
#         bot.reply_to(message, "Mande algo como: 'Quanto eu gastei no mês de novembro?'")

    try:
        response = chat.send_message(texto)
        print(f"Bot: {response.text}")
        bot.reply_to(message, response.text or "Desculpe, não consegui processar sua solicitação.")
    except Exception as e:
        print(f"Erro: {e}")

bot.polling()
