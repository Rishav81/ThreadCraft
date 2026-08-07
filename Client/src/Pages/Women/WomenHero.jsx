import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";
import LazySection from "../../Components/Ui/LazySection";
import { getProducts } from "../../Data/API/productApi";
import { motion } from "framer-motion";

import { lazy, Suspense, useEffect, useState } from "react";
const WomenCategories = lazy(() => import("./WomenCategories"));
const Trending = lazy(() => import("./Trending"));
const BestSeller = lazy(() => import("./BestSeller"));
const NewArrival = lazy(() => import("./NewArrival"));
const AllProducts = lazy(() => import("./AllProducts"));

const WomenHero = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();

        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const womenProducts = products.filter(
    (product) => product.gender === "Women",
  );

  const trendingProducts = womenProducts.filter(
    (product) => product.trending === true,
  );

  const bestSellerProducts = womenProducts.filter(
    (product) => product.bestSeller === true,
  );
  const newArrivalProducts = womenProducts.filter((product) => {
    const createdDate = new Date(product.createdAt);

    const today = new Date();

    const diff = (today - createdDate) / (1000 * 60 * 60 * 24);

    return diff <= 10;
  });

  const womenCategories = womenProducts.filter((product) => product.category);

  return (
    <section className="relative overflow-hidden  bg-gradient-to-r from-black via-[#111111] to-black ">
      <section className="relative h-screen  overflow-hidden">
        {/* Background Image */}

        <motion.img
          src="/Images/Women-Hero.png"
          alt="Women Collection"
          className="absolute inset-0 h-full w-full object-cover object-center"
          animate={{
            scale: [1, 1.06, 1],
            x: [0, -18, 0],
            y: [0, 12, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Luxury Gradient */}
        <div
          className="
      absolute inset-0
      bg-gradient-to-r
      from-black/70
      via-black/40
      to-black/10
    "
        />

        {/* Content */}
        <div
          className="
      relative z-10
      flex h-full
      items-center
      max-w-7xl
      mx-auto
      px-6
    "
        >
          <motion.div
            className="max-w-3xl text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <div
              className="
        mb-6
        inline-flex
        items-center
        gap-3
        rounded-full
        border
        border-[#C19A6B]/40
        bg-white/5
        backdrop-blur-md
        px-5
        py-2
        text-xs
        uppercase
        tracking-[0.4em]
        text-[#C19A6B]
        animate-pulse
        "
            >
              <span className="h-2 w-2 rounded-full bg-[#C19A6B]" />
              Women's Collection
            </div>

            {/* Heading */}

            <motion.h1
              variants={itemVariants}
              className="
    text-5xl
    md:text-6xl
    lg:text-8xl
    font-light
    uppercase
    leading-[0.95]
    tracking-tight
    text-white
  "
            >
              Redefine
              <span className="block text-[#C19A6B]">Your Elegance</span>
            </motion.h1>
            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="
    mt-6
    max-w-xl
    text-base
    md:text-lg
    leading-relaxed
    text-gray-200
  "
            >
              Discover timeless silhouettes crafted for the modern woman.
              Premium fabrics, elegant designs, and effortless style created for
              every moment.
            </motion.p>

            {/* Buttons */}

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row gap-5"
            >
              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.2,
                }}
                className=" group relative overflow-hidden rounded-full
                bg-[#C19A6B] px-10 py-4 font-semibold text-white
                hover:text-[#C19A6B] transition "
              >
                <span className="relative z-10">Shop Collection</span>
                <span
                  className="
            absolute
            inset-0
            translate-y-full
            bg-white 
            transition
            duration-300
            group-hover:translate-y-0
            "
                />
              </motion.button>

              <motion.button
                whileHover={{
                  borderColor: "#ffffff",
                }}
                className="
          rounded-full
          border
          border-white/50
          px-10
          py-4
          text-white
          backdrop-blur-md
          transition
          hover:bg-white
          hover:text-black
          duration-300
          "
              >
                Explore Styles
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div
          className="
    absolute
    bottom-8
    left-1/2
    -translate-x-1/2
    text-white/70
    text-xs
    tracking-[0.4em]
    uppercase animate-bounce
    "
        >
          Scroll
        </div>
      </section>
      <LazySection>
        <Suspense fallback={null}>
          <WomenCategories product={womenCategories} />
          <NewArrival product={newArrivalProducts} />
          <Trending product={trendingProducts} />
          <BestSeller product={bestSellerProducts} />
          <AllProducts product={womenProducts} />
        </Suspense>
      </LazySection>
    </section>
  );
};

export default WomenHero;
