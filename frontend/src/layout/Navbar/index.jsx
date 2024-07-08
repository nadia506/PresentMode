import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavItem from "./Sections/NavItem";
import { FaHeart } from "react-icons/fa";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <section className="relative z-10 border-b-2 bg-gray-400">
      <div className="w-full">
        <div className="flex items-center justify-between mx-5 sm:mx-10 lg:mx-20">
          <div className="flex items-center text-2xl h-14">
            <Link to="/">
              <FaHeart />
            </Link>
          </div>
          <div className="text-3xl flex-1 text-center md:pl-48">
            Present Mode
          </div>

          {/* menu button */}
          <div className="text-2xl sm:hidden">
            <button onClick={handleMenu}>{menu ? "-" : "+"}</button>
          </div>

          {/* big screen nav-items */}
          <div className="hidden sm:block">
            <NavItem />
          </div>
        </div>

        {/* mobile nav-items */}
        <div className="block sm:hidden">{menu && <NavItem mobile />}</div>
      </div>
    </section>
  );
};

export default Navbar;
