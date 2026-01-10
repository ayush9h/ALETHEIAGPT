from contextlib import asynccontextmanager

from app.api.chats import chat_router
from app.api.user_settings import user_router
from app.db_service.db import _close_db, _init_db
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "*",
]


@asynccontextmanager
async def lifespan(app: FastAPI):
    await _init_db()

    yield

    await _close_db()


app = FastAPI(lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(chat_router)
app.include_router(user_router)
