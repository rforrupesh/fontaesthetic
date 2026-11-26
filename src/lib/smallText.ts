// Text for the Small Text tool UI. Translated for every site language. The long article below the tool is written by hand in
// src/pages/small-text.astro (and src/pages/{lang}/small-text.astro for translations).

export interface SmallText {
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

const T: Record<string, SmallText> = {
  en: {
    nav: 'Small Text', title: 'Small Text Generator: Tiny Font Maker and Converter',
    description: 'Free small text generator and tiny font converter. Type your text, see small caps, tiny superscript and subscript styles update live and copy them in one click. Works on Instagram, WhatsApp, Discord, TikTok and more.',
    h1: 'Small Text Generator', subtitle: 'Platforms such as Instagram, X (Twitter), WhatsApp and Discord are not allowing font size adjustment to bios and regular messages but you actually require. Here our Small text generator. It applies unique Unicode characters to the normal alphabets to make it look smaller (e.g. ˢᵒᵐᵉᵗʰⁱⁿᵍ ˡⁱᵏᵉ ᵗʰⁱˢ).',
    label: 'Your text', placeholder: 'Type your text here', sample: 'Hello text string my old friend.',
    styles: 'Small text styles', copy: 'Copy', copied: 'Copied!', copyAria: 'Copy {style}',
    note: 'These are Unicode characters, so you can paste them almost anywhere. A few apps may show some letters differently, and letters without a small form stay normal.',
  },
  fr: {
    nav: "Texte minuscule", title: "Générateur de texte minuscule : créateur et convertisseur de petite police",
    description: "Générateur de texte minuscule gratuit et convertisseur de petite police. Tapez votre texte, voyez petites capitales, exposant et indice se mettre à jour en direct et copiez-les en un clic. Fonctionne sur Instagram, WhatsApp, Discord, TikTok et plus.",
    h1: "Générateur de texte minuscule", subtitle: "Des plateformes comme Instagram, X (Twitter), WhatsApp et Discord ne permettent pas de changer la taille de la police dans les bios et les messages, mais vous pouvez obtenir le même effet. Notre générateur de texte minuscule applique des caractères Unicode spéciaux aux lettres normales pour les faire paraître plus petites (par ex. ˢᵒᵐᵉᵗʰⁱⁿᵍ ˡⁱᵏᵉ ᵗʰⁱˢ).",
    label: "Votre texte", placeholder: "Tapez votre texte ici", sample: 'Hello text string my old friend.',
    styles: "Styles de texte minuscule", copy: "Copier", copied: "Copié !", copyAria: "Copier {style}",
    note: "Ce sont des caractères Unicode : vous pouvez les coller presque partout. Quelques applications affichent certaines lettres différemment, et les lettres sans forme réduite restent normales.",
  },
  es: {
    nav: "Texto pequeño", title: "Generador de texto pequeño: creador y conversor de letra diminuta",
    description: "Generador de texto pequeño gratis y conversor de letra diminuta. Escribe tu texto, mira versalitas, superíndice y subíndice actualizarse en vivo y cópialos con un clic. Funciona en Instagram, WhatsApp, Discord, TikTok y más.",
    h1: "Generador de texto pequeño", subtitle: "Plataformas como Instagram, X (Twitter), WhatsApp y Discord no permiten cambiar el tamaño de la fuente en biografías ni mensajes normales, pero puedes lograr el mismo efecto. Nuestro generador de texto pequeño aplica caracteres Unicode especiales a las letras normales para que se vean más pequeñas (p. ej. ˢᵒᵐᵉᵗʰⁱⁿᵍ ˡⁱᵏᵉ ᵗʰⁱˢ).",
    label: "Tu texto", placeholder: "Escribe tu texto aquí", sample: 'Hello text string my old friend.',
    styles: "Estilos de texto pequeño", copy: "Copiar", copied: "¡Copiado!", copyAria: "Copiar {style}",
    note: "Son caracteres Unicode, así que puedes pegarlos casi en cualquier sitio. Algunas apps pueden mostrar ciertas letras de forma distinta, y las letras sin forma pequeña se quedan normales.",
  },
  de: {
    nav: "Kleiner Text", title: "Kleiner Text Generator: Mini-Schrift Maker und Konverter",
    description: "Kostenloser Generator für kleinen Text und Mini-Schrift-Konverter. Text eingeben, Kapitälchen, Hochgestellt und Tiefgestellt live sehen und mit einem Klick kopieren. Funktioniert auf Instagram, WhatsApp, Discord, TikTok und mehr.",
    h1: "Kleiner Text Generator", subtitle: "Plattformen wie Instagram, X (Twitter), WhatsApp und Discord erlauben keine Änderung der Schriftgröße in Bios und normalen Nachrichten, aber du kannst denselben Effekt erreichen. Unser Generator für kleinen Text wendet spezielle Unicode-Zeichen auf normale Buchstaben an, damit sie kleiner aussehen (z. B. ˢᵒᵐᵉᵗʰⁱⁿᵍ ˡⁱᵏᵉ ᵗʰⁱˢ).",
    label: "Dein Text", placeholder: "Gib hier deinen Text ein", sample: 'Hello text string my old friend.',
    styles: "Stile für kleinen Text", copy: "Kopieren", copied: "Kopiert!", copyAria: "{style} kopieren",
    note: "Das sind Unicode-Zeichen, du kannst sie fast überall einfügen. Manche Apps zeigen einzelne Buchstaben anders an, und Buchstaben ohne kleine Form bleiben normal.",
  },
  it: {
    nav: "Testo piccolo", title: "Generatore di testo piccolo: creatore e convertitore di font minuscolo",
    description: "Generatore di testo piccolo gratuito e convertitore di font minuscolo. Scrivi il testo, guarda maiuscoletto, apice e pedice aggiornarsi dal vivo e copiali con un clic. Funziona su Instagram, WhatsApp, Discord, TikTok e altro.",
    h1: "Generatore di testo piccolo", subtitle: "Piattaforme come Instagram, X (Twitter), WhatsApp e Discord non permettono di cambiare la dimensione del carattere nelle bio e nei messaggi normali, ma puoi ottenere lo stesso effetto. Il nostro generatore di testo piccolo applica caratteri Unicode speciali alle lettere normali per farle sembrare più piccole (es. ˢᵒᵐᵉᵗʰⁱⁿᵍ ˡⁱᵏᵉ ᵗʰⁱˢ).",
    label: "Il tuo testo", placeholder: "Scrivi qui il tuo testo", sample: 'Hello text string my old friend.',
    styles: "Stili di testo piccolo", copy: "Copia", copied: "Copiato!", copyAria: "Copia {style}",
    note: "Sono caratteri Unicode, quindi puoi incollarli quasi ovunque. Alcune app potrebbero mostrare certe lettere in modo diverso, e le lettere senza forma piccola restano normali.",
  },
  pt: {
    nav: "Texto pequeno", title: "Gerador de texto pequeno: criador e conversor de fonte minúscula",
    description: "Gerador de texto pequeno grátis e conversor de fonte minúscula. Digite seu texto, veja versaletes, sobrescrito e subscrito atualizarem ao vivo e copie com um clique. Funciona no Instagram, WhatsApp, Discord, TikTok e mais.",
    h1: "Gerador de texto pequeno", subtitle: "Plataformas como Instagram, X (Twitter), WhatsApp e Discord não permitem alterar o tamanho da fonte em bios e mensagens comuns, mas você consegue o mesmo efeito. Nosso gerador de texto pequeno aplica caracteres Unicode especiais às letras normais para que pareçam menores (ex.: ˢᵒᵐᵉᵗʰⁱⁿᵍ ˡⁱᵏᵉ ᵗʰⁱˢ).",
    label: "Seu texto", placeholder: "Digite seu texto aqui", sample: 'Hello text string my old friend.',
    styles: "Estilos de texto pequeno", copy: "Copiar", copied: "Copiado!", copyAria: "Copiar {style}",
    note: "São caracteres Unicode, então você pode colar quase em qualquer lugar. Alguns apps podem mostrar certas letras de forma diferente, e letras sem forma pequena continuam normais.",
  },
  id: {
    nav: "Teks Kecil", title: "Generator Teks Kecil: Pembuat dan Konverter Font Mini",
    description: "Generator teks kecil gratis dan konverter font mini. Ketik teks, lihat small caps, superskrip, dan subskrip berubah langsung, lalu salin dengan satu klik. Bisa dipakai di Instagram, WhatsApp, Discord, TikTok, dan lainnya.",
    h1: "Generator Teks Kecil", subtitle: "Platform seperti Instagram, X (Twitter), WhatsApp, dan Discord tidak mengizinkan pengaturan ukuran font di bio dan pesan biasa, tetapi kamu bisa mendapatkan efek yang sama. Generator teks kecil kami menerapkan karakter Unicode khusus pada huruf biasa agar terlihat lebih kecil (mis. ˢᵒᵐᵉᵗʰⁱⁿᵍ ˡⁱᵏᵉ ᵗʰⁱˢ).",
    label: "Teks kamu", placeholder: "Ketik teks di sini", sample: 'Hello text string my old friend.',
    styles: "Gaya teks kecil", copy: "Salin", copied: "Tersalin!", copyAria: "Salin {style}",
    note: "Ini adalah karakter Unicode, jadi bisa ditempel hampir di mana saja. Beberapa aplikasi mungkin menampilkan huruf tertentu secara berbeda, dan huruf tanpa bentuk kecil tetap normal.",
  },
  tr: {
    nav: "Küçük Yazı", title: "Küçük Yazı Oluşturucu: Mini Font Yapıcı ve Dönüştürücü",
    description: "Ücretsiz küçük yazı oluşturucu ve mini font dönüştürücü. Metninizi yazın, küçük büyük harf, üst simge ve alt simge stillerinin canlı güncellendiğini görün ve tek tıkla kopyalayın. Instagram, WhatsApp, Discord, TikTok ve daha fazlasında çalışır.",
    h1: "Küçük Yazı Oluşturucu", subtitle: "Instagram, X (Twitter), WhatsApp ve Discord gibi platformlar biyografilerde ve normal mesajlarda yazı boyutunu değiştirmenize izin vermez, ama aynı etkiyi elde edebilirsiniz. Küçük yazı oluşturucumuz, normal harflere özel Unicode karakterleri uygulayarak onları daha küçük gösterir (ör. ˢᵒᵐᵉᵗʰⁱⁿᵍ ˡⁱᵏᵉ ᵗʰⁱˢ).",
    label: "Metniniz", placeholder: "Metninizi buraya yazın", sample: 'Hello text string my old friend.',
    styles: "Küçük yazı stilleri", copy: "Kopyala", copied: "Kopyalandı!", copyAria: "{style} kopyala",
    note: "Bunlar Unicode karakterlerdir, bu yüzden hemen her yere yapıştırabilirsiniz. Bazı uygulamalar harfleri farklı gösterebilir ve küçük biçimi olmayan harfler normal kalır.",
  },
  pl: {
    nav: "Mały tekst", title: "Generator małego tekstu: tworzenie i konwerter mini czcionki",
    description: "Darmowy generator małego tekstu i konwerter mini czcionki. Wpisz tekst, zobacz na żywo kapitaliki, indeks górny i dolny i skopiuj jednym kliknięciem. Działa na Instagramie, WhatsAppie, Discordzie, TikToku i nie tylko.",
    h1: "Generator małego tekstu", subtitle: "Platformy takie jak Instagram, X (Twitter), WhatsApp i Discord nie pozwalają zmieniać rozmiaru czcionki w opisach profilu i zwykłych wiadomościach, ale możesz uzyskać taki sam efekt. Nasz generator małego tekstu stosuje specjalne znaki Unicode do zwykłych liter, aby wyglądały na mniejsze (np. ˢᵒᵐᵉᵗʰⁱⁿᵍ ˡⁱᵏᵉ ᵗʰⁱˢ).",
    label: "Twój tekst", placeholder: "Wpisz tutaj swój tekst", sample: 'Hello text string my old friend.',
    styles: "Style małego tekstu", copy: "Kopiuj", copied: "Skopiowano!", copyAria: "Kopiuj: {style}",
    note: "To znaki Unicode, więc wkleisz je prawie wszędzie. Niektóre aplikacje mogą wyświetlać część liter inaczej, a litery bez małej formy pozostają zwykłe.",
  },
  vi: {
    nav: "Chữ nhỏ", title: "Tạo chữ nhỏ: công cụ tạo và chuyển đổi phông chữ mini",
    description: "Công cụ tạo chữ nhỏ và chuyển đổi phông chữ mini miễn phí. Gõ chữ, xem chữ hoa nhỏ, chỉ số trên và chỉ số dưới cập nhật trực tiếp và sao chép chỉ bằng một cú nhấp. Dùng được trên Instagram, WhatsApp, Discord, TikTok và nhiều nơi khác.",
    h1: "Tạo chữ nhỏ", subtitle: "Các nền tảng như Instagram, X (Twitter), WhatsApp và Discord không cho chỉnh cỡ chữ trong tiểu sử và tin nhắn thông thường, nhưng bạn vẫn có thể đạt hiệu ứng tương tự. Công cụ tạo chữ nhỏ của chúng tôi áp dụng các ký tự Unicode đặc biệt lên chữ cái thường để chúng trông nhỏ hơn (ví dụ ˢᵒᵐᵉᵗʰⁱⁿᵍ ˡⁱᵏᵉ ᵗʰⁱˢ).",
    label: "Văn bản của bạn", placeholder: "Nhập văn bản của bạn ở đây", sample: 'Hello text string my old friend.',
    styles: "Các kiểu chữ nhỏ", copy: "Sao chép", copied: "Đã chép!", copyAria: "Sao chép {style}",
    note: "Đây là ký tự Unicode nên bạn có thể dán gần như ở mọi nơi. Một số ứng dụng có thể hiển thị vài chữ cái khác đi, và chữ cái không có dạng nhỏ sẽ giữ nguyên.",
  },
  ja: {
    nav: "小さい文字", title: "小さい文字ジェネレーター：ミニフォント作成・変換ツール",
    description: "無料の小さい文字ジェネレーター＆ミニフォント変換ツール。文字を入力するとスモールキャップ、上付き、下付きがリアルタイムで変わり、ワンクリックでコピー。Instagram、WhatsApp、Discord、TikTokなどで使えます。",
    h1: "小さい文字ジェネレーター", subtitle: "Instagram、X（Twitter）、WhatsApp、Discordなどでは、プロフィールや通常のメッセージでフォントサイズを変更できませんが、同じ効果を得ることができます。当サイトの小さい文字ジェネレーターは、通常の文字に特別なUnicode文字を適用して小さく見せます（例：ˢᵒᵐᵉᵗʰⁱⁿᵍ ˡⁱᵏᵉ ᵗʰⁱˢ）。",
    label: "テキスト", placeholder: "ここに文字を入力", sample: 'Hello text string my old friend.',
    styles: "小さい文字のスタイル", copy: "コピー", copied: "コピーしました！", copyAria: "{style}をコピー",
    note: "Unicode文字なので、ほとんどの場所に貼り付けられます。アプリによっては一部の文字の表示が異なる場合があり、小さい形のない文字は通常のままになります。",
  },
  th: {
    nav: "ตัวอักษรเล็ก", title: "ตัวสร้างข้อความตัวเล็ก: เครื่องมือสร้างและแปลงฟอนต์จิ๋ว",
    description: "ตัวสร้างข้อความตัวเล็กและตัวแปลงฟอนต์จิ๋วฟรี พิมพ์ข้อความ ดู Small Caps, ตัวยก และตัวห้อยอัปเดตแบบสด แล้วคัดลอกได้ในคลิกเดียว ใช้ได้กับ Instagram, WhatsApp, Discord, TikTok และอื่นๆ",
    h1: "ตัวสร้างข้อความตัวเล็ก", subtitle: "แพลตฟอร์มอย่าง Instagram, X (Twitter), WhatsApp และ Discord ไม่อนุญาตให้ปรับขนาดฟอนต์ในไบโอและข้อความทั่วไป แต่คุณสามารถได้ผลลัพธ์แบบเดียวกัน ตัวสร้างข้อความตัวเล็กของเราใช้อักขระ Unicode พิเศษกับตัวอักษรปกติเพื่อให้ดูเล็กลง (เช่น ˢᵒᵐᵉᵗʰⁱⁿᵍ ˡⁱᵏᵉ ᵗʰⁱˢ)",
    label: "ข้อความของคุณ", placeholder: "พิมพ์ข้อความที่นี่", sample: 'Hello text string my old friend.',
    styles: "สไตล์ข้อความตัวเล็ก", copy: "คัดลอก", copied: "คัดลอกแล้ว!", copyAria: "คัดลอก {style}",
    note: "ทั้งหมดเป็นอักขระ Unicode จึงวางได้เกือบทุกที่ บางแอปอาจแสดงตัวอักษรบางตัวต่างออกไป และตัวอักษรที่ไม่มีรูปแบบตัวเล็กจะคงเดิม",
  },
  ar: {
    nav: "نص صغير", title: "مولّد النص الصغير: أداة إنشاء وتحويل الخط المصغّر",
    description: "مولّد نص صغير ومحوّل خط مصغّر مجاني. اكتب نصك وشاهد الأحرف الكبيرة الصغيرة والرمز العلوي والسفلي تتحدث مباشرة وانسخها بنقرة واحدة. يعمل على إنستغرام وواتساب وديسكورد وتيك توك وغيرها.",
    h1: "مولّد النص الصغير", subtitle: "لا تتيح منصات مثل إنستغرام وX (تويتر) وواتساب وديسكورد تغيير حجم الخط في النبذة التعريفية والرسائل العادية، لكن يمكنك الحصول على التأثير نفسه. يطبّق مولّد النص الصغير لدينا رموز يونيكود خاصة على الحروف العادية لتبدو أصغر (مثل ˢᵒᵐᵉᵗʰⁱⁿᵍ ˡⁱᵏᵉ ᵗʰⁱˢ).",
    label: "نصك", placeholder: "اكتب نصك هنا", sample: 'Hello text string my old friend.',
    styles: "أنماط النص الصغير", copy: "نسخ", copied: "تم النسخ!", copyAria: "نسخ {style}",
    note: "هذه رموز يونيكود، لذا يمكنك لصقها تقريبًا في أي مكان. قد تعرض بعض التطبيقات بعض الحروف بشكل مختلف، وتبقى الحروف التي لا تملك شكلًا صغيرًا كما هي.",
  },
};

export const smallText = (lang: string): SmallText => T[lang] ?? T.en;
