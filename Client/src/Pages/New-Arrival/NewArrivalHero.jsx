import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";
import { lazy, Suspense, useMemo } from "react";
import LazySection from "../../Components/Ui/LazySection";
import { useProducts } from "../../Context/ProductContext";
import Seo from "../../Components/SEO/Seo";
const ArrivalBanner = lazy(() => import("./ArrivanBanner"));

const NewArrival = lazy(() => import("./NewArrival"));

const CollectionIntro = lazy(() => import("./CollectionIntro"));

const CommingSoon = lazy(() => import("./CommingSoon"));
const CategoryArrival = lazy(() => import("./CategoryArrival"));

const NewArrivalHero = () => {
  const { products } = useProducts();

  const newArrival = useMemo(() => {
    return products.filter((product) => {
      const createdDate = new Date(product.createdAt);
      const today = new Date();

      return (today - createdDate) / (1000 * 60 * 60 * 24) <= 10;
    });
  }, [products]);

  const mensArrival = newArrival.filter((product) => product.gender === "Men");
  const womensArrival = newArrival.filter(
    (product) => product.gender === "Women",
  );
  const kidsArrival = newArrival.filter((product) => product.gender === "Kids");

  return (
    <>
      <Seo
        title="New Arrivals | Latest Fashion & Clothing | ThreadCraft"
        description="Discover the latest fashion at ThreadCraft. Explore our new arrivals and find fresh styles across men's, women's and kids' clothing."
        canonical="https://thread-craft-mu.vercel.app/new-Arrival"
      />
      <section className="relative h-[75vh] min-h-[600px] w-full overflow-hidden lg:h-screen">
        {/* Background Image */}
        <motion.img
          src="/Images/newArrival.webp"
          alt="New Arrivals"
          className="
          absolute inset-0
          h-full w-full
          object-cover
          object-[85%_center]
          md:object-center
        "
          loading="lazy"
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
        <div className="absolute inset-0 bg-black/40" />

        {/* Editorial Gradient */}
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
          relative z-20
          mx-auto
          flex h-full
          w-full
          max-w-7xl
          items-center
          px-6
          
        justify-start
          lg:px-10
        "
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="
            max-w-xl
            text-left
          "
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
              New Arrivals
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
              The
              <span className="block text-[#C19A6B]">Latest Collection</span>
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
              Discover the newest pieces from ThreadCraft — refined silhouettes,
              premium fabrics, and effortless style designed for the season
              ahead.
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

              <span>2026 Collection</span>
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="mt-9">
              <motion.div whileTap={{ scale: 0.98 }}>
                <Link
                  to="/collections"
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
                  <span className="relative z-10">New Arrivals</span>

                  <span
                    className="hidden lg:block
                    absolute
                    inset-0
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
          <CollectionIntro />
          <NewArrival product={newArrival} />
          <ArrivalBanner />
          <CategoryArrival
            products={{
              men: mensArrival,
              women: womensArrival,
              kids: kidsArrival,
            }}
          />
          <CommingSoon />
        </Suspense>
      </LazySection>
    </>
  );
};

export default NewArrivalHero;
