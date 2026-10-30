import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  Circle,
  MapPin,
  Users,
  BookOpen,
  Calculator,
  Compass,
  ArrowRight,
  ShieldCheck,
  Check,
  Sparkles,
  Info,
  Layers,
  Sprout,
  Hammer,
  Droplets,
  HeartPulse
} from 'lucide-react';
import {
  PageHeader,
  Badge,
  Chip,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  useToast
} from '@/components/ui';
import { useActiveHomesteadDistrict } from '@/lib/activeDistrictSync';
import { cn } from '@/lib/utils';

const CHECKLIST_STORAGE_KEY = 'outpost_first_run_checklist_v1';

interface ChecklistStep {
  id: string;
  number: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonLink: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const CHECKLIST_STEPS: ChecklistStep[] = [
  {
    id: 'choose-district',
    number: '01',
    title: 'Choose operational district',
    description: 'Select your target region across Malawi’s 28 districts to calibrate rainfall curves, groundwater tables, and seasonal planting windows.',
    buttonLabel: 'Open District Explorer',
    buttonLink: '/where',
    icon: MapPin
  },
  {
    id: 'set-household',
    number: '02',
    title: 'Set household demographics',
    description: 'Specify your family size, dependents, and target land acreage so water storage, pantry rations, and crop yields scale automatically.',
    buttonLabel: 'Configure Household',
    buttonLink: '/settings?tab=data',
    icon: Users
  },
  {
    id: 'explore-guides',
    number: '03',
    title: 'Explore country skills & manuals',
    description: 'Review the 25 verified field manuals covering Sasakawa planting pits, bio-sand water filtration, timber joinery, and charcoal remedies.',
    buttonLabel: 'Browse Skills Library',
    buttonLink: '/skills',
    icon: BookOpen
  },
  {
    id: 'try-calculator',
    number: '04',
    title: 'Try a homestead calculator',
    description: 'Run an engineering estimate for roof rainwater collection, solar PV battery banks, soil amendment volume, or crop yield requirements.',
    buttonLabel: 'Open Calculators',
    buttonLink: '/calculators',
    icon: Calculator
  },
  {
    id: 'make-plan',
    number: '05',
    title: 'Make a transition plan',
    description: 'Track your relocation journey from city departure to country sanctuary establishment using the 5-phase Kanban tracker.',
    buttonLabel: 'Launch Transition Tracker',
    buttonLink: '/tracker',
    icon: Compass
  }
];

export default function GettingStarted() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeDistrictId] = useActiveHomesteadDistrict();
  const { toast } = useToast();

  const currentTab = searchParams.get('tab') === 'how-it-works' ? 'how-it-works' : 'checklist';
  const [activeTab, setActiveTab] = useState<'checklist' | 'how-it-works'>(currentTab);

  useEffect(() => {
    setActiveTab(searchParams.get('tab') === 'how-it-works' ? 'how-it-works' : 'checklist');
  }, [searchParams]);

  // Persisted 5-step checklist state
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleStepDone = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCheckedSteps((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });

    const isNowDone = !checkedSteps[id];
    toast({
      message: isNowDone ? 'Step marked as complete' : 'Step marked as incomplete',
      variant: isNowDone ? 'success' : 'default'
    });
  };

  const completedCount = useMemo(
    () => CHECKLIST_STEPS.filter((s) => checkedSteps[s.id]).length,
    [checkedSteps]
  );
  const progressPct = Math.round((completedCount / CHECKLIST_STEPS.length) * 100);

  const handleTabChange = (tab: 'checklist' | 'how-it-works') => {
    setActiveTab(tab);
    setSearchParams(tab === 'how-it-works' ? { tab: 'how-it-works' } : {});
  };

  return (
    <div className="min-h-screen bg-[var(--ground)] text-[var(--ink)] pb-20 transition-colors">
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-6 flex flex-col gap-6">
        {/* Page Header */}
        <PageHeader
          title="Getting started with Outpost Living"
          eyebrow="Orientation & Readiness"
          summary="A five-step first-run checklist to configure your homestead parameters and master rural sanctuary operations."
          chips={
            <>
              <Badge status="Verified" />
              <Chip label="100% offline capable" />
              <Chip label={`District: ${activeDistrictId}`} />
              <Chip label={`${completedCount} of ${CHECKLIST_STEPS.length} steps done`} />
            </>
          }
        />

        {/* Tab Bar: Checklist vs How Outpost Works */}
        <div className="flex items-center gap-1.5 p-1 rounded-[var(--radius-control)] bg-[var(--surface)] border border-[var(--border)] self-start">
          <button
            type="button"
            onClick={() => handleTabChange('checklist')}
            className={cn(
              'px-3.5 py-1.5 rounded-[calc(var(--radius-control)-2px)] text-[13px] font-sans font-medium transition-all cursor-pointer flex items-center gap-1.5',
              activeTab === 'checklist'
                ? 'bg-[var(--ground)] text-[var(--ink)] font-semibold shadow-2xs'
                : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
            )}
          >
            <CheckCircle2 size={14} />
            <span>5-Step checklist</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('how-it-works')}
            className={cn(
              'px-3.5 py-1.5 rounded-[calc(var(--radius-control)-2px)] text-[13px] font-sans font-medium transition-all cursor-pointer flex items-center gap-1.5',
              activeTab === 'how-it-works'
                ? 'bg-[var(--ground)] text-[var(--ink)] font-semibold shadow-2xs'
                : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
            )}
          >
            <Info size={14} />
            <span>How Outpost works</span>
          </button>
        </div>

        {activeTab === 'checklist' ? (
          /* ====================================================================
             1. 5-STEP FIRST-RUN CHECKLIST
          ==================================================================== */
          <div className="flex flex-col gap-6">
            {/* Progress Card */}
            <div className="p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-sans font-semibold text-[var(--ink)]">
                    Setup progress
                  </span>
                  <span className="font-mono text-[12px] text-[var(--ink-muted)]">
                    ({completedCount}/{CHECKLIST_STEPS.length} completed)
                  </span>
                </div>
                <span className="font-mono tabular-nums text-[13px] font-semibold text-[var(--accent)]">
                  {progressPct}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-[var(--ground)] border border-[var(--border)] overflow-hidden">
                <div
                  className="h-full bg-[var(--accent)] transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {completedCount === CHECKLIST_STEPS.length && (
                <p className="text-[12px] text-[var(--accent)] font-medium">
                  All first-run steps completed. Your workspace and homestead preferences are fully primed.
                </p>
              )}
            </div>

            {/* Checklist Steps List */}
            <div className="flex flex-col gap-3">
              {CHECKLIST_STEPS.map((step) => {
                const isDone = Boolean(checkedSteps[step.id]);
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    className={cn(
                      'p-5 rounded-[var(--radius-card)] border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4',
                      isDone
                        ? 'bg-[var(--surface)] border-[var(--border)] opacity-90'
                        : 'bg-[var(--surface)] border-[var(--border)] hover:border-[var(--accent)]/50 shadow-xs'
                    )}
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      {/* Checkbox Button */}
                      <button
                        type="button"
                        onClick={(e) => toggleStepDone(step.id, e)}
                        className={cn(
                          'mt-0.5 w-6 h-6 rounded-[var(--radius-control)] border flex items-center justify-center shrink-0 cursor-pointer transition-colors',
                          isDone
                            ? 'bg-[var(--accent)] border-[var(--accent)] text-[var(--accent-ink)]'
                            : 'bg-[var(--ground)] border-[var(--border)] text-transparent hover:border-[var(--accent)]'
                        )}
                        aria-label={`Mark step ${step.title} as ${isDone ? 'incomplete' : 'done'}`}
                      >
                        <Check size={14} className="stroke-[2.5]" />
                      </button>

                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] text-[var(--ink-muted)]">
                            Step {step.number}
                          </span>
                          <h3
                            className={cn(
                              'font-serif text-[17px] font-semibold text-[var(--ink)] leading-snug',
                              isDone && 'line-through text-[var(--ink-muted)]'
                            )}
                          >
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed mt-1 max-w-[62ch]">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[var(--border)] justify-between sm:justify-end">
                      <button
                        type="button"
                        onClick={() => toggleStepDone(step.id)}
                        className="text-[12px] font-sans font-medium text-[var(--ink-muted)] hover:text-[var(--ink)] cursor-pointer"
                      >
                        {isDone ? 'Mark undone' : 'Mark done'}
                      </button>

                      <Link
                        to={step.buttonLink}
                        className="px-3.5 py-1.5 rounded-[var(--radius-control)] bg-[var(--ground)] hover:bg-[var(--surface-raised)] border border-[var(--border)] text-[13px] font-sans font-medium text-[var(--ink)] flex items-center gap-1.5 transition-colors"
                      >
                        <span>{step.buttonLabel}</span>
                        <ArrowRight size={13} className="text-[var(--ink-muted)]" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ====================================================================
             2. HOW OUTPOST WORKS: EXPLANATORY CARDS
          ==================================================================== */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <div className="w-8 h-8 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] mb-1">
                  <Compass size={16} />
                </div>
                <CardTitle>The Four Pillars of Country Living</CardTitle>
                <CardDescription>
                  A balanced framework grounded in Spirit of Prophecy counsel and practical self-reliance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-2 text-[13px] text-[var(--ink-muted)]">
                  <li>
                    <strong className="text-[var(--ink)] font-medium">1. Spiritual &amp; Prophetic:</strong> Understanding the sanctuary timeline, 1844, and why leaving congested centers protects character and spiritual focus.
                  </li>
                  <li>
                    <strong className="text-[var(--ink)] font-medium">2. Agricultural:</strong> Bio-intensive soil enrichment, 3×3×3ft orchard pits, and non-GMO heirloom open-pollinated seed varieties.
                  </li>
                  <li>
                    <strong className="text-[var(--ink)] font-medium">3. Physical Health:</strong> The eight natural laws of health, contrast hydrotherapy, and simple herbal botanical remedies.
                  </li>
                  <li>
                    <strong className="text-[var(--ink)] font-medium">4. Mechanical Engineering:</strong> Hydraulic ram pumps, biosand water filtration, compressed earth block building, and solar electrics.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-8 h-8 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] mb-1">
                  <ShieldCheck size={16} />
                </div>
                <CardTitle>100% Offline Autonomy</CardTitle>
                <CardDescription>
                  Designed specifically for remote rural areas with zero cellular connectivity.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
                  Every field manual, engineering diagram, soil swatch, crop matrix, and calculation engine runs natively inside your browser using IndexedDB and LocalStorage. You can disconnect your internet completely and all tools continue functioning without interruption.
                </p>
                <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed mt-2">
                  All local checklist marks, field notes, and specs are safely preserved and can be exported as an encrypted .JSON backup archive at any time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-8 h-8 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] mb-1">
                  <Sprout size={16} />
                </div>
                <CardTitle>Malawian Agronomy &amp; Soils</CardTitle>
                <CardDescription>
                  Calibrated to the 28 districts and agro-ecological zones of Malawi.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
                  Unlike generic gardening applications, Outpost Living accounts for Malawian rainy season dynamics (Dzidzi vs. Chilimwe), local soil classifications (red Katondo clay loam, fertile Dambo alluvium, and Shire Valley sandy loams), and Sasakawa planting standards.
                </p>
                <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed mt-2">
                  Bilingual Chichewa terminology connects traditional knowledge with scientific permaculture and regenerative soil biology.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-8 h-8 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] mb-1">
                  <Hammer size={16} />
                </div>
                <CardTitle>Shelter &amp; Field Infrastructure</CardTitle>
                <CardDescription>
                  Durable building techniques tested for Southern African climate and soil conditions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
                  Learn to make interlocking compressed earth blocks (70% sand + 20% clay + 10% lime/cement), lay 60cm stone damp-proof foundations, and fabricate 1-meter wide roof overhangs to protect earth walls from torrential rainy season storms.
                </p>
                <div className="pt-3">
                  <Link
                    to="/blueprints"
                    className="text-[13px] font-sans font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                  >
                    <span>View outpost blueprints &amp; diagrams</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
