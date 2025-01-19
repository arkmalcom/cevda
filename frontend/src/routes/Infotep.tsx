import React from "react";
import infotepLogo from "../assets/infotep_logo.jpg";
import { useTranslation } from "react-i18next";

const Infotep: React.FC = () => {
  const { t } = useTranslation("infotep");

  return (
    <div className="flex flex-col text-justify">
      <div className="mx-auto">
        <img
          src={infotepLogo}
          alt="infotep-logo"
          className="lg:w-96 lg:h-96 w-64 h-64"
        />
      </div>
      <hr />
      <div className="space-y-4">
        <p>
          {t("description")}
        </p>
        <p>{t("requirements.title")}</p>
        <ul className="list-disc list-inside">
          {(
                t("requirements.list", {
                  returnObjects: true,
                }) as string[]
              ).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
        </ul>
        <p>
          {t("moreInformation")}
        </p>
        <p className="pb-2">{t("closing")}</p>
      </div>
    </div>
  );
};

export default Infotep;
