import React from "react";
import infotepLogo from "../assets/infotep_logo.jpg";
import { useTranslation } from "react-i18next";
import FadeIn from "../components/FadeIn";
import { Link } from "react-router-dom";

const Infotep: React.FC = () => {
  const { t } = useTranslation("infotep");

  const requirements =
    (t("requirements.list", {
      returnObjects: true,
    }) as string[]) || [];

  return (
    <div className="pb-16">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 px-4 pb-24 pt-10 md:pb-28 md:pt-14">
        <div
          className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-amber-400/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl"
          aria-hidden
        />
        <FadeIn>
          <p className="relative text-center text-sm font-medium uppercase tracking-[0.2em] text-amber-300/90">
            {t("eyebrow")}
          </p>
        </FadeIn>
      </section>

      <div className="relative z-10 mx-auto -mt-20 max-w-3xl px-4 md:-mt-24">
        <FadeIn delayMs={80}>
          <div className="mx-auto mb-10 flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-white p-4 shadow-[0_18px_40px_-16px_rgba(30,58,138,0.55)] ring-4 ring-amber-500/80 md:h-52 md:w-52 md:p-5">
            <img
              src={infotepLogo}
              alt="INFOTEP"
              className="h-full w-full object-contain"
            />
          </div>
        </FadeIn>

        <FadeIn delayMs={120}>
          <p className="mb-8 text-center text-base leading-relaxed text-slate-700 md:text-lg">
            {t("description")}
          </p>
        </FadeIn>

        <FadeIn delayMs={160}>
          <h2 className="mb-4 font-title text-xl font-bold text-blue-800 md:text-2xl">
            {t("requirements.title")}
          </h2>
          <ul className="mb-8 space-y-3">
            {requirements.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-slate-700"
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-blue-900"
                  aria-hidden
                >
                  <i className="fas fa-check text-xs leading-none" />
                </span>
                <span className="leading-normal">{item}</span>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delayMs={200}>
          <div className="mb-8 space-y-4 border border-amber-700/15 bg-amber-500/10 p-5 md:p-6">
            <p className="leading-relaxed text-slate-700">
              {t("moreInformation")}
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-700">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-blue-900"
                  aria-hidden
                >
                  <i className="fab fa-whatsapp" />
                </span>
                <a
                  href="https://wa.me/+18498868485"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-blue-800"
                >
                  (849) 886-8485
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-blue-900"
                  aria-hidden
                >
                  <i className="fas fa-clock" />
                </span>
                <span>{t("officeHours")}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-blue-900"
                  aria-hidden
                >
                  <i className="fas fa-envelope" />
                </span>
                <Link
                  to="/contacto"
                  className="transition-colors hover:text-blue-800"
                >
                  {t("contactCta")}
                </Link>
              </li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn delayMs={240}>
          <p className="text-center font-welcome text-lg font-medium text-amber-600 md:text-xl">
            {t("closing")}
          </p>
        </FadeIn>
      </div>
    </div>
  );
};

export default Infotep;
