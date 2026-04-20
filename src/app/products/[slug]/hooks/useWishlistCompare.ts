import { useState, useEffect, useCallback } from 'react';
import { fetchWishlistProductIds } from '@/lib/wishlist/wishlist-client';
import { getStoredLanguage, type LanguageCode } from '@/lib/language';
import { fetchCompareProductIds } from '@/lib/compare/compare-client';

interface UseWishlistCompareProps {
  productId: string | null;
}

export function useWishlistCompare({ productId }: UseWishlistCompareProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCompare, setIsInCompare] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>(() => getStoredLanguage());

  const refreshWishlist = useCallback(async () => {
    if (!productId) {
      setIsInWishlist(false);
      return;
    }
    try {
      const ids = await fetchWishlistProductIds(language);
      setIsInWishlist(ids.includes(productId));
    } catch {
      setIsInWishlist(false);
    }
  }, [productId, language]);

  useEffect(() => {
    const onLang = () => setLanguage(getStoredLanguage());
    window.addEventListener('language-updated', onLang);
    return () => window.removeEventListener('language-updated', onLang);
  }, []);

  useEffect(() => {
    void refreshWishlist();
  }, [refreshWishlist]);

  useEffect(() => {
    const onUpdate = () => {
      void refreshWishlist();
    };
    window.addEventListener('wishlist-updated', onUpdate);
    window.addEventListener('auth-updated', onUpdate);
    return () => {
      window.removeEventListener('wishlist-updated', onUpdate);
      window.removeEventListener('auth-updated', onUpdate);
    };
  }, [refreshWishlist]);

  useEffect(() => {
    if (!productId) return;

    const checkCompare = async () => {
      try {
        const compare = await fetchCompareProductIds(language);
        setIsInCompare(compare.includes(productId));
      } catch {
        setIsInCompare(false);
      }
    };

    void checkCompare();
    const onCompare = () => {
      void checkCompare();
    };
    window.addEventListener('compare-updated', onCompare);
    window.addEventListener('auth-updated', onCompare);
    return () => {
      window.removeEventListener('compare-updated', onCompare);
      window.removeEventListener('auth-updated', onCompare);
    };
  }, [language, productId]);

  return { isInWishlist, setIsInWishlist, isInCompare, setIsInCompare };
}
