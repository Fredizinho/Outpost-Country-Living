import { MapPin, Search, CheckCircle2, Circle, PencilLine, Navigation, Map as MapIcon, X, Compass, Check, AlertCircle, FileText, ChevronRight, ChevronDown, ChevronUp, CloudSun, Sprout, Sparkles, Wrench, ArrowUpRight, Copy, Calculator, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { LAND_CHECKLIST_DATA, MALAWI_OUTPOST_ZONES, MALAWI_DISTRICTS_DATA, MalawiDistrictInfo, DATA_SOURCES_AND_CITATIONS } from '@/data/content';
import { getDistrictRecord, DISTRICT_LIST, PLANTING_PIT_SPECS } from '@/constants';
import { cn } from '@/lib/utils';
import { getStoredLandChecklist, saveStoredLandChecklist } from '@/lib/offlineStorage';
import { Link } from 'react-router-dom';
import { RegionalWeatherWidget } from '@/components/weather/RegionalWeatherWidget';
import { COUNTRY_IMAGES } from '@/assets/images';
import { LandReadinessCards } from '@/components/outpost/LandReadinessCards';
import { PropertySuitabilityCalculator } from '@/components/outpost/PropertySuitabilityCalculator';
import { CustomaryLandChecklist } from '@/components/outpost/CustomaryLandChecklist';
import { ChichewaFieldPhrasebook } from '@/components/outpost/ChichewaFieldPhrasebook';

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
  const [analyzedDistrict, setAnalyzedDistrict] = useState<MalawiDistrictInfo | null>(MALAWI_DISTRICTS_DATA['mzimba']);
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [activeTipModal, setActiveTipModal] = useState<string | null>(null);
  const [hasCopiedDossier, setHasCopiedDossier] = useState(false);
  const [activePerspective, setActivePerspective] = useState<'districts' | 'customary-law' | 'evaluator' | 'sources-all'>('districts');

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
      return;
    }

    // 2. Fallback to full 28-district Central Registry so every Malawi district resolves
    const regRecord = getDistrictRecord(q === 'mzuzu' ? 'mzimba' : q);
    if (regRecord) {
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
    <div className="px-4 sm:px-6 md:px-12 py-8 md:py-10 max-w-6xl mx-auto flex flex-col gap-10">
      <header 
        className="bg-cover bg-center text-white rounded-[2.5rem] p-6 sm:p-8 md:p-12 border border-amber-500/30 shadow-2xl relative overflow-hidden flex flex-col gap-6"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(4, 29, 16, 0.88), rgba(7, 24, 14, 0.82), rgba(4, 29, 16, 0.94)), url(${COUNTRY_IMAGES.mountainVista})`
        }}
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/15 via-emerald-500/10 to-transparent rounded-full -mr-36 -mt-36 pointer-events-none blur-3xl" />
        
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1 rounded-full font-mono font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
            <MapPin size={13} className="text-amber-400" />
            <span>Land Scouting & District Guide</span>
          </span>
          <span className="text-emerald-300/60 text-xs hidden sm:inline">•</span>
          <span className="text-emerald-200/80 font-mono text-xs hidden sm:inline">
            Malawi Land Laws • Groundwater & Farming Zones
          </span>
        </div>

        <div className="flex flex-col gap-2 relative z-10">
          <h1 className="serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FAF8F5] leading-tight">
            Malawi Land Scouting Matrix
          </h1>
          <p className="text-emerald-100/90 max-w-3xl text-xs sm:text-sm font-medium leading-relaxed">
            28-district soil/aquifer analyzer, Customary Land Act (2016) procedure, Chichewa Mfumu phrasebook, and 100-point plot evaluator.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10 pt-3 border-t border-amber-500/15">
          {/* Desktop 4-Tab Perspective Bar */}
          <div className="flex flex-wrap items-center gap-1.5 bg-black/35 p-1.5 rounded-2xl border border-white/10">
            {([
              { id: 'districts', label: '01 · 28-District & Zones' },
              { id: 'customary-law', label: '02 · Customary Land Law & Chichewa' },
              { id: 'evaluator', label: '03 · Plot Evaluator & Checklist' },
              { id: 'sources-all', label: '04 · Sources & All Open' },
            ] as const).map((tab) => {
              const active = activePerspective === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActivePerspective(tab.id)}
                  className={cn(
                    'px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer',
                    active
                      ? 'bg-amber-400 text-stone-950 shadow-sm'
                      : 'text-emerald-100/80 hover:text-white hover:bg-white/10'
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/scout"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-black text-xs uppercase px-3.5 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <Compass size={14} /> Interactive GIS Map <ChevronRight size={13} />
            </Link>
            <button
              onClick={() => setShowSurveyModal(true)}
              className="bg-white/5 hover:bg-white/10 text-amber-200 border border-amber-500/25 font-mono text-xs font-bold uppercase px-3.5 py-2 rounded-xl transition-all cursor-pointer"
            >
              Land Guide
            </button>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: ESSENTIAL FUNCTION - DISTRICT & ZONE ANALYZER      */}
      {/* ------------------------------------------------------------- */}
      {(activePerspective === 'districts' || activePerspective === 'sources-all') && (
      <section className="bg-white/95 text-stone-900 p-6 sm:p-8 md:p-10 rounded-3xl flex flex-col gap-6 relative shadow-xs border border-stone-200">
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <span className="text-emerald-900 text-[11px] font-sans font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Search size={12} className="text-emerald-700" />
                01 • DISTRICT FINDER
              </span>
              <h2 className="serif text-2xl sm:text-3xl font-bold mt-1 text-stone-900">Farming Zone & District Checker</h2>
              <p className="text-stone-600 mt-1 text-xs sm:text-sm font-medium">Search any district in Malawi to check soil acidity, well water depth, rainfall, and farming conditions.</p>
            </div>
            <Link
              to={analyzedDistrict ? `/scout?district=${encodeURIComponent(analyzedDistrict.id || analyzedDistrict.name.replace(' District', '').toLowerCase())}` : '/scout'}
              className="self-start sm:self-auto bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-sans text-xs font-semibold uppercase px-4 py-2.5 rounded-xl transition-all flex items-center gap-2"
            >
              <Compass size={14} className="text-emerald-800" /> View {analyzedDistrict ? analyzedDistrict.name.replace(' District', '') : ''} on Map
            </Link>
          </div>

          {/* Quick District Buttons across all 28 Districts */}
          <div className="flex flex-wrap gap-1.5">
            {DISTRICT_LIST.map(dist => (
              <button
                key={dist.id}
                onClick={() => handleDistrictSearch(dist.name)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-[11px] font-sans font-semibold tracking-tight transition-all border cursor-pointer",
                  analyzedDistrict?.name.toLowerCase().includes(dist.name.toLowerCase())
                    ? "bg-emerald-900 border-emerald-950 text-white shadow-xs font-bold"
                    : "bg-stone-100 border-stone-300 text-stone-700 hover:bg-stone-200 hover:text-stone-900"
                )}
              >
                {dist.name}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <div className="relative w-full">
              <Search className="absolute left-4 top-4 text-emerald-800" size={18} />
              <input 
                type="text" 
                value={districtQuery}
                onChange={(e) => handleDistrictSearch(e.target.value)}
                placeholder="Type Malawi District name e.g. Dedza, Mzimba, Mulanje, Zomba, Salima..." 
                className="bg-white border border-stone-300 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 w-full placeholder:text-stone-400 text-stone-900 font-medium font-sans shadow-xs"
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
          <div className="bg-stone-50 p-6 rounded-3xl border border-stone-200 flex flex-col gap-4 text-stone-900">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="text-emerald-800" size={20} />
                <h3 className="serif text-lg sm:text-xl font-bold text-stone-900">Malawi Customary Land Act — Statutory Procedure Overview</h3>
              </div>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg font-sans self-start sm:self-auto">
                Indicative Reference & Legal Advisory
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white p-3.5 rounded-2xl border border-stone-200 flex flex-col gap-1 text-xs">
                <span className="text-emerald-900 font-bold text-[11px] uppercase font-sans">Step 1: Mfumu & T/A Consultation</span>
                <p className="text-stone-600 leading-snug">Present customary introduction (Chikhalidwe) to the Village Headman and Traditional Authority (TA) to confirm boundary consensus (Malire) and verify absence of family inheritance disputes.</p>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-stone-200 flex flex-col gap-1 text-xs">
                <span className="text-emerald-900 font-bold text-[11px] uppercase font-sans">Step 2: Customary Land Committee & Mapping</span>
                <p className="text-stone-600 leading-snug">Submit land transfer records to the local Customary Land Committee (CLC) and Land Clerk for preliminary boundary inspection and parcel demarcation.</p>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-stone-200 flex flex-col gap-1 text-xs">
                <span className="text-emerald-900 font-bold text-[11px] uppercase font-sans">Step 3: Customary Estate Certificate</span>
                <p className="text-stone-600 leading-snug">Apply for a Certificate of Customary Estate under the Customary Land Act framework. Note that formal registration is subject to District Land Registry recording, statutory land use conditions, and survey requirements.</p>
              </div>
            </div>

            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3 text-xs text-amber-950 flex items-start gap-2">
              <span className="font-bold text-amber-800 shrink-0">⚠️ Legal Note:</span>
              <p className="leading-relaxed">
                Land tenure rules in Malawi are subject to the Customary Land Act (2016) and recent Land Amendment Acts. Customary estate grants require official gazetted Land Clerks, local CLC quorum, and formal District Registry recording. Prospective homesteaders must verify all title claims, boundaries, and zoning restrictions directly with the District Commissioner's Lands Desk, the Ministry of Lands, and a certified Malawian legal practitioner before executing agreements or paying acquisition fees.
              </p>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: SIMPLIFIED DISTRICT READINESS CARDS                */}
      {/* ------------------------------------------------------------- */}
      {(activePerspective === 'districts' || activePerspective === 'customary-law' || activePerspective === 'sources-all') && (
      <section>
        <LandReadinessCards />
      </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: ELLEN WHITE PROPERTY SUITABILITY CALCULATOR        */}
      {/* ------------------------------------------------------------- */}
      {(activePerspective === 'evaluator' || activePerspective === 'sources-all') && (
      <section>
        <PropertySuitabilityCalculator />
      </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4: REGIONAL WEATHER & MICROCLIMATE FORECAST           */}
      {/* ------------------------------------------------------------- */}
      {(activePerspective === 'districts' || activePerspective === 'sources-all') && (
      <section>
        <RegionalWeatherWidget />
      </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SECTION 5: INTERACTIVE LAND EVALUATION CHECKLIST & ADVICE     */}
      {/* ------------------------------------------------------------- */}
      {(activePerspective === 'evaluator' || activePerspective === 'sources-all') && (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <section className="bg-white/95 p-6 sm:p-8 md:p-10 rounded-3xl border border-stone-200 shadow-xs flex flex-col gap-6 text-stone-900">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-4">
              <div>
                <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-emerald-900">Sanctuary Reconnaissance</span>
                <h3 className="serif text-2xl sm:text-3xl font-bold text-stone-900">Land Evaluation Checklist</h3>
              </div>
              <span className="text-[11px] font-sans font-bold uppercase text-emerald-900 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full self-start sm:self-auto">
                {state.completedIds.length} / {LAND_CHECKLIST_DATA.length} Verified
              </span>
            </div>

            <div className="flex flex-col gap-6">
              {LAND_CHECKLIST_DATA.map((item) => (
                <div key={item.id} className="group flex flex-col gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-600/40 transition-all">
                  <div className="flex gap-4 items-start">
                    <button 
                      onClick={() => toggleComplete(item.id)}
                      className={cn(
                        "shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-xs active:scale-90 border cursor-pointer",
                        state.completedIds.includes(item.id) 
                          ? "bg-emerald-800 border-emerald-900 text-white" 
                          : "bg-white border-stone-300 text-stone-400 hover:text-emerald-800"
                      )}
                    >
                      {state.completedIds.includes(item.id) ? <CheckCircle2 size={22} className="stroke-[2.5]" /> : <Circle size={22} />}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className={cn("font-bold text-stone-900 text-base sm:text-lg transition-all", state.completedIds.includes(item.id) && "opacity-50 line-through")}>
                          {item.label}
                        </h4>
                        <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-md">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed font-medium">{item.description}</p>
                    </div>
                  </div>

                  {/* Notes Area */}
                  <div className="ml-[60px]">
                    <div className="relative group/note">
                      <textarea
                        value={state.notes[item.id] || ''}
                        onChange={(e) => updateNote(item.id, e.target.value)}
                        placeholder="Add field notes, GPS coordinates, chief contact, or survey observations..."
                        className="w-full bg-white border border-stone-300 rounded-xl p-3 text-xs font-sans text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-800 placeholder:text-stone-400 min-h-[70px] resize-none transition-all shadow-xs"
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
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-amber-300">Verbatim Counsel · Ev 77.1</span>
              <a
                href="https://m.egwwritings.org/en/book/30.391"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono text-emerald-300 hover:text-amber-300 underline"
              >
                Verify on EGW Estate ↗
              </a>
            </div>
            <h4 className="serif text-xl font-bold mb-3 italic text-white">The Outpost Principle</h4>
            <blockquote className="text-xs sm:text-sm text-emerald-100/95 leading-relaxed font-serif italic mb-3">
              “As God's commandment-keeping people, we must leave the cities. As did Enoch, we must work in the cities but not dwell in them... For the present the headquarters of the work in these cities should be in some retired locality just out of the cities, where we can have room for a school and a small sanitarium.”
            </blockquote>
            <div className="text-[11px] font-bold text-amber-300">
              — Ellen G. White, Evangelism, pp. 77–78 (1902)
            </div>
          </div>
          
          <div className="bg-white/95 p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs flex flex-col gap-4 text-stone-900">
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-emerald-900">Field Guides</span>
            <h4 className="serif text-xl font-bold text-stone-900">Interactive Scouting Tips</h4>
            <p className="text-xs text-stone-600 font-medium">Click any tip for practical advice on scouting land in Malawi:</p>
            <ul className="text-xs text-stone-700 flex flex-col gap-2.5 font-bold uppercase tracking-wide">
              {[
                { id: 'drainage', title: 'Check Rain Drainage', desc: 'Ensure land is elevated enough to avoid flash flooding during peak rains (December - February).' },
                { id: 'water', title: 'Verify Water Table', desc: 'Locate year-round dambos, perennial streams, or consult local drillers for borehole depth.' },
                { id: 'zoning', title: 'Audit Land Title & Chief Rights', desc: 'Confirm customary land boundaries with Traditional Authorities (TA) and obtain written consent.' }
              ].map(tip => (
                <button
                  key={tip.id}
                  onClick={() => setActiveTipModal(tip.id)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors border border-stone-200 text-left text-xs text-stone-800 group cursor-pointer"
                >
                  <span className="font-sans text-[12px] font-semibold">• {tip.title}</span>
                  <ChevronRight size={15} className="text-emerald-800 transition-transform group-hover:translate-x-1" />
                </button>
              ))}
            </ul>
          </div>
        </aside>
      </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4: REGIONAL MATRIX & CARTOGRAPHY EXPLORER             */}
      {/* ------------------------------------------------------------- */}
      {(activePerspective === 'districts' || activePerspective === 'sources-all') && (
      <section className="bg-white/95 text-stone-900 rounded-3xl p-6 sm:p-8 md:p-12 shadow-xs relative overflow-hidden border border-stone-200">
        <div className="flex flex-col lg:flex-row gap-12 relative z-10">
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-emerald-900">
                04 • REGIONAL CARTOGRAPHY & AGRO-ECOLOGY
              </span>
              <h3 className="serif text-3xl font-bold text-stone-900">Regional Scouting Matrix</h3>
              <p className="text-stone-600 font-medium leading-relaxed text-xs sm:text-sm">
                Malawi offers diverse microclimates across its Northern, Central, and Southern plateaus. Filter by region below to explore zone protocols and crop profiles.
              </p>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {['Northern', 'Central', 'Southern'].map(reg => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(selectedRegion === reg ? null : reg)}
                  className={cn(
                    "px-6 py-3 rounded-2xl text-[11px] font-sans font-bold uppercase tracking-wider transition-all border cursor-pointer",
                    selectedRegion === reg 
                      ? "bg-emerald-900 border-emerald-950 text-white shadow-xs scale-102" 
                      : "bg-stone-100 border-stone-300 text-stone-700 hover:bg-stone-200 hover:text-stone-900"
                  )}
                >
                  {reg} Region
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 mt-2 items-start">
              <AnimatePresence mode="popLayout">
                {currentZones.map(zone => {
                  const isExpanded = expandedZoneId === zone.id;

                  return (
                    <motion.div
                      key={zone.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className={cn(
                        "rounded-2xl border transition-all duration-300 ease-in-out overflow-hidden cursor-pointer",
                        isExpanded 
                          ? "border-emerald-800 bg-white ring-2 ring-emerald-800/20 shadow-md" 
                          : "bg-stone-50 border-stone-200 hover:border-emerald-600/40 hover:bg-stone-100/70"
                      )}
                      onClick={() => setExpandedZoneId(isExpanded ? null : zone.id)}
                    >
                      <div className="p-6 flex flex-col gap-3">
                        {/* Clean Header Row */}
                        <div className="flex justify-between items-start gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-sans text-[10px] font-bold uppercase text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                {zone.region} Region
                              </span>
                            </div>
                            <h4 className="serif text-stone-900 text-lg sm:text-xl font-bold">{zone.name}</h4>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {/* Right-aligned micro badge */}
                            <span className="font-sans text-[10px] font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                              {zone.climate}
                            </span>
                            <div className={cn(
                              "p-1.5 rounded-xl border transition-all duration-300 ease-in-out",
                              isExpanded 
                                ? "bg-emerald-800 text-white border-emerald-900" 
                                : "bg-white text-stone-600 border-stone-200"
                            )}>
                              <ChevronDown 
                                size={16} 
                                className={cn(
                                  "transition-transform duration-300 ease-in-out",
                                  isExpanded && "rotate-180"
                                )} 
                              />
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-xs text-stone-600 font-medium leading-relaxed">
                          {zone.suitability}
                        </p>

                        {/* Crops summary badges */}
                        <div className="flex flex-wrap gap-1.5 mt-0.5">
                          {zone.crops.map(crop => (
                            <span key={crop} className="bg-emerald-50 px-2.5 py-0.5 rounded-lg text-[10px] font-sans font-semibold uppercase tracking-wider border border-emerald-200 text-emerald-900">
                              {crop}
                            </span>
                          ))}
                        </div>

                        {/* In-Place Expanded Detail */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="border-t border-stone-200 pt-4 mt-2 flex flex-col gap-4 overflow-hidden"
                            >
                              {/* 2-Column Concise Layout */}
                              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                
                                {/* Left Column: Bulleted Core Steps & Protocols */}
                                <div className="md:col-span-7 flex flex-col gap-2.5">
                                  <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
                                    <span className="serif text-stone-900 text-xs font-semibold flex items-center gap-1.5">
                                      <Sparkles size={13} className="text-emerald-800" />
                                      Key Field Steps
                                    </span>
                                    <span className="font-sans text-[10px] font-semibold text-emerald-900 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                                      Land Guide
                                    </span>
                                  </div>

                                  <ul className="flex flex-col gap-2 text-xs">
                                    <li className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                                      <span className="w-4 h-4 rounded bg-emerald-100 text-emerald-900 font-sans text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                        1
                                      </span>
                                      <div>
                                        <strong className="text-stone-900 font-semibold">Outpost Scouting Strategy:</strong>
                                        <span className="text-stone-600 ml-1 leading-relaxed">Establish gravity-fed water intake and cold-hardy orchards in high elevations.</span>
                                      </div>
                                    </li>

                                    <li className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                                      <span className="w-4 h-4 rounded bg-emerald-100 text-emerald-900 font-sans text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                        2
                                      </span>
                                      <div>
                                        <strong className="text-stone-900 font-semibold">Microclimate Shielding:</strong>
                                        <span className="text-stone-600 ml-1 leading-relaxed">Elevation provides natural vector buffering against lowland heat stress and malaria zones.</span>
                                      </div>
                                    </li>
                                  </ul>
                                </div>

                                {/* Right Column: Required Equipment & Metrics in font-mono */}
                                <div className="md:col-span-5 flex flex-col gap-2.5">
                                  <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
                                    <span className="serif text-stone-900 text-xs font-semibold flex items-center gap-1.5">
                                      <Wrench size={13} className="text-emerald-800" />
                                      Key Details
                                    </span>
                                    <span className="font-sans text-[10px] font-semibold text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200">
                                      Field Details
                                    </span>
                                  </div>

                                  <div className="flex flex-col gap-2 text-xs">
                                    <div className="bg-stone-50 p-2 rounded-xl border border-stone-200">
                                      <span className="text-[10px] uppercase text-stone-500 block font-bold font-sans">Target Zone</span>
                                      <span className="text-emerald-900 font-bold text-[11px]">{zone.region} Plateau</span>
                                    </div>
                                    <div className="bg-stone-50 p-2 rounded-xl border border-stone-200">
                                      <span className="text-[10px] uppercase text-stone-500 block font-bold font-sans">Climate Classification</span>
                                      <span className="text-stone-800 font-bold text-[11px]">{zone.climate}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Single High-Contrast Action Button */}
                              <div className="pt-2 border-t border-stone-200">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDistrictSearch(zone.name.split(' ')[0]);
                                  }}
                                  className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-sans font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                                >
                                  <span>Launch District Reconnaissance</span>
                                  <ArrowUpRight size={13} className="text-white" />
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Stylized Vector Malawi Map Preview */}
          <div className="lg:w-80 shrink-0 flex flex-col items-center gap-6 bg-stone-50 rounded-3xl p-8 border border-stone-200">
            <div className="flex flex-col items-center text-center gap-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 font-sans">Malawi Cartography</span>
              <span className="text-xs font-semibold text-stone-600">Select Region to Scout</span>
            </div>

            <div className="relative w-48 h-80 flex items-center justify-center">
              <svg viewBox="0 0 200 400" className="w-full h-full drop-shadow-sm">
                {/* Northern Region */}
                <path 
                  d="M 90 20 C 110 30, 130 60, 120 100 C 110 130, 90 140, 80 140 C 70 120, 60 80, 70 40 Z" 
                  fill={selectedRegion === 'Northern' ? '#064e3b' : '#a7f3d0'}
                  stroke="#047857"
                  strokeWidth="1.5"
                  className="transition-all duration-300 cursor-pointer hover:fill-emerald-800"
                  onClick={() => setSelectedRegion('Northern')}
                />
                
                {/* Central Region */}
                <path 
                  d="M 80 140 C 90 140, 110 160, 120 200 C 110 240, 80 260, 70 250 C 60 220, 60 170, 80 140 Z" 
                  fill={selectedRegion === 'Central' ? '#064e3b' : '#d1fae5'}
                  stroke="#047857"
                  strokeWidth="1.5"
                  className="transition-all duration-300 cursor-pointer hover:fill-emerald-800"
                  onClick={() => setSelectedRegion('Central')}
                />

                {/* Southern Region */}
                <path 
                  d="M 70 250 C 80 260, 110 270, 130 310 C 120 350, 90 380, 80 370 C 60 330, 50 280, 70 250 Z" 
                  fill={selectedRegion === 'Southern' ? '#064e3b' : '#a7f3d0'}
                  stroke="#047857"
                  strokeWidth="1.5"
                  className="transition-all duration-300 cursor-pointer hover:fill-emerald-800"
                  onClick={() => setSelectedRegion('Southern')}
                />

                {/* Lake Malawi Outline */}
                <path 
                  d="M 120 40 C 130 80, 140 150, 125 250 C 120 230, 115 120, 110 60 Z" 
                  fill="#38bdf8"
                  opacity="0.7"
                />

                {/* Dynamic Region Markers with Icons */}
                {selectedRegion === 'Northern' && (
                  <g>
                    <circle cx="95" cy="70" r="5" fill="#f59e0b" />
                    <text x="108" y="74" fill="#064e3b" fontSize="10" fontWeight="bold" className="font-sans">VIPHYA</text>
                  </g>
                )}
                {selectedRegion === 'Central' && (
                  <g>
                    <circle cx="90" cy="190" r="5" fill="#f59e0b" />
                    <text x="103" y="194" fill="#064e3b" fontSize="10" fontWeight="bold" className="font-sans">DEDZA</text>
                  </g>
                )}
                {selectedRegion === 'Southern' && (
                  <g>
                    <circle cx="95" cy="300" r="5" fill="#f59e0b" />
                    <text x="108" y="304" fill="#064e3b" fontSize="10" fontWeight="bold" className="font-sans">MULANJE</text>
                  </g>
                )}
              </svg>
            </div>

            <div className="text-[11px] text-center text-stone-500 font-medium">
              Click region on map or select button above to zoom into territory.
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <MapIcon size={400} strokeWidth={0.5} />
        </div>
      </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SECTION 6: VERIFIED INSTITUTIONAL DATA SOURCES & CITATIONS     */}
      {/* ------------------------------------------------------------- */}
      {(activePerspective === 'sources-all') && (
      <section className="bg-[#0B2517] text-white rounded-3xl p-6 sm:p-8 md:p-10 border border-emerald-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-6 border-b border-emerald-800/80">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-300 block mb-1">
              Data Provenance & Scientific Verification
            </span>
            <h3 className="serif text-2xl sm:text-3xl font-bold text-white">
              Verified Institutional & Archival Data Sources
            </h3>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-mono">
            {DATA_SOURCES_AND_CITATIONS.length} Verified Authorities Connected
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DATA_SOURCES_AND_CITATIONS.map((src, idx) => (
            <div
              key={src.id || idx}
              className="bg-[#06180E] p-5 rounded-2xl border border-emerald-800/80 flex flex-col justify-between gap-4 hover:border-amber-400/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-900/70 text-emerald-200 border border-emerald-700/50 line-clamp-1">
                    {src.category}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-400/30 shrink-0">
                    ● Verified Authority
                  </span>
                </div>
                <h4 className="font-serif font-bold text-base text-white mb-1.5">{src.title}</h4>
                <p className="text-[11px] font-semibold text-amber-200/90 mb-1.5">{src.institution}</p>
                <p className="text-xs text-emerald-100/80 leading-relaxed mb-2">{src.description}</p>
                <p className="text-[11px] font-mono text-amber-200/80 bg-black/30 p-2 rounded-lg border border-white/5">
                  Ref: {src.verifiableURLOrDoc}
                </p>
              </div>

              <div className="pt-3 border-t border-emerald-900 flex items-center justify-between">
                {src.directUrl ? (
                  <a
                    href={src.directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 hover:text-white transition-colors"
                  >
                    <span>Inspect Official Source</span>
                    <ArrowUpRight size={13} />
                  </a>
                ) : (
                  <span className="text-[10px] font-mono text-emerald-400/80">Official Archival Record</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* Interactive Customary Land Act (2016) 5-Step Acquisition Tracker */}
      {(activePerspective === 'customary-law' || activePerspective === 'sources-all') && (
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
