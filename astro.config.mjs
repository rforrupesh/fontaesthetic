import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// NOTE: When you connect a custom domain later, change:
//   site -> 'https://yourdomain.com'
//   base -> '/'
// For now this is configured for GitHub Pages project site:
// https://rforrupesh.github.io/fontaesthetic/
export default defineConfig({
  site: 'https://rforrupesh.github.io',
  base: '/fontaesthetic/',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // tag pages are noindex, so keep them out of the sitemap
      filter: (page) => !page.includes('/blog/tag/'),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', fr: 'fr-FR', ar: 'ar', th: 'th-TH', tr: 'tr-TR', id: 'id-ID', vi: 'vi-VN', pl: 'pl-PL', es: 'es-ES', it: 'it-IT', ja: 'ja-JP', de: 'de-DE', pt: 'pt-BR' },
      },
    }),
  ],
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
    build: {
      // Astro only inlines a client script when its bundled chunk has no
      // imports AND fits under this limit (default 4 KiB). The font tool's
      // chunk is ~15 KiB, so raising the ceiling ships it inside the HTML and
      // leaves the page with zero JS requests in its load chain.
      assetsInlineLimit: 24576,
    },
  },
});
