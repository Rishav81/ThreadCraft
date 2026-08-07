import { memo } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;
  return (
    <Link
      to={`/product/${product._id}`}
      className="group w-full cursor-pointer hover:bg-[#e3e3e3]  transition-all duration-500 rounded-2xl pb-2"
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded">
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />

        {/* Wishlist */}
        <button
          className="
            absolute top-4 right-4
            flex h-6 w-6 items-center justify-center
            rounded-full bg-white/30 text-black
            opacity-0
            translate-y-2
            transition-all duration-300
            group-hover:opacity-100
            group-hover:translate-y-0
            hover:bg-[#C19A6B]
            hover:text-white
            
          "
        >
          <FaRegHeart size={12} />
        </button>

        {/* Add To Cart */}
        <button
          className="
            absolute bottom-4 left-1/2
            flex -translate-x-1/2 translate-y-6
            items-center justify-center gap-2
            rounded-xl bg-[#C19A6B]
            px-5 py-2
            text-sm font-medium text-white
            opacity-0
            w-[60%] 
            transition-all duration-500
            group-hover:translate-y-0
            group-hover:opacity-100
            hover:bg-white
            hover:text-black
          "
        >
          <HiOutlineShoppingBag size={18} />
          Add to Cart
        </button>
      </div>

      {/* Product Details */}
      <div className="mt-2 mb-2 px-2 space-y-1">
        {/* Category */}
        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="line-clamp-1 text-sm md:text-lg font-semibold text-[#d0cece] transition-colors duration-500 group-hover:text-[#C19A6B] tracking-tight ">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-yellow-400">
            <FaStar size={14} />
            <span className="text-xs md:text-sm  font-base text-gray-500">
              {product.rating || "4.8"}
            </span>
          </div>

          <span className="text-xs md:text-sm  text-gray-500">
            ({product.stock || 120})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-1 md:gap-2 lg:gap-3">
          <span className="text-xs md:text-lg lg:text-xl font-semibold text-[#C19A6B]">
            ₹{product.price}
          </span>

          {product.oldPrice && (
            <span className="text-xs md:text-sm   text-gray-500 line-through">
              ₹{product.oldPrice}
            </span>
          )}

          <span className=" text-xs md:text-sm  text-gray-500 ">
            ({discount}%)
          </span>
        </div>
      </div>
    </Link>
  );
};

export default memo(ProductCard);
