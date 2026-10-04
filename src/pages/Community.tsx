import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Building2 } from 'lucide-react';
import { CommunityDirectory } from '@/components/outpost/CommunityDirectory';
import { HomeSceneryBackground } from '@/components/home/HomeSceneryBackground';
import { CountryIcon } from '@/components/icons/CountryIcons';

export default function Community() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] dark:bg-[#09150E] text-stone-800 dark:text-stone-100 flex flex-col pb-20 transition-colors">
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 pt-6 flex flex-col gap-6">
        <header className="bg-white dark:bg-[#0D1D13] rounded-2xl border border-stone-200/90 dark:border-emerald-900/60 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-800 dark:text-amber-300 font-semibold">
              <span>Christian Fellowship &amp; Seed Exchange</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-500 dark:text-stone-400 font-normal">
                Northern, Central &amp; Southern Malawi Regions
              </span>
            </div>
            <h1 className="serif text-2xl sm:text-3xl font-bold text-stone-950 dark:text-stone-50 tracking-tight">
              Malawi Country Steward, Seed Saver &amp; Builder Directory
            </h1>
          </div>

          <Link
            to="/blueprints"
            className="self-start sm:self-auto bg-emerald-950 hover:bg-emerald-900 text-amber-300 font-mono font-bold text-xs uppercase px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
          >
            <Building2 size={13} />
            <span>Outpost Blueprints</span>
          </Link>
        </header>

        {/* The Directory Widget */}
        <div className="bg-white dark:bg-[#0D1D13] p-6 sm:p-8 rounded-3xl border border-stone-200/90 dark:border-emerald-900/60 shadow-md">
          <CommunityDirectory />
        </div>
      </main>
    </div>
  );
}
