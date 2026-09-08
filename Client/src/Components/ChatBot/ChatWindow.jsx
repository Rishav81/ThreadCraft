import { useEffect, useRef, useState } from "react";

import {
  X,
  Bot,
  Sparkles,
  ChevronRight,
  ShoppingBag,
  Search,
  Truck,
  Heart,
} from "lucide-react";

import { motion } from "framer-motion";

import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

// ==========================================
// ANIMATION VARIANTS
// ==========================================

const containerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 25,
  },

  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },

  exit: {
    opacity: 0,
    scale: 0.94,
    y: 20,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const messageVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const quickActionVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const productVariants = {
  hidden: {
    opacity: 0,
    y: 15,
    scale: 0.98,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ==========================================
// CHAT WINDOW
// ==========================================

const ChatWindow = ({ onClose }) => {
  // ========================================
  // MESSAGE STATE
  // ========================================

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hey! 👋 Welcome to ThreadCraft.",
    },
    {
      id: 2,
      sender: "ai",
      text: "I'm your AI shopping assistant. I can help you discover products, find the right style, and build your perfect outfit.",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);
  // ========================================
  // SEND MESSAGE
  // ========================================

  const handleSendMessage = (text) => {
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text,
    };

    // Add user message immediately
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Show typing indicator
    setIsTyping(true);

    // Fake AI response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: "Sure! I'd be happy to help you with that. I'm currently checking the best options for you.",
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);

      // Hide typing indicator
      setIsTyping(false);
    }, 1200);
  };

  // ========================================
  // QUICK ACTION
  // ========================================

  const handleQuickAction = (text) => {
    handleSendMessage(text);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="
        fixed bottom-2 right-0 z-50
        flex h-[600px] w-full
        flex-col overflow-hidden
        rounded-2xl
        border border-neutral-200
        bg-white
        shadow-2xl
        sm:bottom-6 sm:right-5
        sm:h-[700px] sm:w-[420px]
      "
    >
      {/* ================= HEADER ================= */}

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex items-center justify-between border-b border-neutral-200 bg-[#111111] px-5 py-4"
      >
        <div className="flex items-center gap-3">
          {/* AI Avatar */}

          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.15,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#C19A6B]"
          >
            <Bot size={23} className="text-white" />

            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#111111] bg-green-500" />
          </motion.div>

          {/* Bot Information */}

          <div>
            <h3 className="text-sm font-semibold text-white">ThreadCraft AI</h3>

            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

              <span className="text-xs text-neutral-400">
                Online • Shopping Assistant
              </span>
            </div>
          </div>
        </div>

        {/* Close */}

        <motion.button
          whileHover={{
            scale: 1.08,
            rotate: 5,
          }}
          whileTap={{
            scale: 0.92,
          }}
          onClick={onClose}
          className="rounded-full p-2 text-neutral-400 transition hover:bg-white/10 hover:text-white"
          aria-label="Close chatbot"
        >
          <X size={19} />
        </motion.button>
      </motion.div>

      {/* ================= MESSAGE AREA ================= */}

      <div className="flex-1 space-y-5 overflow-y-auto bg-[#faf9f7] p-4">
        {/* Date */}

        <motion.div variants={messageVariants} className="flex justify-center">
          <span className="rounded-full bg-neutral-200 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-neutral-500">
            Today
          </span>
        </motion.div>

        {/* ================= DYNAMIC MESSAGES ================= */}

        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div key={message.id} variants={messageVariants}>
              <ChatMessage message={message} />
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C19A6B]">
                <Bot size={16} className="text-white" />
              </div>

              <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400" />

                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:150ms]" />

                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:300ms]" />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* ================= QUICK ACTIONS ================= */}

        {messages.length <= 2 && (
          <motion.div variants={messageVariants} className="ml-10">
            <p className="mb-2 text-xs font-medium text-neutral-500">
              What can I help you with?
            </p>

            <motion.div
              initial="hidden"
              animate="visible"
              transition={{
                staggerChildren: 0.07,
                delayChildren: 0.2,
              }}
              className="grid grid-cols-2 gap-2"
            >
              {/* Find Products */}

              <motion.button
                variants={quickActionVariants}
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() => handleQuickAction("Find products for me")}
                className="group flex items-center gap-2 rounded-xl border border-neutral-200 bg-white p-3 text-left transition hover:border-[#C19A6B] hover:bg-[#C19A6B]/5"
              >
                <Search size={16} className="text-[#C19A6B]" />

                <span className="text-xs font-medium text-neutral-700">
                  Find Products
                </span>
              </motion.button>

              {/* Style Advice */}

              <motion.button
                variants={quickActionVariants}
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() => handleQuickAction("Give me some style advice")}
                className="group flex items-center gap-2 rounded-xl border border-neutral-200 bg-white p-3 text-left transition hover:border-[#C19A6B] hover:bg-[#C19A6B]/5"
              >
                <Sparkles size={16} className="text-[#C19A6B]" />

                <span className="text-xs font-medium text-neutral-700">
                  Style Advice
                </span>
              </motion.button>

              {/* Track Order */}

              <motion.button
                variants={quickActionVariants}
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() => handleQuickAction("I want to track my order")}
                className="group flex items-center gap-2 rounded-xl border border-neutral-200 bg-white p-3 text-left transition hover:border-[#C19A6B] hover:bg-[#C19A6B]/5"
              >
                <Truck size={16} className="text-[#C19A6B]" />

                <span className="text-xs font-medium text-neutral-700">
                  Track Order
                </span>
              </motion.button>

              {/* Wishlist */}

              <motion.button
                variants={quickActionVariants}
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() => handleQuickAction("Show me my wishlist")}
                className="group flex items-center gap-2 rounded-xl border border-neutral-200 bg-white p-3 text-left transition hover:border-[#C19A6B] hover:bg-[#C19A6B]/5"
              >
                <Heart size={16} className="text-[#C19A6B]" />

                <span className="text-xs font-medium text-neutral-700">
                  Wishlist
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* ================= SAMPLE PRODUCT ================= */}

        {messages.length <= 2 && (
          <motion.div variants={productVariants} className="ml-10">
            <motion.div
              whileHover={{
                y: -3,
              }}
              transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
            >
              {/* Product Image */}

              <div className="relative h-44 overflow-hidden bg-neutral-100">
                <motion.img
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80"
                  alt="Black oversized hoodie"
                  className="h-full w-full object-cover"
                />

                <span className="absolute left-3 top-3 rounded-full bg-[#C19A6B] px-2.5 py-1 text-[10px] font-semibold text-white">
                  AI PICK
                </span>
              </div>

              {/* Product Information */}

              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900">
                      Oversized Black Hoodie
                    </h4>

                    <p className="mt-1 text-xs text-neutral-500">
                      Premium Cotton • Relaxed Fit
                    </p>
                  </div>

                  <motion.button
                    whileHover={{
                      scale: 1.1,
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                    className="rounded-full p-1.5 text-neutral-400 transition hover:bg-neutral-100 hover:text-[#C19A6B]"
                  >
                    <Heart size={17} />
                  </motion.button>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-base font-bold text-neutral-900">
                    ₹1,499
                  </span>

                  <span className="text-xs text-neutral-400 line-through">
                    ₹1,999
                  </span>

                  <span className="text-[10px] font-semibold text-green-600">
                    25% OFF
                  </span>
                </div>

                {/* Actions */}

                <div className="mt-4 flex gap-2">
                  <motion.button
                    whileHover={{
                      x: 2,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-neutral-200 px-3 py-2.5 text-xs font-semibold text-neutral-700 transition hover:border-[#C19A6B] hover:text-[#C19A6B]"
                  >
                    View Product
                    <ChevronRight size={14} />
                  </motion.button>

                  <motion.button
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#111111] px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-[#C19A6B]"
                  >
                    <ShoppingBag size={14} />
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* ================= INPUT AREA ================= */}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.25,
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
      </motion.div>
    </motion.div>
  );
};

export default ChatWindow;
