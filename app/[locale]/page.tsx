import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

import LanguageSelector from '@/components/language-selector';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });
  const navT = await getTranslations({ locale, namespace: 'Navigation' });

  return (
    <main className="p-6 font-sans text-foreground">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold" aria-label={t('title')}>
          {t('title')}
        </h1>
        <LanguageSelector />
      </header>

      <section
        className="mb-4 p-3 rounded bg-accent text-accent-foreground shadow-sm"
        aria-live="polite"
      >
        <strong>✅ Locale Working:</strong> {locale}
      </section>

      <p className="text-muted-foreground mt-2">{t('description')}</p>

      <nav className="mt-6 space-x-4" aria-label="Main navigation">
        <Link href="/dashboard" className="text-primary hover:underline">
          {navT('dashboard')}
        </Link>
        <Link href="/properties" className="text-primary hover:underline">
          {navT('properties')}
        </Link>
      </nav>

      {/* Optional: Role hint for ARTA™ progression */}
      <div className="mt-6 text-sm text-muted-foreground">
        {t('roleHint')} {/* e.g., “Start browsing to become a Prospect” */}
      </div>
    </main>
  );
}
