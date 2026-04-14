'use client';

import {
  HERO_MOBILE_HEADLINE_FONT_SIZE_PX,
  HERO_MOBILE_HEADLINE_LINE_HEIGHT_PX,
} from '../hero.constants';

type HomePromoMobileHeroHeadlineProps = {
  emphasisText: string;
  accentText: string;
};

const mobileHeadlineTypography = {
  fontSize: `${HERO_MOBILE_HEADLINE_FONT_SIZE_PX}px`,
  lineHeight: `${HERO_MOBILE_HEADLINE_LINE_HEIGHT_PX}px`,
} as const;

/** MARCO — Figma 314:2400: black + white two-word headline on mobile hero only. */
export function HomePromoMobileHeroHeadline({
  emphasisText,
  accentText,
}: HomePromoMobileHeroHeadlineProps) {
  return (
    <p className="pointer-events-none box-border flex w-full max-w-full min-w-0 flex-row flex-nowrap items-baseline justify-center gap-x-1 font-black tracking-tight sm:gap-x-1.5">
      <span className="shrink-0 text-marco-black" style={mobileHeadlineTypography}>
        {emphasisText}
      </span>
      <span
        className="shrink-0 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.14)]"
        style={mobileHeadlineTypography}
      >
        {accentText}
      </span>
    </p>
  );
}
