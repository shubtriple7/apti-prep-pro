import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Flame, Moon, Sun, Target, Zap } from "lucide-react";
import { AppShell } from "@/components/aptivio/AppShell";
import { LevelBadge, StatCard, StreakRing, XPProgress } from "@/components/aptivio/primitives";
import { Button } from "@/components/ui/button";
import { accuracyOf, slotDone, useAptivio } from "@/lib/aptivio/store";
import { NEWS_CARDS } from "@/lib/aptivio/news";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Today's sessions — Aptivio" },
      {
        name: "description",
        content:
          "Your Aptivio dashboard: today's morning and evening sets, streak, XP level and accuracy across all five question categories.",
      },
      { property: "og:title", content: "Today's sessions — Aptivio" },
      {
        property: "og:description",
        content: "Track your streak, XP and daily 10-minute placement sessions.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { state, hydrated } = useAptivio();
  const accuracy = accuracyOf(state);
  const morningDone = slotDone(state, state.day, "morning");
  const eveningDone = slotDone(state, state.day, "evening");
  const firstName = state.profile?.fullName.split(" ")[0] ?? "there";
  const news = NEWS_CARDS[0];

  const slots = [
    {
      slot: "morning" as const,
      icon: Sun,
      title: "Morning set",
      copy: "Business awareness first, then aptitude, verbal, HR and technical.",
      done: morningDone,
    },
    {
      slot: "evening" as const,
      icon: Moon,
      title: "Evening set",
      copy: "Technical-heavy reinforcement of everything you saw this morning.",
      done: eveningDone,
    },
  ];

  return (
    <AppShell
      title={hydrated ? `Hi, ${firstName}` : "Hi there"}
      subtitle={`Day ${state.day} · 10 minutes, twice a day`}
      right={<LevelBadge xp={state.xp} />}
    >
      <div className="surface-card flex items-center gap-6 p-6">
        <StreakRing
          streak={state.streak}
          progress={Math.min(1, (state.streak % 30) / 30)}
          shields={state.shields}
        />
        <div className="min-w-0">
          <p className="font-display text-lg font-semibold">
            {state.streak === 0
              ? "Start your streak today"
              : `${state.streak} days in a row`}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Finish both sessions to keep the ring closing. Every 15 days earns a shield
            that covers one missed day.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        {slots.map(({ slot, icon: Icon, title, copy, done }) => (
          <div
            key={slot}
            className={cn("surface-card p-5", done && "border-success/40")}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold">{title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{copy}</p>
                </div>
              </div>
              {done ? (
                <span className="flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-xs font-medium text-success">
                  <Check className="size-3.5" /> Done
                </span>
              ) : null}
            </div>
            <Button
              asChild
              variant={done ? "outline" : "gold"}
              size="lg"
              className="mt-4 w-full"
            >
              <Link to="/session/$slot" params={{ slot }}>
                {done ? "Review session" : "Start 10 questions"}
              </Link>
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <StatCard icon={Zap} label="XP" value={state.xp} hint="Earned across all sessions" />
        <StatCard
          icon={Target}
          label="Accuracy"
          value={`${accuracy.pct}%`}
          hint={`${accuracy.correct}/${accuracy.total} correct`}
        />
      </div>

      <div className="mt-4">
        <XPProgress xp={state.xp} />
      </div>

      {news ? (
        <Link
          to="/news"
          className="surface-card mt-4 block p-5 transition-colors hover:border-primary/40"
        >
          <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
            <Flame className="size-3.5" /> Today's brief
          </p>
          <p className="mt-2 font-display font-semibold leading-snug">{news.headline}</p>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{news.summary}</p>
        </Link>
      ) : null}
    </AppShell>
  );
}
