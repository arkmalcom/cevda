import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { PublicAssessmentQuestion } from "../utils/Types";
import PageIntro from "../components/PageIntro";
import Reveal from "../components/Reveal";
import Button from "../components/ui/Button";

enum ExamPhase {
  EnterEmail,
  InProgress,
  Completed,
}

interface AttemptResponse {
  AttemptID: string;
  CreatedAt: number;
  ExpiresAt: number;
  QuestionIDs: string[];
}

type FieldError = {
  code: string;
  field: string;
};

type ValidationErrors = Record<string, FieldError | string>;

type QuestionResult = {
  question_id: string;
  correct: boolean;
  answered: boolean;
};

type GradeResult = {
  score: number;
  total_questions: number;
  results: QuestionResult[];
};

const fieldClass = "field";

const EnglishExam = () => {
  const [phase, setPhase] = useState<ExamPhase>(ExamPhase.EnterEmail);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attemptID, setAttemptID] = useState("");
  const [attemptCreatedAt, setAttemptCreatedAt] = useState<number | null>(null);
  const [questions, setQuestions] = useState<PublicAssessmentQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [gradeResult, setGradeResult] = useState<GradeResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [resultMap, setResultMap] = useState<Record<string, QuestionResult>>(
    {},
  );
  const hasExpiredRef = useRef(false);
  const { t } = useTranslation("english-exam");

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleExpiration = async () => {
    if (phase !== ExamPhase.InProgress) return;
    setIsExpired(true);
    const isExpiredValue = true;

    await submitAttempt(isExpiredValue);
  };

  const validateStart = () => {
    const newErrors: Record<string, FieldError> = {};
    if (!name.trim()) {
      newErrors["name"] = { code: "required", field: "name" };
    }
    if (!phone.trim()) {
      newErrors["phone"] = { code: "required", field: "phone" };
    }
    if (!email.trim()) {
      newErrors["email"] = { code: "required", field: "email" };
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors["email"] = { code: "invalid", field: "email" };
    }

    return newErrors;
  };

  const startAttempt = async () => {
    const validationErrors = validateStart();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const res = await fetch(
      `${import.meta.env.VITE_BASE_API_ENDPOINT_URI}/attempts/start`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, phone }),
      },
    );

    if (!res.ok) {
      const err = await res.json();
      console.log("Error starting attempt:", err.errors);
      setErrors(err.errors ?? { form: t("start.formErrorText") });
      return;
    }

    const data: AttemptResponse = await res.json();
    const attemptID = data.AttemptID;
    setAttemptID(attemptID);
    setAttemptCreatedAt(data.CreatedAt);
    setExpiresAt(data.ExpiresAt);

    const qRes = await fetch(
      `${import.meta.env.VITE_BASE_API_ENDPOINT_URI}/questions/${attemptID}`,
    );

    if (!qRes.ok) {
      console.error("Failed to load questions");
      return;
    }

    const qData: PublicAssessmentQuestion[] = await qRes.json();
    setQuestions(qData);
    setPhase(ExamPhase.InProgress);
  };

  const submitAttempt = async (isExpired: boolean = false) => {
    if (!attemptID || !attemptCreatedAt) return;

    if (!isExpired) {
      const missingAnswers: Record<string, string> = {};
      questions.forEach((q) => {
        if (answers[q.QuestionID] === undefined) {
          missingAnswers[q.QuestionID] = t("inProgress.missingAnswerText");
        }
      });

      if (Object.keys(missingAnswers).length > 0) {
        setErrors(missingAnswers);

        const firstMissingID = Object.keys(missingAnswers)[0];
        const element = document.getElementsByName(firstMissingID)[0];
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }
    }

    setErrors({});

    const answersPayload: Record<string, number> = {};
    questions.forEach((q: PublicAssessmentQuestion) => {
      answersPayload[q.QuestionID] = answers[q.QuestionID] ?? -1;
    });

    const res = await fetch(
      `${import.meta.env.VITE_BASE_API_ENDPOINT_URI}/attempts/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attempt_id: attemptID,
          answers: answersPayload,
          created_at: attemptCreatedAt,
        }),
      },
    );

    if (!res.ok) {
      console.error("Failed to submit attempt");
      return;
    }

    const STAGE = import.meta.env.VITE_STAGE;

    const data = await res.json();

    const resultMap: Record<string, QuestionResult> = Object.fromEntries(
      data.results.map((qr: QuestionResult) => [qr.question_id, qr]),
    );

    setGradeResult({
      score: data.score,
      total_questions: data.total_questions,
      results: data.results,
    });
    setResultMap(resultMap);
    setPhase(ExamPhase.Completed);

    await fetch(
      `${import.meta.env.VITE_BASE_EMAIL_ENDPOINT}/${STAGE}/email-handler-${STAGE}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formSource: "english_exam",
          attempt_id: attemptID,
          email,
          name,
          phone,
          score: data.score,
          total_questions: data.total_questions,
          results: questions.map((q) => {
            const r = resultMap[q.QuestionID];
            const selectedIndex = answers[q.QuestionID];
            return {
              question_id: q.QuestionID,
              prompt: q.Prompt,
              selected_index: selectedIndex ?? null,
              selected_text:
                selectedIndex !== undefined ? q.Choices[selectedIndex] : null,
              correct: r?.correct ?? false,
              answered: r?.answered ?? false,
            };
          }),
        }),
      },
    );
  };

  useEffect(() => {
    if (!expiresAt || phase !== ExamPhase.InProgress) return;

    const tick = () => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = expiresAt - now;
      setTimeLeft(Math.max(remaining, 0));

      if (remaining <= 0 && !hasExpiredRef.current) {
        hasExpiredRef.current = true;
        handleExpiration();
      }
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, phase, submitAttempt]);

  useEffect(() => {
    if (phase === ExamPhase.Completed) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 0);
    }
  }, [phase]);

  const renderError = (err: FieldError | string) => {
    if (typeof err === "string") return err;

    const key = `formErrors.${err.code}`;

    return t(key, {
      field: t(`fields.${err.field}`),
      defaultValue: t("formErrors.genericText"),
    });
  };

  if (phase === ExamPhase.EnterEmail) {
    return (
      <div>
        <PageIntro title={t("start.title")} lead={t("start.content")} stickers={["plane", "star"]} />

        <Reveal delayMs={80} className="relative -mt-10 px-4 md:-mt-14">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              startAttempt();
            }}
            className="sheet relative mx-auto max-w-xl space-y-5 px-5 py-8 md:px-8 md:py-10"
          >

            <div>
              <label
                htmlFor="name"
                className="field-label"
              >
                {t("fieldLabels.name")} <span className="text-red-600">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => {
                    const { name: _name, ...rest } = prev;
                    return rest;
                  });
                }}
                placeholder={t("start.namePlaceholder")}
                className={`${fieldClass} ${errors["name"] ? "is-invalid" : ""}`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {renderError(errors.name)}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="field-label"
              >
                {t("fieldLabels.phone")} <span className="text-red-600">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setErrors((prev) => {
                    const { phone: _phone, ...rest } = prev;
                    return rest;
                  });
                }}
                placeholder={t("start.phonePlaceholder")}
                className={`${fieldClass} ${errors["phone"] ? "is-invalid" : ""}`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {renderError(errors.phone)}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="field-label"
              >
                {t("fieldLabels.email")} <span className="text-red-600">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => {
                    const { email: _email, ...rest } = prev;
                    return rest;
                  });
                }}
                placeholder={t("start.emailPlaceholder")}
                className={`${fieldClass} ${errors["email"] ? "is-invalid" : ""}`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {renderError(errors.email)}
                </p>
              )}
            </div>

            {errors.form && (
              <div className="text-center text-sm text-red-600">
                {renderError(errors.form)}
              </div>
            )}

            <Button type="submit" icon="fa-arrow-right" className="w-full">
              {t("start.startButton")}
            </Button>
          </form>
        </Reveal>
      </div>
    );
  }

  if (phase === ExamPhase.InProgress) {
    const answeredCount = questions.filter(
      (q) => answers[q.QuestionID] !== undefined,
    ).length;

    return (
      <div>
        <div
          className={`tabular fixed bottom-20 right-4 z-30 flex h-12 items-center gap-2 rounded-full px-5 text-base font-bold shadow-lift md:bottom-24 md:right-6 ${
            timeLeft < 60 ? "bg-red-600 text-white" : "bg-blue-900 text-amber-300"
          }`}
        >
          <i className="fas fa-clock" aria-hidden />
          {formatTime(timeLeft)}
        </div>

        <PageIntro
          title={t("inProgress.title")}
          lead={t("inProgress.progress", {
            answered: answeredCount,
            total: questions.length,
            defaultValue: `${answeredCount} / ${questions.length}`,
          })}
          stickers={["pencil", "block"]}
        />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitAttempt();
          }}
          className="relative mx-auto -mt-10 max-w-3xl space-y-5 px-4 md:-mt-14"
        >
          {questions.map((q, idx) => (
            <Reveal key={q.QuestionID} delayMs={Math.min(idx * 40, 200)}>
              <fieldset
                className={`sheet px-5 py-5 md:px-7 md:py-6 ${
                  errors[q.QuestionID] ? "ring-2 ring-red-500" : ""
                }`}
              >
                <legend className="float-left mb-4 w-full text-[17px] font-semibold text-blue-900">
                  <span className="tabular mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-sm text-blue-950">
                    {idx + 1}
                  </span>
                  {q.Prompt}
                </legend>
                <div className="clear-left space-y-2">
                  {q.Choices.map((choice, cIdx) => {
                    const selected = answers[q.QuestionID] === cIdx;
                    return (
                      <label
                        key={cIdx}
                        className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-2.5 transition-colors duration-150 ${
                          selected
                            ? "border-blue-900 bg-amber-100 text-blue-950"
                            : "border-blue-900/10 bg-white hover-fine:border-blue-900/35"
                        }`}
                      >
                        <input
                          type="radio"
                          name={q.QuestionID}
                          value={cIdx}
                          checked={selected}
                          onChange={() =>
                            setAnswers((prev) => ({
                              ...prev,
                              [q.QuestionID]: cIdx,
                            }))
                          }
                          className="h-5 w-5 shrink-0 accent-blue-900"
                        />
                        <span className="text-[15px] md:text-base">{choice}</span>
                      </label>
                    );
                  })}
                </div>
                {errors[q.QuestionID] && (
                  <p className="mt-2 text-sm text-red-600">
                    {renderError(errors[q.QuestionID])}
                  </p>
                )}
              </fieldset>
            </Reveal>
          ))}

          <Button type="submit" className="w-full">
            {t("inProgress.submitButton")}
          </Button>
        </form>
      </div>
    );
  }

  if (phase === ExamPhase.Completed) {
    return (
      <div>
        <PageIntro title={t("completed.title")} stickers={["laurel", "star"]} />

        <Reveal delayMs={80} className="relative -mt-10 px-4 md:-mt-14">
          <div className="sheet mx-auto mb-10 max-w-xl px-6 py-8 text-center" role="status">
            <div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-blue-950"
              aria-hidden
            >
              <i className={`fas ${isExpired ? "fa-hourglass-end" : "fa-graduation-cap"} text-2xl`} />
            </div>
            {isExpired ? (
              <p className="mb-3 text-red-700">{t("completed.expiredText")}</p>
            ) : (
              <p className="mb-3 text-ink">{t("completed.content")}</p>
            )}
            <p className="tabular font-display text-4xl font-extrabold text-blue-900">
              {t("completed.score", { score: gradeResult?.score })}
            </p>
          </div>
        </Reveal>

        <div className="mx-auto max-w-3xl space-y-4 px-4">
          {questions.map((q, idx) => {
            const result = resultMap[q.QuestionID];
            const wasAnswered = result?.answered;
            const wasCorrect = result?.correct;

            return (
              <Reveal key={q.QuestionID} delayMs={Math.min(idx * 40, 200)}>
                <div className="sheet px-5 py-5 md:px-7 md:py-6">
                  <p className="mb-3 text-[17px] font-semibold text-blue-900">
                    <span className="tabular mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-sm text-blue-950">
                      {idx + 1}
                    </span>
                    {q.Prompt}
                  </p>
                  <div className="space-y-1.5">
                    {q.Choices.map((choice, choiceIdx) => {
                      const isSelected = answers[q.QuestionID] === choiceIdx;
                      return (
                        <div
                          key={choiceIdx}
                          className={`px-3 py-2 text-sm ${
                            isSelected && wasCorrect
                              ? "bg-green-100 font-semibold text-green-800"
                              : isSelected && !wasCorrect
                                ? "bg-red-100 font-semibold text-red-700"
                                : isSelected
                                  ? "font-semibold text-blue-900"
                                  : "text-slate-600"
                          }`}
                        >
                          {choice}
                        </div>
                      );
                    })}
                  </div>

                  {!wasAnswered && (
                    <p className="mt-3 flex items-center gap-2 text-sm text-amber-700">
                      <i className="fas fa-triangle-exclamation" aria-hidden />
                      {t("completed.notAnswered")}
                    </p>
                  )}
                  {wasAnswered && !wasCorrect && (
                    <p className="mt-3 flex items-center gap-2 text-sm text-red-600">
                      <i className="fas fa-xmark" aria-hidden />
                      {t("completed.incorrect")}
                    </p>
                  )}
                  {wasCorrect && (
                    <p className="mt-3 flex items-center gap-2 text-sm text-green-700">
                      <i className="fas fa-check" aria-hidden />
                      {t("completed.correct")}
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};

export default EnglishExam;
