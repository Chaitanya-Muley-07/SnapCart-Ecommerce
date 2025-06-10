import { React, useState } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import CartDrawer from "./CartDrawer";

import { User } from "lucide-react";
import LogOutToggle from "./LogOutToggle";
import { useSelector } from "react-redux";

const Navbar = () => {

 const {isAuthenticated,user}=useSelector((state) => state.auth);
  return (
    <nav className="flex justify-between items-center px-8 py-5 border-b dark:bg-zinc-900">
      {/* icons*/}
      <div className="flex items-center gap-4">
        <ModeToggle />
        <CartDrawer />
        {isAuthenticated ? (
          <LogOutToggle  user={user}/>
        ) : (
          <Link to="/login" >
            <User
              className="text-gray-800 dark:text-white hover:scale-105 transition-all ease-in-out cursor-pointer"
              size={28}
              strokeWidth={1.3}
            />
          </Link>
        )}
      </div>
      <Link to={"/"} className="flex items-center text-2xl font-bold">
        SnapCart
      </Link>
      <ul className="hidden sm:flex text-xl gap-2">
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/faq">Faqs</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
