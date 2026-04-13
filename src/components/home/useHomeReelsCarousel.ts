import { useCallback, useEffect, useRef, useState } from 'react';

import { REELS_SCROLL_FRACTION } from './home-reels.constants';

function getReelsActivePageIndex(el: HTMLDivElement): 0 | 1 {
  const maxScroll = el.scrollWidth - el.clientWidth;
  if (maxScroll <= 0) {
    return 0;
  }
  return el.scrollLeft / maxScroll < 0.5 ? 0 : 1;
}

/**
 * Horizontal REELS strip: arrow scroll, two-step pagination synced to scroll.
 */
export function useHomeReelsCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState<0 | 1>(0);

  const syncActivePage = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) {
      return;
    }
    setActivePage(getReelsActivePageIndex(el));
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) {
      return;
    }

    syncActivePage();
    el.addEventListener('scroll', syncActivePage, { passive: true });
    const ro = new ResizeObserver(syncActivePage);
    ro.observe(el);

    return () => {
      el.removeEventListener('scroll', syncActivePage);
      ro.disconnect();
    };
  }, [syncActivePage]);

  const scrollByDirection = useCallback((direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) {
      return;
    }
    const delta = el.clientWidth * REELS_SCROLL_FRACTION * direction;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  }, []);

  const scrollToPage = useCallback((page: 0 | 1) => {
    const el = scrollerRef.current;
    if (!el) {
      return;
    }
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    const left = page === 0 ? 0 : maxScroll;
    el.scrollTo({ left, behavior: 'smooth' });
  }, []);

  return {
    scrollerRef,
    activePage,
    scrollToPage,
    scrollPrev: () => {
      scrollByDirection(-1);
    },
    scrollNext: () => {
      scrollByDirection(1);
    },
  };
}
