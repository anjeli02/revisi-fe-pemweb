import { useNavigate } from "react-router-dom";
import { Droplets, Wind, Layers, HeartPulse, Smile } from "lucide-react";
import ConsultShell from "../../component/ConsultShell";
import ChoiceCard from "../../component/ui/ChoiceCard";
import Button from "../../component/ui/Button";
import { useConsultStore } from "../../store/useConsultStore";

const SKIN_TYPES = [
  { icon: Droplets, label: "Berminyak", desc: "Gampang kilap, terutama di area T-zone" },
  { icon: Wind, label: "Kering", desc: "Sering terasa kaku atau kusam" },
  { icon: Layers, label: "Kombinasi", desc: "Berminyak di sebagian area, kering di area lain" },
  { icon: HeartPulse, label: "Sensitif", desc: "Gampang merah atau iritasi" },
  { icon: Smile, label: "Normal", desc: "Jarang bermasalah, cukup seimbang" },
];

export default function KonsultasiJenisKulit() {
  const navigate = useNavigate();
  const { skinType, setSkinType } = useConsultStore();
  const selected = skinType ?? SKIN_TYPES[0].label;

  const handleNext = () => {
    if (!skinType) setSkinType(SKIN_TYPES[0].label);
    navigate("/konsultasi/masalah");
  };

  return (
    <ConsultShell step={1} title="Jenis Kulitmu Apa?" subtitle="Pilih yang paling menggambarkan kulitmu sehari-hari.">
      <div className="space-y-3 mb-10">
        {SKIN_TYPES.map((s) => (
          <ChoiceCard
            key={s.label}
            icon={s.icon}
            label={s.label}
            desc={s.desc}
            selected={selected === s.label}
            onClick={() => setSkinType(s.label)}
          />
        ))}
      </div>

      <div className="flex justify-end">
        <Button tittle="Lanjut" onClick={handleNext} className="inline-flex items-center gap-2" />
      </div>
    </ConsultShell>
  );
}
