import { GoogleGenerativeAI } from "@google/generative-ai";
import { QuizQuestion } from "@/types";
import { getQuizPrompt } from "./prompts";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing Gemini API key");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateQuiz(
  category: string,
  count: number = 5
): Promise<QuizQuestion[]> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: { responseMimeType: "application/json" },
    });
    const prompt = getQuizPrompt(category, count);

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
