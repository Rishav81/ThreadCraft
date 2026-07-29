import categories from "../../Data/categories";

const Categories = () => {
  return (
    <section className="relative py-16 bg-[#F5F3EF]">
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#402401] via-[#C19A6B]/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Categories Content */}
        <div className="mb-14">
          <p className="uppercase tracking-[0.4em] text-[#C19A6B] text-sm font-semibold">
            Curated Collections
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
            Find Your
            <span className="text-[#C19A6B]"> Signature Style</span>
          </h2>

          <p className="mt-5 max-w-2xl text-gray-500 leading-8">
            Explore timeless collections crafted with premium fabrics and modern
            silhouettes. Every category is designed to elevate your everyday
            wardrobe.
          </p>
        </div>

        {/* Cards */}
        <div
          className="
            flex
            gap-6
            overflow-x-auto
            lg:grid
            lg:grid-cols-4
            lg:overflow-visible
            scrollbar-hide
            pb-3
          "
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="
                relative
                min-w-[280px]
                h-[400px]
                lg:min-w-0
                rounded-[32px]
                overflow-hidden
                group
                cursor-pointer
                shadow-lg
                hover:shadow-[0_25px_60px_rgba(0,0,0,0.25)]
                transition-all
                duration-500
              "
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.title}
                loading="lazy"
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Border */}
              <div className="absolute inset-0 border border-white/10 rounded-[32px]" />

              {/* Content */}
              <div
                className="
                  absolute
                  bottom-8
                  left-8
                  right-8
                  transition-all
                  duration-500
                  group-hover:bottom-10
                "
              >
                <p className="uppercase text-xs tracking-[0.3em] text-white/70">
                  Premium Collection
                </p>

                <h3 className="mt-2 text-3xl font-bold text-white">
                  {category.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
