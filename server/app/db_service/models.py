from sqlmodel import Field, SQLModel


class UserPrefs(SQLModel, table=True):
    __tablename__ = "user_prefs"  # type: ignore

    user_id: int = Field(primary_key=True, index=True)
    alias: str
    assistant_behavior: str
    user_personal_description: str
