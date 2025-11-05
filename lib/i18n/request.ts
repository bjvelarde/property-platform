import { getRequestConfig } from 'next-intl/server';

import { defaultLocale, locales, type Locale } from './routing';

export default getRequestConfig(async ({ locale }) => {
  // During static generation, locale might be undefined
  // Use default locale as fallback
  let resolvedLocale: Locale = defaultLocale;

  if (locale && locales.includes(locale as Locale)) {
    resolvedLocale = locale as Locale;
  }
  // If locale is undefined (during build), we'll use defaultLocale
  // and rely on runtime middleware to handle the actual locale

  try {
    const messages = (await import(`../../public/locales/${resolvedLocale}.json`)).default;

    return {
      locale: resolvedLocale,
      messages,
      timeZone: 'UTC',
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${resolvedLocale}`, error);

    // Fallback to English if the locale file doesn't exist
    const fallbackMessages = (await import(`../../public/locales/${defaultLocale}.json`)).default;

    return {
      locale: defaultLocale,
      messages: fallbackMessages,
      timeZone: 'UTC',
    };
  }
});
