import os
from enum import Enum

from dotenv import load_dotenv
from pydantic import SecretStr

load_dotenv(dotenv_path="./.env")


class Settings(Enum):
    GROQ_API_KEY = SecretStr(os.environ.get("GROQ_API_KEY", ""))
    GROQ_MODEL = os.environ.get("GROQ_MODEL", "")
