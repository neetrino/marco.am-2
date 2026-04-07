'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { HERO_CAROUSEL_IMAGES } from './hero.constants';

const SLIDE_INTERVAL_MS = 5000;

export function useHeroCarousel() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideCount = HERO_CAROUSEL_IMAGES.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideCount);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [slideCount]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
  }, [slideCount]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
  }, [slideCount]);

  const goToProducts = useCallback(() => {
    router.push('/products');
  }, [router]);

  return {
    currentIndex,
    goToSlide,
    goToPrevious,
    goToNext,
    goToProducts,
  };
}
