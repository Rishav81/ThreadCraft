import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";

const CollectionCategories = ({ product = [] }) => {
  const uniqueCategories = product
    .filter(
      (item, index, self) =>
        index === self.findIndex((p) => p.gender === item.gender),
    )
    .map((gender) => ({
      ...gender,
      itemCount: product.filter((item) => item.gender === gender.gender).length,
    }));

  if (uniqueCategories === 0) {
    return null;
  }

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      className="px-4 pt-8 sm:px-6 lg:px-8 lg:pt-14"
    >
      <div className="mx-auto max-w-7xl">
        {/* ================= HEADER ================= */}

        <motion.div variants={itemVariants} className="mb-6">
          <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-[#C19A6B]">
            Curated Collections
          </p>

          <h2 className="text-xl font-medium tracking-tight text-white sm:text-2xl md:text-3xl">
            Explore <span className="text-[#C19A6B]">Our Collections</span>
          </h2>
        </motion.div>

        {/* ================= COLLECTIONS ================= */}

        <motion.div
          variants={containerVariants}
          className="
            flex
            gap-4
            overflow-x-auto
            overscroll-x-contain
            pb-4
            scrollbar-hide
            [-webkit-overflow-scrolling:touch]
            sm:gap-5
           
          "
        >
          {uniqueCategories.map((gender) => (
            <motion.div
              key={gender._id}
              variants={itemVariants}
              className="
                w-[72vw]
                max-w-[300px]
                shrink-0
                sm:w-[42vw]
                sm:max-w-[320px]
               
              "
            >
              <Link
                to={`/${gender.gender.toLowerCase()}`}
                className="
                  group
                  relative
                  block
                  aspect-[4/5]
                  overflow-hidden
                  rounded-2xl
                  bg-[#181818]
                "
              >
                {/* ================= IMAGE ================= */}

                <motion.img
                  src={gender.images?.[0]?.url}
                  alt={`${gender.gender} collection`}
                  loading="lazy"
                  decoding="async"
                  whileHover={{ scale: 1.045 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    will-change-transform
                  "
                />

                {/* ================= OVERLAY ================= */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/75
                    via-black/15
                    to-transparent
                  "
                />

                {/* Hover Overlay */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-black/0
                    transition-colors
                    duration-500
                    group-hover:bg-black/10
                  "
                />

                {/* ================= CONTENT ================= */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    p-5
                    sm:p-6
                    lg:p-7
                  "
                >
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p
                        className="
                          mb-2
                          text-[8px]
                          uppercase
                          tracking-[0.25em]
                          text-white/50
                          sm:text-[9px]
                        "
                      >
                        Collection
                      </p>

                      <h3
                        className="
                          text-2xl
                          font-medium
                          capitalize
                          tracking-tight
                          text-white
                          transition-transform
                          duration-500
                          ease-out
                         
                          sm:text-3xl
                          lg:text-4xl
                        "
                      >
                        {gender.gender}
                      </h3>

                      <p
                        className="
                          mt-1
                          text-[10px]
                          text-white/45
                          sm:text-xs
                        "
                      >
                        {gender.itemCount}{" "}
                        {gender.itemCount === 1 ? "piece" : "pieces"}
                      </p>
                    </div>

                    {/* ================= ARROW ================= */}

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
                        border-white/20
                        text-white
                        transition-all
                        duration-500
                       
                       
                      "
                    >
                      <span
                        className="
                          text-sm
                          transition-transform
                          duration-500
                          
                        "
                      >
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CollectionCategories;
