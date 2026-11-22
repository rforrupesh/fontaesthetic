// Text for the Italic tool UI in every site language. The long article below the tool is written by hand in each
// language's page file (src/pages/{lang}/italic.astro).

export interface ItalicText {
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

const T: Record<string, ItalicText> = {
  en: {
    nav: 'Italic Text', title: 'Italic Text Generator: Copy and Paste Italic Text',
    description: 'Free italic text generator. Type your text, see 5 italic styles update live and copy them in one click. Works on Instagram, WhatsApp, Discord, TikTok and more.',
    h1: 'Italic Text Generator', subtitle: 'Type your text, see every italic style update live and copy it in one tap.',
    label: 'Your text', placeholder: 'Type your text here', sample: 'Hello text string my old friend.',
    styles: 'Italic styles', copy: 'Copy', copied: 'Copied!', copyAria: 'Copy {style}',
    note: 'These are Unicode characters, so you can paste them almost anywhere. A few apps may show some letters differently.',
  },
  fr: {
    nav: "Texte italique", title: "Générateur de texte italique : copier-coller du texte en italique",
    description: "Générateur de texte italique gratuit. Tapez votre texte, voyez 5 styles d’italique se mettre à jour en direct et copiez-les en un clic. Fonctionne sur Instagram, WhatsApp, Discord, TikTok et plus.",
    h1: "Générateur de texte italique", subtitle: "Tapez votre texte, voyez chaque style d’italique en direct et copiez-le d’un geste.",
    label: "Votre texte", placeholder: "Tapez votre texte ici", sample: "texte en italique",
    styles: "Styles d’italique", copy: "Copier", copied: "Copié !", copyAria: "Copier {style}",
    note: "Ce sont des caractères Unicode : vous pouvez les coller presque partout. Quelques applications affichent certaines lettres un peu différemment.",
  },
  ar: {
    nav: "نص مائل", title: "مولّد النص المائل: انسخ والصق نصًا مائلًا",
    description: "مولّد نص مائل مجاني. اكتب نصك وشاهد 5 أنماط مائلة تتحدث مباشرة وانسخها بنقرة واحدة. يعمل على إنستغرام وواتساب وديسكورد وتيك توك وغيرها.",
    h1: "مولّد النص المائل", subtitle: "اكتب نصك، وشاهد كل نمط مائل مباشرة، وانسخه بلمسة واحدة.",
    label: "نصك", placeholder: "اكتب نصك هنا", sample: "Hello text string my old friend.",
    styles: "أنماط الخط المائل", copy: "نسخ", copied: "تم النسخ!", copyAria: "نسخ {style}",
    note: "هذه رموز يونيكود، لذا يمكنك لصقها تقريبًا في أي مكان. قد تعرض بعض التطبيقات بعض الحروف بشكل مختلف.",
  },
  th: {
    nav: "ข้อความตัวเอียง", title: "ตัวสร้างข้อความตัวเอียง คัดลอกและวางข้อความตัวเอียง",
    description: "ตัวสร้างข้อความตัวเอียงฟรี พิมพ์ข้อความ ดู 5 สไตล์ตัวเอียงอัปเดตแบบสด แล้วคัดลอกได้ในคลิกเดียว ใช้ได้กับ Instagram, WhatsApp, Discord, TikTok และอื่นๆ",
    h1: "ตัวสร้างข้อความตัวเอียง", subtitle: "พิมพ์ข้อความ ดูทุกสไตล์ตัวเอียงอัปเดตแบบสด แล้วคัดลอกได้ในแตะเดียว",
    label: "ข้อความของคุณ", placeholder: "พิมพ์ข้อความที่นี่", sample: "Hello text string my old friend.",
    styles: "สไตล์ตัวเอียง", copy: "คัดลอก", copied: "คัดลอกแล้ว!", copyAria: "คัดลอก {style}",
    note: "ทั้งหมดเป็นอักขระ Unicode จึงวางได้เกือบทุกที่ บางแอปอาจแสดงตัวอักษรบางตัวต่างออกไป",
  },
  tr: {
    nav: "İtalik Yazı", title: "İtalik Yazı Oluşturucu: Kopyala Yapıştır İtalik Metin",
    description: "Ücretsiz italik yazı oluşturucu. Metninizi yazın, 5 italik stilinin canlı güncellendiğini görün ve tek tıkla kopyalayın. Instagram, WhatsApp, Discord, TikTok ve daha fazlasında çalışır.",
    h1: "İtalik Yazı Oluşturucu", subtitle: "Metninizi yazın, her italik stilini canlı görün ve tek dokunuşla kopyalayın.",
    label: "Metniniz", placeholder: "Metninizi buraya yazın", sample: "italik yazı",
    styles: "İtalik stilleri", copy: "Kopyala", copied: "Kopyalandı!", copyAria: "{style} kopyala",
    note: "Bunlar Unicode karakterlerdir, bu yüzden hemen her yere yapıştırabilirsiniz. Bazı uygulamalar harfleri biraz farklı gösterebilir.",
  },
  id: {
    nav: "Teks Miring", title: "Generator Teks Miring: Salin dan Tempel Teks Italic",
    description: "Generator teks miring gratis. Ketik teks, lihat 5 gaya italic berubah secara langsung, lalu salin dengan satu klik. Bisa dipakai di Instagram, WhatsApp, Discord, TikTok, dan lainnya.",
    h1: "Generator Teks Miring", subtitle: "Ketik teks, lihat setiap gaya italic berubah langsung, dan salin dengan satu ketukan.",
    label: "Teks kamu", placeholder: "Ketik teks di sini", sample: "teks miring",
    styles: "Gaya italic", copy: "Salin", copied: "Tersalin!", copyAria: "Salin {style}",
    note: "Ini adalah karakter Unicode, jadi bisa ditempel hampir di mana saja. Beberapa aplikasi mungkin menampilkan huruf tertentu sedikit berbeda.",
  },
  vi: {
    nav: "Chữ in nghiêng", title: "Tạo chữ in nghiêng: sao chép và dán chữ nghiêng",
    description: "Công cụ tạo chữ in nghiêng miễn phí. Gõ chữ, xem 5 kiểu in nghiêng cập nhật trực tiếp và sao chép chỉ bằng một cú nhấp. Dùng được trên Instagram, WhatsApp, Discord, TikTok và nhiều nơi khác.",
    h1: "Tạo chữ in nghiêng", subtitle: "Gõ chữ, xem từng kiểu in nghiêng cập nhật trực tiếp và sao chép chỉ với một lần chạm.",
    label: "Văn bản của bạn", placeholder: "Nhập văn bản của bạn ở đây", sample: "chữ in nghiêng",
    styles: "Các kiểu in nghiêng", copy: "Sao chép", copied: "Đã chép!", copyAria: "Sao chép {style}",
    note: "Đây là ký tự Unicode nên bạn có thể dán gần như ở mọi nơi. Một số ứng dụng có thể hiển thị vài chữ cái hơi khác.",
  },
  pl: {
    nav: "Tekst kursywą", title: "Generator tekstu kursywą: kopiuj i wklej kursywę",
    description: "Darmowy generator tekstu kursywą. Wpisz tekst, zobacz na żywo 5 stylów kursywy i skopiuj jednym kliknięciem. Działa na Instagramie, WhatsAppie, Discordzie, TikToku i nie tylko.",
    h1: "Generator tekstu kursywą", subtitle: "Wpisz tekst, zobacz każdy styl kursywy na żywo i skopiuj jednym dotknięciem.",
    label: "Twój tekst", placeholder: "Wpisz tutaj swój tekst", sample: "tekst kursywą",
    styles: "Style kursywy", copy: "Kopiuj", copied: "Skopiowano!", copyAria: "Kopiuj: {style}",
    note: "To znaki Unicode, więc wkleisz je prawie wszędzie. Niektóre aplikacje mogą wyświetlać część liter nieco inaczej.",
  },
  es: {
    nav: "Texto en cursiva", title: "Generador de texto en cursiva: copia y pega texto en cursiva",
    description: "Generador de texto en cursiva gratis. Escribe tu texto, mira 5 estilos de cursiva actualizarse en vivo y cópialos con un clic. Funciona en Instagram, WhatsApp, Discord, TikTok y más.",
    h1: "Generador de texto en cursiva", subtitle: "Escribe tu texto, mira cada estilo de cursiva en vivo y cópialo con un toque.",
    label: "Tu texto", placeholder: "Escribe tu texto aquí", sample: "texto en cursiva",
    styles: "Estilos de cursiva", copy: "Copiar", copied: "¡Copiado!", copyAria: "Copiar {style}",
    note: "Son caracteres Unicode, así que puedes pegarlos casi en cualquier sitio. Algunas apps pueden mostrar ciertas letras de forma distinta.",
  },
  it: {
    nav: "Testo in corsivo", title: "Generatore di testo in corsivo: copia e incolla testo corsivo",
    description: "Generatore di testo in corsivo gratuito. Scrivi il testo, guarda 5 stili di corsivo aggiornarsi dal vivo e copiali con un clic. Funziona su Instagram, WhatsApp, Discord, TikTok e altro.",
    h1: "Generatore di testo in corsivo", subtitle: "Scrivi il testo, guarda ogni stile di corsivo dal vivo e copialo con un tocco.",
    label: "Il tuo testo", placeholder: "Scrivi qui il tuo testo", sample: "testo in corsivo",
    styles: "Stili di corsivo", copy: "Copia", copied: "Copiato!", copyAria: "Copia {style}",
    note: "Sono caratteri Unicode, quindi puoi incollarli quasi ovunque. Alcune app potrebbero mostrare certe lettere in modo diverso.",
  },
  ja: {
    nav: "イタリック体テキスト", title: "イタリック体テキストジェネレーター：コピペでOK",
    description: "無料のイタリック体テキストジェネレーター。文字を入力すると5種類のイタリックスタイルがリアルタイムで変わり、ワンクリックでコピー。Instagram、WhatsApp、Discord、TikTokなどで使えます。",
    h1: "イタリック体テキストジェネレーター", subtitle: "文字を入力して、すべてのイタリックスタイルをリアルタイムで確認。ワンタップでコピーできます。",
    label: "テキスト", placeholder: "ここに文字を入力", sample: "Hello text string my old friend.",
    styles: "イタリックのスタイル", copy: "コピー", copied: "コピーしました！", copyAria: "{style}をコピー",
    note: "Unicode文字なので、ほとんどの場所に貼り付けられます。アプリによっては一部の文字の表示が異なる場合があります。",
  },
  de: {
    nav: "Kursiver Text", title: "Kursiver Text Generator: kopieren und einfügen",
    description: "Kostenloser Generator für kursiven Text. Text eingeben, 5 Kursiv-Stile live sehen und mit einem Klick kopieren. Funktioniert auf Instagram, WhatsApp, Discord, TikTok und mehr.",
    h1: "Kursiver Text Generator", subtitle: "Text eingeben, jeden Kursiv-Stil live sehen und mit einem Tipp kopieren.",
    label: "Dein Text", placeholder: "Gib hier deinen Text ein", sample: "kursiver Text",
    styles: "Kursiv-Stile", copy: "Kopieren", copied: "Kopiert!", copyAria: "{style} kopieren",
    note: "Das sind Unicode-Zeichen, du kannst sie fast überall einfügen. Manche Apps zeigen einzelne Buchstaben etwas anders an.",
  },
  pt: {
    nav: "Texto em itálico", title: "Gerador de texto em itálico: copie e cole texto em itálico",
    description: "Gerador de texto em itálico grátis. Digite seu texto, veja 5 estilos de itálico atualizarem ao vivo e copie com um clique. Funciona no Instagram, WhatsApp, Discord, TikTok e mais.",
    h1: "Gerador de texto em itálico", subtitle: "Digite seu texto, veja cada estilo de itálico ao vivo e copie com um toque.",
    label: "Seu texto", placeholder: "Digite seu texto aqui", sample: "texto em itálico",
    styles: "Estilos de itálico", copy: "Copiar", copied: "Copiado!", copyAria: "Copiar {style}",
    note: "São caracteres Unicode, então você pode colar quase em qualquer lugar. Alguns apps podem mostrar certas letras de forma diferente.",
  },
};

export const italicText = (lang: string): ItalicText => T[lang] ?? T.en;
