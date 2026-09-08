import { Bot } from "lucide-react";

const ChatMessage = ({ message }) => {
  const isAI = message.sender === "ai";

  return (
    <div className={`flex w-full ${isAI ? "justify-start" : "justify-end"}`}>
      {/* AI Avatar */}
      {isAI && (
        <div className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C19A6B] text-white">
          <Bot size={16} />
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isAI
            ? "rounded-tl-md bg-neutral-100 text-neutral-800"
            : "rounded-tr-md bg-[#C19A6B] text-white"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default ChatMessage;
