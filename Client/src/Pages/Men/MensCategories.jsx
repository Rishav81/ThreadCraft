import { FiArrowRight } from "react-icons/fi";
import mensCategories from "../../Data/Mens/mensCategories";

const MensCategories = () => {
  return (
    <section className=" py-16 ">
      <div className=" max-w-7xl mx-auto px-6">
        {/* Categories Content */}
        <div className="mb-14">
          <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl text-[#999999] font-bold leading-tight">
            Find Your
            <span className="text-[#C19A6B]"> Signature Style</span>
          </h2>
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
          {mensCategories.map((category) => (
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
                  {category.name}
                </h3>

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    gap-2
                    text-[#C19A6B]
                    font-medium
                  "
                >
                  <span>Discover</span>

                  <FiArrowRight
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-2
                    "
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MensCategories;
