import BrandVideo from "./BrandVideo";
import Categories from "./Categories";

const Hero = () => {
  return (
    <>
      <section className="relative  h-[95vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/Images/Profile.jpg"
            alt="ThreadCraft Hero"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/45"></div>
        </div>

        {/* Background Brand Text */}
        <h1
          className="
          absolute
          top-20
          md:top-12
          lg:top-6
          left-1/2
          -translate-x-1/2
          text-[14vw]
          font-extrabold
          uppercase
          tracking-tight
          text-white/10
          whitespace-nowrap
          select-none
          pointer-events-none
          z-10
        "
        >
          Thr
          <span
            className="
    text-transparent
    [-webkit-text-stroke:0.5px_#C19A6B]
    md:[-webkit-text-stroke:1.2px_#C19A6B]
    lg:[-webkit-text-stroke:2px_#C19A6B]
  "
          >
            eadC
          </span>
          raft
        </h1>

        {/* Hero Content */}
        <div
          className="relative z-20 flex h-full items-center mt-12 
        md:mt-30"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-6 w-full">
            <div className="max-w-2xl">
              <p className="uppercase tracking-[0.3em] text-[#C19A6B] font-medium">
                Premium Clothing Brand
              </p>

              <h2 className="mt-4 text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
                Elevate Your Everyday Style
              </h2>

              <p className="mt-6 text-gray-200 text-base sm:text-lg leading-8 max-w-xl">
                Discover timeless fashion crafted with premium fabrics, modern
                silhouettes, and unmatched attention to detail. Designed for
                those who wear confidence every day.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <button className="px-8 py-3 rounded-md bg-[#C19A6B] text-black font-semibold transition hover:scale-105">
                  Shop Now
                </button>

                <button className="px-8 py-3 rounded-md border border-white text-white transition hover:bg-white hover:text-black">
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Categories />
      <BrandVideo />
    </>
  );
};

export default Hero;
