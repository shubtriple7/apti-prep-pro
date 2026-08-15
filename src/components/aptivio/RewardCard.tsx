import { motion } from "motion/react";
import { Lock, Download, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Reward } from "@/lib/aptivio/rewards";

export function RewardCard({
  reward,
  streak,
}: {
  reward: Reward;
  streak: number;
}) {
  const unlocked = streak >= reward.day;
  const progress = Math.min(1, streak / reward.day);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("surface-card p-5", unlocked && "border-primary/45")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "grid size-11 place-items-center rounded-2xl",
              unlocked ? "bg-[image:var(--gradient-gold)]" : "bg-muted",
            )}
          >
            {unlocked ? (
              <Gift className="size-5 text-primary-foreground" />
            ) : (
              <Lock className="size-5 text-muted-foreground" />
            )}
          </div>
          <div>
            <p className="font-display font-semibold">{reward.title}</p>
            <p className="text-xs text-muted-foreground">
              Day {reward.day} · {reward.format}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">{reward.description}</p>

      {unlocked ? (
        <Button variant="gold" className="mt-4 w-full">
          <Download /> Download kit
        </Button>
      ) : (
        <div className="mt-4">
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-[image:var(--gradient-gold)]"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {reward.day - streak} more days to unlock
          </p>
        </div>
      )}
    </motion.div>
  );
}
