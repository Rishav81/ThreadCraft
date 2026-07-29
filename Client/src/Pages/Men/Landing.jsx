import { getProducts } from "../../Data/API/productApi";
import AllProducts from "./AllProducts";
import BestSeller from "./BestSeller";
import MensCategories from "./MensCategories";
import NewArrival from "./NewArrival";
import Promotion from "./Promotion";
import Rating from "./Rating";
import Trending from "./Trending";
import { useEffect, useState } from "react";

const Landing = () => {
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

  const topRatedProducts = products.filter((product) => product.rating >= 4.5);

  const trendingProducts = products.filter(
    (product) => product.trending === true,
  );
  const bestSellerProducts = products.filter(
    (product) => product.bestSeller === true,
  );
  const newArrivalProducts = products.filter(
    (product) => product.badge === "New Arrival",
  );

  const mensProducts = products.filter((product) => product.gender === "Men");

  return (
    <section className="relative overflow-hidden bg-[#11111]  ">
      <section className="relative h-[85vh] overflow-hidden">
        {/* Background Image */}
        <img
          src="/Images/mens-hero.webp"
          alt="Men Collection"
          className="absolute inset-0 h-full w-full object-cover "
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="max-w-3xl px-6 text-center">
            <span className="inline-block rounded-full border border-[#C19A6B]/40 bg-[#C19A6B]/10 px-3 md:px-5 py-2 text-xs  md:text-smfont-semibold uppercase tracking-[0.3em] text-[#C19A6B]">
              Men's Collection
            </span>

            <h1 className="mt-2 md:mt-4  text-4xl md:text-5xl lg:text-7xl font-bold uppercase text-white leading-tight">
              Elevate Your
              <span className="block text-[#C19A6B]">Everyday Style</span>
            </h1>

            <p className="mt-2 md:mt-4 text-md md:text-lg  text-gray-200">
              Premium essentials crafted for modern men. Discover timeless
              shirts, jackets, denim, and streetwear designed for confidence and
              comfort.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <button className="rounded-full bg-[#C19A6B] px-8 py-3 font-semibold text-white hover:bg-white hover:text-black transition">
                Shop Collection
              </button>

              <button className="rounded-full border border-white px-8 py-3 font-semibold text-white hover:bg-white hover:text-black transition">
                Explore Styles
              </button>
            </div>
          </div>
        </div>
      </section>
      <MensCategories />
      <Trending product={trendingProducts} />

      <Rating product={topRatedProducts} />
      <BestSeller product={bestSellerProducts} />
      <NewArrival product={newArrivalProducts} />
      <AllProducts product={mensProducts} />
      <Promotion />
    </section>
  );
};

export default Landing;
