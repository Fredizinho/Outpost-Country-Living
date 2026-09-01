import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, Mountain, Search, ShoppingBag, Tent, Plus, Trash2, Download, RotateCcw, HardDrive, Sparkles, MapPin, Users, Wallet, Calendar, Activity, ArrowRight, ShieldCheck, Sprout } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { generatePersonalizedRoadmap, Step } from '@/lib/checklistGenerator';
import { getStoredTrackerData, saveStoredTrackerData, calculateHomesteadReadinessScore } from '@/lib/offlineStorage';
import { 
  SanctuaryCard, 
  SanctuaryButton, 
  SanctuaryBadge, 
  SanctuarySectionHeader, 
  SanctuaryStatBox 
} from '@/components/ui';

const ICON_MAP: Record<string, any> = {
  prepare: ShoppingBag,
  scout: Search,
  exodus: Mountain,
};

export default function Tracker() {
  const { user } = useAuth();
  const [showWizard, setShowWizard] = useState(false);

  // Initialize steps either from user-customized offlineStorage or generated from Auth profile
  const [steps, setSteps] = useState<Step[]>(() => {
    const saved = getStoredTrackerData<Step[]>();
    if (saved && Array.isArray(saved) && saved.length > 0) {
      return saved;
    }
    return generatePersonalizedRoadmap({
      district: user?.district || 'Dedza',
      region: user?.region || 'Central',
      homesteadGoal: user?.homesteadGoal || 'Self-Sufficient Organic Homestead',
      householdSize: user?.householdSize || '3-5 Members',
      budgetBand: user?.budgetBand || 'Standard Off-Grid',
      timeline: user?.timeline || 'This Season (3-6 Months)',
    });
  });

  const [newTaskInput, setNewTaskInput] = useState<{ [key: string]: string }>({});
  const [activeAddingStep, setActiveAddingStep] = useState<string | null>(null);

  useEffect(() => {
    saveStoredTrackerData(steps);
  }, [steps]);

  // Regeneration callback when user updates onboarding answers
  const handleApplyOnboarding = () => {
    const newRoadmap = generatePersonalizedRoadmap({
      district: user?.district || 'Dedza',
      region: user?.region || 'Central',
      homesteadGoal: user?.homesteadGoal || 'Self-Sufficient Organic Homestead',
      householdSize: user?.householdSize || '3-5 Members',
      budgetBand: user?.budgetBand || 'Standard Off-Grid',
      timeline: user?.timeline || 'This Season (3-6 Months)',
    });
    setSteps(newRoadmap);
    saveStoredTrackerData(newRoadmap);
  };

  const toggleSubtask = (stepId: string, subtaskId: string) => {
    setSteps(prev => prev.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          subtasks: step.subtasks.map(sh => 
            sh.id === subtaskId ? { ...sh, completed: !sh.completed } : sh
          )
        };
      }
      return step;
    }));
  };

  const handleAddCustomTask = (stepId: string) => {
    const text = newTaskInput[stepId]?.trim();
    if (!text) return;

    setSteps(prev => prev.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          subtasks: [
            ...step.subtasks,
            { id: `custom_${Date.now()}`, label: text, completed: false }
          ]
        };
      }
      return step;
    }));

    setNewTaskInput(prev => ({ ...prev, [stepId]: '' }));
    setActiveAddingStep(null);
  };

  const handleDeleteSubtask = (stepId: string, subtaskId: string) => {
    setSteps(prev => prev.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          subtasks: step.subtasks.filter(st => st.id !== subtaskId)
        };
      }
      return step;
    }));
  };

  const handleResetTracker = () => {
    if (window.confirm('Re-generate personalized exodus milestone tasks based on your current district and goal profile?')) {
      const resetRoadmap = generatePersonalizedRoadmap({
        district: user?.district || 'Dedza',
        region: user?.region || 'Central',
        homesteadGoal: user?.homesteadGoal || 'Self-Sufficient Organic Homestead',
        householdSize: user?.householdSize || '3-5 Members',
        budgetBand: user?.budgetBand || 'Standard Off-Grid',
        timeline: user?.timeline || 'This Season (3-6 Months)',
      });
      setSteps(resetRoadmap);
      saveStoredTrackerData(resetRoadmap);
    }
  };

  const calculateProgress = (step: Step) => {
    if (step.subtasks.length === 0) return 0;
    const completed = step.subtasks.filter(s => s.completed).length;
    return (completed / step.subtasks.length) * 100;
  };

  const totalTasks = steps.reduce((acc, step) => acc + step.subtasks.length, 0);
  const totalCompleted = steps.reduce((acc, step) => acc + step.subtasks.filter(st => st.completed).length, 0);
  const overallProgress = totalTasks > 0 ? (totalCompleted / totalTasks) * 100 : 0;

  const [readinessBreakdown, setReadinessBreakdown] = useState(() => calculateHomesteadReadinessScore());

  useEffect(() => {
    setReadinessBreakdown(calculateHomesteadReadinessScore());
  }, [steps]);

  const handleExportRoadmap = () => {
    const lines = [
      'OUTPOST LIVING - PERSONALIZED EXODUS PREPARATION ROADMAP',
      '========================================================',
      `Steward: ${user?.displayName || 'Steward'}`,
      `Target District: ${user?.district || 'Dedza'} (${user?.region || 'Central'} Region)`,
      `Homestead Goal: "${user?.homesteadGoal || 'Self-Sufficient Organic Homestead'}"`,
      `Household Size: ${user?.householdSize || '3-5 Members'}`,
      `Budget Strategy: ${user?.budgetBand || 'Standard Off-Grid'}`,
      `Timeline: ${user?.timeline || 'This Season'}`,
      `Overall Completion: ${Math.round(overallProgress)}% (${totalCompleted}/${totalTasks} Tasks Completed)`,
      `Export Date: ${new Date().toLocaleDateString()}`,
      ''
    ];

    steps.forEach((step, idx) => {
      lines.push(`PHASE ${idx + 1}: ${step.title.toUpperCase()}`);
      lines.push(`Description: ${step.description}`);
      lines.push('Tasks:');
      step.subtasks.forEach(task => {
        lines.push(`  [${task.completed ? 'X' : ' '}] ${task.label}`);
      });
      lines.push('');
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Personalized_Exodus_Roadmap_${user?.district || 'Dedza'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="px-6 md:px-12 py-10 max-w-5xl mx-auto flex flex-col gap-10">
      {/* Onboarding / Personalization Profile Banner */}
      <section className="bg-[#142118] rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl border border-amber-600/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-600/10 to-transparent rounded-full -mr-32 -mt-32 pointer-events-none" />

        <div className="flex flex-col gap-3 relative z-10 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="bg-amber-600/20 text-amber-300 border border-amber-500/30 text-[10px] font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5">
              <Sparkles size={12} className="text-amber-400" /> Tailored Field Roadmap
            </span>
            <span className="bg-emerald-900/80 text-emerald-300 border border-emerald-700/80 text-[10px] font-bold uppercase px-3 py-1 rounded-full flex items-center gap-1">
              <MapPin size={12} /> {user?.district || 'Dedza'}, {user?.region || 'Central'}
            </span>
          </div>

          <h3 className="serif text-2xl md:text-3xl font-bold text-[#FAF8F5]">
            {user?.displayName || 'Steward'}'s Personalized Exodus Ledger
          </h3>
          <p className="text-emerald-200/80 text-xs font-medium max-w-xl">
            Goal: "{user?.homesteadGoal || 'Self-Sufficient Organic Homestead'}"
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-1">
            <span className="bg-white/10 text-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1">
              <Users size={12} /> {user?.householdSize || '3-5 Members'}
            </span>
            <span className="bg-white/10 text-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1">
              <Wallet size={12} /> {user?.budgetBand?.split('(')[0] || 'Standard Off-Grid'}
            </span>
            <span className="bg-white/10 text-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1">
              <Calendar size={12} /> {user?.timeline?.split('(')[0] || 'This Season'}
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowWizard(true)}
          className="relative z-10 bg-amber-700 hover:bg-amber-600 text-white px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-lg active:scale-95 border border-amber-500/40 shrink-0 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <Sparkles size={16} />
          {user?.onboardingCompleted ? 'Re-Customize Roadmap' : 'Take Onboarding Quiz'}
        </button>
      </section>

      {/* Header Overview Card */}
      <header className="flex flex-col gap-6 text-center bg-[#FDFBF7] rounded-[2.5rem] p-8 md:p-10 border border-[#E6DFD1] shadow-xs">
        <div className="flex items-center justify-center gap-2">
          <span className="text-amber-800 font-extrabold uppercase text-[10px] tracking-[0.25em]">
            Migration Field Ledger
          </span>
          <span className="bg-emerald-950/5 text-emerald-950 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-950/20 flex items-center gap-1">
            <HardDrive size={10} /> Saved Offline
          </span>
        </div>

        <h2 className="serif text-4xl md:text-5xl font-bold text-emerald-950">The Exodus Journey</h2>
        <p className="text-slate-700 max-w-xl mx-auto font-medium text-sm leading-relaxed">
          Step-by-step milestone checklist customized for {user?.district || 'Dedza'} land conditions, budget, and household size.
        </p>
        
        {/* Overall Progress Bar */}
        <div className="mt-4 max-w-xl mx-auto w-full">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-emerald-950 mb-2">
            <span>Overall Migration Progress</span>
            <span className="text-amber-800 font-extrabold">{Math.round(overallProgress)}% ({totalCompleted}/{totalTasks})</span>
          </div>
          <div className="h-3 w-full bg-emerald-950/10 rounded-full overflow-hidden p-[2px] shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              className="h-full bg-gradient-to-r from-emerald-950 via-amber-600 to-terracotta-700 rounded-full shadow-xs"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleExportRoadmap}
            className="bg-emerald-950 hover:bg-emerald-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 active:scale-95 border border-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800"
          >
            <Download size={14} className="text-amber-400" /> Export Roadmap
          </button>
          <button
            onClick={handleResetTracker}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800"
          >
            <RotateCcw size={14} /> Re-Generate Roadmap
          </button>
        </div>
      </header>

      {/* Cross-Module Homestead Readiness Ledger */}
      <section className="bg-gradient-to-br from-emerald-950 via-slate-900 to-amber-950 p-6 md:p-8 rounded-[2.5rem] border border-amber-500/30 text-white shadow-xl flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
              <Activity size={13} className="text-amber-400" />
              Overall Preparedness Score
            </span>
            <h3 className="serif text-2xl font-bold text-[#FAF8F5]">
              Total Homestead Readiness: {readinessBreakdown.totalScorePct}%
            </h3>
            <p className="text-xs text-emerald-200/80 font-medium mt-0.5">
              Calculated from your Move Checklist (35%), Practical Skills (25%), Seasonal Tasks (25%), and Land Readiness (15%).
            </p>
          </div>

          <Link
            to="/almanac"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-mono font-black uppercase tracking-wider flex items-center gap-1.5 self-start sm:self-auto transition-all shadow-sm"
          >
            <span>Seasonal Tasks Engine</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-black/30 p-3.5 rounded-2xl border border-white/10 flex flex-col justify-between gap-2">
            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400">1. Exodus Roadmap (35%)</span>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-mono font-extrabold text-amber-300">{readinessBreakdown.breakdown.exodusScorePct}%</span>
              <span className="text-[9px] text-slate-400">{totalCompleted}/{totalTasks} tasks</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full" style={{ width: `${readinessBreakdown.breakdown.exodusScorePct}%` }} />
            </div>
          </div>

          <div className="bg-black/30 p-3.5 rounded-2xl border border-white/10 flex flex-col justify-between gap-2">
            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400">2. Field Skills (25%)</span>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-mono font-extrabold text-emerald-300">{readinessBreakdown.breakdown.skillsMasteryPct}%</span>
              <Link to="/skills" className="text-[9px] text-emerald-400 hover:underline">View Guides</Link>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${readinessBreakdown.breakdown.skillsMasteryPct}%` }} />
            </div>
          </div>

          <div className="bg-black/30 p-3.5 rounded-2xl border border-white/10 flex flex-col justify-between gap-2">
            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400">3. Seasonal Actions (25%)</span>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-mono font-extrabold text-sky-300">{readinessBreakdown.breakdown.seasonalActionPct}%</span>
              <Link to="/almanac" className="text-[9px] text-sky-300 hover:underline">Almanac</Link>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-sky-400 rounded-full" style={{ width: `${readinessBreakdown.breakdown.seasonalActionPct}%` }} />
            </div>
          </div>

          <div className="bg-black/30 p-3.5 rounded-2xl border border-white/10 flex flex-col justify-between gap-2">
            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400">4. Land Readiness (15%)</span>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-mono font-extrabold text-yellow-300">{readinessBreakdown.breakdown.landReadinessPct}%</span>
              <Link to="/scout-map" className="text-[9px] text-yellow-400 hover:underline">Land Map</Link>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${readinessBreakdown.breakdown.landReadinessPct}%` }} />
            </div>
          </div>
        </div>
      </section>

      {/* Step Cards List */}
      <div className="flex flex-col gap-8">
        {steps.map((step, index) => {
          const Icon = ICON_MAP[step.id] || Tent;
          const isAdding = activeAddingStep === step.id;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#FDFBF7] rounded-[2.5rem] border border-[#E6DFD1] shadow-xs overflow-hidden"
            >
              <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8">
                <div className="flex-1 flex flex-col gap-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-950 text-amber-300 flex items-center justify-center shrink-0 shadow-sm border border-emerald-900">
                        <Icon size={28} />
                      </div>
                      <div>
                        <h3 className="serif text-2xl font-bold text-emerald-950">{step.title}</h3>
                        <p className="text-sm text-slate-600 font-medium mt-1">{step.description}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveAddingStep(isAdding ? null : step.id)}
                      className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[10px] font-black uppercase px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 shrink-0"
                    >
                      <Plus size={12} /> Add Milestone
                    </button>
                  </div>

                  {/* Form to add custom task */}
                  {isAdding && (
                    <div className="bg-white/90 p-4 rounded-2xl border border-emerald-200 shadow-inner flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        placeholder="e.g. Purchase solar freezer or inspect water well..."
                        value={newTaskInput[step.id] || ''}
                        onChange={(e) => setNewTaskInput({ ...newTaskInput, [step.id]: e.target.value })}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddCustomTask(step.id)}
                        className="flex-1 bg-white px-4 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 ring-emerald-500"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddCustomTask(step.id)}
                          className="bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase shadow-sm hover:bg-emerald-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setActiveAddingStep(null)}
                          className="bg-slate-200 text-slate-600 px-3 py-2 rounded-xl text-xs font-bold uppercase hover:bg-slate-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Task List */}
                  <div className="grid grid-cols-1 gap-3 mt-2">
                    {step.subtasks.map(task => (
                      <div
                        key={task.id}
                        className={cn(
                          "flex items-center justify-between gap-4 p-4 rounded-2xl transition-all border group",
                          task.completed 
                            ? "bg-emerald-50/70 text-emerald-800 border-emerald-200" 
                            : "bg-white/50 text-slate-700 border-white/60 hover:bg-white"
                        )}
                      >
                        <button
                          onClick={() => toggleSubtask(step.id, task.id)}
                          className="flex items-center gap-3.5 flex-1 text-left"
                        >
                          {task.completed ? (
                            <CheckCircle2 size={20} className="shrink-0 text-emerald-600" />
                          ) : (
                            <Circle size={20} className="shrink-0 text-slate-400 group-hover:text-emerald-500" />
                          )}
                          <span className={cn("text-xs font-bold uppercase tracking-wide", task.completed && "line-through opacity-60")}>
                            {task.label}
                          </span>
                        </button>

                        <button
                          onClick={() => handleDeleteSubtask(step.id, task.id)}
                          className="text-slate-300 hover:text-rose-600 transition-colors p-1"
                          title="Delete milestone task"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step Progress Radial Gauge */}
                <div className="md:w-40 flex md:flex-col items-center justify-center gap-6 border-t md:border-t-0 md:border-l border-white/40 pt-8 md:pt-0">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="42"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        className="text-emerald-100/50"
                      />
                      <motion.circle
                        cx="48"
                        cy="48"
                        r="42"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeDasharray={264}
                        initial={{ strokeDashoffset: 264 }}
                        animate={{ strokeDashoffset: 264 - (calculateProgress(step) / 100 * 264) }}
                        fill="transparent"
                        strokeLinecap="round"
                        className="text-emerald-700"
                      />
                    </svg>
                    <span className="absolute text-sm font-black text-emerald-900">
                      {Math.round(calculateProgress(step))}%
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-black text-emerald-800/40">Step {index + 1}</span>
                    <span className="text-[9px] font-bold text-emerald-600 uppercase">Phase {index === 0 ? 'I' : index === 1 ? 'II' : 'III'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <OnboardingWizard
        isOpen={showWizard}
        onClose={() => setShowWizard(false)}
        onComplete={handleApplyOnboarding}
      />
    </div>
  );
}
