// Bold styles. Each style maps A-Z, a-z (and 0-9 where the alphabet has digits) to a Unicode
// alphabet (Mathematical Alphanumeric, or Squared Latin for Blocks). Spaces, punctuation and non-Latin letters are kept as they are.
// Names stay in English on purpose (they are style names).

export interface BoldStyle {
  slug: string;
  name: string;
  convert: (text: string) => string;
}

type Range = { upper: number; lower: number; digit?: number; holes?: Record<string, string> };

const make = (slug: string, name: string, r: Range): BoldStyle => ({
  slug,
  name,
  convert: (text) =>
    Array.from(text)
      .map((ch) => {
        if (r.holes && r.holes[ch]) return r.holes[ch];
        const c = ch.codePointAt(0)!;
        if (c >= 65 && c <= 90) return String.fromCodePoint(r.upper + c - 65);
        if (c >= 97 && c <= 122) return String.fromCodePoint(r.lower + c - 97);
        if (r.digit !== undefined && c >= 48 && c <= 57) return String.fromCodePoint(r.digit + c - 48);
        return ch;
      })
      .join(''),
});

export const BOLD_STYLES: BoldStyle[] = [
  make('bold-serif', 'Bold (serif)', { upper: 0x1d400, lower: 0x1d41a, digit: 0x1d7ce }),
  make('bold-sans', 'Bold (sans)', { upper: 0x1d5d4, lower: 0x1d5ee, digit: 0x1d7ec }),
  make('italic-bold-serif', 'Italic Bold (serif)', { upper: 0x1d468, lower: 0x1d482 }),
  make('italic-bold-sans', 'Italic Bold (sans)', { upper: 0x1d63c, lower: 0x1d656 }),
  make('medieval-bold', 'Medieval Bold', { upper: 0x1d56c, lower: 0x1d586 }),
  // Double-struck has a few capitals that live in the Letterlike Symbols block.
  make('double-struck', 'Double-Struck', {
    upper: 0x1d538, lower: 0x1d552, digit: 0x1d7d8,
    holes: { C: 'ℂ', H: 'ℍ', N: 'ℕ', P: 'ℙ', Q: 'ℚ', R: 'ℝ', Z: 'ℤ' },
  }),
  // Negative squared letters: capitals only, so lowercase maps to the same blocks.
  make('blocks', 'Blocks', { upper: 0x1f170, lower: 0x1f170 }),
];
