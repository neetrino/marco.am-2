'use client';

import { useHeroCarousel } from './useHeroCarousel';
import { HeroCarouselSlides } from './HeroCarouselSlides';
import { HeroCarouselOverlay } from './HeroCarouselOverlay';
import { HeroCarouselArrows } from './HeroCarouselArrows';
import { HeroCarouselDots } from './HeroCarouselDots';

export function HeroCarousel() {
  const {
    currentIndex,
    goToSlide,
    goToPrevious,
    goToNext,
    goToProducts,
  } = useHeroCarousel();

  return (
    <div className="hero-section-inset w-full bg-white">
      <div className="relative aspect-[1651/925] min-h-[260px] w-full overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/5 sm:min-h-[320px] md:min-h-[380px]">
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/20 via-transparent to-transparent" />

        <HeroCarouselSlides currentIndex={currentIndex} />

        <HeroCarouselOverlay
          onShopNow={goToProducts}
          onViewMore={goToProducts}
        />

        <HeroCarouselArrows onPrevious={goToPrevious} onNext={goToNext} />

        <HeroCarouselDots
          currentIndex={currentIndex}
          onGoToSlide={goToSlide}
        />
      </div>
    </div>
  );
}
