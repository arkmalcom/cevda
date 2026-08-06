import React from "react";
import { useTranslation } from "react-i18next";
import SectionHeading from "../components/SectionHeading";
import FadeIn from "../components/FadeIn";

interface Characteristic {
  icon: string;
  i18nKey: string;
}

const characteristics: Characteristic[] = [
  { icon: "fa-baby", i18nKey: "daycare" },
  { icon: "fa-clock", i18nKey: "schedule" },
  { icon: "fa-sun", i18nKey: "summerCamp" },
  { icon: "fa-book", i18nKey: "homework" },
  { icon: "fa-child", i18nKey: "earlyStimulation" },
  { icon: "fa-masks-theater", i18nKey: "extracurricularActivities" },
  { icon: "fa-tree", i18nKey: "outdoorSpaces" },
  { icon: "fa-lightbulb", i18nKey: "dynamicLearning" },
];

const Characteristics: React.FC = () => {
  const { t } = useTranslation("features");

  return (
    <div className="bg-amber-500/10 px-4 py-10 md:px-8 md:py-14">
      <FadeIn>
        <SectionHeading
          title={t("title")}
          icon="fa-list-check"
          className="mx-auto max-w-3xl"
        />
      </FadeIn>

      <FadeIn delayMs={100}>
        <article className="notebook-paper mx-auto max-w-3xl shadow-[0_18px_50px_-28px_rgba(30,58,138,0.4)]">
          <ul className="notebook-paper__list">
            {characteristics.map((item) => (
              <li key={item.i18nKey} className="notebook-paper__item">
                <div className="notebook-paper__title">
                  <span className="notebook-paper__icon" aria-hidden>
                    <i className={`fas ${item.icon}`} />
                  </span>
                  <h2>{t(`${item.i18nKey}.title`)}</h2>
                </div>
                <p className="notebook-paper__body">
                  {t(`${item.i18nKey}.content`)}
                </p>
              </li>
            ))}
          </ul>
        </article>
      </FadeIn>
    </div>
  );
};

export default Characteristics;
