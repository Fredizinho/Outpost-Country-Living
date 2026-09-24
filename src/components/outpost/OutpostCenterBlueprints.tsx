import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, BookOpen, Heart, Sprout, 
  CheckCircle2, Clock, MapPin, Sparkles, 
  ShieldCheck, ArrowRight, Home, Stethoscope
} from 'lucide-react';
import { 
  OUTPOST_BLUEPRINTS, 
  OutpostBlueprint 
} from '@/data/outpostFourPillarsData';
import { cn } from '@/lib/utils';

export function OutpostCenterBlueprints({ className }: { className?: string }) {
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>('home-school-blueprint');

  const activeBlueprint = OUTPOST_BLUEPRINTS.find(b => b.id === selectedBlueprintId) || OUTPOST_BLUEPRINTS[0];

  return (
    <section 
      id="outpost-center-blueprints"
      aria-label="Outpost Center Blueprints"
      className={cn("flex flex-col gap-6", className)}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200/80 dark:border-emerald-900/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-wider text-emerald-800 dark:text-amber-300 uppercase bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-md">
              Pillar 4 Mission
            </span>
            <span className="text-stone-300 dark:text-stone-600">•</span>
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">The Inspired Outpost Center Model</span>
          </div>
          <h2 className="serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50 mt-1">
            Outpost Center Blueprints & Operational Guides
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mt-1.5 leading-relaxed">
            Country living is not selfish retreat; it is establishing beacons of health and light from which to minister to suffering cities and surrounding villages.
          </p>
        </div>
      </div>

      {/* Blueprint Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {OUTPOST_BLUEPRINTS.map((bp) => {
          const isSelected = selectedBlueprintId === bp.id;

          return (
            <button
              key={bp.id}
              type="button"
              onClick={() => setSelectedBlueprintId(bp.id)}
              className={cn(
                "p-4 rounded-2xl text-left border transition-all flex flex-col justify-between gap-2.5 shadow-xs cursor-pointer",
                isSelected
                  ? "bg-emerald-900 dark:bg-emerald-800 text-white border-emerald-950 dark:border-emerald-700 ring-2 ring-emerald-800/30"
                  : "bg-white dark:bg-[#0E1D14] hover:bg-stone-50 dark:hover:bg-emerald-950/60 border-stone-200 dark:border-emerald-900/60 text-stone-900 dark:text-stone-100"
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cn(
                  "w-8 h-8 rounded-xl flex items-center justify-center",
                  isSelected ? "bg-white/20 text-amber-300" : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300"
                )}>
                  {bp.type === 'Home School' && <Home size={16} />}
                  {bp.type === 'Small Sanitarium' && <Building2 size={16} />}
                  {bp.type === 'Treatment Rooms' && <Stethoscope size={16} />}
                  {bp.type === 'Agricultural Training' && <Sprout size={16} />}
                </span>
                <span className={cn(
                  "text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded",
                  isSelected ? "bg-white/20 text-emerald-100" : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300"
                )}>
                  {bp.type}
                </span>
              </div>

              <div>
                <h3 className={cn("text-xs sm:text-sm font-bold leading-snug", isSelected ? "text-white" : "text-stone-900 dark:text-stone-50")}>
                  {bp.title}
                </h3>
                <p className={cn("text-xs leading-relaxed line-clamp-2 mt-1", isSelected ? "text-emerald-200/90" : "text-stone-500 dark:text-stone-400")}>
                  {bp.purpose}
                </p>
              </div>

              <div className={cn("text-xs font-semibold pt-2 border-t", isSelected ? "border-white/10 text-amber-300" : "border-stone-100 dark:border-emerald-900/40 text-emerald-800 dark:text-amber-300")}>
                View Model Specifications →
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Blueprint Detail Card */}
      <div className="rounded-3xl bg-white dark:bg-[#0E1D14] border border-stone-200/90 dark:border-emerald-900/60 shadow-xs p-6 sm:p-8 md:p-10 flex flex-col gap-8">
        {/* Title, Purpose, and Counsel Quote */}
        <div className="flex flex-col gap-4 pb-6 border-b border-stone-200/80 dark:border-emerald-900/40">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded">
                {activeBlueprint.type} Operational Blueprint
              </span>
              <h3 className="serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50 mt-1">
                {activeBlueprint.title}
              </h3>
              <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base mt-1 max-w-3xl leading-relaxed">
                {activeBlueprint.purpose}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 dark:bg-[#14281D] border border-stone-200 dark:border-emerald-900/60 self-start text-xs">
              <span className="text-stone-500 dark:text-stone-400 block">Recommended Acreage:</span>
              <strong className="text-emerald-900 dark:text-amber-300 font-mono text-sm">{activeBlueprint.recommendedAcreage}</strong>
            </div>
          </div>

          {/* Spirit of Prophecy Foundation */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-800/60 flex items-start gap-3">
            <BookOpen size={18} className="text-amber-800 dark:text-amber-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-amber-900 dark:text-amber-300 block">
                SPIRIT OF PROPHECY COUNSEL
              </span>
              <p className="serif text-xs sm:text-sm text-stone-800 dark:text-stone-200 italic leading-relaxed mt-0.5">
                "{activeBlueprint.counselQuote.text}"
              </p>
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300 block mt-1">
                — {activeBlueprint.counselQuote.source}
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Specs: Key Features & Daily Rhythm */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Key Architectural & Facility Features */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h4 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-50 flex items-center gap-2">
              <Building2 size={16} className="text-emerald-800 dark:text-emerald-400" /> Key Architectural & Facility Features
            </h4>

            <div className="flex flex-col gap-2.5">
              {activeBlueprint.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#14281D] border border-stone-200/80 dark:border-emerald-900/60 flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-800 dark:bg-emerald-700 text-white text-[11px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            {/* Operational Steps */}
            <div className="mt-4 pt-4 border-t border-stone-100 dark:border-emerald-900/40 flex flex-col gap-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                Action Steps for Establishment:
              </h5>
              <ul className="flex flex-col gap-1.5 text-xs text-stone-700 dark:text-stone-300">
                {activeBlueprint.operationalSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <CheckCircle2 size={14} className="text-emerald-800 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Daily Rhythm & Schedule */}
          <div className="lg:col-span-5 flex flex-col gap-4 bg-[#FAF8F5] dark:bg-[#14281D] p-5 sm:p-6 rounded-2xl border border-stone-200 dark:border-emerald-900/60">
            <h4 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-50 flex items-center gap-2">
              <Clock size={16} className="text-emerald-800 dark:text-emerald-400" /> Harmonious Daily Rhythm
            </h4>

            <div className="flex flex-col gap-2.5">
              {activeBlueprint.dailyRhythm.map((item, idx) => {
                const parts = item.split(': ');
                const time = parts[0];
                const activity = parts.slice(1).join(': ');

                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white dark:bg-[#0E1D14] border border-stone-200 dark:border-emerald-900/60 text-xs flex flex-col gap-0.5"
                  >
                    <span className="text-xs font-mono font-bold text-emerald-800 dark:text-amber-300">
                      {time}
                    </span>
                    <span className="text-stone-800 dark:text-stone-200 font-medium">
                      {activity}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="text-xs text-stone-500 dark:text-stone-400 italic pt-2 border-t border-stone-200 dark:border-emerald-900/40">
              "Regularity in all things is essential. Physical labor combined with mental study preserves health and clears the mind."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
