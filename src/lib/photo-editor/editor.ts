// Full-screen "Add Text to Photo" editor (Fabric.js). Loaded on demand from the tool page.
// Everything happens in the browser: photos are never uploaded.
import './editor.css';
import { Canvas, Textbox, FabricImage, Shadow, Gradient, cache, filters as FabricFilters } from 'fabric';
import { TOOL_FONTS } from '../toolFonts';
import type { ToolFont } from '../toolFonts';
import { ic, SIZE_PRESETS, SWATCHES, GRADIENTS, TEXT_STYLES, FONT_COMBOS } from './data';
import type { TextStyleDef } from './data';

export interface OpenOptions {
  base: string;
  file?: File;
  sample?: string;
  blank?: { w: number; h: number };
  onClose?: () => void;
}

type Any = any;
const BASE_W = 1080; // text sizes are shown relative to a 1080px wide page, like most design tools
const MAX_EXPORT_AREA = 16_000_000;
const MAX_SIDE = 8192;

const FONT_BY_ID = new Map<string, ToolFont>(TOOL_FONTS.map((f) => [f.id, f]));
const famName = (id: string) => `pe_${id.replace(/-/g, '_')}`;
const FONT_BY_FAMILY = new Map<string, ToolFont>(TOOL_FONTS.map((f) => [famName(f.id), f]));
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
const isTouchUI = () => window.matchMedia('(max-width: 820px)').matches;

// ------------------------------------------------------------------ state
let root: HTMLElement;
let canvas: Canvas;
let opts: OpenOptions;
let built = false;

const S = {
  W: 1080, H: 1080, zoom: 1, userZoom: false,
  photo: null as null | { img: FabricImage; el: CanvasImageSource; w: number; h: number; thumb: string },
  origSize: null as null | { w: number; h: number },
  fit: 'cover' as 'cover' | 'contain',
  bgColor: '#ffffff', bgKey: '',
  filters: { b: 0, c: 0, s: 0 },
  panel: 'text', restoring: false,
  recent: [] as string[], defaultFont: 'poppins',
  fontCat: 'all', fontQuery: '',
  exp: { fmt: 'png' as 'png' | 'jpeg' | 'webp', q: 0.92, scale: '1' },
  lockRatio: true,
};
let hist: string[] = [], histIdx = -1, commitTimer = 0;

let stageEl: HTMLElement, holderEl: HTMLElement, ctxEl: HTMLElement, floatEl: HTMLElement, panelEl: HTMLElement, panelBody: HTMLElement;
let popEl: HTMLElement, toastEl: HTMLElement, zoomRange: HTMLInputElement, zoomOut: HTMLElement;
let popAnchor: HTMLElement | null = null, popKind = '';

// ------------------------------------------------------------------ fonts
const fontLoads = new Map<string, Promise<void>>();
function ensureFont(id: string): Promise<void> {
  const f = FONT_BY_ID.get(id);
  if (!f) return Promise.resolve();
  let p = fontLoads.get(id);
  if (!p) {
    p = Promise.all(f.weights.map((w) => {
      const face = new FontFace(famName(id), `url(${opts.base}fonts/tool/${id}-latin-${w}-normal.woff2) format("woff2")`, { weight: String(w), style: 'normal', display: 'swap' });
      document.fonts.add(face);
      return face.load();
    })).then(() => { cache.clearFontCache(famName(id)); }).catch(() => { fontLoads.delete(id); });
    fontLoads.set(id, p);
  }
  return p;
}
const lazyIO = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) {
    const el = e.target as HTMLElement; lazyIO.unobserve(el);
    const id = el.dataset.font!; ensureFont(id).then(() => { el.style.fontFamily = `"${famName(id)}", sans-serif`; });
  }
}, { rootMargin: '150px' }) : null;
function lazyFonts(scope: HTMLElement) {
  scope.querySelectorAll<HTMLElement>('[data-font]').forEach((el) => {
    if (lazyIO) lazyIO.observe(el); else { const id = el.dataset.font!; ensureFont(id).then(() => { el.style.fontFamily = `"${famName(id)}", sans-serif`; }); }
  });
}
const fontNameOf = (family: string) => FONT_BY_FAMILY.get(family)?.family ?? family;

// ------------------------------------------------------------------ public API
export function hasSession() { return built; }
export function closeEditor() {
  if (!built) return;
  closePop(); root.hidden = true;
  document.documentElement.style.overflow = ''; window.removeEventListener('beforeunload', warnUnload);
  opts.onClose?.();
}
export function resumeEditor() {
  if (!built) return;
  root.hidden = false; document.documentElement.style.overflow = 'hidden';
  window.addEventListener('beforeunload', warnUnload); fitView(); canvas.calcOffset();
}
const warnUnload = (e: BeforeUnloadEvent) => { if (histIdx > 0) { e.preventDefault(); e.returnValue = ''; } };

export async function openEditor(o: OpenOptions) {
  opts = o;
  if (!built) build();
  root.hidden = false;
  document.documentElement.style.overflow = 'hidden';
  window.addEventListener('beforeunload', warnUnload);
  try {
    if (o.file) await setPhotoFromFile(o.file, true);
    else if (o.sample) await setPhotoFromSample(o.sample, true);
    else if (o.blank) newBlank(o.blank.w, o.blank.h);
    else newBlank(1080, 1080);
  } catch {
    toast('Sorry, that file could not be opened as an image. Try a JPG, PNG or WebP.', true);
    if (!S.photo && !objs().length) newBlank(1080, 1080);
  }
}

// ------------------------------------------------------------------ DOM
function build() {
  built = true;
  root = document.createElement('div');
  root.className = 'pe'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', 'Add text to photo editor');
  root.innerHTML = `
    <header class="pe-top">
      <button class="pe-btn pe-icon" data-act="exit" aria-label="Back to website" title="Back to website">${ic('back')}</button>
      <span class="pe-title">Add Text to Photo</span>
      <button class="pe-btn" data-pop="resize" aria-label="Resize canvas" title="Resize canvas">${ic('resize')}<span class="lbl">Resize</span></button>
      <span class="pe-sp"></span>
      <button class="pe-btn pe-icon" data-act="undo" aria-label="Undo" title="Undo (Ctrl+Z)">${ic('undo')}</button>
      <button class="pe-btn pe-icon" data-act="redo" aria-label="Redo" title="Redo (Ctrl+Y)">${ic('redo')}</button>
      <span class="pe-sep"></span>
      <button class="pe-btn pe-primary" data-pop="download">${ic('download', 18)}<span class="lbl">Download</span></button>
    </header>
    <div class="pe-main">
      <nav class="pe-rail" role="tablist" aria-label="Tools">
        <button role="tab" data-panel="text">${ic('text', 22)}<span>Text</span></button>
        <button role="tab" data-panel="fonts">${ic('fonts', 22)}<span>Fonts</span></button>
        <button role="tab" data-panel="photo">${ic('photo', 22)}<span>Photo</span></button>
        <button role="tab" data-panel="bg">${ic('bg', 22)}<span>Background</span></button>
        <button role="tab" data-panel="layers">${ic('layers', 22)}<span>Layers</span></button>
      </nav>
      <aside class="pe-panel" data-open>
        <div class="pe-panel-head"><span id="pe-panel-title"></span><button class="pe-btn pe-icon" data-act="panel-close" aria-label="Close panel">${ic('down')}</button></div>
        <div class="pe-panel-body"></div>
      </aside>
      <button class="pe-collapse" data-act="collapse" aria-label="Hide or show panel">${ic('chevL', 16)}</button>
      <section class="pe-stage-wrap">
        <div class="pe-ctx" role="toolbar" aria-label="Text options"></div>
        <div class="pe-stage"><div class="pe-holder"><canvas></canvas></div></div>
        <div class="pe-zoom">
          <button class="pe-btn" data-act="zoom-fit" title="Fit to screen">${ic('fit', 16)}</button>
          <button class="pe-btn pe-icon" style="width:28px;height:28px" data-act="zoom-out" aria-label="Zoom out">${ic('minus', 16)}</button>
          <input type="range" min="5" max="300" value="100" aria-label="Zoom" />
          <button class="pe-btn pe-icon" style="width:28px;height:28px" data-act="zoom-in" aria-label="Zoom in">${ic('plus', 16)}</button>
          <output>100%</output>
        </div>
      </section>
    </div>
    <div class="pe-pop" hidden role="dialog"></div>
    <div class="pe-toast" role="status" hidden></div>
    <input type="file" accept="image/*" hidden data-file="replace" />
    <input type="file" accept="image/*" hidden data-file="add" />`;
  document.body.appendChild(root);

  stageEl = root.querySelector('.pe-stage')!; holderEl = root.querySelector('.pe-holder')!; ctxEl = root.querySelector('.pe-ctx')!;
  panelEl = root.querySelector('.pe-panel')!; panelBody = root.querySelector('.pe-panel-body')!;
  popEl = root.querySelector('.pe-pop')!; toastEl = root.querySelector('.pe-toast')!;
  zoomRange = root.querySelector('.pe-zoom input')!; zoomOut = root.querySelector('.pe-zoom output')!;

  canvas = new Canvas(holderEl.querySelector('canvas') as HTMLCanvasElement, {
    width: S.W, height: S.H, backgroundColor: '#ffffff', preserveObjectStacking: true, enableRetinaScaling: false,
    selection: false, stopContextMenu: true, fireRightClick: false,
  } as Any);
  (root as Any).__canvas = canvas;
  floatEl = document.createElement('div'); floatEl.className = 'pe-float'; floatEl.hidden = true; holderEl.appendChild(floatEl);

  wireEvents();
  new ResizeObserver(() => fitView()).observe(stageEl);
  stageEl.addEventListener('scroll', () => { canvas.calcOffset(); });
  showPanel('text', !isTouchUI());
  renderCtx(); updateHistButtons();
}

// ------------------------------------------------------------------ design size, zoom, photo
function newBlank(w: number, h: number) {
  resetDoc(); S.photo = null; canvas.backgroundImage = undefined; S.origSize = null;
  setBg('#ffffff', ''); setDesign(w, h); fitView(true);
  commit(true); renderCtx(); refreshPanel(true);
  void addText({ kind: 'heading' });
}

function resetDoc() { canvas.discardActiveObject(); canvas.remove(...canvas.getObjects()); hist = []; histIdx = -1; S.filters = { b: 0, c: 0, s: 0 }; S.fit = 'cover'; }

function setDesign(w: number, h: number) {
  S.W = Math.round(w); S.H = Math.round(h);
  canvas.setDimensions({ width: S.W, height: S.H });
  applyBgFill(); fitPhoto(); applyZoom();
}

function fitView(reset = false) {
  if (!built || root.hidden) return;
  if (reset) S.userZoom = false;
  if (!S.userZoom) S.zoom = fitZoom();
  applyZoom();
}
function fitZoom() {
  const pad = isTouchUI() ? 14 : 36;
  const aw = stageEl.clientWidth - pad * 2, ah = stageEl.clientHeight - pad * 2;
  if (aw <= 0 || ah <= 0) return S.zoom;
  return clamp(Math.min(aw / S.W, ah / S.H), 0.04, 1.5);
}
function applyZoom() {
  const z = S.zoom, cw = Math.round(S.W * z), ch = Math.round(S.H * z);
  canvas.setDimensions({ width: `${cw}px`, height: `${ch}px` }, { cssOnly: true } as Any);
  holderEl.style.width = `${cw}px`; holderEl.style.height = `${ch}px`;
  zoomRange.value = String(Math.round(z * 100)); zoomOut.textContent = `${Math.round(z * 100)}%`;
  canvas.calcOffset(); positionFloat();
}
function setZoom(z: number) { S.zoom = clamp(z, 0.05, 3); S.userZoom = true; applyZoom(); }

function fitPhoto(reset = true, tr?: Any) {
  const p = S.photo; if (!p) return;
  if (canvas.getObjects().includes(p.img)) canvas.remove(p.img);
  p.img.set({ originX: 'center', originY: 'center' });
  if (tr) p.img.set(tr);
  else if (reset) { const s = S.fit === 'cover' ? Math.max(S.W / p.w, S.H / p.h) : Math.min(S.W / p.w, S.H / p.h); p.img.set({ left: S.W / 2, top: S.H / 2, scaleX: s, scaleY: s, angle: 0 }); }
  (p.img as Any).isPhoto = true; p.img.set({ selectable: true, evented: true }); styleObj(p.img);
  canvas.insertAt(0, p.img); p.img.setCoords(); canvas.requestRenderAll();
}

function applyFilters() {
  const p = S.photo; if (!p) return;
  const f: Any[] = [];
  if (S.filters.b) f.push(new FabricFilters.Brightness({ brightness: S.filters.b }));
  if (S.filters.c) f.push(new FabricFilters.Contrast({ contrast: S.filters.c }));
  if (S.filters.s) f.push(new FabricFilters.Saturation({ saturation: S.filters.s }));
  p.img.filters = f; p.img.applyFilters(); canvas.requestRenderAll();
}

function setBg(color: string, key: string) {
  S.bgColor = color; S.bgKey = key; applyBgFill();
}
function applyBgFill() {
  if (S.bgKey !== '') {
    const g = GRADIENTS[Number(S.bgKey)]; if (!g) { canvas.backgroundColor = S.bgColor; }
    else {
      const a = (g.angle * Math.PI) / 180, W = S.W, H = S.H, dx = Math.sin(a), dy = -Math.cos(a), len = Math.abs(W * dx) + Math.abs(H * dy);
      canvas.backgroundColor = new Gradient({ type: 'linear', gradientUnits: 'pixels', coords: { x1: W / 2 - (dx * len) / 2, y1: H / 2 - (dy * len) / 2, x2: W / 2 + (dx * len) / 2, y2: H / 2 + (dy * len) / 2 }, colorStops: [{ offset: 0, color: g.stops[0] }, { offset: 1, color: g.stops[1] }] }) as Any;
    }
  } else canvas.backgroundColor = S.bgColor;
  canvas.requestRenderAll();
}

function sizeForPhoto(w: number, h: number) {
  let k = Math.min(1, 3000 / Math.max(w, h));
  if (w * h * k * k > 12_000_000) k = Math.sqrt(12_000_000 / (w * h));
  return { W: Math.max(100, Math.round(w * k)), H: Math.max(100, Math.round(h * k)) };
}

function loadImageEl(url: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('img')); i.src = url; });
}
async function setPhotoFromFile(file: File, fresh: boolean) {
  if (!file.type.startsWith('image/')) throw new Error('type');
  const url = URL.createObjectURL(file);
  try { const el = await loadImageEl(url); installPhoto(el, el.naturalWidth, el.naturalHeight, fresh); }
  finally { URL.revokeObjectURL(url); }
}
function makeSampleCanvas(kind: string) {
  const W = 1600, H = 1066, c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d')!;
  const pal: Record<string, string[]> = { sunset: ['#ff9a56', '#ff4e7e', '#5b3cc4'], ocean: ['#8be3ff', '#1b7fd6', '#0b2a6b'], forest: ['#d4f08a', '#37a65a', '#0d4a3a'] };
  const p = pal[kind] || pal.sunset;
  const gr = g.createLinearGradient(0, 0, W, H); gr.addColorStop(0, p[0]); gr.addColorStop(0.55, p[1]); gr.addColorStop(1, p[2]);
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  const blob = (x: number, y: number, r: number, a: number) => { const rg = g.createRadialGradient(x, y, 0, x, y, r); rg.addColorStop(0, `rgba(255,255,255,${a})`); rg.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = rg; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); };
  blob(W * 0.78, H * 0.28, 320, 0.55); blob(W * 0.2, H * 0.8, 420, 0.22); blob(W * 0.5, H * 0.55, 280, 0.12);
  return c;
}
async function setPhotoFromSample(kind: string, fresh: boolean) { const c = makeSampleCanvas(kind); installPhoto(c, c.width, c.height, fresh); }

function installPhoto(el: CanvasImageSource, w: number, h: number, fresh: boolean) {
  const t = document.createElement('canvas'); const k = 220 / Math.max(w, h); t.width = Math.round(w * k); t.height = Math.round(h * k);
  t.getContext('2d')!.drawImage(el, 0, 0, t.width, t.height);
  const img = new FabricImage(el as Any, { selectable: true, evented: true } as Any); (img as Any).isPhoto = true;
  if (fresh) { resetDoc(); const d = sizeForPhoto(w, h); S.origSize = { w, h }; S.W = d.W; S.H = d.H; }
  S.photo = { img, el, w, h, thumb: t.toDataURL('image/jpeg', 0.7) };
  S.filters = { b: 0, c: 0, s: 0 }; S.fit = 'cover';
  if (fresh) { setBg('#ffffff', ''); setDesign(S.W, S.H); fitView(true); }
  else { fitPhoto(); }
  applyFilters();
  if (fresh) { commit(true); renderCtx(); void addText({ kind: 'heading', text: 'Your text here' }); }
  else { commit(); refreshPanel(true); }
}

// ------------------------------------------------------------------ objects
const EXTRA = ['locked', 'lockMovementX', 'lockMovementY', 'lockScalingX', 'lockScalingY', 'lockRotation'];
function styleObj(o: Any) {
  o.set({ cornerStyle: 'circle', cornerColor: '#ffffff', cornerStrokeColor: '#0a7aff', transparentCorners: false, cornerSize: isTouchUI() ? 16 : 12, touchCornerSize: 34, borderColor: '#0a7aff', borderScaleFactor: 1.8, padding: 6, lockScalingFlip: true, hasControls: !o.locked });
  if (o instanceof Textbox) o.setControlsVisibility({ mt: false, mb: false });
}
const isText = (o: Any) => o instanceof Textbox;
const objs = (): Any[] => (canvas.getObjects() as Any[]).filter((o) => !o.isPhoto);
const active = (): Any => canvas?.getActiveObject();
const activeText = (): Textbox | null => { const a = active(); return a && isText(a) ? a : null; };

function defaultFill() { return S.photo || S.bgColor !== '#ffffff' || S.bgKey !== '' ? '#ffffff' : '#111111'; }
function softShadow(fs: number, color = 'rgba(0,0,0,.55)') { return new Shadow({ color, blur: fs * 0.2, offsetX: 0, offsetY: fs * 0.05 }); }

interface AddSpec { kind?: 'heading' | 'sub' | 'body'; text?: string; font?: string; bold?: boolean; italic?: boolean; size?: number; fill?: string; charSpacing?: number; style?: TextStyleDef; y?: number; select?: boolean; }
async function addText(spec: AddSpec): Promise<Textbox> {
  const sizes = { heading: 0.1, sub: 0.06, body: 0.035 } as const;
  const kind = spec.kind ?? 'heading';
  const st = spec.style;
  const font = st?.font ?? spec.font ?? S.defaultFont;
  await ensureFont(font);
  const fs = Math.round((st?.size ?? spec.size ?? sizes[kind]) * S.W);
  const text = spec.text ?? st?.text ?? (kind === 'heading' ? 'Add a heading' : kind === 'sub' ? 'Add a subheading' : 'Add a little bit of body text');
  const fill = st?.fill ?? spec.fill ?? defaultFill();
  const bold = st ? st.bold : (spec.bold ?? (kind !== 'body'));
  const t = new Textbox(text, {
    left: S.W / 2, top: spec.y ?? S.H / 2 + (objs().length % 6) * S.H * 0.02, originX: 'center', originY: 'center',
    width: Math.min(S.W * 0.84, Math.max(S.W * 0.3, fs * text.length * 0.62)), fontFamily: famName(font), fontSize: fs,
    fontWeight: bold ? 700 : 400, fontStyle: st?.italic ? 'italic' : 'normal', fill, textAlign: 'center', lineHeight: 1.15,
    charSpacing: st?.charSpacing ?? spec.charSpacing ?? 0, paintFirst: 'stroke', strokeLineJoin: 'round', strokeMiterLimit: 2,
  } as Any);
  if (st?.stroke) t.set({ stroke: st.stroke, strokeWidth: (st.strokePct ?? 0.06) * fs });
  if (st?.shadow) t.set({ shadow: new Shadow({ color: st.shadow.color, blur: st.shadow.blur * fs, offsetX: st.shadow.ox * fs, offsetY: st.shadow.oy * fs }) });
  else if (!st && S.photo && kind !== 'body') t.set({ shadow: softShadow(fs) });
  else if (!st && S.photo) t.set({ shadow: softShadow(fs) });
  styleObj(t); canvas.add(t);
  if (spec.select !== false) { canvas.setActiveObject(t); if (!isTouchUI() && !spec.text && !st) { /* keep selected; user double-clicks to edit */ } }
  canvas.requestRenderAll(); noteRecent(font);
  return t;
}

async function addCombo(id: string) {
  const c = FONT_COMBOS.find((x) => x.id === id); if (!c) return;
  const fill = defaultFill();
  await Promise.all([ensureFont(c.head.font), ensureFont(c.sub.font)]);
  const h = await addText({ kind: 'heading', text: c.head.text, font: c.head.font, bold: c.head.bold, size: c.head.size, charSpacing: c.head.charSpacing, fill, y: S.H * 0.46, select: false });
  const s = await addText({ kind: 'sub', text: c.sub.text, font: c.sub.font, bold: c.sub.bold, size: c.sub.size, charSpacing: c.sub.charSpacing, fill, y: S.H * 0.46 + h.getScaledHeight() / 2 + S.H * 0.05, select: false });
  canvas.setActiveObject(h); canvas.requestRenderAll(); commit(); void s;
}

async function addImageFile(file: File) {
  if (!file.type.startsWith('image/')) return toast('That file is not an image.', true);
  const url = URL.createObjectURL(file);
  try {
    const img = await FabricImage.fromURL(url);
    const k = Math.min(1, (S.W * 0.5) / img.width, (S.H * 0.5) / img.height);
    img.set({ left: S.W / 2, top: S.H / 2, originX: 'center', originY: 'center', scaleX: k, scaleY: k });
    styleObj(img); canvas.add(img); canvas.setActiveObject(img); canvas.requestRenderAll(); commit();
  } catch { toast('Could not add that image.', true); }
}

function noteRecent(id: string) { S.recent = [id, ...S.recent.filter((x) => x !== id)].slice(0, 5); try { localStorage.setItem('pe-recent-fonts', JSON.stringify(S.recent)); } catch { /* ignore */ } }
try { S.recent = JSON.parse(localStorage.getItem('pe-recent-fonts') || '[]').filter((x: string) => FONT_BY_ID.has(x)); } catch { /* ignore */ }

// apply a change to the selected text
function withText(fn: (t: Textbox) => void, record = true) {
  const t = activeText(); if (!t) return;
  fn(t); t.setCoords(); canvas.requestRenderAll(); positionFloat();
  if (record) commitSoon();
}
function scaleObjectBy(o: Any, s: number) {
  if (isText(o)) {
    o.set({ fontSize: o.fontSize * s, width: o.width * s, strokeWidth: (o.strokeWidth || 0) * s });
    if (o.shadow) o.set({ shadow: new Shadow({ color: o.shadow.color, blur: o.shadow.blur * s, offsetX: o.shadow.offsetX * s, offsetY: o.shadow.offsetY * s }) });
  } else o.set({ scaleX: o.scaleX * s, scaleY: o.scaleY * s });
}

// ------------------------------------------------------------------ history
function snapshot() {
  return JSON.stringify({ o: objs().map((o: Any) => o.toObject(EXTRA)), ph: S.photo ? { left: S.photo.img.left, top: S.photo.img.top, scaleX: S.photo.img.scaleX, scaleY: S.photo.img.scaleY, angle: S.photo.img.angle } : null, W: S.W, H: S.H, bg: S.bgColor, bk: S.bgKey, fit: S.fit, f: S.filters });
}
function commit(force = false) {
  clearTimeout(commitTimer);
  if (S.photo && canvas.getObjects()[0] !== S.photo.img) canvas.sendObjectToBack(S.photo.img);
  if (S.restoring) return;
  const s = snapshot();
  if (!force && hist[histIdx] === s) return;
  hist = hist.slice(0, histIdx + 1); hist.push(s); if (hist.length > 60) hist.shift();
  histIdx = hist.length - 1; updateHistButtons();
}
const commitSoon = () => { clearTimeout(commitTimer); commitTimer = window.setTimeout(() => commit(), 350); };
async function restore(i: number) {
  if (i < 0 || i >= hist.length || S.restoring) return;
  S.restoring = true;
  try {
    const d = JSON.parse(hist[i]); histIdx = i;
    await Promise.all([...new Set<string>(d.o.map((o: Any) => FONT_BY_FAMILY.get(o.fontFamily)?.id).filter(Boolean))].map(ensureFont));
    canvas.discardActiveObject();
    await canvas.loadFromJSON({ objects: d.o });
    S.fit = d.fit; S.filters = d.f; setBg(d.bg, d.bk);
    S.W = d.W; S.H = d.H; canvas.setDimensions({ width: S.W, height: S.H }); fitPhoto(false, d.ph || undefined); applyFilters(); applyBgFill();
    objs().forEach(styleObj); fitView(); canvas.requestRenderAll();
  } finally { S.restoring = false; }
  updateHistButtons(); renderCtx(); refreshPanel();
}
function updateHistButtons() {
  const u = root?.querySelector<HTMLButtonElement>('[data-act=undo]'), r = root?.querySelector<HTMLButtonElement>('[data-act=redo]');
  if (u) u.disabled = histIdx <= 0; if (r) r.disabled = histIdx >= hist.length - 1;
}

// ------------------------------------------------------------------ toast, popovers
let toastTimer = 0;
function toast(msg: string, error = false) {
  toastEl.textContent = msg; toastEl.classList.toggle('is-error', error); toastEl.hidden = false;
  clearTimeout(toastTimer); toastTimer = window.setTimeout(() => { toastEl.hidden = true; }, 3200);
}
function closePop() { if (!popEl || popEl.hidden) return; popEl.hidden = true; popEl.innerHTML = ''; popAnchor?.setAttribute('aria-expanded', 'false'); popAnchor = null; popKind = ''; }
function openPop(kind: string, anchor: HTMLElement) {
  if (popKind === kind && popAnchor === anchor) return closePop();
  closePop();
  const html = popHTML(kind); if (!html) return;
  popEl.innerHTML = html; popEl.hidden = false; popKind = kind; popAnchor = anchor; anchor.setAttribute('aria-expanded', 'true');
  const r = anchor.getBoundingClientRect(), w = popEl.offsetWidth, h = popEl.offsetHeight;
  let left = clamp(r.left, 8, window.innerWidth - w - 8), top = r.bottom + 6;
  if (top + h > window.innerHeight - 8) top = Math.max(8, r.top - h - 6);
  popEl.style.left = `${left}px`; popEl.style.top = `${top}px`;
  lazyFonts(popEl);
}

function swatchesHTML(attr: string) { return `<div class="pe-swatches">${SWATCHES.map((c) => `<button class="pe-swatch" ${attr}="${c}" style="background:${c}" aria-label="${c}"></button>`).join('')}</div>`; }
function photoColors(): string[] {
  const p = S.photo; if (!p) return [];
  const c = document.createElement('canvas'); c.width = c.height = 40;
  const g = c.getContext('2d', { willReadFrequently: true })!; g.drawImage(p.el, 0, 0, 40, 40);
  const d = g.getImageData(0, 0, 40, 40).data, bucket = new Map<number, number>();
  for (let i = 0; i < d.length; i += 4) { const k = ((d[i] >> 4) << 8) | ((d[i + 1] >> 4) << 4) | (d[i + 2] >> 4); bucket.set(k, (bucket.get(k) || 0) + 1); }
  const out: number[][] = [];
  for (const [k] of [...bucket.entries()].sort((a, b) => b[1] - a[1])) {
    const rgb = [((k >> 8) & 15) * 17, ((k >> 4) & 15) * 17, (k & 15) * 17];
    if (out.every((o) => Math.hypot(o[0] - rgb[0], o[1] - rgb[1], o[2] - rgb[2]) > 60)) out.push(rgb);
    if (out.length >= 6) break;
  }
  return out.map(([r, g2, b]) => '#' + [r, g2, b].map((v) => v.toString(16).padStart(2, '0')).join(''));
}
const toHex = (c: Any): string => {
  if (typeof c !== 'string') return '#ffffff';
  if (/^#[0-9a-f]{6}$/i.test(c)) return c.toLowerCase();
  if (/^#[0-9a-f]{3}$/i.test(c)) return '#' + c.slice(1).split('').map((x) => x + x).join('').toLowerCase();
  const m = c.match(/rgba?\((\d+)[ ,]+(\d+)[ ,]+(\d+)/); if (m) return '#' + [m[1], m[2], m[3]].map((v) => Number(v).toString(16).padStart(2, '0')).join('');
  return '#000000';
};

function popHTML(kind: string): string {
  const t = activeText(), a = active();
  if (kind === 'color' && t) {
    const cur = toHex(t.fill), pc = photoColors();
    return `<div class="pe-colorrow"><input type="color" data-color="fill" value="${cur}" aria-label="Pick color" /><input class="pe-input" data-hex value="${cur}" maxlength="7" aria-label="Hex color" />${'EyeDropper' in window ? `<button class="pe-btn pe-icon pe-outline" data-eyedrop aria-label="Pick from screen" title="Pick from screen">${ic('dropper', 18)}</button>` : ''}</div>
      ${pc.length ? `<h4>Photo colors</h4><div class="pe-swatches">${pc.map((c) => `<button class="pe-swatch" data-fill="${c}" style="background:${c}" aria-label="${c}"></button>`).join('')}</div>` : ''}
      <h4>Colors</h4>${swatchesHTML('data-fill')}`;
  }
  if (kind === 'spacing' && t) {
    return `<h4>Spacing</h4>
      <label class="pe-field"><span>Letter</span><input type="range" min="-100" max="800" step="5" data-sp="charSpacing" value="${t.charSpacing || 0}" /><output>${t.charSpacing || 0}</output></label>
      <label class="pe-field"><span>Line</span><input type="range" min="0.7" max="2.6" step="0.05" data-sp="lineHeight" value="${t.lineHeight}" /><output>${t.lineHeight.toFixed(2)}</output></label>`;
  }
  if (kind === 'effects' && t) {
    const sh = t.shadow as Any, fs = t.fontSize, hasStroke = !!t.stroke && (t.strokeWidth || 0) > 0;
    return `<h4>Shadow</h4>
      <div class="pe-grid3">
        <button class="pe-tile" data-shadow="none">None</button><button class="pe-tile" data-shadow="soft">Soft</button><button class="pe-tile" data-shadow="hard">Hard</button>
        <button class="pe-tile" data-shadow="glow">Glow</button><button class="pe-tile" data-shadow="neon">Neon</button><button class="pe-tile" data-shadow="lift">Lift</button>
      </div>
      <label class="pe-field"><span>Blur</span><input type="range" min="0" max="60" step="1" data-fx="sblur" value="${sh ? Math.round((sh.blur / fs) * 100) : 20}" ${sh ? '' : 'disabled'} /><output></output></label>
      <label class="pe-field"><span>Offset</span><input type="range" min="0" max="25" step="1" data-fx="soff" value="${sh ? Math.round((sh.offsetY / fs) * 100) : 5}" ${sh ? '' : 'disabled'} /><output></output></label>
      <label class="pe-field"><span>Color</span><input type="color" data-fx="scolor" value="${sh ? toHex(sh.color) : '#000000'}" ${sh ? '' : 'disabled'} /><output></output></label>
      <h4>Outline</h4>
      <label class="pe-field"><span>Width</span><input type="range" min="0" max="30" step="1" data-fx="swidth" value="${hasStroke ? Math.round(((t.strokeWidth || 0) / fs) * 100) : 0}" /><output></output></label>
      <label class="pe-field"><span>Color</span><input type="color" data-fx="scol" value="${toHex(t.stroke || '#000000')}" /><output></output></label>
      <h4>Highlight</h4>
      <div class="pe-colorrow" style="margin-bottom:0"><label class="pe-check" style="margin:0"><input type="checkbox" data-fx="hlon" ${t.textBackgroundColor ? 'checked' : ''} /> Highlight</label><span style="flex:1"></span><input type="color" data-fx="hlcol" value="${toHex(t.textBackgroundColor || '#000000')}" aria-label="Highlight color" /></div>
      <h4>Transparency</h4>
      <label class="pe-field"><span>Opacity</span><input type="range" min="5" max="100" step="1" data-fx="opacity" value="${Math.round((t.opacity ?? 1) * 100)}" /><output></output></label>`;
  }
  if (kind === 'opacity' && a) {
    return `<h4>Transparency</h4><label class="pe-field"><span>Opacity</span><input type="range" min="5" max="100" step="1" data-fx="opacity" value="${Math.round((a.opacity ?? 1) * 100)}" /><output></output></label>`;
  }
  if (kind === 'position' && a) {
    return `<h4>Arrange</h4>
      <div class="pe-grid2"><button class="pe-tile" data-arr="forward">${ic('up')}Forward</button><button class="pe-tile" data-arr="backward">${ic('down')}Backward</button><button class="pe-tile" data-arr="front">${ic('up')}To front</button><button class="pe-tile" data-arr="back">${ic('down')}To back</button></div>
      <h4>Align to page</h4>
      <div class="pe-grid3">
        <button class="pe-tile" data-aln="left">${ic('alignHLeft')}Left</button><button class="pe-tile" data-aln="center">${ic('alignHCenter')}Center</button><button class="pe-tile" data-aln="right">${ic('alignHRight')}Right</button>
        <button class="pe-tile" data-aln="top">${ic('alignTop')}Top</button><button class="pe-tile" data-aln="middle">${ic('alignMiddle')}Middle</button><button class="pe-tile" data-aln="bottom">${ic('alignBottom')}Bottom</button>
      </div>
      <h4>Rotate</h4>
      <label class="pe-field"><span>Angle</span><input type="range" min="-180" max="180" step="1" data-fx="angle" value="${Math.round(((a.angle + 540) % 360) - 180)}" /><output></output></label>`;
  }
  if (kind === 'resize') {
    const groups = ['Social', 'Print', 'Other'].map((g) => `<h4>${g}</h4><div class="pe-sizelist">${SIZE_PRESETS.filter((p) => p.group === g).map((p) => `<button class="pe-sizerow" data-size="${p.w}x${p.h}" ${p.w === S.W && p.h === S.H ? 'aria-current="true"' : ''}><span>${p.label}</span><small>${p.w} × ${p.h}</small></button>`).join('')}</div>`).join('');
    const orig = S.origSize ? (() => { const d = sizeForPhoto(S.origSize!.w, S.origSize!.h); return `<h4>Photo</h4><div class="pe-sizelist"><button class="pe-sizerow" data-size="${d.W}x${d.H}"><span>Original photo size</span><small>${d.W} × ${d.H}</small></button></div>`; })() : '';
    return `<h4>Custom size (px)</h4>
      <div class="pe-dims"><input class="pe-input" type="number" min="100" max="${MAX_SIDE}" data-w value="${S.W}" aria-label="Width" /><button class="pe-btn pe-icon pe-outline" data-lock aria-pressed="${S.lockRatio}" title="Lock aspect ratio">${ic(S.lockRatio ? 'lock' : 'unlock', 16)}</button><input class="pe-input" type="number" min="100" max="${MAX_SIDE}" data-h value="${S.H}" aria-label="Height" /></div>
      <button class="pe-btn pe-primary" style="width:100%;margin-top:10px" data-apply-size>Resize</button>${orig}${groups}`;
  }
  if (kind === 'download') {
    const opts2 = exportScales().map((s) => `<button class="pe-sizerow" data-scale="${s.id}" ${S.exp.scale === s.id ? 'aria-current="true"' : ''} ${s.ok ? '' : 'disabled style="opacity:.4"'}><span>${s.label}</span><small>${s.w} × ${s.h}</small></button>`).join('');
    return `<h4>File type</h4><div class="pe-seg" role="group"><button data-fmt="png" aria-pressed="${S.exp.fmt === 'png'}">PNG</button><button data-fmt="jpeg" aria-pressed="${S.exp.fmt === 'jpeg'}">JPG</button><button data-fmt="webp" aria-pressed="${S.exp.fmt === 'webp'}">WebP</button></div>
      <div data-qwrap ${S.exp.fmt === 'png' ? 'hidden' : ''}><label class="pe-field"><span>Quality</span><input type="range" min="50" max="100" step="1" data-q value="${Math.round(S.exp.q * 100)}" /><output>${Math.round(S.exp.q * 100)}%</output></label></div>
      <h4>Size</h4><div class="pe-sizelist">${opts2}</div>
      <button class="pe-btn pe-primary" style="width:100%;margin-top:12px;height:42px" data-do-download>${ic('download', 18)} Download</button>
      <p style="margin:10px 0 0;font-size:12px;color:var(--color-text-muted)">No watermark. Your photo never leaves your device.</p>`;
  }
  return '';
}

// popover events (delegated)
function wirePopEvents() {
  popEl.addEventListener('click', async (e) => {
    const el = e.target as HTMLElement; const b = el.closest<HTMLElement>('button'); if (!b) return;
    const d = b.dataset;
    if (d.fill) { applyFill(d.fill); (popEl.querySelector('[data-color=fill]') as HTMLInputElement | null)?.setAttribute('value', d.fill); const cin = popEl.querySelector<HTMLInputElement>('[data-color=fill]'); if (cin) cin.value = d.fill; const hx = popEl.querySelector<HTMLInputElement>('[data-hex]'); if (hx) hx.value = d.fill; }
    else if ('eyedrop' in d) { try { const r = await new (window as Any).EyeDropper().open(); applyFill(r.sRGBHex); const cin = popEl.querySelector<HTMLInputElement>('[data-color=fill]'); if (cin) cin.value = r.sRGBHex; } catch { /* cancelled */ } }
    else if (d.shadow) { applyShadowPreset(d.shadow); closePop(); }
    else if (d.arr) { arrange(d.arr); }
    else if (d.aln) { alignPage(d.aln); }
    else if (d.size) { const [w, h] = d.size.split('x').map(Number); resizeDesign(w, h); closePop(); }
    else if ('lock' in d) { S.lockRatio = !S.lockRatio; b.setAttribute('aria-pressed', String(S.lockRatio)); b.innerHTML = ic(S.lockRatio ? 'lock' : 'unlock', 16); }
    else if ('applySize' in d) {
      const w = clamp(Math.round(Number(popEl.querySelector<HTMLInputElement>('[data-w]')!.value) || S.W), 100, MAX_SIDE), h = clamp(Math.round(Number(popEl.querySelector<HTMLInputElement>('[data-h]')!.value) || S.H), 100, MAX_SIDE);
      if (w * h > MAX_EXPORT_AREA) return toast('That size is too large. Try under 16 megapixels (for example 4000 × 4000).', true);
      resizeDesign(w, h); closePop();
    }
    else if (d.fmt) { S.exp.fmt = d.fmt as Any; popEl.querySelectorAll('[data-fmt]').forEach((x) => x.setAttribute('aria-pressed', String((x as HTMLElement).dataset.fmt === d.fmt))); popEl.querySelector('[data-qwrap]')!.toggleAttribute('hidden', d.fmt === 'png'); }
    else if (d.scale) { S.exp.scale = d.scale; popEl.querySelectorAll('[data-scale]').forEach((x) => (x as HTMLElement).toggleAttribute('aria-current', (x as HTMLElement).dataset.scale === d.scale)); popEl.querySelectorAll('[data-scale]').forEach((x) => { if ((x as HTMLElement).dataset.scale === d.scale) x.setAttribute('aria-current', 'true'); else x.removeAttribute('aria-current'); }); }
    else if ('doDownload' in d) { b.setAttribute('disabled', ''); await exportImage(); b.removeAttribute('disabled'); closePop(); }
  });
  popEl.addEventListener('input', (e) => {
    const el = e.target as HTMLInputElement; const d = el.dataset;
    if (d.color === 'fill') { applyFill(el.value, false); const hx = popEl.querySelector<HTMLInputElement>('[data-hex]'); if (hx) hx.value = el.value; }
    else if ('hex' in d) { if (/^#[0-9a-f]{6}$/i.test(el.value)) { applyFill(el.value, false); popEl.querySelector<HTMLInputElement>('[data-color=fill]')!.value = el.value; } }
    else if (d.sp) { const v = parseFloat(el.value); withText((t) => t.set(d.sp as Any, v)); (el.nextElementSibling as HTMLElement).textContent = d.sp === 'lineHeight' ? v.toFixed(2) : String(v); }
    else if (d.fx) { applyFx(d.fx, el); }
    else if ('q' in d) { S.exp.q = Number(el.value) / 100; (el.nextElementSibling as HTMLElement).textContent = `${el.value}%`; }
  });
  popEl.addEventListener('change', (e) => {
    const el = e.target as HTMLInputElement; const d = el.dataset;
    if (d.color === 'fill' || d.fx || d.sp) commit();
    if ('w' in d || 'h' in d) { /* handled below */ }
  });
  popEl.addEventListener('input', (e) => {
    const el = e.target as HTMLInputElement; if (!('w' in el.dataset) && !('h' in el.dataset)) return;
    if (!S.lockRatio) return; const ratio = S.W / S.H;
    const other = popEl.querySelector<HTMLInputElement>('w' in el.dataset ? '[data-h]' : '[data-w]')!;
    const v = Number(el.value) || 0; other.value = String(Math.round('w' in el.dataset ? v / ratio : v * ratio));
  });
}

function applyFill(hex: string, record = true) { const t = activeText(); if (!t) return; t.set('fill', hex); canvas.requestRenderAll(); refreshCtxColor(); if (record) commitSoon(); }
function applyShadowPreset(kind: string) {
  withText((t) => {
    const fs = t.fontSize, sh = (c: string, b: number, ox: number, oy: number) => new Shadow({ color: c, blur: b * fs, offsetX: ox * fs, offsetY: oy * fs });
    const map: Record<string, Any> = { none: null, soft: sh('rgba(0,0,0,.55)', 0.2, 0, 0.05), hard: sh('rgba(0,0,0,.85)', 0, 0.05, 0.05), glow: sh('rgba(255,255,255,.9)', 0.4, 0, 0), neon: sh('#ff2bd6', 0.5, 0, 0), lift: sh('rgba(0,0,0,.45)', 0.25, 0, 0.12) };
    t.set('shadow', map[kind] ?? null);
  });
  commit();
}
function applyFx(k: string, el: HTMLInputElement) {
  const v = parseFloat(el.value); const out = el.parentElement?.querySelector('output') as HTMLElement | null;
  const a = active(); if (!a) return;
  if (k === 'opacity') { a.set('opacity', v / 100); canvas.requestRenderAll(); commitSoon(); return; }
  if (k === 'angle') { a.rotate(v); a.setCoords(); canvas.requestRenderAll(); positionFloat(); commitSoon(); return; }
  const t = activeText(); if (!t) return; const fs = t.fontSize;
  if (k === 'sblur' || k === 'soff' || k === 'scolor') {
    const sh = (t.shadow as Any) || new Shadow({ color: '#000000', blur: fs * 0.2, offsetX: 0, offsetY: fs * 0.05 });
    const cur = { color: sh.color, blur: sh.blur, offsetX: sh.offsetX, offsetY: sh.offsetY };
    if (k === 'sblur') cur.blur = (v / 100) * fs; if (k === 'soff') { cur.offsetY = (v / 100) * fs; cur.offsetX = 0; } if (k === 'scolor') cur.color = el.value;
    withText((x) => x.set('shadow', new Shadow(cur)));
  } else if (k === 'swidth') withText((x) => x.set({ stroke: (x.stroke as string) || '#000000', strokeWidth: (v / 100) * fs }));
  else if (k === 'scol') withText((x) => x.set({ stroke: el.value, strokeWidth: x.strokeWidth || fs * 0.06 }));
  else if (k === 'hlon') withText((x) => x.set('textBackgroundColor', el.checked ? (popEl.querySelector<HTMLInputElement>('[data-fx=hlcol]')!.value) : ''));
  else if (k === 'hlcol') withText((x) => { if (x.textBackgroundColor || popEl.querySelector<HTMLInputElement>('[data-fx=hlon]')!.checked) x.set('textBackgroundColor', el.value); });
  if (out) out.textContent = '';
}

function arrange(kind: string) {
  const a = active(); if (!a) return;
  if (kind === 'forward') canvas.bringObjectForward(a); else if (kind === 'backward') canvas.sendObjectBackwards(a);
  else if (kind === 'front') canvas.bringObjectToFront(a); else canvas.sendObjectToBack(a);
  canvas.requestRenderAll(); commit(); refreshPanel();
}
function alignPage(kind: string) {
  const a = active(); if (!a) return; const r = a.getBoundingRect();
  if (kind === 'left') a.set('left', a.left - r.left); else if (kind === 'center') a.set('left', a.left + (S.W / 2 - (r.left + r.width / 2))); else if (kind === 'right') a.set('left', a.left + (S.W - (r.left + r.width)));
  else if (kind === 'top') a.set('top', a.top - r.top); else if (kind === 'middle') a.set('top', a.top + (S.H / 2 - (r.top + r.height / 2))); else if (kind === 'bottom') a.set('top', a.top + (S.H - (r.top + r.height)));
  a.setCoords(); canvas.requestRenderAll(); positionFloat(); commit();
}

function resizeDesign(w: number, h: number) {
  if (w === S.W && h === S.H) return;
  const sx = w / S.W, sy = h / S.H, s = Math.min(sx, sy);
  canvas.discardActiveObject();
  for (const o of objs()) { o.set({ left: o.left * sx, top: o.top * sy }); scaleObjectBy(o, s); o.setCoords(); }
  S.origSize = S.origSize && Math.abs(w / h - S.W / S.H) < 0.001 ? S.origSize : null;
  setDesign(w, h); fitView(true); commit(); renderCtx(); refreshPanel(); toast(`Canvas resized to ${w} × ${h}`);
}

// ------------------------------------------------------------------ export
function exportScales() {
  const list: { id: string; label: string; w: number; h: number; ok: boolean }[] = [];
  const mk = (id: string, label: string, m: number) => { const w = Math.round(S.W * m), h = Math.round(S.H * m); list.push({ id, label, w, h, ok: w * h <= MAX_EXPORT_AREA && Math.max(w, h) <= MAX_SIDE }); };
  mk('0.5', 'Small (0.5×)', 0.5); mk('1', 'Standard (1×)', 1); mk('2', 'Large (2×)', 2);
  if (S.origSize && S.origSize.w > S.W * 1.05) { const m = S.origSize.w / S.W; const w = S.origSize.w, h = Math.round(S.H * m); list.push({ id: 'orig', label: 'Original photo size', w, h, ok: w * h <= MAX_EXPORT_AREA && Math.max(w, h) <= MAX_SIDE }); }
  if (!list.some((x) => x.id === S.exp.scale && x.ok)) S.exp.scale = '1';
  return list;
}
async function exportImage() {
  try {
    await Promise.all((objs().map((o: Any) => FONT_BY_FAMILY.get(o.fontFamily)?.id).filter(Boolean) as string[]).map(ensureFont));
    await document.fonts.ready;
    canvas.discardActiveObject(); canvas.requestRenderAll();
    const sc = exportScales().find((x) => x.id === S.exp.scale && x.ok) ?? exportScales()[1];
    const mult = sc.w / S.W;
    let el = canvas.toCanvasElement(mult);
    const mime = `image/${S.exp.fmt}`;
    if (S.exp.fmt === 'jpeg') { const c2 = document.createElement('canvas'); c2.width = el.width; c2.height = el.height; const g = c2.getContext('2d')!; g.fillStyle = '#ffffff'; g.fillRect(0, 0, c2.width, c2.height); g.drawImage(el, 0, 0); el = c2; }
    const blob: Blob | null = await new Promise((res) => el.toBlob(res, mime, S.exp.q));
    if (!blob) throw new Error('blob');
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `text-on-photo.${S.exp.fmt === 'jpeg' ? 'jpg' : S.exp.fmt}`;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    toast('Downloaded');
  } catch { toast('Sorry, the image could not be exported. Try a smaller size or another format.', true); }
}

// ------------------------------------------------------------------ context toolbar + floating bar
function refreshCtxColor() { const b = ctxEl.querySelector<HTMLElement>('.pe-colorbtn b'); const t = activeText(); if (b && t) b.style.background = toHex(t.fill); }
function renderCtx() {
  if (!ctxEl) return;
  const t = activeText(), a = active();
  if (t) {
    const fam = FONT_BY_FAMILY.get(t.fontFamily as string); const fid = fam?.id ?? '';
    const sizeDisp = Math.round((t.fontSize * (t.scaleY || 1) * BASE_W) / S.W);
    const al = t.textAlign === 'left' ? 'alignLeft' : t.textAlign === 'right' ? 'alignRight' : 'alignCenter';
    const tog = (act: string, icn: string, on: boolean, label: string) => `<button class="pe-btn pe-icon" data-act="${act}" aria-pressed="${on}" aria-label="${label}" title="${label}">${ic(icn, 18)}</button>`;
    ctxEl.innerHTML = `
      <button class="pe-btn pe-fontbtn" data-act="font-open" title="Change font"><span style="font-family:'${t.fontFamily}',sans-serif">${esc(fam?.family ?? String(t.fontFamily))}</span>${ic('down', 16)}</button>
      <div class="pe-size"><button data-act="size-dec" aria-label="Decrease size">${ic('minus', 14)}</button><input type="number" data-in="size" min="4" max="999" value="${sizeDisp}" aria-label="Font size" /><button data-act="size-inc" aria-label="Increase size">${ic('plus', 14)}</button></div>
      <button class="pe-btn pe-colorbtn" data-pop="color" title="Text color" aria-label="Text color"><span>A</span><b style="background:${toHex(t.fill)}"></b></button>
      <span class="pe-sep"></span>
      ${tog('bold', 'bold', Number(t.fontWeight) >= 600, 'Bold')}${tog('italic', 'italic', t.fontStyle === 'italic', 'Italic')}${tog('underline', 'underline', !!t.underline, 'Underline')}${tog('strike', 'strike', !!t.linethrough, 'Strikethrough')}
      <button class="pe-btn pe-icon" data-act="case" aria-label="Change case" title="Change case">${ic('case', 18)}</button>
      <button class="pe-btn pe-icon" data-act="align" aria-label="Text alignment" title="Alignment">${ic(al, 18)}</button>
      <span class="pe-sep"></span>
      <button class="pe-btn" data-pop="spacing" title="Spacing">${ic('spacing', 18)}<span class="lbl">Spacing</span></button>
      <button class="pe-btn" data-pop="effects" title="Effects">${ic('effects', 18)}<span class="lbl">Effects</span></button>
      <button class="pe-btn" data-pop="position" title="Position">${ic('position', 18)}<span class="lbl">Position</span></button>`;
    void fid;
  } else if (a) {
    ctxEl.innerHTML = `
      <button class="pe-btn" data-act="flip" title="Flip horizontally">${ic('flip', 18)}<span class="lbl">Flip</span></button>
      <button class="pe-btn" data-pop="opacity" title="Transparency">${ic('effects', 18)}<span class="lbl">Transparency</span></button>
      <button class="pe-btn" data-pop="position" title="Position">${ic('position', 18)}<span class="lbl">Position</span></button>`;
  } else {
    ctxEl.innerHTML = `<button class="pe-btn pe-outline" data-act="add-text">${ic('plus', 16)}<span>Add text</span></button><span class="pe-ctx-hint">&nbsp;Tap a text to edit it. Double-click to type.&nbsp;·&nbsp;${S.W} × ${S.H}px</span>`;
  }
}

function positionFloat() {
  const a = active();
  if (!a || (a as Any).isEditing || dragging || S.restoring || a.type === 'activeselection') { floatEl.hidden = true; return; }
  const r = a.getBoundingRect(), z = S.zoom;
  floatEl.innerHTML = `${isText(a) ? `<button class="pe-btn" data-act="edit" aria-label="Edit text" title="Edit text">${ic('edit', 17)}</button>` : ''}
    <button class="pe-btn" data-act="lock" aria-label="${(a as Any).locked ? 'Unlock' : 'Lock'}" title="${(a as Any).locked ? 'Unlock' : 'Lock'}">${ic((a as Any).locked ? 'lock' : 'unlock', 17)}</button>
    <button class="pe-btn" data-act="dup" aria-label="Duplicate" title="Duplicate (Ctrl+D)">${ic('duplicate', 17)}</button>
    <button class="pe-btn" data-act="del" aria-label="Delete" title="Delete">${ic('trash', 17)}</button>`;
  floatEl.hidden = false;
  const fw = floatEl.offsetWidth, fh = floatEl.offsetHeight, hw = holderEl.offsetWidth;
  let top = r.top * z - fh - 30; if (top < -50) top = (r.top + r.height) * z + 30;
  const cx = clamp((r.left + r.width / 2) * z, fw / 2 - 40, hw + 40 - fw / 2);
  floatEl.style.left = `${cx}px`; floatEl.style.top = `${top}px`;
}

// ------------------------------------------------------------------ panels
const PANEL_TITLES: Record<string, string> = { text: 'Text', fonts: 'Fonts', photo: 'Photo', bg: 'Background', layers: 'Layers' };
function showPanel(name: string, open = true) {
  S.panel = name;
  root.querySelectorAll<HTMLElement>('.pe-rail [data-panel]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.panel === name)));
  root.querySelector('#pe-panel-title')!.textContent = PANEL_TITLES[name] || '';
  panelEl.toggleAttribute('data-open', open);
  if (open && !isTouchUI()) { panelEl.removeAttribute('data-collapsed'); root.querySelector('.pe-collapse')!.removeAttribute('data-collapsed'); }
  refreshPanel(true);
  setTimeout(() => fitView(), 220);
}
function refreshPanel(rebuild = false) {
  if (!panelBody) return;
  if (S.panel === 'layers') { panelBody.innerHTML = layersHTML(); return; }
  if (!rebuild) { if (S.panel === 'fonts') markFont(); if (S.panel === 'photo') { /* static */ } return; }
  if (S.panel === 'text') { panelBody.innerHTML = textPanelHTML(); lazyFonts(panelBody); }
  else if (S.panel === 'fonts') { panelBody.innerHTML = fontsPanelHTML(); renderFontRows(); }
  else if (S.panel === 'photo') panelBody.innerHTML = photoPanelHTML();
  else if (S.panel === 'bg') panelBody.innerHTML = bgPanelHTML();
}

function textPanelHTML() {
  const pcss = (s: TextStyleDef) => { const fs = 30; return `font-size:${s.size > 0.12 ? 28 : 24}px;color:${s.fill};font-weight:${s.bold ? 700 : 400};font-style:${s.italic ? 'italic' : 'normal'};letter-spacing:${s.charSpacing / 1000}em;${s.stroke ? `-webkit-text-stroke:${(s.strokePct ?? 0.06) * fs}px ${s.stroke};` : ''}${s.shadow ? `text-shadow:${s.shadow.ox * fs}px ${s.shadow.oy * fs}px ${s.shadow.blur * fs}px ${s.shadow.color};` : ''}`; };
  return `<button class="pe-btn pe-primary pe-addbtn" data-add="box">${ic('plus', 18)} Add a text box</button>
    <h3>Default text styles</h3>
    <button class="pe-deftext" data-add="heading" style="font-size:26px;font-weight:700">Add a heading</button>
    <button class="pe-deftext" data-add="sub" style="font-size:18px;font-weight:600">Add a subheading</button>
    <button class="pe-deftext" data-add="body" style="font-size:14px">Add a little bit of body text</button>
    <h3>Font combinations</h3>
    <div class="pe-grid2">${FONT_COMBOS.map((c) => `<button class="pe-preview pe-combo" data-combo="${c.id}" aria-label="${esc(c.head.text)}"><span data-font="${c.head.font}" style="font-size:19px;font-weight:${c.head.bold ? 700 : 400}">${esc(c.head.text)}</span><span data-font="${c.sub.font}" style="font-size:10.5px;letter-spacing:${(c.sub.charSpacing ?? 0) / 1000}em">${esc(c.sub.text)}</span></button>`).join('')}</div>
    <h3>Text styles</h3>
    <div class="pe-grid2">${TEXT_STYLES.map((s) => `<button class="pe-preview" data-style="${s.id}" aria-label="${s.label}"><span data-font="${s.font}" style="${pcss(s)}">${esc(s.text)}</span></button>`).join('')}</div>`;
}

function fontsPanelHTML() {
  return `<div class="pe-fonthead"><div class="pe-search"><span>${ic('search', 18)}</span><input class="pe-input" data-fsearch type="search" placeholder="Search fonts" aria-label="Search fonts" value="${esc(S.fontQuery)}" /></div>
    <div class="pe-chips" role="group" aria-label="Font categories">${[['all', 'All'], ['sans', 'Sans'], ['serif', 'Serif'], ['display', 'Display'], ['script', 'Script'], ['mono', 'Mono']].map(([k, l]) => `<button class="pe-chip" data-fcat="${k}" aria-pressed="${S.fontCat === k}">${l}</button>`).join('')}</div></div>
    <div data-flist role="listbox" aria-label="Fonts"></div>`;
}
const catName: Record<string, string> = { sans: 'Sans', serif: 'Serif', display: 'Display', script: 'Script', mono: 'Mono' };
function renderFontRows() {
  const list = panelBody.querySelector<HTMLElement>('[data-flist]'); if (!list) return;
  const q = S.fontQuery.trim().toLowerCase(), cur = FONT_BY_FAMILY.get(String(activeText()?.fontFamily ?? ''))?.id ?? S.defaultFont;
  const items = TOOL_FONTS.filter((f) => (S.fontCat === 'all' || f.category === S.fontCat) && (!q || f.family.toLowerCase().includes(q)));
  const row = (f: ToolFont) => `<button class="pe-fontrow" role="option" data-fid="${f.id}" aria-selected="${f.id === cur}"><span data-font="${f.id}">${esc(f.family)}</span>${f.id === cur ? ic('check', 16) : `<small>${catName[f.category]}</small>`}</button>`;
  let html = '';
  const recent = !q && S.fontCat === 'all' ? S.recent.map((id) => FONT_BY_ID.get(id)).filter(Boolean) as ToolFont[] : [];
  if (recent.length) html += `<h3>Recently used</h3>${recent.map(row).join('')}<h3>All fonts</h3>`;
  html += items.length ? items.map(row).join('') : `<p class="pe-empty">No fonts match your search.</p>`;
  list.innerHTML = html; lazyFonts(list);
  list.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
}
function markFont() { if (S.panel === 'fonts') renderFontRows(); }

async function applyFont(id: string) {
  await ensureFont(id);
  S.defaultFont = id; noteRecent(id);
  const t = activeText();
  if (t) { t.set('fontFamily', famName(id)); t.initDimensions(); t.setCoords(); canvas.requestRenderAll(); positionFloat(); commit(); renderCtx(); }
  else toast(`New text will use ${FONT_BY_ID.get(id)?.family}. Select a text to change its font.`);
  renderFontRows();
}

function photoPanelHTML() {
  const p = S.photo;
  const sl = (k: string, label: string, min: number, max: number, v: number) => `<label class="pe-field"><span>${label}</span><input type="range" min="${min}" max="${max}" step="1" data-filter="${k}" value="${Math.round(v * 100)}" /><output>${Math.round(v * 100)}</output></label>`;
  return `${p ? `<img class="pe-thumb" src="${p.thumb}" alt="Current photo" />` : `<div class="pe-thumbwrap">No photo yet</div>`}
    <div class="pe-grid2" style="margin-top:10px"><button class="pe-btn pe-outline" data-act="replace-photo">${ic('upload', 18)} ${p ? 'Replace' : 'Upload photo'}</button><button class="pe-btn pe-outline" data-act="remove-photo" ${p ? '' : 'disabled'}>${ic('trash', 18)} Remove</button></div>
    ${p ? `<h3>Fit</h3><div class="pe-seg"><button data-fit="cover" aria-pressed="${S.fit === 'cover'}">Fill page</button><button data-fit="contain" aria-pressed="${S.fit === 'contain'}">Fit inside</button></div>
    <p class="pe-empty">Tip: tap the photo on the canvas to move, resize or rotate it with the corner handles.</p>
    <h3>Adjust</h3>${sl('b', 'Brightness', -60, 60, S.filters.b)}${sl('c', 'Contrast', -60, 60, S.filters.c)}${sl('s', 'Saturation', -80, 80, S.filters.s)}
    <button class="pe-btn pe-outline" style="width:100%" data-act="reset-filters">Reset adjustments</button>` : ''}
    <h3>Add image</h3><button class="pe-btn pe-outline" style="width:100%" data-act="add-image">${ic('image', 18)} Add a logo or sticker</button>
    <p class="pe-empty">You can also drag and drop a photo onto the page, or paste one with Ctrl+V.</p>`;
}
function bgPanelHTML() {
  const p = S.photo;
  const imgSec = `<h3 style="margin-top:0">Background image</h3>
    ${p ? `<img class="pe-thumb" src="${p.thumb}" alt="Current background image" />` : ''}
    <div class="pe-grid2" style="margin-top:${p ? 10 : 0}px"><button class="pe-btn pe-outline" data-act="replace-photo">${ic('upload', 18)} ${p ? 'Replace image' : 'Upload image'}</button><button class="pe-btn pe-outline" data-act="remove-photo" ${p ? '' : 'disabled'}>${ic('trash', 18)} Remove</button></div>
    ${p ? `<div class="pe-seg" style="margin-top:10px"><button data-fit="cover" aria-pressed="${S.fit === 'cover'}">Fill page</button><button data-fit="contain" aria-pressed="${S.fit === 'contain'}">Fit inside</button></div>` : ''}`;
  return `${imgSec}<h3>Color</h3><div class="pe-colorrow"><input type="color" data-bgcolor value="${toHex(S.bgColor)}" aria-label="Pick background color" /><span class="pe-empty" style="padding:0">Custom color</span></div>
    <h3>Solid colors</h3>${swatchesHTML('data-bg')}
    <h3>Gradients</h3><div class="pe-grid3">${GRADIENTS.map((g, i) => `<button class="pe-preview" data-bggrad="${i}" style="min-height:56px;background:linear-gradient(${g.angle}deg,${g.stops[0]},${g.stops[1]})" aria-label="${g.name}"></button>`).join('')}</div>
    <p class="pe-empty">${S.photo ? 'The background shows when the photo is set to "Fit inside" or removed.' : 'Choose a background color or gradient for your page.'}</p>`;
}
function layersHTML() {
  const layerObjs = [...(canvas ? objs() : [])].reverse() as Any[], cur = active();
  if (!layerObjs.length) return `<p class="pe-empty">No layers yet. Add some text to get started.</p>`;
  return layerObjs.map((o, i) => {
    const name = isText(o) ? (o.text || '').replace(/\s+/g, ' ').slice(0, 40) || 'Empty text' : 'Image';
    return `<div class="pe-layer" data-lid="${canvas.getObjects().indexOf(o)}" ${o === cur ? 'aria-current="true"' : ''}>
      ${ic(isText(o) ? 'text' : 'image', 16)}<button class="pe-ltxt" data-lsel>${esc(name)}</button>
      <button class="pe-btn" data-lact="up" aria-label="Move up" ${i === 0 ? 'disabled' : ''}>${ic('up', 15)}</button>
      <button class="pe-btn" data-lact="down" aria-label="Move down" ${i === layerObjs.length - 1 ? 'disabled' : ''}>${ic('down', 15)}</button>
      <button class="pe-btn" data-lact="vis" aria-label="Show or hide">${ic(o.visible === false ? 'eyeOff' : 'eye', 15)}</button>
      <button class="pe-btn" data-lact="del" aria-label="Delete">${ic('trash', 15)}</button></div>`;
  }).join('');
}

// ------------------------------------------------------------------ events
let dragging = false;
function wireEvents() {
  wirePopEvents();

  // clicks anywhere in the editor
  root.addEventListener('click', async (e) => {
    const target = e.target as HTMLElement;
    const popBtn = target.closest<HTMLElement>('[data-pop]');
    if (popBtn && !popEl.contains(popBtn)) { e.stopPropagation(); return openPop(popBtn.dataset.pop!, popBtn); }
    const act = target.closest<HTMLElement>('[data-act]');
    if (act && !popEl.contains(act)) return doAction(act.dataset.act!);
    const pnl = target.closest<HTMLElement>('[data-panel]');
    if (pnl) { const same = S.panel === pnl.dataset.panel && panelEl.hasAttribute('data-open'); if (same && isTouchUI()) panelEl.removeAttribute('data-open'); else showPanel(pnl.dataset.panel!); return; }
  });
  document.addEventListener('pointerdown', (e) => { if (!popEl.hidden && !popEl.contains(e.target as Node) && !(popAnchor && popAnchor.contains(e.target as Node))) closePop(); }, true);

  // panel body (delegated)
  panelBody.addEventListener('click', async (e) => {
    const t = e.target as HTMLElement, b = t.closest<HTMLElement>('button'); if (!b) return;
    const d = b.dataset;
    if (d.add) { const k = d.add === 'box' ? 'body' : (d.add as Any); const x = await addText({ kind: d.add === 'box' ? 'sub' : k, text: d.add === 'box' ? 'Type your text' : undefined }); commit(); closeSheet(); void x; }
    else if (d.combo) { await addCombo(d.combo); closeSheet(); }
    else if (d.style) { const s = TEXT_STYLES.find((x) => x.id === d.style)!; await addText({ style: s }); commit(); closeSheet(); }
    else if (d.fid) { await applyFont(d.fid); }
    else if (d.fcat) { S.fontCat = d.fcat; panelBody.querySelectorAll('[data-fcat]').forEach((x) => x.setAttribute('aria-pressed', String((x as HTMLElement).dataset.fcat === d.fcat))); renderFontRows(); }
    else if (d.fit) { S.fit = d.fit as Any; fitPhoto(); commit(); refreshPanel(true); }
    else if (d.bg) { setBg(d.bg, ''); commit(); }
    else if (d.bggrad) { setBg('#000000', d.bggrad); commit(); }
    else if (d.lact) {
      const row = b.closest<HTMLElement>('.pe-layer')!; const o = canvas.getObjects()[Number(row.dataset.lid)] as Any; if (!o) return;
      if (d.lact === 'up') canvas.bringObjectForward(o); else if (d.lact === 'down') canvas.sendObjectBackwards(o);
      else if (d.lact === 'vis') { o.set('visible', o.visible === false); if (o.visible === false && active() === o) canvas.discardActiveObject(); }
      else if (d.lact === 'del') { canvas.remove(o); }
      canvas.requestRenderAll(); commit(); refreshPanel(); renderCtx(); positionFloat();
    } else if ('lsel' in d) { const row = b.closest<HTMLElement>('.pe-layer')!; const o = canvas.getObjects()[Number(row.dataset.lid)] as Any; if (o && o.visible !== false) { canvas.setActiveObject(o); canvas.requestRenderAll(); syncSelection(); } }
    else if (d.act) doAction(d.act);
  });
  panelBody.addEventListener('input', (e) => {
    const el = e.target as HTMLInputElement, d = el.dataset;
    if ('fsearch' in d) { S.fontQuery = el.value; renderFontRows(); }
    else if (d.filter) { (S.filters as Any)[d.filter] = Number(el.value) / 100; (el.nextElementSibling as HTMLElement).textContent = el.value; if (!filterRaf) filterRaf = requestAnimationFrame(() => { filterRaf = 0; applyFilters(); }); }
    else if ('bgcolor' in d) { setBg(el.value, ''); }
  });
  panelBody.addEventListener('change', (e) => { const el = e.target as HTMLElement; if (el.dataset.filter || 'bgcolor' in el.dataset) commit(); });
  panelBody.addEventListener('click', (e) => { const b = (e.target as HTMLElement).closest<HTMLElement>('[data-bg]'); if (b) { setBg(b.dataset.bg!, ''); commit(); } });

  // context toolbar number input
  ctxEl.addEventListener('change', (e) => { const el = e.target as HTMLInputElement; if (el.dataset.in === 'size') setSize(Number(el.value)); });
  ctxEl.addEventListener('keydown', (e) => { const el = e.target as HTMLInputElement; if (el.dataset?.in === 'size' && e.key === 'Enter') { setSize(Number(el.value)); el.blur(); } });
  floatEl.addEventListener('click', (e) => { const b = (e.target as HTMLElement).closest<HTMLElement>('[data-act]'); if (b) doAction(b.dataset.act!); });
  zoomRange.addEventListener('input', () => setZoom(Number(zoomRange.value) / 100));

  // file inputs
  root.querySelector<HTMLInputElement>('[data-file=replace]')!.addEventListener('change', async (e) => { const i = e.target as HTMLInputElement; const f = i.files?.[0]; i.value = ''; if (f) { try { await setPhotoFromFile(f, !S.photo && !objs().length ? true : false); } catch { toast('Sorry, that file could not be opened as an image.', true); } } });
  root.querySelector<HTMLInputElement>('[data-file=add]')!.addEventListener('change', (e) => { const i = e.target as HTMLInputElement; const f = i.files?.[0]; i.value = ''; if (f) void addImageFile(f); });

  // drag & drop / paste
  stageEl.addEventListener('dragover', (e) => { e.preventDefault(); stageEl.classList.add('is-over'); });
  stageEl.addEventListener('dragleave', () => stageEl.classList.remove('is-over'));
  stageEl.addEventListener('drop', async (e) => { e.preventDefault(); stageEl.classList.remove('is-over'); const f = e.dataTransfer?.files?.[0]; if (f) { try { await setPhotoFromFile(f, false); toast('Photo replaced'); } catch { toast('Sorry, that file could not be opened as an image.', true); } } });
  document.addEventListener('paste', async (e) => { if (root.hidden) return; const f = [...(e.clipboardData?.files || [])].find((x) => x.type.startsWith('image/')); if (f) { e.preventDefault(); try { await setPhotoFromFile(f, false); toast('Photo replaced'); } catch { /* ignore */ } } });

  // canvas events
  canvas.on('selection:created', syncSelection); canvas.on('selection:updated', syncSelection); canvas.on('selection:cleared', syncSelection);
  canvas.on('object:moving', () => { dragging = true; floatEl.hidden = true; });
  canvas.on('object:scaling', () => { dragging = true; floatEl.hidden = true; });
  canvas.on('object:rotating', () => { dragging = true; floatEl.hidden = true; });
  canvas.on('object:modified', (e: Any) => {
    dragging = false; const o = e.target as Any;
    if (o && isText(o) && (Math.abs(o.scaleX - 1) > 0.001 || Math.abs(o.scaleY - 1) > 0.001)) { const s = o.scaleY || 1; o.set({ scaleX: 1, scaleY: 1 }); scaleObjectBy(o, s); o.setCoords(); canvas.requestRenderAll(); }
    commit(); positionFloat(); renderCtx(); refreshPanel();
  });
  canvas.on('mouse:up', () => { if (dragging) { dragging = false; positionFloat(); } });
  canvas.on('text:changed', () => { commitSoon(); positionFloat(); if (S.panel === 'layers') refreshPanel(); });
  canvas.on('text:editing:entered', () => { floatEl.hidden = true; });
  canvas.on('text:editing:exited', () => { commit(); positionFloat(); renderCtx(); });
  canvas.on('object:added', () => { if (!S.restoring && S.panel === 'layers') refreshPanel(); });
  canvas.on('object:removed', () => { if (!S.restoring && S.panel === 'layers') refreshPanel(); });

  document.addEventListener('keydown', onKey);
  window.addEventListener('resize', () => { closePop(); fitView(); });
}
let filterRaf = 0;
function closeSheet() { if (isTouchUI()) panelEl.removeAttribute('data-open'); }

function syncSelection() {
  renderCtx(); positionFloat();
  if (S.panel === 'layers') refreshPanel(); else if (S.panel === 'fonts') markFont();
  if (!popEl.hidden && (popKind === 'color' || popKind === 'effects' || popKind === 'spacing' || popKind === 'position' || popKind === 'opacity')) closePop();
}

function setSize(v: number) {
  if (!isFinite(v) || v <= 0) return renderCtx();
  withText((t) => t.set('fontSize', Math.max(4, (clamp(v, 4, 999) * S.W) / BASE_W)));
  renderCtx(); commit();
}

async function doAction(act: string) {
  const t = activeText(), a = active();
  switch (act) {
    case 'exit': return closeEditor();
    case 'undo': return void restore(histIdx - 1);
    case 'redo': return void restore(histIdx + 1);
    case 'collapse': { const c = panelEl.toggleAttribute('data-collapsed'); root.querySelector('.pe-collapse')!.toggleAttribute('data-collapsed', c); setTimeout(() => fitView(), 220); return; }
    case 'panel-close': return panelEl.removeAttribute('data-open');
    case 'zoom-in': return setZoom(S.zoom * 1.15);
    case 'zoom-out': return setZoom(S.zoom / 1.15);
    case 'zoom-fit': S.userZoom = false; return fitView();
    case 'add-text': { await addText({ kind: 'heading', text: 'Your text here' }); commit(); return; }
    case 'font-open': showPanel('fonts'); setTimeout(() => panelBody.querySelector<HTMLInputElement>('[data-fsearch]')?.focus({ preventScroll: true }), 50); if (isTouchUI()) panelBody.querySelector<HTMLInputElement>('[data-fsearch]')?.blur(); return;
    case 'size-dec': case 'size-inc': { if (!t) return; const cur = Math.round((t.fontSize * BASE_W) / S.W); return setSize(cur + (act === 'size-inc' ? 1 : -1) * Math.max(1, Math.round(cur * 0.06))); }
    case 'bold': return withText((x) => x.set('fontWeight', Number(x.fontWeight) >= 600 ? 400 : 700)), renderCtx(), commit();
    case 'italic': return withText((x) => x.set('fontStyle', x.fontStyle === 'italic' ? 'normal' : 'italic')), renderCtx(), commit();
    case 'underline': return withText((x) => x.set('underline', !x.underline)), renderCtx(), commit();
    case 'strike': return withText((x) => x.set('linethrough', !x.linethrough)), renderCtx(), commit();
    case 'case': return withText((x) => { const s = x.text || ''; x.set('text', s === s.toUpperCase() ? s.toLowerCase() : s === s.toLowerCase() ? s.replace(/\b\w/g, (c) => c.toUpperCase()) : s.toUpperCase()); }), commit();
    case 'align': return withText((x) => x.set('textAlign', x.textAlign === 'left' ? 'center' : x.textAlign === 'center' ? 'right' : 'left')), renderCtx(), commit();
    case 'edit': if (t) { canvas.setActiveObject(t); t.enterEditing(); t.selectAll(); canvas.requestRenderAll(); } return;
    case 'lock': if (a) { const on = !(a as Any).locked; (a as Any).locked = on; a.set({ lockMovementX: on, lockMovementY: on, lockScalingX: on, lockScalingY: on, lockRotation: on, hasControls: !on }); canvas.requestRenderAll(); commit(); positionFloat(); } return;
    case 'dup': if (a && a.type !== 'activeselection') { const c = await (a as Any).clone(EXTRA); c.set({ left: a.left + S.W * 0.03, top: a.top + S.H * 0.03 }); styleObj(c); canvas.add(c); canvas.setActiveObject(c); canvas.requestRenderAll(); commit(); } return;
    case 'del': if (a && (a as Any).isPhoto) { return doAction('remove-photo'); } if (a) { if ((a as Any).type === 'activeselection') (a as Any).forEachObject((o: Any) => canvas.remove(o)); else canvas.remove(a); canvas.discardActiveObject(); canvas.requestRenderAll(); commit(); syncSelection(); } return;
    case 'flip': if (a) { a.set('flipX', !a.flipX); canvas.requestRenderAll(); commit(); } return;
    case 'replace-photo': root.querySelector<HTMLInputElement>('[data-file=replace]')!.click(); return;
    case 'add-image': root.querySelector<HTMLInputElement>('[data-file=add]')!.click(); return;
    case 'remove-photo': if (S.photo) canvas.remove(S.photo.img); S.photo = null; canvas.backgroundImage = undefined; S.origSize = null; canvas.requestRenderAll(); commit(); refreshPanel(true); return;
    case 'reset-filters': S.filters = { b: 0, c: 0, s: 0 }; applyFilters(); commit(); refreshPanel(true); return;
  }
}

function onKey(e: KeyboardEvent) {
  if (root.hidden) return;
  const tgt = e.target as HTMLElement;
  if (tgt && (tgt.tagName === 'INPUT' || tgt.tagName === 'TEXTAREA' || tgt.tagName === 'SELECT' || tgt.isContentEditable)) return;
  const a = active(); if (a && (a as Any).isEditing) return;
  const mod = e.ctrlKey || e.metaKey, k = e.key.toLowerCase();
  if (mod && k === 'z') { e.preventDefault(); void restore(e.shiftKey ? histIdx + 1 : histIdx - 1); return; }
  if (mod && k === 'y') { e.preventDefault(); void restore(histIdx + 1); return; }
  if (mod && k === 'd') { e.preventDefault(); void doAction('dup'); return; }
  if (e.key === 'Escape') { if (!popEl.hidden) return closePop(); if (a) { canvas.discardActiveObject(); canvas.requestRenderAll(); syncSelection(); } return; }
  if (!a) return;
  if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); void doAction('del'); return; }
  const step = e.shiftKey ? 10 : 1, mv: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
  if (mv[e.key] && !(a as Any).locked) { e.preventDefault(); a.set({ left: a.left + mv[e.key][0], top: a.top + mv[e.key][1] }); a.setCoords(); canvas.requestRenderAll(); positionFloat(); commitSoon(); }
}
