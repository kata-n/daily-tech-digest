import { NextResponse } from "next/server";
import { fetchMDNArticles, getTodayCategory } from "@/utils/mdn";
import { summarizeArticle } from "@/utils/gemini";

export async function GET() {
  try {
    const category = getTodayCategory();
    const articles = await fetchMDNArticles(category);

    // 最新の20件のみを処理
    const latestArticles = articles.slice(0, 20);

    // 各記事の要約を生成
    const articlesWithSummary = await Promise.all(
      latestArticles.map(async (article) => {
        try {
          const summary = await summarizeArticle(article.title);
          return { ...article, summary };
        } catch (error) {
          console.error(`Error summarizing article ${article.id}:`, error);
          return { ...article, summary: "要約を生成できませんでした。" };
        }
      })
    );

    return NextResponse.json({
      success: true,
      data: articlesWithSummary,
    });
  } catch (error) {
    console.error("Error in GET /api/articles:", error);
    return NextResponse.json(
      {
        success: false,
        error: "記事の取得に失敗しました",
      },
      { status: 500 }
    );
  }
}
