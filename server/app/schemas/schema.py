from typing import Literal, Optional

from pydantic import BaseModel, Field


class UserPref(BaseModel):
    userCustomInstruction: str = Field(
        "",
        description="Custom system instructions provided by the user",
    )
    userPronouns: str = Field(
        "",
        description="User nickname or pronouns",
    )
    userHobbies: str = Field(
        "",
        description="Additional personal context about the user",
    )


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
