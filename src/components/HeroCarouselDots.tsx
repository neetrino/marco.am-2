import { HERO_CAROUSEL_IMAGES } from './hero.constants';

type HeroCarouselDotsProps = {
  currentIndex: number;
  onGoToSlide: (index: number) => void;
};

export function HeroCarouselDots({
  currentIndex,
  onGoToSlide,
}: HeroCarouselDotsProps) {
  return (
    <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-3 md:bottom-6">
      {HERO_CAROUSEL_IMAGES.map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onGoToSlide(index)}
          className={`h-2 rounded-full transition-all duration-300 ${
            index === currentIndex
              ? 'w-10 bg-white'
              : 'w-2 bg-white/50 hover:bg-white/75'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}
