import { ArrowUpIcon, PlusIcon } from "@radix-ui/react-icons";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
}

export default function ChatInput({ value, onChange, onSend }: Props) {
  return (
    <div className="font-paragraph mx-auto w-full max-w-3xl p-4">
      <div className="flex items-center rounded-full border p-2">
        <PlusIcon className="ml-2 h-4 w-4 hover:cursor-not-allowed" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          className="flex-1 bg-transparent px-3 py-2 text-sm outline-none"
          placeholder="Ask about cryptocurrency"
        />
        <button
          onClick={onSend}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600"
        >
          <ArrowUpIcon className="h-4 w-4 text-stone-100" />
        </button>
      </div>
    </div>
  );
}
