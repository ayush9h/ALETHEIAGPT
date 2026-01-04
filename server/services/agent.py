from typing import Any, Dict

from langchain.agents import create_agent
from langchain.chat_models import BaseChatModel
from langchain_core.messages import HumanMessage, SystemMessage
from langgraph.graph import END, START, StateGraph
from services.agent_state import AgentState

builder = StateGraph(AgentState)
graph = builder.compile()


class BlockGPTAgent:
    def __init__(self, system_prompt: str, model: BaseChatModel):
        self.agent = create_agent(
            model=model,
            system_prompt=SystemMessage(content=system_prompt),
        )

    async def ainvoke(self, query: str) -> Dict[str, Any]:
        result = await self.agent.ainvoke({"messages": [HumanMessage(content=query)]})

        reasoning_kwargs = result.get("messages", [])[-1].additional_kwargs.get(
            "reasoning_content", ""
        )
        response_kwargs = result.get("messages", [])[-1].content

        return {
            "reasoning_content": reasoning_kwargs,
            "response_content": response_kwargs,
        }
