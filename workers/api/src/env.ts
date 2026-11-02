export interface Env {
  DB: D1Database;
  EMAIL: SendEmail;
  RECAPTCHA_SECRET_KEY: string;
  SENDER_EMAIL: string;
  RECIPIENT_EMAIL: string;
  ALLOWED_ORIGINS: string;
  ATTEMPT_EXPIRATION_SECONDS?: string;
  QUESTIONS_CATEGORY_COUNT?: string;
}
