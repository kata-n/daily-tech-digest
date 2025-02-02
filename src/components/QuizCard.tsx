import { useState } from "react";
import { QuizQuestion } from "@/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type QuizCardProps = {
  quiz: QuizQuestion;
  onAnswer: (isCorrect: boolean) => void;
};

type CodeProps = {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const MarkdownComponents: Components = {
  code: ({ node, inline, className, children, ...props }: CodeProps) => {
    const match = /language-(\w+)/.exec(className || "");
    const lang = match ? match[1] : "typescript";

    return !inline ? (
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <SyntaxHighlighter
          style={oneDark}
          language={lang}
          PreTag="div"
          className="rounded-md my-2 text-[13px] sm:text-sm"
          customStyle={{
            padding: "1rem",
            margin: "0.5rem 0",
          }}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code
        className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded font-mono text-sm"
        {...props}
      >
        {children}
      </code>
    );
  },
  p: ({ children }) => <div className="my-2">{children}</div>,
};

export default function QuizCard({ quiz, onAnswer }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleAnswer = (index: number) => {
    if (!hasAnswered) {
      const isCorrect = index === quiz.correctAnswer;
      onAnswer(isCorrect);
      setHasAnswered(true);
    }
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  const isCorrect = selectedAnswer === quiz.correctAnswer;

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-md p-4 sm:p-6 mb-4 transition-colors duration-300">
      <div className="flex flex-col gap-3">
        <span className="self-start px-3 py-1 text-sm bg-blue-100/80 dark:bg-blue-900/30 text-blue-800 dark:text-blue-100 rounded-full">
          {quiz.category}
        </span>

        <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={MarkdownComponents}
          >
            {quiz.question}
          </ReactMarkdown>
        </h2>
      </div>

      <div className="space-y-3 my-4">
        {quiz.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={showExplanation}
            className={`w-full p-3 text-left border rounded-md transition-colors duration-200 text-sm sm:text-base
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
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={MarkdownComponents}
            >
              {choice}
            </ReactMarkdown>
          </button>
        ))}
      </div>

      {showExplanation && (
        <div
          className={`p-3 sm:p-4 rounded-md transition-colors duration-200 text-sm sm:text-base ${
            isCorrect
              ? "bg-green-100/60 dark:bg-green-900/20 text-green-800 dark:text-green-100"
              : "bg-red-100/60 dark:bg-red-900/20 text-red-800 dark:text-red-100"
          }`}
        >
          <div className="font-bold mb-2">
            {isCorrect ? "正解！" : "不正解..."}
          </div>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={MarkdownComponents}
          >
            {quiz.explanation}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
