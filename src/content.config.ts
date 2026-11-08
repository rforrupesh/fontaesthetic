import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { authors, DEFAULT_AUTHOR } from './data/authors';

const blog = defineCollection({
  // Use the file path itself as the id (e.g. "en/how-to-use-fonts") instead of
  // letting a frontmatter `slug` field override it — we need the language
  // folder to stay part of the id so we can filter posts per language.
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    translationId: z.string(),
    slug: z.string().optional(), // if omitted, filename is used as slug
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(), // set when you edit a post; shown on page + dateModified in SEO
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    // key from src/data/authors.ts; defaults to the Editorial Team
    author: z
      .string()
      .default(DEFAULT_AUTHOR)
      .refine((k) => k in authors, { message: `Unknown author. Add it to src/data/authors.ts. Known: ${Object.keys(authors).join(', ')}` }),
  }),
});

export const collections = { blog };
