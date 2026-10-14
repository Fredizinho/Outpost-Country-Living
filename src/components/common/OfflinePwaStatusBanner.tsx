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
            'inline-flex items-center gap-1.5 text-caption font-mono transition-colors cursor-pointer hover:text-amber-300',
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
      {/* Single Unified Offline / Vault Banner */}
      <div
        role="status"
        aria-live="polite"
        className={cn(
          'w-full px-4 py-2 text-xs border-b transition-colors relative z-40',
          !isOnline
            ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-sm'
            : 'bg-[#F2EFE8] dark:bg-[#08130C] border-stone-200/80 dark:border-emerald-950/80 text-stone-800 dark:text-stone-200'
        )}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 font-semibold">
            {!isOnline ? <WifiOff size={14} className="shrink-0" /> : <Wifi size={14} className="shrink-0 text-emerald-600 dark:text-emerald-400" />}
            <span>
              {!isOnline
                ? `Offline Mode Active — Cached Outpost Vault (${syncStatus.districtsCount} Districts · ${syncStatus.skillsCount} Field Guides · Synced ${syncStatus.lastSyncFormatted})`
                : `Offline Vault Ready (${syncStatus.districtsCount} Districts · ${syncStatus.skillsCount} Guides)`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSyncOfflineVault}
              disabled={isSyncingVault}
              className={cn(
                'px-2.5 py-1 rounded-lg text-caption font-mono font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer',
                !isOnline
                  ? 'bg-amber-600/40 hover:bg-amber-600/60 text-stone-950 border border-stone-950/20'
                  : 'bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300'
              )}
            >
              <RefreshCw size={10} className={cn(isSyncingVault && 'animate-spin')} />
              <span>{isSyncingVault ? 'Syncing...' : 'Sync Vault'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowVaultDetails((prev) => !prev)}
              className={cn(
                'px-2.5 py-1 rounded-lg text-caption font-semibold transition-colors cursor-pointer',
                !isOnline
                  ? 'bg-stone-950 text-amber-300 hover:bg-stone-800'
                  : 'bg-emerald-800 hover:bg-emerald-700 text-white'
              )}
            >
              <Database size={11} className="inline mr-1" />
              <span>{showVaultDetails ? 'Close Details' : 'Vault Details'}</span>
            </button>

            {!isInstalled && deferredPrompt && (
              <button
                type="button"
                onClick={handleInstallClick}
                className="px-2.5 py-1 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-white text-caption font-semibold transition-colors cursor-pointer inline-flex items-center gap-1"
              >
                <Download size={11} />
                <span>Install App</span>
              </button>
            )}
            {!isInstalled && !deferredPrompt && isIOS && (
              <button
                type="button"
                onClick={() => setShowIOSGuide(true)}
                className="px-2.5 py-1 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-caption transition-colors cursor-pointer inline-flex items-center gap-1"
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
                <span className="text-caption text-stone-500 dark:text-stone-400 block font-sans">
                  Malawi District Profiles
                </span>
                <span className="font-bold text-stone-900 dark:text-white">
                  {syncStatus.districtsCount} / 28 Cached
                </span>
                <span className="text-caption text-emerald-700 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 size={16} strokeWidth={1.75} className="shrink-0 text-emerald-500" />
                  <span>Available Offline</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200/70 dark:border-emerald-900/40">
                <span className="text-caption text-stone-500 dark:text-stone-400 block font-sans">
                  FAO HWSD v2.0 Soil Orders
                </span>
                <span className="font-bold text-stone-900 dark:text-white">
                  {syncStatus.soilsCount} Orders & {syncStatus.pitsCount} Pits
                </span>
                <span className="text-caption text-emerald-700 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 size={16} strokeWidth={1.75} className="shrink-0 text-emerald-500" />
                  <span>Available Offline</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200/70 dark:border-emerald-900/40">
                <span className="text-caption text-stone-500 dark:text-stone-400 block font-sans">
                  Planting & Seasonal Guides
                </span>
                <span className="font-bold text-stone-900 dark:text-white">
                  {syncStatus.skillsCount} Skills · {syncStatus.seasonsCount} Almanac
                </span>
                <span className="text-caption text-emerald-700 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 size={16} strokeWidth={1.75} className="shrink-0 text-emerald-500" />
                  <span>Available Offline</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200/70 dark:border-emerald-900/40">
                <span className="text-caption text-stone-500 dark:text-stone-400 block font-sans">
                  Weather & Satellite Cache
                </span>
                <span className="font-bold text-stone-900 dark:text-white">
                  5 Regions + {syncStatus.telemetryCachedCount} Live Syncs
                </span>
                <span className="text-caption text-emerald-700 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 size={16} strokeWidth={1.75} className="shrink-0 text-emerald-500" />
                  <span>Service Worker v5 Active</span>
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
