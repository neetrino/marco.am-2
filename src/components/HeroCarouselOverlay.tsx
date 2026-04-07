'use client';

import { useTranslation } from '../lib/i18n-client';

type HeroCarouselOverlayProps = {
  onShopNow: () => void;
  onViewMore: () => void;
};

export function HeroCarouselOverlay({
  onShopNow,
  onViewMore,
}: HeroCarouselOverlayProps) {
  const { t } = useTranslation();

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-start justify-center px-6 sm:px-10 md:px-14 lg:px-16">
      <div className="pointer-events-auto max-w-2xl text-left">
        <div className="rounded-2xl border border-white/40 bg-white/90 p-6 shadow-2xl backdrop-blur-md sm:p-8 md:p-10 lg:p-12">
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
            {t('home.hero_title')}
          </h1>
          <p className="mb-8 text-base leading-relaxed text-gray-700 sm:text-lg md:text-xl lg:text-2xl">
            {t('home.hero_subtitle')}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={onShopNow}
              className="rounded-lg bg-gray-900 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-xl sm:px-10 sm:py-4 sm:text-lg"
            >
              {t('home.hero_button_products')}
            </button>
            <button
              type="button"
              onClick={onViewMore}
              className="rounded-lg border-2 border-gray-900 bg-white px-8 py-3 text-base font-semibold text-gray-900 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-xl sm:px-10 sm:py-4 sm:text-lg"
            >
              {t('home.hero_button_view_more')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
