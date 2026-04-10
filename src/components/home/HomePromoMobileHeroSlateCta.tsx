'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Montserrat } from 'next/font/google';
import { useTranslation } from '../../lib/i18n-client';
import {
  HERO_MOBILE_SLATE_CTA_HEIGHT_PX,
  HERO_MOBILE_SLATE_CTA_ICON_CIRCLE_PX,
  HERO_MOBILE_SLATE_CTA_MAX_WIDTH_PX,
  HERO_MOBILE_SLATE_CTA_NUDGE_RIGHT_PX,
  HERO_MOBILE_SLATE_CTA_PILL_RADIUS_PX,
  HERO_MOBILE_SLATE_PANEL_BOX_STYLE,
} from '../hero.constants';

const montserratSlateCta = Montserrat({
  weight: '700',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

const slateCtaLinkStyle = {
  minHeight: HERO_MOBILE_SLATE_CTA_HEIGHT_PX,
  maxWidth: HERO_MOBILE_SLATE_CTA_MAX_WIDTH_PX,
  borderRadius: HERO_MOBILE_SLATE_CTA_PILL_RADIUS_PX,
} as const;

const slateCtaIconFrameStyle = {
  width: HERO_MOBILE_SLATE_CTA_ICON_CIRCLE_PX,
  height: HERO_MOBILE_SLATE_CTA_ICON_CIRCLE_PX,
} as const;

/**
 * Figma 314:2394 — yellow pill + black arrow chip; `z-[12]` under chair (`z-[13]`) so legs overlap CTA.
 */
export function HomePromoMobileHeroSlateCta() {
  const { t } = useTranslation();

  return (
    <div
      className="pointer-events-none absolute z-[12] box-border flex flex-col justify-end md:hidden"
      style={HERO_MOBILE_SLATE_PANEL_BOX_STYLE}
    >
      <div
        className="flex w-full justify-center px-2 pb-1.5 pt-0"
        style={{ transform: `translateX(${HERO_MOBILE_SLATE_CTA_NUDGE_RIGHT_PX}px)` }}
      >
        <Link
          href="/products"
          className={`${montserratSlateCta.className} group pointer-events-auto flex w-full max-w-full items-center justify-between gap-1.5 rounded-full bg-marco-yellow py-0.5 pl-3 pr-0.5 text-sm font-bold leading-5 text-marco-black shadow-sm transition hover:bg-red-700 hover:text-white active:translate-y-px sm:pl-3.5`}
          style={slateCtaLinkStyle}
          aria-label={`${t('home.promo_featured_cta')}. ${t('home.promo_featured_title')}`}
        >
          <span className="min-w-0 shrink text-left">{t('home.promo_featured_cta')}</span>
          <span
            className="flex shrink-0 items-center justify-center rounded-full bg-marco-black text-white transition group-hover:bg-white group-hover:text-red-700"
            style={slateCtaIconFrameStyle}
            aria-hidden
          >
            <ArrowUpRight width={18} height={18} strokeWidth={2.5} />
          </span>
        </Link>
      </div>
    </div>
  );
}
