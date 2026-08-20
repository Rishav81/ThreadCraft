import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";

const Categories = ({ product = [] }) => {
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
        amount: 0.3,
      }}
      className="relative pt-6 px-4 sm:px-6 lg:px-8 "
    >
      <div className="relative max-w-7xl mx-auto ">
        <motion.div className="mb-4">
          <motion.p
            variants={itemVariants}
            className="uppercase tracking-[0.4em] text-white text-xs md:text-lg font-semibold"
          >
            Curated Collections
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="
            flex
            gap-6
            overflow-x-auto
           
            scrollbar-hide
            
          "
        >
          {uniqueCategories.map((gender) => (
            <Link
              key={gender._id}
              to={`/${gender.gender.toLowerCase()}`}
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
              <motion.img
                src={gender.images?.[0]?.url}
                alt={gender.name}
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
                <motion.h3
                  variants={itemVariants}
                  className=" text-2xl font-bold text-white line-clamp-1"
                >
                  {gender.gender}
                </motion.h3>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Categories;
