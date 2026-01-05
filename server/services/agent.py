from langchain.agents import create_agent
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_groq import ChatGroq
from langgraph.graph import END, START, StateGraph
from services.agent_state import AgentState
from services.prompts import ORCHESTRATOR_PROMPT
from utils.config import Settings


async def generate_session_title(state: AgentState) -> str:
    user_input = state.get("user_input", "")
    client = ChatGroq(
        api_key=Settings.GROQ_API_KEY.value,
        model=state.get("user_model", ""),
    )

    response = await client.ainvoke(user_input)

    state["session_title"] = str(response.content)
    return state["session_title"]


async def orchestrator(state: AgentState) -> AgentState:
    agent = create_agent(
        model=state["user_model"],
        system_prompt=SystemMessage(content=ORCHESTRATOR_PROMPT),
    )

    result = await agent.ainvoke(
        {
            "messages": [HumanMessage(content=state["user_input"])],
        }
    )

    reasoning_kwargs = result.get("messages", [])[-1].additional_kwargs.get(
        "reasoning_content", ""
    )
    response_kwargs = result.get("messages", [])[-1].content
    state["reasoning_kwargs"] = reasoning_kwargs
    state["reasoning_kwargs"] = response_kwargs

    return state


builder = StateGraph(AgentState)
builder.add_node(generate_session_title)

builder.add_edge(START, "generate_session_title")
builder.add_edge("generate_session_title", END)
graph = builder.compile()
