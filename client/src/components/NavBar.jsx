import React from "react";

// Nav Body
export const NavBar = () => {
  return (
    <nav className="font-sans text-green-300 font-extrabold relative flex flex-wrap items-center justify-between px-2 py-3 rounded shadow-md">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
          <a
            className="text-base leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            href="/"
          >
            APMA
          </a>
          <Menu />
        </div>
        <NavList />
      </div>
    </nav>
  );
};

// Nav Links
const NavList = () => (
  <div className="flex lg:flex-grow items-center">
    <ul className="flex flex-col text-base lg:flex-row list-none ml-auto">
      <li className="nav-item">
        <a
          className="px-3 py-2 flex font-black items-center uppercase leading-snug  hover:opacity-75"
          href="/register"
        >
          Sign Up
        </a>
      </li>
      <li className="nav-item">
        <a
          className="px-3 py-2 flex items-center uppercase leading-snug  hover:opacity-75"
          href="/login"
        >
          Login
        </a>
      </li>
      <li className="nav-item">
        <a
          className="px-3 py-2 flex items-center uppercase leading-snug hover:opacity-75"
          href="/about"
        >
          About
        </a>
      </li>
    </ul>
  </div>
);

// Nav Icon
const Menu = () => (
  <button
    className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
    type="button"
  >
    <span className="block relative w-6 h-px rounded-sm bg-blue-400"></span>
    <span className="block relative w-6 h-px rounded-sm bg-blue-400 mt-1"></span>
    <span className="block relative w-6 h-px rounded-sm bg-blue-400 mt-1"></span>
  </button>
);
