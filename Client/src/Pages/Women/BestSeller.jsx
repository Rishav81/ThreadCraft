import ProductCard from "../../Components/Product/ProductCard";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";

const BestSeller = ({ product = [] }) => {
  if (product.length === 0) {
    return null;
  }
  return (
    <motion.section
      variants={containerVariants}
      className="pt-6 px-4 sm:px-6 lg:px-8  "
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.3,
        }}
        className="max-w-7xl mx-auto "
      >
        {/* Section Header */}

        <div className="mb-4">
          <motion.h2
            variants={itemVariants}
            className="mt-3 uppercase tracking-[0.4em] text-[#C19A6B] text-xs md:text-lg font-semibold "
          >
            Best Seller <span className="text-[#C19A6B]"> Collection</span>
          </motion.h2>
        </div>

        {/* Products Grid */}
        <motion.div
          variants={itemVariants}
          className="overflow-x-auto scrollbar-hide mt-5"
        >
          <div className="flex gap-2">
            {product.map((product) => (
              <div
                key={product._id}
                className="
          shrink-0
          basis-1/3
          md:basis-1/5
          lg:basis-1/5
        "
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default BestSeller;
