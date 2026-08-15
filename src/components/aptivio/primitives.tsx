import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { levelFor } from "@/lib/aptivio/types";

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  className,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  hint?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("surface-card p-4", className)}
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4 text-primary" />
        <span className="text-xs font-medium uppercase tracking-widest">{label}</span>
      </div>
      <p className="mt-3 font-display text-2xl font-semibold">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </motion.div>
  );
}

export function LevelBadge({ xp, className }: { xp: number; className?: string }) {
  const level = levelFor(xp);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-primary" />
      {level.name}
    </span>
  );
}

export function XPProgress({ xp }: { xp: number }) {
  const level = levelFor(xp);
  return (
    <div className="surface-card p-5">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Level</p>
          <p className="font-display text-xl font-semibold">{level.name}</p>
        </div>
        <p className="font-display text-2xl font-semibold text-gold">{xp} XP</p>
      </div>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-[image:var(--gradient-gold)]"
          initial={{ width: 0 }}
          animate={{ width: `${level.progress * 100}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {level.next
          ? `${(level.nextAt ?? 0) - xp} XP to ${level.next}`
          : "Maximum level reached"}
      </p>
    </div>
  );
}

export function StreakRing({
  streak,
  progress,
  shields = 0,
}: {
  streak: number;
  progress: number;
  shields?: number;
}) {
  const size = 132;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative grid place-items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          className="fill-none stroke-muted"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeLinecap="round"
          className="fill-none stroke-primary"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - progress) }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="font-display text-3xl font-semibold">{streak}</p>
        <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">
          day streak
        </p>
        {shields > 0 ? (
          <p className="mt-1 text-[0.65rem] text-primary">{shields} shield{shields > 1 ? "s" : ""}</p>
        ) : null}
      </div>
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="surface-card grid place-items-center gap-3 px-6 py-12 text-center">
      <div className="grid size-12 place-items-center rounded-2xl bg-muted">
        <Icon className="size-5 text-primary" />
      </div>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("surface-card h-28 animate-pulse bg-muted/40", className)} />
  );
}
