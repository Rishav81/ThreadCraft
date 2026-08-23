import { Link } from "react-router-dom";
import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";
import LazySection from "../../Components/Ui/LazySection";

import { motion } from "framer-motion";

import { lazy, Suspense } from "react";
import { useProducts } from "../../Context/ProductContext";
const WomenCategories = lazy(() => import("./WomenCategories"));
const Trending = lazy(() => import("./Trending"));
const BestSeller = lazy(() => import("./BestSeller"));
const NewArrival = lazy(() => import("./NewArrival"));
const AllProducts = lazy(() => import("./AllProducts"));

const WomenHero = () => {
  const { products } = useProducts();

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
    <>
      <section className="relative h-[78vh] min-h-[620px] w-full overflow-hidden lg:h-screen ">
        {/* Background */}
        <motion.img
          src="/Images/Women-Hero.webP"
          alt="Women's Collection"
          loading="lazy"
          decoding="async"
          className="
      absolute inset-0
      h-full w-full
      object-cover
      object-[60%_center]
      md:object-center
    "
          animate={{
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main overlay */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Editorial gradient */}
        <div
          className="
      absolute inset-0
      bg-gradient-to-r
      from-black/80
      via-black/45
      to-black/10
    "
        />

        {/* Content */}
        <div
          className="
      relative z-10
      mx-auto
      flex h-full
      w-full
      max-w-7xl
      items-center
      px-6
      lg:px-10
    "
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            {/* Editorial Label */}
            <motion.div
              variants={itemVariants}
              className="
          mb-7
          flex items-center gap-3
          text-[10px]
          font-medium
          uppercase
          tracking-[0.4em]
          text-[#C19A6B]
          sm:text-xs
        "
            >
              <span className="h-px w-10 bg-[#C19A6B]" />
              Women's Collection
              <span className="h-px w-10 bg-[#C19A6B]" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="
          text-5xl
          font-light
          uppercase
          leading-[0.9]
          tracking-[-0.03em]
          text-white
          sm:text-6xl
          md:text-7xl
          lg:text-8xl
        "
            >
              Redefine
              <span className="block text-[#C19A6B]">Your Elegance</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="
          mt-7
          max-w-xl
          text-sm
          leading-7
          text-white/70
          sm:text-base
          sm:leading-8
        "
            >
              Discover timeless silhouettes crafted for the modern woman.
              Refined fabrics, effortless tailoring, and contemporary details
              designed for every occasion.
            </motion.p>

            {/* Collection Meta */}
            <motion.div
              variants={itemVariants}
              className="
          mt-6
          flex items-center gap-4
          text-[10px]
          uppercase
          tracking-[0.3em]
          text-white/50
        "
            >
              <span>New Season</span>

              <span className="h-1 w-1 rounded-full bg-[#C19A6B]" />

              <span>Women's Collection</span>
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="mt-9">
              <Link
                to="/shop"
                className="
            group
            relative
            inline-flex
            overflow-hidden
            rounded-tr-3xl
            bg-[#C19A6B]
            px-8
            py-4
            text-sm
            font-semibold
            uppercase
            tracking-wider
            text-white
            transition
            hover:text-[#C19A6B]
          "
              >
                <span className="relative z-10">Shop Now</span>

                <span
                  className="
              absolute inset-0
              translate-y-full
              bg-white
              transition-transform
              duration-300
              group-hover:translate-y-0
            "
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
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
        </Suspense>
      </LazySection>
      <LazySection>
        <Suspense fallback={null}>
          <NewArrival product={newArrivalProducts} />
        </Suspense>
      </LazySection>
      <LazySection>
        <Suspense fallback={null}>
          <Trending product={trendingProducts} />
        </Suspense>
      </LazySection>
      <LazySection>
        <Suspense fallback={null}>
          <BestSeller product={bestSellerProducts} />
        </Suspense>
      </LazySection>
      <LazySection>
        <Suspense fallback={null}>
          <AllProducts product={womenProducts} />
        </Suspense>
      </LazySection>
    </>
  );
};

export default WomenHero;
