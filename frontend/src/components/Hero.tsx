import React from "react";
import { m } from "motion/react";
import { useTranslation } from "react-i18next";
import Button from "./ui/Button";
import Sticker from "./Sticker";
import PhotoStack from "./home/PhotoStack";

interface HeroProps {
  images: string[];
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const rise = (delay: number) => ({
  initial: { y: 22 },
  animate: { y: 0 },
  transition: { duration: 0.7, delay, ease: EASE_OUT },
});

const Hero: React.FC<HeroProps> = ({ images }) => {
  const { t } = useTranslation("home");

  return (
    <section className="relative flex items-center overflow-x-clip px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-32 lg:min-h-[100dvh]">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-7">
          <m.h1
            translate="no"
            className="font-brand text-[clamp(2.9rem,11.5vw,4.25rem)] leading-[0.98] text-blue-900 lg:text-[clamp(4.25rem,6.4vw,5.9rem)]"
            {...rise(0)}
          >
            Centro Educativo
            <br />
            Villa de <span className="marker marker-animate">Ángeles</span>
          </m.h1>
          <m.p
            className="mt-7 max-w-[44ch] text-lg leading-relaxed text-[var(--ink-soft)] md:text-xl"
            {...rise(0.12)}
          >
            {t("welcome.header")}
          </m.p>
          <m.div className="mt-9 flex flex-wrap items-center gap-3" {...rise(0.22)}>
            <Button to="/admision" icon="fa-arrow-right" magnetic>
              {t("admission", { ns: "nav" })}
            </Button>
            <Button to="/contacto" variant="outline">
              {t("contact", { ns: "nav" })}
            </Button>
          </m.div>
        </div>

        <m.div
          className="relative lg:col-span-5"
          initial={{ y: 40, rotate: 4 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: EASE_OUT }}
        >
          <Sticker
            name="star"
            rotate={-14}
            parallax={36}
            className="-left-2 -top-8 z-20 h-20 w-20 md:-left-6 md:h-24 md:w-24"
          />
          <Sticker
            name="crown"
            rotate={12}
            parallax={22}
            className="-right-1 top-10 z-20 h-16 w-16 md:-right-6 md:h-20 md:w-20"
          />
          <Sticker
            name="pencil"
            rotate={-28}
            parallax={48}
            className="-left-3 bottom-10 z-20 h-16 w-16 sm:bottom-24 sm:-left-4 sm:h-24 sm:w-24 md:-left-14"
          />
          <PhotoStack photos={images} />
        </m.div>
      </div>
    </section>
  );
};

export default Hero;
