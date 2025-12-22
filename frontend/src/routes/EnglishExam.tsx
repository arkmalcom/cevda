import { useState } from "react";
import { PublicAssessmentQuestion } from "../utils/Types";

enum ExamPhase {
    EnterEmail,
    InProgress,
    Completed
}

interface AttemptResponse {
    AttemptID: string;
    CreatedAt: number;
    QuestionIDs: string[];
}

const EnglishExam = () => {
    const [phase, setPhase] = useState<ExamPhase>(ExamPhase.EnterEmail);
    const [email, setEmail] = useState("");
    const [attemptID, setAttemptID] = useState("");
    const [attemptCreatedAt, setAttemptCreatedAt] = useState<number | null>(null);
    const [questions, setQuestions] = useState<PublicAssessmentQuestion[]>([]);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [score, setScore] = useState<number | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const BASE_API_ENDPOINT = import.meta.env.VITE_BASE_API_ENDPOINT_URI;

    const startAttempt = async () => {
        const res = await fetch(`${BASE_API_ENDPOINT}/attempts/start`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        if (!res.ok) {
            console.error("Failed to start attempt");
            return;
        }

        const data: AttemptResponse = await res.json();
        const attemptID = data.AttemptID;
        setAttemptID(attemptID);
        setAttemptCreatedAt(data.CreatedAt);

        console.log("Loading questions for attemptID:", attemptID);

        const qRes = await fetch(`${BASE_API_ENDPOINT}/questions/${attemptID}`);

        if (!qRes.ok) {
            console.error("Failed to load questions");
            return;
        }

        const qData: PublicAssessmentQuestion[] = await qRes.json();
        setQuestions(qData);
        setPhase(ExamPhase.InProgress);
    }

    const submitAttempt = async () => {
        if (!attemptID || !attemptCreatedAt) return;

        const missingAnswers: Record<string, string> = {};
        questions.forEach((q) => {
            if (answers[q.QuestionID] === undefined) {
                missingAnswers[q.QuestionID] = "This question must be answered.";
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

        setErrors({});

        const answersPayload: Record<string, number> = {};
        questions.forEach((q: PublicAssessmentQuestion) => {
            answersPayload[q.QuestionID] = answers[q.QuestionID]!;
        })

        const res = await fetch(`${BASE_API_ENDPOINT}/attempts/submit`, {
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

        const data = await res.json();
        setScore(data.score);
        setPhase(ExamPhase.Completed);
    }

    if (phase === ExamPhase.EnterEmail) {
        return (
            <div className="p-4 max-w-xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">Inicia tu examen</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu correo electrónico"
                    className="border p-2 w-full mb-4"
                />
                <button
                    onClick={startAttempt}
                    className="bg-amber-500 text-white px-4 py-2 rounded"
                >
                    Comenzar
                </button>
            </div>
        );
    }

    if (phase === ExamPhase.InProgress) {
        return (
            <div className="p-4 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">Examen de Inglés</h1>
                <div>
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
                                    {errors[q.QuestionID]}
                                </p>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={submitAttempt}
                        className="bg-amber-500 text-white px-4 py-2 rounded"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        );
    }

    if (phase === ExamPhase.Completed) {
        return (
            <div className="p-4 max-w-xl mx-auto text-center">
                <h1 className="text-3xl font-bold mb-4">Resultado</h1>
                <p className="text-xl mb-4">Tu puntuación final: {score}%</p>
            </div>
        );
    }

    return null;
};

export default EnglishExam;
