"use client";

import { useEffect, useReducer, useState } from "react";
import { sendChatMessage } from "../lib/api/chatService";
import { userChats, userSessions } from "../lib/api/userData";
import { ChatReducer, InitialState } from "../reducers/reducerChat";

import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

const USER_ID = "423";
export default function ChatPage() {
  const [state, dispatch] = useReducer(ChatReducer, InitialState);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const sessionsRes = await userSessions(USER_ID);
        const sessions = sessionsRes.data;

        if (cancelled || !sessions.length) return;

        const topSession = sessions[0];

        dispatch({ type: "SET_SESSIONS", payload: sessions });
        dispatch({ type: "SET_SELECTED_SESSION", payload: topSession.session_id });

        const chatsRes = await userChats(topSession.session_id);
        dispatch({ type: "SET_MESSAGES", payload: chatsRes.data });
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
      const res = await sendChatMessage(state.selectedModel, input, state.userPref, state.selectedSessionId);
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          role: "assistant",
          text: String(res.data.service_output.response_content ?? "..."),
          reasoning: String(res.data.service_output.reasoning_content ?? "..."),
          duration: res.data.service_output.duration ?? "...",
          tokens_consumed: res.data.service_output.tokens_consumed ?? "...",
        },
      });
    } catch {
      dispatch({
        type: "ADD_MESSAGE",
        payload: { role: "assistant", text: "Error getting response from API" },
      });
    }
  };


  const handleSessionSelect = async (sessionId: number) => {
  dispatch({ type: "SET_SELECTED_SESSION", payload: sessionId });

  try {
    const res = await userChats(sessionId);
    dispatch({ type: "SET_MESSAGES", payload: res.data });
  } catch {
    dispatch({ type: "SET_MESSAGES", payload: [] });
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
        selectedSessionId={state.selectedSessionId}
        onSelectSession={handleSessionSelect}
        dispatch={dispatch}
      />

      <ChatWindow
        messages={state.messages}
        input={state.input}
        userPref={state.userPref}
        selectedModel={state.selectedModel}
        dispatch={dispatch}
        onSend={handleSend}
      />
    </div>
  );
}
