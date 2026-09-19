import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, CloudRain, Thermometer, Wind, Compass, MapPin, Calculator, 
  CheckCircle2, Sprout, ArrowRight, Share2, Sparkles, 
  BookOpen, Droplets, Calendar, Hammer, 
  SlidersHorizontal, Search, Check, ChevronRight, Zap, ShieldCheck
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { DEVOTIONAL_QUOTES } from '@/data/content';
import { useAuth } from '@/contexts/AuthContext';
import { COUNTRY_IMAGES } from '@/assets/images';
import { getStoredTrackerData } from '@/lib/offlineStorage';
import { cn } from '@/lib/utils';
import { HomesteadAdvisorModal } from '@/components/advisor/HomesteadAdvisorModal';

// Regional Weather & Telemetry Datasets for Malawi Operations
const REGIONAL_WEATHER_DATA: { [key: string]: {
  name: string;
  elevation: string;
  temp: string;
  condition: string;
  humidity: string;
  wind: string;
  solarIrradiance: string;
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
    groundwaterDepth: '15 - 35m',
    primaryCrops: ['Irish Potatoes', 'Apples & Peaches', 'Soybeans', 'Temperate Veggies'],
    soilType: 'Katondo Ferruginous Clay-Loam (pH 5.8 - 6.4)',
    advice: 'Optimal temperature window for Katondo trench composting and ridge building before rain onset.'
  },
  'Lilongwe': {
    name: 'Lilongwe Central Plain',
    elevation: '1,050m',
    temp: '25°C',
    condition: 'Clear & High Solar',
    humidity: '50%',
    wind: '10 km/h SE',
    solarIrradiance: '6.5 kWh/m²',
    groundwaterDepth: '25 - 45m',
    primaryCrops: ['Maize', 'Groundnuts', 'Sunflower', 'Cowpeas'],
    soilType: 'Sandy Clay Loam (pH 6.0 - 6.5)',
    advice: 'Peak solar pumping window between 10am and 3pm. Ideal for grain drying & borehole yield testing.'
  },
  'Zomba': {
    name: 'Zomba Plateau & Basin',
    elevation: '1,400m - 2,087m',
    temp: '23°C',
    condition: 'Plateau Mist & Perennial Springs',
    humidity: '72%',
    wind: '16 km/h NE',
    solarIrradiance: '5.9 kWh/m²',
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
    groundwaterDepth: '6 - 18m (Shallow Aquifer)',
    primaryCrops: ['Mangoes', 'Papaya', 'Rice', 'Cassava & Sugarcane'],
    soilType: 'Alluvial Loams & Dambo Clays (pH 6.5 - 7.2)',
    advice: 'Shallow groundwater table stable (< 18m). Ensure thick vetiver mulch layers on garden beds.'
  }
};

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Active quick console tab: 'districts' | 'sizer' | 'seasons' | 'advisor'
  const [activeTab, setActiveTab] = useState<'districts' | 'sizer' | 'seasons' | 'advisor'>('districts');
  
  // Selected District for Live Weather & Micro-Climate Telemetry
  const [selectedDistrict, setSelectedDistrict] = useState<string>(user?.district || 'Dedza');
  const currentWeather = REGIONAL_WEATHER_DATA[selectedDistrict] || REGIONAL_WEATHER_DATA['Dedza'];

  // Devotional state
  const [devotionalIndex, setDevotionalIndex] = useState(0);
  const devotional = DEVOTIONAL_QUOTES[devotionalIndex % DEVOTIONAL_QUOTES.length];
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // AI Advisor Modal trigger
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);

  // Rapid Sizing Tool State (Interactive Solar Water Calculator)
  const [calcDepth, setCalcDepth] = useState<number>(35); // meters
  const [calcDemand, setCalcDemand] = useState<number>(3000); // L/day

  // Tracker Progress State
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(9);

  // Search input state for fast jump
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Quote calculation by day of year
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    setDevotionalIndex(dayOfYear % DEVOTIONAL_QUOTES.length);

    // Read real exodus tracker progress
    try {
      const parsed = getStoredTrackerData();
      if (parsed && Array.isArray(parsed)) {
        let done = 0;
        let total = 0;
        parsed.forEach((step: any) => {
          step.subtasks?.forEach((sub: any) => {
            total++;
            if (sub.completed) done++;
          });
        });
        setCompletedCount(done);
        setTotalCount(total || 9);
      }
    } catch (e) {
      console.warn('Could not read tracker data:', e);
    }
  }, []);

  const handleNextDevotional = () => {
    setDevotionalIndex(prev => prev + 1);
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
        setToastMessage('Copied reflection to clipboard');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
      });
    } else {
      navigator.clipboard.writeText(text);
      setToastMessage('Copied reflection to clipboard');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes('map') || q.includes('gps') || q.includes('scout')) {
      navigate('/scout-map');
    } else if (q.includes('where') || q.includes('district') || q.includes('land')) {
      navigate('/where');
    } else if (q.includes('crop') || q.includes('soil') || q.includes('maize') || q.includes('plant')) {
      navigate('/what');
    } else if (q.includes('season') || q.includes('almanac') || q.includes('rain') || q.includes('calendar')) {
      navigate('/seasons');
    } else if (q.includes('calc') || q.includes('solar') || q.includes('borehole') || q.includes('pump') || q.includes('water')) {
      navigate('/calculators');
    } else if (q.includes('skill') || q.includes('compost') || q.includes('build')) {
      navigate('/skills');
    } else if (q.includes('guide') || q.includes('how') || q.includes('customary') || q.includes('tracker')) {
      navigate('/how');
    } else {
      setIsAdvisorModalOpen(true);
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

  // Detect current season in Malawi
  const currentMonth = new Date().getMonth() + 1; // 1-12
  const seasonInfo = useMemo(() => {
    if (currentMonth >= 11 || currentMonth <= 3) {
      return {
        name: 'Nyengo ya Mvula (Rainy Season)',
        window: 'November to March',
        status: 'Active Rainy Season',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10 border-emerald-500/30',
        focus: 'Active growth phase. Manage weed pressure, apply fermented Katondo manure tea, and monitor contour bunds (misozi) for water pooling.'
      };
    } else if (currentMonth >= 4 && currentMonth <= 8) {
      return {
        name: 'Nyengo ya Mpepo (Cool Dry Season)',
        window: 'April to August',
        status: 'Harvest & Winter Dambo Planting',
        color: 'text-sky-400',
        bg: 'bg-sky-500/10 border-sky-500/30',
        focus: 'Staple grain drying, granary aeration, and planting off-season winter vegetables in wetlands (madambo) or with drip irrigation.'
      };
    } else {
      return {
        name: 'Nyengo ya Chirimwe (Hot Dry Season)',
        window: 'September to October',
        status: 'Land Preparation & Swale Digging',
        color: 'text-amber-400',
        bg: 'bg-amber-500/10 border-amber-500/30',
        focus: 'Peak season for digging compost trenches, establishing tree planting pits, reinforcing borehole solar arrays, and gathering mulch.'
      };
    }
  }, [currentMonth]);

  return (
    <div className="flex flex-col gap-10 sm:gap-14 md:gap-16 pb-20 text-slate-100 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
      
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
      {/* 1. CALM, HIGH-IMPACT HERO & FAST DIRECTORY SEARCH                          */}
      {/* ========================================================================= */}
      <section 
        className="relative rounded-3xl p-6 sm:p-10 md:p-12 border border-white/10 shadow-2xl overflow-hidden flex flex-col gap-6 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(4, 25, 14, 0.94), rgba(6, 20, 12, 0.92), rgba(4, 25, 14, 0.98)), url(${COUNTRY_IMAGES.mountainVista})`
        }}
      >
        <div className="relative z-10 flex flex-col gap-5 max-w-3xl">
          
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full font-mono font-black uppercase text-[11px] tracking-widest flex items-center gap-1.5">
              <Compass size={13} className="text-amber-400" />
              <span>MALAWI HOMESTEAD & SANCTUARY TOOLKIT</span>
            </span>
            <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full font-mono font-bold uppercase text-[11px] tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>28 Districts • Offline GIS Ready</span>
            </span>
          </div>

          {/* Clean Editorial Title */}
          <div className="flex flex-col gap-1.5">
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-[#FAF8F5] leading-tight tracking-tight">
              OUTPOST: <span className="italic font-normal text-amber-300">COUNTRY LIVING</span>
            </h1>
            <p className="text-emerald-100/90 text-sm sm:text-base md:text-lg font-medium leading-relaxed mt-1">
              A comprehensive field manual & engineering toolkit for scouting customary land, dimensioning off-grid solar & water, planting Katondo food forests, and building self-reliant homesteads across Malawi.
            </p>
          </div>

          {/* Fast Search & Command Bar */}
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xl mt-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search districts, solar tools, crops, or skills..."
              className="w-full pl-11 pr-24 py-3 sm:py-3.5 rounded-2xl bg-slate-950/80 border border-white/20 text-sm text-white placeholder-slate-400 font-sans focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Explore
            </button>
          </form>

          {/* Quick-Jump Shortcut Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Link
              to="/where"
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono font-medium transition-colors flex items-center gap-1.5"
            >
              <MapPin size={12} className="text-amber-400" />
              <span>28 Districts</span>
            </Link>
            <Link
              to="/scout-map"
              className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 hover:text-white border border-amber-500/30 text-xs font-mono font-bold transition-colors flex items-center gap-1.5"
            >
              <Compass size={12} className="text-amber-400" />
              <span>GPS Scout Map</span>
            </Link>
            <Link
              to="/calculators"
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono font-medium transition-colors flex items-center gap-1.5"
            >
              <Calculator size={12} className="text-sky-400" />
              <span>Solar & Water Sizers</span>
            </Link>
            <button
              type="button"
              onClick={() => setIsAdvisorModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-mono font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles size={12} className="text-emerald-400" />
              <span>Ask AI Advisor</span>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE 4 PRIMARY FUNCTIONAL GATEWAYS (High-Clarity Core Pillars)           */}
      {/* ========================================================================= */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Homestead Gateways
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              Choose your focus area to access maps, field manuals, and engineering calculators
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          
          {/* Pillar 1: Land Scouting */}
          <div className="bg-slate-900/70 backdrop-blur-xl border border-white/10 hover:border-amber-400/50 rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-5 transition-all group shadow-lg">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <MapPin size={20} />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
                Land & Geography
              </span>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                District & Land Scouting
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Evaluate all 28 Malawi districts by water depth, rainfall, soil fertility, and customary land acquisition procedures under Village Headmen.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-white/10 font-mono text-xs">
              <Link
                to="/where"
                className="flex items-center justify-between py-1.5 text-amber-300 hover:text-white font-bold group/link"
              >
                <span>District Comparison Matrix</span>
                <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/scout-map"
                className="flex items-center justify-between py-1.5 text-slate-400 hover:text-amber-200"
              >
                <span>Interactive GPS Map</span>
                <Compass size={14} className="text-amber-400" />
              </Link>
            </div>
          </div>

          {/* Pillar 2: Crops & Seasons */}
          <div className="bg-slate-900/70 backdrop-blur-xl border border-white/10 hover:border-emerald-400/50 rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-5 transition-all group shadow-lg">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Sprout size={20} />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
                Agronomy & Seasons
              </span>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                Crops & Seasonal Almanac
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Malawian staple crops (*Chimanga*, *Nyemba*, *Mbatata*), permaculture companion guilds, and month-by-month planting cycles.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-white/10 font-mono text-xs">
              <Link
                to="/seasons"
                className="flex items-center justify-between py-1.5 text-emerald-300 hover:text-white font-bold group/link"
              >
                <span>12-Month Farming Almanac</span>
                <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/what"
                className="flex items-center justify-between py-1.5 text-slate-400 hover:text-emerald-200"
              >
                <span>Malawi Crop & Soil Guide</span>
                <Calendar size={14} className="text-emerald-400" />
              </Link>
            </div>
          </div>

          {/* Pillar 3: Calculators */}
          <div className="bg-slate-900/70 backdrop-blur-xl border border-white/10 hover:border-sky-400/50 rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-5 transition-all group shadow-lg">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Calculator size={20} />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sky-400">
                Engineering Tools
              </span>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                Off-Grid Calculators
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Accurate mathematical dimensioning for solar borehole pumps, rooftop rainwater cisterns, solar battery banks, and stabilized bricks.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-white/10 font-mono text-xs">
              <Link
                to="/calculators"
                className="flex items-center justify-between py-1.5 text-sky-300 hover:text-white font-bold group/link"
              >
                <span>Solar Borehole & Water Sizers</span>
                <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/calculators"
                className="flex items-center justify-between py-1.5 text-slate-400 hover:text-sky-200"
              >
                <span>Battery & Brick Calculators</span>
                <Zap size={14} className="text-sky-400" />
              </Link>
            </div>
          </div>

          {/* Pillar 4: Practical Skills */}
          <div className="bg-slate-900/70 backdrop-blur-xl border border-white/10 hover:border-amber-400/50 rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-5 transition-all group shadow-lg">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Hammer size={20} />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
                Field Manuals
              </span>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                25 Homestead Skills
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Hands-on guides for trench composting, gravity plumbing, food dehydration, seed saving, and executing the 3-stage relocation roadmap.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-white/10 font-mono text-xs">
              <Link
                to="/skills"
                className="flex items-center justify-between py-1.5 text-amber-300 hover:text-white font-bold group/link"
              >
                <span>25 Practical Masterclasses</span>
                <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/how"
                className="flex items-center justify-between py-1.5 text-slate-400 hover:text-amber-200"
              >
                <span>3-Stage Relocation Guide</span>
                <BookOpen size={14} className="text-amber-400" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE QUICK-START CONSOLE (Tabbed, focused, zero clutter)         */}
      {/* ========================================================================= */}
      <section className="bg-slate-950/80 border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col gap-6">
        
        {/* Console Header & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-amber-400" />
            <span className="font-serif text-lg sm:text-xl font-bold text-white">
              Quick Homestead Console
            </span>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-white/10 overflow-x-auto custom-scrollbar">
            <button
              onClick={() => setActiveTab('districts')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer",
                activeTab === 'districts'
                  ? "bg-amber-500 text-slate-950 shadow-sm font-black"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              )}
            >
              🗺️ Districts
            </button>
            <button
              onClick={() => setActiveTab('sizer')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer",
                activeTab === 'sizer'
                  ? "bg-amber-500 text-slate-950 shadow-sm font-black"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              )}
            >
              ⚡ Borehole Sizer
            </button>
            <button
              onClick={() => setActiveTab('seasons')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer",
                activeTab === 'seasons'
                  ? "bg-amber-500 text-slate-950 shadow-sm font-black"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              )}
            >
              📅 Season Guide
            </button>
            <button
              onClick={() => setActiveTab('advisor')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer",
                activeTab === 'advisor'
                  ? "bg-amber-500 text-slate-950 shadow-sm font-black"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              )}
            >
              ✨ Ask AI
            </button>
          </div>
        </div>

        {/* TAB 1: DISTRICTS PREVIEW */}
        {activeTab === 'districts' && (
          <div className="flex flex-col gap-5">
            {/* District Selector Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-400 mr-1">Select District:</span>
              {Object.keys(REGIONAL_WEATHER_DATA).map((distKey) => (
                <button
                  key={distKey}
                  onClick={() => setSelectedDistrict(distKey)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border",
                    selectedDistrict === distKey
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-xs"
                      : "bg-slate-900 text-slate-300 border-white/10 hover:border-white/20"
                  )}
                >
                  {distKey}
                </button>
              ))}
            </div>

            {/* Selected District Telemetry Card */}
            <div className="bg-slate-900/90 rounded-2xl p-5 border border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-mono text-slate-400">Location & Elevation</span>
                <span className="font-serif text-lg font-bold text-white">{currentWeather.name}</span>
                <span className="text-xs font-mono text-amber-300">{currentWeather.elevation}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-mono text-slate-400">Groundwater Depth</span>
                <span className="font-serif text-lg font-bold text-emerald-400">{currentWeather.groundwaterDepth}</span>
                <span className="text-xs font-mono text-slate-300">Aquifer Potential: High</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-mono text-slate-400">Soil Character</span>
                <span className="text-xs font-sans text-slate-200 font-medium leading-tight">{currentWeather.soilType}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-mono text-slate-400">Top Crops</span>
                <span className="text-xs font-sans text-amber-200 font-medium leading-tight">
                  {currentWeather.primaryCrops.join(', ')}
                </span>
              </div>
            </div>

            {/* Agronomic Advice Callout */}
            <div className="bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <Sprout size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-100 font-sans leading-relaxed">
                  <strong className="text-emerald-300">Seasonal Advice:</strong> {currentWeather.advice}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to="/scout-map"
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold transition-colors inline-flex items-center gap-1"
                >
                  <span>Scout on Map</span>
                  <ArrowRight size={13} />
                </Link>
                <Link
                  to="/where"
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-mono text-xs transition-colors"
                >
                  All 28 Districts
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RAPID BOREHOLE SIZER */}
        {activeTab === 'sizer' && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Sliders Box */}
              <div className="flex flex-col gap-5 bg-slate-900/80 p-5 rounded-2xl border border-white/10">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300 font-bold">Borehole Depth (Meters):</span>
                    <span className="text-amber-300 font-black text-sm">{calcDepth} m</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={calcDepth}
                    onChange={(e) => setCalcDepth(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>10m (Dambo shallow)</span>
                    <span>50m (Plateau avg)</span>
                    <span>100m (Highland deep)</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300 font-bold">Daily Water Demand (Liters):</span>
                    <span className="text-emerald-300 font-black text-sm">{calcDemand.toLocaleString()} L/day</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="500"
                    value={calcDemand}
                    onChange={(e) => setCalcDemand(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>500L (Cottage)</span>
                    <span>3,000L (Homestead)</span>
                    <span>10,000L (Farm & Orchard)</span>
                  </div>
                </div>
              </div>

              {/* Instant Output Card */}
              <div className="bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 p-5 rounded-2xl border border-amber-500/30 flex flex-col justify-between gap-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-amber-400" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                      Solar PV Dimensioning Result
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    5 Peak Sun Hours
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-white/10">
                    <span className="text-[10px] font-mono text-slate-400 block">Required Solar</span>
                    <span className="font-mono text-lg sm:text-xl font-black text-amber-300">{calculatedWattage} W</span>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-white/10">
                    <span className="text-[10px] font-mono text-slate-400 block">Panels (200W)</span>
                    <span className="font-mono text-lg sm:text-xl font-black text-emerald-400">{calculatedPanels} pcs</span>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-white/10">
                    <span className="text-[10px] font-mono text-slate-400 block">Flow Rate</span>
                    <span className="font-mono text-lg sm:text-xl font-black text-sky-400">{calculatedPumpRate} L/m</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-sans text-slate-300">
                    Need cistern sizing or battery math?
                  </span>
                  <Link
                    to="/calculators"
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold transition-colors inline-flex items-center gap-1"
                  >
                    <span>Full Calculators Suite</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: SEASON GUIDE */}
        {activeTab === 'seasons' && (
          <div className="flex flex-col gap-4">
            <div className={cn("p-5 rounded-2xl border flex flex-col gap-3", seasonInfo.bg)}>
              <div className="flex items-center justify-between">
                <span className={cn("text-xs font-mono font-bold uppercase tracking-widest", seasonInfo.color)}>
                  {seasonInfo.status}
                </span>
                <span className="text-xs font-mono text-slate-400 bg-black/40 px-2.5 py-1 rounded-full border border-white/10">
                  {seasonInfo.window}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-white">
                {seasonInfo.name}
              </h3>

              <p className="text-sm text-slate-200 leading-relaxed font-sans">
                {seasonInfo.focus}
              </p>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-white/10">
              <span className="text-xs font-mono text-slate-300">
                Explore month-by-month Malawi planting dates, rainfall statistics, and harvesting windows:
              </span>
              <Link
                to="/seasons"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold transition-colors inline-flex items-center gap-1 shrink-0"
              >
                <span>View Full Almanac</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        )}

        {/* TAB 4: ASK AI ADVISOR */}
        {activeTab === 'advisor' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                Select a high-value question or ask anything about country living in Malawi:
              </span>
              <button
                onClick={() => setIsAdvisorModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Sparkles size={14} />
                <span>Open Chat Assistant</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans text-xs">
              <button
                onClick={() => setIsAdvisorModalOpen(true)}
                className="p-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-left border border-white/10 hover:border-amber-400/50 transition-all group flex items-start justify-between gap-3 cursor-pointer"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-white group-hover:text-amber-300">
                    Which districts have perennial spring water?
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    Guidance on high-elevation gravity flow springs in Dedza, Zomba, and Rumphi.
                  </span>
                </div>
                <ChevronRight size={14} className="text-slate-400 group-hover:text-amber-400 shrink-0 mt-0.5" />
              </button>

              <button
                onClick={() => setIsAdvisorModalOpen(true)}
                className="p-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-left border border-white/10 hover:border-amber-400/50 transition-all group flex items-start justify-between gap-3 cursor-pointer"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-white group-hover:text-amber-300">
                    How do I register customary land in Malawi?
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    Steps under the Customary Land Act with Village Land Committees.
                  </span>
                </div>
                <ChevronRight size={14} className="text-slate-400 group-hover:text-amber-400 shrink-0 mt-0.5" />
              </button>

              <button
                onClick={() => setIsAdvisorModalOpen(true)}
                className="p-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-left border border-white/10 hover:border-amber-400/50 transition-all group flex items-start justify-between gap-3 cursor-pointer"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-white group-hover:text-amber-300">
                    How to amend red Katondo clay without chemicals?
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    Compost trenches, biochar, vetiver grass, and green manure crops.
                  </span>
                </div>
                <ChevronRight size={14} className="text-slate-400 group-hover:text-amber-400 shrink-0 mt-0.5" />
              </button>

              <button
                onClick={() => setIsAdvisorModalOpen(true)}
                className="p-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-left border border-white/10 hover:border-amber-400/50 transition-all group flex items-start justify-between gap-3 cursor-pointer"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-white group-hover:text-amber-300">
                    How many solar panels for a 50m borehole pump?
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    Submersible DC pump sizing, inverter selection, and head losses.
                  </span>
                </div>
                <ChevronRight size={14} className="text-slate-400 group-hover:text-amber-400 shrink-0 mt-0.5" />
              </button>
            </div>
          </div>
        )}

      </section>

      {/* ========================================================================= */}
      {/* 4. HOMESTEAD TRANSITION PROGRESS BAR (Clean & Compact)                     */}
      {/* ========================================================================= */}
      <section className="bg-slate-950/60 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span className="font-serif text-base font-bold text-white">
              Exodus Readiness Ledger
            </span>
          </div>
          <p className="text-xs text-slate-400 font-sans">
            Track your 9-phase transition from urban dependence to rural self-reliance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right">
            <span className="text-xs font-mono font-bold text-amber-300">
              {completedCount} / {totalCount} Steps ({progressPct}%)
            </span>
            <div className="w-36 sm:w-44 h-2 bg-slate-800 rounded-full overflow-hidden mt-1 border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <Link
            to="/tracker"
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 text-xs font-mono font-bold transition-colors inline-flex items-center gap-1"
          >
            <span>Open Checklist</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SPIRITUAL SANCTUARY & DEVOTIONAL REFLECTION CARD                        */}
      {/* ========================================================================= */}
      <section 
        className="relative text-white p-6 sm:p-8 rounded-3xl border border-amber-500/25 shadow-xl flex flex-col gap-4 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(4, 25, 14, 0.96), rgba(6, 20, 12, 0.90), rgba(4, 25, 14, 0.96)), url(${COUNTRY_IMAGES.homesteadHighlands})`
        }}
      >
        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-amber-400" />
              <span className="text-amber-300 uppercase tracking-widest text-[10px] font-mono font-bold bg-amber-500/20 border border-amber-500/30 px-3 py-0.5 rounded-full">
                Daily Sanctuary Devotional • {devotional.theme}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button 
                type="button"
                onClick={handleNextDevotional}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition-colors cursor-pointer"
                title="Next Daily Reflection"
              >
                Next Quote
              </button>
              <button 
                type="button"
                onClick={shareDevotional}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-amber-500 hover:text-slate-950 text-amber-300 transition-colors border border-amber-500/30 cursor-pointer"
                title="Share Reflection"
              >
                <Share2 size={14} />
              </button>
            </div>
          </div>

          <blockquote className="font-serif text-base sm:text-lg italic text-amber-100/95 leading-relaxed pl-3 border-l-2 border-amber-400 my-1">
            "{devotional.text}"
          </blockquote>

          <div className="flex items-center justify-between pt-1">
            <cite className="not-italic text-xs font-mono text-amber-400/90 font-bold">
              — {devotional.source}
            </cite>
            <Link
              to="/vision"
              className="text-xs font-mono text-emerald-300 hover:text-emerald-200 underline underline-offset-4"
            >
              Read Full Vision Blueprint →
            </Link>
          </div>
        </div>
      </section>

      {/* Embedded Advisor Modal Trigger */}
      <HomesteadAdvisorModal
        isOpen={isAdvisorModalOpen}
        onClose={() => setIsAdvisorModalOpen(false)}
      />

    </div>
  );
}
