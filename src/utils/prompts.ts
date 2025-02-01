export function getQuizPrompt(category: string, count: number): string {
  return `
    ${category}に関する技術的なクイズを${count}問作成してください。
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
    - 問題は中級レベル以上
    - フロントエンジニアとして経験がある人が問題を理解できるような内容
    - 選択肢は必ず4つ
    - 解説は200文字程度で、なぜその答えが正解なのかを説明
    - 実務で役立つような内容
    - コードを含む問題の場合は、必ずMarkdownのコードブロック記法を使用し、言語指定は typescript とする
    - コードはTypeScriptの型情報を含める
  `;
}
