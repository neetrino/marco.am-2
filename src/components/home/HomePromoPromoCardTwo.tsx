'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useId } from 'react';
import { useTranslation } from '../../lib/i18n-client';
import {
  PROMO_CARD_TWO_CLIP_PATH_D,
  PROMO_SIDE_CARD_B_BANNER_SRC,
  PROMO_SMALL_CARD_MIN_HEIGHT_CLASS,
} from './home-promo.constants';

const PROMO_CARD_TWO_IMAGE_SIZES = '(max-width: 768px) 45vw, 220px';

export function HomePromoPromoCardTwo() {
  const { t } = useTranslation();
  const clipPathReactId = useId();
  const clipPathId = `home-promo-card-two-clip-${clipPathReactId.replace(/\W/g, '')}`;

  return (
    <Link
      href="/products"
      className={`relative block overflow-hidden shadow-sm ring-1 ring-black/10 transition hover:opacity-95 ${PROMO_SMALL_CARD_MIN_HEIGHT_CLASS}`}
      style={{ clipPath: `url(#${clipPathId})` }}
      aria-label={t('home.promo_side_card_two_aria')}
    >
      <svg width={0} height={0} className="absolute" aria-hidden>
        <defs>
          <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
            <path d={PROMO_CARD_TWO_CLIP_PATH_D} />
          </clipPath>
        </defs>
      </svg>
      <div className="absolute inset-0">
        <Image
          src={PROMO_SIDE_CARD_B_BANNER_SRC}
          alt=""
          fill
          className="object-cover object-center"
          sizes={PROMO_CARD_TWO_IMAGE_SIZES}
          priority
        />
      </div>
    </Link>
  );
}
