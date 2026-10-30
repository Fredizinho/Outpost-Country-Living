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

  const isHealthRoute =
    location.pathname.startsWith('/sanitarium') ||
    ['sanitarium', 'eight-laws', 'evidence', 'hydrotherapy', 'apothecary', 'principles'].includes(
      searchParams.get('tab') || ''
    ) ||
    Boolean(searchParams.get('section'));

  const [activeTab, setActiveTab] = useState<BlueprintsTab>(() => {
    if (isHealthRoute) {
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
    if (isHealthRoute) {
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
  }, [location.pathname, searchParams, isHealthRoute]);

  const rawSection = searchParams.get('section') || searchParams.get('tab') || '';
  const healthInitialSection: 'eight-laws' | 'evidence' | 'hydrotherapy' | 'apothecary' | 'outreach' =
    rawSection === 'evidence'
      ? 'evidence'
      : rawSection === 'hydrotherapy'
      ? 'hydrotherapy'
      : rawSection === 'apothecary'
      ? 'apothecary'
      : rawSection === 'outreach' || activeTab === 'education'
      ? 'outreach'
      : 'eight-laws';

  return (
    <div className="min-h-screen bg-[var(--ground)] text-[var(--ink)] flex flex-col pb-20 transition-colors duration-200">
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 pt-6 flex flex-col gap-6">
        <header className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-5 sm:p-6 flex flex-col gap-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2 text-[12px] text-[var(--accent)] font-semibold">
                <span>The Divine Pattern for Outpost Ministry (2SM 358 &middot; MH 127)</span>
                <span aria-hidden="true">&middot;</span>
                <span className="text-[var(--ink-muted)] font-normal">
                  Site Architecture &middot; Eight Laws Sanitarium &middot; Illustrated Engineering Schematics
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--ink)] tracking-tight">
                {activeTab === 'sanitarium'
                  ? 'Medical Missionary Sanitarium, Eight Laws & Charcoal Apothecary'
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
              className="self-start sm:self-auto bg-[var(--accent)] text-[var(--accent-ink)] font-sans font-semibold text-[12px] px-3.5 py-2 rounded-[var(--radius-control)] transition-all shadow-xs flex items-center gap-1.5"
            >
              <Heart size={13} />
              <span>Steward network</span>
            </Link>
          </div>

          {/* Primary Tab Bar (Plans · Remedies · Education · Schematics · Soil) */}
          <div className="relative w-full max-w-full overflow-hidden">
            <div
              role="tablist"
              aria-label="Primary Blueprint Tabs"
              className="flex flex-nowrap items-center gap-1.5 p-1 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] overflow-x-auto no-scrollbar scroll-smooth px-2"
            >
              {(
                [
                  { id: 'site-plans', label: 'Site plans', icon: Building2 },
                  { id: 'sanitarium', label: 'Health & remedies', icon: HeartPulse },
                  { id: 'education', label: 'Education', icon: GraduationCap },
                  { id: 'engineering', label: 'Schematics', icon: Wrench },
                  { id: 'soil-swatches', label: 'Soil swatches', icon: Layers },
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
                      'min-h-[42px] px-3.5 py-2 rounded-[var(--radius-control)] text-[12px] font-sans font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-2 select-none normal-case',
                      isActive
                        ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-semibold shadow-xs'
                        : 'text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)]'
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
          <div className="bg-[var(--surface)] p-6 sm:p-8 rounded-[var(--radius-card)] border border-[var(--border)] shadow-xs">
            <OutpostCenterBlueprints />
          </div>
        )}

        {(activeTab === 'sanitarium' || activeTab === 'education') && (
          <div className="bg-[var(--surface)] p-6 sm:p-8 rounded-[var(--radius-card)] border border-[var(--border)] shadow-xs">
            <Suspense
              fallback={
                <div className="p-8 text-center text-[12px] font-mono text-[var(--ink-muted)]">
                  Loading Medical Missionary &amp; Sanitarium Workbench...
                </div>
              }
            >
              <MedicalMissionarySanitarium
                initialSection={healthInitialSection}
              />
            </Suspense>
          </div>
        )}

        {activeTab === 'engineering' && (
          <FieldEngineeringDiagrams />
        )}

        {activeTab === 'soil-swatches' && (
          <div className="bg-[var(--surface)] p-6 sm:p-8 rounded-[var(--radius-card)] border border-[var(--border)] shadow-xs">
            <VisualSoilSwatchGuide />
          </div>
        )}
      </main>
    </div>
  );
}
