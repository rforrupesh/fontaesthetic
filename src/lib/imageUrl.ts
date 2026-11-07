// Turns a frontmatter `image:` value into a working URL for <img src>.
//  - "https://..."            -> used as is
//  - "/images/photo.webp"     -> "/fontaesthetic/images/photo.webp" (adds the site base path)
// Put image files in the `public/` folder (e.g. public/images/photo.webp).
export function imgUrl(image?: string): string | undefined {
  if (!image) return undefined;
  if (/^https?:\/\//.test(image)) return image;
  return import.meta.env.BASE_URL + image.replace(/^\/+/, '');
}
