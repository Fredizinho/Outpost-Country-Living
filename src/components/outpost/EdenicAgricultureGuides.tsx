import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sprout, BookOpen, AlertCircle, CheckCircle2, 
  Layers, Sun, CloudRain, ShieldCheck, ChevronDown, 
  ChevronUp, Sparkles, Droplets, Leaf
} from 'lucide-react';
import { 
  EDENIC_AGRICULTURE_GUIDES, 
  EdenicAgricultureGuide 
} from '@/data/outpostFourPillarsData';
import { cn } from '@/lib/utils';

export function EdenicAgricultureGuides({ className }: { className?: string }) {
  const [selectedGuideId, setSelectedGuideId] = useState<string>('soil-building');

  const activeGuide = EDENIC_AGRICULTURE_GUIDES.find(g => g.id === selectedGuideId) || EDENIC_AGRICULTURE_GUIDES[0];

  return (
    <section 
      id="edenic-agriculture-guides"
      aria-label="Edenic Agriculture Field Manuals"
      className={cn("flex flex-col gap-6", className)}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-widest text-emerald-800 uppercase bg-emerald-50 px-2.5 py-0.5 rounded-md">
              Pillar 3 Practical Skills
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-xs font-medium text-stone-500">Cooperating with God's Laws in Nature</span>
          </div>
          <h2 className="serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Edenic Agriculture Field Manuals
          </h2>
          <p className="text-stone-600 text-sm max-w-2xl mt-1 leading-relaxed">
            Step-by-step practical guides on building living soil, composting, companion planting, and navigating Malawi's distinct Dzinja and Chilimwe seasonal cycles without expensive commercial chemicals.
          </p>
        </div>
      </div>

      {/* Guide Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {EDENIC_AGRICULTURE_GUIDES.map((guide) => {
          const isSelected = selectedGuideId === guide.id;

          return (
            <button
              key={guide.id}
              type="button"
              onClick={() => setSelectedGuideId(guide.id)}
              className={cn(
                "p-4 rounded-2xl text-left border transition-all flex flex-col justify-between gap-2 shadow-xs",
                isSelected
                  ? "bg-emerald-900 text-white border-emerald-950 ring-2 ring-emerald-800/30"
                  : "bg-white hover:bg-stone-50 border-stone-200 text-stone-900"
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cn(
                  "w-8 h-8 rounded-xl flex items-center justify-center",
                  isSelected ? "bg-white/20 text-amber-300" : "bg-emerald-50 text-emerald-800"
                )}>
                  <Leaf size={16} />
                </span>
                <span className={cn(
                  "text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded",
                  isSelected ? "bg-white/20 text-emerald-100" : "bg-stone-100 text-stone-600"
                )}>
                  FIELD MANUAL
                </span>
              </div>

              <div>
                <h3 className={cn("text-sm font-bold leading-snug", isSelected ? "text-white" : "text-stone-900")}>
                  {guide.title}
                </h3>
                <p className={cn("text-[11px] leading-tight line-clamp-2 mt-1", isSelected ? "text-emerald-200/90" : "text-stone-500")}>
                  {guide.subtitle}
                </p>
              </div>

              <div className={cn("text-[11px] font-medium pt-2 border-t", isSelected ? "border-white/10 text-amber-300" : "border-stone-100 text-emerald-800")}>
                {guide.steps.length} Step Instructions →
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Field Manual Display Card */}
      <div className="rounded-3xl bg-white border border-stone-200/90 shadow-xs p-6 sm:p-8 md:p-10 flex flex-col gap-8">
        {/* Title, Subtitle, Scriptural Principle */}
        <div className="flex flex-col gap-4 pb-6 border-b border-stone-200/80">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
              Manual Reference: {activeGuide.counselReference}
            </span>
            <h3 className="serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              {activeGuide.title}
            </h3>
            <p className="text-stone-600 text-sm mt-1">
              {activeGuide.subtitle}
            </p>
          </div>

          {/* Scriptural Anchor */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 flex items-start gap-3">
            <BookOpen size={18} className="text-amber-800 mt-0.5 shrink-0" />
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-amber-900 block">
                BIBLICAL PRINCIPLE
              </span>
              <p className="serif text-xs sm:text-sm text-stone-800 italic leading-relaxed mt-0.5">
                "{activeGuide.scripturalPrinciple}"
              </p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="flex flex-col gap-5">
          <h4 className="text-base font-bold text-stone-900">
            Step-by-Step Field Instructions
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeGuide.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 flex flex-col justify-between gap-3 shadow-2xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs font-mono font-bold flex items-center justify-center shrink-0">
                      {step.stepNumber}
                    </span>
                    <h5 className="text-sm font-bold text-stone-900">
                      {step.heading}
                    </h5>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {step.explanation}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-stone-200/90 text-xs text-emerald-950 font-medium flex items-start gap-2">
                  <Sparkles size={14} className="text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-emerald-900">Practical Field Tip:</strong> {step.practicalTip}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Pitfalls & Spiritual Object Lesson */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-stone-200/80">
          {/* Common Mistakes */}
          <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200/60 flex flex-col gap-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-2">
              <AlertCircle size={15} className="text-rose-700" /> Common Pitfalls to Avoid
            </h5>
            <ul className="flex flex-col gap-2 text-xs text-stone-800">
              {activeGuide.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-rose-600 font-bold shrink-0">✕</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Spiritual Object Lesson */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 flex flex-col gap-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald-800" /> Spiritual Object Lesson
            </h5>
            <p className="serif text-xs sm:text-sm text-stone-800 italic leading-relaxed">
              "{activeGuide.objectLesson}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
