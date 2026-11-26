// Glitch text styles. Each style adds random Unicode combining marks to every letter:
// marks above the letter, marks through it, marks below it, or a mix of the three.
// Spaces and line breaks are kept as they are, so words stay separated.
// Names stay in English on purpose (they are style names).

export interface GlitchStyle {
  slug: string;
  name: string;
  convert: (text: string) => string;
}

const range = (from: number, to: number): string[] =>
  Array.from({ length: to - from + 1 }, (_, i) => String.fromCharCode(from + i));

const ABOVE = [
  ...range(0x300, 0x315), ...range(0x33d, 0x344), '\u0346', ...range(0x34a, 0x34c),
  ...range(0x350, 0x352), '\u0357', '\u035b', ...range(0x363, 0x36f),
];
const THROUGH = range(0x334, 0x338);
const BELOW = [
  ...range(0x316, 0x319), ...range(0x31c, 0x320), ...range(0x323, 0x333),
  ...range(0x339, 0x33c), '\u0345', ...range(0x347, 0x349), '\u034d', '\u034e',
  ...range(0x353, 0x356), '\u0359', '\u035a',
];

const pick = (set: string[], n: number): string => {
  let s = '';
  for (let i = 0; i < n; i++) s += set[Math.floor(Math.random() * set.length)];
  return s;
};

// above / through / below = how many marks go on each letter.
const make = (slug: string, name: string, above: number, through: number, below: number): GlitchStyle => ({
  slug,
  name,
  convert: (t) =>
    Array.from(t)
      .map((c) => (/\s/.test(c) ? c : c + pick(ABOVE, above) + pick(THROUGH, through) + pick(BELOW, below)))
      .join(''),
});

export const GLITCH_STYLES: GlitchStyle[] = [
  make('light', 'Light glitch', 1, 0, 1),
  make('medium', 'Medium glitch', 3, 1, 3),
  make('heavy', 'Heavy glitch', 6, 2, 6),
  make('zalgo', 'Zalgo', 12, 3, 12),
  make('above', 'Glitch above', 5, 0, 0),
  make('through', 'Glitch through', 0, 3, 0),
  make('below', 'Glitch below', 0, 0, 5),
];
