import { MDNArticle } from "@/types";

const MDN_API_BASE = "https://developer.mozilla.org/api/v1";

export async function fetchMDNArticles(
  category: string
): Promise<MDNArticle[]> {
  try {
    const response = await fetch(
      `${MDN_API_BASE}/documents?locale=ja-JP&category=${category}`
    );

    if (!response.ok) {
      throw new Error("MDN APIからの記事取得に失敗しました");
    }

    const data = await response.json();
    return data.documents.map((doc: any) => ({
      id: doc.id,
      title: doc.title,
      url: `https://developer.mozilla.org${doc.mdn_url}`,
      summary: "", // Gemini APIで後ほど生成
      category: category,
      publishedAt: new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching MDN articles:", error);
    throw new Error("記事の取得に失敗しました");
  }
}

export function getTodayCategory(): string {
  const days = ["HTML", "CSS", "JavaScript", "Web API"];
  const dayIndex = new Date().getDay();
  return days[dayIndex % days.length];
}
