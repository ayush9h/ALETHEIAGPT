from typing import List

from fastapi import APIRouter
from schemas.schema import ChatRequest
from services.agent_flow import chat_service

chat_router = APIRouter(prefix="/v1")


@chat_router.post(
    "/chat",
    tags=["test the agentic flow of queries"],
    description="Answers the question related to the query",
)
async def chat(payload: ChatRequest):
    response = await chat_service(payload.query)

    return {
        "service_output": {
            "reasoning_content": response.get("reasoning_content", ""),
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
                "copy of the ledger.\n\n"
                "Transactions are grouped into blocks, and each block is cryptographically "
                "linked to the previous one. This creates a chain of blocks — hence the "
                "name blockchain. Once a block is added, altering its data would require "
                "changing all subsequent blocks, which is computationally impractical.\n\n"
                "This design makes blockchain highly secure, transparent, and resistant "
                "to tampering."
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
                "A traditional database is typically controlled by a single organization "
                "that has full authority over the data. It allows records to be created, "
                "updated, or deleted at any time.\n\n"
                "In contrast, a blockchain is decentralized and append-only. Once data "
                "is written, it cannot be changed or deleted without network consensus. "
                "This immutability is what makes blockchain suitable for trustless systems.\n\n"
                "Additionally, blockchains rely on consensus mechanisms (such as Proof of Work "
                "or Proof of Stake) to validate transactions, rather than trusting a central "
                "administrator."
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
                "No. Cryptocurrencies are just the most well-known application of blockchain "
                "technology.\n\n"
                "Blockchains are widely used in supply chain tracking, where they help "
                "verify the origin and authenticity of goods. They are also used in "
                "identity management systems, allowing users to control their digital identity "
                "without relying on a central authority.\n\n"
                "Another major use case is smart contracts — self-executing programs that run "
                "on the blockchain and automatically enforce agreements once conditions are met. "
                "These are widely used in decentralized finance (DeFi) and other applications."
            ),
        },
    ]
