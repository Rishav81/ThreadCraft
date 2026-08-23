export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(4px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const imageAnimation = {
  animate: {
    scale: [1, 1.04, 1],
    x: [0, -12, 0],
    y: [0, 8, 0],
  },
  transition: {
    duration: 22,
    repeat: Infinity,
    ease: "easeInOut",
  },
};
