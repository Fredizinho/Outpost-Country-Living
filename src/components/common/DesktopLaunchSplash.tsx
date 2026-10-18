import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles } from 'lucide-react';
import { usePlatform } from '@/lib/platform';

export interface DesktopLaunchSplashProps {
  onReady?: () => void;
  minDurationMs?: number;
}

/**
 * Desktop Launch Splash Screen
 * Shown briefly on launch while session state, open tabs,
 * and offline databases are hydrated into memory.
 */
export function DesktopLaunchSplash({
  onReady,
  minDurationMs = 650,
}: DesktopLaunchSplashProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState('Restoring workspace session...');
  const { isDesktop, os } = usePlatform();

  useEffect(() => {
    // Stage 1: Reading stored tabs and active district
    const t1 = setTimeout(() => {
      setProgress(55);
      setStatusText('Hydrating offline agro-district registry...');
    }, 200);

    // Stage 2: Finalizing session state
    const t2 = setTimeout(() => {
      setProgress(95);
      setStatusText('Session restored');
    }, 450);

    // Stage 3: Smooth dismissal
    const t3 = setTimeout(() => {
      setProgress(100);
      setIsVisible(false);
      onReady?.();
    }, minDurationMs);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [minDurationMs, onReady]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="outpost-launch-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.22, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#071A10] text-[#FEF3C7] select-none font-chrome"
          aria-live="polite"
          aria-label="Loading Outpost workspace"
        >
          {/* Subtle noise/grid atmosphere */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-black pointer-events-none" />

          <motion.div
            initial={{ scale: 0.96, opacity: 0.9 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center"
          >
            {/* Outpost Emblem */}
            <div className="relative mb-4 flex items-center justify-center w-16 h-16 rounded-[10px] bg-[#0D2818] border border-amber-500/30 shadow-lg">
              <Compass size={32} className="text-amber-400 animate-spin-slow" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#071A10]" />
            </div>

            {/* Window Title & Tagline */}
            <h1 className="text-xl font-bold tracking-tight text-white mb-0.5">
              Outpost
            </h1>
            <p className="text-[12px] text-stone-400 mb-6">
              Malawi Country Living &amp; Homestead Workspace
            </p>

            {/* Progress Bar */}
            <div className="w-56 h-1 bg-stone-800 rounded-full overflow-hidden mb-2.5">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full"
                initial={{ width: '10%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
            </div>

            {/* Status Line */}
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-stone-400">
              <Sparkles size={11} className="text-amber-400 shrink-0" />
              <span className="truncate">{statusText}</span>
            </div>
          </motion.div>

          {/* Bottom Host Badge */}
          <div className="absolute bottom-4 text-[11px] font-mono text-stone-500">
            {isDesktop ? `Desktop Client · ${os.toUpperCase()}` : 'Outpost Workspace'}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DesktopLaunchSplash;
