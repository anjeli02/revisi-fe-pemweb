import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void; // kalau ada, komponen jadi interaktif (bisa diklik)
  size?: number;
  readOnly?: boolean;
}

// Komponen bintang rating 1-5.
// - readOnly / tanpa onChange -> hanya menampilkan nilai (dipakai utk rata-rata rating produk)
// - dengan onChange -> interaktif, bisa diklik & hover (dipakai di form kasih rating)
export default function StarRating({ value, onChange, size = 18, readOnly = false }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const interactive = !readOnly && !!onChange;
  const display = interactive && hovered !== null ? hovered : value;

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(null)}
          className={`${interactive ? "cursor-pointer" : "cursor-default"} transition-transform ${interactive ? "hover:scale-110" : ""}`}
        >
          <Star
            size={size}
            className={star <= display ? "text-amber-400 fill-amber-400" : "text-stone-300"}
          />
        </button>
      ))}
    </div>
  );
}