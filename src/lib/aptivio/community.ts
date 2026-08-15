export interface LeaderRow {
  id: string;
  name: string;
  college: string;
  xp: number;
  accuracy: number;
}

const NAMES: Array<[string, string]> = [
  ["Ananya Rao", "VIT Vellore"],
  ["Rahul Nair", "NIT Trichy"],
  ["Ishita Bansal", "IIIT Hyderabad"],
  ["Karthik Menon", "COEP Pune"],
  ["Sneha Patil", "MIT Manipal"],
  ["Aditya Ghosh", "Jadavpur University"],
  ["Fatima Sheikh", "Jamia Millia Islamia"],
  ["Rohan Deshmukh", "VJTI Mumbai"],
  ["Nikhil Verma", "DTU Delhi"],
  ["Priya Krishnan", "PSG Tech"],
  ["Manav Shah", "Nirma University"],
  ["Tanvi Joshi", "SPIT Mumbai"],
  ["Arjun Reddy", "BITS Pilani"],
  ["Meera Iyer", "SSN College"],
  ["Devansh Gupta", "IIIT Delhi"],
];

function build(multiplier: number): LeaderRow[] {
  return NAMES.map(([name, college], index) => ({
    id: `u-${index}`,
    name,
    college,
    xp: Math.round((1420 - index * 74 + (index % 3) * 31) * multiplier),
    accuracy: 92 - index * 1.6 + (index % 4),
  }))
    .map((row) => ({ ...row, accuracy: Math.round(row.accuracy) }))
    .sort((a, b) => b.xp - a.xp);
}

export const LEADERBOARDS = {
  daily: build(0.09),
  weekly: build(0.4),
  monthly: build(1),
  all: build(3.6),
};

export type LeaderboardTab = keyof typeof LEADERBOARDS;
