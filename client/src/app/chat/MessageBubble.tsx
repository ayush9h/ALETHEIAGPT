import ReactMarkdown from "react-markdown";
import { CopyIcon } from "@radix-ui/react-icons";
import { ThumbsUpIcon, ThumbsDownIcon, Clock10Icon, ZapIcon } from "lucide-react";
import { Message } from "../reducers/reducerChat";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div>
      <div
        className={`font-paragraph flex ${
          isUser ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`rounded-md text-sm ${
            isUser
              ? "max-w-[60%] bg-blue-600 text-white px-4 py-2"
              : "w-full   text-stone-800"
          }`}
        >
          {!isUser && message.reasoning && (
            <Accordion
              type="single"
              collapsible
              className="mb-2 flex flex-col rounded-md border border-stone-100 bg-stone-100 p-2"
            >
              <AccordionItem value="reasoning">
                <AccordionTrigger
                  className="
                    data-[state=open]:text-stone-700 py-1 px-0 text-xs
                    text-stone-500
                    hover:no-underline
                  "
                >
                  Show reasoning
                </AccordionTrigger>

                <AccordionContent className="px-0 pb-2 pt-1 text-xs leading-relaxed text-stone-600">
                  {String(message.reasoning)}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}

          <ReactMarkdown>{String(message.text)}</ReactMarkdown>
        </div>

      </div>

      {!isUser && (
        <div className="mt-2.5 flex justify-between gap-2 text-stone-500">
          <div className="flex gap-2">          <CopyIcon className="h-4 w-4 cursor-pointer hover:text-stone-800" />
          <ThumbsUpIcon className="h-4 w-4 cursor-pointer hover:text-stone-800" />
          <ThumbsDownIcon className="h-4 w-4 cursor-pointer hover:text-stone-800" /></div>


          <div className="flex items-center gap-2 text-xs text-stone-500">
            <div title="Time taken" className="flex items-center gap-1">
              <Clock10Icon className="h-3.5 w-3.5" />
              <span>{message.duration}s</span>
            </div>

            <div title="Tokens consumed" className="flex items-center gap-1">
              <ZapIcon className="h-3.5 w-3.5" />
              <span>{message.tokens_consumed}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
