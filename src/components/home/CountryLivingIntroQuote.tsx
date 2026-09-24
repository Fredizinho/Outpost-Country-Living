import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X, Sparkles, BookOpen, Pause, Play } from 'lucide-react';

interface CountryLivingIntroQuoteProps {
  forceShow?: boolean;
  onClose?: () => void;
}

export function CountryLivingIntroQuote({ forceShow = false, onClose }: CountryLivingIntroQuoteProps) {
  const [isVisible, setIsVisible] = useState(() => {
    if (forceShow) return true;
    try {
      const alreadyShown = sessionStorage.getItem('outpost_welcome_quote_seen');
      return !alreadyShown;
    } catch {
      return true;
    }
  });

  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  isPausedRef.current = isPaused;

  useEffect(() => {
    if (!isVisible) return;

    // Minimum display duration: 6.5 seconds (exceeds the 5s requirement)
    const interval = 50;
    const totalTime = 6500;
    const step = (interval / totalTime) * 100;

    const timer = setInterval(() => {
      if (isPausedRef.current) return;

      setProgress(prev => {
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
    try {
      sessionStorage.setItem('outpost_welcome_quote_seen', 'true');
    } catch {
      // ignore
    }
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
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/80 backdrop-blur-md"
        onClick={handleDismiss}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: -10 }}
          transition={{ type: 'spring', damping: 26, stiffness: 240 }}
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative max-w-2xl w-full rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F0] to-[#F5EFE3] dark:from-[#0E1F16] dark:via-[#091710] dark:to-[#07130D] p-7 sm:p-10 border border-amber-300/80 dark:border-emerald-700/60 shadow-2xl text-stone-800 dark:text-stone-100 overflow-hidden"
        >
          {/* Subtle warm halo glow */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-amber-300/20 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-400/20 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top progress indicator bar (6.5 seconds duration) */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-900/10 dark:bg-emerald-950">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-600 transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls: Pause status badge & Close button */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {isPaused && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-amber-300/60">
                <Pause size={10} /> Paused
              </span>
            )}
            <button
              onClick={handleDismiss}
              aria-label="Close welcome quote"
              className="p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-all cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center text-center gap-5 pt-2">
            
            {/* High-Quality Vector Emblem (Dove of Peace & Sprout Crest) */}
            <motion.div
              initial={{ scale: 0.8, rotate: -4 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: 'spring', damping: 15 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 dark:from-emerald-950 dark:to-emerald-900 border border-amber-300/80 dark:border-emerald-700/80 flex items-center justify-center shadow-md p-2.5 relative group"
            >
              <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Radiant sun glow behind */}
                <circle cx="24" cy="20" r="10" fill="#FDE68A" fillOpacity="0.6" />
                {/* Mountain ridges */}
                <path d="M8 38L18 24L26 34L33 25L40 38H8Z" fill="#047857" opacity="0.9" />
                <path d="M14 38L24 26L34 38H14Z" fill="#10B981" />
                {/* Soaring Dove silhouette */}
                <path d="M24 16C20 11 14 12 11 15C14 16.5 17 16.5 20 17L24 19L28 17C31 16.5 34 16.5 37 15C34 12 28 11 24 16Z" fill="#FFFFFF" stroke="#D97706" strokeWidth="0.8" />
                <circle cx="24" cy="13" r="1.8" fill="#FFFFFF" stroke="#D97706" strokeWidth="0.6" />
                {/* Olive branch in beak */}
                <path d="M25 14C27 13 29 13.5 30 14" stroke="#059669" strokeWidth="1" strokeLinecap="round" />
                <circle cx="29" cy="13.5" r="0.8" fill="#10B981" />
              </svg>
            </motion.div>

            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/70 dark:bg-emerald-950/70 border border-amber-300/70 dark:border-emerald-700/60 text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
              <Sparkles size={12} className="text-amber-600 dark:text-amber-400" />
              <span>A Timely Message for God's People</span>
            </div>

            {/* Welcoming Inspired Quote */}
            <div className="flex flex-col gap-3 max-w-xl">
              <p className="serif text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-50 leading-relaxed italic">
                “Out of the cities, out of the cities!—this is the message the Lord has been giving me... Lead the people out of the cities into the country, where they may obtain a piece of land, and make a home for themselves and their children.”
              </p>
              
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-amber-900 dark:text-amber-300">
                <BookOpen size={14} />
                <span>Ellen G. White — Country Living, p. 9</span>
              </div>
            </div>

            {/* Brief welcoming note */}
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-md font-sans">
              Welcome to the Seventh-day Adventist Country Living Guide for Malawi. May this platform be a peaceful light on your journey to the countryside.
            </p>

            {/* Enter Button */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleDismiss}
                className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Enter Country Sanctuary</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

