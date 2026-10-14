import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Compass, Droplets, Sprout, Calendar, ShieldCheck, 
  Activity, Sparkles, ArrowUpRight, CheckCircle2 
} from 'lucide-react';
import { DistrictSeasonalTelemetry } from '@/data/actionableAlmanacData';
import { calculateHomesteadReadinessScore, ReadinessScoreResult } from '@/lib/offlineStorage';
import { SeasonalTag } from '@/data/skillsAndSeasons';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface HomesteadTelemetryBannerProps {
  telemetry: DistrictSeasonalTelemetry;
  activeSeasonKey: SeasonalTag;
  className?: string;
}

export function HomesteadTelemetryBanner({ telemetry, activeSeasonKey, className }: HomesteadTelemetryBannerProps) {
  const [readiness, setReadiness] = useState<ReadinessScoreResult>(() => calculateHomesteadReadinessScore());

  useEffect(() => {
    const handleUpdate = () => {
      setReadiness(calculateHomesteadReadinessScore());
    };

    window.addEventListener('outpost:readiness-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('outpost:readiness-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return (
    <div className={cn("w-full bg-[#0a160f] text-white rounded-[2.2rem] p-5 md:p-6 border border-emerald-500/30 shadow-xl relative overflow-hidden flex flex-col gap-4", className)}>
      {/* Background Topographic Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }}
      />

      {/* Header telemetry status */}
      <div className="flex flex-wrap items-center justify-between gap-3 relative z-10 border-b border-emerald-800/60 pb-3.5">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="text-caption font-mono font-black uppercase tracking-widest text-emerald-300">
            Live Weather & Farm Conditions • {telemetry.district}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/tracker"
            className="text-caption font-mono font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 transition-colors"
          >
            <span>View Exodus Roadmap</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      {/* 4 Metric Telemetry Grid + 1 Readiness Score Card */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 relative z-10">
        
        {/* Metric 1: Current Phase */}
        <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between text-emerald-300">
            <span className="text-caption font-mono font-bold uppercase tracking-wider text-slate-400">Current Phase</span>
            <Calendar size={14} className="text-amber-400" />
          </div>
          <div>
            <span className="text-xs sm:text-sm font-extrabold text-white block truncate">
              {activeSeasonKey}
            </span>
            <span className="text-caption text-emerald-200/70 font-mono">
              {telemetry.zoneName.split('(')[0]}
            </span>
          </div>
        </div>

        {/* Metric 2: Target Planting Window */}
        <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between text-emerald-300">
            <span className="text-caption font-mono font-bold uppercase tracking-wider text-slate-400">Target Planting</span>
            <Sprout size={14} className="text-emerald-400" />
          </div>
          <div>
            <span className="text-xs sm:text-sm font-extrabold text-amber-300 block truncate">
              {telemetry.targetPlantingWindow}
            </span>
            <span className="text-caption text-slate-300 font-mono">
              {telemetry.soilReadinessPct}% Soil Moisture Ready
            </span>
          </div>
        </div>

        {/* Metric 3: Water Demand & Status */}
        <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between text-sky-300">
            <span className="text-caption font-mono font-bold uppercase tracking-wider text-slate-400">Daily Water Needed</span>
            <Droplets size={14} className="text-sky-400" />
          </div>
          <div>
            <span className="text-xs sm:text-sm font-extrabold text-sky-200 block truncate">
              {telemetry.dailyWaterRequirementLitersM2} L/m² / day
            </span>
            <span className="text-caption text-slate-300 font-mono truncate block">
              {telemetry.waterAvailabilityStatus.split('-')[0]}
            </span>
          </div>
        </div>

        {/* Metric 4: Soil Prep Focus */}
        <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between text-amber-300">
            <span className="text-caption font-mono font-bold uppercase tracking-wider text-slate-400">Soil Prep Focus</span>
            <Compass size={14} className="text-amber-400" />
          </div>
          <div>
            <span className="text-xs sm:text-sm font-extrabold text-slate-100 block truncate">
              {telemetry.soilPrepFocus}
            </span>
            <span className="text-caption text-emerald-300/80 font-mono truncate block">
              Frost: {telemetry.frostRisk}
            </span>
          </div>
        </div>

        {/* Metric 5: Homestead Readiness Score */}
        <div className="col-span-2 md:col-span-4 lg:col-span-1 bg-gradient-to-br from-amber-500/20 via-emerald-950/40 to-slate-900 p-3.5 rounded-2xl border border-amber-500/40 flex flex-col justify-between gap-2 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-caption font-mono font-black uppercase tracking-wider text-amber-300 flex items-center gap-1">
              <Sparkles size={11} className="text-amber-400" /> Readiness Score
            </span>
            <span className="text-xs font-mono font-extrabold text-amber-400">
              {readiness.totalScorePct}%
            </span>
          </div>

          {/* Mini progress bar */}
          <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-white/10">
            <motion.div 
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${readiness.totalScorePct}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>

          <div className="text-caption font-mono text-emerald-200/90 truncate">
            {readiness.levelLabel.split('(')[0]}
          </div>
        </div>

      </div>
    </div>
  );
}
