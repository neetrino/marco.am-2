import Image from 'next/image';
import { HERO_MOBILE_PRIMARY_IMAGE_SRC, HERO_PRIMARY_IMAGE_SRC } from './hero.constants';

export function HeroCarouselSlides() {
  return (
    <div className="relative box-border h-full min-h-[inherit] w-full">
      <div className="absolute inset-0 box-border bg-marco-yellow">
        {/* Figma 314:2380 — mobile only */}
        <Image
          src={HERO_MOBILE_PRIMARY_IMAGE_SRC}
          alt=""
          fill
          className="object-cover object-top md:hidden"
          priority
          sizes="100vw"
        />
        {/* Desktop / tablet — existing vertical brick asset */}
        <Image
          src={HERO_PRIMARY_IMAGE_SRC}
          alt=""
          fill
          className="hidden object-cover object-top md:block"
          sizes="100vw"
        />
      </div>
    </div>
  );
}
