export interface FontStyle {
  name: string;
  slug: string;
  map?: { table: Record<string, string>; reverse: boolean };
  transform?: (s: string) => string;
}

function makeMap(upper?: string, lower?: string, digits?: string, reverse?: boolean) {
  const U = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const L = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const D = '0123456789'.split('');
  const table: Record<string, string> = {};
  U.forEach((ch, i) => { if (upper && upper[i]) table[ch] = upper[i]; });
  L.forEach((ch, i) => { if (lower && lower[i]) table[ch] = lower[i]; });
  if (digits) D.forEach((ch, i) => { if (digits[i]) table[ch] = digits[i]; });
  return { table, reverse: !!reverse };
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const RAW: Omit<FontStyle, 'slug'>[] = [
  { name: 'Bold', map: makeMap('𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙', '𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳', '𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗') },
  { name: 'Italic', map: makeMap('𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍', '𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧') },
  { name: 'Bold Italic', map: makeMap('𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁', '𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛') },
  { name: 'Script', map: makeMap('𝒜ℬ𝒞𝒟𝐸𝐹𝒢ℋℐ𝒥𝒦�ℒ𝑀𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵', '𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏') },
  { name: 'Double Struck', map: makeMap('𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ', '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫', '𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡') },
  { name: 'Fraktur', map: makeMap('𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ', '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷') },
  { name: 'Monospace', map: makeMap('𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉', '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣', '𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿') },
  { name: 'Circled', map: makeMap('ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ', 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ') },
  { name: 'Squared', map: makeMap('🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉') },
  { name: 'Small Caps', map: makeMap('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘQʀꜱᴛᴜᴠᴡxʏᴢ') },
  { name: 'Upside Down', map: makeMap('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'ɐqɔpǝɟɓɥıɾʞlɯuodbɹsʇnʌʍxʎz', '0123456789', true) },
  { name: 'Strikethrough', transform: (s: string) => s.split('').map((c) => c + '\u0336').join('') },
  { name: 'Underline', transform: (s: string) => s.split('').map((c) => c + '\u0332').join('') },
  { name: 'Bubble', map: makeMap('ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ', 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ') },
  { name: 'Vaporwave', transform: (s: string) => s.split('').map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 33 && code <= 126) return String.fromCharCode(0xFF00 + (code - 0x20));
      return c;
    }).join('') },
];

export const FONT_STYLES: FontStyle[] = RAW.map((style) => ({ ...style, slug: slugify(style.name) }));

export function convert(text: string, style: FontStyle): string {
  if (style.transform) return style.transform(text);
  if (!style.map) return text;
  const { table, reverse } = style.map;
  let out = text.split('').map((ch) => table[ch] || ch);
  if (reverse) out = out.reverse();
  return out.join('');
}
