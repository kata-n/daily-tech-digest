import { GoogleGenerativeAI } from "@google/generative-ai";
import { QuizQuestion } from "@/types";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing Gemini API key");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateQuiz(
  category: string,
  count: number = 5
): Promise<QuizQuestion[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      ${category}に関する技術的なクイズを${count}問作成してください。
      以下の形式でJSONとして出力してください：

      {
        "questions": [
          {
            "question": "問題文（コードを含む場合は\`\`\`言語名\\nコード\\n\`\`\`の形式で記述）",
            "choices": ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
            "correctAnswer": 0,
            "explanation": "解説文（コードを含む場合は\`\`\`言語名\\nコード\\n\`\`\`の形式で記述）"
          }
        ]
      }

      条件：
      - 問題は中級レベル以上
      - フロントエンジニアとして経験がある人が問題を理解できるような内容
      - 選択肢は必ず4つ
      - 解説は200文字程度で、なぜその答えが正解なのかを説明
      - 実務で役立つような内容
      - コードを含む問題の場合は、必ずMarkdownのコードブロック記法を使用
      - コードブロックには適切な言語名を指定（js, javascript, typescript, html, css など）
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonStr = response.text();

    try {
      const data = JSON.parse(jsonStr);
      return data.questions.map((q: any, index: number) => ({
        id: `${category}-${index}`,
        question: q.question,
        choices: q.choices,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        category: category,
      }));
    } catch (error) {
      console.error("Error parsing quiz JSON:", error);
      throw new Error("クイズデータの解析に失敗しました");
    }
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("クイズの生成に失敗しました");
  }
}
