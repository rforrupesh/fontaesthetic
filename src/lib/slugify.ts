// Turns any tag/category text into a lowercase, URL-safe slug.
// e.g. "Guides" -> "guides", "Bold Serif" -> "bold-serif"
// Keeps letters from any script (Devanagari, accented Latin, etc.) instead
// of stripping them -- a plain [^a-z0-9] filter would silently turn a
// Hindi/French tag into an empty string and break its URL.
export function slugify(value: string): string {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-') // whitespace/underscore -> hyphen
    .replace(/[^\p{L}\p{N}\p{M}-]+/gu, '') // strip punctuation, keep letters/numbers/marks/hyphens (any language)
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  // Extremely rare fallback: if a tag is made entirely of symbols/emoji
  // with no letters or numbers at all, don't ship an empty URL segment.
  return slug || 'tag';
}
