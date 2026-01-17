from typing import List

from app.db_service.db import get_session
from app.db_service.models import UserChats, UserSessions
from app.schemas.chat_schema import ChatRequest
from app.services.agent import graph
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

chat_router = APIRouter(prefix="/v1")


@chat_router.post(
    "/chat",
    tags=["test the agentic flow of queries"],
    description="Answers the question related to the query",
)
async def chat(payload: ChatRequest, session: AsyncSession = Depends(get_session)):
    input_state = {
        "user_input": payload.query,
        "user_model": payload.model,
        "user_preference": payload.userPref,
    }

    response = await graph.ainvoke(input=input_state)  # type: ignore

    stmt = select(UserSessions).where(UserSessions.session_id == 456)
    result = await session.execute(stmt)
    chat_session = result.scalar_one_or_none()

    if not chat_session:
        chat_session = UserSessions(
            session_id=456,
            user_id=423,
            session_title=response.get("session_title", ""),
        )
        session.add(chat_session)
        await session.commit()

    chat = UserChats(
        session_id=456,
        user_query=payload.query,
        assistant_response=response.get("response_content", ""),
        assistant_reasoning=response.get("reasoning_kwargs"),
        tokens_consumed=response.get("tokens_consumed", 0),
        duration=response.get("duration", 0.0),
    )

    session.add(chat)
    await session.commit()

    return {
        "service_output": {
            "reasoning_content": response.get("reasoning_kwargs", ""),
            "response_content": response.get("response_content", ""),
            "duration": response.get("duration", ""),
            "tokens_consumed": response.get("tokens_consumed", ""),
        },
    }


@chat_router.get(
    "/sessions",
    tags=["Sessions for a particular user"],
    description="Get all sessions for a given user_id",
)
async def users_session(
    user_id: int,
    session: AsyncSession = Depends(get_session),
) -> List[dict]:
    stmt = (
        select(UserSessions)
        .where(UserSessions.user_id == 423)
        .order_by(UserSessions.created_at.desc())  # type: ignore
    )

    result = await session.execute(stmt)
    sessions = result.scalars().all()

    return [
        {
            "session_id": s.session_id,
            "session_title": s.session_title,
            "created_at": s.created_at,
        }
        for s in sessions
    ]


@chat_router.get(
    "/chats",
    tags=["Chats in a session"],
    description="List of chats for a given session_id",
)
async def chats(
    session_id: int,
    session: AsyncSession = Depends(get_session),
) -> List[dict]:
    stmt = (
        select(UserChats)
        .where(UserChats.session_id == 456)
        .order_by(UserChats.created_at.asc())  # type:ignore
    )

    result = await session.execute(stmt)
    chats = result.scalars().all()

    response: List[dict] = []

    for c in chats:
        response.append(
            {
                "role": "user",
                "text": c.user_query,
            }
        )

        response.append(
            {
                "role": "assistant",
                "text": c.assistant_response,
                "reasoning": c.assistant_reasoning,
                "duration": c.duration,
                "tokens_consumed": c.tokens_consumed,
            }
        )
    return response
