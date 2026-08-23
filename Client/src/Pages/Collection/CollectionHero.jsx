import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";
import { useProducts } from "../../Context/ProductContext";
import { lazy, Suspense, useMemo } from "react";
import LazySection from "../../Components/Ui/LazySection";
const CollectionCategory = lazy(() => import("./CollectionCategory"));
const CollectionBar = lazy(() => import("./CollectionBar"));
const Banner = lazy(() => import("./Banner"));

const CollectionHero = () => {
  const { products } = useProducts();

  const categoryItem = useMemo(() => {
    return products.filter((product) => product.gender);
  }, [products]);

  return (
    <>
      <section className="relative h-[75vh] min-h-[600px] w-full overflow-hidden lg:h-screen">
        {/* Background Image */}
        <motion.img
          src="/Images/newArrival.webp"
          alt="ThreadCraft premium fashion collection"
          className="
          absolute inset-0
          h-full w-full
          object-cover
          object-[85%_center]
          md:object-center
          lg:hidden
        "
          loading="eager"
          decoding="async"
          animate={{
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Editorial Gradient */}
        <div
          className="
          absolute inset-0
          bg-gradient-to-r
          from-black/85
          via-black/50
          to-black/10
        "
        />

        {/* Content */}
        <div
          className="
          relative z-20
  mx-auto
  flex h-full
  w-full
  max-w-7xl
  items-center
  justify-between
  px-6 lg:px-10
         
        "
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl text-left"
          >
            {/* Editorial Label */}
            <motion.div
              variants={itemVariants}
              className="
              mb-6
              flex items-center gap-3
              text-xs
              font-medium
              uppercase
              tracking-[0.35em]
              text-[#C19A6B]
            "
            >
              <span className="h-px w-10 bg-[#C19A6B]" />
              The Collection
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
              Define
              <span className="block text-[#C19A6B]">Your Style</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="
              mt-6
              max-w-lg
              text-sm
              leading-7
              text-white/70
              sm:text-base
            "
            >
              Explore the complete ThreadCraft collection — from timeless
              essentials to contemporary silhouettes, thoughtfully crafted for
              every expression and every occasion.
            </motion.p>

            {/* Collection Meta */}
            <motion.div
              variants={itemVariants}
              className="
              mt-6
              flex flex-wrap
              items-center
              gap-4
              text-[10px]
              uppercase
              tracking-[0.3em]
              text-white/50
            "
            >
              <span>Men</span>

              <span className="h-1 w-1 rounded-full bg-[#C19A6B]" />

              <span>Women</span>

              <span className="h-1 w-1 rounded-full bg-[#C19A6B]" />

              <span>Kids</span>
            </motion.div>
          </motion.div>
          <div className="relative hidden md:block">
            {/* Main Image */}
            <motion.img
              src="/Images/bannerCollection1.webp"
              alt="ThreadCraft collection"
              loading="lazy"
              decoding="async"
              className="
      h-[420px]
      lg:h-[580px]
      w-auto
      rounded-3xl
      object-cover
    "
            />

            {/* Supporting Image */}
            <motion.img
              src="/Images/activeWear.webp"
              alt="ThreadCraft collection detail"
              loading="lazy"
              decoding="async"
              className="
      absolute
      -bottom-16
      -left-16
      h-52 w-32
      rounded-2xl
     
      object-cover
      shadow-2xl
    "
            />
            <motion.img
              src="/Images/bannerCollection2.webp"
              alt="ThreadCraft collection detail"
              loading="lazy"
              decoding="async"
              className="
      absolute hidden lg:block
      -bottom-16
      -right-16
      min-h-96 w-52
      rounded-2xl
   
      object-cover
      shadow-2xl
    "
            />
          </div>
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
          uppercase
          animate-bounce
        "
        >
          Scroll
        </div>
      </section>
      <LazySection>
        <Suspense fallback={null}>
          <CollectionCategory product={categoryItem} />
          <Banner />
          <CollectionBar />
        </Suspense>
      </LazySection>
    </>
  );
};

export default CollectionHero;
