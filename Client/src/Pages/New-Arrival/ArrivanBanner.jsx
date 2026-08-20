import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";

const ArrivalBanner = () => {
  return (
    <motion.section
      variants={containerVariants}
      className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 overflow-hidden py-12 lg:flex-row lg:gap-16 "
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: -80, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="group relative w-full lg:w-1/2"
      >
        <Link className="block overflow-hidden rounded-3xl">
          <motion.img
            src="/Images/HoodyBanner.jpg"
            alt="ThreadCraft latest hoodie arrivals"
            loading="lazy"
            className="
              h-[320px]
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
             
              sm:h-[520px]
            "
          />

          {/* Image Overlay */}
          <div
            className="
              absolute
              inset-0
              bg-black/10
              transition-all
              duration-500
              group-hover:bg-black/30
            "
          />

          {/* Hover Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="
              absolute
              bottom-6
              left-1/2
              -translate-x-1/2
              rounded-full
              border
              border-white/30
              bg-black/40
              px-6
              py-3
              text-xs
              uppercase
              tracking-[0.25em]
              text-white
              backdrop-blur-md
            "
          >
            Explore Hoodies
          </motion.div>
        </Link>
      </motion.div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.3,
        }}
        className="w-full px-6 text-center lg:w-1/2 lg:text-left"
      >
        {/* Small Label */}
        <motion.div
          variants={itemVariants}
          className="mb-6 flex items-center justify-center gap-3 lg:justify-start"
        >
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
          Premium
          <span className="block text-[#C19A6B]">Hoodie Arrivals</span>
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
          Elevated comfort. Effortless style.
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="
            mx-auto
            mt-4
            max-w-xl
            text-sm
            leading-7
            text-white/50
            sm:text-base
            sm:leading-8
            lg:mx-0
          "
        >
          Discover our latest hoodie arrivals, crafted with premium fabrics,
          refined silhouettes, and contemporary details for effortless everyday
          style.
        </motion.p>

        {/* CTA */}
        <motion.div variants={itemVariants} className="mt-8">
          <Link
            to="/Collections"
            className="
              inline-flex
              items-center
              gap-3
              border
              border-[#C19A6B]
              px-7
              py-3
              text-xs
              font-medium
              uppercase
              tracking-[0.25em]
              text-[#C19A6B]
              transition-all
              duration-300
              hover:bg-[#C19A6B]
              hover:text-black
            "
          >
            Shop Hoodies
            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>

        {/* Bottom Detail */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="
            mx-auto
            mt-10
            h-px
            max-w-xs
            origin-center
            bg-gradient-to-r
            from-transparent
            via-[#C19A6B]/50
            to-transparent
            lg:mx-0
          "
        />
      </motion.div>
    </motion.section>
  );
};

export default ArrivalBanner;
