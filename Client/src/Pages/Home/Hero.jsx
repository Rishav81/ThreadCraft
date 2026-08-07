import { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { motion } from "framer-motion";
const BrandVideo = lazy(() => import("./BrandVideo"));
const Categories = lazy(() => import("./Categories"));
const NewArrival = lazy(() => import("./NewArrival"));

import { getProducts } from "../../Data/API/productApi";
import LazySection from "../../Components/Ui/LazySection";
import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";
const FeaturedCollection = lazy(() => import("./FeaturedCollection"));

const Hero = () => {
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
      <section className="relative min-h-screen  overflow-hidden">
        {/* Background Image */}
        <motion.img
          src="/Images/Profile.jpg"
          alt="Profile"
          className="absolute inset-0 h-full lg:h-fit w-full object-cover object-center "
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

        {/* Hero Content */}
        <div
          className="
          relative
          z-20
          min-h-[90svh]
          flex
          items-center
          "
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="
            max-w-7xl
            mx-auto
            
            px-6
            "
          >
            <div
              className="
            
              pt-20
              md:pt-28
              
              "
            >
              {/* Small Heading */}
              <motion.span
                variants={itemVariants}
                className="
                uppercase
                tracking-[0.35em]
                text-[#C19A6B]
                text-xs
                sm:text-sm
                font-semibold
                
                "
              >
                Premium Clothing Brand
              </motion.span>

              {/* Main Heading */}
              <motion.h2
                variants={itemVariants}
                className="
                mt-5
                text-4xl
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
                font-black
                leading-[1.05]
                text-white
                "
              >
                Elevate Your Everyday Style
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="
                mt-6
                max-w-xl
                text-neutral-200
                text-base
                sm:text-lg
                leading-8
                "
              >
                Discover timeless fashion crafted with premium fabrics, modern
                silhouettes, and unmatched attention to detail. Designed for
                those who wear confidence every day.
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
                  className="
          group
          relative
          overflow-hidden
          rounded-full
          bg-[#C19A6B]
          px-10
          py-4
          font-semibold
          text-white
          hover:text-[#C19A6B]
          transition
          "
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
            </div>
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
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={null}>
          <BrandVideo />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={null}>
          <FeaturedCollection products={featuredProducts} />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={null}>
          <NewArrival products={newArrivalProducts} />
        </Suspense>
      </LazySection>
    </>
  );
};

export default Hero;
