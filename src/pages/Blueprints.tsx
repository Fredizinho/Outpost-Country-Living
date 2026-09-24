import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, Heart, Sprout, Home, ShieldCheck } from 'lucide-react';
import { OutpostCenterBlueprints } from '@/components/outpost/OutpostCenterBlueprints';

export default function Blueprints() {
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
            <span className="hidden sm:inline text-stone-400">Pillar 4 Mission Blueprint</span>
            <Link
              to="/community"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 font-semibold border border-emerald-300/60 dark:border-emerald-800/60 hover:bg-emerald-200/80 transition-all"
            >
              <Heart size={13} className="text-emerald-600 dark:text-amber-400" />
              <span>Believer Directory</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 flex flex-col gap-8">
        {/* Context Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-950 to-stone-900 text-white shadow-xl flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/5 rounded-full -mr-32 -mt-32 pointer-events-none" />
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-700/60">
              The Divine Pattern for Outpost Ministry
            </span>
          </div>

          <h1 className="serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Outpost Center Blueprints
          </h1>

          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed max-w-3xl font-medium">
            "Repeatedly the Lord has instructed us that we are to work the cities from outpost centers. In these cities there are to be houses of worship, as memorials for God; but institutions for the publication of our literature, for the healing of the sick, and for the training of workers are to be established outside the cities."
            <span className="block text-amber-300 font-semibold text-xs mt-1">— Ellen G. White, Selected Messages, Book 2, p. 358</span>
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/15">
              <Home size={13} /> Family Outpost Base
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/15">
              <Building2 size={13} /> Lifestyle Sanitarium
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/15">
              <Sprout size={13} /> Agricultural Training Farm
            </span>
          </div>
        </div>

        {/* Blueprint Interactive Guide */}
        <div className="bg-white dark:bg-[#0D1D13] p-6 sm:p-8 rounded-3xl border border-stone-200/90 dark:border-emerald-900/60 shadow-md">
          <OutpostCenterBlueprints />
        </div>
      </main>
    </div>
  );
}
