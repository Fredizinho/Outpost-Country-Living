import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, ChevronDown, ChevronUp, MapPin, Globe, Check, 
  X, Wheat, Sprout, Filter, RotateCcw, Bot, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FocusRegionId, MALAWI_REGIONAL_BOUNDS } from './ScoutingMap';
import { MALAWI_DISTRICTS, MalawiDistrictSpec, getDistrictByIdOrName } from '@/data/malawiDistrictData';

export interface CompactRegionPickerProps {
  activeFocusRegion: FocusRegionId;
  onSelectRegion: (regionId: FocusRegionId) => void;
  activeDistrict: MalawiDistrictSpec | null;
  onSelectDistrict: (district: MalawiDistrictSpec | null) => void;
  activeMode: 'regional' | 'parcels';
  onToggleMode: (mode: 'regional' | 'parcels') => void;
  onOpenAiScout?: () => void;
  isAutoHidden?: boolean;
  onWakeUp?: () => void;
}

export function CompactRegionPicker({
  activeFocusRegion,
  onSelectRegion,
  activeDistrict,
  onSelectDistrict,
  activeMode,
  onToggleMode,
  onOpenAiScout,
  isAutoHidden = false,
  onWakeUp
}: CompactRegionPickerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentRegionSpec = MALAWI_REGIONAL_BOUNDS[activeFocusRegion];

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const regionDistricts: MalawiDistrictSpec[] = useMemo(() => {
    if (activeFocusRegion === 'all') {
      return MALAWI_DISTRICTS;
    }
    const districtNames = MALAWI_REGIONAL_BOUNDS[activeFocusRegion].districts;
    return districtNames
      .map(name => getDistrictByIdOrName(name))
      .filter((d): d is MalawiDistrictSpec => d !== undefined);
  }, [activeFocusRegion]);

  return (
    <div 
      ref={dropdownRef}
      onMouseEnter={onWakeUp}
      className={cn(
        "absolute top-14 sm:top-15 left-3 z-30 pointer-events-auto transition-all duration-300",
        isAutoHidden && !isOpen ? "opacity-35 hover:opacity-100" : "opacity-100"
      )}
      id="compact-region-picker"
    >
      {/* Floating Trigger Pill */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "h-10 px-3.5 rounded-2xl font-mono text-xs font-bold transition-all flex items-center gap-2 border shadow-2xl backdrop-blur-2xl cursor-pointer select-none",
            isOpen
              ? "bg-amber-500 text-slate-950 border-amber-300 font-black shadow-amber-500/20"
              : "bg-slate-950/90 text-slate-200 border-white/15 hover:border-amber-400/50 hover:bg-slate-900"
          )}
          title="Change Region or District"
        >
          <Compass size={15} className={isOpen ? "text-slate-950" : "text-amber-400"} />
          <span className="font-bold tracking-tight">
            {activeDistrict ? `${activeDistrict.name} District` : currentRegionSpec.label}
          </span>
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} className="text-slate-400" />}
        </button>

        {/* Mode Toggle Button (Compact) */}
        <button
          onClick={() => onToggleMode(activeMode === 'regional' ? 'parcels' : 'regional')}
          className={cn(
            "h-10 px-2.5 rounded-2xl font-mono text-[11px] font-bold transition-all hidden sm:flex items-center gap-1.5 border shadow-2xl backdrop-blur-2xl cursor-pointer select-none",
            activeMode === 'regional'
              ? "bg-slate-950/90 text-amber-300 border-amber-500/30 hover:border-amber-400"
              : "bg-emerald-950/90 text-emerald-300 border-emerald-500/40 hover:border-emerald-400"
          )}
          title="Toggle between Climate Zones and Verified Agro Stations"
        >
          {activeMode === 'regional' ? (
            <>
              <Wheat size={13} className="text-amber-400" />
              <span>Climate Zones</span>
            </>
          ) : (
            <>
              <Sprout size={13} className="text-emerald-400" />
              <span>Agro Stations</span>
            </>
          )}
        </button>

        {/* AI Map Scout Button */}
        {onOpenAiScout && (
          <button
            onClick={onOpenAiScout}
            className="h-10 px-3 rounded-2xl font-sans text-xs font-bold transition-all flex items-center gap-1.5 border shadow-2xl backdrop-blur-2xl cursor-pointer select-none bg-gradient-to-r from-emerald-950/90 via-slate-950/90 to-emerald-900/90 text-emerald-300 border-emerald-400/50 hover:border-emerald-300 hover:text-white group"
            title="Open AI Map Scout (Gemini 3.8 Flash + Google Maps Grounding)"
          >
            <div className="w-5 h-5 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 group-hover:scale-105 transition-transform">
              <Bot size={13} />
            </div>
            <span className="hidden xs:inline tracking-tight">AI Scout</span>
            <Sparkles size={11} className="text-amber-400 animate-pulse" />
          </button>
        )}
      </div>

      {/* Floating Dropdown Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            className="mt-2 w-[calc(100vw-2rem)] sm:w-96 md:w-[440px] max-h-[80vh] overflow-y-auto bg-slate-950/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-4 shadow-2xl flex flex-col gap-4 text-white"
          >
            {/* Header & Reset */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h4 className="serif text-base font-bold text-white">Geographic Focus</h4>
                <p className="text-[10px] font-mono text-slate-400">Select regional territory or district</p>
              </div>
              <div className="flex items-center gap-1.5">
                {(activeDistrict || activeFocusRegion !== 'all') && (
                  <button
                    onClick={() => {
                      onSelectDistrict(null);
                      onSelectRegion('all');
                      setIsOpen(false);
                    }}
                    className="text-xs font-mono text-amber-400 hover:text-amber-300 px-2 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <RotateCcw size={11} />
                    <span>All Malawi</span>
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            {/* Region Selector Tabs */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Macro Geographic Region:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {(['all', 'north', 'central', 'south'] as FocusRegionId[]).map((regKey) => {
                  const spec = MALAWI_REGIONAL_BOUNDS[regKey];
                  const isSelected = activeFocusRegion === regKey && !activeDistrict;
                  return (
                    <button
                      key={regKey}
                      onClick={() => {
                        onSelectRegion(regKey);
                        onSelectDistrict(null);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "py-2 px-2.5 rounded-xl border text-center font-mono text-xs font-bold transition-all cursor-pointer",
                        isSelected
                          ? "bg-amber-500 text-slate-950 border-amber-300 shadow font-black"
                          : "bg-slate-900 border-white/10 text-slate-300 hover:border-white/30 hover:bg-slate-800"
                      )}
                    >
                      {spec.label.split(' ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mode Switcher */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Layer Mode:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onToggleMode('regional')}
                  className={cn(
                    "p-2 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer font-mono text-xs",
                    activeMode === 'regional'
                      ? "bg-amber-500/20 border-amber-500 text-amber-200"
                      : "bg-slate-900 border-white/10 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  )}
                >
                  <Wheat size={15} className="text-amber-400 shrink-0" />
                  <div className="truncate">
                    <span className="font-bold block">Climate Zones</span>
                    <span className="text-[10px] text-slate-400">28 Agro-Ecology Zones</span>
                  </div>
                </button>
                <button
                  onClick={() => onToggleMode('parcels')}
                  className={cn(
                    "p-2 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer font-mono text-xs",
                    activeMode === 'parcels'
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-200"
                      : "bg-slate-900 border-white/10 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  )}
                >
                  <Sprout size={15} className="text-emerald-400 shrink-0" />
                  <div className="truncate">
                    <span className="font-bold block">Agro Stations</span>
                    <span className="text-[10px] text-slate-400">Research Benchmarks</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Districts List for Active Region */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  {currentRegionSpec.label} Districts ({regionDistricts.length}):
                </span>
                {activeDistrict && (
                  <button
                    onClick={() => {
                      onSelectDistrict(null);
                      setIsOpen(false);
                    }}
                    className="text-[10px] font-mono text-amber-400 hover:underline"
                  >
                    Clear District Selection
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-56 overflow-y-auto pr-1">
                {regionDistricts.map((d) => {
                  const isSelected = activeDistrict?.id === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => {
                        onSelectDistrict(d);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "p-2 rounded-xl border text-left flex flex-col gap-0.5 transition-all cursor-pointer",
                        isSelected
                          ? "bg-amber-500/25 border-amber-500 text-amber-200 shadow-sm"
                          : "bg-slate-900/90 border-white/5 text-slate-300 hover:border-white/20 hover:bg-slate-800"
                      )}
                    >
                      <span className="text-xs font-mono font-bold truncate">{d.name}</span>
                      <span className="text-[10px] font-mono text-slate-400 truncate">
                        {d.rainfallAnnualMm}mm • Gr {d.feasibilityGrade}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
