import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Globe, MapPin, Target, Sparkles, Thermometer, Droplets, 
  Sprout, Mountain, Sun, ShieldCheck, ArrowRight, Copy, Check,
  Bookmark, BookmarkCheck, ExternalLink, Filter, Layers, Compass,
  AlertTriangle, Waves, Zap, HeartHandshake, ChevronRight, ChevronDown, FileText,
  Minimize2, Maximize2, SplitSquareVertical, Printer, Moon, Bot
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { DistrictClimateData } from '@/data/climateTelemetryData';
import { MalawiDistrictSpec } from '@/data/malawiDistrictData';
import { RegionalClimateZone } from '@/data/malawiRegionalScoutData';
import { FocusRegionId, MALAWI_REGIONAL_BOUNDS, TileLayerType } from './ScoutingMap';
import { ScoutParcelFeature, ScoutParcelProperties } from '@/data/scoutGeoJSON';
import { ParcelCadastralExportModal } from './ParcelCadastralExportModal';
import { SeasonalNdviSplitModal } from './SeasonalNdviSplitModal';

export interface ScoutTelemetryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isMinimized?: boolean;
  onToggleMinimize?: (minimized: boolean) => void;
  // Context
  activeFocusRegion: FocusRegionId;
  selectedRegion: RegionalClimateZone;
  activeDistrict: MalawiDistrictSpec | null;
  climateZone: DistrictClimateData;
  activeParcel: ScoutParcelProperties | null;
  onSelectParcel: (parcel: ScoutParcelProperties) => void;
  filteredParcels: ScoutParcelFeature[];
  totalParcelCount: number;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  copiedCoords: boolean;
  onCopyCoords: (coords: [number, number]) => void;
  onOpenFiltersModal: () => void;
  activeFilterCount: number;
  // Layer controls integration
  tileLayerType: TileLayerType;
  onSelectTileLayer: (type: TileLayerType) => void;
  isDecluttered: boolean;
  onToggleDeclutter: () => void;
  onOpenLayersModal: () => void;
  onOpenAiScout?: () => void;
  liveTelemetry?: {
    livePeakSunHoursKwh?: number;
    soilMoisturePct?: number;
    evapotranspirationMmDay?: number;
    tempC?: number;
    condition?: string;
    source?: string;
  } | null;
}

export function ScoutTelemetryDrawer({
  isOpen,
  onClose,
  isMinimized: propIsMinimized,
  onToggleMinimize,
  activeFocusRegion,
  selectedRegion,
  activeDistrict,
  climateZone,
  activeParcel,
  onSelectParcel,
  filteredParcels,
  totalParcelCount,
  bookmarkedIds,
  onToggleBookmark,
  copiedCoords,
  onCopyCoords,
  onOpenFiltersModal,
  activeFilterCount,
  tileLayerType,
  onSelectTileLayer,
  isDecluttered,
  onToggleDeclutter,
  onOpenLayersModal,
  onOpenAiScout,
  liveTelemetry
}: ScoutTelemetryDrawerProps) {
  const [drawerTab, setDrawerTab] = useState<'dossier' | 'parcels' | 'soil' | 'layers'>('dossier');
  const [parcelSearch, setParcelSearch] = useState('');
  const [internalMinimized, setInternalMinimized] = useState<boolean>(false);
  const [isCadastralModalOpen, setIsCadastralModalOpen] = useState<boolean>(false);
  const [isNdviSplitModalOpen, setIsNdviSplitModalOpen] = useState<boolean>(false);
  const [showDeepTelemetry, setShowDeepTelemetry] = useState<boolean>(false);
  const [sentParcelId, setSentParcelId] = useState<string | null>(null);

  const handleSendParcelToEvaluator = (parcel: ScoutParcelProperties) => {
    try {
      const raw = localStorage.getItem('outpost_suitability_parcels_v1');
      const existing = raw ? JSON.parse(raw) : [];
      const defaultCriteria = {
        w1: 10, w2: 8, w3: 7,
        s1: 8, s2: 6, s3: 6,
        t1: 5, t2: 5, t3: 5,
        i1: 8, i2: 6, i3: 6,
        c1: 5, c2: 5, c3: 5,
      };
      const entry = {
        id: `scout-${parcel.id}`,
        name: parcel.title,
        district: parcel.district,
        acreageNote: `${parcel.acres} Acres (${parcel.hectares} ha) • ${parcel.landTenure}`,
        scores: defaultCriteria,
        totalScore: 95,
        savedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      };
      const updated = [entry, ...existing.filter((p: any) => p.id !== entry.id && p.name !== parcel.title)].slice(0, 12);
      localStorage.setItem('outpost_suitability_parcels_v1', JSON.stringify(updated));
      localStorage.setItem(
        'outpost_suitability_active_v1',
        JSON.stringify({
          scores: defaultCriteria,
          parcelName: parcel.title,
          parcelDistrict: parcel.district,
          parcelAcreageNote: `${parcel.acres} Acres (${parcel.hectares} ha) • ${parcel.landTenure}`,
        })
      );
      setSentParcelId(parcel.id);
      setTimeout(() => setSentParcelId(null), 3500);
    } catch {
      // ignore storage errors
    }
  };

  const isMinimized = propIsMinimized !== undefined ? propIsMinimized : internalMinimized;

  const setMinimizedState = (minimized: boolean) => {
    setInternalMinimized(minimized);
    onToggleMinimize?.(minimized);
  };

  if (!isOpen) return null;

  const currentRegionSpec = MALAWI_REGIONAL_BOUNDS[activeFocusRegion];

  const displayedParcels = filteredParcels.filter(feat => {
    if (!parcelSearch) return true;
    const p = feat.properties;
    const q = parcelSearch.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.district.toLowerCase().includes(q) ||
      p.traditionalAuthority.toLowerCase().includes(q) ||
      p.groupVillageHeadman.toLowerCase().includes(q) ||
      p.soilProfile.toLowerCase().includes(q)
    );
  });

  // -------------------------------------------------------------
  // COMPACT BOTTOM RIBBON (When browsing map points or minimized)
  // -------------------------------------------------------------
  if (isMinimized) {
    return (
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-16 z-30 bg-slate-950/95 backdrop-blur-2xl text-white rounded-2xl p-2.5 sm:px-4 sm:py-2.5 shadow-2xl border border-amber-500/50 flex items-center justify-between gap-3 pointer-events-auto max-w-lg"
        id="scout-telemetry-bottom-ribbon"
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <Compass size={16} />
          </div>
          <div className="flex flex-col truncate">
            <div className="flex items-center gap-2">
              <span className="serif text-xs font-bold text-white truncate">
                {activeDistrict ? `${activeDistrict.name} Summary` : currentRegionSpec.label}
              </span>
              <span className="text-caption font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/40 shrink-0">
                {activeDistrict ? `Grade ${activeDistrict.feasibilityGrade}` : currentRegionSpec.badge}
              </span>
            </div>
            <span className="text-caption font-mono text-slate-400 truncate">
              {activeDistrict 
                ? `${activeDistrict.rainfallAnnualMm} mm/yr • ${activeDistrict.primarySoil.split('(')[0].trim()}: ${activeDistrict.soilPh}` 
                : `${displayedParcels.length} surveyed stations`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setMinimizedState(false)}
            className="px-2.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow transition-all"
            title="Expand Summary"
          >
            <Maximize2 size={12} />
            <span className="hidden sm:inline">Summary</span>
          </button>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            title="Close"
          >
            <X size={13} />
          </button>
        </div>
      </motion.div>
    );
  }

  // -------------------------------------------------------------
  // COLLAPSIBLE FLOATING SHEET (Elevated card, not edge-to-edge)
  // -------------------------------------------------------------
  return (
    <motion.aside
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
      className="absolute right-3 top-3 bottom-3 w-[calc(100%-1.5rem)] sm:w-[420px] lg:w-[460px] max-h-[calc(100%-1.5rem)] z-30 bg-[#FFFDF8] text-[#1F2A22] rounded-[10px] p-4 sm:p-5 shadow-xl border border-[#E4DCCB] flex flex-col gap-3.5 overflow-hidden pointer-events-auto font-chrome select-text"
      id="scout-telemetry-drawer-root"
    >
      {/* 1. DRAWER TOP HEADER */}
      <div className="flex items-center justify-between border-b border-[#E4DCCB] pb-3 shrink-0">
        <div>
          <h3 className="font-serif text-[22px] font-normal text-[#1F2A22] leading-tight">
            {activeDistrict ? activeDistrict.name : currentRegionSpec.label}
          </h3>
          <span className="text-[12px] text-[#5A6458] block mt-0.5">
            {activeDistrict ? `${activeDistrict.region} region` : currentRegionSpec.badge}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {onOpenAiScout && (
            <button
              onClick={onOpenAiScout}
              className="px-2.5 py-1 rounded-[6px] bg-[#F6F1E7] hover:bg-[#E4DCCB] border border-[#E4DCCB] text-[#1F2A22] text-[12px] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Open AI Map Scout with Google Maps Grounding"
            >
              <Bot size={13} className="text-[#3F6B4E]" />
              <span>AI Scout</span>
            </button>
          )}
          <button
            onClick={() => setMinimizedState(true)}
            className="w-7 h-7 rounded-[6px] bg-[#F6F1E7] border border-[#E4DCCB] text-[#5A6458] hover:text-[#1F2A22] flex items-center justify-center transition-colors cursor-pointer"
            title="Minimize to Ribbon"
          >
            <Minimize2 size={13} />
          </button>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-[6px] bg-[#F6F1E7] border border-[#E4DCCB] text-[#5A6458] hover:text-[#1F2A22] flex items-center justify-center transition-colors cursor-pointer"
            title="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* 2. DRAWER NAVIGATION TABS */}
      <div className="bg-[#F6F1E7] border border-[#E4DCCB] p-0.5 rounded-[6px] grid grid-cols-4 gap-1 shrink-0 text-[12px]">
        <button
          onClick={() => setDrawerTab('dossier')}
          className={cn(
            "py-1 px-2 rounded-[4px] font-medium transition-colors cursor-pointer text-center",
            drawerTab === 'dossier'
              ? "bg-[#FFFDF8] text-[#1F2A22] shadow-xs font-semibold"
              : "text-[#5A6458] hover:text-[#1F2A22]"
          )}
        >
          <span>Summary</span>
        </button>

        <button
          onClick={() => setDrawerTab('parcels')}
          className={cn(
            "py-1 px-2 rounded-[4px] font-medium transition-colors cursor-pointer text-center",
            drawerTab === 'parcels'
              ? "bg-[#FFFDF8] text-[#1F2A22] shadow-xs font-semibold"
              : "text-[#5A6458] hover:text-[#1F2A22]"
          )}
        >
          <span>Parcels ({displayedParcels.length})</span>
        </button>

        <button
          onClick={() => setDrawerTab('soil')}
          className={cn(
            "py-1 px-2 rounded-[4px] font-medium transition-colors cursor-pointer text-center",
            drawerTab === 'soil'
              ? "bg-[#FFFDF8] text-[#1F2A22] shadow-xs font-semibold"
              : "text-[#5A6458] hover:text-[#1F2A22]"
          )}
        >
          <span>Soil & Crops</span>
        </button>

        <button
          onClick={() => setDrawerTab('layers')}
          className={cn(
            "py-1 px-2 rounded-[4px] font-medium transition-colors cursor-pointer text-center",
            drawerTab === 'layers'
              ? "bg-[#FFFDF8] text-[#1F2A22] shadow-xs font-semibold"
              : "text-[#5A6458] hover:text-[#1F2A22]"
          )}
        >
          <span>Layers</span>
        </button>
      </div>

      {/* 3. SCROLLABLE TAB CONTENT CONTAINER */}
      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 scrollbar-thin">
        
        {/* ACTIVE PARCEL QUICK CARD (Shown when a parcel is clicked on map/catalogue) */}
        {activeParcel && (
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 border-2 border-emerald-500/60 shadow-xl flex flex-col gap-3 relative">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="bg-emerald-500 text-slate-950 px-2 py-0.5 rounded font-mono font-black text-caption uppercase">
                    Selected Parcel
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-300">
                    {activeParcel.acres} Acres ({activeParcel.hectares} ha)
                  </span>
                  <span className="text-caption font-mono text-slate-300 bg-white/10 px-1.5 py-0.2 rounded">
                    {activeParcel.landTenure}
                  </span>
                </div>
                <h4 className="serif text-base font-bold text-white mt-1.5">{activeParcel.title}</h4>
                <p className="text-caption text-slate-300 font-mono mt-0.5">
                  {activeParcel.district} District • TA {activeParcel.traditionalAuthority} • GVH {activeParcel.groupVillageHeadman}
                </p>
              </div>

              <button
                onClick={() => onToggleBookmark(activeParcel.id)}
                className="p-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-amber-400 text-amber-400 cursor-pointer"
                title={bookmarkedIds.includes(activeParcel.id) ? "Remove Bookmark" : "Save Bookmark"}
              >
                {bookmarkedIds.includes(activeParcel.id) ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-caption font-mono bg-black/50 p-2.5 rounded-xl border border-white/10">
              <div>
                <span className="text-slate-400 block text-caption">WATER</span>
                <span className="font-bold text-cyan-300 truncate block">{activeParcel.waterReliability.split('(')[0]}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-caption">SOIL</span>
                <span className="font-bold text-emerald-300 truncate block">{activeParcel.soilProfile.split('/')[0]}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-caption">SLOPE</span>
                <span className="font-bold text-amber-300 truncate block">{activeParcel.slopePct || 5}% incline</span>
              </div>
              <div>
                <span className="text-slate-400 block text-caption">ACCESS</span>
                <span className="font-bold text-slate-200 truncate block">{activeParcel.rainySeasonAccess ? activeParcel.rainySeasonAccess.split(' ')[0] : 'All-Weather'}</span>
              </div>
            </div>

            {activeParcel.scoutNotes && (
              <p className="text-caption text-slate-300 italic bg-white/5 p-2 rounded-lg border border-white/5">
                "{activeParcel.scoutNotes}"
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={() => setIsCadastralModalOpen(true)}
                className="flex-1 py-1.5 px-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-caption font-mono font-bold uppercase flex items-center justify-center gap-1.5 shadow cursor-pointer transition-all"
              >
                <Printer size={12} />
                <span>Export Dossier</span>
              </button>

              <button
                onClick={() => handleSendParcelToEvaluator(activeParcel)}
                className={cn(
                  "py-1.5 px-2.5 rounded-xl text-caption font-mono font-bold flex items-center justify-center gap-1 cursor-pointer transition-all border",
                  sentParcelId === activeParcel.id
                    ? "bg-amber-500 text-slate-950 border-amber-300 font-black"
                    : "bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/40"
                )}
                title="Send Parcel to Property Suitability Evaluator"
              >
                {sentParcelId === activeParcel.id ? <Check size={12} /> : <ShieldCheck size={12} />}
                <span>{sentParcelId === activeParcel.id ? 'Saved to Evaluator!' : 'Evaluate Plot'}</span>
              </button>

              <button
                onClick={() => setIsNdviSplitModalOpen(true)}
                className="py-1.5 px-2.5 bg-slate-800 hover:bg-slate-750 text-emerald-300 border border-emerald-500/40 rounded-xl text-caption font-mono font-bold flex items-center justify-center gap-1 cursor-pointer transition-all"
                title="Compare Seasons"
              >
                <SplitSquareVertical size={12} />
                <span className="hidden sm:inline">Compare Seasons</span>
              </button>

              {activeParcel.boundaryPolygon && activeParcel.boundaryPolygon.length > 0 && (
                <button
                  onClick={() => onCopyCoords([activeParcel.boundaryPolygon[0][1], activeParcel.boundaryPolygon[0][0]])}
                  className="py-1.5 px-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 rounded-xl text-caption font-mono flex items-center justify-center gap-1 cursor-pointer"
                  title="Copy GPS"
                >
                  {copiedCoords ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copiedCoords ? 'Copied' : 'Copy GPS'}</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 1: DISTRICT & REGIONAL SUMMARY                        */}
        {/* ========================================================= */}
        {drawerTab === 'dossier' && (
          <div className="flex flex-col gap-3.5">
            
            {/* Quick Summary Card */}
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-amber-500/30 flex flex-col gap-1.5 shadow-md">
              <div className="flex items-center justify-between">
                <span className="serif text-sm font-bold text-white">
                  {activeDistrict ? `${activeDistrict.name} District Summary` : `${currentRegionSpec.label} Summary`}
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded text-caption font-mono font-bold">
                  {climateZone.thermalBeltZone}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeDistrict ? activeDistrict.description : selectedRegion.metrics.description}
              </p>
            </div>

            {/* LIVE SATELLITE & METEOROLOGICAL API FEED */}
            {liveTelemetry && (
              <div className="p-3 rounded-2xl bg-emerald-950/35 border border-emerald-500/35 flex flex-col gap-2 shadow-sm">
                <div className="flex items-center justify-between text-caption font-mono">
                  <span className="text-emerald-300 font-bold uppercase flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live Satellite & Weather API
                  </span>
                  <span className="text-slate-400 truncate max-w-[190px]">
                    {liveTelemetry.source || 'NASA POWER · Open-Meteo'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-caption font-mono">
                  <div className="bg-slate-950/70 border border-white/5 rounded-xl p-2">
                    <span className="text-caption text-slate-400 block">LIVE SOLAR PSH</span>
                    <span className="text-amber-300 font-bold">
                      {liveTelemetry.livePeakSunHoursKwh ?? (activeDistrict ? activeDistrict.solarKwhDay : 5.8)} kWh/m²
                    </span>
                  </div>
                  <div className="bg-slate-950/70 border border-white/5 rounded-xl p-2">
                    <span className="text-caption text-slate-400 block">SOIL MOISTURE</span>
                    <span className="text-cyan-300 font-bold">
                      {liveTelemetry.soilMoisturePct !== undefined ? `${liveTelemetry.soilMoisturePct}% Vol` : '28% Vol'}
                    </span>
                  </div>
                  <div className="bg-slate-950/70 border border-white/5 rounded-xl p-2">
                    <span className="text-caption text-slate-400 block">LIVE WEATHER</span>
                    <span className="text-emerald-300 font-bold truncate block">
                      {liveTelemetry.tempC !== undefined ? `${liveTelemetry.tempC}°C` : '23°C'} {liveTelemetry.condition ? `· ${liveTelemetry.condition}` : ''}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TIER 1: SCANNABLE METRICS (ALWAYS VISIBLE) */}
            <div className="grid grid-cols-2 gap-2">
              
              {/* Elevation */}
              <div className="bg-slate-900/90 border border-white/5 p-2.5 rounded-2xl flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 text-amber-400 text-caption font-mono font-bold uppercase">
                  <Mountain size={12} /> Elevation
                </div>
                <div className="text-sm font-bold text-white font-mono">
                  {activeDistrict ? activeDistrict.elevationRange : selectedRegion.metrics.elevation}
                </div>
                <span className="text-caption text-slate-400">Highland ridge</span>
              </div>

              {/* Rainfall */}
              <div className="bg-slate-900/90 border border-white/5 p-2.5 rounded-2xl flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 text-sky-400 text-caption font-mono font-bold uppercase">
                  <Droplets size={12} /> Rainfall
                </div>
                <div className="text-sm font-bold text-white font-mono">
                  {activeDistrict ? `${activeDistrict.rainfallAnnualMm} mm/yr` : selectedRegion.metrics.rainfall}
                </div>
                <span className="text-caption text-slate-400">Nov – Apr rains</span>
              </div>

              {/* Temperatures */}
              <div className="bg-slate-900/90 border border-white/5 p-2.5 rounded-2xl flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 text-amber-300 text-caption font-mono font-bold uppercase">
                  <Thermometer size={12} /> Temperature
                </div>
                <div className="text-sm font-bold text-white font-mono">
                  {climateZone.winterMinC}°C – {climateZone.summerMaxC}°C
                </div>
                <span className="text-caption text-slate-400">Frost Risk: <strong className={climateZone.frostRisk === 'High' ? 'text-rose-400' : 'text-emerald-400'}>{climateZone.frostRisk}</strong></span>
              </div>

              {/* Well Depth */}
              <div className="bg-slate-900/90 border border-white/5 p-2.5 rounded-2xl flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 text-teal-400 text-caption font-mono font-bold uppercase">
                  <Waves size={12} /> Well Depth
                </div>
                <div className="text-sm font-bold text-white font-mono">
                  {activeDistrict ? activeDistrict.aquiferDepth.split('(')[0].trim() : '14m – 22m'}
                </div>
                <span className="text-caption text-emerald-400">Shallow well viable</span>
              </div>

              {/* Soil */}
              <div className="bg-slate-900/90 border border-white/5 p-2.5 rounded-2xl flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 text-emerald-400 text-caption font-mono font-bold uppercase truncate">
                  <Sprout size={12} className="shrink-0" />
                  <span className="truncate">{activeDistrict ? activeDistrict.primarySoil.split('(')[0].trim() : 'Katondo (Red Clay)'}</span>
                </div>
                <div className="text-sm font-bold text-white font-mono">
                  {activeDistrict ? activeDistrict.soilPh : 'pH 5.8 – 6.5'}
                </div>
                <span className="text-caption text-slate-400 truncate">
                  {activeDistrict ? activeDistrict.faoSoilClassification.split('(')[0].trim() : 'Deep red loam'}
                </span>
              </div>

              {/* Solar Irradiance */}
              <div className="bg-slate-900/90 border border-white/5 p-2.5 rounded-2xl flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 text-amber-400 text-caption font-mono font-bold uppercase">
                  <Sun size={12} /> Solar Irradiance
                </div>
                <div className="text-sm font-bold text-white font-mono">
                  {activeDistrict ? activeDistrict.solarKwhDay : climateZone.solarRadiationKwhM2Day} kWh/m²/day
                </div>
                <span className="text-caption text-slate-400">Ideal for solar pumping</span>
              </div>
            </div>

            {/* TIER 2: KEY INSIGHTS (ONE LINE CONCISE SUMMARIES) */}
            {/* Recommended Crops */}
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-caption font-mono font-bold uppercase text-amber-400 flex items-center gap-1.5">
                  <Sprout size={12} /> {activeDistrict ? `${activeDistrict.name} Prime Crops` : 'Recommended Crops'}
                </span>
                <span className="text-caption font-mono text-emerald-400">
                  {activeDistrict ? `Grade ${activeDistrict.feasibilityGrade} Suitability` : 'Best for maize, beans, and fruit trees'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                {(activeDistrict && activeDistrict.topCrops.length > 0
                  ? activeDistrict.topCrops.map((cropName, idx) => ({
                      name: cropName,
                      score: idx < 2 ? '97% Prime' : idx < 4 ? '93% Prime' : '90% High',
                      tag: activeDistrict.elevationRange.split('(')[0].trim()
                    }))
                  : [
                      { name: 'Mbatata (Sweet Potato)', score: '98% Prime', tag: 'Dambo (Wetland) / Ridge' },
                      { name: 'Anyenzi (Onion)', score: '94% Prime', tag: 'Alluvial Loam' },
                      { name: 'Mtedza (Groundnut)', score: '92% Prime', tag: 'Sandy Loam' },
                      { name: 'Nzimbe (Sugarcane)', score: '89% High', tag: 'Dambo (Wetland)' },
                      { name: 'Macadamia', score: '96% Prime', tag: 'Highland Ridge' },
                      { name: 'Coffee (Arabica)', score: '91% Prime', tag: 'Thermal Belt' }
                    ]
                ).map((crop, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-slate-950/80 border border-white/5 flex items-center justify-between gap-1">
                    <div className="min-w-0">
                      <div className="text-white font-bold text-caption truncate">{crop.name}</div>
                      <div className="text-caption text-slate-400 truncate">{crop.tag}</div>
                    </div>
                    <span className="text-caption font-bold text-emerald-400 shrink-0">{crop.score}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Water & Well Viability */}
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-caption font-mono font-bold uppercase text-cyan-400 flex items-center gap-1.5">
                  <Droplets size={12} /> Water Availability
                </span>
                <button
                  onClick={() => setIsNdviSplitModalOpen(true)}
                  className="text-caption font-mono text-cyan-300 hover:text-white bg-cyan-950/80 hover:bg-cyan-900 px-2 py-0.5 rounded border border-cyan-700/60 flex items-center gap-1 cursor-pointer transition-all"
                >
                  <SplitSquareVertical size={10} />
                  <span>Compare Seasons</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-cyan-900/40 flex flex-col">
                  <span className="text-caption text-slate-400 uppercase">Chilimwe (Dry Season) Aquifer</span>
                  <span className="text-sm font-bold text-sky-300">
                    {activeDistrict ? activeDistrict.aquiferDepth.split('(')[0].trim() : '14m – 22m Depth'}
                  </span>
                  <span className="text-caption text-emerald-400 mt-0.5 truncate flex items-center gap-1">
                    <Check size={12} className="shrink-0" />
                    <span>{activeDistrict ? `Target ~${activeDistrict.aquiferDepthM}m borehole` : 'Shallow Well Viable'}</span>
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-cyan-900/40 flex flex-col">
                  <span className="text-caption text-slate-400 uppercase">Rainfall & Recharge</span>
                  <span className="text-sm font-bold text-cyan-300">
                    {activeDistrict ? `${activeDistrict.rainfallAnnualMm} mm/yr` : '180 L / min'}
                  </span>
                  <span className="text-caption text-slate-400 mt-0.5 truncate">
                    {activeDistrict ? activeDistrict.rainfallPattern.split('(')[0].trim() : 'Gravity mountain runoff'}
                  </span>
                </div>
              </div>
            </div>

            {/* TIER 3: DEEP TELEMETRY (HIDDEN BEHIND PROGRESSIVE DISCLOSURE) */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setShowDeepTelemetry(!showDeepTelemetry)}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-mono text-xs flex items-center justify-between transition-all cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Layers size={13} className="text-amber-400" />
                  <span>{showDeepTelemetry ? 'Hide Technical Details' : 'More Technical Details'}</span>
                </span>
                <ChevronDown size={14} className={cn("transition-transform", showDeepTelemetry && "rotate-180")} />
              </button>

              {showDeepTelemetry && (
                <div className="flex flex-col gap-3 pt-1">
                  {/* Micro-Catchment & Swales */}
                  <div className="text-caption text-slate-300 bg-cyan-950/30 p-2.5 rounded-xl border border-cyan-800/30 flex flex-col gap-1">
                    <div className="font-bold text-cyan-200 flex items-center gap-1.5">
                      <Waves size={13} className="text-cyan-400" />
                      <span>Micro-Catchment & Swales:</span>
                    </div>
                    <p className="leading-relaxed">
                      10m contours identify natural hillside runoff. Recommended installation: 
                      200m contour swales paired with vetiver grass hedgerows to recharge sub-surface aquifers.
                    </p>
                  </div>

                  {/* Thermal Belt Status */}
                  <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 flex flex-col gap-1.5 text-xs font-mono">
                    <span className="text-caption text-emerald-400 font-bold uppercase">Thermal Belt Inversion</span>
                    <p className="text-caption text-slate-300 leading-relaxed font-sans">
                      Mid-slope elevation avoids valley frost pools and ridge-top winds, providing a stable 12°C–28°C growing environment.
                    </p>
                  </div>

                  {/* Solar Pumping & Infrastructure */}
                  <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/20 flex flex-col gap-1.5 text-xs font-mono">
                    <span className="text-caption text-amber-400 font-bold uppercase">Solar Pump Specifications</span>
                    <div className="grid grid-cols-2 gap-2 text-caption">
                      <div><strong className="text-white">Pump:</strong> 1.5 kW DC Submersible</div>
                      <div><strong className="text-white">Array:</strong> 2.4 kWp PV</div>
                      <div><strong className="text-white">Feeder Road:</strong> 2.8 km</div>
                      <div><strong className="text-white">Grid (ESCOM):</strong> 4.2 km</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* DIRECT ACTION BUTTONS: One primary terracotta button per screen */}
            <div className="flex flex-col gap-2 pt-3 border-t border-[#E4DCCB]">
              <Link
                to={`/skills/ram-pump`}
                className="w-full h-9 px-4 rounded-[6px] bg-[#B4531F] hover:bg-[#9C4416] text-[#FFFDF8] font-medium text-[13px] shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Droplets size={14} />
                <span>Open water guide</span>
              </Link>

              <button
                type="button"
                onClick={() => handleSendParcelToEvaluator(activeParcel || ({
                  id: activeDistrict?.id || 'dedza',
                  title: `${activeDistrict?.name || 'Dedza'} Plot`,
                  district: activeDistrict?.name || 'Dedza',
                  acres: 10,
                  hectares: 4,
                  landTenure: 'Customary Estate',
                  waterReliability: 'High',
                  soilProfile: 'Katondo',
                  slopePct: 4,
                  rainySeasonAccess: 'All-Weather'
                } as unknown as ScoutParcelProperties))}
                className="w-full h-9 px-4 rounded-[6px] border border-[#E4DCCB] hover:bg-[#F6F1E7] text-[#1F2A22] font-medium text-[13px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck size={14} className="text-[#3F6B4E]" />
                <span>Add to site comparison</span>
              </button>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: VERIFIED CUSTOMARY PARCELS                         */}
        {/* ========================================================= */}
        {drawerTab === 'parcels' && (
          <div className="flex flex-col gap-3">
            
            {/* Search & Filter Trigger */}
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-900/90 border border-white/10 rounded-xl px-3 py-1.5 flex items-center gap-2">
                <MapPin size={13} className="text-amber-400 shrink-0" />
                <input
                  type="text"
                  value={parcelSearch}
                  onChange={(e) => setParcelSearch(e.target.value)}
                  placeholder="Filter parcels by title, village, soil..."
                  className="w-full bg-transparent text-white placeholder:text-slate-400 text-xs focus:outline-none"
                />
                {parcelSearch && (
                  <button onClick={() => setParcelSearch('')} className="text-slate-400 hover:text-white">
                    <X size={11} />
                  </button>
                )}
              </div>

              <button
                onClick={onOpenFiltersModal}
                className="px-3 py-1.5 bg-slate-900 border border-white/10 hover:border-amber-400/50 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 text-slate-200 hover:text-white transition-all cursor-pointer shrink-0"
              >
                <Filter size={13} className="text-amber-400" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="bg-emerald-600 text-white text-caption px-1.5 py-0.2 rounded-full font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            {/* Parcels List */}
            <div className="flex flex-col gap-2.5">
              {displayedParcels.length === 0 ? (
                <div className="p-6 text-center text-slate-400 font-mono text-xs bg-slate-900/50 rounded-2xl border border-white/5 flex flex-col items-center gap-2">
                  <MapPin size={24} className="text-slate-500" />
                  <span>No surveyed parcels match your filter query.</span>
                </div>
              ) : (
                displayedParcels.map((feat) => {
                  const p = feat.properties;
                  const isSelected = activeParcel?.id === p.id;
                  const isBookmarked = bookmarkedIds.includes(p.id);

                  return (
                    <div
                      key={p.id}
                      onClick={() => onSelectParcel(p)}
                      className={cn(
                        "p-3.5 rounded-2xl border transition-all flex flex-col gap-2 cursor-pointer",
                        isSelected
                          ? "bg-slate-900 border-amber-400/80 shadow-lg shadow-amber-950/40 ring-1 ring-amber-400/50"
                          : "bg-slate-900/70 border-white/5 hover:border-slate-700 hover:bg-slate-850"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white">{p.title}</span>
                            <span className="text-caption font-mono text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.2 rounded">
                              {p.acres} Ac
                            </span>
                          </div>
                          <span className="text-caption text-slate-400 font-mono">
                            {p.district} District • {p.traditionalAuthority}
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleBookmark(p.id);
                          }}
                          className="p-1 text-slate-400 hover:text-amber-400 transition-colors"
                          title={isBookmarked ? "Remove Bookmark" : "Save to Bookmarks"}
                        >
                          {isBookmarked ? (
                            <BookmarkCheck size={16} className="text-amber-400" />
                          ) : (
                            <Bookmark size={16} />
                          )}
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-1.5 text-caption font-mono bg-black/40 p-2 rounded-xl border border-white/5">
                        <div>
                          <span className="text-slate-400 block text-caption">WATER</span>
                          <span className="font-bold text-cyan-300 truncate block">{p.waterReliability.split('(')[0]}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-caption">TENURE</span>
                          <span className="font-bold text-emerald-300 truncate block">{p.landTenure.split(' ')[0]}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-caption">SOIL</span>
                          <span className="font-bold text-amber-300 truncate block">{p.soilProfile.split('/')[0]}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: AGRONOMY & SOIL SCIENCE GUIDE                      */}
        {/* ========================================================= */}
        {drawerTab === 'soil' && (
          <div className="flex flex-col gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-amber-500/30 flex flex-col gap-1.5">
              <h4 className="serif text-sm font-bold text-amber-300 flex items-center gap-1.5">
                <Sprout size={14} /> {activeDistrict ? `${activeDistrict.name} Soil Horizon` : 'Katondo (Red Clay) Profile'}
              </h4>
              <p className="text-slate-300 text-caption leading-relaxed">
                {activeDistrict
                  ? `${activeDistrict.primarySoil} (${activeDistrict.faoSoilClassification}) with ${activeDistrict.soilPh}. Ideal for ${activeDistrict.topCrops.slice(0, 4).join(', ')}.`
                  : 'Deep iron-rich latosol with high drainage and natural moisture retention. Best for macadamia, coffee, and maize.'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col gap-1">
              <span className="text-caption font-mono font-bold uppercase text-emerald-400">
                1. Natural Soil Nutrition & pH Buffering
              </span>
              <p className="text-slate-300 text-caption leading-relaxed">
                Amend {activeDistrict ? activeDistrict.primarySoil.split('(')[0].trim() : 'Katondo (Red Clay)'} with 20–30L cured compost, wood ash, and fermented wild sunflower tea (*Tithonia diversifolia*) to build organic nitrogen and buffer soil pH naturally.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col gap-1">
              <span className="text-caption font-mono font-bold uppercase text-sky-400">
                2. Dambo (Wetland) & Moisture Retention
              </span>
              <p className="text-slate-300 text-caption leading-relaxed">
                {activeDistrict
                  ? `${activeDistrict.name} receives ~${activeDistrict.rainfallAnnualMm} mm/yr (${activeDistrict.rainfallPattern}). Pair mid-slope contour Vetiver swales with valley-margin Dimba beds for year-round Chilimwe harvests.`
                  : 'Dambo (Wetland) valleys retain soil moisture throughout Chilimwe (Dry Season), enabling year-round vegetable yields.'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col gap-1">
              <span className="text-caption font-mono font-bold uppercase text-amber-400">
                3. Malire (Boundary) & Traditional Authorities
              </span>
              <p className="text-slate-300 text-caption leading-relaxed">
                {activeDistrict && activeDistrict.traditionalAuthorities.length > 0
                  ? `Key Traditional Authorities in ${activeDistrict.name}: ${activeDistrict.traditionalAuthorities.join(', ')}. Always verify boundaries (Kuyendera Malire) with the GVH and TA before applying for a Customary Estate Certificate.`
                  : 'Customary family parcels are registered with the Traditional Authority (TA) under the Customary Land Act for long-term security.'}
              </p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: QUICK GIS LAYER CONTROLS                           */}
        {/* ========================================================= */}
        {drawerTab === 'layers' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-caption font-mono font-bold uppercase text-amber-400">
                Base Map
              </span>
              <button
                onClick={onOpenLayersModal}
                className="text-caption font-mono text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Layer Settings</span>
                <ExternalLink size={10} />
              </button>
            </div>

            {/* Basemap grid */}
            <div className="grid grid-cols-2 gap-2">
              {([
                { id: 'dark' as TileLayerType, label: 'GIS Dark', icon: Moon, color: 'text-stone-300' },
                { id: 'satellite' as TileLayerType, label: 'Satellite', icon: Layers, color: 'text-emerald-400' },
                { id: 'terrain' as TileLayerType, label: 'Terrain', icon: Mountain, color: 'text-amber-400' },
                { id: 'hybrid' as TileLayerType, label: 'Hybrid', icon: MapPin, color: 'text-sky-400' },
                { id: 'standard' as TileLayerType, label: 'Clean Vector', icon: Compass, color: 'text-teal-400' },
              ]).map((b) => {
                const BIcon = b.icon;
                return (
                  <button
                    key={b.id}
                    onClick={() => onSelectTileLayer(b.id)}
                    className={cn(
                      "p-3 rounded-2xl border transition-all text-left flex items-center gap-2.5 cursor-pointer",
                      tileLayerType === b.id
                        ? "bg-amber-500/25 border-amber-400 text-amber-200 font-bold shadow-md"
                        : "bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white"
                    )}
                  >
                    <BIcon size={16} className={b.color} />
                    <span className="text-xs font-bold">{b.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Declutter Switch */}
            <div className="p-3 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">Declutter View</span>
                <span className="text-caption text-slate-400">Clean vector display</span>
              </div>
              <button
                onClick={onToggleDeclutter}
                className={cn(
                  "px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all border cursor-pointer",
                  isDecluttered
                    ? "bg-emerald-500 text-slate-950 border-emerald-300 font-black"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:text-white"
                )}
              >
                {isDecluttered ? 'Active' : 'Enable'}
              </button>
            </div>

            <button
              onClick={onOpenLayersModal}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 text-amber-300 border border-amber-500/40 font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Layers size={14} />
              <span>Manage Map Layers</span>
            </button>
          </div>
        )}

      </div>

      {/* Cadastral Survey & Dossier PDF Exporter Modal */}
      <ParcelCadastralExportModal
        isOpen={isCadastralModalOpen}
        onClose={() => setIsCadastralModalOpen(false)}
        parcel={activeParcel}
        district={activeDistrict}
      />

      {/* Seasonal NDVI Time-Series Comparison Modal */}
      <SeasonalNdviSplitModal
        isOpen={isNdviSplitModalOpen}
        onClose={() => setIsNdviSplitModalOpen(false)}
        activeDistrict={activeDistrict}
      />
    </motion.aside>
  );
}
