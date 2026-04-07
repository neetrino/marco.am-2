import Image from 'next/image';
import { HERO_PRIMARY_IMAGE_SRC } from './hero.constants';

export function HeroCarouselSlides() {
  return (
    <div className="relative h-full w-full min-h-[inherit]">
      <div className="absolute inset-0">
        <Image
          src={HERO_PRIMARY_IMAGE_SRC}
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
