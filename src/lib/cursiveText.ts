// Text for the Cursive tool UI. Translated for every site language (en, fr, ar, th, tr, id, vi, pl, es, it, ja, de, pt). The long article below the tool is written by hand in each
// language's page file (src/pages/{lang}/cursive.astro).

export interface CursiveText {
  nav: string; // breadcrumb
  title: string; // <title>
  description: string;
  h1: string;
  subtitle: string;
  label: string; // textarea label
  placeholder: string;
  sample: string; // default text shown before the visitor types
  styles: string; // list heading
  copy: string;
  copied: string;
  copyAria: string; // {style}
  note: string; // small note under the tool
}

const T: Record<string, CursiveText> = {
  en: {
    nav: 'Cursive Font', title: 'Cursive Font Generator: Copy and Paste Cursive Text',
    description: 'Free cursive font generator. Type your text, see 6 cursive styles update live and copy them in one click. Works on Instagram, WhatsApp, Discord, TikTok and more.',
    h1: 'Cursive Font Generator', subtitle: 'Type your text, see every cursive style update live and copy it in one tap.',
    label: 'Your text', placeholder: 'Type your text here', sample: 'Hello text string my old friend.',
    styles: 'Cursive styles', copy: 'Copy', copied: 'Copied!', copyAria: 'Copy {style}',
    note: 'These are Unicode characters, so you can paste them almost anywhere. A few apps may show some letters differently.',
  },
  fr: {
    nav: "Police cursive", title: "Générateur de police cursive : copier-coller du texte cursif",
    description: "Générateur de police cursive gratuit. Tapez votre texte, voyez 6 styles cursifs se mettre à jour en direct et copiez-les en un clic. Fonctionne sur Instagram, WhatsApp, Discord, TikTok et plus.",
    h1: "Générateur de police cursive", subtitle: "Tapez votre texte, voyez chaque style cursif en direct et copiez-le d’un geste.",
    label: "Votre texte", placeholder: "Tapez votre texte ici", sample: "texte cursif",
    styles: "Styles cursifs", copy: "Copier", copied: "Copié !", copyAria: "Copier {style}",
    note: "Ce sont des caractères Unicode : vous pouvez les coller presque partout. Quelques applications affichent certaines lettres un peu différemment.",
  },
  ar: {
    nav: "خط متصل", title: "مولّد الخط المتصل: انسخ والصق نصًا متصلًا",
    description: "مولّد خط متصل مجاني. اكتب نصك وشاهد 6 أنماط متصلة تتحدث مباشرة وانسخها بنقرة واحدة. يعمل على إنستغرام وواتساب وديسكورد وتيك توك وغيرها.",
    h1: "مولّد الخط المتصل", subtitle: "اكتب نصك، وشاهد كل نمط متصل مباشرة، وانسخه بلمسة واحدة.",
    label: "نصك", placeholder: "اكتب نصك هنا", sample: "Hello text string my old friend.",
    styles: "الأنماط المتصلة", copy: "نسخ", copied: "تم النسخ!", copyAria: "نسخ {style}",
    note: "هذه رموز يونيكود، لذا يمكنك لصقها تقريبًا في أي مكان. قد تعرض بعض التطبيقات بعض الحروف بشكل مختلف.",
  },
  th: {
    nav: "ฟอนต์อักษรหวัด", title: "ตัวสร้างฟอนต์อักษรหวัด คัดลอกและวางข้อความอักษรหวัด",
    description: "ตัวสร้างฟอนต์อักษรหวัดฟรี พิมพ์ข้อความ ดู 6 สไตล์อักษรหวัดอัปเดตแบบสด แล้วคัดลอกได้ในคลิกเดียว ใช้ได้กับ Instagram, WhatsApp, Discord, TikTok และอื่นๆ",
    h1: "ตัวสร้างฟอนต์อักษรหวัด", subtitle: "พิมพ์ข้อความ ดูทุกสไตล์อักษรหวัดอัปเดตแบบสด แล้วคัดลอกได้ในแตะเดียว",
    label: "ข้อความของคุณ", placeholder: "พิมพ์ข้อความที่นี่", sample: "Hello text string my old friend.",
    styles: "สไตล์อักษรหวัด", copy: "คัดลอก", copied: "คัดลอกแล้ว!", copyAria: "คัดลอก {style}",
    note: "ทั้งหมดเป็นอักขระ Unicode จึงวางได้เกือบทุกที่ บางแอปอาจแสดงตัวอักษรบางตัวต่างออกไป",
  },
  tr: {
    nav: "El Yazısı Fontu", title: "El Yazısı Font Oluşturucu: Kopyala Yapıştır El Yazısı Metin",
    description: "Ücretsiz el yazısı font oluşturucu. Metninizi yazın, 6 el yazısı stilinin canlı güncellendiğini görün ve tek tıkla kopyalayın. Instagram, WhatsApp, Discord, TikTok ve daha fazlasında çalışır.",
    h1: "El Yazısı Font Oluşturucu", subtitle: "Metninizi yazın, her el yazısı stilini canlı görün ve tek dokunuşla kopyalayın.",
    label: "Metniniz", placeholder: "Metninizi buraya yazın", sample: "Hello text string my old friend.",
    styles: "El yazısı stilleri", copy: "Kopyala", copied: "Kopyalandı!", copyAria: "{style} kopyala",
    note: "Bunlar Unicode karakterlerdir, bu yüzden hemen her yere yapıştırabilirsiniz. Bazı uygulamalar harfleri biraz farklı gösterebilir.",
  },
  id: {
    nav: "Font Kursif", title: "Generator Font Kursif: Salin dan Tempel Teks Kursif",
    description: "Generator font kursif gratis. Ketik teks, lihat 6 gaya kursif berubah secara langsung, lalu salin dengan satu klik. Bisa dipakai di Instagram, WhatsApp, Discord, TikTok, dan lainnya.",
    h1: "Generator Font Kursif", subtitle: "Ketik teks, lihat setiap gaya kursif berubah langsung, dan salin dengan satu ketukan.",
    label: "Teks kamu", placeholder: "Ketik teks di sini", sample: "teks kursif",
    styles: "Gaya kursif", copy: "Salin", copied: "Tersalin!", copyAria: "Salin {style}",
    note: "Ini adalah karakter Unicode, jadi bisa ditempel hampir di mana saja. Beberapa aplikasi mungkin menampilkan huruf tertentu sedikit berbeda.",
  },
  vi: {
    nav: "Phông chữ viết tay", title: "Tạo phông chữ viết tay: sao chép và dán chữ viết tay",
    description: "Công cụ tạo phông chữ viết tay miễn phí. Gõ chữ, xem 6 kiểu viết tay cập nhật trực tiếp và sao chép chỉ bằng một cú nhấp. Dùng được trên Instagram, WhatsApp, Discord, TikTok và nhiều nơi khác.",
    h1: "Tạo phông chữ viết tay", subtitle: "Gõ chữ, xem từng kiểu viết tay cập nhật trực tiếp và sao chép chỉ với một lần chạm.",
    label: "Văn bản của bạn", placeholder: "Nhập văn bản của bạn ở đây", sample: "Hello text string my old friend.",
    styles: "Các kiểu viết tay", copy: "Sao chép", copied: "Đã chép!", copyAria: "Sao chép {style}",
    note: "Đây là ký tự Unicode nên bạn có thể dán gần như ở mọi nơi. Một số ứng dụng có thể hiển thị vài chữ cái hơi khác.",
  },
  pl: {
    nav: "Czcionka kursywą", title: "Generator czcionki kursywą: kopiuj i wklej tekst odręczny",
    description: "Darmowy generator czcionki kursywą. Wpisz tekst, zobacz na żywo 6 style pisma odręcznego i skopiuj jednym kliknięciem. Działa na Instagramie, WhatsAppie, Discordzie, TikToku i nie tylko.",
    h1: "Generator czcionki kursywą", subtitle: "Wpisz tekst, zobacz każdy styl pisma odręcznego na żywo i skopiuj jednym dotknięciem.",
    label: "Twój tekst", placeholder: "Wpisz tutaj swój tekst", sample: "Hello text string my old friend.",
    styles: "Style pisma odręcznego", copy: "Kopiuj", copied: "Skopiowano!", copyAria: "Kopiuj: {style}",
    note: "To znaki Unicode, więc wkleisz je prawie wszędzie. Niektóre aplikacje mogą wyświetlać część liter nieco inaczej.",
  },
  es: {
    nav: "Fuente cursiva", title: "Generador de fuente cursiva: copia y pega texto cursivo",
    description: "Generador de fuente cursiva gratis. Escribe tu texto, mira 6 estilos cursivos actualizarse en vivo y cópialos con un clic. Funciona en Instagram, WhatsApp, Discord, TikTok y más.",
    h1: "Generador de fuente cursiva", subtitle: "Escribe tu texto, mira cada estilo cursivo en vivo y cópialo con un toque.",
    label: "Tu texto", placeholder: "Escribe tu texto aquí", sample: "texto cursivo",
    styles: "Estilos cursivos", copy: "Copiar", copied: "¡Copiado!", copyAria: "Copiar {style}",
    note: "Son caracteres Unicode, así que puedes pegarlos casi en cualquier sitio. Algunas apps pueden mostrar ciertas letras de forma distinta.",
  },
  it: {
    nav: "Font corsivo", title: "Generatore di font corsivo: copia e incolla testo corsivo",
    description: "Generatore di font corsivo gratuito. Scrivi il testo, guarda 6 stili corsivi aggiornarsi dal vivo e copiali con un clic. Funziona su Instagram, WhatsApp, Discord, TikTok e altro.",
    h1: "Generatore di font corsivo", subtitle: "Scrivi il testo, guarda ogni stile corsivo dal vivo e copialo con un tocco.",
    label: "Il tuo testo", placeholder: "Scrivi qui il tuo testo", sample: "testo corsivo",
    styles: "Stili corsivi", copy: "Copia", copied: "Copiato!", copyAria: "Copia {style}",
    note: "Sono caratteri Unicode, quindi puoi incollarli quasi ovunque. Alcune app potrebbero mostrare certe lettere in modo diverso.",
  },
  ja: {
    nav: "筆記体フォント", title: "筆記体フォントジェネレーター：コピペでOK",
    description: "無料の筆記体フォントジェネレーター。文字を入力すると4種類の筆記体スタイルがリアルタイムで変わり、ワンクリックでコピー。Instagram、WhatsApp、Discord、TikTokなどで使えます。",
    h1: "筆記体フォントジェネレーター", subtitle: "文字を入力して、すべての筆記体スタイルをリアルタイムで確認。ワンタップでコピーできます。",
    label: "テキスト", placeholder: "ここに文字を入力", sample: "Hello text string my old friend.",
    styles: "筆記体のスタイル", copy: "コピー", copied: "コピーしました！", copyAria: "{style}をコピー",
    note: "Unicode文字なので、ほとんどの場所に貼り付けられます。アプリによっては一部の文字の表示が異なる場合があります。",
  },
  de: {
    nav: "Kursive Schrift", title: "Kursive Schrift Generator: kursiven Text kopieren und einfügen",
    description: "Kostenloser Generator für kursive Schrift. Text eingeben, 6 Schreibschrift-Stile live sehen und mit einem Klick kopieren. Funktioniert auf Instagram, WhatsApp, Discord, TikTok und mehr.",
    h1: "Kursive Schrift Generator", subtitle: "Text eingeben, jeden Schreibschrift-Stil live sehen und mit einem Tipp kopieren.",
    label: "Dein Text", placeholder: "Gib hier deinen Text ein", sample: "kursiver Text",
    styles: "Schreibschrift-Stile", copy: "Kopieren", copied: "Kopiert!", copyAria: "{style} kopieren",
    note: "Das sind Unicode-Zeichen, du kannst sie fast überall einfügen. Manche Apps zeigen einzelne Buchstaben etwas anders an.",
  },
  pt: {
    nav: "Fonte cursiva", title: "Gerador de fonte cursiva: copie e cole texto cursivo",
    description: "Gerador de fonte cursiva grátis. Digite seu texto, veja 6 estilos cursivos atualizarem ao vivo e copie com um clique. Funciona no Instagram, WhatsApp, Discord, TikTok e mais.",
    h1: "Gerador de fonte cursiva", subtitle: "Digite seu texto, veja cada estilo cursivo ao vivo e copie com um toque.",
    label: "Seu texto", placeholder: "Digite seu texto aqui", sample: "texto cursivo",
    styles: "Estilos cursivos", copy: "Copiar", copied: "Copiado!", copyAria: "Copiar {style}",
    note: "São caracteres Unicode, então você pode colar quase em qualquer lugar. Alguns apps podem mostrar certas letras de forma diferente.",
  },
};

export const cursiveText = (lang: string): CursiveText => T[lang] ?? T.en;
