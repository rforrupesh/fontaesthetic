// Blog authors registry.
// A post picks an author with `author: "<key>"` in its frontmatter.
// If the field is missing, DEFAULT_AUTHOR is used.
// To add a new author: add one more entry below (see BLOG-GUIDE.md).
//
// Text fields (displayName, bio, fullBio, role) can be written two ways:
//   bio: 'One text for every language'
//   bio: { en: 'English', fr: 'Français', ar: '...', th: '...', tr: '...', id: '...', vi: '...', pl: '...', es: '...', it: '...', ja: '...', de: '...', pt: '...' }
// A language that is missing from the object falls back to `en`.

type L<T> = T | Partial<Record<string, T>>;

interface AuthorInput {
  name: string;                 // internal name
  displayName: L<string>;       // shown on the site and in SEO schema
  bio: L<string>;               // short bio (post box + author page intro)
  fullBio?: L<string[]>;        // extra paragraphs, shown ONLY on the author page
  role?: L<string>;             // e.g. 'Typography Writer'
  type?: 'Organization' | 'Person'; // schema.org type (default: Person)
  image?: string;               // SQUARE image, 400x400 px recommended: "/images/x.webp" (in public/) or full https URL
  url?: string;                 // optional absolute URL of own site/profile (SEO sameAs)
  links?: { label: string; url: string }[]; // optional social links (author page)
}

// What pages receive: every text field already picked for one language.
export interface Author {
  name: string;
  displayName: string;
  bio: string;
  fullBio?: string[];
  role?: string;
  type?: 'Organization' | 'Person';
  image?: string;
  url?: string;
  links?: { label: string; url: string }[];
}

export const DEFAULT_AUTHOR = 'editorial-team';

export const authors: Record<string, AuthorInput> = {
  'editorial-team': {
    name: 'Editorial Team',
    displayName: 'AestheticFonts Editorial Team',
    bio: {
      en: 'The AestheticFonts Editorial Team shares helpful guides on font styles, fancy text, typography, and creative text ideas to help users make their content stand out.',
      fr: "L'équipe éditoriale d'AestheticFonts partage des guides utiles sur les styles de police, le texte fantaisie, la typographie et des idées de texte créatives pour aider les utilisateurs à faire ressortir leur contenu.",
      ar: 'يشارك فريق تحرير AestheticFonts أدلة مفيدة حول أنماط الخطوط والنصوص المزخرفة والتايبوغرافي وأفكار النصوص الإبداعية لمساعدة المستخدمين على إبراز محتواهم.',
      th: 'ทีมบรรณาธิการ AestheticFonts แบ่งปันคู่มือที่เป็นประโยชน์เกี่ยวกับสไตล์ฟอนต์ ข้อความสวยๆ การออกแบบตัวอักษร และไอเดียข้อความสร้างสรรค์ เพื่อช่วยให้คอนเทนต์ของคุณโดดเด่น',
      tr: 'AestheticFonts Editör Ekibi, kullanıcıların içeriklerini öne çıkarmasına yardımcı olmak için yazı tipi stilleri, süslü yazılar, tipografi ve yaratıcı metin fikirleri hakkında faydalı rehberler paylaşır.',
      id: 'Tim Editorial AestheticFonts membagikan panduan bermanfaat tentang gaya font, teks unik, tipografi, dan ide teks kreatif agar konten pengguna lebih menonjol.',
      vi: "Nhóm biên tập AestheticFonts chia sẻ những hướng dẫn hữu ích về kiểu phông chữ, văn bản nghệ thuật, kiểu chữ và ý tưởng văn bản sáng tạo giúp nội dung của người dùng nổi bật hơn.",
      pl: "Zespół redakcyjny AestheticFonts publikuje przydatne poradniki o stylach czcionek, ozdobnym tekście, typografii i kreatywnych pomysłach na teksty, aby pomóc użytkownikom wyróżnić swoje treści.",
      es: "El equipo editorial de AestheticFonts comparte guías útiles sobre estilos de fuente, texto decorativo, tipografía e ideas creativas de texto para ayudar a los usuarios a destacar su contenido.",
      it: "Il team editoriale di AestheticFonts condivide guide utili su stili di font, testo decorativo, tipografia e idee creative per i testi, per aiutare gli utenti a far risaltare i propri contenuti.",
      ja: "AestheticFontsの編集チームは、フォントスタイル、装飾テキスト、タイポグラフィ、クリエイティブなテキストのアイデアに関する役立つガイドを共有し、ユーザーのコンテンツが目立つようサポートします。",
      de: "Das Redaktionsteam von AestheticFonts teilt hilfreiche Anleitungen zu Schriftstilen, ausgefallenem Text, Typografie und kreativen Textideen, damit die Inhalte der Nutzer besser auffallen.",
      pt: "A equipe editorial do AestheticFonts compartilha guias úteis sobre estilos de fonte, texto decorativo, tipografia e ideias criativas de texto para ajudar os usuários a destacar seu conteúdo.",
    },
    fullBio: {
      en: [
        'We cover everything around stylish text: how font styles work, which fancy text suits which platform, and how to use them in bios, captions, usernames and posts.',
        'Our goal is simple: practical, easy-to-follow guides that help you make your content stand out. Every article is written to be useful first, so you can copy an idea and use it right away.',
      ],
      fr: [
        'Nous couvrons tout ce qui touche au texte stylé : le fonctionnement des styles de police, quel texte fantaisie convient à quelle plateforme, et comment les utiliser dans les bios, légendes, pseudos et publications.',
        "Notre objectif est simple : des guides pratiques et faciles à suivre qui aident à faire ressortir votre contenu. Chaque article est écrit pour être utile avant tout, afin que vous puissiez reprendre une idée et l'utiliser tout de suite.",
      ],
      ar: [
        'نغطي كل ما يتعلق بالنصوص المزخرفة: كيف تعمل أنماط الخطوط، وأي نص مزخرف يناسب أي منصة، وكيفية استخدامها في النبذة والتعليقات وأسماء المستخدمين والمنشورات.',
        'هدفنا بسيط: أدلة عملية وسهلة المتابعة تساعدك على إبراز محتواك. تُكتب كل مقالة لتكون مفيدة أولًا، حتى تتمكن من نسخ الفكرة واستخدامها فورًا.',
      ],
      th: [
        'เราครอบคลุมทุกเรื่องเกี่ยวกับข้อความสไตล์ต่างๆ ทั้งวิธีการทำงานของสไตล์ฟอนต์ ข้อความสวยๆ แบบไหนเหมาะกับแพลตฟอร์มใด และวิธีนำไปใช้ในไบโอ แคปชัน ชื่อผู้ใช้ และโพสต์',
        'เป้าหมายของเราเรียบง่าย คือคู่มือที่ใช้ได้จริงและทำตามง่าย เพื่อช่วยให้คอนเทนต์ของคุณโดดเด่น ทุกบทความเขียนให้มีประโยชน์เป็นอันดับแรก คุณจึงนำไอเดียไปคัดลอกและใช้ได้ทันที',
      ],
      tr: [
        'Şekilli yazıyla ilgili her şeyi ele alıyoruz: yazı tipi stillerinin nasıl çalıştığını, hangi süslü yazının hangi platforma uygun olduğunu ve bunları biyografilerde, açıklamalarda, kullanıcı adlarında ve gönderilerde nasıl kullanabileceğinizi.',
        'Amacımız basit: içeriğinizi öne çıkarmanıza yardımcı olan, pratik ve takip etmesi kolay rehberler. Her makale önce faydalı olacak şekilde yazılır; böylece bir fikri kopyalayıp hemen kullanabilirsiniz.',
      ],
      id: [
        'Kami membahas segala hal seputar teks bergaya: cara kerja gaya font, teks unik mana yang cocok untuk platform tertentu, dan cara memakainya di bio, caption, username, dan postingan.',
        'Tujuan kami sederhana: panduan praktis yang mudah diikuti agar konten Anda lebih menonjol. Setiap artikel ditulis agar berguna lebih dulu, sehingga Anda bisa langsung menyalin ide dan memakainya.',
      ],
      vi: [
        "Chúng tôi bao quát mọi thứ về văn bản phong cách: cách các kiểu phông chữ hoạt động, loại văn bản nghệ thuật nào phù hợp với nền tảng nào và cách dùng chúng trong tiểu sử, chú thích, tên người dùng và bài đăng.",
        "Mục tiêu của chúng tôi rất đơn giản: những hướng dẫn thực tế, dễ làm theo giúp nội dung của bạn nổi bật. Mỗi bài viết được viết để hữu ích trước hết, để bạn có thể sao chép một ý tưởng và dùng ngay.",
      ],
      pl: [
        "Zajmujemy się wszystkim, co dotyczy stylowego tekstu: jak działają style czcionek, który ozdobny tekst pasuje do której platformy i jak używać go w biogramach, podpisach, nazwach użytkowników i postach.",
        "Nasz cel jest prosty: praktyczne, łatwe w stosowaniu poradniki, które pomagają wyróżnić Twoje treści. Każdy artykuł piszemy tak, by przede wszystkim był przydatny, abyś mógł od razu skopiować pomysł i go użyć.",
      ],
      es: [
        "Cubrimos todo lo relacionado con el texto con estilo: cómo funcionan los estilos de fuente, qué texto decorativo encaja con cada plataforma y cómo usarlos en biografías, pies de foto, nombres de usuario y publicaciones.",
        "Nuestro objetivo es sencillo: guías prácticas y fáciles de seguir que te ayuden a destacar tu contenido. Cada artículo se escribe para ser útil ante todo, de modo que puedas copiar una idea y usarla de inmediato.",
      ],
      it: [
        "Ci occupiamo di tutto ciò che riguarda il testo con stile: come funzionano gli stili di font, quale testo decorativo si adatta a quale piattaforma e come usarlo in bio, didascalie, nomi utente e post.",
        "Il nostro obiettivo è semplice: guide pratiche e facili da seguire che ti aiutino a far risaltare i tuoi contenuti. Ogni articolo è scritto per essere prima di tutto utile, così puoi copiare un’idea e usarla subito.",
      ],
      ja: [
        "私たちは、おしゃれなテキストに関するあらゆることを扱います。フォントスタイルの仕組み、どのプラットフォームにどの装飾テキストが合うか、プロフィール、キャプション、ユーザー名、投稿での使い方などです。",
        "私たちの目標はシンプルです。コンテンツを目立たせるための、実用的で分かりやすいガイドを届けること。どの記事もまず役立つことを第一に書かれているので、アイデアをコピーしてすぐに使えます。",
      ],
      de: [
        "Wir behandeln alles rund um stilvollen Text: wie Schriftstile funktionieren, welcher ausgefallene Text zu welcher Plattform passt und wie man ihn in Bios, Bildunterschriften, Benutzernamen und Beiträgen einsetzt.",
        "Unser Ziel ist einfach: praktische, leicht nachvollziehbare Anleitungen, mit denen deine Inhalte auffallen. Jeder Artikel ist zuerst darauf ausgelegt, nützlich zu sein, damit du eine Idee kopieren und sofort verwenden kannst.",
      ],
      pt: [
        "Cobrimos tudo sobre texto estiloso: como funcionam os estilos de fonte, qual texto decorativo combina com cada plataforma e como usá-los em bios, legendas, nomes de usuário e posts.",
        "Nosso objetivo é simples: guias práticos e fáceis de seguir que ajudam seu conteúdo a se destacar. Cada artigo é escrito para ser útil em primeiro lugar, para que você possa copiar uma ideia e usá-la imediatamente.",
      ],
    },
    image: '/images/editorial-team.svg',
  },
};

export function authorPath(key?: string) {
  return `/blog/author/${key && key in authors ? key : DEFAULT_AUTHOR}/`;
}

function pick<T>(v: L<T> | undefined, lang: string): T | undefined {
  if (v === undefined || typeof v === 'string' || Array.isArray(v)) return v as T | undefined;
  return (v as Partial<Record<string, T>>)[lang] ?? (v as Partial<Record<string, T>>).en;
}

// Returns the author with all text already resolved for `lang`
// (falls back to English when that language has no translation).
export function getAuthor(key: string | undefined, lang: string = 'en'): Author {
  const a = authors[key ?? DEFAULT_AUTHOR] ?? authors[DEFAULT_AUTHOR];
  return {
    name: a.name,
    displayName: pick(a.displayName, lang) ?? '',
    bio: pick(a.bio, lang) ?? '',
    fullBio: pick(a.fullBio, lang),
    role: pick(a.role, lang),
    type: a.type,
    image: a.image,
    url: a.url,
    links: a.links,
  };
}
