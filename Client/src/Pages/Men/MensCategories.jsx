import mensCategories from "../../Data/Mens/mensCategories";

const MensCategories = () => {
  return (
    <section className=" pt-6  px-4 sm:px-6 lg:px-8">
      <div className=" max-w-7xl mx-auto ">
        {/* Categories Content */}
        <div className="mb-6">
          <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-black leading-tight">
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
           
            scrollbar-hide
            pb-3
          "
        >
          {mensCategories
            .filter((mensCategories) => mensCategories.style)
            .map((category) => (
              <div
                key={category.id}
                className="
                relative
                min-w-[250px]
                h-[350px]
               
                rounded-[32px]
                overflow-hidden
                group
                cursor-pointer
                
                
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
                  <p className="uppercase text-sm tracking-tight text-white/70">
                    Premium Collection
                  </p>

                  <h3 className=" text-2xl font-bold text-white line-clamp-1">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MensCategories;
