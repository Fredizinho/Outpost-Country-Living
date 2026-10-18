import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Droplets, 
  MapPin, 
  ShieldCheck, 
  Sparkles,
  Info,
  Sun,
  Flame,
  Check,
  Compass
} from 'lucide-react';
import { useActiveHomesteadDistrict } from '@/lib/activeDistrictSync';
import { DISTRICT_LIST } from '@/data/dataRegistry';
import { COUNTRY_IMAGES } from '@/assets/images';
import { cn } from '@/lib/utils';

// Approximate astronomical sunset times in Malawi (CAT / UTC+2) by month (0=Jan .. 11=Dec)
const MALAWI_SUNSET_BY_MONTH: Record<
  number,
  { north: string; central: string; south: string; guard: string }
> = {
  0: { north: '18:16', central: '18:19', south: '18:23', guard: '17:49' },
  1: { north: '18:12', central: '18:13', south: '18:15', guard: '17:43' },
  2: { north: '17:59', central: '17:58', south: '17:57', guard: '17:28' },
  3: { north: '17:43', central: '17:39', south: '17:36', guard: '17:09' },
  4: { north: '17:34', central: '17:28', south: '17:22', guard: '16:58' },
  5: { north: '17:35', central: '17:27', south: '17:20', guard: '16:57' },
  6: { north: '17:41', central: '17:34', south: '17:28', guard: '17:04' },
  7: { north: '17:46', central: '17:42', south: '17:38', guard: '17:12' },
  8: { north: '17:47', central: '17:45', south: '17:43', guard: '17:15' },
  9: { north: '17:49', central: '17:50', south: '17:51', guard: '17:20' },
  10: { north: '17:58', central: '18:01', south: '18:04', guard: '17:31' },
  11: { north: '18:11', central: '18:15', south: '18:19', guard: '17:45' },
};

// 8 Stages of the Country Living Journey (from Start@1x1.png)
export interface JourneyStageItem {
  id: number;
  label: string;
  status: 'completed' | 'active' | 'upcoming';
  description: string;
  tasksDone: number;
  tasksTotal: number;
}

const JOURNEY_STAGES: JourneyStageItem[] = [
  { 
    id: 1, 
    label: 'Dream', 
    status: 'completed',
    description: 'Vision of country living, Spirit of Prophecy study & family unity',
    tasksDone: 6,
    tasksTotal: 6
  },
  { 
    id: 2, 
    label: 'Discern', 
    status: 'completed',
    description: 'Prayer, debt elimination & agricultural suitability evaluation',
    tasksDone: 5,
    tasksTotal: 5
  },
  { 
    id: 3, 
    label: 'Acquire', 
    status: 'completed',
    description: 'Customary tenure agreement, TA blessing & boundary cadastral map',
    tasksDone: 7,
    tasksTotal: 7
  },
  { 
    id: 4, 
    label: 'Prepare', 
    status: 'active', // Stage 4 of 8 · Prepare
    description: 'Water source testing, contour swales, soil testing & seed preservation',
    tasksDone: 4,
    tasksTotal: 6
  },
  { 
    id: 5, 
    label: 'Build', 
    status: 'upcoming',
    description: 'Off-grid passive solar dwelling, rammed earth & rainwater cistern',
    tasksDone: 0,
    tasksTotal: 8
  },
  { 
    id: 6, 
    label: 'Grow', 
    status: 'upcoming',
    description: 'Bio-intensive orchard guilds, deep planting pits & perennial staple crops',
    tasksDone: 0,
    tasksTotal: 7
  },
  { 
    id: 7, 
    label: 'Sustain', 
    status: 'upcoming',
    description: 'Micro-hydraulics, food dehydration, pantry root cellaring & herbal remedies',
    tasksDone: 0,
    tasksTotal: 6
  },
  { 
    id: 8, 
    label: 'Serve', 
    status: 'upcoming',
    description: 'Community outpost dispensary, agriculture demonstrations & missionary labor',
    tasksDone: 0,
    tasksTotal: 5
  },
];

// 12 Months Data for "The year at a glance" (Start@1x1.png)
// Blue: rainy months (J, F, M, A, N, D), Gold: dry months (M, J, J, A, S, O). Outlined: now (O).
const YEAR_AT_A_GLANCE_MONTHS = [
  { 
    letter: 'J', 
    name: 'January', 
    heightPct: 76, 
    type: 'rainy', 
    rainfall: '240 mm', 
    season: 'Peak Rainy Season',
    advisory: 'Maintain swale spillways, weed companion beds, monitor fungal risk'
  },
  { 
    letter: 'F', 
    name: 'February', 
    heightPct: 92, 
    type: 'rainy', 
    rainfall: '280 mm', 
    season: 'Heavy Monsoonal Rain',
    advisory: 'Water catchment tanks at maximum capacity; thin fruit clusters'
  },
  { 
    letter: 'M', 
    name: 'March', 
    heightPct: 84, 
    type: 'rainy', 
    rainfall: '220 mm', 
    season: 'Late Rains & Grain Filling',
    advisory: 'Corn tasseling and bean pods maturing; prepare drying racks'
  },
  { 
    letter: 'A', 
    name: 'April', 
    heightPct: 48, 
    type: 'rainy', 
    rainfall: '70 mm', 
    season: 'Harvest & Early Drying',
    advisory: 'Main harvest of maize and legumes; begin biochar pyrolysis'
  },
  { 
    letter: 'M', 
    name: 'May', 
    heightPct: 20, 
    type: 'dry', 
    rainfall: '18 mm', 
    season: 'Cold Dry Season Begins',
    advisory: 'Plant garlic, onions and winter brassicas in dambo gardens'
  },
  { 
    letter: 'J', 
    name: 'June', 
    heightPct: 12, 
    type: 'dry', 
    rainfall: '8 mm', 
    season: 'Mid-Winter Frost Watch',
    advisory: 'Highland ridges frost risk; mulch tree bases with vetiver straw'
  },
  { 
    letter: 'J', 
    name: 'July', 
    heightPct: 10, 
    type: 'dry', 
    rainfall: '5 mm', 
    season: 'Dry Winter Solar Storage',
    advisory: 'Solar drying of fruits and wild greens; inspect irrigation ram pump'
  },
  { 
    letter: 'A', 
    name: 'August', 
    heightPct: 8, 
    type: 'dry', 
    rainfall: '4 mm', 
    season: 'Hot Dry Season Starts',
    advisory: 'Clear firebreaks around homestead boundary; prune fruit trees'
  },
  { 
    letter: 'S', 
    name: 'September', 
    heightPct: 12, 
    type: 'dry', 
    rainfall: '7 mm', 
    season: 'Pit Excavation & Compost',
    advisory: 'Excavate 60x60cm planting pits; charge compost with wood ash'
  },
  { 
    letter: 'O', 
    name: 'October', 
    heightPct: 18, 
    type: 'dry', 
    rainfall: '22 mm', 
    season: 'Hot Dry Prep (Now)', 
    isCurrent: true,
    advisory: 'Mulch, mend gutters, store seeds and prepare for early rains'
  },
  { 
    letter: 'N', 
    name: 'November', 
    heightPct: 48, 
    type: 'rainy', 
    rainfall: '95 mm', 
    season: 'First Early Rains (Chizimalupsya)',
    advisory: 'First soaking rains; plant open-pollinated seed varieties immediately'
  },
  { 
    letter: 'D', 
    name: 'December', 
    heightPct: 80, 
    type: 'rainy', 
    rainfall: '210 mm', 
    season: 'Full Planting & Emergence',
    advisory: 'Intercrop pumpkins and cowpeas; check rooftop filtration screens'
  },
];

export interface DesktopWorkspaceStartScreenProps {
  onOpenSearch?: () => void;
}

export function DesktopWorkspaceStartScreen({ onOpenSearch }: DesktopWorkspaceStartScreenProps) {
  const navigate = useNavigate();
  const [activeDistrictId] = useActiveHomesteadDistrict('dedza');
  const [hoveredMonth, setHoveredMonth] = useState<typeof YEAR_AT_A_GLANCE_MONTHS[0] | null>(null);
  const [hoveredStage, setHoveredStage] = useState<JourneyStageItem | null>(null);

  const activeDistrict = useMemo(() => {
    return DISTRICT_LIST.find((d) => d.id === activeDistrictId) || DISTRICT_LIST[0];
  }, [activeDistrictId]);

  const sunsetInfo = useMemo(() => {
    const month = new Date().getMonth();
    const table = MALAWI_SUNSET_BY_MONTH[month] || MALAWI_SUNSET_BY_MONTH[9];
    const region = (activeDistrict.region || 'Central').toLowerCase();
    const time = region.includes('north')
      ? table.north
      : region.includes('south')
      ? table.south
      : table.central;
    return {
      time,
      guard: table.guard,
      regionName: activeDistrict.region || 'Central',
    };
  }, [activeDistrict]);

  // Dynamic calculation for Sabbath countdown
  const sabbathStatus = useMemo(() => {
    const now = new Date();
    const day = now.getDay(); // 0=Sun, 5=Fri, 6=Sat
    const [hours, minutes] = sunsetInfo.time.split(':').map(Number);
    
    // Check if currently within Sabbath (Friday sunset through Saturday sunset)
    const isFridayAfterSunset = day === 5 && (now.getHours() > hours || (now.getHours() === hours && now.getMinutes() >= minutes));
    const isSaturdayBeforeSunset = day === 6 && (now.getHours() < hours || (now.getHours() === hours && now.getMinutes() < minutes));
    const isSabbathNow = isFridayAfterSunset || isSaturdayBeforeSunset;

    let daysToFriday = (5 - day + 7) % 7;
    if (daysToFriday === 0 && (now.getHours() > hours || (now.getHours() === hours && now.getMinutes() >= minutes))) {
      daysToFriday = 7;
    }

    return {
      isSabbathNow,
      daysToFriday,
      sunsetTime: sunsetInfo.time,
      guardTime: sunsetInfo.guard,
    };
  }, [sunsetInfo]);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-4.5 py-3 select-text font-chrome text-[13px] text-[#1F2A22] dark:text-[#EBF2EC] transition-colors duration-200">
      
      {/* =====================================================================
          1. TOP PANORAMIC HERO BANNER (Matches Start@1x1.png)
      ===================================================================== */}
      <section className="relative w-full rounded-[10px] overflow-hidden shadow-xs border border-[#E4DCCB] dark:border-[#283C30] group transition-all duration-300 hover:shadow-md hover:border-[#C8BFAC] dark:hover:border-[#3E5848]">
        {/* Background Photograph */}
        <div className="relative h-[210px] sm:h-[240px] md:h-[260px] w-full overflow-hidden bg-[#16261C]">
          <img
            src={COUNTRY_IMAGES.ruralIndustrialSanctuary}
            alt="Country Living Homestead with Solar Array and Garden"
            className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          />
          {/* Subtle cinematic gradient overlay for high contrast readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25 dark:from-black/92 dark:via-black/72 dark:to-black/45" />
        </div>

        {/* Top-Right Badge: "Illustrative image" */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <span className="px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-black/65 text-[#1F2A22] dark:text-white text-[11px] font-medium backdrop-blur-xs shadow-2xs border border-white/20 transition-all duration-150 hover:bg-white dark:hover:bg-black/85 cursor-default">
            Illustrative image
          </span>
        </div>

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 z-10 p-5 sm:p-7 md:p-8 flex flex-col justify-end gap-3 text-white">
          <div className="flex flex-col gap-1.5 max-w-xl">
            {/* Eyebrow */}
            <span className="text-[12px] font-medium text-amber-200/95 tracking-wide drop-shadow-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>This season · Hot dry preparation</span>
            </span>

            {/* Serif Title in Fraunces */}
            <h1 className="font-serif text-2xl sm:text-3xl md:text-[34px] font-bold text-white leading-tight drop-shadow-sm">
              Mulch, mend and store before the rains
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            {/* Primary Terracotta Button: "Open the almanac" */}
            <Link
              to="/seasons"
              className="px-4 py-2 rounded-control bg-[#B4531F] dark:bg-[#D3672E] hover:bg-[#9c4518] dark:hover:bg-[#B4531F] text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] inline-flex items-center gap-1.5 group/btn cursor-pointer"
            >
              <span>Open the almanac</span>
              <ArrowRight size={13} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />
            </Link>

            {/* Secondary Outline/Translucent Button: "Plan my week" */}
            <Link
              to="/tracker"
              className="px-4 py-2 rounded-control bg-white/20 hover:bg-white/30 dark:bg-white/15 dark:hover:bg-white/25 backdrop-blur-xs text-white border border-white/30 hover:border-white/50 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Plan my week</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. LOWER 2x2 GRID (Matches Start@1x1.png)
      ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* ===================================================================
            CARD 1 (TOP LEFT - 7 COLS): "Your journey"
        =================================================================== */}
        <div className="lg:col-span-7 rounded-card bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] p-5 shadow-xs transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-[#C8BFAC] dark:hover:border-[#3E5848] flex flex-col justify-between gap-5 relative">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-xl font-bold text-[#1F2A22] dark:text-[#EBF2EC]">
                Your journey
              </h2>
            </div>
            <Link
              to="/tracker"
              className="text-xs text-[#5A6458] dark:text-[#8E9E92] hover:text-[#B4531F] dark:hover:text-[#D3672E] font-medium transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Stage 4 of 8 · Prepare</span>
              <ArrowRight size={11} />
            </Link>
          </div>

          {/* Stepper Track with 8 Stages */}
          <div className="relative py-3">
            {/* Connecting Baseline */}
            <div className="absolute top-[23px] left-4 right-4 h-[2px] bg-[#E4DCCB] dark:bg-[#283C30] -z-0">
              {/* Completed Line Segment (Stages 1 to 4) */}
              <div 
                className="h-full bg-[#3F6B4E] dark:bg-[#4E8761] transition-all duration-500 ease-out" 
                style={{ width: '43%' }}
              />
            </div>

            {/* 8 Stage Nodes */}
            <div className="flex items-start justify-between relative z-10 px-0.5">
              {JOURNEY_STAGES.map((stage) => {
                const isCompleted = stage.status === 'completed';
                const isActive = stage.status === 'active';

                return (
                  <div
                    key={stage.id}
                    className="flex flex-col items-center gap-2 group cursor-pointer relative"
                    onMouseEnter={() => setHoveredStage(stage)}
                    onMouseLeave={() => setHoveredStage(null)}
                    onClick={() => navigate(`/tracker?stage=${stage.id}`)}
                  >
                    {/* Circle Node with tactile hover state */}
                    <div
                      className={cn(
                        'w-[24px] h-[24px] rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-125 select-none relative',
                        isCompleted && 'bg-[#3F6B4E] dark:bg-[#4E8761] text-white shadow-xs',
                        isActive && 'bg-[#FFFDF8] dark:bg-[#17241C] border-2 border-[#B4531F] dark:border-[#D3672E] text-[#B4531F] dark:text-[#D3672E] shadow-xs ring-4 ring-[#B4531F]/15 dark:ring-[#D3672E]/20',
                        !isCompleted && !isActive && 'bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] group-hover:border-[#5A6458]'
                      )}
                    >
                      {isCompleted && (
                        <Check size={13} className="text-white stroke-[2.5]" />
                      )}
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-[#B4531F] dark:bg-[#D3672E] animate-pulse" />
                      )}
                    </div>

                    {/* Stage Label */}
                    <span
                      className={cn(
                        'text-[11px] transition-all duration-150',
                        isActive
                          ? 'font-bold text-[#B4531F] dark:text-[#D3672E] scale-105'
                          : isCompleted
                          ? 'font-medium text-[#1F2A22] dark:text-[#EBF2EC] group-hover:text-[#3F6B4E]'
                          : 'text-[#5A6458] dark:text-[#8E9E92] group-hover:text-[#1F2A22] dark:group-hover:text-[#EBF2EC]'
                      )}
                    >
                      {stage.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Floating Tooltip Card for Hovered Stage */}
            {hoveredStage && (
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-16 sm:-bottom-14 z-30 pointer-events-none px-3.5 py-2 rounded-[6px] bg-[#16261C] dark:bg-[#0E1712] text-white border border-[#2B4636] text-[11.5px] shadow-xl max-w-sm w-full mx-auto flex items-center justify-between gap-3 animate-in fade-in duration-150">
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#C98A1B]">
                      Stage {hoveredStage.id} · {hoveredStage.label}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 uppercase tracking-wider font-mono">
                      {hoveredStage.status === 'completed' ? 'Completed' : hoveredStage.status === 'active' ? 'Active' : 'Upcoming'}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-300 truncate">
                    {hoveredStage.description}
                  </p>
                </div>
                <span className="text-[10.5px] text-[#C98A1B] shrink-0 font-medium">
                  Click to open →
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ===================================================================
            CARD 2 (TOP RIGHT - 5 COLS): "Continue"
        =================================================================== */}
        <div className="lg:col-span-5 rounded-card bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] p-5 shadow-xs transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-[#C8BFAC] dark:hover:border-[#3E5848] flex items-center gap-4 sm:gap-5 group">
          {/* Circular Progress Gauge */}
          <div className="relative w-[58px] h-[58px] shrink-0 group-hover:scale-105 transition-transform duration-300">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 58 58">
              {/* Background Track */}
              <circle
                cx="29"
                cy="29"
                r="23"
                stroke="currentColor"
                strokeWidth="4.5"
                fill="none"
                className="text-[#E4DCCB] dark:text-[#283C30]"
              />
              {/* Completed Progress Arc (65%) */}
              <circle
                cx="29"
                cy="29"
                r="23"
                stroke="currentColor"
                strokeWidth="4.5"
                fill="none"
                strokeDasharray={144.5}
                strokeDashoffset={144.5 * 0.35}
                strokeLinecap="round"
                className="text-[#3F6B4E] dark:text-[#4E8761] transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[12px] font-bold text-[#3F6B4E] dark:text-[#4E8761]">
                65%
              </span>
            </div>
          </div>

          {/* Details & Resume Button */}
          <div className="flex flex-col justify-between items-start gap-1 flex-1 min-w-0">
            <span className="text-xs text-[#5A6458] dark:text-[#8E9E92] font-medium flex items-center gap-1.5">
              <span>Continue</span>
              <span className="w-1 h-1 rounded-full bg-[#3F6B4E]" />
              <span className="text-[11px]">8 min read</span>
            </span>
            <h3 className="text-sm font-bold text-[#1F2A22] dark:text-[#EBF2EC] leading-snug line-clamp-2 group-hover:text-[#B4531F] dark:group-hover:text-[#D3672E] transition-colors">
              Water: finding and testing your source
            </h3>
            <div className="pt-1.5">
              <Link
                to="/skills/ram-pump"
                className="px-3.5 py-1.5 rounded-control bg-[#B4531F] dark:bg-[#D3672E] hover:bg-[#9c4518] dark:hover:bg-[#B4531F] text-white text-xs font-semibold shadow-2xs hover:shadow-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] inline-flex items-center gap-1.5 group/btn cursor-pointer"
              >
                <span>Resume guide</span>
                <ArrowRight size={12} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* ===================================================================
            CARD 3 (BOTTOM LEFT - 7 COLS): "The year at a glance"
        =================================================================== */}
        <div className="lg:col-span-7 rounded-card bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] p-5 shadow-xs transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-[#C8BFAC] dark:hover:border-[#3E5848] flex flex-col justify-between gap-4">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-xl font-bold text-[#1F2A22] dark:text-[#EBF2EC]">
                The year at a glance
              </h2>
            </div>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#EDE6D6] dark:bg-[#1E2E24] text-[#5A6458] dark:text-[#8E9E92] border border-[#E4DCCB] dark:border-[#283C30] font-medium">
              Illustrative pattern
            </span>
          </div>

          {/* 12-Month Bar Chart */}
          <div className="flex flex-col gap-2 pt-1 relative">
            <div className="h-24 sm:h-28 flex items-end justify-between gap-1 sm:gap-2 px-1">
              {YEAR_AT_A_GLANCE_MONTHS.map((m, idx) => {
                const isRainy = m.type === 'rainy';
                const isCurrent = m.isCurrent;

                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer"
                    onMouseEnter={() => setHoveredMonth(m)}
                    onMouseLeave={() => setHoveredMonth(null)}
                    onClick={() => navigate('/seasons')}
                  >
                    {/* Bar Pill */}
                    <div
                      style={{ height: `${m.heightPct}%` }}
                      className={cn(
                        'w-full max-w-[28px] rounded-[3px] transition-all duration-200 group-hover:scale-y-[1.08] origin-bottom',
                        isRainy ? 'bg-[#568798] dark:bg-[#528D9E]' : 'bg-[#D4A034] dark:bg-[#DDA538]',
                        isCurrent && 'ring-2 ring-[#D4A034] dark:ring-[#DDA538] ring-offset-2 ring-offset-[#FFFDF8] dark:ring-offset-[#17241C] shadow-xs'
                      )}
                    />
                    
                    {/* Tooltip on hover */}
                    {hoveredMonth?.letter === m.letter && (
                      <div className="absolute -top-16 z-30 pointer-events-none px-3 py-1.5 rounded-[6px] bg-[#16261C] dark:bg-[#0E1712] text-white text-[11px] whitespace-nowrap shadow-xl border border-[#2B4636] animate-in fade-in duration-150">
                        <div className="font-bold text-[#C98A1B]">{m.name} · {m.rainfall}</div>
                        <div className="text-stone-300 text-[10.5px]">{m.season}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Month Letters Row */}
            <div className="flex items-center justify-between text-xs text-[#5A6458] dark:text-[#8E9E92] font-medium px-1">
              {YEAR_AT_A_GLANCE_MONTHS.map((m, idx) => (
                <span
                  key={idx}
                  className={cn(
                    'w-full max-w-[28px] text-center transition-colors',
                    m.isCurrent && 'font-bold text-[#D4A034] dark:text-[#DDA538] scale-110'
                  )}
                >
                  {m.letter}
                </span>
              ))}
            </div>

            {/* Legend / Caption (Directly from Start@1x1.png) */}
            <div className="pt-2 text-xs text-[#5A6458] dark:text-[#8E9E92] flex items-center justify-between flex-wrap gap-2">
              <span>Blue: rainy months. Gold: dry months. Outlined: now.</span>
              <Link to="/seasons" className="text-[#B4531F] dark:text-[#D3672E] hover:underline font-medium text-[11.5px] inline-flex items-center gap-1">
                <span>View Full Almanac</span>
                <ArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>

        {/* ===================================================================
            CARD 4 (BOTTOM RIGHT - 5 COLS): "Sabbath"
        =================================================================== */}
        <div className="lg:col-span-5 rounded-card bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] p-5 shadow-xs transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-[#C8BFAC] dark:hover:border-[#3E5848] flex flex-col justify-between gap-5 group">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#5A6458] dark:text-[#8E9E92] font-medium">
                Sabbath
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#EDE6D6] dark:bg-[#1E2E24] text-[#B4531F] dark:text-[#D3672E] font-medium border border-[#E4DCCB] dark:border-[#283C30]">
                {activeDistrict.name} CAT
              </span>
            </div>
            
            <h2 className="font-serif text-2xl font-bold text-[#1F2A22] dark:text-[#EBF2EC] leading-tight">
              Friday sunset [{sunsetInfo.time}]
            </h2>

            <p className="text-xs text-[#5A6458] dark:text-[#8E9E92] pt-0.5">
              Guard hours commence at {sunsetInfo.guard}. All secular farm labor closes before twilight.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
            <Link
              to="/tracker?view=sabbath"
              className="px-4 py-2 rounded-control border border-[#E4DCCB] dark:border-[#283C30] hover:border-[#1F2A22] dark:hover:border-white bg-[#FFFDF8] dark:bg-[#17241C] hover:bg-[#F6F1E7] dark:hover:bg-[#1E3326] text-xs font-semibold text-[#1F2A22] dark:text-[#EBF2EC] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] inline-flex items-center gap-1.5 cursor-pointer shadow-2xs hover:shadow-xs group/btn"
            >
              <span>Preparation checklist</span>
              <ArrowRight size={12} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />
            </Link>

            <span className="text-[11px] text-[#5A6458] dark:text-[#8E9E92] font-medium">
              {sabbathStatus.isSabbathNow ? '✨ Sabbath Active' : `Next in ${sabbathStatus.daysToFriday}d`}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}

export default DesktopWorkspaceStartScreen;
