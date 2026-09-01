import React from 'react';
import { MapPin, Compass, Droplets, Mountain, Sprout, AlertCircle } from 'lucide-react';
import { DISTRICT_TELEMETRY, DistrictSeasonalTelemetry } from '@/data/actionableAlmanacData';
import { cn } from '@/lib/utils';

interface DistrictMicroclimateSelectorProps {
  selectedDistrict: string;
  onSelectDistrict: (districtKey: string) => void;
  className?: string;
}

export function DistrictMicroclimateSelector({
  selectedDistrict,
  onSelectDistrict,
  className
}: DistrictMicroclimateSelectorProps) {
  const currentKey = selectedDistrict.toLowerCase();
  const activeTelemetry: DistrictSeasonalTelemetry = DISTRICT_TELEMETRY[currentKey] || DISTRICT_TELEMETRY['dedza'];

  const districtList = [
    { key: 'dedza', name: 'Dedza Highlands', region: 'Central' },
    { key: 'lilongwe', name: 'Lilongwe Plateau', region: 'Central' },
    { key: 'zomba', name: 'Zomba Massif', region: 'Southern' },
    { key: 'mulanje', name: 'Mulanje Massif', region: 'Southern' },
    { key: 'salima', name: 'Salima Lakeshore', region: 'Central/Lake' },
    { key: 'mzimba', name: 'Mzimba / Viphya', region: 'Northern' },
    { key: 'rumphi', name: 'Rumphi Escarpment', region: 'Northern' },
  ];

  return (
    <div className={cn("bg-[#0f1d14] text-white p-5 md:p-6 rounded-[2.2rem] border border-amber-500/20 shadow-xl flex flex-col gap-4", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-900 pb-3">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-amber-400 shrink-0" />
          <span className="text-xs font-mono font-black uppercase tracking-wider text-emerald-200">
            District Micro-Climate & Soil Readiness Filter
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          Syncs GIS Parcel telemetry with active seasonal calendar
        </span>
      </div>

      {/* District Pill Bar */}
      <div className="flex flex-wrap gap-2">
        {districtList.map((d) => {
          const isSelected = currentKey.includes(d.key) || d.key.includes(currentKey);
          return (
            <button
              key={d.key}
              onClick={() => onSelectDistrict(d.key)}
              className={cn(
                "px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 border active:scale-95",
                isSelected
                  ? "bg-amber-500 text-slate-950 border-amber-300 font-black shadow-md"
                  : "bg-white/5 text-emerald-200 border-white/10 hover:bg-white/10 hover:text-white"
              )}
            >
              <span>{d.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active District Quick Dossier Card */}
      <div className="bg-black/30 p-4 rounded-2xl border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-mono uppercase text-slate-400 flex items-center gap-1">
            <Mountain size={11} className="text-emerald-400" /> Zone & Elevation
          </span>
          <span className="font-bold text-white leading-tight">
            {activeTelemetry.zoneName}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-mono uppercase text-slate-400 flex items-center gap-1">
            <Sprout size={11} className="text-emerald-400" /> Soil Readiness Status
          </span>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white/10 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-400 rounded-full"
                style={{ width: `${activeTelemetry.soilReadinessPct}%` }}
              />
            </div>
            <span className="font-extrabold text-amber-300 text-[11px]">
              {activeTelemetry.soilReadinessPct}%
            </span>
          </div>
          <span className="text-[10px] text-emerald-200/80 font-mono">
            {activeTelemetry.currentSoilReadiness}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-mono uppercase text-slate-400 flex items-center gap-1">
            <Droplets size={11} className="text-sky-400" /> Water Availability
          </span>
          <span className="font-bold text-sky-200 leading-tight">
            {activeTelemetry.waterAvailabilityStatus}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            Target: {activeTelemetry.targetPlantingWindow}
          </span>
        </div>
      </div>
    </div>
  );
}
