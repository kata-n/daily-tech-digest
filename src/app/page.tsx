"use client";

import { useEffect, useState } from "react";
import { QuizQuestion, QuizDifficulty } from "@/types";
import QuizCard from "@/components/QuizCard";
import Loading from "@/components/Loading";
import ThemeToggle from "@/components/ThemeToggle";
import DifficultySelector from "@/components/DifficultySelector";

export default function Home() {
  const [quizzes, setQuizzes] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<QuizDifficulty>("intermediate");
  const [started, setStarted] = useState(false);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      setError(null);
      setQuizzes([]);

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
                className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                はじめる
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

            {loading && <Loading />}
            {error && (
              <div className="text-red-500 text-center py-8">{error}</div>
            )}

            {!loading && !error && (
              <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
                {quizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
