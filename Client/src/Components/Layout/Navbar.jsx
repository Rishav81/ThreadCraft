import { Link, NavLink } from "react-router-dom";
import { FiSearch, FiHeart, FiShoppingBag, FiUser } from "react-icons/fi";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 ">
      <nav
        className="
          max-w-7xl
          mx-auto
          mt-2
          p-4

    
         
        "
      >
        <div className="flex items-center justify-between   ">
          {/* Logo */}
          <Link to="/" className="font-black tracking-wider text-white">
            <span className="hidden md:inline text-3xl">
              Thread<span className="text-[#C19A6B]">Craft</span>
            </span>

            <span className="md:hidden text-4xl">
              T<span className="text-[#C19A6B]">C</span>
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden lg:flex gap-10">
            <NavLink
              to="/men"
              className="text-white hover:text-[#C19A6B] transition"
            >
              Men's
            </NavLink>

            <NavLink
              to="/women"
              className="text-white hover:text-[#C19A6B] transition"
            >
              Women
            </NavLink>

            <NavLink
              to="/kids"
              className="text-white hover:text-[#C19A6B] transition"
            >
              Kids
            </NavLink>

            <NavLink
              to="/new-arrivals"
              className="text-white hover:text-[#C19A6B] transition"
            >
              New Arrivals
            </NavLink>

            <NavLink
              to="/collections"
              className="text-white hover:text-[#C19A6B] transition"
            >
              Collections
            </NavLink>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            <button className="text-white hover:text-[#C19A6B] transition">
              <FiSearch size={22} />
            </button>

            <button className="text-white hover:text-[#C19A6B] transition">
              <FiHeart size={22} />
            </button>

            <button className="text-white hover:text-[#C19A6B] transition">
              <FiUser size={22} />
            </button>

            <button className="relative text-white hover:text-[#C19A6B] transition">
              <FiShoppingBag size={22} />

              <span
                className="
                  absolute
                  -top-2
                  -right-2
                  h-5
                  w-5
                  rounded-full
                  bg-[#C19A6B]
                  text-black
                  text-xs
                  flex
                  items-center
                  justify-center
                  font-bold
                "
              >
                0
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
