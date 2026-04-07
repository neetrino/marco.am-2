/** Default external target for “Reels” nav until CMS/social URLs are wired */
export const HEADER_REELS_EXTERNAL_HREF = 'https://www.instagram.com/reels/';

/**
 * Shared width + horizontal padding for both header rows — `.marco-header-container` in `globals.css`.
 * Keeps nav and search aligned with the hero gutters; do not add separate px-* on those rows.
 */
export const HEADER_CONTAINER_CLASS = 'marco-header-container';

/** Top row vertical padding — Figma 111:4293 `py-[6px]` */
export const HEADER_FIGMA_PADDING_Y_CLASS = 'py-1.5';

/** Gap between logo / nav / social / contact — scales down on smaller desktop to avoid horizontal scroll */
export const HEADER_FIGMA_CLUSTER_GAP_CLASS =
  'md:gap-x-4 lg:gap-x-6 xl:gap-x-10 2xl:gap-x-[54px]';

/** Horizontal gap between primary nav links — full Figma spacing only on wide screens */
export const HEADER_FIGMA_NAV_LINK_GAP_CLASS =
  'gap-x-3 md:gap-x-4 lg:gap-x-6 xl:gap-x-8 2xl:gap-x-[45px]';

/** Gap between phone and addresses — tight on md, full when space allows */
export const HEADER_FIGMA_CONTACT_CLUSTER_GAP_CLASS =
  'gap-x-2 md:gap-x-2.5 lg:gap-x-4 xl:gap-x-5 2xl:gap-x-[29px]';

/** Categories + search — Figma 214:1053 `gap-[25px]` */
export const HEADER_FIGMA_ROW2_LEFT_INNER_GAP_CLASS =
  'gap-x-2 sm:gap-x-3 md:gap-x-4 lg:gap-x-5 min-[1800px]:gap-x-[25px]';

/** Between (categories+search) and (locale+actions) — Figma 214:1055 `gap-[66px]` */
export const HEADER_FIGMA_ROW2_MAIN_GAP_CLASS =
  'gap-x-2.5 sm:gap-x-4 md:gap-x-6 lg:gap-x-8 xl:gap-x-10 min-[1800px]:gap-x-[66px]';

/**
 * Locale / theme / icon cluster / cart — slightly tighter than full Figma 23px so heart & neighbors read as one group.
 */
export const HEADER_FIGMA_ROW2_RIGHT_INNER_GAP_CLASS =
  'gap-x-1.5 sm:gap-x-2 md:gap-x-2.5 lg:gap-x-3 xl:gap-x-4 min-[1800px]:gap-x-[18px]';

/**
 * Profile + compare + wishlist — single flex row; fixed gap (no per-icon margins).
 * Uses gap (not margin) so spacing stays even at 80%–125% zoom.
 */
export const HEADER_TOOLBAR_ICON_CLUSTER_CLASS =
  'flex shrink-0 flex-nowrap items-center gap-2';

/**
 * Categories bar + yellow search CTA — symmetric pill (same radius on left and right edges).
 */
export const HEADER_FIGMA_PILL_RADIUS_CLASS = 'rounded-[89px]';

/**
 * Gray search track — Figma 98:1369 `h-[56px]`; yellow inner CTA is 54px (`HEADER_SEARCH_SUBMIT_HEIGHT_CLASS`).
 */
export const HEADER_SEARCH_BAR_HEIGHT_CLASS = 'h-14';

/** Yellow «Search» button height — Figma 98:1423 */
export const HEADER_SEARCH_SUBMIT_HEIGHT_CLASS = 'h-[54px]';

/**
 * Search pill spans all space between categories and the right toolbar (stretches to the right).
 */
export const HEADER_SEARCH_BAR_INNER_CLASS = 'w-full min-w-0';

/** Gap between search icon and placeholder — Figma 98:1370 `gap-[8px]` */
export const HEADER_SEARCH_ICON_TEXT_GAP_CLASS = 'gap-2';

/** Horizontal padding from track edge to icon — Figma 98:1370 `left-[24px]` */
export const HEADER_SEARCH_INPUT_PADDING_LEFT_CLASS = 'pl-6';

/** Figma 98:1423 — fixed width yellow CTA */
export const HEADER_SEARCH_SUBMIT_WIDTH_CLASS = 'w-[155px] max-w-[155px] shrink-0 px-4 sm:px-5';

/**
 * Yellow submit — Figma 98:1423: 54px tall, centered in 56px track; radius matches pill track.
 */
export const HEADER_SEARCH_SUBMIT_CLASS = `flex items-center justify-center self-center ${HEADER_SEARCH_SUBMIT_HEIGHT_CLASS} shrink-0 bg-marco-yellow text-sm font-semibold leading-normal text-marco-black transition-[filter] hover:brightness-95 active:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marco-black/15 ${HEADER_FIGMA_PILL_RADIUS_CLASS}`;

/** Language + currency pill — Figma 111:4306 `h-[48px]` */
export const HEADER_LOCALE_PILL_HEIGHT_CLASS = 'h-[48px]';

/** Full capsule radius */
export const HEADER_LOCALE_PILL_RADIUS_CLASS = 'rounded-[72px]';

/** Horizontal rhythm between globe, labels, icons */
export const HEADER_LOCALE_PILL_INNER_GAP_CLASS = 'gap-2.5 sm:gap-3';

/** Row 2 vertical padding — Figma 111:4273 `py-[14px]` */
export const HEADER_FIGMA_ROW2_PADDING_Y_CLASS = 'py-3.5';

/**
 * Category trigger — Figma 98:1403: 251×54, 16px regular, text + chevron, pill radius.
 */
export const HEADER_CATEGORY_BUTTON_CLASS = `gap-2.5 px-5 py-2.5 text-sm font-normal transition-[opacity,filter] hover:opacity-95 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${HEADER_FIGMA_PILL_RADIUS_CLASS} md:h-[54px] md:w-[251px] md:max-w-[251px] md:shrink-0 md:justify-between md:px-[42px] md:py-0 md:text-base md:font-normal`;

/** Toolbar icon hit targets — compact; shrink-0 keeps alignment stable when the row flexes/zooms */
export const HEADER_TOOLBAR_ICON_BUTTON_CLASS = 'h-10 w-10 shrink-0';

/** Cart pill — Figma 98:1389: h-[48px], rounded-[68px], ~122px min */
export const HEADER_CART_BUTTON_CLASS =
  'flex h-12 min-w-[122px] items-center justify-center gap-[11px] rounded-[68px] pl-[25px] pr-5 text-base font-bold leading-6 transition-[opacity,filter] hover:opacity-95 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25';
