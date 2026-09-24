import { ReactNode, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Compass, MapPin, Sparkles, Navigation as NavIcon, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CitationsModal } from './CitationsModal';
import { Header } from '../common/Header';
import { QuickCommandPalette } from '../common/QuickCommandPalette';
import { HomesteadAdvisorModal } from '../advisor/HomesteadAdvisorModal';
import { LeftSymbolDirectory } from '../navigation/LeftSymbolDirectory';

export function Shell({ children }: { children: ReactNode }) {
  const [showCitationsModal, setShowCitationsModal] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const location = useLocation();

  const isScoutMapRoute = location.pathname === '/scout-map';

  // Global keyboard shortcut: Cmd+K / Ctrl+K or / key to open quick command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Custom event listeners for global triggers from consolidated map control island
  useEffect(() => {
    const handleOpenCitations = () => setShowCitationsModal(true);
    const handleOpenSearch = () => setIsCommandPaletteOpen(true);
    const handleOpenAdvisor = () => setIsAdvisorOpen(true);

    window.addEventListener('outpost:open-citations', handleOpenCitations);
    window.addEventListener('outpost:open-search', handleOpenSearch);
    window.addEventListener('outpost:open-advisor', handleOpenAdvisor);

    return () => {
      window.removeEventListener('outpost:open-citations', handleOpenCitations);
      window.removeEventListener('outpost:open-search', handleOpenSearch);
      window.removeEventListener('outpost:open-advisor', handleOpenAdvisor);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FAF8F5] dark:bg-[#0A140E] text-stone-800 dark:text-stone-100 relative selection:bg-amber-200 dark:selection:bg-emerald-900 selection:text-stone-900 dark:selection:text-amber-200 transition-colors duration-300">
      {/* Top Subtle Earth Accent Ribbon */}
      <div className="h-1 bg-gradient-to-r from-emerald-800 via-amber-600 to-emerald-700 w-full shrink-0 relative z-50" />

      {/* Clean, Simple Sanctuary Atmospheric Background */}
      <div className="fixed inset-0 bg-warm-organic-canvas pointer-events-none z-0" />

      {/* Modern Unified Floating Header (Rendered on standard pages; consolidated on scout map) */}
      {!isScoutMapRoute && (
        <>
          <Header
            onOpenCitations={() => setShowCitationsModal(true)}
            onOpenSearch={() => setIsCommandPaletteOpen(true)}
            onOpenAdvisor={() => setIsAdvisorOpen(true)}
          />
          {/* Left-Side Expanding Symbol Directory */}
          <LeftSymbolDirectory />
        </>
      )}

      {/* Main Workspace Body: Fullscreen canvas without duplicate headers on Scout Map route */}
      <div className={cn(
        "flex-1 flex flex-col min-w-0 relative z-10",
        isScoutMapRoute 
          ? "h-screen overflow-hidden pt-0" 
          : "overflow-y-auto custom-scrollbar pt-16 sm:pt-20"
      )}>
        <main className={cn("flex-1", !isScoutMapRoute && "pb-16 sm:pb-12")}>
          {children}
        </main>

        {/* Dignified Sanctuary Colophon Footer */}
        {!isScoutMapRoute && (
          <footer className="mt-auto border-t border-stone-200/90 dark:border-emerald-950/80 bg-[#F5F2EA]/95 dark:bg-[#08120B]/95 backdrop-blur-md px-4 sm:px-8 py-4 text-xs text-stone-600 dark:text-stone-400 select-none transition-colors">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              {/* Left: Mission & Faith Identity */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-700 dark:bg-emerald-400" />
                <span className="font-semibold text-stone-800 dark:text-stone-200 text-xs sm:text-[13px]">
                  Adventist Country Living & Outpost Blueprint
                </span>
                <span className="hidden md:inline text-stone-300 dark:text-stone-700">•</span>
                <span className="hidden md:inline text-stone-600 dark:text-stone-400 font-serif italic text-xs sm:text-[13px]">
                  Inspired Counsel & Agro-Ecological Stewardship
                </span>
              </div>
              
              {/* Right: Sources & Geographic Reference */}
              <div className="flex items-center gap-4 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setShowCitationsModal(true)}
                  className="text-stone-700 dark:text-stone-300 hover:text-emerald-900 dark:hover:text-emerald-300 underline underline-offset-4 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ShieldCheck size={14} className="text-emerald-800 dark:text-emerald-400" />
                  <span>Sources: DCCMS, FAO & EGW Writings</span>
                </button>

                <span className="hidden lg:inline text-stone-300 dark:text-stone-700">•</span>
                <span className="hidden lg:inline text-stone-500 dark:text-stone-400">13.25° S, 34.30° E • MALAWI</span>
              </div>
            </div>
          </footer>
        )}
      </div>

      {/* Quick Command Palette Modal */}
      <QuickCommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
      />

      {/* AI Sanctuary Advisor Modal */}
      <HomesteadAdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
      />

      {/* Citations Audit Modal */}
      <CitationsModal isOpen={showCitationsModal} onClose={() => setShowCitationsModal(false)} />
    </div>
  );
}


