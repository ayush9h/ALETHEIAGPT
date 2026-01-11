from typing import Literal, Optional

from app.schemas.user_pref import UserPref
from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    model: Literal[
        "openai/gpt-oss-120b",
        "qwen/qwen3-32b",
        "llama-3.1-8b-instant",
    ] = Field(
        ...,
        description="The user requested model",
    )
    query: str = Field(
        ...,
        description="The user's query",
    )
    userPref: Optional[UserPref] = Field(
        None,
        description="User preferences that influence assistant responses",
    )
