# Blog Post Guide (AestheticFonts)

Ye guide batata hai ki blog post kaise banate hain, kaun-kaun si cheezein post me kar sakte ho, aur author kaise badalte hain.

---

## 1. Naya post kaise banayein

1. Post ki `.md` file **language folder** me banao:

   | Language | Folder |
   |---|---|
   | English | `src/content/blog/en/` |
   | French | `src/content/blog/fr/` |
   | Arabic | `src/content/blog/ar/` |
   | Thai | `src/content/blog/th/` |
   | Turkish | `src/content/blog/tr/` |
   | Indonesian | `src/content/blog/id/` |

2. File ke upar `---` ke beech **frontmatter** likho (neeche poori list hai), uske baad normal Markdown content.
3. Image ho to `public/images/` me rakho.
4. `npm run dev` se local check karo, phir push/deploy karo.

Folder ka naam hi post ki language decide karta hai. Galat folder = galat language page par post dikhega.

---

## 2. Frontmatter: saari fields

```md
---
translationId: "best-fonts-2024"
slug: "best-font-styles-2024"
title: "Best Font Styles Trending in 2024"
description: "A roundup of the most popular stylish font trends this year."
date: 2024-07-02
updated: 2025-01-15
image: "/images/my-image.webp"
author: "editorial-team"
tags: ["trends", "fonts"]
categories: ["Guides"]
---
```

| Field | Zaroori? | Kya karta hai |
|---|---|---|
| `translationId` | **Haan** | Alag-alag languages ke same post ko jodta hai (hreflang + language switcher). Har language me same value rakho. |
| `title` | **Haan** | Post ka title (H1 + SEO title). |
| `description` | **Haan** | Meta description aur listing card text. ~150-160 characters best. |
| `date` | **Haan** | Publish date. Format: `YYYY-MM-DD`. |
| `slug` | Nahi | URL ka hissa. Na likho to file ka naam use hota hai. |
| `updated` | Nahi | Manual "last updated" date. Git commit date bhi automatic count hoti hai, jo bhi nayi ho wahi dikhti hai. |
| `image` | Nahi | Featured image. `/images/x.webp` (public folder) ya poora `https://...` URL. |
| `author` | Nahi | Author key. Na likho to **Editorial Team** (default). Section 3 dekho. |
| `tags` | Nahi | Chhote keywords. Related posts inhi se bante hain. |
| `categories` | Nahi | Bade groups (jaise "Guides"). Post ke upar pills me dikhte hain. |

Notes:
- Kisi bhi field me galti ho (jaise `title` missing) to build error dega. Ye achha hai, galat post live nahi jaata.
- `tags` aur `categories` ke apne pages bante hain: `/blog/tag/<tag>/` aur `/blog/category/<category>/`. Tag pages `noindex` hain aur sitemap me nahi aate.
- Har language me tags/categories us language ke words me likho (jaise French me `"polices"`).

---

## 3. Author

### Default
Kuch na likho to post par **AestheticFonts Editorial Team** dikhta hai:
- Title ke neeche: "By AestheticFonts Editorial Team · Last updated ..."
- Post ke end me "About the author" box (logo + bio)
- SEO (JSON-LD) me author bhi yahi jaata hai

### Author page (full bio + contributions)
Har author ka apna page banta hai, har language me:

```
/blog/author/<key>/        -> https://rforrupesh.github.io/fontaesthetic/blog/author/editorial-team/
/fr/blog/author/<key>/     (aur ar, th, tr, id ke liye bhi)
```

- Post me author ka naam (title ke neeche) aur "About the author" box ka **View full profile** link isi page par le jaate hain.
- Page par dikhta hai: photo, role, **full bio**, links, **Contributions** (kitne articles, latest article ki date, kin topics/categories par likha) aur us author ke saare posts ki list (naye pehle).
- Ye page index hota hai aur sitemap me aata hai. Article ke SEO schema me author ka URL bhi yahi hota hai.
- Posts apne aap judte hain: jis post me `author: "<key>"` hai wo us author ke page par aa jaata hai. Alag se kuch nahi karna.

### Post ka author badalna
Frontmatter me `author` likho, key `src/data/authors.ts` se:

```md
author: "rupesh"
```

### Naya author add karna
`src/data/authors.ts` kholo aur `authors` me ek entry add karo:

```ts
'rupesh': {
  name: 'Rupesh',
  displayName: 'Rupesh Kumar',      // site par yahi dikhta hai
  bio: 'Rupesh writes about fonts and typography.',
  type: 'Person',                   // 'Person' ya 'Organization'
  image: '/images/rupesh.webp',     // optional, public/ me rakho
  url: 'https://example.com/rupesh', // optional, apni website/profile (SEO sameAs + button)
  role: 'Typography Writer',         // optional, author page par naam ke upar dikhta hai
  fullBio: [                         // optional, author page par extra paragraphs
    'Pehla lamba paragraph...',
    'Doosra paragraph...',
  ],
  links: [                           // optional, author page par buttons
    { label: 'Instagram', url: 'https://instagram.com/...' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/...' },
  ],
},
```

- Key (`'rupesh'`) chhoti, lowercase, bina space ke rakho. Wahi `author:` me likhte hain.
- `image` na do to initials ka circle dikhta hai.
- **Author image ka size:** **SQUARE (1:1), 400 × 400 px**, format `.webp` ya `.jpg`, 50 KB se kam. Chehra/logo bilkul beech me rakho, kyunki image **gol (circle)** me kat ke dikhti hai (post box me 56px, author page par 96px). Kam se kam 200 × 200 px (retina ke liye 2x). Wide/lambi image (jaise site ka logo) mat lagao, wo kat jaati hai. Image `public/images/` me rakho aur `image: '/images/naam.webp'` likho.
- `bio` chhota rakho (post ke box me aata hai). Lamba bio `fullBio` me likho, wo sirf author page par dikhta hai.
- `author: "kuch-galat"` likha to build error aayega aur batayega kaun-kaun si keys available hain.
- Default author badalna ho to `DEFAULT_AUTHOR` ki value badlo.
- Labels ("By", "About the author", "Contributions" etc.) 6 languages me translate hain (`src/i18n/*.json`, `blog` section).
- **Bio ko har language me likhna (SEO ke liye zaroori):** French page par English bio dikhana mixed-language content hota hai. Isliye `displayName`, `bio`, `fullBio`, `role` ko do tarah se likh sakte ho:

```ts
bio: 'Ek hi text sab languages me',          // simple

bio: {                                       // language-wise (recommended)
  en: 'English bio',
  fr: 'Bio en français',
  ar: '...', th: '...', tr: '...', id: '...',
},
fullBio: {
  en: ['Paragraph 1', 'Paragraph 2'],
  fr: ['Paragraphe 1', 'Paragraphe 2'],
},
```

  Jis language ka text nahi likha, wahan English dikhta hai. Editorial Team ka bio 6 languages me already likha hua hai. Brand/naam (`displayName`) English me rakha hai taaki SEO me naam ek hi rahe, chaho to wo bhi language-wise kar sakte ho.

---

## 4. Post ke andar kya kar sakte ho (Markdown)

```md
## Heading 2        <- Table of Contents me aata hai
### Heading 3       <- TOC me sub-item
#### Heading 4      <- TOC me nahi aata

**bold**, *italic*, ~~strike~~
[Link text](https://example.com)
![Alt text](/fontaesthetic/images/pic.webp)

- bullet list
1. numbered list

> Quote

`inline code`

| Col 1 | Col 2 |
|-------|-------|
| a     | b     |
```

- **Table of Contents** sirf H2 aur H3 se automatic banta hai (desktop left sidebar + mobile dropdown). Post me H1 (`#`) mat likho, title already H1 hai.
- **Raw HTML** bhi chalta hai, jaise `<a href="...">text</a>`.
- **Post ke andar image** ke liye path me site base lagta hai: `/fontaesthetic/images/pic.webp`. Domain connect karke base `/` ho jaaye to path `/images/pic.webp` ho jayega.
- Frontmatter wali `image:` me base apne aap lag jaata hai, wahan sirf `/images/pic.webp` likho.

---

## 5. Jo apne aap hota hai (tumhe kuch nahi karna)

- Date ke saath "Last updated" (git commit date ya `updated`, jo nayi ho)
- Table of Contents (desktop + mobile)
- Share buttons
- Related posts (same tags wale, max 3)
- Breadcrumb
- SEO: canonical, hreflang (translationId se), Article + Breadcrumb + Organization schema
- Sitemap
- Ad slots (desktop right column)
- Tags aur categories ke listing pages

---

## 6. Post ko translate karna (multi-language)

1. English post ki file copy karo, doosri language folder me daalo (jaise `fr/`).
2. `translationId` **bilkul same** rakho.
3. `slug`, `title`, `description`, `tags`, `categories` us language me badlo.
4. Content translate karo.

Same `translationId` hone se language switcher ussi post ke translated version par jaata hai. Agar kisi language me translation nahi hai to switcher wahan nahi dikhata.

---

## 7. Publish se pehle checklist

- [ ] `translationId`, `title`, `description`, `date` bhare hain
- [ ] `slug` chhota, lowercase, hyphen wala (`best-font-styles-2024`)
- [ ] `description` 150-160 characters ke aas-paas
- [ ] Image `public/images/` me hai aur `.webp` jaisi halki hai
- [ ] Post me sirf H2/H3 headings (H1 nahi)
- [ ] `author` sahi hai (ya khali chhoda for Editorial Team)
- [ ] `npm run build` bina error ke chalta hai

---

## 8. Useful commands

```bash
npm install        # pehli baar
npm run dev        # local preview
npm run build      # production build (galtiyan yahin pakdi jaati hain)
```

## 9. Important files

| File | Kaam |
|---|---|
| `src/content.config.ts` | Frontmatter fields ka schema |
| `src/data/authors.ts` | Authors ki list aur default author |
| `src/components/AuthorBox.astro` | Byline aur "About the author" box ka design |
| `src/pages/blog/author/[author].astro` (aur `fr/ar/th/tr/id` ke) | Author page (bio + contributions) |
| `src/pages/blog/[slug].astro` (aur `fr/ar/th/tr/id` ke) | Post page ka layout |
| `src/components/schema/ArticleSchema.astro` | SEO Article schema |
| `src/i18n/*.json` | Site ke translated labels |
