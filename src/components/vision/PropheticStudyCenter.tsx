import React, { useState } from 'react';
import {
  Compass,
  Clock,
  Layers,
  BookOpen,
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
    { id: 'stages', label: '01 · 6-Stage prophetic study guide', icon: BookOpen },
    { id: 'events', label: '02 · 10 Chronological events', icon: Clock },
    { id: 'counsels', label: '03 · Country living & outpost blueprint', icon: Compass },
    { id: 'timeline1844', label: '04 · 1844 Sanctuary heritage atlas', icon: Layers },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Study Center Sub-Navigation Tabs */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-2 sm:p-2.5 flex flex-wrap items-center gap-1.5 shadow-xs">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-3.5 py-2 rounded-[var(--radius-control)] text-xs font-semibold font-sans transition-all duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap',
                active
                  ? 'bg-[var(--color-moss-light)] text-white shadow-xs font-bold'
                  : 'text-[var(--ink-muted)] hover:bg-[var(--ground)] hover:text-[var(--ink)]'
              )}
            >
              <Icon size={14} className={active ? 'text-[var(--gold)]' : 'text-[var(--ink-muted)]'} />
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
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-4 sm:p-5 flex items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-sans text-caption text-[var(--accent)] font-bold">
                Historical Heritage Waymarks
              </span>
              <h3 className="font-serif text-lg font-bold text-[var(--ink)]">
                1844 Sanctuary Cleansing &amp; Seventh-day Adventist Origin Map
              </h3>
            </div>
            <span className="text-caption font-mono text-[var(--ink-muted)] hidden sm:inline">
              Daniel 8:14 · 2,300 Days
            </span>
          </div>
          <PropheticTimeline1844 />
        </div>
      )}
    </div>
  );
}
