// Turns any tag/category text into a lowercase, URL-safe slug.
// e.g. "Guides" -> "guides", "Bold Serif" -> "bold-serif"
export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
