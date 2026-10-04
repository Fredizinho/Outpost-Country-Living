import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Compass, Droplets, Sprout } from 'lucide-react';
import { useActiveHomesteadDistrict } from '@/lib/activeDistrictSync';
import { DISTRICT_LIST, PLANTING_PIT_SPECS } from '@/constants';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

export interface ActiveDistrictContextBarProps {
  className?: string;
  onDistrictSelect?: (districtId: string) => void;
}

/**
 * Unified editorial context strip displaying the user's active Malawi target district,
 * annual rainfall, typical borehole depth, primary soil order, and recommended orchard pit,
 * with instant 28-district switching and 1-click GIS Map jump.
 */
export function ActiveDistrictContextBar({
  className,
  onDistrictSelect,
}: ActiveDistrictContextBarProps) {
  const { palette } = useTheme();
  const isSapphire = palette === 'sapphire';
  const [activeDistrictId, setActiveDistrictId] = useActiveHomesteadDistrict('dedza');

  const district =
    DISTRICT_LIST.find((d) => d.id === activeDistrictId) || DISTRICT_LIST[0];
  const pitSpec =
    PLANTING_PIT_SPECS[district.recommendedPitKey] || PLANTING_PIT_SPECS.egwDeepPit;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextId = e.target.value;
    setActiveDistrictId(nextId);
    onDistrictSelect?.(nextId);
  };

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-3 pt-3 border-t text-xs',
        isSapphire
          ? 'border-sky-200/70 dark:border-sky-800/50 text-stone-600 dark:text-sky-100/85'
          : 'border-stone-200/80 dark:border-emerald-900/50 text-stone-600 dark:text-stone-300',
        className
      )}
    >
      {/* Left: District Selector + Unboxed Tabular Telemetry */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center gap-1.5">
          <MapPin
            size={13}
            className={cn(
              'shrink-0',
              isSapphire ? 'text-sky-600 dark:text-sky-300' : 'text-emerald-700 dark:text-amber-300'
            )}
          />
          <label htmlFor="workbench-active-district-select" className="font-semibold text-stone-800 dark:text-white">
            Active District:
          </label>
          <select
            id="workbench-active-district-select"
            value={district.id}
            onChange={handleChange}
            className={cn(
              'px-2.5 py-1 rounded-lg border text-xs font-semibold text-stone-900 dark:text-white focus:outline-none focus:ring-1 cursor-pointer',
              isSapphire
                ? 'bg-sky-50/80 dark:bg-[#05152B] border-sky-200/90 dark:border-sky-700/60 focus:ring-sky-500'
                : 'bg-stone-100/90 dark:bg-[#071D12] border-stone-300/80 dark:border-emerald-700/60 focus:ring-emerald-500'
            )}
          >
            {DISTRICT_LIST.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.region})
              </option>
            ))}
          </select>
        </div>

        <span aria-hidden="true" className="text-stone-300 dark:text-white/20">
          ·
        </span>

        <span className="font-mono tabular-nums inline-flex items-center gap-1">
          <Droplets size={12} className="text-sky-600 dark:text-sky-400 shrink-0" />
          <strong className="text-stone-900 dark:text-white">{district.rainfallAnnualMm} mm/yr</strong>
          <span>rain</span>
        </span>

        <span aria-hidden="true" className="text-stone-300 dark:text-white/20">
          ·
        </span>

        <span className="font-mono tabular-nums">
          Well <strong className="text-stone-900 dark:text-white">~{district.aquiferDepthM}m</strong>
        </span>

        <span aria-hidden="true" className="hidden md:inline text-stone-300 dark:text-white/20">
          ·
        </span>

        <span className="hidden md:inline-flex items-center gap-1">
          <Sprout size={12} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{district.primarySoil}</span>
          <span className="text-stone-400 dark:text-stone-400">({pitSpec.dimensionString} pit)</span>
        </span>
      </div>

      {/* Right: Direct 1-Click Links to Map & Calculators for this District */}
      <div className="flex items-center gap-3 shrink-0">
        <Link
          to={`/scout-map?district=${district.id}`}
          className={cn(
            'font-semibold hover:underline inline-flex items-center gap-1',
            isSapphire ? 'text-sky-700 dark:text-sky-300' : 'text-emerald-800 dark:text-amber-300'
          )}
        >
          <Compass size={12} />
          <span>Inspect on GIS Map →</span>
        </Link>
      </div>
    </div>
  );
}
