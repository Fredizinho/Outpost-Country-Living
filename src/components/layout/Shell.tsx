import { ReactNode, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Settings, Code2, Palette, MapPin, CheckCircle2, Columns2, ChevronUp, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CitationsModal } from './CitationsModal';
import { DesktopReferenceInspector } from './DesktopReferenceInspector';
import { SettingsAndAboutModal, SettingsModalTab } from './SettingsAndAboutModal';
import { Header } from '../common/Header';
import { QuickCommandPalette } from '../common/QuickCommandPalette';
import { HomesteadAdvisorModal } from '../advisor/HomesteadAdvisorModal';
import { LeftSymbolDirectory } from '../navigation/LeftSymbolDirectory';
import { OfflinePwaStatusBanner } from '../common/OfflinePwaStatusBanner';
import { WorkspaceStatusBar } from '../common/WorkspaceStatusBar';
import { ShortcutCheatSheetModal } from '../common/ShortcutCheatSheetModal';
import { calculateHomesteadReadinessScore } from '@/lib/offlineStorage';
import { useActiveHomesteadDistrict } from '@/lib/activeDistrictSync';
import { DISTRICT_LIST } from '@/constants';
import { getCurrentMalawiSeason } from '@/lib/seasonalAlmanac';
import { useTheme, PALETTE_META } from '@/contexts/ThemeContext';

export function Shell({ children }: { children: ReactNode }) {
  const { theme, isField } = useTheme();

  const [showCitationsModal, setShowCitationsModal] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem('outpost_desktop_inspector_v1') === 'true';
    } catch {
      return false;
    }
  });
  const [openTabsCount, setOpenTabsCount] = useState<number>(3);
  const [readinessPct, setReadinessPct] = useState<number>(
    () => calculateHomesteadReadinessScore().breakdown.exodusScorePct
  );

  const location = useLocation();
  const navigate = useNavigate();
  const currentSeason = getCurrentMalawiSeason();

  const isScoutMapRoute = ['/scout', '/scout-map', '/map', '/regions'].includes(
    location.pathname
  );

  const openSettings = (tab: string = 'preferences') => {
    navigate(`/settings?tab=${tab}`);
  };

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
  // - Cmd/Ctrl+, : Open Settings & About Modal
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

      if ((e.metaKey || e.ctrlKey) && e.key === ',') {
        e.preventDefault();
        openSettings('preferences');
        return;
      }

      if (
        (e.metaKey || e.ctrlKey) &&
        (e.key.toLowerCase() === 'b' || e.key.toLowerCase() === 'd')
      ) {
        e.preventDefault();
        if (e.shiftKey) {
          toggleInspector();
        } else {
          window.dispatchEvent(new CustomEvent('outpost:toggle-left-directory'));
        }
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        toggleInspector();
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        const el = document.documentElement;
        if (!document.fullscreenElement) {
          el.requestFullscreen?.().catch(() => {});
        } else {
          document.exitFullscreen?.().catch(() => {});
        }
        return;
      }

      if ((e.metaKey || e.ctrlKey) && (e.key === '/' || e.key === '?')) {
        e.preventDefault();
        setIsCheatSheetOpen((prev) => !prev);
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
          case 's':
          case 'S':
            e.preventDefault();
            navigate('/sanitarium');
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
    const handleOpenSettings = (e: Event) => {
      const custom = e as CustomEvent<{ tab?: SettingsModalTab }>;
      openSettings(custom.detail?.tab || 'preferences');
    };

    const handleOpenShortcuts = () => setIsCheatSheetOpen(true);

    window.addEventListener('outpost:open-citations', handleOpenCitations);
    window.addEventListener('outpost:open-search', handleOpenSearch);
    window.addEventListener('outpost:open-advisor', handleOpenAdvisor);
    window.addEventListener('outpost:open-settings', handleOpenSettings);
    window.addEventListener('outpost:open-shortcuts', handleOpenShortcuts);
    window.addEventListener('outpost:open-cheat-sheet', handleOpenShortcuts);

    return () => {
      window.removeEventListener('outpost:open-citations', handleOpenCitations);
      window.removeEventListener('outpost:open-search', handleOpenSearch);
      window.removeEventListener('outpost:open-advisor', handleOpenAdvisor);
      window.removeEventListener('outpost:open-settings', handleOpenSettings);
      window.removeEventListener('outpost:open-shortcuts', handleOpenShortcuts);
      window.removeEventListener('outpost:open-cheat-sheet', handleOpenShortcuts);
    };
  }, []);

  return (
    <div
      className={cn(
        'h-screen w-screen overflow-hidden flex flex-col font-chrome select-none relative selection:bg-[#B4531F]/20 selection:text-[#1F2A22] transition-colors duration-200',
        isField ? 'bg-black text-white' : 'bg-[#F6F1E7] dark:bg-[#0F1813] text-[#1F2A22] dark:text-[#EBF2EC]'
      )}
    >
      {/* ====================================================================
          1. DESKTOP WINDOW TITLE BAR, MULTI-TAB STRIP & BUNDLED COMMAND MENUS
      ==================================================================== */}
      <Header
        onOpenCitations={() => setShowCitationsModal(true)}
        onOpenSearch={() => setIsCommandPaletteOpen(true)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onToggleInspector={toggleInspector}
        isInspectorOpen={isInspectorOpen}
        onOpenSettings={openSettings}
      />

      {/* ====================================================================
          2. MAIN DESKTOP WORKSPACE BODY (ACTIVITY RAIL + EXPLORER + CANVAS + INSPECTOR)
      ==================================================================== */}
      <div className="flex-1 flex min-h-0 min-w-0 relative overflow-hidden">
        {/* Left Activity Bar & Expandable Workspace Explorer Tree (232px moss #16261C) */}
        <LeftSymbolDirectory />

        {/* Center Active Tab Canvas Viewport */}
        <div
          id="outpost-scroll-Viewport"
          className={cn(
            'flex-1 flex flex-col min-w-0 h-full relative select-text transition-colors duration-200',
            isField ? 'bg-black text-white' : 'bg-[#F6F1E7] dark:bg-[#0F1813] text-[#1F2A22] dark:text-[#EBF2EC]',
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

      {/* Quick Command Palette Modal */}
      <QuickCommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
      />

      {/* Keyboard Shortcut Cheat Sheet Modal (Ctrl+/) */}
      <ShortcutCheatSheetModal
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
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

      {/* Bottom Desktop Workspace Status Bar */}
      <WorkspaceStatusBar />
    </div>
  );
}
