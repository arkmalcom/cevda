import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/cevda_logo_tr.png";

interface HeroProps {
  images: string[];
}

const Hero: React.FC<HeroProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);
  const { t } = useTranslation("home");

  useEffect(() => {
    const reveal = requestAnimationFrame(() => setContentVisible(true));
    return () => cancelAnimationFrame(reveal);
  }, []);

  useEffect(() => {
    if (images.length < 2) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5500);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={image}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1600ms] ease-in-out"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: "40% 30%",
            opacity: index === currentIndex ? 1 : 0,
          }}
          aria-hidden={index !== currentIndex}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/60 via-blue-950/50 to-blue-950/80" />

      <div
        className={`relative z-10 flex h-full flex-col items-center justify-center px-6 text-center transition-all duration-1000 ease-out ${
          contentVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0"
        }`}
      >
        <div className="mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-white/95 p-3 shadow-lg ring-1 ring-white/40 md:h-32 md:w-32">
          <img src={logo} alt="" className="h-full w-full object-contain" />
        </div>
        <h1 className="hero-text font-brand text-4xl leading-tight text-white md:text-6xl lg:text-7xl">
          Centro Educativo
          <br />
          Villa de Ángeles
        </h1>
        <p className="hero-text mt-5 max-w-2xl font-welcome text-base text-white md:text-lg">
          {t("welcome.header")}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/admision"
            className="bg-amber-500 px-6 py-3 text-sm font-semibold tracking-wide text-blue-900 transition-colors duration-300 hover:bg-amber-400 md:text-base"
          >
            {t("admission", { ns: "nav" })}
          </Link>
          <Link
            to="/contacto"
            className="border border-white/70 px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-white/10 md:text-base"
          >
            {t("contact", { ns: "nav" })}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/70">
        <i className="fas fa-chevron-down text-xl" aria-hidden />
      </div>
    </section>
  );
};

export default Hero;
