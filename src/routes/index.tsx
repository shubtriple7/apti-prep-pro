import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Flame, Newspaper, Target, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAptivio } from "@/lib/aptivio/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aptivio — 10 minutes a day. Placement ready." },
      {
        name: "description",
        content:
          "Aptivio is a daily placement-prep habit: 10 curated aptitude, verbal, HR, technical and business questions every morning and evening.",
      },
      { property: "og:title", content: "Aptivio — 10 minutes a day. Placement ready." },
      {
        property: "og:description",
        content:
          "Aptivio is a daily placement-prep habit: 10 curated aptitude, verbal, HR, technical and business questions every morning and evening.",
      },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  {
    icon: Target,
    title: "Two focused sessions",
    body: "Morning and evening sets of 10 questions each — aptitude, verbal, HR, technical and business awareness, with an explanation on every answer.",
  },
  {
    icon: Newspaper,
    title: "News, decoded",
    body: "Daily business stories rewritten for interviews: why it matters, the likely question, and a quick comprehension check.",
  },
  {
    icon: Flame,
    title: "Streaks that hold",
    body: "Earn XP, climb six levels, and bank streak shields every 15 days so one busy evening doesn't undo a month.",
  },
  {
    icon: Trophy,
    title: "Ranks and rewards",
    body: "Compare accuracy across colleges and unlock a resume kit, question bank and readiness certificate as your streak grows.",
  },
];

function Landing() {
  const { state, hydrated } = useAptivio();
  const target = hydrated && state.onboarded ? "/dashboard" : "/onboarding";

  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-6">
        <span className="font-display text-lg font-semibold tracking-tight">
          APTIVIO
        </span>
        <Button asChild variant="ghost" size="sm">
          <Link to={target}>{hydrated && state.onboarded ? "Dashboard" : "Sign in"}</Link>
        </Button>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-24">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="py-14 sm:py-20"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Built for the 2026 &amp; 2027 campus season
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            10 minutes a day.
            <span className="block text-gold">Placement ready.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Aptivio turns placement preparation into a habit you can actually keep.
            Twenty questions a day, an explanation behind every one, and a streak
            that proves you showed up.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild variant="gold" size="lg">
              <Link to={target}>
                Start day 1 <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/news">See today's news brief</Link>
            </Button>
          </div>
        </motion.section>

        <section className="grid gap-4 sm:grid-cols-2">
          {FEATURES.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="surface-card p-6"
            >
              <div className="grid size-10 place-items-center rounded-xl bg-primary/10">
                <Icon className="size-5 text-primary" />
              </div>
              <h2 className="mt-4 font-display text-lg font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </motion.div>
          ))}
        </section>

        <section className="surface-card mt-6 grid gap-6 p-8 sm:grid-cols-3">
          {[
            ["500+", "authored questions with explanations"],
            ["20", "questions a day, split across two sessions"],
            ["30", "day streak to full placement readiness"],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="font-display text-3xl font-semibold text-gold">{value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
