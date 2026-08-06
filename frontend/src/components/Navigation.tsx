import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/cevda_logo_tr.png";
import { useTranslation } from "react-i18next";

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isTransparent = isHome && !isScrolled && !isMenuOpen;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { to: "/", label: t("home", { ns: "nav" }), icon: "fa-house" },
    {
      to: "/admision",
      label: t("admission", { ns: "nav" }),
      icon: "fa-file-pen",
    },
    {
      to: "/caracteristicas",
      label: t("features", { ns: "nav" }),
      icon: "fa-list-check",
    },
    { to: "/infotep", label: "Infotep", icon: "fa-certificate" },
    {
      to: "/carreras",
      label: t("careers", { ns: "nav" }),
      icon: "fa-briefcase",
    },
    {
      to: "/contacto",
      label: t("contact", { ns: "nav" }),
      icon: "fa-address-book",
    },
  ];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

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
        </Link>
        <div className="ml-auto flex shrink-0 items-center justify-end">
          <button
            className="text-2xl text-white lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="hidden items-center gap-3 lg:flex xl:gap-4">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 flex h-[100dvh] w-full flex-col overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 transition-all duration-300 ease-out lg:hidden ${
          isMenuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div
          className="pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 bottom-32 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl"
          aria-hidden
        />

        <div className="relative flex items-center justify-between px-5 pt-5">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white p-1.5 shadow-lg ring-2 ring-amber-400/80">
              <img
                src={logo}
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <p className="font-brand text-lg leading-tight text-white">
                CEVDA
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-amber-300/90">
                Villa de Ángeles
              </p>
            </div>
          </div>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl text-white transition-colors hover:bg-white/20"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <nav className="relative flex flex-1 flex-col justify-center gap-2 px-6 py-8">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.to;

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={toggleMenu}
                style={{
                  transitionDelay: isMenuOpen ? `${80 + index * 40}ms` : "0ms",
                }}
                className={`group flex items-center gap-4 rounded-xl px-4 py-3.5 transition-all duration-300 ${
                  isMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0"
                } ${
                  isActive
                    ? "bg-amber-500 text-blue-950 shadow-lg shadow-amber-500/20"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                    isActive
                      ? "bg-blue-900 text-amber-300"
                      : "bg-white/10 text-amber-300 group-hover:bg-white/15"
                  }`}
                >
                  <i className={`fas ${item.icon}`} aria-hidden />
                </span>
                <span className="font-title text-xl font-semibold tracking-wide">
                  {item.label}
                </span>
                <i
                  className={`fas fa-chevron-right ml-auto text-sm transition-transform group-hover:translate-x-1 ${
                    isActive ? "text-blue-900/50" : "text-white/30"
                  }`}
                  aria-hidden
                />
              </Link>
            );
          })}
        </nav>

        <div className="relative border-t border-white/10 px-6 py-5">
          <p className="text-center text-xs text-white/50">
            Centro Educativo Villa de Ángeles
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
