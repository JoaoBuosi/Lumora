from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Permitir que o frontend acesse a API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # depois dá pra restringir
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rota de teste
@app.get("/")
def home():
    return {"msg": "API funcionando!"}

# Rota de chat (por enquanto só repete a mensagem do usuário)
@app.post("/chat/")
def chat(user_message: dict):
    message = user_message.get("message", "")
    return {"response": f"Você disse: {message}"}
