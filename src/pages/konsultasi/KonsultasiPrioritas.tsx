import { useNavigate } from "react-router-dom";
import { Tag, TestTube, BadgeCheck } from "lucide-react";
import ChoiceCard from "../../component/ui/ChoiceCard";
import ConsultShell from "../../component/ConsultShell";
import Button from "../../component/ui/Button";
import { useConsultStore, computeWeights } from "../../store/useConsultStore";
import { postRecommendation } from "../../services/skincareApi";
import type { CriteriaKey } from "../../types/skincare";
import { useState } from "react";

const EXTRAS: { key: CriteriaKey; icon: typeof Tag; label: string; desc: string }[] = [
  { key: "harga", icon: Tag, label: "Harga terjangkau", desc: "Utamakan yang ramah di kantong" },
  { key: "kandunganAktif", icon: TestTube, label: "Kandungan aktif lengkap", desc: "Bahan aktifnya niat dan berkualitas" },
  { key: "bpom", icon: BadgeCheck, label: "Sudah Terdaftar BPOM", desc: "Aman dan legal dipakai" },
];

// Mapping pilihan user ke nilai 1-5 untuk backend
const SKIN_TYPE_MAP: Record<string, number> = {
  "Berminyak":   5,
  "Kering":      4,
  "Kombinasi":   3,
  "Sensitif":    4,
  "Normal":      5,
};

const CONCERN_MAP: Record<string, number> = {
  "Jerawat & Bruntusan":       5,
  "Kusam & Belang":            4,
  "Penuaan Dini":              3,
  "Pori Besar & Minyak Berlebih": 4,
  "Kering & Iritasi":          4,
};

export default function KonsultasiPrioritas() {
  const navigate = useNavigate();
  const { skinType, concern, extras, toggleExtra, setResults } = useConsultStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const weights = computeWeights(extras);

      // Konversi pilihan user ke nilai 1-5
      const inputJenisKulit   = SKIN_TYPE_MAP[skinType ?? "Normal"] ?? 3;
      const inputMasalahKulit = CONCERN_MAP[concern ?? "Jerawat & Bruntusan"] ?? 3;

      // harga: semakin diprioritaskan semakin tinggi nilainya
      const inputHarga = weights.harga >= 20 ? 5
        : weights.harga >= 15 ? 4
        : weights.harga >= 10 ? 3
        : 2;

      // kandungan: sama seperti harga
      const inputKandungan = weights.kandunganAktif >= 20 ? 5
        : weights.kandunganAktif >= 15 ? 4
        : weights.kandunganAktif >= 10 ? 3
        : 2;

      // bpom: kalau dipilih = 5, kalau tidak = 3
      const inputBpom = extras.includes("bpom") ? 5 : 3;

      const result = await postRecommendation({
        inputHarga,
        inputJenisKulit,
        inputMasalahKulit,
        inputKandungan,
        inputBpom,
      });

      // Konversi response backend ke format SawResult yang dipakai frontend
      const sawResults = result.topRekomendasi.map((item: any) => ({
        id:         String(item.id),
        code:       item.kode,
        name:       item.nama,
        category:   item.brand,
        finalScore: item.score,
        rank:       item.ranking,
        breakdown: [
          { key: "harga",         norm: item.detail.rHarga,        weight: weights.harga / 100,         contrib: item.detail.rHarga * (weights.harga / 100) },
          { key: "jenisKulit",    norm: item.detail.rJenisKulit,   weight: weights.jenisKulit / 100,    contrib: item.detail.rJenisKulit * (weights.jenisKulit / 100) },
          { key: "masalahKulit",  norm: item.detail.rMasalahKulit, weight: weights.masalahKulit / 100,  contrib: item.detail.rMasalahKulit * (weights.masalahKulit / 100) },
          { key: "kandunganAktif",norm: item.detail.rKandungan,    weight: weights.kandunganAktif / 100,contrib: item.detail.rKandungan * (weights.kandunganAktif / 100) },
          { key: "bpom",          norm: item.detail.rBpom,         weight: weights.bpom / 100,          contrib: item.detail.rBpom * (weights.bpom / 100) },
        ],
      }));

      setResults(sawResults);
      navigate("/konsultasi/hasil");
    } catch (err: any) {
      setError("Gagal menghitung rekomendasi. Coba lagi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConsultShell
      step={3}
      title="Apa Lagi yang Penting Buat Kamu?"
      subtitle={`Selain cocok buat kulit ${skinType?.toLowerCase()} dan bantu atasi ${concern?.toLowerCase()}, pilih yang juga kamu prioritaskan (boleh lebih dari satu, atau lewati aja).`}
    >
      <div className="space-y-3 mb-10">
        {EXTRAS.map((e) => (
          <ChoiceCard
            key={e.key}
            icon={e.icon}
            label={e.label}
            desc={e.desc}
            selected={extras.includes(e.key)}
            onClick={() => toggleExtra(e.key)}
          />
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => navigate("/konsultasi/masalah")}
          className="px-6 py-3 rounded-full text-stone-500 font-semibold hover:bg-stone-100"
        >
          Kembali
        </button>
        <Button
          tittle={loading ? "Menghitung..." : "Lihat Rekomendasi"}
          onClick={handleSubmit}
          className="inline-flex items-center gap-2"
        />
      </div>
    </ConsultShell>
  );
}