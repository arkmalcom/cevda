import React, { useState } from "react";
import SectionHeading from "../SectionHeading";

export interface Service {
  key: string;
  label: string;
  src: string;
  icon: string;
}

const canHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const ServicesStrips: React.FC<{ title: string; services: Service[] }> = ({
  title,
  services,
}) => {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading title={title} />
      </div>

      <div className="mx-auto hidden h-[32rem] max-w-6xl gap-3 px-8 md:flex">
        {services.map((service, index) => {
          const isActive = index === active;
          return (
            <button
              key={service.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(index)}
              onFocus={() => setActive(index)}
              onPointerEnter={() => canHover() && setActive(index)}
              className="group relative min-w-0 overflow-hidden rounded-card text-left shadow-sheet transition-[flex-grow] duration-500 ease-out"
              style={{ flexGrow: isActive ? 5 : 1, flexBasis: 0 }}
            >
              <img
                src={service.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-y-0 left-1/2 h-full w-[40rem] max-w-none -translate-x-1/2 object-cover transition-transform duration-700 ease-out group-hover-fine:scale-[1.03]"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-blue-950/85 via-blue-950/10 to-transparent"
              />
              <span
                aria-hidden
                className={`absolute inset-0 bg-gradient-to-t from-blue-950/40 via-blue-950/60 to-blue-950/30 transition-opacity duration-500 ${
                  isActive ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 flex gap-3 p-5 ${
                  isActive ? "flex-row items-end" : "flex-col-reverse items-center"
                }`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-500 text-blue-950">
                  <i className={`fas ${service.icon}`} aria-hidden />
                </span>
                <span
                  className={`font-display font-extrabold leading-tight text-white ${
                    isActive
                      ? "text-2xl lg:text-3xl"
                      : "rotate-180 whitespace-nowrap text-xl [writing-mode:vertical-rl]"
                  }`}
                >
                  {service.label}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <ul className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 md:hidden">
        {services.map((service) => (
          <li
            key={service.key}
            className="relative aspect-[3/4] w-[72%] shrink-0 snap-start overflow-hidden rounded-card shadow-sheet"
          >
            <img
              src={service.src}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-blue-950/85 via-transparent to-transparent"
            />
            <span className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-blue-950">
                <i className={`fas ${service.icon}`} aria-hidden />
              </span>
              <span className="font-display text-2xl font-extrabold text-white">{service.label}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ServicesStrips;
