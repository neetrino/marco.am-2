// Language utilities
export const LANGUAGES = {
  en: { code: 'en', name: 'English', nativeName: 'English' },
  hy: { code: 'hy', name: 'Armenian', nativeName: 'Հայերեն' },
  ru: { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  ka: { code: 'ka', name: 'Georgian', nativeName: 'ქართული' },
} as const;

export type LanguageCode = keyof typeof LANGUAGES;

/** localStorage key and cookie name for locale (kept in sync for SSR + client). */
export const LANGUAGE_STORAGE_KEY = 'shop_language';

const LANGUAGE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

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
 * Writes the locale cookie so Server Components can read it (see `getServerLanguage`).
 */
export function persistLanguageCookie(language: LanguageCode): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${LANGUAGE_STORAGE_KEY}=${encodeURIComponent(language)};path=/;max-age=${LANGUAGE_COOKIE_MAX_AGE_SECONDS};SameSite=Lax`;
}

/** Current cookie value for locale, if set. */
export function readLanguageCookie(): LanguageCode | null {
  if (typeof document === 'undefined') return null;
  const escaped = LANGUAGE_STORAGE_KEY.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  if (!match?.[1]) return null;
  const raw = decodeURIComponent(match[1]);
  return raw in LANGUAGES ? (raw as LanguageCode) : null;
}

export function setStoredLanguage(language: LanguageCode): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    persistLanguageCookie(language);
    window.dispatchEvent(new Event('language-updated'));
  } catch (error) {
    console.error('Failed to save language:', error);
  }
}

