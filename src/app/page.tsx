"use client";

import { useEffect, useState } from "react";
import { QuizQuestion } from "@/types";
import QuizCard from "@/components/QuizCard";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";

const ITEMS_PER_PAGE = 3;

export default function Home() {
  const [quizzes, setQuizzes] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.ceil(quizzes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentQuizzes = quizzes.slice(startIndex, endIndex);

  if (loading) return <Loading />;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Daily Tech Quiz - 今日の技術クイズ
      </h1>

      <div className="max-w-3xl mx-auto">
        {currentQuizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}

        {quizzes.length > ITEMS_PER_PAGE && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </main>
  );
}
