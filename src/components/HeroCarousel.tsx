'use client';

import { useHeroCarousel } from './useHeroCarousel';
import { HeroCarouselSlides } from './HeroCarouselSlides';
import { HeroCarouselOverlay } from './HeroCarouselOverlay';

export function HeroCarousel() {
  const { goToProducts } = useHeroCarousel();

  return (
    <div className="hero-section-inset w-full bg-white">
      <div className="relative aspect-[1651/925] min-h-[260px] w-full overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/5 sm:min-h-[320px] md:min-h-[380px]">
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/20 via-transparent to-transparent" />

        <HeroCarouselSlides />

        <HeroCarouselOverlay onShopNow={goToProducts} onViewMore={goToProducts} />
      </div>
    </div>
  );
}
