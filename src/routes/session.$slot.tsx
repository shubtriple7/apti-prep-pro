import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, Trophy } from "lucide-react";
import { AppShell } from "@/components/aptivio/AppShell";
import { QuestionCard } from "@/components/aptivio/QuestionCard";
import { Button } from "@/components/ui/button";
import { buildDailySet, QUESTIONS_BY_ID } from "@/lib/aptivio/questions";
import { useAptivio } from "@/lib/aptivio/store";
import type { Category, SessionSlot } from "@/lib/aptivio/types";

export const Route = createFileRoute("/session/$slot")({
  head: () => ({
    meta: [
      { title: "Daily session — Aptivio" },
      {
        name: "description",
        content:
          "Ten placement questions with an explanation on every answer, mixing aptitude, verbal, HR, technical and business awareness.",
      },
      { property: "og:title", content: "Daily session — Aptivio" },
      {
        property: "og:description",
        content: "A focused 10-question set with instant explanations and XP.",
      },
    ],
  }),
  component: Session,
});

function Session() {
  const { slot: rawSlot } = Route.useParams();
  const slot: SessionSlot = rawSlot === "evening" ? "evening" : "morning";
  const navigate = useNavigate();
  const { state, recordSession } = useAptivio();

  const questions = useMemo(() => {
    const set = buildDailySet(state.day);
    return set[slot].map((id) => QUESTIONS_BY_ID[id]).filter(Boolean);
  }, [state.day, slot]);

  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [xp, setXp] = useState(0);
  const [perCategory, setPerCategory] = useState<
    Array<{ category: Category; correct: boolean }>
  >([]);
  const [finished, setFinished] = useState(false);

  const current = questions[index];

  function handleAnswered(wasCorrect: boolean, gained: number) {
    const category = current!.category;
    const nextPerCategory = [...perCategory, { category, correct: wasCorrect }];
    const nextCorrect = correct + (wasCorrect ? 1 : 0);
    const nextXp = xp + gained;

    setPerCategory(nextPerCategory);
    setCorrect(nextCorrect);
    setXp(nextXp);

    if (index + 1 < questions.length) {
      setIndex(index + 1);
      return;
    }

    recordSession(
      { slot, day: state.day, correct: nextCorrect, total: questions.length, xp: nextXp },
      nextPerCategory,
    );
    setFinished(true);
  }

  if (finished) {
    const pct = Math.round((correct / questions.length) * 100);
    return (
      <AppShell title="Session complete" subtitle={`${slot} set · day ${state.day}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="surface-card p-8 text-center"
        >
          <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-[image:var(--gradient-gold)]">
            <Trophy className="size-6 text-primary-foreground" />
          </div>
          <p className="mt-5 font-display text-3xl font-semibold text-gold">+{xp} XP</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {correct} of {questions.length} correct · {pct}% accuracy
          </p>
          <div className="mt-7 flex flex-col gap-2">
            <Button asChild variant="gold" size="lg">
              <Link to="/dashboard">Back to dashboard</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/news">Read today's news brief</Link>
            </Button>
          </div>
        </motion.div>
      </AppShell>
    );
  }

  if (!current) {
    return (
      <AppShell title="Session" subtitle="No questions available">
        <Button variant="outline" onClick={() => navigate({ to: "/dashboard" })}>
          <ArrowLeft /> Back to dashboard
        </Button>
      </AppShell>
    );
  }

  return (
    <AppShell
      title={slot === "morning" ? "Morning set" : "Evening set"}
      subtitle={`Day ${state.day} · ${questions.length} questions`}
      right={
        <Link
          to="/dashboard"
          className="text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          Exit
        </Link>
      }
    >
      <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-[image:var(--gradient-gold)] transition-all"
          style={{ width: `${(index / questions.length) * 100}%` }}
        />
      </div>
      <QuestionCard
        key={current.id}
        question={current}
        index={index}
        total={questions.length}
        onAnswered={handleAnswered}
      />
    </AppShell>
  );
}
