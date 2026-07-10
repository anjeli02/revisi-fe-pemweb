import type { Criteria, Product } from "../types/skincare";

export const CRITERIA: Criteria[] = [
  { code: "C1", key: "harga", name: "Harga Produk", type: "cost", defaultWeight: 20, desc: "Skor 1-5, semakin tinggi skor (semakin murah) semakin baik, tapi dihitung sebagai kriteria cost" },
  { code: "C2", key: "jenisKulit", name: "Kesesuaian Jenis Kulit", type: "benefit", defaultWeight: 25, desc: "Seberapa cocok produk dengan jenis kulit, skala 1-5" },
  { code: "C3", key: "masalahKulit", name: "Kesesuaian Masalah Kulit", type: "benefit", defaultWeight: 25, desc: "Seberapa cocok produk mengatasi masalah kulit, skala 1-5" },
  { code: "C4", key: "kandunganAktif", name: "Kandungan Aktif", type: "benefit", defaultWeight: 20, desc: "Kelengkapan kandungan aktif sesuai kebutuhan, skala 1-5" },
  { code: "C5", key: "bpom", name: "Status BPOM", type: "benefit", defaultWeight: 10, desc: "Status pendaftaran BPOM, skala 1-5" },
];

function inferCategory(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("cleanser") || n.includes("facial wash") || n.includes("foam")) return "Pembersih";
  if (n.includes("toner")) return "Toner";
  if (n.includes("sunscreen")) return "Sunscreen";
  if (n.includes("serum")) return "Serum";
  if (n.includes("mask")) return "Masker";
  if (n.includes("moistur") || n.includes("gel") || n.includes("cream") || n.includes("lotion")) return "Pelembap";
  return "Skincare";
}

const RAW: [string, number, number, number, number, number][] = [
  ["Somethinc Acne Treatment Gel", 4, 5, 5, 5, 5],
  ["Somethinc Low pH Cleanser", 3, 5, 4, 4, 5],
  ["Somethinc Ceramic Skin Saviour", 4, 4, 3, 5, 5],
  ["Somethinc Niacinamide Serum", 4, 4, 5, 5, 5],
  ["Somethinc Bakuchiol Serum", 4, 3, 4, 4, 5],
  ["Skintific Ceramide Moisture Gel", 3, 5, 4, 5, 5],
  ["Skintific Acne Serum", 3, 5, 5, 5, 5],
  ["Skintific Niacinamide Serum", 3, 4, 5, 5, 5],
  ["Skintific Sunscreen SPF50", 3, 4, 3, 4, 5],
  ["Skintific Mugwort Clay Mask", 3, 5, 4, 4, 5],
  ["Azarine Acne Spot Serum", 4, 5, 5, 4, 5],
  ["Azarine Hydrasoothe Sunscreen", 4, 4, 3, 4, 5],
  ["Azarine Ceraspray Serum", 4, 3, 4, 5, 5],
  ["Azarine Brightening Serum", 4, 4, 5, 4, 5],
  ["Azarine Low pH Cleanser", 5, 5, 4, 3, 5],
  ["Wardah Acnederm Serum", 5, 5, 5, 4, 5],
  ["Wardah Acnederm Cleanser", 5, 5, 4, 3, 5],
  ["Wardah Crystal Secret Serum", 4, 4, 5, 5, 5],
  ["Wardah Lightening Toner", 5, 4, 4, 3, 5],
  ["Wardah UV Shield Sunscreen", 5, 4, 3, 4, 5],
  ["Glad2Glow Centella Serum", 5, 4, 4, 4, 5],
  ["Glad2Glow Mugwort Toner", 5, 4, 4, 4, 5],
  ["Glad2Glow Ceramide Moisturizer", 4, 3, 4, 5, 5],
  ["Glad2Glow Brightening Serum", 5, 4, 5, 4, 5],
  ["Glad2Glow Acne Gel", 5, 5, 5, 4, 5],
  ["The Originote Niacinamide Serum", 5, 4, 5, 4, 5],
  ["The Originote Hyalucera Moisturizer", 5, 3, 3, 5, 5],
  ["The Originote Brightening Serum", 5, 4, 5, 4, 5],
  ["The Originote Acne Serum", 5, 5, 5, 4, 5],
  ["Avoskin Miraculous Refining Serum", 2, 4, 4, 5, 5],
  ["Avoskin Niacinamide Serum", 2, 4, 5, 5, 5],
  ["Avoskin Retinol Serum", 2, 3, 4, 5, 5],
  ["Avoskin Essence Toner", 2, 3, 3, 5, 5],
  ["Whitelab Acne Serum", 4, 5, 5, 4, 5],
  ["Whitelab Brightening Serum", 4, 4, 5, 4, 5],
  ["Whitelab Ceramide Moisturizer", 4, 3, 4, 5, 5],
  ["Emina Acne Facial Wash", 5, 5, 5, 3, 5],
  ["Emina Bright Stuff Serum", 5, 4, 5, 4, 5],
  ["Emina Moisturizer", 5, 3, 3, 3, 5],
  ["Hanasui Brightening Serum", 5, 4, 5, 4, 5],
  ["Hanasui Sunscreen Serum", 5, 4, 3, 4, 5],
  ["Erha Acne Cleanser", 3, 5, 5, 4, 5],
  ["Erha Brightening Serum", 3, 4, 5, 5, 5],
  ["N'Pure Centella Toner", 3, 4, 4, 5, 5],
  ["N'Pure Centella Serum", 3, 4, 4, 5, 5],
  ["COSRX Snail Essence", 2, 4, 5, 5, 5],
  ["COSRX Low pH Cleanser", 2, 5, 4, 4, 5],
  ["Some By Mi AHA BHA Serum", 2, 5, 5, 5, 5],
  ["Cetaphil Gentle Cleanser", 3, 4, 3, 4, 5],
  ["Cetaphil Moisturizing Lotion", 3, 3, 3, 5, 5],
  ["Hanasui Acne Series Facial Wash", 5, 5, 5, 3, 5],
  ["Hanasui Power Bright Serum", 5, 4, 5, 4, 5],
  ["Hanasui Acne Gel Moisturizer", 5, 5, 5, 4, 5],
  ["Implora Tea Tree Acne Serum", 5, 5, 5, 4, 5],
  ["Implora Luminous Brightening Serum", 5, 4, 5, 4, 5],
  ["Viva Acne Care Facial Wash", 5, 5, 4, 3, 5],
  ["Viva Bright Beauty Serum", 5, 4, 5, 3, 5],
  ["Viva Aloe Vera Moisturizing Gel", 5, 3, 3, 4, 5],
  ["La Tulipe Acne Care Serum", 5, 5, 5, 4, 5],
  ["La Tulipe Lightening Serum", 5, 4, 5, 4, 5],
  ["Pond's Acne Solution Facial Foam", 5, 5, 5, 3, 5],
  ["Pond's Bright Beauty Serum", 5, 4, 5, 4, 5],
  ["Pond's Hydrating Gel Moisturizer", 5, 3, 3, 4, 5],
  ["Acnes Acne Solution Serum", 5, 5, 5, 4, 5],
  ["Acnes Oil Control Cleanser", 5, 5, 4, 3, 5],
  ["Nivea Brightening Serum", 5, 4, 5, 4, 5],
  ["Nivea Extra Bright Moisturizer", 5, 3, 4, 4, 5],
  ["Nature Republic Aloe Vera Gel", 3, 3, 3, 5, 5],
  ["Emina Bright Stuff Moisturizer", 5, 3, 3, 4, 5],
  ["Safi Acne Solution Cleanser", 5, 5, 5, 3, 5],
];

export const INITIAL_PRODUCTS: Product[] = RAW.map((row, i) => {
  const [name, harga, jenisKulit, masalahKulit, kandunganAktif, bpom] = row;
  return {
    id: "p-" + (i + 1),
    code: "A" + (i + 1),
    name,
    category: inferCategory(name),
    harga,
    jenisKulit,
    masalahKulit,
    kandunganAktif,
    bpom,
  };
});
