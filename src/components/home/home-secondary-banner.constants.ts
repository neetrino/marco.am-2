/**
 * Figma 307:2232 — pale panel beside gradient banner (`kam-idris…` frame).
 */

export const HOME_SECONDARY_BANNER_BG_HEX = '#d8e4f2';

export const HOME_SECONDARY_BANNER_RADIUS_PX = 16;

/** Space between gradient and secondary banner (row + column stack). */
export const HOME_BANNERS_ROW_GAP_PX = 16;

/**
 * lg: first column capped (narrow gradient), second `1fr` — wider/longer pale panel.
 * Must match `HOME_GRADIENT_BANNER_MAX_WIDTH_PX` (460).
 */
export const HOME_BANNERS_LG_GRID_COLS_CLASS =
  'lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)]';

/** Stacked layout — smaller than Figma 945×370; nudged up vs 800×320. */
export const HOME_SECONDARY_BANNER_STACK_ASPECT_CLASS = 'max-lg:aspect-[820/328]';

/** Figma 307:2237 — «BANNER», scaled with banner row. */
export const HOME_SECONDARY_BANNER_HEADLINE_FONT_SIZE_CLAMP =
  'clamp(1.08rem, 4vw, 46px)';

export const HOME_SECONDARY_BANNER_HEADLINE_LINE_HEIGHT_RATIO = '0.91';

/** Secondary CTA target — pill size from `home-banners-cta.constants`. */
export const HOME_SECONDARY_BANNER_CTA_HREF = '/products';

/** `margin-left` on yellow chip (px) — shift right; scaled with `HOME_BANNERS_CTA_*`. */
export const HOME_SECONDARY_BANNER_CTA_ICON_MARGIN_LEFT_PX = 21;

/** Visual nudge for CTA label only (`translateX`); does not move the yellow chip. */
export const HOME_SECONDARY_BANNER_CTA_LABEL_NUDGE_RIGHT_PX = 6;

/** Whole CTA row offset: positive X = right, negative Y = up. */
export const HOME_SECONDARY_BANNER_CTA_ROW_OFFSET_X_PX = 16;

export const HOME_SECONDARY_BANNER_CTA_ROW_OFFSET_Y_PX = -14;
