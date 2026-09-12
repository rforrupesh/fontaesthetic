import en from './en.json';
import fr from './fr.json';
import hi from './hi.json';

export const languages = {
  en: { label: 'English', native: 'English' },
  fr: { label: 'French', native: 'Français' },
  hi: { label: 'Hindi', native: 'हिन्दी' },
};

export const defaultLang = 'en';

export const translations = { en, fr, hi } as const;

export type Lang = keyof typeof translations;

export function getPath(lang: string, path: string = '/') {
  const base = import.meta.env.BASE_URL; // '/fontaesthetic/'
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
  if (lang === defaultLang) {
    return clean ? `${base}${clean}/` : base;
  }
  return clean ? `${base}${lang}/${clean}/` : `${base}${lang}/`;
}

export function t(lang: string) {
  return translations[(lang as Lang)] || translations[defaultLang];
}
