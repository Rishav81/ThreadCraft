import { motion } from "framer-motion";
import { FiCheck, FiHeart, FiLayers, FiShield } from "react-icons/fi";

import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";
import { Link } from "react-router-dom";

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
        amount: 0.2,
      }}
      className="
        relative
        mx-auto
        max-w-7xl
        overflow-hidden
        px-5
        pb-16
        sm:px-6
     
        lg:px-8
       
      "
    >
      <div
        className="
          grid
          items-center
          gap-12
          lg:grid-cols-2
          lg:gap-16
          xl:gap-20
        "
      >
        {/* =================================================
            IMAGE
        ================================================== */}

        <motion.div
          variants={itemVariants}
          initial={{ opacity: 0, x: -60, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.9,
            ease: premiumEase,
          }}
          className="relative"
        >
          <Link
            to="/women"
            className="group relative overflow-hidden rounded-2xl"
          >
            <motion.img
              src="/Images/heroBanner.webp"
              alt="ThreadCraft premium clothing"
              loading="lazy"
              decoding="async"
              whileHover={{ scale: 1.035 }}
              transition={{
                duration: 0.8,
                ease: premiumEase,
              }}
              className="
                h-[420px]
                w-full
                object-cover
                object-[_top]
                sm:h-[520px]
                lg:h-[620px]
              "
            />

            {/* Image Overlay */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-t
                from-black/40
                via-black/20
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
                  uppercase
                  tracking-[0.35em]
                  text-white/70
                  sm:text-[10px]
                "
              >
                Designed for everyday living
              </span>
            </div>
          </Link>

          {/* Decorative Border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              ease: premiumEase,
            }}
            className=" hidden lg:block
              pointer-events-none
              absolute
              -bottom-3
              -right-3
              -z-10
              h-full
              w-full
              rounded-2xl
              border
              border-[#C19A6B]/30
            "
          />
        </motion.div>

        {/* =================================================
            CONTENT
        ================================================== */}

        <motion.div variants={containerVariants} className="w-full">
          {/* Label */}
          <motion.div
            variants={itemVariants}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-[#C19A6B]" />

            <span
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.35em]
                text-[#C19A6B]
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
              text-4xl
              font-light
              uppercase
              leading-[0.95]
              tracking-[-0.03em]
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
              max-w-xl
              text-sm
              leading-7
              text-white/50
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
              mt-10
              grid
              grid-cols-1
              gap-x-8
              gap-y-7
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
                    border-white/10
                    pt-5
                  "
                >
                  {/* Icon + Title */}
                  <div className="flex items-center gap-3">
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
                        border-[#C19A6B]/30
                        text-[#C19A6B]
                        transition-all
                        duration-300
                        group-hover:border-[#C19A6B]
                        group-hover:bg-[#C19A6B]
                        group-hover:text-black
                      "
                    >
                      <Icon size={15} />
                    </div>

                    <h3
                      className="
                        text-xs
                        font-medium
                        uppercase
                        tracking-[0.18em]
                        text-white
                      "
                    >
                      {reason.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    className="
                      mt-3
                      pl-12
                      text-xs
                      leading-6
                      text-white/40
                    "
                  >
                    {reason.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom Detail */}
          <motion.div
            variants={itemVariants}
            className="
              mt-10
              flex
              items-center
              gap-4
            "
          >
            <span className="h-px w-12 bg-[#C19A6B]/50" />

            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-white/30
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
