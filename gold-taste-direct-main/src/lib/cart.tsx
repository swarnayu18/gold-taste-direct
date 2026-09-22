import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CartLine } from "./types";

const STORAGE_KEY = "goldtaste.cart.v1";

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  addLine: (line: CartLine) => void;
  setQuantity: (slug: string, weightLabel: string, quantity: number) => void;
  removeLine: (slug: string, weightLabel: string) => void;
  clear: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore corrupt cart */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable */
    }
  }, [lines, hydrated]);

  const addLine = useCallback((line: CartLine) => {
    setLines((current) => {
      const index = current.findIndex(
        (l) => l.slug === line.slug && l.weightLabel === line.weightLabel,
      );
      if (index === -1) return [...current, line];
      const next = [...current];
      next[index] = { ...next[index], quantity: next[index].quantity + line.quantity };
      return next;
    });
  }, []);

  const setQuantity = useCallback((slug: string, weightLabel: string, quantity: number) => {
    setLines((current) =>
      current
        .map((l) =>
          l.slug === slug && l.weightLabel === weightLabel
            ? { ...l, quantity: Math.max(0, quantity) }
            : l,
        )
        .filter((l) => l.quantity > 0),
    );
  }, []);

  const removeLine = useCallback((slug: string, weightLabel: string) => {
    setLines((current) => current.filter((l) => !(l.slug === slug && l.weightLabel === weightLabel)));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, l) => sum + l.quantity, 0);
    const subtotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
    return {
      lines,
      count,
      subtotal,
      addLine,
      setQuantity,
      removeLine,
      clear,
      drawerOpen,
      setDrawerOpen,
    };
  }, [lines, addLine, setQuantity, removeLine, clear, drawerOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
