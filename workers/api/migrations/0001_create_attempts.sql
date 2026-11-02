CREATE TABLE IF NOT EXISTS attempts (
  attempt_id   TEXT PRIMARY KEY,
  created_at   INTEGER NOT NULL,
  expires_at   INTEGER NOT NULL,
  email        TEXT NOT NULL,
  name         TEXT NOT NULL,
  phone        TEXT NOT NULL,
  question_ids TEXT NOT NULL,              -- JSON array of question ids
  answers      TEXT NOT NULL DEFAULT '{}', -- JSON object question id -> choice index
  score        INTEGER,
  status       TEXT NOT NULL DEFAULT 'in_progress'
);
