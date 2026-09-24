import React from 'react';
import { AlertTriangle, Clock, ArrowRight, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface UrgentSeasonAlertProps {
  urgentTaskTitle?: string;
  urgentNotice?: string;
  daysRemaining?: number;
  calculatorTab?: string;
  calculatorLabel?: string;
  fieldGuideSkillId?: string;
  onViewTask?: () => void;
  className?: string;
}

export function UrgentSeasonAlert({
  urgentTaskTitle = 'Inspect Roof Gutters, Downpipes & 5,000L First-Flush Diverters',
  urgentNotice = 'Pre-Rain Preparation Window: Finalize Roof Gutter Catchments & Katondo Deep-Beds',
  daysRemaining,
  calculatorTab = 'rainwater',
  calculatorLabel = 'Calculate Rainwater Harvest Yield',
  fieldGuideSkillId = 'rainwater-swale-dambo-capture',
  onViewTask,
  className
}: UrgentSeasonAlertProps) {
  return (
    <div className={cn("w-full bg-gradient-to-r from-amber-950 via-amber-900 to-emerald-950 border border-amber-500/50 text-white rounded-[2rem] p-4 sm:p-5 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4", className)}>
      {/* Background Warning Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Left Icon & Message */}
      <div className="flex items-start sm:items-center gap-3.5 relative z-10">
        <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-400 shadow-inner">
          <AlertTriangle size={22} className="animate-pulse" />
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Clock size={11} /> {daysRemaining ? `~${daysRemaining}-Day Target Window` : 'Priority Seasonal Window'}
            </span>
            <span className="text-amber-200/70 font-mono text-[10px] uppercase font-bold tracking-wider">
              Critical Path
            </span>
          </div>

          <h4 className="serif text-base sm:text-lg font-bold text-white leading-snug">
            {urgentNotice}
          </h4>

          <p className="text-xs text-emerald-100/80 font-medium">
            Immediate seasonal action: <strong className="text-amber-300">{urgentTaskTitle}</strong>
          </p>
        </div>
      </div>

      {/* Right Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 relative z-10 shrink-0 self-end md:self-center">
        {calculatorTab && (
          <Link
            to={`/calculators?tab=${calculatorTab}`}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-black text-xs uppercase px-3.5 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5 active:scale-95"
          >
            <Wrench size={13} />
            <span>{calculatorLabel.replace('Calculate ', '')}</span>
          </Link>
        )}

        {fieldGuideSkillId && (
          <Link
            to={`/how/${fieldGuideSkillId}`}
            className="bg-white/10 hover:bg-white/20 text-emerald-100 border border-white/20 font-mono font-bold text-xs uppercase px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5"
          >
            <span>Field Manual</span>
            <ArrowRight size={13} />
          </Link>
        )}
      </div>
    </div>
  );
}
