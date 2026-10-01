import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { PropertySuitabilityCalculator } from '@/components/outpost/PropertySuitabilityCalculator';

export default function PropertyEvaluator() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] dark:bg-[#09150E] text-stone-800 dark:text-stone-100 flex flex-col pb-24 transition-colors">
      {/* Top Breadcrumb Bar (Non-sticky to prevent header collision) */}
      <section className="border-b border-stone-200/80 dark:border-emerald-950/80 bg-white/60 dark:bg-[#0C1A12]/60 px-4 sm:px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 dark:text-stone-300 hover:text-emerald-800 dark:hover:text-amber-300 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Sanctuary Home</span>
          </Link>

          <div className="flex items-center gap-2 text-xs">
            <span className="hidden sm:inline text-stone-400">Pillar 2 Scouting Tool</span>
            <Link
              to="/scout-map"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 font-semibold border border-emerald-300/60 dark:border-emerald-800/60 hover:bg-emerald-200/80 transition-all"
            >
              <Compass size={13} className="text-emerald-600 dark:text-amber-400" />
              <span>Open Land Map</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Tool Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 flex flex-col gap-8">
        {/* Page Context Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-50/80 via-white dark:from-[#0E2016] dark:via-[#0A1810] to-emerald-50/40 dark:to-[#08150E] border border-amber-200/70 dark:border-emerald-800/50 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-sm">
              ⚖️
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
              Ellen G. White Property Evaluation Protocol
            </span>
          </div>

          <h1 className="serif text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-50 leading-tight">
            100-Point Land Suitability Evaluator
          </h1>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-medium leading-relaxed max-w-3xl">
            Evaluate prospective country property across Malawi against the inspired benchmarks outlined in <em>Country Living</em>, <em>Ministry of Healing</em>, and <em>Testimonies</em>. Assess perennial water, Katondo topsoil depth, natural distance from city vice, scenic elevation, and mission accessibility.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/60">
              <ShieldCheck size={13} /> 5 Inspired Benchmarks
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
              <Sparkles size={13} className="text-amber-500" /> Instant Suitability Score
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
              <BookOpen size={13} className="text-emerald-600" /> Full Spirit of Prophecy Citations
            </span>
          </div>
        </div>

        {/* The Full Interactive Calculator */}
        <div className="bg-white dark:bg-[#0D1D13] p-6 sm:p-8 rounded-3xl border border-stone-200/90 dark:border-emerald-900/60 shadow-md">
          <PropertySuitabilityCalculator />
        </div>
      </main>
    </div>
  );
}
