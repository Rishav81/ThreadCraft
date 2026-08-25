import { motion } from "framer-motion";

import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";
import CategoryCard from "../../Components/Category/CategoryCrad";

const KidsCategories = ({ product = [] }) => {
  const categoryMap = new Map();

  product.forEach((item) => {
    if (!item.category) return;

    if (!categoryMap.has(item.category)) {
      categoryMap.set(item.category, {
        ...item,
        itemCount: 1,
      });
    } else {
      categoryMap.get(item.category).itemCount += 1;
    }
  });

  const uniqueCategories = Array.from(categoryMap.values());

  if (!uniqueCategories.length) {
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

        <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
          <p
            className="
              mb-2
              text-[9px]
              font-medium
              uppercase
              tracking-[0.25em]
              text-[#C19A6B]
              sm:text-[10px]
              md:text-xs
            "
          >
            Explore the collection
          </p>

          <h2
            className="
              text-xl
              font-medium
              tracking-tight
              text-white
              sm:text-2xl
              md:text-3xl
              lg:text-4xl
            "
          >
            Find Your <span className="text-[#C19A6B]">Signature Style</span>
          </h2>
        </motion.div>

        {/* ================= CATEGORY CARDS ================= */}

        <motion.div
          variants={containerVariants}
          className="
            flex
            gap-4
            overflow-x-auto
            pb-4
            scrollbar-hide
            sm:gap-5
            lg:grid
            lg:grid-cols-4
            lg:gap-5
            lg:overflow-visible
            lg:pb-0
          "
        >
          {uniqueCategories.map((category) => (
            <motion.div
              key={category.category}
              variants={itemVariants}
              className="
                min-w-[220px]
                flex-1
                sm:min-w-[250px]
                lg:min-w-0
              "
            >
              <CategoryCard
                category={category}
                itemCount={category.itemCount}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default KidsCategories;
