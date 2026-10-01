import React, { useState } from 'react';
import {
  BookOpen,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Leaf,
} from 'lucide-react';
import { EDENIC_AGRICULTURE_GUIDES } from '@/data/outpostFourPillarsData';
import { CountryIcon, CountryIconName } from '@/components/icons/CountryIcons';
import { cn } from '@/lib/utils';
import { SkillStepVectorDiagram } from './SkillStepVectorDiagram';

const GUIDE_ILLUSTRATIONS: Record<string, CountryIconName> = {
  'soil-building': 'broadfork',
  'thermal-composting': 'compost',
  'crop-rotation': 'forage',
  'seasonal-calendar': 'season-dzinja',
  'sda-offgrid-sustenance-guild': 'granary',
};

export function EdenicAgricultureGuides({ className }: { className?: string }) {
  const [selectedGuideId, setSelectedGuideId] = useState<string>('soil-building');

  const activeGuide =
    EDENIC_AGRICULTURE_GUIDES.find((g) => g.id === selectedGuideId) || EDENIC_AGRICULTURE_GUIDES[0];
  const activeIllustration: CountryIconName = GUIDE_ILLUSTRATIONS[activeGuide.id] || 'soil';

  return (
    <section
      id="edenic-agriculture-guides"
      aria-label="Edenic Agriculture Field Manuals"
      className={cn('flex flex-col gap-6 text-stone-900 dark:text-stone-100 transition-colors', className)}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200/80 dark:border-emerald-900/50">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span className="font-bold tracking-widest text-emerald-800 dark:text-amber-300 uppercase">
              Pillar 3 Practical Skills
            </span>
            <span aria-hidden="true">·</span>
            <span>Cooperating with God&apos;s Laws in Nature</span>
          </div>
          <h2 className="serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50 mt-1">
            Edenic Agriculture Field Manuals
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm max-w-2xl mt-1 leading-relaxed">
            Step-by-step practical guides on building living soil, composting, companion planting, and navigating Malawi&apos;s distinct Dzinja and Chilimwe seasonal cycles without expensive commercial chemicals.
          </p>
        </div>
      </div>

      {/* Guide Navigation Tabs with Custom Vector Illustrations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {EDENIC_AGRICULTURE_GUIDES.map((guide) => {
          const isSelected = selectedGuideId === guide.id;
          const iconName = GUIDE_ILLUSTRATIONS[guide.id] || 'soil';

          return (
            <button
              key={guide.id}
              type="button"
              onClick={() => setSelectedGuideId(guide.id)}
              className={cn(
                'p-4 rounded-2xl text-left border transition-all flex flex-col justify-between gap-3 shadow-xs cursor-pointer group',
                isSelected
                  ? 'bg-emerald-900 dark:bg-emerald-800 text-white border-emerald-950 dark:border-emerald-700 ring-2 ring-emerald-800/30'
                  : 'bg-white dark:bg-[#0E1D14] hover:bg-stone-50 dark:hover:bg-emerald-950/60 border-stone-200 dark:border-emerald-900/60 text-stone-900 dark:text-stone-100'
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div
                  className={cn(
                    'w-14 h-14 rounded-xl p-1.5 flex items-center justify-center border shrink-0 transition-transform group-hover:scale-105',
                    isSelected
                      ? 'bg-[#07150E] border-emerald-500/40'
                      : 'bg-[#FAF6EE] dark:bg-[#07150E] border-stone-200/80 dark:border-emerald-900/60'
                  )}
                >
                  <CountryIcon name={iconName} className="w-full h-full object-contain" />
                </div>
                <span
                  className={cn(
                    'text-[10px] font-mono font-bold uppercase',
                    isSelected ? 'text-amber-300' : 'text-stone-500 dark:text-stone-400'
                  )}
                >
                  MANUAL
                </span>
              </div>

              <div>
                <h3
                  className={cn(
                    'text-sm font-bold leading-snug',
                    isSelected ? 'text-white' : 'text-stone-900 dark:text-stone-50'
                  )}
                >
                  {guide.title}
                </h3>
                <p
                  className={cn(
                    'text-[11px] leading-tight line-clamp-2 mt-1',
                    isSelected ? 'text-emerald-200/90' : 'text-stone-500 dark:text-stone-400'
                  )}
                >
                  {guide.subtitle}
                </p>
              </div>

              <div
                className={cn(
                  'text-[11px] font-medium pt-2 border-t',
                  isSelected
                    ? 'border-white/10 text-amber-300'
                    : 'border-stone-100 dark:border-emerald-900/40 text-emerald-800 dark:text-amber-300'
                )}
              >
                {guide.steps.length} Step Instructions →
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Field Manual Display Card */}
      <div className="rounded-3xl bg-white dark:bg-[#0E1D14] border border-stone-200/90 dark:border-emerald-900/60 shadow-xs p-6 sm:p-8 md:p-10 flex flex-col gap-8">
        {/* Title, Subtitle, Scriptural Principle + Artisan Illustration Plate */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pb-6 border-b border-stone-200/80 dark:border-emerald-900/40">
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-800 dark:text-amber-300 uppercase tracking-widest">
                Manual Reference: {activeGuide.counselReference}
              </span>
              <h3 className="serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50 mt-1">
                {activeGuide.title}
              </h3>
              <p className="text-stone-600 dark:text-stone-300 text-sm mt-1">{activeGuide.subtitle}</p>
            </div>

            {/* Scriptural Anchor */}
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-800/50 flex items-start gap-3">
              <BookOpen size={18} className="text-amber-800 dark:text-amber-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-amber-900 dark:text-amber-300 block">
                  BIBLICAL PRINCIPLE
                </span>
                <p className="serif text-xs sm:text-sm text-stone-800 dark:text-stone-200 italic leading-relaxed mt-0.5">
                  &ldquo;{activeGuide.scripturalPrinciple}&rdquo;
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-2xl bg-[#FAF6EE] dark:bg-[#07150E] border border-[#E6DFD1] dark:border-emerald-900/70 p-4 flex flex-col items-center justify-center relative overflow-hidden min-h-[180px]">
            <div className="absolute top-2.5 left-3 right-3 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-stone-500 dark:text-emerald-400/75">
              <span>Agronomy Plate</span>
              <span>No-Chemical Protocol</span>
            </div>
            <div className="w-full max-w-[200px] pt-4 flex items-center justify-center">
              <CountryIcon name={activeIllustration} className="w-full h-32 object-contain drop-shadow-xs" />
            </div>
          </div>
        </div>

        {/* Visual Agronomy Schematic & Ready Field Reference Image */}
        <SkillStepVectorDiagram
          skillId={activeGuide.id}
          title={activeGuide.title}
          category="Farming"
          steps={activeGuide.steps.map((s) => `${s.heading}: ${s.explanation}`)}
          compact
        />

        {/* Step-by-Step Instructions */}
        <div className="flex flex-col gap-5">
          <h4 className="text-base font-bold text-stone-900 dark:text-stone-50">
            Step-by-Step Field Instructions
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeGuide.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#14281D] border border-stone-200/80 dark:border-emerald-900/60 flex flex-col justify-between gap-3 shadow-2xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-800 dark:bg-emerald-700 text-white text-xs font-mono font-bold flex items-center justify-center shrink-0">
                      {step.stepNumber}
                    </span>
                    <h5 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                      {step.heading}
                    </h5>
                  </div>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    {step.explanation}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-[#0E1D14] border border-stone-200/90 dark:border-emerald-900/60 text-xs text-emerald-950 dark:text-stone-200 font-medium flex items-start gap-2">
                  <Sparkles size={14} className="text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-emerald-900 dark:text-amber-300">Practical Field Tip:</strong>{' '}
                    {step.practicalTip}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Pitfalls & Spiritual Object Lesson */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-stone-200/80 dark:border-emerald-900/40">
          {/* Common Mistakes */}
          <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-800/50 flex flex-col gap-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-rose-900 dark:text-rose-300 flex items-center gap-2">
              <AlertCircle size={15} className="text-rose-700 dark:text-rose-400" /> Common Pitfalls to Avoid
            </h5>
            <ul className="flex flex-col gap-2 text-xs text-stone-800 dark:text-stone-200">
              {activeGuide.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-rose-600 dark:text-rose-400 font-bold shrink-0">✕</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Spiritual Object Lesson */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/50 flex flex-col gap-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald-800 dark:text-emerald-400" /> Spiritual Object Lesson
            </h5>
            <p className="serif text-xs sm:text-sm text-stone-800 dark:text-stone-200 italic leading-relaxed">
              &ldquo;{activeGuide.objectLesson}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
