import { ReactNode, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Compass, MapPin, Sparkles, Navigation as NavIcon, Search } from 'lucide-react';
import { CitationsModal } from './CitationsModal';
import { Header } from '../common/Header';
import { QuickCommandPalette } from '../common/QuickCommandPalette';
import { HomesteadAdvisorModal } from '../advisor/HomesteadAdvisorModal';

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

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#071A10] text-slate-100 relative selection:bg-amber-500 selection:text-slate-950">
      {/* Top Earth Strata Accent Stripe */}
      <div className="h-0.5 bg-gradient-to-r from-emerald-800 via-amber-500 to-amber-700 w-full shrink-0 relative z-50" />

      {/* Global Dynamic Multi-Point Radial Gradient Background */}
      <div className="fixed inset-0 bg-warm-organic-canvas pointer-events-none z-0" />

      {/* Tactile Field Guide Paper / Topo Noise Texture Overlay */}
      <div className="fixed inset-0 field-noise-overlay pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(#1e3a29_1px,transparent_1px)] [background-size:28px_28px] opacity-25 pointer-events-none z-0" />

      {/* Modern Unified Floating Glass Navigation Bar (Auto-reveals on hover) */}
      <Header
        onOpenCitations={() => setShowCitationsModal(true)}
        onOpenSearch={() => setIsCommandPaletteOpen(true)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
      />

      {/* Main Workspace Body: Full Fluid Canvas */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar relative z-10 pt-16 sm:pt-20">
        <main className="flex-1 pb-20 md:pb-14">
          {children}
        </main>

        {/* Desktop Minimal Footer Status Bar */}
        <footer className="hidden md:flex h-11 px-8 items-center justify-between backdrop-blur-md bg-[#071A10]/90 text-[11px] text-emerald-400/80 tracking-wider font-extrabold border-t border-white/10 shrink-0 select-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-200 font-mono tracking-tight">OUTPOST SANCTUARY WORKSPACE ONLINE</span>
          </div>
          
          <button
            onClick={() => setShowCitationsModal(true)}
            className="hover:text-amber-300 underline underline-offset-4 flex items-center gap-1.5 transition-colors font-mono cursor-pointer"
          >
            <ShieldCheck size={14} className="text-amber-400" /> SOURCED FROM DCCMS, FAO & EGW WRITINGS (VIEW SOURCES)
          </button>

          <span className="text-amber-300/80 font-mono">13.2543° S, 34.3015° E • MALAWI</span>
        </footer>
      </div>

      {/* ========================================================================= */}
      {/* GLOBAL FLOATING AI SANCTUARY ADVISOR BUTTON                               */}
      {/* Sleek, minimal, accessible everywhere without blocking page content       */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 pointer-events-auto">
        <button
          onClick={() => setIsAdvisorOpen(true)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-950/90 hover:bg-slate-900 text-amber-300 hover:text-white border border-amber-500/40 hover:border-amber-300 shadow-2xl shadow-black/80 backdrop-blur-xl transition-all hover:scale-105 cursor-pointer group"
          title="Ask Outpost AI Homestead Advisor (Gemini 3.8)"
        >
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
            <Sparkles size={16} className="text-amber-400 group-hover:rotate-12 transition-transform" />
          </div>
          <span className="text-xs font-mono font-black uppercase tracking-wider">AI Advisor</span>
        </button>
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


