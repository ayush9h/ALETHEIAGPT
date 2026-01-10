import os
from enum import Enum

from dotenv import load_dotenv
from pydantic import SecretStr

load_dotenv(dotenv_path="../.env")


class Settings(Enum):
    GROQ_API_KEY = SecretStr(os.environ.get("GROQ_API_KEY", ""))
    DB_URL = os.environ.get("DB_URL", "")
