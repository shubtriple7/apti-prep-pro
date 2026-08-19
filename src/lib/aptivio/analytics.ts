import { QUESTION_BANK, QUESTIONS_BY_ID } from "./questions";
import type {
  Attempt,
  Category,
  Difficulty,
  ProgressState,
  Question,
  SessionSlot,
  Topic,
} from "./types";
import { TOPICS } from "./types";

/* --------------------------- topic inference --------------------------- */

const TOPIC_KEYWORDS: Array<[Topic, RegExp]> = [
  ["SQL", /\b(sql|query|join|select|group by|index|second highest salary)\b/i],
  ["DBMS", /\b(normalis|normaliz|3nf|primary key|foreign key|transaction|acid|schema|database)\b/i],
  ["Operating Systems", /\b(process|thread|deadlock|scheduling|semaphore|paging|kernel|virtual memory)\b/i],
  ["Computer Networks", /\b(tcp|udp|http|dns|ip address|osi|packet|router|latency|subnet)\b/i],
  ["OOP", /\b(class|object|inherit|polymorph|encapsulat|abstract|interface)\b/i],
  ["Logic", /\b(series|sequence|arrange|order|pattern|syllogism|blood relation|coding-decoding)\b/i],
];

/** Maps a question to a fine-grained topic for the weakness engine. */
export function topicOf(question: Question): Topic {
  if (question.topic) return question.topic;
  const haystack = `${question.question} ${question.explanation}`;
  if (question.category === "technical") {
    const hit = TOPIC_KEYWORDS.find(([, re]) => re.test(haystack));
    if (hit) return hit[0];
    return "OOP";
  }
  if (question.category === "aptitude") {
    return /\b(series|sequence|arrange|pattern|logic)\b/i.test(haystack) ? "Logic" : "Aptitude";
  }
  if (question.category === "verbal") return "Verbal";
  if (question.category === "hr") return "HR";
  return "Business News";
}

/* ------------------------------ analytics ------------------------------ */

export interface Bucket {
  correct: number;
  total: number;
  timeMs: number;
}

export interface Analytics {
  totalAttempts: number;
  accuracy: number;
  avgSeconds: number;
  byTopic: Record<string, Bucket>;
  byDifficulty: Record<Difficulty, Bucket>;
  byCompany: Record<string, Bucket>;
  weakest: Array<{ topic: Topic; accuracy: number; total: number }>;
  strongest: Array<{ topic: Topic; accuracy: number; total: number }>;
  incorrect: Attempt[];
}

const emptyBucket = (): Bucket => ({ correct: 0, total: 0, timeMs: 0 });

function add(bucket: Bucket, attempt: Attempt) {
  bucket.total += 1;
  bucket.timeMs += attempt.timeMs;
  if (attempt.correct) bucket.correct += 1;
}

export function pct(bucket?: Bucket) {
  if (!bucket || !bucket.total) return 0;
  return Math.round((bucket.correct / bucket.total) * 100);
}

export function computeAnalytics(state: ProgressState): Analytics {
  const attempts = state.attempts ?? [];
  const byTopic: Record<string, Bucket> = {};
  const byDifficulty: Record<Difficulty, Bucket> = {
    easy: emptyBucket(),
    medium: emptyBucket(),
    hard: emptyBucket(),
  };
  const byCompany: Record<string, Bucket> = {};

  attempts.forEach((attempt) => {
    byTopic[attempt.topic] ??= emptyBucket();
    add(byTopic[attempt.topic]!, attempt);
    add(byDifficulty[attempt.difficulty], attempt);
    attempt.companyTags.forEach((company) => {
      byCompany[company] ??= emptyBucket();
      add(byCompany[company]!, attempt);
    });
  });

  const ranked = TOPICS.filter((topic) => (byTopic[topic]?.total ?? 0) > 0)
    .map((topic) => ({
      topic,
      accuracy: pct(byTopic[topic]),
      total: byTopic[topic]!.total,
    }))
    .sort((a, b) => a.accuracy - b.accuracy);

  const correct = attempts.filter((a) => a.correct).length;
  const totalTime = attempts.reduce((sum, a) => sum + a.timeMs, 0);

  return {
    totalAttempts: attempts.length,
    accuracy: attempts.length ? Math.round((correct / attempts.length) * 100) : 0,
    avgSeconds: attempts.length ? Math.round(totalTime / attempts.length / 1000) : 0,
    byTopic,
    byDifficulty,
    byCompany,
    weakest: ranked.slice(0, 3),
    strongest: [...ranked].reverse().slice(0, 3),
    incorrect: attempts.filter((a) => !a.correct),
  };
}

/* ------------------------- adaptive quiz builder ------------------------ */

export interface TopicWeight {
  topic: Topic;
  weight: number;
  reason: string;
}

/** Weights tomorrow's set: weak topics get more questions, strong ones fewer. */
export function recommendWeights(analytics: Analytics): TopicWeight[] {
  return TOPICS.map((topic) => {
    const bucket = analytics.byTopic[topic];
    if (!bucket || bucket.total < 2) {
      return { topic, weight: 1, reason: "Not enough data yet — keeping baseline volume." };
    }
    const accuracy = pct(bucket);
    if (accuracy < 50) return { topic, weight: 3, reason: `${accuracy}% accuracy — adding extra questions.` };
    if (accuracy < 70) return { topic, weight: 2, reason: `${accuracy}% accuracy — a little more practice.` };
    if (accuracy > 85) return { topic, weight: 0.5, reason: `${accuracy}% accuracy — reducing frequency.` };
    return { topic, weight: 1, reason: `${accuracy}% accuracy — steady.` };
  });
}

function scoreQuestion(
  question: Question,
  weights: Map<Topic, number>,
  companies: string[],
  seenIds: Set<string>,
) {
  let score = weights.get(topicOf(question)) ?? 1;
  if (companies.some((c) => question.companyTags.includes(c))) score *= 1.6;
  if (seenIds.has(question.id)) score *= 0.35;
  return score;
}

/**
 * Builds a personalised set of question ids for a slot.
 * Deterministic for a given day + slot so a refresh does not reshuffle.
 */
export function buildAdaptiveSet(
  state: ProgressState,
  day: number,
  slot: SessionSlot,
  size = 10,
): string[] {
  const analytics = computeAnalytics(state);
  const weights = new Map(recommendWeights(analytics).map((w) => [w.topic, w.weight]));
  const companies = state.profile?.targetCompanies ?? [];
  const seen = new Set((state.attempts ?? []).map((a) => a.questionId));

  const offset = (day - 1) * 7 + (slot === "evening" ? 3 : 0);
  const ranked = QUESTION_BANK.map((question, i) => ({
    question,
    score: scoreQuestion(question, weights, companies, seen) + ((i + offset) % 7) / 100,
  })).sort((a, b) => b.score - a.score);

  const picked: string[] = [];
  const usedCategories: Record<string, number> = {};
  ranked.forEach(({ question }) => {
    if (picked.length >= size) return;
    const used = usedCategories[question.category] ?? 0;
    if (used >= 4) return;
    usedCategories[question.category] = used + 1;
    picked.push(question.id);
  });
  return picked;
}

/* ---------------------------- company mode ----------------------------- */

export interface CompanyReadiness {
  company: string;
  readiness: number;
  attempted: number;
  poolSize: number;
  accuracy: number;
  weakTopics: Topic[];
}

export function companyReadiness(state: ProgressState, company: string): CompanyReadiness {
  const analytics = computeAnalytics(state);
  const pool = QUESTION_BANK.filter((q) => q.companyTags.includes(company));
  const attempts = (state.attempts ?? []).filter((a) => a.companyTags.includes(company));
  const accuracy = attempts.length
    ? Math.round((attempts.filter((a) => a.correct).length / attempts.length) * 100)
    : 0;
  const coverage = pool.length ? Math.min(1, attempts.length / pool.length) : 0;
  const readiness = Math.round(accuracy * 0.7 + coverage * 100 * 0.3);

  const topicBuckets: Record<string, { correct: number; total: number }> = {};
  attempts.forEach((a) => {
    topicBuckets[a.topic] ??= { correct: 0, total: 0 };
    topicBuckets[a.topic]!.total += 1;
    if (a.correct) topicBuckets[a.topic]!.correct += 1;
  });
  const weakTopics = Object.entries(topicBuckets)
    .filter(([, b]) => b.total > 0 && b.correct / b.total < 0.7)
    .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)
    .slice(0, 3)
    .map(([topic]) => topic as Topic);

  return {
    company,
    readiness,
    attempted: attempts.length,
    poolSize: pool.length,
    accuracy,
    weakTopics,
  };
}

/* --------------------------- smart revision ---------------------------- */

export function smartRevision(state: ProgressState, size = 5) {
  const wrong = (state.attempts ?? []).filter((a) => !a.correct).slice(-30).reverse();
  const unique: string[] = [];
  wrong.forEach((a) => {
    if (!unique.includes(a.questionId) && unique.length < size) unique.push(a.questionId);
  });
  return unique.map((id) => QUESTIONS_BY_ID[id]).filter(Boolean) as Question[];
}

export const CATEGORY_OF_TOPIC: Record<Topic, Category> = {
  Aptitude: "aptitude",
  Logic: "aptitude",
  Verbal: "verbal",
  HR: "hr",
  "Business News": "business",
  SQL: "technical",
  DBMS: "technical",
  "Operating Systems": "technical",
  "Computer Networks": "technical",
  OOP: "technical",
};
