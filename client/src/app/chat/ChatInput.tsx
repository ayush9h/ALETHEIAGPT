import { ArrowUpIcon, PlusIcon } from '@radix-ui/react-icons';

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
}

export default function ChatInput({ value, onChange, onSend }: Props) {
  return (
    <div className="p-4 w-full mx-auto max-w-3xl font-paragraph">
      <div className="flex items-center rounded-full border p-2">
        <PlusIcon className="ml-2 h-4 w-4" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSend()}
          className="flex-1 bg-transparent px-3 py-2 text-sm outline-none"
          placeholder="Ask about cryptocurrency"
        />
        <button
          onClick={onSend}
          className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center"
        >
          <ArrowUpIcon className="h-4 w-4 text-stone-100" />
        </button>
      </div>
    </div>
  );
}
