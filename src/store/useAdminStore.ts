import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Criteria, HistoryEntry, Product } from "../types/skincare";
import { CRITERIA, INITIAL_PRODUCTS } from "../data/skincareData";

interface AdminDB {
  products: Product[];
  criteria: Criteria[];
  history: HistoryEntry[];
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  updateCriteriaWeight: (key: Criteria["key"], weight: number) => void;
  addHistory: (h: HistoryEntry) => void;
}

export const useAdminStore = create<AdminDB>()(
  persist(
    (set, get) => ({
      products: INITIAL_PRODUCTS,
      criteria: CRITERIA,
      history: [],
      addProduct: (p) => set({ products: [...get().products, p] }),
      updateProduct: (p) => set({ products: get().products.map((x) => (x.id === p.id ? p : x)) }),
      deleteProduct: (id) => set({ products: get().products.filter((x) => x.id !== id) }),
      updateCriteriaWeight: (key, weight) =>
        set({ criteria: get().criteria.map((c) => (c.key === key ? { ...c, defaultWeight: weight } : c)) }),
      addHistory: (h) => set({ history: [h, ...get().history] }),
    }),
    { name: "glowmatch-admin-db" }
  )
);
