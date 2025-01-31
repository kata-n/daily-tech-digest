import { useState } from "react";
import { QuizQuestion } from "@/types";

type QuizCardProps = {
  quiz: QuizQuestion;
};

export default function QuizCard({ quiz }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  const isCorrect = selectedAnswer === quiz.correctAnswer;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">{quiz.question}</h2>
        <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
          {quiz.category}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        {quiz.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={showExplanation}
            className={`w-full p-3 text-left border text-black rounded-md transition-colors ${
              showExplanation
                ? index === quiz.correctAnswer
                  ? "bg-green-100 border-green-500"
                  : selectedAnswer === index
                  ? "bg-red-100 border-red-500"
                  : "bg-gray-50"
                : "bg-gray-50 hover:bg-gray-100"
            } ${showExplanation && "cursor-default"}`}
          >
            {choice}
          </button>
        ))}
      </div>

      {showExplanation && (
        <div
          className={`p-4 rounded-md ${
            isCorrect ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <p className="font-bold mb-2">{isCorrect ? "正解！" : "不正解..."}</p>
          <p className="text-gray-700">{quiz.explanation}</p>
        </div>
      )}
    </div>
  );
}
