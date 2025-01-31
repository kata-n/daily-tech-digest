import { MDNArticle } from "@/types";
import Link from "next/link";

type ArticleCardProps = {
  article: MDNArticle;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">{article.title}</h2>
        <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
          {article.category}
        </span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">{article.summary}</p>

      <div className="flex items-center justify-between">
        <Link
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          MDNで読む →
        </Link>

        <button
          onClick={() => {
            const text = `${article.title}\n\n${article.summary}\n\n${article.url}`;
            navigator.clipboard.writeText(text);
          }}
          className="text-gray-600 hover:text-gray-800"
        >
          共有する
        </button>
      </div>
    </div>
  );
}
