'use client';

import { HERO_YELLOW_HEADLINE_TRANSLATE_Y_PX } from '../hero.constants';

type HomePromoYellowHeadlineProps = {
  emphasisText: string;
  accentText: string;
};

/** MARCO — Figma 101:4074: black + white headline; ~580px wide at md+ (see `HERO_HEADLINE_*` in hero.constants). */
export function HomePromoYellowHeadline({ emphasisText, accentText }: HomePromoYellowHeadlineProps) {
  return (
    <p
      className="pointer-events-none mb-5 box-border flex w-full max-w-[580px] flex-wrap items-center gap-x-2 font-black tracking-tight sm:mb-6 md:mb-8 md:min-h-[60px] md:gap-x-2.5"
      style={{ transform: `translateY(${HERO_YELLOW_HEADLINE_TRANSLATE_Y_PX}px)` }}
    >
      <span className="text-[clamp(1.15rem,3.5vw,2.9rem)] leading-[1.15] text-marco-black md:text-[50px] md:leading-[60px]">
        {emphasisText}
      </span>
      <span className="text-[clamp(1.15rem,3.5vw,2.9rem)] leading-[1.15] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.14)] md:text-[54px] md:leading-[60px]">
        {accentText}
      </span>
    </p>
  );
}
