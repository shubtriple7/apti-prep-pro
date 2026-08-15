import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { LeaderRow } from "@/lib/aptivio/community";

export function LeaderboardTable({
  rows,
  highlightId,
}: {
  rows: LeaderRow[];
  highlightId?: string;
}) {
  return (
    <div className="surface-card divide-y divide-border overflow-hidden">
      <div className="grid grid-cols-[2.5rem_1fr_4.5rem_3.5rem] gap-2 px-4 py-3 text-[0.65rem] uppercase tracking-widest text-muted-foreground">
        <span>#</span>
        <span>Student</span>
        <span className="text-right">XP</span>
        <span className="text-right">Acc</span>
      </div>
      {rows.map((row, i) => (
        <motion.div
          key={row.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, delay: i * 0.02 }}
          className={cn(
            "grid grid-cols-[2.5rem_1fr_4.5rem_3.5rem] items-center gap-2 px-4 py-3 text-sm",
            highlightId === row.id && "bg-primary/10",
          )}
        >
          <span
            className={cn(
              "font-display font-semibold",
              i === 0 && "text-primary",
              i > 2 && "text-muted-foreground",
            )}
          >
            {i + 1}
          </span>
          <span className="min-w-0">
            <span className="block truncate font-medium">{row.name}</span>
            <span className="block truncate text-xs text-muted-foreground">{row.college}</span>
          </span>
          <span className="text-right font-medium text-primary">{row.xp}</span>
          <span className="text-right text-muted-foreground">{row.accuracy}%</span>
        </motion.div>
      ))}
      {rows.length === 0 ? (
        <p className="px-4 py-10 text-center text-sm text-muted-foreground">
          No students match that search.
        </p>
      ) : null}
    </div>
  );
}
