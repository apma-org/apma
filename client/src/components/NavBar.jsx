import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";

// Nav Body
export const NavBar = () => {
  return (
    <nav className="font-sans text-green-300 font-extrabold relative flex flex-wrap items-center justify-between px-2 py-3 rounded shadow-md">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
          <Link
            className="px-3 py-2 flex items-center uppercase leading-snug  hover:opacity-75"
            to="/"
          >
            APMA
          </Link>
          <Menu />
        </div>
        <NavList />
      </div>
    </nav>
  );
};

// Nav Links
const NavList = () => {
  const history = useHistory();
  const { updateUser } = useContext(UserContext);

  const handleLogout = () => {
    updateUser(null); // set user to null
    localStorage.clear(); // remove all storage
    history.push("/login");
  };

  return (
    <div className="flex lg:flex-grow items-center">
      <ul className="flex flex-col text-base lg:flex-row list-none ml-auto">
        <li>
          <Link
            className="px-3 py-2 flex font-black items-center uppercase leading-snug  hover:opacity-75"
            to="/register"
          >
            Sign Up
          </Link>
        </li>
        <li>
          <Link
            className="px-3 py-2 flex items-center uppercase leading-snug  hover:opacity-75"
            to="/login"
          >
            Login
          </Link>
        </li>
        <li>
          <button
            className="px-3 py-2 flex items-center uppercase leading-snug  hover:opacity-75 font-extrabold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
        <li>
          <Link
            className="px-3 py-2 flex items-center uppercase leading-snug hover:opacity-75"
            to="/about"
          >
            About
          </Link>
        </li>
      </ul>
    </div>
  );
};

// Nav Icon
const Menu = () => (
  // TODO: ADD ONCLICK HIDE
  <button
    className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
    type="button"
  >
    <span className="block relative w-6 h-px rounded-sm bg-green-300"></span>
    <span className="block relative w-6 h-px rounded-sm bg-green-300 mt-1"></span>
    <span className="block relative w-6 h-px rounded-sm bg-green-300 mt-1"></span>
  </button>
);
