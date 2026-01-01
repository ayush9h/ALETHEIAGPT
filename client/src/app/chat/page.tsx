'use client';

import { useEffect, useReducer, useState } from 'react';
import Navbar from '../components/navbar';
import { sendChatMessage, } from '../lib/api/chatService';
import { userChats, userSessions, } from '../lib/api/userData';
import {
  ChatReducer,
  InitialState,
  Message,
} from '../reducers/reducerChat';
import {
  MagnifyingGlassIcon,
  Pencil2Icon,
  ArrowUpIcon,
  PlusIcon,
  Cross2Icon,
} from '@radix-ui/react-icons';
import {
  CopyIcon,
} from '@radix-ui/react-icons';
import { ThumbsUpIcon, ThumbsDownIcon, Trash2Icon } from 'lucide-react';


export default function Chat() {
  const [state, dispatch] = useReducer(ChatReducer, InitialState);
  const [open, setOpen] = useState(false);

  const USER_ID = '123';
  const SESSION_ID = '423';

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const data = await userSessions(USER_ID,);
        const sessionchatData = await userChats(SESSION_ID)
        if (cancelled) return;

        dispatch({
          type: 'SET_SESSIONS',
          payload: data,
        });

        dispatch({
          type: 'SET_MESSAGES',
          payload: sessionchatData,
        });
      } catch {
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [USER_ID, SESSION_ID]);

  const handleSend = async () => {
    const input = state.input.trim();
    if (!input) return;

    dispatch({
      type: 'ADD_MESSAGE',
      payload: { role: 'user', text: input },
    });
    dispatch({ type: 'CLEAR_INPUT', payload: '' });

    try {
      const data = await sendChatMessage(state.selectedModel, input);
      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          role: 'assistant',
          text: data.service_output ?? '...',
        },
      });
    } catch {
      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          role: 'assistant',
          text: 'Error getting the response from API',
        },
      });
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`grid min-h-screen bg-stone-50 text-stone-800 font-paragraph transition-all duration-300 ${open ? 'grid-cols-[15rem_1fr]' : 'grid-cols-[4rem_1fr]'}`}>

      {/* Sidebar */}
      <aside className="flex flex-col overflow-hidden border-r border-stone-300 bg-stone-100 px-3 py-6 shadow-inner">
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => setOpen((v) => !v)}
        >
          <img
            src="./logo.png"
            alt="BLOCKGPT"
            className="h-8 w-8 shrink-0"
          />
        </div>

        <button className="mt-4 flex items-center gap-2 rounded-md px-2 py-2 text-sm text-stone-800 transition-colors hover:bg-stone-200">
          <Pencil2Icon />
          <span
            className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${open ? 'w-auto opacity-100' : 'w-0 opacity-0'
              }`}
          >
            New Chat
          </span>
        </button>

        <div className="flex items-center gap-2 px-2 py-2 text-sm text-stone-800">
          <MagnifyingGlassIcon />
          <span
            className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${open ? 'w-auto opacity-100' : 'w-0 opacity-0'
              }`}
          >
            Search Chats
          </span>
        </div>

        <ul className="mt-4 flex-1 space-y-2 overflow-y-auto text-sm">
          <p
            className={`text-xs text-stone-500 transition-all duration-300 ${open ? 'h-auto opacity-100' : 'h-0 opacity-0'
              }`}
          >
            Your Chats
          </p>

          {state.sessions.map((session: any) => (
            <li
              key={session.session_id}
              className="group flex items-center cursor-pointer rounded-md p-2 transition-colors hover:bg-stone-200"
            >
              <span
                className={`truncate whitespace-nowrap transition-all duration-300 ${open
                    ? 'max-w-[11rem] opacity-100'
                    : 'max-w-0 opacity-0'
                  }`}
                title={session.session_title}
              >
                {session.session_title}
              </span>

              <Trash2Icon
                className="ml-auto h-4 w-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:text-red-500"
              />
            </li>
          ))}

        </ul>
      </aside>

      <div className="flex flex-col h-screen relative">

        <div className="border-b border-stone-300 bg-white">
          <Navbar selectedModel={state.selectedModel} setSelectedModel={(model) => dispatch({ type: 'SET_MODEL', payload: model })} />
        </div>

        <div className="flex flex-col h-[35rem] overflow-y-scroll p-4">
          <div className="max-w-3xl w-full mx-auto space-y-4">
            {state.messages.map((msg: Message, idx: number) => (
              <div key={idx}>
                <div
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                >
                  <div
                    className={`px-4 py-2 text-sm leading-relaxed rounded-md ${msg.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-stone-200 text-stone-900'
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>

                {msg.role === 'assistant' && (
                  <div className="ml-2 mt-1 flex items-center gap-2 text-stone-500 font-paragraph">
                    <button className="hover:text-stone-800">
                      <CopyIcon className="h-4 w-4" />
                    </button>
                    <button className="hover:text-stone-800">
                      <ThumbsUpIcon className="h-4 w-4" />
                    </button>
                    <button className="hover:text-stone-800">
                      <ThumbsDownIcon className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

        <div className="absolute inset-x-0 bottom-4 mx-auto max-w-3xl w-full flex flex-col text-center">
          <div className="flex items-center rounded-full border border-stone-300 bg-stone-50 p-2 shadow-xl">
            <PlusIcon className='ml-2 h-4 w-4' />
            <input
              type="text"
              value={state.input}
              onChange={(e) => dispatch({ type: 'SET_INPUT', payload: e.target.value })}
              onKeyDown={handleKeyDown}
              placeholder="Ask about cryptocurrency"
              className="flex-1 bg-transparent px-3 py-2 text-sm text-stone-800 focus:outline-none placeholder-stone-500"
            />
            <button
              onClick={handleSend}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <ArrowUpIcon className="h-4 w-4 text-white" />
            </button>
          </div>
          <p className="text-xs mt-2 text-stone-500 font-paragraph">
            BLOCKGPT can make mistakes. Check for important info.
          </p>
        </div>
      </div>
    </div>
  );
}
