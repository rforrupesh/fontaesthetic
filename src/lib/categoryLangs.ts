import { getCollection } from 'astro:content';
import { languages, defaultLang } from '../i18n';
import { slugify } from './slugify';

// Returns every language that actually has a /blog/category/<slug>/ page,
// i.e. at least one post in that language carries a category whose slug
// matches. Used by the language switcher + hreflang so a category (e.g.
// "Guides") links across languages automatically -- only where the page
// really exists (no 404s), and new translated posts show up with no edits.
export async function categoryLangs(categorySlug: string): Promise<string[]> {
  const posts = await getCollection('blog');
  const found = new Set<string>();
  for (const p of posts) {
    const l = p.id.split('/')[0];
    if (p.data.categories.some((c) => slugify(c) === categorySlug)) found.add(l);
  }
  // keep the order defined in i18n (en first, etc.) and only known languages
  return Object.keys(languages).filter((l) => found.has(l));
}
