import type { Criteria, Product, SawResult } from "../types/skincare";

type CriteriaWithWeight = Pick<Criteria, "key" | "type"> & { weight: number };

/**
 * Metode SAW (Simple Additive Weighting):
 * 1. Normalisasi tiap kriteria:
 *    - benefit: nilai / nilai_terbesar
 *    - cost:    nilai_terkecil / nilai
 * 2. Kalikan hasil normalisasi dengan bobot (dinormalisasi ke 0..1)
 * 3. Jumlahkan semua kontribusi kriteria -> nilai akhir
 * 4. Urutkan dari nilai akhir tertinggi ke terendah
 */
export function calculateSAW(items: Product[], criteriaList: CriteriaWithWeight[]): SawResult[] {
  if (!items.length) return [];

  const totalWeight = criteriaList.reduce((sum, c) => sum + Number(c.weight), 0) || 1;

  const stats: Record<string, { max: number; min: number }> = {};
  criteriaList.forEach((c) => {
    const values = items.map((it) => Number(it[c.key as keyof Product] as number));
    stats[c.key] = { max: Math.max(...values), min: Math.min(...values) };
  });

  const results: SawResult[] = items.map((item) => {
    let finalScore = 0;
    const breakdown = criteriaList.map((c) => {
      const val = Number(item[c.key as keyof Product] as number);
      const { max, min } = stats[c.key];
      const norm = c.type === "benefit"
        ? (max === 0 ? 0 : val / max)
        : (val === 0 ? 0 : min / val);
      const weight = Number(c.weight) / totalWeight;
      const contrib = norm * weight;
      finalScore += contrib;
      return { key: c.key, norm, weight, contrib };
    });
    return { ...item, finalScore, breakdown, rank: 0 };
  });

  results.sort((a, b) => b.finalScore - a.finalScore);
  results.forEach((r, i) => (r.rank = i + 1));
  return results;
}
