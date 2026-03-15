import { useSession } from "next-auth/react";
import Image from "next/image";

import { PanelLeftIcon } from "lucide-react";
import { ChatAction } from "../types/userChat";
import { Session } from "../types/userMessage";
import { useChatSession } from "../hooks/useChatSession";
import { pinSession } from "../lib/api/userData";
import { SessionItem } from "../components/session-item";
import { Pencil2Icon } from "@radix-ui/react-icons";


interface SidebarProps {
  open: boolean;
  onToggle: (open: boolean) => void;
  sessions: Session[];
  selectedSessionId: number | null;
  onSelectSession: (id: number) => void;
  dispatch:  React.Dispatch<ChatAction>;
}

export default function Sidebar({
  open,
  onToggle,
  sessions,
  onSelectSession,
  selectedSessionId,
  dispatch,
}: SidebarProps) {


  const { data: auth } = useSession();
  const handleDeleteSession = useChatSession(auth?.user?.id, dispatch, selectedSessionId)

  const handlePinSession = async (sessionId: number) => {
    try {
      const res = await pinSession(sessionId, auth?.user?.id as string);

      dispatch({
        type: "SET_SESSIONS",
        payload: res.data,   
      });
    } catch (err) {
      console.error("Pin failed", err);
    }
  };


  const pinnedSessions = sessions.filter((s)=> s.is_pinned)
  const normalSessions = sessions.filter((s)=> !s.is_pinned)

  const handleNewChat = () => {
    dispatch({ type: "SET_SELECTED_SESSION", payload: null });
    dispatch({ type: "SET_MESSAGES", payload: [] });
    dispatch({ type: "CLEAR_INPUT" });
  };

  return (
    <aside className={`font-paragraph p-4 border-r bg-stone-200/50 text-sm ${open ? 'cursor-pointer':'cursor-col-resize'}`} onClick={() => !open && onToggle(true)}>
      <div className={`flex items-center justify-between `}>
        <Image
          src="/logo.png"
          className="shrink-0 cursor-pointer"
          alt="Logo"
          width={32}
          height={32}
        />

        <PanelLeftIcon
          className={`
            h-4 w-4 cursor-pointer transition-opacity duration-200
            ${open ? "opacity-100" : "pointer-events-none opacity-0"}
          `}
          onClick={() => onToggle(false)}
        />
      </div>

      {/* New Chat */}
      <button
        className="mt-4 flex w-full items-center gap-2 rounded-md p-2 hover:bg-stone-200/50 cursor-pointer"
        onClick={handleNewChat}
      >
        <Pencil2Icon className="shrink-0" />
        <span
          className={`
            overflow-hidden whitespace-nowrap transition-all duration-300
            ${open ? "max-w-[8rem] opacity-100" : "max-w-0 opacity-0"}
          `}
        >
          New Thread
        </span>
      </button>

      
      <ul className="mt-2 space-y-1">

          {pinnedSessions.length > 0 && (
            <>
              <p className={`mt-5 text-xs text-stone-600 ${open ? "opacity-100" : "opacity-0"}`}>
                Pinned Chats
              </p>
          
              <ul className="mt-2 space-y-1">
                {pinnedSessions.map((s) => (
                  <SessionItem
                    key={s.session_id}
                    s={s}
                    open={open}
                    selectedSessionId={selectedSessionId}
                    onSelectSession={onSelectSession}
                    handlePinSession={handlePinSession}
                    handleDeleteSession={handleDeleteSession}
                  />
                ))}
              </ul>
            </>
          )}

          <p className={`mt-5 text-xs text-stone-600 ${open ? "opacity-100" : "opacity-0"}`}>
            Recent Chats
          </p>

          <ul className="mt-2 space-y-1">
            {normalSessions.map((s) => (
              <SessionItem
                key={s.session_id}
                s={s}
                open={open}
                selectedSessionId={selectedSessionId}
                onSelectSession={onSelectSession}
                handlePinSession={handlePinSession}
                handleDeleteSession={handleDeleteSession}
              />
            ))}
          </ul>
      </ul>
    </aside>
  );
}
