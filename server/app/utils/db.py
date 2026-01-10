from typing import Optional

from app.utils.config import Settings
from sqlmodel import Field, Session, SQLModel, create_engine

engine = create_engine(
    url=Settings.DB_URL.value,
)

SQLModel.metadata.create_all(engine)

with Session(engine) as session:
    print("True connecting with the DB")
