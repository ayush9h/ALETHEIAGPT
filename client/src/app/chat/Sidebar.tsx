import { useSession } from "next-auth/react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import {
  Pencil2Icon,
  DotsHorizontalIcon,
  TrashIcon,
  DrawingPinIcon
} from "@radix-ui/react-icons";
import { PanelLeftIcon } from "lucide-react";


import { ChatAction } from "../types/userChat";
import { Session } from "../types/userMessage";
import { useChatSession } from "../hooks/useChatSession";
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
              group rounded-md cursor-pointer
              ${
                open
                  ? selectedSessionId === s.session_id
                    ? "bg-stone-200/50"
                    : "hover:bg-stone-200/50"
                  : "opacity-0"
              }
            `}
          >
            <div className="flex w-full items-center gap-2 p-2">
              <span
                title={s.session_title}
                className={`
                  truncate whitespace-nowrap transition-all duration-300
                  ${open ? "max-w-[10rem] opacity-100" : "max-w-0 opacity-0"}
                `}
              >
                {s.session_title || "New Chat"}
              </span>
                
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`
                      ml-auto flex h-6 w-6 items-center justify-center rounded
                      text-stone-600 hover:text-stone-800 hover:bg-stone-200 transition
                      ${open ? "opacity-0 group-hover:opacity-100" : "opacity-0"}
                    `}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DotsHorizontalIcon />
                  </button>
                </DropdownMenuTrigger>
                    
                <DropdownMenuContent
                  className="font-paragraph"
                  side="right"
                  align="start"
                  onClick={(e) => e.stopPropagation()}
                >
                  
                  {/* Pins a particular session */}
                  <DropdownMenuItem
                    className="flex items-center gap-2 text-stone-500 focus:text-stone-600 cursor-pointer"
                    onSelect={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // handlePinSession(s.session_id);   
                    }}
                  >
                    <DrawingPinIcon className="h-4 w-4 text-stone-500 focus:text-stone-600" />
                    Pin Chat
                  </DropdownMenuItem>
                  
                  {/* Delete a particular session */}
                  <DropdownMenuItem
                    className="flex items-center gap-2 text-red-500 focus:text-red-600 cursor-pointer"
                    onSelect={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeleteSession(s.session_id);
                    }}
                  >
                    <TrashIcon className="h-4 w-4 text-red-500 focus:text-red-600" />
                    Delete
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
