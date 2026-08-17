import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Flame, RotateCcw, Target, Zap } from "lucide-react";
import { AppShell } from "@/components/aptivio/AppShell";
import { LevelBadge, StatCard, XPProgress } from "@/components/aptivio/primitives";
import { Button } from "@/components/ui/button";
import { accuracyOf, useAptivio } from "@/lib/aptivio/store";
import { CATEGORY_LABELS, type Category } from "@/lib/aptivio/types";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your progress — Aptivio" },
      {
        name: "description",
        content:
          "Category-by-category accuracy, XP level, streak history and profile details for your Aptivio placement preparation.",
      },
      { property: "og:title", content: "Your progress — Aptivio" },
      {
        property: "og:description",
        content: "See which categories are carrying you and which need work.",
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { state, reset } = useAptivio();
  const navigate = useNavigate();
  const accuracy = accuracyOf(state);
  const categories = Object.entries(state.categoryStats) as Array<
    [Category, { correct: number; total: number }]
  >;

  return (
    <AppShell
      title={state.profile?.fullName || "Your profile"}
      subtitle={
        state.profile
          ? `${state.profile.branch} · ${state.profile.college} · ${state.profile.graduationYear}`
          : "Complete onboarding to personalise"
      }
      right={<LevelBadge xp={state.xp} />}
    >
      <div className="grid grid-cols-3 gap-3">
        <StatCard icon={Flame} label="Streak" value={state.streak} />
        <StatCard icon={Zap} label="XP" value={state.xp} />
        <StatCard icon={Target} label="Accuracy" value={`${accuracy.pct}%`} />
      </div>

      <div className="mt-4">
        <XPProgress xp={state.xp} />
      </div>

      <div className="surface-card mt-4 p-5">
        <h2 className="font-display text-lg font-semibold">Category strength</h2>
        <div className="mt-4 space-y-4">
          {categories.map(([category, stat]) => {
            const pct = stat.total ? Math.round((stat.correct / stat.total) * 100) : 0;
            return (
              <div key={category}>
                <div className="flex items-center justify-between text-sm">
                  <span>{CATEGORY_LABELS[category]}</span>
                  <span className="text-muted-foreground">
                    {stat.total ? `${pct}% · ${stat.correct}/${stat.total}` : "No data yet"}
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-[image:var(--gradient-gold)]"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {state.profile?.targetCompanies.length ? (
        <div className="surface-card mt-4 p-5">
          <h2 className="font-display text-lg font-semibold">Target companies</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {state.profile.targetCompanies.map((company) => (
              <span
                key={company}
                className="rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs text-primary"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div className="surface-card mt-4 p-5">
        <h2 className="font-display text-lg font-semibold">Session history</h2>
        {state.history.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">
            No sessions yet. Your first set takes about ten minutes.
          </p>
        ) : (
          <div className="mt-3 divide-y divide-border">
            {[...state.history].reverse().map((h) => (
              <div
                key={`${h.day}-${h.slot}`}
                className="flex items-center justify-between py-2.5 text-sm"
              >
                <span>
                  Day {h.day} · {h.slot}
                </span>
                <span className="text-muted-foreground">
                  {h.correct}/{h.total} · +{h.xp} XP
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        variant="outline"
        className="mt-4 w-full"
        onClick={() => {
          reset();
          navigate({ to: "/onboarding" });
        }}
      >
        <RotateCcw /> Reset progress
      </Button>
    </AppShell>
  );
}
