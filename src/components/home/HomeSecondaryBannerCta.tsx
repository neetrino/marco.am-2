import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Montserrat } from 'next/font/google';

import {
  HOME_BANNERS_CTA_ARROW_ICON_PX,
  HOME_BANNERS_CTA_HEIGHT_PX,
  HOME_BANNERS_CTA_ICON_CIRCLE_PX,
  HOME_BANNERS_CTA_LABEL_FONT_SIZE_PX,
  HOME_BANNERS_CTA_LABEL_ICON_GAP_PX,
  HOME_BANNERS_CTA_LABEL_LINE_HEIGHT_PX,
  HOME_BANNERS_CTA_PADDING_LEFT_PX,
  HOME_BANNERS_CTA_PADDING_RIGHT_PX,
  HOME_BANNERS_CTA_PILL_RADIUS_PX,
  HOME_BANNERS_CTA_WIDTH_PX,
} from './home-banners-cta.constants';
import { t } from '../../lib/i18n';
import type { LanguageCode } from '../../lib/language';
import {
  HOME_SECONDARY_BANNER_CTA_HREF,
  HOME_SECONDARY_BANNER_CTA_ICON_MARGIN_LEFT_PX,
  HOME_SECONDARY_BANNER_CTA_LABEL_NUDGE_RIGHT_PX,
} from './home-secondary-banner.constants';

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
  marginLeft: HOME_SECONDARY_BANNER_CTA_ICON_MARGIN_LEFT_PX,
};

type HomeSecondaryBannerCtaProps = {
  language: LanguageCode;
};

/**
 * Inverted surface (black pill, yellow chip); sizing shared with `HomeGradientBannerCta` via `home-banners-cta.constants`.
 */
export function HomeSecondaryBannerCta({ language }: HomeSecondaryBannerCtaProps) {
  const label = t(language, 'home.secondary_banner.cta');
  const ariaLabel = `${label}. ${t(language, 'home.secondary_banner.aria')}`;

  return (
    <Link
      href={HOME_SECONDARY_BANNER_CTA_HREF}
      className={`${montserratSlateCta.className} group pointer-events-auto flex w-full max-w-full shrink-0 items-center bg-black font-bold text-white transition hover:-translate-y-0.5 hover:bg-red-700 hover:text-white active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marco-black`}
      style={slateCtaLinkStyle}
      aria-label={ariaLabel}
    >
      <span
        className="min-w-0 shrink whitespace-nowrap text-left"
        style={{
          transform: `translateX(${HOME_SECONDARY_BANNER_CTA_LABEL_NUDGE_RIGHT_PX}px)`,
        }}
      >
        {label}
      </span>
      <span
        className="flex shrink-0 items-center justify-center rounded-full bg-marco-yellow text-marco-black transition group-hover:bg-white group-hover:text-red-700"
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
