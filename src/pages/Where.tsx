import { MapPin, Search, CheckCircle2, Circle, PencilLine, Navigation, Map as MapIcon, X, Compass, Check, AlertCircle, FileText, ChevronRight, ChevronDown, ChevronUp, CloudSun, Sprout, Sparkles, Wrench, ArrowUpRight, Copy, Calculator, ShieldCheck, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { LAND_CHECKLIST_DATA, MALAWI_OUTPOST_ZONES, MALAWI_DISTRICTS_DATA, MalawiDistrictInfo, DATA_SOURCES_AND_CITATIONS } from '@/data/content';
import { getDistrictRecord, DISTRICT_LIST, PLANTING_PIT_SPECS } from '@/constants';
import { cn } from '@/lib/utils';
import { getStoredLandChecklist, saveStoredLandChecklist } from '@/lib/offlineStorage';
import { getActiveHomesteadDistrictId, setActiveHomesteadDistrictId } from '@/lib/activeDistrictSync';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { RegionalWeatherWidget } from '@/components/weather/RegionalWeatherWidget';
import { COUNTRY_IMAGES } from '@/assets/images';
import { HomeSceneryBackground } from '@/components/home/HomeSceneryBackground';
import { CountryIcon } from '@/components/icons/CountryIcons';
import { LandReadinessCards } from '@/components/outpost/LandReadinessCards';
import { PropertySuitabilityCalculator } from '@/components/outpost/PropertySuitabilityCalculator';
import { CustomaryLandChecklist } from '@/components/outpost/CustomaryLandChecklist';
import { CustomaryLandTenureWizard } from '@/components/land/CustomaryLandTenureWizard';
import { ChichewaFieldPhrasebook } from '@/components/outpost/ChichewaFieldPhrasebook';
import { ActiveDistrictContextBar } from '@/components/common/ActiveDistrictContextBar';

interface ChecklistState {
  completedIds: string[];
  notes: Record<string, string>;
}

export default function Where() {
  const [state, setState] = useState<ChecklistState>(() => {
    const saved = getStoredLandChecklist<ChecklistState>();
    return saved || { completedIds: [], notes: {} };
  });

  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [expandedZoneId, setExpandedZoneId] = useState<string | null>(null);
  const [districtQuery, setDistrictQuery] = useState('');
  const [analyzedDistrict, setAnalyzedDistrict] = useState<MalawiDistrictInfo | null>(() => {
    const savedId = getActiveHomesteadDistrictId('mzimba');
    return MALAWI_DISTRICTS_DATA[savedId] || MALAWI_DISTRICTS_DATA['mzimba'];
  });
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [activeTipModal, setActiveTipModal] = useState<string | null>(null);
  const [hasCopiedDossier, setHasCopiedDossier] = useState(false);
  const [activePerspective, setActivePerspective] = useState<'districts' | 'customary-law' | 'evaluator'>(() => {
    if (
      location.pathname.startsWith('/suitability') ||
      location.pathname.startsWith('/property-evaluator') ||
      searchParams.get('tab') === 'evaluator'
    ) {
      return 'evaluator';
    }
    if (searchParams.get('tab') === 'customary-law' || searchParams.get('tab') === 'law') {
      return 'customary-law';
    }
    return 'districts';
  });

  useEffect(() => {
    if (
      location.pathname.startsWith('/suitability') ||
      location.pathname.startsWith('/property-evaluator') ||
      searchParams.get('tab') === 'evaluator'
    ) {
      setActivePerspective('evaluator');
    } else if (searchParams.get('tab') === 'customary-law' || searchParams.get('tab') === 'law') {
      setActivePerspective('customary-law');
    } else if (searchParams.get('tab') === 'districts') {
      setActivePerspective('districts');
    }
  }, [location.pathname, searchParams]);

  const handleCopyDossier = async () => {
    if (!analyzedDistrict) return;
    const text = `OUTPOST TERRITORIAL FEASIBILITY REPORT: ${analyzedDistrict.name.toUpperCase()} DISTRICT
Region: ${analyzedDistrict.region}
Altitude: ${analyzedDistrict.altitude}
Annual Rainfall: ${analyzedDistrict.rainfall}
Soil Type: ${analyzedDistrict.soil} (pH: ${analyzedDistrict.soilPh})
Groundwater Depth: ${analyzedDistrict.groundwaterDepthM}
Customary Land Price Range: ${analyzedDistrict.landCostBallpark}
Suitability Score: ${analyzedDistrict.suitabilityScore}/10
Nearest Major Market: ${analyzedDistrict.nearestMarketTown} (${analyzedDistrict.m1DistanceKm})

HYDROGEOLOGY & WATER PROFILE:
${analyzedDistrict.hydrogeologyNote}

RECOMMENDED CROPS:
${analyzedDistrict.bestCrops.join(', ')}

OUTPOST STRATEGY & COUNSEL:
"${analyzedDistrict.outpostStrategy}"

Source Reference: ${analyzedDistrict.dccmsSourceRef}
Generated from OUTPOST: Country Living Matrix
`;
    try {
      await navigator.clipboard.writeText(text);
      setHasCopiedDossier(true);
      setTimeout(() => setHasCopiedDossier(false), 2500);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    saveStoredLandChecklist(state);
  }, [state]);

  const toggleComplete = (id: string) => {
    setState(prev => ({
      ...prev,
      completedIds: prev.completedIds.includes(id)
        ? prev.completedIds.filter(i => i !== id)
        : [...prev.completedIds, id]
    }));
  };

  const updateNote = (id: string, note: string) => {
    setState(prev => ({
      ...prev,
      notes: { ...prev.notes, [id]: note }
    }));
  };

  const handleDistrictSearch = (query: string) => {
    const q = query.toLowerCase().trim();
    setDistrictQuery(query);
    if (!q) return;

    // 1. Check curated extended dossier first
    const matchedKey = Object.keys(MALAWI_DISTRICTS_DATA).find(key => 
      key.includes(q) || MALAWI_DISTRICTS_DATA[key].name.toLowerCase().includes(q)
    );

    if (matchedKey) {
      setAnalyzedDistrict(MALAWI_DISTRICTS_DATA[matchedKey]);
      setActiveHomesteadDistrictId(matchedKey);
      return;
    }

    // 2. Fallback to full 28-district Central Registry so every Malawi district resolves
    const regRecord = getDistrictRecord(q === 'mzuzu' ? 'mzimba' : q);
    if (regRecord) {
      setActiveHomesteadDistrictId(regRecord.id);
      const pitSpec = PLANTING_PIT_SPECS[regRecord.recommendedPitKey] || PLANTING_PIT_SPECS.egwDeepPit;
      setAnalyzedDistrict({
        id: regRecord.id,
        name: `${regRecord.name} District`,
        region: regRecord.region,
        altitude: regRecord.elevationRange,
        rainfall: `${regRecord.rainfallAnnualMm} mm/year (${regRecord.rainfallPattern})`,
        rainfallAnnualMm: regRecord.rainfallAnnualMm,
        soil: regRecord.primarySoil,
        faoSoilClassification: regRecord.faoSoilClassification,
        soilTypeDetailed: `${regRecord.primarySoil} · ${regRecord.soilAmendmentPrescription}`,
        soilPh: regRecord.soilPh,
        groundwaterDepthM: regRecord.aquiferDepth,
        aquiferDepthM: regRecord.aquiferDepthM,
        solarKwhDay: regRecord.solarKwhDay,
        landCostBallpark: regRecord.landCostBallpark,
        nearestMarketTown: `${regRecord.name} Boma (${regRecord.traditionalAuthorities.slice(0, 2).join(', ')})`,
        m1DistanceKm: `Centroid ${Math.abs(regRecord.lat).toFixed(2)}°S, ${regRecord.lng.toFixed(2)}°E`,
        suitabilityScore: regRecord.suitabilityScore,
        verificationStatus: regRecord.verificationStatus,
        unverifiedFields: regRecord.unverifiedFields,
        bestCrops: regRecord.topCrops,
        outpostStrategy: `${regRecord.description} Recommended Orchard Standard: ${pitSpec.name} (${pitSpec.dimensionString}).`,
        hydrogeologyNote: `${regRecord.aquiferDepth}. Solar insolation averages ${regRecord.solarKwhDay} kWh/m²/day for reliable solar borehole pumping.`,
        dccmsSourceRef: `DCCMS ${regRecord.name} District Meteorological & Hydrogeology Registry`
      });
    }
  };

  const currentZones = selectedRegion 
    ? MALAWI_OUTPOST_ZONES.filter(z => z.region === selectedRegion)
    : MALAWI_OUTPOST_ZONES;

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 max-w-7xl mx-auto flex flex-col gap-6">
      <header className="glass-depth-card rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-800 dark:text-amber-300 font-semibold">
              <span>Malawi Land &amp; Water Scouting Workbench</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-500 dark:text-stone-400 font-normal">
                28 Districts · Customary Land Act (2016) · Because buying land without checking the water table is just expensive camping
              </span>
            </div>
            <h1 className="serif text-2xl sm:text-3xl font-bold text-stone-950 dark:text-stone-50 tracking-tight">
              Find Water-Rich, Legal Land Across All 28 Malawi Districts
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link
              to="/scout-map"
              className="bg-emerald-950 hover:bg-emerald-900 text-amber-300 font-mono font-bold text-xs uppercase px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <Compass size={14} /> 28-District GIS Map <ChevronRight size={13} />
            </Link>
            <button
              onClick={() => window.print()}
              className="bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 font-mono text-xs font-bold uppercase px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              title="Print current Field Scouting Dossier"
            >
              <Printer size={13} /> Print Dossier
            </button>
            <button
              onClick={() => setShowSurveyModal(true)}
              className="bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 font-mono text-xs font-bold uppercase px-3 py-2 rounded-xl transition-all cursor-pointer"
            >
              Field Survey Guide
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-200/80 dark:border-emerald-900/40">
          <div className="flex flex-wrap items-center gap-1.5 bg-stone-100 dark:bg-stone-900/90 p-1 rounded-xl border border-stone-200/80 dark:border-stone-800">
            {([
              { id: 'districts', label: '01. District & Aquifers' },
              { id: 'customary-law', label: '02. Customary Land Law & Protocols' },
              { id: 'evaluator', label: '03. Property Evaluator & Checklist' },
            ] as const).map((tab) => {
              const active = activePerspective === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActivePerspective(tab.id)}
                  className={cn(
                    'px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                    active
                      ? 'bg-emerald-950 dark:bg-amber-500 text-amber-300 dark:text-stone-950 shadow-xs font-bold'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800'
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('outpost:open-citations'))}
            className="text-xs font-medium text-emerald-800 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            View {DATA_SOURCES_AND_CITATIONS.length} Verified Authorities (WMO / FAO) →
          </button>
        </div>

        <ActiveDistrictContextBar onDistrictSelect={(id) => handleDistrictSearch(id)} />
      </header>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: ESSENTIAL FUNCTION - DISTRICT & ZONE ANALYZER      */}
      {/* ------------------------------------------------------------- */}
      {activePerspective === 'districts' && (
      <section className="bg-white/95 dark:bg-[#0D1D13] text-stone-900 dark:text-stone-100 p-6 sm:p-8 md:p-10 rounded-3xl flex flex-col gap-6 relative shadow-xs border border-stone-200 dark:border-emerald-900/60">
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-emerald-900/50 pb-4">
            <div>
              <span className="text-emerald-900 dark:text-amber-300 text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Search size={13} className="text-emerald-700 dark:text-amber-400" />
                01 • DISTRICT FINDER
              </span>
              <h2 className="serif text-2xl sm:text-3xl font-bold mt-1 text-stone-900 dark:text-white">Farming Zone & District Checker</h2>
              <p className="text-stone-700 dark:text-stone-300 mt-1 text-sm font-medium">Search any district in Malawi to check soil acidity, well water depth, rainfall, and farming conditions.</p>
            </div>
            <Link
              to={analyzedDistrict ? `/scout?district=${encodeURIComponent(analyzedDistrict.id || analyzedDistrict.name.replace(' District', '').toLowerCase())}` : '/scout'}
              className="self-start sm:self-auto bg-emerald-50 dark:bg-emerald-950/90 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-emerald-900 dark:text-amber-300 border border-emerald-300 dark:border-emerald-700 font-sans text-xs font-semibold uppercase px-4 py-2.5 rounded-xl transition-all flex items-center gap-2"
            >
              <Compass size={14} className="text-emerald-800 dark:text-amber-400" /> View {analyzedDistrict ? analyzedDistrict.name.replace(' District', '') : ''} on Map
            </Link>
          </div>

          {/* Quick District Buttons across all 28 Districts */}
          <div className="flex flex-wrap gap-1.5">
            {DISTRICT_LIST.map(dist => (
              <button
                key={dist.id}
                onClick={() => handleDistrictSearch(dist.name)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-sans font-semibold tracking-tight transition-all border cursor-pointer",
                  analyzedDistrict?.name.toLowerCase().includes(dist.name.toLowerCase())
                    ? "bg-emerald-900 dark:bg-amber-500 border-emerald-950 dark:border-amber-400 text-white dark:text-stone-950 shadow-xs font-bold"
                    : "bg-stone-100 dark:bg-stone-900 border-stone-300 dark:border-emerald-900/60 text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800"
                )}
              >
                {dist.name}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <div className="relative w-full">
              <Search className="absolute left-4 top-4 text-emerald-800 dark:text-amber-400" size={18} />
              <input 
                type="text" 
                value={districtQuery}
                onChange={(e) => handleDistrictSearch(e.target.value)}
                placeholder="Type Malawi District name e.g. Dedza, Mzimba, Mulanje, Zomba, Salima..." 
                className="bg-white dark:bg-stone-900 border border-stone-300 dark:border-emerald-800/70 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 dark:focus:ring-amber-400 w-full placeholder:text-stone-400 text-stone-900 dark:text-stone-100 font-medium font-sans shadow-xs"
              />
            </div>
          </div>

          {/* Display Analyzed District Card */}
          {analyzedDistrict && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0B2517] border border-emerald-800 p-6 sm:p-8 rounded-3xl flex flex-col gap-5 shadow-xl text-white"
            >
              <div className="flex justify-between items-start border-b border-emerald-800 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="serif text-2xl sm:text-3xl font-bold text-white">{analyzedDistrict.name}</h3>
                    <span className="bg-emerald-800/80 text-emerald-200 border border-emerald-600/60 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                      {analyzedDistrict.region} Region
                    </span>
                    {analyzedDistrict.verificationStatus === 'partial' ? (
                      <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-200 border border-amber-400/40 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                        <AlertCircle size={11} className="text-amber-300" />
                        Regional Interpolation ({analyzedDistrict.unverifiedFields?.join(', ') || 'Field Check Required'})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-200 border border-emerald-400/40 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                        <ShieldCheck size={11} className="text-emerald-300" />
                        WMO / FAO Verified Baseline
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-amber-300 font-bold mt-1">
                    Market Access: {analyzedDistrict.nearestMarketTown} ({analyzedDistrict.m1DistanceKm})
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300 font-sans">Outpost Score</span>
                  <span className="text-3xl font-bold text-amber-300 font-sans">{analyzedDistrict.suitabilityScore}<span className="text-sm font-normal text-white/60">/10</span></span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-[#06180E] p-4 rounded-2xl border border-emerald-900 text-xs">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase font-bold text-emerald-300/80 font-sans">Altitude & Rain</span>
                  <span className="font-bold text-white">{analyzedDistrict.altitude}</span>
                  <span className="text-[11px] text-emerald-200">{analyzedDistrict.rainfall}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase font-bold text-emerald-300/80 font-sans">FAO HWSD v2.0 Soil & pH</span>
                  <span className="font-bold text-white">{analyzedDistrict.soil}</span>
                  <span className="text-[11px] text-emerald-200">{analyzedDistrict.soilPh}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase font-bold text-emerald-300/80 font-sans">Well & Borehole Water Depth</span>
                  <span className="font-bold text-white">{analyzedDistrict.groundwaterDepthM}</span>
                  <span className="text-[11px] text-emerald-200">
                    {analyzedDistrict.verificationStatus === 'partial' ? 'Watershed Interpolated (Test On-Site)' : 'FAO AQUASTAT Baseline'}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase font-bold text-amber-300 font-sans">Indicative Survey & Allocation Est.</span>
                  <span className="font-bold text-amber-300">{analyzedDistrict.landCostBallpark}</span>
                  <span className="text-[10px] text-stone-300">Unverified field est. • Customary Land Act (2016)</span>
                </div>
              </div>

              {analyzedDistrict.verificationStatus === 'partial' && (
                <div className="bg-amber-950/50 border border-amber-500/40 rounded-2xl p-3 text-xs text-amber-100 flex items-start gap-2">
                  <AlertCircle size={15} className="text-amber-300 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="font-bold text-amber-200">Verification Disclosure:</strong>{' '}
                    {analyzedDistrict.verificationNote ||
                      `This district relies on regional watershed interpolation for ${analyzedDistrict.unverifiedFields?.join(' and ') || 'hydrogeology'}. Commission a vertical electrical sounding (VES) borehole survey and 0–30cm soil pH test prior to land commitment.`}
                  </p>
                </div>
              )}

              <div className="bg-emerald-950/80 p-3.5 rounded-2xl border border-emerald-800 text-xs flex flex-col gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1 font-sans">
                  <MapPin size={11} className="text-amber-300" /> Underground Water & Well Profile:
                </span>
                <p className="text-emerald-100 leading-relaxed font-normal">
                  {analyzedDistrict.hydrogeologyNote}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-300/80 block mb-1.5 font-sans">Recommended Crops</span>
                <div className="flex flex-wrap gap-1.5">
                  {analyzedDistrict.bestCrops.map(crop => (
                    <span key={crop} className="bg-emerald-800/80 border border-emerald-600/60 text-emerald-100 px-3 py-1 rounded-xl text-xs font-semibold">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-emerald-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <p className="text-xs text-emerald-100 leading-relaxed italic max-w-xl">
                  "{analyzedDistrict.outpostStrategy}"
                </p>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopyDossier}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-[10px] font-sans font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 border cursor-pointer active:scale-95",
                      hasCopiedDossier
                        ? "bg-emerald-700 border-emerald-500 text-white"
                        : "bg-white/10 hover:bg-white/20 text-amber-200 border-white/20"
                    )}
                  >
                    {hasCopiedDossier ? <CheckCircle2 size={12} className="text-white" /> : <Copy size={12} className="text-amber-300" />}
                    {hasCopiedDossier ? 'Report Copied!' : 'Copy Summary'}
                  </button>

                  <Link
                    to={`/scout?district=${encodeURIComponent(analyzedDistrict.id || analyzedDistrict.name.replace(' District', '').toLowerCase())}`}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3 py-1.5 rounded-xl text-[10px] font-sans font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <Compass size={12} /> Scout on GIS Map
                  </Link>

                  <Link
                    to={`/calculators?tab=solar&district=${analyzedDistrict.name.replace(' District', '').toLowerCase()}`}
                    className="bg-amber-500/25 hover:bg-amber-500/35 text-amber-200 border border-amber-400/40 px-3 py-1.5 rounded-xl text-[10px] font-sans font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
                  >
                    <Calculator size={12} /> Size Solar Pump
                  </Link>

                  <span className="text-[10px] font-sans text-emerald-300 bg-black/40 px-2 py-1 rounded-md border border-emerald-800 shrink-0">
                    Ref: {analyzedDistrict.dccmsSourceRef}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Customary Land Act Statutory Overview & Legal Advisory */}
          <div className="bg-stone-50 dark:bg-stone-900/70 p-6 rounded-3xl border border-stone-200 dark:border-emerald-900/50 flex flex-col gap-4 text-stone-900 dark:text-stone-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 dark:border-emerald-900/50 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="text-emerald-800 dark:text-amber-300" size={20} />
                <h3 className="serif text-lg sm:text-xl font-bold text-stone-900 dark:text-white">Malawi Customary Land Act — Statutory Procedure Overview</h3>
              </div>
              <span className="bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg font-sans self-start sm:self-auto">
                Indicative Reference & Legal Advisory
              </span>
            </div>

            {/* Statutory Procedural Flowchart Vector Schematic */}
            <div className="bg-[#07160E] rounded-2xl p-4 border border-emerald-900/80 overflow-hidden">
              <svg viewBox="0 0 780 120" className="w-full h-auto select-none" role="img" aria-label="Malawi customary land statutory procedure flowchart">
                <rect x="0" y="0" width="780" height="120" rx="8" fill="#040E09" />
                
                {/* Step 1 Node */}
                <g transform="translate(15, 15)">
                  <rect width="220" height="90" rx="8" fill="#0F291E" stroke="#10B981" strokeWidth="1.5" />
                  <rect x="12" y="12" width="28" height="24" rx="4" fill="#047857" />
                  <text x="26" y="28" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">01</text>
                  <text x="50" y="24" fill="#34D399" fontSize="10" fontWeight="bold" fontFamily="monospace">TA &amp; CHIEF (MFUMU)</text>
                  <text x="50" y="38" fill="#A7F3D0" fontSize="9" fontFamily="monospace">Customary Chikhalidwe</text>
                  <line x1="12" y1="46" x2="208" y2="46" stroke="#064E3B" strokeWidth="1" />
                  <text x="14" y="62" fill="#FEF3C7" fontSize="9" fontFamily="sans-serif">• Confirm boundary markers (Malire)</text>
                  <text x="14" y="78" fill="#D6D3D1" fontSize="9" fontFamily="sans-serif">• Village assembly consensus protocol</text>
                </g>

                {/* Arrow 1 -> 2 */}
                <g transform="translate(245, 52)">
                  <line x1="0" y1="8" x2="26" y2="8" stroke="#34D399" strokeWidth="2.5" strokeDasharray="4 2" />
                  <polygon points="26,3 35,8 26,13" fill="#34D399" />
                </g>

                {/* Step 2 Node */}
                <g transform="translate(285, 15)">
                  <rect width="220" height="90" rx="8" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
                  <rect x="12" y="12" width="28" height="24" rx="4" fill="#0284C7" />
                  <text x="26" y="28" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">02</text>
                  <text x="50" y="24" fill="#7DD3FC" fontSize="10" fontWeight="bold" fontFamily="monospace">LAND CLERK &amp; CLC</text>
                  <text x="50" y="38" fill="#BAE6FD" fontSize="9" fontFamily="monospace">Customary Land Committee</text>
                  <line x1="12" y1="46" x2="208" y2="46" stroke="#0C4A6E" strokeWidth="1" />
                  <text x="14" y="62" fill="#FEF3C7" fontSize="9" fontFamily="sans-serif">• GPS parcel boundary demarcation</text>
                  <text x="14" y="78" fill="#D6D3D1" fontSize="9" fontFamily="sans-serif">• 21-day public objections gazette</text>
                </g>

                {/* Arrow 2 -> 3 */}
                <g transform="translate(515, 52)">
                  <line x1="0" y1="8" x2="26" y2="8" stroke="#FBBF24" strokeWidth="2.5" strokeDasharray="4 2" />
                  <polygon points="26,3 35,8 26,13" fill="#FBBF24" />
                </g>

                {/* Step 3 Node */}
                <g transform="translate(555, 15)">
                  <rect width="210" height="90" rx="8" fill="#3E1A0C" stroke="#F59E0B" strokeWidth="1.5" />
                  <rect x="12" y="12" width="28" height="24" rx="4" fill="#B45309" />
                  <text x="26" y="28" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">03</text>
                  <text x="50" y="24" fill="#FDE047" fontSize="10" fontWeight="bold" fontFamily="monospace">DISTRICT REGISTRY</text>
                  <text x="50" y="38" fill="#FEF08A" fontSize="9" fontFamily="monospace">Customary Estate Title</text>
                  <line x1="12" y1="46" x2="198" y2="46" stroke="#78350F" strokeWidth="1" />
                  <text x="14" y="62" fill="#FEF3C7" fontSize="9" fontFamily="sans-serif">• Formal Ministry Certificate seal</text>
                  <text x="14" y="78" fill="#D6D3D1" fontSize="9" fontFamily="sans-serif">• Perpetual family inheritance rights</text>
                </g>
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white dark:bg-[#0B1911] p-4 rounded-2xl border border-stone-200 dark:border-emerald-900/50 flex flex-col gap-1.5 text-sm">
                <span className="text-emerald-900 dark:text-amber-300 font-bold text-xs uppercase font-sans">Step 1: Village Chief (Mfumu) & T/A Consultation</span>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">Present customary introduction (Chikhalidwe) to the Village Headman and Traditional Authority (TA) to confirm boundary consensus (Malire) and verify absence of family inheritance disputes.</p>
              </div>
              <div className="bg-white dark:bg-[#0B1911] p-4 rounded-2xl border border-stone-200 dark:border-emerald-900/50 flex flex-col gap-1.5 text-sm">
                <span className="text-emerald-900 dark:text-amber-300 font-bold text-xs uppercase font-sans">Step 2: Customary Land Committee & Mapping</span>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">Submit land transfer records to the local Customary Land Committee (CLC) and Land Clerk for preliminary boundary inspection and parcel demarcation.</p>
              </div>
              <div className="bg-white dark:bg-[#0B1911] p-4 rounded-2xl border border-stone-200 dark:border-emerald-900/50 flex flex-col gap-1.5 text-sm">
                <span className="text-emerald-900 dark:text-amber-300 font-bold text-xs uppercase font-sans">Step 3: Customary Estate Certificate</span>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">Apply for a Certificate of Customary Estate under the Customary Land Act framework. Formal registration requires District Land Registry recording and survey verification.</p>
              </div>
            </div>

            <div className="bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-700/50 rounded-2xl p-3.5 text-xs sm:text-sm text-amber-950 dark:text-amber-100 flex items-start gap-2">
              <span className="font-bold text-amber-800 dark:text-amber-300 shrink-0">⚠️ Legal Note:</span>
              <p className="leading-relaxed">
                Land tenure rules in Malawi are subject to the Customary Land Act (2016) and recent Land Amendment Acts. Customary estate grants require official gazetted Land Clerks, local CLC quorum, and formal District Registry recording. Prospective homesteaders must verify all title claims, boundaries, and zoning restrictions directly with the District Commissioner's Lands Desk, the Ministry of Lands, and a certified Malawian legal practitioner before executing agreements or paying acquisition fees.
              </p>
            </div>

            {/* Comprehensive 4-Stage Legal Acquisition & Application Letter Wizard */}
            <CustomaryLandTenureWizard className="mt-2" />
          </div>
        </div>
      </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: ELLEN WHITE PROPERTY SUITABILITY CALCULATOR        */}
      {/* ------------------------------------------------------------- */}
      {activePerspective === 'evaluator' && (
      <section>
        <PropertySuitabilityCalculator />
      </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4: REGIONAL WEATHER & MICROCLIMATE FORECAST           */}
      {/* ------------------------------------------------------------- */}
      {activePerspective === 'districts' && (
      <section>
        <RegionalWeatherWidget />
      </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SECTION 5: INTERACTIVE LAND EVALUATION CHECKLIST & ADVICE     */}
      {/* ------------------------------------------------------------- */}
      {activePerspective === 'evaluator' && (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <section className="bg-white/95 dark:bg-[#0D1D13] p-6 sm:p-8 md:p-10 rounded-3xl border border-stone-200 dark:border-emerald-900/60 shadow-xs flex flex-col gap-6 text-stone-900 dark:text-stone-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 dark:border-emerald-900/50 pb-4">
              <div>
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-emerald-900 dark:text-amber-300">Sanctuary Reconnaissance</span>
                <h3 className="serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">Land Evaluation Checklist</h3>
              </div>
              <span className="text-xs font-sans font-bold uppercase text-emerald-900 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full self-start sm:self-auto">
                {state.completedIds.length} / {LAND_CHECKLIST_DATA.length} Verified
              </span>
            </div>

            <div className="flex flex-col gap-6">
              {LAND_CHECKLIST_DATA.map((item) => (
                <div key={item.id} className="group flex flex-col gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200 dark:border-emerald-900/50 hover:border-emerald-600/40 transition-all">
                  <div className="flex gap-4 items-start">
                    <button 
                      onClick={() => toggleComplete(item.id)}
                      className={cn(
                        "shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-xs active:scale-90 border cursor-pointer",
                        state.completedIds.includes(item.id) 
                          ? "bg-emerald-800 border-emerald-900 text-white" 
                          : "bg-white dark:bg-stone-900 border-stone-300 dark:border-emerald-800 text-stone-400 hover:text-emerald-800 dark:hover:text-amber-300"
                      )}
                    >
                      {state.completedIds.includes(item.id) ? <CheckCircle2 size={22} className="stroke-[2.5]" /> : <Circle size={22} />}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h4 className={cn("font-bold text-stone-900 dark:text-white text-base sm:text-lg transition-all", state.completedIds.includes(item.id) && "opacity-50 line-through")}>
                          {item.label}
                        </h4>
                        <span className="text-xs font-sans font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 px-2 py-0.5 rounded-md">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-sm text-stone-700 dark:text-stone-300 mt-1 leading-relaxed font-medium">{item.description}</p>
                    </div>
                  </div>

                  {/* Notes Area */}
                  <div className="ml-[60px]">
                    <div className="relative group/note">
                      <textarea
                        value={state.notes[item.id] || ''}
                        onChange={(e) => updateNote(item.id, e.target.value)}
                        placeholder="Add field notes, GPS coordinates, chief contact, or survey observations..."
                        className="w-full bg-white dark:bg-stone-950 border border-stone-300 dark:border-emerald-900/60 rounded-xl p-3 text-sm font-sans text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-800 placeholder:text-stone-400 min-h-[70px] resize-none transition-all shadow-xs"
                      />
                      <div className="absolute top-3 right-3 text-stone-400 pointer-events-none transition-opacity group-hover/note:opacity-100 opacity-0 md:opacity-100">
                        <PencilLine size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="bg-[#0B2517] p-6 sm:p-8 rounded-3xl border border-emerald-800 shadow-md text-white">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-amber-300">Verbatim Counsel · Ev 77.1</span>
              <a
                href="https://m.egwwritings.org/en/book/30.391"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-emerald-300 hover:text-amber-300 underline"
              >
                Verify on EGW Estate ↗
              </a>
            </div>
            <h4 className="serif text-xl font-bold mb-3 italic text-white">The Outpost Principle</h4>
            <blockquote className="text-sm text-emerald-100/95 leading-relaxed font-serif italic mb-3">
              “As God's commandment-keeping people, we must leave the cities. As did Enoch, we must work in the cities but not dwell in them... For the present the headquarters of the work in these cities should be in some retired locality just out of the cities, where we can have room for a school and a small sanitarium.”
            </blockquote>
            <div className="text-xs font-bold text-amber-300">
              — Ellen G. White, Evangelism, pp. 77–78 (1902)
            </div>
          </div>
          
          <div className="bg-white/95 dark:bg-[#0D1D13] p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-emerald-900/60 shadow-xs flex flex-col gap-4 text-stone-900 dark:text-stone-100">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-emerald-900 dark:text-amber-300">Field Guides</span>
            <h4 className="serif text-xl font-bold text-stone-900 dark:text-white">Interactive Scouting Tips</h4>
            <p className="text-sm text-stone-700 dark:text-stone-300 font-medium">Click any tip for practical advice on scouting land in Malawi:</p>
            <ul className="text-sm text-stone-700 dark:text-stone-200 flex flex-col gap-2.5 font-semibold">
              {[
                { id: 'drainage', title: 'Check Rain Drainage', desc: 'Ensure land is elevated enough to avoid flash flooding during peak rains (December - February).' },
                { id: 'water', title: 'Verify Water Table', desc: 'Locate year-round dambos, perennial streams, or consult local drillers for borehole depth.' },
                { id: 'zoning', title: 'Audit Land Title & Chief Rights', desc: 'Confirm customary land boundaries with Traditional Authorities (TA) and obtain written consent.' }
              ].map(tip => (
                <button
                  key={tip.id}
                  onClick={() => setActiveTipModal(tip.id)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/80 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors border border-stone-200 dark:border-emerald-900/50 text-left text-sm text-stone-800 dark:text-stone-100 group cursor-pointer"
                >
                  <span className="font-sans font-semibold">• {tip.title}</span>
                  <ChevronRight size={15} className="text-emerald-800 dark:text-amber-400 transition-transform group-hover:translate-x-1" />
                </button>
              ))}
            </ul>
          </div>
        </aside>
      </div>
      )}

      {/* Interactive Customary Land Act (2016) 5-Step Acquisition Tracker */}
      {activePerspective === 'customary-law' && (
        <>
          <CustomaryLandChecklist />
          <ChichewaFieldPhrasebook />
        </>
      )}

      {/* Scouting Tip Modal */}
      <AnimatePresence>
        {activeTipModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0B2517] text-white rounded-3xl p-8 md:p-10 max-w-lg w-full shadow-2xl border border-emerald-800 flex flex-col gap-6 relative"
            >
              <button 
                onClick={() => setActiveTipModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 text-amber-300">
                <Compass size={28} />
                <h3 className="serif text-2xl font-bold text-white">
                  {activeTipModal === 'drainage' && 'Rain Drainage & Soil Runoff'}
                  {activeTipModal === 'water' && 'Water Table & Well Depth'}
                  {activeTipModal === 'zoning' && 'Land Title & Chief Approvals'}
                </h3>
              </div>

              <p className="text-emerald-100 text-sm leading-relaxed font-normal">
                {activeTipModal === 'drainage' && 'During the Malawian rainy season (Nov - Mar), low-lying areas in valleys can submerge. Choose land with gentle slopes, construct contour marker ridges (mitumbira ya mizere / mikwingwirima), and plant vetiver grass (chisale) to prevent soil erosion.'}
                {activeTipModal === 'water' && 'Water is the lifeline of an outpost. Verify perennial streams or dambos that maintain water through October. If sinking a borehole, target areas with water tables under 30 meters for efficient solar pumping.'}
                {activeTipModal === 'zoning' && 'When acquiring customary land in rural Malawi, meet with the Village Headman and Traditional Authority (TA). Ensure clear boundaries are agreed upon with neighbors and documented with official land committee receipts.'}
              </p>

              <button 
                onClick={() => setActiveTipModal(null)}
                className="bg-emerald-800 hover:bg-emerald-700 text-white border border-emerald-600/50 py-3.5 rounded-2xl font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                Understood & Acknowledged
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full Survey Modal */}
      <AnimatePresence>
        {showSurveyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="bg-[#0B2517] text-white rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl border border-emerald-800 flex flex-col gap-6 relative my-8"
            >
              <button 
                onClick={() => setShowSurveyModal(false)}
                className="absolute top-8 right-8 p-3 rounded-full bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-2">
                <span className="text-amber-300 font-sans font-bold uppercase text-[11px] tracking-wider">Sanctuary Scout Report</span>
                <h3 className="serif text-3xl font-bold text-white">Malawi Land Scouting Survey</h3>
              </div>

              <div className="flex flex-col gap-4 text-sm text-stone-100 leading-relaxed font-normal">
                <div className="p-4 bg-[#06180E] rounded-2xl border border-emerald-900">
                  <h4 className="font-bold text-amber-300 mb-1">Recommended Prime Outpost Regions</h4>
                  <p className="text-xs leading-relaxed text-stone-200">
                    <strong className="text-white">Northern Region:</strong> Viphya Plateau & Misuku Hills (High rainfall, timber, cool climate).<br />
                    <strong className="text-white">Central Region:</strong> Dedza Highlands & Ntcheu (Fertile volcanic soil, ideal for cold crops).<br />
                    <strong className="text-white">Southern Region:</strong> Mulanje Slopes & Zomba Plateau (Abundant perennial mountain water).
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#06180E] rounded-2xl border border-emerald-900">
                    <h5 className="font-bold text-amber-300 text-xs font-sans uppercase mb-2">Step 1: Water Security</h5>
                    <p className="text-xs text-stone-200">Inspect dambo moisture retention, shallow well water table depth, and perennial stream gravity potential.</p>
                  </div>
                  <div className="p-4 bg-[#06180E] rounded-2xl border border-emerald-900">
                    <h5 className="font-bold text-amber-300 text-xs font-sans uppercase mb-2">Step 2: Customary Title</h5>
                    <p className="text-xs text-stone-200">Request formal beacon boundary surveying through Group Village Headman & District Land Registry under 2016 Act.</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setShowSurveyModal(false)}
                className="bg-emerald-800 hover:bg-emerald-700 text-white border border-emerald-600/50 py-3.5 rounded-2xl font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                Close Guide
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
