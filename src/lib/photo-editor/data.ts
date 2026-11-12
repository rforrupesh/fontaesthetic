// Static data for the Add Text to Photo editor: icons, canvas sizes, colors, text styles.

const P: Record<string, string> = {
  back: '<path d="m15 18-6-6 6-6"/>',
  resize: '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',
  undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>',
  redo: '<path d="m15 14 5-5-5-5"/><path d="M20 9H10a6 6 0 0 0 0 12h3"/>',
  download: '<path d="M12 4v11m0 0 4-4m-4 4-4-4M5 20h14"/>',
  text: '<path d="M5 6V4h14v2M12 4v16M9 20h6"/>',
  fonts: '<path d="m3 19 5.5-14L14 19M5.2 14h6.6"/><path d="M15 12.5c.5-1.3 1.7-2 3-2 1.8 0 3 1 3 2.7V19M21 15.5c-2.6 0-5 .4-5 2.3 0 1.2 1 1.7 2.2 1.7 1.3 0 2.8-.8 2.8-2.7"/>',
  photo: '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="8.5" cy="9.5" r="1.7"/><path d="m21 16-5-5-8 8"/>',
  bg: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  bold: '<path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z"/>',
  italic: '<path d="M10 5h8M6 19h8M14 5l-4 14"/>',
  underline: '<path d="M7 4v7a5 5 0 0 0 10 0V4M5 21h14"/>',
  strike: '<path d="M4 12h16M16.5 7.5C16 5.8 14.3 5 12.3 5 9.8 5 8 6.2 8 8c0 1.4 1.1 2.3 4 3M8 17c.6 1.6 2.3 2.4 4.3 2.4 2.5 0 4.2-1.1 4.2-3"/>',
  case: '<path d="M2 18 7 6l5 12M3.8 14h6.4M14 18v-6.5c0-1 .9-1.5 2-1.5s2 .6 2 1.6M14 15.4h4.3a2 2 0 0 1 0 4H14.8"/>',
  alignLeft: '<path d="M4 6h16M4 12h10M4 18h14"/>',
  alignCenter: '<path d="M4 6h16M7 12h10M5 18h14"/>',
  alignRight: '<path d="M4 6h16M10 12h10M6 18h14"/>',
  spacing: '<path d="M4 4v16M20 4v16M8 9l4-4 4 4M8 15l4 4 4-4"/>',
  effects: '<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
  position: '<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/><path d="M13 7h4a2 2 0 0 1 2 2v2M11 17H7a2 2 0 0 1-2-2v-2"/>',
  duplicate: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/>',
  lock: '<rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  unlock: '<rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 7.5-2"/>',
  edit: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff: '<path d="M3 3l18 18M10.6 5.1A9.8 9.8 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4M6.5 6.6C3.9 8.3 2 12 2 12s3.6 7 10 7a9.600 9.600 0 0 0 4-.9"/>',
  up: '<path d="m6 15 6-6 6 6"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  chevL: '<path d="m15 18-6-6 6-6"/>',
  chevR: '<path d="m9 18 6-6-6-6"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  dropper: '<path d="m14 5 5 5M4 20l1-4 9-9 3 3-9 9zM15.5 3.5l5 5"/>',
  upload: '<path d="M12 16V4m0 0 4 4m-4-4-4 4M5 20h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="8.5" cy="9.5" r="1.7"/><path d="m21 16-5-5-8 8"/>',
  fit: '<path d="M4 9V5h4M20 9V5h-4M4 15v4h4M20 15v4h-4"/>',
  alignTop: '<path d="M4 4h16M12 20V8M8 12l4-4 4 4"/>',
  alignMiddle: '<path d="M4 12h16M12 4v16"/>',
  alignBottom: '<path d="M4 20h16M12 4v12M8 12l4 4 4-4"/>',
  alignHLeft: '<path d="M4 4v16M8 8h12M8 16h7"/>',
  alignHCenter: '<path d="M12 4v16M5 8h14M8 16h8"/>',
  alignHRight: '<path d="M20 4v16M4 8h12M9 16h7"/>',
  flip: '<path d="M12 3v18M8 7 3 12l5 5zM16 7l5 5-5 5z"/>',
};
export const ic = (name: string, size = 20) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || ''}</svg>`;

export interface SizePreset { id: string; label: string; w: number; h: number; group: 'Social' | 'Print' | 'Other'; }
export const SIZE_PRESETS: SizePreset[] = [
  { id: 'ig-post', label: 'Instagram Post', w: 1080, h: 1080, group: 'Social' },
  { id: 'ig-portrait', label: 'Instagram Portrait', w: 1080, h: 1350, group: 'Social' },
  { id: 'story', label: 'Story / Reel / Status', w: 1080, h: 1920, group: 'Social' },
  { id: 'fb-post', label: 'Facebook Post', w: 1200, h: 630, group: 'Social' },
  { id: 'x-post', label: 'X (Twitter) Post', w: 1600, h: 900, group: 'Social' },
  { id: 'linkedin', label: 'LinkedIn Post', w: 1200, h: 627, group: 'Social' },
  { id: 'pinterest', label: 'Pinterest Pin', w: 1000, h: 1500, group: 'Social' },
  { id: 'yt-thumb', label: 'YouTube Thumbnail', w: 1280, h: 720, group: 'Social' },
  { id: 'profile', label: 'Profile Picture', w: 800, h: 800, group: 'Social' },
  { id: 'a4', label: 'A4 Page (300 dpi)', w: 2480, h: 3508, group: 'Print' },
  { id: 'poster', label: 'Poster 18×24 in (150 dpi)', w: 2700, h: 3600, group: 'Print' },
  { id: 'hd', label: 'HD Landscape 16:9', w: 1920, h: 1080, group: 'Other' },
  { id: 'square', label: 'Square 1:1', w: 1500, h: 1500, group: 'Other' },
];

export const SWATCHES = ['#000000', '#545454', '#737373', '#a6a6a6', '#d9d9d9', '#ffffff', '#ff3131', '#ff5757', '#ff66c4', '#cb6ce6', '#8c52ff', '#5e17eb', '#0097b2', '#0cc0df', '#5ce1e6', '#38b6ff', '#5271ff', '#004aad', '#00bf63', '#7ed957', '#c1ff72', '#ffde59', '#ffbd59', '#ff914d'];

export interface GradientDef { name: string; angle: number; stops: [string, string]; }
export const GRADIENTS: GradientDef[] = [
  { name: 'Sunset', angle: 135, stops: ['#ff9a56', '#ff4e7e'] },
  { name: 'Ocean', angle: 135, stops: ['#38b6ff', '#004aad'] },
  { name: 'Forest', angle: 135, stops: ['#7ed957', '#0d4a3a'] },
  { name: 'Grape', angle: 135, stops: ['#cb6ce6', '#5e17eb'] },
  { name: 'Peach', angle: 90, stops: ['#ffde59', '#ff914d'] },
  { name: 'Night', angle: 180, stops: ['#2b2f4a', '#0b0d1a'] },
  { name: 'Candy', angle: 45, stops: ['#ff66c4', '#ffde59'] },
  { name: 'Mint', angle: 45, stops: ['#5ce1e6', '#00bf63'] },
];

export interface TextStyleDef {
  id: string; label: string; text: string; font: string; fill: string; bold: boolean; italic: boolean;
  charSpacing: number; size: number; // size = fraction of canvas width
  strokePct?: number; stroke?: string;
  shadow?: { color: string; blur: number; ox: number; oy: number }; // fractions of font size
  upper?: boolean;
}
export const TEXT_STYLES: TextStyleDef[] = [
  { id: 'meme', label: 'Meme', text: 'MEME TEXT', font: 'anton', fill: '#ffffff', bold: false, italic: false, charSpacing: 10, size: 0.12, strokePct: 0.1, stroke: '#000000' },
  { id: 'aesthetic', label: 'Aesthetic', text: 'soft & dreamy', font: 'cormorant-garamond', fill: '#ffffff', bold: false, italic: true, charSpacing: 80, size: 0.09, shadow: { color: 'rgba(0,0,0,.55)', blur: 0.3, ox: 0, oy: 0.06 } },
  { id: 'neon', label: 'Neon', text: 'NEON GLOW', font: 'righteous', fill: '#ffffff', bold: false, italic: false, charSpacing: 60, size: 0.1, shadow: { color: '#ff2bd6', blur: 0.5, ox: 0, oy: 0 } },
  { id: 'title', label: 'Bold title', text: 'Big Title', font: 'montserrat', fill: '#ffd60a', bold: true, italic: false, charSpacing: 0, size: 0.11, strokePct: 0.05, stroke: '#111111', shadow: { color: 'rgba(0,0,0,.6)', blur: 0.1, ox: 0.03, oy: 0.04 } },
  { id: 'hand', label: 'Handwritten', text: 'Dear diary', font: 'caveat', fill: '#ffffff', bold: true, italic: false, charSpacing: 10, size: 0.12, shadow: { color: 'rgba(0,0,0,.6)', blur: 0.2, ox: 0, oy: 0.05 } },
  { id: 'retro', label: 'Retro', text: 'RETRO', font: 'alfa-slab-one', fill: '#ffe8b0', bold: false, italic: false, charSpacing: 20, size: 0.11, strokePct: 0.08, stroke: '#c4441a', shadow: { color: '#7a2a0e', blur: 0, ox: 0.05, oy: 0.05 } },
  { id: 'elegant', label: 'Elegant', text: 'Elegant', font: 'great-vibes', fill: '#fff4d6', bold: false, italic: false, charSpacing: 0, size: 0.14, shadow: { color: 'rgba(0,0,0,.5)', blur: 0.25, ox: 0, oy: 0.04 } },
  { id: 'comic', label: 'Comic', text: 'WOW!', font: 'bangers', fill: '#ffde59', bold: false, italic: false, charSpacing: 30, size: 0.13, strokePct: 0.09, stroke: '#d0021b', shadow: { color: '#000000', blur: 0, ox: 0.05, oy: 0.05 } },
];

export interface ComboDef { id: string; head: { font: string; bold: boolean; text: string; size: number; charSpacing?: number }; sub: { font: string; bold: boolean; text: string; size: number; charSpacing?: number }; }
export const FONT_COMBOS: ComboDef[] = [
  { id: 'c1', head: { font: 'playfair-display', bold: true, text: 'Golden Hour', size: 0.1 }, sub: { font: 'lato', bold: false, text: 'Sunsets & slow evenings', size: 0.04, charSpacing: 120 } },
  { id: 'c2', head: { font: 'anton', bold: false, text: 'SUMMER VIBES', size: 0.11, charSpacing: 40 }, sub: { font: 'open-sans', bold: false, text: 'Make every day count', size: 0.04 } },
  { id: 'c3', head: { font: 'great-vibes', bold: false, text: 'Happy Birthday', size: 0.13 }, sub: { font: 'montserrat', bold: false, text: 'WISHING YOU JOY', size: 0.035, charSpacing: 250 } },
  { id: 'c4', head: { font: 'bebas-neue', bold: false, text: 'NEW ARRIVAL', size: 0.13, charSpacing: 60 }, sub: { font: 'poppins', bold: false, text: 'Shop the latest collection', size: 0.04 } },
  { id: 'c5', head: { font: 'pacifico', bold: false, text: 'Good Morning', size: 0.1 }, sub: { font: 'quicksand', bold: true, text: 'Start your day with a smile', size: 0.04 } },
  { id: 'c6', head: { font: 'abril-fatface', bold: false, text: 'Travel Diary', size: 0.11 }, sub: { font: 'raleway', bold: false, text: 'STORIES FROM THE ROAD', size: 0.035, charSpacing: 200 } },
];
