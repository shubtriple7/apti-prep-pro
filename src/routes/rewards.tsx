import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/aptivio/AppShell";
import { RewardCard } from "@/components/aptivio/RewardCard";
import { REWARDS } from "@/lib/aptivio/rewards";
import { useAptivio } from "@/lib/aptivio/store";

export const Route = createFileRoute("/rewards")({
  head: () => ({
    meta: [
      { title: "Streak rewards — Aptivio" },
      {
        name: "description",
        content:
          "Unlock a resume kit at day 10, a 300-question interview bank at day 20, and a placement readiness certificate at day 30.",
      },
      { property: "og:title", content: "Streak rewards — Aptivio" },
      {
        property: "og:description",
        content: "Career kits that unlock as your daily practice streak grows.",
      },
    ],
  }),
  component: RewardsPage,
});

function RewardsPage() {
  const { state } = useAptivio();

  return (
    <AppShell title="Rewards" subtitle={`${state.streak}-day streak`}>
      <p className="text-sm text-muted-foreground">
        Rewards unlock on streak days, not purchases. Keep both sessions going and the
        kits arrive on schedule.
      </p>
      <div className="mt-4 space-y-3">
        {REWARDS.map((reward) => (
          <RewardCard key={reward.id} reward={reward} streak={state.streak} />
        ))}
      </div>
    </AppShell>
  );
}
