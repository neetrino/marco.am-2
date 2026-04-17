'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  HERO_DESKTOP_COMPOSITION_WIDTH_PX,
  HERO_PROMO_DESKTOP_FREE_DELIVERY_BANNER_TRANSLATE_Y_PX,
  HERO_PROMO_DESKTOP_SOFA_CARD_EXTRA_TRANSLATE_Y_PX,
  HERO_PROMO_DESKTOP_SOFA_ROW_TRANSLATE_Y_PX,
  HERO_PROMO_DESKTOP_SOFA_CARD_RU_EXTRA_TRANSLATE_Y_PX,
  HERO_PROMO_SMARTPHONES_CORNER_NUDGE_X_PX,
  HERO_PROMO_SMARTPHONES_CORNER_NUDGE_Y_PX,
} from './hero.constants';
import type { CSSProperties } from 'react';
import { useTranslation } from '../lib/i18n-client';
import type { HomeHeroPublicPayload } from '@/lib/services/home-hero-banner.service';
import { HomePromoFreeDeliveryBanner } from './home/HomePromoFreeDeliveryBanner';
import { HomePromoSmartphonesBanner } from './home/HomePromoSmartphonesBanner';
import { HomePromoStackedProductCard } from './home/HomePromoStackedProductCard';
import { HomePromoHeroChatFab } from './home/HomePromoHeroChatFab';
import { HomePromoMobileHeroChair } from './home/HomePromoMobileHeroChair';
import { HomePromoMobileHeroHeadline } from './home/HomePromoMobileHeroHeadline';
import { HomePromoMobileHeroSlateCta } from './home/HomePromoMobileHeroSlateCta';
import { HomePromoMobileHeroSlateLabel } from './home/HomePromoMobileHeroSlateLabel';
import { HomePromoMobileHeroSlatePanel } from './home/HomePromoMobileHeroSlatePanel';
import { HomePromoYellowHeadline } from './home/HomePromoYellowHeadline';
import { HeroCarouselSlides } from './HeroCarouselSlides';
import { HOME_PAGE_SECTION_SHELL_CLASS } from './home/home-page-section-shell.constants';

/** Same shell as other home sections; horizontal gutters: see `HOME_PAGE_SECTION_SHELL_CLASS`. */
const HERO_PAGE_CONTAINER_CLASS = `${HOME_PAGE_SECTION_SHELL_CLASS} pt-8 sm:pt-16 lg:pt-[65px]`;

const heroDesktopCompositionStyle: CSSProperties = {
  width: HERO_DESKTOP_COMPOSITION_WIDTH_PX,
  zoom: `min(1, calc(100cqw / ${HERO_DESKTOP_COMPOSITION_WIDTH_PX}px))`,
};

export type HeroCarouselProps = {
  initialHero: HomeHeroPublicPayload;
};

export function HeroCarousel({ initialHero }: HeroCarouselProps) {
  const { t, lang } = useTranslation();
  const [hero, setHero] = useState<HomeHeroPublicPayload>(initialHero);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch(
          `/api/v1/home/hero?locale=${encodeURIComponent(lang)}`,
        );
        if (!res.ok) return;
        const data = (await res.json()) as HomeHeroPublicPayload;
        if (!cancelled) setHero(data);
      } catch {
        // Keep SSR / cookie-aligned payload on failure
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const primaryCta = hero.ctas[0];
  const extraCtas = hero.ctas.slice(1);
  const slateCta =
    primaryCta !== undefined
      ? { label: primaryCta.label, href: primaryCta.href }
      : { label: t('home.promo_featured_cta'), href: '/products' };

  const sofaRowTranslateYPx =
    HERO_PROMO_DESKTOP_SOFA_ROW_TRANSLATE_Y_PX +
    HERO_PROMO_DESKTOP_SOFA_CARD_EXTRA_TRANSLATE_Y_PX +
    (lang === 'ru' ? HERO_PROMO_DESKTOP_SOFA_CARD_RU_EXTRA_TRANSLATE_Y_PX : 0);

  return (
    <div className={HERO_PAGE_CONTAINER_CLASS} id="hero">
      <div className="relative aspect-[141/79] min-h-[260px] w-full min-w-0 overflow-hidden rounded-[32px] bg-marco-yellow box-border sm:min-h-[320px] md:min-h-[380px]">
        <HeroCarouselSlides
          imageDesktopUrl={hero.imageDesktopUrl}
          imageMobileUrl={hero.imageMobileUrl}
        />
        <HomePromoMobileHeroSlatePanel />
        <HomePromoMobileHeroSlateLabel />
        <HomePromoMobileHeroChair />
        <HomePromoMobileHeroSlateCta primaryCta={slateCta} />
        <div className="pointer-events-none absolute inset-0 z-[14] flex flex-col md:hidden">
          <div className="box-border w-full min-w-0 max-w-full px-4 pt-8 sm:px-5 sm:pt-9">
            <HomePromoMobileHeroHeadline
              emphasisText={hero.headlineEmphasis}
              accentText={hero.headlineAccent}
            />
            {extraCtas.length > 0 ? (
              <div className="pointer-events-auto mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1">
                {extraCtas.map((c) => (
                  <Link
                    key={c.id}
                    href={c.href}
                    className="text-xs font-semibold text-marco-black underline decoration-marco-black/40 underline-offset-2 hover:decoration-marco-black"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 z-[15] hidden min-w-0 flex-col items-center justify-start overflow-hidden md:flex [container-type:inline-size]">
          <div
            className="pointer-events-auto flex max-w-none shrink-0 origin-top flex-col justify-start gap-7 px-9 pb-11 pt-9"
            style={heroDesktopCompositionStyle}
          >
            <div className="pointer-events-none relative z-20 flex min-w-0 flex-row flex-wrap items-start justify-between gap-x-4 gap-y-4">
              <div className="min-w-0 max-w-full flex-[1_1_min(580px,100%)] [&_p]:mb-0">
                <HomePromoYellowHeadline
                  emphasisText={hero.headlineEmphasis}
                  accentText={hero.headlineAccent}
                />
                {extraCtas.length > 0 ? (
                  <div className="pointer-events-auto mt-2 flex max-w-[580px] flex-wrap gap-x-4 gap-y-1">
                    {extraCtas.map((c) => (
                      <Link
                        key={c.id}
                        href={c.href}
                        className="text-sm font-semibold text-marco-black underline decoration-marco-black/40 underline-offset-2 hover:decoration-marco-black"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
              <div
                className="pointer-events-auto flex min-w-0 shrink-0 flex-row flex-wrap items-start justify-end"
                style={{
                  transform: `translate(${HERO_PROMO_SMARTPHONES_CORNER_NUDGE_X_PX}px, ${HERO_PROMO_SMARTPHONES_CORNER_NUDGE_Y_PX}px)`,
                }}
              >
                <HomePromoSmartphonesBanner layout="corner" />
              </div>
            </div>
            <div className="relative z-[5] flex w-full min-w-0 flex-row flex-wrap items-end justify-start gap-8">
              <div
                className="shrink-0"
                style={{
                  transform: `translateY(${sofaRowTranslateYPx}px)`,
                }}
              >
                <HomePromoStackedProductCard
                  ariaLabel={`${t('home.promo_featured_title')}. ${t('home.promo_featured_subtitle')}`}
                  compositionMode
                />
              </div>
              <div
                className="shrink-0"
                style={{
                  transform: `translateY(${HERO_PROMO_DESKTOP_FREE_DELIVERY_BANNER_TRANSLATE_Y_PX}px)`,
                }}
              >
                <HomePromoFreeDeliveryBanner compositionMode />
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-auto absolute bottom-3 right-4 z-30 max-md:hidden sm:bottom-5 sm:right-6 md:bottom-7 md:right-7 lg:right-9">
          <HomePromoHeroChatFab />
        </div>
      </div>
    </div>
  );
}
