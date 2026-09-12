# FontAesthetic

Multi-language font generator tool + blog, built with Astro. Deployed on GitHub Pages.

## Current URL
https://rforrupesh.github.io/fontaesthetic/

## Local dev
```
npm install
npm run dev
```

## Build
```
npm run build
```
Output goes to `dist/`.

## Deploy
Push to `main` — GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys automatically to GitHub Pages.

Repo settings me: **Settings → Pages → Source → GitHub Actions** select karna hoga (one-time setup).

## Custom domain add karne ke baad
1. `astro.config.mjs` me:
   ```js
   site: 'https://yourdomain.com',
   base: '/',
   ```
2. `public/CNAME` file banao jisme sirf tumhara domain likha ho (e.g. `yourdomain.com`).
3. GitHub repo → Settings → Pages → Custom domain me domain add karo, DNS me CNAME/A record point karo.

## Structure
- `src/pages/` — English pages (root)
- `src/pages/fr/`, `src/pages/hi/` — French & Hindi mirrors
- `src/content/blog/{en,fr,hi}/` — blog markdown, linked via `translationId`
- `src/i18n/{en,fr,hi}.json` — UI strings
- `src/components/FontTool.astro` — the font generator tool
