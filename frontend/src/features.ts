// Feature flags, read by the app and by the Worker (worker/index.ts) at build time.

// The school calendar (/calendario, the home page notices strip and the Worker's
// feed proxy). Off while the client decides what it should show publicly.
export const CALENDAR_ENABLED = false;
