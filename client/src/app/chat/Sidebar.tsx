import {
  MagnifyingGlassIcon,
  Pencil2Icon,
  DoubleArrowLeftIcon,
} from '@radix-ui/react-icons';
import { Trash2Icon } from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onToggle: (open: boolean) => void;
  sessions: any[];
}

export default function Sidebar({ open, onToggle, sessions }: SidebarProps) {
  return (
    <aside className="border-r bg-stone-100 px-3 py-4 font-paragraph text-sm overflow-hidden">

      <div className="flex items-center justify-between">
        <img
          src="./logo.png"
          className="h-8 w-8 cursor-pointer shrink-0"
          onClick={() => !open && onToggle(true)}
        />

        <DoubleArrowLeftIcon
          className={`
            h-4 w-4 cursor-pointer transition-opacity duration-200
            ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
          onClick={() => onToggle(false)}
        />
      </div>

      <button className="mt-4 flex w-full items-center gap-2 rounded-md p-2 hover:bg-stone-200">
        <Pencil2Icon className="shrink-0" />
        <span
          className={`
            whitespace-nowrap overflow-hidden transition-all duration-300
            ${open ? 'max-w-[8rem] opacity-100' : 'max-w-0 opacity-0'}
          `}
        >
          New Chat
        </span>
      </button>


      <div className="flex items-center gap-2 p-2">
        <MagnifyingGlassIcon className="shrink-0" />
        <span
          className={`
            whitespace-nowrap overflow-hidden transition-all duration-300
            ${open ? 'max-w-[10rem] opacity-100' : 'max-w-0 opacity-0'}
          `}
        >
          Search Chats
        </span>
      </div>

      {/* Chats */}
      <p
        className={`
          mt-5 text-xs text-stone-600 transition-all duration-300
          ${open ? 'opacity-100 max-h-6' : 'opacity-0 max-h-0'}
        `}
      >
        Your Chats
      </p>

      <ul className="mt-2 space-y-1">
        {sessions.map((s) => (
          <li
            key={s.session_id}
            className="group flex items-center rounded-md p-2 hover:bg-stone-200 cursor-pointer"
          >
            <span
              className={`
                truncate whitespace-nowrap transition-all duration-300
                ${open ? 'max-w-[11rem] opacity-100' : 'max-w-0 opacity-0'}
              `}
            >
              {s.session_title}
            </span>

            <Trash2Icon
              className={`
                ml-auto h-4 w-4 transition-all
                ${open ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}
                hover:text-red-500
              `}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
}
