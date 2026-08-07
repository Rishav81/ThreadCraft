import { motion } from "framer-motion";

const AuthTransition = ({ children }) => {
  return (
    <motion.div
      initial={{
        opacity: 0.2,
        x: -80,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0.2,
        x: 80,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default AuthTransition;
