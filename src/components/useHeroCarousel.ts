'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

/** Hero CTA navigation only (single static hero image — no carousel). */
export function useHeroCarousel() {
  const router = useRouter();

  const goToProducts = useCallback(() => {
    router.push('/products');
  }, [router]);

  return { goToProducts };
}
