import ReactMarkdown from 'react-markdown';
import { CopyIcon } from '@radix-ui/react-icons';
import { ThumbsUpIcon, ThumbsDownIcon } from 'lucide-react';
import { Message } from '../reducers/reducerChat';

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <div>
      <div className={`flex font-paragraph ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`rounded-md px-4 py-2 text-sm ${
            isUser
              ? 'bg-blue-600 text-white max-w-[60%]'
              : 'bg-stone-100 text-stone-800 w-full'
          }`}
        >
          <ReactMarkdown>{message.text}</ReactMarkdown>
        </div>
      </div>

      {!isUser && (
        <div className="ml-2 mt-1 flex gap-2 text-stone-500">
          <CopyIcon className="h-4 w-4 cursor-pointer hover:text-stone-800" />
          <ThumbsUpIcon className="h-4 w-4 cursor-pointer hover:text-stone-800" />
          <ThumbsDownIcon className="h-4 w-4 cursor-pointer hover:text-stone-800" />
        </div>
      )}
    </div>
  );
}
