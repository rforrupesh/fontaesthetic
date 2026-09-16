import en from './en.json';
import fr from './fr.json';
import ar from './ar.json';
import th from './th.json';
import tr from './tr.json';

export const languages = {
  en: { label: 'English', native: 'English' },
  fr: { label: 'French', native: 'Français' },
  ar: { label: 'Arabic', native: 'العربية' },
  th: { label: 'Thai', native: 'ไทย' },
  tr: { label: 'Turkish', native: 'Türkçe' },
};

export const defaultLang = 'en';

export const translations = { en, fr, ar, th, tr } as const;

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
