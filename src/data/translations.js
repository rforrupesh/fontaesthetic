// Central translation store. Add new keys here, every language must have them.
export const translations = {
  en: {
    siteName: "FontGen",
    nav: {
      home: "Home",
      blog: "Blog",
      tools: "Tools",
      about: "About",
    },
    footer: {
      tagline: "Free online font generator tool.",
      quickLinks: "Quick Links",
      home: "Home",
      blog: "Blog",
      privacy: "Privacy Policy",
      contact: "Contact",
      rights: "All rights reserved.",
    },
    sidebar: {
      recentPosts: "Recent Posts",
      categories: "Categories",
      relatedPosts: "Related Posts",
    },
  },
  fr: {
    siteName: "FontGen",
    nav: {
      home: "Accueil",
      blog: "Blog",
      tools: "Outils",
      about: "À propos",
    },
    footer: {
      tagline: "Outil gratuit de génération de polices en ligne.",
      quickLinks: "Liens rapides",
      home: "Accueil",
      blog: "Blog",
      privacy: "Politique de confidentialité",
      contact: "Contact",
      rights: "Tous droits réservés.",
    },
    sidebar: {
      recentPosts: "Articles récents",
      categories: "Catégories",
      relatedPosts: "Articles similaires",
    },
  },
  id: {
    siteName: "FontGen",
    nav: {
      home: "Beranda",
      blog: "Blog",
      tools: "Alat",
      about: "Tentang",
    },
    footer: {
      tagline: "Alat pembuat font online gratis.",
      quickLinks: "Tautan Cepat",
      home: "Beranda",
      blog: "Blog",
      privacy: "Kebijakan Privasi",
      contact: "Kontak",
      rights: "Hak cipta dilindungi.",
    },
    sidebar: {
      recentPosts: "Postingan Terbaru",
      categories: "Kategori",
      relatedPosts: "Postingan Terkait",
    },
  },
};

// Helper: get translation object by lang, fallback to en
export function t(lang) {
  return translations[lang] || translations.en;
}

export const languages = ["en", "fr", "id"];
