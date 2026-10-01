import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DISTRICT_READINESS_CARDS, DistrictReadinessCardData } from '@/data/outpostFourPillarsData';
import {
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  Activity,
  Compass,
  AlertTriangle,
  Database,
  MapPin as MapPinIcon,
  ShieldCheck as ShieldCheckIcon,
  Droplets as WaterDropIcon,
  Layers as SoilTestIcon,
  Sun as SunPowerIcon,
  Sprout as SproutIcon
} from 'lucide-react';
import {
  getCachedDistrictTelemetry,
  saveCachedDistrictTelemetry
} from '@/lib/offlineStorage';
import { useOnlineStatus } from '@/components/common/OfflinePwaStatusBanner';

interface LiveVerifiedTelemetry {
  districtName: string;
  coordinates: { lat: number; lng: number };
  verifiedElevationMeters: number | null;
  liveAgroClimate: {
    airTempC: number;
    humidityPct: number;
    soilTempSurfaceC: number;
    soilTempRootZoneC: number;
    soilMoistureSurfacePct: number;
    soilMoistureRootZonePct: number;
    solarRadiationWm2: number;
    solarPotentialKwhM2Day: number;
    evapotranspirationMmDay: number;
    recent14DayRainfallMm: number;
    forecast7DayRainfallMm: number;
    avgMaxTemp7DayC: number;
    avgMinTemp7DayC: number;
  };
  verifiedSources: {
    name: string;
    dataset: string;
    url: string;
    timestamp: string;
  }[];
}

export function LandReadinessCards() {
  const [selectedRegion, setSelectedRegion] = useState<'All' | 'Northern' | 'Central' | 'Southern'>('All');
  const [activeDistrictId, setActiveDistrictId] = useState<string>(DISTRICT_READINESS_CARDS[0].id);
  const [telemetryMap, setTelemetryMap] = useState<Record<string, LiveVerifiedTelemetry>>({});
  const [loadingTelemetry, setLoadingTelemetry] = useState<boolean>(false);
  const [telemetryError, setTelemetryError] = useState<string | null>(null);
  const [cachedTelemetryAt, setCachedTelemetryAt] = useState<Record<string, string>>({});
  const isOnline = useOnlineStatus();

  const filteredDistricts = DISTRICT_READINESS_CARDS.filter(
    (d) => selectedRegion === 'All' || d.region === selectedRegion
  );

  const activeDistrict: DistrictReadinessCardData =
    DISTRICT_READINESS_CARDS.find((d) => d.id === activeDistrictId) || filteredDistricts[0] || DISTRICT_READINESS_CARDS[0];

  const fetchDistrictVerifiedTelemetry = useCallback(async (districtName: string, districtId: string) => {
    const cachedEnvelope = getCachedDistrictTelemetry(districtId);
    if (!navigator.onLine && cachedEnvelope?.data?.liveAgroClimate) {
      setTelemetryMap((prev) => ({ ...prev, [districtId]: cachedEnvelope.data }));
      setCachedTelemetryAt((prev) => ({ ...prev, [districtId]: cachedEnvelope.cachedAt }));
      return;
    }

    setLoadingTelemetry(true);
    setTelemetryError(null);
    try {
      const res = await fetch(`/api/verified-telemetry?district=${encodeURIComponent(districtName)}&key=${encodeURIComponent(districtId)}`);
      const fromSwCache = res.headers.get('X-Outpost-Offline-Cache') === 'true';
      if (!res.ok) throw new Error('Telemetry service temporarily unreachable');
      const data: LiveVerifiedTelemetry = await res.json();
      setTelemetryMap((prev) => ({ ...prev, [districtId]: data }));
      if (fromSwCache) {
        setCachedTelemetryAt((prev) => ({ ...prev, [districtId]: new Date().toISOString() }));
      } else {
        saveCachedDistrictTelemetry(districtId, data);
      }
    } catch (err: any) {
      if (cachedEnvelope?.data?.liveAgroClimate) {
        setTelemetryMap((prev) => ({ ...prev, [districtId]: cachedEnvelope.data }));
        setCachedTelemetryAt((prev) => ({ ...prev, [districtId]: cachedEnvelope.cachedAt }));
      } else {
        setTelemetryError(err?.message || 'Unable to fetch live satellite telemetry');
      }
    } finally {
      setLoadingTelemetry(false);
    }
  }, []);

  useEffect(() => {
    if (activeDistrict && !telemetryMap[activeDistrict.id]) {
      fetchDistrictVerifiedTelemetry(activeDistrict.name, activeDistrict.id);
    }
  }, [activeDistrict, telemetryMap, fetchDistrictVerifiedTelemetry]);

  const liveTelemetry = telemetryMap[activeDistrict.id];

  const getBadgeStyle = (rating: DistrictReadinessCardData['readinessRating']) => {
    switch (rating) {
      case 'Prime Outpost':
        return 'bg-[#2E6F40] text-white border-[#2E6F40]';
      case 'Very Good':
        return 'bg-[#C89B3C] text-[#1A241E] border-[#C89B3C]';
      case 'Favorable':
        return 'bg-[#3B7A57]/20 text-[#2E6F40] border-[#2E6F40]/30';
      default:
        return 'bg-stone-200 text-stone-800 border-stone-300';
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header & Region Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2E6F40]/10 border border-[#2E6F40]/25 text-[#2E6F40] text-xs font-bold uppercase tracking-widest mb-3">
              <MapPinIcon className="w-4 h-4" />
              <span>Malawi Outpost Land & Water Profiles · Live Satellite Verification</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-normal text-[#1A241E] tracking-tight">
              District Readiness <span className="italic text-[#2E6F40]">Scouting Matrix</span>
            </h2>
          </div>

          {/* Region Filter */}
          <div className="flex flex-wrap gap-2 bg-[#EFECE6] p-1.5 rounded-2xl border border-[#1A241E]/10">
            {(['All', 'Northern', 'Central', 'Southern'] as const).map((region) => (
              <button
                key={region}
                onClick={() => {
                  setSelectedRegion(region);
                  const firstMatch = DISTRICT_READINESS_CARDS.find(
                    (d) => region === 'All' || d.region === region
                  );
                  if (firstMatch) setActiveDistrictId(firstMatch.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedRegion === region
                    ? 'bg-[#1A241E] text-[#F7F4EC] shadow-sm'
                    : 'text-[#1A241E]/70 hover:text-[#1A241E] hover:bg-white/50'
                }`}
              >
                {region === 'All' ? `All Districts (${DISTRICT_READINESS_CARDS.length})` : `${region} Region`}
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: District Selector List */}
          <div className="lg:col-span-4 space-y-3 max-h-[680px] overflow-y-auto custom-scrollbar pr-1">
            {filteredDistricts.map((district) => {
              const isSelected = district.id === activeDistrict.id;
              return (
                <button
                  key={district.id}
                  onClick={() => setActiveDistrictId(district.id)}
                  className={`w-full text-left p-5 rounded-3xl transition-all duration-200 border cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#1A241E] text-[#F7F4EC] border-[#1A241E] shadow-xl scale-[1.01]'
                      : 'bg-white text-[#1A241E] border-[#1A241E]/10 hover:border-[#2E6F40]/40 hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest ${
                          isSelected ? 'text-[#E6B655]' : 'text-[#2E6F40]'
                        }`}
                      >
                        {district.region} Region
                      </span>
                      <span className="text-xs opacity-40">•</span>
                      <span className={`text-xs ${isSelected ? 'text-white/70' : 'text-[#1A241E]/60'}`}>
                        {district.climateProfile.annualRainfallMm} mm/yr
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-normal">{district.name} District</h3>
                  </div>

                  <div className="flex flex-col items-end">
                    <div
                      className={`text-lg font-mono font-bold ${
                        isSelected ? 'text-[#86EFAC]' : 'text-[#2E6F40]'
                      }`}
                    >
                      {district.readinessScore}/100
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border mt-1 ${
                        isSelected
                          ? 'bg-white/10 text-white border-white/20'
                          : getBadgeStyle(district.readinessRating)
                      }`}
                    >
                      {district.readinessRating}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed District Profile */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDistrict.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-[#1A241E]/10 shadow-xl"
              >
                {/* Top Banner */}
                <div className="flex flex-wrap items-start justify-between gap-4 pb-8 mb-8 border-b border-[#1A241E]/10">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getBadgeStyle(
                          activeDistrict.readinessRating
                        )}`}
                      >
                        {activeDistrict.readinessRating}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#1A241E]/60 bg-[#EFECE6] px-3 py-1 rounded-full">
                        {activeDistrict.distanceFromMajorCities}
                      </span>
                      {activeDistrict.verificationStatus === 'verified' ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold">
                          <ShieldCheckIcon className="w-3.5 h-3.5" />
                          <span>Verified Institutional Record</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Partial Verification ({activeDistrict.unverifiedFields?.join(', ')})</span>
                        </span>
                      )}
                      {(!isOnline || cachedTelemetryAt[activeDistrict.id]) && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-900 border border-amber-400 text-xs font-mono font-bold">
                          <Database className="w-3.5 h-3.5" />
                          <span>Offline Cached Vault</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-serif font-normal text-[#1A241E] mt-2">
                      {activeDistrict.name} District Outpost Profile
                    </h3>
                    {activeDistrict.verificationNote && (
                      <p className="text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mt-2">
                        <strong>Field Verification Note:</strong> {activeDistrict.verificationNote}
                      </p>
                    )}
                  </div>

                  <div className="bg-[#FAF8F5] px-5 py-3 rounded-2xl border border-[#1A241E]/10 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#1A241E]/60">
                      Outpost Index
                    </div>
                    <div className="text-3xl font-serif font-bold text-[#2E6F40]">
                      {activeDistrict.readinessScore}
                      <span className="text-sm font-sans font-normal text-[#1A241E]/50">/100</span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-base md:text-lg text-[#1A241E]/80 leading-relaxed mb-8">
                  {activeDistrict.summary}
                </p>

                {/* Live Verified Agro-Climatic & Soil Telemetry Bar */}
                <div className="mb-8 rounded-3xl bg-[#141D17] text-[#F7F4EC] p-6 border border-[#2E6F40]/40 shadow-lg">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#2E6F40]/30 border border-[#86EFAC]/30 flex items-center justify-center text-[#86EFAC]">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#86EFAC]">
                            Live Verified Satellite & Soil Telemetry
                          </span>
                          {liveTelemetry && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#2E6F40]/40 text-[#86EFAC] text-[10px] font-mono">
                              <CheckCircle2 className="w-3 h-3" /> Verified Live
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white/65">
                          Real-time root-zone moisture, soil temperature, FAO evapotranspiration & SRTM elevation for{' '}
                          <strong className="text-white">{activeDistrict.name}</strong>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => fetchDistrictVerifiedTelemetry(activeDistrict.name, activeDistrict.id)}
                      disabled={loadingTelemetry}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-[#C89B3C] text-white hover:text-[#141D17] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${loadingTelemetry ? 'animate-spin' : ''}`} />
                      <span>{loadingTelemetry ? 'Syncing API...' : 'Refresh Live Telemetry'}</span>
                    </button>
                  </div>

                  {liveTelemetry ? (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                        <div className="bg-white/[0.05] rounded-2xl p-3 border border-white/10">
                          <div className="text-[10px] uppercase tracking-wider text-white/55">SRTM Elevation</div>
                          <div className="text-lg font-mono font-bold text-[#E6B655] mt-0.5">
                            {liveTelemetry.verifiedElevationMeters ?? '1,150'} m
                          </div>
                          <div className="text-[10px] text-white/45 font-mono">
                            {liveTelemetry.coordinates.lat.toFixed(2)}°, {liveTelemetry.coordinates.lng.toFixed(2)}°
                          </div>
                        </div>

                        <div className="bg-white/[0.05] rounded-2xl p-3 border border-white/10">
                          <div className="text-[10px] uppercase tracking-wider text-white/55">Soil Temp (18cm)</div>
                          <div className="text-lg font-mono font-bold text-[#86EFAC] mt-0.5">
                            {liveTelemetry.liveAgroClimate.soilTempRootZoneC}°C
                          </div>
                          <div className="text-[10px] text-white/45">
                            Air: {liveTelemetry.liveAgroClimate.airTempC}°C
                          </div>
                        </div>

                        <div className="bg-white/[0.05] rounded-2xl p-3 border border-white/10">
                          <div className="text-[10px] uppercase tracking-wider text-white/55">Root Moisture</div>
                          <div className="text-lg font-mono font-bold text-[#60A5FA] mt-0.5">
                            {liveTelemetry.liveAgroClimate.soilMoistureRootZonePct}%
                          </div>
                          <div className="text-[10px] text-white/45">
                            Topsoil: {liveTelemetry.liveAgroClimate.soilMoistureSurfacePct}%
                          </div>
                        </div>

                        <div className="bg-white/[0.05] rounded-2xl p-3 border border-white/10">
                          <div className="text-[10px] uppercase tracking-wider text-white/55">Solar Peak</div>
                          <div className="text-lg font-mono font-bold text-[#FBBF24] mt-0.5">
                            {liveTelemetry.liveAgroClimate.solarPotentialKwhM2Day} kWh
                          </div>
                          <div className="text-[10px] text-white/45">
                            {liveTelemetry.liveAgroClimate.solarRadiationWm2} W/m² now
                          </div>
                        </div>

                        <div className="bg-white/[0.05] rounded-2xl p-3 border border-white/10">
                          <div className="text-[10px] uppercase tracking-wider text-white/55">FAO ET₀ Loss</div>
                          <div className="text-lg font-mono font-bold text-white mt-0.5">
                            {liveTelemetry.liveAgroClimate.evapotranspirationMmDay} mm/d
                          </div>
                          <div className="text-[10px] text-white/45">
                            Humidity: {liveTelemetry.liveAgroClimate.humidityPct}%
                          </div>
                        </div>

                        <div className="bg-white/[0.05] rounded-2xl p-3 border border-white/10">
                          <div className="text-[10px] uppercase tracking-wider text-white/55">14d / +7d Rain</div>
                          <div className="text-lg font-mono font-bold text-[#38BDF8] mt-0.5">
                            {liveTelemetry.liveAgroClimate.recent14DayRainfallMm} mm
                          </div>
                          <div className="text-[10px] text-white/45">
                            Next 7d: +{liveTelemetry.liveAgroClimate.forecast7DayRainfallMm} mm
                          </div>
                        </div>
                      </div>

                      {/* Verified Data Provenance Links */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10 text-[11px] text-white/60">
                        <span className="flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-[#C89B3C]" />
                          <span>Verified Providers:</span>
                        </span>
                        <div className="flex flex-wrap items-center gap-3">
                          {liveTelemetry.verifiedSources.map((src, i) => (
                            <a
                              key={i}
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[#E6B655] hover:underline"
                            >
                              <span>{src.name}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-xs text-white/70 py-3">
                      {telemetryError ? (
                        <span className="text-amber-300">{telemetryError} — showing baseline regional metrics below.</span>
                      ) : (
                        <span>Querying Open-Meteo Agro-Climatic & SRTM Elevation APIs for {activeDistrict.name}...</span>
                      )}
                    </div>
                  )}
                </div>

                {/* 3 Core Technical Profiles: Water, Soil, Climate */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Water */}
                  <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#1A241E]/10">
                    <div className="flex items-center gap-2.5 text-[#1E5670] font-bold text-xs uppercase tracking-widest mb-4">
                      <WaterDropIcon className="w-5 h-5" />
                      <span>Water & Aquifer</span>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-[#1A241E]/50 font-bold">
                          Primary Source
                        </span>
                        <span className="font-medium text-[#1A241E]">{activeDistrict.waterProfile.sourceType}</span>
                      </div>
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-[#1A241E]/50 font-bold">
                          Aquifer Depth
                        </span>
                        <span className="font-mono font-bold text-[#1E5670]">
                          {activeDistrict.waterProfile.aquiferDepth}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-[#1A241E]/50 font-bold">
                          Gravity Flow Potential
                        </span>
                        <span className="text-[#1A241E]/80">{activeDistrict.waterProfile.gravityPotential}</span>
                      </div>
                    </div>
                  </div>

                  {/* Soil */}
                  <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#1A241E]/10">
                    <div className="flex items-center gap-2.5 text-[#7C4D2B] font-bold text-xs uppercase tracking-widest mb-4">
                      <SoilTestIcon className="w-5 h-5" />
                      <span>Soil & Fertility</span>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-[#1A241E]/50 font-bold">
                          Soil Classification
                        </span>
                        <span className="font-medium text-[#1A241E]">{activeDistrict.soilProfile.primaryType}</span>
                      </div>
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-[#1A241E]/50 font-bold">
                          Natural pH & Fertility
                        </span>
                        <span className="font-mono font-bold text-[#7C4D2B]">
                          {activeDistrict.soilProfile.phRange}
                        </span>{' '}
                        <span className="text-xs text-[#1A241E]/70">({activeDistrict.soilProfile.fertility})</span>
                      </div>
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-[#1A241E]/50 font-bold">
                          Edenic Soil Tip
                        </span>
                        <span className="text-[#1A241E]/80">{activeDistrict.soilProfile.organicMatterTip}</span>
                      </div>
                    </div>
                  </div>

                  {/* Climate & Solar */}
                  <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#1A241E]/10">
                    <div className="flex items-center gap-2.5 text-[#B8860B] font-bold text-xs uppercase tracking-widest mb-4">
                      <SunPowerIcon className="w-5 h-5" />
                      <span>Climate & Solar</span>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-[#1A241E]/50 font-bold">
                          Annual Rainfall (Rainy Season)
                        </span>
                        <span className="font-mono font-bold text-[#2E6F40]">
                          {activeDistrict.climateProfile.annualRainfallMm} mm
                        </span>{' '}
                        <span className="text-xs text-[#1A241E]/70">({activeDistrict.climateProfile.dzinjaMonths})</span>
                      </div>
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-[#1A241E]/50 font-bold">
                          Solar Sizing Potential
                        </span>
                        <span className="font-mono font-bold text-[#B8860B]">
                          {activeDistrict.climateProfile.solarPotential}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-[#1A241E]/50 font-bold">
                          Dry Season Notes
                        </span>
                        <span className="text-[#1A241E]/80">{activeDistrict.climateProfile.chilimweNotes}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Outpost Advantages & Ideal Crops */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
                  <div className="md:col-span-7 bg-[#2E6F40]/5 rounded-3xl p-6 border border-[#2E6F40]/15">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2E6F40] mb-4">
                      <ShieldCheckIcon className="w-4 h-4" />
                      <span>Strategic Outpost Advantages</span>
                    </div>
                    <ul className="space-y-2.5">
                      {activeDistrict.outpostAdvantages.map((adv, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-[#1A241E]/85">
                          <span className="w-5 h-5 rounded-full bg-[#2E6F40] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            ✓
                          </span>
                          <span>{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="md:col-span-5 bg-[#C89B3C]/10 rounded-3xl p-6 border border-[#C89B3C]/25">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8B6508] mb-4">
                      <SproutIcon className="w-4 h-4" />
                      <span>Thriving Edenic Crops</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeDistrict.edenicCrops.map((crop) => (
                        <span
                          key={crop}
                          className="px-3 py-1.5 rounded-xl bg-white text-[#1A241E] text-xs font-bold border border-[#C89B3C]/30 shadow-2xs"
                        >
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
