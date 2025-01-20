import Card from "../components/Card";
import Carousel from "../components/Carousel";
import Accordion from "../components/Accordion";

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
import welcomeBg from "../assets/welcome_bg.jpg";

import { AccordionItem } from "../components/Accordion";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation("home");

  const accordionItems =
    (t("accordionItems", {
      returnObjects: true,
    }) as AccordionItem[]) || [];

  return (
    <>
      <div className="flex flex-col items-center lg:justify-center">
        <div className="w-full space-y-6">
          <div>
            <Carousel
              images={[carousel1, carousel2, carousel3, carousel4, carousel5]}
            />
          </div>
          <div
            className="h-auto bg-contain flex flex-col space-y-2"
            style={{ backgroundImage: `url(${welcomeBg})` }}
          >
            <div className="p-2 bg-amber-500 h-full bg-opacity-70 rounded-md p-2 space-y-3">
              <h1 className="font-title text-xl text-blue-800">
                Centro Educativo Villa de Ángeles
              </h1>
              <p className="text-justify max-lg:text-xs text-white font-welcome">
                {t("welcome.header")}
              </p>
              <p className="text-justify max-lg:text-xs text-white font-welcome">
                {t("welcome.content")}
              </p>
              <p className="text-justify max-lg:text-xs text-white font-welcome">
                {t("welcome.closing")}
              </p>
            </div>
          </div>
          <div>
            <Accordion items={accordionItems} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-center text-blue-800">
              {t("academicOffering.title")}
            </h1>
            <div className="flex max-lg:flex-col max-lg:space-y-4 justify-evenly p-2">
              {(
                t("academicOffering.list", {
                  ns: "home",
                  returnObjects: true,
                }) as any[]
              ).map((offer, index) => (
                <Card
                  key={index}
                  title={offer.title}
                  subtext={offer.subtext}
                  content={offer.content}
                />
              ))}
            </div>
          </div>
          <h1 className="text-center text-3xl text-blue-800 font-bold p-2">
            {t("services.title")}
          </h1>
          <div className="bg-blue-500 flex flex-col items-center">
            <div className="flex flex-col md:flex-row">
              <div className="items-center">
                <div className="relative flex items-center justify-center group">
                  <img
                    src={robotica}
                    alt={t("services.robotics")}
                    className="w-96 lg:h-96 h-36 max-lg:object-top object-cover opacity-35 group-hover:opacity-75 transition-opacity duration-300"
                  />
                  <div className="absolute flex flex-col items-center justify-center text-center border-2 border-amber-200 bg-amber-500 rounded-full w-16 h-16 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                    <i className="fas fa-robot text-blue-800"></i>
                  </div>
                  <div className="absolute top-1/2 mt-8 flex flex-col items-center justify-center group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-bold">
                      {t("services.robotics")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center">
                <div className="relative flex items-center justify-center group">
                  <img
                    src={estimTemprana}
                    alt={t("services.earlyStimulation")}
                    className="w-96 lg:h-96 h-36 max-lg:object-top object-cover opacity-35 group-hover:opacity-50 transition-opacity duration-300"
                  />
                  <div className="absolute flex flex-col items-center justify-center text-center border-2 border-amber-200 bg-amber-500 rounded-full w-16 h-16 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                    <i className="fas fa-baby text-blue-800"></i>
                  </div>
                  <div className="absolute top-1/2 mt-8 flex flex-col items-center justify-center group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-bold">
                      {t("services.earlyStimulation")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center">
                <div className="relative flex items-center justify-center group">
                  <img
                    src={ballet}
                    alt={t("services.ballet")}
                    className="w-96 lg:h-96 h-36 max-lg:object-top object-cover opacity-35 group-hover:opacity-75 transition-opacity duration-300"
                  />
                  <div className="absolute flex flex-col items-center justify-center text-center border-2 border-amber-200 bg-amber-500 rounded-full w-16 h-16 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                    <i className="fas fa-child-dress text-blue-800 text-lg"></i>
                  </div>
                  <div className="absolute top-1/2 mt-8 flex flex-col items-center justify-center group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-bold">
                      {t("services.ballet")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center">
                <div className="relative flex items-center justify-center group">
                  <img
                    src={flauta}
                    alt={t("services.flute")}
                    className="w-96 lg:h-96 h-36 max-lg:object-top object-cover opacity-35 group-hover:opacity-75 transition-opacity duration-300"
                  />
                  <div className="absolute flex flex-col items-center justify-center text-center border-2 border-amber-200 bg-amber-500 rounded-full w-16 h-16 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                    <i className="fas fa-music text-blue-800"></i>
                  </div>
                  <div className="absolute top-1/2 mt-8 flex flex-col items-center justify-center group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-bold">
                      {t("services.flute")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center">
                <div className="relative flex items-center justify-center group">
                  <img
                    src={informatica}
                    alt={t("services.computerScience")}
                    className="w-96 lg:h-96 h-36 max-lg:object-top object-cover opacity-35 group-hover:opacity-75 transition-opacity duration-300"
                  />
                  <div className="absolute flex flex-col items-center justify-center text-center border-2 border-amber-200 bg-amber-500 rounded-full w-16 h-16 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                    <i className="fas fa-laptop text-blue-800"></i>
                  </div>
                  <div className="absolute top-1/2 mt-8 flex flex-col items-center justify-center group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-bold">
                      {t("services.computerScience")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 text-justify lg:w-1/2 mx-auto">
            <h1 className="text-3xl font-bold text-center text-blue-800">
              {t("admissionRequirements.title")}
            </h1>
            <ul className="my-4 list-disc list-inside">
              {(
                t("admissionRequirements.list", {
                  ns: "home",
                  returnObjects: true,
                }) as string[]
              ).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="my-4">
              {t("admissionRequirements.ifPreviousSchool")}
            </p>
            <ul className="list-disc list-inside">
              {(
                t("admissionRequirements.previousSchoolRequirements", {
                  ns: "home",
                  returnObjects: true,
                }) as string[]
              ).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="max-lg:text-sm mx-auto lg:w-1/2 p-2">
            <h1 className="text-blue-800 font-bold space-y-2 text-3xl text-center my-4">
              {t("contact", { ns: "common" })}
            </h1>
            <p>{FULL_ADDRESS}</p>
            <p>
              {t("phone", { ns: "common" })}: {PHONE_NUMBER}
            </p>
            <p>
              {t("email", { ns: "common" })}: {EMAIL_ADDRESS}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
