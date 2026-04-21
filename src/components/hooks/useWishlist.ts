'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  addWishlistItemClient,
  fetchWishlistProductIds,
  removeWishlistItemClient,
} from '@/lib/wishlist/wishlist-client';
import { getStoredLanguage, type LanguageCode } from '@/lib/language';
import { logger } from '@/lib/utils/logger';

/**
 * Wishlist toggle backed by `GET`/`POST`/`DELETE` `/api/v1/wishlist` (guest cookie or JWT user).
 */
export function useWishlist(productId: string) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>(() => getStoredLanguage());
  const [isToggling, setIsToggling] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const ids = await fetchWishlistProductIds(language);
      setIsInWishlist(ids.includes(productId));
    } catch (error: unknown) {
      logger.devLog('[useWishlist] refresh failed', { error });
      setIsInWishlist(false);
    }
  }, [productId, language]);

  useEffect(() => {
    const onLang = () => setLanguage(getStoredLanguage());
    window.addEventListener('language-updated', onLang);
    return () => window.removeEventListener('language-updated', onLang);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    const onUpdate = () => {
      void refresh();
    };
    window.addEventListener('wishlist-updated', onUpdate);
    window.addEventListener('auth-updated', onUpdate);
    return () => {
      window.removeEventListener('wishlist-updated', onUpdate);
      window.removeEventListener('auth-updated', onUpdate);
    };
  }, [refresh]);

  const toggleWishlist = async () => {
    if (isToggling) {
      return;
    }

    const nextValue = !isInWishlist;
    const delta = nextValue ? 1 : -1;
    setIsToggling(true);
    setIsInWishlist(nextValue);
    window.dispatchEvent(
      new CustomEvent('wishlist-optimistic-updated', {
        detail: { delta },
      })
    );

    try {
      if (nextValue) {
        await addWishlistItemClient(productId, language);
      } else {
        await removeWishlistItemClient(productId, language);
      }
    } catch (error: unknown) {
      setIsInWishlist(!nextValue);
      window.dispatchEvent(
        new CustomEvent('wishlist-optimistic-updated', {
          detail: { delta: -delta },
        })
      );
      logger.error('Wishlist toggle failed', { error });
      void refresh();
    } finally {
      setIsToggling(false);
    }
  };

  return { isInWishlist, toggleWishlist };
}
