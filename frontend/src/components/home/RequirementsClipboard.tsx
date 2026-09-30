import React, { useRef } from "react";
import { useInView } from "motion/react";
import { useTranslation } from "react-i18next";
import SectionHeading from "../SectionHeading";
import Button from "../ui/Button";
import Sticker from "../Sticker";
import { stickerArt } from "../stickerArt";

const CHECK_STAGGER_MS = 70;

const CheckList: React.FC<{ items: string[]; offset?: number }> = ({ items, offset = 0 }) => (
  <ul className="notebook-paper__list">
    {items.map((item, index) => (
      <li key={item} className="flex items-start gap-3">
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="check-draw mt-[0.2rem] h-6 w-6 shrink-0"
          style={{ "--delay": `${(offset + index) * CHECK_STAGGER_MS}ms` } as React.CSSProperties}
        >
          <path
            d="M4 12.5 9.5 18 20 6"
            fill="none"
            stroke="var(--crest)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[17px] text-ink">{item}</span>
      </li>
    ))}
  </ul>
);

const RequirementsClipboard: React.FC = () => {
  const { t } = useTranslation("home");
  const sheetRef = useRef<HTMLDivElement>(null);
  const drawn = useInView(sheetRef, { once: true, amount: 0.25 });

  const requirements = t("admissionRequirements.list", { returnObjects: true }) as string[];
  const previousSchool = t("admissionRequirements.previousSchoolRequirements", {
    returnObjects: true,
  }) as string[];

  return (
    <section className="px-5 pb-4 pt-20 md:px-8 md:pt-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title={t("admissionRequirements.title")} />
        <div className="relative rounded-card bg-blue-900 p-3 pt-12 shadow-lift md:p-5 md:pt-14">
          <img
            src={stickerArt.clip}
            alt=""
            aria-hidden
            className="sticker absolute left-1/2 top-0 z-10 w-36 -translate-x-1/2 -translate-y-1/2 md:w-44"
          />
          <Sticker
            name="star"
            rotate={16}
            parallax={14}
            className="-right-5 -top-6 z-10 h-20 w-20"
          />
          <div ref={sheetRef} className={`notebook-paper ${drawn ? "is-drawn" : ""}`}>
            <CheckList items={Array.isArray(requirements) ? requirements : []} />
            <p className="my-[var(--notebook-line)] font-hand text-lg font-semibold text-blue-900">
              {t("admissionRequirements.ifPreviousSchool")}
            </p>
            <CheckList
              items={Array.isArray(previousSchool) ? previousSchool : []}
              offset={Array.isArray(requirements) ? requirements.length : 0}
            />
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <Button to="/admision" icon="fa-arrow-right">
            {t("admission", { ns: "nav" })}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RequirementsClipboard;
