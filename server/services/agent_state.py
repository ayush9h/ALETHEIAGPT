from typing import Annotated, List, TypedDict

from langgraph.graph.message import BaseMessage, add_messages
from schemas.schema import UserPref


class AgentState(TypedDict):
    user_input: Annotated[List[BaseMessage], add_messages]
    session_title: str
    user_model: str
    reasoning_kwargs: str
    response_content: str
    user_preference: UserPref
