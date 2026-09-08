import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string(),
    lang: z.enum(['en', 'fr', 'id']),
    categories: z.array(z.string()).default([]),
    excerpt: z.string().optional(),
  }),
});

export const collections = { blog };
