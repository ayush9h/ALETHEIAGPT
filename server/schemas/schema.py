from pydantic import BaseModel, Field


class SessionSchema(BaseModel):
    user_id: str = Field(
        ...,
        description="User id for a particular logged in user",
    )
