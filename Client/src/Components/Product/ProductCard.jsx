import { memo } from "react";
import { FaStar } from "react-icons/fa";

import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <Link
      to={`/products/${product._id}`}
      className="group w-full  rounded-2xl pb-2 transition-all duration-500 hover:bg-[#e3e3e3]"
    >
      {/* ================= IMAGE ================= */}

      <div className="relative overflow-hidden rounded-xl">
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* ================= PRODUCT DETAILS ================= */}

      <div className="mb-2 mt-2 space-y-1">
        {/* Category */}

        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
          {product.category}
        </p>

        {/* Product Name */}

        <h3
          className="
            line-clamp-1
            text-sm font-semibold
            tracking-tight text-[#d0cece]
            transition-colors duration-500
            group-hover:text-[#C19A6B]
            md:text-lg
          "
        >
          {product.name}
        </h3>

        {/* Rating */}

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-yellow-400">
            <FaStar size={14} />

            <span className="text-xs font-normal text-gray-500 md:text-sm">
              {product.rating || "4.8"}
            </span>
          </div>

          <span className="text-xs text-gray-500 md:text-sm">
            ({product.stock || 120})
          </span>
        </div>

        {/* Price */}

        <div className="flex items-center gap-1 md:gap-2 lg:gap-3">
          <span className="text-xs font-semibold text-[#C19A6B] md:text-lg lg:text-xl">
            ₹{product.price?.toLocaleString("en-IN")}
          </span>

          {product.oldPrice && (
            <span className="text-xs text-gray-500 line-through md:text-sm">
              ₹{product.oldPrice?.toLocaleString("en-IN")}
            </span>
          )}

          {discount > 0 && (
            <span className="text-[8px] text-[#C19A6B] md:text-[10px] lg:text-[12px]">
              {discount}% Off
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default memo(ProductCard);
