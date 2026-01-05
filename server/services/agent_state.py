from typing import TypedDict


class AgentState(TypedDict):
    user_input: str
    session_title: str
    user_model: str
    reasoning_kwargs: str
    response_content: str
