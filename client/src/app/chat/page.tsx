"use client";

import { useEffect, useReducer, useState } from "react";
import { sendChatMessage } from "../lib/api/chatService";
import { userChats, userSessions } from "../lib/api/userData";
import { ChatReducer, InitialState } from "../reducers/reducerChat";

import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

const USER_ID = "123";
const SESSION_ID = "423";

export default function ChatPage() {
  const [state, dispatch] = useReducer(ChatReducer, InitialState);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const sessions = await userSessions(USER_ID);
        const messages = await userChats(SESSION_ID);
        if (cancelled) return;

        dispatch({ type: "SET_SESSIONS", payload: sessions });
        dispatch({ type: "SET_MESSAGES", payload: messages });
      } catch {}
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSend = async () => {
    const input = state.input.trim();
    if (!input) return;

    dispatch({ type: "ADD_MESSAGE", payload: { role: "user", text: input } });
    dispatch({ type: "CLEAR_INPUT", payload: "" });

    try {
      const res = await sendChatMessage(state.selectedModel, input);
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          role: "assistant",
          text: String(res.data.service_output.response_content ?? "..."),
          reasoning: String(res.data.service_output.reasoning_content ?? "..."),
        },
      });
    } catch {
      dispatch({
        type: "ADD_MESSAGE",
        payload: { role: "assistant", text: "Error getting response from API" },
      });
    }
  };

  return (
    <div
      className={`grid min-h-screen transition-all duration-300 ${
        sidebarOpen ? "grid-cols-[15rem_1fr]" : "grid-cols-[4rem_1fr]"
      }`}
    >
      <Sidebar
        open={sidebarOpen}
        onToggle={setSidebarOpen}
        sessions={state.sessions}
      />

      <ChatWindow
        messages={state.messages}
        input={state.input}
        selectedModel={state.selectedModel}
        dispatch={dispatch}
        onSend={handleSend}
      />
    </div>
  );
}
