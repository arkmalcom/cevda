import { useTranslation } from "react-i18next";

import Hero from "../components/Hero";
import Reveal from "../components/Reveal";
import Sticker from "../components/Sticker";
import MissionVision from "../components/home/MissionVision";
import ValuesSection from "../components/home/ValuesSection";
import LevelsSection from "../components/home/LevelsSection";
import ServicesStrips, { type Service } from "../components/home/ServicesStrips";
import RequirementsClipboard from "../components/home/RequirementsClipboard";
import NoticesStrip from "../components/home/NoticesStrip";

import photo1 from "../assets/web/photo1.webp";
import photo2 from "../assets/web/photo2.webp";
import photo3 from "../assets/web/photo3.webp";
import photo4 from "../assets/web/photo4.webp";
import photo5 from "../assets/web/photo5.webp";
import robotica from "../assets/web/robotica.webp";
import estimTemprana from "../assets/web/estim_temprana.webp";
import ballet from "../assets/web/ballet.webp";
import flauta from "../assets/web/flauta.webp";
import informatica from "../assets/web/informatica.webp";

const serviceMeta = [
  { key: "robotics", src: robotica, icon: "fa-robot" },
  { key: "earlyStimulation", src: estimTemprana, icon: "fa-baby" },
  { key: "ballet", src: ballet, icon: "fa-child-dress" },
  { key: "flute", src: flauta, icon: "fa-music" },
  { key: "computerScience", src: informatica, icon: "fa-laptop" },
] as const;

type Pillar = {
  title: string;
  content: string;
  values?: { title: string; content: string }[];
};

type Level = { title: string; subtext: string; content: string };

const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

const Home = () => {
  const { t } = useTranslation("home");

  const pillars = asArray<Pillar>(t("accordionItems", { returnObjects: true }));
  const statements = pillars.filter((pillar) => !pillar.values?.length);
  const valuesPillar = pillars.find((pillar) => pillar.values?.length);
  const levels = asArray<Level>(t("academicOffering.list", { returnObjects: true }));
  const services: Service[] = serviceMeta.map((service) => ({
    ...service,
    label: t(`services.${service.key}`),
  }));

  return (
    <div className="flex flex-col">
      <Hero images={[photo1, photo2, photo3, photo4, photo5]} />

      <section id="welcome" className="px-5 py-16 md:px-8 md:py-24">
        <Reveal className="relative mx-auto grid max-w-6xl gap-10 md:grid-cols-12 md:gap-8">
          <p className="text-xl leading-relaxed text-ink md:col-span-8 md:text-[1.4rem] md:leading-relaxed">
            {t("welcome.content")}
          </p>
          <div className="relative self-end md:col-span-4">
            <Sticker
              name="star"
              rotate={10}
              parallax={10}
              bob={false}
              className="-top-14 right-4 h-14 w-14 md:-top-16"
            />
            <p className="-rotate-3 font-hand text-2xl font-semibold leading-snug text-amber-ink md:text-[1.75rem]">
              {t("welcome.closing")}
            </p>
          </div>
        </Reveal>
      </section>

      <NoticesStrip />

      <MissionVision mission={statements[0]} vision={statements[1]} />

      {valuesPillar?.values && (
        <ValuesSection title={valuesPillar.title} values={valuesPillar.values} />
      )}

      <LevelsSection title={t("academicOffering.title")} levels={levels} />

      <ServicesStrips title={t("services.title")} services={services} />

      <RequirementsClipboard />
    </div>
  );
};

export default Home;
