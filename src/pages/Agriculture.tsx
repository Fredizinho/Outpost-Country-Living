import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sprout, Leaf, Sun, Droplets, Calendar } from 'lucide-react';
import { EdenicAgricultureGuides } from '@/components/outpost/EdenicAgricultureGuides';
import { SoilStrataBlueprint } from '@/components/home/SoilStrataBlueprint';
import { CountryIcon } from '@/components/icons/CountryIcons';
import { HomeSceneryBackground } from '@/components/home/HomeSceneryBackground';
import { cn } from '@/lib/utils';

export default function Agriculture() {
  const [activeTab, setActiveTab] = useState<'manuals' | 'soil-strata'>('manuals');

  return (
    <div className="min-h-screen bg-[#FAF7F0] dark:bg-[#09150E] text-stone-800 dark:text-stone-100 flex flex-col pb-20 transition-colors">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 pt-6 flex flex-col gap-6">
        <header className="bg-white dark:bg-[#0D1D13] rounded-2xl border border-stone-200/90 dark:border-emerald-900/60 p-5 sm:p-6 shadow-xs flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-800 dark:text-amber-300 font-semibold">
                <span>God-Honoring Organic Husbandry</span>
                <span aria-hidden="true">·</span>
                <span className="text-stone-500 dark:text-stone-400 font-normal">
                  3×3×3 ft Deep Pit Standard · Living Soil &amp; Humus
                </span>
              </div>
              <h1 className="serif text-2xl sm:text-3xl font-bold text-stone-950 dark:text-stone-50 tracking-tight">
                Edenic Soil Manuals &amp; Drought-Proof Orchard Pits
              </h1>
            </div>

            <Link
              to="/seasons"
              className="self-start lg:self-auto bg-emerald-950 hover:bg-emerald-900 text-amber-300 font-mono font-bold text-xs uppercase px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <Calendar size={13} />
              <span>Malawi Planting Almanac</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-200/80 dark:border-emerald-900/40">
            <div className="flex flex-wrap items-center gap-1.5 bg-stone-100 dark:bg-stone-900/90 p-1 rounded-xl border border-stone-200/80 dark:border-stone-800">
              {([
                { id: 'manuals', label: '01. Edenic Agriculture Manuals' },
                { id: 'soil-strata', label: '02. Soil & Aquifer Cross-Section' },
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                    activeTab === tab.id
                      ? 'bg-emerald-950 dark:bg-amber-500 text-amber-300 dark:text-stone-950 shadow-xs font-bold'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {activeTab === 'manuals' && (
          <div className="bg-white dark:bg-[#0D1D13] p-6 sm:p-8 rounded-3xl border border-stone-200/90 dark:border-emerald-900/60 shadow-md">
            <EdenicAgricultureGuides />
          </div>
        )}

        {activeTab === 'soil-strata' && (
          <SoilStrataBlueprint />
        )}
      </main>
    </div>
  );
}
