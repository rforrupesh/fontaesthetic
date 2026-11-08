// Blog authors registry.
// A post picks an author with `author: "<key>"` in its frontmatter.
// If the field is missing, DEFAULT_AUTHOR is used.
// To add a new author: add one more entry below (see BLOG-GUIDE.md).

export interface Author {
  name: string;         // short/internal name
  displayName: string;  // shown on the site and in SEO schema
  bio: string;          // short bio (post box + author page intro)
  fullBio?: string[];   // optional extra paragraphs shown ONLY on the author page
  role?: string;        // optional, e.g. 'Typography Writer'
  links?: { label: string; url: string }[]; // optional social/profile links (author page)
  type?: 'Organization' | 'Person'; // schema.org type (default: Person)
  image?: string;       // "/images/x.webp" (in public/) or full https URL
  url?: string;         // optional absolute URL of the author's own site/profile (SEO sameAs)
}

export const DEFAULT_AUTHOR = 'editorial-team';

export const authors: Record<string, Author> = {
  'editorial-team': {
    name: 'Editorial Team',
    displayName: 'AestheticFonts Editorial Team',
    bio: 'The AestheticFonts Editorial Team shares helpful guides on font styles, fancy text, typography, and creative text ideas to help users make their content stand out.',
    fullBio: [
      'We cover everything around stylish text: how font styles work, which fancy text suits which platform, and how to use them in bios, captions, usernames and posts.',
      'Our goal is simple: practical, easy-to-follow guides that help you make your content stand out. Every article is written to be useful first, so you can copy an idea and use it right away.',
    ],
    type: 'Organization',
    image: '/logo.svg',
  },
};

export function authorPath(key?: string) {
  return `/blog/author/${key && key in authors ? key : DEFAULT_AUTHOR}/`;
}

export function getAuthor(key?: string): Author {
  return authors[key ?? DEFAULT_AUTHOR] ?? authors[DEFAULT_AUTHOR];
}
