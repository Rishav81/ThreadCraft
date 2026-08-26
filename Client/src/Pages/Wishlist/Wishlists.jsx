import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiTrash2 } from "react-icons/fi";

import { useWishlist } from "../../Context/WishListContext";
import { useAuth } from "../../Context/AuthContext";
import { useAuthModal } from "../../Context/AuthModelContext";
import Seo from "../../Components/SEO/Seo";

const Wishlists = () => {
  const {
    wishlistItems,
    loading,
    fetchWishlist,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const { isAuthenticated } = useAuth();
  const { openLoginModal } = useAuthModal();

  // ============================================================
  // FETCH WISHLIST
  // ============================================================

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    }
  }, [isAuthenticated]);

  // ============================================================
  // REMOVE ITEM
  // ============================================================

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(productId);
    } catch (error) {
      console.error("Remove Wishlist Error:", error);
    }
  };

  // ============================================================
  // CLEAR WISHLIST
  // ============================================================

  const handleClearWishlist = async () => {
    try {
      await clearWishlist();
    } catch (error) {
      console.error("Clear Wishlist Error:", error);
    }
  };

  // ============================================================
  // LOGIN REQUIRED
  // ============================================================

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#0B0B0B] px-6 pt-32 text-white">
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center py-20 text-center">
          <FiHeart size={48} className="mb-6 text-[#C19A6B]" />

          <h1 className="text-3xl font-medium">Your Wishlist</h1>

          <p className="mt-3 text-sm leading-6 text-white/45">
            Login to save your favorite ThreadCraft pieces and access them
            anytime.
          </p>

          <button
            type="button"
            onClick={openLoginModal}
            className="mt-8 rounded bg-[#C19A6B] px-8 py-3 text-sm font-medium uppercase tracking-[0.15em] text-black transition hover:bg-[#d0aa7b]"
          >
            Login
          </button>
        </div>
      </main>
    );
  }

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#111111] px-4 pb-20 pt-24 text-white sm:px-6 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          {/* Header Skeleton */}

          <div className="mb-12">
            <div className="h-3 w-24 animate-pulse rounded bg-white/10" />

            <div className="mt-5 h-12 w-72 animate-pulse rounded bg-white/10" />

            <div className="mt-4 h-4 w-96 max-w-full animate-pulse rounded bg-white/10" />
          </div>

          {/* Product Skeleton */}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#111111]"
              >
                <div className="aspect-[4/5] animate-pulse bg-white/5" />

                <div className="space-y-4 p-5">
                  <div className="h-3 w-24 animate-pulse rounded bg-white/10" />

                  <div className="h-5 w-3/4 animate-pulse rounded bg-white/10" />

                  <div className="h-4 w-1/2 animate-pulse rounded bg-white/10" />

                  <div className="h-10 animate-pulse rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // ============================================================
  // EMPTY WISHLIST
  // ============================================================

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <main className="min-h-screen  px-6 pt-32 text-white">
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10">
            <FiHeart size={30} className="text-white/40" />
          </div>

          <h1 className="mt-7 text-3xl font-medium">Your Wishlist is Empty</h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-white/45">
            Save the pieces you love and come back to them whenever you're
            ready.
          </p>

          <Link
            to="/collections"
            className="mt-8 rounded bg-[#C19A6B] px-8 py-3 text-sm font-medium uppercase tracking-[0.15em] text-black transition hover:bg-[#d0aa7b]"
          >
            Explore Collection
          </Link>
        </div>
      </main>
    );
  }

  // ============================================================
  // WISHLIST
  // ============================================================

  return (
    <>
      <Seo
        title="My Wishlist Products | ThreadCraft"
        description="Manage the products you are added on wishlist on ThreadCraft."
        noindex={true}
      />
      <main className="min-h-screen  px-4 pb-20 pt-28 text-white sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* =====================================================
            HEADER
        ===================================================== */}

          <div className="mb-10 flex flex-col justify-between gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#C19A6B]">
                Your Collection
              </p>

              <h1 className="mt-3 text-3xl font-medium tracking-wide sm:text-4xl">
                My Wishlist
              </h1>

              <p className="mt-2 text-sm text-white/40">
                {wishlistItems.length}{" "}
                {wishlistItems.length === 1 ? "item" : "items"} saved
              </p>
            </div>

            <button
              type="button"
              onClick={handleClearWishlist}
              className="flex items-center gap-2 self-start text-xs uppercase tracking-[0.15em] text-white/45 transition hover:text-red-400 sm:self-auto"
            >
              <FiTrash2 size={14} />
              Clear Wishlist
            </button>
          </div>

          {/* =====================================================
            PRODUCTS
        ===================================================== */}

          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {wishlistItems.map((product) => (
              <div key={product._id} className="group relative">
                {/* =================================================
                  PRODUCT IMAGE
              ================================================= */}

                <div className="relative overflow-hidden rounded-2xl bg-[#151515]">
                  <Link to={`/products/${product._id}`}>
                    <img
                      src={product.images?.[0]?.url}
                      alt={product.name}
                      className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </Link>

                  {/* REMOVE WISHLIST */}

                  <button
                    type="button"
                    onClick={() => handleRemove(product._id)}
                    aria-label="Remove from wishlist"
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-[#C19A6B] backdrop-blur-md transition hover:border-[#C19A6B] hover:bg-black/70"
                  >
                    <FiHeart size={18} className="fill-[#C19A6B]" />
                  </button>

                  {/* DISCOUNT */}

                  {product.discount > 0 && (
                    <span className="absolute bottom-3 left-3 rounded bg-[#C19A6B] px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-black">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                {/* =================================================
                  PRODUCT DETAILS
              ================================================= */}

                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C19A6B]">
                    {product.brand}
                  </p>

                  <Link to={`/products/${product._id}`}>
                    <h2 className="mt-2 line-clamp-1 text-sm font-medium text-white transition hover:text-[#C19A6B] sm:text-base">
                      {product.name}
                    </h2>
                  </Link>

                  {/* PRICE */}

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm font-medium">
                      ₹{product.price?.toLocaleString("en-IN")}
                    </span>

                    {product.oldPrice && (
                      <span className="text-xs text-white/30 line-through">
                        ₹{product.oldPrice?.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  {/* VIEW PRODUCT */}

                  <Link
                    to={`/products/${product._id}`}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded border border-white/15 py-2.5 text-[10px] font-medium uppercase tracking-[0.15em] text-white/70 transition hover:border-[#C19A6B] hover:bg-[#C19A6B] hover:text-black"
                  >
                    <FiShoppingBag size={14} />
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Wishlists;
