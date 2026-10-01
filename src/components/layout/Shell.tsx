import { ReactNode, useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Columns2, Layers, CheckCircle2, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CitationsModal } from './CitationsModal';
import { DesktopReferenceInspector } from './DesktopReferenceInspector';
import { Header } from '../common/Header';
import { QuickCommandPalette } from '../common/QuickCommandPalette';
import { HomesteadAdvisorModal } from '../advisor/HomesteadAdvisorModal';
import { LeftSymbolDirectory } from '../navigation/LeftSymbolDirectory';
import { OfflinePwaStatusBanner } from '../common/OfflinePwaStatusBanner';
import { calculateHomesteadReadinessScore } from '@/lib/offlineStorage';
import { getCurrentMalawiSeason } from '@/lib/seasonalAlmanac';

export function Shell({ children }: { children: ReactNode }) {
  const [showCitationsModal, setShowCitationsModal] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem('outpost_desktop_inspector_v1') === 'true';
    } catch {
      return false;
    }
  });
  const [openTabsCount, setOpenTabsCount] = useState<number>(7);
  const [readinessPct, setReadinessPct] = useState<number>(
    () => calculateHomesteadReadinessScore().breakdown.exodusScorePct
  );

  const location = useLocation();
  const navigate = useNavigate();
  const currentSeason = getCurrentMalawiSeason();

  const isScoutMapRoute = ['/scout', '/scout-map', '/map', '/regions'].includes(
    location.pathname
  );

  const toggleInspector = () => {
    setIsInspectorOpen((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('outpost_desktop_inspector_v1', String(next));
      } catch {}
      return next;
    });
  };

  useEffect(() => {
    const refreshReadiness = () =>
      setReadinessPct(calculateHomesteadReadinessScore().breakdown.exodusScorePct);
    const handleTabsUpdated = (e: Event) => {
      const custom = e as CustomEvent<{ count: number }>;
      if (typeof custom.detail?.count === 'number') {
        setOpenTabsCount(custom.detail.count);
      }
    };

    window.addEventListener('outpost:progress-updated', refreshReadiness);
    window.addEventListener('outpost:readiness-updated', refreshReadiness);
    window.addEventListener('outpost:tabs-updated', handleTabsUpdated);
    return () => {
      window.removeEventListener('outpost:progress-updated', refreshReadiness);
      window.removeEventListener('outpost:readiness-updated', refreshReadiness);
      window.removeEventListener('outpost:tabs-updated', handleTabsUpdated);
    };
  }, []);

  // Desktop Keyboard Navigation Engine:
  // - Cmd/Ctrl+K or / : Open Command Palette
  // - Cmd/Ctrl+B or Cmd/Ctrl+D : Toggle Left Workspace Explorer
  // - Cmd/Ctrl+I : Toggle Right Reference Inspector
  // - Alt+ArrowLeft or Cmd+[ : Navigate Back
  // - Alt+ArrowRight or Cmd+] : Navigate Forward
  // - Alt+1..6 : Quick-jump across core Outpost tabs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const targetTag = (e.target as HTMLElement)?.tagName;
      const isTyping =
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(targetTag) ||
        (e.target as HTMLElement)?.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      if (
        (e.metaKey || e.ctrlKey) &&
        (e.key.toLowerCase() === 'b' || e.key.toLowerCase() === 'd')
      ) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('outpost:toggle-left-directory'));
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        toggleInspector();
        return;
      }

      if (isTyping) return;

      if (e.key === '/') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
        return;
      }

      // Desktop History Back / Forward
      if ((e.altKey && e.key === 'ArrowLeft') || (e.metaKey && e.key === '[')) {
        e.preventDefault();
        navigate(-1);
        return;
      }
      if ((e.altKey && e.key === 'ArrowRight') || (e.metaKey && e.key === ']')) {
        e.preventDefault();
        navigate(1);
        return;
      }

      // Alt + 1..6 Quick Tab Jumps
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            navigate('/');
            break;
          case '2':
            e.preventDefault();
            navigate('/where');
            break;
          case '3':
            e.preventDefault();
            navigate('/scout-map');
            break;
          case '4':
            e.preventDefault();
            navigate('/what');
            break;
          case '5':
            e.preventDefault();
            navigate('/how');
            break;
          case '6':
            e.preventDefault();
            navigate('/calculators');
            break;
          case 't':
          case 'T':
            e.preventDefault();
            navigate('/tracker');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Custom event listeners for global triggers
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
    <div className="h-screen w-screen overflow-hidden flex flex-col font-sans bg-[#FAF8F5] dark:bg-[#07120C] text-stone-800 dark:text-stone-100 relative selection:bg-amber-200 dark:selection:bg-emerald-900 selection:text-stone-900 dark:selection:text-amber-200 transition-colors duration-200">
      {/* ====================================================================
          1. DESKTOP WINDOW TITLE BAR, MULTI-TAB STRIP & ADDRESS TOOLBAR
      ==================================================================== */}
      <Header
        onOpenCitations={() => setShowCitationsModal(true)}
        onOpenSearch={() => setIsCommandPaletteOpen(true)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onToggleInspector={toggleInspector}
        isInspectorOpen={isInspectorOpen}
      />

      {/* ====================================================================
          2. MAIN DESKTOP WORKSPACE BODY (ACTIVITY RAIL + EXPLORER + CANVAS + INSPECTOR)
      ==================================================================== */}
      <div className="flex-1 flex min-h-0 min-w-0 relative overflow-hidden">
        {/* Left Activity Bar & Expandable Workspace Explorer Tree */}
        <LeftSymbolDirectory />

        {/* Center Active Tab Canvas Viewport */}
        <div
          id="outpost-scroll-Viewport"
          className={cn(
            'flex-1 flex flex-col min-w-0 h-full relative bg-[#FAF8F5] dark:bg-[#09150E]',
            isScoutMapRoute ? 'overflow-hidden' : 'overflow-y-auto custom-scrollbar'
          )}
        >
          {!isScoutMapRoute && <OfflinePwaStatusBanner />}
          <main className={cn('flex-1 w-full', isScoutMapRoute ? 'h-full' : 'pb-10')}>
            {children}
          </main>
        </div>

        {/* Right Side-by-Side Reference Inspector Dock (Quick Sizer & Scratchpad) */}
        <DesktopReferenceInspector
          isOpen={isInspectorOpen}
          onClose={() => setIsInspectorOpen(false)}
        />
      </div>

      {/* ====================================================================
          3. NATIVE DESKTOP BOTTOM STATUS BAR
      ==================================================================== */}
      <footer
        aria-label="Desktop Application Status Bar"
        className="h-7 shrink-0 bg-[#040E08] border-t border-emerald-950/90 px-3 flex items-center justify-between gap-3 text-[11px] font-mono text-stone-300 select-none z-40"
      >
        {/* Left: Offline Vault Sync, Active Malawi Season & Readiness Score */}
        <div className="flex items-center gap-3 min-w-0 overflow-hidden">
          <div className="text-emerald-300 shrink-0">
            <OfflinePwaStatusBanner compact />
          </div>

          <span className="hidden sm:inline text-emerald-900">|</span>

          <Link
            to="/seasons"
            className="hidden sm:inline-flex items-center gap-1.5 text-stone-300 hover:text-amber-300 transition-colors truncate"
            title="Active Malawi Agricultural Season (Click to open Almanac)"
          >
            <Calendar size={11} className="text-amber-400 shrink-0" />
            <span className="truncate">Season: {currentSeason}</span>
          </Link>

          <span className="hidden md:inline text-emerald-900">|</span>

          <Link
            to="/tracker"
            className="hidden md:inline-flex items-center gap-1.5 text-stone-300 hover:text-amber-300 transition-colors tabular-nums shrink-0"
            title="Homestead Readiness Score (Click to open 15-Milestone Ledger)"
          >
            <CheckCircle2 size={11} className="text-emerald-400 shrink-0" />
            <span>Readiness: {readinessPct}%</span>
          </Link>
        </div>

        {/* Right: Open Tabs, Inspector Toggle, Citations & Malawi GIS Coordinates */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden lg:inline-flex items-center gap-1 text-stone-400 tabular-nums">
            <Layers size={11} className="text-emerald-400" />
            <span>{openTabsCount} Tabs</span>
          </span>

          <span className="hidden lg:inline text-emerald-900">|</span>

          <button
            type="button"
            onClick={toggleInspector}
            className={cn(
              'hidden sm:inline-flex items-center gap-1 hover:text-amber-300 transition-colors cursor-pointer',
              isInspectorOpen ? 'text-amber-300 font-bold' : 'text-stone-300'
            )}
            title="Toggle Side-by-Side Reference Sizer & Scratchpad (⌘I)"
          >
            <Columns2 size={11} />
            <span>Inspector</span>
          </button>

          <span className="hidden sm:inline text-emerald-900">|</span>

          <button
            type="button"
            onClick={() => setShowCitationsModal(true)}
            className="text-stone-300 hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <ShieldCheck size={11} className="text-emerald-400" />
            <span>DCCMS · FAO · EGW</span>
          </button>

          <span className="hidden xl:inline text-emerald-900">|</span>
          <span className="hidden xl:inline text-stone-400 tabular-nums">
            13.25°S, 34.30°E · Malawi
          </span>
        </div>
      </footer>

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
      <CitationsModal
        isOpen={showCitationsModal}
        onClose={() => setShowCitationsModal(false)}
      />
    </div>
  );
}
