import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
export type ColorPalette = 'charcoal' | 'emerald' | 'sienna' | 'midnight' | 'sapphire';
export type FontPairing = 'inter' | 'luxury' | 'editorial' | 'warm' | 'swiss';

const PALETTE_ORDER: ColorPalette[] = ['charcoal', 'emerald', 'sienna', 'midnight', 'sapphire'];

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
  charcoal: {
    id: 'charcoal',
    name: 'Minimalist Charcoal Studio',
    shortLabel: 'Charcoal',
    tagline: 'Matte graphite #141416, crisp Inter UI & soft pastel bento accents',
    swatches: ['#18181B', '#DCE6F2', '#DCF2DE'],
  },
  emerald: {
    id: 'emerald',
    name: 'Highland Emerald & Dawn',
    shortLabel: 'Emerald',
    tagline: 'Mulanje cedar greens, warm parchment & golden sunrise',
    swatches: ['#10B981', '#FBBF24', '#F9F6EE'],
  },
  sienna: {
    id: 'sienna',
    name: 'Burnt Sienna & Sandy Beige',
    shortLabel: 'Sienna',
    tagline: 'Katondo terracotta clay, soft beige & warm savannah sand',
    swatches: ['#C85A32', '#E6B35A', '#F6EFE2'],
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Blue & Bright Cyan',
    shortLabel: 'Midnight',
    tagline: 'Deep midnight navy, crisp white canvas & electric cyan',
    swatches: ['#06B6D4', '#0A192F', '#FFFFFF'],
  },
  sapphire: {
    id: 'sapphire',
    name: 'Lake Malawi Sapphire',
    shortLabel: 'Sapphire',
    tagline: 'Cerulean freshwaters, deep azure glass & sunlit gold',
    swatches: ['#38BDF8', '#0284C7', '#FBBF24'],
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

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch {}
    return 'dark';
  });

  const [palette, setPaletteState] = useState<ColorPalette>(() => {
    if (typeof window === 'undefined') return 'charcoal';
    try {
      const saved = localStorage.getItem(PALETTE_STORAGE_KEY) as ColorPalette | null;
      if (saved && PALETTE_ORDER.includes(saved)) {
        return saved;
      }
    } catch {}
    return 'charcoal';
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

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-charcoal', 'theme-sapphire', 'theme-sienna', 'theme-midnight');
    if (palette === 'charcoal') {
      root.classList.add('theme-charcoal');
    } else if (palette === 'sapphire') {
      root.classList.add('theme-sapphire');
    } else if (palette === 'sienna') {
      root.classList.add('theme-sienna');
    } else if (palette === 'midnight') {
      root.classList.add('theme-midnight', 'theme-sapphire');
    }
    try {
      localStorage.setItem(PALETTE_STORAGE_KEY, palette);
    } catch {}
  }, [palette]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-inter', 'font-luxury', 'font-warm', 'font-editorial', 'font-swiss');
    root.classList.add(`font-${fontPairing}`);
    try {
      localStorage.setItem(FONT_STORAGE_KEY, fontPairing);
    } catch {}
  }, [fontPairing]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const togglePalette = () => {
    setPaletteState((prev) => {
      const nextIdx = (PALETTE_ORDER.indexOf(prev) + 1) % PALETTE_ORDER.length;
      return PALETTE_ORDER[nextIdx];
    });
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
        isDark: theme === 'dark',
        palette,
        togglePalette,
        setPalette,
        isCharcoal: palette === 'charcoal',
        isSapphire: palette === 'sapphire' || palette === 'midnight',
        isSienna: palette === 'sienna',
        isMidnight: palette === 'midnight',
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
