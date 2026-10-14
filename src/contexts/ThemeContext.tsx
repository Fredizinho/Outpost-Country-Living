import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'field';
export type ColorPalette = 'emerald';
export type FontPairing = 'inter' | 'luxury' | 'editorial' | 'warm' | 'swiss';

export const THEME_ORDER: Theme[] = ['light', 'dark', 'field'];

export const THEME_META: Record<
  Theme,
  {
    id: Theme;
    number: string;
    name: string;
    label: string;
    shortLabel: string;
    tagline: string;
    description: string;
    swatches: [string, string, string];
    touchTargetMin: string;
    bodyFontSize: string;
    borderWeight: string;
    contrastRatio: string;
    features: string[];
  }
> = {
  light: {
    id: 'light',
    number: '01',
    name: 'Daylight Harvest',
    label: '01 · Light Mode',
    shortLabel: '01 · Light',
    tagline: 'Warm ivory #FAF6F0, Katondo terracotta CTA & rich forest ink',
    description:
      'Clean daylight sanctuary aesthetic with warm ivory surfaces, Katondo terracotta primary actions (#C85A32), and comfortable 16px reading body.',
    swatches: ['#FAF6F0', '#166534', '#C85A32'],
    touchTargetMin: '44px',
    bodyFontSize: '16px',
    borderWeight: '1px',
    contrastRatio: '8.2:1 (AA)',
    features: ['Warm ivory parchment surfaces', 'Katondo terracotta primary actions', '4.5:1+ contrast verified'],
  },
  dark: {
    id: 'dark',
    number: '02',
    name: 'Highland Sanctuary',
    label: '02 · Dark Mode',
    shortLabel: '02 · Dark',
    tagline: 'Deep moss #071A10, forest depth #0D2818 & gold dawn highlights #F59E0B',
    description:
      'Calibrated nocturnal sanctuary mode with deep botanical moss (#071A10), forest container depth (#0D2818), and radiant celestial gold highlights (#F59E0B).',
    swatches: ['#071A10', '#0D2818', '#F59E0B'],
    touchTargetMin: '44px',
    bodyFontSize: '16px',
    borderWeight: '1px',
    contrastRatio: '11.4:1 (AAA)',
    features: ['Deep moss botanical base', 'Forest container depth', 'Golden spark accent highlights'],
  },
  field: {
    id: 'field',
    number: '03',
    name: 'Tactical Agro-Field',
    label: '03 · Field Mode',
    shortLabel: '03 · Field',
    tagline: 'Stark jet black #000000, 18px body, 48px+ touch targets & no blur',
    description:
      'Purpose-built for outdoor midday sun and farm vehicles: stark jet black (#000000) backdrop, 18px body text, thick 2.5px solid borders, zero translucent glass or blur, no decorative background art, and extra-large 48px+ touch targets for gloved or field operation.',
    swatches: ['#000000', '#FFFFFF', '#FBBF24'],
    touchTargetMin: '48px+',
    bodyFontSize: '18px',
    borderWeight: '2.5px',
    contrastRatio: '21:1 (Max AAA)',
    features: [
      '18px high-legibility body copy',
      '48px+ touch targets for outdoor use',
      'Thick 2.5px solid stark borders',
      'Zero blur & no decorative backgrounds',
    ],
  },
};

export const PALETTE_ORDER: ColorPalette[] = ['emerald'];

export const PALETTE_META: Record<
  ColorPalette,
  {
    id: ColorPalette;
    name: string;
    shortLabel: string;
    tagline: string;
    swatches: [string, string, string];
  }
> = {
  emerald: {
    id: 'emerald',
    name: 'Highland Brand Foundation',
    shortLabel: 'Standard',
    tagline: 'Deep moss, forest depth, gold spark & Katondo terracotta',
    swatches: ['#071A10', '#0D2818', '#F59E0B'],
  },
};

export const FONT_PAIRING_META: Record<
  FontPairing,
  {
    id: FontPairing;
    category: 'Top Sans-Serif (UI & Body)' | 'Top Serif (Editorial & Luxury)';
    title: string;
    shortLabel: string;
    badge: string;
    desc: string;
  }
> = {
  inter: {
    id: 'inter',
    category: 'Top Sans-Serif (UI & Body)',
    title: 'Inter UI Minimalist',
    shortLabel: 'Inter UI',
    badge: 'Top UI Sans-Serif',
    desc: 'Pure Inter across headings, controls, and body copy for Neo-Brutalist Swiss & SaaS clarity.',
  },
  swiss: {
    id: 'swiss',
    category: 'Top Sans-Serif (UI & Body)',
    title: 'Outfit + Inter Sans',
    shortLabel: 'Outfit Sans',
    badge: 'Geometric UI Sans',
    desc: 'Modern geometric Outfit display titles paired with ultra-legible Inter body text.',
  },
  luxury: {
    id: 'luxury',
    category: 'Top Serif (Editorial & Luxury)',
    title: 'Playfair Display + Inter',
    shortLabel: 'Playfair Luxury',
    badge: 'Luxury Editorial Serif',
    desc: 'High-contrast Playfair Display authority paired with crisp Inter UI and body typography.',
  },
  editorial: {
    id: 'editorial',
    category: 'Top Serif (Editorial & Luxury)',
    title: 'Instrument Serif + Inter',
    shortLabel: 'Instrument Serif',
    badge: 'Editorial Atlas Serif',
    desc: 'Refined literary Instrument Serif display headers with clean Inter reading columns.',
  },
  warm: {
    id: 'warm',
    category: 'Top Serif (Editorial & Luxury)',
    title: 'Fraunces + Plus Jakarta',
    shortLabel: 'Fraunces Serif',
    badge: 'Warm Sanctuary Serif',
    desc: 'Humanist old-style Fraunces serif paired with warm Plus Jakarta Sans.',
  },
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  isLight: boolean;
  isField: boolean;
  palette: ColorPalette;
  togglePalette: () => void;
  setPalette: (palette: ColorPalette) => void;
  isCharcoal: boolean;
  isSapphire: boolean;
  isSienna: boolean;
  isMidnight: boolean;
  fontPairing: FontPairing;
  setFontPairing: (font: FontPairing) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'outpost_country_living_theme_v2';
const PALETTE_STORAGE_KEY = 'outpost_country_living_palette_v2';
const FONT_STORAGE_KEY = 'outpost_country_living_font_pairing_v2';

function resolveInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const legacyPalette = localStorage.getItem(PALETTE_STORAGE_KEY);

    // MIGRATION: Reduce to Light, Dark and Field as three real themes; migrate legacy users
    if (
      saved === 'sienna' ||
      saved === 'charcoal' ||
      saved === 'sapphire' ||
      saved === 'midnight' ||
      legacyPalette === 'sienna' ||
      legacyPalette === 'charcoal' ||
      legacyPalette === 'sapphire' ||
      legacyPalette === 'midnight'
    ) {
      localStorage.setItem(STORAGE_KEY, 'dark');
      try {
        localStorage.removeItem(PALETTE_STORAGE_KEY);
        if (typeof document !== 'undefined') {
          document.documentElement.classList.remove('theme-sienna', 'theme-charcoal', 'theme-sapphire', 'theme-midnight');
        }
      } catch {}
      return 'dark';
    }

    if (saved === 'light' || saved === 'dark' || saved === 'field') {
      return saved as Theme;
    }

    // Respect prefers-contrast and prefers-color-scheme as defaults
    if (window.matchMedia && window.matchMedia('(prefers-contrast: more)').matches) {
      return 'field';
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  } catch {}
  return 'dark';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(resolveInitialTheme);

  const [palette, setPaletteState] = useState<ColorPalette>(() => {
    if (typeof window === 'undefined') return 'emerald';
    try {
      const saved = localStorage.getItem(PALETTE_STORAGE_KEY) as ColorPalette | null;
      if (saved && (saved === 'emerald' || saved === 'sienna')) {
        return saved;
      }
    } catch {}
    return 'emerald';
  });

  const [fontPairing, setFontPairingState] = useState<FontPairing>(() => {
    if (typeof window === 'undefined') return 'inter';
    try {
      const saved = localStorage.getItem(FONT_STORAGE_KEY) as FontPairing | null;
      if (
        saved === 'inter' ||
        saved === 'luxury' ||
        saved === 'editorial' ||
        saved === 'warm' ||
        saved === 'swiss'
      ) {
        return saved;
      }
    } catch {}
    return 'inter';
  });

  // Listen to prefers-contrast and prefers-color-scheme changes if user hasn't explicitly set a preference
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const contrastQuery = window.matchMedia('(prefers-contrast: more)');
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleMediaChange = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        if (contrastQuery.matches) {
          setThemeState('field');
        } else if (darkQuery.matches) {
          setThemeState('dark');
        } else {
          setThemeState('light');
        }
      }
    };

    try {
      contrastQuery.addEventListener('change', handleMediaChange);
      darkQuery.addEventListener('change', handleMediaChange);
      return () => {
        contrastQuery.removeEventListener('change', handleMediaChange);
        darkQuery.removeEventListener('change', handleMediaChange);
      };
    } catch {}
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    // Strip legacy theme classes
    root.classList.remove(
      'theme-charcoal',
      'theme-sapphire',
      'theme-midnight',
      'theme-light',
      'theme-dark',
      'theme-field'
    );

    if (theme === 'field') {
      root.classList.add('dark', 'theme-field');
      root.style.colorScheme = 'dark';
    } else if (theme === 'dark') {
      root.classList.add('dark', 'theme-dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.classList.add('theme-light');
      root.style.colorScheme = 'light';
    }

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-sienna');
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-inter', 'font-luxury', 'font-warm', 'font-editorial', 'font-swiss');
    root.classList.add(`font-${fontPairing}`);
    try {
      localStorage.setItem(FONT_STORAGE_KEY, fontPairing);
    } catch {}
  }, [fontPairing]);

  const toggleTheme = () => {
    setThemeState((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'field';
      return 'light';
    });
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const togglePalette = () => {
    setPaletteState('emerald');
  };

  const setPalette = (newPalette: ColorPalette) => {
    setPaletteState(newPalette);
  };

  const setFontPairing = (newFont: FontPairing) => {
    setFontPairingState(newFont);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        isDark: theme === 'dark' || theme === 'field',
        isLight: theme === 'light',
        isField: theme === 'field',
        palette,
        togglePalette,
        setPalette,
        isCharcoal: false,
        isSapphire: false,
        isSienna: false,
        isMidnight: false,
        fontPairing,
        setFontPairing,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
