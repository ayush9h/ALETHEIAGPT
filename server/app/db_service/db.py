from app.db_service import models
from app.utils.config import settings
from sqlalchemy.ext.asyncio import create_async_engine
from sqlmodel import SQLModel

engine = create_async_engine(
    url=settings.DB_POSTGRES_URL,
)


# ============== Connection Utils ===================
async def _init_db():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)


async def _close_db():
    await engine.dispose()
