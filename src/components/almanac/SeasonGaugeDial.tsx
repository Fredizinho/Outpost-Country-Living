import React from 'react';
import { motion } from 'motion/react';
import { CloudRain, Wheat, Layers, Sun, Sparkles } from 'lucide-react';
import { SeasonalTag } from '@/data/skillsAndSeasons';
import { CountryIcon, CountryIconName } from '@/components/icons/CountryIcons';
import { cn } from '@/lib/utils';

interface SeasonGaugeDialProps {
  activeSeason: SeasonalTag;
  onSelectSeason: (season: SeasonalTag) => void;
  className?: string;
}

interface SeasonPhaseSegment {
  key: SeasonalTag;
  label: string;
  chichewaName: string;
  illustrationName: CountryIconName;
  shortMonths: string;
  monthsRange: string;
  startAngle: number;
  endAngle: number;
  colorHex: string;
  accentHex: string;
  icon: any;
}

const PHASES: SeasonPhaseSegment[] = [
  {
    key: 'Hot Dry Preparation',
    label: 'Hot Dry Prep',
    chichewaName: 'Chizimalupsya',
    illustrationName: 'season-chizimalupsya',
    shortMonths: 'Sep – Oct',
    monthsRange: 'Months 9 – 10',
    startAngle: 240,
    endAngle: 300,
    colorHex: '#d97706',
    accentHex: '#fbbf24',
    icon: Sun,
  },
  {
    key: 'Rainy Planting',
    label: 'Rainy Planting',
    chichewaName: 'Dzinja',
    illustrationName: 'season-dzinja',
    shortMonths: 'Nov – Mar',
    monthsRange: 'Months 11 – 3',
    startAngle: 300,
    endAngle: 450,
    colorHex: '#059669',
    accentHex: '#34d399',
    icon: CloudRain,
  },
  {
    key: 'Harvest & Storage',
    label: 'Harvest & Storage',
    chichewaName: 'Masika',
    illustrationName: 'season-masika',
    shortMonths: 'Apr – Jun',
    monthsRange: 'Months 4 – 6',
    startAngle: 90,
    endAngle: 180,
    colorHex: '#b45309',
    accentHex: '#f59e0b',
    icon: Wheat,
  },
  {
    key: 'Cold Dry Season',
    label: 'Cold Dry Season',
    chichewaName: 'Chilimwe',
    illustrationName: 'season-chilimwe',
    shortMonths: 'Jul – Aug',
    monthsRange: 'Months 7 – 8',
    startAngle: 180,
    endAngle: 240,
    colorHex: '#0284c7',
    accentHex: '#38bdf8',
    icon: Layers,
  },
];

export function SeasonGaugeDial({ activeSeason, onSelectSeason, className }: SeasonGaugeDialProps) {
  const activeSegment = PHASES.find(p => p.key === activeSeason) || PHASES[0];

  return (
    <div className={cn("bg-[#0d1811] text-white p-6 md:p-8 rounded-[2.5rem] border border-amber-500/25 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center gap-8", className)}>
      {/* Background Ambient Glow */}
      <div 
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none -right-20 -top-20 transition-all duration-700"
        style={{ backgroundColor: activeSegment.accentHex }}
      />

      {/* Left Text & Active Indicator (5 Cols) */}
      <div className="lg:col-span-5 flex flex-col gap-3 relative z-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono font-black uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
            <Sparkles size={12} className="text-amber-400" />
            <span>{activeSegment.chichewaName} Season</span>
          </span>
          <span className="text-emerald-400/60 text-xs">•</span>
          <span className="text-xs font-mono text-emerald-200/80">365-Day Agricultural Wheel</span>
        </div>

        <h3 className="serif text-3xl sm:text-4xl font-extrabold text-[#FAF8F5] leading-tight">
          {activeSegment.label}
        </h3>

        <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed font-medium">
          Active cyclical phase ({activeSegment.shortMonths}). Click any quadrant on the gauge or pill below to align all farm operations, calculators, and field tasks.
        </p>

        {/* Phase Switcher Pills */}
        <div className="grid grid-cols-2 gap-2 mt-1">
          {PHASES.map((phase) => {
            const isSelected = activeSeason === phase.key;
            const Icon = phase.icon;
            return (
              <button
                key={phase.key}
                onClick={() => onSelectSeason(phase.key)}
                className={cn(
                  "p-2.5 rounded-2xl border text-xs font-mono font-bold transition-all text-left flex items-center gap-2.5 active:scale-98 select-none cursor-pointer",
                  isSelected
                    ? "bg-white text-slate-950 border-amber-400 shadow-lg font-black"
                    : "bg-white/5 text-emerald-100/80 border-white/10 hover:bg-white/10 hover:text-white"
                )}
              >
                <div 
                  className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border"
                  style={{
                    backgroundColor: isSelected ? `${phase.colorHex}22` : 'rgba(255,255,255,0.05)',
                    borderColor: isSelected ? phase.colorHex : 'rgba(255,255,255,0.1)'
                  }}
                >
                  <Icon size={14} style={{ color: isSelected ? phase.colorHex : 'currentColor' }} />
                </div>
                <div className="flex flex-col truncate">
                  <span className="truncate">{phase.label}</span>
                  <span className="text-[9px] opacity-70 font-normal">{phase.chichewaName} · {phase.shortMonths}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Center: Panoramic Season Lithograph Illustration (4 Cols) */}
      <div className="lg:col-span-4 relative z-10 flex flex-col gap-2">
        <div className="rounded-3xl bg-[#07130C] border border-emerald-800/60 p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-inner min-h-[210px]">
          <div className="absolute top-3 left-3.5 right-3.5 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-emerald-400/80">
            <span>Malawi Almanac Plate</span>
            <span className="text-amber-300 font-bold">{activeSegment.chichewaName}</span>
          </div>
          <div className="w-full max-w-[260px] pt-5 pb-1 flex items-center justify-center">
            <CountryIcon
              name={activeSegment.illustrationName}
              className="w-full h-36 object-contain drop-shadow-md transition-all duration-300"
            />
          </div>
          <span className="text-[10px] font-mono text-emerald-200/80 text-center">
            {activeSegment.label} ({activeSegment.shortMonths})
          </span>
        </div>
      </div>

      {/* Right Circular Gauge Dial (3 Cols) */}
      <div className="lg:col-span-3 relative z-10 flex flex-col items-center justify-center shrink-0">
        <div className="relative w-56 h-56 sm:w-60 sm:h-60 flex items-center justify-center">
          {/* Outer SVG Arc Dial */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 240 240">
            {/* Background Track */}
            <circle
              cx="120"
              cy="120"
              r="95"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="18"
            />

            {/* Segment 1: Hot Dry Prep (Sep-Oct: 2/12 = 60 deg) */}
            <circle
              cx="120"
              cy="120"
              r="95"
              fill="none"
              stroke="#d97706"
              strokeWidth={activeSeason === 'Hot Dry Preparation' ? '22' : '16'}
              strokeDasharray="99.5 596.9"
              strokeDashoffset="-398"
              className="cursor-pointer transition-all duration-300 hover:opacity-90"
              onClick={() => onSelectSeason('Hot Dry Preparation')}
            />

            {/* Segment 2: Rainy Planting (Nov-Mar: 5/12 = 150 deg) */}
            <circle
              cx="120"
              cy="120"
              r="95"
              fill="none"
              stroke="#059669"
              strokeWidth={activeSeason === 'Rainy Planting' ? '22' : '16'}
              strokeDasharray="248.7 596.9"
              strokeDashoffset="-497.5"
              className="cursor-pointer transition-all duration-300 hover:opacity-90"
              onClick={() => onSelectSeason('Rainy Planting')}
            />

            {/* Segment 3: Harvest & Storage (Apr-Jun: 3/12 = 90 deg) */}
            <circle
              cx="120"
              cy="120"
              r="95"
              fill="none"
              stroke="#b45309"
              strokeWidth={activeSeason === 'Harvest & Storage' ? '22' : '16'}
              strokeDasharray="149.2 596.9"
              strokeDashoffset="-149.2"
              className="cursor-pointer transition-all duration-300 hover:opacity-90"
              onClick={() => onSelectSeason('Harvest & Storage')}
            />

            {/* Segment 4: Cold Dry (Jul-Aug: 2/12 = 60 deg) */}
            <circle
              cx="120"
              cy="120"
              r="95"
              fill="none"
              stroke="#0284c7"
              strokeWidth={activeSeason === 'Cold Dry Season' ? '22' : '16'}
              strokeDasharray="99.5 596.9"
              strokeDashoffset="-298.5"
              className="cursor-pointer transition-all duration-300 hover:opacity-90"
              onClick={() => onSelectSeason('Cold Dry Season')}
            />
          </svg>

          {/* Center Hub Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <div 
              className="w-16 h-16 rounded-3xl flex items-center justify-center border shadow-xl transition-all duration-500 mb-1"
              style={{
                backgroundColor: `${activeSegment.colorHex}25`,
                borderColor: activeSegment.accentHex
              }}
            >
              {React.createElement(activeSegment.icon, {
                size: 30,
                style: { color: activeSegment.accentHex }
              })}
            </div>

            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-amber-300">
              {activeSegment.shortMonths}
            </span>
            <span className="text-xs font-bold text-white max-w-[120px] truncate">
              {activeSegment.label}
            </span>
          </div>

          {/* Month Marker Ring Badges */}
          <div className="absolute top-2 text-[9px] font-mono font-bold text-slate-400">OCT / NOV</div>
          <div className="absolute bottom-2 text-[9px] font-mono font-bold text-slate-400">APR / MAY</div>
          <div className="absolute left-2 text-[9px] font-mono font-bold text-slate-400">JUL</div>
          <div className="absolute right-2 text-[9px] font-mono font-bold text-slate-400">JAN</div>
        </div>
      </div>
    </div>
  );
}
