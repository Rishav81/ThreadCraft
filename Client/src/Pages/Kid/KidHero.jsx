import LazySection from "../../Components/Ui/LazySection";

import { lazy, Suspense } from "react";

import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";
import { Link } from "react-router-dom";
import { useProducts } from "../../Context/ProductContext";

const KidsCategories = lazy(() => import("./KidsCategories"));
const NewArrival = lazy(() => import("./NewArrival"));
const BestSeller = lazy(() => import("./BestSeller"));
const AllProducts = lazy(() => import("./AllProducts"));
const Trending = lazy(() => import("./Trending"));

const KidHero = () => {
  const { products } = useProducts();

  const kidsProducts = products.filter((product) => product.gender === "Kids");

  const kidsCategories = kidsProducts.filter((product) => product.category);

  const trendingProducts = kidsProducts.filter(
    (product) => product.trending === true,
  );
  const bestSellerProducts = kidsProducts.filter(
    (product) => product.bestSeller === true,
  );

  const newArrivalProducts = kidsProducts.filter((product) => {
    const createdDate = new Date(product.createdAt);

    const today = new Date();

    const diff = (today - createdDate) / (1000 * 60 * 60 * 24);

    return diff <= 10;
  });

  return (
    <>
      <section className="relative h-[78vh] min-h-[620px] w-full overflow-hidden lg:h-screen ">
        {/* Background */}
        <motion.img
          src="/Images/kidsHero.jpeg"
          alt="Women's Collection"
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
              Kid's Collection
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
              <span className="block text-[#C19A6B]">Kids Elegance</span>
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
              Discover refined styles crafted for little trendsetters. Premium
              fabrics, playful details, and effortless silhouettes designed to
              bring comfort, confidence, and timeless charm to every adventure.
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

              <span>Kid's Collection</span>
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
          <KidsCategories product={kidsCategories} />
        </Suspense>
      </LazySection>
      <LazySection>
        <Suspense fallback={null}>
          <Trending product={trendingProducts} />
        </Suspense>
      </LazySection>
      <LazySection>
        <Suspense fallback={null}>
          <NewArrival product={newArrivalProducts} />
        </Suspense>
      </LazySection>
      <LazySection>
        <Suspense fallback={null}>
          <BestSeller product={bestSellerProducts} />
        </Suspense>
      </LazySection>
      <LazySection>
        <Suspense fallback={null}>
          <AllProducts product={kidsProducts} />
        </Suspense>
      </LazySection>
    </>
  );
};

export default KidHero;
