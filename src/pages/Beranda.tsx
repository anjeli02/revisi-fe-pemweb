import { Link } from "react-router-dom";
import {
  Sparkles, ArrowRight, Star, CheckCircle, ShieldCheck,
  Droplets, Flame, Wind, Leaf,
  ClipboardList, Scale, Trophy,
  ChevronRight,
} from "lucide-react";
import { Collapse } from "../component/ui/Collapse";
import { useAdminStore } from "../store/useAdminStore";
import { useAuthStore } from "../store/useAuthStore";

// ─── Data statis ─────────────────────────────────────────────────────────────

const SKIN_TYPES = [
  { Icon: Flame, label: "Kulit Berminyak", desc: "Produk oil-control & pori-pori bersih", color: "bg-orange-50 text-orange-500 border-orange-100" },
  { Icon: Droplets, label: "Kulit Kering", desc: "Produk hidrasi intensif & barrier repair", color: "bg-sky-50 text-sky-500 border-sky-100" },
  { Icon: Wind, label: "Kulit Kombinasi", desc: "Keseimbangan minyak & kelembapan", color: "bg-violet-50 text-violet-500 border-violet-100" },
  { Icon: Leaf, label: "Kulit Sensitif", desc: "Formula gentle tanpa iritan", color: "bg-emerald-50 text-emerald-500 border-emerald-100" },
];

const STEPS = [
  {
    Icon: ClipboardList,
    step: "01",
    title: "Ceritakan kondisi kulitmu",
    desc: "Pilih jenis kulit, masalah yang sedang dihadapi, dan preferensi harga. Hanya butuh 1 menit.",
  },
  {
    Icon: Scale,
    step: "02",
    title: "Kami Mencocokkan Produk",
    desc: "Sistem akan membandingkan data yang kamu masukkan dengan informasi dari setiap produk skincare untuk menemukan yang paling sesuai.",
  },
  {
    Icon: Trophy,
    step: "03",
    title: "Dapatkan rekomendasimu",
    desc: "Produk dengan tingkat kecocokan terbaik akan ditampilkan terlebih dahulu beserta informasi produk dan manfaatnya",
  },
];

const TESTIMONIALS = [
  {
    name: "Dinda Aulia",
    age: "22 th · Mahasiswi",
    skinType: "Kulit Berminyak",
    content:
      "Sebelumnya aku bingung milih serum karena banyak banget pilihan. Setelah pakai GlowMatch, langsung dapet rekomendasi yang beneran cocok buat kulit berminyakku. Skornya transparan banget, bisa liat kenapa produk itu masuk peringkat pertama.",
    rating: 5,
    product: "Skintific Acne Serum",
  },
  {
    name: "Rizka Permata",
    age: "25 th · Karyawan",
    skinType: "Kulit Sensitif",
    content:
      "Kulitku sensitif dan sering merah kalau salah produk. Di GlowMatch aku bisa filter berdasarkan kandungan dan status BPOM, jadi lebih tenang pas beli. Sekarang rutinitasku jauh lebih terarah.",
    rating: 5,
    product: "Cetaphil Moisturizing Lotion",
  },
  {
    name: "Bagas Pratama",
    age: "20 th · Mahasiswa",
    skinType: "Kulit Kombinasi",
    content:
      "Dikira cuma cewek yang butuh skincare, ternyata cowok juga perlu. GlowMatch rekomendasiin produk yang harganya terjangkau tapi tetap efektif. Pas banget buat kantong mahasiswa.",
    rating: 5,
    product: "Wardah Acnederm Serum",
  },
];

const BRANDS = [
  "Somethinc", "Skintific", "Wardah", "Azarine", "Glad2Glow",
  "The Originote", "Emina", "Hanasui", "Some By Mi", "Cetaphil", "Avoskin", "COSRX",
];

const PRODUCT_PREVIEWS = [
  { code: "A7",  name: "Skintific Acne Serum",       brand: "Skintific",   score: "0.960", tag: "Terbaik untuk Jerawat" },
  { code: "A1",  name: "Somethinc Acne Treatment",   brand: "Somethinc",   score: "0.940", tag: "Favorit Pengguna" },
  { code: "A16", name: "Wardah Acnederm Serum",       brand: "Wardah",      score: "0.935", tag: "Terjangkau & Efektif" },
  { code: "A48", name: "Some By Mi AHA BHA Serum",   brand: "Some By Mi",  score: "0.920", tag: "Kandungan Lengkap" },
];

const FAQ = [
  {
    title: "Apakah GlowMatch gratis?",
    description:
      "Ya, konsultasi di GlowMatch sepenuhnya gratis. Kamu bisa langsung coba tanpa perlu daftar, tapi dengan akun kamu bisa simpan riwayat konsultasi dan melihat hasil kapan saja.",
  },
  {
    title: "Bagaimana GlowMatch menentukan rekomendasi?",
    description:
      "Rekomendasi diberikan berdasarkan informasi yang kamu masukkan, seperti jenis kulit, masalah kulit, kandungan yang diinginkan, rentang harga, dan status BPOM. Sistem kemudian mencocokkan data tersebut dengan produk yang tersedia.",
  },
  {
    title: "Apa itu GlowMatch?",
    description:
      "GlowMatch adalah website rekomendasi skincare yang membantu pengguna menemukan produk sesuai dengan jenis kulit, masalah kulit, dan preferensi yang dipilih.",
  },
  {
    title: "Apakah hasil rekomendasi bisa berubah?",
    description:
      "Bisa. Jika kamu mengubah jenis kulit, masalah kulit, atau preferensi lainnya, sistem akan menyesuaikan hasil rekomendasi agar tetap sesuai dengan kebutuhanmu.Bisa. Mengubah bobot salah satu kriteria akan langsung mengubah urutan ranking, karena skor akhir dihitung ulang dari kombinasi bobot baru.",
  },
];

// ─── Component helpers ────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Beranda() {
  const { products } = useAdminStore();
  const { isAuthenticated } = useAuthStore();

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-brand-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute top-60 -left-32 w-80 h-80 bg-peach-100 rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-2 gap-14 items-center relative">
          {/* Left */}
          <div>
            <span className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              <Sparkles size={13} /> Find Your Dream Skincare
            </span>
            <h1 className="font-display text-4xl md:text-[3.25rem] font-bold leading-[1.15] text-stone-900 mb-5">
              Kulit Glowing Dimulai dari{" "}
              <span className="text-brand-500">Rekomendasi yang Tepat</span>
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed mb-8 max-w-lg">
              GlowMatch membantu kamu menemukan produk skincare yang sesuai dengan jenis kulit, masalah kulit, dan preferensimu. Cukup isi konsultasi singkat, lalu dapatkan rekomendasi produk yang paling cocok untuk kebutuhan kulitmu.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {isAuthenticated ? (
                <Link
                  to="/konsultasi"
                  className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-7 py-3.5 rounded-full shadow-[0_10px_30px_-10px_rgba(240,77,110,0.4)] transition"
                >
                  Mulai Konsultasi <ArrowRight size={17} />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-7 py-3.5 rounded-full shadow-[0_10px_30px_-10px_rgba(240,77,110,0.4)] transition"
                  >
                    Coba Gratis Sekarang <ArrowRight size={17} />
                  </Link>
                  <Link
                    to="/konsultasi"
                    className="inline-flex items-center gap-2 border border-stone-200 hover:border-brand-300 text-stone-700 font-semibold px-7 py-3.5 rounded-full bg-white transition"
                  >
                    Langsung Konsultasi
                  </Link>
                </>
              )}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-5 text-sm text-stone-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle size={15} className="text-emerald-500" /> Gratis tanpa kartu kredit
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-emerald-500" /> Produk terverifikasi BPOM
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={15} className="text-emerald-500" /> Hasil dalam 60 detik
              </span>
            </div>
          </div>

          {/* Right — product cards stack */}
          <div className="relative flex items-center justify-center">
            {/* Background blob */}
            <div className="w-80 h-80 bg-gradient-to-br from-brand-100 to-peach-100 rounded-[3rem] rotate-6 opacity-60" />

            {/* Top product card */}
            <div className="absolute top-4 right-4 lg:top-0 lg:right-0 bg-white rounded-2xl shadow-[0_8px_30px_-8px_rgba(0,0,0,0.12)] border border-rose-50 p-4 w-56">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-xl bg-brand-50 flex items-center justify-center">
                  <Trophy size={15} className="text-brand-500" />
                </div>
                <div>
                  <p className="text-[10px] text-stone-400 font-semibold">#1 Rekomendasi</p>
                  <p className="text-xs font-bold text-stone-800"></p>
                </div>
              </div>
              <p className="text-xs font-semibold text-stone-700">Skintific Acne Serum</p>
              <p className="text-[10px] text-stone-400">Untuk kulit berminyak & jerawat</p>
              <div className="mt-2 flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-amber-400 fill-amber-400" />)}
              </div>
            </div>

            {/* Bottom stat card */}
            <div className="absolute bottom-4 left-4 lg:bottom-0 lg:-left-4 bg-white rounded-2xl shadow-[0_8px_30px_-8px_rgba(0,0,0,0.12)] border border-rose-50 p-4 w-52">
              <p className="text-[10px] text-stone-400 font-semibold mb-1">Konsultasi minggu ini</p>
              <p className="font-display font-bold text-2xl text-stone-900">1.240+</p>
              <p className="text-[10px] text-stone-500">pengguna menemukan skincare cocok</p>
              <div className="mt-2 flex -space-x-1">
                {["bg-brand-300", "bg-peach-200", "bg-rose-300", "bg-amber-200"].map((c, i) => (
                  <div key={i} className={`w-6 h-6 rounded-full border-2 border-white ${c}`} />
                ))}
                <div className="w-6 h-6 rounded-full border-2 border-white bg-stone-100 flex items-center justify-center">
                  <span className="text-[8px] text-stone-500 font-bold">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────── */}
      <section className="bg-white border-y border-rose-100">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: `${products.length}+`, label: "Produk skincare teranalisis" },
            { value: "5", label: "Kriteria" },
            { value: "12+", label: "Brand lokal & internasional" },
            { value: "100%", label: "Gratis & transparan" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="font-display font-bold text-2xl text-brand-600">{value}</p>
              <p className="text-stone-500 text-sm mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SKIN TYPES ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900 mb-3">
            Apapun Jenis Kulitmu, Kami Punya Rekomendasinya
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto">
            Sistem kami mempertimbangkan jenis kulit sebagai salah satu kriteria utama agar produk yang disarankan benar-benar relevan.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SKIN_TYPES.map(({ Icon, label, desc, color }) => (
            <Link
              to="/konsultasi"
              key={label}
              className={`border rounded-3xl p-6 hover:shadow-[0_10px_30px_-10px_rgba(240,77,110,0.2)] transition group ${color} bg-opacity-40`}
            >
              <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm">
                <Icon size={20} />
              </div>
              <h3 className="font-display font-semibold text-stone-800 mb-1">{label}</h3>
              <p className="text-stone-500 text-sm">{desc}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-600 opacity-0 group-hover:opacity-100 transition">
                Cari produk <ChevronRight size={13} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-50 to-peach-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900 mb-3">
              Rekomendasi Skincare dalam 3 Langkah
            </h2>
            <p className="text-stone-500">Proses konsultasi dirancang singkat tapi hasilnya akurat secara ilmiah.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map(({ Icon, step, title, desc }) => (
              <div key={step} className="bg-white rounded-3xl p-7 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-display font-bold text-3xl text-brand-200">{step}</span>
                  <div className="w-10 h-10 rounded-2xl bg-brand-50 flex items-center justify-center">
                    <Icon size={20} className="text-brand-500" />
                  </div>
                </div>
                <h3 className="font-display font-semibold text-stone-800 mb-2">{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/konsultasi"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-7 py-3.5 rounded-full shadow-[0_10px_30px_-10px_rgba(240,77,110,0.4)] transition"
            >
              Mulai Konsultasi Sekarang <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRODUCT PREVIEW ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Produk dengan Skor Kecocokan Tertinggi
            </h2>
            <p className="text-stone-500">Berdasarkan bobot default sistem — hasilmu mungkin berbeda sesuai prioritasmu.</p>
          </div>
          <Link to="/katalog" className="inline-flex items-center gap-1 text-brand-600 font-semibold text-sm hover:underline">
            Lihat semua produk <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCT_PREVIEWS.map((p) => (
            <div key={p.code} className="bg-white rounded-3xl border border-rose-50 shadow-sm hover:shadow-[0_10px_30px_-10px_rgba(240,77,110,0.2)] transition p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-brand-500 font-semibold bg-brand-50 px-2 py-1 rounded-full">{p.tag}</span>
                <span className="text-xs text-stone-400 font-mono">{p.code}</span>
              </div>
              <h3 className="font-display font-bold text-stone-800 text-sm mb-0.5">{p.name}</h3>
              <p className="text-xs text-stone-400 mb-4">{p.brand}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-stone-400">Skor SAW</p>
                  <p className="font-display font-bold text-brand-600">{p.score}</p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
      <section className="bg-white border-y border-rose-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900 mb-3">
              Apa Kata Pengguna GlowMatch?
            </h2>
            <p className="text-stone-500">Mereka menemukan skincare yang tepat — dan sekarang giliranmu.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-[#fffaf9] rounded-3xl border border-rose-50 p-6">
                <StarRating count={t.rating} />
                <p className="text-stone-600 text-sm leading-relaxed mt-3 mb-5">"{t.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center font-display font-bold text-brand-600 text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-800 text-sm">{t.name}</p>
                    <p className="text-xs text-stone-400">{t.age} · {t.skinType}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-rose-100">
                  <p className="text-xs text-stone-400">Produk direkomendasikan</p>
                  <p className="text-xs font-semibold text-brand-600">{t.product}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-center text-stone-400 text-xs font-semibold uppercase tracking-widest mb-7">
          Brand yang tersedia di GlowMatch
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {BRANDS.map((b) => (
            <span key={b} className="bg-white border border-stone-200 hover:border-brand-300 hover:text-brand-600 text-stone-600 text-sm font-semibold px-5 py-2 rounded-full transition shadow-sm">
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-stone-900 mb-10">
          Pertanyaan yang Sering Diajukan
        </h2>
        <div className="space-y-4">
          {FAQ.map((f) => (
            <Collapse key={f.title} title={f.title} description={f.description} />
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-brand-500 to-brand-700 rounded-[2.5rem] px-8 py-14 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-56 h-56 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
          <div className="relative">
            <Sparkles className="text-white/60 mx-auto mb-4" size={32} />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
              Kulitmu berhak dapat yang terbaik
            </h2>
            <p className="text-white/75 mb-8 max-w-md mx-auto">
              Bergabung dengan ribuan pengguna yang sudah menemukan skincare impiannya lewat GlowMatch. Gratis, cepat, dan transparan.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-white text-brand-600 font-bold px-7 py-3.5 rounded-full hover:bg-brand-50 transition shadow-lg"
              >
                Daftar Gratis <ArrowRight size={17} />
              </Link>
              <Link
                to="/konsultasi"
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/10 transition"
              >
                Coba Tanpa Daftar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
