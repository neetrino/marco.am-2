'use client';

import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '../../lib/i18n-client';
import {
  HERO_FREE_DELIVERY_BANNER_IMAGE_SRC,
  HERO_FREE_DELIVERY_TILE_BOTTOM_FROST_HEIGHT_PERCENT,
  HERO_FREE_DELIVERY_TILE_CTA_ICON_SRC,
  HERO_PANEL_RADIUS_PX,
  HERO_SIDE_PROMO_TILE_ASPECT_CLASSNAME,
  HERO_SIDE_PROMO_TILE_WIDTH_CLASSNAME,
} from '../hero.constants';

const freeDeliveryTileBottomFrostStyle: CSSProperties = {
  height: `${HERO_FREE_DELIVERY_TILE_BOTTOM_FROST_HEIGHT_PERCENT}%`,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: HERO_PANEL_RADIUS_PX,
  borderBottomRightRadius: HERO_PANEL_RADIUS_PX,
};

/**
 * Free delivery promo tile — sits beside `HomePromoStackedProductCard` (blue stack).
 * Raster includes typography and notch; scales with hero breakpoints.
 */
export function HomePromoFreeDeliveryBanner() {
  const { t } = useTranslation();

  return (
    <Link
      href="/delivery"
      className="block shrink-0 transition hover:opacity-95"
      aria-label={t('home.promo_free_delivery_banner_aria')}
    >
      <div
        className={`relative isolate shrink-0 overflow-hidden ${HERO_SIDE_PROMO_TILE_ASPECT_CLASSNAME} ${HERO_SIDE_PROMO_TILE_WIDTH_CLASSNAME}`}
        style={{ borderRadius: HERO_PANEL_RADIUS_PX }}
      >
        <Image
          src={HERO_FREE_DELIVERY_BANNER_IMAGE_SRC}
          alt=""
          fill
          className="object-contain object-bottom"
          sizes="(max-width: 640px) 42vw, (max-width: 768px) 38vw, (max-width: 1024px) 30vw, 280px"
          priority
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-white/15 backdrop-blur-sm"
          style={freeDeliveryTileBottomFrostStyle}
        />
        {/* Scales with tile: % of card box — same aspect container as raster */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 z-20 aspect-square w-[20%]"
        >
          <Image
            src={HERO_FREE_DELIVERY_TILE_CTA_ICON_SRC}
            alt=""
            fill
            className="object-contain"
            sizes="(max-width: 640px) 10vw, (max-width: 1024px) 8vw, 62px"
          />
        </div>
      </div>
    </Link>
  );
}
