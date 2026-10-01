import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Calculator,
  FileText,
  Keyboard,
  Sprout,
  Droplets,
  Sun,
  Layers,
  Trash2,
  Check,
  Copy,
  Sparkles,
  ArrowRightLeft,
} from 'lucide-react';
import {
  DISTRICT_LIST,
  HOMESTEAD_GENERAL_CONSTANTS,
  PLANTING_PIT_SPECS,
} from '@/constants';
import { cn } from '@/lib/utils';

interface DesktopReferenceInspectorProps {
  isOpen: boolean;
  onClose: () => void;
}

type InspectorTab = 'sizer' | 'notes' | 'shortcuts';

const SCRATCHPAD_STORAGE_KEY = 'outpost_desktop_scratchpad_v1';

export function DesktopReferenceInspector({
  isOpen,
  onClose,
}: DesktopReferenceInspectorProps) {
  const [activeTab, setActiveTab] = useState<InspectorTab>('sizer');

  // Quick Sizer State
  const [districtId, setDistrictId] = useState<string>('dedza');
  const [familySize, setFamilySize] = useState<number>(5);
  const [roofSqm, setRoofSqm] = useState<number>(90);
  const [hectaresInput, setHectaresInput] = useState<number>(2);

  // Field Scratchpad State
  const [notes, setNotes] = useState<string>(() => {
    try {
      return (
        localStorage.getItem(SCRATCHPAD_STORAGE_KEY) ||
        `# Malawi Homestead Scouting Notes\n• Target District: Dedza / Ntcheu Highlands\n• Water Check: Verify perennial spring flow in October (Chizimalupsya)\n• Customary Land: Schedule courtesy visit with Traditional Authority (Mfumu)\n• Orchard Plan: Dig 25 × 3x3x3ft EGW planting pits before first November rains`
      );
    } catch {
      return '';
    }
  });
  const [copiedNotes, setCopiedNotes] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(SCRATCHPAD_STORAGE_KEY, notes);
    } catch {
      // Ignore storage quota errors
    }
  }, [notes]);

  const selectedDistrict = useMemo(
    () => DISTRICT_LIST.find((d) => d.id === districtId) || DISTRICT_LIST[0],
    [districtId]
  );

  const pitSpec = useMemo(
    () =>
      PLANTING_PIT_SPECS[selectedDistrict.recommendedPitKey] ||
      PLANTING_PIT_SPECS.egwDeepPit,
    [selectedDistrict]
  );

  const metrics = useMemo(() => {
    const stapleAcres = +(
      familySize * HOMESTEAD_GENERAL_CONSTANTS.LAND_ACRES_PER_PERSON_STAPLE
    ).toFixed(2);
    const orchardAcres = +(
      familySize * HOMESTEAD_GENERAL_CONSTANTS.LAND_ACRES_PER_PERSON_ORCHARD
    ).toFixed(2);
    const totalAcres = +(
      stapleAcres +
      orchardAcres +
      HOMESTEAD_GENERAL_CONSTANTS.LAND_ACRES_BASE_WOODLOT_SHELTER
    ).toFixed(2);

    const rainwaterLiters = Math.round(
      roofSqm *
        selectedDistrict.rainfallAnnualMm *
        HOMESTEAD_GENERAL_CONSTANTS.DEFAULT_ROOF_RUNOFF_COEFF
    );

    const dailyKwh = +(1.8 + familySize * 0.45).toFixed(1);
    const solarKw = +(
      dailyKwh /
      (selectedDistrict.solarKwhDay *
        HOMESTEAD_GENERAL_CONSTANTS.SOLAR_SYSTEM_EFFICIENCY)
    ).toFixed(2);

    const treePits = Math.max(12, Math.round(orchardAcres * 48));

    return {
      totalAcres,
      rainwaterLiters,
      solarKw,
      treePits,
      biocharKg: Math.round(treePits * pitSpec.biocharKgPerPit),
    };
  }, [familySize, roofSqm, selectedDistrict, pitSpec]);

  if (!isOpen) return null;

  const handleCopyNotes = () => {
    navigator.clipboard?.writeText(notes);
    setCopiedNotes(true);
    setTimeout(() => setCopiedNotes(false), 1800);
  };

  return (
    <aside
      aria-label="Desktop Side-by-Side Inspector"
      className="w-80 xl:w-88 shrink-0 h-full bg-[#F5F2EA] dark:bg-[#08150E] border-l border-stone-300/90 dark:border-emerald-900/80 flex flex-col select-none z-20 shadow-xl"
    >
      {/* Inspector Header Bar */}
      <div className="h-9 px-3 bg-[#EAE5D7] dark:bg-[#06110B] border-b border-stone-300/80 dark:border-emerald-950 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-stone-800 dark:text-amber-300">
          <Sparkles size={13} className="text-emerald-700 dark:text-amber-400" />
          <span>Desktop Inspector Dock</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          title="Close Inspector Dock (⌘I)"
          className="p-1 rounded-md text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>

      {/* Inspector Mode Tabs */}
      <div className="grid grid-cols-3 gap-1 p-1.5 bg-stone-200/70 dark:bg-[#050E09] border-b border-stone-300/70 dark:border-emerald-950 text-[11px] font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('sizer')}
          className={cn(
            'py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap',
            activeTab === 'sizer'
              ? 'bg-white dark:bg-emerald-900/90 text-stone-900 dark:text-amber-200 shadow-2xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          )}
        >
          <Calculator size={12} />
          <span>Quick Sizer</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('notes')}
          className={cn(
            'py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap',
            activeTab === 'notes'
              ? 'bg-white dark:bg-emerald-900/90 text-stone-900 dark:text-amber-200 shadow-2xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          )}
        >
          <FileText size={12} />
          <span>Scratchpad</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('shortcuts')}
          className={cn(
            'py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap',
            activeTab === 'shortcuts'
              ? 'bg-white dark:bg-emerald-900/90 text-stone-900 dark:text-amber-200 shadow-2xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          )}
        >
          <Keyboard size={12} />
          <span>Hotkeys</span>
        </button>
      </div>

      {/* Inspector Body */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3.5 flex flex-col gap-4 text-xs">
        {activeTab === 'sizer' && (
          <>
            <div className="flex flex-col gap-2.5 bg-white dark:bg-[#0C1D13] p-3 rounded-xl border border-stone-200/90 dark:border-emerald-900/60">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="inspector-district"
                  className="font-bold text-stone-700 dark:text-stone-200"
                >
                  Target District
                </label>
                <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400">
                  {selectedDistrict.region} Region
                </span>
              </div>
              <select
                id="inspector-district"
                value={districtId}
                onChange={(e) => setDistrictId(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-stone-50 dark:bg-[#07130C] border border-stone-300 dark:border-emerald-800/70 text-stone-900 dark:text-stone-100 font-semibold text-xs"
              >
                {DISTRICT_LIST.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.rainfallAnnualMm}mm/yr)
                  </option>
                ))}
              </select>

              <div className="flex items-center justify-between pt-1">
                <span className="text-stone-600 dark:text-stone-300 font-medium">
                  Household Size
                </span>
                <span className="font-mono font-bold text-emerald-800 dark:text-amber-300 tabular-nums">
                  {familySize} Stewards
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={12}
                value={familySize}
                onChange={(e) => setFamilySize(Number(e.target.value))}
                className="w-full accent-emerald-700 dark:accent-amber-400 cursor-pointer"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-stone-600 dark:text-stone-300 font-medium">
                  Roof Catchment Area
                </span>
                <span className="font-mono font-bold text-sky-700 dark:text-sky-300 tabular-nums">
                  {roofSqm} m²
                </span>
              </div>
              <input
                type="range"
                min={40}
                max={240}
                step={10}
                value={roofSqm}
                onChange={(e) => setRoofSqm(Number(e.target.value))}
                className="w-full accent-sky-600 dark:accent-sky-400 cursor-pointer"
              />
            </div>

            {/* Instant Computed Readout */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#0C1D13] border border-stone-200/90 dark:border-emerald-900/60">
                <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                  <span>Arable Land</span>
                  <Sprout size={13} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="font-mono text-base font-bold text-stone-900 dark:text-white tabular-nums mt-0.5">
                  {metrics.totalAcres} ac
                </div>
                <div className="text-[10px] font-mono text-stone-500 dark:text-stone-400 tabular-nums">
                  ≈ {(metrics.totalAcres * 0.4047).toFixed(2)} ha
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white dark:bg-[#0C1D13] border border-stone-200/90 dark:border-emerald-900/60">
                <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                  <span>Roof Harvest</span>
                  <Droplets size={13} className="text-sky-600 dark:text-sky-400" />
                </div>
                <div className="font-mono text-base font-bold text-stone-900 dark:text-white tabular-nums mt-0.5">
                  {(metrics.rainwaterLiters / 1000).toFixed(1)}k L
                </div>
                <div className="text-[10px] font-mono text-stone-500 dark:text-stone-400 tabular-nums">
                  {Math.round(metrics.rainwaterLiters / 365)} L/day
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white dark:bg-[#0C1D13] border border-stone-200/90 dark:border-emerald-900/60">
                <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                  <span>Solar Array</span>
                  <Sun size={13} className="text-amber-600 dark:text-amber-400" />
                </div>
                <div className="font-mono text-base font-bold text-stone-900 dark:text-white tabular-nums mt-0.5">
                  {metrics.solarKw} kW
                </div>
                <div className="text-[10px] font-mono text-stone-500 dark:text-stone-400 tabular-nums">
                  {selectedDistrict.solarKwhDay} PSH/day
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white dark:bg-[#0C1D13] border border-stone-200/90 dark:border-emerald-900/60">
                <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                  <span>3×3×3ft Pits</span>
                  <Layers size={13} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="font-mono text-base font-bold text-stone-900 dark:text-white tabular-nums mt-0.5">
                  {metrics.treePits} Pits
                </div>
                <div className="text-[10px] font-mono text-stone-500 dark:text-stone-400 tabular-nums">
                  {metrics.biocharKg}kg Biochar
                </div>
              </div>
            </div>

            {/* Quick Unit Converter (Hectares <-> Acres & Meters <-> Feet) */}
            <div className="p-3 rounded-xl bg-white dark:bg-[#0C1D13] border border-stone-200/90 dark:border-emerald-900/60 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-stone-700 dark:text-stone-200">
                <span className="flex items-center gap-1.5">
                  <ArrowRightLeft size={12} className="text-emerald-700 dark:text-amber-400" />
                  <span>Land Unit Converter</span>
                </span>
                <span className="font-mono text-[10px] text-stone-500">1 ha = 2.471 ac</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="text-[10px] text-stone-500 block mb-0.5">Hectares (ha)</label>
                  <input
                    type="number"
                    min={0.1}
                    step={0.5}
                    value={hectaresInput}
                    onChange={(e) => setHectaresInput(Math.max(0, Number(e.target.value)))}
                    className="w-full px-2 py-1 rounded-lg bg-stone-50 dark:bg-[#07130C] border border-stone-300 dark:border-emerald-800/70 font-mono text-xs font-bold text-stone-900 dark:text-white tabular-nums"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] text-stone-500 block mb-0.5">Acres (ac)</label>
                  <div className="px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300/60 dark:border-emerald-800/60 font-mono text-xs font-bold text-emerald-900 dark:text-amber-300 tabular-nums">
                    {(hectaresInput * 2.47105).toFixed(2)} ac
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'notes' && (
          <div className="flex-1 flex flex-col gap-2.5 h-full">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-stone-700 dark:text-stone-200">
                Persistent Field Scratchpad
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleCopyNotes}
                  className="px-2 py-1 rounded-md bg-white dark:bg-emerald-950 border border-stone-300 dark:border-emerald-800 text-[10px] font-semibold text-stone-700 dark:text-emerald-200 flex items-center gap-1 cursor-pointer"
                >
                  {copiedNotes ? <Check size={11} /> : <Copy size={11} />}
                  <span>{copiedNotes ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setNotes('')}
                  title="Clear Scratchpad"
                  className="p-1 rounded-md text-stone-500 hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Jot down parcel coordinates, borehole depths, Chief (Mfumu) names, or seed lists while switching across tabs..."
              className="w-full flex-1 min-h-[280px] p-3 rounded-xl bg-white dark:bg-[#07130C] border border-stone-300 dark:border-emerald-900/80 text-xs font-mono text-stone-800 dark:text-stone-100 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-emerald-600 select-text"
            />
            <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
              Auto-saved locally to your device offline vault.
            </span>
          </div>
        )}

        {activeTab === 'shortcuts' && (
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-stone-700 dark:text-stone-200">
              Desktop Keyboard Shortcuts
            </span>
            {[
              { keys: '⌘K / Ctrl+K', label: 'Open Command & Search Palette' },
              { keys: '⌘B / Ctrl+B', label: 'Toggle Left Workspace Explorer' },
              { keys: '⌘I / Ctrl+I', label: 'Toggle Right Reference Inspector' },
              { keys: 'Alt + 1', label: 'Switch to Sanctuary Home Tab' },
              { keys: 'Alt + 2', label: 'Switch to Land & Districts Tab' },
              { keys: 'Alt + 3', label: 'Switch to 28-District GIS Map Tab' },
              { keys: 'Alt + 4', label: 'Switch to Crops & Soil Tab' },
              { keys: 'Alt + 5', label: 'Switch to Engineering Guide Tab' },
              { keys: 'Alt + 6', label: 'Switch to Calculators & BoQ Tab' },
              { keys: 'Alt + T', label: 'Switch to Exodus Readiness Ledger' },
              { keys: 'Alt + ← / →', label: 'Navigate History Back / Forward' },
            ].map((item) => (
              <div
                key={item.keys}
                className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white dark:bg-[#0C1D13] border border-stone-200/80 dark:border-emerald-900/60"
              >
                <span className="text-[11px] text-stone-700 dark:text-stone-300">
                  {item.label}
                </span>
                <kbd className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-[#06120B] border border-stone-300 dark:border-emerald-800 font-mono text-[10px] font-bold text-stone-800 dark:text-amber-300 shrink-0">
                  {item.keys}
                </kbd>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
