import { ArrowUpIcon, PlusIcon } from "@radix-ui/react-icons";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
}

export default function ChatInput({ value, onChange, onSend }: Props) {
  return (
    <div className="font-paragraph mx-auto w-full max-w-3xl pb-2 rounded-2xl" >
      <div className="flex flex-col rounded-2xl border p-3 gap-2">

        <TextareaAutosize
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          className="w-full resize-none bg-transparent text-sm outline-none max-h-[10rem] overflow-y-auto"
          minRows={1}
          maxRows={6}
          placeholder="Ask anything"
        />

        <div className="flex items-center justify-between">
          <PlusIcon className="h-4 w-4 cursor-not-allowed" />

          <button
            onClick={onSend}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 cursor-pointer"
          >
            <ArrowUpIcon className="h-4 w-4 text-stone-100" />
          </button>
        </div>
        
      </div>

      <p className="text-center text-xs font-paragraph mt-2 text-stone-500">AletheiaGPT is currently being developed. Some features may not be functional. It can make mistakes. Check important info.</p>
    </div>
  );
}
