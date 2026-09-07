// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://fontaesthetic.in',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'es'],
    routing: {
      prefixDefaultLocale: false, // en stays at "/", fr at "/fr/", es at "/es/"
    },
  },
});
