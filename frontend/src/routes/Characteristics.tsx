import React from "react";
import { useTranslation } from "react-i18next";

import characteristicsBg from "../assets/characteristics_bg.jpg";

interface Characteristic {
  icon: JSX.Element;
  i18nKey: string;
}

const characteristics: Characteristic[] = [
  {
    icon: <p className="text-3xl">🍼</p>,
    i18nKey: "daycare",
  },
  {
    icon: <p className="text-3xl">⏰</p>,
    i18nKey: "schedule",
  },
  {
    icon: <p className="text-3xl">🏐</p>,
    i18nKey: "summerCamp",
  },
  {
    icon: <p className="text-3xl">📚</p>,
    i18nKey: "homework",
  },
  {
    icon: <p className="text-3xl">👶</p>,
    i18nKey: "earlyStimulation",
  },
  {
    icon: <p className="text-3xl">🎭</p>,
    i18nKey: "extracurricularActivities",
  },
  {
    icon: <p className="text-3xl">🌳</p>,
    i18nKey: "outdoorSpaces",
  },
  {
    icon: <p className="text-3xl">💡</p>,
    i18nKey: "dynamicLearning",
  },
];

const Characteristics: React.FC = () => {
  const { t } = useTranslation("features");

  return (
    <div
      className="flex flex-col space-y-3 bg-cover bg-bottom"
      style={{ backgroundImage: `url(${characteristicsBg})` }}
    >
      <h1 className="p-1 font-bold text-blue-800 text-center lg:text-xl font-welcome">
        {t("title")}
      </h1>
      <ul>
        {characteristics.map((item, index) => (
          <li key={index} className="flex flex-col">
            <span className="m-2 font-bold text-blue-800">
              {item.icon} {t(`${item.i18nKey}.title`)}
            </span>
            <p className="m-2 text-justify">{t(`${item.i18nKey}.content`)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Characteristics;
