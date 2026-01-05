from typing import Literal

from pydantic import BaseModel, Field


class UserPrefs(BaseModel):
    user_id: int = Field(..., description="user's unique id")
    alias: str = Field(
        ...,
        description="The alternate name of the user",
    )
    assistant_behavior: str = Field(
        ...,
        description="The nature of response by the assistant",
    )
    user_personal_description: str = Field(
        ...,
        description="Hobbies, etc. of the user",
    )
