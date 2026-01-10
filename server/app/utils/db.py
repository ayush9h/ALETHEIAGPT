from typing import Optional

from app.utils.config import settings
from sqlalchemy.ext.asyncio import create_async_engine

engine = create_async_engine(
    url=settings.DB_POSTGRES_URL,
)
