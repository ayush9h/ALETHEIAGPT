from typing import List

from fastapi import APIRouter

chat_router = APIRouter(prefix="/v1")


@chat_router.get(
    "/sessions",
    tags=["users_session"],
    description="Get the list of all sessions for a particular user_id",
)
def users_session(user_id: str) -> List:

    sessions = [
        {"session_id": 1, "session_title": "General questions"},
        {
            "session_id": 2,
            "session_title": "Cryptocurrency discussion asdlfjlasdfjlasdfkjalsdfkjasldfkjl",
        },
        {"session_id": 3, "session_title": "Backend API development"},
        {"session_id": 4, "session_title": "Frontend UI improvements"},
    ]

    return sessions


@chat_router.get("/chats", description="List of chats based on the session id")
def chats(session_id: str):
    return "these are the list of chats under a session id"
