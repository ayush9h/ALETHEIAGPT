from typing import AsyncGenerator

from app.utils.config import settings
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlmodel import SQLModel

engine = create_async_engine(
    settings.DB_POSTGRES_URL,
    echo=False,
)

async_session_maker = async_sessionmaker(
    engine,
    expire_on_commit=False,
    class_=AsyncSession,
)

# ============== Connection Utils ===================
async def _init_db():
    async with engine.begin() as conn:
        await conn.execute(text("SELECT 1"))
        await conn.run_sync(SQLModel.metadata.create_all)

async def _close_db():
    await engine.dispose()


# ============== Dependency ===================
async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session
