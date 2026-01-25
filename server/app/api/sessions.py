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
    user_id: str,
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


@session_router.delete(
    "/sessions/{session_id}",
    tags=["Sessions for a particular user"],
    description="Delete a session by session_id for a given user",
)
async def delete_session(
    session_id: int,
    user_id: str,
    session: AsyncSession = Depends(get_session),
):
    stmt = select(UserSessions).where(
        UserSessions.session_id == session_id,
        UserSessions.user_id == user_id,
    )
    result = await session.execute(stmt)
    db_session = result.scalar_one_or_none()

    if not db_session:
        return {
            "status": "Exception",
            "message": f"Exception occurred : Session not found",
            "code": 404,
        }
    await session.delete(db_session)
    await session.commit()
