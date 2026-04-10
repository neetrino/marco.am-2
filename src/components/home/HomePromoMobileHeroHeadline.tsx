'use client';

import {
  HERO_MOBILE_HEADLINE_FONT_SIZE_PX,
  HERO_MOBILE_HEADLINE_LINE_HEIGHT_PX,
  HERO_MOBILE_HEADLINE_NUDGE_LEFT_PX,
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
    <p
      className="pointer-events-none box-border max-w-full whitespace-nowrap font-black tracking-tight"
      style={{
        transform: `translateX(-${HERO_MOBILE_HEADLINE_NUDGE_LEFT_PX}px)`,
      }}
    >
      <span className="text-marco-black" style={mobileHeadlineTypography}>
        {emphasisText}
      </span>
      <span className="text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.14)]" style={mobileHeadlineTypography}>
        {` ${accentText}`}
      </span>
    </p>
  );
}
