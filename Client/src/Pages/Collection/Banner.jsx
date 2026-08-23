import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";

const Banner = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      className="relative min-h-[250px] w-full overflow-hidden bg-[#0B0B0B] my-12  lg:min-h-[420px]"
    >
      {/* Background Image */}
      <motion.img
        src="/Images/BannerCollection.webp"
        loading="lazy"
        alt=""
        aria-hidden="true"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Dark Overlay */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r
          from-black/80
          via-black/45
          to-black/10
        "
      />

      {/* Bottom Gradient */}
      <div
        className="
          absolute inset-x-0 bottom-0 h-40
          bg-gradient-to-t
          from-black/70
          to-transparent
        "
      />

      {/* Content */}
      <div
        className="
          relative z-10
          mx-auto flex min-h-[500px] w-full max-w-7xl
          items-center
          px-6
          py-20
          sm:min-h-[550px]
          sm:px-8
          lg:min-h-[620px]
          lg:px-10
        "
      >
        <motion.div variants={containerVariants} className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            variants={itemVariants}
            className="
              mb-5
              flex items-center gap-3
              text-[10px]
              font-medium
              uppercase
              tracking-[0.35em]
              text-white/60
              sm:text-xs
            "
          >
            <span className="h-px w-8 bg-[#C19A6B]" />
            <span>ThreadCraft Collection</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="
              max-w-3xl
              text-5xl
              font-light
              uppercase
              leading-[0.88]
              tracking-[-0.04em]
              text-white
              sm:text-6xl
              md:text-7xl
              lg:text-8xl
              xl:text-9xl
            "
          >
            Find
            <span className="block text-[#C19A6B]">Your Style</span>
          </motion.h1>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="
          absolute
          bottom-7
          left-1/2
          z-20
          -translate-x-1/2
        "
      >
        <div className="flex flex-col items-center gap-3">
          <span
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.4em]
              text-white/50
            "
          >
            Scroll
          </span>

          <motion.span
            animate={{ y: [0, 7, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-8 w-px bg-gradient-to-b from-[#C19A6B] to-transparent"
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Banner;
