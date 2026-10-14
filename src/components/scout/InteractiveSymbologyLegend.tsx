import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplets, Sprout, Users, ChevronDown, ChevronUp, 
  Eye, EyeOff, Sparkles, Check, Info, ShieldCheck, 
  Mountain, Compass, Waves, Crosshair, ArrowRight, ExternalLink,
  Church, HeartPulse, Home
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InteractiveSymbologyLegendProps {
  showWaterSources?: boolean;
  showArableLand?: boolean;
  showCommunitySettlements?: boolean;
  onToggleWaterSources?: (active: boolean) => void;
  onToggleArableLand?: (active: boolean) => void;
  onToggleCommunitySettlements?: (active: boolean) => void;
  onSelectDistrictFocus?: (districtName: string) => void;
  className?: string;
  isCompact?: boolean;
}

type LegendCategory = 'all' | 'water' | 'arable' | 'community';

interface SymbologyItem {
  id: string;
  category: 'water' | 'arable' | 'community';
  name: string;
  layerName: string;
  isLayerActive: boolean;
  toggleLayer?: () => void;
  symbolPreview: React.ReactNode;
  summary: string;
  technicalSpecs: {
    label: string;
    value: string;
  }[];
  homesteadApplication: string;
  keyRegions: string[];
}

export function InteractiveSymbologyLegend({
  showWaterSources = true,
  showArableLand = true,
  showCommunitySettlements = true,
  onToggleWaterSources,
  onToggleArableLand,
  onToggleCommunitySettlements,
  onSelectDistrictFocus,
  className,
  isCompact = false
}: InteractiveSymbologyLegendProps) {
  const [activeCategory, setActiveCategory] = useState<LegendCategory>('all');
  const [expandedItemId, setExpandedItemId] = useState<string | null>('river-channel');
  const [searchFilter, setSearchFilter] = useState('');

  // Comprehensive symbology definitions for Water Sources, Arable Land, and Community Settlements
  const symbologyData: SymbologyItem[] = [
    // -------------------------------------------------------------------------
    // 1. WATER SOURCES SYMBOLOGY
    // -------------------------------------------------------------------------
    {
      id: 'river-channel',
      category: 'water',
      name: 'Perennial River & Living Stream Ribbon',
      layerName: 'Water Sources',
      isLayerActive: showWaterSources,
      toggleLayer: () => onToggleWaterSources?.(!showWaterSources),
      symbolPreview: (
        <div className="w-16 h-8 flex items-center justify-center relative overflow-hidden rounded-md bg-slate-950/80 border border-cyan-500/30">
          {/* Riparian halo glow */}
          <div className="w-14 h-4 bg-cyan-500/25 blur-[2px] rounded-full absolute" />
          {/* Main stream line */}
          <div className="w-14 h-1.5 bg-cyan-400 rounded-full relative" />
          {/* Crystalline core highlight */}
          <div className="w-12 h-0.5 bg-white rounded-full relative" />
        </div>
      ),
      summary: 'Perennial stream corridors with continuous year-round flow fed by mountain headwaters.',
      technicalSpecs: [
        { label: 'Flow Regime', value: 'Perennial (12 months uninterrupted)' },
        { label: 'Cartography', value: '3-tier azure vector with riparian glow' },
        { label: 'Piping Potential', value: 'Natural gravity intake (zero electricity required)' }
      ],
      homesteadApplication: 'Ideal for establishing a gravity-fed micro-hydro pipe intake upstream from your sanctuary homestead, delivering pure drinking and irrigation water without diesel generators.',
      keyRegions: ['Dedza Highland (Linthipe)', 'Nkhotakota (Bua River)', 'Shire River Catchments', 'Rumphi (South Rukuru)']
    },
    {
      id: 'dambo-wetland',
      category: 'water',
      name: 'Alluvial Dambo & Wetland Sponge',
      layerName: 'Water Sources',
      isLayerActive: showWaterSources,
      toggleLayer: () => onToggleWaterSources?.(!showWaterSources),
      symbolPreview: (
        <div className="w-16 h-8 flex items-center justify-center relative rounded-md bg-slate-950/80 border border-sky-500/30">
          <div className="w-14 h-3 bg-sky-500/20 rounded-full absolute" />
          <div className="w-14 h-1 border-t-2 border-dotted border-sky-300 relative" />
          <span className="absolute text-caption font-mono text-sky-200 bottom-0.5 right-1">&lt;15m</span>
        </div>
      ),
      summary: 'Broad, grass-covered valley depressions that store wet-season precipitation like subterranean sponges.',
      technicalSpecs: [
        { label: 'Water Table', value: 'Shallow (3m to 12m depth)' },
        { label: 'Cartography', value: 'Dotted cyan contours with hydric boundary' },
        { label: 'Soil Organic Matter', value: 'High humic dambo peat' }
      ],
      homesteadApplication: 'Build dry-season "Dimba" relay gardens on the upper dambo margin to cultivate leafy greens, beans, and sweet potatoes throughout the dry months (August to November).',
      keyRegions: ['Lilongwe West Plains', 'Mchinji Dambo Network', 'Ntcheu Valleys', 'Kasungu Plains']
    },
    {
      id: 'aquifer-depth-indicator',
      category: 'water',
      name: 'Groundwater Aquifer Depth Badges',
      layerName: 'Water Sources',
      isLayerActive: showWaterSources,
      toggleLayer: () => onToggleWaterSources?.(!showWaterSources),
      symbolPreview: (
        <div className="w-16 h-8 flex items-center justify-center gap-1 rounded-md bg-slate-950/80 border border-white/10 px-1">
          <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 border border-emerald-300 text-caption font-bold text-slate-950 flex items-center justify-center">S</span>
          <span className="w-3.5 h-3.5 rounded-full bg-amber-500 border border-amber-300 text-caption font-bold text-slate-950 flex items-center justify-center">M</span>
          <span className="w-3.5 h-3.5 rounded-full bg-rose-500 border border-rose-300 text-caption font-bold text-white flex items-center justify-center">D</span>
        </div>
      ),
      summary: 'Borehole drilling difficulty and static water table depth based on geological catchment surveys.',
      technicalSpecs: [
        { label: 'Green Badge', value: 'Shallow aquifer (<15m) · Low drilling cost' },
        { label: 'Amber Badge', value: 'Moderate depth (15m–30m) · Standard solar pump' },
        { label: 'Red Badge', value: 'Deep basement rock (>30m) · Specialized rig' }
      ],
      homesteadApplication: 'Identifies whether your land can be served by a hand-dug protected well or if a 6-inch solar-powered submersible borehole is required.',
      keyRegions: ['Salima Lakeshore (<15m)', 'Thyolo / Mulanje (15-25m)', 'Chitipa Plateau (>30m)']
    },

    // -------------------------------------------------------------------------
    // 2. ARABLE LAND SYMBOLOGY
    // -------------------------------------------------------------------------
    {
      id: 'katondo-soil',
      category: 'arable',
      name: 'Katondo Deep Red Loam (Ferrallitic Latosol)',
      layerName: 'Arable Land',
      isLayerActive: showArableLand,
      toggleLayer: () => onToggleArableLand?.(!showArableLand),
      symbolPreview: (
        <div className="w-16 h-8 flex items-center justify-center relative rounded-md bg-[#2d120a] border border-amber-600/50 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-amber-700/60 via-red-900/70 to-emerald-950/40" />
          <div className="absolute inset-0 border border-dashed border-amber-400/40" />
          <span className="absolute text-caption font-mono font-bold text-amber-200">pH 6.2</span>
        </div>
      ),
      summary: 'Premier agricultural soil of Malawi. Deep, highly weathered, well-drained red clay loam with excellent structure.',
      technicalSpecs: [
        { label: 'Pedology', value: 'Ferrallitic Latosol / Rhodic Ferralsol' },
        { label: 'Soil pH Range', value: '5.8 to 6.5 (optimal nutrient uptake)' },
        { label: 'Effective Depth', value: '>1.5 meters deep root room' }
      ],
      homesteadApplication: 'The highest priority soil for permanent family orchards: avocado (Hass/Fuerte), macadamia, mango, citrus, plus grain legumes and heirloom maize with organic compost mulch.',
      keyRegions: ['Dedza Bembeke', 'Ntcheu Lizulu', 'Thyolo Tea-Escarpment', 'Zomba Slopes', 'Viphya Highlands']
    },
    {
      id: 'thermal-belt',
      category: 'arable',
      name: 'Frost-Free Highland Thermal Belt (1,200m–1,600m)',
      layerName: 'Arable Land',
      isLayerActive: showArableLand,
      toggleLayer: () => onToggleArableLand?.(!showArableLand),
      symbolPreview: (
        <div className="w-16 h-8 flex items-center justify-center relative rounded-md bg-slate-950/80 border border-emerald-500/40">
          <div className="w-14 h-4 bg-emerald-500/20 rounded-sm absolute" />
          <div className="w-14 h-1.5 bg-emerald-400 rounded-sm relative" />
          <span className="absolute text-caption font-mono text-emerald-200 bottom-0.5">1400m</span>
        </div>
      ),
      summary: 'Thermal inversion ridges situated safely above valley cold-air drainage zones where frost never settles.',
      technicalSpecs: [
        { label: 'Elevation Tier', value: '1,200m – 1,600m above sea level' },
        { label: 'Average Summer Temp', value: '23°C – 27°C (temperate pleasant)' },
        { label: 'Frost Frequency', value: '0% probability (inversion safe)' }
      ],
      homesteadApplication: 'Homestead and greenhouse siting location of choice. Avoids winter night frost damage to bananas, avocados, and tender nightshades while benefiting from cool mountain breeze.',
      keyRegions: ['Dedza Mountain Foothills', 'Kirk Range (Ntcheu)', 'Misuku Hills (Chitipa)', 'Viphya South']
    },
    {
      id: 'contour-swale',
      category: 'arable',
      name: 'Elevation Contours & Terracing Lines',
      layerName: 'Arable Land',
      isLayerActive: showArableLand,
      toggleLayer: () => onToggleArableLand?.(!showArableLand),
      symbolPreview: (
        <div className="w-16 h-8 flex flex-col justify-center gap-1 items-center rounded-md bg-slate-950/80 border border-amber-500/30">
          <div className="w-12 h-0.5 bg-amber-400" />
          <div className="w-14 h-0.5 bg-amber-300" />
          <div className="w-10 h-0.5 bg-amber-500" />
        </div>
      ),
      summary: 'Accurate elevation index lines providing keyline water harvesting and agroforestry swale alignment.',
      technicalSpecs: [
        { label: 'Vertical Interval', value: '20m standard contour index' },
        { label: 'Erosion Prevention', value: 'Vetiver hedge / Swale bund guideline' },
        { label: 'Slope Guidance', value: 'Terrace required above 12% grade' }
      ],
      homesteadApplication: 'Dig your rainwater-harvesting swales along these contours and plant Vetiver grass (Nsezi) on the lower mound to capture 100% of monsoonal rainfall on your land.',
      keyRegions: ['Kirk Range Escarpments', 'Dowa Hills', 'Phalombe Highlands']
    },

    // -------------------------------------------------------------------------
    // 3. COMMUNITY SETTLEMENTS SYMBOLOGY
    // -------------------------------------------------------------------------
    {
      id: 'sda-church',
      category: 'community',
      name: 'Adventist Church Outpost & Company Pin',
      layerName: 'Community Settlements',
      isLayerActive: showCommunitySettlements,
      toggleLayer: () => onToggleCommunitySettlements?.(!showCommunitySettlements),
      symbolPreview: (
        <div className="w-16 h-8 flex items-center justify-center rounded-md bg-amber-950/70 border border-amber-400/50 shadow-sm">
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center">
            <Church size={16} strokeWidth={1.75} className="text-amber-300" />
          </div>
        </div>
      ),
      summary: 'Seventh-day Adventist churches, branch Sabbath schools, and organized company outposts in rural Malawi.',
      technicalSpecs: [
        { label: 'Worship Cycle', value: 'Every 7th-day Sabbath fellowship' },
        { label: 'Affiliation', value: 'Malawi Union Conference (MUC)' },
        { label: 'Outpost Function', value: 'Spiritual fellowship & community outreach' }
      ],
      homesteadApplication: 'Enables your family to find a warm, faith-affirming fellowship within walking or cycling distance (3–10 km) while preserving secluded privacy on your country property.',
      keyRegions: ['Malamulo Mission (Makwasa)', 'Matandani Mission', 'Lakeview (Falinya)', 'Luzi Outpost (Rumphi)', 'Dedza Adventist Companies']
    },
    {
      id: 'sanitarium-clinic',
      category: 'community',
      name: 'Sanitarium & Health Ministry Outpost',
      layerName: 'Community Settlements',
      isLayerActive: showCommunitySettlements,
      toggleLayer: () => onToggleCommunitySettlements?.(!showCommunitySettlements),
      symbolPreview: (
        <div className="w-16 h-8 flex items-center justify-center rounded-md bg-teal-950/70 border border-teal-400/50 shadow-sm">
          <div className="w-6 h-6 rounded-lg bg-teal-500/20 border border-teal-400 flex items-center justify-center">
            <HeartPulse size={16} strokeWidth={1.75} className="text-teal-300" />
          </div>
        </div>
      ),
      summary: 'Rural lifestyle wellness centers, herbal health dispensaries, and missionary clinical posts.',
      technicalSpecs: [
        { label: 'Service Scope', value: 'Natural hygiene, hydrotherapy, maternal health' },
        { label: 'Mission Focus', value: 'Medical missionary right arm of the gospel' },
        { label: 'Staffing', value: 'Missionary nurses, herbalists & health educators' }
      ],
      homesteadApplication: 'Offers emergency medical security and collaborative lifestyle health ministry opportunities where your family can serve neighboring rural villages.',
      keyRegions: ['Malamulo Hospital & College', 'Mwami / Mchinji Border Posts', 'Chitipa Mission Dispensary']
    },
    {
      id: 'homestead-cluster',
      category: 'community',
      name: 'Country Living Homestead Settlement Cluster',
      layerName: 'Community Settlements',
      isLayerActive: showCommunitySettlements,
      toggleLayer: () => onToggleCommunitySettlements?.(!showCommunitySettlements),
      symbolPreview: (
        <div className="w-16 h-8 flex items-center justify-center rounded-md bg-emerald-950/70 border border-emerald-400/50 shadow-sm">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-400 flex items-center justify-center">
            <Home size={16} strokeWidth={1.75} className="text-emerald-300" />
          </div>
        </div>
      ),
      summary: 'Decentralized rural settlements of like-minded Christian families seeking self-sufficiency and mutual aid.',
      technicalSpecs: [
        { label: 'Plot Sizes', value: '2 to 25 Acres customary/leasehold' },
        { label: 'Energy & Water', value: '100% off-grid solar, rainwater & springs' },
        { label: 'Distance from City', value: '15km to 45km buffer from major bomas' }
      ],
      homesteadApplication: 'Connects you with fellow stewards for collective seed exchanges, borehole pump drilling cooperatives, and joint produce marketing to distant cities.',
      keyRegions: ['Linthipe Valley Outposts', 'Chongoni Forest Margins', 'Viphya Slopes', 'Zomba Highland Rim']
    },
    {
      id: 'sanctuary-buffer',
      category: 'community',
      name: 'Peaceful Sanctuary Urban Buffer Zone',
      layerName: 'Community Settlements',
      isLayerActive: showCommunitySettlements,
      toggleLayer: () => onToggleCommunitySettlements?.(!showCommunitySettlements),
      symbolPreview: (
        <div className="w-16 h-8 flex items-center justify-center rounded-md bg-slate-950/80 border border-amber-500/40 relative">
          <div className="w-12 h-6 rounded-full border border-dashed border-amber-400/60 flex items-center justify-center">
            <span className="text-caption font-mono text-amber-300">25km</span>
          </div>
        </div>
      ),
      summary: 'Safe geographic distance outside congested urban centers, following the Adventist country living counsel.',
      technicalSpecs: [
        { label: 'Counseled Distance', value: 'Beyond city borders, near feeder road' },
        { label: 'Air & Sound Quality', value: 'Zero industrial smog & low decibels' },
        { label: 'Moral Environment', value: 'Simplicity and purity for raising children' }
      ],
      homesteadApplication: 'Protects family life from urban temptations, labor strife, and food supply disruptions while remaining close enough to minister to the cities as outposts.',
      keyRegions: ['Dedza rural hinterland', 'Ntcheu rural plains', 'Nkhata Bay rural ridges', 'Rumphi hills']
    }
  ];

  // Filter items by category and search
  const filteredItems = symbologyData.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchFilter === '' || 
      item.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.keyRegions.some(r => r.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={cn("flex flex-col text-slate-200 select-none", className)}>
      {/* Category Filter Segmented Control */}
      <div className="flex items-center gap-1 p-1 bg-slate-950/80 border border-white/10 rounded-xl">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={cn(
            "flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer",
            activeCategory === 'all'
              ? "bg-slate-800 text-white shadow-xs"
              : "text-slate-400 hover:text-white"
          )}
        >
          All (8)
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('water')}
          className={cn(
            "flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer",
            activeCategory === 'water'
              ? "bg-cyan-950/80 text-cyan-200 border border-cyan-500/40 shadow-xs"
              : "text-cyan-400/80 hover:text-cyan-200"
          )}
        >
          <Droplets size={12} className="text-cyan-400" />
          <span>Water</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('arable')}
          className={cn(
            "flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer",
            activeCategory === 'arable'
              ? "bg-emerald-950/80 text-emerald-200 border border-emerald-500/40 shadow-xs"
              : "text-emerald-400/80 hover:text-emerald-200"
          )}
        >
          <Sprout size={12} className="text-emerald-400" />
          <span>Arable</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('community')}
          className={cn(
            "flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer",
            activeCategory === 'community'
              ? "bg-amber-950/80 text-amber-200 border border-amber-500/40 shadow-xs"
              : "text-amber-400/80 hover:text-amber-200"
          )}
        >
          <Users size={12} className="text-amber-400" />
          <span>Community</span>
        </button>
      </div>

      {/* Layer Visibility Quick Badges */}
      <div className="flex items-center justify-between text-caption text-slate-400 pt-2 pb-1 px-1">
        <span className="font-mono uppercase tracking-wider text-caption text-slate-400 font-bold">
          Layer Symbology & Guide
        </span>
        <div className="flex items-center gap-2 font-mono text-caption">
          <span className="flex items-center gap-1">
            <span className={cn("w-2 h-2 rounded-full", showWaterSources ? "bg-cyan-400" : "bg-slate-700")} />
            <span>Water</span>
          </span>
          <span className="flex items-center gap-1">
            <span className={cn("w-2 h-2 rounded-full", showArableLand ? "bg-emerald-400" : "bg-slate-700")} />
            <span>Arable</span>
          </span>
          <span className="flex items-center gap-1">
            <span className={cn("w-2 h-2 rounded-full", showCommunitySettlements ? "bg-amber-400" : "bg-slate-700")} />
            <span>Outpost</span>
          </span>
        </div>
      </div>

      {/* Interactive Symbology Item Cards */}
      <div className="flex flex-col gap-2 max-h-[380px] overflow-y-auto pr-1 mt-1 scrollbar-thin scrollbar-thumb-slate-700">
        {filteredItems.map((item) => {
          const isExpanded = expandedItemId === item.id;
          
          return (
            <div
              key={item.id}
              className={cn(
                "rounded-xl border transition-all duration-200 overflow-hidden",
                isExpanded
                  ? "bg-slate-900/95 border-white/20 shadow-lg"
                  : "bg-slate-900/40 border-white/5 hover:border-white/15"
              )}
            >
              {/* Header Row: Symbol swatch + Name + Toggle */}
              <div
                onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                className="p-2.5 flex items-center justify-between gap-2.5 cursor-pointer hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Cartographic Symbol Vector Swatch */}
                  <div className="shrink-0 shadow-sm">
                    {item.symbolPreview}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white tracking-tight truncate">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-caption text-slate-400 font-sans truncate">
                      {item.summary}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Layer Status & Toggle Button */}
                  {item.toggleLayer && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        item.toggleLayer?.();
                      }}
                      className={cn(
                        "px-2 py-1 rounded-md text-caption font-mono font-semibold flex items-center gap-1 border transition-all cursor-pointer",
                        item.isLayerActive
                          ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-300"
                          : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
                      )}
                      title={`Toggle ${item.layerName} visibility on map`}
                    >
                      {item.isLayerActive ? <Eye size={10} /> : <EyeOff size={10} />}
                      <span className="hidden sm:inline">{item.isLayerActive ? 'Active' : 'Off'}</span>
                    </button>
                  )}

                  <div className="w-5 h-5 flex items-center justify-center text-slate-400">
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </div>
              </div>

              {/* Expandable Deep Inspection Panel */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-white/10 bg-slate-950/60 p-3 flex flex-col gap-2.5 text-xs"
                  >
                    {/* Technical Specifications Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2 rounded-lg bg-slate-900/80 border border-white/5 font-mono text-caption">
                      {item.technicalSpecs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex flex-col">
                          <span className="text-slate-400 uppercase">{spec.label}</span>
                          <span className="text-white font-semibold mt-0.5">{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Practical Homestead Advice Box */}
                    <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-2">
                      <div className="w-5 h-5 rounded-md bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0 text-emerald-300 mt-0.5">
                        <Sparkles size={11} className="text-amber-300" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-caption font-bold uppercase tracking-wider text-emerald-300">
                          Homestead Siting Application:
                        </span>
                        <p className="text-caption text-slate-200 leading-relaxed font-sans">
                          {item.homesteadApplication}
                        </p>
                      </div>
                    </div>

                    {/* Key Regions in Malawi */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-caption font-mono text-slate-400 mr-1">
                        Prime Districts:
                      </span>
                      {item.keyRegions.map((reg, rIdx) => (
                        <button
                          key={rIdx}
                          type="button"
                          onClick={() => onSelectDistrictFocus?.(reg)}
                          className="px-2 py-0.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-caption font-mono border border-white/10 transition-colors cursor-pointer"
                        >
                          {reg}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Cartographic Visual Conventions & District Badges */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col gap-2.5 text-xs">
          <div className="flex items-center gap-2 border-b border-white/10 pb-1.5">
            <Compass size={13} className="text-amber-400" />
            <span className="font-bold text-white font-mono uppercase tracking-wider text-caption">
              Cartographic Conventions &amp; Ratings
            </span>
          </div>

          <div className="flex flex-col gap-2 text-caption">
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full border-2 border-dashed border-amber-400 bg-slate-950/70 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300">Dashed Outline:</strong>
                <span className="text-slate-300 ml-1">Dashed = illustrative example, not a listing</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full bg-slate-900 border border-amber-400 flex items-center justify-center text-[9px] font-black text-amber-300 shrink-0 mt-0.5">
                A+
              </div>
              <div>
                <strong className="text-amber-300">Grade Letters (A+, A, B+):</strong>
                <span className="text-slate-300 ml-1">Outpost Agro-Feasibility Rating based on rainfall (&gt;900mm), arable Katondo loam soil, and water security.</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="px-1 py-0.5 rounded bg-sky-950/80 border border-sky-400/50 text-[9px] font-mono font-bold text-sky-300 shrink-0 mt-0.5">
                15m
              </div>
              <div>
                <strong className="text-sky-300">"15m" Depth:</strong>
                <span className="text-slate-300 ml-1">Median static groundwater / aquifer depth to water table for borehole or shallow well drilling.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
