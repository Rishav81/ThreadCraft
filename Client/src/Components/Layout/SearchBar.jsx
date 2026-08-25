import { Search, X, ArrowRight, CornerDownLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onClose }) => {
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // ============================================================
  // CLOSE SEARCH
  // ============================================================

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

  // ============================================================
  // SEARCH
  // ============================================================

  const handleSearch = () => {
    const query = search.trim();
    if (!query) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
    onClose();
  };

  // ============================================================
  // KEYBOARD
  // ============================================================

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }

    if (event.key === "Escape") {
      onClose();
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 px-4 pt-16 backdrop-blur-md transition-all sm:px-6 ">
      <div
        ref={searchRef}
        className="w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#121212]/95 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all"
      >
        {/* Search Input Area */}
        <div className="p-3 sm:p-4">
          <div className="relative flex items-center">
            <Search
              size={20}
              strokeWidth={2}
              className="pointer-events-none absolute left-4 text-white/40"
            />

            <input
              autoFocus
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search products, brands or categories..."
              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-12 pr-12 text-sm text-white placeholder-white/35 outline-none transition duration-200 focus:border-[#C19A6B]/70 focus:bg-white/[0.07] focus:ring-4 focus:ring-[#C19A6B]/15 sm:h-14 sm:text-base"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/10 hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Search Suggestions & Context Area */}
        <div className="border-t border-white/[0.06] bg-white/[0.01] px-4 py-3 sm:px-5">
          {!search.trim() ? (
            <div className="flex items-center justify-between py-1 text-xs text-white/40">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#C19A6B]/10 text-[#C19A6B]">
                  <Search size={14} />
                </div>
                <div>
                  <p className="font-medium text-white/70">
                    ThreadCraft Search
                  </p>
                  <p className="text-[11px] text-white/35">
                    Find products, brands, and categories
                  </p>
                </div>
              </div>
              <span className="hidden text-[11px] tracking-wide text-white/25 sm:inline">
                ESC to close
              </span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSearch}
              className="group flex w-full items-center justify-between rounded-xl border border-transparent p-2 text-left transition duration-200 hover:border-[#C19A6B]/25 hover:bg-[#C19A6B]/10"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#C19A6B]/15 text-[#C19A6B] transition group-hover:bg-[#C19A6B] group-hover:text-black">
                  <Search size={15} />
                </div>
                <div className="truncate">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C19A6B]">
                    Search for
                  </span>
                  <p className="truncate text-sm font-medium text-white">
                    {search.trim()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-white/40 transition group-hover:text-[#C19A6B]">
                <span className="hidden sm:inline text-[11px]">
                  Press Enter
                </span>
                <CornerDownLeft size={14} className="hidden sm:inline" />
                <ArrowRight size={16} className="sm:hidden" />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
