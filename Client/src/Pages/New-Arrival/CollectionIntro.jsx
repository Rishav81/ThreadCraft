import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";

const CollectionIntro = () => {
  return (
    <motion.section
      variants={containerVariants}
      className="relative overflow-hidden  py-20 sm:py-24 lg:py-28"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.3,
        }}
        className="mx-auto max-w-4xl px-6 text-center"
      >
        {/* Small Label */}
        <motion.div
          variants={itemVariants}
          className="mb-6 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-[#C19A6B]" />

          <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#C19A6B] sm:text-xs">
            The ThreadCraft Arrival
          </span>

          <span className="h-px w-8 bg-[#C19A6B]" />
        </motion.div>

        {/* Heading */}
        <motion.h1
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
          The Latest
          <span className="block text-[#C19A6B]">Arrivals</span>
        </motion.h1>

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
          New pieces, thoughtfully selected.
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
          Explore the latest additions to our collection, from everyday
          essentials to elevated statement pieces.
        </motion.p>

        {/* Bottom Detail */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-10 h-px max-w-xs origin-center bg-gradient-to-r from-transparent via-[#C19A6B]/50 to-transparent"
        />
      </motion.div>
    </motion.section>
  );
};

export default CollectionIntro;
