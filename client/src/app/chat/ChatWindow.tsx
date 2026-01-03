import Navbar from '../components/navbar';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { Message } from '../reducers/reducerChat';

interface Props {
  messages: Message[];
  input: string;
  selectedModel: string;
  dispatch: any;
  onSend: () => void;
}

export default function ChatWindow({
  messages,
  input,
  selectedModel,
  dispatch,
  onSend,
}: Props) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar
        selectedModel={selectedModel}
        setSelectedModel={(m) =>
          dispatch({ type: 'SET_MODEL', payload: m })
        }
      />

      <MessageList messages={messages} />

      <ChatInput
        value={input}
        onChange={(v) =>
          dispatch({ type: 'SET_INPUT', payload: v })
        }
        onSend={onSend}
      />
    </div>
  );
}
