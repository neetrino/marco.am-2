'use client';

import Link from 'next/link';
import type { CSSProperties, LegacyRef } from 'react';

import { t } from '../lib/i18n';
import type { LanguageCode } from '../lib/language';
import {
  FEATURED_PRODUCTS_CARDS_PER_SLIDE,
  FEATURED_PRODUCTS_SLIDE_PAGE_COUNT,
} from './featured-products-tabs.constants';
import { SpecialOfferCard } from './home/SpecialOfferCard';
import {
  SPECIAL_OFFERS_CARD_HEIGHT_PX,
  SPECIAL_OFFERS_CARD_SHELL_RADIUS_PX,
  SPECIAL_OFFERS_MOBILE_GRID_SCROLLER_PADDING_BOTTOM_PX,
  SPECIAL_OFFERS_PAGINATION_DOT_GAP_PX,
  SPECIAL_OFFERS_PAGINATION_DOT_SIZE_PX,
  SPECIAL_OFFERS_PAGINATION_TO_CTA_GAP_PX,
  SPECIAL_OFFERS_RAIL_TO_PAGINATION_GAP_MOBILE_PX,
  SPECIAL_OFFERS_RAIL_TO_PAGINATION_GAP_PX,
  SPECIAL_OFFERS_SCROLLER_PADDING_BOTTOM_DESKTOP_PX,
} from './home/home-special-offers.constants';
import type { SpecialOfferProduct } from './home/special-offer-product.types';

const FEATURED_OFFERS_GRID_CLASS =
  'grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-4 md:gap-x-6 md:gap-y-6';

const FEATURED_PAGINATION_ARIA_KEYS = ['page_first_aria', 'page_second_aria'] as const;

const SLIDE_INDICES = [0, 1] as const;

const featuredCardSkeletonStyle = {
  height: SPECIAL_OFFERS_CARD_HEIGHT_PX,
  borderRadius: SPECIAL_OFFERS_CARD_SHELL_RADIUS_PX,
} as const;

const featuredPaginationDotStyle = {
  width: SPECIAL_OFFERS_PAGINATION_DOT_SIZE_PX,
  height: SPECIAL_OFFERS_PAGINATION_DOT_SIZE_PX,
} as const;

const SPECIAL_OFFERS_CTA_LINK_CLASS =
  'inline-flex min-w-[200px] items-center justify-center rounded-full bg-marco-black px-10 py-4 text-base font-bold text-white transition-transform hover:-translate-y-0.5';

type FilterType = 'new' | 'featured' | 'bestseller';

const FILTER_BY_TAB: Record<FilterType, string> = {
  new: 'new',
  bestseller: 'bestseller',
  featured: 'featured',
};

type FeaturedProductsStripProps = {
  language: LanguageCode;
  activeTab: FilterType;
  loading: boolean;
  error: string | null;
  products: SpecialOfferProduct[];
  cardLayout: 'default' | 'mobileGrid';
  isMaxMd: boolean;
  scrollerRef: LegacyRef<HTMLDivElement>;
  activePage: number;
  scrollToPage: (page: number) => void;
  onRetryFetch: () => void;
};

function scrollerStyle(isMaxMd: boolean): CSSProperties {
  return {
    scrollSnapType: 'x mandatory',
    paddingBottom: isMaxMd
      ? SPECIAL_OFFERS_MOBILE_GRID_SCROLLER_PADDING_BOTTOM_PX
      : SPECIAL_OFFERS_SCROLLER_PADDING_BOTTOM_DESKTOP_PX,
  };
}

/**
 * Horizontal 2-slide rail, dot pagination, and CTA — mirrors `HomeSpecialOffersSection` footer.
 */
export function FeaturedProductsStrip({
  language,
  activeTab,
  loading,
  error,
  products,
  cardLayout,
  isMaxMd,
  scrollerRef,
  activePage,
  scrollToPage,
  onRetryFetch,
}: FeaturedProductsStripProps) {
  const ctaHref = `/products?filter=${encodeURIComponent(FILTER_BY_TAB[activeTab])}`;

  if (loading) {
    return (
      <div
        ref={scrollerRef}
        className="flex min-w-0 flex-row flex-nowrap gap-0 overflow-x-auto overflow-y-hidden overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={scrollerStyle(isMaxMd)}
      >
        {SLIDE_INDICES.map((slideIdx) => (
          <div
            key={`sk-${slideIdx}`}
            className={`${FEATURED_OFFERS_GRID_CLASS} min-w-0 shrink-0 snap-start flex-[0_0_100%]`}
          >
            {Array.from({ length: FEATURED_PRODUCTS_CARDS_PER_SLIDE }).map((__, i) => (
              <div key={i} className="min-w-0">
                <div className="w-full animate-pulse bg-gray-200" style={featuredCardSkeletonStyle} />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          type="button"
          onClick={onRetryFetch}
          className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
        >
          {t(language, 'home.featured_products.tryAgain')}
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{t(language, 'home.featured_products.noProducts')}</p>
      </div>
    );
  }

  return (
    <>
      <div
        ref={scrollerRef}
        className="flex min-w-0 flex-row flex-nowrap gap-0 overflow-x-auto overflow-y-hidden overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={scrollerStyle(isMaxMd)}
      >
        {SLIDE_INDICES.map((slideIdx) => {
          const sliceStart = slideIdx * FEATURED_PRODUCTS_CARDS_PER_SLIDE;
          const slideProducts = products.slice(
            sliceStart,
            sliceStart + FEATURED_PRODUCTS_CARDS_PER_SLIDE,
          );
          return (
            <div
              key={`slide-${slideIdx}`}
              className={`${FEATURED_OFFERS_GRID_CLASS} min-w-0 shrink-0 snap-start flex-[0_0_100%]`}
            >
              {slideProducts.map((product) => (
                <div key={product.id} className="min-w-0">
                  <SpecialOfferCard product={product} layout={cardLayout} />
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <div
        className="flex flex-row items-center justify-center gap-2.5"
        style={{
          marginTop: `${isMaxMd ? SPECIAL_OFFERS_RAIL_TO_PAGINATION_GAP_MOBILE_PX : SPECIAL_OFFERS_RAIL_TO_PAGINATION_GAP_PX}px`,
          gap: `${SPECIAL_OFFERS_PAGINATION_DOT_GAP_PX}px`,
        }}
        role="tablist"
        aria-label={t(language, 'home.featured_products.pagination_aria')}
      >
        {Array.from({ length: FEATURED_PRODUCTS_SLIDE_PAGE_COUNT }, (_, dotIndex) => (
          <button
            key={`featured-pagination-${dotIndex}`}
            type="button"
            role="tab"
            aria-selected={activePage === dotIndex}
            onClick={() => scrollToPage(dotIndex)}
            className={`rounded-full transition-colors ${
              activePage === dotIndex ? 'bg-marco-black' : 'bg-gray-300'
            }`}
            style={featuredPaginationDotStyle}
            aria-label={t(
              language,
              `home.featured_products.${FEATURED_PAGINATION_ARIA_KEYS[dotIndex]}`,
            )}
          />
        ))}
      </div>

      <div
        className="flex justify-center"
        style={{ marginTop: SPECIAL_OFFERS_PAGINATION_TO_CTA_GAP_PX }}
      >
        <Link href={ctaHref} className={SPECIAL_OFFERS_CTA_LINK_CLASS}>
          {t(language, 'home.special_offers.cta')}
        </Link>
      </div>
    </>
  );
}
