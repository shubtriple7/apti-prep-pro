import { useState } from "react";
import { motion } from "motion/react";
import { Check, X, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS, DIFFICULTY_XP, type Question } from "@/lib/aptivio/types";

function sameSet(a: number[], b: number[]) {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

export function QuestionCard({
  question,
  index,
  total,
  onAnswered,
}: {
  question: Question;
  index: number;
  total: number;
  onAnswered: (correct: boolean, xp: number) => void;
}) {
  const [selection, setSelection] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const multi = question.type === "multi";
  const ordering = question.type === "order";
  const expected = Array.isArray(question.correctAnswer)
    ? question.correctAnswer
    : [question.correctAnswer];

  const isCorrect = ordering
    ? sameSet(selection, expected)
    : sameSet([...selection].sort(), [...expected].sort());

  function toggle(i: number) {
    if (submitted) return;
    if (ordering) {
      setSelection((prev) => (prev.includes(i) ? prev.filter((v) => v !== i) : [...prev, i]));
    } else if (multi) {
      setSelection((prev) => (prev.includes(i) ? prev.filter((v) => v !== i) : [...prev, i]));
    } else {
      setSelection([i]);
    }
  }

  function submit() {
    setSubmitted(true);
  }

  const xp = DIFFICULTY_XP[question.difficulty];

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="surface-card p-5"
    >
      <div className="flex items-center justify-between text-xs">
        <span className="rounded-full bg-muted px-2.5 py-1 font-medium text-muted-foreground">
          {CATEGORY_LABELS[question.category]}
        </span>
        <span className="text-muted-foreground">
          {index + 1} / {total} · {question.difficulty} · +{xp} XP
        </span>
      </div>

      <h2 className="mt-4 font-display text-lg font-semibold leading-snug">
        {question.question}
      </h2>

      {ordering ? (
        <p className="mt-2 text-xs text-muted-foreground">
          Tap the options in the correct order.
        </p>
      ) : multi ? (
        <p className="mt-2 text-xs text-muted-foreground">Select all that apply.</p>
      ) : null}

      <div className="mt-4 space-y-2">
        {question.options.map((option, i) => {
          const picked = selection.includes(i);
          const correctOption = expected.includes(i);
          const state = submitted
            ? correctOption
              ? "correct"
              : picked
                ? "wrong"
                : "idle"
            : picked
              ? "picked"
              : "idle";

          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(i)}
              disabled={submitted}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition-all",
                state === "idle" && "border-border bg-secondary/40 hover:border-primary/40",
                state === "picked" && "border-primary bg-primary/10",
                state === "correct" && "border-success bg-success/15",
                state === "wrong" && "border-destructive bg-destructive/15",
              )}
            >
              <span
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-lg border text-xs font-semibold",
                  state === "idle" ? "border-border text-muted-foreground" : "border-transparent",
                  state === "picked" && "bg-primary text-primary-foreground",
                  state === "correct" && "bg-success text-success-foreground",
                  state === "wrong" && "bg-destructive text-destructive-foreground",
                )}
              >
                {ordering && picked
                  ? selection.indexOf(i) + 1
                  : state === "correct"
                    ? <Check className="size-3.5" />
                    : state === "wrong"
                      ? <X className="size-3.5" />
                      : String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{option}</span>
            </button>
          );
        })}
      </div>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 overflow-hidden"
        >
          <div
            className={cn(
              "rounded-xl border p-4",
              isCorrect ? "border-success/40 bg-success/10" : "border-destructive/40 bg-destructive/10",
            )}
          >
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Lightbulb className="size-4 text-primary" />
              {isCorrect ? `Correct · +${xp} XP` : "Not quite"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{question.explanation}</p>
          </div>
        </motion.div>
      ) : null}

      <div className="mt-5">
        {submitted ? (
          <Button
            variant="gold"
            size="lg"
            className="w-full"
            onClick={() => onAnswered(isCorrect, isCorrect ? xp : 0)}
          >
            {index + 1 === total ? "Finish session" : "Next question"}
          </Button>
        ) : (
          <Button
            variant="gold"
            size="lg"
            className="w-full"
            disabled={selection.length === 0}
            onClick={submit}
          >
            Check answer
          </Button>
        )}
      </div>
    </motion.div>
  );
}
