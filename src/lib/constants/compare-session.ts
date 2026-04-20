/** HttpOnly cookie for anonymous compare-list persistence. */
export const COMPARE_SESSION_COOKIE_NAME = "shop_compare_session";

/**
 * Optional header when cookies are unavailable (same opaque value as cookie).
 * Use lowercase; fetch normalizes header names.
 */
export const COMPARE_SESSION_HEADER_NAME = "x-compare-session";

/** Sliding session length for guest compare lists. */
export const COMPARE_SESSION_MAX_AGE_SECONDS = 90 * 24 * 60 * 60;

/** UX hard cap for compare list size. */
export const COMPARE_MAX_ITEMS = 4;
