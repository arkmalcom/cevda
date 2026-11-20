import React from "react";
import { useTranslation } from "react-i18next";
import FeedText from "./FeedText";
import { audienceLabels, longDate, type FeedEnvelope, type Notice } from "../../utils/calendarFeed";

export const AudienceTags: React.FC<{ labels: string[] }> = ({ labels }) =>
  labels.length ? (
    <ul className="flex flex-wrap gap-1.5">
      {labels.map((label) => (
        <li
          key={label}
          className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[13px] font-semibold text-blue-900"
        >
          {label}
        </li>
      ))}
    </ul>
  ) : null;

const NoticeCard: React.FC<{
  notice: Notice;
  envelope: FeedEnvelope;
  locale: string;
  compact?: boolean;
}> = ({ notice, envelope, locale, compact = false }) => {
  const { t } = useTranslation("calendar");
  const timeZone = envelope.school.time_zone;
  return (
    <article
      className={`sheet flex h-full flex-col gap-3 p-5 md:p-6 ${notice.pinned ? "ring-2 ring-amber-500" : ""}`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-semibold text-[var(--ink-soft)]">
        {notice.pinned && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-2.5 py-0.5 text-blue-950">
            <i className="fas fa-thumbtack text-[0.85em]" aria-hidden />
            {t("notices.pinned")}
          </span>
        )}
        <span>
          {t("notices.published", { date: longDate(notice.published_at, locale, timeZone) })}
        </span>
      </div>
      <h3 className="font-display text-xl font-extrabold leading-tight text-blue-900 md:text-2xl">
        {notice.title}
      </h3>
      <FeedText
        text={notice.body}
        preview={compact}
        className="text-[16px] leading-relaxed text-ink"
      />
      <div className="mt-auto pt-1">
        <AudienceTags labels={audienceLabels(notice.audience, envelope)} />
      </div>
    </article>
  );
};

export default NoticeCard;
