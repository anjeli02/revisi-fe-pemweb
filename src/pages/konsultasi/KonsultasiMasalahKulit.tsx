import { useNavigate } from "react-router-dom";
import { Flame, Contrast, Hourglass, Grid3x3, AlertCircle } from "lucide-react";
import ConsultShell from "../../component/ConsultShell";
import ChoiceCard from "../../component/ui/ChoiceCard";
import Button from "../../component/ui/Button";
import { useConsultStore } from "../../store/useConsultStore";

const CONCERNS = [
  { icon: Flame, label: "Jerawat & Bruntusan", desc: "Sering breakout atau bruntusan" },
  { icon: Contrast, label: "Kusam & Belang", desc: "Warna kulit gak merata" },
  { icon: Hourglass, label: "Penuaan Dini", desc: "Garis halus mulai muncul" },
  { icon: Grid3x3, label: "Pori Besar & Minyak Berlebih", desc: "Pori kelihatan jelas, wajah cepat berminyak" },
  { icon: AlertCircle, label: "Kering & Iritasi", desc: "Kulit gampang perih atau mengelupas" },
];

export default function KonsultasiMasalahKulit() {
  const navigate = useNavigate();
  const { concern, setConcern } = useConsultStore();
  const selected = concern ?? CONCERNS[0].label;

  const handleNext = () => {
    if (!concern) setConcern(CONCERNS[0].label);
    navigate("/konsultasi/prioritas");
  };

  return (
    <ConsultShell
      step={2}
      title="Apa Masalah Utama Kulitmu?"
      subtitle="Pilih satu yang paling ingin kamu atasi sekarang."
    >
      <div className="space-y-3 mb-10">
        {CONCERNS.map((c) => (
          <ChoiceCard
            key={c.label}
            icon={c.icon}
            label={c.label}
            desc={c.desc}
            selected={selected === c.label}
            onClick={() => setConcern(c.label)}
          />
        ))}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => navigate("/konsultasi")}
          className="px-6 py-3 rounded-full text-stone-500 font-semibold hover:bg-stone-100"
        >
          Kembali
        </button>
        <Button tittle="Lanjut" onClick={handleNext} className="inline-flex items-center gap-2" />
      </div>
    </ConsultShell>
  );
}
