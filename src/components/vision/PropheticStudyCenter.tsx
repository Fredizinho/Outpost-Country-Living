import React, { useState } from 'react';
import {
  Compass,
  Clock,
  Layers,
  BookOpen,
  MapPin,
  Sparkles,
  ShieldCheck,
  Flame,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PropheticStageStepper } from './PropheticStageStepper';
import { ChronologicalEventsViewer } from './ChronologicalEventsViewer';
import { CountryLivingBlueprintViewer } from './CountryLivingBlueprintViewer';
import { PropheticTimeline1844 } from './PropheticTimeline1844';

export type StudyCenterTab =
  | 'stages'
  | 'events'
  | 'counsels'
  | 'timeline1844';

export function PropheticStudyCenter() {
  const [activeTab, setActiveTab] = useState<StudyCenterTab>('stages');

  const tabs: { id: StudyCenterTab; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { id: 'stages', label: '01 · 6-Stage Prophetic Study Guide', icon: BookOpen },
    { id: 'events', label: '02 · 10 Chronological Events', icon: Clock },
    { id: 'counsels', label: '03 · Country Living & Outpost Blueprint', icon: Compass },
    { id: 'timeline1844', label: '04 · 1844 Sanctuary Heritage Atlas', icon: Layers },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Study Center Sub-Navigation Tabs */}
      <div className="bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] rounded-xl p-2 sm:p-2.5 flex flex-wrap items-center gap-1.5 shadow-xs">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-3.5 py-2 rounded-lg text-xs font-semibold font-sans transition-all duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap',
                active
                  ? 'bg-[#2B4636] dark:bg-[#283C30] text-white shadow-xs font-bold'
                  : 'text-[#5A6458] dark:text-[#9FB3A4] hover:bg-[#F6F1E7] dark:hover:bg-[#0E1712] hover:text-[#1F2A22] dark:hover:text-[#FFFDF8]'
              )}
            >
              <Icon size={14} className={active ? 'text-[#D4A034]' : 'text-[#5A6458] dark:text-[#9FB3A4]'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {activeTab === 'stages' && <PropheticStageStepper />}
      {activeTab === 'events' && <ChronologicalEventsViewer />}
      {activeTab === 'counsels' && <CountryLivingBlueprintViewer />}
      {activeTab === 'timeline1844' && (
        <div className="flex flex-col gap-4">
          <div className="bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] rounded-xl p-4 sm:p-5 flex items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-mono text-caption text-[#B85D36] dark:text-[#E2875A] font-bold">
                Historical Heritage Waymarks
              </span>
              <h3 className="font-serif text-lg font-bold text-[#1F2A22] dark:text-[#FFFDF8]">
                1844 Sanctuary Cleansing &amp; Seventh-day Adventist Origin Map
              </h3>
            </div>
            <span className="text-caption font-mono text-[#5A6458] dark:text-[#9FB3A4] hidden sm:inline">
              Daniel 8:14 · 2,300 Days
            </span>
          </div>
          <PropheticTimeline1844 />
        </div>
      )}
    </div>
  );
}
