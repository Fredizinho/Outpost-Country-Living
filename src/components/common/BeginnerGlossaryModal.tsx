import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  X,
  Droplets,
  Sprout,
  Sun,
  Scale,
  Compass,
  CheckCircle2,
  Search,
  MapPin,
  Calculator,
  Calendar,
  Sparkles,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { DistrictRegistryRecord } from '@/constants';
import { cn } from '@/lib/utils';

export interface GlossaryEntry {
  id: string;
  term: string;
  localOrTechnicalName: string;
  category: 'soil' | 'water' | 'land-law' | 'solar' | 'counsel' | 'chichewa';
  plainMeaning: string;
  howToRecognizeOrUse: string;
}

export const BEGINNER_GLOSSARY_ENTRIES: GlossaryEntry[] = [
  {
    id: 'katondo-luvisols',
    term: 'Red Clay-Loam Soil (Katondo)',
    localOrTechnicalName: 'FAO Chromic Luvisols / Eutric Nitisols',
    category: 'soil',
    plainMeaning: 'Deep reddish-brown soil common in Malawi’s plateaus and highlands. It holds water and nutrients well and is great for maize, beans, potatoes, and fruit trees.',
    howToRecognizeOrUse: 'When wet, you can roll it in your hand like a sausage without it crumbling. Keep it covered with dry grass mulch (chiphuphu) so it doesn’t bake hard in the sun.'
  },
  {
    id: 'makande-vertisols',
    term: 'Black Valley Clay (Makande)',
    localOrTechnicalName: 'FAO Calcic Vertisols / Eutric Fluvisols',
    category: 'soil',
    plainMeaning: 'Dark, mineral-rich soil found in flat valleys and river plains (Shire Valley, Salima, Phalombe). Very fertile, but sticky when wet and cracks open when dry.',
    howToRecognizeOrUse: 'Looks dark grey or black. Mix in plenty of compost, dry leaves, or charcoal dust (makala a m’munda / biochar) so roots can breathe and drain.'
  },
  {
    id: 'msanga-lixisols',
    term: 'Sandy Loam Soil (Msanga / Mchenga)',
    localOrTechnicalName: 'FAO Ferric Lixisols / Arenosols',
    category: 'soil',
    plainMeaning: 'Light, gritty soil that is very easy to dig with a hoe (khasu), warms up fast, and is great for groundnuts (ntedza), sweet potatoes (mbatata), and cassava (chinangwa)—but water drains out quickly.',
    howToRecognizeOrUse: 'Feels gritty between your fingers and won’t hold a tight ball when squeezed. Add compost and dig sunken planting basins (mazenje) to hold rain.'
  },
  {
    id: 'soil-ph',
    term: 'Soil pH (Sweet vs. Sour Soil)',
    localOrTechnicalName: 'pH Scale (5.0 Acidic to 7.0 Neutral)',
    category: 'soil',
    plainMeaning: 'Measures how acidic ("sour") or neutral ("sweet") the soil is. Most vegetables and fruit trees love a pH between 5.5 and 6.8.',
    howToRecognizeOrUse: 'If a district has acidic soil (below pH 5.5), simply mix 1–2 handfuls of wood ash (phalasa) from your cooking fire into each planting hole to sweeten the soil.'
  },
  {
    id: 'dambo',
    term: 'Dambo (Seasonal Valley Wetland)',
    localOrTechnicalName: 'Sub-surface Moisture Sponge (Chithaphwi)',
    category: 'water',
    plainMeaning: 'A gently sloping grassy valley floor that stays green and damp even during the dry months (May–October).',
    howToRecognizeOrUse: 'Never build your house inside a dambo (it floods in January), but having the lower edge of your land touch a dambo gives you dry-season garden moisture (dimba) and shallow wells (chitsime).'
  },
  {
    id: 'aquifer-depth',
    term: 'Aquifer Depth (Water Table)',
    localOrTechnicalName: 'FAO AQUASTAT Static Water Level (m)',
    category: 'water',
    plainMeaning: 'How deep underground you must drill a borehole (mjigo) or dig a well (chitsime) before hitting reliable year-round water.',
    howToRecognizeOrUse: 'Under 20m is shallow (affordable to pump). 25m–45m is standard for a solar borehole pump. Over 55m requires a stronger, more expensive 48V solar pump.'
  },
  {
    id: 'gravity-head',
    term: 'Elevation Drop ("Head" in Meters)',
    localOrTechnicalName: 'Hydrostatic Head (10m ≈ 1 Bar / 14 PSI)',
    category: 'water',
    plainMeaning: 'How high your water tank or mountain spring (kasupe) sits above your house and garden taps. Higher drop = stronger water pressure without electricity.',
    howToRecognizeOrUse: '10 meters (height of a 3-story building) gives gentle tap flow and fills drip lines. 25+ meters runs normal household showers and garden sprinklers.'
  },
  {
    id: 'boma',
    term: 'Boma (District Town Center)',
    localOrTechnicalName: 'District Administrative & Market Hub',
    category: 'land-law',
    plainMeaning: 'The main town center of a Malawi district where the District Commissioner (DC), Land Clerk, hospital, and main produce market (msika) are located.',
    howToRecognizeOrUse: 'Aim to settle 15–35 km outside the Boma—close enough to sell produce and buy supplies, far enough for quiet country living.'
  },
  {
    id: 'customary-estate',
    term: 'Customary Estate & Village Land Law',
    localOrTechnicalName: 'Malawi Customary Land Act (2016) / TLMA',
    category: 'land-law',
    plainMeaning: 'Rural land in Malawi is managed by Traditional Authorities (T/A) and Customary Land Committees. You do not buy it like a city shop; instead, you are allocated land and register a legal Customary Estate.',
    howToRecognizeOrUse: 'Always walk the boundary (Malire) with the Village Headman (Mfumu), Group Village Headman (GVH), AND all neighboring families before paying any survey or registration fees.'
  },
  {
    id: 'psh-solar',
    term: 'Peak Sun Hours (PSH / kWh/m²/day)',
    localOrTechnicalName: 'NASA POWER Solar Insolation',
    category: 'solar',
    plainMeaning: 'The number of hours per day when the sun is strong enough for solar panels to work at full power. Malawi has 5.4 to 6.2 hours/day—some of the best sunshine in the world.',
    howToRecognizeOrUse: 'With 5.5+ sun hours, just 4 to 6 standard solar panels (1.6kW–2.4kW) can power a family cottage’s lights, phones, laptop, and an efficient DC fridge.'
  },
  {
    id: 'egw-pit',
    term: '3×3×3 ft Orchard Pit & Biochar',
    localOrTechnicalName: 'Testimonies Vol. 3, p. 158 (Dzenje la Mtengo)',
    category: 'counsel',
    plainMeaning: 'Digging a wide, waist-deep hole (3 feet wide by 3 feet deep) for each young fruit tree and refilling it with topsoil, compost (manyowa), and crushed charcoal (makala).',
    howToRecognizeOrUse: 'Acts like an underground water sponge so young mango, avocado, and citrus trees survive Malawi’s 6-month dry season (Chilimwe) with minimal watering.'
  },
  {
    id: 'malawi-seasons-chichewa',
    term: 'Dzinja, Masika & Chilimwe (Malawi Seasons)',
    localOrTechnicalName: 'Standard Malawian Agricultural Calendar',
    category: 'chichewa',
    plainMeaning: 'Dzinja (Nov–Mar) is the main rainy planting season; Masika (Apr–May) is the cool harvest & storage season; Chilimwe (Jun–Oct) is the dry season (cool winter May–Jul with Chiperoni mists in the South, followed by hot dry land-prep Aug–Oct).',
    howToRecognizeOrUse: 'Use the Seasonal Almanac tab to match your monthly farm tasks to Dzinja (rain-fed planting), Masika (nkhokwe grain storage), and Chilimwe (dimba valley gardening & digging tree pits).'
  },
  {
    id: 'mitumbira-chiphuphu',
    term: 'Mitumbira (Ridges), Mazenje (Basins) & Chiphuphu (Mulch)',
    localOrTechnicalName: 'Ulimi wa Mtaya Khasu (Conservation Farming)',
    category: 'chichewa',
    plainMeaning: 'Mitumbira are contoured crop ridges; Mikwingwirima are water-holding contour marker bunds; Mazenje are 15×15cm Sasakawa/Zai planting pits; Chiphuphu is a thick blanket of dry grass mulch.',
    howToRecognizeOrUse: 'Instead of burning crop stalks in September, lay them across your Mitumbira or Mazenje as a 10cm Chiphuphu blanket to keep soil cool and moist.'
  },
  {
    id: 'nkhokwe-mfutso-chidulo',
    term: 'Nkhokwe (Granary), Mfutso (Dried Greens) & Chidulo',
    localOrTechnicalName: 'Traditional Malawian Harvest & Preservation',
    category: 'chichewa',
    plainMeaning: 'Nkhokwe is a raised woven granary; Matumba are 50kg grain sacks; Mfutso are blanched & sun-dried leafy greens (mpiru, khobwe, nkhwani); Chidulo is traditional plant-ash filtrate used to tenderize okra (therere) and greens.',
    howToRecognizeOrUse: 'Store dry grain in PICS hermetic bags inside your Nkhokwe with wood ash or neem leaves to stop Kafucheche (larger grain borer) and Kafumbwe (weevils).'
  }
];

export function getPlainEnglishDistrictSummary(district: DistrictRegistryRecord): {
  climateFeel: string;
  waterEase: string;
  soilPlain: string;
  beginnerVerdict: string;
} {
  // 1. Climate Feel
  let climateFeel = 'Warm plateau weather with one main rainy season (Nov–Apr).';
  if (district.agroZone === 'Highland Sanctuary') {
    climateFeel = 'Cool, refreshing mountain air (low malaria risk, great for sleeping, potatoes & fruit trees).';
  } else if (district.agroZone === 'Lakeshore Alluvial Basin') {
    climateFeel = 'Warm lakeside climate year-round—fast tropical fruit growth (mangoes, bananas, cassava, rice).';
  } else if (district.agroZone === 'Rift Valley & Wetland Floor') {
    climateFeel = 'Hot valley climate—requires heat-tolerant crops (sorghum, pigeon peas, cotton) and good shade.';
  }

  // 2. Water Ease
  let waterEase = `Moderate well depth (~${district.aquiferDepthM}m underground) and ${district.rainfallAnnualMm}mm rain/year.`;
  if (district.aquiferDepthM <= 20) {
    waterEase = `Easy water access: Shallow water table (~${district.aquiferDepthM}m deep) + ${district.rainfallAnnualMm}mm annual rain.`;
  } else if (district.rainfallAnnualMm >= 1250) {
    waterEase = `Abundant rain (${district.rainfallAnnualMm}mm/yr) with mountain streams & ~${district.aquiferDepthM}m borehole depth.`;
  }

  // 3. Soil Plain
  let soilPlain = 'Fertile red-brown loamy soil—easy to improve with grass mulch and compost.';
  const sLower = district.primarySoil.toLowerCase();
  if (sLower.includes('nitisol') || sLower.includes('acrisol')) {
    soilPlain = 'Deep red highland soil—holds moisture well; add wood ash and compost for orchards.';
  } else if (sLower.includes('fluvisol') || sLower.includes('vertisol')) {
    soilPlain = 'Rich dark valley soil—high natural nutrients; plant on raised beds during heavy rains.';
  } else if (sLower.includes('lixisol') || sLower.includes('regosol')) {
    soilPlain = 'Lighter sandy-loam soil—easy to dig by hand; needs thick dry-grass mulch to hold moisture.';
  }

  return {
    climateFeel,
    waterEase,
    soilPlain,
    beginnerVerdict: `${district.name} is a ${district.feasibilityGrade.toLowerCase()} choice in the ${district.region} Region, best suited for growing ${district.topCrops.slice(0, 3).join(', ')}.`
  };
}

interface BeginnerGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'glossary' | 'visual-guide';
}

export const VISUAL_TOOL_PATHFINDER_STEPS = [
  {
    step: '01',
    goal: 'Compare Malawi’s 28 Districts (Rainfall, Borehole Depth & Soil)',
    whereToClick: 'Top Bar → "Land & Districts" OR Homepage → "28-District Atlas"',
    chichewaContext: 'Kufufuza Maboma 28, Mvula, Madzi a pa Mjigo & Dothi (Katondo / Makande)',
    whatYouGet:
      'Plain-English summary card for every district, FAO soil classification, aquifer depth in meters, and Customary Land Act steps.',
    linkTo: '/where',
    ctaLabel: 'Open Land & Districts',
    icon: MapPin,
  },
  {
    step: '02',
    goal: 'Scout a Specific Plot with GPS, Contours & Chief Boundaries',
    whereToClick: 'Top Bar → "GPS Scout Map" OR "Land Suitability Rubric"',
    chichewaContext: 'Kuyendera Malo, Malire a Mfumu (T/A) & Maphiri',
    whatYouGet:
      'Interactive satellite/terrain map with 28 district markers, T/A customary lines (Malire), and a 100-point on-the-ground plot checklist.',
    linkTo: '/scout-map',
    ctaLabel: 'Open GPS Scout Map',
    icon: Compass,
  },
  {
    step: '03',
    goal: 'Size Solar Panels, 5,000L Water Tanks, Acreage & 50kg Maize Sacks',
    whereToClick: 'Top Bar → "Calculators & Tools" OR Homepage → "Homestead Sizer"',
    chichewaContext: 'Kuwerengera Solar, Matanki a Madzi & Matumba a Chimanga (50kg)',
    whatYouGet:
      '6 interactive calculators with one-click house roof presets, 50kg bag (Matumba) conversions, and 20L bucket/jerrycan counts.',
    linkTo: '/calculators',
    ctaLabel: 'Open Calculators & Tools',
    icon: Calculator,
  },
  {
    step: '04',
    goal: 'Check What to Plant & Prepare This Month (Dzinja, Masika, Chilimwe)',
    whereToClick: 'Top Bar → "Directory" → "Seasonal Almanac" (/seasons)',
    chichewaContext: 'Kalendala ya Ulimi: Dzinja, Masika, Chilimwe & Chiperoni',
    whatYouGet:
      'Interactive Malawi seasonal dial showing urgent monthly tasks for water, fruit trees, soil mulching (Chiphuphu), and harvest storage.',
    linkTo: '/seasons',
    ctaLabel: 'Open Seasonal Almanac',
    icon: Calendar,
  },
  {
    step: '05',
    goal: 'Look Up Malawian Crops (Chimanga, Chinangwa, Mbatata) & Soil Recipes',
    whereToClick: 'Top Bar → "Crops & Soil" (/what) OR "Homestead Guide" (/how)',
    chichewaContext: 'Mbewu za ku Malawi, Manyowa (Compost) & Mazenje a Mitengo',
    whatYouGet:
      '18 Malawian crop profiles with Chichewa names, ridge spacing (Mitumbira), companion planting, and 3×3×3 ft orchard pit diagrams.',
    linkTo: '/what',
    ctaLabel: 'Open Crops & Soil Encyclopedia',
    icon: Sprout,
  },
  {
    step: '06',
    goal: 'Ask a Custom Question or Search Any Topic Instantly',
    whereToClick: 'Top Right → "Advisor" (Sparkles) OR "Search (⌘K)"',
    chichewaContext: 'Funsani Mlangizi wa pa Mudzi kapena Sakani Chilichonse',
    whatYouGet:
      'Ask questions in plain English or Chichewa terms, or press ⌘K / click Search to jump straight to any district, crop, or EGW quote.',
    linkTo: '/tracker',
    ctaLabel: 'Open 15-Milestone Tracker',
    icon: Sparkles,
  },
];

export function BeginnerGlossaryModal({
  isOpen,
  onClose,
  initialTab = 'glossary',
}: BeginnerGlossaryModalProps) {
  const [activeMode, setActiveMode] = useState<'glossary' | 'visual-guide'>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState<'all' | GlossaryEntry['category']>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isOpen) {
      setActiveMode(initialTab);
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = BEGINNER_GLOSSARY_ENTRIES.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.term.toLowerCase().includes(q) ||
        item.localOrTechnicalName.toLowerCase().includes(q) ||
        item.plainMeaning.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Plain-English Field Glossary and Visual Tool Guide"
    >
      <div className="bg-white dark:bg-[#0D1D13] border border-stone-200 dark:border-emerald-800/70 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#0B2216] text-stone-100 border-b border-emerald-800/60 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
                <BookOpen size={14} />
                <span>VISUAL PATHFINDER & CHICHEWA / PLAIN-ENGLISH FIELD TRANSLATOR</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                How to Access Every Tool & Understand Malawi Land, Soil & Water Terms
              </h2>
              <p className="text-xs sm:text-sm text-stone-300">
                Switch between the Visual Tool Pathfinder (where to click for maps, calculators & guides) and the Plain-English / Chichewa Glossary.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Glossary"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
            >
              <X size={18} />
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setActiveMode('visual-guide')}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer',
                activeMode === 'visual-guide'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                  : 'bg-white/10 text-stone-200 hover:bg-white/20'
              )}
            >
              <Layers size={14} />
              <span>Visual Guide: Where to Find Info & Tools (6 Steps)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('glossary')}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer',
                activeMode === 'glossary'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                  : 'bg-white/10 text-stone-200 hover:bg-white/20'
              )}
            >
              <BookOpen size={14} />
              <span>Plain-English & Chichewa Glossary ({BEGINNER_GLOSSARY_ENTRIES.length} Terms)</span>
            </button>
          </div>
        </div>

        {activeMode === 'visual-guide' ? (
          <div className="p-5 sm:p-6 overflow-y-auto flex flex-col gap-5">
            {/* Visual Anatomy of the Top Navigation Bar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/80 border border-stone-200 dark:border-emerald-900/60 flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-base sm:text-lg font-bold text-stone-900 dark:text-white">
                  Visual Map of the App Header (Always at the Top of Your Screen)
                </h3>
                <span className="text-xs font-mono text-emerald-800 dark:text-emerald-300">
                  1-Click Navigation Reference
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-[#0D1D13] border border-stone-200/80 dark:border-emerald-900/50 flex flex-col gap-1">
                  <span className="font-mono font-bold text-emerald-800 dark:text-amber-300">
                    1. Center 5 Tabs
                  </span>
                  <span className="text-stone-600 dark:text-stone-300">
                    Jump directly to <strong>Land & Districts</strong>, <strong>GPS Scout Map</strong>, <strong>Crops & Soil</strong>, <strong>Homestead Guide</strong>, or <strong>Calculators</strong>.
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#0D1D13] border border-stone-200/80 dark:border-emerald-900/50 flex flex-col gap-1">
                  <span className="font-mono font-bold text-emerald-800 dark:text-amber-300">
                    2. Search (⌘K or /)
                  </span>
                  <span className="text-stone-600 dark:text-stone-300">
                    Type any district (e.g. <em>Dedza</em>), crop (<em>Chimanga</em>), or topic (<em>borehole</em>) to open it immediately.
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#0D1D13] border border-stone-200/80 dark:border-emerald-900/50 flex flex-col gap-1">
                  <span className="font-mono font-bold text-emerald-800 dark:text-amber-300">
                    3. Advisor Button
                  </span>
                  <span className="text-stone-600 dark:text-stone-300">
                    Ask custom questions about your family size, soil pH, or Malawi customary land steps.
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#0D1D13] border border-stone-200/80 dark:border-emerald-900/50 flex flex-col gap-1">
                  <span className="font-mono font-bold text-emerald-800 dark:text-amber-300">
                    4. Directory Drawer
                  </span>
                  <span className="text-stone-600 dark:text-stone-300">
                    Opens the full 4-Pillar menu (Devotionals, Seasonal Almanac, 25 Skills, Blueprints, Offline Vault).
                  </span>
                </div>
              </div>
            </div>

            {/* 6 Task-to-Tool Visual Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {VISUAL_TOOL_PATHFINDER_STEPS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/90 dark:border-emerald-900/50 flex flex-col justify-between gap-3"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800 dark:text-amber-300">
                          <Icon size={14} />
                          <span>PATHWAY {item.step}</span>
                        </span>
                        <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                          {item.chichewaContext}
                        </span>
                      </div>

                      <h4 className="font-display text-base font-bold text-stone-900 dark:text-white">
                        {item.goal}
                      </h4>

                      <div className="p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/50 border border-emerald-200/70 dark:border-emerald-800/50 text-xs text-emerald-950 dark:text-emerald-200">
                        <strong>Where to Click: </strong>
                        {item.whereToClick}
                      </div>

                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                        {item.whatYouGet}
                      </p>
                    </div>

                    <Link
                      to={item.linkTo}
                      onClick={onClose}
                      className="inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                    >
                      <span>{item.ctaLabel}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            {/* Category Filter & Search */}
            <div className="p-4 bg-stone-50 dark:bg-stone-900/90 border-b border-stone-200 dark:border-emerald-900/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: `All Terms (${BEGINNER_GLOSSARY_ENTRIES.length})` },
                  { id: 'chichewa', label: 'Chichewa Farm Terms' },
                  { id: 'soil', label: 'Soil & pH' },
                  { id: 'water', label: 'Wells & Water' },
                  { id: 'land-law', label: 'Chiefs & Land Law' },
                  { id: 'solar', label: 'Solar Power' },
                  { id: 'counsel', label: 'Planting Pits' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id as any)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer',
                      selectedCategory === cat.id
                        ? 'bg-emerald-800 text-white dark:bg-emerald-700'
                        : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-emerald-900/50 hover:bg-stone-100'
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="relative sm:w-56">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search (e.g. dambo, dzinja, pH)..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-emerald-900/60 text-xs text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Glossary Cards List */}
            <div className="p-5 sm:p-6 overflow-y-auto flex flex-col gap-3.5">
              {filtered.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/90 dark:border-emerald-900/50 flex flex-col gap-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-base sm:text-lg font-bold text-stone-900 dark:text-white">
                      {entry.term}
                    </h3>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-emerald-100/80 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                      Technical / Local: {entry.localOrTechnicalName}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-200 leading-relaxed">
                    <strong className="text-stone-900 dark:text-white">In Plain English: </strong>
                    {entry.plainMeaning}
                  </p>

                  <div className="p-3 rounded-xl bg-white dark:bg-[#0D1D13] border border-stone-200/70 dark:border-emerald-900/40 text-xs text-emerald-950 dark:text-emerald-200 flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>How to Use This on the Ground: </strong>
                      {entry.howToRecognizeOrUse}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Footer */}
        <div className="p-4 bg-stone-50 dark:bg-stone-900/90 border-t border-stone-200 dark:border-emerald-900/50 flex items-center justify-between gap-3">
          <span className="text-xs text-stone-500 dark:text-stone-400">
            Tip: Press ⌘K (or click Search in the top bar) anytime to jump to any district, crop, or calculator.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Got It, Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
