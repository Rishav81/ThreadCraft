import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";
import CollectionToolbar from "../Filter/CollectionToolbar";
import { useMemo, useState } from "react";
import { useProducts } from "../../Context/ProductContext";
import ProductCard from "../../Components/Product/ProductCard";

const CollectionBar = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    brand: [],
    color: [],
    size: [],
    category: [],
    sort: "",
  });
  const { products } = useProducts();

  const filters = useMemo(() => {
    const brand = [
      ...new Set(products.map((product) => product.brand).filter(Boolean)),
    ];

    const color = [
      ...new Set(
        products.flatMap((product) => product.colors || []).filter(Boolean),
      ),
    ];

    const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];

    const sizes = sizeOrder.filter((size) =>
      products.some((product) => product.sizes?.includes(size)),
    );

    const category = [
      ...new Set(products.map((product) => product.category).filter(Boolean)),
    ];

    return {
      brand,
      color,
      sizes,
      category,
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const matchesBrand =
        selectedFilters.brand.length === 0 ||
        selectedFilters.brand.includes(product.brand);

      const matchesColor =
        selectedFilters.color.length === 0 ||
        product.colors?.some((color) => selectedFilters.color.includes(color));

      const matchesSize =
        selectedFilters.size.length === 0 ||
        product.sizes?.some((size) => selectedFilters.size.includes(size));

      const matchesCategory =
        selectedFilters.category.length === 0 ||
        selectedFilters.category.includes(product.category);

      return matchesBrand && matchesColor && matchesSize && matchesCategory;
    });

    // Sorting
    switch (selectedFilters.sort) {
      case "Price: Low to High":
        return [...result].sort((a, b) => a.price - b.price);

      case "Price: High to Low":
        return [...result].sort((a, b) => b.price - a.price);

      default:
        return result;
    }
  }, [products, selectedFilters]);
  return (
    <>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.2,
        }}
        className="relative px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14"
      >
        <div className="mx-auto max-w-7xl text-gray-900  rounded">
          <CollectionToolbar
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            filters={filters}
          />

          <motion.div
            variants={itemVariants}
            className="overflow-y-auto scrollbar-hide h-[90vh] mt-5"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {filteredProducts.map((product) => (
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
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default CollectionBar;
