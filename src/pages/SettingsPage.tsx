import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Palette,
  Database,
  Info,
  Sliders,
  Check,
  Copy,
  Download,
  Upload,
  RefreshCw,
  Sun,
  Moon,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  Code2,
  Cpu,
  Monitor,
  HeartHandshake,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { useTheme, THEME_META, Theme } from '@/contexts/ThemeContext';
import { useActiveHomesteadDistrict } from '@/lib/activeDistrictSync';
import { DISTRICT_LIST } from '@/constants';
import {
  getOfflineSyncStatus,
  forceSyncOfflineCache,
  createFullAppBackup,
  restoreFullAppBackup,
  calculateHomesteadReadinessScore,
} from '@/lib/offlineStorage';
import { usePlatform } from '@/lib/platform';
import { cn } from '@/lib/utils';
import { OutpostLogo } from '@/components/common/OutpostLogo';

export type SettingsTabId = 'appearance' | 'data' | 'district' | 'diagnostics' | 'about';

export function SettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const platform = usePlatform();
  const { theme, setTheme, isDark, isLight, isField, fontPairing, setFontPairing } = useTheme();

  const tabParam = (searchParams.get('tab') as SettingsTabId) || 'appearance';
  const [activeTab, setActiveTab] = useState<SettingsTabId>(
    ['appearance', 'data', 'district', 'diagnostics', 'about'].includes(tabParam)
      ? tabParam
      : 'appearance'
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
    const currentTab = searchParams.get('tab') as SettingsTabId;
    if (currentTab && currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [searchParams]);

  const handleTabChange = (id: SettingsTabId) => {
    setActiveTab(id);
    setSearchParams({ tab: id });
  };

  const handleLargeTextToggle = () => {
    const next = !isLargeText;
    setIsLargeText(next);
    try {
      localStorage.setItem('outpost_reader_font_scale', next ? 'lg' : 'normal');
      window.dispatchEvent(
        new CustomEvent('outpost:font-scale-changed', { detail: { scale: next ? 'lg' : 'normal' } })
      );
      setToastMessage(next ? 'Large guide typography activated' : 'Standard guide typography restored');
    } catch {}
  };

  const handleSyncNow = () => {
    setToastMessage('Refreshing local databases...');
    const result = forceSyncOfflineCache();
    setSyncStatus(result);
    setToastMessage(`Offline caches refreshed (${result.lastSyncFormatted})`);
  };

  const handleExportBackup = () => {
    const backupData = createFullAppBackup();
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `outpost-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToastMessage('Backup archive exported to downloads');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target?.result as string;
        const parsed = JSON.parse(text);
        restoreFullAppBackup(parsed);
        setToastMessage('Homestead state restored successfully. Reloading...');
        setTimeout(() => window.location.reload(), 1000);
      } catch (err: any) {
        setToastMessage(`Invalid backup JSON: ${err?.message}`);
      }
    };
    reader.readAsText(file);
  };

  const readiness = calculateHomesteadReadinessScore();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 w-full font-chrome select-none">
      {/* Page Title & Breadcrumb Header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-border/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            <span>Workspace</span>
            <span>·</span>
            <span>Desktop Settings &amp; Vault</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-ink flex items-center gap-2.5">
            <Sliders size={22} className="text-amber-500" />
            <span>Workspace Settings</span>
          </h1>
        </div>

        <div className="text-right text-xs text-ink-muted">
          <span className="font-mono">v1.0.0</span> · <span className="capitalize">{platform.os}</span>
        </div>
      </div>

      {toastMessage && (
        <div className="mb-4 p-2.5 rounded-[6px] bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-center justify-between animate-in fade-in">
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-xs hover:underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Settings Body: Left Vertical Tabs + Right Tab Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Navigation Sidebar */}
        <aside className="md:col-span-3 flex flex-col gap-1 rounded-[10px] border border-border bg-surface-raised p-2 shadow-xs">
          {[
            { id: 'appearance', label: 'Appearance & Theme', icon: Palette, badge: theme },
            { id: 'data', label: 'Data & Offline Vault', icon: Database, badge: 'Offline' },
            { id: 'district', label: 'Homestead District', icon: MapPin, badge: activeDistrictId },
            { id: 'diagnostics', label: 'System Diagnostics', icon: Cpu },
            { id: 'about', label: 'About Outpost', icon: Info },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleTabChange(item.id as SettingsTabId)}
                className={cn(
                  'h-8.5 px-2.5 rounded-[6px] text-[13px] flex items-center justify-between gap-2 transition-colors cursor-pointer text-left',
                  isActive
                    ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 font-semibold border border-amber-500/30'
                    : 'text-ink-muted hover:text-ink hover:bg-surface/80 border border-transparent'
                )}
              >
                <div className="flex items-center gap-2 truncate">
                  <Icon size={14} className={isActive ? 'text-amber-500' : 'text-stone-400'} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-surface/80 border border-border text-ink-muted uppercase">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Tab Content Panel */}
        <div className="md:col-span-9 flex flex-col gap-5 rounded-[10px] border border-border bg-surface-raised p-5 shadow-xs min-h-[460px]">
          {/* TAB 1: APPEARANCE & THEME */}
          {activeTab === 'appearance' && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-base font-semibold text-ink mb-1">Visual Theme</h2>
                <p className="text-xs text-ink-muted">
                  Choose the calibrated color theme. Designed with high contrast, WCAG AA compliance, and zero neon glare.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['light', 'dark', 'field'] as Theme[]).map((tId) => {
                  const meta = THEME_META[tId];
                  const isCurrent = theme === tId;
                  return (
                    <button
                      key={tId}
                      type="button"
                      onClick={() => setTheme(tId)}
                      className={cn(
                        'p-3 rounded-[8px] border text-left flex flex-col justify-between gap-3 transition-colors cursor-pointer',
                        isCurrent
                          ? 'border-amber-500 bg-amber-500/10 shadow-xs'
                          : 'border-border bg-surface hover:bg-surface/90'
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-semibold text-ink">{meta.name}</span>
                        {isCurrent && <Check size={14} className="text-amber-500" />}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {meta.swatches.map((color, idx) => (
                          <span
                            key={idx}
                            className="w-4 h-4 rounded-full border border-black/20"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <p className="text-[11px] text-ink-muted leading-tight">{meta.description}</p>
                    </button>
                  );
                })}
              </div>

              {/* Guide Typography Scaling */}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-ink">Large Guide Reading Text</h3>
                  <p className="text-xs text-ink-muted">
                    Scales guide study paragraphs to 18px for relaxed offline field reading.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLargeTextToggle}
                  className={cn(
                    'h-7 px-3 rounded-[6px] border text-xs font-semibold transition-colors cursor-pointer',
                    isLargeText
                      ? 'bg-amber-500 text-stone-950 border-amber-400'
                      : 'bg-surface border-border text-ink hover:bg-surface/80'
                  )}
                >
                  {isLargeText ? 'Enabled (18px)' : 'Standard (16px)'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: DATA & OFFLINE VAULT */}
          {activeTab === 'data' && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-base font-semibold text-ink mb-1">Offline Vault &amp; Sync</h2>
                <p className="text-xs text-ink-muted">
                  All 28 district hydrogeology tables, calculators, Spirit of Prophecy texts, and notes operate 100% offline.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-[8px] border border-border bg-surface flex flex-col justify-between">
                  <span className="text-xs text-ink-muted font-medium">Exodus Score</span>
                  <div className="text-2xl font-mono font-bold text-amber-500 mt-1">
                    {readiness.breakdown.exodusScorePct}%
                  </div>
                  <span className="text-[11px] text-ink-muted">Weighted milestone completion</span>
                </div>

                <div className="p-3 rounded-[8px] border border-border bg-surface flex flex-col justify-between">
                  <span className="text-xs text-ink-muted font-medium">Offline Tables</span>
                  <div className="text-2xl font-mono font-bold text-emerald-500 mt-1">
                    28 / 28
                  </div>
                  <span className="text-[11px] text-ink-muted">Full Malawi district coverage</span>
                </div>

                <div className="p-3 rounded-[8px] border border-border bg-surface flex flex-col justify-between">
                  <span className="text-xs text-ink-muted font-medium">Local Storage Status</span>
                  <div className="text-sm font-semibold text-ink mt-2">
                    {syncStatus.skillsCount > 0 ? 'Storage Operational' : 'Degraded Storage'}
                  </div>
                  <span className="text-[11px] text-ink-muted font-mono truncate">
                    {syncStatus.lastSyncFormatted || 'Active'}
                  </span>
                </div>
              </div>

              {/* Data Actions: Export / Import / Refresh */}
              <div className="pt-3 border-t border-border flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="h-8 px-3 rounded-[6px] border border-border bg-surface hover:bg-surface/80 text-ink text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download size={13} className="text-amber-500" />
                  <span>Export Backup (.json)</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="h-8 px-3 rounded-[6px] border border-border bg-surface hover:bg-surface/80 text-ink text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Upload size={13} className="text-emerald-500" />
                  <span>Restore from File</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={handleImportFile}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={handleSyncNow}
                  className="h-8 px-3 rounded-[6px] border border-border bg-surface hover:bg-surface/80 text-ink text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw size={13} className="text-sky-500" />
                  <span>Refresh Local Cache</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: HOMESTEAD DISTRICT */}
          {activeTab === 'district' && (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-base font-semibold text-ink mb-1">Active Homestead District</h2>
                <p className="text-xs text-ink-muted">
                  Default district used for solar insolation calculations, borehole target depths, sunset timers, and soil profiles.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-[360px] overflow-y-auto custom-scrollbar p-1">
                {DISTRICT_LIST.map((dist) => {
                  const isSelected = activeDistrictId === dist.id;
                  return (
                    <button
                      key={dist.id}
                      type="button"
                      onClick={() => {
                        setActiveDistrictId(dist.id);
                        setToastMessage(`Active district set to ${dist.name}`);
                      }}
                      className={cn(
                        'p-2 rounded-[6px] border text-left flex flex-col justify-between transition-colors cursor-pointer text-xs',
                        isSelected
                          ? 'border-amber-500 bg-amber-500/15 font-semibold text-ink'
                          : 'border-border bg-surface hover:bg-surface/80 text-ink-muted'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate">{dist.name}</span>
                        {isSelected && <Check size={12} className="text-amber-500 shrink-0" />}
                      </div>
                      <span className="text-[10px] font-mono text-ink-muted mt-1">{dist.region}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: SYSTEM DIAGNOSTICS */}
          {activeTab === 'diagnostics' && (
            <div className="flex flex-col gap-4 text-xs font-mono">
              <div>
                <h2 className="text-base font-sans font-semibold text-ink mb-1">Desktop Diagnostics</h2>
                <p className="text-xs font-sans text-ink-muted">
                  Host runtime status, window parameters, and capability bindings.
                </p>
              </div>

              <div className="divide-y divide-border/60 rounded-[8px] border border-border bg-surface p-3">
                <div className="flex justify-between py-1.5">
                  <span className="text-ink-muted">Runtime:</span>
                  <span className="text-ink font-semibold">{platform.runtime.toUpperCase()}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-ink-muted">Operating System:</span>
                  <span className="text-ink font-semibold">{platform.os.toUpperCase()}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-ink-muted">Window Title:</span>
                  <span className="text-ink">Outpost</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-ink-muted">Offline Mode:</span>
                  <span className="text-emerald-500 font-semibold">Self-Hosted / Zero CDN</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-ink-muted">Font Engine:</span>
                  <span className="text-ink">Segoe UI Variable (System UI)</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-ink-muted">CSP:</span>
                  <span className="text-amber-500 font-semibold">Strict (Self, Local API, Blob)</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ABOUT */}
          {activeTab === 'about' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <OutpostLogo size="md" />
                <div>
                  <h2 className="text-lg font-bold text-ink">Outpost</h2>
                  <p className="text-xs text-ink-muted">Malawi Country Living &amp; Homestead Workspace</p>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-ink-muted">
                An inspired Seventh-day Adventist country living guide and outpost sanctuary blueprint for Malawi, featuring Spirit of Prophecy counsel, daily devotionals, transition ledger, simplified land readiness cards, property suitability scoring, Edenic agriculture manuals, off-grid resource calculators, and outpost center community connections.
              </p>

              <div className="p-3 rounded-[8px] border border-border bg-surface text-xs flex flex-col gap-1.5">
                <span className="font-semibold text-ink">Core Principles:</span>
                <ul className="list-disc list-inside text-ink-muted space-y-0.5 text-[12px]">
                  <li>Debt-free customary land tenure under Traditional Authorities (Mfumu).</li>
                  <li>Perennial gravity-fed water, solar pumping, and bioswale infiltration.</li>
                  <li>Ellen G. White 3x3x3ft deep trench organic orchard tree sponges.</li>
                  <li>Full offline autonomy with local data persistence across sessions.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
