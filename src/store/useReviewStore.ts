import { create } from "zustand";
import type { Review, ReviewInput } from "../types/review";
import { postRating, getRatingsByProductApi } from "../services/skincareApi";

interface ReviewState {
  reviewsByProduct: Record<string, Review[]>;
  loadingProduct: Record<string, boolean>;
  fetchReviews: (productId: number | string) => Promise<void>;
  addReview: (input: ReviewInput) => Promise<void>;
  getReviewsByProduct: (productId: number | string) => Review[];
  getAverageRating: (productId: number | string) => { average: number; count: number };
  getUserReview: (productId: number | string, userId: number | string) => Review | undefined;
}

const overall = (r: Review) => (r.kualitas + r.popularitas + r.desain) / 3;

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviewsByProduct: {},
  loadingProduct: {},

  fetchReviews: async (productId) => {
    const key = String(productId);
    set((s) => ({ loadingProduct: { ...s.loadingProduct, [key]: true } }));
    try {
      const data = await getRatingsByProductApi(productId);
      const mapped: Review[] = data.map((r: any) => ({
        id: r.id,
        productId: r.productId,
        userId: r.userId,
        userName: r.user?.username ?? "Pengguna",
        kualitas: r.kualitas,
        popularitas: r.popularitas,
        desain: r.desain,
        review: r.review,
        createdAt: r.createdAt,
      }));
      set((s) => ({ reviewsByProduct: { ...s.reviewsByProduct, [key]: mapped } }));
    } finally {
      set((s) => ({ loadingProduct: { ...s.loadingProduct, [key]: false } }));
    }
  },

  addReview: async (input) => {
    await postRating({
      productId: Number(input.productId),
      kualitas: input.kualitas,
      popularitas: input.popularitas,
      desain: input.desain,
      review: input.review,
    });
    await get().fetchReviews(input.productId);
  },

  getReviewsByProduct: (productId) => get().reviewsByProduct[String(productId)] ?? [],

  getAverageRating: (productId) => {
    const list = get().reviewsByProduct[String(productId)] ?? [];
    if (list.length === 0) return { average: 0, count: 0 };
    const sum = list.reduce((acc, r) => acc + overall(r), 0);
    return { average: sum / list.length, count: list.length };
  },

  getUserReview: (productId, userId) =>
    (get().reviewsByProduct[String(productId)] ?? []).find(
      (r) => String(r.userId) === String(userId)
    ),
}));