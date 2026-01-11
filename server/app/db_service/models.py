from sqlmodel import Field, SQLModel


# ==============User Prefs====================
class UserPrefs(SQLModel, table=True):
    __tablename__ = "user_prefs"  # type: ignore

    user_id: int = Field(primary_key=True, index=True)
    alias: str
    assistant_behavior: str
    user_personal_description: str


# ==================User Chats================
class UserChats(SQLModel, table=True):
    __tablename__ = "user_chats"  # type: ignore

    chat_id: int = Field(primary_key=True)
    sessiond_id: int
    assistant_response: str
    assistant_reasoning: str | None
    tokens_consumed: int
    duration: float


# ================== User Sessions ==============
class UserSessions(SQLModel, table=True):
    __tablename__ = "user_sessions"  # type: ignore

    user_id: int
    session_id: int = Field(primary_key=True)
    session_title: str
