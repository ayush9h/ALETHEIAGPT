import ReactMarkdown from "react-markdown";
import { CopyIcon } from "@radix-ui/react-icons";
import { ThumbsUpIcon, ThumbsDownIcon } from "lucide-react";
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
          className={`rounded-md px-4 py-2 text-sm ${
            isUser
              ? "max-w-[60%] bg-blue-600 text-white"
              : "w-full bg-stone-50 text-stone-800"
          }`}
        >
          {!isUser && message.reasoning && (
            <Accordion
              type="single"
              collapsible
              className="mb-2 flex flex-col rounded-md border border-stone-300 bg-stone-100 p-2"
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
        <div className="ml-2 mt-1 flex gap-2 text-stone-500">
          <CopyIcon className="h-4 w-4 cursor-pointer hover:text-stone-800" />
          <ThumbsUpIcon className="h-4 w-4 cursor-pointer hover:text-stone-800" />
          <ThumbsDownIcon className="h-4 w-4 cursor-pointer hover:text-stone-800" />
        </div>
      )}
    </div>
  );
}
