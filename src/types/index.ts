export type QuizQuestion = {
  id: string;
  question: string;
  choices: string[];
  correctAnswer: number;
  explanation: string;
  category: "HTML" | "CSS" | "JavaScript" | "Web API";
};

export type APIResponse = {
  success: boolean;
  data?: QuizQuestion[];
  error?: string;
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
