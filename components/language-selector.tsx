'use client';

import { useLocale } from 'next-intl';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const languages = [
  { value: 'en', label: 'English' },
  { value: 'zh-TW', label: '繁體中文' },
  { value: 'zh-CN', label: '简体中文' },
  { value: 'ko', label: '한국어' },
  { value: 'ja', label: '日本語' },
  { value: 'hi', label: 'हिन्दी' },
] as const;

export default function LanguageSelector() {
  const locale = useLocale();

  const handleLanguageChange = (newLocale: string) => {
    // Simple full page reload to avoid any hydration issues
    const currentPath = window.location.pathname;
    const segments = currentPath.split('/');
    segments[1] = newLocale;
    const newPathname = segments.join('/');
    window.location.href = newPathname;
  };

  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.value} value={language.value}>
            {language.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
