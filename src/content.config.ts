import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { authors, DEFAULT_AUTHOR } from './data/authors';
import { firstCommitDate } from './lib/gitDate';

// Wrap the glob loader so a post WITHOUT `date:` in its frontmatter automatically
// gets its publish date from git (first commit of the file). A `date:` written in
// the frontmatter always wins (custom date).
const globLoader = glob({
  pattern: '**/*.md',
  base: './src/content/blog',
  generateId: ({ entry }) => entry.replace(/\.md$/, ''),
});
const blogLoader = {
  ...globLoader,
  load: async (ctx: any) =>
    globLoader.load({
      ...ctx,
      parseData: async (entry: any) => {
        const data = { ...entry.data };
        if (!data.date) data.date = firstCommitDate(entry.filePath) ?? new Date();
        return ctx.parseData({ ...entry, data });
      },
    }),
};

const blog = defineCollection({
  // Loader: file path is the id (language folder stays part of it); see blogLoader above.
  loader: blogLoader,
  schema: z.object({
    translationId: z.string(),
    slug: z.string().optional(), // if omitted, filename is used as slug
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(), // optional in the .md file: if missing, the first git commit date is used
    updated: z.coerce.date().optional(), // optional custom 'last updated'; if missing, the last git commit date is used
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
