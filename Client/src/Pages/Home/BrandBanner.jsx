import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { containerVariants } from "../../Components/Ui/HeroAnimation";
const BrandBanner = () => {
  return (
    <motion.section
      variants={containerVariants}
      className="relative overflow-hidden bg-[#111111] mt-6 "
    >
      {/* Background Image */}
      <img
        src="/Images/BrandBanner.png"
        alt="ThreadCraft premium collection"
        className="absolute inset-0 h-full lg:h-fit  w-full object-cover object-[80%_center]   "
        loading="lazy"
        decoding="async"
      />

      {/* Dark Overlay */}
      {/* <div className="absolute inset-0 bg-black/60" /> */}

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[500px] max-w-7xl items-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-xl"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-[#C19A6B]">
            The ThreadCraft
          </span>

          <h2 className="mt-5 text-4xl font-light uppercase leading-tight text-white sm:text-5xl md:text-6xl">
            Crafted for
            <span className="block text-[#C19A6B]">everyday confidence.</span>
          </h2>

          <p className="mt-6 max-w-lg text-sm leading-7 text-white/65 sm:text-base">
            Discover thoughtfully designed pieces made with premium fabrics,
            refined silhouettes, and timeless details. Fashion created to move
            with you, season after season.
          </p>

          <Link
            to="/collections"
            className="group mt-8 inline-flex items-center gap-4 border border-[#C19A6B] px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#C19A6B] transition duration-300 hover:bg-[#C19A6B] hover:text-white rounded-r-3xl"
          >
            Discover ThreadCraft
            <span className="transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BrandBanner;
