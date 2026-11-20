// Types and helpers for the school calendar feed that Tiza publishes and the Worker
// proxies at /api/calendario/* (see docs/public-calendar.md in the Tiza repo).

export type Audience =
  | { scope: "school" }
  | { scope: "groups"; levels: string[]; grades: string[] };

export interface FeedEnvelope {
  school: { name: string; time_zone: string };
  audiences: {
    levels: { slug: string; label: string }[];
    grades: { slug: string; label: string; level: string }[];
  };
  categories: { slug: string; label: string }[];
}

export interface EventCost {
  label: string; // what the amount is for: "Por familia", "Por estudiante"
  amount_cents: number; // integer centavos: 180000 = RD$ 1,800
  currency: string; // "DOP"
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string | null;
  category: string;
  location: string | null;
  costs: EventCost[]; // empty when free; at most 4
  payment_due_date: string | null; // YYYY-MM-DD, last day to pay; only set with costs
  all_day: boolean;
  start_date: string | null; // YYYY-MM-DD, all-day only
  end_date: string | null; // inclusive
  starts_at: string | null; // ISO with offset, timed only
  ends_at: string | null;
  audience: Audience;
  updated_at: string;
}

export interface Notice {
  id: string;
  title: string;
  body: string;
  pinned: boolean;
  published_at: string;
  expires_at: string | null;
  audience: Audience;
  updated_at: string;
}

export type EventsFeed = FeedEnvelope & {
  from: string;
  to: string;
  truncated: boolean;
  events: CalendarEvent[];
};
export type NoticesFeed = FeedEnvelope & { notices: Notice[] };

export const SCHOOL_TIME_ZONE = "America/Santo_Domingo";

export async function fetchFeed<T>(
  path: string,
  params: Record<string, string | undefined>,
  signal?: AbortSignal,
): Promise<T> {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) if (value) query.set(key, value);
  const qs = query.toString();
  const res = await fetch(qs ? `${path}?${qs}` : path, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Feed ${path} answered ${res.status}`);
  return (await res.json()) as T;
}

// --- Dates -------------------------------------------------------------------------
// All-day dates are calendar dates on the school's clock, so they are formatted as UTC
// midnights in the UTC zone: the day can never shift. Instants carry their offset and are
// formatted in the school's zone.

const plainDate = (value: string) => {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};

const format = (
  locale: string,
  options: Intl.DateTimeFormatOptions,
  value: Date,
  timeZone: string,
) => new Intl.DateTimeFormat(locale, { ...options, timeZone }).format(value);

/** Today's date on the school's clock, as YYYY-MM-DD. */
export const schoolToday = (timeZone = SCHOOL_TIME_ZONE) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

/** The school-clock date an event starts on, as YYYY-MM-DD. */
export const eventStartDay = (event: CalendarEvent, timeZone: string) =>
  event.all_day
    ? event.start_date!
    : new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date(event.starts_at!));

/** The school-clock date an event ends on (inclusive), as YYYY-MM-DD. */
export const eventEndDay = (event: CalendarEvent, timeZone: string) =>
  event.all_day
    ? event.end_date!
    : new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date(event.ends_at ?? event.starts_at!));

// "diciembre de 2026" -> "Diciembre de 2026" (CSS capitalize would also capitalize "de").
export const monthLabel = (day: string, locale: string) => {
  const label = format(locale, { month: "long", year: "numeric" }, plainDate(day), "UTC");
  return label.charAt(0).toLocaleUpperCase(locale) + label.slice(1);
};

export const dayParts = (day: string, locale: string) => ({
  day: format(locale, { day: "numeric" }, plainDate(day), "UTC"),
  weekday: format(locale, { weekday: "short" }, plainDate(day), "UTC").replace(".", ""),
});

export const shortDate = (day: string, locale: string) =>
  format(locale, { day: "numeric", month: "short" }, plainDate(day), "UTC").replace(".", "");

/** A calendar date with its weekday: "viernes, 4 de diciembre". */
export const fullDate = (day: string, locale: string) =>
  format(locale, { weekday: "long", day: "numeric", month: "long" }, plainDate(day), "UTC");

export const longDate = (iso: string, locale: string, timeZone: string) =>
  format(locale, { day: "numeric", month: "long" }, new Date(iso), timeZone);

export const timeOfDay = (iso: string, locale: string, timeZone: string) =>
  format(locale, { hour: "numeric", minute: "2-digit" }, new Date(iso), timeZone);

// --- Costs -------------------------------------------------------------------------

/** "RD$ 1,800" or "RD$ 300.50": always es-DO, with centavos only when there are any. */
export const formatAmount = ({ amount_cents, currency }: EventCost) =>
  new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency,
    minimumFractionDigits: amount_cents % 100 === 0 ? 0 : 2,
  })
    .formatToParts(amount_cents / 100)
    .map((part) => (part.type === "currency" ? `${part.value} ` : part.value))
    .join("");

// --- Audience ----------------------------------------------------------------------

/** Labels for a groups audience ("Nivel Inicial", "Kínder"); empty for the whole school. */
export const audienceLabels = (audience: Audience, envelope: FeedEnvelope) => {
  if (audience.scope === "school") return [];
  const levels = audience.levels.map(
    (slug) => envelope.audiences.levels.find((l) => l.slug === slug)?.label,
  );
  const grades = audience.grades.map(
    (slug) => envelope.audiences.grades.find((g) => g.slug === slug)?.label,
  );
  return [...levels, ...grades].filter((label): label is string => !!label);
};

// --- Subscription links ------------------------------------------------------------

export const icsUrl = (grade?: string) =>
  `https://cevda.com.do/calendario.ics${grade ? `?grades=${encodeURIComponent(grade)}` : ""}`;

export const webcalUrl = (grade?: string) => icsUrl(grade).replace(/^https:/, "webcal:");

export const googleCalendarUrl = (grade?: string) =>
  `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(webcalUrl(grade))}`;
