import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiSearch } from "react-icons/fi";

import ProductCard from "../../Components/Product/ProductCard";
import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";
import { useProducts } from "../../Context/ProductContext";

const SearchPage = () => {
  const { products = [] } = useProducts();
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("q")?.trim() || "";

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];

    const query = searchQuery.toLowerCase();

    return products.filter((product) => {
      const matchesName = product.name?.toLowerCase().includes(query);
      const matchesBrand = product.brand?.toLowerCase().includes(query);
      const matchesCategory = product.category?.toLowerCase().includes(query);
      const matchesStyle = product.style?.toLowerCase().includes(query);
      const matchesMaterial = product.material?.toLowerCase().includes(query);
      const matchesOccasion = product.occasion?.toLowerCase().includes(query);
      const matchesTags = product.tags?.some((tag) =>
        tag.toLowerCase().includes(query),
      );

      return (
        matchesName ||
        matchesBrand ||
        matchesCategory ||
        matchesStyle ||
        matchesMaterial ||
        matchesOccasion ||
        matchesTags
      );
    });
  }, [products, searchQuery]);

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen px-4 pb-20 pt-20 sm:px-6 lg:px-8 "
    >
      <div className="mx-auto max-w-7xl">
        {/* ====================================================== */}
        {/* HEADER / HERO */}
        {/* ====================================================== */}
        <motion.div
          variants={itemVariants}
          className="mb-4 border-b border-white/[0.08] pb-8 sm:mb-6"
        >
          {/* Back Action */}
          <Link
            to="/collections"
            className="group mb-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-500 transition-colors duration-300 hover:text-[#C19A6B] sm:text-xs"
          >
            <FiArrowLeft
              size={13}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to Shop
          </Link>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.35em] text-[#C19A6B] sm:text-[10px]">
                Search ThreadCraft
              </p>

              {searchQuery ? (
                <h1 className="text-3xl font-medium tracking-[-0.03em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  Results for{" "}
                  <span className="text-[#C19A6B]">"{searchQuery}"</span>
                </h1>
              ) : (
                <h1 className="text-3xl font-medium tracking-[-0.03em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  Search
                </h1>
              )}

              <p className="mt-0.5 sm:mt-1 max-w-xl text-xs leading-relaxed text-gray-500 sm:text-sm">
                (
                {searchQuery
                  ? "Explore matching products curated to suit your personal aesthetic."
                  : "Discover thoughtfully designed pieces made for your everyday style."}
                )
              </p>
            </div>

            {/* Product Count Pill */}
            {searchQuery && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="text-[#C19A6B]">{searchResults.length}</span>
                {searchResults.length === 1 ? "Product" : "Products"}
              </div>
            )}
          </div>
        </motion.div>

        {/* ====================================================== */}
        {/* TOOLBAR (Active when results exist) */}
        {/* ====================================================== */}
        {searchQuery && searchResults.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="mb-7 flex items-center justify-between border-b border-white/[0.06] pb-4"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
              Keyword: <span className="text-white/80">{searchQuery}</span>
            </p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-gray-600">
              Showing all results
            </p>
          </motion.div>
        )}

        {/* ====================================================== */}
        {/* EMPTY STATES */}
        {/* ====================================================== */}
        {!searchQuery && (
          <motion.div
            variants={itemVariants}
            className="flex min-h-[360px] items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.015] px-6 text-center"
          >
            <div className="max-w-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#C19A6B]/20 bg-[#C19A6B]/10">
                <FiSearch size={20} className="text-[#C19A6B]" />
              </div>

              <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#C19A6B]">
                Discover
              </p>

              <h2 className="mt-2 text-xl font-medium text-gray-200">
                What are you looking for?
              </h2>

              <p className="mt-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
                Search for products, brands, categories, styles, or materials.
              </p>
            </div>
          </motion.div>
        )}

        {searchQuery && searchResults.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="flex min-h-[360px] items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.015] px-6 text-center"
          >
            <div className="max-w-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                <FiSearch size={20} className="text-white/40" />
              </div>

              <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#C19A6B]">
                No Results Found
              </p>

              <h2 className="mt-2 text-xl font-medium text-gray-200">
                Nothing found for "{searchQuery}"
              </h2>

              <p className="mt-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
                Try searching with a different keyword, product name, brand, or
                category.
              </p>

              <Link
                to="/collections"
                className="mt-6 inline-flex border-b border-[#C19A6B] pb-1 text-[10px] uppercase tracking-[0.2em] text-[#C19A6B] transition-opacity duration-300 hover:opacity-70"
              >
                Explore Shop
              </Link>
            </div>
          </motion.div>
        )}

        {/* ====================================================== */}
        {/* PRODUCT GRID */}
        {/* ====================================================== */}
        {searchResults.length > 0 && (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14 xl:grid-cols-5"
          >
            {searchResults.map((product) => (
              <motion.div
                key={product._id}
                variants={itemVariants}
                className="min-w-0"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.main>
  );
};

export default SearchPage;
