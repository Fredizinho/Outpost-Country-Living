import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Circle,
  Mountain,
  Search,
  ShoppingBag,
  Tent,
  Plus,
  Trash2,
  Download,
  RotateCcw,
  Sparkles,
  MapPin,
  Users,
  Wallet,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Sprout,
  LayoutGrid,
  CheckSquare,
  Layers,
  ArrowRightLeft,
  ChevronRight,
  Filter,
  Palette,
  Eye,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme, ColorPalette, FontPairing } from '@/contexts/ThemeContext';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { generatePersonalizedRoadmap, Step, Subtask } from '@/lib/checklistGenerator';
import { getStoredTrackerData, saveStoredTrackerData, calculateHomesteadReadinessScore } from '@/lib/offlineStorage';
import { TransitionReadinessLedger } from '@/components/outpost/TransitionReadinessLedger';
import { getDistrictRecord, PLANTING_PIT_SPECS } from '@/constants';
import { COUNTRY_IMAGES } from '@/assets/images';

export type KanbanColumnId = 'todo' | 'inprogress' | 'scouting' | 'completed';

interface KanbanTaskItem {
  id: string;
  stepId: string;
  stepTitle: string;
  label: string;
  completed: boolean;
  status: KanbanColumnId;
  priority: 'high' | 'medium' | 'normal';
  image?: string;
  districtTag?: string;
}

const ICON_MAP: Record<string, any> = {
  prepare: ShoppingBag,
  scout: Search,
  exodus: Mountain,
};

const KANBAN_COLUMNS: { id: KanbanColumnId; label: string; dotColor: string; description: string }[] = [
  { id: 'todo', label: 'To Do', dotColor: 'bg-rose-500', description: 'City exit, finance clearance & pantry reserves' },
  { id: 'inprogress', label: 'In Progress', dotColor: 'bg-amber-400', description: 'Solar array, deep pits & water piping' },
  { id: 'scouting', label: 'Site Review & Scouting', dotColor: 'bg-cyan-400', description: 'Traditional authority, soils & aquifer depth' },
  { id: 'completed', label: 'Completed', dotColor: 'bg-emerald-500', description: 'Verified homestead milestones grounded' },
];

export default function Tracker() {
  const { user } = useAuth();
  const { theme, setTheme, isField, setFontPairing, isDark } = useTheme();
  const isCharcoal = false;
  const currentDistrictRecord = getDistrictRecord(user?.district || 'Dedza');

  const [showWizard, setShowWizard] = useState(false);
  const [activePerspective, setActivePerspective] = useState<'kanban' | 'milestones' | 'readiness-ledger'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'normal'>('all');

  // Custom task creation state
  const [isAddingKanbanTask, setIsAddingKanbanTask] = useState(false);
  const [kanbanTargetCol, setKanbanTargetCol] = useState<KanbanColumnId>('todo');
  const [newKanbanTaskText, setNewKanbanTaskText] = useState('');
  const [newKanbanPriority, setNewKanbanPriority] = useState<'high' | 'medium' | 'normal'>('medium');

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
  const [confirmingReset, setConfirmingReset] = useState(false);

  // Sync to offlineStorage whenever steps change
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
    if (!confirmingReset) {
      setConfirmingReset(true);
      setTimeout(() => setConfirmingReset(false), 4000);
      return;
    }
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
    setConfirmingReset(false);
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

  useEffect(() => {
    const handleProgressSync = () => {
      setReadinessBreakdown(calculateHomesteadReadinessScore());
    };
    window.addEventListener('outpost:progress-updated', handleProgressSync);
    window.addEventListener('storage', handleProgressSync);
    return () => {
      window.removeEventListener('outpost:progress-updated', handleProgressSync);
      window.removeEventListener('storage', handleProgressSync);
    };
  }, []);

  // Map steps to unified Kanban task items
  const kanbanTasks: KanbanTaskItem[] = useMemo(() => {
    const items: KanbanTaskItem[] = [];
    steps.forEach((step, sIdx) => {
      step.subtasks.forEach((st, idx) => {
        // Assign default Kanban column if not saved
        let status: KanbanColumnId = 'todo';
        if (st.completed) {
          status = 'completed';
        } else if (step.id === 'scout') {
          status = 'scouting';
        } else if (step.id === 'exodus') {
          status = 'inprogress';
        } else {
          status = 'todo';
        }

        // Priority heuristics
        let priority: 'high' | 'medium' | 'normal' = 'normal';
        if (idx === 0 || st.label.toLowerCase().includes('water') || st.label.toLowerCase().includes('debt')) {
          priority = 'high';
        } else if (st.label.toLowerCase().includes('solar') || st.label.toLowerCase().includes('land')) {
          priority = 'medium';
        }

        // Thumbnail previews for flagship architectural / permaculture milestones
        let image: string | undefined;
        if (st.label.toLowerCase().includes('orchard') || st.label.toLowerCase().includes('pit')) {
          image = COUNTRY_IMAGES.permacultureGarden;
        } else if (st.label.toLowerCase().includes('soil') || st.label.toLowerCase().includes('scout')) {
          image = COUNTRY_IMAGES.homesteadHighlands;
        } else if (st.label.toLowerCase().includes('water') || st.label.toLowerCase().includes('aquifer')) {
          image = COUNTRY_IMAGES.offgridHomesteadWater;
        } else if (st.label.toLowerCase().includes('solar') || st.label.toLowerCase().includes('shelter')) {
          image = COUNTRY_IMAGES.malawiHomesteadSanctuary;
        }

        items.push({
          id: st.id,
          stepId: step.id,
          stepTitle: step.title,
          label: st.label,
          completed: st.completed,
          status,
          priority,
          image,
          districtTag: user?.district || 'Dedza'
        });
      });
    });
    return items;
  }, [steps, user?.district]);

  // Filtered Kanban tasks
  const filteredKanbanTasks = useMemo(() => {
    return kanbanTasks.filter((task) => {
      const matchesSearch = searchQuery.trim() === '' || 
        task.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.stepTitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      return matchesSearch && matchesPriority;
    });
  }, [kanbanTasks, searchQuery, filterPriority]);

  // Advance task to next Kanban stage
  const handleAdvanceTask = (task: KanbanTaskItem) => {
    const nextColMap: Record<KanbanColumnId, KanbanColumnId> = {
      todo: 'scouting',
      scouting: 'inprogress',
      inprogress: 'completed',
      completed: 'todo'
    };
    const next = nextColMap[task.status];
    if (next === 'completed') {
      toggleSubtask(task.stepId, task.id);
    } else if (task.completed) {
      toggleSubtask(task.stepId, task.id);
    }
  };

  // Add task directly from Kanban column button
  const handleCreateKanbanTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKanbanTaskText.trim()) return;

    // Map column to step
    const targetStepId = kanbanTargetCol === 'scouting' ? 'scout' : kanbanTargetCol === 'inprogress' ? 'exodus' : 'prepare';
    const isCompleted = kanbanTargetCol === 'completed';

    setSteps(prev => prev.map(step => {
      if (step.id === targetStepId) {
        return {
          ...step,
          subtasks: [
            ...step.subtasks,
            { id: `custom_${Date.now()}`, label: newKanbanTaskText.trim(), completed: isCompleted }
          ]
        };
      }
      return step;
    }));

    setNewKanbanTaskText('');
    setIsAddingKanbanTask(false);
  };

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
    <div className="min-h-screen bg-[#F6F1E7] dark:bg-[#0E1712] text-[#1F2A22] dark:text-[#F6F1E7] pb-16 transition-colors duration-200">
      <div className="px-4 sm:px-6 md:px-8 py-5 max-w-7xl mx-auto flex flex-col gap-6">
        {/* ====================================================================
            1. BREADCRUMB & METRIC HEADER BAR
        ==================================================================== */}
        <div className="flex flex-col gap-3">
          {/* Top Breadcrumbs */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-[#5A6458] dark:text-[#9FB3A4] font-mono">
              <Link to="/" className="hover:text-[#1F2A22] dark:hover:text-[#F6F1E7] transition-colors">
                Outpost
              </Link>
              <ChevronRight size={12} className="text-[#5A6458] dark:text-[#9FB3A4]" />
              <span className="text-[#1F2A22] dark:text-[#F6F1E7] font-semibold">
                Homestead Projects
              </span>
              <ChevronRight size={12} className="text-[#5A6458] dark:text-[#9FB3A4]" />
              <span className="text-[#B4531F] dark:text-[#D4A034] font-bold">
                City-to-Country Relocation Tasks
              </span>
            </div>

            {/* Quick Field Mode Toggle Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setTheme(theme === 'field' ? 'dark' : 'field');
                }}
                title="Toggle Maximum-Contrast Field Mode"
                className={cn(
                  'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-xs transition-all duration-200 cursor-pointer border',
                  theme === 'field'
                    ? 'bg-white text-black border-white font-bold shadow-xs'
                    : 'bg-[#FFFDF8] dark:bg-[#17241C] hover:bg-[#EAE2D2] dark:hover:bg-[#1F3325] text-[#1F2A22] dark:text-[#F6F1E7] border-[#E4DCCB] dark:border-[#283C30]'
                )}
              >
                <Eye size={12} className={theme === 'field' ? 'text-black' : 'text-[#D4A034]'} />
                <span>{theme === 'field' ? 'Field Mode Active' : 'Field Mode'}</span>
              </button>
              <button
                onClick={handleExportRoadmap}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#FFFDF8] dark:bg-[#17241C] hover:bg-[#EAE2D2] dark:hover:bg-[#1F3325] border border-[#E4DCCB] dark:border-[#283C30] text-[#1F2A22] dark:text-[#F6F1E7] transition-colors cursor-pointer"
              >
                <Download size={12} />
                <span>Export .TXT</span>
              </button>
            </div>
          </div>

          {/* Header Title + Stats Row */}
          <div className="p-5 sm:p-6 rounded-xl bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5 transition-colors">
            <div className="flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#2B4636] dark:text-[#D4A034]">
                <span>Outpost Task Board · Malawi Country Living Sizing</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#5A6458] dark:text-[#9FB3A4] font-normal">
                  {user?.district || 'Dedza'}, {user?.region || 'Central'} ({currentDistrictRecord?.rainfallAnnualMm || 950}mm/yr rain) · {user?.householdSize || '3-5 Members'}
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1F2A22] dark:text-[#FFFDF8]">
                City-to-Country Relocation Tasks &amp; Milestones
              </h1>
              <p className="text-xs sm:text-sm text-[#5A6458] dark:text-[#9FB3A4] max-w-2xl leading-relaxed">
                Organized into 4 actionable sprint columns. Move tasks between stages or mark complete as your family prepares, scouts land, and establishes your self-sufficient sanctuary.
              </p>
            </div>

            {/* Quick Metrics Capsule */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="p-3 rounded-lg bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30] flex flex-col">
                <span className="text-caption text-[#5A6458] dark:text-[#9FB3A4]">Total Completion</span>
                <span className="text-base font-mono font-bold text-[#2B4636] dark:text-[#86EFAC] tabular-nums">
                  {Math.round(overallProgress)}% ({totalCompleted}/{totalTasks})
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30] flex flex-col">
                <span className="text-caption text-[#5A6458] dark:text-[#9FB3A4]">Readiness Score</span>
                <span className="text-base font-mono font-bold text-[#B4531F] dark:text-[#D4A034] tabular-nums">
                  {readinessBreakdown.totalScorePct}% Ready
                </span>
              </div>
              <button
                onClick={() => setShowWizard(true)}
                className="px-4 py-2.5 rounded-lg bg-[#B4531F] dark:bg-[#D3672E] hover:opacity-90 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer transition-all duration-200"
              >
                <Sparkles size={14} />
                <span>{user?.onboardingCompleted ? 'Update Profile' : 'Start Sizer Quiz'}</span>
              </button>
            </div>
          </div>

          {/* Perspective Switcher & Search Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {/* 3 Perspectives: Kanban Board, Checklist, 5-Stage Ledger */}
            <div className="inline-flex items-center gap-1 bg-[#F6F1E7] dark:bg-[#0E1712] p-1 rounded-lg border border-[#E4DCCB] dark:border-[#283C30]">
              {[
                { id: 'kanban' as const, label: '01 · Kanban Board', icon: LayoutGrid },
                { id: 'milestones' as const, label: '02 · 3-Phase Checklist', icon: CheckSquare },
                { id: 'readiness-ledger' as const, label: '03 · 5-Stage Readiness Ledger', icon: Layers },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activePerspective === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActivePerspective(tab.id)}
                    className={cn(
                      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 cursor-pointer',
                      active
                        ? 'bg-[#2B4636] dark:bg-[#283C30] text-white shadow-xs font-bold'
                        : 'text-[#5A6458] dark:text-[#9FB3A4] hover:bg-[#FFFDF8] dark:hover:bg-[#17241C] hover:text-[#1F2A22] dark:hover:text-[#F6F1E7]'
                    )}
                  >
                    <Icon size={13} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search + Priority Filters + Add Task */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search size={13} className="absolute left-3 top-2.5 text-[#5A6458] dark:text-[#9FB3A4]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tasks or phases..."
                  className="pl-8 pr-3 py-1.5 rounded-lg bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30] text-xs text-[#1F2A22] dark:text-[#F6F1E7] placeholder:text-[#5A6458] dark:placeholder:text-[#9FB3A4] focus:outline-none focus:border-[#B4531F] dark:focus:border-[#D3672E] w-44 sm:w-56 transition-colors"
                />
              </div>

              <div className="inline-flex items-center gap-1 bg-[#F6F1E7] dark:bg-[#0E1712] p-0.5 rounded-lg border border-[#E4DCCB] dark:border-[#283C30] text-xs">
                {(['all', 'high', 'medium', 'normal'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setFilterPriority(p)}
                    className={cn(
                      'px-2 py-1 rounded-md text-caption font-mono capitalize transition-all duration-200 cursor-pointer',
                      filterPriority === p
                        ? 'bg-[#2B4636] dark:bg-[#283C30] text-white font-bold'
                        : 'text-[#5A6458] dark:text-[#9FB3A4] hover:text-[#1F2A22] dark:hover:text-[#F6F1E7]'
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsAddingKanbanTask(true)}
                className="px-3 py-1.5 rounded-lg bg-[#2B4636] hover:bg-[#1F3325] dark:bg-[#283C30] dark:hover:bg-[#344E3E] text-white font-semibold text-xs inline-flex items-center gap-1 cursor-pointer transition-all duration-200 shadow-xs"
              >
                <Plus size={14} />
                <span>Create Task</span>
              </button>
            </div>
          </div>
        </div>

        {/* ====================================================================
            2. PERSPECTIVE 01: 4-COLUMN KANBAN BOARD
        ==================================================================== */}
        {activePerspective === 'kanban' && (
          <section aria-label="Kanban Task Board" className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
              {KANBAN_COLUMNS.map((col) => {
                const colTasks = filteredKanbanTasks.filter((t) => t.status === col.id);
                return (
                  <div
                    key={col.id}
                    className="flex flex-col gap-3 p-3.5 sm:p-4 rounded-xl bg-[#FFFDF8] dark:bg-[#132018] border border-[#E4DCCB] dark:border-[#283C30] min-h-[550px] transition-colors shadow-xs"
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-[#E4DCCB] dark:border-[#283C30]">
                      <div className="flex items-center gap-2">
                        <span className={cn('w-2 h-2 rounded-full shrink-0', col.dotColor)} />
                        <h2 className="font-serif text-sm font-bold text-[#1F2A22] dark:text-[#FFFDF8]">
                          {col.label}
                        </h2>
                        <span className="font-mono text-xs font-semibold text-[#5A6458] dark:text-[#9FB3A4]">
                          {colTasks.length}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setKanbanTargetCol(col.id);
                          setIsAddingKanbanTask(true);
                        }}
                        title={`Add task to ${col.label}`}
                        className="p-1.5 rounded-lg hover:bg-[#F6F1E7] dark:hover:bg-[#1C2E23] text-[#5A6458] dark:text-[#9FB3A4] hover:text-[#1F2A22] dark:hover:text-[#FFFDF8] transition-colors cursor-pointer"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <p className="text-caption text-[#5A6458] dark:text-[#9FB3A4] line-clamp-1">
                      {col.description}
                    </p>

                    {/* Tasks List in Column */}
                    <div className="flex flex-col gap-3">
                      {colTasks.length === 0 ? (
                        <div className="p-6 rounded-xl border border-dashed border-[#E4DCCB] dark:border-[#283C30] text-center text-xs text-[#5A6458] dark:text-[#9FB3A4] flex flex-col items-center gap-1.5">
                          <span>No tasks in this stage</span>
                          <button
                            type="button"
                            onClick={() => {
                              setKanbanTargetCol(col.id);
                              setIsAddingKanbanTask(true);
                            }}
                            className="text-[#B85D36] dark:text-[#E2875A] hover:underline font-semibold"
                          >
                            + Add a task
                          </button>
                        </div>
                      ) : (
                        colTasks.map((task) => (
                          <div
                            key={task.id}
                            className="group p-3.5 rounded-xl border border-[#E4DCCB] dark:border-[#283C30] bg-[#F6F1E7]/70 dark:bg-[#1A2920] hover:border-[#B85D36]/60 dark:hover:border-[#E2875A]/60 transition-all flex flex-col gap-2.5 shadow-xs relative overflow-hidden"
                          >
                            {/* Optional Architectural Preview Banner */}
                            {task.image && (
                              <div className="w-full h-28 rounded-lg overflow-hidden relative">
                                <img
                                  src={task.image}
                                  alt={task.label}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                <span className="absolute bottom-2 left-2 text-caption font-mono text-white/90 font-semibold px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs">
                                  Blueprint Preview
                                </span>
                              </div>
                            )}

                            {/* Top Row: Priority & Phase Metadata */}
                            <div className="flex items-center justify-between gap-2 text-xs">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={cn(
                                    'w-2 h-2 rounded-full',
                                    task.priority === 'high'
                                      ? 'bg-rose-500'
                                      : task.priority === 'medium'
                                      ? 'bg-[#E2875A]'
                                      : 'bg-[#4E6B5D]'
                                  )}
                                />
                                <span className="font-mono text-caption font-semibold text-[#5A6458] dark:text-[#9FB3A4]">
                                  {task.priority.toUpperCase()} · {task.stepTitle}
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleDeleteSubtask(task.stepId, task.id)}
                                title="Delete task"
                                className="text-[#5A6458] dark:text-[#9FB3A4] hover:text-rose-500 transition-colors p-0.5 cursor-pointer opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>

                            {/* Task Description */}
                            <div className="flex items-start gap-2.5">
                              <button
                                type="button"
                                onClick={() => toggleSubtask(task.stepId, task.id)}
                                className="mt-0.5 shrink-0 cursor-pointer"
                                title={task.completed ? 'Mark incomplete' : 'Mark completed'}
                              >
                                {task.completed ? (
                                  <CheckCircle2 size={16} className="text-[#2C4A3E] dark:text-[#7EA28C]" />
                                ) : (
                                  <Circle size={16} className="text-[#5A6458] dark:text-[#7A8E80] hover:text-[#B85D36] dark:hover:text-[#E2875A] transition-colors" />
                                )}
                              </button>
                              <span
                                className={cn(
                                  'text-xs font-semibold leading-relaxed',
                                  task.completed
                                    ? 'line-through text-[#5A6458] dark:text-[#7A8E80]'
                                    : 'text-[#1F2A22] dark:text-[#FFFDF8]'
                                )}
                              >
                                {task.label}
                              </span>
                            </div>

                            {/* Card Footer: District Tag & Move Stage Button */}
                            <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#E4DCCB] dark:border-[#283C30] text-xs">
                              <span className="font-mono text-caption text-[#5A6458] dark:text-[#9FB3A4] truncate">
                                Target: {task.districtTag}
                              </span>

                              <button
                                type="button"
                                onClick={() => handleAdvanceTask(task)}
                                className="inline-flex items-center gap-1 text-caption font-semibold text-[#B85D36] dark:text-[#E2875A] hover:underline cursor-pointer"
                              >
                                <span>Advance Stage</span>
                                <ArrowRight size={11} />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

      {/* ====================================================================
          3. PERSPECTIVE 02: 3-PHASE STEP CARDS CHECKLIST
      ==================================================================== */}
      {activePerspective === 'milestones' && (
        <div className="flex flex-col gap-6">
          {steps.map((step, index) => {
            const Icon = ICON_MAP[step.id] || Tent;
            const isAdding = activeAddingStep === step.id;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#FFFDF8] dark:bg-[#17241C] rounded-2xl border border-[#E4DCCB] dark:border-[#283C30] shadow-xs overflow-hidden"
              >
                <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8">
                  <div className="flex-1 flex flex-col gap-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#F6F1E7] dark:bg-[#102017] text-[#2C4A3E] dark:text-[#E2875A] border border-[#E4DCCB] dark:border-[#283C30] flex items-center justify-center shrink-0">
                          <Icon size={24} />
                        </div>
                        <div>
                          <h3 className="font-serif text-2xl font-bold text-[#1F2A22] dark:text-[#FFFDF8]">
                            {step.title}
                          </h3>
                          <p className="text-sm text-[#5A6458] dark:text-[#9FB3A4] font-medium mt-1 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveAddingStep(isAdding ? null : step.id)}
                        className="bg-[#F6F1E7] hover:bg-[#E4DCCB] dark:bg-[#102017] dark:hover:bg-[#1E3024] text-[#1F2A22] dark:text-[#F6F1E7] border border-[#E4DCCB] dark:border-[#283C30] text-xs font-semibold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                      >
                        <Plus size={13} /> Add Milestone
                      </button>
                    </div>

                    {isAdding && (
                      <div className="bg-[#F6F1E7] dark:bg-[#102017] p-4 rounded-xl border border-[#E4DCCB] dark:border-[#283C30] flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          placeholder="e.g. Purchase solar freezer or inspect water well..."
                          value={newTaskInput[step.id] || ''}
                          onChange={(e) => setNewTaskInput({ ...newTaskInput, [step.id]: e.target.value })}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddCustomTask(step.id)}
                          className="flex-1 bg-white dark:bg-[#17241C] text-[#1F2A22] dark:text-[#FFFDF8] placeholder:text-[#5A6458] px-4 py-2 rounded-xl border border-[#E4DCCB] dark:border-[#283C30] text-xs font-medium focus:outline-none focus:ring-1 ring-[#B85D36]"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAddCustomTask(step.id)}
                            className="bg-[#B85D36] hover:bg-[#A34F2C] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xs cursor-pointer transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setActiveAddingStep(null)}
                            className="bg-[#E4DCCB] dark:bg-[#283C30] text-[#1F2A22] dark:text-[#F6F1E7] px-3 py-2 rounded-xl text-xs font-semibold hover:bg-stone-300 dark:hover:bg-stone-700 cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-2.5 mt-1">
                      {step.subtasks.map((task) => (
                        <div
                          key={task.id}
                          className={cn(
                            'flex items-center justify-between gap-4 p-3.5 sm:p-4 rounded-xl transition-all border group',
                            task.completed
                              ? 'bg-[#EBF2ED] dark:bg-[#162B1F] text-[#2C4A3E] dark:text-[#88B89E] border-[#C3D9C9] dark:border-[#284E37]'
                              : 'bg-[#F6F1E7]/70 dark:bg-[#102017] text-[#1F2A22] dark:text-[#F6F1E7] border-[#E4DCCB] dark:border-[#283C30] hover:border-[#B85D36]/50 dark:hover:border-[#E2875A]/50'
                          )}
                        >
                          <button
                            onClick={() => toggleSubtask(step.id, task.id)}
                            className="flex items-center gap-3.5 flex-1 text-left cursor-pointer"
                          >
                            {task.completed ? (
                              <CheckCircle2 size={20} className="shrink-0 text-[#2C4A3E] dark:text-[#88B89E]" />
                            ) : (
                              <Circle size={20} className="shrink-0 text-[#5A6458] dark:text-[#7A8E80] group-hover:text-[#B85D36] dark:group-hover:text-[#E2875A]" />
                            )}
                            <span className={cn('text-sm font-medium leading-snug', task.completed && 'line-through opacity-60')}>
                              {task.label}
                            </span>
                          </button>

                          <button
                            onClick={() => handleDeleteSubtask(step.id, task.id)}
                            className="text-[#5A6458] dark:text-[#7A8E80] hover:text-rose-500 dark:hover:text-rose-400 transition-colors p-1 cursor-pointer"
                            title="Delete milestone task"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step Radial Progress */}
                  <div className="md:w-40 flex md:flex-col items-center justify-center gap-5 border-t md:border-t-0 md:border-l border-[#E4DCCB] dark:border-[#283C30] pt-6 md:pt-0">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="42"
                          stroke="currentColor"
                          strokeWidth="6"
                          fill="transparent"
                          className="text-[#E4DCCB] dark:text-[#283C30]"
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
                          className="text-[#B85D36] dark:text-[#E2875A]"
                        />
                      </svg>
                      <span className="absolute text-sm font-mono font-bold text-[#1F2A22] dark:text-[#FFFDF8] tabular-nums">
                        {Math.round(calculateProgress(step))}%
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5 text-center">
                      <span className="text-xs font-semibold text-[#5A6458] dark:text-[#9FB3A4]">Step 0{index + 1}</span>
                      <span className="text-xs font-mono font-bold text-[#B85D36] dark:text-[#E2875A]">Phase {index === 0 ? 'I' : index === 1 ? 'II' : 'III'}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ====================================================================
          4. PERSPECTIVE 03: 5-STAGE SPIRIT OF PROPHECY TRANSITION LEDGER
      ==================================================================== */}
      {activePerspective === 'readiness-ledger' && (
        <section>
          <TransitionReadinessLedger />
        </section>
      )}

      {/* ====================================================================
          MODAL: CREATE NEW KANBAN TASK DIALOG
      ==================================================================== */}
      <AnimatePresence>
        {isAddingKanbanTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-[#18181B] border border-stone-200 dark:border-white/15 shadow-2xl flex flex-col gap-4 text-stone-900 dark:text-white"
            >
              <div className="flex items-center justify-between border-b pb-3 border-stone-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <LayoutGrid size={18} className="text-amber-400" />
                  <h3 className="font-display text-lg font-bold">Create Kanban Task</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddingKanbanTask(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleCreateKanbanTask} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-stone-700 dark:text-stone-300">
                    Task Description
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newKanbanTaskText}
                    onChange={(e) => setNewKanbanTaskText(e.target.value)}
                    placeholder="e.g. Inspect solar inverter warranty or order heirloom maize seeds..."
                    className="w-full px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-white/15 text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-stone-700 dark:text-stone-300">
                      Target Column
                    </label>
                    <select
                      value={kanbanTargetCol}
                      onChange={(e) => setKanbanTargetCol(e.target.value as KanbanColumnId)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-white/15 text-xs text-stone-900 dark:text-white"
                    >
                      <option value="todo">To Do</option>
                      <option value="scouting">Site Review & Scouting</option>
                      <option value="inprogress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-stone-700 dark:text-stone-300">
                      Priority
                    </label>
                    <select
                      value={newKanbanPriority}
                      onChange={(e) => setNewKanbanPriority(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-white/15 text-xs text-stone-900 dark:text-white"
                    >
                      <option value="high">High Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="normal">Normal</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingKanbanTask(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-md"
                  >
                    Save Task
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <OnboardingWizard
        isOpen={showWizard}
        onClose={() => setShowWizard(false)}
        onComplete={handleApplyOnboarding}
      />
      </div>
    </div>
  );
}
