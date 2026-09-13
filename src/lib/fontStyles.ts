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

function makeMap(upper?: string, lower?: string, digits?: string, reverse?: boolean) {
  const U = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const L = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const D = '0123456789'.split('');
  const table: Record<string, string> = {};
  const upperChars = toChars(upper);
  const lowerChars = toChars(lower);
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
  { name: 'Script', map: makeMap('𝒜ℬ𝒞𝒟𝐸𝐹𝒢ℋℐ𝒥𝒦ℒ𝑀𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵', '𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏') },
  { name: 'Double Struck', map: makeMap('𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ', '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫', '𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡') },
  { name: 'Fraktur', map: makeMap('𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ', '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷') },
  { name: 'Monospace', map: makeMap('𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉', '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣', '𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿') },
  { name: 'Circled', map: makeMap('ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ', 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ') },
  { name: 'Squared', map: makeMap('🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉') },
  { name: 'Small Caps', map: makeMap('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘQʀꜱᴛᴜᴠᴡxʏᴢ') },
  { name: 'Upside Down', map: makeMap('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'ɐqɔpǝɟɓɥıɾʞlɯuodbɹsʇnʌʍxʎz', '0123456789', true) },
  { name: 'Strikethrough', transform: (s: string) => toChars(s).map((c) => c + '\u0336').join('') },
  { name: 'Underline', transform: (s: string) => toChars(s).map((c) => c + '\u0332').join('') },
  { name: 'Bubble', map: makeMap('ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ', 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ') },
  { name: 'Vaporwave', transform: (s: string) => s.split('').map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 33 && code <= 126) return String.fromCharCode(0xFF00 + (code - 0x20));
      return c;
    }).join('') },

  // --- New alphabet-substitution styles (each letter maps 1:1, so these
  // render reliably everywhere, same as Bold/Italic/Script above) ---
  { name: 'Bold Script', map: makeMap('𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩', '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃') },
  { name: 'Bold Gothic', map: makeMap('𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅', '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟') },
  { name: 'Sans Serif', map: makeMap('𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹', '𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓') },
  { name: 'Sans Bold', map: makeMap('𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭', '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇', '𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵') },
  { name: 'Sans Italic', map: makeMap('𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡', '𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻') },
  { name: 'Sans Bold Italic', map: makeMap('𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕', '𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯') },
  { name: 'Filled Circles', map: makeMap('🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩') },
  { name: 'Squared Outline', map: makeMap('🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉') },
  { name: 'Parenthesised', map: makeMap('🄐🄑🄒🄓🄔🄕🄖🄗🄘🄙🄚🄛🄜🄝🄞🄟🄠🄡🄢🄣🄤🄥🄦🄧🄨🄩', '⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵') },
  { name: 'Wide', map: makeMap('ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ', 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ', '０１２３４５６７８９') },

  // --- New combining-mark styles (letter + invisible mark, same pattern
  // as the existing Strikethrough/Underline entries above) ---
  { name: 'Short Strike', transform: (s: string) => toChars(s).map((c) => c + '\u0335').join('') },
  { name: 'Slashed', transform: (s: string) => toChars(s).map((c) => c + '\u0337').join('') },
  { name: 'Long Slash', transform: (s: string) => toChars(s).map((c) => c + '\u0338').join('') },
  { name: 'Tilde Strike', transform: (s: string) => toChars(s).map((c) => c + '\u0334').join('') },
  { name: 'Double Underline', transform: (s: string) => toChars(s).map((c) => c + '\u0333').join('') },
  { name: 'Wavy Underline', transform: (s: string) => toChars(s).map((c) => c + '\u0330').join('') },
  { name: 'Dotted Underline', transform: (s: string) => toChars(s).map((c) => c + '\u0323').join('') },
  { name: 'Overline', transform: (s: string) => toChars(s).map((c) => c + '\u0305').join('') },
  { name: 'Double Overline', transform: (s: string) => toChars(s).map((c) => c + '\u033F').join('') },
  { name: 'Ring Below', transform: (s: string) => toChars(s).map((c) => c + '\u0325').join('') },
  { name: 'Comma Below', transform: (s: string) => toChars(s).map((c) => c + '\u0326').join('') },
  { name: 'Dotted', transform: (s: string) => toChars(s).map((c) => c + '\u0307').join('') },
  { name: 'Ringed', transform: (s: string) => toChars(s).map((c) => c + '\u030A').join('') },
  { name: 'Caron', transform: (s: string) => toChars(s).map((c) => c + '\u030C').join('') },
  { name: 'Tilde', transform: (s: string) => toChars(s).map((c) => c + '\u0303').join('') },
  { name: 'Umlaut', transform: (s: string) => toChars(s).map((c) => c + '\u0308').join('') },
  { name: 'Acute', transform: (s: string) => toChars(s).map((c) => c + '\u0301').join('') },
  { name: 'Hook', transform: (s: string) => toChars(s).map((c) => c + '\u0309').join('') },
  { name: 'Arrows', transform: (s: string) => toChars(s).map((c) => c + '\u20D7').join('') },
  { name: 'Crossed', transform: (s: string) => toChars(s).map((c) => c + '\u033D').join('') },
  { name: 'Enclosed Circle', transform: (s: string) => toChars(s).map((c) => c + '\u20DD').join('') },
  { name: 'Enclosed Square', transform: (s: string) => toChars(s).map((c) => c + '\u20DE').join('') },
  { name: 'Enclosed Diamond', transform: (s: string) => toChars(s).map((c) => c + '\u20DF').join('') },
  { name: 'Struck Circle', transform: (s: string) => toChars(s).map((c) => c + '\u20E0').join('') },

  // --- New spacing styles ---
  { name: 'Spaced', transform: (s: string) => toChars(s).join(' ') },
  { name: 'Extra Spaced', transform: (s: string) => toChars(s).join('    ') },
];

export const FONT_STYLES: FontStyle[] = RAW.map((style) => ({ ...style, slug: slugify(style.name) }));

export function convert(text: string, style: FontStyle): string {
  if (style.transform) return style.transform(text);
  if (!style.map) return text;
  const { table, reverse } = style.map;
  let out = toChars(text).map((ch) => table[ch] || ch);
  if (reverse) out = out.reverse();
  return out.join('');
}
