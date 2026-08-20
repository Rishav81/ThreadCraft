import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";
const WomenCategories = ({ product = [] }) => {
  const uniqueCategories = product
    .filter(
      (item, index, self) =>
        index === self.findIndex((p) => p.category === item.category),
    )
    .map((category) => ({
      ...category,
      itemCount: product.filter((item) => item.category === category.category)
        .length,
    }));
  if (uniqueCategories.length === 0) {
    return null;
  }
  return (
    <motion.section
      variants={containerVariants}
      className=" pt-6  px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.3,
        }}
        className=" max-w-7xl mx-auto "
      >
        {/* Categories Content */}
        <div className="mb-4">
          <motion.h2
            variants={itemVariants}
            className="mt-3 uppercase tracking-[0.4em] text-[#C19A6B] text-xs md:text-lg font-semibold"
          >
            Find Your
            <span className="text-[#C19A6B]"> Signature Style</span>
          </motion.h2>
        </div>

        {/* Cards */}
        <motion.div
          variants={itemVariants}
          className="
            flex
            gap-6
            overflow-x-auto
           
            scrollbar-hide
            pb-3
          "
        >
          {uniqueCategories.map((category) => (
            <Link
              key={category._id}
              to={`/category/${category.category.toLowerCase()}`}
              className="
                relative
                min-w-[250px]
                h-[350px]
               
                rounded-[32px]
                overflow-hidden
                group
                cursor-pointer
                
                
                transition-all
                duration-500
              "
            >
              {/* Image */}
              <img
                src={category.images?.[0]?.url}
                alt={category.name}
                loading="lazy"
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/30 to-transparent" />

              {/* Content */}
              <div
                className="
                  absolute
                  bottom-8
                  left-8
                  right-8
                  transition-all
                  duration-500
                  group-hover:scale-102
                "
              >
                <motion.p
                  variants={itemVariants}
                  className="uppercase text-sm tracking-tight text-white/70"
                >
                  Premium Collection
                </motion.p>

                <motion.h3
                  variants={itemVariants}
                  className=" text-2xl font-bold text-white line-clamp-1"
                >
                  {category.name}
                </motion.h3>
                <motion.span
                  variants={itemVariants}
                  className=" text-sm tracking-tight text-white/70"
                >
                  {" "}
                  ({category.itemCount} Items)
                </motion.span>
              </div>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default WomenCategories;
