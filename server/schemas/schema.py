from typing import Literal

from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    model: Literal[
        "llama3-8b-8192",
        "qwen/qwen3-32b",
        "gemma2-9b-it",
    ] = Field(
        ...,
        description="The user requested model",
    )
    query: str = Field(
        ...,
        description="The user's query",
    )
