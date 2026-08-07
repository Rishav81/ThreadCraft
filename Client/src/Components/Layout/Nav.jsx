import { NavLink } from "react-router-dom";

const navClass = ({ isActive }) =>
  ` tracking-wide  font-bold transition-all duration-300  ${
    isActive
      ? "text-[#C19A6B] "
      : "text-white  hover:text-[#C19A6B] hover:scale-105"
  }`;
const navItems = [
  { name: "Men's", path: "/men" },
  { name: "Women's", path: "/women" },
  { name: "Kid's", path: "/kids" },
  { name: "New Arrivals", path: "/new-arrivals" },
  { name: "Collections", path: "/collections" },
];

const Nav = () => {
  return (
    <div className="hidden lg:flex items-center justify-between gap-16 ">
      {navItems.map((item) => (
        <NavLink key={item.path} to={item.path} className={navClass}>
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default Nav;
