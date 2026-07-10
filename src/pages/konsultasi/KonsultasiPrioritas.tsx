import { useNavigate } from "react-router-dom";
import { Tag, TestTube, BadgeCheck } from "lucide-react";
import ChoiceCard from "../../component/ui/ChoiceCard";
import ConsultShell from "../../component/ConsultShell";
import Button from "../../component/ui/Button";
import { useConsultStore, computeWeights } from "../../store/useConsultStore";
import { useAdminStore } from "../../store/useAdminStore";
import { calculateSAW } from "../../lib/saw";
import { uid } from "../../lib/uid";
import type { CriteriaKey } from "../../types/skincare";

const EXTRAS: { key: CriteriaKey; icon: typeof Tag; label: string; desc: string }[] = [
  { key: "harga", icon: Tag, label: "Harga terjangkau", desc: "Utamakan yang ramah di kantong" },
  { key: "kandunganAktif", icon: TestTube, label: "Kandungan aktif lengkap", desc: "Bahan aktifnya niat dan berkualitas" },
  { key: "bpom", icon: BadgeCheck, label: "Sudah Terdaftar BPOM", desc: "Aman dan legal dipakai" },
];

export default function KonsultasiPrioritas() {
  const navigate = useNavigate();
  const { skinType, concern, extras, toggleExtra, setResults } = useConsultStore();
  const { criteria, products, addHistory } = useAdminStore();

  const handleSubmit = () => {
    const weights = computeWeights(extras);
    const criteriaList = criteria.map((c) => ({ key: c.key, type: c.type, weight: weights[c.key] }));
    const results = calculateSAW(products, criteriaList);
    setResults(results);

    addHistory({
      id: uid("h"),
      date: new Date().toISOString(),
      weights,
      topResult: results[0] ? `${results[0].code} - ${results[0].name}` : "-",
      topScore: results[0] ? results[0].finalScore : 0,
    });

    navigate("/konsultasi/hasil");
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

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => navigate("/konsultasi/masalah")}
          className="px-6 py-3 rounded-full text-stone-500 font-semibold hover:bg-stone-100"
        >
          Kembali
        </button>
        <Button tittle="Lihat Rekomendasi" onClick={handleSubmit} className="inline-flex items-center gap-2" />
      </div>
    </ConsultShell>
  );
}
