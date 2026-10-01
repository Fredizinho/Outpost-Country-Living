import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X, BookOpen, Pause } from 'lucide-react';

interface CountryLivingIntroQuoteProps {
  forceShow?: boolean;
  onClose?: () => void;
}

export function CountryLivingIntroQuote({ forceShow = false, onClose }: CountryLivingIntroQuoteProps) {
  // Follow strict no-arrival-popup rule: only open when explicitly triggered by user interaction (forceShow)
  const [isVisible, setIsVisible] = useState(Boolean(forceShow));
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  isPausedRef.current = isPaused;

  useEffect(() => {
    if (forceShow) {
      setProgress(0);
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [forceShow]);

  useEffect(() => {
    if (!isVisible) return;

    const interval = 50;
    const totalTime = 6500;
    const step = (interval / totalTime) * 100;

    const timer = setInterval(() => {
      if (isPausedRef.current) return;

      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          handleDismiss();
          return 100;
        }
        return prev + step;
      });
    }, interval);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/80 backdrop-blur-md"
        onClick={handleDismiss}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative max-w-2xl w-full rounded-3xl bg-[#FAF7F0] dark:bg-[#0B1911] p-7 sm:p-10 border border-stone-200 dark:border-emerald-800/60 shadow-2xl text-stone-900 dark:text-stone-100 overflow-hidden"
        >
          {/* Top progress indicator bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-stone-200 dark:bg-emerald-950">
            <div
              className="h-full bg-emerald-700 dark:bg-amber-400 transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls */}
          <div className="absolute top-4 right-4 flex items-center gap-3">
            {isPaused && (
              <span className="inline-flex items-center gap-1 text-xs font-mono text-stone-500 dark:text-stone-400">
                <Pause size={11} /> Paused
              </span>
            )}
            <button
              onClick={handleDismiss}
              aria-label="Close welcome quote"
              className="p-2 rounded-xl text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center text-center gap-5 pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 dark:text-emerald-400">
              <span>Spirit of Prophecy Counsel</span>
              <span aria-hidden="true">·</span>
              <span>Country Living Sanctuary</span>
            </div>

            <div className="flex flex-col gap-3 max-w-xl">
              <p className="font-display text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 leading-relaxed">
                “Out of the cities, out of the cities!—this is the message the Lord has been giving me... Lead the people out of the cities into the country, where they may obtain a piece of land, and make a home for themselves and their children.”
              </p>

              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-amber-800 dark:text-amber-300">
                <BookOpen size={14} />
                <span>Ellen G. White · Country Living, p. 9</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-md font-sans leading-relaxed">
              Welcome to the Seventh-day Adventist Country Living Guide & Land GIS for Malawi. Explore verified district hydrology, Katondo soil chemistry, and off-grid engineering tools.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={handleDismiss}
                className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Continue to Country Sanctuary</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
