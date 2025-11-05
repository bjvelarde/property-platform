import { useLocale } from 'next-intl';
import NextLink from 'next/link';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function Link({ href, children, ...props }: LinkProps) {
  const locale = useLocale();

  // If we're at the root path (/), don't add locale prefix
  // Otherwise, add the current locale
  const hrefWithLocale = href.startsWith('/') && locale !== 'en' ? `/${locale}${href}` : href;

  return (
    <NextLink href={hrefWithLocale} {...props}>
      {children}
    </NextLink>
  );
}
