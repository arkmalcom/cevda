import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import PageIntro from "../components/PageIntro";
import Reveal from "../components/Reveal";
import { ErrorNote } from "../components/StarBurst";
import EventRow from "../components/calendar/EventRow";
import NoticeCard from "../components/calendar/NoticeCard";
import SubscribeCard from "../components/calendar/SubscribeCard";
import { useCalendarFeed } from "../hooks/useCalendarFeed";
import {
  eventEndDay,
  eventStartDay,
  monthLabel,
  schoolToday,
  type CalendarEvent,
  type EventsFeed,
  type FeedEnvelope,
  type NoticesFeed,
} from "../utils/calendarFeed";

const Placeholder: React.FC<{ rows: number }> = ({ rows }) => (
  <div className="space-y-4" aria-hidden>
    {Array.from({ length: rows }, (_, i) => (
      <div key={i} className="h-24 rounded-card bg-blue-900/[0.06] motion-safe:animate-pulse" />
    ))}
  </div>
);

const LoadError: React.FC<{ message: string; retry: () => void; retryLabel: string }> = ({
  message,
  retry,
  retryLabel,
}) => (
  <div className="space-y-3">
    <ErrorNote>{message}</ErrorNote>
    <button
      type="button"
      onClick={retry}
      className="text-[15px] font-semibold text-blue-900 underline decoration-amber-500 decoration-2 underline-offset-4"
    >
      {retryLabel}
    </button>
  </div>
);

const Empty: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="rounded-card bg-blue-50 px-5 py-6 text-[16px] text-ink">{children}</p>
);

// Grade slugs as Tiza writes them; anything else in ?grado= is ignored rather than sent,
// because Tiza answers a malformed slug with a 400.
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

// Upcoming events (ending today or later), grouped by month. An event already under way
// (started before today) goes under the current month, not the month it started in.
const groupByMonth = (events: CalendarEvent[], timeZone: string, locale: string, today: string) => {
  const groups = new Map<string, { label: string; events: CalendarEvent[] }>();
  for (const event of events) {
    if (eventEndDay(event, timeZone) < today) continue;
    const start = eventStartDay(event, timeZone);
    const shownFrom = start < today ? today : start;
    const key = shownFrom.slice(0, 7);
    if (!groups.has(key)) groups.set(key, { label: monthLabel(shownFrom, locale), events: [] });
    groups.get(key)!.events.push(event);
  }
  return [...groups.values()];
};

const GradeFilter: React.FC<{
  envelope?: FeedEnvelope;
  value: string;
  onChange: (grade: string) => void;
}> = ({ envelope, value, onChange }) => {
  const { t } = useTranslation("calendar");
  return (
    <label className="block max-w-sm">
      <span className="field-label">{t("filter.label")}</span>
      <select className="field" value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">{t("filter.everyone")}</option>
        {envelope?.audiences.levels.map((level) => (
          <optgroup key={level.slug} label={level.label}>
            {envelope.audiences.grades
              .filter((grade) => grade.level === level.slug)
              .map((grade) => (
                <option key={grade.slug} value={grade.slug}>
                  {grade.label}
                </option>
              ))}
          </optgroup>
        ))}
      </select>
      <span className="mt-1.5 block text-[13px] text-[var(--ink-soft)]">{t("filter.hint")}</span>
    </label>
  );
};

const Calendar: React.FC = () => {
  const { t, i18n } = useTranslation("calendar");
  const locale = i18n.language?.startsWith("en") ? "en-US" : "es-DO";
  const [searchParams, setSearchParams] = useSearchParams();

  // The page is prerendered at /calendario with no grade. Read ?grado= only after mount, so
  // the first client render matches that HTML: React does not patch attributes on hydration,
  // and the subscribe links would otherwise keep the unfiltered URL.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const requested = mounted ? (searchParams.get("grado") ?? "") : "";
  const grade = SLUG.test(requested) ? requested : "";

  const params = { grades: grade || undefined };
  const notices = useCalendarFeed<NoticesFeed>("/api/calendario/avisos", params, mounted);
  const events = useCalendarFeed<EventsFeed>("/api/calendario/eventos", params, mounted);

  // Keep the last envelope while a new grade loads, so the filter keeps its options (and focus).
  const [envelope, setEnvelope] = useState<FeedEnvelope>();
  const latest =
    events.state.status === "ready"
      ? events.state.data
      : notices.state.status === "ready"
        ? notices.state.data
        : undefined;
  useEffect(() => {
    if (latest) setEnvelope(latest);
  }, [latest]);

  const knownGrade = envelope?.audiences.grades.find((g) => g.slug === grade);

  const setGrade = (next: string) =>
    setSearchParams(next ? { grado: next } : {}, { replace: true, preventScrollReset: true });

  // A malformed ?grado=, or one the school doesn't have, is dropped from the URL so the
  // address, the lists, the filter and the subscribe link all mean the whole school.
  const unknownGrade = !!envelope && !!grade && !knownGrade;
  const malformedGrade = !!requested && !grade;
  useEffect(() => {
    if (unknownGrade || malformedGrade) {
      setSearchParams({}, { replace: true, preventScrollReset: true });
    }
  }, [unknownGrade, malformedGrade, setSearchParams]);

  return (
    <div>
      <PageIntro title={t("title")} lead={t("lead")} stickers={["star", "plane"]} />

      <div className="relative mx-auto -mt-10 max-w-6xl px-4 md:-mt-14 md:px-8">
        <Reveal className="sheet p-6 md:p-8">
          <GradeFilter envelope={envelope} value={knownGrade ? grade : ""} onChange={setGrade} />
        </Reveal>

        <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="space-y-14 md:col-span-8">
            <section aria-labelledby="notices-title">
              <h2
                id="notices-title"
                className="mb-6 font-display text-3xl font-extrabold text-blue-900 md:text-4xl"
              >
                {t("notices.title")}
              </h2>
              {notices.state.status === "loading" && <Placeholder rows={1} />}
              {notices.state.status === "error" && (
                <LoadError
                  message={t("notices.error")}
                  retry={notices.retry}
                  retryLabel={t("retry")}
                />
              )}
              {notices.state.status === "ready" &&
                (() => {
                  const feed = notices.state.data;
                  if (!feed.notices.length) return <Empty>{t("notices.empty")}</Empty>;
                  return (
                    <div className="grid gap-5">
                      {feed.notices.map((notice) => (
                        <NoticeCard
                          key={notice.id}
                          notice={notice}
                          envelope={feed}
                          locale={locale}
                        />
                      ))}
                    </div>
                  );
                })()}
            </section>

            <section aria-labelledby="events-title">
              <h2
                id="events-title"
                className="mb-6 font-display text-3xl font-extrabold text-blue-900 md:text-4xl"
              >
                {t("events.title")}
              </h2>
              {events.state.status === "loading" && <Placeholder rows={3} />}
              {events.state.status === "error" && (
                <LoadError
                  message={t("events.error")}
                  retry={events.retry}
                  retryLabel={t("retry")}
                />
              )}
              {events.state.status === "ready" &&
                (() => {
                  const feed = events.state.data;
                  const today = schoolToday(feed.school.time_zone);
                  const months = groupByMonth(feed.events, feed.school.time_zone, locale, today);
                  if (!months.length) return <Empty>{t("events.empty")}</Empty>;
                  return (
                    <div className="space-y-10">
                      {months.map((month) => (
                        <div key={month.label}>
                          <h3 className="mb-5 font-hand text-2xl font-semibold text-amber-ink">
                            {month.label}
                          </h3>
                          <ol className="space-y-6">
                            {month.events.map((event) => (
                              <EventRow
                                key={event.id}
                                event={event}
                                envelope={feed}
                                locale={locale}
                                today={today}
                              />
                            ))}
                          </ol>
                        </div>
                      ))}
                    </div>
                  );
                })()}
            </section>
          </div>

          <aside className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <SubscribeCard grade={knownGrade?.slug} gradeLabel={knownGrade?.label} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
