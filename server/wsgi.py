from api.chats import chat_router
from fastapi import FastAPI

app = FastAPI()

app.include_router(chat_router)
