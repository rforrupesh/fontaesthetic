// Text for the Strikethrough tool UI in every site language.
// Only the tool is translated here. The long article below the tool is written by hand in each
// language's page file (src/pages/{lang}/strikethrough.astro).

export interface StrikeText {
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

const T: Record<string, StrikeText> = {
  en: {
    nav: 'Strikethrough Text', title: 'Strikethrough Text Generator: Copy and Paste Cross Out Text',
    description: 'Free strikethrough text generator. Type your text, preview 10 cross-out styles and copy them in one click. Works on Instagram, WhatsApp, Discord, TikTok and more.',
    h1: 'Strikethrough Text Generator', subtitle: 'Type your text, preview every cross-out style and copy it in one tap.',
    label: 'Your text', placeholder: 'Type your text here', sample: 'strikethrough',
    styles: 'Strikethrough styles', copy: 'Copy', copied: 'Copied!', copyAria: 'Copy {style}',
    note: 'These are Unicode characters, so you can paste them almost anywhere. A few apps may show some marks differently.',
  },
  fr: {
    nav: 'Texte barré', title: 'Générateur de texte barré : copier-coller du texte rayé',
    description: 'Générateur de texte barré gratuit. Tapez votre texte, voyez 10 styles de texte rayé et copiez-les en un clic. Fonctionne sur Instagram, WhatsApp, Discord, TikTok et plus.',
    h1: 'Générateur de texte barré', subtitle: 'Tapez votre texte, voyez chaque style barré et copiez-le d’un geste.',
    label: 'Votre texte', placeholder: 'Tapez votre texte ici', sample: 'texte barré',
    styles: 'Styles de texte barré', copy: 'Copier', copied: 'Copié !', copyAria: 'Copier {style}',
    note: 'Ce sont des caractères Unicode : vous pouvez les coller presque partout. Quelques applications affichent certains signes un peu différemment.',
  },
  ar: {
    nav: 'نص مشطوب', title: 'مولّد النص المشطوب: انسخ والصق نصًا عليه خط',
    description: 'مولّد نص مشطوب مجاني. اكتب نصك وشاهد 10 أنماط للشطب وانسخها بنقرة واحدة. يعمل على إنستغرام وواتساب وديسكورد وتيك توك وغيرها.',
    h1: 'مولّد النص المشطوب', subtitle: 'اكتب نصك، وشاهد كل نمط شطب، وانسخه بلمسة واحدة.',
    label: 'نصك', placeholder: 'اكتب نصك هنا', sample: 'strikethrough',
    styles: 'أنماط النص المشطوب', copy: 'نسخ', copied: 'تم النسخ!', copyAria: 'نسخ {style}',
    note: 'هذه رموز يونيكود، لذا يمكنك لصقها تقريبًا في أي مكان. قد تعرض بعض التطبيقات بعض العلامات بشكل مختلف.',
  },
  th: {
    nav: 'ข้อความขีดฆ่า', title: 'ตัวสร้างข้อความขีดฆ่า คัดลอกและวางข้อความที่มีเส้นขีด',
    description: 'ตัวสร้างข้อความขีดฆ่าฟรี พิมพ์ข้อความ ดูตัวอย่าง 10 สไตล์ แล้วคัดลอกได้ในคลิกเดียว ใช้ได้กับ Instagram, WhatsApp, Discord, TikTok และอื่นๆ',
    h1: 'ตัวสร้างข้อความขีดฆ่า', subtitle: 'พิมพ์ข้อความ ดูตัวอย่างทุกสไตล์ แล้วคัดลอกได้ในแตะเดียว',
    label: 'ข้อความของคุณ', placeholder: 'พิมพ์ข้อความที่นี่', sample: 'strikethrough',
    styles: 'สไตล์ข้อความขีดฆ่า', copy: 'คัดลอก', copied: 'คัดลอกแล้ว!', copyAria: 'คัดลอก {style}',
    note: 'ทั้งหมดเป็นอักขระ Unicode จึงวางได้เกือบทุกที่ บางแอปอาจแสดงเครื่องหมายบางตัวต่างออกไป',
  },
  tr: {
    nav: 'Üstü Çizili Yazı', title: 'Üstü Çizili Yazı Oluşturucu: Kopyala Yapıştır',
    description: 'Ücretsiz üstü çizili yazı oluşturucu. Metninizi yazın, 10 çizgi stilini önizleyin ve tek tıkla kopyalayın. Instagram, WhatsApp, Discord, TikTok ve daha fazlasında çalışır.',
    h1: 'Üstü Çizili Yazı Oluşturucu', subtitle: 'Metninizi yazın, her çizgi stilini önizleyin ve tek dokunuşla kopyalayın.',
    label: 'Metniniz', placeholder: 'Metninizi buraya yazın', sample: 'üstü çizili',
    styles: 'Üstü çizili stiller', copy: 'Kopyala', copied: 'Kopyalandı!', copyAria: '{style} kopyala',
    note: 'Bunlar Unicode karakterlerdir, bu yüzden hemen her yere yapıştırabilirsiniz. Bazı uygulamalar işaretleri biraz farklı gösterebilir.',
  },
  id: {
    nav: 'Teks Coret', title: 'Generator Teks Coret: Salin dan Tempel Teks Dicoret',
    description: 'Generator teks coret gratis. Ketik teks, lihat 10 gaya coretan, lalu salin dengan satu klik. Bisa dipakai di Instagram, WhatsApp, Discord, TikTok, dan lainnya.',
    h1: 'Generator Teks Coret', subtitle: 'Ketik teks, lihat setiap gaya coretan, dan salin dengan satu ketukan.',
    label: 'Teks kamu', placeholder: 'Ketik teks di sini', sample: 'teks coret',
    styles: 'Gaya teks coret', copy: 'Salin', copied: 'Tersalin!', copyAria: 'Salin {style}',
    note: 'Ini adalah karakter Unicode, jadi bisa ditempel hampir di mana saja. Beberapa aplikasi mungkin menampilkan tanda tertentu sedikit berbeda.',
  },
  vi: {
    nav: 'Chữ gạch ngang', title: 'Tạo chữ gạch ngang: sao chép và dán chữ bị gạch',
    description: 'Công cụ tạo chữ gạch ngang miễn phí. Gõ chữ, xem trước 10 kiểu gạch và sao chép chỉ bằng một cú nhấp. Dùng được trên Instagram, WhatsApp, Discord, TikTok và nhiều nơi khác.',
    h1: 'Tạo chữ gạch ngang', subtitle: 'Gõ chữ, xem trước từng kiểu gạch và sao chép chỉ với một lần chạm.',
    label: 'Văn bản của bạn', placeholder: 'Nhập văn bản của bạn ở đây', sample: 'chữ gạch ngang',
    styles: 'Các kiểu chữ gạch ngang', copy: 'Sao chép', copied: 'Đã chép!', copyAria: 'Sao chép {style}',
    note: 'Đây là ký tự Unicode nên bạn có thể dán gần như ở mọi nơi. Một số ứng dụng có thể hiển thị vài dấu hơi khác.',
  },
  pl: {
    nav: 'Tekst przekreślony', title: 'Generator przekreślonego tekstu: kopiuj i wklej',
    description: 'Darmowy generator przekreślonego tekstu. Wpisz tekst, zobacz 10 stylów przekreślenia i skopiuj jednym kliknięciem. Działa na Instagramie, WhatsAppie, Discordzie, TikToku i nie tylko.',
    h1: 'Generator przekreślonego tekstu', subtitle: 'Wpisz tekst, zobacz każdy styl przekreślenia i skopiuj jednym dotknięciem.',
    label: 'Twój tekst', placeholder: 'Wpisz tutaj swój tekst', sample: 'tekst przekreślony',
    styles: 'Style przekreślenia', copy: 'Kopiuj', copied: 'Skopiowano!', copyAria: 'Kopiuj: {style}',
    note: 'To znaki Unicode, więc wkleisz je prawie wszędzie. Niektóre aplikacje mogą wyświetlać część znaków nieco inaczej.',
  },
  es: {
    nav: 'Texto tachado', title: 'Generador de texto tachado: copia y pega texto con línea',
    description: 'Generador de texto tachado gratis. Escribe tu texto, mira 10 estilos de tachado y cópialos con un clic. Funciona en Instagram, WhatsApp, Discord, TikTok y más.',
    h1: 'Generador de texto tachado', subtitle: 'Escribe tu texto, mira cada estilo de tachado y cópialo con un toque.',
    label: 'Tu texto', placeholder: 'Escribe tu texto aquí', sample: 'texto tachado',
    styles: 'Estilos de texto tachado', copy: 'Copiar', copied: '¡Copiado!', copyAria: 'Copiar {style}',
    note: 'Son caracteres Unicode, así que puedes pegarlos casi en cualquier sitio. Algunas apps pueden mostrar ciertas marcas de forma distinta.',
  },
  it: {
    nav: 'Testo barrato', title: 'Generatore di testo barrato: copia e incolla testo cancellato',
    description: 'Generatore di testo barrato gratuito. Scrivi il testo, guarda 10 stili di barratura e copiali con un clic. Funziona su Instagram, WhatsApp, Discord, TikTok e altro.',
    h1: 'Generatore di testo barrato', subtitle: 'Scrivi il testo, guarda ogni stile di barratura e copialo con un tocco.',
    label: 'Il tuo testo', placeholder: 'Scrivi qui il tuo testo', sample: 'testo barrato',
    styles: 'Stili di testo barrato', copy: 'Copia', copied: 'Copiato!', copyAria: 'Copia {style}',
    note: 'Sono caratteri Unicode, quindi puoi incollarli quasi ovunque. Alcune app potrebbero mostrare certi segni in modo diverso.',
  },
  ja: {
    nav: '取り消し線テキスト', title: '取り消し線テキストジェネレーター：コピペでOK',
    description: '無料の取り消し線テキストジェネレーター。文字を入力して10種類のスタイルをプレビューし、ワンクリックでコピー。Instagram、WhatsApp、Discord、TikTokなどで使えます。',
    h1: '取り消し線テキストジェネレーター', subtitle: '文字を入力して、すべてのスタイルをプレビュー。ワンタップでコピーできます。',
    label: 'テキスト', placeholder: 'ここに文字を入力', sample: 'strikethrough',
    styles: '取り消し線のスタイル', copy: 'コピー', copied: 'コピーしました！', copyAria: '{style}をコピー',
    note: 'Unicode文字なので、ほとんどの場所に貼り付けられます。アプリによっては一部の記号の表示が異なる場合があります。',
  },
  de: {
    nav: 'Durchgestrichener Text', title: 'Durchgestrichener Text Generator: kopieren und einfügen',
    description: 'Kostenloser Generator für durchgestrichenen Text. Text eingeben, 10 Durchstreich-Stile ansehen und mit einem Klick kopieren. Funktioniert auf Instagram, WhatsApp, Discord, TikTok und mehr.',
    h1: 'Durchgestrichener Text Generator', subtitle: 'Text eingeben, jeden Durchstreich-Stil ansehen und mit einem Tipp kopieren.',
    label: 'Dein Text', placeholder: 'Gib hier deinen Text ein', sample: 'durchgestrichen',
    styles: 'Durchstreich-Stile', copy: 'Kopieren', copied: 'Kopiert!', copyAria: '{style} kopieren',
    note: 'Das sind Unicode-Zeichen, du kannst sie fast überall einfügen. Manche Apps zeigen einzelne Zeichen etwas anders an.',
  },
  pt: {
    nav: 'Texto riscado', title: 'Gerador de texto riscado: copie e cole texto cortado',
    description: 'Gerador de texto riscado grátis. Digite seu texto, veja 10 estilos de riscado e copie com um clique. Funciona no Instagram, WhatsApp, Discord, TikTok e mais.',
    h1: 'Gerador de texto riscado', subtitle: 'Digite seu texto, veja cada estilo de riscado e copie com um toque.',
    label: 'Seu texto', placeholder: 'Digite seu texto aqui', sample: 'texto riscado',
    styles: 'Estilos de texto riscado', copy: 'Copiar', copied: 'Copiado!', copyAria: 'Copiar {style}',
    note: 'São caracteres Unicode, então você pode colar quase em qualquer lugar. Alguns apps podem mostrar certos sinais de forma diferente.',
  },
};

export const strikeText = (lang: string): StrikeText => T[lang] ?? T.en;
