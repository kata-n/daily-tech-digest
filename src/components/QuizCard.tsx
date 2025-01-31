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
    <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-md p-6 mb-4 transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {quiz.question}
        </h2>
        <span className="px-3 py-1 text-sm bg-blue-100/80 dark:bg-blue-900/30 text-blue-800 dark:text-blue-100 rounded-full">
          {quiz.category}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        {quiz.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={showExplanation}
            className={`w-full p-3 text-left border rounded-md transition-colors duration-200
              ${
                showExplanation
                  ? index === quiz.correctAnswer
                    ? "bg-green-100/80 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-100"
                    : selectedAnswer === index
                    ? "bg-red-100/80 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-100"
                    : "bg-gray-50/80 dark:bg-gray-700/30 text-gray-800 dark:text-gray-200"
                  : "bg-gray-50/80 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-600/50 text-gray-800 dark:text-gray-200"
              }
              ${showExplanation && "cursor-default"}
            `}
          >
            {choice}
          </button>
        ))}
      </div>

      {showExplanation && (
        <div
          className={`p-4 rounded-md transition-colors duration-200 ${
            isCorrect
              ? "bg-green-100/60 dark:bg-green-900/20 text-green-800 dark:text-green-100"
              : "bg-red-100/60 dark:bg-red-900/20 text-red-800 dark:text-red-100"
          }`}
        >
          <p className="font-bold mb-2">{isCorrect ? "正解！" : "不正解..."}</p>
          <p className="text-gray-700 dark:text-gray-300">{quiz.explanation}</p>
        </div>
      )}
    </div>
  );
}
