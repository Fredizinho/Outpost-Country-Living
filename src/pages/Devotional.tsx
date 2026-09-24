import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Feather, Heart, Sparkles } from 'lucide-react';
import { DailyDevotionalWidget } from '@/components/outpost/DailyDevotionalWidget';

export default function Devotional() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] dark:bg-[#09150E] text-stone-800 dark:text-stone-100 flex flex-col pb-24 transition-colors">
      {/* Top Banner & Breadcrumb */}
      <section className="border-b border-stone-200/80 dark:border-emerald-950/80 bg-white/70 dark:bg-[#0C1A12]/80 backdrop-blur-md sticky top-16 z-20 px-4 sm:px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 dark:text-stone-300 hover:text-emerald-800 dark:hover:text-amber-300 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Sanctuary Home</span>
          </Link>

          <div className="flex items-center gap-2 text-xs">
            <span className="hidden sm:inline text-stone-400">Pillar 1 Spiritual Foundation</span>
            <Link
              to="/tracker"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 font-semibold border border-emerald-300/60 dark:border-emerald-800/60 hover:bg-emerald-200/80 transition-all"
            >
              <Sparkles size={13} className="text-emerald-600 dark:text-amber-400" />
              <span>Readiness Ledger</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 flex flex-col gap-8">
        {/* Context Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-50/90 via-white dark:from-[#0E1F15] dark:via-[#09170F] to-emerald-50/50 border border-amber-200/80 dark:border-emerald-800/50 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-sm">
              📖
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
              Spirit of Prophecy & Scripture Treasury
            </span>
          </div>

          <h1 className="serif text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-50 leading-tight">
            Daily Country Living Devotionals
          </h1>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-medium leading-relaxed">
            Begin each day anchored in God's Word and the inspired writings of Ellen G. White. Discover how practical gardening, country air, and sacrificial service develop godly character and prepare families for eternity.
          </p>
        </div>

        {/* The Devotional Widget */}
        <div className="bg-white dark:bg-[#0D1D13] p-6 sm:p-8 rounded-3xl border border-stone-200/90 dark:border-emerald-900/60 shadow-md">
          <DailyDevotionalWidget />
        </div>
      </main>
    </div>
  );
}
