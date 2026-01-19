import {
  MagnifyingGlassIcon,
  Pencil2Icon,
  DoubleArrowLeftIcon,
} from "@radix-ui/react-icons";
import { Trash2Icon } from "lucide-react";
import { createSession } from "../lib/api/userData";

interface SidebarProps {
  open: boolean;
  onToggle: (open: boolean) => void;
  sessions: any[];
  selectedSessionId: number | null;
  onSelectSession: (id: number) => void;
  dispatch: any
}

export default function Sidebar({ open, onToggle, sessions, onSelectSession, selectedSessionId, dispatch }: SidebarProps) {

  const handleNewChat = async () => {
  const res = await createSession(423); 

  dispatch({ type: "ADD_SESSION", payload: res });
  dispatch({ type: "SET_SELECTED_SESSION", payload: res.session_id });

  dispatch({
    type: "SET_MESSAGES",
    payload: [
      {
        role: "assistant",
        text: "Hi, how can I help you today?",
        reasoning: "",
        duration: 0,
        tokens_consumed: 0,
      },
    ],
  });

  dispatch({ type: "CLEAR_INPUT" });
};


  return (
    <aside className="font-paragraph p-4 border-r bg-stone-100 text-sm">
      <div className="flex items-center justify-between">
        <img
          src="./logo.png"
          className="h-8 w-8 shrink-0 cursor-pointer"
          onClick={() => !open && onToggle(true)}
        />

        <DoubleArrowLeftIcon
          className={`
            h-4 w-4 cursor-pointer transition-opacity duration-200
            ${open ? "opacity-100" : "pointer-events-none opacity-0"}
          `}
          onClick={() => onToggle(false)}
        />
      </div>

      <button className="mt-4 flex w-full items-center gap-2 rounded-md p-2 hover:bg-stone-200"  onClick={handleNewChat}>
        <Pencil2Icon className="shrink-0" />
        <span
          className={`
            overflow-hidden whitespace-nowrap transition-all duration-300
            ${open ? "max-w-[8rem] opacity-100" : "max-w-0 opacity-0"}
          `}
        >
          New Chat
        </span>
      </button>

      <div className="flex items-center gap-2 p-2">
        <MagnifyingGlassIcon className="shrink-0" />
        <span
          className={`
            overflow-hidden whitespace-nowrap transition-all duration-300
            ${open ? "max-w-[10rem] opacity-100" : "max-w-0 opacity-0"}
          `}
        >
          Search Chats
        </span>
      </div>

      {/* Chats */}
      <p
        className={`
          mt-5 text-xs text-stone-600 transition-all duration-300
          ${open ? "max-h-6 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        Your Chats
      </p>

      <ul className="mt-2 space-y-1">
        {sessions.map((s) => (
          <li
            key={s.session_id}
            onClick={() => onSelectSession(s.session_id)}
            className={`
              group flex cursor-pointer items-center rounded-md p-2
              ${selectedSessionId === s.session_id ? "bg-stone-200" : "hover:bg-stone-200"}
            `}
          >
            <span
              className={`
                truncate whitespace-nowrap transition-all duration-300
                ${open ? "max-w-[11rem] opacity-100" : "max-w-0 opacity-0"}
              `}
            >
              {s.session_title}
            </span>
              
            <Trash2Icon
              className={`
                ml-auto h-4 w-4 transition-all
                ${open ? "opacity-0 group-hover:opacity-100" : "opacity-0"}
                hover:text-red-500
              `}
            />
          </li>
        ))}
      </ul>

    </aside>
  );
}
