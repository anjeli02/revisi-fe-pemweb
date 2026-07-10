export type CriteriaType = "benefit" | "cost";

export type CriteriaKey = "harga" | "jenisKulit" | "masalahKulit" | "kandunganAktif" | "bpom";

export type Criteria = {
  code: string;
  key: CriteriaKey;
  name: string;
  type: CriteriaType;
  defaultWeight: number;
  desc: string;
};

export type Product = {
  id: string;
  code: string;
  name: string;
  category: string;
  harga: number;
  jenisKulit: number;
  masalahKulit: number;
  kandunganAktif: number;
  bpom: number;
};

export type WeightMap = Record<CriteriaKey, number>;

export type SawBreakdownItem = {
  key: CriteriaKey;
  norm: number;
  weight: number;
  contrib: number;
};

export type SawResult = Product & {
  finalScore: number;
  rank: number;
  breakdown: SawBreakdownItem[];
};

export type HistoryEntry = {
  id: string;
  date: string;
  weights: WeightMap;
  topResult: string;
  topScore: number;
};
