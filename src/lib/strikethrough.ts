// Strikethrough styles. Every style turns plain text into copy-paste Unicode text:
// a styled alphabet (mono / sans / bold, or plain) + a combining mark after each letter.
// Names stay in English on purpose (they are style names, like the fonts in the Bio Maker).

export interface StrikeStyle {
  slug: string;
  name: string;
  convert: (text: string) => string;
}

const STRIKE = '̶'; // combining long stroke overlay
const SLASH = '̷'; // combining short solidus overlay
const DOUBLE = '̳'; // combining double low line
const WAVE = '̽'; // combining x above

type Range = { upper: number; lower: number; digit?: number };
const MONO: Range = { upper: 0x1d670, lower: 0x1d68a, digit: 0x1d7f6 };
const SANS: Range = { upper: 0x1d5a0, lower: 0x1d5ba, digit: 0x1d7e2 };
const BOLD: Range = { upper: 0x1d400, lower: 0x1d41a, digit: 0x1d7ce };

function alphabet(text: string, r?: Range): string {
  if (!r) return text;
  let out = '';
  for (const ch of Array.from(text)) {
    const c = ch.codePointAt(0)!;
    if (c >= 65 && c <= 90) out += String.fromCodePoint(r.upper + c - 65);
    else if (c >= 97 && c <= 122) out += String.fromCodePoint(r.lower + c - 97);
    else if (r.digit && c >= 48 && c <= 57) out += String.fromCodePoint(r.digit + c - 48);
    else out += ch;
  }
  return out;
}

// Adds the mark after every visible character. Whitespace is skipped, because a mark on
// a space renders as a stray floating symbol.
function mark(text: string, code: string): string {
  return Array.from(text).map((c) => (/\s/.test(c) ? c : c + code)).join('');
}

const make = (slug: string, name: string, range: Range | undefined, code: string): StrikeStyle => ({
  slug,
  name,
  convert: (t) => mark(alphabet(t, range), code),
});

export const STRIKE_STYLES: StrikeStyle[] = [
  make('mono-strike', 'Mono Strike', MONO, STRIKE),
  make('mono-slash', 'Mono Slash', MONO, SLASH),
  make('clean-strike', 'Clean Strike', SANS, STRIKE),
  make('clean-slash', 'Clean Slash', SANS, SLASH),
  { slug: 'blackout', name: 'Blackout', convert: (t) => Array.from(t).map((c) => (/\s/.test(c) ? c : '█')).join('') },
  make('classic-strike', 'Classic Strike', undefined, STRIKE),
  make('diagonal-strike', 'Diagonal Strike', undefined, SLASH),
  make('double-line', 'Double Line', undefined, DOUBLE),
  make('wave-strike', 'Wave Strike', undefined, WAVE),
  make('bold-strike', 'Bold Strike', BOLD, STRIKE),
];
