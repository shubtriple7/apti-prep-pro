import type { NewsCard } from "./types";

export const NEWS_CARDS: NewsCard[] = [
  {
    id: "news-001",
    date: "Today",
    headline: "Indian IT majors pivot hiring towards AI-fluent freshers",
    company: "TCS",
    category: "Technology & Hiring",
    difficulty: "easy",
    summary:
      "Large service firms are reshaping campus intake around AI literacy rather than raw headcount. Offers increasingly bundle a probation-period certification in prompt engineering, data handling and applied automation. Overall fresher numbers stay flat, but the mix shifts toward candidates who can show project evidence of building with AI tools.",
    whyItMatters:
      "For a 2026 or 2027 graduate, a single deployed AI-assisted project now carries more interview weight than an extra certificate. It changes what belongs at the top of your resume.",
    interviewQuestion:
      "Tell me about a project where you used an AI tool. What did you automate, and what did you still do yourself?",
    interviewQuestions: [
      "Tell me about a project where you used an AI tool. What did you automate, and what did you still do yourself?",
      "How would you verify the output of an AI coding assistant before shipping it to production?",
      "Service firms are hiring fewer but better-skilled freshers. How does that change how you'd prepare?",
    ],
    reference: {
      label: "Sector hiring outlook — NASSCOM",
      url: "https://nasscom.in/",
    },
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
    company: "Amazon",
    category: "Business & Strategy",
    difficulty: "medium",
    summary:
      "After two years of aggressive expansion, quick-commerce platforms are trimming dark-store footprints in low-density areas and raising small-basket fees. Investors have shifted their questions from order growth to contribution margin per order. The category is not shrinking, but capital is now priced on unit economics rather than gross merchandise value.",
    whyItMatters:
      "This is the cleanest live example of unit economics beating growth metrics — a case interviewers love because it separates candidates who quote numbers from those who reason about them.",
    interviewQuestion:
      "A quick-commerce app has growing orders but falling profit. Walk me through how you would diagnose it.",
    interviewQuestions: [
      "A quick-commerce app has growing orders but falling profit. Walk me through how you would diagnose it.",
      "Which three metrics would you put on a dark-store manager's daily dashboard, and why?",
      "How would you decide whether to shut down an underperforming dark store?",
    ],
    reference: {
      label: "Quick-commerce unit economics primer",
      url: "https://www.rbi.org.in/",
    },
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
  {
    id: "news-003",
    date: "Today",
    headline: "UPI transaction growth pushes banks to rethink core infrastructure",
    company: "Infosys",
    category: "Fintech & Systems",
    difficulty: "hard",
    summary:
      "Record UPI volumes are stressing bank core systems built for batch-era loads. Banks are moving settlement workloads onto horizontally scalable stores, adding idempotency keys to payment APIs and investing in observability. Regulators have begun tracking technical decline rates as a supervisory metric alongside financial ratios.",
    whyItMatters:
      "It is a rare story where a business headline maps directly to system-design vocabulary — idempotency, sharding, eventual consistency — which is exactly what technical interviewers probe.",
    interviewQuestion:
      "Why does a payment API need idempotency, and how would you implement it?",
    interviewQuestions: [
      "Why does a payment API need idempotency, and how would you implement it?",
      "How would you shard a transaction ledger that receives 50,000 writes per second?",
      "What would you monitor to detect a rising technical decline rate early?",
    ],
    reference: {
      label: "NPCI UPI statistics",
      url: "https://www.npci.org.in/what-we-do/upi/product-statistics",
    },
    mcq: {
      question: "Why do payment APIs use idempotency keys?",
      options: [
        "To encrypt the payload",
        "To ensure a retried request does not create a duplicate transaction",
        "To compress network traffic",
        "To authenticate the user",
      ],
      correctAnswer: 1,
      explanation:
        "An idempotency key lets the server recognise a retry and return the original result instead of charging twice.",
    },
  },
];

export const NEWS_BY_ID = Object.fromEntries(
  NEWS_CARDS.map((item) => [item.id, item]),
) as Record<string, NewsCard>;
