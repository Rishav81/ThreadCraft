import { useState } from "react";
import ProductCard from "../../Components/Product/ProductCard";
import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";
import { motion } from "framer-motion";

const CategoryArrival = ({ products = {} }) => {
  const [selectedCategory, setSelectedCategory] = useState("men");

  const currentProducts = products[selectedCategory] || [];

  return (
    <motion.section
      variants={containerVariants}
      className="px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.3,
        }}
        className="max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <div className="mb-4">
          <motion.h2
            variants={itemVariants}
            className="mt-3 uppercase tracking-[0.4em] text-[#C19A6B] text-xs md:text-lg font-semibold"
          >
            {selectedCategory} New Collection
          </motion.h2>
        </div>

        {/* Category Filter */}
        <motion.div variants={itemVariants} className="flex gap-6 mb-5">
          {["men", "women", "kids"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`uppercase text-xs md:text-sm tracking-widest hover:text-[#C19A6B]  cursor-pointer duration-300  ${
                selectedCategory === category
                  ? "text-[#C19A6B] border-b border-[#C19A6B]"
                  : "text-gray-400"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={itemVariants}
          className="overflow-x-auto scrollbar-hide mt-5"
        >
          {currentProducts.length === 0 ? (
            <div className="py-16 text-center">
              <h3 className="text-lg md:text-xl text-gray-300 font-medium">
                No New Arrivals
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                No products have been added in the last 10 days.
              </p>
            </div>
          ) : (
            <div className="flex gap-2">
              {currentProducts.map((product) => (
                <div
                  key={product._id}
                  className="shrink-0 basis-1/3 md:basis-1/5 lg:basis-1/5"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default CategoryArrival;
