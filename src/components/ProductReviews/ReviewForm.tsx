'use client';

import type { FormEvent } from 'react';
import Link from 'next/link';
import { Button } from '@shop/ui';
import { useTranslation } from '../../lib/i18n-client';
import { ReviewRating } from './ReviewRating';

interface ReviewFormProps {
  rating: number;
  hoveredRating: number;
  comment: string;
  submitting: boolean;
  editingReviewId: string | null;
  policyAccepted: boolean;
  onPolicyChange: (accepted: boolean) => void;
  onRatingChange: (rating: number) => void;
  onHover: (rating: number) => void;
  onCommentChange: (comment: string) => void;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
}

/**
 * Review form component
 */
export function ReviewForm({
  rating,
  hoveredRating,
  comment,
  submitting,
  editingReviewId,
  policyAccepted,
  onPolicyChange,
  onRatingChange,
  onHover,
  onCommentChange,
  onSubmit,
  onCancel,
}: ReviewFormProps) {
  const { t } = useTranslation();
  const isNewReview = !editingReviewId;

  return (
    <form onSubmit={onSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {editingReviewId ? 'Update Your Review' : t('common.reviews.writeReview')}
      </h3>

      {/* Rating Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('common.reviews.rating')} *
        </label>
        <ReviewRating
          rating={rating}
          hoveredRating={hoveredRating}
          onRatingChange={onRatingChange}
          onHover={onHover}
          size="lg"
          interactive
        />
      </div>

      {/* Comment Textarea */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('common.reviews.comment')} *
        </label>
        <textarea
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder={t('common.reviews.commentPlaceholder')}
          required
        />
      </div>

      {isNewReview && (
        <div className="mb-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="reviewPolicy"
              checked={policyAccepted}
              onChange={(e) => onPolicyChange(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700">
              {t('common.reviews.policyPrefix')}{' '}
              <Link
                href="/terms"
                className="text-purple-600 underline hover:text-purple-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('common.reviews.policyTermsLink')}
              </Link>
              {t('common.reviews.policySuffix')}
            </span>
          </label>
        </div>
      )}

      {/* Form Actions */}
      <div className="flex gap-4">
        <Button
          type="submit"
          variant="primary"
          disabled={submitting}
        >
          {submitting
            ? t('common.reviews.submitting')
            : editingReviewId
              ? 'Update Review'
              : t('common.reviews.submitReview')}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          {t('common.buttons.cancel')}
        </Button>
      </div>
    </form>
  );
}




