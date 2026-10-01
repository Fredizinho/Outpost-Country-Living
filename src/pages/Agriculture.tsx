import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sprout, Leaf, Sun, Droplets, Calendar } from 'lucide-react';
import { EdenicAgricultureGuides } from '@/components/outpost/EdenicAgricultureGuides';
import { SoilStrataBlueprint } from '@/components/home/SoilStrataBlueprint';
import { CountryIcon } from '@/components/icons/CountryIcons';

export default function Agriculture() {
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
            <span className="hidden sm:inline text-stone-400">Pillar 3 Practical Skills</span>
            <Link
              to="/seasons"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 font-semibold border border-emerald-300/60 dark:border-emerald-800/60 hover:bg-emerald-200/80 transition-all"
            >
              <Calendar size={13} className="text-emerald-600 dark:text-amber-400" />
              <span>Planting Almanac</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 flex flex-col gap-8">
        {/* Context Card with Hero Illustration Plate */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-900 via-[#0B2317] to-stone-900 text-white shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/5 rounded-full -mr-32 -mt-32 pointer-events-none" />

          <div className="lg:col-span-8 flex flex-col gap-3 relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-700/60">
                God-Honoring Organic Husbandry
              </span>
            </div>

            <h1 className="serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Edenic Agriculture Field Manuals
            </h1>

            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed max-w-3xl font-medium">
              &ldquo;A return to simpler methods will be appreciated by the children, and the youth will find healthy, happy employment in agricultural pursuits.&rdquo; Cultivate rich red loam soils with compost, grass mulching, contour swales, and heirloom seeds tailored for Malawi&apos;s highland and valley climates.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/15">
                <Leaf size={13} /> Living Soil &amp; Composting
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/15">
                <Droplets size={13} /> Gravity Swales &amp; Mulch
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/15">
                <Sun size={13} /> Rainy &amp; Dry Season Cycles
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-2xl bg-[#06140D]/90 border border-emerald-500/30 p-4 flex flex-col items-center justify-center relative z-10 shadow-inner">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300/90 mb-1">
              3×3×3ft Deep Pit &amp; Humus
            </span>
            <CountryIcon name="soil" className="w-full max-w-[210px] h-36 object-contain" />
          </div>
        </div>

        {/* The Guides Widget */}
        <div className="bg-white dark:bg-[#0D1D13] p-6 sm:p-8 rounded-3xl border border-stone-200/90 dark:border-emerald-900/60 shadow-md">
          <EdenicAgricultureGuides />
        </div>

        {/* Interactive Soil & Aquifer Strata Cross-Section */}
        <SoilStrataBlueprint />
      </main>
    </div>
  );
}
