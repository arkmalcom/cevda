import Hero from "../components/Hero";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";

import { EMAIL_ADDRESS, FULL_ADDRESS, PHONE_NUMBER } from "../utils/Constants";

import ballet from "../assets/services/ballet.jpg";
import estimTemprana from "../assets/services/estim_temprana.jpg";
import flauta from "../assets/services/flauta.jpg";
import informatica from "../assets/services/informatica.jpg";
import carousel1 from "../assets/carousel/carousel1.jpg";
import carousel2 from "../assets/carousel/carousel2.jpg";
import carousel3 from "../assets/carousel/carousel3.jpg";
import carousel4 from "../assets/carousel/carousel4.jpg";
import carousel5 from "../assets/carousel/carousel5.jpg";
import robotica from "../assets/services/robotica.jpg";

import { useTranslation } from "react-i18next";

const serviceImages = [
  { src: robotica, key: "robotics", icon: "fa-robot" },
  { src: estimTemprana, key: "earlyStimulation", icon: "fa-baby" },
  { src: ballet, key: "ballet", icon: "fa-child-dress" },
  { src: flauta, key: "flute", icon: "fa-music" },
  { src: informatica, key: "computerScience", icon: "fa-laptop" },
] as const;

const pillarIcons = ["fa-compass", "fa-eye", "fa-heart"] as const;

const valueIcons = [
  "fa-heart",
  "fa-pray",
  "fa-face-smile",
  "fa-handshake",
  "fa-globe-americas",
  "fa-palette",
  "fa-hands-helping",
] as const;

/** Temporary Unsplash accents — replace with local assets when ready */
const pillarAccents = [
  {
    src: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=240&h=160&q=80",
    alt: "Colored pencils",
    className: "-rotate-6",
  },
  {
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=240&h=160&q=80",
    alt: "Children learning",
    className: "rotate-3",
  },
  {
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=240&h=160&q=80",
    alt: "Friends together",
    className: "-rotate-3",
  },
] as const;

type PillarValue = { title: string; content: string };
type Pillar = {
  title: string;
  content: string;
  values?: PillarValue[];
};

const Home = () => {
  const { t } = useTranslation("home");

  const pillars =
    (t("accordionItems", {
      returnObjects: true,
    }) as Pillar[]) || [];

  const academicOffers =
    (t("academicOffering.list", {
      ns: "home",
      returnObjects: true,
    }) as { title: string; subtext: string; content: string }[]) || [];

  return (
    <div className="flex flex-col">
      <Hero images={[carousel1, carousel2, carousel3, carousel4, carousel5]} />

      <section className="mx-auto w-full max-w-4xl space-y-4 px-6 py-16 md:py-20">
        <FadeIn>
          <h2 className="font-brand text-3xl text-blue-800 md:text-4xl">
            Centro Educativo Villa de Ángeles
          </h2>
        </FadeIn>
        <FadeIn delayMs={100}>
          <p className="font-welcome text-base leading-relaxed text-slate-700 md:text-lg">
            {t("welcome.content")}
          </p>
        </FadeIn>
        <FadeIn delayMs={200}>
          <p className="font-welcome text-lg font-medium text-amber-600">
            {t("welcome.closing")}
          </p>
        </FadeIn>
      </section>

      <section className="overflow-x-clip bg-amber-500/20 px-4 py-14 md:px-8 md:pb-20 md:pt-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-14 md:gap-16">
          <div className="grid gap-10 md:grid-cols-2 md:gap-10">
            {pillars
              .map((pillar, index) => ({ pillar, index }))
              .filter(({ pillar }) => !pillar.values?.length)
              .map(({ pillar, index }) => {
                const accent = pillarAccents[index];

                return (
                  <FadeIn key={pillar.title} delayMs={index * 140}>
                    <article className="group relative h-full border-l-4 border-amber-500 pl-5 md:border-l-0 md:border-t-4 md:pl-0 md:pt-8">
                      {accent && (
                        <div
                          className={`pointer-events-none absolute left-1/2 top-0 z-10 hidden w-24 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg shadow-md ring-2 ring-amber-500/80 md:block ${accent.className}`}
                        >
                          <img
                            src={accent.src}
                            alt={accent.alt}
                            className="h-16 w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="mb-4 flex items-center gap-3 md:flex-col md:items-start md:gap-4">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber-500 text-blue-900 shadow-sm transition-transform duration-300 group-hover:scale-110">
                          <i
                            className={`fas ${pillarIcons[index] ?? "fa-star"} text-xl`}
                            aria-hidden
                          />
                        </span>
                        <h3 className="text-2xl font-bold text-blue-800 md:text-3xl">
                          {pillar.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-700 md:text-base">
                        {pillar.content}
                      </p>
                    </article>
                  </FadeIn>
                );
              })}
          </div>

          {pillars
            .filter((pillar) => pillar.values?.length)
            .map((pillar) => {
              const accent = pillarAccents[2];

              return (
                <FadeIn key={pillar.title} delayMs={200}>
                  <article className="relative border-l-4 border-amber-500 pl-5 md:border-l-0 md:border-t-4 md:pl-0 md:pt-[4rem]">
                    {accent && (
                      <div
                        className={`pointer-events-none absolute left-1/2 top-0 z-10 hidden w-28 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg shadow-md ring-2 ring-amber-500/80 md:block ${accent.className}`}
                      >
                        <img
                          src={accent.src}
                          alt={accent.alt}
                          className="h-16 w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="mb-8 flex items-center gap-3 md:justify-center">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber-500 text-blue-900 shadow-sm">
                        <i className="fas fa-heart text-xl" aria-hidden />
                      </span>
                      <h3 className="text-2xl font-bold text-blue-800 md:text-3xl">
                        {pillar.title}
                      </h3>
                    </div>
                    <ul className="flex flex-wrap justify-center gap-x-8 gap-y-7">
                      {pillar.values!.map((value, valueIndex) => (
                        <li
                          key={value.title}
                          className="flex w-full max-w-xs flex-col items-center text-center sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)] last:-mt-3"
                        >
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-800 text-amber-300">
                            <i
                              className={`fas ${valueIcons[valueIndex] ?? "fa-star"} text-sm`}
                              aria-hidden
                            />
                          </span>
                          <p className="mt-2 font-semibold text-blue-800">
                            {value.title}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-slate-700">
                            {value.content}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </article>
                </FadeIn>
              );
            })}
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-20">
        <FadeIn>
          <SectionHeading
            title={t("academicOffering.title")}
            icon="fa-graduation-cap"
            className="mx-auto max-w-4xl"
          />
        </FadeIn>
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          {academicOffers.map((offer, index) => {
            const isRight = index % 2 === 1;

            return (
              <FadeIn key={offer.title} delayMs={index * 140}>
                <div
                  className={`flex items-start gap-4 ${
                    isRight
                      ? "flex-row-reverse text-right"
                      : "flex-row text-left"
                  }`}
                >
                  <span
                    className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-blue-900 shadow-sm"
                    aria-hidden
                  >
                    <i className="fas fa-check text-lg" />
                  </span>
                  <div className="min-w-0 max-w-xl">
                    <h3 className="text-2xl font-bold text-blue-800 md:text-3xl">
                      {offer.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium uppercase tracking-wide text-amber-600">
                      {offer.subtext}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                      {offer.content}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-x-clip bg-amber-500/20 px-4 py-16 md:px-8 md:py-24">
        <div
          className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-amber-400/25 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-blue-800/10 blur-3xl"
          aria-hidden
        />

        <div className="relative">
          <FadeIn>
            <SectionHeading
              title={t("services.title")}
              icon="fa-star"
              className="mx-auto max-w-6xl"
            />
          </FadeIn>
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
            {serviceImages.map((service, index) => (
              <FadeIn
                key={service.key}
                delayMs={index * 90}
                className={`${
                  index === serviceImages.length - 1 &&
                  serviceImages.length % 2 === 1
                    ? "col-span-2 mx-auto w-full max-w-sm md:col-span-1 md:max-w-none"
                    : ""
                } ${
                  index % 2 === 1 ? "lg:translate-y-6" : "lg:-translate-y-1"
                }`}
              >
                <article className="group relative aspect-[3/4] overflow-hidden rounded-sm shadow-[0_12px_30px_-12px_rgba(30,58,138,0.45)] ring-1 ring-blue-900/10 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_22px_40px_-12px_rgba(30,58,138,0.55)] hover:ring-amber-500/50 md:aspect-[3/5]">
                  <img
                    src={service.src}
                    alt={t(`services.${service.key}`)}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 max-md:object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/25 to-blue-950/5 opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 px-3 pb-4 pt-10">
                    <div className="flex translate-y-1 items-center gap-2 transition-transform duration-500 group-hover:translate-y-0">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 text-blue-900 shadow-sm transition-transform duration-500 group-hover:scale-110">
                        <i
                          className={`fas ${service.icon} text-sm`}
                          aria-hidden
                        />
                      </span>
                      <p className="font-semibold leading-tight text-white drop-shadow-sm">
                        {t(`services.${service.key}`)}
                      </p>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-2xl px-6 py-16">
        <FadeIn>
          <SectionHeading
            title={t("admissionRequirements.title")}
            icon="fa-clipboard-list"
          />
        </FadeIn>
        <FadeIn delayMs={100}>
          <ul className="space-y-3">
            {(
              t("admissionRequirements.list", {
                ns: "home",
                returnObjects: true,
              }) as string[]
            ).map((item, index) => (
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
        <FadeIn delayMs={180}>
          <p className="mb-4 mt-8 font-medium text-blue-800">
            {t("admissionRequirements.ifPreviousSchool")}
          </p>
          <ul className="space-y-3">
            {(
              t("admissionRequirements.previousSchoolRequirements", {
                ns: "home",
                returnObjects: true,
              }) as string[]
            ).map((item, index) => (
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
      </section>

      <section className="mx-auto w-full max-w-2xl px-6 pb-24">
        <FadeIn>
          <SectionHeading
            title={t("contact", { ns: "common" })}
            icon="fa-address-book"
          />
          <ul className="mx-auto mt-2 max-w-md space-y-4">
            <li className="flex items-center gap-3 text-slate-700">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-blue-900"
                aria-hidden
              >
                <i className="fas fa-location-dot" />
              </span>
              <span className="leading-relaxed">{FULL_ADDRESS}</span>
            </li>
            <li className="flex items-center gap-3 text-slate-700">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-blue-900"
                aria-hidden
              >
                <i className="fas fa-phone" />
              </span>
              <a
                href={`tel:${PHONE_NUMBER.replace(/\D/g, "")}`}
                className="leading-relaxed transition-colors hover:text-blue-800"
              >
                {PHONE_NUMBER}
              </a>
            </li>
            <li className="flex items-center gap-3 text-slate-700">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-blue-900"
                aria-hidden
              >
                <i className="fas fa-envelope" />
              </span>
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="leading-relaxed transition-colors hover:text-blue-800"
              >
                {EMAIL_ADDRESS}
              </a>
            </li>
          </ul>
        </FadeIn>
      </section>
    </div>
  );
};

export default Home;
