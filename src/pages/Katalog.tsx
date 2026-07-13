import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FlaskConical, Search, MessageCircle, ChevronDown, ChevronUp, Send, LogIn, Filter } from "lucide-react";
import { getProducts } from "../services/skincareApi";
import { useAuthStore } from "../store/useAuthStore";
import { useReviewStore } from "../store/useReviewStore";
import StarRating from "../component/ui/StarRating";

function ProductReview({ productId }: { productId: number | string }) {
  const { isAuthenticated, user } = useAuthStore();
  const { addReview, getReviewsByProduct, getAverageRating, getUserReview, fetchReviews } = useReviewStore();

  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (open && !loaded) {
      fetchReviews(productId).then(() => setLoaded(true));
    }
  }, [open, loaded, productId, fetchReviews]);

  const reviews = getReviewsByProduct(productId);
  const { average, count } = getAverageRating(productId);
  const myReview = user ? getUserReview(productId, user.id) : undefined;

  const [kualitas, setKualitas] = useState(0);
  const [popularitas, setPopularitas] = useState(0);
  const [desain, setDesain] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (myReview) {
      setKualitas(myReview.kualitas);
      setPopularitas(myReview.popularitas);
      setDesain(myReview.desain);
      setComment(myReview.review ?? "");
    }
  }, [myReview]);

  const handleSubmit = async () => {
    if (!user || kualitas === 0 || popularitas === 0 || desain === 0) return;
    setSubmitting(true);
    try {
      await addReview({ productId, kualitas, popularitas, desain, review: comment });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    } finally {
      setSubmitting(false);
    }
  };

  const displayedReviews = showAll ? reviews : reviews.slice(0, 2);

  return (
    <div className="mt-3 pt-3 border-t border-stone-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <StarRating value={Math.round(average)} readOnly size={14} />
          <span className="text-xs text-stone-500 font-medium">
            {count > 0 ? `${average.toFixed(1)} (${count})` : "Belum ada rating"}
          </span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 text-xs font-semibold text-brand-500 hover:underline"
        >
          <MessageCircle size={13} />
          Rating
          {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {open && (
        <div className="mt-3 space-y-3">
          {isAuthenticated && user ? (
            <div className="bg-rose-50/50 rounded-2xl p-3 space-y-2.5">
              <p className="text-xs font-semibold text-stone-600">
                {myReview ? "Ubah rating kamu" : "Beri rating kamu"}
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-stone-500">Kualitas</span>
                  <StarRating value={kualitas} onChange={setKualitas} size={18} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-stone-500">Popularitas</span>
                  <StarRating value={popularitas} onChange={setPopularitas} size={18} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-stone-500">Desain</span>
                  <StarRating value={desain} onChange={setDesain} size={18} />
                </div>
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tulis komentar kamu..."
                rows={2}
                className="w-full text-sm border-2 border-stone-200 rounded-xl p-2 outline-none focus:border-brand-400 resize-none"
              />
              <button
                onClick={handleSubmit}
                disabled={kualitas === 0 || popularitas === 0 || desain === 0 || submitting}
                className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold px-4 py-2 rounded-full transition"
              >
                <Send size={12} />
                {submitting ? "Mengirim..." : myReview ? "Perbarui" : "Kirim"}
              </button>
              {submitted && <p className="text-xs text-emerald-600 font-medium">Terima kasih! 🎉</p>}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 text-xs font-semibold text-brand-500 bg-rose-50/50 rounded-xl p-3 hover:bg-rose-50 transition"
            >
              <LogIn size={13} /> Masuk untuk memberi rating
            </Link>
          )}

          {reviews.length === 0 ? (
            <p className="text-xs text-stone-400 text-center py-1">Belum ada komentar.</p>
          ) : (
            <div className="space-y-2">
              {displayedReviews.map((r) => (
                <div key={r.id} className="bg-stone-50 rounded-xl p-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-700">{r.userName}</span>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {((r.kualitas + r.popularitas + r.desain) / 3).toFixed(1)} ★
                    </span>
                  </div>
                  {r.review && <p className="text-xs text-stone-500 mt-1 leading-relaxed">{r.review}</p>}
                </div>
              ))}
              {reviews.length > 2 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-xs text-brand-500 font-semibold hover:underline"
                >
                  {showAll ? "Sembunyikan" : `Lihat ${reviews.length} komentar`}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Katalog() {
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("Semua");
  const [query, setQuery] = useState("");
  const [showBrandList, setShowBrandList] = useState(false);

  useEffect(() => {
    getProducts().then(setProducts).catch(() => setProducts([]));
  }, []);

  const brands = [
    "Semua",
    ...Array.from(new Set(products.map((p) => p.brand?.nama).filter(Boolean))).sort(),
  ];

  const filtered = products
    .filter((p) => filter === "Semua" || p.brand?.nama === filter)
    .filter((p) => p.nama.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-stone-800 mb-1">Katalog Skincare</h1>
        <p className="text-stone-500 text-sm">
          {products.length} produk tersedia dari {brands.length - 1} brand
        </p>
      </div>

      {/* Search + Filter */}
      <div className="bg-white border border-rose-50 rounded-3xl p-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama produk..."
              className="w-full border-2 border-stone-200 rounded-full pl-10 pr-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none"
            />
          </div>

          {/* Toggle brand */}
          <button
            onClick={() => setShowBrandList(!showBrandList)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 text-sm font-semibold transition ${
              filter !== "Semua"
                ? "border-brand-400 bg-brand-50 text-brand-600"
                : "border-stone-200 text-stone-600 hover:border-brand-300"
            }`}
          >
            <Filter size={15} />
            {filter === "Semua" ? "Filter Brand" : filter}
            {showBrandList ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Brand list dropdown */}
        {showBrandList && (
          <div className="border-t border-stone-100 pt-4">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-3">
              Pilih Brand ({brands.length - 1} brand)
            </p>
            <div className="flex flex-wrap gap-2">
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => {
                    setFilter(b);
                    setShowBrandList(false);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition ${
                    filter === b
                      ? "border-brand-400 bg-brand-50 text-brand-600"
                      : "border-stone-200 text-stone-500 hover:border-brand-200 hover:text-brand-500"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Info filter aktif */}
        {(filter !== "Semua" || query) && (
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-stone-100">
            <p className="text-xs text-stone-500">
              Menampilkan <strong className="text-stone-700">{filtered.length}</strong> produk
              {filter !== "Semua" && <> dari brand <strong className="text-brand-600">{filter}</strong></>}
              {query && <> yang mengandung kata "<strong className="text-stone-700">{query}</strong>"</>}
            </p>
            <button
              onClick={() => { setFilter("Semua"); setQuery(""); }}
              className="text-xs text-rose-500 font-semibold hover:underline ml-auto"
            >
              Reset filter
            </button>
          </div>
        )}
      </div>

      {/* Grid Produk */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-stone-400">
          <FlaskConical size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-semibold">Produk tidak ditemukan</p>
          <p className="text-sm mt-1">Coba kata kunci atau brand lain</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl border border-rose-50 shadow-sm p-5 hover:shadow-[0_10px_30px_-10px_rgba(240,77,110,0.25)] transition"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mb-3">
                <FlaskConical className="text-brand-500" size={22} />
              </div>
              <p className="text-xs text-brand-500 font-semibold">{p.kode}</p>
              <h3 className="font-display font-bold text-stone-800 leading-tight">{p.nama}</h3>
              <p className="text-xs text-stone-400 mb-3">{p.brand?.nama}</p>
              <div className="grid grid-cols-5 gap-1 text-center text-[11px] bg-stone-50 rounded-xl p-2">
                <div><p className="font-semibold text-stone-700">{p.nilaiHarga}</p><p className="text-stone-400">C1</p></div>
                <div><p className="font-semibold text-stone-700">{p.nilaiJenisKulit}</p><p className="text-stone-400">C2</p></div>
                <div><p className="font-semibold text-stone-700">{p.nilaiMasalahKulit}</p><p className="text-stone-400">C3</p></div>
                <div><p className="font-semibold text-stone-700">{p.nilaiKandungan}</p><p className="text-stone-400">C4</p></div>
                <div><p className="font-semibold text-stone-700">{p.nilaiBpom}</p><p className="text-stone-400">C5</p></div>
              </div>
              <ProductReview productId={p.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}