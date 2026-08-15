import type { NewsCard } from "./types";

export const NEWS_CARDS: NewsCard[] = [
  {
    id: "news-001",
    date: "Today",
    headline: "Indian IT majors pivot hiring towards AI-fluent freshers",
    summary:
      "Large service firms are reshaping campus intake around AI literacy rather than raw headcount. Offers increasingly bundle a probation-period certification in prompt engineering, data handling and applied automation. Overall fresher numbers stay flat, but the mix shifts toward candidates who can show project evidence of building with AI tools rather than only classroom coursework.",
    whyItMatters:
      "For a 2026 or 2027 graduate, a single deployed AI-assisted project now carries more interview weight than an extra certificate. It changes what belongs at the top of your resume.",
    interviewQuestion:
      "Tell me about a project where you used an AI tool. What did you automate, and what did you still do yourself?",
    mcq: {
      question: "What is the main shift described in the story?",
      options: [
        "Firms are hiring far more freshers overall",
        "Hiring criteria are shifting toward demonstrated AI skills",
        "Campus hiring has been paused",
        "Only postgraduates are being hired",
      ],
      correctAnswer: 1,
      explanation:
        "Volumes stay broadly flat; the criteria for selection move toward applied AI capability.",
    },
  },
  {
    id: "news-002",
    date: "Today",
    headline: "India's quick-commerce sector faces its first margin reckoning",
    summary:
      "After two years of aggressive expansion, quick-commerce platforms are trimming dark-store footprints in low-density areas and raising small-basket fees. Investors have shifted their questions from order growth to contribution margin per order. The category is not shrinking, but capital is now priced on unit economics rather than gross merchandise value.",
    whyItMatters:
      "This is the cleanest live example of unit economics beating growth metrics — a case interviewers love because it separates candidates who quote numbers from those who reason about them.",
    interviewQuestion:
      "A quick-commerce app has growing orders but falling profit. Walk me through how you would diagnose it.",
    mcq: {
      question: "Which metric are investors prioritising in this shift?",
      options: [
        "Gross merchandise value",
        "App downloads",
        "Contribution margin per order",
        "Social media followers",
      ],
      correctAnswer: 2,
      explanation:
        "Contribution margin per order shows whether each additional delivery actually adds profit.",
    },
  },
];
