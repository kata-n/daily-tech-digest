"use client";

import { useState } from "react";
import { QuizQuestion, QuizDifficulty } from "@/types";
import QuizCard from "@/components/QuizCard";
import ThemeToggle from "@/components/ThemeToggle";
import DifficultySelector from "@/components/DifficultySelector";
import { QuizSkeletonList } from "@/components/Skeletons";

export default function Home() {
  const [quizzes, setQuizzes] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<QuizDifficulty>("intermediate");
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const handleAnswer = (index: number, isCorrect: boolean) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[index] = isCorrect;
      return newAnswers;
    });
  };

  const isQuizCompleted =
    answers.length === quizzes.length && answers.length > 0;
  const correctCount = answers.filter(Boolean).length;

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      setError(null);
      setQuizzes([]);
      setAnswers([]);

      const response = await fetch(`/api/quiz?difficulty=${difficulty}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "クイズの取得に失敗しました");
      }

      setQuizzes(data.data);
      setStarted(true);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      setError("クイズの取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleStart = () => {
    fetchQuizzes();
  };

  const handleDifficultyChange = (newDifficulty: QuizDifficulty) => {
    setDifficulty(newDifficulty);
  };

  const handleRetry = () => {
    fetchQuizzes();
  };

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
      <ThemeToggle />
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-900 dark:text-white px-4">
          Daily Tech Quiz - 今日の技術クイズ
        </h1>

        {!started ? (
          <div className="max-w-xl mx-auto space-y-8 p-6 bg-card-light dark:bg-card-dark rounded-lg shadow-md">
            <div>
              <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">
                難易度を選択してください
              </h2>
              <DifficultySelector
                difficulty={difficulty}
                onChange={handleDifficultyChange}
                disabled={loading}
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleStart}
                disabled={loading}
                className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    読み込み中...
                  </>
                ) : (
                  "はじめる"
                )}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <DifficultySelector
                difficulty={difficulty}
                onChange={(newDifficulty) => {
                  setDifficulty(newDifficulty);
                  fetchQuizzes();
                }}
                disabled={loading}
              />
            </div>

            {loading && <QuizSkeletonList />}
            {error && (
              <div className="text-red-500 text-center py-8">{error}</div>
            )}

            {!loading && !error && (
              <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
                {quizzes.map((quiz, index) => (
                  <QuizCard
                    key={quiz.id}
                    quiz={quiz}
                    onAnswer={(isCorrect) => handleAnswer(index, isCorrect)}
                  />
                ))}

                {isQuizCompleted && (
                  <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-md p-6 text-center">
                    <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                      クイズ完了！
                    </h2>
                    <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                      正解数: {correctCount} / {quizzes.length}問 (
                      {Math.round((correctCount / quizzes.length) * 100)}%)
                    </p>
                    <button
                      onClick={handleRetry}
                      disabled={loading}
                      className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          読み込み中...
                        </>
                      ) : (
                        "もう一度挑戦する"
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
