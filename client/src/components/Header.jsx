import React from "react";

export const Header = ({ title }) => {
  return (
    <header className="text-3xl font text-green-300">
      <div className="flex justify-center items-center bg-dark px-16 py-7 space-x-7 h-20">
        {title}
      </div>
    </header>
  );
};
