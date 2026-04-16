'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from '../../../lib/auth/AuthContext';
import { useTranslation } from '../../../lib/i18n-client';
import { apiClient } from '../../../lib/api-client';
import type { Review } from '../utils';
import { logger } from "@/lib/utils/logger";

interface UseReviewFormProps {
  productId?: string;
  productSlug?: string;
  reviews: Review[];
  /** Refetch reviews + aggregate from the server (preferred after create/update). */
  onReviewUpdated?: () => void | Promise<void>;
}

/**
 * Hook for managing review form state and submission
 */
export function useReviewForm({
  productId,
  productSlug,
  reviews,
  onReviewUpdated,
}: UseReviewFormProps) {
  const { isLoggedIn, user } = useAuth();
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [policyAccepted, setPolicyAccepted] = useState(false);

  const resetReviewPolicy = () => {
    setPolicyAccepted(false);
  };

  const handleEditReview = (review: Review) => {
    setEditingReviewId(review.id);
    setRating(review.rating);
    setComment(review.comment || '');
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setRating(0);
    setComment('');
    setPolicyAccepted(false);
    setShowForm(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      alert(t('common.reviews.loginRequired'));
      return;
    }

    if (rating === 0) {
      alert(t('common.reviews.ratingRequired'));
      return;
    }

    if (!comment.trim()) {
      alert(t('common.reviews.commentRequired'));
      return;
    }

    if (!policyAccepted) {
      alert(t('common.reviews.policyRequired'));
      return;
    }

    setSubmitting(true);

    try {
      // Use slug if available, otherwise fall back to productId
      const identifier = productSlug || productId;
      if (!identifier) {
        alert(t('common.reviews.submitError'));
        return;
      }

      logger.devLog('📝 [PRODUCT REVIEWS] Submitting review:', { identifier, rating, commentLength: comment.length });
      
      const newReview = await apiClient.post<Review>(`/api/v1/products/${identifier}/reviews`, {
        rating,
        comment: comment.trim(),
        policyAccepted: true,
      });

      logger.devLog('✅ [PRODUCT REVIEWS] Review submitted successfully:', newReview.id);

      setRating(0);
      setComment('');
      setPolicyAccepted(false);
      setShowForm(false);

      await onReviewUpdated?.();

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('review-updated'));
      }
    } catch (error: unknown) {
      logger.devLog('❌ [PRODUCT REVIEWS] Error submitting review:', error);
      
      const err = error as { status?: number };
      
      // Handle specific error cases
      if (err.status === 409) {
        // User already has a review - load it and show in edit mode
        try {
          const identifier = productSlug || productId;
          if (!identifier) {
            alert(t('common.reviews.alreadyReviewed') || 'You have already reviewed this product');
            return;
          }

          logger.devLog('📝 [PRODUCT REVIEWS] Loading existing review for user');
          const existingReview = await apiClient.get<Review>(`/api/v1/products/${identifier}/reviews?my=true`);
          
          if (existingReview) {
            await onReviewUpdated?.();
            handleEditReview(existingReview);
            alert(t('common.reviews.alreadyReviewed') || 'You have already reviewed this product. You can update your review below.');
          } else {
            alert(t('common.reviews.alreadyReviewed') || 'You have already reviewed this product');
          }
        } catch (loadError: unknown) {
          logger.devLog('❌ [PRODUCT REVIEWS] Error loading existing review:', loadError);
          // Fallback to checking local reviews
          const userReview = user ? reviews.find(r => r.userId === user.id) : null;
          if (userReview) {
            handleEditReview(userReview);
            alert(t('common.reviews.alreadyReviewed') || 'You have already reviewed this product. You can update your review below.');
          } else {
            alert(t('common.reviews.alreadyReviewed') || 'You have already reviewed this product');
          }
        }
      } else if (err.status === 401) {
        alert(t('common.reviews.loginRequired'));
      } else if (err.status === 403) {
        alert(t('common.reviews.purchaseRequired'));
      } else {
        alert(t('common.reviews.submitError'));
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateReview = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn || !editingReviewId) {
      return;
    }

    if (rating === 0) {
      alert(t('common.reviews.ratingRequired'));
      return;
    }

    if (!comment.trim()) {
      alert(t('common.reviews.commentRequired'));
      return;
    }

    setSubmitting(true);

    try {
      logger.devLog('📝 [PRODUCT REVIEWS] Updating review:', { reviewId: editingReviewId, rating, commentLength: comment.length });
      
      await apiClient.put<Review>(`/api/v1/reviews/${editingReviewId}`, {
        rating,
        comment: comment.trim(),
      });

      logger.devLog('✅ [PRODUCT REVIEWS] Review updated successfully:', editingReviewId);

      setRating(0);
      setComment('');
      setEditingReviewId(null);
      setShowForm(false);

      await onReviewUpdated?.();

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('review-updated'));
      }
    } catch (error: unknown) {
      logger.devLog('❌ [PRODUCT REVIEWS] Error updating review:', error);
      
      const err = error as { status?: number };
      
      // Handle specific error cases
      if (err.status === 401) {
        alert(t('common.reviews.loginRequired'));
      } else if (err.status === 403) {
        alert('You can only update your own reviews');
      } else {
        alert(t('common.reviews.submitError'));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return {
    showForm,
    setShowForm,
    rating,
    setRating,
    hoveredRating,
    setHoveredRating,
    comment,
    setComment,
    policyAccepted,
    setPolicyAccepted,
    resetReviewPolicy,
    submitting,
    editingReviewId,
    handleEditReview,
    handleCancelEdit,
    handleSubmit,
    handleUpdateReview,
  };
}




