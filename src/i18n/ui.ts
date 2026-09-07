export const languages = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
};

export const defaultLang = 'en';

export const ui = {
  en: {
    'nav.blog': 'Blog',
    'nav.emoji': 'Emoji',
    'nav.fancytext': 'Fancy Text',
    'footer.tagline': 'Free fancy text generator — bold, script, gothic, bubble & 60+ more styles. No sign-up, no limits.',
    'footer.company': 'Company',
    'footer.about': 'About',
    'footer.blog': 'Blog',
    'footer.contact': 'Contact Us',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.tools': 'More Tools',
    'footer.emoji': 'Emoji Copy & Paste',
    'breadcrumb.home': 'Home',
    'breadcrumb.blog': 'Blog',
  },
  fr: {
    'nav.blog': 'Blog',
    'nav.emoji': 'Emoji',
    'nav.fancytext': 'Texte Stylé',
    'footer.tagline': 'Générateur de texte stylé gratuit — gras, script, gothique, bulle et plus de 60 styles. Sans inscription, sans limite.',
    'footer.company': 'Entreprise',
    'footer.about': 'À propos',
    'footer.blog': 'Blog',
    'footer.contact': 'Contact',
    'footer.legal': 'Mentions légales',
    'footer.privacy': 'Politique de confidentialité',
    'footer.terms': "Conditions d'utilisation",
    'footer.tools': 'Autres outils',
    'footer.emoji': 'Copier-coller Emoji',
    'breadcrumb.home': 'Accueil',
    'breadcrumb.blog': 'Blog',
  },
  es: {
    'nav.blog': 'Blog',
    'nav.emoji': 'Emoji',
    'nav.fancytext': 'Texto Elegante',
    'footer.tagline': 'Generador de texto elegante gratis — negrita, script, gótico, burbuja y más de 60 estilos. Sin registro, sin límites.',
    'footer.company': 'Empresa',
    'footer.about': 'Acerca de',
    'footer.blog': 'Blog',
    'footer.contact': 'Contacto',
    'footer.legal': 'Legal',
    'footer.privacy': 'Política de privacidad',
    'footer.terms': 'Términos de servicio',
    'footer.tools': 'Más herramientas',
    'footer.emoji': 'Copiar y pegar Emoji',
    'breadcrumb.home': 'Inicio',
    'breadcrumb.blog': 'Blog',
  },
} as const;

export type Lang = keyof typeof ui;

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['en']) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
