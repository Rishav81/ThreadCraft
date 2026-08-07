export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.25,
    },
  },
};

export const itemVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1], // premium easing
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
