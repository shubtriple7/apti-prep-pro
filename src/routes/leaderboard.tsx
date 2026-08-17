import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/aptivio/AppShell";
import { LeaderboardTable } from "@/components/aptivio/LeaderboardTable";
import { Input } from "@/components/ui/input";
import { LEADERBOARDS, type LeaderboardTab } from "@/lib/aptivio/community";
import { accuracyOf, useAptivio } from "@/lib/aptivio/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — Aptivio" },
      {
        name: "description",
        content:
          "See how your XP and accuracy compare with students across colleges, daily, weekly, monthly and all-time.",
      },
      { property: "og:title", content: "Leaderboard — Aptivio" },
      {
        property: "og:description",
        content: "Rank against students from campuses across India.",
      },
    ],
  }),
  component: LeaderboardPage,
});

const TABS: Array<{ key: LeaderboardTab; label: string }> = [
  { key: "daily", label: "Today" },
  { key: "weekly", label: "Week" },
  { key: "monthly", label: "Month" },
  { key: "all", label: "All time" },
];

function LeaderboardPage() {
  const [tab, setTab] = useState<LeaderboardTab>("weekly");
  const [query, setQuery] = useState("");
  const { state } = useAptivio();
  const accuracy = accuracyOf(state);

  const rows = useMemo(() => {
    const mine = {
      id: "me",
      name: state.profile?.fullName || "You",
      college: state.profile?.college || "Your college",
      xp: state.xp,
      accuracy: accuracy.pct,
    };
    const all = [...LEADERBOARDS[tab], mine].sort((a, b) => b.xp - a.xp);
    const q = query.trim().toLowerCase();
    return q
      ? all.filter(
          (r) =>
            r.name.toLowerCase().includes(q) || r.college.toLowerCase().includes(q),
        )
      : all;
  }, [tab, query, state.profile, state.xp, accuracy.pct]);

  return (
    <AppShell title="Leaderboard" subtitle="XP earned across sessions">
      <div className="flex gap-2">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={cn(
              "flex-1 rounded-xl border px-3 py-2 text-xs font-medium transition-colors",
              tab === key
                ? "border-primary bg-primary/15 text-primary"
                : "border-border text-muted-foreground hover:border-primary/40",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search student or college"
        className="mt-3"
      />

      <div className="mt-4">
        <LeaderboardTable rows={rows} highlightId="me" />
      </div>
    </AppShell>
  );
}
