import { MapPin, Search, CheckCircle2, Circle, PencilLine, Navigation, Map as MapIcon, X, Compass, Check, AlertCircle, FileText, ChevronRight, ChevronDown, ChevronUp, CloudSun, Sprout, Sparkles, Wrench, ArrowUpRight, Copy, Calculator, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { LAND_CHECKLIST_DATA, MALAWI_OUTPOST_ZONES, MALAWI_DISTRICTS_DATA, MalawiDistrictInfo } from '@/data/content';
import { cn } from '@/lib/utils';
import { getStoredLandChecklist, saveStoredLandChecklist } from '@/lib/offlineStorage';
import { Link } from 'react-router-dom';
import { RegionalWeatherWidget } from '@/components/weather/RegionalWeatherWidget';
import { COUNTRY_IMAGES } from '@/assets/images';

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

    // Find matching district key or substring match
    const matchedKey = Object.keys(MALAWI_DISTRICTS_DATA).find(key => 
      key.includes(q) || MALAWI_DISTRICTS_DATA[key].name.toLowerCase().includes(q)
    );

    if (matchedKey) {
      setAnalyzedDistrict(MALAWI_DISTRICTS_DATA[matchedKey]);
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

        <div className="flex flex-col gap-3 relative z-10">
          <h1 className="serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#FAF8F5] leading-tight">
            Malawi Land Scouting Matrix
          </h1>
          <p className="text-emerald-100/90 max-w-3xl text-sm sm:text-base md:text-lg font-medium leading-relaxed italic">
            Locate and survey your off-grid sanctuary across Malawi's fertile highlands, perennial dambos, and sun-rich plateaus.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10 pt-2 border-t border-amber-500/15">
          <Link
            to="/scout-map"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-black text-xs uppercase px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Compass size={14} /> Open Full Interactive Map <ChevronRight size={13} />
          </Link>
          <button
            onClick={() => setShowSurveyModal(true)}
            className="bg-white/5 hover:bg-white/10 text-amber-200 border border-amber-500/25 font-mono text-xs font-bold uppercase px-4 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            Read Land Guide
          </button>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: ESSENTIAL FUNCTION - DISTRICT & ZONE ANALYZER      */}
      {/* ------------------------------------------------------------- */}
      <section className="backdrop-blur-md bg-white/5 text-white p-6 sm:p-8 md:p-10 rounded-[2.5rem] flex flex-col gap-6 relative overflow-hidden shadow-2xl border border-amber-500/25">
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
            <div>
              <span className="text-amber-300 text-[10px] font-mono font-black uppercase tracking-[0.2em] flex items-center gap-1.5">
                <Search size={12} className="text-amber-400" />
                01 • DISTRICT FINDER
              </span>
              <h2 className="serif text-2xl sm:text-3xl font-bold mt-1 text-[#FAF8F5]">Farming Zone & District Checker</h2>
              <p className="text-emerald-100/80 mt-1 text-xs sm:text-sm font-medium">Search any district in Malawi to check soil acidity, well water depth, rainfall, and farming conditions.</p>
            </div>
            <Link
              to="/scout-map"
              className="self-start sm:self-auto bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 font-mono text-xs font-bold uppercase px-4 py-2.5 rounded-xl transition-all flex items-center gap-2"
            >
              <Compass size={14} className="text-amber-400" /> View on Map
            </Link>
          </div>

          {/* Quick District Buttons */}
          <div className="flex flex-wrap gap-2">
            {['Mzimba', 'Dedza', 'Mulanje', 'Lilongwe', 'Mzuzu', 'Zomba', 'Thyolo', 'Kasungu', 'Rumphi', 'Salima'].map(dist => (
              <button
                key={dist}
                onClick={() => handleDistrictSearch(dist)}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider transition-all border cursor-pointer",
                  analyzedDistrict?.name.toLowerCase().includes(dist.toLowerCase())
                    ? "bg-amber-500 border-amber-300 text-slate-950 shadow-md font-black"
                    : "bg-white/5 border-amber-500/20 text-emerald-200 hover:bg-white/10 hover:text-white"
                )}
              >
                {dist}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <div className="relative w-full">
              <Search className="absolute left-4 top-4 text-amber-400" size={18} />
              <input 
                type="text" 
                value={districtQuery}
                onChange={(e) => handleDistrictSearch(e.target.value)}
                placeholder="Type Malawi District name e.g. Dedza, Mzimba, Mulanje, Zomba, Salima..." 
                className="bg-black/40 border border-amber-500/30 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 w-full placeholder:text-slate-400 text-white font-medium font-mono"
              />
            </div>
          </div>

          {/* Display Analyzed District Card */}
          {analyzedDistrict && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-950/80 backdrop-blur-md border border-amber-500/30 p-6 rounded-3xl flex flex-col gap-5 shadow-2xl"
            >
              <div className="flex justify-between items-start border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="serif text-2xl sm:text-3xl font-bold text-white">{analyzedDistrict.name}</h3>
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                      {analyzedDistrict.region} Region
                    </span>
                  </div>
                  <p className="text-xs text-amber-300 font-bold mt-1">
                    Market Access: {analyzedDistrict.nearestMarketTown} ({analyzedDistrict.m1DistanceKm})
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[9px] uppercase font-black tracking-widest text-emerald-300/80 font-mono">Outpost Score</span>
                  <span className="text-3xl font-black text-emerald-400 font-mono">{analyzedDistrict.suitabilityScore}<span className="text-sm font-normal text-white/50">/10</span></span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-black/30 p-4 rounded-2xl border border-white/10 text-xs">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] uppercase font-black text-emerald-300/70 font-mono">Altitude & Rain</span>
                  <span className="font-bold text-white">{analyzedDistrict.altitude}</span>
                  <span className="text-[10px] text-emerald-200">{analyzedDistrict.rainfall}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] uppercase font-black text-emerald-300/70 font-mono">Soil Type & Acidity (pH)</span>
                  <span className="font-bold text-white">{analyzedDistrict.soil}</span>
                  <span className="text-[10px] text-emerald-200">{analyzedDistrict.soilPh}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] uppercase font-black text-emerald-300/70 font-mono">Well & Borehole Water Depth</span>
                  <span className="font-bold text-white">{analyzedDistrict.groundwaterDepthM}</span>
                  <span className="text-[10px] text-emerald-200">Good Water Recharge</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] uppercase font-black text-amber-300/80 font-mono">Estimated Land Cost</span>
                  <span className="font-extrabold text-amber-300">{analyzedDistrict.landCostBallpark}</span>
                  <span className="text-[9px] text-white/60">Village / Customary Land</span>
                </div>
              </div>

              <div className="bg-emerald-950/70 p-3.5 rounded-2xl border border-emerald-800 text-xs flex flex-col gap-1.5">
                <span className="text-[9px] font-black uppercase tracking-wider text-emerald-300 flex items-center gap-1 font-mono">
                  <MapPin size={11} className="text-amber-400" /> Underground Water & Well Profile:
                </span>
                <p className="text-emerald-100/90 leading-relaxed font-normal">
                  {analyzedDistrict.hydrogeologyNote}
                </p>
              </div>

              <div>
                <span className="text-[9px] uppercase font-black text-emerald-300/70 block mb-1.5 font-mono">Recommended Crops</span>
                <div className="flex flex-wrap gap-1.5">
                  {analyzedDistrict.bestCrops.map(crop => (
                    <span key={crop} className="bg-emerald-500/20 border border-emerald-400/30 text-emerald-100 px-3 py-1 rounded-xl text-xs font-bold">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <p className="text-xs text-emerald-100/90 leading-relaxed italic max-w-xl">
                  "{analyzedDistrict.outpostStrategy}"
                </p>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopyDossier}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 border cursor-pointer active:scale-95",
                      hasCopiedDossier
                        ? "bg-emerald-600 border-emerald-400 text-white"
                        : "bg-white/10 hover:bg-white/20 text-amber-200 border-amber-500/30"
                    )}
                  >
                    {hasCopiedDossier ? <CheckCircle2 size={12} className="text-emerald-300" /> : <Copy size={12} className="text-amber-400" />}
                    {hasCopiedDossier ? 'Report Copied!' : 'Copy Summary'}
                  </button>

                  <Link
                    to={`/calculators?tab=solar&district=${analyzedDistrict.name.toLowerCase()}`}
                    className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
                  >
                    <Calculator size={12} /> Size Solar Pump
                  </Link>

                  <span className="text-[9px] font-mono text-emerald-400/80 bg-black/40 px-2 py-1 rounded-md border border-white/5 shrink-0">
                    Ref: {analyzedDistrict.dccmsSourceRef}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Customary Land Act (2016) Legal Registration Roadmap */}
          <div className="bg-slate-950/80 p-6 rounded-3xl border border-emerald-800/80 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-800/60 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="text-amber-400" size={20} />
                <h3 className="serif text-lg sm:text-xl font-bold text-white">Malawi Customary Land Act (2016) Acquisition Guide</h3>
              </div>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg font-mono self-start sm:self-auto">
                Official Statutory Process
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 flex flex-col gap-1 text-xs">
                <span className="text-amber-400 font-black text-[10px] uppercase font-mono">Step 1: T/A & GVH Consent</span>
                <p className="text-slate-300 leading-snug">Meet Village Headman & Traditional Authority (TA) to verify customary land allocation and agree on boundaries.</p>
              </div>
              <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 flex flex-col gap-1 text-xs">
                <span className="text-amber-400 font-black text-[10px] uppercase font-mono">Step 2: Customary Land Committee</span>
                <p className="text-slate-300 leading-snug">File application with District Customary Land Committee (CLC) for beacon demarcation and GPS boundary mapping.</p>
              </div>
              <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 flex flex-col gap-1 text-xs">
                <span className="text-amber-400 font-black text-[10px] uppercase font-mono">Step 3: Customary Estate Cert.</span>
                <p className="text-slate-300 leading-snug">Receive Certificate of Customary Estate issued under Section 22 of Land Act 2016, giving perpetual private ownership rights.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: REGIONAL WEATHER & MICROCLIMATE FORECAST           */}
      {/* ------------------------------------------------------------- */}
      <section>
        <RegionalWeatherWidget />
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: INTERACTIVE LAND EVALUATION CHECKLIST & ADVICE     */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <section className="backdrop-blur-md bg-white/5 p-6 sm:p-8 md:p-10 rounded-[2.5rem] border border-amber-500/25 shadow-2xl flex flex-col gap-6 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-500/20 pb-4">
              <div>
                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-amber-300">Sanctuary Reconnaissance</span>
                <h3 className="serif text-2xl sm:text-3xl font-bold text-[#FAF8F5]">Land Evaluation Checklist</h3>
              </div>
              <span className="text-[10px] font-mono font-black uppercase text-amber-300 bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-full font-mono self-start sm:self-auto">
                {state.completedIds.length} / {LAND_CHECKLIST_DATA.length} Verified
              </span>
            </div>

            <div className="flex flex-col gap-6">
              {LAND_CHECKLIST_DATA.map((item) => (
                <div key={item.id} className="group flex flex-col gap-4 p-4 rounded-2xl bg-white/[0.02] border border-amber-500/10 hover:border-amber-500/30 transition-all">
                  <div className="flex gap-4 items-start">
                    <button 
                      onClick={() => toggleComplete(item.id)}
                      className={cn(
                        "shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-sm active:scale-90 border cursor-pointer",
                        state.completedIds.includes(item.id) 
                          ? "bg-amber-500 border-amber-300 text-slate-950" 
                          : "bg-white/5 border-amber-500/20 text-emerald-300 hover:text-amber-300"
                      )}
                    >
                      {state.completedIds.includes(item.id) ? <CheckCircle2 size={22} className="stroke-[2.5]" /> : <Circle size={22} />}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className={cn("font-bold text-slate-100 text-base sm:text-lg transition-all", state.completedIds.includes(item.id) && "opacity-50 line-through")}>
                          {item.label}
                        </h4>
                        <span className="text-[9px] font-mono font-black uppercase tracking-widest text-amber-300/80 bg-amber-500/15 border border-amber-500/25 px-2 py-0.5 rounded-md">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-emerald-100/70 mt-1 leading-relaxed font-medium">{item.description}</p>
                    </div>
                  </div>

                  {/* Notes Area */}
                  <div className="ml-[60px]">
                    <div className="relative group/note">
                      <textarea
                        value={state.notes[item.id] || ''}
                        onChange={(e) => updateNote(item.id, e.target.value)}
                        placeholder="Add field notes, GPS coordinates, chief contact, or survey observations..."
                        className="w-full bg-black/30 border border-amber-500/15 rounded-xl p-3 text-xs font-mono text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-500 min-h-[70px] resize-none transition-all"
                      />
                      <div className="absolute top-3 right-3 text-amber-400/30 pointer-events-none transition-opacity group-hover/note:opacity-100 opacity-0 md:opacity-100">
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
          <div className="backdrop-blur-md bg-white/5 p-6 sm:p-8 rounded-[2.5rem] border border-amber-500/25 shadow-xl text-white">
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-amber-300 block mb-2">Guiding Light</span>
            <h4 className="serif text-xl font-bold mb-3 italic text-[#FAF8F5]">The "Outpost" Principle</h4>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-medium">
              EGW advised that while we move to the country, we should be close enough to cities to do medical missionary work and evangelism, but far enough that the local environment doesn't poison our children's minds.
            </p>
          </div>
          
          <div className="backdrop-blur-md bg-white/5 p-6 sm:p-8 rounded-[2.5rem] border border-amber-500/25 shadow-lg flex flex-col gap-4 text-white">
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-amber-300">Field Guides</span>
            <h4 className="serif text-xl font-bold text-[#FAF8F5]">Interactive Scouting Tips</h4>
            <p className="text-xs text-emerald-100/70 font-medium">Click any tip for practical advice on scouting land in Malawi:</p>
            <ul className="text-xs text-slate-200 flex flex-col gap-2.5 font-bold uppercase tracking-wide">
              {[
                { id: 'drainage', title: 'Check Rain Drainage', desc: 'Ensure land is elevated enough to avoid flash flooding during peak rains (December - February).' },
                { id: 'water', title: 'Verify Water Table', desc: 'Locate year-round dambos, perennial streams, or consult local drillers for borehole depth.' },
                { id: 'zoning', title: 'Audit Land Title & Chief Rights', desc: 'Confirm customary land boundaries with Traditional Authorities (TA) and obtain written consent.' }
              ].map(tip => (
                <button
                  key={tip.id}
                  onClick={() => setActiveTipModal(tip.id)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-amber-500/15 text-left text-xs text-slate-100 group cursor-pointer"
                >
                  <span className="font-mono text-[11px]">• {tip.title}</span>
                  <ChevronRight size={15} className="text-amber-400 transition-transform group-hover:translate-x-1" />
                </button>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4: REGIONAL MATRIX & CARTOGRAPHY EXPLORER             */}
      {/* ------------------------------------------------------------- */}
      <section className="backdrop-blur-md bg-white/5 text-white rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden border border-amber-500/25">
        <div className="flex flex-col lg:flex-row gap-12 relative z-10">
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-amber-300">
                04 • REGIONAL CARTOGRAPHY & AGRO-ECOLOGY
              </span>
              <h3 className="serif text-3xl font-bold">Regional Scouting Matrix</h3>
              <p className="text-emerald-100/70 font-medium leading-relaxed text-xs sm:text-sm">
                Malawi offers diverse microclimates across its Northern, Central, and Southern plateaus. Filter by region below to explore zone protocols and crop profiles.
              </p>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {['Northern', 'Central', 'Southern'].map(reg => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(selectedRegion === reg ? null : reg)}
                  className={cn(
                    "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border cursor-pointer",
                    selectedRegion === reg 
                      ? "bg-emerald-500 border-emerald-400 text-white shadow-lg scale-105" 
                      : "bg-white/5 border-white/10 text-emerald-100/60 hover:bg-white/10"
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
                        "bg-slate-950/40 backdrop-blur-xl rounded-3xl border transition-all duration-300 ease-in-out overflow-hidden cursor-pointer",
                        isExpanded 
                          ? "border-amber-500/60 bg-slate-950/70 ring-2 ring-amber-500/20 shadow-2xl" 
                          : "border-white/10 hover:border-amber-500/30 hover:bg-slate-950/50"
                      )}
                      onClick={() => setExpandedZoneId(isExpanded ? null : zone.id)}
                    >
                      <div className="p-6 flex flex-col gap-3">
                        {/* Clean Header Row */}
                        <div className="flex justify-between items-start gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono text-[10px] font-bold uppercase text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                                {zone.region} Region
                              </span>
                            </div>
                            <h4 className="font-serif text-amber-200 text-lg sm:text-xl font-semibold">{zone.name}</h4>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {/* Right-aligned micro badge */}
                            <span className="font-mono text-[10px] text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                              {zone.climate}
                            </span>
                            <div className={cn(
                              "p-1.5 rounded-xl border transition-all duration-300 ease-in-out",
                              isExpanded 
                                ? "bg-amber-500 text-slate-950 border-amber-400" 
                                : "bg-slate-900 text-slate-400 border-white/10"
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
                        
                        <p className="text-xs text-slate-300 font-medium leading-relaxed">
                          {zone.suitability}
                        </p>

                        {/* Crops summary badges */}
                        <div className="flex flex-wrap gap-1.5 mt-0.5">
                          {zone.crops.map(crop => (
                            <span key={crop} className="bg-emerald-950/70 px-2.5 py-0.5 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider border border-emerald-700/50 text-emerald-200">
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
                              className="border-t border-white/10 pt-4 mt-2 flex flex-col gap-4 overflow-hidden"
                            >
                              {/* 2-Column Concise Layout */}
                              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                
                                {/* Left Column: Bulleted Core Steps & Protocols */}
                                <div className="md:col-span-7 flex flex-col gap-2.5">
                                  <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                                    <span className="font-serif text-amber-200 text-xs font-semibold flex items-center gap-1.5">
                                      <Sparkles size={13} className="text-amber-400" />
                                      Key Field Steps
                                    </span>
                                    <span className="font-mono text-[9px] text-emerald-400/80 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                      Land Guide
                                    </span>
                                  </div>

                                  <ul className="flex flex-col gap-2 text-xs">
                                    <li className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-white/5">
                                      <span className="w-4 h-4 rounded bg-amber-500/20 text-amber-300 font-mono text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                        1
                                      </span>
                                      <div>
                                        <strong className="text-amber-300 font-semibold">Outpost Scouting Strategy:</strong>
                                        <span className="text-slate-300 ml-1 leading-relaxed">Establish gravity-fed water intake and cold-hardy orchards in high elevations.</span>
                                      </div>
                                    </li>

                                    <li className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-white/5">
                                      <span className="w-4 h-4 rounded bg-amber-500/20 text-amber-300 font-mono text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                        2
                                      </span>
                                      <div>
                                        <strong className="text-amber-300 font-semibold">Microclimate Shielding:</strong>
                                        <span className="text-slate-300 ml-1 leading-relaxed">Elevation provides natural vector buffering against lowland heat stress and malaria zones.</span>
                                      </div>
                                    </li>
                                  </ul>
                                </div>

                                {/* Right Column: Required Equipment & Metrics in font-mono */}
                                <div className="md:col-span-5 flex flex-col gap-2.5">
                                  <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                                    <span className="font-serif text-amber-200 text-xs font-semibold flex items-center gap-1.5">
                                      <Wrench size={13} className="text-amber-400" />
                                      Key Details
                                    </span>
                                    <span className="font-mono text-[9px] text-amber-400/80 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                                      Field Details
                                    </span>
                                  </div>

                                  <div className="flex flex-col gap-2 font-mono text-xs">
                                    <div className="bg-slate-900/80 p-2 rounded-xl border border-white/10">
                                      <span className="text-[9px] uppercase text-slate-400 block font-bold">Target Zone</span>
                                      <span className="text-emerald-300 font-bold text-[11px]">{zone.region} Plateau</span>
                                    </div>
                                    <div className="bg-slate-900/80 p-2 rounded-xl border border-white/10">
                                      <span className="text-[9px] uppercase text-slate-400 block font-bold">Climate Classification</span>
                                      <span className="text-amber-300 font-bold text-[11px]">{zone.climate}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Single High-Contrast Action Button */}
                              <div className="pt-2 border-t border-white/10">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDistrictSearch(zone.name.split(' ')[0]);
                                  }}
                                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                                >
                                  <span>Launch District Reconnaissance</span>
                                  <ArrowUpRight size={13} className="text-slate-950" />
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
          <div className="lg:w-80 shrink-0 flex flex-col items-center gap-6 bg-white/5 rounded-[3.5rem] p-8 border border-white/10">
            <div className="flex flex-col items-center text-center gap-1">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Malawi Cartography</span>
              <span className="text-xs font-bold text-emerald-200">Select Region to Scout</span>
            </div>

            <div className="relative w-48 h-80 flex items-center justify-center">
              <svg viewBox="0 0 200 400" className="w-full h-full drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                {/* Northern Region */}
                <path 
                  d="M 90 20 C 110 30, 130 60, 120 100 C 110 130, 90 140, 80 140 C 70 120, 60 80, 70 40 Z" 
                  fill={selectedRegion === 'Northern' ? '#10b981' : '#064e3b'}
                  stroke="#34d399"
                  strokeWidth="2"
                  className="transition-all duration-300 cursor-pointer hover:fill-emerald-500"
                  onClick={() => setSelectedRegion('Northern')}
                />
                
                {/* Central Region */}
                <path 
                  d="M 80 140 C 90 140, 110 160, 120 200 C 110 240, 80 260, 70 250 C 60 220, 60 170, 80 140 Z" 
                  fill={selectedRegion === 'Central' ? '#10b981' : '#064e3b'}
                  stroke="#34d399"
                  strokeWidth="2"
                  className="transition-all duration-300 cursor-pointer hover:fill-emerald-500"
                  onClick={() => setSelectedRegion('Central')}
                />

                {/* Southern Region */}
                <path 
                  d="M 70 250 C 80 260, 110 270, 130 310 C 120 350, 90 380, 80 370 C 60 330, 50 280, 70 250 Z" 
                  fill={selectedRegion === 'Southern' ? '#10b981' : '#064e3b'}
                  stroke="#34d399"
                  strokeWidth="2"
                  className="transition-all duration-300 cursor-pointer hover:fill-emerald-500"
                  onClick={() => setSelectedRegion('Southern')}
                />

                {/* Lake Malawi Outline */}
                <path 
                  d="M 120 40 C 130 80, 140 150, 125 250 C 120 230, 115 120, 110 60 Z" 
                  fill="#0284c7"
                  opacity="0.6"
                />

                {/* Dynamic Region Markers with Icons */}
                {selectedRegion === 'Northern' && (
                  <g className="animate-bounce">
                    <circle cx="95" cy="70" r="6" fill="#f59e0b" />
                    <text x="110" y="75" fill="#fef3c7" fontSize="10" fontWeight="bold" fontFamily="monospace">VIPHYA</text>
                  </g>
                )}
                {selectedRegion === 'Central' && (
                  <g className="animate-bounce">
                    <circle cx="90" cy="190" r="6" fill="#f59e0b" />
                    <text x="105" y="195" fill="#fef3c7" fontSize="10" fontWeight="bold" fontFamily="monospace">DEDZA</text>
                  </g>
                )}
                {selectedRegion === 'Southern' && (
                  <g className="animate-bounce">
                    <circle cx="95" cy="300" r="6" fill="#f59e0b" />
                    <text x="110" y="305" fill="#fef3c7" fontSize="10" fontWeight="bold" fontFamily="monospace">MULANJE</text>
                  </g>
                )}
              </svg>
            </div>

            <div className="text-[10px] text-center text-emerald-200/60 font-mono">
              Click region on map or select button above to zoom into territory.
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <MapIcon size={400} strokeWidth={0.5} />
        </div>
      </section>

      {/* Scouting Tip Modal */}
      <AnimatePresence>
        {activeTipModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#091D12] text-white rounded-[2.5rem] p-8 md:p-10 max-w-lg w-full shadow-2xl border border-amber-500/30 flex flex-col gap-6 relative"
            >
              <button 
                onClick={() => setActiveTipModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-slate-300 hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 text-amber-300">
                <Compass size={28} />
                <h3 className="serif text-2xl font-bold text-[#FAF8F5]">
                  {activeTipModal === 'drainage' && 'Rain Drainage & Soil Runoff'}
                  {activeTipModal === 'water' && 'Water Table & Well Depth'}
                  {activeTipModal === 'zoning' && 'Land Title & Chief Approvals'}
                </h3>
              </div>

              <p className="text-emerald-100/90 text-sm leading-relaxed font-medium">
                {activeTipModal === 'drainage' && 'During the Malawian rainy season (Nov - Mar), low-lying areas in valleys can submerge. Choose land with gentle slopes, construct contour ridges (misozi), and plant vetiver grass to prevent soil erosion.'}
                {activeTipModal === 'water' && 'Water is the lifeline of an outpost. Verify perennial streams or dambos that maintain water through October. If sinking a borehole, target areas with water tables under 30 meters for efficient solar pumping.'}
                {activeTipModal === 'zoning' && 'When acquiring customary land in rural Malawi, meet with the Village Headman and Traditional Authority (TA). Ensure clear boundaries are agreed upon with neighbors and documented with official land committee receipts.'}
              </p>

              <button 
                onClick={() => setActiveTipModal(null)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 py-3.5 rounded-2xl font-mono font-black text-xs uppercase tracking-widest transition-all cursor-pointer"
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
              className="bg-[#091D12] text-white rounded-[2.5rem] p-8 md:p-12 max-w-2xl w-full shadow-2xl border border-amber-500/30 flex flex-col gap-6 relative my-8"
            >
              <button 
                onClick={() => setShowSurveyModal(false)}
                className="absolute top-8 right-8 p-3 rounded-full bg-white/10 text-slate-300 hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-2">
                <span className="text-amber-300 font-mono font-black uppercase text-[10px] tracking-[0.2em]">Sanctuary Scout Report</span>
                <h3 className="serif text-3xl font-bold text-[#FAF8F5]">Malawi Land Scouting Survey</h3>
              </div>

              <div className="flex flex-col gap-4 text-sm text-emerald-100/90 leading-relaxed font-medium">
                <div className="p-4 bg-white/5 rounded-2xl border border-amber-500/20">
                  <h4 className="font-bold text-amber-300 mb-1">Recommended Prime Outpost Regions</h4>
                  <p className="text-xs leading-relaxed text-slate-200">
                    <strong>Northern Region:</strong> Viphya Plateau & Misuku Hills (High rainfall, timber, cool climate).<br />
                    <strong>Central Region:</strong> Dedza Highlands & Ntcheu (Fertile volcanic soil, ideal for cold crops).<br />
                    <strong>Southern Region:</strong> Mulanje Slopes & Zomba Plateau (Abundant perennial mountain water).
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-amber-500/15">
                    <h5 className="font-bold text-amber-300 text-xs font-mono uppercase mb-2">Step 1: Water Security</h5>
                    <p className="text-xs text-slate-300">Inspect dambo moisture retention, shallow well water table depth, and perennial stream gravity potential.</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-amber-500/15">
                    <h5 className="font-bold text-amber-300 text-xs font-mono uppercase mb-2">Step 2: Customary Title</h5>
                    <p className="text-xs text-slate-300">Request formal beacon boundary surveying through Group Village Headman & District Land Registry under 2016 Act.</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setShowSurveyModal(false)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 py-3.5 rounded-2xl font-mono font-black text-xs uppercase tracking-widest transition-all cursor-pointer"
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
