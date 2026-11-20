import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { googleCalendarUrl, icsUrl, webcalUrl } from "../../utils/calendarFeed";

// One-tap subscriptions to /calendario.ics, for the grade the page is showing.
const SubscribeCard: React.FC<{ grade?: string; gradeLabel?: string }> = ({
  grade,
  gradeLabel,
}) => {
  const { t } = useTranslation("calendar");
  const [copied, setCopied] = useState(false);
  const url = icsUrl(grade);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const linkClass =
    "flex min-h-12 items-center gap-3 rounded-xl bg-white px-4 py-3 font-semibold text-blue-900 ring-1 ring-blue-900/15 transition-colors hover-fine:bg-blue-50 focus-visible:outline focus-visible:outline-3 focus-visible:outline-amber-500";

  return (
    <section aria-labelledby="subscribe-title" className="rounded-card bg-blue-50 p-6 md:p-7">
      <h2 id="subscribe-title" className="font-display text-2xl font-extrabold text-blue-900">
        {t("subscribe.title")}
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-ink">
        {gradeLabel ? t("subscribe.leadGrade", { grade: gradeLabel }) : t("subscribe.lead")}
      </p>
      <div className="mt-5 space-y-3">
        <a href={webcalUrl(grade)} className={linkClass}>
          <i className="fab fa-apple w-5 text-center text-lg" aria-hidden />
          {t("subscribe.apple")}
        </a>
        <a
          href={googleCalendarUrl(grade)}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          <i className="fab fa-google w-5 text-center text-lg" aria-hidden />
          {t("subscribe.google")}
        </a>
      </div>
      <p className="mt-5 text-[14px] text-[var(--ink-soft)]">{t("subscribe.other")}</p>
      <div className="mt-2 flex items-stretch gap-2">
        <input
          readOnly
          value={url}
          aria-label={t("subscribe.urlLabel")}
          onFocus={(event) => event.currentTarget.select()}
          className="field mt-0 min-w-0 flex-1 text-[13px]"
        />
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-xl bg-blue-900 px-3 text-sm font-semibold text-white transition-colors hover-fine:bg-blue-800"
        >
          {copied ? t("subscribe.copied") : t("subscribe.copy")}
        </button>
        <span aria-live="polite" className="sr-only">
          {copied ? t("subscribe.copied") : ""}
        </span>
      </div>
      <p className="mt-4 text-[13px] text-[var(--ink-soft)]">{t("subscribe.note")}</p>
    </section>
  );
};

export default SubscribeCard;
