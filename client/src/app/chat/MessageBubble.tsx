import ReactMarkdown from 'react-markdown';
import { CopyIcon } from '@radix-ui/react-icons';
import { ThumbsUpIcon, ThumbsDownIcon } from 'lucide-react';
import { Message } from '../reducers/reducerChat';
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <div>
      <div className={`flex font-paragraph ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`rounded-md px-4 py-2 text-sm ${
            isUser
              ? 'bg-blue-600 text-white max-w-[60%]'
              : 'bg-stone-50 text-stone-800 w-full'
          }`}
        >
         
         {!isUser && message.reasoning && (
            <Accordion
              type="single"
              collapsible
              className="flex flex-col mb-2 bg-stone-100 border border-stone-300 rounded-md p-2"
            >
              <AccordionItem value="reasoning">
                <AccordionTrigger
                  className="
                    py-1 px-0 text-xs text-stone-500
                    hover:no-underline
                    data-[state=open]:text-stone-700
                  "
                >
                  Show reasoning
                </AccordionTrigger>

                <AccordionContent className="px-0 pb-2 pt-1 text-xs text-stone-600 leading-relaxed">
                  {String(message.reasoning)}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}

          <ReactMarkdown>{String(message.text)}</ReactMarkdown>
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
