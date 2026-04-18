'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '../../lib/i18n-client';
import { getStoredLanguage } from '@/lib/language';
import {
  addCompareItemClient,
  fetchCompareProductIds,
  removeCompareItemClient,
} from '@/lib/compare/compare-client';

const MAX_COMPARE_ITEMS = 4;

/**
 * Hook for managing compare state for a product
 * @param productId - The product ID to check/manage
 * @returns Object with compare state and toggle function
 */
export function useCompare(productId: string) {
  const { t } = useTranslation();
  const [isInCompare, setIsInCompare] = useState(false);

  useEffect(() => {
    const checkCompare = async () => {
      try {
        const compare = await fetchCompareProductIds(getStoredLanguage());
        setIsInCompare(compare.includes(productId));
      } catch {
        setIsInCompare(false);
      }
    };

    void checkCompare();

    const handleCompareUpdate = () => {
      void checkCompare();
    };
    window.addEventListener('compare-updated', handleCompareUpdate);
    window.addEventListener('auth-updated', handleCompareUpdate);
    window.addEventListener('language-updated', handleCompareUpdate);

    return () => {
      window.removeEventListener('compare-updated', handleCompareUpdate);
      window.removeEventListener('auth-updated', handleCompareUpdate);
      window.removeEventListener('language-updated', handleCompareUpdate);
    };
  }, [productId]);

  const toggleCompare = async () => {
    try {
      const language = getStoredLanguage();
      const compare = await fetchCompareProductIds(language);

      if (isInCompare) {
        await removeCompareItemClient(productId, language);
        setIsInCompare(false);
      } else {
        if (compare.length >= MAX_COMPARE_ITEMS) {
          alert(t('common.alerts.compareMaxReached'));
          return;
        }
        await addCompareItemClient(productId, language);
        setIsInCompare(true);
      }
    } catch {
      /* ignore compare toggle errors in card widgets */
    }
  };

  return { isInCompare, toggleCompare };
}




