export type MDNArticle = {
  id: string;
  title: string;
  url: string;
  summary: string;
  category: "HTML" | "CSS" | "JavaScript" | "Web API";
  publishedAt: string;
};

export type APIResponse = {
  success: boolean;
  data?: MDNArticle[];
  error?: string;
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
