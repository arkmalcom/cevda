import React, { useState } from "react";
import logo from "../assets/cevda_logo_tr.png";

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="flex flex-row bg-amber-500 p-4 text-white text-center justify-center items-center h-16 shadow-md border-b-2 border-amber-800 z-10">
      <img
        src={logo}
        alt="nav-logo"
        className="w-12 h-12 inline-block"
      />
      <h1 className="uppercase mx-auto text-base font-title">
        Centro Educativo Villa de Ángeles
      </h1>
      <button
        className="lg:hidden text-white text-2xl ml-auto"
        onClick={toggleMenu}
      >
        <i className="fas fa-bars"></i>
      </button>
      <div
        className={`flex transition-transform duration-300 ease-in-out transform z-10 shadow-md ${
          isMenuOpen ? "translate-y-" : "-translate-y-full"
        } absolute top-0 left-0 w-full h-full bg-amber-500 flex-col text-center space-y-4`}
      >
        <div className="flex-row flex justify-end h-22">
          <img src={logo} alt="nav-logo" className="w-12 h-12 m-2" />
          <button
            className="text-white text-xl ml-auto p-4"
            onClick={toggleMenu}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <a href="#home" className="text-white text-xl">
          Home
        </a>
        <a href="#about" className="text-white text-xl">
          About
        </a>
        <a href="#services" className="text-white text-xl">
          Services
        </a>
        <a href="#contact" className="text-white text-xl">
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
