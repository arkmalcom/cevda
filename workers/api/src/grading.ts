import { parsePhoneNumberFromString } from "libphonenumber-js";
import questionData from "./questions.json";

export interface Question {
  QuestionID: string;
  Prompt: string;
  Choices: string[];
  CorrectIndex: number;
  Tags: string[];
}

export type PublicQuestion = Omit<Question, "CorrectIndex">;

export interface QuestionResult {
  question_id: string;
  correct: boolean;
  answered: boolean;
}

export interface GradeResult {
  score: number;
  total_questions: number;
  results: QuestionResult[];
}

export const ALL_QUESTIONS = questionData as Question[];
export const QUESTIONS_BY_ID = new Map(ALL_QUESTIONS.map((q) => [q.QuestionID, q]));

export function toPublic(q: Question): PublicQuestion {
  return { QuestionID: q.QuestionID, Prompt: q.Prompt, Choices: q.Choices, Tags: q.Tags };
}

export function normalizePhone(raw: string): string | null {
  const parsed = parsePhoneNumberFromString(raw, "DO");
  return parsed && parsed.isValid() ? parsed.number : null;
}

export function shuffle<T>(items: T[], rand: () => number = Math.random): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Picks up to `perCategory` distinct questions from each tag. A question with
// several tags only counts for the first tag that picks it, as in the Go version.
export function selectQuestions(
  all: Question[],
  perCategory: number,
  rand: () => number = Math.random,
): Question[] {
  const byTag = new Map<string, Question[]>();
  for (const q of all) {
    for (const tag of q.Tags) {
      byTag.set(tag, [...(byTag.get(tag) ?? []), q]);
    }
  }

  const seen = new Set<string>();
  const selected: Question[] = [];
  for (const tag of shuffle([...byTag.keys()], rand)) {
    let picked = 0;
    for (const q of shuffle(byTag.get(tag)!, rand)) {
      if (picked >= perCategory) break;
      if (seen.has(q.QuestionID)) continue;
      seen.add(q.QuestionID);
      selected.push(q);
      picked++;
    }
  }
  return selected;
}

export function grade(
  questionIds: string[],
  answers: Record<string, number>,
  byId: Map<string, Question> = QUESTIONS_BY_ID,
): GradeResult {
  const results: QuestionResult[] = [];
  let correctCount = 0;

  for (const id of questionIds) {
    const q = byId.get(id);
    if (!q) continue;
    const answer = answers[id] ?? -1;
    const answered = Number.isInteger(answer) && answer >= 0 && answer < q.Choices.length;
    const correct = answered && answer === q.CorrectIndex;
    if (correct) correctCount++;
    results.push({ question_id: id, correct, answered });
  }

  const score = questionIds.length ? Math.floor((correctCount * 100) / questionIds.length) : 0;
  return { score, total_questions: questionIds.length, results };
}
