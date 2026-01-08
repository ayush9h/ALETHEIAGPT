import Navbar from "../components/navbar";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { Message } from "../reducers/reducerChat";

interface Props {
  messages: Message[];
  input: string;
  selectedModel: string;
  dispatch: any;
  userPref:string;
  onSend: () => void;
}

export default function ChatWindow({
  messages,
  input,
  selectedModel,
  dispatch,
  userPref,
  onSend,
}: Props) {
  return (
    <div className="flex h-screen flex-col">
      <Navbar
        selectedModel={selectedModel}
        setSelectedModel={(m) => dispatch({ type: "SET_MODEL", payload: m })}
        userPref={userPref}
        setUserPref={(v) => dispatch({ type: "SET_USER_PREF", payload: v })}
      />

      <MessageList messages={messages} />

      <ChatInput
        value={input}
        onChange={(v) => dispatch({ type: "SET_INPUT", payload: v })}
        onSend={onSend}
      />
    </div>
  );
}
