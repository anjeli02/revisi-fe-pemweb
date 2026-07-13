export type Review = {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  kualitas: number;
  popularitas: number;
  desain: number;
  review: string | null;
  createdAt: string;
};

export type ReviewInput = {
  productId: number | string;
  kualitas: number;
  popularitas: number;
  desain: number;
  review: string;
};