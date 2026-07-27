import Banner from "../../Components/Ui/Banner";

import newArrival from "../../Data/newArrival";

const NewArrival = () => {
  return (
    <section className="pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Optional Section Header */}
        <div className="mb-10">
          <span className="uppercase tracking-[0.4em] text-[#C19A6B] text-sm font-semibold">
            New Arrivals
          </span>

          <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
            Fresh Styles for <span className="text-[#C19A6B]">2026</span>
          </h2>

          <p className="mt-4 max-w-2xl text-gray-600">
            Discover premium hoodies, denim, jackets, and essentials crafted for
            everyday style.
          </p>
        </div>

        {/* Main Layout */}
        <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-4 scrollbar-none">
          {newArrival.map((item) => (
            <div
              key={item.id}
              className="min-w-[85%] sm:min-w-[60%] md:min-w-[45%] lg:min-w-0"
            >
              <Banner data={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
