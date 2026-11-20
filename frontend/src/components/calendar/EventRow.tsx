import React from "react";
import { useTranslation } from "react-i18next";
import FeedText from "./FeedText";
import { AudienceTags } from "./NoticeCard";
import {
  audienceLabels,
  dayParts,
  eventEndDay,
  eventStartDay,
  formatAmount,
  fullDate,
  shortDate,
  timeOfDay,
  type CalendarEvent,
  type FeedEnvelope,
} from "../../utils/calendarFeed";

// Each category's word is always shown; the colour only supports it.
const CATEGORY_CLASS: Record<string, string> = {
  actividad: "bg-blue-100 text-blue-900",
  "sin-clases": "bg-amber-300 text-blue-950",
  "reunion-padres": "bg-[#dff1e7] text-[#1d6a41]",
  evaluaciones: "bg-[#fde6e2] text-[#a3362a]",
  otro: "bg-paper text-ink ring-1 ring-blue-900/10",
};

const EventRow: React.FC<{
  event: CalendarEvent;
  envelope: FeedEnvelope;
  locale: string;
  today: string; // YYYY-MM-DD on the school's clock
}> = ({ event, envelope, locale, today }) => {
  const { t } = useTranslation("calendar");
  const timeZone = envelope.school.time_zone;
  const startDay = eventStartDay(event, timeZone);
  const endDay = eventEndDay(event, timeZone);
  // An event already under way shows the day it ends ("hasta 6") instead of a past start.
  const ongoing = startDay < today;
  const { day, weekday } = dayParts(ongoing ? endDay : startDay, locale);
  const category =
    envelope.categories.find((c) => c.slug === event.category)?.label ?? event.category;
  const noClasses = event.category === "sin-clases";

  let when: string;
  if (event.all_day) {
    when =
      startDay === endDay
        ? t("events.allDay")
        : t("events.range", { from: shortDate(startDay, locale), to: shortDate(endDay, locale) });
  } else {
    const start = timeOfDay(event.starts_at!, locale, timeZone);
    if (!event.ends_at) when = start;
    else if (startDay === endDay) when = `${start} – ${timeOfDay(event.ends_at, locale, timeZone)}`;
    else
      when = t("events.range", {
        from: `${shortDate(startDay, locale)}, ${start}`,
        to: `${shortDate(endDay, locale)}, ${timeOfDay(event.ends_at, locale, timeZone)}`,
      });
  }

  return (
    <li className="flex gap-4 md:gap-6">
      <div
        className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl md:h-20 md:w-20 ${
          noClasses ? "bg-amber-500 text-blue-950" : "bg-blue-900 text-white"
        }`}
        aria-hidden
      >
        <span className="text-xs font-bold uppercase tracking-wide opacity-80">
          {ongoing ? t("events.until") : weekday}
        </span>
        <span className="font-display text-2xl font-extrabold leading-none md:text-3xl">{day}</span>
      </div>
      <div className="min-w-0 flex-1 space-y-2 border-b border-blue-900/10 pb-6">
        <div className="flex flex-wrap items-center gap-2 text-[14px] font-semibold text-[var(--ink-soft)]">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[13px] font-bold ${CATEGORY_CLASS[event.category] ?? CATEGORY_CLASS.otro}`}
          >
            {category}
          </span>
          <span>
            <span className="sr-only">{shortDate(startDay, locale)}, </span>
            {when}
          </span>
        </div>
        <h3 className="font-display text-xl font-extrabold leading-tight text-blue-900">
          {event.title}
        </h3>
        {event.location && (
          <p className="flex items-center gap-2 text-[15px] text-ink">
            <i className="fas fa-location-dot text-blue-900" aria-hidden />
            <span>{event.location}</span>
          </p>
        )}
        {event.costs.length > 0 && (
          <div className="flex gap-2 text-[15px] text-ink">
            <i className="fas fa-money-bill-wave mt-1 text-blue-900" aria-hidden />
            <div>
              <span className="sr-only">{t("events.cost")}: </span>
              <ul>
                {event.costs.map((cost, index) => (
                  <li key={index}>
                    <span className="font-semibold">{formatAmount(cost)}</span> · {cost.label}
                  </li>
                ))}
              </ul>
              {event.payment_due_date && (
                <p className="text-[var(--ink-soft)]">
                  {t("events.paymentDue", { date: fullDate(event.payment_due_date, locale) })}
                </p>
              )}
            </div>
          </div>
        )}
        {event.description && (
          <FeedText text={event.description} className="text-[16px] leading-relaxed text-ink" />
        )}
        <AudienceTags labels={audienceLabels(event.audience, envelope)} />
      </div>
    </li>
  );
};

export default EventRow;
