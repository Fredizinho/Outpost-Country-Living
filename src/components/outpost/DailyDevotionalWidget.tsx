import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Heart, Sparkles, Copy, Check, ChevronLeft, 
  ChevronRight, Calendar, Bookmark, BookmarkCheck, Share2, 
  Sprout, Sun, ShieldCheck, RefreshCw, Feather
} from 'lucide-react';
import { DAILY_DEVOTIONALS, DailyDevotional } from '@/data/outpostFourPillarsData';
import { cn } from '@/lib/utils';

export function DailyDevotionalWidget({ className }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState<string>('All');
  const [copied, setCopied] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('outpost_bookmarked_devotionals');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const themes = ['All', 'Nature Study', 'The Outpost Vision', 'Agricultural Parables', 'Health & Healing', 'Family Education'];

  const filteredDevotionals = useMemo(() => {
    if (selectedTheme === 'All') return DAILY_DEVOTIONALS;
    return DAILY_DEVOTIONALS.filter(d => d.theme === selectedTheme);
  }, [selectedTheme]);

  // Keep index within bounds when theme changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedTheme]);

  const currentDevotional: DailyDevotional = filteredDevotionals[currentIndex] || DAILY_DEVOTIONALS[0];

  const isBookmarked = bookmarkedIds.includes(currentDevotional.id);

  const toggleBookmark = () => {
    const updated = isBookmarked
      ? bookmarkedIds.filter(id => id !== currentDevotional.id)
      : [...bookmarkedIds, currentDevotional.id];
    setBookmarkedIds(updated);
    try {
      localStorage.setItem('outpost_bookmarked_devotionals', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleCopy = async () => {
    const textToCopy = `"${currentDevotional.egwQuote.text}"\n— ${currentDevotional.egwQuote.source}\n\nScripture: ${currentDevotional.scripture.verse} (${currentDevotional.scripture.reference})\n\nReflection: ${currentDevotional.practicalReflection}\n\nOutpost Country Living Sanctuary`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // ignore
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredDevotionals.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredDevotionals.length) % filteredDevotionals.length);
  };

  return (
    <section 
      id="country-living-devotional"
      aria-label="Daily Country Living Devotional"
      className={cn(
        "relative rounded-3xl bg-[#FAF8F5] dark:bg-[#0E1D14] border border-stone-200/90 dark:border-emerald-900/60 shadow-sm p-6 sm:p-8 md:p-10 transition-colors",
        className
      )}
    >
      {/* Top Header & Theme Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-emerald-900/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-800 dark:bg-emerald-700 text-amber-300 flex items-center justify-center shadow-inner">
            <Feather size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider text-emerald-800 dark:text-amber-300 uppercase">
                Spirit of Prophecy & Scripture
              </span>
              <span className="text-stone-300 dark:text-stone-600">•</span>
              <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Daily Country Living Manna</span>
            </div>
            <h2 className="serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              {currentDevotional.title}
            </h2>
          </div>
        </div>

        {/* Action Controls: Bookmark, Copy, Navigation */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={toggleBookmark}
            title={isBookmarked ? "Remove Bookmark" : "Bookmark this devotional"}
            className={cn(
              "p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer",
              isBookmarked 
                ? "bg-amber-100/80 dark:bg-amber-950/60 border-amber-300 dark:border-amber-600/60 text-amber-900 dark:text-amber-200" 
                : "bg-white dark:bg-[#14281D] border-stone-200 dark:border-emerald-900/60 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-emerald-950/60"
            )}
          >
            {isBookmarked ? <BookmarkCheck size={16} className="text-amber-700 dark:text-amber-400" /> : <Bookmark size={16} />}
            <span className="hidden md:inline">{isBookmarked ? "Saved" : "Save"}</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            title="Copy reflection to clipboard"
            className="p-2.5 rounded-xl border border-stone-200 dark:border-emerald-900/60 bg-white dark:bg-[#14281D] text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-emerald-950/60 transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check size={16} className="text-emerald-700 dark:text-emerald-400" /> : <Copy size={16} />}
            <span className="hidden md:inline">{copied ? "Copied" : "Share"}</span>
          </button>

          <div className="flex items-center gap-1 border-l border-stone-200 dark:border-emerald-900/60 pl-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={filteredDevotionals.length <= 1}
              title="Previous devotional"
              className="p-2 rounded-xl border border-stone-200 dark:border-emerald-900/60 bg-white dark:bg-[#14281D] text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-emerald-950/60 disabled:opacity-40 transition-all cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-mono font-medium text-stone-500 dark:text-stone-400 px-1">
              {currentIndex + 1}/{filteredDevotionals.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              disabled={filteredDevotionals.length <= 1}
              title="Next devotional"
              className="p-2 rounded-xl border border-stone-200 dark:border-emerald-900/60 bg-white dark:bg-[#14281D] text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-emerald-950/60 disabled:opacity-40 transition-all cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Theme Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar">
        {themes.map((theme) => (
          <button
            key={theme}
            type="button"
            onClick={() => setSelectedTheme(theme)}
            className={cn(
              "text-xs font-medium px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer",
              selectedTheme === theme
                ? "bg-emerald-900 dark:bg-emerald-700 text-white font-semibold shadow-xs"
                : "bg-white dark:bg-[#14281D] text-stone-600 dark:text-stone-300 hover:bg-stone-100/80 dark:hover:bg-emerald-950/60 border border-stone-200/80 dark:border-emerald-900/60"
            )}
          >
            {theme}
          </button>
        ))}
      </div>

      {/* Main Devotional Content Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDevotional.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Inspired Quote (Ellen G. White) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#14281D] border border-stone-200/90 dark:border-emerald-900/60 shadow-xs">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg">
                  {currentDevotional.theme}
                </span>
                <span className="text-xs font-medium text-stone-500 dark:text-stone-400 italic">
                  Ellen G. White Counsel
                </span>
              </div>

              <blockquote className="serif text-lg sm:text-xl text-stone-800 dark:text-stone-100 font-medium leading-relaxed italic border-l-2 border-amber-600/70 pl-4 py-1">
                "{currentDevotional.egwQuote.text}"
              </blockquote>
            </div>

            <div className="mt-5 pt-4 border-t border-stone-100 dark:border-emerald-900/40 flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                — {currentDevotional.egwQuote.source}
              </span>
              <span className="text-xs font-mono text-emerald-800 dark:text-amber-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                Book: {currentDevotional.egwQuote.book}
              </span>
            </div>
          </div>

          {/* Scripture & Practical Application Column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Scripture Anchor */}
            <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/40 flex flex-col gap-2">
              <div className="flex items-center justify-between text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <BookOpen size={14} className="text-amber-800 dark:text-amber-400" />
                  Scripture Anchor
                </span>
                <span className="font-semibold">{currentDevotional.scripture.reference}</span>
              </div>
              <p className="serif text-sm sm:text-base text-stone-800 dark:text-stone-200 italic leading-relaxed">
                "{currentDevotional.scripture.verse}"
              </p>
            </div>

            {/* Practical Daily Application */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#14281D] border border-stone-200/80 dark:border-emerald-900/60 flex flex-col gap-2 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <Sprout size={14} /> Practical Country Lesson
              </span>
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {currentDevotional.practicalReflection}
              </p>
            </div>

            {/* Prayer Prompt */}
            <div className="p-4 rounded-xl bg-stone-100/80 dark:bg-emerald-950/40 border border-stone-200/60 dark:border-emerald-900/40 flex items-start gap-2.5">
              <Heart size={15} className="text-emerald-800 dark:text-amber-300 mt-0.5 shrink-0" />
              <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 italic leading-relaxed">
                <strong className="not-italic text-stone-900 dark:text-stone-100 font-semibold">Prayer: </strong>
                {currentDevotional.prayerPrompt}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
