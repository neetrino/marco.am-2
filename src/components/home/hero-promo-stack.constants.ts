/**
 * Figma MARCO — stacked layers 101:4019 (white), 101:4020 (gray), 101:4021 (blue) + chair 101:4023.
 * Vertical span from top of 101:4019 (y=679) to bottom of 101:4021 in design px.
 */

/** Matches Figma `rounded-[36px]` on rectangles 101:4019–101:4021 */
export const HERO_PROMO_STACK_RADIUS_PX = 36;

/** Design px — bottom of blue layer minus top of white layer */
export const HERO_PROMO_STACK_SPAN_PX = 804.42236328125 + 480.998046875 - 679;

/** White — 101:4019 */
export const HERO_PROMO_STACK_WHITE_TOP_PX = 0;
export const HERO_PROMO_STACK_WHITE_HEIGHT_PX = 475;

/** Gray — 101:4020 */
export const HERO_PROMO_STACK_GRAY_TOP_PX = 737 - 679;
export const HERO_PROMO_STACK_GRAY_HEIGHT_PX = 477;

/** Blue — 101:4021 */
export const HERO_PROMO_STACK_BLUE_TOP_PX = 804.42236328125 - 679;
export const HERO_PROMO_STACK_BLUE_HEIGHT_PX = 480.998046875;

function toPercent(part: number): number {
  return (part / HERO_PROMO_STACK_SPAN_PX) * 100;
}

/** CSS percentage strings for `top` / `height` inside the stack container */
export const HERO_PROMO_STACK_WHITE_STYLE = {
  top: `${toPercent(HERO_PROMO_STACK_WHITE_TOP_PX)}%`,
  height: `${toPercent(HERO_PROMO_STACK_WHITE_HEIGHT_PX)}%`,
} as const;

export const HERO_PROMO_STACK_GRAY_STYLE = {
  top: `${toPercent(HERO_PROMO_STACK_GRAY_TOP_PX)}%`,
  height: `${toPercent(HERO_PROMO_STACK_GRAY_HEIGHT_PX)}%`,
} as const;

export const HERO_PROMO_STACK_BLUE_STYLE = {
  top: `${toPercent(HERO_PROMO_STACK_BLUE_TOP_PX)}%`,
  height: `${toPercent(HERO_PROMO_STACK_BLUE_HEIGHT_PX)}%`,
} as const;

/** Chair image — 101:4023; width vs stack width 631 */
export const HERO_PROMO_CHAIR_WIDTH_RATIO = 563.1322631835938 / 631;

/** Chair bounding height vs stack span (Figma frame height) */
export const HERO_PROMO_CHAIR_HEIGHT_RATIO = 563.1322631835938 / HERO_PROMO_STACK_SPAN_PX;

/** Container `aspect-ratio` — Figma stack width × vertical span */
export const HERO_PROMO_STACK_CONTAINER_ASPECT_W = 631;
export const HERO_PROMO_STACK_CONTAINER_ASPECT_H = HERO_PROMO_STACK_SPAN_PX;
