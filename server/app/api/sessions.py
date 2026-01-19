from typing import List

from app.db_service.db import get_session
from app.db_service.models import UserSessions
from app.schemas.session_schema import CreateSessionRequest
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

session_router = APIRouter(prefix="/v1")


@session_router.get(
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
        .where(UserSessions.user_id == user_id)
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


@session_router.post("/sessions")
async def create_session(
    payload: CreateSessionRequest,
    session: AsyncSession = Depends(get_session),
):
    session_detail = UserSessions(
        user_id=payload.user_id,
        session_title="New Chat",
    )

    session.add(session_detail)
    await session.commit()
    await session.refresh(session_detail)

    return {
        "session_id": session_detail.session_id,
        "session_title": session_detail.session_title,
    }
