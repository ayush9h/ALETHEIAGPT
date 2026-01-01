from fastapi import APIRouter

chat_router = APIRouter(prefix="/v1")


@chat_router.get(
    "/chats",
    tags=["chat_history"],
    description="Gets chat history based on the session_id for a particular user_id",
)
def chat(session_id: str, user_id: str):

    return f"This is the dummy history of the user:{user_id}"
