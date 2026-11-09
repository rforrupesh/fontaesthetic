// Custom sitemap generator (no XSLT, plain XML per Google's sitemap guidelines).
//
// Output (in dist/):
//   sitemap.xml                 -> sitemap index (submit this one to Google)
//   post-sitemap.xml            -> blog posts   (100 per file: post-sitemap2.xml, post-sitemap3.xml ...)
//   page-sitemap.xml            -> home, about, contact, privacy, blog index/pagination
//   category-sitemap.xml        -> blog category pages
//   author-sitemap.xml          -> blog author pages
//
// Per Google: only <loc> and an ACCURATE <lastmod> are used (changefreq/priority
// are ignored), so only those are written. Hreflang alternates are included.
// Tag pages and 404 are noindex/excluded.
import { writeFileSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { lastCommitDate } from '../lib/gitDate.ts';

const MAX_PER_FILE = 100; // Google allows 50,000 URLs; we split earlier for easy management.
const MAX_BYTES = 40 * 1024 * 1024; // Google's hard limit is 50 MB uncompressed; keep a safe margin.

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export default function sitemap({ site, locales, defaultLocale = 'en' }) {
  const base = site.replace(/\/$/, '');
  const langs = Object.keys(locales);
  let root = '';

  const fileDate = (rel) => {
    const abs = join(root, rel);
    if (!existsSync(abs)) return undefined;
    return lastCommitDate(rel) ?? statSync(abs).mtime;
  };

  return {
    name: 'custom-sitemap',
    hooks: {
      'astro:config:done': ({ config }) => {
        root = fileURLToPath(config.root);
      },
      'astro:build:done': ({ dir, pages }) => {
        const outDir = fileURLToPath(dir);
        const now = new Date();

        // ---- classify every built page ------------------------------------
        const parse = (pathname) => {
          const p = '/' + pathname.replace(/^\/|\/$/g, '');
          const parts = p.split('/').filter(Boolean);
          let lang = defaultLocale;
          if (parts.length && langs.includes(parts[0]) && parts[0] !== defaultLocale) lang = parts.shift();
          return { lang, parts };
        };

        const items = [];
        for (const { pathname } of pages) {
          const { lang, parts } = parse(pathname);
          if (parts[0] === '404') continue;
          if (parts[0] === 'blog' && parts[1] === 'tag') continue; // noindex
          let type = 'page';
          let slug;
          if (parts[0] === 'blog' && parts[1] === 'category') type = 'category';
          else if (parts[0] === 'blog' && parts[1] === 'author') type = 'author';
          else if (parts[0] === 'blog' && parts.length === 2 && !/^\d+$/.test(parts[1])) {
            type = 'post';
            slug = parts[1];
          }
          const url = `${base}/${pathname.replace(/^\/|\/$/g, '')}${pathname.replace(/^\/|\/$/g, '') ? '/' : ''}`;
          items.push({ url, lang, parts, type, slug });
        }

        // ---- lastmod -------------------------------------------------------
        const newestPostByLang = {};
        const newestPost = { d: undefined };
        for (const it of items) {
          if (it.type !== 'post') continue;
          const d = fileDate(`src/content/blog/${it.lang}/${it.slug}.md`) ?? now;
          it.lastmod = d;
          if (!newestPostByLang[it.lang] || d > newestPostByLang[it.lang]) newestPostByLang[it.lang] = d;
          if (!newestPost.d || d > newestPost.d) newestPost.d = d;
        }
        const pageSource = (it) => {
          const dir = it.lang === defaultLocale ? 'src/pages' : `src/pages/${it.lang}`;
          const p = it.parts;
          if (p.length === 0) return `${dir}/index.astro`;
          if (p.length === 1 && !/^\d+$/.test(p[0])) return `${dir}/${p[0]}.astro`;
          if (p[0] === 'blog') return `${dir}/blog/index.astro`;
          return undefined;
        };
        for (const it of items) {
          if (it.type === 'post') continue;
          const listing = it.type === 'category' || it.type === 'author' || (it.parts[0] === 'blog');
          // listing pages change whenever a post changes -> newest post date
          const postDate = newestPostByLang[it.lang] ?? newestPost.d;
          const own = !listing || it.parts.length === 1 ? fileDate(pageSource(it) ?? '') : undefined;
          let d = listing ? postDate : own;
          d = d ?? postDate ?? now;
          it.lastmod = d;
        }

        // ---- hreflang alternates (same path across languages) -------------
        const groups = new Map();
        for (const it of items) {
          const key = it.parts.join('/');
          if (!groups.has(key)) groups.set(key, []);
          groups.get(key).push(it);
        }

        const urlXml = (it) => {
          const alts = groups.get(it.parts.join('/')) ?? [];
          let x = `<url><loc>${esc(it.url)}</loc><lastmod>${it.lastmod.toISOString()}</lastmod>`;
          if (alts.length > 1) {
            for (const a of alts) {
              x += `<xhtml:link rel="alternate" hreflang="${esc(locales[a.lang] ?? a.lang)}" href="${esc(a.url)}"/>`;
            }
            const def = alts.find((a) => a.lang === defaultLocale);
            if (def) x += `<xhtml:link rel="alternate" hreflang="x-default" href="${esc(def.url)}"/>`;
          }
          return x + '</url>';
        };

        // ---- write chunks + index -----------------------------------------
        const index = [];
        const order = ['post', 'page', 'category', 'author'];
        for (const type of order) {
          const list = items
            .filter((i) => i.type === type)
            .sort((a, b) => (type === 'post' ? b.lastmod - a.lastmod : a.url.localeCompare(b.url)));
          // split by URL count (100) AND by file size (40 MB), whichever hits first
          const chunks = [];
          let cur = [];
          let bytes = 0;
          for (const it of list) {
            const x = urlXml(it);
            const b = Buffer.byteLength(x) + 1;
            if (cur.length && (cur.length >= MAX_PER_FILE || bytes + b > MAX_BYTES)) {
              chunks.push(cur);
              cur = [];
              bytes = 0;
            }
            cur.push({ it, x });
            bytes += b;
          }
          if (cur.length) chunks.push(cur);
          chunks.forEach((chunk, idx) => {
            const n = idx + 1;
            const name = `${type}-sitemap${n === 1 ? '' : n}.xml`;
            const xml =
              `<?xml version="1.0" encoding="UTF-8"?>\n` +
              `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
              chunk.map((c) => c.x).join('\n') +
              `\n</urlset>\n`;
            writeFileSync(join(outDir, name), xml);
            const newest = chunk.reduce((m, c) => (c.it.lastmod > m ? c.it.lastmod : m), chunk[0].it.lastmod);
            index.push({ name, lastmod: newest });
          });
        }
        const indexXml =
          `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          index
            .map((s) => `<sitemap><loc>${base}/${s.name}</loc><lastmod>${s.lastmod.toISOString()}</lastmod></sitemap>`)
            .join('\n') +
          `\n</sitemapindex>\n`;
        writeFileSync(join(outDir, 'sitemap.xml'), indexXml);
        console.log(`[sitemap] sitemap.xml + ${index.length} sitemap files (${items.length} URLs)`);
      },
    },
  };
}
