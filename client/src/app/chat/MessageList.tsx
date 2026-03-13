import { Message } from "../types/userMessage";
import MessageBubble from "./MessageBubble";
import { memo } from "react";


const MessageList = memo(function MessageList({ messages, userName }: { messages: Message[], userName:string }) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-3xl space-y-4">
      { messages.length == 0 ? <>
        <div className="flex h-full items-center justify-center text-center font-paragraph">
          <h1 className="text-2xl text-stone-800">Hello {userName}, ready when you are.</h1>
        </div>
        </> : 
        <>
          {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} />
          ))}
      </>}
        </div>
      
    </div>
  );
})

export default MessageList