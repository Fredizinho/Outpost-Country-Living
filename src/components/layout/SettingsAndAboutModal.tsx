import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Settings,
  Palette,
  Sun,
  Moon,
  Type,
  Database,
  Download,
  Upload,
  RefreshCw,
  Code2,
  Mail,
  ShieldCheck,
  Sparkles,
  Check,
  Copy,
  Compass,
  Columns2,
  Keyboard,
  RotateCcw,
  HeartHandshake,
  Globe,
  Layers,
  Award,
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useActiveHomesteadDistrict } from '@/lib/activeDistrictSync';
import { DISTRICT_LIST } from '@/constants';
import {
  getOfflineSyncStatus,
  forceSyncOfflineCache,
  createFullAppBackup,
  restoreFullAppBackup,
  calculateHomesteadReadinessScore,
} from '@/lib/offlineStorage';
import { OutpostLogo } from '../common/OutpostLogo';
import { cn } from '@/lib/utils';

export type SettingsModalTab = 'appearance' | 'data' | 'about' | 'preferences' | 'developer';

function normalizeSettingsTab(tab?: SettingsModalTab): 'appearance' | 'data' | 'about' {
  if (tab === 'developer' || tab === 'about') return 'about';
  if (tab === 'data') return 'data';
  return 'appearance';
}

export interface SettingsAndAboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: SettingsModalTab;
  onOpenCitations?: () => void;
  onToggleInspector?: () => void;
  isInspectorOpen?: boolean;
}

export function SettingsAndAboutModal({
  isOpen,
  onClose,
  initialTab = 'appearance',
  onOpenCitations,
  onToggleInspector,
  isInspectorOpen = false,
}: SettingsAndAboutModalProps) {
  const { isDark, setTheme, palette, setPalette, fontPairing, setFontPairing } = useTheme();
  const isSapphire = palette === 'sapphire' || palette === 'midnight';

  const [activeTab, setActiveTab] = useState<'appearance' | 'data' | 'about'>(() =>
    normalizeSettingsTab(initialTab)
  );
  const [activeDistrictId, setActiveDistrictId] = useActiveHomesteadDistrict();
  const [isLargeText, setIsLargeText] = useState<boolean>(() => {
    try {
      return localStorage.getItem('outpost_reader_font_scale') === 'lg';
    } catch {
      return false;
    }
  });
  const [syncStatus, setSyncStatus] = useState(() => getOfflineSyncStatus());
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(normalizeSettingsTab(initialTab));
      setSyncStatus(getOfflineSyncStatus());
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleSetFontScale = (large: boolean) => {
    setIsLargeText(large);
    try {
      document.documentElement.classList.toggle('field-reader-lg', large);
      localStorage.setItem('outpost_reader_font_scale', large ? 'lg' : 'std');
      window.dispatchEvent(
        new CustomEvent('outpost:font-scale-changed', { detail: { isLargeText: large } })
      );
      triggerToast(
        large
          ? 'Field Reader 110% High-Legibility Text enabled'
          : 'Standard 100% Desktop Typography restored'
      );
    } catch {}
  };

  const handleForceSync = () => {
    const updated = forceSyncOfflineCache();
    setSyncStatus(updated);
    triggerToast('All 28 Malawi district datasets & manuals verified for offline use');
  };

  const handleExportBackup = () => {
    try {
      const backupJson = createFullAppBackup();
      const blob = new Blob([JSON.stringify(backupJson, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `outpost-sanctuary-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      triggerToast('Homestead ledger & progress backup exported');
    } catch {
      triggerToast('Could not export backup file');
    }
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        restoreFullAppBackup(parsed);
        triggerToast('Backup restored successfully');
        window.dispatchEvent(new CustomEvent('outpost:progress-updated'));
      } catch {
        triggerToast('Invalid backup file format');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleResetWorkspaceTabs = () => {
    try {
      localStorage.removeItem('outpost_desktop_open_tabs_v3');
      window.location.reload();
    } catch {}
  };

  const handleCopyDeveloperEmail = () => {
    navigator.clipboard?.writeText('onesialfred@gmail.com');
    setCopiedEmail(true);
    triggerToast('Developer email copied: onesialfred@gmail.com');
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const readiness = calculateHomesteadReadinessScore();
  const activeDistrict =
    DISTRICT_LIST.find((d) => d.id === activeDistrictId) || DISTRICT_LIST[0];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Workstation Settings and Developer Information"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            'w-full max-w-4xl max-h-[88vh] rounded-3xl overflow-hidden flex flex-col text-stone-100 border shadow-[0_28px_70px_-12px_rgba(0,0,0,0.85)]',
            isSapphire
              ? 'bg-gradient-to-b from-[#06182E] via-[#041122] to-[#030B17] border-sky-400/30'
              : 'bg-gradient-to-b from-[#071F12] via-[#04140B] to-[#030C07] border-emerald-400/30'
          )}
        >
          {/* =================================================================
              MODAL HEADER BAR (DESKTOP WORKSTATION STYLE)
          ================================================================= */}
          <div
            className={cn(
              'px-5 py-4 border-b flex flex-wrap items-center justify-between gap-3 shrink-0',
              isSapphire
                ? 'bg-[#041020]/90 border-sky-400/20'
                : 'bg-[#04120A]/90 border-emerald-500/20'
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-10 h-10 rounded-2xl border flex items-center justify-center shadow-inner',
                  isSapphire
                    ? 'bg-sky-500/15 border-sky-400/35 text-amber-300'
                    : 'bg-emerald-500/15 border-emerald-400/35 text-amber-300'
                )}
              >
                <Settings size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
                    Workstation Preferences &amp; About Outpost
                  </h2>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-amber-400/15 text-amber-300 border border-amber-400/30">
                    Desktop Edition
                  </span>
                </div>
                <p className="text-xs text-stone-300/85">
                  Customize your sanctuary theme, field typography, offline vault, and view developer credentials.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
              aria-label="Close Settings and About Modal"
            >
              <X size={16} />
            </button>
          </div>

          {/* =================================================================
              TWO-PANE DESKTOP SETTINGS & ABOUT BODY
          ================================================================= */}
          <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
            {/* Left Navigation Rail */}
            <aside
              className={cn(
                'w-full md:w-60 shrink-0 border-b md:border-b-0 md:border-r p-3 flex md:flex-col justify-between gap-2 overflow-x-auto md:overflow-visible',
                isSapphire
                  ? 'bg-[#030D1B]/70 border-sky-400/15'
                  : 'bg-[#030E08]/70 border-emerald-500/15'
              )}
            >
              <div className="flex md:flex-col gap-1.5 w-full">
                {[
                  {
                    id: 'appearance' as const,
                    label: 'Workspace & Theme',
                    sub: 'Emerald, Sapphire & Font',
                    icon: Palette,
                  },
                  {
                    id: 'data' as const,
                    label: 'Offline Vault & Sync',
                    sub: 'Backups & District Baseline',
                    icon: Database,
                  },
                  {
                    id: 'about' as const,
                    label: 'About & Developer',
                    sub: 'Alfred Pereira-Sozilho Onesi',
                    icon: Code2,
                  },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        'flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-left transition-all cursor-pointer border shrink-0 md:w-full',
                        active
                          ? isSapphire
                            ? 'bg-gradient-to-r from-sky-500/30 to-blue-900/50 text-white border-sky-400/55 shadow-md'
                            : 'bg-gradient-to-r from-emerald-500/30 to-emerald-900/50 text-white border-emerald-400/55 shadow-md'
                          : 'bg-transparent hover:bg-white/5 text-stone-300 border-transparent'
                      )}
                    >
                      <Icon
                        size={16}
                        className={cn(
                          'shrink-0',
                          active ? 'text-amber-300' : 'text-stone-400'
                        )}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold leading-tight truncate">
                          {tab.label}
                        </div>
                        <div className="text-[11px] text-stone-400 truncate hidden sm:block">
                          {tab.sub}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Compact Readiness Summary in Left Rail Footer */}
              <div className="hidden md:flex flex-col gap-2 p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-stone-300 font-medium">Exodus Readiness</span>
                  <span className="font-mono font-bold text-amber-300">
                    {readiness.breakdown.exodusScorePct}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-black/50 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full"
                    style={{ width: `${Math.max(6, readiness.breakdown.exodusScorePct)}%` }}
                  />
                </div>
                <span className="text-[11px] text-stone-400 font-mono">
                  Target: {activeDistrict.name} ({activeDistrict.region})
                </span>
              </div>
            </aside>

            {/* Right Content Pane */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-6 flex flex-col gap-6">
              {toastMessage && (
                <div className="px-4 py-2.5 rounded-xl bg-amber-400/20 border border-amber-300/50 text-amber-200 text-xs font-semibold flex items-center justify-between gap-2">
                  <span>{toastMessage}</span>
                  <Check size={14} className="text-amber-300 shrink-0" />
                </div>
              )}

              {/* =============================================================
                  TAB 1: WORKSPACE & APPEARANCE SETTINGS
              ============================================================= */}
              {activeTab === 'appearance' && (
                <div className="flex flex-col gap-6">
                  {/* 1. 4-Theme Color Palette Selection */}
                  <div className="flex flex-col gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Palette size={15} className="text-amber-300" />
                        <span>Sanctuary Color Atmosphere (5 Themes · 60-30-10 Rule)</span>
                      </h3>
                      <p className="text-xs text-stone-300/85 mt-0.5">
                        Themes configure workstation surfaces (60%), structure &amp; cards (30%), and focal highlights (10%). The background vector landscape preserves its canonical Malawian dawn colors across all themes.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Option 0: Minimalist Charcoal Studio (NeuroNest & Equier Graphite) */}
                      <button
                        type="button"
                        onClick={() => {
                          setPalette('charcoal');
                          setTheme('dark');
                          setFontPairing('inter');
                          triggerToast('Switched to Minimalist Charcoal Studio + Inter UI');
                        }}
                        className={cn(
                          'sm:col-span-2 p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-2.5 relative overflow-hidden',
                          palette === 'charcoal'
                            ? 'bg-[#18181B] border-amber-400 shadow-[0_0_25px_rgba(255,255,255,0.12)]'
                            : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/15'
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-white">
                            01 · Minimalist Charcoal Studio (NeuroNest &amp; Equier Edition)
                          </span>
                          {palette === 'charcoal' && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-400 text-stone-950 font-mono text-[10px] font-bold">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <div className="h-9 rounded-xl bg-gradient-to-r from-[#121215] via-[#27272A] to-[#DCE6F2] border border-white/20 flex items-center px-3 gap-2">
                          <span className="w-3.5 h-3.5 rounded-full bg-[#18181B] border border-white/60" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#DCE6F2] border border-stone-400" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#DCF2DE] border border-stone-400" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#FBF3C9] border border-stone-400" />
                          <span className="text-[10px] font-mono text-stone-900 font-semibold ml-auto">
                            Matte Graphite &amp; Pastel Bento
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-300 leading-relaxed">
                          Ultra-clean matte charcoal workspace (`#141416`) paired with soft pastel Bento stat cards and crisp Inter typography.
                        </p>
                      </button>

                      {/* Option 1: Highland Emerald & Golden Dawn */}
                      <button
                        type="button"
                        onClick={() => {
                          setPalette('emerald');
                          triggerToast('Switched to Highland Emerald & Golden Dawn palette');
                        }}
                        className={cn(
                          'p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-2.5 relative overflow-hidden',
                          palette === 'emerald'
                            ? 'bg-emerald-950/70 border-amber-400 shadow-[0_0_25px_rgba(16,185,129,0.25)]'
                            : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/15'
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-white">
                            01 · Highland Emerald &amp; Dawn
                          </span>
                          {palette === 'emerald' && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-400 text-stone-950 font-mono text-[10px] font-bold">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <div className="h-9 rounded-xl bg-gradient-to-r from-[#04140B] via-[#0B3B24] to-[#F59E0B] border border-white/20 flex items-center px-3 gap-2">
                          <span className="w-3.5 h-3.5 rounded-full bg-[#10B981] border border-white/60" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#FBBF24] border border-white/60" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#F9F6EE] border border-white/60" />
                          <span className="text-[10px] font-mono text-amber-100 ml-auto">
                            Mulanje Cedar &amp; Sun
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-300 leading-relaxed">
                          Botanical forest greens, warm parchment &amp; golden sunrise highlights.
                        </p>
                      </button>

                      {/* Option 2: Burnt Sienna, Soft Beige & Sandy Neutrals */}
                      <button
                        type="button"
                        onClick={() => {
                          setPalette('sienna');
                          triggerToast('Switched to Burnt Sienna, Soft Beige & Sandy Neutrals');
                        }}
                        className={cn(
                          'p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-2.5 relative overflow-hidden',
                          palette === 'sienna'
                            ? 'bg-[#3B170C]/85 border-amber-400 shadow-[0_0_25px_rgba(200,90,50,0.3)]'
                            : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/15'
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-white">
                            02 · Burnt Sienna &amp; Sandy Beige
                          </span>
                          {palette === 'sienna' && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-400 text-stone-950 font-mono text-[10px] font-bold">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <div className="h-9 rounded-xl bg-gradient-to-r from-[#2D120A] via-[#C85A32] to-[#F5EFE4] border border-white/20 flex items-center px-3 gap-2">
                          <span className="w-3.5 h-3.5 rounded-full bg-[#C85A32] border border-white/60" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#E6D7C3] border border-white/60" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#F5EFE4] border border-white/60" />
                          <span className="text-[10px] font-mono text-amber-950 font-semibold ml-auto">
                            Katondo Clay &amp; Sand
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-300 leading-relaxed">
                          Warm Malawian terracotta earth, soft beige linen &amp; sun-baked sandy neutrals.
                        </p>
                      </button>

                      {/* Option 3: Deep Midnight Blue, Crisp White & Bright Cyan */}
                      <button
                        type="button"
                        onClick={() => {
                          setPalette('midnight');
                          triggerToast('Switched to Deep Midnight Blue, Crisp White & Bright Cyan');
                        }}
                        className={cn(
                          'p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-2.5 relative overflow-hidden',
                          palette === 'midnight'
                            ? 'bg-[#07142B]/90 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.3)]'
                            : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/15'
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-white">
                            03 · Midnight Blue &amp; Bright Cyan
                          </span>
                          {palette === 'midnight' && (
                            <span className="px-2 py-0.5 rounded-md bg-cyan-400 text-stone-950 font-mono text-[10px] font-bold">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <div className="h-9 rounded-xl bg-gradient-to-r from-[#0A192F] via-[#06B6D4] to-[#FFFFFF] border border-white/20 flex items-center px-3 gap-2">
                          <span className="w-3.5 h-3.5 rounded-full bg-[#0A192F] border border-white/60" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#06B6D4] border border-white/60" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#FFFFFF] border border-stone-400" />
                          <span className="text-[10px] font-mono text-slate-950 font-semibold ml-auto">
                            Crisp White &amp; Cyan
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-300 leading-relaxed">
                          Architectural deep midnight navy paired with crisp pure white daylight surfaces &amp; bright cyan telemetry.
                        </p>
                      </button>

                      {/* Option 4: Lake Malawi Sapphire Blue */}
                      <button
                        type="button"
                        onClick={() => {
                          setPalette('sapphire');
                          triggerToast('Switched to Lake Malawi Sapphire Blue theme');
                        }}
                        className={cn(
                          'p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-2.5 relative overflow-hidden',
                          palette === 'sapphire'
                            ? 'bg-sky-950/75 border-amber-400 shadow-[0_0_25px_rgba(14,165,233,0.28)]'
                            : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/15'
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-white">
                            04 · Lake Malawi Sapphire
                          </span>
                          {palette === 'sapphire' && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-400 text-stone-950 font-mono text-[10px] font-bold">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <div className="h-9 rounded-xl bg-gradient-to-r from-[#041122] via-[#0284C7] to-[#38BDF8] border border-white/20 flex items-center px-3 gap-2">
                          <span className="w-3.5 h-3.5 rounded-full bg-[#38BDF8] border border-white/60" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#0284C7] border border-white/60" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#FBBF24] border border-white/60" />
                          <span className="text-[10px] font-mono text-sky-100 ml-auto">
                            Living Waters Azure
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-300 leading-relaxed">
                          Cerulean hydro-cartographic glass inspired by Lake Malawi’s deep waters and mountain springs.
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* 1B. Top Sans-Serif (UI & Body) & Top Serif (Editorial & Luxury) Selector */}
                  <div className="flex flex-col gap-2.5 pt-3 border-t border-white/10">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Type size={15} className="text-amber-300" />
                        <span>Typography Studio: Top Sans-Serif (UI) &amp; Top Serif (Editorial &amp; Luxury)</span>
                      </h3>
                      <p className="text-xs text-stone-300/85 mt-0.5">
                        Choose between minimalist UI sans-serifs (Inter, Outfit) or high-craft editorial &amp; luxury serifs (Playfair Display, Instrument Serif, Fraunces).
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {[
                        {
                          id: 'inter' as const,
                          title: 'Inter UI Minimalist',
                          badge: 'Top Sans-Serif (UI & Body)',
                          desc: 'Pure Inter across headings, controls, and body copy for Neo-Brutalist Swiss & SaaS clarity.',
                        },
                        {
                          id: 'swiss' as const,
                          title: 'Outfit + Inter Sans',
                          badge: 'Top Sans-Serif (Geometric)',
                          desc: 'Modern geometric Outfit display headings paired with ultra-clean Inter body text.',
                        },
                        {
                          id: 'luxury' as const,
                          title: 'Playfair Display + Inter',
                          badge: 'Top Serif (Editorial & Luxury)',
                          desc: 'High-contrast Playfair Display authority paired with crisp Inter UI and reading copy.',
                        },
                        {
                          id: 'editorial' as const,
                          title: 'Instrument Serif + Inter',
                          badge: 'Top Serif (Editorial Atlas)',
                          desc: 'Crisp literary Instrument Serif titles with clean Inter body columns.',
                        },
                        {
                          id: 'warm' as const,
                          title: 'Fraunces + Plus Jakarta',
                          badge: 'Top Serif (Warm Sanctuary)',
                          desc: 'Old-style humanist serif paired with warm approachable reading text.',
                        },
                      ].map((fp) => {
                        const active = fontPairing === fp.id;
                        return (
                          <button
                            key={fp.id}
                            type="button"
                            onClick={() => {
                              setFontPairing(fp.id);
                              triggerToast(`Typography switched to ${fp.title}`);
                            }}
                            className={cn(
                              'p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5',
                              active
                                ? 'bg-amber-400/15 border-amber-400 text-white'
                                : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/12 text-stone-300'
                            )}
                          >
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300">
                                {fp.badge}
                              </span>
                              {active && <Check size={12} className="text-amber-300 shrink-0" />}
                            </div>
                            <div className="text-xs font-bold text-white">{fp.title}</div>
                            <p className="text-[11px] text-stone-400 leading-snug">{fp.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Lighting Mode & Field Typography Scale */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/10">
                    {/* Daylight vs Night Mode */}
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-white">
                          {isDark ? (
                            <Moon size={14} className="text-amber-300" />
                          ) : (
                            <Sun size={14} className="text-amber-300" />
                          )}
                          <span>Luminance Mode</span>
                        </div>
                        <p className="text-xs text-stone-300/80 mt-1">
                          Switch between high-contrast Daylight Parchment and low-glare Evening Watch dark glass.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setTheme('light')}
                          className={cn(
                            'py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 cursor-pointer transition-all',
                            !isDark
                              ? 'bg-amber-400 text-stone-950 border-amber-300 font-bold'
                              : 'bg-white/5 text-stone-300 border-white/10 hover:text-white'
                          )}
                        >
                          <Sun size={13} />
                          <span>Daylight</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setTheme('dark')}
                          className={cn(
                            'py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 cursor-pointer transition-all',
                            isDark
                              ? 'bg-amber-400 text-stone-950 border-amber-300 font-bold'
                              : 'bg-white/5 text-stone-300 border-white/10 hover:text-white'
                          )}
                        >
                          <Moon size={13} />
                          <span>Night Glass</span>
                        </button>
                      </div>
                    </div>

                    {/* Field Reader Font Scale */}
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-white">
                          <Type size={14} className="text-amber-300" />
                          <span>Field Reader Typography Scale</span>
                        </div>
                        <p className="text-xs text-stone-300/80 mt-1">
                          Boost root font size to 110% for effortless legibility in bright outdoor sunlight.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleSetFontScale(false)}
                          className={cn(
                            'py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 cursor-pointer transition-all',
                            !isLargeText
                              ? 'bg-amber-400 text-stone-950 border-amber-300 font-bold'
                              : 'bg-white/5 text-stone-300 border-white/10 hover:text-white'
                          )}
                        >
                          <span>Standard (100%)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSetFontScale(true)}
                          className={cn(
                            'py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 cursor-pointer transition-all',
                            isLargeText
                              ? 'bg-amber-400 text-stone-950 border-amber-300 font-bold'
                              : 'bg-white/5 text-stone-300 border-white/10 hover:text-white'
                          )}
                        >
                          <span>Field Reader (110%)</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 3. Desktop Workstation Panels & Default District */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <Compass size={14} className="text-emerald-400" />
                        <span>Global Target Malawi District</span>
                      </div>
                      <p className="text-xs text-stone-300/80 mt-0.5">
                        Synced across the Home Sizer, 7-Suite Calculators, and GIS Map.
                      </p>
                    </div>
                    <select
                      value={activeDistrictId}
                      onChange={(e) => {
                        setActiveDistrictId(e.target.value);
                        triggerToast('Updated global target Malawi district');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-black/50 border border-white/20 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      {DISTRICT_LIST.map((d) => (
                        <option key={d.id} value={d.id} className="bg-stone-900 text-white">
                          {d.name} ({d.region} · {d.rainfallAnnualMm}mm/yr)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* =============================================================
                  TAB 2: OFFLINE VAULT, BACKUPS & WORKSPACE SYNC
              ============================================================= */}
              {activeTab === 'data' && (
                <div className="flex flex-col gap-5">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-white">
                        <ShieldCheck size={15} className="text-emerald-400" />
                        <span>100% Offline-Ready Field Registry</span>
                      </div>
                      <p className="text-xs text-stone-300/85 mt-1">
                        All 28 Malawi districts, 25 country skill manuals, and EGW citations are cached locally for zero-signal bush scouting.
                      </p>
                      <span className="inline-block font-mono text-[11px] text-amber-300 mt-1.5">
                        Last Verified Cache Sync: {syncStatus.lastSyncFormatted}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleForceSync}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer shrink-0 shadow-sm"
                    >
                      <RefreshCw size={13} />
                      <span>Verify Offline Cache</span>
                    </button>
                  </div>

                  {/* JSON Backup Export & Restore */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-2">
                          <Download size={14} className="text-amber-300" />
                          <span>Export Homestead Backup (.JSON)</span>
                        </h4>
                        <p className="text-xs text-stone-300/80 mt-1">
                          Save a portable copy of your 15-step Exodus checklist, scored land plots, and family pantry ledger.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleExportBackup}
                        className="py-2 px-3.5 rounded-xl bg-gradient-to-b from-amber-300 to-amber-500 text-stone-950 font-bold text-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Download size={13} />
                        <span>Download Backup File</span>
                      </button>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-2">
                          <Upload size={14} className="text-sky-300" />
                          <span>Restore From Backup File</span>
                        </h4>
                        <p className="text-xs text-stone-300/80 mt-1">
                          Import a previously saved Outpost JSON backup to restore your family’s progress on this computer.
                        </p>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json,application/json"
                        onChange={handleImportBackup}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="py-2 px-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Upload size={13} />
                        <span>Select Backup JSON...</span>
                      </button>
                    </div>
                  </div>

                  {/* Desktop Workspace Controls */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-white">
                        Reset Desktop Workspace Tabs
                      </h4>
                      <p className="text-xs text-stone-300/80">
                        Restore the default 6 pinned workspace tabs in the top command bar.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetWorkspaceTabs}
                      className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-amber-200 inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw size={13} />
                      <span>Reset Default Tabs</span>
                    </button>
                  </div>
                </div>
              )}

              {/* =============================================================
                  TAB 3: ABOUT THE APPLICATION & DEVELOPER PROFILE
              ============================================================= */}
              {activeTab === 'about' && (
                <div className="flex flex-col gap-5">
                  {/* Lead Developer & Architect Spotlight Card */}
                  <div
                    className={cn(
                      'p-5 rounded-3xl border relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5',
                      isSapphire
                        ? 'bg-gradient-to-br from-sky-950/90 via-[#061B36] to-[#030D1B] border-sky-400/35'
                        : 'bg-gradient-to-br from-emerald-950/90 via-[#082415] to-[#041009] border-emerald-400/35'
                    )}
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 text-stone-950 font-display text-2xl font-bold flex items-center justify-center shrink-0 shadow-lg border-2 border-white/40">
                        APO
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold">
                            Creator &amp; Lead Architect
                          </span>
                          <span className="text-xs font-mono text-emerald-300">
                            Malawi Sanctuary Initiative
                          </span>
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                          Alfred Pereira-Sozilho Onesi
                        </h3>
                        <p className="text-xs text-stone-200/90 leading-relaxed max-w-xl mt-1">
                          Full-Stack Systems Engineer, GIS &amp; Permaculture Technologist, and Country Living Steward. Engineered <strong className="text-amber-300">OUTPOST: COUNTRY LIVING</strong> to equip families with rigorous hydrogeological data, customary land law clarity, off-grid engineering calculators, and Spirit of Prophecy counsel.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-2 shrink-0 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleCopyDeveloperEmail}
                        className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-mono text-amber-200 inline-flex items-center justify-center gap-2 cursor-pointer transition-all"
                        title="Copy Developer Email"
                      >
                        <Mail size={13} className="text-amber-300" />
                        <span>onesialfred@gmail.com</span>
                        {copiedEmail ? (
                          <Check size={12} className="text-emerald-400" />
                        ) : (
                          <Copy size={12} className="opacity-70" />
                        )}
                      </button>
                      <a
                        href="mailto:onesialfred@gmail.com?subject=Outpost%20Country%20Living%20Workstation"
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-b from-amber-300 to-amber-500 text-stone-950 font-bold text-xs inline-flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <HeartHandshake size={13} />
                        <span>Contact Developer</span>
                      </a>
                    </div>
                  </div>

                  {/* Platform Architecture & Scientific Grounding Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
                    <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-amber-300">
                        <Globe size={14} />
                        <span>28-District GIS &amp; Soils</span>
                      </div>
                      <p className="text-stone-300/85 leading-relaxed">
                        Grounded in FAO HWSD v2.0 soil taxonomy, DCCMS rainfall normals, and Malawi aquifer depth surveys.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                        <Layers size={14} />
                        <span>Off-Grid Engineering</span>
                      </div>
                      <p className="text-stone-300/85 leading-relaxed">
                        7 integrated calculators for 48V LiFePO4 solar arrays, roof rainwater cisterns, 3×3×3ft biochar tree pits, and MWK/USD BoQs.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-sky-300">
                        <Award size={14} />
                        <span>Inspired Blueprint</span>
                      </div>
                      <p className="text-stone-300/85 leading-relaxed">
                        Built upon the Avondale &amp; Madison outpost model, verbatim Ellen G. White counsels, and the 1844 Sanctuary message.
                      </p>
                    </div>
                  </div>

                  {/* Desktop Keyboard Shortcuts & Citations Audit Bar */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col gap-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        <Keyboard size={14} className="text-amber-300" />
                        <span>Desktop Workstation Keyboard Shortcuts</span>
                      </span>
                      {onOpenCitations && (
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onOpenCitations();
                          }}
                          className="text-xs font-mono text-amber-300 hover:underline cursor-pointer"
                        >
                          Open Full Scientific &amp; EGW Citations Vault →
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {[
                        { keys: '⌘K / /', label: 'Command Search' },
                        { keys: '⌘B', label: 'Directory Tree' },
                        { keys: '⌘I', label: 'Sizer & Notes Dock' },
                        { keys: 'Alt + 1–6', label: 'Switch Core Tabs' },
                      ].map((sc) => (
                        <div
                          key={sc.keys}
                          className="px-2.5 py-2 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-2"
                        >
                          <span className="text-stone-300 truncate">{sc.label}</span>
                          <kbd className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-white/10 text-amber-300 shrink-0">
                            {sc.keys}
                          </kbd>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default SettingsAndAboutModal;
