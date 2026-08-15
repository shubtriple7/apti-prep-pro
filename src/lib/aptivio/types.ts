export type Category =
  | "aptitude"
  | "verbal"
  | "hr"
  | "technical"
  | "business";

export type Difficulty = "easy" | "medium" | "hard";

export type QuestionType = "mcq" | "multi" | "boolean" | "order";

export interface Question {
  id: string;
  category: Category;
  difficulty: Difficulty;
  companyTags: string[];
  question: string;
  options: string[];
  /** index (mcq/boolean) or indices (multi/order) */
  correctAnswer: number | number[];
  type: QuestionType;
  explanation: string;
  sourceType: "authored" | "ai" | "curated";
}

export interface NewsCard {
  id: string;
  date: string;
  headline: string;
  summary: string;
  whyItMatters: string;
  interviewQuestion: string;
  mcq: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
}

export type SessionSlot = "morning" | "evening";

export interface DailySet {
  day: number;
  morning: string[];
  evening: string[];
  newsIds: string[];
}

export interface Profile {
  fullName: string;
  college: string;
  degree: string;
  branch: string;
  graduationYear: string;
  targetCompanies: string[];
}

export interface SessionResult {
  slot: SessionSlot;
  day: number;
  correct: number;
  total: number;
  xp: number;
  completedAt: string;
}

export interface ProgressState {
  onboarded: boolean;
  profile: Profile | null;
  xp: number;
  streak: number;
  shields: number;
  day: number;
  answered: Record<string, boolean>;
  categoryStats: Record<Category, { correct: number; total: number }>;
  history: SessionResult[];
}

export const CATEGORY_LABELS: Record<Category, string> = {
  aptitude: "Aptitude",
  verbal: "Verbal",
  hr: "HR Interview",
  technical: "Technical",
  business: "Business Awareness",
};

export const DIFFICULTY_XP: Record<Difficulty, number> = {
  easy: 2,
  medium: 3,
  hard: 5,
};

export const LEVELS = [
  { name: "Explorer", min: 0 },
  { name: "Learner", min: 150 },
  { name: "Performer", min: 400 },
  { name: "Achiever", min: 900 },
  { name: "Elite", min: 1800 },
  { name: "Legend", min: 3200 },
] as const;

export function levelFor(xp: number) {
  let index = 0;
  for (let i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i].min) index = i;
  const current = LEVELS[index];
  const next = LEVELS[index + 1];
  const span = next ? next.min - current.min : 1;
  const into = xp - current.min;
  return {
    index,
    name: current.name,
    next: next?.name ?? null,
    nextAt: next?.min ?? null,
    progress: next ? Math.min(1, into / span) : 1,
  };
}
