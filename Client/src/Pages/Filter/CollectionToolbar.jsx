import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";

const CollectionToolbar = ({
  selectedFilters,
  setSelectedFilters,
  filters,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const sidebarRef = useRef(null);

  // --------------------------------------------------
  // Toggle dropdown
  // --------------------------------------------------
  const toggleDropdown = (dropdown) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  // --------------------------------------------------
  // Handle filter selection
  // Filters = multi-select
  // Sort    = single-select
  // --------------------------------------------------
  const handleSelect = (id, value) => {
    setSelectedFilters((prev) => {
      // Sort is single-select
      if (id === "sort") {
        return {
          ...prev,
          sort: prev.sort === value ? "" : value,
        };
      }

      // Other filters are multi-select
      const currentValues = prev[id] || [];

      const isSelected = currentValues.includes(value);

      return {
        ...prev,
        [id]: isSelected
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      };
    });
  };

  // --------------------------------------------------
  // Close mobile sidebar when clicking outside
  // --------------------------------------------------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
        setOpenDropdown(null);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // --------------------------------------------------
  // Prevent body scroll when mobile filter is open
  // --------------------------------------------------
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const sortOptions = ["Price: Low to High", "Price: High to Low"];

  const hasSelectedFilters =
    selectedFilters.brand.length > 0 ||
    selectedFilters.color.length > 0 ||
    selectedFilters.size.length > 0 ||
    selectedFilters.category.length > 0;

  const totalSelectedFilters =
    selectedFilters.brand.length +
    selectedFilters.color.length +
    selectedFilters.size.length +
    selectedFilters.category.length;

  return (
    <div className="relative border-b border-white/10 py-4 sm:py-5">
      {/* =====================================================
          DESKTOP TOOLBAR
      ====================================================== */}
      <div className="hidden lg:flex items-center justify-between ">
        {/* Filters */}
        <div className="flex items-center gap-5 xl:gap-7">
          <Dropdown
            title="Brand"
            id="brand"
            options={filters.brand}
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
            onSelect={handleSelect}
            selectedValue={selectedFilters.brand}
          />

          <Dropdown
            title="Color"
            id="color"
            options={filters.color}
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
            onSelect={handleSelect}
            selectedValue={selectedFilters.color}
          />

          <Dropdown
            title="Size"
            id="size"
            options={filters.sizes}
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
            onSelect={handleSelect}
            selectedValue={selectedFilters.size}
          />

          <Dropdown
            title="Category"
            id="category"
            options={filters.category}
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
            onSelect={handleSelect}
            selectedValue={selectedFilters.category}
          />
        </div>

        {/* Sort */}
        <Dropdown
          title="Sort"
          id="sort"
          options={sortOptions}
          openDropdown={openDropdown}
          toggleDropdown={toggleDropdown}
          onSelect={handleSelect}
          selectedValue={selectedFilters.sort}
          align="right"
          isSort
        />
      </div>

      {/* =====================================================
          MOBILE / TABLET TOOLBAR
      ====================================================== */}
      <div className="flex lg:hidden items-center justify-between gap-4">
        {/* Filter button */}
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setOpenDropdown(null);
          }}
          className="
            flex items-center gap-2
            text-xs font-black uppercase
            tracking-[0.2em]
            text-white/70
            transition-colors
            hover:text-[#C19A6B]
          "
        >
          <FiMenu size={19} />

          <span>Filter</span>

          {hasSelectedFilters && (
            <span
              className="
                flex h-4 min-w-4
                items-center justify-center
                rounded-full
                bg-[#C19A6B]
                px-1
                text-[9px]
                font-bold
                text-black
              "
            >
              {totalSelectedFilters}
            </span>
          )}
        </button>

        {/* Mobile Sort */}
        <Dropdown
          title="Sort"
          id="sort-mobile"
          options={sortOptions}
          openDropdown={openDropdown}
          toggleDropdown={toggleDropdown}
          onSelect={(id, value) => handleSelect("sort", value)}
          selectedValue={selectedFilters.sort}
          align="right"
          isSort
        />
      </div>

      {/* =====================================================
          MOBILE FILTER DRAWER
      ====================================================== */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="
    fixed inset-0 z-40
    bg-black/70
    backdrop-blur-[2px]
    lg:hidden
  "
            onClick={() => setIsOpen(false)}
          />

          {/* Mobile Filter Drawer */}
          <aside
            ref={sidebarRef}
            className="
    fixed inset-y-0 left-0 z-50

    flex h-dvh
    w-[75%] md:w-[60%] max-w-[380px]
    flex-col

    bg-[#111111]

    border-r border-white/10
    shadow-[10px_0_40px_rgba(0,0,0,0.45)]

    lg:hidden

    animate-in
    slide-in-from-left
    duration-300
  "
          >
            {/* Drawer Header */}
            <div
              className="
    flex shrink-0
    items-center justify-between
    border-b border-white/10
    px-5 py-5
  "
            >
              <div>
                <p
                  className="
        text-[10px]
        uppercase
        tracking-[0.3em]
        text-[#C19A6B]
      "
                >
                  Collection
                </p>

                <h2
                  className="
        mt-1
        text-lg
        font-semibold
        uppercase
        tracking-[0.15em]
        text-white
      "
                >
                  Filters
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="
      flex h-9 w-9
      items-center justify-center
      rounded-full
      border border-white/10
      text-white/50
      transition-all
      hover:border-[#C19A6B]
      hover:text-[#C19A6B]
    "
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Drawer Content */}
            <div
              className=" flex-1
    overflow-y-auto
    overscroll-contain
    px-5"
            >
              <MobileFilter
                title="Brand"
                id="mobile-brand"
                filterId="brand"
                options={filters.brand}
                openDropdown={openDropdown}
                toggleDropdown={toggleDropdown}
                onSelect={handleSelect}
                selectedValue={selectedFilters.brand}
              />

              <MobileFilter
                title="Color"
                id="mobile-color"
                filterId="color"
                options={filters.color}
                openDropdown={openDropdown}
                toggleDropdown={toggleDropdown}
                onSelect={handleSelect}
                selectedValue={selectedFilters.color}
              />

              <MobileFilter
                title="Size"
                id="mobile-size"
                filterId="size"
                options={filters.sizes}
                openDropdown={openDropdown}
                toggleDropdown={toggleDropdown}
                onSelect={handleSelect}
                selectedValue={selectedFilters.size}
              />

              <MobileFilter
                title="Category"
                id="mobile-category"
                filterId="category"
                options={filters.category}
                openDropdown={openDropdown}
                toggleDropdown={toggleDropdown}
                onSelect={handleSelect}
                selectedValue={selectedFilters.category}
              />
            </div>

            {/* Drawer Footer */}
            <div
              className="
    flex shrink-0
    gap-3
    border-t border-white/10
    bg-[#111111]
    px-5 py-4
  "
            >
              <button
                type="button"
                onClick={() =>
                  setSelectedFilters((prev) => ({
                    ...prev,
                    brand: [],
                    color: [],
                    size: [],
                    category: [],
                  }))
                }
                className="
      flex-1
      border border-white/10
      py-3
      text-[10px]
      font-bold
      uppercase
      tracking-[0.2em]
      text-white/50
      transition-all
      hover:border-[#C19A6B]
      hover:text-[#C19A6B]
    "
              >
                Clear
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="
      flex-1
      bg-[#C19A6B]
      py-3
      text-[10px]
      font-bold
      uppercase
      tracking-[0.2em]
      text-black
      transition-all
      hover:bg-[#d2ad7e]
    "
              >
                Apply
              </button>
            </div>
          </aside>
        </>
      )}
    </div>
  );
};

/* =========================================================
   DESKTOP DROPDOWN
========================================================= */

const Dropdown = ({
  title,
  id,
  options,
  openDropdown,
  toggleDropdown,
  onSelect,
  selectedValue,
  align = "left",
  isSort = false,
}) => {
  const isOpen = openDropdown === id;

  const selectedCount = Array.isArray(selectedValue)
    ? selectedValue.length
    : selectedValue
      ? 1
      : 0;

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => toggleDropdown(id)}
        className="
          flex items-center gap-2
          whitespace-nowrap
          text-[10px] sm:text-xs
          font-black uppercase
          tracking-[0.2em]
          text-white/60
          transition-colors
          hover:text-[#C19A6B]
        "
      >
        <span>{title}</span>

        {selectedCount > 0 && (
          <span
            className="
              flex h-4 min-w-4
              items-center justify-center
              rounded-full
              bg-[#C19A6B]
              px-1
              text-[9px]
              font-bold
              text-black
            "
          >
            {isSort ? "" : selectedCount}
          </span>
        )}

        <FiChevronDown
          size={14}
          className={`
            shrink-0
            transition-transform duration-300
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* Menu */}
      {isOpen && (
        <div
          className={`
            absolute top-full z-[60]
            mt-3
            w-52
            
            max-w-[calc(100vw-2rem)]
            overflow-hidden
            border border-white/10
            bg-[#111111]
            shadow-2xl
            ${align === "right" ? "right-0" : "left-0"}
          `}
        >
          {options.map((option) => {
            const isSelected = Array.isArray(selectedValue)
              ? selectedValue.includes(option)
              : selectedValue === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(id, option)}
                className={`
                  flex w-full
                  items-center justify-between
                  px-5 py-3.5
                  text-left text-xs
                  transition-colors
                  ${
                    isSelected
                      ? "bg-white/5 text-[#C19A6B]"
                      : "text-white/50 hover:bg-white/5 hover:text-[#C19A6B]"
                  }
                `}
              >
                <span>{option}</span>

                {isSelected && <span className="text-[#C19A6B]">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* =========================================================
   MOBILE FILTER
========================================================= */

const MobileFilter = ({
  title,
  id,
  filterId,
  options,
  openDropdown,
  toggleDropdown,
  onSelect,
  selectedValue,
}) => {
  const isOpen = openDropdown === id;

  const selectedCount = selectedValue?.length || 0;

  return (
    <div className="border-b border-white/10">
      {/* Header */}
      <button
        type="button"
        onClick={() => toggleDropdown(id)}
        className="
          flex w-full
          items-center justify-between
          py-5
          text-left
        "
      >
        <div className="flex items-center gap-2">
          <span
            className="
              text-xs font-medium
              uppercase
              tracking-[0.2em]
              text-white/80
            "
          >
            {title}
          </span>

          {selectedCount > 0 && (
            <span
              className="
                flex h-4 min-w-4
                items-center justify-center
                rounded-full
                bg-[#C19A6B]
                px-1
                text-[9px]
                font-bold
                text-black
              "
            >
              {selectedCount}
            </span>
          )}
        </div>

        <FiChevronDown
          size={16}
          className={`
            text-white/40
            transition-transform duration-300
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* Options */}
      {isOpen && (
        <div className="space-y-1 pb-4">
          {options.map((option) => {
            const isSelected = selectedValue?.includes(option);

            return (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(filterId, option)}
                className={`
                  flex w-full
                  items-center justify-between
                  px-3 py-3
                  text-left text-sm
                  transition-colors
                  ${
                    isSelected
                      ? "bg-white/5 text-[#C19A6B]"
                      : "text-white/50 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <span>{option}</span>

                {isSelected && <span className="text-[#C19A6B]">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CollectionToolbar;
