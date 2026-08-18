import type { Category } from "./types";

export interface CompanyTrack {
  slug: string;
  name: string;
  archetype: "Service" | "Product" | "Consulting";
  focus: Category[];
  cutoff: string;
  rounds: string[];
  pastQuestions: string[];
  note: string;
}

export const COMPANY_TRACKS: CompanyTrack[] = [
  {
    slug: "tcs",
    name: "TCS",
    archetype: "Service",
    focus: ["aptitude", "verbal", "hr"],
    cutoff: "60% throughout, no active backlog",
    rounds: ["NQT aptitude", "Coding (1-2 problems)", "Technical interview", "HR"],
    pastQuestions: [
      "Explain the difference between an interface and an abstract class.",
      "A pipe fills a tank in 12 hours, another in 18. How long together?",
      "Why TCS and not a product company?",
      "Write a query to find the second highest salary.",
    ],
    note: "Speed on aptitude matters more than depth. The NQT rewards steady accuracy across sections rather than brilliance in one.",
  },
  {
    slug: "infosys",
    name: "Infosys",
    archetype: "Service",
    focus: ["aptitude", "verbal", "technical"],
    cutoff: "68% aggregate typical for SP roles",
    rounds: ["Online assessment", "Pseudo-code section", "Technical + HR combined"],
    pastQuestions: [
      "Predict the output of this pseudo-code loop.",
      "What is normalisation? Explain 3NF with an example.",
      "Describe a time you learned a technology quickly.",
    ],
    note: "The pseudo-code section decides the shortlist. Practise reading unfamiliar syntax and tracing values by hand.",
  },
  {
    slug: "accenture",
    name: "Accenture",
    archetype: "Consulting",
    focus: ["verbal", "business", "hr"],
    cutoff: "65% with communication assessment",
    rounds: ["Cognitive assessment", "Coding", "Communication test", "Interview"],
    pastQuestions: [
      "How would you explain cloud migration to a non-technical client?",
      "Which recent business story interested you and why?",
      "Reorder these steps of an incident response.",
    ],
    note: "Communication is scored separately here. Business awareness answers should be structured, not encyclopaedic.",
  },
  {
    slug: "capgemini",
    name: "Capgemini",
    archetype: "Service",
    focus: ["aptitude", "verbal"],
    cutoff: "60% throughout",
    rounds: ["Game-based aptitude", "Behavioural", "Technical interview"],
    pastQuestions: [
      "Find the missing number in the series: 3, 7, 16, 35, ?",
      "Explain ACID properties with a banking example.",
    ],
    note: "The game-based round tests working memory under time pressure. Daily short sets are the right preparation shape.",
  },
  {
    slug: "deloitte",
    name: "Deloitte",
    archetype: "Consulting",
    focus: ["business", "hr", "verbal"],
    cutoff: "Strong academics + case reasoning",
    rounds: ["Assessment", "Case discussion", "Behavioural interview", "Partner round"],
    pastQuestions: [
      "A retail client's margins fell 4% in a year. How would you diagnose it?",
      "Tell me about a conflict inside a team you were part of.",
      "What does GST input credit mean for a manufacturer?",
    ],
    note: "Structure beats content. Say your framework out loud before the numbers.",
  },
  {
    slug: "amazon",
    name: "Amazon",
    archetype: "Product",
    focus: ["technical", "hr"],
    cutoff: "Coding-first, no strict percentage",
    rounds: ["Online assessment (2 DSA)", "Workstyle survey", "Technical rounds", "Bar raiser"],
    pastQuestions: [
      "Given an array, find the length of the longest subarray with sum K.",
      "Tell me about a time you took ownership of something outside your role.",
      "Design a rate limiter for an internal API.",
    ],
    note: "Every behavioural answer is graded against leadership principles. Use STAR and quantify the result.",
  },
  {
    slug: "microsoft",
    name: "Microsoft",
    archetype: "Product",
    focus: ["technical", "aptitude"],
    cutoff: "Coding-first",
    rounds: ["Online assessment", "Two technical rounds", "AA round"],
    pastQuestions: [
      "Detect a cycle in a linked list and return the entry node.",
      "How does a hash map handle collisions?",
      "Design the data model for a course platform.",
    ],
    note: "Communicate your approach before writing code. Silent correct answers score lower than narrated ones.",
  },
  {
    slug: "cognizant",
    name: "Cognizant",
    archetype: "Service",
    focus: ["aptitude", "technical", "verbal"],
    cutoff: "60% throughout",
    rounds: ["GenC assessment", "Coding", "Technical + HR"],
    pastQuestions: [
      "What is the difference between DELETE, TRUNCATE and DROP?",
      "Explain OOP polymorphism with a real example.",
    ],
    note: "GenC Next requires stronger coding; GenC leans aptitude. Know which track your campus drive is running.",
  },
  {
    slug: "wipro",
    name: "Wipro",
    archetype: "Service",
    focus: ["aptitude", "verbal", "hr"],
    cutoff: "60% throughout, gap ≤ 3 years",
    rounds: ["Elite NLTH", "Written communication", "Technical", "HR"],
    pastQuestions: [
      "Write an essay on remote work in 200 words.",
      "What is an index in SQL and when does it hurt?",
    ],
    note: "The written English task is eliminative. Practise typing a clean 200-word argument in ten minutes.",
  },
];

export function companyBySlug(slug: string) {
  return COMPANY_TRACKS.find((c) => c.slug === slug) ?? null;
}

export const COMPANY_NAMES = COMPANY_TRACKS.map((c) => c.name);
