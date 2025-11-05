export const locales = ['en', 'zh-TW', 'zh-CN', 'ko', 'ja', 'hi'] as const;
export const defaultLocale = 'en' as const;
export const localePrefix = 'always'; // Changed from 'as-needed' to 'always'

export type Locale = (typeof locales)[number];

export const routing = {
  locales,
  defaultLocale,
  localePrefix,
} as const;
