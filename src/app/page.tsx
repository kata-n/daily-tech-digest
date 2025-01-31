"use client";

import { useEffect, useState } from "react";
import { MDNArticle } from "@/types";
import ArticleCard from "@/components/ArticleCard";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";

const ITEMS_PER_PAGE = 3;

export default function Home() {
  const [articles, setArticles] = useState<MDNArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/articles");
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "記事の取得に失敗しました");
        }

        setArticles(data.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError("記事の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentArticles = articles.slice(startIndex, endIndex);

  if (loading) return <Loading />;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Daily Tech Digest - MDN要約
      </h1>

      <div className="max-w-3xl mx-auto">
        {currentArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}

        {articles.length > ITEMS_PER_PAGE && (
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
