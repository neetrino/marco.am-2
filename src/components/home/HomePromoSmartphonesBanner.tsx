'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '../../lib/i18n-client';
import {
  HERO_PROMO_SMARTPHONES_BANNER_IMAGE_SRC,
  HERO_SIDE_PROMO_TILE_ASPECT_CLASSNAME,
  HERO_SIDE_PROMO_TILE_WIDTH_CLASSNAME,
} from '../hero.constants';

/** Figma asset 772×834 — `node-id=305-2154`; frame matches free-delivery 404∶557. */

/**
 * Smartphones / 80% promo tile — raster; compact frame beside free-delivery banner.
 */
export function HomePromoSmartphonesBanner() {
  const { t } = useTranslation();

  return (
    <Link
      href="/products"
      className="block shrink-0 transition hover:opacity-95"
      aria-label={t('home.promo_smartphones_banner_aria')}
    >
      <div
        className={`relative shrink-0 ${HERO_SIDE_PROMO_TILE_ASPECT_CLASSNAME} ${HERO_SIDE_PROMO_TILE_WIDTH_CLASSNAME}`}
      >
        <Image
          src={HERO_PROMO_SMARTPHONES_BANNER_IMAGE_SRC}
          alt=""
          fill
          className="object-contain object-bottom"
          sizes="(max-width: 640px) 42vw, (max-width: 768px) 38vw, (max-width: 1024px) 30vw, 280px"
          priority
        />
      </div>
    </Link>
  );
}
