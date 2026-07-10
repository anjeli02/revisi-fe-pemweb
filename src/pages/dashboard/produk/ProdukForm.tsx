import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../../component/ui/Button";
import InputText from "../../../component/ui/InputText";
import SelectInput from "../../../component/ui/SelectInput";
import { useAdminStore } from "../../../store/useAdminStore";
import { uid } from "../../../lib/uid";
import type { Product } from "../../../types/skincare";

const CATEGORY_OPTIONS = ["Pembersih", "Toner", "Serum", "Pelembap", "Sunscreen", "Masker"].map((c) => ({ value: c, label: c }));
const SCALE_OPTIONS = [1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: String(n) }));

type FormValues = {
  name: string;
  category: string;
  harga: string;
  jenisKulit: string;
  masalahKulit: string;
  kandunganAktif: string;
  bpom: string;
};

export default function ProductForm({ existing }: { existing?: Product }) {
  const navigate = useNavigate();
  const { addProduct, updateProduct } = useAdminStore();

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: existing
      ? {
          name: existing.name,
          category: existing.category,
          harga: String(existing.harga),
          jenisKulit: String(existing.jenisKulit),
          masalahKulit: String(existing.masalahKulit),
          kandunganAktif: String(existing.kandunganAktif),
          bpom: String(existing.bpom),
        }
      : { name: "", category: "Pelembap", harga: "3", jenisKulit: "3", masalahKulit: "3", kandunganAktif: "3", bpom: "5" },
  });

  const onSubmit = (data: FormValues) => {
    const payload: Product = {
      id: existing?.id ?? uid("p"),
      code: existing?.code ?? "A" + uid(""),
      name: data.name || "Produk Baru",
      category: data.category,
      harga: Number(data.harga),
      jenisKulit: Number(data.jenisKulit),
      masalahKulit: Number(data.masalahKulit),
      kandunganAktif: Number(data.kandunganAktif),
      bpom: Number(data.bpom),
    };
    if (existing) updateProduct(payload);
    else addProduct(payload);
    navigate("/dashboard/produk");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-1">
      <InputText label="Nama Produk" nama="name" register={register} />
      <SelectInput label="Kategori" nama="category" register={register} options={CATEGORY_OPTIONS} />

      <div className="grid grid-cols-2 gap-4 mt-3">
        <SelectInput label="C1 Harga (Cost, 1-5)" nama="harga" register={register} options={SCALE_OPTIONS} />
        <SelectInput label="C2 Jenis Kulit (Benefit, 1-5)" nama="jenisKulit" register={register} options={SCALE_OPTIONS} />
        <SelectInput label="C3 Masalah Kulit (Benefit, 1-5)" nama="masalahKulit" register={register} options={SCALE_OPTIONS} />
        <SelectInput label="C4 Kandungan Aktif (Benefit, 1-5)" nama="kandunganAktif" register={register} options={SCALE_OPTIONS} />
        <SelectInput label="C5 Status BPOM (Benefit, 1-5)" nama="bpom" register={register} options={SCALE_OPTIONS} />
      </div>

      <div className="flex gap-3 pt-4">
        <Button tittle={existing ? "Simpan Perubahan" : "Tambah Produk"} type="submit" />
        <button
          type="button"
          onClick={() => navigate("/dashboard/produk")}
          className="px-6 py-3 rounded-full text-stone-500 font-semibold hover:bg-stone-100"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
