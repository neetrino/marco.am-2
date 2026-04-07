'use client';

type HomePromoYellowHeadlineProps = {
  emphasisText: string;
  accentText: string;
};

/** MARCO promo — Figma 305:2142: black + white headline on yellow (#ffca03). */
export function HomePromoYellowHeadline({ emphasisText, accentText }: HomePromoYellowHeadlineProps) {
  return (
    <p className="pointer-events-none mb-5 max-w-full font-black tracking-tight sm:mb-6 md:mb-8 md:whitespace-nowrap">
      <span className="text-[clamp(1.5rem,4.5vw,3.75rem)] leading-[1.15] text-marco-black lg:text-[60px] lg:leading-[72px]">
        {emphasisText}
      </span>
      <span className="text-[clamp(1.5rem,4.5vw,3.75rem)] leading-[1.15] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.14)] lg:text-[60px] lg:leading-[72px]">
        {accentText}
      </span>
    </p>
  );
}
