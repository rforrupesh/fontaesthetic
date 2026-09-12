import { defineConfig } from 'astro/config';

// NOTE: When you connect a custom domain later, change:
//   site -> 'https://yourdomain.com'
//   base -> '/'
// For now this is configured for GitHub Pages project site:
// https://rforrupesh.github.io/fontaesthetic/
export default defineConfig({
  site: 'https://rforrupesh.github.io',
  base: '/fontaesthetic/',
  trailingSlash: 'always',
});
