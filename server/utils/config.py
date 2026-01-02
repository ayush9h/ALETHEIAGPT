import os
from enum import Enum

from dotenv import load_dotenv

load_dotenv(dotenv_path="./.env")


class Settings(Enum):
    GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
