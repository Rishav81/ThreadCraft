import { motion } from "framer-motion";
import {
  containerVariants,
  imageAnimation,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";

const BrandVideo = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.3,
      }}
      className="relative h-[60vh] lg:h-[60vh] overflow-hidden "
    >
      <motion.img
        variants={imageAnimation}
        src="/Images/womenHero.jpeg"
        alt="Profile"
        className="absolute inset-0 h-full lg:h-fit w-full object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Luxury Gradient */}
      <div
        className="
      absolute inset-0
      bg-gradient-to-r
      from-black/70
      via-black/40
     bg-black/50
    "
      />
      <div className="absolute inset-0 bg-black/50" />
      {/* Content */}
      <motion.div
        variants={containerVariants}
        className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6 "
      >
        <motion.p
          variants={itemVariants}
          className="uppercase tracking-[0.4em] text-[#C19A6B] text-sm"
        >
          Brand Story
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="mt-4 text-4xl md:text-5xl font-bold text-white"
        >
          Crafted For Every Moment
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mt-5 max-w-2xl text-gray-200"
        >
          Experience timeless fashion where quality meets elegance. Every thread
          is designed to inspire confidence.
        </motion.p>

        <motion.button
          variants={itemVariants}
          className="mt-8 rounded-full border border-[#C19A6B] px-8 py-3 text-[#C19A6B] transition hover:bg-[#C19A6B] hover:text-black"
        >
          Explore Collection
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default BrandVideo;
