import type { OrderDraft, PlacedOrder } from "./types";

const DRAFT_KEY = "goldtaste.orderDraft.v1";
const PLACED_KEY = "goldtaste.placedOrder.v1";

function read<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export const loadDraft = () => read<OrderDraft>(DRAFT_KEY);
export const saveDraft = (draft: OrderDraft) => write(DRAFT_KEY, draft);
export const clearDraft = () => {
  if (typeof window !== "undefined") window.localStorage.removeItem(DRAFT_KEY);
};

export const loadPlacedOrder = () => read<PlacedOrder>(PLACED_KEY);
export const savePlacedOrder = (order: PlacedOrder) => write(PLACED_KEY, order);
