type HeroCarouselArrowsProps = {
  onPrevious: () => void;
  onNext: () => void;
};

export function HeroCarouselArrows({
  onPrevious,
  onNext,
}: HeroCarouselArrowsProps) {
  return (
    <>
      <button
        type="button"
        onClick={onPrevious}
        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 cursor-pointer rounded-full bg-white/60 p-2 text-gray-900 shadow-lg transition-all hover:scale-110 hover:bg-white/85 md:left-6 md:p-3"
        aria-label="Previous image"
      >
        <svg
          className="h-4 w-4 md:h-6 md:w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        type="button"
        onClick={onNext}
        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 cursor-pointer rounded-full bg-white/60 p-2 text-gray-900 shadow-lg transition-all hover:scale-110 hover:bg-white/85 md:right-6 md:p-3"
        aria-label="Next image"
      >
        <svg
          className="h-4 w-4 md:h-6 md:w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </>
  );
}
