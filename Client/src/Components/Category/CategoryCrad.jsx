import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const CategoryCard = ({ category, itemCount }) => {
  return (
    <motion.div className="min-w-[220px] flex-1 sm:min-w-[250px] lg:min-w-0">
      <Link
        to={`/category/${category.category.toLowerCase()}`}
        className="
          group
          relative
          block
          aspect-[4/5]
          w-full
          overflow-hidden
          rounded-2xl
          bg-[#181818]
          sm:rounded-3xl
        "
      >
        {/* Image */}
        <img
          src={category.images?.[0]?.url}
          alt={category.category}
          loading="lazy"
          decoding="async"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
            will-change-transform
            group-hover:scale-[1.04]
          "
        />

        {/* Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/85
            via-black/25
            to-transparent
            transition-all
            duration-500
            group-hover:from-black/90
          "
        />

        {/* Label */}
        <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
          <span
            className="
              rounded-full
              border
              border-white/20
              bg-black/20
              px-3
              py-1.5
              text-[8px]
              font-medium
              uppercase
              tracking-[0.15em]
              text-white/80
              backdrop-blur-md
              sm:text-[9px]
            "
          >
            Premium Collection
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <h3
                className="
                  truncate
                  text-xl
                  font-medium
                  capitalize
                  tracking-tight
                  text-white
                  sm:text-2xl
                "
              >
                {category.category}
              </h3>

              <p
                className="
                  mt-1
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.15em]
                  text-white/60
                  sm:text-[10px]
                  md:text-xs
                "
              >
                {itemCount} {itemCount === 1 ? "Item" : "Items"}
              </p>
            </div>

            {/* Arrow */}
            <span
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
                bg-white/10
                text-white
                backdrop-blur-md
                transition-all
                duration-500
                group-hover:-translate-y-1
                group-hover:border-[#C19A6B]
                group-hover:bg-[#C19A6B]
                group-hover:text-black
              "
            >
              <FiArrowUpRight size={17} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
