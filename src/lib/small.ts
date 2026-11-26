// Small / tiny text styles. Each style maps characters to a smaller Unicode lookalike
// (small capitals, modifier-letter superscripts, subscripts). Characters without a small
// form (and all non-Latin text) are kept as they are.
// Names stay in English on purpose (they are style names).

export interface SmallStyle {
  slug: string;
  name: string;
  convert: (text: string) => string;
}

const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';

// `from` and `to` are written out in full and paired by code point, because several alphabets
// have gaps (no small-cap "s", no subscript "b" ...). A gap simply repeats the original letter.
const make = (slug: string, name: string, from: string, to: string): SmallStyle => {
  const f = Array.from(from);
  const t = Array.from(to);
  if (f.length !== t.length) throw new Error(`small.ts: ${slug} maps ${f.length} chars to ${t.length}`);
  const map = new Map<string, string>(f.map((c, i) => [c, t[i]]));
  return { slug, name, convert: (s) => Array.from(s).map((c) => map.get(c) ?? c).join('') };
};

const SMALL_CAPS = 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ';
const SUPER_LOWER = 'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖqʳˢᵗᵘᵛʷˣʸᶻ';
const SUPER_UPPER = 'ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂˣʸᶻ';
const SUB_LOWER = 'ₐbcdₑfgₕᵢⱼₖₗₘₙₒₚqᵣₛₜᵤᵥwₓyz';

export const SMALL_STYLES: SmallStyle[] = [
  make('small-caps', 'Small Caps', LOWER + DIGITS, SMALL_CAPS + DIGITS),
  make('all-small-caps', 'All Small Caps', LOWER + UPPER, SMALL_CAPS + SMALL_CAPS),
  make('superscript', 'Tiny Text (Superscript)', LOWER + UPPER + DIGITS + '+-=()', SUPER_LOWER + SUPER_UPPER + '⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾'),
  make('subscript', 'Subscript', LOWER + UPPER + DIGITS + '+-=()', SUB_LOWER + SUB_LOWER + '₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎'),
];
