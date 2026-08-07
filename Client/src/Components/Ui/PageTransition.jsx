import { motion } from "framer-motion";

const PageTransition = ({ children }) => {
  return (
    <motion.main
      initial={{
        x: "25%",
        opacity: 0.6,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      exit={{
        x: "-25%",
        opacity: 0.6,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.main>
  );
};

export default PageTransition;
