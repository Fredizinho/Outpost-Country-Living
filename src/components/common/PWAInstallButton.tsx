import React, { useState, useEffect } from 'react';
import { Download, Monitor, Smartphone, CheckCircle2, X, Terminal, HardDrive, Share } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsInstalled(isStandalone);

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

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
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const install = async () => {
    if (!deferredPrompt) return false;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setDeferredPrompt(null);
      return true;
    }
    return false;
  };

  return {
    isInstallable: !!deferredPrompt,
    isInstalled,
    isIOS,
    install,
  };
}

export const PWAInstallButton: React.FC<{ className?: string }> = ({ className }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);

  if (isInstalled) {
    return null;
  }

  const handleTrigger = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (!accepted) setShowModal(true);
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleTrigger}
        className={cn(
          'flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-emerald-800/90 hover:bg-emerald-700 text-emerald-100 hover:text-white border border-emerald-600/50 text-xs font-sans font-bold transition-all cursor-pointer shadow-xs',
          className
        )}
        title="Install Outpost on PC Desktop or Android Mobile (.APK / PWA)"
      >
        <Download size={14} className="text-amber-300 shrink-0" />
        <span className="hidden xl:inline">Install App</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl bg-[#0B2517] border border-emerald-800 text-white p-6 sm:p-8 shadow-2xl flex flex-col gap-5 relative my-8">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Install Guide"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col gap-1">
              <span className="text-caption font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <HardDrive size={13} /> Offline-Ready Desktop &amp; Mobile Deployment
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Install Outpost on PC Desktop &amp; Android Mobile
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/85 leading-relaxed">
                All 28 Malawi district dossiers, 38+ crops, FAO soil swatches, engineering calculators, and SVG diagrams are cached locally for offline field use.
              </p>
            </div>

            {isInstallable && (
              <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-400/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-sm text-amber-200">One-Click Native Browser Install Ready</h4>
                  <p className="text-xs text-emerald-100/90">
                    Click to install a standalone desktop window or mobile home-screen app immediately.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={install}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider shrink-0 cursor-pointer"
                >
                  Install Now
                </button>
              </div>
            )}

            {isIOS && (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-700/60 flex flex-col gap-2">
                <h4 className="font-bold text-sm text-amber-300 flex items-center gap-2">
                  <Share size={15} /> Install on iPhone / iPad (Safari)
                </h4>
                <p className="text-xs text-stone-200 leading-relaxed">
                  1. Tap the <strong>Share</strong> button in your Safari toolbar.<br />
                  2. Scroll down and tap <strong>Add to Home Screen</strong> to launch Outpost full-screen offline.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#07160E] border border-emerald-900 flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <Monitor size={16} />
                  <span>1. Full PC Desktop App (Windows / Mac / Linux)</span>
                </div>
                <p className="text-stone-300 leading-relaxed">
                  • <strong>Instant PWA Window:</strong> Click the <strong>Install icon</strong> in Chrome/Edge’s address bar (top right) to install as a standalone PC app.<br />
                  • <strong>Standalone .EXE / .DMG Build:</strong> Run <code className="font-mono text-amber-200">npm run build</code> and package <code className="font-mono text-amber-200">dist/</code> with Tauri v2 or Electron (<code className="font-mono text-amber-200">dist/server.cjs</code>).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#07160E] border border-emerald-900 flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                  <Smartphone size={16} />
                  <span>2. Android Mobile App (.APK / .AAB)</span>
                </div>
                <p className="text-stone-300 leading-relaxed">
                  • <strong>Direct Android Install:</strong> Open in Chrome on Android and tap <strong>Add to Home Screen / Install App</strong>.<br />
                  • <strong>Signed .APK Package:</strong> Use <strong>PWABuilder.com</strong> (pointing to this app’s URL &amp; Web Manifest) or Capacitor (<code className="font-mono text-emerald-300">npx cap add android</code>) to export a signed <code className="font-mono text-emerald-300">.apk</code>.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-emerald-900/80 text-xs">
              <span className="text-emerald-300 font-mono flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Manifest &amp; Workbox Service Worker Active
              </span>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
