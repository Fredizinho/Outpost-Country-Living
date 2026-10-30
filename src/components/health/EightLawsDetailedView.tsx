import React, { useState } from 'react';
import {
  Droplets,
  UtensilsCrossed,
  Scale,
  Moon,
  Activity,
  Wind,
  Sun,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  FlaskConical,
  Brain,
  Layers,
  ChevronDown,
  Info
} from 'lucide-react';
import { EIGHT_LAWS_COMPREHENSIVE, EightLawDetail } from '@/data/eightLawsComprehensiveData';
import { Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  water: Droplets,
  nutrition: UtensilsCrossed,
  temperance: Scale,
  rest: Moon,
  exercise: Activity,
  air: Wind,
  sunlight: Sun,
  trust: Sparkles
};

export function EightLawsDetailedView() {
  const [expandedId, setExpandedId] = useState<string>('nutrition');

  const [checkedHabits, setCheckedHabits] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('outpost_eight_laws_habits_v2');
      return saved ? JSON.parse(saved) : { nutrition: true, water: true, rest: true, trust: true };
    } catch {
      return { nutrition: true, water: true, rest: true, trust: true };
    }
  });

  const toggleHabit = (id: string) => {
    setCheckedHabits((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('outpost_eight_laws_habits_v2', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const completedCount = EIGHT_LAWS_COMPREHENSIVE.filter((l) => checkedHabits[l.id]).length;

  return (
    <div className="flex flex-col gap-6 text-[var(--ink)]">
      {/* Header telemetry row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[var(--radius-control)] bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center font-serif font-bold text-[18px]">
            8
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-sans font-medium text-[var(--accent)]">
                The divine laws of life
              </span>
              <Badge status="Verified">Counsels on Health</Badge>
            </div>
            <h3 className="font-serif text-[18px] sm:text-[20px] font-bold text-[var(--ink)]">
              The eight natural laws in physiological and prophetic context
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[12px] font-mono tabular-nums text-[var(--ink-muted)] shrink-0">
          <span>{completedCount} of 8 practiced today</span>
          <div className="w-24 h-2 rounded-full bg-[var(--ground)] border border-[var(--border)] overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-300"
              style={{ width: `${(completedCount / 8) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* SPECIAL CALLOUT 1: TWO-MEAL AUTOPHAGY SCHEDULE */}
      <div className="p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-[var(--accent)]" />
            <h4 className="font-serif text-[16px] font-bold text-[var(--ink)]">
              The scientific two-meal digestive rhythm &amp; ~18-hour autophagy window
            </h4>
          </div>
          <Badge status="Verified">Cellular clearance</Badge>
        </div>

        <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed max-w-[80ch]">
          The digestive tract requires fixed periods of activity and complete rest. Consuming a nutrient-dense breakfast at 8:00 AM and a second wholesome meal at 2:00 PM establishes an 18-hour continuous digestive rest window that triggers cellular autophagy, clearing cellular debris and preventing gastrointestinal fermentation.
        </p>

        {/* Visual Timeline Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-1">
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-serif font-bold text-[var(--ink)]">Meal 1: Breakfast</span>
              <span className="font-mono tabular-nums text-[var(--accent)] font-semibold">08:00 AM</span>
            </div>
            <p className="text-[12px] text-[var(--ink-muted)]">
              Substantial meal: whole grains (mgaiwa, millet), seasonal fruits, and plant proteins.
            </p>
          </div>

          <div className="p-3.5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-1">
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-serif font-bold text-[var(--ink)]">Meal 2: Dinner</span>
              <span className="font-mono tabular-nums text-[var(--accent)] font-semibold">02:00 PM</span>
            </div>
            <p className="text-[12px] text-[var(--ink-muted)]">
              Second wholesome meal: cooked legumes (pigeon peas, beans), root crops, and vegetables.
            </p>
          </div>

          <div className="p-3.5 rounded-[var(--radius-control)] bg-emerald-950/10 dark:bg-emerald-950/30 border border-emerald-600/30 flex flex-col gap-1">
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-serif font-bold text-emerald-800 dark:text-emerald-300">
                18-Hour Autophagy Window
              </span>
              <span className="font-mono tabular-nums text-emerald-700 dark:text-emerald-300 font-semibold">
                02:00 PM &ndash; 08:00 AM
              </span>
            </div>
            <p className="text-[12px] text-[var(--ink-muted)]">
              Zero food, snacks, or caloric drinks. Stomach rests; hepatic clearance and cellular recycling peak.
            </p>
          </div>
        </div>
      </div>

      {/* SPECIAL CALLOUT 2: POTTENGER MULTI-GENERATIONAL STUDY & IRON SYNERGY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pottenger Cat Study */}
        <div className="p-4 sm:p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <FlaskConical size={16} className="text-amber-700 dark:text-amber-400" />
            <h4 className="font-serif text-[15px] font-bold text-[var(--ink)]">
              Dr. Francis Pottenger: Multi-generational heat-denatured food trials
            </h4>
          </div>
          <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
            In landmark multi-year biological research, Dr. Pottenger demonstrated that populations sustained on heat-processed, devitalized diets suffered progressive physical degeneration. By the 2nd and 3rd generations, subjects exhibited structural bone softening, craniofacial malformations, severe neurological irritability, and eventual complete reproductive failure—proving the vital necessity of fresh, unadulterated plant foods.
          </p>
        </div>

        {/* Non-Heme Iron + Vitamin C Synergy */}
        <div className="p-4 sm:p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <Brain size={16} className="text-sky-700 dark:text-sky-400" />
            <h4 className="font-serif text-[15px] font-bold text-[var(--ink)]">
              Non-heme plant iron + Ascorbic acid (Vitamin C) neuro-synergy
            </h4>
          </div>
          <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
            Non-heme iron from dark leafy greens (mpiru, bonongwe), legumes, and whole grains is required for hemoglobin and neuronal oxygenation. Pairing non-heme iron with ascorbic acid (fresh citrus, papaya, or pure orange juice) in the intestinal lumen dramatically multiplies bio-absorption efficiency, guarding the prefrontal cortex against hypoxia and cognitive deficits.
          </p>
        </div>
      </div>

      {/* EIGHT LAWS LIST (ACCORDION CARDS) */}
      <div className="flex flex-col gap-4">
        {EIGHT_LAWS_COMPREHENSIVE.map((law) => {
          const Icon = ICON_MAP[law.id] || Sparkles;
          const isExpanded = expandedId === law.id;
          const isPracticed = !!checkedHabits[law.id];

          return (
            <div
              key={law.id}
              className={cn(
                'rounded-[var(--radius-card)] bg-[var(--surface)] border transition-all duration-150 overflow-hidden shadow-xs',
                isExpanded ? 'border-[var(--accent)] ring-1 ring-[var(--accent)]/50' : 'border-[var(--border)] hover:border-[var(--accent)]/40'
              )}
            >
              {/* Card Header Bar */}
              <div
                onClick={() => setExpandedId(isExpanded ? '' : law.id)}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none hover:bg-[var(--ground)]/40 transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex items-center justify-center font-mono font-bold text-[14px] text-[var(--accent)] shrink-0">
                    {law.number}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Icon size={14} className="text-[var(--accent)] shrink-0" />
                      <h4 className="font-serif text-[16px] sm:text-[18px] font-bold text-[var(--ink)] truncate">
                        {law.name}
                      </h4>
                      <span className="text-[12px] font-mono text-[var(--ink-muted)] hidden sm:inline">
                        &middot; {law.scriptureRef}
                      </span>
                    </div>
                    <span className="text-[12px] text-[var(--ink-muted)] truncate">
                      {law.biblicalTitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Mark practiced habit button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleHabit(law.id);
                    }}
                    className={cn(
                      'px-3 py-1.5 rounded-[var(--radius-control)] text-[12px] font-sans font-semibold flex items-center gap-1.5 border transition-all cursor-pointer',
                      isPracticed
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-[var(--ground)] text-[var(--ink-muted)] border-[var(--border)] hover:border-[var(--accent)]'
                    )}
                  >
                    {isPracticed ? <CheckCircle2 size={13} /> : <Circle size={13} />}
                    <span className="hidden sm:inline">{isPracticed ? 'Practiced today' : 'Mark practiced'}</span>
                  </button>

                  <ChevronDown
                    size={16}
                    className={cn('text-[var(--ink-muted)] transition-transform duration-200', isExpanded && 'rotate-180')}
                  />
                </div>
              </div>

              {/* Expanded Card Details */}
              {isExpanded && (
                <div className="p-5 sm:p-6 border-t border-[var(--border)] bg-[var(--ground)]/30 flex flex-col gap-5 text-[13px] leading-relaxed">
                  {/* Scripture & Ellen White Prophetic Foundation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-[var(--radius-control)] bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 text-[var(--accent)] font-serif font-bold">
                        <BookOpen size={14} />
                        <span>Biblical foundation ({law.scriptureRef})</span>
                      </div>
                      <p className="italic text-[var(--ink)]">
                        &ldquo;{law.scriptureText}&rdquo;
                      </p>
                    </div>

                    <div className="p-4 rounded-[var(--radius-control)] bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 text-[var(--accent)] font-serif font-bold">
                        <Sparkles size={14} />
                        <span>Prophetic counsel ({law.propheticSource})</span>
                      </div>
                      <p className="italic text-[var(--ink)]">
                        &ldquo;{law.propheticQuote}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Physiological & Neuro-Nutritional Science */}
                  <div className="flex flex-col gap-2">
                    <h5 className="font-serif text-[14px] font-bold text-[var(--ink)]">
                      Physiological &amp; scientific mechanisms
                    </h5>
                    <p className="text-[var(--ink-muted)]">
                      {law.scientificMechanism}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h5 className="font-serif text-[14px] font-bold text-[var(--ink)]">
                      Neuro-nutritional &amp; micro-vascular impact
                    </h5>
                    <p className="text-[var(--ink-muted)]">
                      {law.neuroNutritionalImpact}
                    </p>
                  </div>

                  {/* Practical Protocol List */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-[var(--border)]">
                    <h5 className="font-serif text-[14px] font-bold text-[var(--ink)]">
                      Practical implementation guidelines
                    </h5>
                    <ul className="space-y-1.5">
                      {law.practicalGuidelines.map((g, i) => (
                        <li key={i} className="flex items-start gap-2 text-[var(--ink)]">
                          <span className="text-[var(--accent)] font-bold shrink-0">&middot;</span>
                          <span>{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Malawi Context Footer */}
                  <div className="p-3 bg-[var(--surface)] rounded-[var(--radius-control)] border border-[var(--border)] text-[12px] text-[var(--ink-muted)] flex items-start gap-2">
                    <Info size={14} className="text-[var(--accent)] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[var(--ink)]">Malawi outpost application: </strong>
                      {law.malawiContext}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
