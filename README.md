# FontAesthetic — Multilingual Font Generator (Astro)

Live (GitHub Pages project site): https://rforrupesh.github.io/fontaesthetic/

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Push this repo to GitHub as `rforrupesh/fontaesthetic`.
2. In the repo: **Settings -> Pages -> Source -> GitHub Actions**.
3. Push to `main` -- `.github/workflows/deploy.yml` builds and deploys automatically.

## Moving to a custom domain later

Edit `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://yourdomain.com',
  base: '/',
  trailingSlash: 'always',
});
```

Add a `public/CNAME` file containing your domain, then set it in GitHub -> Settings -> Pages.
No other code changes are needed -- all internal links use `import.meta.env.BASE_URL`.

## Adding a new language (e.g. Spanish "es")

1. `src/i18n/es.json` -- copy `en.json` and translate every value.
2. Register it in `src/i18n/index.ts` -> `languages` object.
3. `src/pages/es/` -- copy `index.astro`, `about.astro`, `contact.astro`,
   `privacy-policy.astro`, `blog/index.astro`, `blog/[slug].astro` from
   `fr/` and change `lang = 'fr'` to `lang = 'es'` (and `startsWith('fr/')`
   to `startsWith('es/')`).
4. `src/content/blog/es/` -- add translated articles (see below).

## Adding a new blog article

Create one `.md` file per language inside `src/content/blog/<lang>/`.

```md
---
translationId: "unique-id-shared-across-all-languages"
slug: "custom-url-slug"        # optional, omit to use the filename as the slug
title: "Article Title"
description: "Short SEO description"
date: 2024-08-01
image: "/images/cover.jpg"      # optional
tags: ["guide", "fonts"]
---

## Heading

Your content here (plain Markdown). Headings (## / ###) automatically
appear in the sidebar Table of Contents.
```

Key rules:
- `translationId` must be identical across all language versions of the
  same article -- it links them for the language switcher, hreflang tags,
  and canonical URLs.
- `slug` (and therefore the URL) can be completely different per language
  for SEO, e.g. `how-to-use-fonts` (en) vs `comment-utiliser-polices` (fr).
  If you omit `slug`, the filename is used instead.
- `tags` drive the "Related Posts" section (same-language articles sharing
  at least one tag).

## Editing shared UI text (Navbar / Footer / Sidebar / Tool labels)

All shared strings live in `src/i18n/en.json`, `src/i18n/fr.json`,
`src/i18n/hi.json` under matching keys (`nav.*`, `footer.*`, `sidebar.*`,
`tool.*`, `blog.*`). Edit the value, not the key, and it updates everywhere
that key is used.

## Project structure

```
src/
  pages/                 routes: index/about/contact/privacy-policy + blog,
                          duplicated per language under fr/, hi/
  content/blog/<lang>/   blog article markdown files
  content.config.ts      blog collection schema
  i18n/<lang>.json        translation key/value files
  i18n/index.ts           language list + getPath()/t() helpers
  components/             Navbar, Footer, Sidebar, LanguageSwitcher, FontTool
  layouts/BaseLayout.astro   canonical + hreflang + shared <head>
  styles/global.css       design tokens (CSS variables) + base styles
```
