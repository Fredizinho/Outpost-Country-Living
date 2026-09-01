import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wifi, WifiOff, HardDrive, Download, Trash2, CheckCircle2, 
  AlertTriangle, RefreshCw, X, Shield, MapPin, Compass, Globe
} from 'lucide-react';
import { 
  getTileCacheStats, 
  precacheRegionTiles, 
  clearTileCache, 
  isForceOfflineActive, 
  setForceOfflineActive,
  TileCacheStats 
} from '@/lib/offlineTileManager';
import { MalawiDistrictSpec } from '@/data/malawiDistrictData';
import { cn } from '@/lib/utils';

export interface OfflineMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDistrict: MalawiDistrictSpec | null;
  onSwitchToOfflineVector: () => void;
}

export function OfflineMapModal({
  isOpen,
  onClose,
  activeDistrict,
  onSwitchToOfflineVector
}: OfflineMapModalProps) {
  const [isOnline, setIsOnline] = useState<boolean>(() => typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [isForceOffline, setIsForceOffline] = useState<boolean>(isForceOfflineActive);
  const [stats, setStats] = useState<TileCacheStats>({
    isSupported: true,
    cachedTileCount: 0,
    estimatedSizeMb: 0,
    lastCachedAt: null
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadStatusText, setDownloadStatusText] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Monitor online status
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

  // Load stats on open
  useEffect(() => {
    if (isOpen) {
      refreshStats();
      setIsForceOffline(isForceOfflineActive());
    }
  }, [isOpen]);

  const refreshStats = async () => {
    const currentStats = await getTileCacheStats();
    setStats(currentStats);
  };

  const handleToggleForceOffline = (enabled: boolean) => {
    setIsForceOffline(enabled);
    setForceOfflineActive(enabled);
    if (enabled) {
      onSwitchToOfflineVector();
    }
  };

  const handleDownloadDistrictPack = async () => {
    if (!activeDistrict) return;
    setIsDownloading(true);
    setDownloadProgress(0);
    setSuccessMessage(null);
    setDownloadStatusText(`Preparing tile matrix for ${activeDistrict.name}...`);

    // Calculate bounding box around district centroid (+/- 0.6 degrees)
    const [lat, lng] = activeDistrict.centroid;
    const bounds = {
      minLat: lat - 0.6,
      maxLat: lat + 0.6,
      minLng: lng - 0.6,
      maxLng: lng + 0.6
    };

    const result = await precacheRegionTiles(
      bounds,
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      (pct, current, total) => {
        setDownloadProgress(pct);
        setDownloadStatusText(`Caching satellite tiles: ${current}/${total} (${pct}%)`);
      }
    );

    setIsDownloading(false);
    if (result.success) {
      setSuccessMessage(`Successfully cached ${result.cachedCount} high-res tiles for ${activeDistrict.name} District!`);
      await refreshStats();
    } else {
      setDownloadStatusText('Tile download incomplete. Check connectivity and retry.');
    }
  };

  const handleClearCache = async () => {
    if (confirm('Clear all stored offline satellite and topo map tiles from local storage?')) {
      await clearTileCache();
      await refreshStats();
      setSuccessMessage('Offline tile cache cleared.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center border",
              isOnline && !isForceOffline 
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                : "bg-amber-500/10 border-amber-500/30 text-amber-400"
            )}>
              {isOnline && !isForceOffline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">Offline Map & Field Storage</h3>
              <p className="text-xs text-slate-400">Download maps to your phone or computer to use without internet</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* Status Banner */}
          <div className={cn(
            "p-4 rounded-xl border flex items-start gap-3",
            isForceOffline 
              ? "bg-amber-950/30 border-amber-500/30 text-amber-200"
              : isOnline
                ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-200"
                : "bg-sky-950/30 border-sky-500/30 text-sky-200"
          )}>
            <Shield className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-semibold text-xs tracking-wider uppercase">
                {isForceOffline 
                  ? 'Offline Mode Active' 
                  : isOnline 
                    ? 'Connected Online' 
                    : 'Offline Mode (No Internet)'}
              </div>
              <p className="text-xs text-slate-300">
                The map works completely offline with all 28 Malawi districts, main roads, lakes, rivers, and available land plots stored right on your device.
              </p>
            </div>
          </div>

          {/* Force Offline Mode Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800 rounded-xl">
            <div>
              <div className="font-medium text-slate-200">Use Offline Mode Only</div>
              <div className="text-xs text-slate-400">Save mobile data by using only maps saved on your device</div>
            </div>
            <button
              onClick={() => handleToggleForceOffline(!isForceOffline)}
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                isForceOffline ? "bg-amber-500" : "bg-slate-700"
              )}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                  isForceOffline ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
          </div>

          {/* Pre-Cache District Map Pack */}
          <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-200">Download Satellite Maps for Field Trips</div>
                <div className="text-xs text-slate-400">
                  Target: <strong className="text-emerald-400">{activeDistrict ? activeDistrict.name : 'Dedza'} District</strong>
                </div>
              </div>
              <button
                onClick={handleDownloadDistrictPack}
                disabled={isDownloading || !isOnline}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm",
                  isDownloading
                    ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                    : !isOnline
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-500 text-white"
                )}
              >
                {isDownloading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Downloading...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Download {activeDistrict ? activeDistrict.name : 'Dedza'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Progress Bar */}
            {isDownloading && (
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{downloadStatusText}</span>
                  <span className="font-mono">{downloadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {successMessage && (
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}
          </div>

          {/* Storage Telemetry Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-950/40 border border-slate-800 rounded-xl space-y-1">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-sky-400" />
                <span>Saved Offline Maps</span>
              </div>
              <div className="text-xl font-bold font-mono text-slate-100">
                {stats.cachedTileCount.toLocaleString()} <span className="text-xs font-normal text-slate-400">tiles</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950/40 border border-slate-800 rounded-xl space-y-1">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Phone Storage Used</span>
              </div>
              <div className="text-xl font-bold font-mono text-slate-100">
                {stats.estimatedSizeMb} <span className="text-xs font-normal text-slate-400">MB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/80">
          <button
            onClick={handleClearCache}
            disabled={stats.cachedTileCount === 0}
            className={cn(
              "flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors",
              stats.cachedTileCount === 0 && "opacity-40 cursor-not-allowed hover:text-rose-400"
            )}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Tile Cache</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
}
