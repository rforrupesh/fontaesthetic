import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// NOTE: When you connect a custom domain later, change:
//   site -> 'https://yourdomain.com'
//   base -> '/'
// For now this is configured for GitHub Pages project site:
// https://rforrupesh.github.io/fontaesthetic/
export default defineConfig({
  site: 'https://rforrupesh.github.io',
  base: '/fontaesthetic/',
  trailingSlash: 'always',
  build: {
    // Astro puts bundled JS/CSS under /_astro/ by default -- renaming it
    // avoids that string showing up in view-source / network requests.
    assets: '_assets',
    // Inline the (small, single) global stylesheet directly into each
    // page's HTML instead of a separate <link> request -- removes a
    // render-blocking network round-trip on every page.
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
