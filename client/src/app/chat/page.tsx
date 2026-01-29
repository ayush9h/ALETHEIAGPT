"use client";

import { useEffect, useReducer, useState, useCallback } from "react";
import { sendChatMessage } from "../lib/api/chatService";
import { userChats, userSessions, getUserPref } from "../lib/api/userData";
import { ChatReducer } from "../reducers/reducerChat";
import { InitialState } from "../types/userChat";
import { useSession } from "next-auth/react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

export default function ChatPage() {
  const { data: session } = useSession();
  const [state, dispatch] = useReducer(ChatReducer, InitialState);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const userId = session?.user?.id;
    if (!userId) return;

    async function load() {
      try {
        const sessionsRes = await userSessions(userId as string);
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
  }, [session?.user?.id]);

  const handleSend = useCallback(async () => {
    const input = state.input.trim();
    if (!input) return;
    const userId = session?.user?.id;
    if (!userId) return;

    dispatch({ type: "ADD_MESSAGE", payload: {
      role: "user", text: input,
      reasoning: "",
      duration: 0,
      tokens_consumed: 0
    } });
    dispatch({ type: "CLEAR_INPUT"});

    try {
      const res = await sendChatMessage(
        state.selectedModel,
        input,
        state.userPref,
        state.selectedSessionId,
        userId
      );

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
        payload: {
          role: "assistant", text: "Error getting response from API",
          reasoning: "",
          duration: 0,
          tokens_consumed: 0
        },
      });
    }
  }, [
    state.input,
    state.selectedModel,
    state.userPref,
    state.selectedSessionId,
    session?.user?.id,
  ]);

  const handleSessionSelect = useCallback(async (sessionId: number) => {
    dispatch({ type: "SET_SELECTED_SESSION", payload: sessionId });

    try {
      const res = await userChats(sessionId);
      dispatch({ type: "SET_MESSAGES", payload: res.data });
    } catch {
      dispatch({ type: "SET_MESSAGES", payload: [] });
    }
  }, []);

  useEffect(() => {
    const userId = session?.user?.id;
    if (!userId) return;

    getUserPref(userId)
      .then((res) => {
        dispatch({ type: "SET_USER_PREF", payload: res.data });
      })
      .catch(() => {
        dispatch({
          type: "SET_USER_PREF",
          payload: {
            userCustomInstruction: "",
            userPronouns: "",
            userHobbies: "",
          },
        });
      });
  }, [session?.user?.id]);

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
