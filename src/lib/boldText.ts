// Text for the Bold tool UI.  The long article below the tool is written by hand in each
// language's page file (src/pages/{lang}/bold.astro).

export interface BoldText {
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

const T: Record<string, BoldText> = {
  en: {
    nav: 'Bold Text', title: 'Bold Text Generator: Copy and Paste Bold Text',
    description: 'Free bold text generator. Type your text, see 7 bold styles update live and copy them in one click. Works on Instagram, WhatsApp, Discord, TikTok and more.',
    h1: 'Bold Text Generator', subtitle: 'Type your text, see every bold style update live and copy it in one tap.',
    label: 'Your text', placeholder: 'Type your text here', sample: 'Hello text string my old friend.',
    styles: 'Bold styles', copy: 'Copy', copied: 'Copied!', copyAria: 'Copy {style}',
    note: 'These are Unicode characters, so you can paste them almost anywhere. A few apps may show some letters differently.',
  },
  fr: {
    nav: "Texte en gras", title: "Générateur de texte en gras : copier-coller du texte gras",
    description: "Générateur de texte en gras gratuit. Tapez votre texte, voyez 7 styles de gras se mettre à jour en direct et copiez-les en un clic. Fonctionne sur Instagram, WhatsApp, Discord, TikTok et plus.",
    h1: "Générateur de texte en gras", subtitle: "Tapez votre texte, voyez chaque style de gras en direct et copiez-le d’un geste.",
    label: "Votre texte", placeholder: "Tapez votre texte ici", sample: "texte en gras",
    styles: "Styles de gras", copy: "Copier", copied: "Copié !", copyAria: "Copier {style}",
    note: "Ce sont des caractères Unicode : vous pouvez les coller presque partout. Quelques applications affichent certaines lettres un peu différemment.",
  },
  ar: {
    nav: "نص غامق", title: "مولّد النص الغامق: انسخ والصق نصًا غامقًا",
    description: "مولّد نص غامق مجاني. اكتب نصك وشاهد 7 أنماط غامقة تتحدث مباشرة وانسخها بنقرة واحدة. يعمل على إنستغرام وواتساب وديسكورد وتيك توك وغيرها.",
    h1: "مولّد النص الغامق", subtitle: "اكتب نصك، وشاهد كل نمط غامق مباشرة، وانسخه بلمسة واحدة.",
    label: "نصك", placeholder: "اكتب نصك هنا", sample: "Hello text string my old friend.",
    styles: "أنماط الخط الغامق", copy: "نسخ", copied: "تم النسخ!", copyAria: "نسخ {style}",
    note: "هذه رموز يونيكود، لذا يمكنك لصقها تقريبًا في أي مكان. قد تعرض بعض التطبيقات بعض الحروف بشكل مختلف.",
  },
  th: {
    nav: "ข้อความตัวหนา", title: "ตัวสร้างข้อความตัวหนา คัดลอกและวางข้อความตัวหนา",
    description: "ตัวสร้างข้อความตัวหนาฟรี พิมพ์ข้อความ ดู 7 สไตล์ตัวหนาอัปเดตแบบสด แล้วคัดลอกได้ในคลิกเดียว ใช้ได้กับ Instagram, WhatsApp, Discord, TikTok และอื่นๆ",
    h1: "ตัวสร้างข้อความตัวหนา", subtitle: "พิมพ์ข้อความ ดูทุกสไตล์ตัวหนาอัปเดตแบบสด แล้วคัดลอกได้ในแตะเดียว",
    label: "ข้อความของคุณ", placeholder: "พิมพ์ข้อความที่นี่", sample: "Hello text string my old friend.",
    styles: "สไตล์ตัวหนา", copy: "คัดลอก", copied: "คัดลอกแล้ว!", copyAria: "คัดลอก {style}",
    note: "ทั้งหมดเป็นอักขระ Unicode จึงวางได้เกือบทุกที่ บางแอปอาจแสดงตัวอักษรบางตัวต่างออกไป",
  },
  tr: {
    nav: "Kalın Yazı", title: "Kalın Yazı Oluşturucu: Kopyala Yapıştır Kalın Metin",
    description: "Ücretsiz kalın yazı oluşturucu. Metninizi yazın, 7 kalın stilinin canlı güncellendiğini görün ve tek tıkla kopyalayın. Instagram, WhatsApp, Discord, TikTok ve daha fazlasında çalışır.",
    h1: "Kalın Yazı Oluşturucu", subtitle: "Metninizi yazın, her kalın stilini canlı görün ve tek dokunuşla kopyalayın.",
    label: "Metniniz", placeholder: "Metninizi buraya yazın", sample: "kalın yazı",
    styles: "Kalın stilleri", copy: "Kopyala", copied: "Kopyalandı!", copyAria: "{style} kopyala",
    note: "Bunlar Unicode karakterlerdir, bu yüzden hemen her yere yapıştırabilirsiniz. Bazı uygulamalar harfleri biraz farklı gösterebilir.",
  },
  id: {
    nav: "Teks Tebal", title: "Generator Teks Tebal: Salin dan Tempel Teks Bold",
    description: "Generator teks tebal gratis. Ketik teks, lihat 7 gaya tebal berubah secara langsung, lalu salin dengan satu klik. Bisa dipakai di Instagram, WhatsApp, Discord, TikTok, dan lainnya.",
    h1: "Generator Teks Tebal", subtitle: "Ketik teks, lihat setiap gaya tebal berubah langsung, dan salin dengan satu ketukan.",
    label: "Teks kamu", placeholder: "Ketik teks di sini", sample: "teks tebal",
    styles: "Gaya tebal", copy: "Salin", copied: "Tersalin!", copyAria: "Salin {style}",
    note: "Ini adalah karakter Unicode, jadi bisa ditempel hampir di mana saja. Beberapa aplikasi mungkin menampilkan huruf tertentu sedikit berbeda.",
  },
  vi: {
    nav: "Chữ in đậm", title: "Tạo chữ in đậm: sao chép và dán chữ đậm",
    description: "Công cụ tạo chữ in đậm miễn phí. Gõ chữ, xem 7 kiểu in đậm cập nhật trực tiếp và sao chép chỉ bằng một cú nhấp. Dùng được trên Instagram, WhatsApp, Discord, TikTok và nhiều nơi khác.",
    h1: "Tạo chữ in đậm", subtitle: "Gõ chữ, xem từng kiểu in đậm cập nhật trực tiếp và sao chép chỉ với một lần chạm.",
    label: "Văn bản của bạn", placeholder: "Nhập văn bản của bạn ở đây", sample: "chữ in đậm",
    styles: "Các kiểu in đậm", copy: "Sao chép", copied: "Đã chép!", copyAria: "Sao chép {style}",
    note: "Đây là ký tự Unicode nên bạn có thể dán gần như ở mọi nơi. Một số ứng dụng có thể hiển thị vài chữ cái hơi khác.",
  },
  pl: {
    nav: "Pogrubiony tekst", title: "Generator pogrubionego tekstu: kopiuj i wklej pogrubienie",
    description: "Darmowy generator pogrubionego tekstu. Wpisz tekst, zobacz na żywo 7 stylów pogrubienia i skopiuj jednym kliknięciem. Działa na Instagramie, WhatsAppie, Discordzie, TikToku i nie tylko.",
    h1: "Generator pogrubionego tekstu", subtitle: "Wpisz tekst, zobacz każdy styl pogrubienia na żywo i skopiuj jednym dotknięciem.",
    label: "Twój tekst", placeholder: "Wpisz tutaj swój tekst", sample: "pogrubiony tekst",
    styles: "Style pogrubienia", copy: "Kopiuj", copied: "Skopiowano!", copyAria: "Kopiuj: {style}",
    note: "To znaki Unicode, więc wkleisz je prawie wszędzie. Niektóre aplikacje mogą wyświetlać część liter nieco inaczej.",
  },
  es: {
    nav: "Texto en negrita", title: "Generador de texto en negrita: copia y pega texto en negrita",
    description: "Generador de texto en negrita gratis. Escribe tu texto, mira 7 estilos de negrita actualizarse en vivo y cópialos con un clic. Funciona en Instagram, WhatsApp, Discord, TikTok y más.",
    h1: "Generador de texto en negrita", subtitle: "Escribe tu texto, mira cada estilo de negrita en vivo y cópialo con un toque.",
    label: "Tu texto", placeholder: "Escribe tu texto aquí", sample: "texto en negrita",
    styles: "Estilos de negrita", copy: "Copiar", copied: "¡Copiado!", copyAria: "Copiar {style}",
    note: "Son caracteres Unicode, así que puedes pegarlos casi en cualquier sitio. Algunas apps pueden mostrar ciertas letras de forma distinta.",
  },
  it: {
    nav: "Testo in grassetto", title: "Generatore di testo in grassetto: copia e incolla testo grassetto",
    description: "Generatore di testo in grassetto gratuito. Scrivi il testo, guarda 7 stili di grassetto aggiornarsi dal vivo e copiali con un clic. Funziona su Instagram, WhatsApp, Discord, TikTok e altro.",
    h1: "Generatore di testo in grassetto", subtitle: "Scrivi il testo, guarda ogni stile di grassetto dal vivo e copialo con un tocco.",
    label: "Il tuo testo", placeholder: "Scrivi qui il tuo testo", sample: "testo in grassetto",
    styles: "Stili di grassetto", copy: "Copia", copied: "Copiato!", copyAria: "Copia {style}",
    note: "Sono caratteri Unicode, quindi puoi incollarli quasi ovunque. Alcune app potrebbero mostrare certe lettere in modo diverso.",
  },
  ja: {
    nav: "太字テキスト", title: "太字テキストジェネレーター：コピペでOK",
    description: "無料の太字テキストジェネレーター。文字を入力すると7種類の太字スタイルがリアルタイムで変わり、ワンクリックでコピー。Instagram、WhatsApp、Discord、TikTokなどで使えます。",
    h1: "太字テキストジェネレーター", subtitle: "文字を入力して、すべての太字スタイルをリアルタイムで確認。ワンタップでコピーできます。",
    label: "テキスト", placeholder: "ここに文字を入力", sample: "Hello text string my old friend.",
    styles: "太字のスタイル", copy: "コピー", copied: "コピーしました！", copyAria: "{style}をコピー",
    note: "Unicode文字なので、ほとんどの場所に貼り付けられます。アプリによっては一部の文字の表示が異なる場合があります。",
  },
  de: {
    nav: "Fetter Text", title: "Fetter Text Generator: fette Schrift kopieren und einfügen",
    description: "Kostenloser Generator für fetten Text. Text eingeben, 7 Fett-Stile live sehen und mit einem Klick kopieren. Funktioniert auf Instagram, WhatsApp, Discord, TikTok und mehr.",
    h1: "Fetter Text Generator", subtitle: "Text eingeben, jeden Fett-Stil live sehen und mit einem Tipp kopieren.",
    label: "Dein Text", placeholder: "Gib hier deinen Text ein", sample: "fetter Text",
    styles: "Fett-Stile", copy: "Kopieren", copied: "Kopiert!", copyAria: "{style} kopieren",
    note: "Das sind Unicode-Zeichen, du kannst sie fast überall einfügen. Manche Apps zeigen einzelne Buchstaben etwas anders an.",
  },
  pt: {
    nav: "Texto em negrito", title: "Gerador de texto em negrito: copie e cole texto em negrito",
    description: "Gerador de texto em negrito grátis. Digite seu texto, veja 7 estilos de negrito atualizarem ao vivo e copie com um clique. Funciona no Instagram, WhatsApp, Discord, TikTok e mais.",
    h1: "Gerador de texto em negrito", subtitle: "Digite seu texto, veja cada estilo de negrito ao vivo e copie com um toque.",
    label: "Seu texto", placeholder: "Digite seu texto aqui", sample: "texto em negrito",
    styles: "Estilos de negrito", copy: "Copiar", copied: "Copiado!", copyAria: "Copiar {style}",
    note: "São caracteres Unicode, então você pode colar quase em qualquer lugar. Alguns apps podem mostrar certas letras de forma diferente.",
  },
};

export const boldText = (lang: string): BoldText => T[lang] ?? T.en;
