import { useCallback, useEffect, useRef, useState } from 'react';

import { HOME_CUSTOMER_REVIEWS_SCROLL_PAGE_FRACTION } from './home-customer-reviews.constants';

export function useReviewCarouselScroll(itemCount: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 2);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      ro.disconnect();
    };
  }, [itemCount, updateArrows]);

  const scrollByPage = useCallback((direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const delta = el.clientWidth * HOME_CUSTOMER_REVIEWS_SCROLL_PAGE_FRACTION;
    el.scrollBy({ left: direction * delta, behavior: 'smooth' });
  }, []);

  return { trackRef, canPrev, canNext, scrollByPage };
}
