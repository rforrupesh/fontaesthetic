// Text for the Glitch tool UI.
// Translated for every site language. The long article below the tool is written by hand in
// src/pages/glitch-text.astro (and src/pages/{lang}/glitch-text.astro for translations).

export interface GlitchText {
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

const T: Record<string, GlitchText> = {
  en: {
    nav: 'Glitch Text', title: 'Glitch Text Generator (Copy and Paste Zalgo Text)',
    description: 'Free glitch text generator. Type your text, see 7 glitch styles update live and copy them in one click. Works on Facebook, YouTube, Tumblr and more.',
    h1: 'Glitch Text Generator (Copy and Paste)', subtitle: 'Type your text, see every glitch style update live and copy it in one tap.',
    label: 'Your text', placeholder: 'Type your text here', sample: 'like this',
    styles: 'Glitch styles', copy: 'Copy', copied: 'Copied!', copyAria: 'Copy {style}',
    note: 'These are Unicode characters, so you can paste them almost anywhere. Some websites remove them, and usernames or email addresses usually need standard characters.',
  },
  fr: {
    nav: "Texte glitch", title: "Générateur de texte glitch (texte Zalgo à copier-coller)",
    description: "Générateur de texte glitch gratuit. Tapez votre texte, voyez 7 styles glitch se mettre à jour en direct et copiez-les en un clic. Fonctionne sur Facebook, YouTube, Tumblr et plus.",
    h1: "Générateur de texte glitch (copier-coller)", subtitle: "Tapez votre texte, voyez chaque style glitch se mettre à jour en direct et copiez-le d'un seul geste.",
    label: "Votre texte", placeholder: "Tapez votre texte ici", sample: "comme ça",
    styles: "Styles glitch", copy: "Copier", copied: "Copié !", copyAria: "Copier {style}",
    note: "Ce sont des caractères Unicode : vous pouvez les coller presque partout. Certains sites les suppriment, et les noms d'utilisateur ou adresses e-mail exigent généralement des caractères standard.",
  },
  es: {
    nav: "Texto glitch", title: "Generador de texto glitch (texto Zalgo para copiar y pegar)",
    description: "Generador de texto glitch gratis. Escribe tu texto, mira 7 estilos glitch actualizarse en vivo y cópialos con un clic. Funciona en Facebook, YouTube, Tumblr y más.",
    h1: "Generador de texto glitch (copiar y pegar)", subtitle: "Escribe tu texto, mira cada estilo glitch actualizarse en vivo y cópialo con un toque.",
    label: "Tu texto", placeholder: "Escribe tu texto aquí", sample: "como esto",
    styles: "Estilos glitch", copy: "Copiar", copied: "¡Copiado!", copyAria: "Copiar {style}",
    note: "Son caracteres Unicode, así que puedes pegarlos casi en cualquier sitio. Algunas webs los eliminan, y los nombres de usuario o correos electrónicos suelen requerir caracteres estándar.",
  },
  de: {
    nav: "Glitch-Text", title: "Glitch-Text-Generator (Zalgo-Text zum Kopieren und Einfügen)",
    description: "Kostenloser Glitch-Text-Generator. Text eingeben, 7 Glitch-Stile live sehen und mit einem Klick kopieren. Funktioniert auf Facebook, YouTube, Tumblr und mehr.",
    h1: "Glitch-Text-Generator (Kopieren und Einfügen)", subtitle: "Gib deinen Text ein, sieh jeden Glitch-Stil live und kopiere ihn mit einem Tipp.",
    label: "Dein Text", placeholder: "Gib hier deinen Text ein", sample: "so wie das",
    styles: "Glitch-Stile", copy: "Kopieren", copied: "Kopiert!", copyAria: "{style} kopieren",
    note: "Das sind Unicode-Zeichen, du kannst sie fast überall einfügen. Manche Websites entfernen sie, und Benutzernamen oder E-Mail-Adressen erfordern meist Standardzeichen.",
  },
  it: {
    nav: "Testo glitch", title: "Generatore di testo glitch (testo Zalgo da copiare e incollare)",
    description: "Generatore di testo glitch gratuito. Scrivi il testo, guarda 7 stili glitch aggiornarsi dal vivo e copiali con un clic. Funziona su Facebook, YouTube, Tumblr e altro.",
    h1: "Generatore di testo glitch (copia e incolla)", subtitle: "Scrivi il testo, guarda ogni stile glitch aggiornarsi dal vivo e copialo con un tocco.",
    label: "Il tuo testo", placeholder: "Scrivi qui il tuo testo", sample: "come questo",
    styles: "Stili glitch", copy: "Copia", copied: "Copiato!", copyAria: "Copia {style}",
    note: "Sono caratteri Unicode, quindi puoi incollarli quasi ovunque. Alcuni siti li rimuovono, e i nomi utente o gli indirizzi email di solito richiedono caratteri standard.",
  },
  pt: {
    nav: "Texto glitch", title: "Gerador de texto glitch (texto Zalgo para copiar e colar)",
    description: "Gerador de texto glitch grátis. Digite seu texto, veja 7 estilos glitch atualizarem ao vivo e copie com um clique. Funciona no Facebook, YouTube, Tumblr e mais.",
    h1: "Gerador de texto glitch (copiar e colar)", subtitle: "Digite seu texto, veja cada estilo glitch atualizar ao vivo e copie com um toque.",
    label: "Seu texto", placeholder: "Digite seu texto aqui", sample: "assim",
    styles: "Estilos glitch", copy: "Copiar", copied: "Copiado!", copyAria: "Copiar {style}",
    note: "São caracteres Unicode, então você pode colá-los quase em qualquer lugar. Alguns sites os removem, e nomes de usuário ou endereços de e-mail geralmente exigem caracteres padrão.",
  },
  id: {
    nav: "Teks Glitch", title: "Generator Teks Glitch (Teks Zalgo Salin dan Tempel)",
    description: "Generator teks glitch gratis. Ketik teksmu, lihat 7 gaya glitch berubah langsung dan salin dengan satu klik. Bisa dipakai di Facebook, YouTube, Tumblr, dan lainnya.",
    h1: "Generator Teks Glitch (Salin dan Tempel)", subtitle: "Ketik teksmu, lihat setiap gaya glitch berubah langsung dan salin dengan sekali ketuk.",
    label: "Teksmu", placeholder: "Ketik teksmu di sini", sample: "seperti ini",
    styles: "Gaya glitch", copy: "Salin", copied: "Tersalin!", copyAria: "Salin {style}",
    note: "Ini adalah karakter Unicode, jadi bisa ditempel hampir di mana saja. Beberapa situs menghapusnya, dan nama pengguna atau alamat email biasanya memerlukan karakter standar.",
  },
  tr: {
    nav: "Glitch Yazı", title: "Glitch Yazı Oluşturucu (Kopyala Yapıştır Zalgo Yazı)",
    description: "Ücretsiz glitch yazı oluşturucu. Metnini yaz, 7 glitch stilinin canlı güncellendiğini gör ve tek tıkla kopyala. Facebook, YouTube, Tumblr ve daha fazlasında çalışır.",
    h1: "Glitch Yazı Oluşturucu (Kopyala ve Yapıştır)", subtitle: "Metnini yaz, her glitch stilinin canlı güncellendiğini gör ve tek dokunuşla kopyala.",
    label: "Metnin", placeholder: "Metnini buraya yaz", sample: "şöyle",
    styles: "Glitch stilleri", copy: "Kopyala", copied: "Kopyalandı!", copyAria: "{style} stilini kopyala",
    note: "Bunlar Unicode karakterleridir, bu yüzden neredeyse her yere yapıştırabilirsin. Bazı siteler bunları kaldırır; kullanıcı adları ve e-posta adresleri genellikle standart karakter ister.",
  },
  pl: {
    nav: "Tekst glitch", title: "Generator tekstu glitch (tekst Zalgo do kopiowania i wklejania)",
    description: "Darmowy generator tekstu glitch. Wpisz tekst, zobacz 7 stylów glitch aktualizowanych na żywo i skopiuj je jednym kliknięciem. Działa na Facebooku, YouTube, Tumblr i nie tylko.",
    h1: "Generator tekstu glitch (kopiuj i wklej)", subtitle: "Wpisz tekst, zobacz każdy styl glitch na żywo i skopiuj go jednym dotknięciem.",
    label: "Twój tekst", placeholder: "Wpisz tutaj swój tekst", sample: "tak jak to",
    styles: "Style glitch", copy: "Kopiuj", copied: "Skopiowano!", copyAria: "Kopiuj {style}",
    note: "To znaki Unicode, więc możesz wkleić je prawie wszędzie. Niektóre strony je usuwają, a nazwy użytkowników i adresy e-mail zwykle wymagają standardowych znaków.",
  },
  vi: {
    nav: "Chữ glitch", title: "Trình tạo chữ glitch (chữ Zalgo sao chép và dán)",
    description: "Trình tạo chữ glitch miễn phí. Nhập văn bản, xem 7 kiểu glitch cập nhật trực tiếp và sao chép chỉ bằng một cú nhấp. Dùng được trên Facebook, YouTube, Tumblr và nhiều nơi khác.",
    h1: "Trình tạo chữ glitch (sao chép và dán)", subtitle: "Nhập văn bản, xem từng kiểu glitch cập nhật trực tiếp và sao chép chỉ bằng một lần chạm.",
    label: "Văn bản của bạn", placeholder: "Nhập văn bản của bạn tại đây", sample: "như thế này",
    styles: "Các kiểu glitch", copy: "Sao chép", copied: "Đã sao chép!", copyAria: "Sao chép {style}",
    note: "Đây là các ký tự Unicode nên bạn có thể dán gần như ở mọi nơi. Một số trang web sẽ xóa chúng, còn tên người dùng hoặc địa chỉ email thường yêu cầu ký tự chuẩn.",
  },
  th: {
    nav: "ข้อความกลิตช์", title: "ตัวสร้างข้อความกลิตช์ (ข้อความ Zalgo คัดลอกและวาง)",
    description: "ตัวสร้างข้อความกลิตช์ฟรี พิมพ์ข้อความของคุณ ดู 7 สไตล์กลิตช์อัปเดตสด ๆ แล้วคัดลอกได้ในคลิกเดียว ใช้ได้บน Facebook, YouTube, Tumblr และอื่น ๆ",
    h1: "ตัวสร้างข้อความกลิตช์ (คัดลอกและวาง)", subtitle: "พิมพ์ข้อความของคุณ ดูทุกสไตล์กลิตช์อัปเดตสด ๆ แล้วคัดลอกได้ในแตะเดียว",
    label: "ข้อความของคุณ", placeholder: "พิมพ์ข้อความของคุณที่นี่", sample: "แบบนี้",
    styles: "สไตล์กลิตช์", copy: "คัดลอก", copied: "คัดลอกแล้ว!", copyAria: "คัดลอก {style}",
    note: "ตัวอักษรเหล่านี้เป็นอักขระ Unicode จึงวางได้เกือบทุกที่ บางเว็บไซต์อาจลบออก และชื่อผู้ใช้หรืออีเมลมักต้องใช้อักขระมาตรฐาน",
  },
  ja: {
    nav: "グリッチテキスト", title: "グリッチテキストジェネレーター（コピペできるZalgoテキスト）",
    description: "無料のグリッチテキストジェネレーター。文字を入力すると7種類のグリッチスタイルがリアルタイムで更新され、ワンクリックでコピーできます。Facebook、YouTube、Tumblrなどで使えます。",
    h1: "グリッチテキストジェネレーター（コピペ対応）", subtitle: "文字を入力すると、すべてのグリッチスタイルがリアルタイムで更新され、ワンタップでコピーできます。",
    label: "テキスト", placeholder: "ここにテキストを入力", sample: "こんな感じ",
    styles: "グリッチスタイル", copy: "コピー", copied: "コピーしました！", copyAria: "{style}をコピー",
    note: "これらはUnicode文字なので、ほとんどの場所に貼り付けられます。一部のサイトでは削除されることがあり、ユーザー名やメールアドレスには通常の文字が必要です。",
  },
  ar: {
    nav: "نص غليتش", title: "مولّد نص غليتش (نص Zalgo للنسخ واللصق)",
    description: "مولّد نص غليتش مجاني. اكتب نصك وشاهد 7 أنماط غليتش تتحدّث مباشرة وانسخها بنقرة واحدة. يعمل على فيسبوك ويوتيوب وتمبلر وغيرها.",
    h1: "مولّد نص غليتش (نسخ ولصق)", subtitle: "اكتب نصك وشاهد كل نمط غليتش يتحدّث مباشرة وانسخه بلمسة واحدة.",
    label: "نصك", placeholder: "اكتب نصك هنا", sample: "مثل هذا",
    styles: "أنماط الغليتش", copy: "نسخ", copied: "تم النسخ!", copyAria: "نسخ {style}",
    note: "هذه رموز Unicode، لذا يمكنك لصقها تقريبًا في أي مكان. بعض المواقع تزيلها، وأسماء المستخدمين وعناوين البريد الإلكتروني تتطلب عادةً أحرفًا قياسية.",
  },
};

export const glitchText = (lang: string): GlitchText => T[lang] ?? T.en;
