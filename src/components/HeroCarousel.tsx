'use client';

import { HeroCarouselSlides } from './HeroCarouselSlides';

export function HeroCarousel() {
  return (
    <div className="hero-section-inset w-full">
      <div className="relative aspect-[1651/925] min-h-[260px] w-full overflow-hidden rounded-3xl bg-marco-yellow box-border sm:min-h-[320px] md:min-h-[380px]">
        <HeroCarouselSlides />
      </div>
    </div>
  );
}
