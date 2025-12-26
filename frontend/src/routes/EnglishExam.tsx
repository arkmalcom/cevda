import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { PublicAssessmentQuestion } from "../utils/Types";

enum ExamPhase {
    EnterEmail,
    InProgress,
    Completed
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
}

type ValidationErrors = Record<string, FieldError | string>;

type QuestionResult = {
    question_id: string;
    correct: boolean;
    answered: boolean;
}

type GradeResult = {
    score: number;
    total_questions: number;
    results: QuestionResult[];
}

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
    const [resultMap, setResultMap] = useState<Record<string, QuestionResult>>({});
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
    }

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
    }

    const startAttempt = async () => {
        const validationErrors = validateStart();


        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        const res = await fetch(`${import.meta.env.VITE_BASE_API_ENDPOINT_URI}/attempts/start`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, name, phone }),
        });

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

        const qRes = await fetch(`${import.meta.env.VITE_BASE_API_ENDPOINT_URI}/questions/${attemptID}`);

        if (!qRes.ok) {
            console.error("Failed to load questions");
            return;
        }

        const qData: PublicAssessmentQuestion[] = await qRes.json();
        setQuestions(qData);
        setPhase(ExamPhase.InProgress);
    }

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
        })

        const res = await fetch(`${import.meta.env.VITE_BASE_API_ENDPOINT_URI}/attempts/submit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                attempt_id: attemptID,
                answers: answersPayload,
                created_at: attemptCreatedAt,
            }),
        });

        if (!res.ok) {
            console.error("Failed to submit attempt");
            return;
        }

        const STAGE = import.meta.env.VITE_STAGE;

        const data = await res.json();

        const resultMap: Record<string, QuestionResult> = Object.fromEntries(
            data.results.map((qr: QuestionResult) => [qr.question_id, qr])
        );


        setGradeResult({
            score: data.score,
            total_questions: data.total_questions,
            results: data.results,
        });
        setResultMap(resultMap);
        setPhase(ExamPhase.Completed);

        await fetch(`${import.meta.env.VITE_BASE_EMAIL_ENDPOINT}/${STAGE}/email-handler-${STAGE}`, {
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
                results: questions.map(q => {
                    const r = resultMap[q.QuestionID];
                    const selectedIndex = answers[q.QuestionID];
                    return {
                        question_id: q.QuestionID,
                        prompt: q.Prompt,
                        selected_index: selectedIndex ?? null,
                        selected_text: selectedIndex !== undefined ? q.Choices[selectedIndex] : null,
                        correct: r?.correct ?? false,
                        answered: r?.answered ?? false,
                    };
                }),
            }),
        });
    }

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

    const renderError = (err: FieldError | string) => {
        if (typeof err === "string") return err;

        const key = `formErrors.${err.code}`;

        return t(key, {
            field: t(`fields.${err.field}`),
            defaultValue: t("formErrors.genericText")
        });
    };

    if (phase === ExamPhase.EnterEmail) {
        return (
            <div className="p-4">
                <form onSubmit={(e) => { e.preventDefault(); startAttempt(); }} className="w-full flex justify-center flex-col space-y-3 mx-auto max-w-xl">
                    <h1 className="text-3xl font-bold mb-4">{t("start.title")}</h1>
                    <p>{t("start.content")}</p>
                    <label htmlFor="name">{t("fieldLabels.name")}</label>
                    <input
                        type="text"
                        value={name}
                        onChange={
                            (e) => {
                                setName(e.target.value);
                                setErrors(prev => {
                                    const { name, ...rest } = prev;
                                    return rest;
                                });
                            }
                        }
                        placeholder={t("start.namePlaceholder")}
                        className={`border p-2 w-full mb-4 ${errors["name"] ? "border-red-500" : ""}`}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mb-2">
                            {renderError(errors.name)}
                        </p>
                    )}
                    <label htmlFor="phone">{t("fieldLabels.phone")}</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                            setErrors(prev => {
                                const { phone, ...rest } = prev;
                                return rest;
                            });
                        }}
                        placeholder={t("start.phonePlaceholder")}
                        className={`border p-2 w-full mb-4 ${errors["phone"] ? "border-red-500" : ""}`}
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm mb-2">
                            {renderError(errors.phone)}
                        </p>
                    )}
                    <label htmlFor="email">{t("fieldLabels.email")}</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors(prev => {
                                const { email, ...rest } = prev;
                                return rest;
                            });
                        }}
                        placeholder={t("start.emailPlaceholder")}
                        className={`border p-2 w-full mb-4 ${errors["email"] ? "border-red-500" : ""}`}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mb-2">
                            {renderError(errors.email)}
                        </p>
                    )}
                    {errors.form && (
                        <div className="text-red-600 text-sm text-center">
                            {renderError(errors.form)}
                        </div>
                    )}
                    <button
                        className="bg-amber-500 text-white px-4 py-2 rounded mx-auto"
                    >
                        {t("start.startButton")}
                    </button>
                </form>
            </div>
        );
    }


    if (phase === ExamPhase.InProgress) {
        return (
            <div className="p-4 max-w-4xl mx-auto flex flex-col justify-center items-center">
                <form onSubmit={(e) => { e.preventDefault(); submitAttempt(); }} className="w-full flex justify-center flex-col space-y-3 mx-auto max-w-xl">
                    <h1 className="text-3xl font-bold mb-4">{t("inProgress.title")}</h1>
                    <div>
                        <div className={`fixed bottom-12 right-4 px-3 py-1 rounded mx-auto
                    ${timeLeft < 60 ? "bg-red-600" : "bg-black"} text-white`}
                        >
                            ⏱ {formatTime(timeLeft)}
                        </div>
                        {questions.map((q, idx) => (
                            <div key={q.QuestionID} className="mb-6">
                                <p className="font-medium mb-2">
                                    {idx + 1}. {q.Prompt}
                                </p>
                                {q.Choices.map((choice, cIdx) => (
                                    <label key={cIdx} className="block mb-1">
                                        <input
                                            type="radio"
                                            name={q.QuestionID}
                                            value={cIdx}
                                            checked={answers[q.QuestionID] === cIdx}
                                            onChange={() =>
                                                setAnswers((prev) => ({
                                                    ...prev,
                                                    [q.QuestionID]: cIdx,
                                                }))
                                            }
                                            className="mr-2"
                                        />
                                        {choice}
                                    </label>
                                ))}
                                {errors[q.QuestionID] && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {renderError(errors[q.QuestionID])}
                                    </p>
                                )}
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="bg-amber-500 text-white px-4 py-2 rounded"
                        >
                            {t("inProgress.submitButton")}
                        </button>
                    </div>
                </form>
            </div >
        );
    }

    if (phase === ExamPhase.Completed) {
        return (
            <div className="p-4 max-w-xl mx-auto text-center">
                <h1 className="text-3xl font-bold mb-4">{t("completed.title")}</h1>
                {
                    isExpired ? (
                        <p className="text-lg mb-4 text-red-600">{t("completed.expiredText")}</p>
                    ) : (
                        <p className="text-lg mb-4">{t("completed.content")}</p>
                    )
                }
                <p className="text-xl mb-4">{t("completed.score", { score: gradeResult?.score })}</p>
                {questions.map(q => {
                    const result = resultMap[q.QuestionID];
                    const wasAnswered = result?.answered;
                    const wasCorrect = result?.correct;
                    return (
                        <div key={q.QuestionID}>
                            <p>{q.Prompt}</p>

                            {q.Choices.map((choice, idx) => {
                                const isSelected = answers[q.QuestionID] === idx;

                                return (
                                    <div
                                        key={idx}
                                        className={`
                                            ${isSelected ? "font-semibold" : ""}
                                            ${isSelected && wasCorrect ? "text-green-600" : ""}
                                            ${isSelected && !wasCorrect ? "text-red-600" : ""}
                                        `}
                                    >
                                        {choice}
                                    </div>
                                );
                            })}

                            {!wasAnswered && (
                                <p className="py-2 text-yellow-600 text-sm">
                                    ⚠️ {t("completed.notAnswered")}
                                </p>
                            )}

                            {wasAnswered && !wasCorrect && (
                                <p className="py-2 text-red-500 text-sm">
                                    ❌ {t("completed.incorrect")}
                                </p>
                            )}

                            {wasCorrect && (
                                <p className="py-2 text-green-600 text-sm">
                                    ✅ {t("completed.correct")}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }

    return null;
};

export default EnglishExam;