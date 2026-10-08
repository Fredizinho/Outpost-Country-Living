import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Layers,
  Sprout,
  Trees,
  Grid3X3,
  BookOpen,
} from 'lucide-react';
import { EdenicAgricultureGuides } from '@/components/outpost/EdenicAgricultureGuides';
import { SoilStrataBlueprint } from '@/components/home/SoilStrataBlueprint';
import { MalawiRidgeAndSeedPlanner } from '@/components/outpost/MalawiRidgeAndSeedPlanner';
import { OrchardGuildPitDesigner } from '@/components/agriculture/OrchardGuildPitDesigner';
import { MalawiCropExplorer } from '@/components/crops/MalawiCropExplorer';
import { ActiveDistrictContextBar } from '@/components/common/ActiveDistrictContextBar';
import { cn } from '@/lib/utils';

type AgriTab = 'manuals' | 'strata' | 'ridge-planner' | 'orchard-guilds' | 'crop-catalog';

export default function Agriculture() {
  const [activeTab, setActiveTab] = useState<AgriTab>('manuals');

  const tabs = [
    { id: 'manuals' as const, label: '01. Edenic Agriculture Manuals', icon: BookOpen },
    { id: 'strata' as const, label: '02. Soil & Aquifer Cross-Section', icon: Layers },
    { id: 'ridge-planner' as const, label: '03. Malawi Ridge & Companion Guilds', icon: Grid3X3 },
    { id: 'orchard-guilds' as const, label: '04. Orchard Pit & Permaculture Designer', icon: Trees },
    { id: 'crop-catalog' as const, label: '05. Indigenous Heirloom Crop Catalog', icon: Sprout },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0] dark:bg-[#09150E] text-stone-800 dark:text-stone-100 flex flex-col pb-20 transition-colors">
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 pt-6 flex flex-col gap-6">
        {/* District Agro-Climatic Header Bar */}
        <ActiveDistrictContextBar />

        <header className="bg-white dark:bg-[#0D1D13] rounded-2xl border border-stone-200/90 dark:border-emerald-900/60 p-5 sm:p-6 shadow-xs flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-800 dark:text-amber-300 font-semibold">
                <span>God-Honoring Organic Husbandry &amp; Food Autonomy</span>
                <span aria-hidden="true">·</span>
                <span className="text-stone-500 dark:text-stone-400 font-normal">
                  Foundations for Farming · 3×3×3 ft Deep Pits · Pfumvudza Contours · Living Mulch
                </span>
              </div>
              <h1 className="serif text-2xl sm:text-3xl font-bold text-stone-950 dark:text-stone-50 tracking-tight">
                Edenic Agriculture, Orchard Guilds &amp; Crop Science
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                to="/seasons"
                className="bg-emerald-950 hover:bg-emerald-900 text-amber-300 font-mono font-bold text-xs uppercase px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
              >
                <Calendar size={13} />
                <span>Malawi Planting Almanac</span>
              </Link>
            </div>
          </div>

          {/* 5-Tab Agricultural Workbench Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 bg-stone-100 dark:bg-stone-900/90 p-1 rounded-xl border border-stone-200/80 dark:border-stone-800">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                    isActive
                      ? 'bg-emerald-950 dark:bg-amber-500 text-amber-300 dark:text-stone-950 shadow-xs font-bold'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800'
                  )}
                >
                  <Icon size={14} className={isActive ? 'text-amber-300 dark:text-stone-950' : 'text-stone-400'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </header>

        {/* Tab 1: Edenic Agriculture Manuals */}
        {activeTab === 'manuals' && (
          <div className="bg-white dark:bg-[#0D1D13] p-6 sm:p-8 rounded-3xl border border-stone-200/90 dark:border-emerald-900/60 shadow-md">
            <EdenicAgricultureGuides />
          </div>
        )}

        {/* Tab 2: Soil & Aquifer Cross-Section */}
        {activeTab === 'strata' && (
          <SoilStrataBlueprint />
        )}

        {/* Tab 3: Malawi Ridge & Companion Guilds */}
        {activeTab === 'ridge-planner' && (
          <div className="bg-white dark:bg-[#0D1D13] p-6 sm:p-8 rounded-3xl border border-stone-200/90 dark:border-emerald-900/60 shadow-md">
            <MalawiRidgeAndSeedPlanner />
          </div>
        )}

        {/* Tab 4: Orchard Pit & Permaculture Designer */}
        {activeTab === 'orchard-guilds' && (
          <div className="bg-white dark:bg-[#0D1D13] p-6 sm:p-8 rounded-3xl border border-stone-200/90 dark:border-emerald-900/60 shadow-md">
            <OrchardGuildPitDesigner />
          </div>
        )}

        {/* Tab 5: Indigenous Heirloom Crop Catalog */}
        {activeTab === 'crop-catalog' && (
          <div className="bg-white dark:bg-[#0D1D13] p-6 sm:p-8 rounded-3xl border border-stone-200/90 dark:border-emerald-900/60 shadow-md">
            <MalawiCropExplorer />
          </div>
        )}
      </main>
    </div>
  );
}
