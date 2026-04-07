import Image from 'next/image';
import { HERO_CAROUSEL_IMAGES } from './hero.constants';

type HeroCarouselSlidesProps = {
  currentIndex: number;
};

export function HeroCarouselSlides({ currentIndex }: HeroCarouselSlidesProps) {
  return (
    <div className="relative h-full w-full min-h-[inherit]">
      {HERO_CAROUSEL_IMAGES.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={`Hero image ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
            unoptimized={image.startsWith('http')}
          />
        </div>
      ))}
    </div>
  );
}
