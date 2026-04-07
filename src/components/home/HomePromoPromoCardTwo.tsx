'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from '../../lib/i18n-client';
import { PROMO_SIDE_CARD_B_PRODUCT_SRC, PROMO_SMALL_CARD_MIN_HEIGHT_CLASS } from './home-promo.constants';

type HomePromoPromoCardTwoProps = {
  discountLabel: string;
  ctaLabel: string;
};

export function HomePromoPromoCardTwo({ discountLabel, ctaLabel }: HomePromoPromoCardTwoProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[#1a1a1a] ring-1 ring-white/10 ${PROMO_SMALL_CARD_MIN_HEIGHT_CLASS}`}
    >
      <div className="absolute right-3 top-3 z-10">
        <Link
          href="/products"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white text-marco-black shadow-md transition hover:bg-white/90"
          aria-label={t('home.promo_card_arrow_aria')}
        >
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
        </Link>
      </div>
      <div className="absolute left-3 top-1/2 z-10 -translate-y-[60%]">
        <span className="text-3xl font-black tracking-tight text-marco-yellow sm:text-4xl">
          {discountLabel}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2 pt-8">
        <div className="relative h-[100px] w-[85%] sm:h-[110px]">
          <Image
            src={PROMO_SIDE_CARD_B_PRODUCT_SRC}
            alt=""
            fill
            className="object-contain object-bottom"
            sizes="(max-width: 768px) 40vw, 180px"
          />
        </div>
      </div>
      <div className="absolute bottom-3 left-2 right-2 flex justify-center">
        <Link
          href="/products"
          className="w-full rounded-full bg-white px-3 py-2 text-center text-[10px] font-semibold text-marco-black shadow transition hover:bg-white/90 sm:text-xs"
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}
