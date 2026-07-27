import { FaArrowRight } from "react-icons/fa";

const Banner = ({ data }) => {
  return (
    <section className=" ">
      <div className="group relative h-[400px] md:h-[450px] lg:h-[500px]  overflow-hidden rounded-3xl">
        {/* Background Image */}
        <img
          src={data.image}
          alt="New Arrivals Collection"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8 lg:p-12">
          {/* Badge */}
          <span className="mb-4 w-fit rounded-full border border-[#C19A6B]/40 bg-[#C19A6B]/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#C19A6B]">
            New Arrivals
          </span>

          {/* Heading */}
          <h2 className="max-w-sm text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-white md:text-4xl">
            {data.name}
          </h2>

          {/* Description */}
          <p className="mt-1 md:mt-4 max-w-sm text-sm leading-7 text-gray-300 md:text-base line-clamp-2">
            {data.description}
          </p>

          {/* CTA */}
          <button className="group/button mt-2 md:mt-8 flex w-fit items-center gap-3 rounded-full bg-[#C19A6B] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black">
            Explore Collection
            <FaArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
