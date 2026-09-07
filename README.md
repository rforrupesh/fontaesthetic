# FontAesthetic (Astro)

Structure:
- `src/layouts/BaseLayout.astro` — head, canonical/hreflang (SEO.astro), Navbar + Footer
- `src/layouts/BlogPostLayout.astro` — BaseLayout + Breadcrumb (single posts only)
- `src/components/FancyTextTool.astro` — the 67-style grid, reused across en/fr/es
- `src/scripts/fancy-text-engine.js` — char maps + copy logic (client script)
- `src/scripts/site-chrome.js` — nav toggle + theme switcher
- `src/content/blog/{en,fr,es}/*.md` — blog posts, one file per post per language
- Routes: `/`, `/fr/`, `/es/` · `/blog/`, `/fr/blog/`, `/es/blog/` · `/fancy-text/` (+fr/es) · `/emoji/` (+fr/es, placeholder)

## Commands
```
npm install
npm run dev      # localhost:4321
npm run build    # outputs to dist/ — push dist/ contents to GitHub Pages
```

## Still to do
- Build out `/emoji/` tool (currently a placeholder page)
- Add real content for /about/, /contact/, /privacy/, /terms/ (linked from footer, not yet created)
- Replace `ca-pub-XXXXXXXXXXXXXXXX` in BaseLayout.astro with your real AdSense publisher ID
- Add more blog posts per language in src/content/blog/
