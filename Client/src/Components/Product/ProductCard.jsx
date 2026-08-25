import { memo } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const ProductCard = ({ product }) => {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      className="h-full"
    >
      <Link
        to={`/products/${product._id}`}
        className="
          group
          block
          h-full
          w-full
          overflow-hidden
          rounded
          border
          border-transparent
          transition-all
          duration-300
          hover:border-[#C19A6B]/20
        "
      >
        {/* ================= IMAGE ================= */}

        <div
          className="
            relative
            aspect-[3/4]
            w-full
            overflow-hidden
            rounded
            bg-[#1a1a1a]
          "
        >
          <img
            src={product.images?.[0]?.url}
            alt={product.name}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]
              will-change-transform
              group-hover:scale-[1.04]
            "
            loading="lazy"
            decoding="async"
          />

          {/* Subtle hover overlay */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-black/0
              transition-colors
              duration-500
              group-hover:bg-black/[0.04]
            "
          />

          {/* Discount badge */}
        </div>

        {/* ================= DETAILS ================= */}

        <div className="px-0.5 pt-1 ">
          {/* Category */}

          {/* Product Name */}

          <div className="min-w-0">
            <h3
              className="
      truncate
      text-[13px]
      font-medium
      tracking-tight
      text-[#d0cece]
      transition-colors
      duration-300
      group-hover:text-[#C19A6B]
      sm:text-sm
      md:text-base
      lg:text-lg
    "
            >
              {product.name}
            </h3>

            <p
              className="
      md:mt-0.5
      truncate
      text-[10px]
      font-normal
      uppercase
      tracking-[0.14em]
      text-gray-500
      sm:text-[11px]
      md:text-xs
    "
            >
              {product.category}
            </p>
          </div>
          {/* Rating */}

          <div className="mt-0.5 flex items-center gap-2 sm::mt-2">
            <div className="flex items-center gap-1">
              <FaStar size={11} className="text-yellow-400 sm:h-3 sm:w-3" />

              <span className="text-[10px] text-gray-400 sm:text-xs">
                {product.rating || "4.8"}
              </span>
            </div>

            <span className="h-3 w-px bg-gray-700" />

            <span className="text-[10px] text-gray-500 sm:text-xs">
              {product.stock || 120} available
            </span>
          </div>

          {/* Price */}

          <div className="mt-1 flex items-baseline gap-1 whitespace-nowrap sm:mt-2 sm:gap-2">
            <span
              className="
                text-sm
                font-semibold
                tracking-tight
                text-[#C19A6B]
                sm:text-base
                md:text-lg
                lg:text-xl
              "
            >
              ₹{product.price?.toLocaleString("en-IN")}
            </span>

            {product.oldPrice && (
              <span
                className="
                  text-[10px]
                  text-gray-500
                  line-through
                  sm:text-xs
                  md:text-sm
                "
              >
                ₹{product.oldPrice?.toLocaleString("en-IN")}
              </span>
            )}

            {discount > 0 && (
              <span
                className="
                  text-[9px]
                  font-medium
                  text-[#C19A6B]
                  sm:text-[10px]
                  md:text-xs
                "
              >
                {discount}% OFF
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default memo(ProductCard);
