from langchain_groq import ChatGroq
from services.agent import BlockGPTAgent
from utils.config import Settings

model = ChatGroq(
    name="BlockAI",
    model=Settings.GROQ_MODEL.value,
    api_key=Settings.GROQ_API_KEY.value,
)


async def chat_service(question: str):
    agent = BlockGPTAgent(
        system_prompt="You only answer the query",
        model=model,
    )
    response = await agent.ainvoke(question)
    return response
