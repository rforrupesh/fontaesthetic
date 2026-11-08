import en from './en.json';
import fr from './fr.json';
import ar from './ar.json';
import th from './th.json';
import tr from './tr.json';
import id from './id.json';
import vi from './vi.json';
import pl from './pl.json';
import es from './es.json';
import it from './it.json';
import ja from './ja.json';
import de from './de.json';
import pt from './pt.json';

export const languages = {
  en: { label: 'English', native: 'English' },
  fr: { label: 'French', native: 'Français' },
  ar: { label: 'Arabic', native: 'العربية' },
  th: { label: 'Thai', native: 'ไทย' },
  tr: { label: 'Turkish', native: 'Türkçe' },
  id: { label: 'Indonesian', native: 'Bahasa Indonesia' },
  vi: { label: 'Vietnamese', native: 'Tiếng Việt' },
  pl: { label: 'Polish', native: 'Polski' },
  es: { label: 'Spanish', native: 'Español' },
  it: { label: 'Italian', native: 'Italiano' },
  ja: { label: 'Japanese', native: '日本語' },
  de: { label: 'German', native: 'Deutsch' },
  pt: { label: 'Portuguese', native: 'Português' },
};

export const defaultLang = 'en';

export const translations = { en, fr, ar, th, tr, id, vi, pl, es, it, ja, de, pt } as const;

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
