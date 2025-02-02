import { QuizDifficulty } from "@/types";

const DIFFICULTY_DESCRIPTIONS: Record<QuizDifficulty, string> = {
  beginner: "基本的な概念や一般的な使用方法に関する",
  intermediate: "実務でよく遭遇する問題や最適化に関する",
  advanced: "高度な概念や最新の機能、パフォーマンスチューニングに関する",
};

export function getQuizPrompt(
  category: string,
  count: number,
  difficulty: QuizDifficulty
): string {
  return `
    ${category}に関する${
    DIFFICULTY_DESCRIPTIONS[difficulty]
  }技術的なクイズを${count}問作成してください。
    以下の形式でJSONとして出力してください：

    {
      "questions": [
        {
          "question": "問題文（コードを含む場合は\`\`\`typescript\\nコード\\n\`\`\`の形式で記述）",
          "choices": ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
          "correctAnswer": 0,
          "explanation": "解説文（コードを含む場合は\`\`\`typescript\\nコード\\n\`\`\`の形式で記述）"
        }
      ]
    }

    条件：
    - ${
      difficulty === "beginner"
        ? "基本的な文法や概念に関する問題"
        : difficulty === "intermediate"
        ? "実務で役立つ実践的な問題"
        : "高度な最適化や設計に関する問題"
    }
    - 選択肢は必ず4つ
    - 解説は200文字程度で、なぜその答えが正解なのかを説明
    - コードを含む問題の場合は、必ずMarkdownのコードブロック記法を使用し、言語指定は typescript とする
    - コードはTypeScriptの型情報を含める
  `;
}
