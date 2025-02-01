"use client";

import { useEffect, useState } from "react";
import { QuizQuestion } from "@/types";
import QuizCard from "@/components/QuizCard";
import Loading from "@/components/Loading";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const [quizzes, setQuizzes] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/quiz");
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "クイズの取得に失敗しました");
        }

        setQuizzes(data.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setError("クイズの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    }

    fetchQuizzes();
  }, []);

  if (loading) return <Loading />;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
      <ThemeToggle />
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-900 dark:text-white px-4">
          Daily Tech Quiz - 今日の技術クイズ
        </h1>

        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </main>
  );
}
