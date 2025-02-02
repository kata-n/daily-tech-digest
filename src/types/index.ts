export type QuizDifficulty = "beginner" | "intermediate" | "advanced";

export type QuizQuestion = {
  id: string;
  question: string;
  choices: string[];
  correctAnswer: number;
  explanation: string;
  category: "HTML" | "CSS" | "JavaScript" | "Web API";
  difficulty: QuizDifficulty;
};

export type APIResponse = {
  success: boolean;
  data?: QuizQuestion[];
  error?: string;
};
