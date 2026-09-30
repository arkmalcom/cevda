import React from "react";
import { useTranslation } from "react-i18next";
import infotepLogo from "../assets/infotep_logo.jpg";
import PageIntro from "../components/PageIntro";
import Reveal from "../components/Reveal";
import { TransitionLink } from "../components/ui/TransitionLink";
import { PHONE_NUMBER } from "../utils/Constants";

const InfoRow: React.FC<{ icon: string; children: React.ReactNode }> = ({ icon, children }) => (
  <li className="flex items-center gap-4 text-ink">
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-500 text-blue-950"
      aria-hidden
    >
      <i className={icon} />
    </span>
    <span className="text-[17px]">{children}</span>
  </li>
);

const Infotep: React.FC = () => {
  const { t } = useTranslation("infotep");
  const requirements = t("requirements.list", { returnObjects: true });
  const requirementList = Array.isArray(requirements) ? (requirements as string[]) : [];

  return (
    <div>
      <PageIntro title={t("title")} lead={t("eyebrow")} stickers={["laurel", "pencil"]} />

      <div className="relative mx-auto -mt-10 grid max-w-5xl gap-6 px-4 md:-mt-14 md:grid-cols-12 md:px-8">
        <Reveal className="sheet flex flex-col items-center gap-6 p-6 text-center md:col-span-7 md:flex-row md:items-start md:p-8 md:text-left">
          <span className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-3 shadow-sheet ring-1 ring-blue-900/10 md:h-32 md:w-32">
            <img src={infotepLogo} alt="INFOTEP" className="h-full w-full object-contain" />
          </span>
          <p className="max-w-[60ch] text-[17px] leading-relaxed text-ink md:text-lg">
            {t("description")}
          </p>
        </Reveal>

        <Reveal delayMs={80} className="sheet p-6 md:col-span-5 md:p-8">
          <h2 className="font-display text-2xl font-extrabold text-blue-900">
            {t("requirements.title")}
          </h2>
          <ul className="mt-5 space-y-3">
            {requirementList.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[17px] text-ink">
                <i className="fas fa-circle-check mt-1 text-blue-900" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delayMs={120} className="rounded-card bg-blue-50 p-6 md:col-span-12 md:p-8">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <p className="text-lg leading-relaxed text-ink">{t("moreInformation")}</p>
            <ul className="space-y-4">
              <InfoRow icon="fab fa-whatsapp">
                <a
                  href="https://wa.me/+18498868485"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-900 underline decoration-amber-500 decoration-2 underline-offset-4"
                >
                  {PHONE_NUMBER}
                </a>
              </InfoRow>
              <InfoRow icon="fas fa-clock">{t("officeHours")}</InfoRow>
              <InfoRow icon="fas fa-envelope">
                <TransitionLink
                  to="/contacto"
                  className="font-semibold text-blue-900 underline decoration-amber-500 decoration-2 underline-offset-4"
                >
                  {t("contactCta")}
                </TransitionLink>
              </InfoRow>
            </ul>
          </div>
        </Reveal>

        <p className="-rotate-2 text-center font-hand text-2xl font-semibold text-amber-ink md:col-span-12 md:text-3xl">
          {t("closing")}
        </p>
      </div>
    </div>
  );
};

export default Infotep;
