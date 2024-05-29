import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-200 py-3 shadow-sm">
      <div className="flex gap-3 items-center">
        <div className="h-14 w-14 ml-4 lg:ml-6">
          <img src="/images/logo.png" alt="logo" />
        </div>
        <p className="text-lg lg:text-xl text-gray-800 font-medium uppercase">Weather App</p>
      </div>
    </nav>
  );
};

export default Navbar;
