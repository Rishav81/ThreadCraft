import ProductCard from "../../Components/Product/ProductCard";

const Rating = ({ product }) => {
  return (
    <section className="pt-6 px-4 sm:px-6 lg:px-8  ">
      <div className="max-w-7xl mx-auto ">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <div>
            <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-black leading-tight ">
              Top <span className="text-[#C19A6B]">Rated Collection</span>
            </h2>

            <p className="mt-2 text-gray-600 max-w-xl text-sm">
              Discover our top rated premium collection crafted for timeless
              style and everyday elegance.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="overflow-x-auto scrollbar-hide mt-5">
          <div className="flex gap-6">
            {product.map((product) => (
              <div
                key={product._id}
                className="
          shrink-0
          basis-1/3
          md:basis-1/5
          lg:basis-1/5
        "
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rating;
