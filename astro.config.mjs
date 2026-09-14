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
    // Inline the (small) global stylesheet directly into each page's <head>
    // instead of a separate <link> tag. This removes a render-blocking
    // network request from the critical path (was costing ~150ms before
    // first paint), at the cost of a few KB duplicated per HTML page --
    // a good trade-off since the whole site's CSS is under ~6KB.
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
