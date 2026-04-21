'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '../../lib/i18n-client';
import { getStoredLanguage } from '@/lib/language';
import {
  addCompareItemClient,
  fetchCompareProductIds,
  removeCompareItemClient,
} from '@/lib/compare/compare-client';
import { getErrorHttpStatus } from '@/lib/api-client';
import { showToast } from '@/components/Toast';

const MAX_COMPARE_ITEMS = 4;

/**
 * Hook for managing compare state for a product
 * @param productId - The product ID to check/manage
 * @returns Object with compare state and toggle function
 */
export function useCompare(productId: string) {
  const { t } = useTranslation();
  const [isInCompare, setIsInCompare] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

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
    if (isToggling) {
      return;
    }

    const language = getStoredLanguage();
    const nextValue = !isInCompare;
    const delta = nextValue ? 1 : -1;
    setIsToggling(true);
    setIsInCompare(nextValue);
    window.dispatchEvent(
      new CustomEvent('compare-optimistic-updated', {
        detail: { delta },
      })
    );

    try {
      if (nextValue) {
        const compare = await fetchCompareProductIds(language);
        if (compare.length >= MAX_COMPARE_ITEMS) {
          setIsInCompare(false);
          window.dispatchEvent(
            new CustomEvent('compare-optimistic-updated', {
              detail: { delta: -delta },
            })
          );
          showToast(t('common.alerts.compareMaxReached'), 'warning', 2800);
          return;
        }
        await addCompareItemClient(productId, language);
      } else {
        await removeCompareItemClient(productId, language);
      }
    } catch (error: unknown) {
      setIsInCompare(!nextValue);
      window.dispatchEvent(
        new CustomEvent('compare-optimistic-updated', {
          detail: { delta: -delta },
        })
      );
      if (nextValue && getErrorHttpStatus(error) === 422) {
        showToast(t('common.alerts.compareMaxReached'), 'warning', 2800);
      }
      /* ignore compare toggle errors in card widgets */
    } finally {
      setIsToggling(false);
    }
  };

  return { isInCompare, toggleCompare };
}




