import React, { useState, useEffect } from 'react';
import {
  Wifi,
  WifiOff,
  Download,
  RefreshCw,
  CheckCircle2,
  Database,
  X,
  ShieldCheck
} from 'lucide-react';
import {
  initializeOfflineStorage,
  getOfflineSyncStatus,
  forceSyncOfflineCache
} from '@/lib/offlineStorage';
import { cn } from '@/lib/utils';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

export function OfflinePwaStatusBanner({ compact = false }: { compact?: boolean }) {
  const isOnline = useOnlineStatus();
  const [syncStatus, setSyncStatus] = useState(() => {
    initializeOfflineStorage();
    return getOfflineSyncStatus();
  });
  const [isSyncingVault, setIsSyncingVault] = useState(false);
  const [showVaultDetails, setShowVaultDetails] = useState(false);

  // PWA Install Prompt state
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    initializeOfflineStorage();
    setSyncStatus(getOfflineSyncStatus());

    const handleVaultSynced = () => setSyncStatus(getOfflineSyncStatus());
    window.addEventListener('outpost:offline-vault-synced', handleVaultSynced);

    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsInstalled(isStandalone);

    const ua = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(ua));

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('outpost:offline-vault-synced', handleVaultSynced);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleSyncOfflineVault = () => {
    setIsSyncingVault(true);
    const updated = forceSyncOfflineCache();
    setSyncStatus(updated);
    setTimeout(() => setIsSyncingVault(false), 350);
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setDeferredPrompt(null);
    }
  };

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 relative">
        <button
          type="button"
          onClick={handleSyncOfflineVault}
          disabled={isSyncingVault}
          className={cn(
            'inline-flex items-center gap-1.5 text-[11px] font-mono transition-colors cursor-pointer hover:text-amber-300',
            isOnline
              ? 'text-emerald-300'
              : 'text-amber-400 font-semibold'
          )}
          title={`Click to sync Offline Vault (${syncStatus.districtsCount} Districts, ${syncStatus.soilsCount} FAO Soil Orders, ${syncStatus.skillsCount + syncStatus.seasonsCount} Guides cached · Last sync: ${syncStatus.lastSyncFormatted})`}
        >
          {isSyncingVault ? (
            <RefreshCw size={11} className="animate-spin text-amber-300" />
          ) : isOnline ? (
            <Database size={11} className="text-emerald-400" />
          ) : (
            <WifiOff size={11} className="text-amber-400" />
          )}
          <span>
            {isSyncingVault
              ? 'Syncing Vault...'
              : isOnline
                ? `Offline Vault (${syncStatus.districtsCount} Districts)`
                : 'Offline Mode (Cached)'}
          </span>
        </button>

        {!isInstalled && deferredPrompt && (
          <button
            type="button"
            onClick={handleInstallClick}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <Download size={11} />
            <span>Install App</span>
          </button>
        )}

        {!isInstalled && !deferredPrompt && isIOS && (
          <button
            type="button"
            onClick={() => setShowIOSGuide(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <Download size={11} />
            <span>Install iOS</span>
          </button>
        )}
      </div>
    );
  }

  // When online and not inspecting vault details, keep the top of the page completely uncluttered
  if (isOnline && !showVaultDetails) {
    return null;
  }

  return (
    <>
      {/* Persistent Offline Mode Banner when device loses network connectivity */}
      {!isOnline && (
        <div
          role="status"
          aria-live="polite"
          className="w-full bg-amber-500 text-stone-950 px-4 py-2.5 border-b border-amber-600 shadow-sm relative z-40"
        >
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 font-semibold">
              <WifiOff size={15} className="shrink-0" />
              <span>
                Offline Mode Active — Viewing Cached Outpost Vault ({syncStatus.districtsCount} Malawi Districts,{' '}
                {syncStatus.soilsCount} FAO HWSD v2.0 Soil Orders, {syncStatus.skillsCount} Field Guides &{' '}
                {syncStatus.seasonsCount} Seasonal Tasks).
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span>Last Vault Sync: {syncStatus.lastSyncFormatted}</span>
              <button
                type="button"
                onClick={() => setShowVaultDetails((prev) => !prev)}
                className="px-2.5 py-1 rounded-lg bg-stone-950 text-amber-300 font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
              >
                {showVaultDetails ? 'Hide Vault' : 'Inspect Offline Vault'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Offline Vault & PWA Install Bar */}
      <div className="w-full bg-[#F2EFE8] dark:bg-[#08130C] border-b border-stone-200/80 dark:border-emerald-950/80 px-4 sm:px-6 py-2 text-xs">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2 text-stone-700 dark:text-stone-300">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 font-mono font-semibold',
                isOnline
                  ? 'text-emerald-800 dark:text-emerald-400'
                  : 'text-amber-700 dark:text-amber-400'
              )}
            >
              {isOnline ? <Wifi size={13} /> : <WifiOff size={13} />}
              <span>{isOnline ? 'Online · Offline Vault Synced' : 'Offline · Serving Cached Data'}</span>
            </span>
            <span className="text-stone-400 dark:text-stone-600" aria-hidden="true">
              ·
            </span>
            <span className="font-mono text-[11px] text-stone-600 dark:text-stone-400">
              {syncStatus.districtsCount} Districts · {syncStatus.soilsCount} FAO Soil Orders ·{' '}
              {syncStatus.pitsCount} Pit Specs · {syncStatus.skillsCount + syncStatus.seasonsCount} Guides Cached
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSyncOfflineVault}
              disabled={isSyncingVault}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-900/60 text-stone-700 dark:text-stone-200 hover:text-emerald-800 dark:hover:text-emerald-300 font-semibold text-[11px] transition-colors cursor-pointer"
              title="Refresh local offline cache of all 28 district profiles, soil taxonomy, and planting guides"
            >
              <RefreshCw size={11} className={cn(isSyncingVault && 'animate-spin')} />
              <span>{isSyncingVault ? 'Syncing Vault...' : `Vault Synced (${syncStatus.lastSyncFormatted})`}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowVaultDetails((prev) => !prev)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-200/70 dark:bg-emerald-950/60 text-stone-800 dark:text-emerald-300 font-semibold text-[11px] hover:bg-stone-300/70 transition-colors cursor-pointer"
            >
              <Database size={11} />
              <span>{showVaultDetails ? 'Close Vault' : 'Offline Vault Status'}</span>
            </button>

            {!isInstalled && deferredPrompt && (
              <button
                type="button"
                onClick={handleInstallClick}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-[11px] transition-colors cursor-pointer"
              >
                <Download size={11} />
                <span>Install Offline App</span>
              </button>
            )}

            {!isInstalled && !deferredPrompt && isIOS && (
              <button
                type="button"
                onClick={() => setShowIOSGuide(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-[11px] transition-colors cursor-pointer"
              >
                <Download size={11} />
                <span>Install on iOS</span>
              </button>
            )}
          </div>
        </div>

        {/* Expandable Offline Vault Inventory Panel */}
        {showVaultDetails && (
          <div className="max-w-6xl mx-auto mt-2.5 p-4 rounded-2xl bg-white dark:bg-[#0D1D13] border border-stone-200 dark:border-emerald-900/60 shadow-sm">
            <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-stone-200/80 dark:border-emerald-950">
              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-emerald-700 dark:text-emerald-400" />
                <span className="font-display font-bold text-sm text-stone-900 dark:text-white">
                  Progressive Web App (PWA) Offline Storage Vault
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowVaultDetails(false)}
                className="p-1 rounded-lg text-stone-500 hover:text-stone-800 dark:hover:text-white cursor-pointer"
                aria-label="Close Offline Vault Status"
              >
                <X size={14} />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200/70 dark:border-emerald-900/40">
                <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-sans">
                  Malawi District Profiles
                </span>
                <span className="font-bold text-stone-900 dark:text-white">
                  {syncStatus.districtsCount} / 28 Cached
                </span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block mt-0.5">
                  ✓ Available Offline
                </span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200/70 dark:border-emerald-900/40">
                <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-sans">
                  FAO HWSD v2.0 Soil Orders
                </span>
                <span className="font-bold text-stone-900 dark:text-white">
                  {syncStatus.soilsCount} Orders & {syncStatus.pitsCount} Pits
                </span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block mt-0.5">
                  ✓ Available Offline
                </span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200/70 dark:border-emerald-900/40">
                <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-sans">
                  Planting & Seasonal Guides
                </span>
                <span className="font-bold text-stone-900 dark:text-white">
                  {syncStatus.skillsCount} Skills · {syncStatus.seasonsCount} Almanac
                </span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block mt-0.5">
                  ✓ Available Offline
                </span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200/70 dark:border-emerald-900/40">
                <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-sans">
                  Weather & Satellite Cache
                </span>
                <span className="font-bold text-stone-900 dark:text-white">
                  5 Regions + {syncStatus.telemetryCachedCount} Live Syncs
                </span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block mt-0.5">
                  ✓ Service Worker v5 Active
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* iOS Safari Guided Install Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-stone-900 p-6 border border-stone-200 dark:border-emerald-900 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-lg font-bold text-stone-900 dark:text-white">
                Install Outpost Living on iOS
              </h3>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              1. Tap the <strong>Share</strong> icon in the Safari toolbar.
              <br />
              2. Scroll down and select <strong>Add to Home Screen</strong> to use all 28 district profiles, soil maps, and calculators offline in the field.
            </p>
            <button
              type="button"
              onClick={() => setShowIOSGuide(false)}
              className="mt-4 w-full rounded-xl bg-emerald-800 hover:bg-emerald-700 py-2 text-xs font-semibold text-white cursor-pointer"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
}
