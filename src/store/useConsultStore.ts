import { create } from "zustand";
import type { CriteriaKey, SawResult, WeightMap } from "../types/skincare";

const EXTRA_KEYS: CriteriaKey[] = ["harga", "kandunganAktif", "bpom"];

// jenisKulit & masalahKulit selalu dapat porsi besar karena user sudah repot
// jawab pertanyaan spesifik soal itu (step 1 & 2). Sisa 40% dibagi ke 3 kriteria
// lain (step 3) — merata kalau gak ada yang dipilih, lebih besar ke yang dipilih.
export function computeWeights(extras: CriteriaKey[]): WeightMap {
  const base = 5;
  const bonusPool = 25;
  const bonusEach = extras.length > 0 ? bonusPool / extras.length : bonusPool / EXTRA_KEYS.length;

  const weights = { harga: base, kandunganAktif: base, bpom: base } as WeightMap;
  EXTRA_KEYS.forEach((key) => {
    const applies = extras.length > 0 ? extras.includes(key) : true;
    weights[key] = base + (applies ? bonusEach : 0);
  });
  weights.jenisKulit = 30;
  weights.masalahKulit = 30;
  return weights;
}

interface ConsultState {
  skinType: string | null;
  concern: string | null;
  extras: CriteriaKey[];
  results: SawResult[] | null;
  setSkinType: (label: string) => void;
  setConcern: (label: string) => void;
  toggleExtra: (key: CriteriaKey) => void;
  setResults: (r: SawResult[]) => void;
  reset: () => void;
}

export const useConsultStore = create<ConsultState>((set, get) => ({
  skinType: null,
  concern: null,
  extras: [],
  results: null,
  setSkinType: (label) => set({ skinType: label }),
  setConcern: (label) => set({ concern: label }),
  toggleExtra: (key) =>
    set({
      extras: get().extras.includes(key) ? get().extras.filter((k) => k !== key) : [...get().extras, key],
    }),
  setResults: (r) => set({ results: r }),
  reset: () => set({ skinType: null, concern: null, extras: [], results: null }),
}));
