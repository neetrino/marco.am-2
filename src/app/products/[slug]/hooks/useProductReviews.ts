import { useState, useEffect } from 'react';
import { apiClient } from '../../../../lib/api-client';
import type { ProductReviewsListResponse } from '@/lib/types/product-reviews';

interface UseProductReviewsProps {
  slug: string;
  productId: string | null;
}

export function useProductReviews({ slug, productId }: UseProductReviewsProps) {
  const [reviews, setReviews] = useState<Array<{ rating: number }>>([]);

  useEffect(() => {
    if (!productId || !slug) return;

    const loadReviews = async () => {
      try {
        const data = await apiClient.get<ProductReviewsListResponse>(
          `/api/v1/products/${slug}/reviews`
        );
        setReviews(data.reviews ?? []);
      } catch {
        setReviews([]);
      }
    };

    void loadReviews();
    const handleReviewUpdate = () => {
      void loadReviews();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('review-updated', handleReviewUpdate);
      return () => window.removeEventListener('review-updated', handleReviewUpdate);
    }
  }, [productId, slug]);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return { reviews, averageRating };
}




