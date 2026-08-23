import { useMemo, lazy, Suspense } from "react";
import { motion } from "framer-motion";

const Categories = lazy(() => import("./Categories"));
const NewArrival = lazy(() => import("./NewArrival"));

import LazySection from "../../Components/Ui/LazySection";
import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";
import { Link } from "react-router-dom";
import { useProducts } from "../../Context/ProductContext";
const WhyChoose = lazy(() => import("./WhyChoose"));
const BrandBanner = lazy(() => import("./BrandBanner"));
const FeaturedCollection = lazy(() => import("./FeaturedCollection"));

const Hero = () => {
  const { products } = useProducts();

  const categoryItem = useMemo(() => {
    return products.filter((product) => product.gender);
  }, [products]);

  const featuredProducts = useMemo(() => {
    return products.filter((product) => product.featured);
  }, [products]);

  const newArrivalProducts = useMemo(() => {
    return products.filter((product) => {
      const createdDate = new Date(product.createdAt);
      const today = new Date();

      return (today - createdDate) / (1000 * 60 * 60 * 24) <= 10;
    });
  }, [products]);
  return (
    <>
      <section className="relative h-[85vh] min-h-[500px] w-full overflow-hidden md:h-screen  ">
        {/* Background Image */}
        <motion.img
          src="/Images/Profile.webp"
          alt="Profile"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full lg:h-fit w-full object-cover object-[20%_center] md:object-center"
          animate={{
            scale: [1, 1.06, 1],
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

        {/* Hero Content */}
        <div
          className="  relative
    z-20
    w-full
    h-full
    max-w-7xl
    mx-auto
    px-6
    flex
    items-center
    
  "
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col text-left "
          >
            <motion.div
              variants={itemVariants}
              className="
          mb-7
          flex items-center gap-3
          text-[8px]
         md:text-[10px]
          font-medium
          uppercase
          tracking-[0.4em]
          text-[#C19A6B]
          sm:text-xs
        "
            >
              <span className="h-px w-10 bg-[#C19A6B]" />
              Premium clothing Brand
              <span className="h-px w-10 bg-[#C19A6B]" />
            </motion.div>

            {/* Main Heading */}
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
              Elevate Your
              <span className="block text-[#C19A6B]">Everyday Style</span>
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
              Discover timeless fashion crafted with premium fabrics, modern
              silhouettes, and unmatched attention to detail. Designed for those
              who wear confidence every day.
            </motion.p>

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
              <span>New Brand</span>

              <span className="h-1 w-1 rounded-full bg-[#C19A6B]" />

              <span>Premium Collection</span>
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-6 lg:mt-10 flex flex-row gap-5 "
            >
              {/* <motion.div variants={itemVariants}>
                <Link
                  to="/shop"
                  className="
            group
            relative
            inline-flex
            overflow-hidden
            rounded-tr-3xl
            bg-[#C19A6B]
            px-4 md:px-6 lg:px-8
            py-4
               border border-[#C19A6B]
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
              </motion.div> */}
              <motion.div variants={itemVariants}>
                <Link
                  to="/collections"
                  className="
            group
            relative
            inline-flex
            overflow-hidden
            rounded-tr-3xl
            bg-[#C19A6B]
            px-4 md:px-6 lg:px-8
            py-4
               border border-[#C19A6B]
            text-sm
            font-semibold
            uppercase
            tracking-wider
            text-white
            transition
            hover:text-[#C19A6B]
          "
                >
                  <span className="relative z-10">Explore Styles</span>

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
          <Categories product={categoryItem} />
          <BrandBanner />
          <FeaturedCollection products={featuredProducts} />
          <NewArrival products={newArrivalProducts} />
          <WhyChoose />
        </Suspense>
      </LazySection>
    </>
  );
};

export default Hero;
