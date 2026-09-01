import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Globe, MapPin, Target, Sparkles, Thermometer, Droplets, 
  Sprout, Mountain, Sun, ShieldCheck, ArrowRight, Copy, Check,
  Bookmark, BookmarkCheck, ExternalLink, Filter, Layers, Compass,
  AlertTriangle, Waves, Zap, HeartHandshake, ChevronRight, FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { DistrictClimateData } from '@/data/climateTelemetryData';
import { MalawiDistrictSpec } from '@/data/malawiDistrictData';
import { RegionalClimateZone } from '@/data/malawiRegionalScoutData';
import { FocusRegionId, MALAWI_REGIONAL_BOUNDS, TileLayerType } from './ScoutingMap';
import { ScoutParcelFeature, ScoutParcelProperties } from '@/data/scoutGeoJSON';

export interface ScoutTelemetryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
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
}

export function ScoutTelemetryDrawer({
  isOpen,
  onClose,
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
  onOpenLayersModal
}: ScoutTelemetryDrawerProps) {
  const [drawerTab, setDrawerTab] = useState<'dossier' | 'parcels' | 'soil' | 'layers'>('dossier');
  const [parcelSearch, setParcelSearch] = useState('');

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

  return (
    <motion.aside
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
      className="absolute right-0 top-0 h-full w-full sm:w-[460px] lg:w-[500px] z-30 bg-slate-950/95 backdrop-blur-2xl text-white rounded-none sm:rounded-l-3xl p-5 shadow-2xl border-l border-white/10 flex flex-col gap-4 overflow-hidden pointer-events-auto"
      id="scout-telemetry-drawer-root"
    >
      {/* 1. DRAWER TOP HEADER */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Compass size={18} />
          </div>
          <div>
            <h3 className="serif text-lg font-bold text-white leading-tight">
              {activeDistrict ? `${activeDistrict.name} Overview` : `${currentRegionSpec.label}`}
            </h3>
            <span className="text-[10px] font-mono text-amber-400/90 uppercase tracking-wider block">
              {activeDistrict ? `${activeDistrict.region} Region • Suitability Grade ${activeDistrict.feasibilityGrade}` : currentRegionSpec.badge}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          title="Close Drawer"
        >
          <X size={15} />
        </button>
      </div>

      {/* 2. DRAWER NAVIGATION TABS */}
      <div className="bg-slate-900/90 border border-white/10 p-1 rounded-2xl grid grid-cols-4 gap-1 shrink-0">
        <button
          onClick={() => setDrawerTab('dossier')}
          className={cn(
            "py-1.5 px-2 rounded-xl text-[11px] font-mono font-bold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer text-center",
            drawerTab === 'dossier'
              ? "bg-amber-500 text-slate-950 shadow-md font-black"
              : "text-slate-400 hover:text-white"
          )}
        >
          <Target size={13} />
          <span className="truncate w-full">Overview</span>
        </button>

        <button
          onClick={() => setDrawerTab('parcels')}
          className={cn(
            "py-1.5 px-2 rounded-xl text-[11px] font-mono font-bold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer text-center",
            drawerTab === 'parcels'
              ? "bg-emerald-600 text-white shadow-md font-black"
              : "text-slate-400 hover:text-white"
          )}
        >
          <MapPin size={13} />
          <span className="truncate w-full">Parcels ({displayedParcels.length})</span>
        </button>

        <button
          onClick={() => setDrawerTab('soil')}
          className={cn(
            "py-1.5 px-2 rounded-xl text-[11px] font-mono font-bold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer text-center",
            drawerTab === 'soil'
              ? "bg-amber-600 text-white shadow-md font-black"
              : "text-slate-400 hover:text-white"
          )}
        >
          <Sprout size={13} />
          <span className="truncate w-full">Soil & Crops</span>
        </button>

        <button
          onClick={() => setDrawerTab('layers')}
          className={cn(
            "py-1.5 px-2 rounded-xl text-[11px] font-mono font-bold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer text-center",
            drawerTab === 'layers'
              ? "bg-sky-600 text-white shadow-md font-black"
              : "text-slate-400 hover:text-white"
          )}
        >
          <Layers size={13} />
          <span className="truncate w-full">Map Layers</span>
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
                  <span className="bg-emerald-500 text-slate-950 px-2 py-0.5 rounded font-mono font-black text-[10px] uppercase">
                    Inspected Parcel
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-300">
                    {activeParcel.acres} Acres ({activeParcel.hectares} ha)
                  </span>
                  <span className="text-[10px] font-mono text-slate-300 bg-white/10 px-1.5 py-0.2 rounded">
                    {activeParcel.landTenure}
                  </span>
                </div>
                <h4 className="serif text-base font-bold text-white mt-1.5">{activeParcel.title}</h4>
                <p className="text-[11px] text-slate-300 font-mono mt-0.5">
                  {activeParcel.district} District • TA {activeParcel.traditionalAuthority} • GVH {activeParcel.groupVillageHeadman}
                </p>
              </div>

              <button
                onClick={() => onToggleBookmark(activeParcel.id)}
                className="p-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-amber-400 text-amber-400 cursor-pointer"
                title={bookmarkedIds.includes(activeParcel.id) ? "Remove Bookmark" : "Save to Bookmarks"}
              >
                {bookmarkedIds.includes(activeParcel.id) ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px] font-mono bg-black/50 p-2.5 rounded-xl border border-white/10">
              <div>
                <span className="text-slate-400 block text-[9px]">WATER</span>
                <span className="font-bold text-cyan-300 truncate block">{activeParcel.waterReliability.split('(')[0]}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px]">SOIL</span>
                <span className="font-bold text-emerald-300 truncate block">{activeParcel.soilProfile.split('/')[0]}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px]">SLOPE</span>
                <span className="font-bold text-amber-300 truncate block">{activeParcel.slopePct || 5}% incline</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px]">ACCESS</span>
                <span className="font-bold text-slate-200 truncate block">{activeParcel.rainySeasonAccess ? activeParcel.rainySeasonAccess.split(' ')[0] : 'All-Weather'}</span>
              </div>
            </div>

            {activeParcel.scoutNotes && (
              <p className="text-[11px] text-slate-300 italic bg-white/5 p-2 rounded-lg border border-white/5">
                "{activeParcel.scoutNotes}"
              </p>
            )}

            <div className="flex items-center gap-2 pt-1">
              <Link
                to={`/calculators?tab=solar&acres=${activeParcel.acres}&district=${activeParcel.district.toLowerCase()}`}
                className="flex-1 py-1.5 px-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 rounded-xl text-[11px] font-mono font-bold uppercase flex items-center justify-center gap-1.5 shadow"
              >
                <Sun size={12} />
                <span>Calculate Water & Solar</span>
              </Link>

              {activeParcel.boundaryPolygon && activeParcel.boundaryPolygon.length > 0 && (
                <button
                  onClick={() => onCopyCoords([activeParcel.boundaryPolygon[0][1], activeParcel.boundaryPolygon[0][0]])}
                  className="py-1.5 px-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 rounded-xl text-[11px] font-mono flex items-center justify-center gap-1 cursor-pointer"
                  title="Copy parcel coordinates"
                >
                  {copiedCoords ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copiedCoords ? 'Copied' : 'GPS'}</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 1: DISTRICT & REGIONAL DOSSIER                        */}
        {/* ========================================================= */}
        {drawerTab === 'dossier' && (
          <div className="flex flex-col gap-4">
            
            {/* Quick Summary Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-col gap-2 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-amber-400 tracking-wider">
                  Farming Zone Type
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                  {climateZone.thermalBeltZone}
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {activeDistrict ? activeDistrict.description : selectedRegion.metrics.description}
              </p>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              
              {/* Elevation */}
              <div className="bg-slate-900/90 border border-white/5 p-3 rounded-2xl flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-mono font-bold uppercase">
                  <Mountain size={13} /> Elevation Range
                </div>
                <div className="text-sm font-bold text-white font-mono">
                  {activeDistrict ? activeDistrict.elevationRange : selectedRegion.metrics.elevation}
                </div>
                <span className="text-[10px] text-slate-400">Mountain vs Valley</span>
              </div>

              {/* Rainfall */}
              <div className="bg-slate-900/90 border border-white/5 p-3 rounded-2xl flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-sky-400 text-[10px] font-mono font-bold uppercase">
                  <Droplets size={13} /> Annual Rainfall
                </div>
                <div className="text-sm font-bold text-white font-mono">
                  {activeDistrict ? `${activeDistrict.rainfallAnnualMm} mm/yr` : selectedRegion.metrics.rainfall}
                </div>
                <span className="text-[10px] text-slate-400">Nov – April rainy season</span>
              </div>

              {/* Temperatures */}
              <div className="bg-slate-900/90 border border-white/5 p-3 rounded-2xl flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-amber-300 text-[10px] font-mono font-bold uppercase">
                  <Thermometer size={13} /> Temp Range
                </div>
                <div className="text-sm font-bold text-white font-mono">
                  {climateZone.winterMinC}°C <span className="text-slate-500 font-normal">to</span> {climateZone.summerMaxC}°C
                </div>
                <span className="text-[10px] text-slate-400">Frost Risk: <strong className={climateZone.frostRisk === 'High' ? 'text-rose-400' : 'text-emerald-400'}>{climateZone.frostRisk}</strong></span>
              </div>

              {/* Aquifer Depth */}
              <div className="bg-slate-900/90 border border-white/5 p-3 rounded-2xl flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-teal-400 text-[10px] font-mono font-bold uppercase">
                  <Waves size={13} /> Well Depth
                </div>
                <div className="text-sm font-bold text-white font-mono">
                  {activeDistrict ? activeDistrict.aquiferDepth : selectedRegion.metrics.aquiferDepth}
                </div>
                <span className="text-[10px] text-slate-400">Borehole success: 88%+</span>
              </div>

              {/* Soil pH */}
              <div className="bg-slate-900/90 border border-white/5 p-3 rounded-2xl flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-mono font-bold uppercase">
                  <Sprout size={13} /> Red Katondo Soil
                </div>
                <div className="text-sm font-bold text-white font-mono">
                  {activeDistrict ? activeDistrict.soilPh : selectedRegion.metrics.soilpH}
                </div>
                <span className="text-[10px] text-slate-400">Great for maize & fruit trees</span>
              </div>

              {/* Solar Irradiance */}
              <div className="bg-slate-900/90 border border-white/5 p-3 rounded-2xl flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-mono font-bold uppercase">
                  <Sun size={13} /> Solar Sunshine
                </div>
                <div className="text-sm font-bold text-white font-mono">
                  {climateZone.solarRadiationKwhM2Day} <span className="text-xs text-slate-400 font-normal">kWh/m²/day</span>
                </div>
                <span className="text-[10px] text-slate-400">Ideal for solar pumping</span>
              </div>
            </div>

            {/* Recommended High-Yield Crops */}
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col gap-2">
              <span className="text-[10px] font-mono font-bold uppercase text-amber-400 flex items-center gap-1.5">
                <Sprout size={12} /> Best Crops for this Area
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(activeDistrict ? activeDistrict.topCrops : selectedRegion.metrics.topCrops).map((crop, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 text-xs font-mono font-semibold"
                  >
                    {crop}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Action Jumpers */}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
              <Link
                to={`/calculators?tab=solar&district=${activeDistrict ? activeDistrict.id : 'dedza'}`}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-mono font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Sun size={14} />
                  <span>Size Borehole & Solar Pump for {activeDistrict ? activeDistrict.name : 'District'}</span>
                </div>
                <ChevronRight size={14} />
              </Link>

              <Link
                to={`/seasons?district=${activeDistrict ? activeDistrict.id : 'dedza'}`}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 text-emerald-300 border border-emerald-500/40 font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Sprout size={14} className="text-emerald-400" />
                  <span>Open Seasonal Planting Calendar</span>
                </div>
                <ExternalLink size={13} />
              </Link>

              {activeDistrict && (
                <button
                  onClick={() => onCopyCoords([activeDistrict.centroid[1], activeDistrict.centroid[0]])}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-white/5 font-mono text-[11px] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {copiedCoords ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} className="text-amber-400" />}
                  <span>{copiedCoords ? "Centroid Coordinates Copied!" : `Copy GPS Centroid: ${activeDistrict.centroid[0].toFixed(4)}, ${activeDistrict.centroid[1].toFixed(4)}`}</span>
                </button>
              )}
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
                  <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
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
                            <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.2 rounded">
                              {p.acres} Ac
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
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

                      <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono bg-black/40 p-2 rounded-xl border border-white/5">
                        <div>
                          <span className="text-slate-400 block text-[9px]">WATER</span>
                          <span className="font-bold text-cyan-300 truncate block">{p.waterReliability.split('(')[0]}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px]">TENURE</span>
                          <span className="font-bold text-emerald-300 truncate block">{p.landTenure.split(' ')[0]}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px]">SOIL</span>
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
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 flex flex-col gap-2">
              <h4 className="serif text-base font-bold text-amber-300 flex items-center gap-1.5">
                <Sprout size={16} /> Katondo (Red Latosol) Pedology
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Malawi’s deep, iron-rich ferruginous latosols (Katondo) offer excellent drainage and natural moisture retention for perennials, orchards, and grains.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col gap-2">
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-400">
                1. Natural Fertilizer Guide
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Infuse red Katondo soil with fermented wild sunflower tea (Tithonia) to build rich soil nutrients naturally without costly chemical fertilizer.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col gap-2">
              <span className="text-[10px] font-mono font-bold uppercase text-sky-400">
                2. Wetland Garden (Dimba) Guide
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Lowland stream valleys (dambos) keep water in the soil through the dry winter months, allowing you to grow fresh vegetables year-round.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col gap-2">
              <span className="text-[10px] font-mono font-bold uppercase text-amber-400">
                3. Village Land Ownership (Customary Land Act)
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Under the Customary Land Act (2016), family land can be officially registered with your Traditional Authority (TA) for a 99-year legal title.
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
              <span className="text-[11px] font-mono font-bold uppercase text-amber-400">
                Map Background Style
              </span>
              <button
                onClick={onOpenLayersModal}
                className="text-[10px] font-mono text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>All Layer Controls</span>
                <ExternalLink size={10} />
              </button>
            </div>

            {/* Basemap grid */}
            <div className="grid grid-cols-2 gap-2">
              {([
                { id: 'satellite' as TileLayerType, label: 'Satellite HD', icon: '🛰️' },
                { id: 'terrain' as TileLayerType, label: '3D Topo', icon: '🗺️' },
                { id: 'hybrid' as TileLayerType, label: 'Hybrid Satellite', icon: '📍' },
                { id: 'standard' as TileLayerType, label: 'Vector Clean', icon: '🧭' },
              ]).map((b) => (
                <button
                  key={b.id}
                  onClick={() => onSelectTileLayer(b.id)}
                  className={cn(
                    "p-3 rounded-2xl border transition-all text-left flex items-center gap-2 cursor-pointer",
                    tileLayerType === b.id
                      ? "bg-amber-500/25 border-amber-400 text-amber-200 font-bold shadow-md"
                      : "bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white"
                  )}
                >
                  <span className="text-base">{b.icon}</span>
                  <span className="text-xs font-bold">{b.label}</span>
                </button>
              ))}
            </div>

            {/* Quick Declutter Switch */}
            <div className="p-3 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">Declutter Mode</span>
                <span className="text-[10px] text-slate-400">Hide textured overlays for clean vector view</span>
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
              <span>Open Detailed Layer Switcher</span>
            </button>
          </div>
        )}

      </div>
    </motion.aside>
  );
}
