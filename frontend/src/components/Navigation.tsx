import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/cevda_logo_tr.png";
import smartTeamLogo from "../assets/smart_team_logo_tr.png";
import { useTranslation } from "react-i18next";

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isTransparent = isHome && !isScrolled && !isMenuOpen;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
      return;
    }

    const onScroll = () => {
      setIsScrolled(window.scrollY > 48);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const linkClass = `text-lg transition-colors duration-300 ${
    isTransparent
      ? "text-white/95 hover:text-amber-300"
      : "text-white hover:text-blue-900"
  }`;

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
        isTransparent ? "bg-transparent shadow-none" : "bg-amber-500 shadow-md"
      }`}
    >
      <div className="flex h-16 w-full min-w-0 flex-row items-center gap-3 p-4">
        <Link
          to="/"
          className="flex min-w-0 flex-1 items-center gap-2 lg:flex-none"
        >
          <img
            src={logo}
            alt="nav-logo"
            className={`inline-block h-12 w-12 shrink-0 transition-[filter] duration-500 ${
              isTransparent ? "brightness-0 invert drop-shadow-md" : ""
            }`}
          />
          <h1
            className={`font-brand leading-tight transition-colors duration-500 ${
              isTransparent ? "text-white" : "text-blue-800"
            }`}
          >
            <span className="text-base sm:hidden">CEVDA</span>
            <span className="hidden whitespace-nowrap text-base sm:inline md:text-lg lg:text-xl">
              Centro Educativo Villa de Ángeles
            </span>
          </h1>
          <span
            className={`hidden shrink-0 rounded-md p-1 transition-colors duration-500 xl:block ${
              isTransparent ? "bg-white/95 shadow-sm" : ""
            }`}
          >
            <img
              src={smartTeamLogo}
              alt="smart-team-logo"
              className="h-8 w-14"
            />
          </span>
        </Link>
        <div className="ml-auto flex shrink-0 items-center justify-end">
          <span
            className={`mx-3 block rounded-md p-1 transition-colors duration-500 md:hidden ${
              isTransparent ? "bg-white/95 shadow-sm" : ""
            }`}
          >
            <img
              src={smartTeamLogo}
              alt="smart-team-logo"
              className="h-6 w-12"
            />
          </span>
          <button
            className={`text-2xl lg:hidden ${
              isTransparent ? "text-white" : "text-white"
            }`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="hidden items-center gap-3 lg:flex xl:gap-4">
            <Link to="/" className={linkClass}>
              {t("home", { ns: "nav" })}
            </Link>
            <Link to="/admision" className={linkClass}>
              {t("admission", { ns: "nav" })}
            </Link>
            <Link to="/caracteristicas" className={linkClass}>
              {t("features", { ns: "nav" })}
            </Link>
            <Link to="/infotep" className={linkClass}>
              Infotep
            </Link>
            <Link to="/carreras" className={linkClass}>
              {t("careers", { ns: "nav" })}
            </Link>
            <Link to="/contacto" className={linkClass}>
              {t("contact", { ns: "nav" })}
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`absolute left-0 top-0 z-10 flex h-screen w-full flex-col space-y-4 bg-amber-500 text-center shadow-md transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen
            ? "translate-y-0 pointer-events-auto"
            : "-translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex h-22 flex-row justify-end">
          <img src={logo} alt="nav-logo" className="m-2 h-12 w-12" />
          <button
            className="ml-auto p-4 text-xl text-white"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <Link to="/" className="text-xl text-white" onClick={toggleMenu}>
          {t("home", { ns: "nav" })}
        </Link>
        <Link
          to="/admision"
          className="text-xl text-white"
          onClick={toggleMenu}
        >
          {t("admission", { ns: "nav" })}
        </Link>
        <Link
          to="/caracteristicas"
          className="text-xl text-white"
          onClick={toggleMenu}
        >
          {t("features", { ns: "nav" })}
        </Link>
        <Link to="/infotep" className="text-xl text-white" onClick={toggleMenu}>
          Infotep
        </Link>
        <Link
          to="/carreras"
          className="text-xl text-white"
          onClick={toggleMenu}
        >
          {t("careers", { ns: "nav" })}
        </Link>
        <Link
          to="/contacto"
          className="text-xl text-white"
          onClick={toggleMenu}
        >
          {t("contact", { ns: "nav" })}
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
