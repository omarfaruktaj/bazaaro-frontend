import { Review } from "@/types";

export const calculateAverageRating = (reviews: Review[] = []) => {
  if (reviews?.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1);
};
