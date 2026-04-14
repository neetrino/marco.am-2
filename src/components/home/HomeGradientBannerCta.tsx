import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Montserrat } from 'next/font/google';

import {
  HOME_BANNERS_CTA_ARROW_ICON_PX,
  HOME_BANNERS_CTA_HEIGHT_PX,
  HOME_BANNERS_CTA_ICON_CIRCLE_PX,
  HOME_BANNERS_CTA_ICON_PULL_LEFT_PX,
  HOME_BANNERS_CTA_LABEL_FONT_SIZE_PX,
  HOME_BANNERS_CTA_LABEL_ICON_GAP_PX,
  HOME_BANNERS_CTA_LABEL_LINE_HEIGHT_PX,
  HOME_BANNERS_CTA_PADDING_LEFT_PX,
  HOME_BANNERS_CTA_PADDING_RIGHT_PX,
  HOME_BANNERS_CTA_PILL_RADIUS_PX,
  HOME_BANNERS_CTA_WIDTH_PX,
} from './home-banners-cta.constants';
import { HOME_GRADIENT_BANNER_CTA_LABEL_NUDGE_LEFT_PX } from './home-gradient-banner.constants';
import { t } from '../../lib/i18n';
import type { LanguageCode } from '../../lib/language';

const montserratSlateCta = Montserrat({
  weight: '700',
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
});

const slateCtaLinkStyle: CSSProperties = {
  height: HOME_BANNERS_CTA_HEIGHT_PX,
  minHeight: HOME_BANNERS_CTA_HEIGHT_PX,
  maxWidth: HOME_BANNERS_CTA_WIDTH_PX,
  width: '100%',
  borderRadius: HOME_BANNERS_CTA_PILL_RADIUS_PX,
  paddingLeft: HOME_BANNERS_CTA_PADDING_LEFT_PX,
  paddingRight: HOME_BANNERS_CTA_PADDING_RIGHT_PX,
  gap: HOME_BANNERS_CTA_LABEL_ICON_GAP_PX,
  fontSize: HOME_BANNERS_CTA_LABEL_FONT_SIZE_PX,
  lineHeight: `${HOME_BANNERS_CTA_LABEL_LINE_HEIGHT_PX}px`,
};

const slateCtaIconFrameStyle: CSSProperties = {
  width: HOME_BANNERS_CTA_ICON_CIRCLE_PX,
  height: HOME_BANNERS_CTA_ICON_CIRCLE_PX,
  marginLeft: -HOME_BANNERS_CTA_ICON_PULL_LEFT_PX,
};

type HomeGradientBannerCtaProps = {
  language: LanguageCode;
};

/**
 * Pill shell matches hero slate CTA; dimensions from `home-banners-cta.constants` (slightly smaller).
 */
export function HomeGradientBannerCta({ language }: HomeGradientBannerCtaProps) {
  const label = t(language, 'home.promo_featured_cta');
  const ariaLabel = `${t(language, 'home.promo_featured_cta')}. ${t(language, 'home.promo_featured_title')}`;

  return (
    <Link
      href="/products"
      className={`${montserratSlateCta.className} group pointer-events-auto flex w-full max-w-full shrink-0 items-center bg-marco-yellow font-bold text-marco-black transition hover:-translate-y-0.5 hover:bg-red-700 hover:text-white active:translate-y-px`}
      style={slateCtaLinkStyle}
      aria-label={ariaLabel}
    >
      <span
        className="min-w-0 shrink whitespace-nowrap text-left"
        style={{
          transform: `translateX(${HOME_GRADIENT_BANNER_CTA_LABEL_NUDGE_LEFT_PX}px)`,
        }}
      >
        {label}
      </span>
      <span
        className="flex shrink-0 items-center justify-center rounded-full bg-marco-black text-white transition group-hover:bg-white group-hover:text-red-700"
        style={slateCtaIconFrameStyle}
        aria-hidden
      >
        <ArrowUpRight
          width={HOME_BANNERS_CTA_ARROW_ICON_PX}
          height={HOME_BANNERS_CTA_ARROW_ICON_PX}
          strokeWidth={2.5}
        />
      </span>
    </Link>
  );
}
