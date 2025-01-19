import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/cevda_logo_tr.png";
import { useTranslation } from "react-i18next";

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div>
      <nav className="flex flex-row bg-amber-500 p-4 text-blue-8 h-16 shadow-md z-10">
        <div className="flex flex-row items-center space-x-1 lg:w-96">
          <img src={logo} alt="nav-logo" className="w-12 h-12 inline-block" />
          <h1 className="uppercase text-lg font-title">
            Centro Educativo Villa de Ángeles
          </h1>
        </div>
        <div className="flex items-center w-full justify-end">
          <button
            className="lg:hidden text-white text-2xl ml-auto"
            onClick={toggleMenu}
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="hidden lg:flex space-x-4">
            <Link to="/" className="text-white text-xl">
              {t("home", { ns: "nav" })}
            </Link>
            <Link to="/admision" className="text-white text-xl">
              {t("admission", { ns: "nav" })}
            </Link>
            <Link to="/caracteristicas" className="text-white text-xl">
              {t("features", { ns: "nav" })}
            </Link>
            <Link to="/infotep" className="text-white text-xl">
              Infotep
            </Link>
            <Link to="/carreras" className="text-white text-xl">
              {t("careers", { ns: "nav" })}
            </Link>
            <Link to="/contacto" className="text-white text-xl">
              {t("contact", { ns: "nav" })}
            </Link>
          </div>
        </div>
        <div
          className={`lg:hidden flex transition-transform duration-300 ease-in-out transform z-10 shadow-md ${
            isMenuOpen ? "translate-y-0" : "-translate-y-full"
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
          <Link to="/" className="text-white text-xl" onClick={toggleMenu}>
            {t("home", { ns: "nav" })}
          </Link>
          <Link
            to="/admision"
            className="text-white text-xl"
            onClick={toggleMenu}
          >
            {t("admission", { ns: "nav" })}
          </Link>
          <Link
            to="/caracteristicas"
            className="text-white text-xl"
            onClick={toggleMenu}
          >
            {t("features", { ns: "nav" })}
          </Link>
          <Link
            to="/infotep"
            className="text-white text-xl"
            onClick={toggleMenu}
          >
            Infotep
          </Link>
          <Link
            to="/carreras"
            className="text-white text-xl"
            onClick={toggleMenu}
          >
            {t("careers", { ns: "nav" })}
          </Link>
          <Link
            to="/contacto"
            className="text-white text-xl"
            onClick={toggleMenu}
          >
            {t("contact", { ns: "nav" })}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
