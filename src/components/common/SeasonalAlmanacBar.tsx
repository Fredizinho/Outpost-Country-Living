import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, CloudRain, Wheat, Layers, Sun, ChevronDown, ChevronUp, 
  Sparkles, Compass, ShieldCheck, Leaf, BookOpen, Info, ArrowUpRight
} from 'lucide-react';
import { getAlmanacInfo, AlmanacInfo, getCurrentMalawiSeason } from '@/lib/seasonalAlmanac';
import { SeasonalTag } from '@/data/skillsAndSeasons';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface SeasonalAlmanacBarProps {
  onSeasonChange?: (season: SeasonalTag) => void;
  className?: string;
  showJournalNotes?: boolean;
}

export function SeasonalAlmanacBar({ onSeasonChange, className, showJournalNotes = true }: SeasonalAlmanacBarProps) {
  const { user, updateProfile } = useAuth();
  
  // Use user's currentSeason or current real date
  const realSeason = getCurrentMalawiSeason();
  const activeSeasonKey: SeasonalTag = (user?.currentSeason as SeasonalTag) || realSeason;
  
  const [isExpanded, setIsExpanded] = useState(false);
  const almanac: AlmanacInfo = getAlmanacInfo(activeSeasonKey);
  const IconComp = almanac.icon;

  const seasonsList: { key: SeasonalTag; label: string; months: string; icon: any }[] = [
    { key: 'Rainy Planting', label: 'Rainy Planting', months: 'Nov – Mar', icon: CloudRain },
    { key: 'Harvest & Storage', label: 'Harvest & Storage', months: 'Apr – Jun', icon: Wheat },
    { key: 'Cold Dry Season', label: 'Cold Dry Season', months: 'Jul – Aug', icon: Layers },
    { key: 'Hot Dry Preparation', label: 'Hot Dry Prep', months: 'Sep – Oct', icon: Sun },
  ];

  const handleSelectSeason = async (sKey: SeasonalTag) => {
    if (onSeasonChange) onSeasonChange(sKey);
    await updateProfile({ currentSeason: sKey });
  };

  return (
    <div className={cn("w-full flex flex-col gap-3 font-sans transition-all duration-300", className)}>
      {/* Primary Journal Header Banner */}
      <div 
        className={cn(
          "rounded-[2.2rem] p-5 md:p-6 shadow-xl border transition-all relative overflow-hidden text-white flex flex-col gap-4",
          almanac.palette.headerBannerBg,
          almanac.palette.cardBorder
        )}
      >
        {/* Subtle Journal Page Lines Background */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${almanac.palette.accentHex} 1px, transparent 1px)`,
            backgroundSize: '18px 18px'
          }}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          {/* Left Title & Status */}
          <div className="flex items-start gap-3.5">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md border"
              style={{
                backgroundColor: `${almanac.palette.soilHex}99`,
                borderColor: almanac.palette.accentHex
              }}
            >
              <IconComp size={24} style={{ color: almanac.palette.accentHex }} />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={cn("text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border", almanac.palette.badgeBg, almanac.palette.badgeText, almanac.palette.badgeBorder)}>
                  {almanac.currentMonthName} Malawi Almanac
                </span>
                {almanac.isCurrentRealMonth && (
                  <span className="bg-amber-400 text-slate-950 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
                    <Sparkles size={10} /> Active Season
                  </span>
                )}
              </div>

              <h2 className="serif text-2xl md:text-3xl font-bold mt-1 text-white flex items-center gap-2">
                {almanac.name}
              </h2>

              <p className="text-xs font-medium text-emerald-100/80 mt-0.5 max-w-xl">
                {almanac.tagline}
              </p>
            </div>
          </div>

          {/* Right Season Switcher Pills */}
          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-200/70">
              Switch Seasonal Phase
            </span>

            <div className="flex flex-wrap gap-1.5 bg-black/30 p-1.5 rounded-2xl border border-white/10">
              {seasonsList.map((item) => {
                const ItemIcon = item.icon;
                const isSelected = activeSeasonKey === item.key;

                return (
                  <button
                    key={item.key}
                    onClick={() => handleSelectSeason(item.key)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 select-none",
                      isSelected
                        ? "bg-white text-slate-950 shadow-md font-extrabold scale-102"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <ItemIcon size={13} style={{ color: isSelected ? almanac.palette.soilHex : 'currentColor' }} />
                    <span className="hidden sm:inline">{item.label}</span>
                    <span className="text-[9px] opacity-70 font-mono">({item.months.split(' ')[0]})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Journal Toggle Strip */}
        {showJournalNotes && (
          <div className="border-t border-white/10 pt-3 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-100/90 truncate">
              <Compass size={14} style={{ color: almanac.palette.accentHex }} className="shrink-0" />
              <span className="truncate">
                Soil Profile: <strong className="text-white">{almanac.soilProfileName}</strong> • {almanac.proTip.slice(0, 75)}...
              </span>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 shrink-0 ml-2"
            >
              <span>{isExpanded ? "Collapse Journal" : "Read Almanac Notes"}</span>
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            <a
              href={`/almanac`}
              className="ml-3 bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1 rounded-xl text-xs font-mono font-black uppercase tracking-wider flex items-center gap-1 transition-all shadow-xs"
            >
              <span>Action Engine</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        )}

        {/* Expanded Journal Page */}
        <AnimatePresence>
          {showJournalNotes && isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="border-t border-white/15 pt-5 flex flex-col gap-4 relative z-10 text-slate-100"
            >
              {/* 3 Column Almanac Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Col 1: Practical Tasks */}
                <div className="bg-black/25 p-4 rounded-2xl border border-white/10 flex flex-col gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 flex items-center gap-1.5">
                    <Leaf size={13} /> Priority Field Activities
                  </span>
                  <ul className="flex flex-col gap-1.5 text-xs text-emerald-50">
                    {almanac.keyActivities.map((act, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold shrink-0">•</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Col 2: Recommended Crops & Soil Strategy */}
                <div className="bg-black/25 p-4 rounded-2xl border border-white/10 flex flex-col gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-teal-300 flex items-center gap-1.5">
                    <ShieldCheck size={13} /> Soil & Water Strategy
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {almanac.soilAdvice}
                  </p>
                  <div className="mt-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-300 block mb-1">
                      Recommended Crop Varieties:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {almanac.recommendedCrops.map((c, idx) => (
                        <span key={idx} className="bg-white/10 px-2 py-0.5 rounded-lg text-[10px] font-bold text-amber-200 border border-white/10">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Col 3: Inspired Almanac Wisdom & Climate */}
                <div className="bg-black/25 p-4 rounded-2xl border border-white/10 flex flex-col gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-sky-300 flex items-center gap-1.5">
                    <BookOpen size={13} /> Practical Counsel & Climate
                  </span>
                  <p className="italic font-serif text-xs text-emerald-100/90 leading-relaxed border-l-2 border-amber-400 pl-2">
                    {almanac.almanacWisdom}
                  </p>
                  <div className="text-[11px] text-slate-300 mt-1 font-mono bg-black/40 p-2.5 rounded-xl border border-white/5 flex items-start gap-2">
                    <Sun size={14} className="text-amber-400 shrink-0 mt-0.5" />
                    <span>{almanac.climateOverview}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
