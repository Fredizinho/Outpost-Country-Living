import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import {
  Building2,
  Heart,
  HeartPulse,
  GraduationCap,
  Wrench,
  Layers,
} from 'lucide-react';
import { OutpostCenterBlueprints } from '@/components/outpost/OutpostCenterBlueprints';
import { FieldEngineeringDiagrams } from '@/components/outpost/FieldEngineeringDiagrams';
import { VisualSoilSwatchGuide } from '@/components/outpost/VisualSoilSwatchGuide';
import { ActiveDistrictContextBar } from '@/components/common/ActiveDistrictContextBar';
import { cn } from '@/lib/utils';

const MedicalMissionarySanitarium = lazy(() =>
  import('@/components/outpost/MedicalMissionarySanitarium').then((m) => ({
    default: m.MedicalMissionarySanitarium,
  }))
);

type BlueprintsTab = 'site-plans' | 'sanitarium' | 'education' | 'engineering' | 'soil-swatches';

export default function Blueprints() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState<BlueprintsTab>(() => {
    if (
      location.pathname.startsWith('/sanitarium') ||
      searchParams.get('tab') === 'sanitarium'
    ) {
      return 'sanitarium';
    }
    if (searchParams.get('tab') === 'education') {
      return 'education';
    }
    if (searchParams.get('tab') === 'engineering') {
      return 'engineering';
    }
    if (searchParams.get('tab') === 'soil-swatches') {
      return 'soil-swatches';
    }
    return 'site-plans';
  });

  useEffect(() => {
    if (
      location.pathname.startsWith('/sanitarium') ||
      searchParams.get('tab') === 'sanitarium'
    ) {
      setActiveTab('sanitarium');
    } else if (searchParams.get('tab') === 'education') {
      setActiveTab('education');
    } else if (searchParams.get('tab') === 'engineering') {
      setActiveTab('engineering');
    } else if (searchParams.get('tab') === 'soil-swatches') {
      setActiveTab('soil-swatches');
    } else if (location.pathname.startsWith('/blueprints') && !searchParams.get('tab')) {
      setActiveTab('site-plans');
    }
  }, [location.pathname, searchParams]);

  return (
    <div className="min-h-screen bg-[#FAF7F0] dark:bg-[#09150E] text-stone-800 dark:text-stone-100 flex flex-col pb-20 transition-colors">
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 pt-6 flex flex-col gap-6">
        <header className="glass-depth-card rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-800 dark:text-amber-300 font-semibold">
                <span>The Divine Pattern for Outpost Ministry (2SM 358 · MH 127)</span>
                <span aria-hidden="true">·</span>
                <span className="text-stone-500 dark:text-stone-400 font-normal">
                  Site Architecture · NEWSTART Sanitarium · Illustrated Engineering Schematics
                </span>
              </div>
              <h1 className="serif text-2xl sm:text-3xl font-bold text-stone-950 dark:text-stone-50 tracking-tight">
                {activeTab === 'sanitarium'
                  ? 'Medical Missionary Sanitarium, Hydrotherapy & Charcoal Apothecary'
                  : activeTab === 'education'
                  ? 'True Education & Madison / Avondale Family Homestead Curriculum'
                  : activeTab === 'engineering'
                  ? 'Field Engineering Schematics & Illustrated Construction Blueprints'
                  : activeTab === 'soil-swatches'
                  ? 'Malawi Soil Mineral Swatches & Ribbon Texture Field Guide'
                  : 'Rural Outpost, Sanitarium & Agricultural School Blueprints'}
              </h1>
            </div>

            <Link
              to="/community"
              className="self-start sm:self-auto bg-emerald-950 hover:bg-emerald-900 text-amber-300 font-mono font-bold text-xs uppercase px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <Heart size={13} />
              <span>Steward Network</span>
            </Link>
          </div>

          {/* Primary Tab Bar (Plans · Remedies · Education · Schematics · Soil) - Never Wraps, Scrolls with Fade Masks */}
          <div className="relative w-full max-w-full overflow-hidden">
            {/* Left & Right Fade Masks */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#FAF7F0] dark:from-[#09150E] to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#FAF7F0] dark:from-[#09150E] to-transparent z-10" />

            <div
              role="tablist"
              aria-label="Primary Blueprint Tabs"
              className="flex flex-nowrap items-center gap-1.5 p-1 rounded-xl bg-stone-100/90 dark:bg-stone-900/90 border border-border overflow-x-auto no-scrollbar scroll-smooth px-3"
            >
              {(
                [
                  { id: 'site-plans', label: 'Plans', icon: Building2 },
                  { id: 'sanitarium', label: 'Remedies', icon: HeartPulse },
                  { id: 'education', label: 'Education', icon: GraduationCap },
                  { id: 'engineering', label: 'Schematics', icon: Wrench },
                  { id: 'soil-swatches', label: 'Soil', icon: Layers },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={isActive}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'min-h-[44px] px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-2 select-none normal-case',
                      isActive
                        ? 'bg-accent text-accent-ink shadow-sm font-bold ring-1 ring-accent/30'
                        : 'text-ink-muted hover:text-ink hover:bg-surface-raised/70'
                    )}
                  >
                    <Icon size={14} className="shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <ActiveDistrictContextBar />
        </header>

        {/* Active Workbench Body */}
        {activeTab === 'site-plans' && (
          <div className="bg-white dark:bg-[#0D1D13] p-6 sm:p-8 rounded-3xl border border-stone-200/90 dark:border-emerald-900/60 shadow-md">
            <OutpostCenterBlueprints />
          </div>
        )}

        {(activeTab === 'sanitarium' || activeTab === 'education') && (
          <div className="bg-white dark:bg-[#0D1D13] p-6 sm:p-8 rounded-3xl border border-stone-200/90 dark:border-emerald-900/60 shadow-md">
            <Suspense
              fallback={
                <div className="p-8 text-center text-xs font-mono text-stone-500">
                  Loading Medical Missionary &amp; Sanitarium Workbench...
                </div>
              }
            >
              <MedicalMissionarySanitarium
                initialSection={activeTab === 'education' ? 'education' : 'newstart'}
              />
            </Suspense>
          </div>
        )}

        {activeTab === 'engineering' && (
          <FieldEngineeringDiagrams />
        )}

        {activeTab === 'soil-swatches' && (
          <div className="bg-white dark:bg-[#0D1D13] p-6 sm:p-8 rounded-3xl border border-stone-200/90 dark:border-emerald-900/60 shadow-md">
            <VisualSoilSwatchGuide />
          </div>
        )}
      </main>
    </div>
  );
}
