'use client';

type HomePromoYellowHeadlineProps = {
  emphasisText: string;
  accentText: string;
};

/** MARCO — Figma 101:4074: black + white headline; box 645×72px at md+ (see `HERO_HEADLINE_*` in hero.constants). */
export function HomePromoYellowHeadline({ emphasisText, accentText }: HomePromoYellowHeadlineProps) {
  return (
    <p className="pointer-events-none mb-5 box-border flex w-full max-w-[645px] flex-wrap items-center gap-x-3 font-black tracking-tight sm:mb-6 md:mb-8 md:h-[72px] md:gap-x-4 md:flex-nowrap md:whitespace-nowrap">
      <span className="text-[clamp(1.5rem,4.5vw,3.75rem)] leading-[1.15] text-marco-black md:text-[60px] md:leading-[72px]">
        {emphasisText}
      </span>
      <span className="text-[clamp(1.5rem,4.5vw,3.75rem)] leading-[1.15] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.14)] md:text-[60px] md:leading-[72px]">
        {accentText}
      </span>
    </p>
  );
}
