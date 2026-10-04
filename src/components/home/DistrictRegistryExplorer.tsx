import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Compass,
  Calculator,
  ShieldCheck,
  ExternalLink,
  RefreshCw,
  AlertTriangle,
  WifiOff,
  Database,
} from 'lucide-react';
import {
  DISTRICT_LIST,
  DistrictRegistryRecord,
  PLANTING_PIT_SPECS,
  SOIL_TYPES_REGISTRY,
  AgroEcologicalZone,
} from '@/constants';
import {
  getCachedDistrictTelemetry,
  saveCachedDistrictTelemetry,
} from '@/lib/offlineStorage';
import { useOnlineStatus } from '@/components/common/OfflinePwaStatusBanner';
import {
  BeginnerGlossaryModal,
  getPlainEnglishDistrictSummary,
} from '@/components/common/BeginnerGlossaryModal';
import { cn } from '@/lib/utils';

export function DistrictRegistryExplorer({ embedded = false }: { embedded?: boolean } = {}) {
  const [selectedRegion, setSelectedRegion] = useState<'All' | 'Northern' | 'Central' | 'Southern'>('All');
  const [selectedZone, setSelectedZone] = useState<'All' | AgroEcologicalZone>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDistrictId, setActiveDistrictId] = useState<string>('dedza');
  const [activeViewMode, setActiveViewMode] = useState<'districts' | 'pits' | 'soils'>('districts');
  const [activeDossierTab, setActiveDossierTab] = useState<'agronomy' | 'pit-soil' | 'provenance'>('agronomy');
  const [liveTelemetry, setLiveTelemetry] = useState<Record<string, any>>({});
  const [isSyncingTelemetry, setIsSyncingTelemetry] = useState<boolean>(false);
  const [usingCachedTelemetry, setUsingCachedTelemetry] = useState<Record<string, string>>({});
  const [showGlossary, setShowGlossary] = useState<boolean>(false);
  const isOnline = useOnlineStatus();

  const filteredDistricts = useMemo(() => {
    return DISTRICT_LIST.filter((d) => {
      if (selectedRegion !== 'All' && d.region !== selectedRegion) return false;
      if (selectedZone !== 'All' && d.agroZone !== selectedZone) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = d.name.toLowerCase().includes(q);
        const matchSoil = d.primarySoil.toLowerCase().includes(q);
        const matchCrop = d.topCrops.some((c) => c.toLowerCase().includes(q));
        const matchTa = d.traditionalAuthorities.some((t) => t.toLowerCase().includes(q));
        return matchName || matchSoil || matchCrop || matchTa;
      }
      return true;
    });
  }, [selectedRegion, selectedZone, searchQuery]);

  const selectedDistrict: DistrictRegistryRecord = useMemo(() => {
    return (
      DISTRICT_LIST.find((d) => d.id === activeDistrictId) ||
      filteredDistricts[0] ||
      DISTRICT_LIST[0]
    );
  }, [activeDistrictId, filteredDistricts]);

  const matchedPit =
    PLANTING_PIT_SPECS[selectedDistrict.recommendedPitKey] || PLANTING_PIT_SPECS.egwDeepPit;

  useEffect(() => {
    let cancelled = false;
    async function fetchDistrictTelemetry() {
      if (liveTelemetry[selectedDistrict.id]) return;

      // Check local offline vault cache first if offline
      const cachedEnvelope = getCachedDistrictTelemetry(selectedDistrict.id);
      if (!isOnline && cachedEnvelope?.data) {
        setLiveTelemetry((prev) => ({ ...prev, [selectedDistrict.id]: cachedEnvelope.data }));
        setUsingCachedTelemetry((prev) => ({
          ...prev,
          [selectedDistrict.id]: cachedEnvelope.cachedAt,
        }));
        return;
      }

      setIsSyncingTelemetry(true);
      try {
        const params = new URLSearchParams({
          lat: String(selectedDistrict.lat),
          lng: String(selectedDistrict.lng),
          key: selectedDistrict.id,
          name: `${selectedDistrict.name} District`,
          region: selectedDistrict.region,
        });
        const res = await fetch(`/api/verified-telemetry?${params.toString()}`);
        const fromSwCache = res.headers.get('X-Outpost-Offline-Cache') === 'true';
        if (!res.ok) throw new Error('Telemetry fetch failed');
        const json = await res.json();
        if (!cancelled && json?.verified) {
          setLiveTelemetry((prev) => ({ ...prev, [selectedDistrict.id]: json }));
          if (fromSwCache) {
            setUsingCachedTelemetry((prev) => ({
              ...prev,
              [selectedDistrict.id]: json.timestamp || new Date().toISOString(),
            }));
          } else {
            saveCachedDistrictTelemetry(selectedDistrict.id, json);
          }
        }
      } catch {
        // Fallback to localStorage cached telemetry or verified DCCMS / FAO registry baseline
        if (!cancelled && cachedEnvelope?.data) {
          setLiveTelemetry((prev) => ({ ...prev, [selectedDistrict.id]: cachedEnvelope.data }));
          setUsingCachedTelemetry((prev) => ({
            ...prev,
            [selectedDistrict.id]: cachedEnvelope.cachedAt,
          }));
        }
      } finally {
        if (!cancelled) setIsSyncingTelemetry(false);
      }
    }
    fetchDistrictTelemetry();
    return () => {
      cancelled = true;
    };
  }, [selectedDistrict, liveTelemetry, isOnline]);

  const activeLive = liveTelemetry[selectedDistrict.id];
  const activeCachedAt = usingCachedTelemetry[selectedDistrict.id];

  return (
    <section
      id="district-registry-explorer"
      aria-label="28-District Agronomic and Hydrogeological Registry"
      className={cn(
        'flex flex-col gap-6',
        embedded ? 'w-full pt-2' : 'max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20'
      )}
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-5 border-b border-stone-200 dark:border-emerald-950">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span className="font-semibold text-emerald-800 dark:text-emerald-400">
              Verified Institutional Field Registry
            </span>
            <span aria-hidden="true">·</span>
            <span>DCCMS Malawi</span>
            <span aria-hidden="true">·</span>
            <span>FAO HWSD v2.0 & AQUASTAT</span>
            <span aria-hidden="true">·</span>
            <span>MalawiLII Act No. 19 of 2016</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
            Malawi 28-District Agronomy, Hydrogeology & Soil Atlas
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
            Inspect published DCCMS annual rainfall normals, FAO AQUASTAT aquifer depths, Harmonized World Soil Database pedology, live ECMWF root-zone moisture, and Ellen G. White planting pit specifications across all 28 districts.
          </p>
        </div>

        {/* Interactive Mode Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-stone-200/70 dark:bg-stone-900 border border-stone-300/70 dark:border-emerald-900/60 self-start lg:self-auto">
          <button
            type="button"
            onClick={() => setActiveViewMode('districts')}
            className={cn(
              'px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap',
              activeViewMode === 'districts'
                ? 'bg-white dark:bg-emerald-900 text-stone-900 dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            )}
          >
            28 Districts ({DISTRICT_LIST.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveViewMode('pits')}
            className={cn(
              'px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap',
              activeViewMode === 'pits'
                ? 'bg-white dark:bg-emerald-900 text-stone-900 dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            )}
          >
            Planting Pit Specs (6)
          </button>
          <button
            type="button"
            onClick={() => setActiveViewMode('soils')}
            className={cn(
              'px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap',
              activeViewMode === 'soils'
                ? 'bg-white dark:bg-emerald-900 text-stone-900 dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            )}
          >
            FAO Soil Orders (5)
          </button>
        </div>
      </div>

      {/* ====================================================================
          MODE 1: 28-DISTRICT INTERACTIVE ATLAS & DOSSIER
      ==================================================================== */}
      {activeViewMode === 'districts' && (
        <div className="flex flex-col gap-6">
          {/* Filter & Search Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-[#0D1D13] p-4 rounded-2xl border border-stone-200/90 dark:border-emerald-900/60 shadow-2xs">
            {/* Region Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {(['All', 'Northern', 'Central', 'Southern'] as const).map((reg) => (
                <button
                  key={reg}
                  type="button"
                  onClick={() => setSelectedRegion(reg)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap',
                    selectedRegion === reg
                      ? 'bg-emerald-800 text-white dark:bg-emerald-700'
                      : 'bg-stone-100 dark:bg-stone-800/70 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
                  )}
                >
                  {reg === 'All' ? 'All Regions' : `${reg} Region`}
                </button>
              ))}
            </div>

            {/* Zone Filter + Search Input */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value as any)}
                aria-label="Filter by Agro-Ecological Zone"
                className="px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-emerald-900/60 text-xs font-medium text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="All">All Agro-Ecological Zones</option>
                <option value="Highland Sanctuary">Highland Sanctuary</option>
                <option value="Mid-Elevation Savanna Plateau">Mid-Elevation Savanna Plateau</option>
                <option value="Lakeshore Alluvial Basin">Lakeshore Alluvial Basin</option>
                <option value="Rift Valley & Wetland Floor">Rift Valley & Wetland Floor</option>
              </select>

              <div className="relative flex-1 sm:w-64">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search district, crop, T/A, or soil..."
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-emerald-900/60 text-xs text-stone-800 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Master-Detail Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Scrollable 28-District Selector Table/Grid (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-2 max-h-[660px] overflow-y-auto custom-scrollbar pr-1">
              {filteredDistricts.length === 0 ? (
                <div className="p-8 rounded-2xl bg-white dark:bg-[#0D1D13] border border-stone-200 dark:border-emerald-900/50 text-center flex flex-col items-center gap-2">
                  <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                    No districts match "{searchQuery}"
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedRegion('All');
                      setSelectedZone('All');
                    }}
                    className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 underline cursor-pointer"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                filteredDistricts.map((dist) => {
                  const isSelected = dist.id === selectedDistrict.id;
                  return (
                    <button
                      key={dist.id}
                      type="button"
                      onClick={() => setActiveDistrictId(dist.id)}
                      className={cn(
                        'w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2',
                        isSelected
                          ? 'bg-emerald-950 text-white border-emerald-600 shadow-md'
                          : 'bg-white dark:bg-[#0D1D13] text-stone-800 dark:text-stone-100 border-stone-200/90 dark:border-emerald-900/50 hover:border-emerald-600/50'
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-display font-bold text-base truncate">
                            {dist.name}
                          </span>
                          <span
                            className={cn(
                              'text-xs',
                              isSelected ? 'text-emerald-300' : 'text-stone-500 dark:text-stone-400'
                            )}
                          >
                            · {dist.region}
                          </span>
                        </div>
                        <span
                          className={cn(
                            'font-mono text-xs font-bold tabular-nums shrink-0',
                            isSelected ? 'text-amber-300' : 'text-emerald-800 dark:text-emerald-400'
                          )}
                        >
                          {dist.rainfallAnnualMm} mm/yr
                        </span>
                      </div>

                      <div
                        className={cn(
                          'flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono tabular-nums',
                          isSelected ? 'text-stone-300' : 'text-stone-500 dark:text-stone-400'
                        )}
                      >
                        <span>{dist.soilPh}</span>
                        <span aria-hidden="true">·</span>
                        <span>~{dist.aquiferDepthM}m</span>
                        <span aria-hidden="true">·</span>
                        <span>{dist.solarKwhDay} kWh</span>
                        <span aria-hidden="true">·</span>
                        <span
                          className={cn(
                            'font-sans text-[10px] font-semibold',
                            dist.verificationStatus === 'verified'
                              ? isSelected
                                ? 'text-emerald-300'
                                : 'text-emerald-700 dark:text-emerald-400'
                              : isSelected
                                ? 'text-amber-300'
                                : 'text-amber-700 dark:text-amber-400'
                          )}
                        >
                          {dist.verificationStatus === 'verified' ? '✓ Verified' : '◐ Partial'}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Right: Active District Full Telemetry & Planting Pit Dossier (7 cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-[#0D1D13] rounded-3xl border border-stone-200/90 dark:border-emerald-900/60 p-6 sm:p-8 shadow-sm flex flex-col gap-6">
              {/* Top Dossier Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-stone-200/80 dark:border-emerald-900/50">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400 font-mono tabular-nums">
                    <span className="font-semibold text-emerald-800 dark:text-emerald-400">
                      {selectedDistrict.region} Region
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedDistrict.agroZone}</span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {Math.abs(selectedDistrict.lat).toFixed(2)}°S, {selectedDistrict.lng.toFixed(2)}°E
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                    {selectedDistrict.name} District
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mt-1">
                    {selectedDistrict.description}
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">
                    Agro-Ecological Classification
                  </span>
                  <span className="font-mono text-sm font-bold text-emerald-800 dark:text-amber-300">
                    {selectedDistrict.feasibilityGrade}
                  </span>
                  {selectedDistrict.verificationStatus === 'verified' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-700/60 text-[11px] font-semibold">
                      <ShieldCheck size={12} />
                      <span>Institutional Sources Verified</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300/80 dark:border-amber-700/60 text-[11px] font-semibold">
                      <AlertTriangle size={12} />
                      <span>Partial Station Coverage · Field Verification Advised</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Unified 8-Cell Telemetry Matrix (DCCMS, FAO HWSD, AQUASTAT & Live ECMWF) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200/70 dark:border-emerald-900/40">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                    DCCMS Rainfall
                  </span>
                  <span className="font-mono text-base font-bold text-stone-900 dark:text-white tabular-nums">
                    {selectedDistrict.rainfallAnnualMm} mm/yr
                  </span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 block truncate mt-0.5">
                    {selectedDistrict.rainfallPattern}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200/70 dark:border-emerald-900/40">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                    FAO HWSD Soil pH
                  </span>
                  <span className="font-mono text-base font-bold text-stone-900 dark:text-white tabular-nums">
                    {selectedDistrict.soilPh}
                  </span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 block truncate mt-0.5">
                    {selectedDistrict.primarySoil}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200/70 dark:border-emerald-900/40">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                    AQUASTAT Aquifer
                  </span>
                  <span className="font-mono text-base font-bold text-stone-900 dark:text-white tabular-nums">
                    ~{selectedDistrict.aquiferDepthM}m
                  </span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 block truncate mt-0.5">
                    {selectedDistrict.waterRating}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200/70 dark:border-emerald-900/40">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                    Solar Insolation
                  </span>
                  <span className="font-mono text-base font-bold text-stone-900 dark:text-white tabular-nums">
                    {selectedDistrict.solarKwhDay} kWh/m²
                  </span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 block truncate mt-0.5">
                    {selectedDistrict.elevationRange}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50/40 dark:bg-stone-950/60 border border-stone-200/60 dark:border-emerald-900/40 font-mono tabular-nums">
                  <span className="text-[10px] text-stone-500 block font-sans">
                    Root Moisture (3–9cm)
                  </span>
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    {activeLive?.telemetry
                      ? `${activeLive.telemetry.soilMoistureVolumetricPct}% (${activeLive.telemetry.soilMoistureRootM3} m³/m³)`
                      : isSyncingTelemetry
                      ? 'Syncing ECMWF...'
                      : 'Pending Live Sync'}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50/40 dark:bg-stone-950/60 border border-stone-200/60 dark:border-emerald-900/40 font-mono tabular-nums">
                  <span className="text-[10px] text-stone-500 block font-sans">
                    Soil / Air Temp (6cm)
                  </span>
                  <span className="text-xs font-bold text-stone-900 dark:text-white">
                    {activeLive?.telemetry
                      ? `${activeLive.telemetry.soilTempRootZoneC}°C / Air ${activeLive.telemetry.airTempC}°C`
                      : selectedDistrict.elevationRange}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50/40 dark:bg-stone-950/60 border border-stone-200/60 dark:border-emerald-900/40 font-mono tabular-nums">
                  <span className="text-[10px] text-stone-500 block font-sans">
                    FAO-56 ET₀ Demand
                  </span>
                  <span className="text-xs font-bold text-sky-700 dark:text-sky-300">
                    {activeLive?.telemetry
                      ? `${activeLive.telemetry.faoEvapotranspirationMmDay} mm/day`
                      : `${selectedDistrict.rainfallAnnualMm} mm/yr norm`}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50/40 dark:bg-stone-950/60 border border-stone-200/60 dark:border-emerald-900/40 font-mono tabular-nums">
                  <span className="text-[10px] text-stone-500 block font-sans">
                    Live Shortwave Flux
                  </span>
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
                    {activeLive?.telemetry
                      ? `${activeLive.telemetry.shortwaveRadiationWm2} W/m² (${activeLive.telemetry.livePeakSunHoursKwh} PSH)`
                      : `${selectedDistrict.solarKwhDay} PSH avg`}
                  </span>
                </div>
              </div>

              {/* Desktop 3-Tab Dossier Sub-Inspector (Eliminates Vertical Stack Overload) */}
              <div className="rounded-2xl border border-stone-200/80 dark:border-emerald-900/50 bg-stone-50/70 dark:bg-stone-900/50 overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-stone-100/90 dark:bg-stone-950/80 border-b border-stone-200/80 dark:border-emerald-900/50">
                  <div className="flex flex-wrap items-center gap-1">
                    {([
                      { id: 'agronomy', label: '01 · Plain-English & Crops' },
                      { id: 'pit-soil', label: `02 · Soil & ${matchedPit.name}` },
                      { id: 'provenance', label: '03 · Data Provenance & Sources' },
                    ] as const).map((tab) => {
                      const active = activeDossierTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveDossierTab(tab.id)}
                          className={cn(
                            'px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer',
                            active
                              ? 'bg-emerald-800 text-white dark:bg-amber-400 dark:text-stone-950 shadow-xs'
                              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                          )}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-2.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setShowGlossary(true)}
                      className="font-semibold text-emerald-800 dark:text-emerald-300 hover:underline cursor-pointer"
                    >
                      Glossary
                    </button>
                    <span className="text-stone-300 dark:text-stone-700">·</span>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="font-semibold text-stone-600 dark:text-stone-400 hover:underline cursor-pointer"
                    >
                      Print Sheet
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  {activeDossierTab === 'agronomy' && (() => {
                    const plain = getPlainEnglishDistrictSummary(selectedDistrict);
                    return (
                      <div className="flex flex-col gap-3.5">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                          <div className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-emerald-900/40">
                            <strong className="text-stone-900 dark:text-amber-300 block mb-0.5 text-[11px] uppercase tracking-wider font-mono">
                              Climate & Comfort
                            </strong>
                            <span className="text-stone-700 dark:text-stone-300 leading-relaxed">
                              {plain.climateFeel}
                            </span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-emerald-900/40">
                            <strong className="text-stone-900 dark:text-amber-300 block mb-0.5 text-[11px] uppercase tracking-wider font-mono">
                              Water Access
                            </strong>
                            <span className="text-stone-700 dark:text-stone-300 leading-relaxed">
                              {plain.waterEase}
                            </span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-emerald-900/40">
                            <strong className="text-stone-900 dark:text-amber-300 block mb-0.5 text-[11px] uppercase tracking-wider font-mono">
                              Soil & Care
                            </strong>
                            <span className="text-stone-700 dark:text-stone-300 leading-relaxed">
                              {plain.soilPlain}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-200/70 dark:border-emerald-900/40">
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
                              Documented Staple & Orchard Crops
                            </span>
                            <p className="text-xs font-semibold text-stone-800 dark:text-stone-200 leading-relaxed">
                              {selectedDistrict.topCrops.join(' · ')}
                            </p>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
                              Traditional Authorities (TLMA Jurisdictions)
                            </span>
                            <p className="text-xs font-semibold text-stone-800 dark:text-stone-200 leading-relaxed">
                              {selectedDistrict.traditionalAuthorities.join(' · ')}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {activeDossierTab === 'pit-soil' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50 flex flex-col gap-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
                            FAO HWSD v2.0 Soil Prescription
                          </span>
                          <span className="text-[11px] font-mono text-stone-600 dark:text-stone-400">
                            {selectedDistrict.soilPh}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-stone-900 dark:text-white">
                          {selectedDistrict.primarySoil}
                        </p>
                        <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                          {selectedDistrict.soilAmendmentPrescription}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-emerald-900/40 flex flex-col gap-2">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <span className="text-xs font-bold text-stone-900 dark:text-white">
                            {matchedPit.name} ({matchedPit.dimensionString})
                          </span>
                          <span className="font-mono text-[11px] text-amber-800 dark:text-amber-300">
                            {matchedPit.waterRetentionLiters}L · {matchedPit.biocharKgPerPit}kg Biochar
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          {matchedPit.layers.map((layer, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-1.5 text-[11px] text-stone-700 dark:text-stone-300"
                            >
                              <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 shrink-0">
                                0{idx + 1}.
                              </span>
                              <span>{layer}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDossierTab === 'provenance' && (
                    <div className="flex flex-col gap-2.5 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-semibold text-stone-900 dark:text-white flex items-center gap-1.5">
                          {selectedDistrict.verificationStatus === 'verified' ? (
                            <ShieldCheck size={14} className="text-emerald-700 dark:text-emerald-400" />
                          ) : (
                            <AlertTriangle size={14} className="text-amber-600 dark:text-amber-400" />
                          )}
                          <span>
                            {selectedDistrict.verificationStatus === 'verified'
                              ? 'All 4 Primary Datasets Verified Against Station & Atlas Records'
                              : `Interpolated Fields: ${selectedDistrict.unverifiedFields.join(', ')}`}
                          </span>
                        </span>
                        {(!isOnline || activeCachedAt) && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-800 dark:text-amber-300 font-mono text-[10px] font-semibold">
                            <Database size={11} />
                            <span>{!isOnline ? 'Offline Vault' : 'Cached Telemetry'}</span>
                          </span>
                        )}
                      </div>

                      {selectedDistrict.verificationNote && (
                        <p className="text-[11px] text-amber-900 dark:text-amber-200 leading-relaxed">
                          <strong>Note:</strong> {selectedDistrict.verificationNote}
                        </p>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] font-mono text-stone-600 dark:text-stone-300 pt-1">
                        <span>
                          • <strong>Rainfall:</strong> {selectedDistrict.rainfallSource || 'WMO Station Normal'}
                        </span>
                        <span>
                          • <strong>Soil (FAO HWSD v2.0):</strong> {selectedDistrict.soilSource || 'FAO Soil Assay'}
                        </span>
                        <span>
                          • <strong>Aquifer:</strong> {selectedDistrict.aquiferSource || 'FAO AQUASTAT Log'}
                        </span>
                        <span>
                          • <strong>Solar:</strong> {selectedDistrict.solarSource || 'NASA POWER Agroclimatology'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action & Statutory Verification Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-stone-200/70 dark:border-emerald-900/40">
                <div className="flex flex-col gap-0.5 text-xs">
                  <span className="text-stone-500 dark:text-stone-400 font-medium">
                    {selectedDistrict.landCostBallpark}
                  </span>
                  <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] pt-0.5">
                    <a
                      href="https://malawilii.org/akn/mw/act/2016/19/eng@2016-09-01"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-800 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>MalawiLII Act No. 19 of 2016</span>
                      <ExternalLink size={10} />
                    </a>
                    <span aria-hidden="true" className="text-stone-400">
                      ·
                    </span>
                    <a
                      href="https://www.fao.org/aquastat/en/countries-and-basins/country-profiles/country/MWI"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-700 dark:text-sky-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>FAO AQUASTAT Malawi</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <Link
                    to={`/scout-map?district=${selectedDistrict.id}`}
                    className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    <Compass size={14} />
                    <span>Inspect {selectedDistrict.name} on GIS Map</span>
                  </Link>
                  <Link
                    to="/calculators?tab=rainwater"
                    className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-100 text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    <Calculator size={14} />
                    <span>Size Cistern & Pump</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODE 2: CANONICAL PLANTING PIT & BIO-INTENSIVE BED SPECIFICATIONS
      ==================================================================== */}
      {activeViewMode === 'pits' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.values(PLANTING_PIT_SPECS).map((pit) => (
            <div
              key={pit.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#0D1D13] border border-stone-200/90 dark:border-emerald-900/60 shadow-2xs flex flex-col justify-between gap-4"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2 text-xs text-stone-500 dark:text-stone-400 font-mono tabular-nums">
                  <span>Volume: {pit.volumeLiters.toLocaleString()} L</span>
                  <span>·</span>
                  <span>Moisture Bank: {pit.waterRetentionLiters} L</span>
                </div>

                <div>
                  <h3 className="font-display text-lg font-bold text-stone-900 dark:text-white">
                    {pit.name}
                  </h3>
                  <p className="text-xs font-mono text-emerald-800 dark:text-amber-300 font-semibold mt-0.5 tabular-nums">
                    {pit.dimensionString} · {pit.chichewaName}
                  </p>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {pit.description}
                </p>

                <div className="flex flex-col gap-1.5 pt-2 border-t border-stone-100 dark:border-emerald-950">
                  <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400">
                    Layer-by-Layer Horizon Profile:
                  </span>
                  {pit.layers.map((layer, i) => (
                    <div
                      key={i}
                      className="text-xs text-stone-700 dark:text-stone-300 flex items-start gap-1.5"
                    >
                      <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
                        {i + 1}.
                      </span>
                      <span>{layer}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-emerald-950 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-stone-600 dark:text-stone-400 tabular-nums">
                  <span>Biochar: {pit.biocharKgPerPit} kg</span>
                  <span>Compost: {pit.compostWheelbarrows} barrows</span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                  Crops: {pit.idealCrops.join(' · ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ====================================================================
          MODE 3: MALAWI 5 SOIL ORDERS & ORGANIC RESTORATION PROTOCOLS
      ==================================================================== */}
      {activeViewMode === 'soils' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SOIL_TYPES_REGISTRY.map((soil) => (
            <div
              key={soil.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#0D1D13] border border-stone-200/90 dark:border-emerald-900/60 shadow-2xs flex flex-col justify-between gap-4"
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400 tabular-nums">
                  <span className="font-bold text-emerald-800 dark:text-emerald-400">
                    {soil.phRange}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Drainage: {soil.drainage}</span>
                  <span aria-hidden="true">·</span>
                  <span>Target: {soil.organicMatterTarget}</span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-stone-900 dark:text-white">
                    {soil.name}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    {soil.chichewaName} · FAO HWSD v2.0: {soil.faoClassification}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200/60 dark:border-emerald-900/40 text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                  <strong className="text-stone-900 dark:text-white block mb-0.5">
                    Edenic Amendment Protocol:
                  </strong>
                  {soil.amendmentProtocol}
                </div>
              </div>

              <div className="flex flex-col gap-1.5 pt-2 border-t border-stone-100 dark:border-emerald-950 text-xs">
                <div className="text-stone-600 dark:text-stone-300">
                  <span className="font-semibold text-stone-900 dark:text-white">
                    Primary Districts:{' '}
                  </span>
                  {soil.primaryDistricts.join(' · ')}
                </div>
                <div className="text-stone-600 dark:text-stone-300">
                  <span className="font-semibold text-stone-900 dark:text-white">
                    Ideal Crops:{' '}
                  </span>
                  {soil.idealCrops.join(' · ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <BeginnerGlossaryModal isOpen={showGlossary} onClose={() => setShowGlossary(false)} />
    </section>
  );
}
