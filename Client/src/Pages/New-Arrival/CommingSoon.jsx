import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";

const ComingSoon = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.3,
      }}
      className="
        relative
        w-full
        overflow-hidden
      py-16
      "
    >
      {/* Subtle Background Glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-72
          w-72
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#C19A6B]/5
          blur-3xl
        "
      />

      <motion.div
        variants={containerVariants}
        className="
          relative
          mx-auto
          max-w-4xl
          px-6
          text-center
        "
      >
        {/* Eyebrow */}
        <motion.div
          variants={itemVariants}
          className="mb-6 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-[#C19A6B]" />

          <span
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.4em]
              text-[#C19A6B]
              sm:text-xs
            "
          >
            Something New Is Coming
          </span>

          <span className="h-px w-8 bg-[#C19A6B]" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={itemVariants}
          className="
            text-4xl
            font-light
            uppercase
            leading-[0.95]
            tracking-[-0.03em]
            text-white
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
          "
        >
          The Next
          <span className="block text-[#C19A6B]">Chapter</span>
        </motion.h2>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="
            mt-6
            text-base
            font-light
            tracking-wide
            text-white/80
            sm:text-lg
          "
        >
          A new collection is on its way.
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="
            mx-auto
            mt-4
            max-w-2xl
            text-sm
            leading-7
            text-white/50
            sm:text-base
            sm:leading-8
          "
        >
          We're carefully crafting our next selection of elevated essentials,
          contemporary silhouettes, and refined everyday pieces. Stay tuned for
          what's next from ThreadCraft.
        </motion.p>

        {/* Coming Soon Badge */}
        <motion.div
          variants={itemVariants}
          className="
            mx-auto
            mt-8
            inline-flex
            items-center
            gap-3
            rounded-full
            border
            border-white/10
            bg-white/[0.03]
            px-6
            py-3
            backdrop-blur-sm
          "
        >
          <span className="relative flex h-2 w-2">
            <span
              className="
                absolute
                inline-flex
                h-full
                w-full
                animate-ping
                rounded-full
                bg-[#C19A6B]
                opacity-50
              "
            />

            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C19A6B]" />
          </span>

          <span
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.3em]
              text-white/70
              sm:text-xs
            "
          >
            Coming Soon
          </span>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: "easeOut",
          }}
          className="
            mx-auto
            mt-12
            h-px
            max-w-xs
            origin-center
            bg-gradient-to-r
            from-transparent
            via-[#C19A6B]/50
            to-transparent
          "
        />
      </motion.div>
    </motion.section>
  );
};

export default ComingSoon;
