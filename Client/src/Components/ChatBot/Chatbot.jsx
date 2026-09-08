import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ChatWindow from "./ChatWindow";
import { BotIcon } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <ChatWindow onClose={handleClose} />
        ) : (
          <motion.button
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.7,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.92,
            }}
            onClick={handleOpen}
            className="
              flex h-14 w-14 items-center justify-center
              rounded-full
              bg-[#C19A6B]
              text-white
              shadow-lg
              transition-shadow duration-300
              hover:shadow-xl
            "
            aria-label="Open chatbot"
          >
            <BotIcon size={26} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
