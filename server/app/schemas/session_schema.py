from pydantic import BaseModel


class CreateSessionRequest(BaseModel):
    user_id: int
