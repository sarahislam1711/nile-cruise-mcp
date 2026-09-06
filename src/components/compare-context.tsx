"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/* Comparison is held across the register, the vessel pages and the
   compare screen, so it lives above all of them. Frontend only: this
   is React state, not a session. Persisting it is a backend concern. */

const MAX_HELD = 4;

interface CompareState {
  held: string[];
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  isHeld: (slug: string) => boolean;
  full: boolean;
}

const Ctx = createContext<CompareState | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [held, setHeld] = useState<string[]>([]);

  const toggle = useCallback((slug: string) => {
    setHeld((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : prev.length >= MAX_HELD
          ? prev
          : [...prev, slug]
    );
  }, []);

  const remove = useCallback(
    (slug: string) => setHeld((prev) => prev.filter((s) => s !== slug)),
    []
  );

  const clear = useCallback(() => setHeld([]), []);

  const value = useMemo(
    () => ({
      held,
      toggle,
      remove,
      clear,
      isHeld: (slug: string) => held.includes(slug),
      full: held.length >= MAX_HELD,
    }),
    [held, toggle, remove, clear]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCompare() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCompare must be used inside CompareProvider");
  return ctx;
}

export { MAX_HELD };
