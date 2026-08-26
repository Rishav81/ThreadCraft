import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiShoppingBag,
  FiMinus,
  FiPlus,
  FiChevronDown,
  FiHeart,
} from "react-icons/fi";

import { useProducts } from "../../Context/ProductContext";
import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";
import { useAuthModal } from "../../Context/AuthModelContext";
// import { useBuyNow } from "../../Context/BuyNowContext";
import { useWishlist } from "../../Context/WishListContext";
import Seo from "../../Components/SEO/Seo";

const ProductDetails = () => {
  const { id } = useParams();

  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { openLoginModal } = useAuthModal();
  // const { setBuyNow } = useBuyNow();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const [addingToCart, setAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  const navigate = useNavigate();

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }
    if (!selectedSize) {
      setCartMessage("Please select a size.");
      return;
    }

    if (!selectedSize || product.stock <= 0) {
      return;
    }

    navigate("/checkout", {
      state: {
        mode: "buyNow",
        product,
        size: selectedSize,
        quantity,
      },
    });
  };
  // =========================
  // FIND PRODUCT
  // =========================

  const product = products.find((item) => item._id === id);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#0B0B0B] px-6 text-white">
        <p className="text-sm text-white/50">Loading product...</p>
      </section>
    );
  }

  // =========================
  // PRODUCT NOT FOUND
  // =========================

  if (!product) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#0B0B0B] px-6 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-medium">Product not found</h2>

          <p className="mt-2 text-sm text-white/50">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </section>
    );
  }

  // =========================
  // PRODUCT DATA
  // =========================

  const images = product.images || [];

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: images.map((image) => image.url),
    sku: product.sku || product._id,
    brand: {
      "@type": "Brand",
      name: product.brand || "ThreadCraft",
    },
    category: `${product.gender || ""} ${product.category || ""}`.trim(),

    offers: {
      "@type": "Offer",
      url: `https://thread-craft-mu.vercel.app/products/${product._id}`,
      priceCurrency: "INR",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },

    ...(product.rating > 0 &&
      product.reviews > 0 && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviews,
        },
      }),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://thread-craft-mu.vercel.app/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.gender,
        item: `https://thread-craft-mu.vercel.app/${product.gender?.toLowerCase()}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.category,
        item: `https://thread-craft-mu.vercel.app/category/${product.category
          ?.toLowerCase()
          .replace(/\s+/g, "-")}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: `https://thread-craft-mu.vercel.app/products/${product._id}`,
      },
    ],
  };

  // =========================
  // QUANTITY
  // =========================

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }

    if (!selectedSize) {
      setCartMessage("Please select a size.");
      return;
    }

    if (product.stock <= 0) {
      setCartMessage("This product is out of stock.");
      return;
    }

    try {
      setAddingToCart(true);
      setCartMessage("");

      await addToCart(product, selectedSize, quantity);

      setAddedToCart(true);
      setCartMessage("Product added to cart.");
    } catch (error) {
      setCartMessage(
        error.response?.data?.message || "Unable to add product to cart.",
      );
    } finally {
      setAddingToCart(false);
    }
  };

  const handleWishlist = async () => {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }

    try {
      if (isInWishlist(product._id)) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product._id);
      }
    } catch (error) {
      console.error("Wishlist Error:", error);
    }
  };

  return (
    <>
      <Seo
        title={`${product.name} | ${product.brand || "ThreadCraft"}`}
        description={`Shop ${product.name} for ${product.gender || "everyone"} at ThreadCraft. ${
          product.description
        } Available in ${product.sizes?.join(", ") || "multiple sizes"} at ₹${product.price?.toLocaleString("en-IN")}.`}
        canonical={`https://thread-craft-mu.vercel.app/products/${product._id}`}
      />
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <main className="mt-20 px-4 text-white lg:mt-28 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* ================= BREADCRUMB ================= */}

          <div className="mb-4 flex items-center gap-2 overflow-hidden text-xs uppercase text-white/40 md:mb-8 md:tracking-[0.2em]">
            <Link to="/" className="shrink-0 hover:text-[#C19A6B]">
              Home
            </Link>

            <span>/</span>

            <Link
              to={`/${product.gender?.toLowerCase()}`}
              className="shrink-0 hover:text-[#C19A6B]"
            >
              {product.gender}
            </Link>

            <span>/</span>

            <Link
              to={`/category/${product.category?.toLowerCase().replace(/\s+/g, "-")}`}
              className="shrink-0 hover:text-[#C19A6B]"
            >
              {product.category}
            </Link>

            <span>/</span>

            <span className="truncate text-[#C19A6B]">{product.name}</span>
          </div>

          <div className="grid gap-2 md:gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            {/* ================= IMAGES ================= */}

            <div className="grid gap-4 sm:grid-cols-[90px_1fr]">
              {/* Thumbnails */}

              <div className="order-2 flex gap-3 overflow-x-auto sm:order-1 sm:flex-col">
                {images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`h-18 w-16 shrink-0 overflow-hidden rounded-2xl border transition md:h-24 md:w-20 ${
                      selectedImage === index
                        ? "border-[#C19A6B]"
                        : "border-white/10"
                    }`}
                  >
                    <img
                      src={images[selectedImage]?.url}
                      alt={`${product.name} - ThreadCraft`}
                      loading="lazy"
                      fetchPriority="high"
                      decoding="async"
                      className="aspect-[4/5] w-full rounded-2xl object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}

              <motion.div
                key={selectedImage}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                className="order-1 relative overflow-hidden sm:order-2"
              >
                {images.length > 0 && (
                  <>
                    <img
                      src={images[selectedImage]?.url}
                      alt={product.name}
                      className="aspect-[4/5] w-full rounded-2xl object-cover"
                    />

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={handleWishlist}
                      aria-label={
                        isInWishlist(product._id)
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                      className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition duration-300 hover:border-[#C19A6B] hover:bg-black/70"
                    >
                      <FiHeart
                        size={20}
                        className={
                          isInWishlist(product._id)
                            ? "fill-[#C19A6B] text-[#C19A6B]"
                            : "text-white"
                        }
                      />
                    </button>
                  </>
                )}
              </motion.div>
            </div>

            {/* ================= PRODUCT INFORMATION ================= */}

            <div className="flex flex-col py-2 lg:py-8">
              {/* Brand */}

              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#C19A6B]">
                {product.brand}
              </p>

              {/* Name */}

              <h1 className="text-2xl font-medium tracking-wide lg:mt-4 sm:text-4xl">
                {product.name}
              </h1>

              {/* SKU */}

              {product.sku && (
                <p className="mt-2 text-xs text-white/30">SKU: {product.sku}</p>
              )}

              {/* Rating */}

              <div className="mt-2 flex items-center gap-3 border-b border-white/10 pb-6 lg:mt-5">
                <span className="text-sm tracking-widest text-[#C19A6B]">
                  ★★★★★
                </span>

                <span className="text-xs text-white/40">
                  {product.rating || 0} · {product.reviews || 0} Reviews
                </span>
              </div>

              {/* Price */}

              <div className="mt-2 flex items-center gap-4 lg:mt-6">
                <span className="text-2xl font-medium">
                  ₹{product.price?.toLocaleString("en-IN")}
                </span>

                {product.oldPrice && (
                  <span className="text-sm text-white/30 line-through">
                    ₹{product.oldPrice?.toLocaleString("en-IN")}
                  </span>
                )}

                {discount > 0 && (
                  <span className="text-xs text-[#C19A6B]">
                    {discount}% OFF
                  </span>
                )}
              </div>

              {/* Description */}

              <div className="mt-2 max-w-xl lg:mt-6">
                <p
                  className={`text-sm text-white/55 ${
                    !showFullDescription ? "line-clamp-1" : ""
                  }`}
                >
                  {product.description}
                </p>

                <button
                  type="button"
                  onClick={() => setShowFullDescription((prev) => !prev)}
                  className="text-xs font-medium text-[#C19A6B]"
                >
                  {showFullDescription ? "Show Less" : "Read More"}
                </button>
              </div>

              {/* ================= SIZE ================= */}

              <div className="mt-8">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em]">
                    Select Size
                  </p>

                  <button type="button" className="text-xs text-[#C19A6B]">
                    Size Guide
                  </button>
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setSelectedSize(size);
                        setCartMessage("");
                      }}
                      className={`h-11 border text-xs transition ${
                        selectedSize === size
                          ? "border-[#C19A6B] bg-[#C19A6B] text-black"
                          : "border-white/15 text-white/70 hover:border-[#C19A6B]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* ================= QUANTITY ================= */}

              <div className="mt-8">
                <p className="mb-4 text-xs uppercase tracking-[0.2em]">
                  Quantity
                </p>

                <div className="flex h-12 w-36 items-center justify-between border border-white/15">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="flex h-full w-10 items-center justify-center text-white/60 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <FiMinus size={14} />
                  </button>

                  <span className="text-sm">{quantity}</span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                    className="flex h-full w-10 items-center justify-center text-white/60 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>

                <p className="mt-3 text-xs text-white/30">
                  {product.stock > 0
                    ? `${product.stock} items available`
                    : "Out of stock"}
                </p>
              </div>

              {/* ================= ACTIONS ================= */}

              <div className="mt-8 flex flex-col gap-3 md:flex-row">
                {!addedToCart ? (
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={
                      !selectedSize || product.stock <= 0 || addingToCart
                    }
                    className="flex flex-1 items-center justify-center gap-3 rounded bg-[#C19A6B] py-3 text-sm font-medium uppercase tracking-[0.15em] text-black transition hover:bg-[#d0aa7b] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FiShoppingBag />

                    {addingToCart ? "Adding..." : "Add to Cart"}
                  </button>
                ) : (
                  <Link
                    to="/cart"
                    className="flex flex-1 items-center justify-center gap-3 rounded bg-[#C19A6B] py-3 text-sm font-medium uppercase tracking-[0.15em] text-black transition hover:bg-[#d0aa7b] active:scale-[0.98]"
                  >
                    <FiShoppingBag />
                    Go to Cart
                  </Link>
                )}

                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={!selectedSize || product.stock <= 0}
                  className="
    flex flex-1 items-center justify-center
    rounded border border-[#C19A6B]
    py-3
    text-sm font-medium uppercase tracking-[0.15em]
    text-[#C19A6B]
    transition
    hover:bg-[#C19A6B]
    duration-500
    hover:text-black
    disabled:cursor-not-allowed
    disabled:opacity-40
  "
                >
                  Buy Now
                </button>
              </div>

              {/* Cart message */}

              {cartMessage && (
                <p
                  className={`mt-3 text-xs ${
                    cartMessage.includes("added")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {cartMessage}
                </p>
              )}

              {/* ================= PRODUCT INFORMATION ================= */}

              <div className="mt-10 border-t border-white/10">
                <details className="group border-b border-white/10 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm">
                    Product Information
                    <FiChevronDown className="transition group-open:rotate-180" />
                  </summary>

                  <div className="mt-5 grid grid-cols-2 gap-y-4 text-xs text-white/45">
                    <span>Material</span>

                    <span className="text-right text-white/70">
                      {product.material || "Premium Fabric"}
                    </span>

                    <span>Fit</span>

                    <span className="text-right text-white/70">
                      {product.fit || "Regular"}
                    </span>

                    <span>Occasion</span>

                    <span className="text-right text-white/70">
                      {product.occasion || "Casual"}
                    </span>

                    <span>Gender</span>

                    <span className="text-right text-white/70">
                      {product.gender}
                    </span>
                  </div>
                </details>

                {/* Shipping */}

                <details className="group border-b border-white/10 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm">
                    Shipping & Returns
                    <FiChevronDown className="transition group-open:rotate-180" />
                  </summary>

                  <p className="mt-5 text-sm leading-7 text-white/45">
                    Free shipping on eligible orders. Easy returns within the
                    applicable return window.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductDetails;
