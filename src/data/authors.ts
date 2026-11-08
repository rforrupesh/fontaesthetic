// Blog authors registry.
// A post picks an author with `author: "<key>"` in its frontmatter.
// If the field is missing, DEFAULT_AUTHOR is used.
// To add a new author: add one more entry below (see BLOG-GUIDE.md).

export interface Author {
  name: string;         // short/internal name
  displayName: string;  // shown on the site and in SEO schema
  bio: string;
  type?: 'Organization' | 'Person'; // schema.org type (default: Person)
  image?: string;       // "/images/x.webp" (in public/) or full https URL
  url?: string;         // optional absolute URL (profile / social), used in SEO schema
}

export const DEFAULT_AUTHOR = 'editorial-team';

export const authors: Record<string, Author> = {
  'editorial-team': {
    name: 'Editorial Team',
    displayName: 'AestheticFonts Editorial Team',
    bio: 'The AestheticFonts Editorial Team shares helpful guides on font styles, fancy text, typography, and creative text ideas to help users make their content stand out.',
    type: 'Organization',
    image: '/logo.svg',
  },
};

export function getAuthor(key?: string): Author {
  return authors[key ?? DEFAULT_AUTHOR] ?? authors[DEFAULT_AUTHOR];
}
