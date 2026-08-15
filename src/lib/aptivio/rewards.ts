export interface Reward {
  id: string;
  day: number;
  title: string;
  description: string;
  format: string;
}

export const REWARDS: Reward[] = [
  {
    id: "reward-resume",
    day: 10,
    title: "Resume Kit",
    description:
      "ATS-safe one-page template, 40 impact bullet patterns and a project write-up formula reviewed against campus recruiter screens.",
    format: "PDF + DOCX",
  },
  {
    id: "reward-questions",
    day: 20,
    title: "Interview Question Bank",
    description:
      "300 questions split by company archetype — service, product and consulting — each with a model answer skeleton.",
    format: "PDF",
  },
  {
    id: "reward-certificate",
    day: 30,
    title: "Placement Readiness Certificate",
    description:
      "A verifiable certificate with your accuracy, streak and category strengths, shareable on LinkedIn.",
    format: "PDF",
  },
];
