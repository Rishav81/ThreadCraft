import { useState } from "react";
import { Paperclip, Send, Smile } from "lucide-react";

const ChatInput = ({ onSend, disabled = false }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    const trimmedMessage = input.trim();

    // Don't send empty messages
    if (!trimmedMessage || disabled) {
      return;
    }

    // Send message to parent component
    onSend(trimmedMessage);

    // Clear input after sending
    setInput("");
  };

  const handleKeyDown = (event) => {
    // Send message when user presses Enter
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-neutral-200 bg-white p-3">
      <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 transition-all duration-300 focus-within:border-[#C19A6B] focus-within:ring-2 focus-within:ring-[#C19A6B]/10">
        {/* Attachment Button */}
        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-neutral-500 transition-all duration-200 hover:bg-neutral-200 hover:text-neutral-800"
          aria-label="Attach file"
        >
          <Paperclip size={18} />
        </button>

        {/* Message Input */}
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Ask ThreadCraft AI..."
          className="min-w-0 flex-1 bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
        />

        {/* Emoji Button */}
        <button
          type="button"
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg text-neutral-500 transition-all duration-200 hover:bg-neutral-200 hover:text-neutral-800 sm:flex"
          aria-label="Add emoji"
        >
          <Smile size={18} />
        </button>

        {/* Send Button */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          className="
            flex h-9 w-9 shrink-0 items-center justify-center
            rounded-lg
            bg-[#C19A6B]
            text-white
            transition-all duration-200
            hover:scale-105
            hover:bg-[#ad875b]
            active:scale-95
            disabled:cursor-not-allowed
            disabled:opacity-40
            disabled:hover:scale-100
          "
          aria-label="Send message"
        >
          <Send size={17} />
        </button>
      </div>

      <p className="mt-2 text-center text-[10px] text-neutral-400">
        Press Enter to send
      </p>
    </div>
  );
};

export default ChatInput;
