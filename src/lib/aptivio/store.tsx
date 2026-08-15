import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  Category,
  Profile,
  ProgressState,
  SessionResult,
  SessionSlot,
} from "./types";

const STORAGE_KEY = "aptivio.progress.v1";

const emptyStats = (): ProgressState["categoryStats"] => ({
  aptitude: { correct: 0, total: 0 },
  verbal: { correct: 0, total: 0 },
  hr: { correct: 0, total: 0 },
  technical: { correct: 0, total: 0 },
  business: { correct: 0, total: 0 },
});

export const INITIAL_STATE: ProgressState = {
  onboarded: false,
  profile: null,
  xp: 0,
  streak: 0,
  shields: 0,
  day: 1,
  answered: {},
  categoryStats: emptyStats(),
  history: [],
};

interface StoreValue {
  state: ProgressState;
  hydrated: boolean;
  completeOnboarding: (profile: Profile) => void;
  recordSession: (
    result: Omit<SessionResult, "completedAt">,
    perCategory: Array<{ category: Category; correct: boolean }>,
  ) => void;
  reset: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function AptivioProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(INITIAL_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...INITIAL_STATE, ...JSON.parse(raw) });
    } catch {
      /* ignore corrupted state */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const completeOnboarding = useCallback((profile: Profile) => {
    setState((prev) => ({ ...prev, profile, onboarded: true }));
  }, []);

  const recordSession = useCallback<StoreValue["recordSession"]>(
    (result, perCategory) => {
      setState((prev) => {
        const categoryStats = { ...prev.categoryStats };
        perCategory.forEach(({ category, correct }) => {
          const current = categoryStats[category];
          categoryStats[category] = {
            correct: current.correct + (correct ? 1 : 0),
            total: current.total + 1,
          };
        });

        const alreadyToday = prev.history.some(
          (h) => h.day === result.day && h.slot === result.slot,
        );
        const firstOfDay = !prev.history.some((h) => h.day === result.day);
        const streak = firstOfDay ? prev.streak + 1 : prev.streak;
        const shields = Math.floor(streak / 15);

        return {
          ...prev,
          xp: prev.xp + result.xp,
          streak,
          shields,
          day:
            prev.history.filter((h) => h.day === prev.day).length + 1 >= 2
              ? prev.day + 1
              : prev.day,
          categoryStats,
          history: alreadyToday
            ? prev.history
            : [...prev.history, { ...result, completedAt: new Date().toISOString() }],
        };
      });
    },
    [],
  );

  const reset = useCallback(() => setState(INITIAL_STATE), []);

  const value = useMemo(
    () => ({ state, hydrated, completeOnboarding, recordSession, reset }),
    [state, hydrated, completeOnboarding, recordSession, reset],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useAptivio() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useAptivio must be used inside AptivioProvider");
  return ctx;
}

export function slotDone(state: ProgressState, day: number, slot: SessionSlot) {
  return state.history.some((h) => h.day === day && h.slot === slot);
}

export function accuracyOf(state: ProgressState) {
  const totals = Object.values(state.categoryStats).reduce(
    (acc, s) => ({ correct: acc.correct + s.correct, total: acc.total + s.total }),
    { correct: 0, total: 0 },
  );
  return {
    ...totals,
    pct: totals.total ? Math.round((totals.correct / totals.total) * 100) : 0,
  };
}
