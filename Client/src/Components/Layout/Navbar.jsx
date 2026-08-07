import { Link } from "react-router-dom";

import { useEffect, useRef, useState } from "react";
import { FiSearch, FiShoppingBag, FiUser, FiMenu, FiX } from "react-icons/fi";
import Nav from "./Nav";
import Profile from "./Profile";
import SearchBar from "./SearchBar";
import {
  Baby,
  BadgePlus,
  ChevronRight,
  House,
  LayoutGrid,
  Shirt,
  Sparkles,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const profileRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 ">
      <nav
        className="
  max-w-7xl
  mx-auto
  mt-2 md:mt-3 lg:mt-4
  px-2 md:px-4 lg:px-6
  py-2


"
      >
        <div className="flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden text-white"
            >
              <FiMenu size={26} />
            </button>

            <Link to="/" className="font-black tracking-wider text-white">
              <span className="hidden md:inline text-4xl ">
                Thread<span className="text-[#C19A6B]">Craft</span>
              </span>

              <span className="md:hidden text-4xl">
                T<span className="text-[#C19A6B]">C</span>
              </span>
            </Link>
          </div>

          <Nav />

          {/* Right */}
          <div className="flex items-center gap-5">
            <div>
              <button
                onClick={() => setShowSearch(true)}
                className="   text-white hover:text-[#C19A6B] transition cursor-pointer"
              >
                <FiSearch size={22} />
              </button>

              {showSearch && <SearchBar onClose={() => setShowSearch(false)} />}
            </div>

            <div ref={profileRef}>
              <button
                onClick={() => setShowProfile((prev) => !prev)}
                className="text-white hover:text-[#C19A6B] transition cursor-pointer"
              >
                <FiUser size={22} />
              </button>

              {showProfile && <Profile />}
            </div>

            <button className=" relative text-white hover:text-[#C19A6B] transition cursor-pointer">
              <FiShoppingBag size={22} />

              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[#C19A6B] text-black text-xs flex items-center justify-center font-bold">
                0
              </span>
            </button>
          </div>
        </div>
      </nav>

      <>
        {isOpen && (
          <aside
            ref={sidebarRef}
            className={`absolute left-0 top-6 z-50 w-80 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between  p-5 border-white/10">
              <h2 className="text-xl font-bold text-gray-600">
                Thread<span className="text-[#C19A6B]">Craft</span>
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>

            <hr className="text-gray-600" />

            <div className="flex flex-col px-5 py-2 gap-3 text-gray-600">
              <Link
                to="/"
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

              <Link
                to="/men"
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

              <Link
                to="/women"
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

              <Link
                to="/kids"
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

              <Link
                to="/new-arrivals"
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

              <Link
                to="/collections"
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
      </>
    </header>
  );
};

export default Navbar;
