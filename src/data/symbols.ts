// Naye symbols add karne ke liye bas apni category ke `items` array me daal do.
// Nayi category chahiye to ek aur object add kar do.
export interface SymbolCategory {
  id: string;
  name: string;
  icon: string;
  items: string[];
}

export const symbolCategories: SymbolCategory[] = [
  { id: 'heart', name: 'Heart', icon: '❤', items: ['❤', '🧡', '💛', '💚', '💙', '💜', '🖤'] },
  { id: 'cool', name: 'Cool', icon: '😎', items: ['😎', '🔥', '⚡', '💀', '👑', '☠', '✌'] },
  { id: 'cute', name: 'Cute', icon: '🥰', items: ['🥰', '🐻', '🌸', '🍓', '🎀', '🐰', '✨'] },
  { id: 'stars', name: 'Stars', icon: '★', items: ['★', '☆', '✦', '✧', '✩', '✪', '✯'] },
  { id: 'arrows', name: 'Arrows', icon: '➜', items: ['➜', '→', '←', '↑', '↓', '↔', '➤'] },
  { id: 'music', name: 'Music', icon: '♪', items: ['♪', '♫', '♬', '♩', '♭', '♯', '🎧'] },
];
