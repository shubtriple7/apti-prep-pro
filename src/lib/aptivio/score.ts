import type { Category, ProgressState } from "./types";

export interface PlacementScore {
  total: number;
  accuracy: number;
  consistency: number;
  volume: number;
  difficulty: number;
  company: number;
  band: string;
}

const BANDS: Array<[number, string]> = [
  [0, "Explorer"],
  [150, "Learner"],
  [350, "Performer"],
  [560, "Achiever"],
  [760, "Elite"],
  [920, "Legend"],
];

export function bandFor(total: number) {
  let band = BANDS[0]![1];
  BANDS.forEach(([min, name]) => {
    if (total >= min) band = name;
  });
  return band;
}

/** Placement Readiness Score out of 1000. */
export function placementScore(state: ProgressState): PlacementScore {
  const totals = Object.values(state.categoryStats).reduce(
    (acc, s) => ({ correct: acc.correct + s.correct, total: acc.total + s.total }),
    { correct: 0, total: 0 },
  );

  const accuracyPct = totals.total ? totals.correct / totals.total : 0;
  const accuracy = Math.round(accuracyPct * 350);
  const consistency = Math.round(Math.min(1, state.streak / 30) * 250);
  const volume = Math.round(Math.min(1, totals.total / 300) * 200);
  const difficulty = Math.round(Math.min(1, state.xp / 1200) * 120);

  const covered = Object.values(state.categoryStats).filter((s) => s.total > 0).length;
  const company = Math.round((covered / 5) * 80);

  const total = Math.min(
    1000,
    accuracy + consistency + volume + difficulty + company,
  );

  return {
    total,
    accuracy,
    consistency,
    volume,
    difficulty,
    company,
    band: bandFor(total),
  };
}

export interface RadarPoint {
  category: string;
  score: number;
}

export function radarData(state: ProgressState): RadarPoint[] {
  const labels: Record<Category, string> = {
    aptitude: "Aptitude",
    verbal: "Verbal",
    hr: "HR",
    technical: "Technical",
    business: "Business",
  };
  return (Object.keys(labels) as Category[]).map((key) => {
    const stat = state.categoryStats[key];
    return {
      category: labels[key],
      score: stat.total ? Math.round((stat.correct / stat.total) * 100) : 0,
    };
  });
}

export function weakestCategory(state: ProgressState) {
  const entries = (Object.entries(state.categoryStats) as Array<
    [Category, { correct: number; total: number }]
  >).filter(([, s]) => s.total > 0);
  if (!entries.length) return null;
  return entries.reduce((worst, current) =>
    current[1].correct / current[1].total < worst[1].correct / worst[1].total
      ? current
      : worst,
  )[0];
}

export function strongestCategory(state: ProgressState) {
  const entries = (Object.entries(state.categoryStats) as Array<
    [Category, { correct: number; total: number }]
  >).filter(([, s]) => s.total > 0);
  if (!entries.length) return null;
  return entries.reduce((best, current) =>
    current[1].correct / current[1].total > best[1].correct / best[1].total
      ? current
      : best,
  )[0];
}

export interface HeatCell {
  date: string;
  sessions: number;
}

/** Last 12 weeks of activity, oldest first. */
export function heatmapCells(state: ProgressState, days = 84): HeatCell[] {
  const counts = new Map<string, number>();
  state.history.forEach((h) => {
    const key = h.completedAt.slice(0, 10);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });

  const cells: HeatCell[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    cells.push({ date: key, sessions: counts.get(key) ?? 0 });
  }
  return cells;
}
