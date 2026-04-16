/**
 * Public API shapes for GET /api/v1/products/[slug]/reviews (non-`my` queries).
 * Matches `Review` in `components/ProductReviews/utils.ts`.
 */
export type ProductReviewDto = {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  published?: boolean;
};

export type ReviewAggregateDistribution = {
  star: number;
  count: number;
  percentage: number;
};

export type ProductReviewsAggregate = {
  averageRating: number;
  reviewCount: number;
  distribution: ReviewAggregateDistribution[];
};

export type ProductReviewsListResponse = {
  reviews: ProductReviewDto[];
  aggregate: ProductReviewsAggregate;
};
