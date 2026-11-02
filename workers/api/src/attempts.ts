import type { Env } from "./env";
import { json } from "./http";
import {
  ALL_QUESTIONS,
  QUESTIONS_BY_ID,
  grade,
  normalizePhone,
  selectQuestions,
  shuffle,
  toPublic,
} from "./grading";

const DEFAULT_TTL_SECONDS = 900;
const DEFAULT_CATEGORY_COUNT = 5;
// Clients auto-submit when the timer hits zero; allow for clock skew and latency.
const SUBMIT_GRACE_SECONDS = 120;

interface AttemptRow {
  attempt_id: string;
  created_at: number;
  expires_at: number;
  email: string;
  name: string;
  phone: string;
  question_ids: string;
  answers: string;
  score: number | null;
  status: "in_progress" | "completed";
}

type FieldError = { code: "required" | "invalid"; field: string };

function intEnv(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

async function readJson<T>(req: Request): Promise<T | null> {
  try {
    return (await req.json()) as T;
  } catch {
    return null;
  }
}

export async function startAttempt(req: Request, env: Env): Promise<Response> {
  const body = await readJson<{ email?: string; name?: string; phone?: string }>(req);
  if (!body) return json({ message: "Invalid request body" }, 400);

  const errors: Record<string, FieldError> = {};
  for (const field of ["email", "name", "phone"] as const) {
    if (!body[field]?.trim()) errors[field] = { code: "required", field };
  }
  if (Object.keys(errors).length) return json({ errors }, 400);

  const phone = normalizePhone(body.phone!);
  if (!phone) return json({ errors: { phone: { code: "invalid", field: "phone" } } }, 400);

  const now = Math.floor(Date.now() / 1000);
  const ttl = intEnv(env.ATTEMPT_EXPIRATION_SECONDS, DEFAULT_TTL_SECONDS);
  const perCategory = intEnv(env.QUESTIONS_CATEGORY_COUNT, DEFAULT_CATEGORY_COUNT);
  const questionIds = selectQuestions(ALL_QUESTIONS, perCategory).map((q) => q.QuestionID);

  const attempt = {
    AttemptID: crypto.randomUUID(),
    CreatedAt: now,
    ExpiresAt: now + ttl,
    Email: body.email!.trim(),
    Name: body.name!.trim(),
    Phone: phone,
    QuestionIDs: questionIds,
    Answers: {} as Record<string, number>,
    Score: null,
    AssessmentStatus: "in_progress",
  };

  await env.DB.prepare(
    `INSERT INTO attempts (attempt_id, created_at, expires_at, email, name, phone, question_ids, answers, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, '{}', 'in_progress')`,
  )
    .bind(attempt.AttemptID, now, attempt.ExpiresAt, attempt.Email, attempt.Name, phone, JSON.stringify(questionIds))
    .run();

  return json(attempt, 201);
}

async function findAttempt(id: string, env: Env): Promise<AttemptRow | null> {
  return env.DB.prepare("SELECT * FROM attempts WHERE attempt_id = ?").bind(id).first<AttemptRow>();
}

export async function getQuestions(attemptId: string, env: Env): Promise<Response> {
  const attempt = await findAttempt(attemptId, env);
  if (!attempt) return json({ message: "Attempt not found" }, 404);

  const ids = JSON.parse(attempt.question_ids) as string[];
  const questions = ids
    .map((id) => QUESTIONS_BY_ID.get(id))
    .filter((q): q is NonNullable<typeof q> => Boolean(q))
    .map(toPublic);

  return json(shuffle(questions));
}

export async function submitAttempt(req: Request, env: Env): Promise<Response> {
  const body = await readJson<{ attempt_id?: string; answers?: Record<string, number> }>(req);
  if (!body?.attempt_id || typeof body.answers !== "object" || body.answers === null) {
    return json({ message: "Invalid request body" }, 400);
  }

  const attempt = await findAttempt(body.attempt_id, env);
  if (!attempt) return json({ message: "Attempt not found" }, 404);
  if (attempt.status === "completed") return json({ message: "Attempt already completed" }, 409);

  const now = Math.floor(Date.now() / 1000);
  if (now > attempt.expires_at + SUBMIT_GRACE_SECONDS) return json({ message: "Attempt expired" }, 410);

  const result = grade(JSON.parse(attempt.question_ids) as string[], body.answers);

  const update = await env.DB.prepare(
    "UPDATE attempts SET answers = ?, score = ?, status = 'completed' WHERE attempt_id = ? AND status = 'in_progress'",
  )
    .bind(JSON.stringify(body.answers), result.score, attempt.attempt_id)
    .run();
  if (!update.meta.changes) return json({ message: "Attempt already completed" }, 409);

  return json(result);
}
