import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Custom domain on GitHub Pages: https://aestheticfonts.in/
export default defineConfig({
  site: 'https://aestheticfonts.in',
  base: '/',
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
      // Fonts must NOT be inlined: base64 woff2 got copied into the CSS of every
      // page (218 pages x ~230 KB = 72 MB dist, very slow deploy). Keep them as
      // cached files; only small non-font assets / the tool script are inlined.
      assetsInlineLimit: (file, content) => {
        if (/\.(woff2?|ttf|otf|eot)$/i.test(file)) return false;
        return content.length <= 24576;
      },
    },
  },
});
