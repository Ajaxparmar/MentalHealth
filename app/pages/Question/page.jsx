
"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const OPTION_KEYS = ["optionA", "optionB", "optionC", "optionD"];

export default function Question() {

    const router = useRouter();

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const getQuestions = async () => {
            const response = await fetch("http://localhost:3000/api/Question");
            const data = await response.json();
            setQuestions(data.questions);
            setAnswers(new Array(data.questions.length).fill(null));
        };

        getQuestions();
    }, [])

    useEffect(() => {
        if (!finished) return;

        const timer = setTimeout(() => {
            router.push("/pages/Home");
        }, 1500);

        return () => clearTimeout(timer);
    }, [finished, router])

    const currentQuestion = questions[currentIndex];
    const selectedOption = answers[currentIndex];
    const progress = questions.length
        ? ((currentIndex + (finished ? 1 : 0)) / questions.length) * 100
        : 0;

    const persistAnswers = (updatedAnswers) => {
        const payload = questions
            .map((q, i) => ({
                questionId: q.id,
                question: q.question,
                selectedOption: updatedAnswers[i],
            }))
            .filter((a) => a.selectedOption !== null);

        localStorage.setItem("answers", JSON.stringify(payload));
    };

    const selectOption = (optionKey) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentIndex] = optionKey;
        setAnswers(updatedAnswers);
        persistAnswers(updatedAnswers);
    };

    const handlePrevious = () => {
        if (currentIndex === 0) return;
        setFinished(false);
        setCurrentIndex((prev) => prev - 1);
    };

    const handleNext = () => {
        if (!selectedOption) return;

        if (currentIndex === questions.length - 1) {
            setFinished(true);
            return;
        }

        setCurrentIndex((prev) => prev + 1);
    };

    if (questions.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-gray-500">Loading questions...</p>
            </div>
        );
    }

    if (finished) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-8 text-center">
                    <div className="text-5xl mb-4">🎉</div>
                    <h1 className="text-xl font-semibold text-gray-900">Great! Well done!</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6">
            <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden">

                <div className="px-6 pt-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-400">
                            Question {currentIndex + 1} of {questions.length}
                        </span>
                        <span className="text-xs font-medium text-indigo-500">
                            {Math.round(progress)}%
                        </span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="px-6 pt-6 pb-4">
                    <h1 className="text-lg font-semibold text-gray-900 leading-snug">
                        {currentQuestion.question}
                    </h1>
                </div>

                <div className="px-6 flex flex-col gap-3 pb-6">
                    {OPTION_KEYS.map((key) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => selectOption(key)}
                            className={`w-full text-left px-4 py-3 rounded-2xl border transition active:scale-95
                                ${selectedOption === key
                                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                    : "border-gray-200 bg-gray-50 text-gray-700"}`}
                        >
                            <span
                                className={`inline-flex items-center justify-center w-5 h-5 mr-3 rounded-full border text-xs
                                    ${selectedOption === key
                                        ? "border-indigo-500 bg-indigo-500 text-white"
                                        : "border-gray-300 text-transparent"}`}
                            >
                                ✓
                            </span>
                            {currentQuestion[key]}
                        </button>
                    ))}
                </div>

                <div className="px-6 pb-6 flex gap-3">
                    <button
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        className="flex-1 py-3 rounded-2xl bg-gray-100 text-gray-700 font-medium disabled:opacity-40 active:scale-95 transition"
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!selectedOption}
                        className="flex-1 py-3 rounded-2xl bg-indigo-500 text-white font-medium disabled:opacity-40 active:scale-95 transition"
                    >
                        {currentIndex === questions.length - 1 ? "Finish" : "Next"}
                    </button>
                </div>
            </div>
        </div>
    )
}
