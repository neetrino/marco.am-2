// Language utilities
export const LANGUAGES = {
  en: { code: 'en', name: 'English', nativeName: 'English' },
  hy: { code: 'hy', name: 'Armenian', nativeName: 'Հայերեն' },
  ru: { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  ka: { code: 'ka', name: 'Georgian', nativeName: 'ქართული' },
} as const;

export type LanguageCode = keyof typeof LANGUAGES;

/** Same key for localStorage and optional SSR cookie (`layout`). */
export const LANGUAGE_PREFERENCE_KEY = 'shop_language';
const LANGUAGE_STORAGE_KEY = LANGUAGE_PREFERENCE_KEY;

/** Default locale for static labels when no user preference is available. */
export const DEFAULT_LANGUAGE: LanguageCode = 'en';

export function getStoredLanguage(): LanguageCode {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && stored in LANGUAGES) {
      return stored as LanguageCode;
    }
  } catch {
    // Ignore errors
  }
  return 'en';
}

/**
 * Parse language from a cookie or other server-provided string (e.g. layout).
 * Returns undefined if the value is missing or not a supported code.
 */
export function parseLanguageFromServer(raw: string | undefined): LanguageCode | undefined {
  if (!raw || !(raw in LANGUAGES)) {
    return undefined;
  }
  const code = raw as LanguageCode;
  return code === 'ka' ? 'en' : code;
}

/** How long the locale cookie is kept (must match typical “remember language” UX). */
const LANGUAGE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

/**
 * Read the `shop_language` cookie in the browser. Returns `null` if missing or invalid.
 */
export function readLanguageCookie(): LanguageCode | null {
  if (typeof document === 'undefined') return null;
  const prefix = `${LANGUAGE_PREFERENCE_KEY}=`;
  const segment = document.cookie.split('; ').find((row) => row.startsWith(prefix));
  if (!segment) return null;
  let raw = segment.slice(prefix.length);
  try {
    raw = decodeURIComponent(raw);
  } catch {
    // keep raw as-is
  }
  const parsed = parseLanguageFromServer(raw);
  return parsed ?? null;
}

/**
 * Sync locale to the cookie so the server layout/RSC can read it on the next request.
 */
export function persistLanguageCookie(language: LanguageCode): void {
  if (typeof document === 'undefined') return;
  const secure = typeof window !== 'undefined' && window.location.protocol === 'https:';
  const value = encodeURIComponent(language);
  const attrs = [
    `${LANGUAGE_PREFERENCE_KEY}=${value}`,
    'path=/',
    `max-age=${LANGUAGE_COOKIE_MAX_AGE_SECONDS}`,
    'SameSite=Lax',
  ];
  if (secure) {
    attrs.push('Secure');
  }
  document.cookie = attrs.join('; ');
}

export function setStoredLanguage(language: LanguageCode, options?: { skipReload?: boolean }): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    window.dispatchEvent(new Event('language-updated'));
    // Only reload if skipReload is not true
    if (!options?.skipReload) {
      // Use a small delay to ensure state updates are visible before reload
      setTimeout(() => {
        window.location.reload();
      }, 50);
    }
  } catch (error) {
    console.error('Failed to save language:', error);
  }
}

