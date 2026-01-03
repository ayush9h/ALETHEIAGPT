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
    <aside className="border-r bg-stone-100 px-3 py-4 font-paragraph text-sm">
      <div className="flex items-center justify-between">
        <img
          src="./logo.png"
          className="h-8 w-8 cursor-pointer"
          onClick={() => !open && onToggle(true)}
        />
        {open && (
          <DoubleArrowLeftIcon
            className="h-4 w-4 cursor-pointer"
            onClick={() => onToggle(false)}
          />
        )}
      </div>

      <button className="mt-4 w-full rounded-md cursor-pointer flex items-center gap-2 p-2 hover:bg-stone-200">
        <Pencil2Icon />
        {open && <span>New Chat</span>}
      </button>

      <div className="flex items-center gap-2 p-2">
        <MagnifyingGlassIcon />
        {open && <span>Search Chats</span>}
      </div>

      {open && (<>
        <p className='mt-5 text-xs text-stone-600'>Your Chats</p>
        <ul className="mt-2 space-y-2">
          {sessions.map((s) => (
            <li
              key={s.session_id}
              className="group flex items-center p-2 hover:bg-stone-200 rounded-md cursor-pointer"
            >
              <span className="truncate  whitespace-nowrap max-w-[11rem]">{s.session_title}</span>
              <Trash2Icon className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all" />
            </li>
          ))}
        </ul>
        </>
      )}
    </aside>
  );
}
