import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";

import ProductCard from "../../Components/Product/ProductCard";
import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";
import { useProducts } from "../../Context/ProductContext";
import Seo from "../../Components/SEO/Seo";

const PRODUCTS_PER_PAGE = 30;

const CategoryPage = () => {
  const { products = [] } = useProducts();
  const { categoryName } = useParams();

  const [currentPage, setCurrentPage] = useState(1);

  // ============================================================
  // CATEGORY
  // ============================================================

  const normalizedCategory = categoryName
    ?.replace(/-/g, " ")
    .trim()
    .toLowerCase();

  const categoryProducts = useMemo(() => {
    if (!normalizedCategory) return [];

    return products.filter(
      (product) =>
        product.category?.trim().toLowerCase() === normalizedCategory,
    );
  }, [products, normalizedCategory]);

  const formattedCategory = normalizedCategory
    ? normalizedCategory.replace(/\b\w/g, (char) => char.toUpperCase())
    : "Collection";

  // ============================================================
  // PAGINATION
  // ============================================================

  const totalPages = Math.ceil(categoryProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

    return categoryProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [categoryProducts, currentPage]);

  // ============================================================
  // RESET PAGE WHEN CATEGORY CHANGES
  // ============================================================

  useEffect(() => {
    setCurrentPage(1);
  }, [normalizedCategory]);

  // ============================================================
  // PAGE CHANGE
  // ============================================================

  const handlePageChange = (page) => {
    setCurrentPage(page);

    // Scroll back to the top of the product section
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <>
      <Seo
        title={`${formattedCategory} | ThreadCraft`}
        description={`Explore stylish ${formattedCategory.toLowerCase()} at ThreadCraft. Discover comfortable and versatile designs for everyday wear.`}
        canonical={`https://thread-craft-mu.vercel.app/category/${categoryName}`}
      />

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="
        min-h-screen
        px-4
        pb-20
        pt-20
        lg:pt-24
        sm:px-6
        lg:px-8
        
      "
      >
        <div className="mx-auto max-w-7xl">
          {/* ====================================================== */}
          {/* BREADCRUMB */}
          {/* ====================================================== */}

          <motion.nav
            variants={itemVariants}
            aria-label="Breadcrumb"
            className="
            mb-4 md:mb-6
            flex
            items-center
            gap-2
            text-[10px]
            uppercase
            tracking-[0.15em]
            sm:text-xs
          "
          >
            <Link
              to="/"
              className="
              text-gray-500
              transition-colors
              duration-300
              hover:text-[#C19A6B]
            "
            >
              Home
            </Link>

            <FiChevronRight size={13} className="text-gray-700" />

            <Link
              to="/collections"
              className="
              text-gray-500
              transition-colors
              duration-300
              hover:text-[#C19A6B]
            "
            >
              Shop
            </Link>

            <FiChevronRight size={13} className="text-gray-700" />

            <span className="text-[#C19A6B]">{formattedCategory}</span>
          </motion.nav>

          {/* ====================================================== */}
          {/* CATEGORY HERO */}
          {/* ====================================================== */}

          <motion.header
            variants={itemVariants}
            className="
            mb-4 md:mb-6
            border-b
            border-white/[0.08]
            pb-8
           
          "
          >
            <div
              className="
              flex
              flex-col
              gap-2 sm:mt-4
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
            >
              <div>
                <p
                  className="
                  mb-2
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.35em]
                  text-[#C19A6B]
                  sm:text-[10px]
                "
                >
                  ThreadCraft Collection
                </p>

                <h1
                  className="
                  text-3xl
                  font-medium
                  capitalize
                  tracking-[-0.03em]
                  text-white
                  sm:text-4xl
                  md:text-5xl
                  lg:text-6xl
                "
                >
                  {formattedCategory}
                </h1>

                <p
                  className="
                  mt-0.5 md:mt-1
                  max-w-xl
                  text-xs
                  leading-relaxed
                  text-gray-500
                  sm:text-sm
                "
                >
                  (Discover thoughtfully designed pieces made for your everyday
                  style.)
                </p>
              </div>

              {/* Product Count */}

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="text-[#C19A6B]">
                  {categoryProducts.length}
                </span>
                {categoryProducts.length === 1 ? "Product" : "Products"}
              </div>
            </div>
          </motion.header>

          {/* ====================================================== */}
          {/* TOOLBAR */}
          {/* ====================================================== */}

          {categoryProducts.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="
              mb-7
              flex
              items-center
              justify-between
              border-b
              border-white/[0.06]
              pb-4
            "
            >
              <p
                className="
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-gray-500
              "
              >
                {formattedCategory} Collection
              </p>

              <p
                className="
                text-[10px]
                uppercase
                tracking-[0.15em]
                text-gray-600
              "
              >
                Page {currentPage} of {totalPages}
              </p>
            </motion.div>
          )}

          {/* ====================================================== */}
          {/* PRODUCTS */}
          {/* ====================================================== */}

          {categoryProducts.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="
              flex
              min-h-[360px]
              items-center
              justify-center
              rounded-2xl
              border
              border-white/[0.06]
              bg-white/[0.015]
              px-6
              text-center
            "
            >
              <div className="max-w-sm">
                <p
                  className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#C19A6B]
                "
                >
                  Coming Soon
                </p>

                <h2
                  className="
                  mt-3
                  text-xl
                  font-medium
                  text-gray-200
                "
                >
                  Nothing here yet
                </h2>

                <p
                  className="
                  mt-2
                  text-xs
                  leading-relaxed
                  text-gray-500
                  sm:text-sm
                "
                >
                  We don't have any products in this collection yet. Explore our
                  other collections instead.
                </p>

                <Link
                  to="/shop"
                  className="
                  mt-6
                  inline-flex
                  border-b
                  border-[#C19A6B]
                  pb-1
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  text-[#C19A6B]
                  transition-opacity
                  duration-300
                  hover:opacity-70
                "
                >
                  Explore Shop
                </Link>
              </div>
            </motion.div>
          ) : (
            <>
              {/* ================================================== */}
              {/* PRODUCT GRID */}
              {/* ================================================== */}

              <motion.div
                variants={containerVariants}
                className="
                grid
                grid-cols-2
                gap-x-3
                gap-y-9
                sm:grid-cols-3
                sm:gap-x-5
                sm:gap-y-12
                lg:grid-cols-4
                lg:gap-x-6
                lg:gap-y-14
                xl:grid-cols-5
              "
              >
                {paginatedProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    variants={itemVariants}
                    className="min-w-0"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>

              {/* ================================================== */}
              {/* PAGINATION */}
              {/* ================================================== */}

              {totalPages > 1 && (
                <motion.div
                  variants={itemVariants}
                  className="
                  mt-16
                  flex
                  items-center
                  justify-center
                  gap-2
                  sm:mt-20
                "
                >
                  {/* PREVIOUS */}

                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="
                    px-3
                    py-2
                    text-[9px]
                    uppercase
                    tracking-[0.15em]
                    text-gray-500
                    transition-colors
                    duration-300
                    hover:text-[#C19A6B]
                    disabled:cursor-not-allowed
                    disabled:opacity-20
                    sm:px-4
                    sm:text-[10px]
                  "
                  >
                    Previous
                  </button>

                  {/* PAGE NUMBERS */}

                  <div className="flex items-center gap-1">
                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1,
                    ).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => handlePageChange(page)}
                        className={`
                        flex
                        h-8
                        min-w-8
                        items-center
                        justify-center
                        rounded-full
                        text-[10px]
                        transition-all
                        duration-300
                        sm:h-9
                        sm:min-w-9
                        sm:text-xs
                        ${
                          currentPage === page
                            ? "bg-[#C19A6B] text-black"
                            : "text-gray-500 hover:bg-white/5 hover:text-white"
                        }
                      `}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* NEXT */}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="
                    px-3
                    py-2
                    text-[9px]
                    uppercase
                    tracking-[0.15em]
                    text-gray-500
                    transition-colors
                    duration-300
                    hover:text-[#C19A6B]
                    disabled:cursor-not-allowed
                    disabled:opacity-20
                    sm:px-4
                    sm:text-[10px]
                  "
                  >
                    Next
                  </button>
                </motion.div>
              )}

              {/* ================================================== */}
              {/* PAGINATION INFO */}
              {/* ================================================== */}

              {totalPages > 1 && (
                <p
                  className="
                  mt-4
                  text-center
                  text-[9px]
                  uppercase
                  tracking-[0.15em]
                  text-gray-600
                "
                >
                  Showing {(currentPage - 1) * PRODUCTS_PER_PAGE + 1}
                  {" – "}
                  {Math.min(
                    currentPage * PRODUCTS_PER_PAGE,
                    categoryProducts.length,
                  )}{" "}
                  of {categoryProducts.length} products
                </p>
              )}
            </>
          )}
        </div>
      </motion.main>
    </>
  );
};

export default CategoryPage;
