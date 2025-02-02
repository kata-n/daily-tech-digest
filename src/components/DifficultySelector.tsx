import { QuizDifficulty } from "@/types";

type DifficultySelectorProps = {
  difficulty: QuizDifficulty;
  onChange: (difficulty: QuizDifficulty) => void;
  disabled?: boolean;
};

const DIFFICULTY_LABELS: Record<QuizDifficulty, string> = {
  beginner: "初級",
  intermediate: "中級",
  advanced: "上級",
};

const DIFFICULTY_COLORS: Record<QuizDifficulty, string> = {
  beginner:
    "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 border-green-200 dark:border-green-800",
  intermediate:
    "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 border-yellow-200 dark:border-yellow-800",
  advanced:
    "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 border-red-200 dark:border-red-800",
};

export default function DifficultySelector({
  difficulty,
  onChange,
  disabled = false,
}: DifficultySelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {Object.entries(DIFFICULTY_LABELS).map(([value, label]) => (
        <button
          key={value}
          onClick={() => onChange(value as QuizDifficulty)}
          disabled={disabled}
          className={`px-4 py-2 rounded-full border-2 transition-all duration-200 
            ${
              difficulty === value
                ? `${DIFFICULTY_COLORS[value as QuizDifficulty]} scale-105`
                : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:scale-105"
            }
            ${disabled && "opacity-50 cursor-not-allowed hover:scale-100"}
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
