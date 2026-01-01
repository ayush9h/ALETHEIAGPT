from typing import List

from fastapi import APIRouter

chat_router = APIRouter(prefix="/v1")


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
            "text": "Can you explain what blockchain is in simple terms?",
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
            "text": "How is it different from a normal database?",
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
            "text": "Is blockchain only used for cryptocurrencies?",
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
