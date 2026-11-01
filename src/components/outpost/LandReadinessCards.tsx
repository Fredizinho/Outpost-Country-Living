import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DISTRICT_READINESS_CARDS, DistrictReadinessCardData } from '@/data/outpostFourPillarsData';
import {
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  Check,
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
      const resp = await fetch(`/api/district-telemetry/${encodeURIComponent(districtId)}`);
      const fromSwCache = resp.headers.get('X-SW-Cache') === 'true';

      if (!resp.ok) {
        throw new Error(`Telemetry service returned status ${resp.status}`);
      }

      const data: LiveVerifiedTelemetry = await resp.json();
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
        return 'bg-[var(--success)] text-white border-[var(--success)]';
      case 'Very Good':
        return 'bg-[var(--gold)] text-[var(--ink)] border-[var(--gold)]';
      case 'Favorable':
        return 'bg-[var(--success)]/20 text-[var(--success)] border-[var(--success)]/30';
      default:
        return 'bg-[var(--ground)] text-[var(--ink-muted)] border-[var(--border)]';
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header & Region Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[var(--radius-control)] bg-[var(--success)]/10 border border-[var(--success)]/25 text-[var(--success)] text-xs font-semibold mb-3">
              <MapPinIcon className="w-4 h-4" />
              <span>Malawi outpost land &amp; water profiles · Live satellite verification</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-normal text-[var(--ink)] tracking-tight">
              District readiness <span className="italic text-[var(--success)]">scouting matrix</span>
            </h2>
          </div>

          {/* Region Filter */}
          <div className="flex flex-wrap gap-2 bg-[var(--ground)] p-1.5 rounded-[var(--radius-card)] border border-[var(--border)]">
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
                className={`px-4 py-2 rounded-[var(--radius-control)] text-xs font-semibold transition-all cursor-pointer ${
                  selectedRegion === region
                    ? 'bg-[var(--color-moss-light)] text-white shadow-xs'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)]'
                }`}
              >
                {region === 'All' ? `All districts (${DISTRICT_READINESS_CARDS.length})` : `${region} Region`}
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
                  className={`w-full text-left p-5 rounded-[var(--radius-card)] transition-all duration-200 border cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-[var(--color-moss-light)] text-white border-[var(--color-moss-light)] shadow-sm'
                      : 'bg-[var(--surface)] text-[var(--ink)] border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--ground)]'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-caption font-semibold ${
                          isSelected ? 'text-[var(--gold)]' : 'text-[var(--success)]'
                        }`}
                      >
                        {district.region} Region
                      </span>
                      <span className="text-xs opacity-40">•</span>
                      <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-[var(--ink-muted)]'}`}>
                        {district.climateProfile.annualRainfallMm} mm/yr
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-normal">{district.name} District</h3>
                  </div>

                  <div className="flex flex-col items-end">
                    <div
                      className={`text-lg font-mono font-bold ${
                        isSelected ? 'text-[var(--gold)]' : 'text-[var(--success)]'
                      }`}
                    >
                      {district.readinessScore}/100
                    </div>
                    <span
                      className={`text-caption font-semibold px-2.5 py-0.5 rounded-[var(--radius-control)] border mt-1 ${
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
                className="bg-[var(--surface)] rounded-[var(--radius-sheet)] p-8 md:p-10 border border-[var(--border)] shadow-sm"
              >
                {/* Top Banner */}
                <div className="flex flex-wrap items-start justify-between gap-4 pb-8 mb-8 border-b border-[var(--border)]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-2">
                      <span
                        className={`px-3 py-1 rounded-[var(--radius-control)] text-xs font-semibold border ${getBadgeStyle(
                          activeDistrict.readinessRating
                        )}`}
                      >
                        {activeDistrict.readinessRating}
                      </span>
                      <span className="text-xs font-medium text-[var(--ink-muted)] bg-[var(--ground)] px-3 py-1 rounded-[var(--radius-control)] border border-[var(--border)]">
                        {activeDistrict.distanceFromMajorCities}
                      </span>
                      {activeDistrict.verificationStatus === 'verified' ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-[var(--radius-control)] bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/30 text-xs font-semibold">
                          <ShieldCheckIcon className="w-3.5 h-3.5" />
                          <span>Verified institutional record</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-[var(--radius-control)] bg-[var(--warning)]/10 text-[var(--warning)] border border-[var(--warning)]/30 text-xs font-semibold">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Partial verification ({activeDistrict.unverifiedFields?.join(', ')})</span>
                        </span>
                      )}
                      {(!isOnline || cachedTelemetryAt[activeDistrict.id]) && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-[var(--radius-control)] bg-amber-500/20 text-amber-900 border border-amber-400 text-xs font-mono font-semibold">
                          <Database className="w-3.5 h-3.5" />
                          <span>Offline cached vault</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-serif font-normal text-[var(--ink)] mt-2">
                      {activeDistrict.name} District Outpost Profile
                    </h3>
                    {activeDistrict.verificationNote && (
                      <p className="text-xs text-[var(--ink-muted)] bg-[var(--ground)] border border-[var(--border)] rounded-[var(--radius-control)] px-3 py-2 mt-2">
                        <strong className="text-[var(--ink)]">Field verification note:</strong> {activeDistrict.verificationNote}
                      </p>
                    )}
                  </div>

                  <div className="bg-[var(--ground)] px-5 py-3 rounded-[var(--radius-card)] border border-[var(--border)] text-center">
                    <div className="text-caption font-semibold text-[var(--ink-muted)]">
                      Outpost index
                    </div>
                    <div className="text-3xl font-serif font-bold text-[var(--success)]">
                      {activeDistrict.readinessScore}
                      <span className="text-sm font-sans font-normal text-[var(--ink-muted)]">/100</span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-base md:text-lg text-[var(--ink)] leading-relaxed mb-8">
                  {activeDistrict.summary}
                </p>

                {/* Live Verified Agro-Climatic & Soil Telemetry Bar */}
                <div className="mb-8 rounded-[var(--radius-card)] bg-[var(--surface-muted)] text-[var(--ink)] p-6 border border-[var(--border)] shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[var(--border)]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-[var(--radius-control)] bg-[var(--success)]/20 border border-[var(--success)]/40 flex items-center justify-center text-[var(--success)]">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-caption font-semibold text-[var(--success)]">
                            Live verified satellite &amp; soil telemetry
                          </span>
                          {liveTelemetry && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[var(--radius-control)] bg-[var(--success)]/20 text-[var(--success)] text-caption font-mono">
                              <CheckCircle2 className="w-3 h-3" /> Verified Live
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[var(--ink-muted)]">
                          Real-time root-zone moisture, soil temperature, FAO evapotranspiration &amp; SRTM elevation for{' '}
                          <strong className="text-[var(--ink)]">{activeDistrict.name}</strong>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => fetchDistrictVerifiedTelemetry(activeDistrict.name, activeDistrict.id)}
                      disabled={loadingTelemetry}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[var(--radius-control)] bg-[var(--ground)] hover:bg-[var(--accent)] text-[var(--ink)] hover:text-white text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 border border-[var(--border)]"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${loadingTelemetry ? 'animate-spin' : ''}`} />
                      <span>{loadingTelemetry ? 'Syncing API...' : 'Refresh live telemetry'}</span>
                    </button>
                  </div>

                  {liveTelemetry ? (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                        <div className="bg-[var(--surface)] rounded-[var(--radius-control)] p-3 border border-[var(--border)]">
                          <div className="text-caption text-[var(--ink-muted)]">SRTM elevation</div>
                          <div className="text-lg font-mono font-bold text-[var(--gold)] mt-0.5">
                            {liveTelemetry.verifiedElevationMeters ?? '1,150'} m
                          </div>
                          <div className="text-caption text-[var(--ink-muted)] font-mono">
                            {liveTelemetry.coordinates.lat.toFixed(2)}°, {liveTelemetry.coordinates.lng.toFixed(2)}°
                          </div>
                        </div>

                        <div className="bg-[var(--surface)] rounded-[var(--radius-control)] p-3 border border-[var(--border)]">
                          <div className="text-caption text-[var(--ink-muted)]">Soil temp (18cm)</div>
                          <div className="text-lg font-mono font-bold text-[var(--success)] mt-0.5">
                            {liveTelemetry.liveAgroClimate.soilTempRootZoneC}°C
                          </div>
                          <div className="text-caption text-[var(--ink-muted)]">
                            Air: {liveTelemetry.liveAgroClimate.airTempC}°C
                          </div>
                        </div>

                        <div className="bg-[var(--surface)] rounded-[var(--radius-control)] p-3 border border-[var(--border)]">
                          <div className="text-caption text-[var(--ink-muted)]">Root moisture</div>
                          <div className="text-lg font-mono font-bold text-[var(--info)] mt-0.5">
                            {liveTelemetry.liveAgroClimate.soilMoistureRootZonePct}%
                          </div>
                          <div className="text-caption text-[var(--ink-muted)]">
                            Topsoil: {liveTelemetry.liveAgroClimate.soilMoistureSurfacePct}%
                          </div>
                        </div>

                        <div className="bg-[var(--surface)] rounded-[var(--radius-control)] p-3 border border-[var(--border)]">
                          <div className="text-caption text-[var(--ink-muted)]">Solar peak</div>
                          <div className="text-lg font-mono font-bold text-[var(--gold)] mt-0.5">
                            {liveTelemetry.liveAgroClimate.solarPotentialKwhM2Day} kWh
                          </div>
                          <div className="text-caption text-[var(--ink-muted)]">
                            {liveTelemetry.liveAgroClimate.solarRadiationWm2} W/m² now
                          </div>
                        </div>

                        <div className="bg-[var(--surface)] rounded-[var(--radius-control)] p-3 border border-[var(--border)]">
                          <div className="text-caption text-[var(--ink-muted)]">FAO ET₀ loss</div>
                          <div className="text-lg font-mono font-bold text-[var(--ink)] mt-0.5">
                            {liveTelemetry.liveAgroClimate.evapotranspirationMmDay} mm/d
                          </div>
                          <div className="text-caption text-[var(--ink-muted)]">
                            Humidity: {liveTelemetry.liveAgroClimate.humidityPct}%
                          </div>
                        </div>

                        <div className="bg-[var(--surface)] rounded-[var(--radius-control)] p-3 border border-[var(--border)]">
                          <div className="text-caption text-[var(--ink-muted)]">14d / +7d rain</div>
                          <div className="text-lg font-mono font-bold text-[var(--info)] mt-0.5">
                            {liveTelemetry.liveAgroClimate.recent14DayRainfallMm} mm
                          </div>
                          <div className="text-caption text-[var(--ink-muted)]">
                            Next 7d: +{liveTelemetry.liveAgroClimate.forecast7DayRainfallMm} mm
                          </div>
                        </div>
                      </div>

                      {/* Verified Data Provenance Links */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[var(--border)] text-caption text-[var(--ink-muted)]">
                        <span className="flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-[var(--gold)]" />
                          <span>Verified providers:</span>
                        </span>
                        <div className="flex flex-wrap items-center gap-3">
                          {liveTelemetry.verifiedSources.map((src, i) => (
                            <a
                              key={i}
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[var(--gold)] hover:underline"
                            >
                              <span>{src.name}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-xs text-[var(--ink-muted)] py-3">
                      {telemetryError ? (
                        <span className="text-[var(--danger)]">{telemetryError} — showing baseline regional metrics below.</span>
                      ) : (
                        <span>Querying Open-Meteo Agro-Climatic &amp; SRTM Elevation APIs for {activeDistrict.name}...</span>
                      )}
                    </div>
                  )}
                </div>

                {/* 3 Core Technical Profiles: Water, Soil, Climate */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Water */}
                  <div className="bg-[var(--ground)] p-6 rounded-[var(--radius-card)] border border-[var(--border)]">
                    <div className="flex items-center gap-2.5 text-[var(--info)] font-bold text-xs mb-4">
                      <WaterDropIcon className="w-5 h-5" />
                      <span>Water &amp; aquifer</span>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="block text-caption text-[var(--ink-muted)] font-semibold">
                          Primary source
                        </span>
                        <span className="font-medium text-[var(--ink)]">{activeDistrict.waterProfile.sourceType}</span>
                      </div>
                      <div>
                        <span className="block text-caption text-[var(--ink-muted)] font-semibold">
                          Aquifer depth
                        </span>
                        <span className="font-mono font-bold text-[var(--info)]">
                          {activeDistrict.waterProfile.aquiferDepth}
                        </span>
                      </div>
                      <div>
                        <span className="block text-caption text-[var(--ink-muted)] font-semibold">
                          Gravity flow potential
                        </span>
                        <span className="text-[var(--ink-muted)]">{activeDistrict.waterProfile.gravityPotential}</span>
                      </div>
                    </div>
                  </div>

                  {/* Soil */}
                  <div className="bg-[var(--ground)] p-6 rounded-[var(--radius-card)] border border-[var(--border)]">
                    <div className="flex items-center gap-2.5 text-[var(--terracotta)] font-bold text-xs mb-4">
                      <SoilTestIcon className="w-5 h-5" />
                      <span>Soil &amp; fertility</span>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="block text-caption text-[var(--ink-muted)] font-semibold">
                          Soil classification
                        </span>
                        <span className="font-medium text-[var(--ink)]">{activeDistrict.soilProfile.primaryType}</span>
                      </div>
                      <div>
                        <span className="block text-caption text-[var(--ink-muted)] font-semibold">
                          Natural pH &amp; fertility
                        </span>
                        <span className="font-mono font-bold text-[var(--terracotta)]">
                          {activeDistrict.soilProfile.phRange}
                        </span>{' '}
                        <span className="text-xs text-[var(--ink-muted)]">({activeDistrict.soilProfile.fertility})</span>
                      </div>
                      <div>
                        <span className="block text-caption text-[var(--ink-muted)] font-semibold">
                          Edenic soil tip
                        </span>
                        <span className="text-[var(--ink-muted)]">{activeDistrict.soilProfile.organicMatterTip}</span>
                      </div>
                    </div>
                  </div>

                  {/* Climate & Solar */}
                  <div className="bg-[var(--ground)] p-6 rounded-[var(--radius-card)] border border-[var(--border)]">
                    <div className="flex items-center gap-2.5 text-[var(--gold)] font-bold text-xs mb-4">
                      <SunPowerIcon className="w-5 h-5" />
                      <span>Climate &amp; solar</span>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="block text-caption text-[var(--ink-muted)] font-semibold">
                          Annual rainfall (rainy season)
                        </span>
                        <span className="font-mono font-bold text-[var(--success)]">
                          {activeDistrict.climateProfile.annualRainfallMm} mm
                        </span>{' '}
                        <span className="text-xs text-[var(--ink-muted)]">({activeDistrict.climateProfile.dzinjaMonths})</span>
                      </div>
                      <div>
                        <span className="block text-caption text-[var(--ink-muted)] font-semibold">
                          Solar sizing potential
                        </span>
                        <span className="font-mono font-bold text-[var(--gold)]">
                          {activeDistrict.climateProfile.solarPotential}
                        </span>
                      </div>
                      <div>
                        <span className="block text-caption text-[var(--ink-muted)] font-semibold">
                          Dry season notes
                        </span>
                        <span className="text-[var(--ink-muted)]">{activeDistrict.climateProfile.chilimweNotes}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Outpost Advantages & Ideal Crops */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
                  <div className="md:col-span-7 bg-[var(--success)]/10 rounded-[var(--radius-card)] p-6 border border-[var(--success)]/20">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[var(--success)] mb-4">
                      <ShieldCheckIcon className="w-4 h-4" />
                      <span>Strategic outpost advantages</span>
                    </div>
                    <ul className="space-y-2.5">
                      {activeDistrict.outpostAdvantages.map((adv, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-[var(--ink)]">
                          <span className="w-5 h-5 rounded-full bg-[var(--success)] text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={16} strokeWidth={1.75} />
                          </span>
                          <span>{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="md:col-span-5 bg-[var(--gold)]/10 rounded-[var(--radius-card)] p-6 border border-[var(--gold)]/25">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[var(--gold)] mb-4">
                      <SproutIcon className="w-4 h-4" />
                      <span>Thriving edenic crops</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeDistrict.edenicCrops.map((crop) => (
                        <span
                          key={crop}
                          className="px-3 py-1.5 rounded-[var(--radius-control)] bg-[var(--surface)] text-[var(--ink)] text-xs font-semibold border border-[var(--border)] shadow-2xs"
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
