import { useNavigate } from "react-router-dom";
import { Tag, TestTube, BadgeCheck, XCircle } from "lucide-react";
import ConsultShell from "../../component/ConsultShell";
import Button from "../../component/ui/Button";
import { useConsultStore, computeWeights } from "../../store/useConsultStore";
import { postRecommendation } from "../../services/skincareApi";
import { useState } from "react";
import type { CriteriaKey } from "../../types/skincare";

// Pilihan Harga
const HARGA_OPTIONS = [
  { label: "< Rp50.000", nilai: 5 },
  { label: "Rp50.000 - Rp100.000", nilai: 4 },
  { label: "Rp100.000 - Rp150.000", nilai: 3 },
  { label: "Rp150.000 - Rp200.000", nilai: 2 },
  { label: "> Rp200.000", nilai: 1 },
];

// Pilihan Kandungan
const KANDUNGAN_OPTIONS = [
  { label: "Lengkap banget — semua kandungan yang aku butuhkan ada", nilai: 5 },
  { label: "Ada kandungan utamanya, sudah cukup buat kulitku", nilai: 4 },
  { label: "Ada beberapa kandungan pendukung yang aku suka", nilai: 3 },
  { label: "Kandungannya kurang sesuai kebutuhanku", nilai: 2 },
  { label: "Tidak ada kandungan yang aku cari", nilai: 1 },
];

// Pilihan BPOM
const BPOM_OPTIONS = [
  { label: "Terdaftar BPOM", nilai: 5, icon: BadgeCheck },
  { label: "Tidak Terdaftar BPOM", nilai: 1, icon: XCircle },
];

export default function KonsultasiPrioritas() {
  const navigate = useNavigate();
  const { skinType, concern, extras, setResults } = useConsultStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State untuk pilihan spesifik
  const [selectedHarga, setSelectedHarga] = useState<number>(3);
  const [selectedKandungan, setSelectedKandungan] = useState<number>(3);
  const [selectedBpom, setSelectedBpom] = useState<number>(5);

  const SKIN_TYPE_MAP: Record<string, number> = {
    "Berminyak": 5, "Kering": 4, "Kombinasi": 3, "Sensitif": 4, "Normal": 5,
  };

  const CONCERN_MAP: Record<string, number> = {
    "Jerawat & Bruntusan": 5, "Kusam & Belang": 4,
    "Penuaan Dini": 3, "Pori Besar & Minyak Berlebih": 4, "Kering & Iritasi": 4,
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const weights = computeWeights(extras);
      const inputJenisKulit   = SKIN_TYPE_MAP[skinType ?? "Normal"] ?? 3;
      const inputMasalahKulit = CONCERN_MAP[concern ?? "Jerawat & Bruntusan"] ?? 3;

      const result = await postRecommendation({
        inputHarga:        selectedHarga,
        inputJenisKulit,
        inputMasalahKulit,
        inputKandungan:    selectedKandungan,
        inputBpom:         selectedBpom,
      });

      const sawResults = result.topRekomendasi.map((item: any) => ({
        id:         String(item.id),
        code:       item.kode,
        name:       item.nama,
        category:   item.brand,
        finalScore: item.score,
        rank:       item.ranking,
        breakdown: [
          { key: "harga",          norm: item.detail.rHarga,        weight: weights.harga / 100,          contrib: item.detail.rHarga        * (weights.harga / 100) },
          { key: "jenisKulit",     norm: item.detail.rJenisKulit,   weight: weights.jenisKulit / 100,     contrib: item.detail.rJenisKulit   * (weights.jenisKulit / 100) },
          { key: "masalahKulit",   norm: item.detail.rMasalahKulit, weight: weights.masalahKulit / 100,   contrib: item.detail.rMasalahKulit * (weights.masalahKulit / 100) },
          { key: "kandunganAktif", norm: item.detail.rKandungan,    weight: weights.kandunganAktif / 100, contrib: item.detail.rKandungan    * (weights.kandunganAktif / 100) },
          { key: "bpom",           norm: item.detail.rBpom,         weight: weights.bpom / 100,           contrib: item.detail.rBpom         * (weights.bpom / 100) },
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
      subtitle={`Selain cocok buat kulit ${skinType?.toLowerCase()} dan bantu atasi ${concern?.toLowerCase()}, sesuaikan preferensimu di bawah ini.`}
    >
      <div className="space-y-6 mb-10">

        {/* Harga */}
        <div>
          <p className="font-semibold text-stone-700 mb-3 flex items-center gap-2">
            <Tag size={16} className="text-brand-500" /> Rentang Harga yang Diinginkan
          </p>
          <div className="space-y-2">
            {HARGA_OPTIONS.map((opt) => (
              <button
                key={opt.nilai}
                type="button"
                onClick={() => setSelectedHarga(opt.nilai)}
                className={`w-full text-left px-4 py-3 rounded-2xl border-2 transition text-sm font-medium ${
                  selectedHarga === opt.nilai
                    ? "border-brand-400 bg-brand-50 text-brand-700"
                    : "border-stone-200 text-stone-600 hover:border-brand-200"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Kandungan */}
        <div>
          <p className="font-semibold text-stone-700 mb-3 flex items-center gap-2">
            <TestTube size={16} className="text-brand-500" /> Kandungan Aktif yang Diharapkan
          </p>
          <div className="space-y-2">
            {KANDUNGAN_OPTIONS.map((opt) => (
              <button
                key={opt.nilai}
                type="button"
                onClick={() => setSelectedKandungan(opt.nilai)}
                className={`w-full text-left px-4 py-3 rounded-2xl border-2 transition text-sm font-medium ${
                  selectedKandungan === opt.nilai
                    ? "border-brand-400 bg-brand-50 text-brand-700"
                    : "border-stone-200 text-stone-600 hover:border-brand-200"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* BPOM */}
        <div>
          <p className="font-semibold text-stone-700 mb-3 flex items-center gap-2">
            <BadgeCheck size={16} className="text-brand-500" /> Status BPOM
          </p>
          <div className="flex gap-3">
            {BPOM_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.nilai}
                  type="button"
                  onClick={() => setSelectedBpom(opt.nilai)}
                  className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-2xl border-2 transition text-sm font-medium ${
                    selectedBpom === opt.nilai
                      ? "border-brand-400 bg-brand-50 text-brand-700"
                      : "border-stone-200 text-stone-600 hover:border-brand-200"
                  }`}
                >
                  <Icon size={16} /> {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

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