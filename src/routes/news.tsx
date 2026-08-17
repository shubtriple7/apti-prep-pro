import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { AppShell } from "@/components/aptivio/AppShell";
import { NewsCard } from "@/components/aptivio/NewsCard";
import { NEWS_CARDS } from "@/lib/aptivio/news";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Business news for interviews — Aptivio" },
      {
        name: "description",
        content:
          "Daily Indian business and tech stories rewritten for placement interviews: why it matters, the likely question, and a comprehension check.",
      },
      { property: "og:title", content: "Business news for interviews — Aptivio" },
      {
        property: "og:description",
        content: "Two stories a day, decoded into interview-ready talking points.",
      },
    ],
  }),
  component: NewsPage,
});

function NewsQuiz({
  mcq,
}: {
  mcq: { question: string; options: string[]; correctAnswer: number; explanation: string };
}) {
  const [picked, setPicked] = useState<number | null>(null);

  return (
    <div className="surface-card mt-3 p-5">
      <p className="font-display font-semibold leading-snug">{mcq.question}</p>
      <div className="mt-3 space-y-2">
        {mcq.options.map((option, i) => {
          const isPicked = picked === i;
          const isAnswer = i === mcq.correctAnswer;
          return (
            <button
              key={option}
              type="button"
              disabled={picked !== null}
              onClick={() => setPicked(i)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border p-3 text-left text-sm transition-colors",
                picked === null && "border-border bg-secondary/40 hover:border-primary/40",
                picked !== null && isAnswer && "border-success bg-success/15",
                picked !== null && isPicked && !isAnswer && "border-destructive bg-destructive/15",
                picked !== null && !isAnswer && !isPicked && "border-border opacity-60",
              )}
            >
              <span className="grid size-6 shrink-0 place-items-center rounded-lg border border-border text-xs font-semibold">
                {picked !== null && isAnswer ? (
                  <Check className="size-3.5 text-success" />
                ) : picked !== null && isPicked ? (
                  <X className="size-3.5 text-destructive" />
                ) : (
                  String.fromCharCode(65 + i)
                )}
              </span>
              <span className="flex-1">{option}</span>
            </button>
          );
        })}
      </div>
      {picked !== null ? (
        <p className="mt-3 text-sm text-muted-foreground">{mcq.explanation}</p>
      ) : null}
    </div>
  );
}

function NewsPage() {
  return (
    <AppShell title="News brief" subtitle="Business awareness, interview-ready">
      <div className="space-y-6">
        {NEWS_CARDS.map((item) => (
          <div key={item.id}>
            <NewsCard item={item} />
            <NewsQuiz mcq={item.mcq} />
          </div>
        ))}
      </div>
    </AppShell>
  );
}
