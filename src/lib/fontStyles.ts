export interface FontStyle {
  name: string;
  slug: string;
  map?: { table: Record<string, string>; reverse: boolean };
  transform?: (s: string) => string;
}

// Splits a string into an array of actual Unicode characters (code points),
// not UTF-16 code units. This matters a lot here: most of the styled
// alphabets below (Bold, Italic, Script, Double Struck, Fraktur, Monospace,
// Squared) live in the Unicode "astral plane" (code points above U+FFFF)
// and are stored internally as surrogate PAIRS (2 UTF-16 units each).
// Indexing a string with `str[i]` or using `str.split('')` walks UTF-16
// units, not whole characters, so it would grab a lone surrogate half
// instead of the full character -- which then serializes as the broken
// "�" replacement character. `Array.from()` iterates by code point and
// handles surrogate pairs correctly.
function toChars(str?: string): string[] {
  return str ? Array.from(str) : [];
}

// Adds a combining mark after every character EXCEPT spaces. A space has no
// visible glyph of its own, so a mark attached to it renders as a lone
// floating symbol (e.g. repeated ".⃟" between words) instead of sitting on
// top of a letter. Skipping whitespace keeps the mark attached only to
// actual letters/digits, where it's meant to go.
function mark(str: string, code: string): string {
  return toChars(str).map((c) => (/\s/.test(c) ? c : c + code)).join('');
}

function makeMap(upper?: string, lower?: string, digits?: string, reverse?: boolean) {
  const U = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const L = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const D = '0123456789'.split('');
  const table: Record<string, string> = {};
  const upperChars = toChars(upper);
  // Only an uppercase alphabet given (squared, filled circles...)? Use it for lowercase too.
  const lowerChars = lower === undefined ? upperChars : toChars(lower);
  const digitChars = toChars(digits);
  U.forEach((ch, i) => { if (upperChars[i]) table[ch] = upperChars[i]; });
  L.forEach((ch, i) => { if (lowerChars[i]) table[ch] = lowerChars[i]; });
  if (digits) D.forEach((ch, i) => { if (digitChars[i]) table[ch] = digitChars[i]; });
  return { table, reverse: !!reverse };
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const RAW: Omit<FontStyle, 'slug'>[] = [
  { name: 'Bold', map: makeMap('𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙', '𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳', '𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗') },
  { name: 'Italic', map: makeMap('𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍', '𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧') },
  { name: 'Bold Italic', map: makeMap('𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁', '𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛') },
  { name: 'Cursive', map: makeMap('𝒜ℬ𝒞𝒟𝐸𝐹𝒢ℋℐ𝒥𝒦ℒ𝑀𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵', '𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏') },
  { name: 'Double Struck', map: makeMap('𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ', '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫', '𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡') },
  { name: 'Fraktur', map: makeMap('𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ', '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷') },
  { name: 'Monospace', map: makeMap('𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉', '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣', '𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿') },
  { name: 'Bubbles', map: makeMap('ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ', 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ') },
  { name: 'Dark Squares', map: makeMap('🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉') },
  { name: 'Small Caps', map: makeMap('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘꞯʀꜱᴛᴜᴠᴡxʏᴢ') },
  { name: 'Upside Down', map: makeMap('∀ᗺƆᗡƎℲ⅁HIſ⋊˥WNOԀΌᴚS⊥∩ΛMX⅄Z', 'ɐqɔpǝɟɓɥıɾʞlɯuodbɹsʇnʌʍxʎz', '0ƖᄅƐㄣϛ9ㄥ86', true) },
  { name: 'Strikethrough', transform: (s: string) => mark(s, '\u0336') },
  { name: 'Underline', transform: (s: string) => mark(s, '\u0332') },
  { name: 'Vaporwave', transform: (s: string) => s.split('').map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 33 && code <= 126) return String.fromCharCode(0xFF00 + (code - 0x20));
      return c;
    }).join('') },

  // --- New alphabet-substitution styles (each letter maps 1:1, so these
  // render reliably everywhere, same as Bold/Italic/Script above) ---
  { name: 'Cursive Bold', map: makeMap('𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩', '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃') },
  { name: 'Fraktur Bold', map: makeMap('𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅', '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟') },
  { name: 'Sans Serif', map: makeMap('𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹', '𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓') },
  { name: 'Sans Bold', map: makeMap('𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭', '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇', '𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵') },
  { name: 'Sans Italic', map: makeMap('𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡', '𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻') },
  { name: 'Sans Bold Italic', map: makeMap('𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕', '𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯') },
  { name: 'Dark Bubbles', map: makeMap('🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩') },
  { name: 'Squares', map: makeMap('🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉') },
  { name: 'Parenthesised', map: makeMap('🄐🄑🄒🄓🄔🄕🄖🄗🄘🄙🄚🄛🄜🄝🄞🄟🄠🄡🄢🄣🄤🄥🄦🄧🄨🄩', '⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵') },

  // --- New combining-mark styles (letter + invisible mark, same pattern
  // as the existing Strikethrough/Underline entries above) ---
  { name: 'Short Strike', transform: (s: string) => mark(s, '\u0335') },
  { name: 'Slash Through', transform: (s: string) => mark(s, '\u0337') },
  { name: 'Long Slash', transform: (s: string) => mark(s, '\u0338') },
  { name: 'Tilde Strikethrough', transform: (s: string) => mark(s, '\u0334') },
  { name: 'Double Underline', transform: (s: string) => mark(s, '\u0333') },
  { name: 'Wavy Underline', transform: (s: string) => mark(s, '\u0330') },
  { name: 'Dotted Underline', transform: (s: string) => mark(s, '\u0323') },
  { name: 'Overline', transform: (s: string) => mark(s, '\u0305') },
  { name: 'Double Overline', transform: (s: string) => mark(s, '\u033F') },
  { name: 'Ring Below', transform: (s: string) => mark(s, '\u0325') },
  { name: 'Comma Below', transform: (s: string) => mark(s, '\u0326') },
  { name: 'Dotted', transform: (s: string) => mark(s, '\u0307') },
  { name: 'Ringed', transform: (s: string) => mark(s, '\u030A') },
  { name: 'Caron', transform: (s: string) => mark(s, '\u030C') },
  { name: 'Tilde', transform: (s: string) => mark(s, '\u0303') },
  { name: 'Umlaut', transform: (s: string) => mark(s, '\u0308') },
  { name: 'Acute', transform: (s: string) => mark(s, '\u0301') },
  { name: 'Hook', transform: (s: string) => mark(s, '\u0309') },
  { name: 'Arrows', transform: (s: string) => mark(s, '\u20D7') },
  { name: 'Crossed', transform: (s: string) => mark(s, '\u033D') },
  { name: 'Enclosed Circle', transform: (s: string) => mark(s, '\u20DD') },
  { name: 'Enclosed Square', transform: (s: string) => mark(s, '\u20DE') },
  { name: 'Enclosed Diamond', transform: (s: string) => mark(s, '\u20DF') },
  { name: 'Struck Circle', transform: (s: string) => mark(s, '\u20E0') },

  // --- New spacing styles ---
  { name: 'Spaced', transform: (s: string) => toChars(s).join(' ') },
  { name: 'Extra Spaced', transform: (s: string) => toChars(s).join('    ') },

  // --- Squiggle family (letter-for-letter swaps using Greek / Armenian / IPA letters) ---
  { name: 'Squiggle', map: makeMap('ΛႦϾƊΣҒԌĤƖĴҜꓡΜΝӨՔϘƦՏՇՄѴԜҲҮƵ', 'αβςδeƒԳհɿյκʅмησρφгʂτՄνωχγζ') },
  { name: 'Squiggle 2', map: makeMap('ĄცƈɖɛʄɠɧıʝƙƖɱŋơ℘գཞʂɬų۷ῳҳყʑ', 'ąცƈɖɛʄɠɧıʝƙƖɱŋơ℘գཞʂɬų۷ῳҳყʑ') },
  { name: 'Squiggle 3', map: makeMap('ɑҍƈԃҽʄցհìʝƙʅʍղօքզɾʂէմѵաxվՀ', 'ɑҍƈԃҽʄցհìʝƙʅʍղօքզɾʂէմѵաxվՀ') },
  { name: 'Squiggle 4', map: makeMap('ǟɮċɖɛʄɢɦɨʝӄʟʍռօքզʀֆէʊʋաӽʏʐ', 'ǟɮċɖɛʄɢɦɨʝӄʟʍռօքզʀֆէʊʋաӽʏʐ') },

  // --- Symbol / script alphabets ---
  { name: 'Upside Down 2', map: makeMap('AᗺƆᗡƎꟻᎶHIႱ⋊⅃MИOꟼỌЯƧTUVWXYƸ', 'ɒdɔbɘꟻǫʜiįʞlmᴎoqpɿꙅƚuvwxyƹ', undefined, true) },
  { name: 'Crazy', map: makeMap('ⓐ♭☾ⓓεƒ❡♄ⓘ♪ⓚ↳♏ⓝ⊙℘ⓠⓡⓢ✝⊎∨ⓦ✗¥ⓩ'.toUpperCase(), 'ⓐ♭☾ⓓεƒ❡♄ⓘ♪ⓚ↳♏ⓝ⊙℘ⓠⓡⓢ✝⊎∨ⓦ✗¥ⓩ') },
  { name: 'Crazy 2', map: makeMap('Δßᑕ∂ε𝕗ɠℏίʝⓚℓᗰη◎ρⓠʳ$ⓣυⓥω✕ⓨⓩ', 'Δßᑕ∂ε𝕗ɠℏίʝⓚℓᗰη◎ρⓠʳ$ⓣυⓥω✕ⓨⓩ') },
  { name: 'Tribal', map: makeMap('ꍏꌃꉓꀸꍟꎇꁅꃅꀤꀭꀘ꒒ꂵꈤꂦꉣꆰꋪꌗ꓄ꀎ꒦ꅐꉧꌩꒀ', 'ꍏꌃꉓꀸꍟꎇꁅꃅꀤꀭꀘ꒒ꂵꈤꂦꉣꆰꋪꌗ꓄ꀎ꒦ꅐꉧꌩꒀ') },
  { name: 'Asian', map: makeMap('卂乃匚刀乇下厶卄工丁长乚从ん口尸㔿尺丂匕凵リ山乂ㄚ乙', '卂乃匚刀乇下厶卄工丁长乚从ん口尸㔿尺丂匕凵リ山乂ㄚ乙') },

  // --- Emoticon / emoji wrappers ---
  { name: 'Kirby Hug', transform: (s: string) => `(っ◔◡◔)っ ♥ ${s} ♥` },
  { name: 'Cool Emoticon', transform: (s: string) => `(⌐■_■) ${s} (⌐■_■)` },
  { name: 'Lenny Emoticon', transform: (s: string) => `ᕦ( ͡° ͜ʖ ͡°)ᕤ ${apply('Cursive Bold', s)}` },
  { name: 'Emojis', transform: (s: string) => `🍉 ⋆ 🍭 ${apply('Squiggle 3', s).replace(/օ/g, '😍')} 🍭 ⋆ 🍉` },
  { name: 'Emojis & Fancy Symbols', transform: (s: string) => `🐨🍪 ${apply('Bold', s)} ♗🍫` },

  // --- More combining marks ---
  { name: 'Seagull', transform: (s: string) => mark(s, '̼') },
  { name: 'Arrow Below', transform: (s: string) => mark(s, '͎') },
];

// ---------------------------------------------------------------------------
// Runtime helpers + the AUTO-GENERATED styles (mixes, effects, decorations).
// Everything below is built from the curated styles above, so adding one new
// alphabet above automatically multiplies into dozens of new combinations.
// ---------------------------------------------------------------------------

const BASE: FontStyle[] = RAW.map((style) => ({ ...style, slug: slugify(style.name) }));
const BY_NAME = new Map(BASE.map((st) => [st.name, st]));

export function convert(text: string, style: FontStyle): string {
  if (style.transform) return style.transform(text);
  if (!style.map) return text;
  const { table, reverse } = style.map;
  let out = toChars(text).map((ch) => table[ch] || ch);
  if (reverse) out = out.reverse();
  return out.join('');
}

// apply('Bold', 'hi') -> converts with the curated style of that name
function apply(name: string, text: string): string {
  const st = BY_NAME.get(name);
  return st ? convert(text, st) : text;
}

// Alphabets that mix well with each other / with marks and decorations.
const MIX_ALPHABETS = ['Bold', 'Italic', 'Cursive', 'Double Struck', 'Fraktur', 'Monospace', 'Sans Bold', 'Bubbles'];
const MARK_ALPHABETS = ['Bold', 'Italic', 'Bold Italic', 'Cursive', 'Cursive Bold', 'Double Struck', 'Fraktur', 'Fraktur Bold', 'Monospace', 'Sans Bold', 'Sans Italic', 'Sans Bold Italic'];
const DECOR_ALPHABETS = ['Bold', 'Italic', 'Bold Italic', 'Cursive', 'Cursive Bold', 'Double Struck', 'Fraktur', 'Fraktur Bold', 'Monospace', 'Sans Bold', 'Small Caps', 'Bubbles', 'Dark Squares', 'Vaporwave', 'Squiggle 2', 'Asian'];

const MARKS: [string, string][] = [
  ['Strikethrough', '̶'], ['Underline', '̲'], ['Double Underline', '̳'], ['Overline', '̅'],
  ['Slash Through', '̷'], ['Tilde Strike', '̴'], ['Dotted Underline', '̣'], ['Seagull', '̼'],
  ['Arrow Below', '͎'], ['Dot Above', '̇'],
];

const DECORATIONS: [string, string, string][] = [
  ['Stars', '★ ', ' ★'], ['Outline Stars', '☆ ', ' ☆'], ['Sparkles', '✦ ', ' ✦'], ['Hearts', '♡ ', ' ♡'],
  ['Red Hearts', '❤ ', ' ❤'], ['Flowers', '✿ ', ' ✿'], ['Blossoms', '❀ ', ' ❀'], ['Ornament', '꧁ ', ' ꧂'],
  ['Corner Brackets', '『 ', ' 』'], ['Lenticular', '【 ', ' 】'], ['Double Angle', '《 ', ' 》'], ['Fancy Brackets', '༺ ', ' ༻'],
  ['Dots', '•°• ', ' •°•'], ['Sniper', '▄︻デ ', ' ══━一'], ['Starlight', '⋆｡°✩ ', ' ✩°｡⋆'], ['Moon', '☾ ', ' ☽'],
  ['Magic', '✧･ﾟ: * ', ' * :･ﾟ✧'], ['Skulls', '☠ ', ' ☠'], ['Lightning', '⚡ ', ' ⚡'], ['Fire', '🔥 ', ' 🔥'],
  ['Sakura', '🌸 ', ' 🌸'], ['Gems', '💎 ', ' 💎'], ['Butterflies', '🦋 ', ' 🦋'],
];

// Alternates alphabets letter by letter (spaces don't count): B𝘰𝓵𝔡 -> mixed look.
function mixer(names: string[]) {
  const styles = names.map((n) => BY_NAME.get(n)!).filter(Boolean);
  return (text: string) => {
    let i = 0;
    return toChars(text).map((ch) => (/\s/.test(ch) ? ch : convert(ch, styles[i++ % styles.length]))).join('');
  };
}

function altCase(name: string) {
  const st = BY_NAME.get(name)!;
  return (text: string) => {
    let i = 0;
    return convert(toChars(text).map((ch) => (/\s/.test(ch) ? ch : i++ % 2 ? ch.toLowerCase() : ch.toUpperCase())).join(''), st);
  };
}

const mixes: Omit<FontStyle, 'slug'>[] = [];
for (let a = 0; a < MIX_ALPHABETS.length; a++) {
  for (let b = a + 1; b < MIX_ALPHABETS.length; b++) {
    const names = [MIX_ALPHABETS[a], MIX_ALPHABETS[b]];
    mixes.push({ name: `Mix: ${names.join(' + ')}`, transform: mixer(names) });
  }
}
[
  ['Bold', 'Cursive', 'Fraktur'],
  ['Double Struck', 'Monospace', 'Sans Bold'],
  ['Fraktur', 'Bubbles', 'Cursive Bold'],
  ['Bold', 'Double Struck', 'Monospace'],
  ['Italic', 'Fraktur Bold', 'Sans Italic'],
  ['Cursive', 'Small Caps', 'Bold'],
].forEach((names) => mixes.push({ name: `Mix: ${names.join(' + ')}`, transform: mixer(names) }));
['Bold', 'Italic', 'Cursive', 'Fraktur', 'Double Struck', 'Monospace'].forEach((n) =>
  mixes.push({ name: `Alternating Case ${n}`, transform: altCase(n) }));

const effects: Omit<FontStyle, 'slug'>[] = [];
for (const alpha of MARK_ALPHABETS) {
  for (const [label, code] of MARKS) {
    effects.push({ name: `${alpha} ${label}`, transform: (s: string) => mark(apply(alpha, s), code) });
  }
}

const decorated: Omit<FontStyle, 'slug'>[] = [];
for (const alpha of DECOR_ALPHABETS) {
  for (const [label, pre, post] of DECORATIONS) {
    decorated.push({ name: `${alpha} + ${label}`, transform: (s: string) => `${pre}${apply(alpha, s)}${post}` });
  }
}

// Spread two lists evenly so users see variety instead of 200 "Bold ..." in a row.
function interleave<T>(a: T[], b: T[]): T[] {
  const out: T[] = [];
  const total = a.length + b.length;
  let ia = 0, ib = 0;
  for (let i = 0; i < total; i++) {
    if (ib >= b.length || (ia < a.length && ia / a.length <= ib / b.length)) out.push(a[ia++]);
    else out.push(b[ib++]);
  }
  return out;
}

// The headline styles come first, in this order; everything else follows.
const PRIORITY = ['Fraktur', 'Fraktur Bold', 'Double Struck', 'Cursive', 'Cursive Bold', 'Bubbles', 'Dark Bubbles', 'Squares', 'Dark Squares',
  'Bold', 'Sans Bold', 'Italic', 'Bold Italic', 'Squiggle', 'Squiggle 2', 'Squiggle 3', 'Squiggle 4', 'Strikethrough', 'Tilde Strikethrough',
  'Slash Through', 'Underline', 'Seagull', 'Arrow Below', 'Upside Down', 'Upside Down 2', 'Crazy', 'Crazy 2', 'Tribal', 'Asian',
  'Kirby Hug', 'Cool Emoticon', 'Lenny Emoticon', 'Emojis', 'Emojis & Fancy Symbols'];
const rank = (n: string) => { const i = PRIORITY.indexOf(n); return i === -1 ? PRIORITY.length : i; };
const ORDERED = RAW.map((st, i) => ({ st, i })).sort((x, y) => rank(x.st.name) - rank(y.st.name) || x.i - y.i).map((x) => x.st);

const ALL = [...ORDERED, ...mixes, ...interleave(effects, decorated)];

// Unique slugs even if two names collapse to the same slug.
const seen = new Set<string>();
export const FONT_STYLES: FontStyle[] = ALL.map((style) => {
  let slug = slugify(style.name);
  while (seen.has(slug)) slug += '-2';
  seen.add(slug);
  return { ...style, slug };
});
