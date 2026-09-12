import { defineConfig } from 'astro/config';

// GitHub Pages project site config.
// Jab custom domain aayega, tab:
//  - site: 'https://yourdomain.com'
//  - base: '/'
// abhi ke liye project-pages URL use ho raha hai:
export default defineConfig({
  site: 'https://rforrupesh.github.io',
  base: '/fontaesthetic/',
  trailingSlash: 'always'
});
