'use client';
import { useEffect, useState } from 'react';
import { useTranslation } from '../lib/i18n-client';
import { apiClient } from '../lib/api-client';
import { HomePromoMobileHeroChair } from './home/HomePromoMobileHeroChair';
import { HomePromoMobileHeroHeadline } from './home/HomePromoMobileHeroHeadline';
import { HomePromoMobileHeroSlateCta } from './home/HomePromoMobileHeroSlateCta';
import { HomePromoMobileHeroSlateLabel } from './home/HomePromoMobileHeroSlateLabel';
import { HomePromoMobileHeroSlatePanel } from './home/HomePromoMobileHeroSlatePanel';
import { HeroCarouselSlides } from './HeroCarouselSlides';
import { HERO_MOBILE_PRIMARY_IMAGE_SRC } from './hero.constants';
import { HOME_PAGE_SECTION_SHELL_CLASS } from './home/home-page-section-shell.constants';
import {
  HOME_HERO_PRIMARY_BOTTOM_DEFAULT_IMAGE_URL,
  HOME_HERO_PRIMARY_TOP_DEFAULT_IMAGE_URL,
  HOME_HERO_SECONDARY_DEFAULT_IMAGE_URL,
} from '../lib/constants/home-hero-admin-banners';

/** Hero shell follows the same responsive width rhythm as the whole home page. */
const HERO_PAGE_CONTAINER_CLASS = `${HOME_PAGE_SECTION_SHELL_CLASS} pt-6 sm:pt-9 lg:pt-8`;

type PublicBannerItem = {
  id: string;
  imageDesktopUrl: string | null;
  imageMobileUrl: string | null;
  sortOrder: number;
};

type PublicBannersPayload = {
  items: PublicBannerItem[];
};

export function HeroCarousel() {
  const { t } = useTranslation();
  const [desktopImages, setDesktopImages] = useState({
    leftTop: HOME_HERO_PRIMARY_TOP_DEFAULT_IMAGE_URL,
    leftBottom: HOME_HERO_PRIMARY_BOTTOM_DEFAULT_IMAGE_URL,
    right: HOME_HERO_SECONDARY_DEFAULT_IMAGE_URL,
  });
  const [mobileImage, setMobileImage] = useState(HERO_MOBILE_PRIMARY_IMAGE_SRC);

  useEffect(() => {
    let active = true;

    async function loadHeroBanners() {
      try {
        const [primary, secondary] = await Promise.all([
          apiClient.get<PublicBannersPayload>('/api/v1/banners?slot=home.hero.primary'),
          apiClient.get<PublicBannersPayload>('/api/v1/banners?slot=home.hero.secondary'),
        ]);

        if (!active) {
          return;
        }

        const primaryItems = [...primary.items].sort(
          (a, b) => a.sortOrder - b.sortOrder || a.id.localeCompare(b.id),
        );
        const secondaryItems = [...secondary.items].sort(
          (a, b) => a.sortOrder - b.sortOrder || a.id.localeCompare(b.id),
        );

        setDesktopImages({
          leftTop:
            primaryItems[0]?.imageDesktopUrl ?? HOME_HERO_PRIMARY_TOP_DEFAULT_IMAGE_URL,
          leftBottom:
            primaryItems[1]?.imageDesktopUrl ?? HOME_HERO_PRIMARY_BOTTOM_DEFAULT_IMAGE_URL,
          right:
            secondaryItems[0]?.imageDesktopUrl ?? HOME_HERO_SECONDARY_DEFAULT_IMAGE_URL,
        });
        setMobileImage(primaryItems[0]?.imageMobileUrl ?? HERO_MOBILE_PRIMARY_IMAGE_SRC);
      } catch {
        if (!active) {
          return;
        }

        setDesktopImages({
          leftTop: HOME_HERO_PRIMARY_TOP_DEFAULT_IMAGE_URL,
          leftBottom: HOME_HERO_PRIMARY_BOTTOM_DEFAULT_IMAGE_URL,
          right: HOME_HERO_SECONDARY_DEFAULT_IMAGE_URL,
        });
        setMobileImage(HERO_MOBILE_PRIMARY_IMAGE_SRC);
      }
    }

    void loadHeroBanners();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className={HERO_PAGE_CONTAINER_CLASS} id="hero">
      <div className="relative aspect-[141/79] min-h-[260px] w-full min-w-0 overflow-hidden rounded-[32px] bg-marco-yellow box-border sm:min-h-[320px] md:aspect-[141/68] md:min-h-0 md:bg-transparent">
        {/* Guaranteed mobile hero background texture pinned to top edge. */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-cover bg-top bg-no-repeat md:hidden"
          style={{ backgroundImage: `url(${mobileImage})`, backgroundPosition: 'center top' }}
          aria-hidden
        />
        <div className="md:hidden">
          <HeroCarouselSlides />
          <HomePromoMobileHeroSlatePanel />
          <HomePromoMobileHeroSlateLabel />
          <HomePromoMobileHeroChair />
          <HomePromoMobileHeroSlateCta />
          <div className="pointer-events-none absolute inset-0 z-[14] flex flex-col md:hidden">
            <div className="box-border w-full min-w-0 max-w-full px-4 pt-8 sm:px-5 sm:pt-9">
              <HomePromoMobileHeroHeadline
                emphasisText={t('home.promo_banner_headline_emphasis')}
                accentText={t('home.promo_banner_headline_accent')}
              />
            </div>
          </div>
        </div>

        <div className="hidden h-full w-full grid-cols-[minmax(0,1.24fr)_minmax(0,0.96fr)] gap-3 md:grid md:p-0 lg:gap-4 lg:p-0">
          <div className="grid h-full min-w-0 grid-rows-2 gap-3 lg:gap-4">
            <div
              className="h-full min-w-0 rounded-[30px] bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${desktopImages.leftTop})`, backgroundPosition: 'center 16%' }}
              aria-label="CASEKOO Accessories"
            />
            <div
              className="h-full min-w-0 rounded-[30px] bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${desktopImages.leftBottom})`, backgroundPosition: 'center 58%' }}
              aria-label="Xming projector"
            />
          </div>
          <div
            className="h-full min-w-0 rounded-[30px] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${desktopImages.right})`, backgroundPosition: 'center 58%' }}
            aria-label="Galaxy A05s hero"
          />
        </div>
      </div>
    </div>
  );
}
