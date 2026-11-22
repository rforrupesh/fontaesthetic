// Italic styles. Each style maps A-Z and a-z to a slanted Unicode alphabet (Mathematical
// Italic, Cursive, Script, Italic Bold Serif, Italic Bold Sans). Digits, spaces,
// punctuation and non-Latin letters are kept as they are.
// Names stay in English on purpose (they are style names).

export interface ItalicStyle {
  slug: string;
  name: string;
  convert: (text: string) => string;
}

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';

// Some alphabets have reserved holes (e.g. italic "h" lives in the Letterlike Symbols block),
// so each alphabet is written out in full instead of being computed from an offset.
const makeMap = (upper: string, lower: string): Map<string, string> => {
  const u = Array.from(upper);
  const l = Array.from(lower);
  const m = new Map<string, string>();
  for (let i = 0; i < 26; i++) {
    m.set(UPPER[i], u[i]);
    m.set(LOWER[i], l[i]);
  }
  return m;
};

const apply = (text: string, map: Map<string, string>): string =>
  Array.from(text).map((c) => map.get(c) ?? c).join('');

const make = (slug: string, name: string, upper: string, lower: string): ItalicStyle => {
  const map = makeMap(upper, lower);
  return { slug, name, convert: (t) => apply(t, map) };
};

export const ITALIC_STYLES: ItalicStyle[] = [
  make('italic', 'Italic', '𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍', '𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧'),
  make('cursive', 'Cursive', '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩', '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃'),
  make('script', 'Script', '𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵', '𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏'),
  make('italic-bold-serif', 'Italic Bold (Serif)', '𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁', '𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛'),
  make('italic-bold-sans', 'Italic Bold (Sans)', '𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕', '𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯'),
];
