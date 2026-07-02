import React from "react";
import { Link } from "react-router-dom";

const Bottombar = () => {
  return (
    <div className="w-full h-[40px] bg-gray-400">
      <div className=" max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        <Link to="/" className=" text-sm">
          All
        </Link>
        <Link to="/" className=" text-sm">
          Home
        </Link>
        <Link to="/" className=" text-sm">
          Shop
        </Link>
        <Link to="/" className=" text-sm">
          Man's
        </Link>
        <Link to="/" className=" text-sm">
          Womens
        </Link>
        <Link to="/" className=" text-sm">
          Kids
        </Link>

        <Link to="/" className=" text-sm">
          All
        </Link>
      </div>
    </div>
  );
};

export default Bottombar;
