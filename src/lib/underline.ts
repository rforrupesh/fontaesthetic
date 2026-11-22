// Underline styles. Each style adds one Unicode combining mark after every character,
// spaces included, so the line runs unbroken under the whole sentence.
// Names stay in English on purpose (they are style names).

export interface UnderlineStyle {
  slug: string;
  name: string;
  convert: (text: string) => string;
}

// Adds the mark after every character except line breaks.
function mark(text: string, code: string): string {
  return Array.from(text).map((c) => (c === '\n' || c === '\r' ? c : c + code)).join('');
}

const make = (slug: string, name: string, code: string): UnderlineStyle => ({
  slug,
  name,
  convert: (t) => mark(t, code),
});

export const UNDERLINE_STYLES: UnderlineStyle[] = [
  make('double-macron', 'Underline (double macron)', '͟'), // combining double macron below
  make('low-line', 'Underline (low line)', '̲'), // combining low line
  make('double-underline', 'Double underline', '̳'), // combining double low line
  make('under-arrow', 'Under-arrow', '͢'), // combining double rightwards arrow below
  make('under-seagull', 'Under-seagull', '̼'), // combining seagull below
  make('under-asterisk', 'Under-asterisk', '͙'), // combining asterisk below
];
