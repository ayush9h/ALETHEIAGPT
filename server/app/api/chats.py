from typing import List

from app.schemas.chat_schema import ChatRequest
from app.services.agent import graph
from fastapi import APIRouter

chat_router = APIRouter(prefix="/v1")


@chat_router.post(
    "/chat",
    tags=["test the agentic flow of queries"],
    description="Answers the question related to the query",
)
async def chat(payload: ChatRequest):
    input_state = {
        "user_input": payload.query,
        "user_model": payload.model,
        "user_preference": payload.userPref,
    }

    response = await graph.ainvoke(input=input_state)  # type: ignore

    return {
        "service_output": {
            "reasoning_content": response.get("reasoning_kwargs", ""),
            "response_content": response.get("response_content", ""),
        },
    }


@chat_router.get(
    "/sessions",
    tags=["Sessions for a particular user   "],
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


@chat_router.get(
    "/chats",
    tags=["Chats in a session"],
    description="List of chats based on the session id",
)
def chats(session_id: str):

    return [
        {
            "role": "user",
            "text": (
                "Can you explain what blockchain is in simple terms?\n\n"
                "I am new to this space and keep hearing about it in the context "
                "of cryptocurrencies, decentralization, and Web3, but I do not "
                "fully understand what it actually does."
            ),
        },
        {
            "role": "assistant",
            "text": (
                "Blockchain is a distributed digital ledger that records transactions "
                "across a network of computers. Instead of storing data in a single "
                "centralized database, each participant (called a node) maintains a "
                "copy of the ledger."
            ),
            "reasoning_content": (
                "The user is asking for a beginner-friendly explanation. "
                "Avoid technical jargon and focus on core concepts like decentralization, "
                "shared records, and trust without a central authority."
            ),
        },
        {
            "role": "user",
            "text": (
                "How is a blockchain different from a traditional database?\n\n"
                "I have worked with SQL and NoSQL databases before, so I am trying "
                "to understand what problems blockchain solves that existing databases "
                "cannot already handle."
            ),
        },
        {
            "role": "assistant",
            "text": (
                "A traditional database is usually controlled by a single organization "
                "and allows data to be modified or deleted. Blockchain, by contrast, "
                "is decentralized and append-only, meaning records cannot be altered "
                "once written."
            ),
            "reasoning_content": (
                "The user has technical background, so comparison-based reasoning works best. "
                "Highlight control, mutability, and trust differences instead of re-explaining "
                "basic database concepts."
            ),
        },
        {
            "role": "user",
            "text": (
                "Is blockchain technology only useful for cryptocurrencies like Bitcoin "
                "and Ethereum?\n\n"
                "Or are there real-world applications where it is being used outside "
                "of digital currencies and financial systems?"
            ),
        },
        {
            "role": "assistant",
            "text": (
                "No. Cryptocurrencies are just one application of blockchain technology. "
                "Other uses include supply chain tracking, digital identity systems, "
                "and smart contracts that automatically enforce agreements."
            ),
            "reasoning_content": (
                "The intent is to broaden understanding beyond crypto. "
                "Provide concrete real-world examples to counter the common misconception "
                "that blockchain equals cryptocurrency."
            ),
        },
    ]
