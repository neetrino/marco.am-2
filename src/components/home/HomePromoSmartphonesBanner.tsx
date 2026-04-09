'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '../../lib/i18n-client';
import {
  HERO_PROMO_SMARTPHONES_BANNER_IMAGE_SRC,
  HERO_PROMO_SMARTPHONES_TILE_CTA_ICON_SRC,
  HERO_PROMO_SMARTPHONES_TILE_HEIGHT_PX,
  HERO_PROMO_SMARTPHONES_TILE_WIDTH_PX,
} from '../hero.constants';

/** Figma asset 772×834 — `node-id=305-2154`; frame from `HERO_PROMO_SMARTPHONES_TILE_*_PX`. */

/**
 * Smartphones / 80% promo tile — raster; fixed-size frame beside free-delivery banner.
 */
const smartphonesTileFrameStyle = {
  width: HERO_PROMO_SMARTPHONES_TILE_WIDTH_PX,
  height: HERO_PROMO_SMARTPHONES_TILE_HEIGHT_PX,
} as const;

const SMARTPHONES_BANNER_IMAGE_SIZES = `${HERO_PROMO_SMARTPHONES_TILE_WIDTH_PX}px`;

export function HomePromoSmartphonesBanner() {
  const { t } = useTranslation();

  return (
    <Link
      href="/products"
      className="block shrink-0 transition hover:opacity-95"
      aria-label={t('home.promo_smartphones_banner_aria')}
    >
      <div className="relative isolate shrink-0" style={smartphonesTileFrameStyle}>
        <Image
          src={HERO_PROMO_SMARTPHONES_BANNER_IMAGE_SRC}
          alt=""
          fill
          className="object-contain object-bottom"
          sizes={SMARTPHONES_BANNER_IMAGE_SIZES}
          priority
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 z-20 aspect-square w-[20%]"
        >
          <Image
            src={HERO_PROMO_SMARTPHONES_TILE_CTA_ICON_SRC}
            alt=""
            fill
            className="object-contain"
            sizes="72px"
          />
        </div>
      </div>
    </Link>
  );
}
