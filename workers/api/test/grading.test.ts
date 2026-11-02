import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS, grade, normalizePhone, selectQuestions, type Question } from "../src/grading";

const q = (id: string, correct: number, tags: string[]): Question => ({
  QuestionID: id,
  Prompt: id,
  Choices: ["a", "b", "c"],
  CorrectIndex: correct,
  Tags: tags,
});

describe("grade", () => {
  const byId = new Map([q("q1", 1, ["t"]), q("q2", 0, ["t"]), q("q3", 2, ["t"])].map((x) => [x.QuestionID, x]));

  it("scores as a floored percentage and flags unanswered", () => {
    const result = grade(["q1", "q2", "q3"], { q1: 1, q2: 2, q3: -1 }, byId);
    expect(result).toEqual({
      score: 33,
      total_questions: 3,
      results: [
        { question_id: "q1", correct: true, answered: true },
        { question_id: "q2", correct: false, answered: true },
        { question_id: "q3", correct: false, answered: false },
      ],
    });
  });

  it("treats missing and out-of-range answers as unanswered", () => {
    const result = grade(["q1", "q2"], { q2: 7 }, byId);
    expect(result.results.every((r) => !r.answered && !r.correct)).toBe(true);
    expect(result.score).toBe(0);
  });

  it("returns 0 for an empty attempt", () => {
    expect(grade([], {}, byId).score).toBe(0);
  });
});

describe("selectQuestions", () => {
  it("picks up to N per tag without duplicates", () => {
    const picked = selectQuestions(ALL_QUESTIONS, 5);
    const ids = picked.map((p) => p.QuestionID);
    expect(new Set(ids).size).toBe(ids.length);
    const tags = new Set(ALL_QUESTIONS.flatMap((x) => x.Tags));
    expect(ids.length).toBeLessThanOrEqual(tags.size * 5);
    expect(ids.length).toBeGreaterThan(0);
  });

  it("caps per category", () => {
    const pool = [q("a", 0, ["x"]), q("b", 0, ["x"]), q("c", 0, ["x"]), q("d", 0, ["y"])];
    expect(selectQuestions(pool, 2)).toHaveLength(3);
  });
});

describe("normalizePhone", () => {
  it("defaults to the Dominican Republic and returns E.164", () => {
    expect(normalizePhone("809-555-1234")).toBe("+18095551234");
    expect(normalizePhone("(829) 555 1234")).toBe("+18295551234");
  });

  it("accepts international numbers and rejects garbage", () => {
    expect(normalizePhone("+34 612 345 678")).toBe("+34612345678");
    expect(normalizePhone("123")).toBeNull();
    expect(normalizePhone("hello")).toBeNull();
  });
});
