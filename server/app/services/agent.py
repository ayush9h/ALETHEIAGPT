from app.services.agent_state import AgentState
from app.services.prompts import ORCHESTRATOR_BASE_PROMPT
from app.utils.config import Settings
from langchain.agents import create_agent
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_groq import ChatGroq
from langgraph.graph import END, START, StateGraph


async def generate_session_title(state: AgentState) -> AgentState:
    user_input = state.get("user_input", "")
    client = ChatGroq(
        api_key=Settings.GROQ_API_KEY.value,
        model=state.get("user_model", ""),
    )

    response = await client.ainvoke(user_input)

    state["session_title"] = str(response.content)
    return state


async def orchestrator(state: AgentState) -> AgentState:
    agent = create_agent(
        model=ChatGroq(
            api_key=Settings.GROQ_API_KEY.value,
            model=state.get("user_model", ""),
        ),
        system_prompt=SystemMessage(content=ORCHESTRATOR_BASE_PROMPT),
    )

    result = await agent.ainvoke(
        {
            "messages": state["user_input"]
            + [
                SystemMessage(
                    content=f"""Remember the user preferences while answering to the query: **User Custom Instruction**{state["user_preference"].userCustomInstruction} + **User Preference** {state['user_preference'].userHobbies} + **User Hobbies**{state['user_preference'].userPronouns}

"""
                )
            ],  # type: ignore
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
builder.add_node(orchestrator)

builder.add_edge(START, "generate_session_title")
builder.add_edge("generate_session_title", "orchestrator")
builder.add_edge("orchestrator", END)
graph = builder.compile()
