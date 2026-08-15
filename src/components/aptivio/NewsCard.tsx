import { motion } from "motion/react";
import { Sparkles, MessageSquareQuote } from "lucide-react";
import type { NewsCard as NewsCardType } from "@/lib/aptivio/types";

export function NewsCard({ item }: { item: NewsCardType }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="surface-card p-5"
    >
      <p className="text-xs uppercase tracking-widest text-primary">{item.date}</p>
      <h3 className="mt-2 font-display text-lg font-semibold leading-snug">
        {item.headline}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>

      <div className="mt-4 rounded-xl border border-primary/25 bg-primary/5 p-4">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
          <Sparkles className="size-3.5" /> Why it matters
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{item.whyItMatters}</p>
      </div>

      <div className="mt-3 rounded-xl bg-muted p-4">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <MessageSquareQuote className="size-3.5" /> Likely interview question
        </p>
        <p className="mt-2 text-sm">{item.interviewQuestion}</p>
      </div>
    </motion.article>
  );
}
