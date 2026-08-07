import { Search, X, Clock3, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const recentSearches = ["Oversized T-Shirt", "Cargo Pants", "Hoodie"];

const trendingSearches = [
  "Linen Shirt",
  "Sneakers",
  "Summer Collection",
  "Denim Jacket",
  "Polo T-Shirt",
];

const SearchBar = ({ onClose }) => {
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-sm px-4 pt-16 sm:px-6 sm:pt-20">
      <div
        ref={searchRef}
        className="w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] sm:w-[95%] lg:w-[75%]"
      >
        {/* Search Input */}
        <div className="border-b border-gray-100 p-4 sm:p-5 md:p-6">
          <div className="relative">
            <Search
              size={22}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for products, brands and categories..."
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-12 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-[#C19A6B] focus:bg-white focus:ring-4 focus:ring-[#C19A6B]/10 sm:h-14 sm:pl-14 sm:pr-14 sm:text-base"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-black"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Default Content */}
        {!search && (
          <div className="grid max-h-[70vh] grid-cols-1 gap-8 overflow-y-auto p-5 md:grid-cols-2 md:p-6">
            {/* Recent Searches */}
            <div>
              <div className="mb-5 flex items-center gap-2">
                <Clock3 size={18} className="text-[#C19A6B]" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Searches
                </h3>
              </div>

              <div className="space-y-2">
                {recentSearches.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSearch(item)}
                    className="flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-[#C19A6B]/10 hover:text-[#C19A6B] sm:text-base"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div>
              <div className="mb-5 flex items-center gap-2">
                <TrendingUp size={18} className="text-[#C19A6B]" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Trending
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {trendingSearches.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSearch(item)}
                    className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C19A6B] hover:bg-[#C19A6B] hover:text-white"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Results Placeholder */}
        {search && (
          <div className="flex min-h-[280px] items-center justify-center p-8">
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#C19A6B]/10">
                <Search size={36} className="text-[#C19A6B]" />
              </div>

              <h2 className="mt-5 text-2xl font-semibold text-gray-900">
                Searching for
              </h2>

              <p className="mt-2 text-lg font-medium text-[#C19A6B]">
                "{search}"
              </p>

              <p className="mt-3 text-gray-500">
                Products will appear here once connected to the backend.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
