// Text for the Underline tool UI in every site language.
// Only the tool is translated here. The long article below the tool is written by hand in each
// language's page file (src/pages/{lang}/underline.astro).

export interface UnderlineText {
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

const T: Record<string, UnderlineText> = {
  en: {
    nav: 'Underline Text', title: 'Underline Text Generator: Copy and Paste Underlined Text',
    description: 'Free underline text generator. Type your text, see 6 underline styles update live and copy them in one click. Works on Instagram, WhatsApp, Discord, TikTok and more.',
    h1: 'Underline Text Generator', subtitle: 'Type your text, see every underline style update live and copy it in one tap.',
    label: 'Your text', placeholder: 'Type your text here', sample: 'Hello text string my old friend.',
    styles: 'Underline styles', copy: 'Copy', copied: 'Copied!', copyAria: 'Copy {style}',
    note: 'These are Unicode characters, so you can paste them almost anywhere. A few apps may show some marks differently.',
  },
  fr: {
    nav: 'Texte souligné', title: 'Générateur de texte souligné : copier-coller du texte avec soulignement',
    description: 'Générateur de texte souligné gratuit. Tapez votre texte, voyez 6 styles de soulignement se mettre à jour en direct et copiez-les en un clic. Fonctionne sur Instagram, WhatsApp, Discord, TikTok et plus.',
    h1: 'Générateur de texte souligné', subtitle: 'Tapez votre texte, voyez chaque style de soulignement en direct et copiez-le d’un geste.',
    label: 'Votre texte', placeholder: 'Tapez votre texte ici', sample: 'texte souligné',
    styles: 'Styles de soulignement', copy: 'Copier', copied: 'Copié !', copyAria: 'Copier {style}',
    note: 'Ce sont des caractères Unicode : vous pouvez les coller presque partout. Quelques applications affichent certains signes un peu différemment.',
  },
  ar: {
    nav: 'نص مسطّر', title: 'مولّد النص المسطّر: انسخ والصق نصًا تحته خط',
    description: 'مولّد نص مسطّر مجاني. اكتب نصك وشاهد 6 أنماط للتسطير تتحدث مباشرة وانسخها بنقرة واحدة. يعمل على إنستغرام وواتساب وديسكورد وتيك توك وغيرها.',
    h1: 'مولّد النص المسطّر', subtitle: 'اكتب نصك، وشاهد كل نمط تسطير مباشرة، وانسخه بلمسة واحدة.',
    label: 'نصك', placeholder: 'اكتب نصك هنا', sample: 'Hello text string my old friend.',
    styles: 'أنماط التسطير', copy: 'نسخ', copied: 'تم النسخ!', copyAria: 'نسخ {style}',
    note: 'هذه رموز يونيكود، لذا يمكنك لصقها تقريبًا في أي مكان. قد تعرض بعض التطبيقات بعض العلامات بشكل مختلف.',
  },
  th: {
    nav: 'ข้อความขีดเส้นใต้', title: 'ตัวสร้างข้อความขีดเส้นใต้ คัดลอกและวางข้อความที่มีเส้นใต้',
    description: 'ตัวสร้างข้อความขีดเส้นใต้ฟรี พิมพ์ข้อความ ดู 6 สไตล์อัปเดตแบบสด แล้วคัดลอกได้ในคลิกเดียว ใช้ได้กับ Instagram, WhatsApp, Discord, TikTok และอื่นๆ',
    h1: 'ตัวสร้างข้อความขีดเส้นใต้', subtitle: 'พิมพ์ข้อความ ดูทุกสไตล์อัปเดตแบบสด แล้วคัดลอกได้ในแตะเดียว',
    label: 'ข้อความของคุณ', placeholder: 'พิมพ์ข้อความที่นี่', sample: 'Hello text string my old friend.',
    styles: 'สไตล์เส้นใต้', copy: 'คัดลอก', copied: 'คัดลอกแล้ว!', copyAria: 'คัดลอก {style}',
    note: 'ทั้งหมดเป็นอักขระ Unicode จึงวางได้เกือบทุกที่ บางแอปอาจแสดงเครื่องหมายบางตัวต่างออกไป',
  },
  tr: {
    nav: 'Altı Çizili Yazı', title: 'Altı Çizili Yazı Oluşturucu: Kopyala Yapıştır',
    description: 'Ücretsiz altı çizili yazı oluşturucu. Metninizi yazın, 6 alt çizgi stilinin canlı güncellendiğini görün ve tek tıkla kopyalayın. Instagram, WhatsApp, Discord, TikTok ve daha fazlasında çalışır.',
    h1: 'Altı Çizili Yazı Oluşturucu', subtitle: 'Metninizi yazın, her alt çizgi stilini canlı görün ve tek dokunuşla kopyalayın.',
    label: 'Metniniz', placeholder: 'Metninizi buraya yazın', sample: 'altı çizili yazı',
    styles: 'Alt çizgi stilleri', copy: 'Kopyala', copied: 'Kopyalandı!', copyAria: '{style} kopyala',
    note: 'Bunlar Unicode karakterlerdir, bu yüzden hemen her yere yapıştırabilirsiniz. Bazı uygulamalar işaretleri biraz farklı gösterebilir.',
  },
  id: {
    nav: 'Teks Garis Bawah', title: 'Generator Teks Garis Bawah: Salin dan Tempel Teks Bergaris Bawah',
    description: 'Generator teks garis bawah gratis. Ketik teks, lihat 6 gaya garis bawah berubah secara langsung, lalu salin dengan satu klik. Bisa dipakai di Instagram, WhatsApp, Discord, TikTok, dan lainnya.',
    h1: 'Generator Teks Garis Bawah', subtitle: 'Ketik teks, lihat setiap gaya garis bawah berubah langsung, dan salin dengan satu ketukan.',
    label: 'Teks kamu', placeholder: 'Ketik teks di sini', sample: 'teks garis bawah',
    styles: 'Gaya garis bawah', copy: 'Salin', copied: 'Tersalin!', copyAria: 'Salin {style}',
    note: 'Ini adalah karakter Unicode, jadi bisa ditempel hampir di mana saja. Beberapa aplikasi mungkin menampilkan tanda tertentu sedikit berbeda.',
  },
  vi: {
    nav: 'Chữ gạch chân', title: 'Tạo chữ gạch chân: sao chép và dán chữ có gạch dưới',
    description: 'Công cụ tạo chữ gạch chân miễn phí. Gõ chữ, xem 6 kiểu gạch chân cập nhật trực tiếp và sao chép chỉ bằng một cú nhấp. Dùng được trên Instagram, WhatsApp, Discord, TikTok và nhiều nơi khác.',
    h1: 'Tạo chữ gạch chân', subtitle: 'Gõ chữ, xem từng kiểu gạch chân cập nhật trực tiếp và sao chép chỉ với một lần chạm.',
    label: 'Văn bản của bạn', placeholder: 'Nhập văn bản của bạn ở đây', sample: 'chữ gạch chân',
    styles: 'Các kiểu gạch chân', copy: 'Sao chép', copied: 'Đã chép!', copyAria: 'Sao chép {style}',
    note: 'Đây là ký tự Unicode nên bạn có thể dán gần như ở mọi nơi. Một số ứng dụng có thể hiển thị vài dấu hơi khác.',
  },
  pl: {
    nav: 'Tekst podkreślony', title: 'Generator podkreślonego tekstu: kopiuj i wklej',
    description: 'Darmowy generator podkreślonego tekstu. Wpisz tekst, zobacz na żywo 6 stylów podkreślenia i skopiuj jednym kliknięciem. Działa na Instagramie, WhatsAppie, Discordzie, TikToku i nie tylko.',
    h1: 'Generator podkreślonego tekstu', subtitle: 'Wpisz tekst, zobacz każdy styl podkreślenia na żywo i skopiuj jednym dotknięciem.',
    label: 'Twój tekst', placeholder: 'Wpisz tutaj swój tekst', sample: 'tekst podkreślony',
    styles: 'Style podkreślenia', copy: 'Kopiuj', copied: 'Skopiowano!', copyAria: 'Kopiuj: {style}',
    note: 'To znaki Unicode, więc wkleisz je prawie wszędzie. Niektóre aplikacje mogą wyświetlać część znaków nieco inaczej.',
  },
  es: {
    nav: 'Texto subrayado', title: 'Generador de texto subrayado: copia y pega texto con subrayado',
    description: 'Generador de texto subrayado gratis. Escribe tu texto, mira 6 estilos de subrayado actualizarse en vivo y cópialos con un clic. Funciona en Instagram, WhatsApp, Discord, TikTok y más.',
    h1: 'Generador de texto subrayado', subtitle: 'Escribe tu texto, mira cada estilo de subrayado en vivo y cópialo con un toque.',
    label: 'Tu texto', placeholder: 'Escribe tu texto aquí', sample: 'texto subrayado',
    styles: 'Estilos de subrayado', copy: 'Copiar', copied: '¡Copiado!', copyAria: 'Copiar {style}',
    note: 'Son caracteres Unicode, así que puedes pegarlos casi en cualquier sitio. Algunas apps pueden mostrar ciertas marcas de forma distinta.',
  },
  it: {
    nav: 'Testo sottolineato', title: 'Generatore di testo sottolineato: copia e incolla testo con sottolineatura',
    description: 'Generatore di testo sottolineato gratuito. Scrivi il testo, guarda 6 stili di sottolineatura aggiornarsi dal vivo e copiali con un clic. Funziona su Instagram, WhatsApp, Discord, TikTok e altro.',
    h1: 'Generatore di testo sottolineato', subtitle: 'Scrivi il testo, guarda ogni stile di sottolineatura dal vivo e copialo con un tocco.',
    label: 'Il tuo testo', placeholder: 'Scrivi qui il tuo testo', sample: 'testo sottolineato',
    styles: 'Stili di sottolineatura', copy: 'Copia', copied: 'Copiato!', copyAria: 'Copia {style}',
    note: 'Sono caratteri Unicode, quindi puoi incollarli quasi ovunque. Alcune app potrebbero mostrare certi segni in modo diverso.',
  },
  ja: {
    nav: '下線テキスト', title: '下線テキストジェネレーター：コピペでOK',
    description: '無料の下線テキストジェネレーター。文字を入力すると6種類の下線スタイルがリアルタイムで変わり、ワンクリックでコピー。Instagram、WhatsApp、Discord、TikTokなどで使えます。',
    h1: '下線テキストジェネレーター', subtitle: '文字を入力して、すべての下線スタイルをリアルタイムで確認。ワンタップでコピーできます。',
    label: 'テキスト', placeholder: 'ここに文字を入力', sample: 'Hello text string my old friend.',
    styles: '下線のスタイル', copy: 'コピー', copied: 'コピーしました！', copyAria: '{style}をコピー',
    note: 'Unicode文字なので、ほとんどの場所に貼り付けられます。アプリによっては一部の記号の表示が異なる場合があります。',
  },
  de: {
    nav: 'Unterstrichener Text', title: 'Unterstrichener Text Generator: kopieren und einfügen',
    description: 'Kostenloser Generator für unterstrichenen Text. Text eingeben, 6 Unterstreichungs-Stile live sehen und mit einem Klick kopieren. Funktioniert auf Instagram, WhatsApp, Discord, TikTok und mehr.',
    h1: 'Unterstrichener Text Generator', subtitle: 'Text eingeben, jeden Unterstreichungs-Stil live sehen und mit einem Tipp kopieren.',
    label: 'Dein Text', placeholder: 'Gib hier deinen Text ein', sample: 'unterstrichener Text',
    styles: 'Unterstreichungs-Stile', copy: 'Kopieren', copied: 'Kopiert!', copyAria: '{style} kopieren',
    note: 'Das sind Unicode-Zeichen, du kannst sie fast überall einfügen. Manche Apps zeigen einzelne Zeichen etwas anders an.',
  },
  pt: {
    nav: 'Texto sublinhado', title: 'Gerador de texto sublinhado: copie e cole texto com sublinhado',
    description: 'Gerador de texto sublinhado grátis. Digite seu texto, veja 6 estilos de sublinhado atualizarem ao vivo e copie com um clique. Funciona no Instagram, WhatsApp, Discord, TikTok e mais.',
    h1: 'Gerador de texto sublinhado', subtitle: 'Digite seu texto, veja cada estilo de sublinhado ao vivo e copie com um toque.',
    label: 'Seu texto', placeholder: 'Digite seu texto aqui', sample: 'texto sublinhado',
    styles: 'Estilos de sublinhado', copy: 'Copiar', copied: 'Copiado!', copyAria: 'Copiar {style}',
    note: 'São caracteres Unicode, então você pode colar quase em qualquer lugar. Alguns apps podem mostrar certos sinais de forma diferente.',
  },
};

export const underlineText = (lang: string): UnderlineText => T[lang] ?? T.en;
