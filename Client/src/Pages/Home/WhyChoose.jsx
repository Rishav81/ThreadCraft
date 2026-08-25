import { motion } from "framer-motion";
import { FiCheck, FiHeart, FiLayers, FiShield } from "react-icons/fi";
import { Link } from "react-router-dom";

import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";

const reasons = [
  {
    icon: FiLayers,
    title: "Premium Quality",
    description:
      "Carefully selected fabrics and refined finishing, made for everyday comfort.",
  },
  {
    icon: FiCheck,
    title: "Thoughtful Design",
    description:
      "Clean silhouettes, considered details, and effortless pieces designed around you.",
  },
  {
    icon: FiHeart,
    title: "Timeless Style",
    description:
      "Versatile designs created beyond fleeting trends, made to stay in your wardrobe.",
  },
  {
    icon: FiShield,
    title: "Made With Care",
    description:
      "Every piece is thoughtfully selected with quality, comfort, and lasting value in mind.",
  },
];

const premiumEase = [0.22, 1, 0.36, 1];

const WhyChoose = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      className="
        mx-auto
        max-w-7xl
        overflow-hidden
        px-4
        py-14
        sm:px-6
        sm:py-16
        lg:px-8
        lg:py-24
      "
    >
      <div
        className="
          grid
          items-center
          gap-12
          lg:grid-cols-[0.95fr_1.05fr]
          lg:gap-16
          xl:gap-20
        "
      >
        {/* =====================================================
            IMAGE
        ====================================================== */}

        <motion.div variants={itemVariants} className="relative">
          <Link
            to="/women"
            className="
              group
              relative
              block
              overflow-hidden
              rounded-2xl
            "
          >
            <motion.img
              src="/Images/heroBanner.webp"
              alt="ThreadCraft premium clothing collection"
              loading="lazy"
              decoding="async"
              whileHover={{
                scale: 1.035,
              }}
              transition={{
                duration: 0.9,
                ease: premiumEase,
              }}
              className="
                aspect-[4/5]
                w-full
                object-cover
                object-[20%_top]
                sm:aspect-[5/6]
                lg:aspect-[4/5]
                lg:object-center
              "
            />

            {/* Editorial overlay */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-t
                from-black/50
                via-black/10
                to-transparent
              "
            />

            {/* Image Label */}

            <div
              className="
                absolute
                bottom-5
                left-5
                sm:bottom-7
                sm:left-7
              "
            >
              <span
                className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.3em]
                  text-white/70
                  sm:text-[10px]
                "
              >
                Designed for everyday living
              </span>
            </div>

            {/* Hover indicator */}

            <div
              className="
                absolute
                right-5
                top-5
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                bg-black/10
                backdrop-blur-sm
                transition-all
                duration-500
                group-hover:border-[#C19A6B]
                group-hover:bg-[#C19A6B]
                sm:right-7
                sm:top-7
              "
            >
              <span
                className="
                  text-xs
                  text-white
                  transition-colors
                  duration-300
                  group-hover:text-black
                "
              >
                ↗
              </span>
            </div>
          </Link>

          {/* Decorative frame */}

          <motion.div
            variants={itemVariants}
            className="
              pointer-events-none
              absolute
              -bottom-3
              -right-3
              -z-10
              h-full
              w-full
              rounded-2xl
              border
              border-[#C19A6B]/25
            "
          />
        </motion.div>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <motion.div variants={containerVariants} className="w-full">
          {/* Eyebrow */}

          <motion.div
            variants={itemVariants}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-px w-7 bg-[#C19A6B] sm:w-9" />

            <span
              className="
                text-[9px]
                font-medium
                uppercase
                tracking-[0.32em]
                text-[#C19A6B]
                sm:text-[10px]
              "
            >
              Why ThreadCraft
            </span>
          </motion.div>

          {/* Heading */}

          <motion.h2
            variants={itemVariants}
            className="
              max-w-xl
              text-[2.6rem]
              font-light
              uppercase
              leading-[0.95]
              tracking-[-0.045em]
              text-white
              sm:text-5xl
              md:text-6xl
              lg:text-[4.2rem]
            "
          >
            Made for
            <span className="block text-[#C19A6B]">the way you live.</span>
          </motion.h2>

          {/* Intro */}

          <motion.p
            variants={itemVariants}
            className="
              mt-6
              max-w-lg
              text-sm
              leading-7
              text-white/45
              sm:text-base
              sm:leading-8
            "
          >
            ThreadCraft brings together considered design, quality materials,
            and timeless style to create pieces you'll want to wear again and
            again.
          </motion.p>

          {/* =================================================
              REASONS
          ================================================== */}

          <motion.div
            variants={containerVariants}
            className="
              mt-9
              grid
              grid-cols-1
              gap-x-8
              gap-y-0
              sm:grid-cols-2
            "
          >
            {reasons.map((reason) => {
              const Icon = reason.icon;

              return (
                <motion.div
                  key={reason.title}
                  variants={itemVariants}
                  className="
                    group
                    border-t
                    border-white/[0.08]
                    py-5
                    transition-colors
                    duration-500
                    hover:border-[#C19A6B]/40
                  "
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#C19A6B]/25
                        text-[#C19A6B]
                        transition-all
                        duration-500
                        group-hover:border-[#C19A6B]
                        group-hover:bg-[#C19A6B]
                        group-hover:text-black
                      "
                    >
                      <Icon size={14} strokeWidth={1.5} />
                    </div>

                    {/* Content */}

                    <div>
                      <h3
                        className="
                          text-[10px]
                          font-medium
                          uppercase
                          tracking-[0.18em]
                          text-white
                          sm:text-xs
                        "
                      >
                        {reason.title}
                      </h3>

                      <p
                        className="
                          mt-2
                          max-w-xs
                          text-[11px]
                          leading-5
                          text-white/35
                          sm:text-xs
                          sm:leading-6
                        "
                      >
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom Detail */}

          <motion.div
            variants={itemVariants}
            className="
              mt-7
              flex
              items-center
              gap-4
            "
          >
            <span className="h-px w-10 bg-[#C19A6B]/40" />

            <span
              className="
                text-[8px]
                uppercase
                tracking-[0.3em]
                text-white/25
                sm:text-[9px]
              "
            >
              The ThreadCraft Standard
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WhyChoose;
