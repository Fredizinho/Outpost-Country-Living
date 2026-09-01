import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Target, Sparkles, Sprout, Sun, Droplets, ArrowRight, ShieldCheck, RefreshCw, Compass } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { Link } from 'react-router-dom';

export function PersonalizedHomeSection() {
  const { user } = useAuth();
  const [showWizard, setShowWizard] = useState(false);

  const district = user?.district || 'Dedza';
  const region = user?.region || 'Central';
  const goal = user?.homesteadGoal || 'Self-Sufficient Organic Homestead';
  const householdSize = user?.householdSize || '3-5 Members';
  const budgetBand = user?.budgetBand || 'Standard Off-Grid';
  const timeline = user?.timeline || 'This Season';
  const isCompleted = user?.onboardingCompleted;

  // District specific climate & soil intelligence
  const getDistrictIntelligence = (distName: string, regName: string) => {
    const lower = distName.toLowerCase();
    if (lower.includes('dedza') || lower.includes('ntcheu')) {
      return {
        zone: 'Central Temperate Highlands',
        altitude: '1,400m - 1,800m',
        soil: 'Volcanic Red Clay & Humus-Rich Loam',
        water: 'High seasonal mist, mountain springs & shallow streams',
        crops: ['Peaches & Temperate Fruit', 'Solanum Potatoes', 'Bio-intensive Cabbages', 'Wheat & Maize'],
        solarAdvice: 'Higher winter cloud cover; size solar panels +20% for foggy months (June-August).'
      };
    } else if (lower.includes('mzimba') || lower.includes('rumphi') || lower.includes('chitipa')) {
      return {
        zone: 'Northern Highland Valleys',
        altitude: '1,200m - 1,600m',
        soil: 'Deep Red Ferralsols & Forest Clay',
        water: 'Perennial hill streams, Nyika plateau watersheds',
        crops: ['Macadamia & Coffee', 'Sweet Potatoes', 'Horticulture & Maize', 'Citrus'],
        solarAdvice: 'Excellent solar irradiation; 600W solar array generates ample daily power year-round.'
      };
    } else if (lower.includes('mulanje') || lower.includes('thyolo') || lower.includes('zomba')) {
      return {
        zone: 'Southern Mountain Massif',
        altitude: '900m - 1,500m',
        soil: 'Acidic Loam & Rich Granite Topsoil',
        water: 'Abundant high-rainfall streams & perennial springs',
        crops: ['Tea & Spices', 'Avocados & Passion Fruit', 'Cassava & Yams', 'Herbal Medicines'],
        solarAdvice: 'High precipitation zone; install elevated rainwater catchments alongside 800W solar pumps.'
      };
    } else if (lower.includes('salima') || lower.includes('karonga') || lower.includes('mangochi') || lower.includes('nkhotakota')) {
      return {
        zone: 'Lake Shore Alluvial Plain',
        altitude: '470m - 600m',
        soil: 'Alluvial Sand-Clay & High Water Table Soil',
        water: 'Lake Malawi aquifers, shallow boreholes (< 25m)',
        crops: ['Rice & Maize', 'Rice & Sugar Cane', 'Bananas & Mangos', 'Legumes'],
        solarAdvice: 'Maximum solar radiation year-round; ideal for direct solar borehole pumping without heavy battery loss.'
      };
    } else {
      return {
        zone: `${regName} Agricultural Plateau`,
        altitude: '1,000m - 1,300m',
        soil: 'Medium Clay Loam & Alluvial Plains',
        water: 'Boreholes (~30-45m depth) & seasonal dambos',
        crops: ['Sorghum & Groundnuts', 'Maize & Beans', 'Sunflowers', 'Garden Vegetables'],
        solarAdvice: 'Reliable sunshine; 800W array with 2.4kWh battery meets all domestic and pumping needs.'
      };
    }
  };

  const intel = getDistrictIntelligence(district, region);

  return (
    <section className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-900 rounded-[3rem] p-8 md:p-12 text-white border border-emerald-800 shadow-2xl relative overflow-hidden flex flex-col gap-8">
      {/* Glow background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-emerald-800/80 pb-6 relative z-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-terracotta-900/80 text-terracotta-200 border border-terracotta-700/80 text-[10px] font-black uppercase px-3 py-1 rounded-full flex items-center gap-1">
              <Compass size={12} className="text-terracotta-400" /> Tailored Country Blueprint
            </span>
            <span className="bg-emerald-900/80 text-emerald-300 border border-emerald-700/80 text-[10px] font-bold uppercase px-3 py-1 rounded-full flex items-center gap-1">
              <MapPin size={12} /> {district} District, {region} Region
            </span>
            <span className="bg-emerald-900/80 text-amber-300 border border-emerald-700/80 text-[10px] font-bold uppercase px-3 py-1 rounded-full flex items-center gap-1">
              {user?.familyMembers || 4} Members • {user?.landSizeAcres || 2.5} Acres
            </span>
            <span className="bg-emerald-900/80 text-sky-300 border border-emerald-700/80 text-[10px] font-bold uppercase px-3 py-1 rounded-full flex items-center gap-1">
              {user?.currentSeason || 'Rainy Planting'}
            </span>
          </div>

          <h3 className="serif text-3xl md:text-4xl font-bold mt-1 text-white">
            Custom Exodus Plan for {user?.displayName || 'Steward'}
          </h3>
          <p className="text-emerald-200/80 text-xs font-medium max-w-xl">
            Real-time recommendations tuned specifically to your target district, climate zone, family size, land acreage, and current agricultural season.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowWizard(true)}
            className="bg-emerald-800 hover:bg-emerald-700 text-white px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all border border-emerald-600 flex items-center gap-2 shadow-md active:scale-95"
          >
            <Sparkles size={16} className="text-amber-300" />
            {isCompleted ? 'Update Preferences' : 'Personalize Plan'}
          </button>
        </div>
      </div>

      {/* Main Grid: District Intelligence & Customized Strategy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* District Climate & Soil Profile */}
        <div className="bg-emerald-900/50 backdrop-blur-md p-6 rounded-[2rem] border border-emerald-700/50 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-300 text-[10px] font-black uppercase tracking-widest mb-1">
              <Sun size={14} /> District Soil & Climate
            </div>
            <h4 className="serif text-2xl font-bold text-white">{intel.zone}</h4>
            <p className="text-xs text-emerald-200/90 font-medium mt-1">Elevation: {intel.altitude}</p>
          </div>

          <div className="flex flex-col gap-2.5 text-xs">
            <div className="bg-emerald-950/80 p-3 rounded-xl border border-emerald-800">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-0.5">Topsoil & Drainage</span>
              <p className="text-emerald-100 font-medium">{intel.soil}</p>
            </div>
            <div className="bg-emerald-950/80 p-3 rounded-xl border border-emerald-800">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-0.5">Groundwater & Springs</span>
              <p className="text-emerald-100 font-medium">{intel.water}</p>
            </div>
          </div>
        </div>

        {/* Tailored Crop Recommendations */}
        <div className="bg-emerald-900/50 backdrop-blur-md p-6 rounded-[2rem] border border-emerald-700/50 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-1">
              <Sprout size={14} /> Ideal Crops for {district}
            </div>
            <h4 className="serif text-2xl font-bold text-white">Recommended Sowing</h4>
            <p className="text-xs text-emerald-200/90 font-medium mt-1">High-yield varieties for {intel.zone}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {intel.crops.map((crop) => (
              <span
                key={crop}
                className="bg-emerald-950/80 border border-emerald-700 text-emerald-200 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5"
              >
                <Sprout size={12} className="text-emerald-400" /> {crop}
              </span>
            ))}
          </div>

          <div className="bg-terracotta-950/60 border border-terracotta-800/80 p-3 rounded-xl text-xs text-terracotta-100/90">
            <strong className="text-terracotta-300 block text-[10px] uppercase tracking-wider mb-0.5">Homestead Goal Focus</strong>
            "{goal}"
          </div>
        </div>

        {/* Off-Grid System Advice & Tracker Shortcut */}
        <div className="bg-emerald-900/50 backdrop-blur-md p-6 rounded-[2rem] border border-emerald-700/50 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-300 text-[10px] font-black uppercase tracking-widest mb-1">
              <Droplets size={14} /> Off-Grid & Household Sizing
            </div>
            <h4 className="serif text-2xl font-bold text-white">Solar & Water Strategy</h4>
            <p className="text-xs text-emerald-200/90 font-medium mt-1">Configured for {householdSize} ({budgetBand})</p>
          </div>

          <p className="text-xs text-emerald-100/90 leading-relaxed bg-emerald-950/80 p-3 rounded-xl border border-emerald-800">
            {intel.solarAdvice}
          </p>

          <Link
            to="/tracker"
            className="bg-terracotta-600 hover:bg-terracotta-500 text-white p-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 border border-terracotta-500"
          >
            View My Personalized {district} Checklist <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <OnboardingWizard
        isOpen={showWizard}
        onClose={() => setShowWizard(false)}
      />
    </section>
  );
}
