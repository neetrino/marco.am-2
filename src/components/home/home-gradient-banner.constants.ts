/**
 * Gradient + photo banner — user spec (560×370, 56/37, #2F4B5D overlay).
 */

export const HOME_GRADIENT_BANNER_IMAGE_PATH = '/assets/home/home-gradient-banner.jpg';

/** First banner — between compact 420 and legacy 560. */
export const HOME_GRADIENT_BANNER_MAX_WIDTH_PX = 460;

/** Align with `HomeAppBanner` — same inner container, flush start (no extra nudge). */
export const HOME_GRADIENT_BANNER_OFFSET_LEFT_PX = 0;

/** Pull gradient + secondary banner block slightly up toward app banner above. */
export const HOME_GRADIENT_BANNER_SECTION_MARGIN_TOP_PX = -5;

/**
 * Solid fill behind photo + overlay — matches slate tint base so no light-gray edge strip shows.
 * Same RGB as overlay `rgb(47 75 93)`.
 */
export const HOME_GRADIENT_BANNER_SURFACE_BASE_HEX = '#2f4b5d';

/** Figma 101:4129 — headline fill. */
export const HOME_GRADIENT_BANNER_HEADLINE_COLOR_HEX = '#fadd1a';

/** Responsive headline — scaled down with banner size. */
export const HOME_GRADIENT_BANNER_HEADLINE_FONT_SIZE_CLAMP =
  'clamp(1.08rem, 4.2vw, 46px)';

export const HOME_GRADIENT_BANNER_HEADLINE_LINE_HEIGHT_RATIO = '0.91';

/**
 * Visual shift for CTA label only (`translateX`); pill padding matches hero so the arrow chip stays right.
 */
export const HOME_GRADIENT_BANNER_CTA_LABEL_NUDGE_LEFT_PX = -6;

/** CTA row nudge from bottom-left anchor: positive X = right, negative Y = up. */
export const HOME_GRADIENT_BANNER_CTA_ROW_OFFSET_X_PX = 30;

export const HOME_GRADIENT_BANNER_CTA_ROW_OFFSET_Y_PX = -10;

/** Slightly taller than 56/32 — a bit more visual mass. */
export const HOME_GRADIENT_BANNER_ASPECT_RATIO = '56 / 34';

export const HOME_GRADIENT_BANNER_RADIUS_PX = 16;

/** Overlay opacity so the photo stays visible under the slate tint (solid #2F4B5D would hide it). */
export const HOME_GRADIENT_BANNER_OVERLAY_OPACITY = 0.58;

/**
 * Photo fill — Figma 101:4135 (`kam-idris`); explicit % size in file vs `cover` in CSS — reference only.
 * Runtime uses `background-size: cover` on the image layer to avoid edge bands.
 */
export const HOME_GRADIENT_BANNER_BG_SIZE_WIDTH_PERCENT = 120.46;

export const HOME_GRADIENT_BANNER_BG_SIZE_HEIGHT_PERCENT = 160.88;

export const HOME_GRADIENT_BANNER_BG_POSITION_X_PERCENT = -11.5;

export const HOME_GRADIENT_BANNER_BG_POSITION_Y_PERCENT = -48.15;
