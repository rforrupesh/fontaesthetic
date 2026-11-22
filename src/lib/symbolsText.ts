// Symbols page text per language. Category names are keyed by the ids in src/data/symbols.ts.
export interface SymbolsText {
  nav: string;
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  copied: string;
  copy: string;
  categories: Record<string, string>;
}

const T: Record<string, SymbolsText> = {
  en: {
    nav: 'Symbols',
    title: 'Symbols Copy and Paste: Hearts, Cool, Cute and More',
    description: 'Copy and paste symbols in one click. Hearts, cool, cute, stars, arrows and more. Tap any symbol to copy it instantly. Free, works on phone and desktop.',
    h1: 'Symbols Copy and Paste',
    subtitle: 'Tap any symbol and it is copied instantly.',
    copied: 'Copied!',
    copy: 'Copy',
    categories: { heart: 'Heart', cool: 'Cool', cute: 'Cute', stars: 'Stars', arrows: 'Arrows', music: 'Music' },
  },
  fr: {
    nav: 'Symboles',
    title: 'Symboles à copier-coller : cœurs, cool, mignon et plus',
    description: 'Copiez et collez des symboles en un clic. Cœurs, cool, mignon, étoiles, flèches et plus. Touchez un symbole pour le copier. Gratuit, sur mobile et ordinateur.',
    h1: 'Symboles à copier-coller',
    subtitle: 'Touchez un symbole, il est copié aussitôt.',
    copied: 'Copié !',
    copy: 'Copier',
    categories: { heart: 'Cœur', cool: 'Cool', cute: 'Mignon', stars: 'Étoiles', arrows: 'Flèches', music: 'Musique' },
  },
  ar: {
    nav: 'الرموز',
    title: 'نسخ ولصق الرموز: قلوب، رموز رائعة، لطيفة والمزيد',
    description: 'انسخ الرموز والصقها بنقرة واحدة. قلوب ونجوم وأسهم ورموز لطيفة وأكثر. اضغط على أي رمز لنسخه فورًا. مجاني ويعمل على الجوال والكمبيوتر.',
    h1: 'نسخ ولصق الرموز',
    subtitle: 'اضغط على أي رمز وسيُنسخ فورًا.',
    copied: 'تم النسخ!',
    copy: 'نسخ',
    categories: { heart: 'قلوب', cool: 'رائع', cute: 'لطيف', stars: 'نجوم', arrows: 'أسهم', music: 'موسيقى' },
  },
  th: {
    nav: 'สัญลักษณ์',
    title: 'คัดลอกสัญลักษณ์ หัวใจ เท่ๆ น่ารัก และอื่นๆ',
    description: 'คัดลอกและวางสัญลักษณ์ได้ในคลิกเดียว หัวใจ ดาว ลูกศร สัญลักษณ์น่ารักและอื่นๆ แตะที่สัญลักษณ์เพื่อคัดลอกทันที ฟรี ใช้ได้ทั้งมือถือและคอมพิวเตอร์',
    h1: 'คัดลอกสัญลักษณ์',
    subtitle: 'แตะสัญลักษณ์ใดก็ได้ แล้วระบบจะคัดลอกให้ทันที',
    copied: 'คัดลอกแล้ว!',
    copy: 'คัดลอก',
    categories: { heart: 'หัวใจ', cool: 'เท่', cute: 'น่ารัก', stars: 'ดาว', arrows: 'ลูกศร', music: 'ดนตรี' },
  },
  tr: {
    nav: 'Semboller',
    title: 'Sembol Kopyala Yapıştır: Kalp, Havalı, Sevimli ve Daha Fazlası',
    description: 'Sembolleri tek tıkla kopyalayıp yapıştırın. Kalpler, yıldızlar, oklar, sevimli ve havalı semboller. Kopyalamak için bir sembole dokunun. Ücretsiz, telefon ve bilgisayarda çalışır.',
    h1: 'Sembol Kopyala Yapıştır',
    subtitle: 'Bir sembole dokunun, anında kopyalansın.',
    copied: 'Kopyalandı!',
    copy: 'Kopyala',
    categories: { heart: 'Kalp', cool: 'Havalı', cute: 'Sevimli', stars: 'Yıldızlar', arrows: 'Oklar', music: 'Müzik' },
  },
  id: {
    nav: 'Simbol',
    title: 'Salin Tempel Simbol: Hati, Keren, Imut, dan Lainnya',
    description: 'Salin dan tempel simbol dengan satu klik. Hati, bintang, panah, simbol imut dan keren. Ketuk simbol untuk langsung menyalinnya. Gratis, bisa di HP dan komputer.',
    h1: 'Salin Tempel Simbol',
    subtitle: 'Ketuk simbol apa saja, langsung tersalin.',
    copied: 'Tersalin!',
    copy: 'Salin',
    categories: { heart: 'Hati', cool: 'Keren', cute: 'Imut', stars: 'Bintang', arrows: 'Panah', music: 'Musik' },
  },
  vi: {
    nav: 'Ký hiệu',
    title: 'Sao chép ký hiệu: trái tim, ngầu, dễ thương và hơn thế nữa',
    description: 'Sao chép và dán ký hiệu chỉ với một cú nhấp. Trái tim, ngôi sao, mũi tên, ký hiệu dễ thương và ngầu. Chạm vào ký hiệu để sao chép ngay. Miễn phí, dùng được trên điện thoại và máy tính.',
    h1: 'Sao chép ký hiệu',
    subtitle: 'Chạm vào bất kỳ ký hiệu nào, nó sẽ được sao chép ngay.',
    copied: 'Đã sao chép!',
    copy: 'Sao chép',
    categories: { heart: 'Trái tim', cool: 'Ngầu', cute: 'Dễ thương', stars: 'Ngôi sao', arrows: 'Mũi tên', music: 'Âm nhạc' },
  },
  pl: {
    nav: 'Symbole',
    title: 'Symbole do kopiowania: serca, fajne, słodkie i więcej',
    description: 'Kopiuj i wklejaj symbole jednym kliknięciem. Serca, gwiazdki, strzałki, słodkie i fajne symbole. Dotknij symbolu, aby go skopiować. Za darmo, na telefonie i komputerze.',
    h1: 'Symbole do kopiowania',
    subtitle: 'Dotknij dowolnego symbolu, a zostanie od razu skopiowany.',
    copied: 'Skopiowano!',
    copy: 'Kopiuj',
    categories: { heart: 'Serca', cool: 'Fajne', cute: 'Słodkie', stars: 'Gwiazdki', arrows: 'Strzałki', music: 'Muzyka' },
  },
  es: {
    nav: 'Símbolos',
    title: 'Símbolos para copiar y pegar: corazones, cool, lindos y más',
    description: 'Copia y pega símbolos con un clic. Corazones, estrellas, flechas, símbolos lindos y cool. Toca un símbolo para copiarlo al instante. Gratis, en móvil y ordenador.',
    h1: 'Símbolos para copiar y pegar',
    subtitle: 'Toca cualquier símbolo y se copia al instante.',
    copied: '¡Copiado!',
    copy: 'Copiar',
    categories: { heart: 'Corazones', cool: 'Cool', cute: 'Lindos', stars: 'Estrellas', arrows: 'Flechas', music: 'Música' },
  },
  it: {
    nav: 'Simboli',
    title: 'Simboli da copiare e incollare: cuori, cool, carini e altro',
    description: 'Copia e incolla simboli con un clic. Cuori, stelle, frecce, simboli carini e cool. Tocca un simbolo per copiarlo subito. Gratis, su telefono e computer.',
    h1: 'Simboli da copiare e incollare',
    subtitle: 'Tocca un simbolo qualsiasi e viene copiato subito.',
    copied: 'Copiato!',
    copy: 'Copia',
    categories: { heart: 'Cuori', cool: 'Cool', cute: 'Carini', stars: 'Stelle', arrows: 'Frecce', music: 'Musica' },
  },
  ja: {
    nav: '記号',
    title: '記号コピペ：ハート、かっこいい、かわいい記号など',
    description: '記号をワンクリックでコピー＆ペースト。ハート、星、矢印、かわいい記号、かっこいい記号など。タップするとすぐにコピーされます。無料でスマホにもパソコンにも対応。',
    h1: '記号コピペ',
    subtitle: '記号をタップすると、すぐにコピーされます。',
    copied: 'コピーしました！',
    copy: 'コピー',
    categories: { heart: 'ハート', cool: 'かっこいい', cute: 'かわいい', stars: '星', arrows: '矢印', music: '音楽' },
  },
  de: {
    nav: 'Symbole',
    title: 'Symbole kopieren und einfügen: Herzen, cool, süß und mehr',
    description: 'Symbole mit einem Klick kopieren und einfügen. Herzen, Sterne, Pfeile, süße und coole Symbole. Tippe auf ein Symbol, um es sofort zu kopieren. Kostenlos, auf Handy und PC.',
    h1: 'Symbole kopieren und einfügen',
    subtitle: 'Tippe auf ein Symbol und es wird sofort kopiert.',
    copied: 'Kopiert!',
    copy: 'Kopieren',
    categories: { heart: 'Herzen', cool: 'Cool', cute: 'Süß', stars: 'Sterne', arrows: 'Pfeile', music: 'Musik' },
  },
  pt: {
    nav: 'Símbolos',
    title: 'Símbolos para copiar e colar: corações, legais, fofos e mais',
    description: 'Copie e cole símbolos com um clique. Corações, estrelas, setas, símbolos fofos e legais. Toque em um símbolo para copiá-lo na hora. Grátis, no celular e no computador.',
    h1: 'Símbolos para copiar e colar',
    subtitle: 'Toque em qualquer símbolo e ele é copiado na hora.',
    copied: 'Copiado!',
    copy: 'Copiar',
    categories: { heart: 'Corações', cool: 'Legais', cute: 'Fofos', stars: 'Estrelas', arrows: 'Setas', music: 'Música' },
  },
};

export const symbolsText = (lang: string): SymbolsText => T[lang] ?? T.en;
