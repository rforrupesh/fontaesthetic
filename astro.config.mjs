import { defineConfig } from 'astro/config';

// Replace with your GitHub Pages repo details
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/fontgen', // change to '/' if using a user/org root page repo
  outDir: './dist',
});
