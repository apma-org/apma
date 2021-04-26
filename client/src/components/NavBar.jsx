import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Nav Body
export const NavBar = () => {
  return (
    <nav className="font-sans text-green-300 font-extrabold relative flex flex-wrap items-center justify-between px-2 py-3 rounded shadow-md">
      <NavLogic />
    </nav>
  );
};

const NavLogic = () => {
  const history = useHistory();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const currentUserName = localStorage.getItem("currentUserName");
  const currentUserType = localStorage.getItem("currentUserType")

  const handleLogout = () => {
    localStorage.clear(); // remove all storage
    history.push("/login");
  };

  return (
    <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
      <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
        <Link
          className="px-3 py-2 items-center uppercase leading-snug  hover:opacity-75"
          to="/"
        >
          {currentUserName ? `Hello, ${currentUserName}` : `APMA`}
        </Link>
        <button
          className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
          onClick={() => setNavbarOpen((prev) => !prev)}
        >
          <Menu />
        </button>
      </div>
      <div
        className={
          "lg:flex flex-grow items-center" + (navbarOpen ? " flex" : " hidden")
        }
      >
        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
          {currentUserName && currentUserType && currentUserType.toLowerCase() == "landowner" &&
            <li>
              <Link
                className="px-3 py-2 flex items-center uppercase leading-snug  hover:opacity-75"
                to="/properties"
              >
                <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i>
                <span className="ml-3.5">My Properties</span>
              </Link>
            </li>
          }
          {!currentUserName && 
          <>
          <li>
            <Link
              className="px-3 py-2 flex items-center uppercase leading-snug  hover:opacity-75"
              to="/register"
            >
              <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i>
              <span className="ml-3.5">Sign Up</span>
            </Link>
          </li>
          <li>
            <Link
              className="px-3 py-2 flex items-center uppercase leading-snug  hover:opacity-75"
              to="/login"
            >
              <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i>
              <span className="ml-3.5">Login</span>
            </Link>
          </li>
          </>
          }
          <li>
            <Link
              className="px-3 py-2 flex items-center uppercase leading-snug hover:opacity-75"
              to="/about"
            >
              <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i>
              <span className="ml-3.5">About</span>
            </Link>
          </li>
          <li>
            <button
              className="px-3 py-2 flex items-center uppercase leading-snug  hover:opacity-75"
              onClick={handleLogout}
            >
              <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i>
              <span className="ml-3.5">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const Menu = () => (
  <>
    <span className="block relative w-6 h-px rounded-sm bg-green-300"></span>
    <span className="block relative w-6 h-px rounded-sm bg-green-300 mt-1"></span>
    <span className="block relative w-6 h-px rounded-sm bg-green-300 mt-1"></span>
  </>
);
