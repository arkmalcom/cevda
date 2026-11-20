import React from "react";
import { useTranslation } from "react-i18next";
import SectionHeading from "../SectionHeading";
import Button from "../ui/Button";
import NoticeCard from "../calendar/NoticeCard";
import { useCalendarFeed } from "../../hooks/useCalendarFeed";
import type { NoticesFeed } from "../../utils/calendarFeed";

// The latest three notices on the home page. Renders nothing while loading, on error or
// when there are none, so the page never shows an empty box.
const NoticesStrip: React.FC = () => {
  const { t, i18n } = useTranslation("calendar");
  const locale = i18n.language?.startsWith("en") ? "en-US" : "es-DO";
  const { state } = useCalendarFeed<NoticesFeed>("/api/calendario/avisos", { limit: "3" });
  if (state.status !== "ready" || !state.data.notices.length) return null;
  const feed = state.data;

  return (
    <section aria-label={t("notices.title")} className="px-5 pb-16 md:px-8 md:pb-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={t("notices.title")} />
        <div className="grid gap-5 md:grid-cols-3">
          {feed.notices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} envelope={feed} locale={locale} compact />
          ))}
        </div>
        <div className="mt-8">
          <Button to="/calendario" variant="outline" icon="fa-arrow-right">
            {t("home.cta")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NoticesStrip;
