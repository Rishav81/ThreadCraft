import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiShoppingBag, FiUser, FiMenu, FiX } from "react-icons/fi";

import {
  Baby,
  BadgePlus,
  ChevronRight,
  House,
  LayoutGrid,
  Shirt,
  Sparkles,
} from "lucide-react";

import Nav from "./Nav";
import Profile from "./Profile";
import SearchBar from "./SearchBar";

import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";
import { useAuthModal } from "../../Context/AuthModelContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { openLoginModal } = useAuthModal();

  const { cartCount } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const profileRef = useRef(null);
  const sidebarRef = useRef(null);

  const handleCartClick = () => {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }
    navigate("/cart");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close profile
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }

      // Close mobile menu
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =========================
  // MOBILE NAVIGATION
  // =========================

  const handleMobileLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <nav
        className="
          mx-auto
          mt-2
          max-w-7xl
          px-2
          py-2
          md:mt-3
          md:px-4
          lg:mt-4
          lg:px-6
        "
      >
        <div className="flex items-center justify-between">
          {/* =========================
              LEFT
          ========================= */}

          <div className="flex items-center gap-4">
            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="text-white lg:hidden"
              aria-label="Open menu"
            >
              <FiMenu size={26} />
            </button>

            {/* Logo */}
            <Link to="/" className="font-black tracking-wider text-white">
              {/* Desktop */}
              <span className="hidden text-4xl md:inline">
                Thread
                <span className="text-[#C19A6B]">Craft</span>
              </span>

              {/* Mobile */}
              <span className="text-4xl md:hidden">
                T<span className="text-[#C19A6B]">C</span>
              </span>
            </Link>
          </div>

          {/* =========================
              DESKTOP NAV
          ========================= */}

          <Nav />

          {/* =========================
              RIGHT ACTIONS
          ========================= */}

          <div className="flex items-center gap-5">
            {/* Search */}
            <div>
              <button
                type="button"
                onClick={() => setShowSearch(true)}
                className="cursor-pointer text-white transition hover:text-[#C19A6B]"
                aria-label="Search"
              >
                <FiSearch size={22} />
              </button>

              {showSearch && <SearchBar onClose={() => setShowSearch(false)} />}
            </div>

            {/* Profile */}
            <div ref={profileRef} className="relative">
              <button
                type="button"
                onClick={() => setShowProfile((prev) => !prev)}
                className="cursor-pointer text-white transition hover:text-[#C19A6B]"
                aria-label="Profile"
              >
                <FiUser size={22} />
              </button>

              {showProfile && <Profile />}
            </div>

            {/* Cart */}
            <button
              type="button"
              onClick={handleCartClick}
              className="relative cursor-pointer text-white transition hover:text-[#C19A6B]"
              aria-label="Shopping cart"
            >
              <FiShoppingBag size={22} />

              {cartCount > 0 && (
                <span
                  className="
                    absolute
                    -right-2
                    -top-0
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-[#C19A6B]
                    text-xs
                    font-bold
                    text-black
                  "
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* =========================
          MOBILE MENU
      ========================= */}

      {isOpen && (
        <aside
          ref={sidebarRef}
          className="
            absolute
            left-0
            top-6
            z-50
            w-80
            overflow-hidden
            rounded-2xl
            border
            border-gray-200
            bg-white
            shadow-2xl
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5">
            <h2 className="text-xl font-bold text-gray-600">
              Thread
              <span className="text-[#C19A6B]">Craft</span>
            </h2>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-gray-600"
              aria-label="Close menu"
            >
              <FiX size={24} />
            </button>
          </div>

          <hr className="border-gray-200" />

          {/* Links */}
          <div className="flex flex-col gap-3 px-5 py-2 text-gray-600">
            {/* Home */}
            <Link
              to="/"
              onClick={handleMobileLinkClick}
              className="group flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <House size={20} />
                <span>Home</span>
              </div>

              <ChevronRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>

            {/* Men's */}
            <Link
              to="/men"
              onClick={handleMobileLinkClick}
              className="group flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <Shirt size={20} />
                <span>Men's</span>
              </div>

              <ChevronRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>

            {/* Women's */}
            <Link
              to="/women"
              onClick={handleMobileLinkClick}
              className="group flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <Sparkles size={20} />
                <span>Women's</span>
              </div>

              <ChevronRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>

            {/* Kids */}
            <Link
              to="/kids"
              onClick={handleMobileLinkClick}
              className="group flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <Baby size={20} />
                <span>Kid's</span>
              </div>

              <ChevronRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>

            {/* New Arrivals */}
            <Link
              to="/new-arrival"
              onClick={handleMobileLinkClick}
              className="group flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <BadgePlus size={20} />
                <span>New Arrivals</span>
              </div>

              <ChevronRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>

            {/* Collections */}
            <Link
              to="/collections"
              onClick={handleMobileLinkClick}
              className="group flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <LayoutGrid size={20} />
                <span>Collections</span>
              </div>

              <ChevronRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>
          </div>
        </aside>
      )}
    </header>
  );
};

export default Navbar;
