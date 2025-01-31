import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing Gemini API key");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function summarizeArticle(content: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      以下のMDNドキュメントの内容を1000文字程度で要約してください。
      技術的な正確性を保ちながら、初心者にもわかりやすい日本語で説明してください。

      ${content}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error summarizing article:", error);
    throw new Error("記事の要約に失敗しました");
  }
}
