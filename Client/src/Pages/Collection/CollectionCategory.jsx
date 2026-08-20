import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";

const CollectionCategory = ({ product = [] }) => {
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
      className="relative px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-7">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#C19A6B]">
            Explore
          </p>

          <h2 className="mt-2 text-2xl font-light uppercase tracking-wide text-white sm:text-3xl">
            Shop by Collection
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
            Discover thoughtfully selected pieces for every style and occasion.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          variants={itemVariants}
          className="
            flex
            gap-4
            overflow-x-auto
            pb-3
            scrollbar-hide
            sm:gap-5
            lg:grid
            lg:grid-cols-3
            lg:overflow-visible
          "
        >
          {uniqueCategories.map((category) => {
            const gender = category.gender?.toLowerCase();

            if (!gender) return null;

            return (
              <Link
                key={category._id}
                to={`/${gender}`}
                aria-label={`Explore ${category.gender} collection`}
                className="
                  group
                  relative
                  block
                  min-w-[260px]
                  overflow-hidden
                  rounded-[28px]
                  sm:min-w-[280px]
                  lg:min-w-0
                "
              >
                {/* Image */}
                <div className="relative h-[360px] overflow-hidden ">
                  <img
                    src={category.images?.[0]?.url}
                    alt={`${category.gender} collection`}
                    loading="lazy"
                    decoding="async"
                    className="
                      absolute
                      inset-0
                      lg:h-fit h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-[1.05]
                    "
                  />

                  {/* Gradient Overlay */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/85
                      via-black/20
                      to-transparent
                    "
                  />

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <h3
                      className="
                        text-2xl
                        font-semibold
                        uppercase
                        tracking-wide
                        text-white
                        transition-colors
                        duration-300
                        group-hover:text-[#C19A6B]
                      "
                    >
                      {category.gender}
                    </h3>

                    <div
                      className="
                        mt-2
                        flex
                        items-center
                        gap-2
                        text-xs
                        font-medium
                        uppercase
                        tracking-[0.2em]
                        text-white/70
                        transition-colors
                        duration-300
                        group-hover:text-[#C19A6B]
                      "
                    >
                      <span>Shop Collection</span>

                      <span
                        className="
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      >
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CollectionCategory;
