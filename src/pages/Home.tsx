import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, CloudRain, Thermometer, Wind, Compass, MapPin, Calculator, 
  CheckCircle2, Circle, Sprout, Leaf, ArrowRight, Share2, Sparkles, 
  BookOpen, Clock, Activity, ShieldCheck, RefreshCw, Layers, HardDrive, 
  Search, ChevronRight, Zap, Droplets, ExternalLink, BookmarkCheck, Play,
  Check, FileText, Mountain, Utensils, Calendar, Award, AlertTriangle, Globe, 
  Waves, Battery, Sliders, HeartPulse, ArrowUpRight, Hammer, TreePine, 
  SlidersHorizontal, CheckSquare, Eye
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { DEVOTIONAL_QUOTES } from '@/data/content';
import { useAuth } from '@/contexts/AuthContext';
import { SoilStrataBlueprint } from '@/components/home/SoilStrataBlueprint';
import { HomesteadHeroArtwork } from '@/components/home/HomesteadHeroArtwork';
import { DUMMY_SCOUT_GEOJSON } from '@/data/scoutGeoJSON';
import { REGIONS_LIST, HOMESTEAD_SKILLS } from '@/data/skillsAndSeasons';
import { COUNTRY_IMAGES } from '@/assets/images';
import { SeasonalAlmanacBar } from '@/components/common/SeasonalAlmanacBar';
import { WhyCountryLivingFeaturette } from '@/components/home/WhyCountryLivingFeaturette';
import { getStoredTrackerData, saveStoredTrackerData } from '@/lib/offlineStorage';
import { cn } from '@/lib/utils';

// Regional Weather & Telemetry Datasets for Malawi Operations
const REGIONAL_WEATHER_DATA: { [key: string]: {
  name: string;
  elevation: string;
  temp: string;
  condition: string;
  humidity: string;
  wind: string;
  solarIrradiance: string;
  soilTemp: string;
  rainForecast: string;
  groundwaterDepth: string;
  primaryCrops: string[];
  soilType: string;
  advice: string;
}} = {
  'Dedza': {
    name: 'Dedza Highlands',
    elevation: '1,600m - 2,198m',
    temp: '21°C',
    condition: 'Crisp Mountain Breeze',
    humidity: '64%',
    wind: '14 km/h ESE',
    solarIrradiance: '5.8 kWh/m²',
    soilTemp: '18°C',
    rainForecast: '15% (Dry Window)',
    groundwaterDepth: '15 - 35m',
    primaryCrops: ['Irish Potatoes', 'Apples & Peaches', 'Soybeans', 'Temperate Veggies'],
    soilType: 'Katondo Ferruginous Clay-Loam (pH 5.8 - 6.4)',
    advice: 'Optimal temperature window for Katondo trench composting and ridge (misozi) building before rain onset.'
  },
  'Lilongwe': {
    name: 'Lilongwe Central Plain',
    elevation: '1,050m',
    temp: '25°C',
    condition: 'Clear & High Solar',
    humidity: '50%',
    wind: '10 km/h SE',
    solarIrradiance: '6.5 kWh/m²',
    soilTemp: '22°C',
    rainForecast: '5% (Clear)',
    groundwaterDepth: '25 - 45m',
    primaryCrops: ['Maize', 'Groundnuts', 'Sunflower', 'Cowpeas'],
    soilType: 'Sandy Clay Loam (pH 6.0 - 6.5)',
    advice: 'Peak solar pumping window between 10am and 3pm. Ideal for grain drying & borehole yield testing.'
  },
  'Zomba': {
    name: 'Zomba Plateau & Basin',
    elevation: '1,400m - 2,087m',
    temp: '23°C',
    condition: 'Humid Breeze & Plateau Mist',
    humidity: '72%',
    wind: '16 km/h NE',
    solarIrradiance: '5.9 kWh/m²',
    soilTemp: '19°C',
    rainForecast: '30% (Chiperoni Mist)',
    groundwaterDepth: '10 - 25m',
    primaryCrops: ['Macadamia', 'Arabica Coffee', 'Citrus', 'Perennial Herbs'],
    soilType: 'Humic Latosols (pH 5.4 - 6.0)',
    advice: 'Perennial gravity spring capture active. Verify contour swales (misozi) for runoff overflow.'
  },
  'Rumphi': {
    name: 'Rumphi & Viphya Highlands',
    elevation: '1,300m - 1,800m',
    temp: '24°C',
    condition: 'Sunny Plateau Vista',
    humidity: '48%',
    wind: '12 km/h S',
    solarIrradiance: '6.8 kWh/m²',
    soilTemp: '21°C',
    rainForecast: '0% (Peak Solar)',
    groundwaterDepth: '18 - 40m',
    primaryCrops: ['Hass Avocados', 'Bananas', 'Beans', 'Pine / Cedar Timber'],
    soilType: 'Deep Red Sandy Loam (pH 5.6 - 6.2)',
    advice: 'High solar flux. Run solar water pumps to maximize irrigation reservoirs for fruit orchards.'
  },
  'Salima': {
    name: 'Salima & Lake Basin',
    elevation: '490m - 600m',
    temp: '29°C',
    condition: 'Warm Tropical Sun',
    humidity: '58%',
    wind: '8 km/h E',
    solarIrradiance: '7.1 kWh/m²',
    soilTemp: '26°C',
    rainForecast: '0% (Dry)',
    groundwaterDepth: '6 - 18m (Shallow Aquifer)',
    primaryCrops: ['Mangoes', 'Papaya', 'Rice', 'Cassava & Sugarcane'],
    soilType: 'Alluvial Loams & Dambo Clays (pH 6.5 - 7.2)',
    advice: 'Shallow groundwater table stable (< 18m). Ensure thick vetiver mulch layers on garden beds.'
  }
};

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Selected District for Live Weather & Micro-Climate Telemetry
  const [selectedDistrict, setSelectedDistrict] = useState<string>(user?.district || 'Dedza');
  const currentWeather = REGIONAL_WEATHER_DATA[selectedDistrict] || REGIONAL_WEATHER_DATA['Dedza'];

  // Devotional state
  const [devotional, setDevotional] = useState(DEVOTIONAL_QUOTES[0]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Tracker Progress State (Pushed to bottom of page)
  const [trackerSteps, setTrackerSteps] = useState<any[]>([]);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(9);
  const [nextTask, setNextTask] = useState<{ stepId: string; subtaskId: string; label: string; stepTitle: string } | null>(null);

  // Rapid Sizing Tool State (Interactive Solar Water Calculator)
  const [calcDepth, setCalcDepth] = useState<number>(35); // meters
  const [calcDemand, setCalcDemand] = useState<number>(3000); // L/day

  // Active Agro-Zone Card Tab
  const [activeZoneTab, setActiveZoneTab] = useState<string>('Dedza');

  // Load Tracker & Saved Specs
  useEffect(() => {
    // Quote calculation
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    setDevotional(DEVOTIONAL_QUOTES[dayOfYear % DEVOTIONAL_QUOTES.length]);

    // Read real exodus tracker progress
    try {
      const parsed = getStoredTrackerData();
      if (parsed && Array.isArray(parsed)) {
        setTrackerSteps(parsed);
        
        let done = 0;
        let total = 0;
        let foundNext: any = null;

        parsed.forEach((step: any) => {
          step.subtasks?.forEach((sub: any) => {
            total++;
            if (sub.completed) {
              done++;
            } else if (!foundNext) {
              foundNext = {
                stepId: step.id,
                subtaskId: sub.id,
                label: sub.label,
                stepTitle: step.title
              };
            }
          });
        });

        setCompletedCount(done);
        setTotalCount(total || 9);
        setNextTask(foundNext);
      }
    } catch (e) {
      console.warn('Could not read exodus tracker state:', e);
    }
  }, []);

  // Toggle subtask directly in Exodus Ledger
  const handleToggleSubtask = (stepId: string, subtaskId: string) => {
    if (trackerSteps.length === 0) return;

    const updatedSteps = trackerSteps.map((step: any) => {
      if (step.id === stepId) {
        return {
          ...step,
          subtasks: step.subtasks.map((sub: any) => 
            sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
          )
        };
      }
      return step;
    });

    setTrackerSteps(updatedSteps);
    saveStoredTrackerData(updatedSteps);

    // Recalculate
    let done = 0;
    let total = 0;
    let foundNext: any = null;

    updatedSteps.forEach((step: any) => {
      step.subtasks?.forEach((sub: any) => {
        total++;
        if (sub.completed) {
          done++;
        } else if (!foundNext) {
          foundNext = {
            stepId: step.id,
            subtaskId: sub.id,
            label: sub.label,
            stepTitle: step.title
          };
        }
      });
    });

    setCompletedCount(done);
    setTotalCount(total || 9);
    setNextTask(foundNext);

    setToastMessage('Exodus Ledger milestone updated!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const shareDevotional = () => {
    const text = `"${devotional.text}" — ${devotional.source} (OUTPOST: COUNTRY LIVING • Malawi Blueprint)`;
    if (navigator.share) {
      navigator.share({
        title: 'Daily Country Living Devotional',
        text: text,
        url: window.location.href,
      }).catch(() => {
        navigator.clipboard.writeText(text);
        setToastMessage('Copied devotional quote to clipboard');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      });
    } else {
      navigator.clipboard.writeText(text);
      setToastMessage('Copied devotional quote to clipboard');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // Math for rapid solar borehole sizing
  const calculatedWattage = useMemo(() => {
    const hydraulicPowerWatts = (calcDemand / (5 * 3600)) * 1000 * 9.81 * (calcDepth + 10);
    const requiredSolarPVWatts = Math.ceil(hydraulicPowerWatts * 2.8);
    return Math.max(300, Math.ceil(requiredSolarPVWatts / 100) * 100);
  }, [calcDepth, calcDemand]);

  const calculatedPanels = useMemo(() => {
    return Math.ceil(calculatedWattage / 200);
  }, [calculatedWattage]);

  const calculatedPumpRate = useMemo(() => {
    return Math.round(calcDemand / (5 * 60)); // liters per minute in 5h peak sun
  }, [calcDemand]);

  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="flex flex-col gap-14 sm:gap-18 md:gap-22 pb-24 text-slate-100 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50 bg-amber-500 text-slate-950 px-4 py-2.5 rounded-xl font-mono text-xs font-black shadow-2xl flex items-center gap-2 border border-amber-300"
          >
            <Sparkles size={16} className="text-slate-950" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 1. HERO BANNER: RICH TYPOGRAPHY "OUTPOST: COUNTRY LIVING"                 */}
      {/* ========================================================================= */}
      <section 
        className="relative rounded-[2.5rem] p-6 sm:p-10 md:p-14 lg:p-16 border border-amber-500/30 shadow-[0_30px_70px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col gap-8 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(4, 29, 16, 0.90), rgba(7, 24, 14, 0.85), rgba(4, 29, 16, 0.96)), url(${COUNTRY_IMAGES.mountainVista})`
        }}
      >
        {/* Ambient Top Glow Orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6 max-w-4xl">
          
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-300 border border-amber-500/40 px-3.5 py-1 rounded-full font-mono font-black uppercase text-[10px] sm:text-xs tracking-[0.2em] flex items-center gap-2 shadow-xs">
              <Compass size={13} className="text-amber-400" />
              <span>MALAWI SANCTUARY & SELF-RELIANCE MATRIX</span>
            </span>
            <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-mono font-bold uppercase text-[10px] tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>28 Districts • Offline GIS Ready</span>
            </span>
          </div>

          {/* Bold Editorial Title: OUTPOST: COUNTRY LIVING */}
          <div className="flex flex-col gap-2">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#FAF8F5] leading-[0.98] tracking-tight">
              <span className="bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 bg-clip-text text-transparent drop-shadow-sm">
                OUTPOST:
              </span> <br />
              <span className="italic font-normal bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                COUNTRY LIVING.
              </span>
            </h1>
            <p className="text-amber-300/90 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.25em] mt-1">
              Field Blueprint for Highland Sanctuary, Agro-Forestry & City Exodus
            </p>
          </div>

          {/* Subtitle & Value Proposition */}
          <p className="text-emerald-100/90 text-sm sm:text-base md:text-lg font-medium max-w-3xl leading-relaxed">
            Your definitive field manual for scouting customary & freehold land, sizing solar boreholes, engineering gravity-fed water cisterns, cultivating Katondo food forests, and executing your rural homestead in Malawi.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <Link
              to="/where"
              className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black px-6 py-3.5 sm:py-4 rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_10px_30px_rgba(245,158,11,0.4)] flex items-center gap-2.5 active:scale-95 border border-amber-300 font-mono group"
            >
              <Compass size={18} className="text-slate-950 group-hover:rotate-45 transition-transform" />
              <span>Launch Land Scouting</span>
              <ArrowRight size={16} className="text-slate-950 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/skills"
              className="bg-white/10 hover:bg-white/15 text-amber-200 hover:text-white border border-amber-500/40 hover:border-amber-400 font-bold px-5 py-3.5 sm:py-4 rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all backdrop-blur-md flex items-center gap-2 active:scale-95 font-mono"
            >
              <Hammer size={16} className="text-amber-400" />
              <span>25 Masterclass Skills</span>
            </Link>

            <Link
              to="/calculators"
              className="bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/15 hover:border-amber-400/40 font-bold px-5 py-3.5 sm:py-4 rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all backdrop-blur-md flex items-center gap-2 active:scale-95 font-mono"
            >
              <Calculator size={16} className="text-sky-400" />
              <span>Off-Grid Sizing Math</span>
            </Link>
          </div>
        </div>

        {/* Live District Telemetry Quick Bar */}
        <div className="relative z-10 pt-5 border-t border-amber-500/25 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono font-black uppercase tracking-wider text-amber-300">
              <Sun size={15} className="text-amber-400" />
              <span>District Micro-Climate & Solar Telemetry:</span>
            </div>

            {/* District Quick Selector Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              {Object.keys(REGIONAL_WEATHER_DATA).map((dist) => (
                <button
                  key={dist}
                  type="button"
                  onClick={() => setSelectedDistrict(dist)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border active:scale-95",
                    selectedDistrict === dist
                      ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black border-amber-200 shadow-[0_4px_15px_rgba(245,158,11,0.4)]"
                      : "bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-900 border-white/[0.08] backdrop-blur-md"
                  )}
                >
                  {dist}
                </button>
              ))}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            <div className="bg-slate-950/85 backdrop-blur-xl p-3.5 rounded-2xl border border-white/[0.08] flex flex-col shadow-lg">
              <span className="text-[9px] font-mono uppercase text-slate-400 flex items-center gap-1">
                <Thermometer size={11} className="text-amber-400" /> Ambient Temp
              </span>
              <span className="text-base font-bold font-mono text-slate-100 mt-1">{currentWeather.temp}</span>
              <span className="text-[10px] text-slate-400 font-mono truncate">{currentWeather.condition}</span>
            </div>

            <div className="bg-slate-950/85 backdrop-blur-xl p-3.5 rounded-2xl border border-white/[0.08] flex flex-col shadow-lg">
              <span className="text-[9px] font-mono uppercase text-slate-400 flex items-center gap-1">
                <Sun size={11} className="text-amber-400" /> Solar Irradiance
              </span>
              <span className="text-base font-bold font-mono text-amber-300 mt-1">{currentWeather.solarIrradiance}</span>
              <span className="text-[10px] text-emerald-400 font-mono">High Yield Hours</span>
            </div>

            <div className="bg-slate-950/85 backdrop-blur-xl p-3.5 rounded-2xl border border-white/[0.08] flex flex-col shadow-lg">
              <span className="text-[9px] font-mono uppercase text-slate-400 flex items-center gap-1">
                <Droplets size={11} className="text-sky-400" /> Water Table
              </span>
              <span className="text-base font-bold font-mono text-sky-300 mt-1">{currentWeather.groundwaterDepth}</span>
              <span className="text-[10px] text-slate-400 font-mono">Borehole Feasible</span>
            </div>

            <div className="bg-slate-950/85 backdrop-blur-xl p-3.5 rounded-2xl border border-white/[0.08] flex flex-col shadow-lg">
              <span className="text-[9px] font-mono uppercase text-slate-400 flex items-center gap-1">
                <Wind size={11} className="text-slate-300" /> Soil & Wind
              </span>
              <span className="text-base font-bold font-mono text-slate-100 mt-1">{currentWeather.soilTemp} Soil</span>
              <span className="text-[10px] text-slate-400 font-mono truncate">{currentWeather.wind}</span>
            </div>

            <div className="bg-slate-950/85 backdrop-blur-xl p-3.5 rounded-2xl border border-amber-500/20 flex flex-col col-span-2 shadow-lg">
              <span className="text-[9px] font-mono uppercase text-amber-400 font-bold flex items-center gap-1">
                <Sprout size={11} className="text-amber-400" /> Agronomic Window
              </span>
              <p className="text-[11px] text-emerald-100/90 font-medium line-clamp-2 mt-1 leading-relaxed">
                {currentWeather.advice}
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. REPLACED MALAWI HIGHLAND HOMESTEAD ARCHETYPE: HIGH-RES PHOTOGRAPHY     */}
      {/* ========================================================================= */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-500/20 pb-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-amber-400">
              01 • VISUAL ARCHETYPE BLUEPRINT
            </span>
            <h2 className="serif text-2xl sm:text-3xl font-extrabold text-[#FAF8F5] tracking-tight">
              Malawi Highland Homestead Archetype
            </h2>
          </div>
          <span className="text-xs font-mono text-emerald-300/80">
            Interactive Map Markers
          </span>
        </div>

        {/* High-Resolution Photo Card with Hotspot Overlays */}
        <HomesteadHeroArtwork />
      </section>

      {/* ========================================================================= */}
      {/* 3. SHOWCASE BEST FEATURES OF OUTPOST (5 INTERACTIVE TILES)                */}
      {/* ========================================================================= */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-500/20 pb-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-amber-400">
              02 • CORE APP CAPABILITIES
            </span>
            <h2 className="serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#FAF8F5] tracking-tight">
              Explore Best Features & Field Modules
            </h2>
          </div>
          <span className="hidden sm:inline text-xs font-mono text-emerald-300/80">
            Select any module to launch
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Pathway 1: Land Scouting Matrix */}
          <Link
            to="/where"
            className="group relative h-88 rounded-3xl overflow-hidden border border-amber-500/30 hover:border-amber-400 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-end p-5 text-white"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${COUNTRY_IMAGES.mountainVista})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041d10] via-[#041d10]/80 to-transparent" />
            <div className="relative z-10 flex flex-col gap-2">
              <span className="bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider w-fit">
                Land & Map Guide
              </span>
              <h3 className="serif text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                Land Scouting Matrix
              </h3>
              <p className="text-xs text-emerald-100/90 line-clamp-2 leading-relaxed">
                Explore all 28 Malawi districts, fertile highlands, river basins, and customary village land acquisition steps.
              </p>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mt-2 font-mono group-hover:translate-x-1.5 transition-transform">
                <span>Explore Land Guide</span> <ArrowRight size={14} />
              </div>
            </div>
          </Link>

          {/* Pathway 2: Permaculture & 25 Masterclass Skills */}
          <Link
            to="/skills"
            className="group relative h-88 rounded-3xl overflow-hidden border border-amber-500/30 hover:border-amber-400 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-end p-5 text-white"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${COUNTRY_IMAGES.permacultureGarden})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041d10] via-[#041d10]/80 to-transparent" />
            <div className="relative z-10 flex flex-col gap-2">
              <span className="bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider w-fit">
                Agrarian Mastery
              </span>
              <h3 className="serif text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                25 Field Skills Manual
              </h3>
              <p className="text-xs text-emerald-100/90 line-clamp-2 leading-relaxed">
                Bio-intensive raised beds, Katondo compost, vetiver swales, heirloom seed saving, and multi-story orchard guilds.
              </p>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mt-2 font-mono group-hover:translate-x-1.5 transition-transform">
                <span>Explore 25 Skills</span> <ArrowRight size={14} />
              </div>
            </div>
          </Link>

          {/* Pathway 3: Off-Grid Engineering Sizers */}
          <Link
            to="/calculators"
            className="group relative h-88 rounded-3xl overflow-hidden border border-amber-500/30 hover:border-amber-400 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-end p-5 text-white"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${COUNTRY_IMAGES.offgridHomesteadWater})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041d10] via-[#041d10]/80 to-transparent" />
            <div className="relative z-10 flex flex-col gap-2">
              <span className="bg-sky-500 text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider w-fit">
                Engineering Sizers
              </span>
              <h3 className="serif text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                Off-Grid Calculators
              </h3>
              <p className="text-xs text-emerald-100/90 line-clamp-2 leading-relaxed">
                Solar borehole pumping math, gravity water catchment, battery banks, and brick masonry shelter blueprints.
              </p>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mt-2 font-mono group-hover:translate-x-1.5 transition-transform">
                <span>Run Sizing Math</span> <ArrowRight size={14} />
              </div>
            </div>
          </Link>

          {/* Pathway 4: Seasonal Agronomic Almanac */}
          <Link
            to="/seasons"
            className="group relative h-88 rounded-3xl overflow-hidden border border-amber-500/30 hover:border-amber-400 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-end p-5 text-white"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${COUNTRY_IMAGES.homesteadHighlands})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041d10] via-[#041d10]/80 to-transparent" />
            <div className="relative z-10 flex flex-col gap-2">
              <span className="bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider w-fit">
                Agronomic Radar
              </span>
              <h3 className="serif text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                Seasonal Almanac
              </h3>
              <p className="text-xs text-emerald-100/90 line-clamp-2 leading-relaxed">
                Rainfall onset calendars, Dimba winter cultivation cycles, frost protection alerts, and regional planting schedules.
              </p>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mt-2 font-mono group-hover:translate-x-1.5 transition-transform">
                <span>Open Almanac</span> <ArrowRight size={14} />
              </div>
            </div>
          </Link>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. MAP SCOUT DIRECT LAUNCHPAD                                             */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-[#061e12] via-[#04140b] to-[#020a06] p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider flex items-center gap-1.5">
                <Compass size={12} className="text-amber-400" /> Full GIS Land Matrix
              </span>
              <span className="text-[11px] font-mono text-emerald-400 font-bold">
                28 Districts • Satellite & Topo
              </span>
            </div>

            <h2 className="serif text-2xl sm:text-3xl font-extrabold text-[#FAF8F5] tracking-tight">
              Tactical Malawi Land & Parcel Scout
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Inspect shallow groundwater aquifers, high-altitude frost envelopes, Katondo soil strata, and surveyed customary acreage with decluttering layer switches and instant GPS telemetry.
            </p>

            {/* Quick Regional Filters */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Fast Jumps:</span>
              <Link
                to="/where?region=northern-plateau"
                className="px-3 py-1 rounded-xl bg-slate-900/90 hover:bg-amber-500/20 text-slate-200 hover:text-amber-300 text-xs font-mono font-bold border border-white/10 transition-colors"
              >
                Nyika & Viphya (North)
              </Link>
              <Link
                to="/where?region=central-highlands"
                className="px-3 py-1 rounded-xl bg-slate-900/90 hover:bg-amber-500/20 text-slate-200 hover:text-amber-300 text-xs font-mono font-bold border border-white/10 transition-colors"
              >
                Dedza & Linthipe (Central)
              </Link>
              <Link
                to="/where?region=southern-massifs"
                className="px-3 py-1 rounded-xl bg-slate-900/90 hover:bg-amber-500/20 text-slate-200 hover:text-amber-300 text-xs font-mono font-bold border border-white/10 transition-colors"
              >
                Mulanje & Shire (South)
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 w-full lg:w-auto shrink-0">
            <Link
              to="/where"
              className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black px-6 py-4 rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_10px_25px_rgba(245,158,11,0.35)] flex items-center justify-center gap-2.5 active:scale-95 border border-amber-300 font-mono group text-center"
            >
              <Compass size={18} className="text-slate-950 group-hover:rotate-45 transition-transform" />
              <span>Open Main Map Scout</span>
              <ArrowRight size={16} className="text-slate-950 group-hover:translate-x-1 transition-transform" />
            </Link>

            <span className="text-[10px] font-mono text-center lg:text-right text-slate-400">
              Interactive Leaflet GIS with Custom Layer Toggles
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. HOMESTEAD OPERATIONS CONSOLE (INTERACTIVE SIZERS & AGRO-ZONES)         */}
      {/* ========================================================================= */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 border-b border-amber-500/20 pb-3">
          <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-amber-400">
            03 • TACTICAL HOMESTEAD TOOLS
          </span>
          <h2 className="serif text-2xl sm:text-3xl font-extrabold text-[#FAF8F5] tracking-tight">
            Live Engineering & Agronomic Console
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* TOOL 1: Interactive Solar Borehole Rapid Sizer (lg:col-span-6) */}
          <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 border border-white/10 bg-[#06180E]/90 backdrop-blur-xl flex flex-col justify-between gap-6 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-amber-400">
                  RAPID SIZING MATH
                </span>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase">
                  OFFLINE READY
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                  <Zap size={22} />
                </div>
                <div>
                  <h3 className="serif text-xl sm:text-2xl font-bold text-white">
                    Solar Borehole Sizing Tool
                  </h3>
                  <p className="text-xs text-slate-400 font-sans">
                    Estimate required PV wattage and pump output instantly
                  </p>
                </div>
              </div>

              {/* Dynamic Sizing Sliders / Toggles */}
              <div className="bg-slate-950/70 p-4 rounded-2xl border border-white/10 flex flex-col gap-4">
                
                {/* Depth Toggle */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-300">Borehole Depth (Head):</span>
                    <span className="text-amber-300 font-bold">{calcDepth} meters</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-white/5">
                    {[20, 35, 50, 70].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setCalcDepth(d)}
                        className={cn(
                          "py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer",
                          calcDepth === d
                            ? "bg-amber-500 text-slate-950 font-black shadow-sm"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                      >
                        {d}m
                      </button>
                    ))}
                  </div>
                </div>

                {/* Daily Water Demand Toggle */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-300">Daily Water Demand:</span>
                    <span className="text-sky-300 font-bold">{calcDemand.toLocaleString()} L/day</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-white/5">
                    {[1500, 3000, 5000, 10000].map((liters) => (
                      <button
                        key={liters}
                        type="button"
                        onClick={() => setCalcDemand(liters)}
                        className={cn(
                          "py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer",
                          calcDemand === liters
                            ? "bg-sky-500 text-slate-950 font-black shadow-sm"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                      >
                        {liters >= 1000 ? `${liters / 1000}kL` : `${liters}L`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Result Specs Box */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-white/5 flex flex-col">
                    <span className="text-[9px] font-mono uppercase text-slate-400">Total Array</span>
                    <span className="text-sm font-black font-mono text-amber-300 mt-0.5">{calculatedWattage}W</span>
                    <span className="text-[9px] font-mono text-slate-400">Solar Power</span>
                  </div>

                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-white/5 flex flex-col">
                    <span className="text-[9px] font-mono uppercase text-slate-400">200W Panels</span>
                    <span className="text-sm font-black font-mono text-emerald-300 mt-0.5">{calculatedPanels} Panels</span>
                    <span className="text-[9px] font-mono text-slate-400">Mono-PERC</span>
                  </div>

                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-white/5 flex flex-col">
                    <span className="text-[9px] font-mono uppercase text-slate-400">Flow Rate</span>
                    <span className="text-sm font-black font-mono text-sky-300 mt-0.5">{calculatedPumpRate} L/min</span>
                    <span className="text-[9px] font-mono text-slate-400">5hr Solar Day</span>
                  </div>
                </div>

              </div>
            </div>

            <Link
              to="/calculators"
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-bold px-5 py-3 rounded-2xl text-xs uppercase tracking-wider transition-all flex items-center justify-between border border-amber-500/40 font-mono"
            >
              <span>Open Full Engineering Calculators</span>
              <ArrowRight size={16} className="text-amber-400" />
            </Link>
          </div>

          {/* TOOL 2: Agro-Climatic Zone Comparison Explorer (lg:col-span-6) */}
          <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 border border-white/10 bg-[#06180E]/90 backdrop-blur-xl flex flex-col justify-between gap-6 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400">
                  MALAWI AGRO-ECOLOGY
                </span>
                <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase">
                  DCCMS & FAO
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                  <Layers size={22} />
                </div>
                <div>
                  <h3 className="serif text-xl sm:text-2xl font-bold text-white">
                    Regional Agro-Climatic Matrix
                  </h3>
                  <p className="text-xs text-slate-400 font-sans">
                    Pedology, companion crops, and elevation benchmarks
                  </p>
                </div>
              </div>

              {/* Zone Tab Selector */}
              <div className="flex flex-wrap gap-1.5 bg-slate-950/70 p-1.5 rounded-2xl border border-white/10">
                {Object.keys(REGIONAL_WEATHER_DATA).map((distKey) => (
                  <button
                    key={distKey}
                    type="button"
                    onClick={() => setActiveZoneTab(distKey)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer",
                      activeZoneTab === distKey
                        ? "bg-emerald-600 text-white font-black shadow-sm"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {distKey}
                  </button>
                ))}
              </div>

              {/* Active Zone Detail Card */}
              {(() => {
                const zone = REGIONAL_WEATHER_DATA[activeZoneTab];
                return (
                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-white/10 flex flex-col gap-3">
                    <div className="flex justify-between items-center text-xs font-mono border-b border-white/10 pb-2">
                      <span className="text-amber-300 font-black">{zone.name}</span>
                      <span className="text-slate-300">{zone.elevation}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono uppercase text-slate-400">Soil Classification:</span>
                      <span className="text-xs font-bold text-emerald-300 font-mono">{zone.soilType}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono uppercase text-slate-400">Recommended Staple & Orchard Guilds:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {zone.primaryCrops.map((crop, idx) => (
                          <span 
                            key={idx}
                            className="bg-emerald-950/60 text-emerald-200 border border-emerald-500/30 px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-semibold"
                          >
                            {crop}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            <Link
              to="/where"
              className="bg-emerald-900/40 hover:bg-emerald-900/60 text-emerald-200 font-bold px-5 py-3 rounded-2xl text-xs uppercase tracking-wider transition-all flex items-center justify-between border border-emerald-500/40 font-mono"
            >
              <span>Explore Full Land Matrix & Customary Acts</span>
              <ArrowRight size={16} className="text-emerald-400" />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SIGNATURE KATONDO SOIL & WATER STRATA BLUEPRINT                        */}
      {/* ========================================================================= */}
      <section className="pt-2">
        <SoilStrataBlueprint />
      </section>

      {/* ========================================================================= */}
      {/* 7. WHY COUNTRY LIVING: THEOLOGICAL & PRACTICAL PHILOSOPHY                 */}
      {/* ========================================================================= */}
      <section className="pt-2">
        <WhyCountryLivingFeaturette />
      </section>

      {/* ========================================================================= */}
      {/* 8. PUSHED TO LAST: THE EXODUS RELOCATION LEDGER (9-PHASE ROADMAP)         */}
      {/* ========================================================================= */}
      <section className="flex flex-col gap-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/30 pb-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-amber-400">
              04 • FINAL MILESTONE ROADMAP
            </span>
            <h2 className="serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#FAF8F5] tracking-tight">
              The Exodus Relocation Ledger
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 font-sans">
              9-phase structured checklist from city exit to permanent highland sanctuary establishment
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-full">
              {completedCount} of {totalCount} Steps ({progressPct}%)
            </span>
            <Link
              to="/tracker"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <span>Full Ledger</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* Big Progress Bar */}
        <div className="h-4 w-full bg-slate-950 rounded-full overflow-hidden p-[2px] border border-amber-500/30 shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-amber-500 rounded-full transition-all duration-700 shadow-md" 
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Milestone Steps Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trackerSteps.slice(0, 3).map((step: any, idx: number) => (
            <div 
              key={step.id || idx}
              className="bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-xl"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-400 font-bold uppercase tracking-wider">Phase 0{idx + 1}</span>
                  <span className="text-slate-400 text-[10px]">
                    {step.subtasks?.filter((s: any) => s.completed).length || 0} / {step.subtasks?.length || 0}
                  </span>
                </div>
                <h4 className="serif text-base font-bold text-white">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {step.description}
                </p>

                {/* Subtask Checkboxes */}
                <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                  {step.subtasks?.slice(0, 3).map((sub: any) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => handleToggleSubtask(step.id, sub.id)}
                      className={cn(
                        "text-left text-xs p-2 rounded-xl border transition-all flex items-start gap-2.5 cursor-pointer font-sans",
                        sub.completed
                          ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/30 line-through opacity-80"
                          : "bg-slate-900 text-slate-200 border-white/5 hover:border-amber-400/40"
                      )}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                        sub.completed 
                          ? "bg-emerald-500 border-emerald-400 text-slate-950" 
                          : "border-slate-500 bg-slate-800"
                      )}>
                        {sub.completed && <Check size={12} className="stroke-[3]" />}
                      </div>
                      <span className="line-clamp-2 leading-tight">{sub.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Link
                to="/tracker"
                className="text-xs font-mono text-amber-300 hover:text-amber-200 flex items-center gap-1 mt-1 underline underline-offset-4"
              >
                <span>View all subtasks in Phase 0{idx + 1}</span>
                <ChevronRight size={12} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. DAILY DEVOTIONAL & SPIRITUAL SANCTUARY ANCHOR                          */}
      {/* ========================================================================= */}
      <section 
        className="relative text-white p-6 sm:p-8 md:p-10 rounded-[2.25rem] border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(4, 29, 16, 0.96), rgba(7, 24, 14, 0.90), rgba(4, 29, 16, 0.96)), url(${COUNTRY_IMAGES.homesteadHighlands})`
        }}
      >
        <div className="flex flex-col gap-3 text-left w-full relative z-10">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-amber-400 shrink-0" />
              <span className="text-amber-300 uppercase tracking-[0.2em] text-[10px] font-mono font-black bg-amber-500/20 border border-amber-500/30 px-3.5 py-1 rounded-full">
                Daily Devotional • {devotional.theme}
              </span>
            </div>

            <button 
              type="button"
              onClick={shareDevotional}
              className="p-2.5 rounded-xl bg-black/50 hover:bg-amber-500 hover:text-slate-950 text-amber-300 transition-all border border-amber-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer shrink-0"
              title="Share Devotional Counsel"
            >
              <Share2 size={16} />
            </button>
          </div>

          {/* Elegant Callout Block */}
          <div className="border-l-3 border-amber-400 bg-amber-500/10 p-5 rounded-r-2xl mt-1">
            <blockquote className="font-serif text-base sm:text-lg italic text-amber-100/95 leading-relaxed">
              "{devotional.text}"
            </blockquote>
            <cite className="not-italic text-xs uppercase tracking-wider text-amber-400/90 mt-3 font-mono font-black block">
              — {devotional.source}
            </cite>
          </div>
        </div>
      </section>

    </div>
  );
}
