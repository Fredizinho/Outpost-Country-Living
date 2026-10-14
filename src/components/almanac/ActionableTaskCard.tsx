import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, Circle, Wrench, BookOpen, ChevronDown, ChevronUp, 
  Sparkles, Clock, AlertTriangle, Droplets, Sprout, Trees, Wheat, Home,
  ArrowRight, ShieldCheck, Check, Lightbulb, Compass
} from 'lucide-react';
import { ActionableTask, TaskDomain } from '@/data/actionableAlmanacData';
import { isSeasonalTaskCompleted, toggleCompletedSeasonalTask } from '@/lib/offlineStorage';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ActionableTaskCardProps {
  task: ActionableTask;
  selectedDistrict?: string;
  onToggleComplete?: (taskId: string, isCompleted: boolean) => void;
  className?: string;
}

const DOMAIN_ICONS: Record<TaskDomain, any> = {
  water: Droplets,
  soil: Sprout,
  'fruit-trees': Trees,
  crops: Wheat,
  infrastructure: Home,
};

const DOMAIN_COLORS: Record<TaskDomain, { text: string; bg: string; border: string }> = {
  water: { text: 'text-sky-400', bg: 'bg-sky-500/15', border: 'border-sky-500/30' },
  soil: { text: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30' },
  'fruit-trees': { text: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/30' },
  crops: { text: 'text-yellow-400', bg: 'bg-yellow-500/15', border: 'border-yellow-500/30' },
  infrastructure: { text: 'text-stone-300', bg: 'bg-stone-500/15', border: 'border-stone-500/30' },
};

export function ActionableTaskCard({
  task,
  selectedDistrict = 'dedza',
  onToggleComplete,
  className
}: ActionableTaskCardProps) {
  const [completed, setCompleted] = useState<boolean>(() => isSeasonalTaskCompleted(task.id));
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const DomainIcon = DOMAIN_ICONS[task.domain] || Sprout;
  const domainStyle = DOMAIN_COLORS[task.domain] || DOMAIN_COLORS.soil;

  const handleCheckboxClick = () => {
    const res = toggleCompletedSeasonalTask(task.id);
    setCompleted(res.completed);
    if (onToggleComplete) {
      onToggleComplete(task.id, res.completed);
    }
  };

  const districtNote = selectedDistrict && task.districtVariations?.[selectedDistrict.toLowerCase()];

  return (
    <motion.div
      layout
      className={cn(
        "rounded-[2rem] border transition-all duration-300 relative overflow-hidden flex flex-col justify-between text-white backdrop-blur-md shadow-xl",
        completed 
          ? "bg-[#0d1f14]/80 border-emerald-500/50 opacity-90" 
          : "bg-white/5 border-amber-500/25 hover:border-amber-500/50 hover:bg-white/[0.07]",
        className
      )}
    >
      {/* Top Main Section */}
      <div className="p-5 sm:p-6 flex flex-col gap-4">
        
        {/* Header Badges: Priority + Domain + Exodus Stage */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            {/* Domain Tag */}
            <span className={cn("text-caption font-mono font-black uppercase px-2.5 py-0.5 rounded-full border flex items-center gap-1", domainStyle.bg, domainStyle.text, domainStyle.border)}>
              <DomainIcon size={11} />
              <span>{task.domain.replace('-', ' ')}</span>
            </span>

            {/* Exodus Stage Tag */}
            <span className="text-caption font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-black/40 text-emerald-300 border border-emerald-500/30">
              Stage: {task.exodusStage}
            </span>

            {/* Priority / Urgency Badge */}
            {task.priority === 'urgent' && (
              <span className="text-caption font-mono font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                <AlertTriangle size={11} className="text-amber-400" />
                <span>Urgent Window</span>
              </span>
            )}
          </div>

          {/* Readiness Points Reward */}
          <span className="text-caption font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30">
            +{task.readinessPoints} pts readiness
          </span>
        </div>

        {/* Title and Checkbox Row */}
        <div className="flex items-start gap-3.5">
          <button
            onClick={handleCheckboxClick}
            className="mt-1 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all border select-none active:scale-90"
            style={{
              backgroundColor: completed ? '#10b981' : 'rgba(255,255,255,0.08)',
              borderColor: completed ? '#059669' : 'rgba(255,255,255,0.2)'
            }}
            title={completed ? 'Mark as pending' : 'Mark task completed'}
          >
            {completed ? <Check size={16} className="text-slate-950 stroke-[3]" /> : <Circle size={14} className="text-slate-400 opacity-40" />}
          </button>

          <div className="flex flex-col gap-1.5 flex-1">
            <h4 className={cn(
              "serif text-lg sm:text-xl font-bold leading-snug transition-all",
              completed ? "line-through text-emerald-300/60" : "text-[#FAF8F5]"
            )}>
              {task.title}
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {task.summary}
            </p>

            {/* Urgency Callout if Present */}
            {task.urgencyNotice && !completed && (
              <div className="text-caption font-mono font-bold text-amber-300 flex items-center gap-1.5 mt-1 bg-amber-950/40 p-2 rounded-xl border border-amber-500/30">
                <Clock size={13} className="text-amber-400 shrink-0" />
                <span>{task.urgencyNotice}</span>
              </div>
            )}

            {/* District-specific Note */}
            {districtNote && (
              <div className="text-caption text-emerald-200/90 flex items-center gap-1.5 mt-1 bg-emerald-950/40 p-2 rounded-xl border border-emerald-500/25">
                <Compass size={13} className="text-emerald-400 shrink-0" />
                <span><strong>{selectedDistrict} note:</strong> {districtNote}</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Action Buttons Bar: Calculator + Field Guide + How to Execute Drawer Toggle */}
      <div className="p-4 sm:p-5 bg-black/30 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
        
        {/* Left Side Links */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Sizer Calculator CTA */}
          {task.calculatorLink && (
            <Link
              to={`/calculators?tab=${task.calculatorLink.tab}`}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-caption font-mono font-bold uppercase px-3 py-1.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
              title={task.calculatorLink.tooltip}
            >
              <Wrench size={12} />
              <span>{task.calculatorLink.label}</span>
            </Link>
          )}

          {/* Masterclass Field Manual Link */}
          {task.fieldGuideLink && (
            <Link
              to={`/how/${task.fieldGuideLink.skillId}`}
              className="bg-white/10 hover:bg-white/15 text-emerald-200 text-caption font-mono font-bold uppercase px-3 py-1.5 rounded-xl border border-white/15 transition-all flex items-center gap-1.5"
            >
              <BookOpen size={12} className="text-emerald-400" />
              <span>Manual: {task.fieldGuideLink.guideTitle}</span>
              <ArrowRight size={11} />
            </Link>
          )}
        </div>

        {/* Right Side: Collapsible Drawer Header Toggle */}
        <button
          type="button"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/20 transition-all duration-300 ease-in-out cursor-pointer select-none group"
        >
          <span className="font-serif text-amber-200 text-sm font-semibold">
            {isDrawerOpen ? 'Close Guide' : 'Field Steps'}
          </span>
          <span className="font-mono text-caption text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            {task.howToExecute.steps.length} Steps
          </span>
          <ChevronDown 
            size={14} 
            className={cn(
              "text-amber-400 transition-transform duration-300 ease-in-out group-hover:text-amber-300",
              isDrawerOpen && "rotate-180"
            )} 
          />
        </button>
      </div>

      {/* Collapsible "How to Execute" Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="border-t border-amber-500/20 bg-black/60 p-5 sm:p-6 flex flex-col gap-5 text-xs overflow-hidden"
          >
            {/* 2-Column Concise Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left Column: Bulleted "Core Steps & Protocols" with bold lead-ins */}
              <div className="lg:col-span-7 flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-serif text-amber-200 text-sm font-semibold flex items-center gap-2">
                    <Sparkles size={14} className="text-amber-400" />
                    Key Farming Steps
                  </span>
                  <span className="font-mono text-caption text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Execution Order
                  </span>
                </div>

                <ul className="flex flex-col gap-2.5">
                  {task.howToExecute.steps.map((step, idx) => {
                    // Extract lead-in if exists (up to first colon or first 3 words)
                    const colonIndex = step.indexOf(':');
                    const hasColon = colonIndex > 0 && colonIndex < 35;
                    const leadIn = hasColon ? step.slice(0, colonIndex + 1) : `Step ${idx + 1}:`;
                    const remainder = hasColon ? step.slice(colonIndex + 1) : ` ${step}`;

                    return (
                      <li key={idx} className="flex items-start gap-2.5 text-slate-200 leading-relaxed bg-white/5 p-2.5 rounded-xl border border-white/5">
                        <span className="w-5 h-5 rounded-lg bg-amber-500/20 text-amber-300 font-mono text-caption font-bold flex items-center justify-center shrink-0 border border-amber-500/30 mt-0.5">
                          {idx + 1}
                        </span>
                        <div className="text-xs">
                          <strong className="text-amber-300 font-semibold">{leadIn}</strong>
                          <span className="text-slate-200">{remainder}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Right Column: "Required Equipment & Metrics" in crisp font-mono */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-serif text-amber-200 text-sm font-semibold flex items-center gap-2">
                    <Wrench size={14} className="text-amber-400" />
                    Required Equipment & Metrics
                  </span>
                  <span className="font-mono text-caption text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Specs
                  </span>
                </div>

                <div className="flex flex-col gap-2.5 font-mono text-xs">
                  {/* Tools List */}
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-white/10 flex flex-col gap-1.5">
                    <span className="text-caption uppercase text-slate-400 tracking-wider font-bold">
                      Tools & Materials:
                    </span>
                    <div className="flex flex-wrap gap-1.5 text-caption text-emerald-200 font-medium">
                      {task.howToExecute.toolsNeeded.map((t, idx) => (
                        <span key={idx} className="bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Timing & Season Metrics */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-900/80 p-2.5 rounded-xl border border-white/10">
                      <span className="text-caption uppercase text-slate-400 block mb-0.5">Optimal Window</span>
                      <span className="text-amber-300 font-bold text-caption truncate block">{task.howToExecute.timingWindow}</span>
                    </div>
                    <div className="bg-slate-900/80 p-2.5 rounded-xl border border-white/10">
                      <span className="text-caption uppercase text-slate-400 block mb-0.5">Readiness Pts</span>
                      <span className="text-emerald-300 font-bold text-caption">+{task.readinessPoints} Readiness</span>
                    </div>
                  </div>

                  {/* Pro-Tip Metric Box */}
                  {task.howToExecute.malawiProTip && (
                    <div className="bg-amber-950/30 p-2.5 rounded-xl border border-amber-500/20 text-caption leading-relaxed text-amber-200/90 font-sans">
                      <span className="font-mono text-caption uppercase tracking-wider text-amber-400 font-bold block mb-1">
                        Malawi Field Metric / Pro-Tip:
                      </span>
                      {task.howToExecute.malawiProTip}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Single High-Contrast Action Button */}
            <div className="pt-2 border-t border-white/10">
              <Link
                to={task.fieldGuideLink ? `/how/${task.fieldGuideLink.skillId}` : (task.calculatorLink ? `/calculators?tab=${task.calculatorLink.tab}` : `/skills`)}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <span>[ LAUNCH MASTERCLASS GUIDE ]</span>
                <ArrowRight size={14} className="text-slate-950" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
