import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Calendar,
  Sparkles,
  Download,
  RotateCcw,
  Plus,
  Compass,
  ChevronRight,
  ShieldCheck,
  LayoutGrid
} from 'lucide-react';
import {
  TrackerTask,
  KanbanColumnId,
  KANBAN_COLUMNS,
  DueFilter,
  TrackerView,
  inferTagFromText,
  inferDueDateFromOffset,
  isDateOverdue,
  isDateThisWeek,
  isDateThisMonth
} from '@/components/tracker/types';
import { KanbanColumn } from '@/components/tracker/KanbanColumn';
import { TrackerListView } from '@/components/tracker/TrackerListView';
import { TrackerThisWeekView } from '@/components/tracker/TrackerThisWeekView';
import { TrackerToolbar } from '@/components/tracker/TrackerToolbar';
import { QuickAddTaskModal } from '@/components/tracker/QuickAddTaskModal';
import { TransitionReadinessLedger } from '@/components/outpost/TransitionReadinessLedger';
import { PageHeader, Badge, Button, useToast } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { getDistrictRecord } from '@/constants';
import { generatePersonalizedRoadmap, Step } from '@/lib/checklistGenerator';
import {
  getStoredTrackerData,
  saveStoredTrackerData,
  calculateHomesteadReadinessScore
} from '@/lib/offlineStorage';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { cn } from '@/lib/utils';

export default function Tracker() {
  const { user } = useAuth();
  const { toast } = useToast();
  const currentDistrictRecord = getDistrictRecord(user?.district || 'Dedza');

  const [showWizard, setShowWizard] = useState(false);
  const [confirmingReset, setConfirmingReset] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [quickAddDefaultCol, setQuickAddDefaultCol] = useState<KanbanColumnId>('todo');

  // 1. Layout persistence: View mode
  const [currentView, setCurrentView] = useState<TrackerView | 'readiness-ledger'>(() => {
    try {
      const saved = localStorage.getItem('outpost_tracker_view_v1');
      if (saved && ['kanban', 'list', 'this-week', 'readiness-ledger'].includes(saved)) {
        return saved as any;
      }
      return 'kanban';
    } catch {
      return 'kanban';
    }
  });

  const handleViewChange = (v: TrackerView | 'readiness-ledger') => {
    setCurrentView(v);
    try {
      localStorage.setItem('outpost_tracker_view_v1', v);
    } catch {}
  };

  // 2. Layout persistence: Collapsed columns
  const [collapsedColumns, setCollapsedColumns] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('outpost_tracker_collapsed_cols_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleToggleCollapse = (columnId: string) => {
    setCollapsedColumns((prev) => {
      const updated = prev.includes(columnId)
        ? prev.filter((c) => c !== columnId)
        : [...prev, columnId];
      try {
        localStorage.setItem('outpost_tracker_collapsed_cols_v1', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // 3. Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [selectedDue, setSelectedDue] = useState<DueFilter>('all');

  // 4. Initialize Tasks with offline compatibility
  const [tasks, setTasks] = useState<TrackerTask[]>(() => {
    // A: Check for rich tasks storage first
    try {
      const savedRich = localStorage.getItem('outpost_tracker_tasks_v2');
      if (savedRich) {
        const parsed = JSON.parse(savedRich);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {}

    // B: Fallback to existing steps storage or personalized generation
    const savedSteps = getStoredTrackerData<Step[]>();
    const baseSteps =
      savedSteps && Array.isArray(savedSteps) && savedSteps.length > 0
        ? savedSteps
        : generatePersonalizedRoadmap({
            district: user?.district || 'Dedza',
            region: user?.region || 'Central',
            homesteadGoal: user?.homesteadGoal || 'Self-Sufficient Organic Homestead',
            householdSize: user?.householdSize || '3-5 Members',
            budgetBand: user?.budgetBand || 'Standard Off-Grid',
            timeline: user?.timeline || 'This Season (3-6 Months)'
          });

    const converted: TrackerTask[] = [];
    baseSteps.forEach((step, sIdx) => {
      step.subtasks.forEach((st, idx) => {
        let col: KanbanColumnId = 'todo';
        if (st.completed) col = 'completed';
        else if (step.id === 'scout') col = 'scouting';
        else if (step.id === 'exodus') col = 'inprogress';

        converted.push({
          id: st.id,
          stepId: step.id,
          stepTitle: step.title,
          title: st.label,
          completed: !!st.completed,
          columnId: col,
          tag: inferTagFromText(st.label),
          dueDate: inferDueDateFromOffset(sIdx * 6 + idx * 3),
          priority: idx === 0 ? 'high' : 'medium',
          order: idx
        });
      });
    });

    return converted;
  });

  // 5. Synchronize Tasks to local storage & steps structure
  useEffect(() => {
    try {
      localStorage.setItem('outpost_tracker_tasks_v2', JSON.stringify(tasks));
    } catch {}

    // Synchronize into steps array for calculateHomesteadReadinessScore
    const stepMap: Record<string, Step> = {
      prepare: {
        id: 'prepare',
        title: 'Phase 1: City Exit & Liquidity',
        description: 'Clear urban debt and build 12-month pantry',
        icon: null,
        subtasks: []
      },
      scout: {
        id: 'scout',
        title: 'Phase 2: Land Scouting & Water',
        description: 'Inspect customary boundaries and test aquifers',
        icon: null,
        subtasks: []
      },
      exodus: {
        id: 'exodus',
        title: 'Phase 3: Outpost Grounding',
        description: 'Solar arrays, planting pits, and simple dwelling',
        icon: null,
        subtasks: []
      }
    };

    tasks.forEach((t) => {
      const stepKey = stepMap[t.stepId] ? t.stepId : 'prepare';
      stepMap[stepKey].subtasks.push({
        id: t.id,
        label: t.title,
        completed: t.completed
      });
    });

    saveStoredTrackerData(Object.values(stepMap));
  }, [tasks]);

  // Readiness Score
  const [readinessBreakdown, setReadinessBreakdown] = useState(() =>
    calculateHomesteadReadinessScore()
  );

  useEffect(() => {
    setReadinessBreakdown(calculateHomesteadReadinessScore());
  }, [tasks]);

  // 6. Global Keyboard Shortcut 'N' for Quick Add
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if (!isInput && (e.key === 'n' || e.key === 'N') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setQuickAddDefaultCol('todo');
        setIsQuickAddOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 7. Filtered Tasks computation
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      // Search
      const matchesSearch =
        searchQuery.trim() === '' ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.stepTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tag.toLowerCase().includes(searchQuery.toLowerCase());

      // Tag
      const matchesTag = selectedTag === 'all' || t.tag === selectedTag;

      // Due
      let matchesDue = true;
      if (selectedDue === 'overdue') {
        matchesDue = !t.completed && isDateOverdue(t.dueDate);
      } else if (selectedDue === 'this-week') {
        matchesDue = isDateThisWeek(t.dueDate);
      } else if (selectedDue === 'this-month') {
        matchesDue = isDateThisMonth(t.dueDate);
      } else if (selectedDue === 'no-date') {
        matchesDue = !t.dueDate;
      }

      return matchesSearch && matchesTag && matchesDue;
    });
  }, [tasks, searchQuery, selectedTag, selectedDue]);

  // Task Operations
  const handleToggleComplete = useCallback((task: TrackerTask) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === task.id) {
          const nextCompleted = !t.completed;
          return {
            ...t,
            completed: nextCompleted,
            columnId: nextCompleted ? 'completed' : 'todo'
          };
        }
        return t;
      })
    );
  }, []);

  const handleUpdateTask = useCallback((updated: TrackerTask) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }, []);

  const handleMoveStage = useCallback((task: TrackerTask, direction: 'prev' | 'next') => {
    const colOrder: KanbanColumnId[] = ['todo', 'inprogress', 'scouting', 'completed'];
    const currentIdx = colOrder.indexOf(task.columnId);
    let nextIdx = direction === 'next' ? currentIdx + 1 : currentIdx - 1;

    if (nextIdx < 0) nextIdx = 0;
    if (nextIdx >= colOrder.length) nextIdx = colOrder.length - 1;

    const targetCol = colOrder[nextIdx];
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === task.id) {
          return {
            ...t,
            columnId: targetCol,
            completed: targetCol === 'completed'
          };
        }
        return t;
      })
    );
  }, []);

  // Delete with Undo Toast
  const handleDeleteTask = useCallback(
    (task: TrackerTask) => {
      const deletedTask = task;
      const deletedIndex = tasks.findIndex((t) => t.id === task.id);

      setTasks((prev) => prev.filter((t) => t.id !== task.id));

      toast({
        message: `Task removed: "${task.title.slice(0, 28)}${task.title.length > 28 ? '...' : ''}"`,
        variant: 'default',
        undo: () => {
          setTasks((prev) => {
            const copy = [...prev];
            copy.splice(deletedIndex, 0, deletedTask);
            return copy;
          });
          toast({ message: 'Task restored to column', variant: 'success' });
        },
        undoLabel: 'Undo'
      });
    },
    [tasks, toast]
  );

  // Add Task
  const handleAddTask = (newTask: Omit<TrackerTask, 'id'>) => {
    const task: TrackerTask = {
      ...newTask,
      id: `task_${Date.now()}`
    };
    setTasks((prev) => [task, ...prev]);
    toast({
      message: `Task added to ${KANBAN_COLUMNS.find((c) => c.id === task.columnId)?.label || 'board'}`,
      variant: 'success'
    });
  };

  // Drag and Drop
  const handleDragStartTask = (e: React.DragEvent, task: TrackerTask) => {
    e.dataTransfer.setData('text/plain', task.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDropTask = (e: React.DragEvent, targetColumnId: string) => {
    const taskId = e.dataTransfer.getData('text/plain');
    if (!taskId) return;
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    if (task.columnId === targetColumnId) return;

    const targetCol = targetColumnId as KanbanColumnId;
    handleUpdateTask({
      ...task,
      columnId: targetCol,
      completed: targetCol === 'completed'
    });

    toast({
      message: `Moved to ${KANBAN_COLUMNS.find((c) => c.id === targetCol)?.label}`,
      variant: 'success'
    });
  };

  // Reset Roadmap
  const handleReset = () => {
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
      timeline: user?.timeline || 'This Season (3-6 Months)'
    });

    const resetTasks: TrackerTask[] = [];
    resetRoadmap.forEach((step, sIdx) => {
      step.subtasks.forEach((st, idx) => {
        let col: KanbanColumnId = 'todo';
        if (st.completed) col = 'completed';
        else if (step.id === 'scout') col = 'scouting';
        else if (step.id === 'exodus') col = 'inprogress';

        resetTasks.push({
          id: st.id,
          stepId: step.id,
          stepTitle: step.title,
          title: st.label,
          completed: !!st.completed,
          columnId: col,
          tag: inferTagFromText(st.label),
          dueDate: inferDueDateFromOffset(sIdx * 6 + idx * 3),
          priority: idx === 0 ? 'high' : 'medium',
          order: idx
        });
      });
    });

    setTasks(resetTasks);
    setConfirmingReset(false);
    toast({ message: 'Roadmap reset to personalized defaults', variant: 'success' });
  };

  // Export Roadmap
  const handleExport = () => {
    const lines = [
      'OUTPOST LIVING - RELOCATION TASK BOARD',
      '=======================================',
      `Steward: ${user?.displayName || 'Steward'}`,
      `Target District: ${user?.district || 'Dedza'} (${user?.region || 'Central'} Region)`,
      `Household Size: ${user?.householdSize || '3-5 Members'}`,
      `Readiness Score: ${readinessBreakdown.totalScorePct}%`,
      `Total Tasks: ${tasks.length} (${tasks.filter((t) => t.completed).length} completed)`,
      `Export Timestamp: ${new Date().toISOString()}`,
      '',
      'TASKS BY STAGE:'
    ];

    KANBAN_COLUMNS.forEach((col) => {
      const colTasks = tasks.filter((t) => t.columnId === col.id);
      lines.push(`\n[${col.stageNumber}] ${col.label.toUpperCase()} (${colTasks.length} tasks)`);
      lines.push('--------------------------------------------------');
      colTasks.forEach((t) => {
        lines.push(
          `  [${t.completed ? 'X' : ' '}] ${t.title} | Tag: ${t.tag} | Due: ${t.dueDate || 'None'}`
        );
      });
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Outpost_Relocation_Tasks_${user?.district || 'Dedza'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ message: 'Task summary exported to text file', variant: 'success' });
  };

  const totalCompleted = tasks.filter((t) => t.completed).length;
  const overallPct = tasks.length > 0 ? Math.round((totalCompleted / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[var(--ground)] text-[var(--ink)] pb-16 transition-colors duration-200">
      <div className="px-4 sm:px-6 md:px-8 py-6 max-w-7xl mx-auto flex flex-col gap-6">
        {/* Page Header with System Tokens */}
        <PageHeader
          eyebrow="Homestead Transition Management"
          title="Relocation tracker & sprint board"
          summary="Desktop workflow console for city exit, site scouting, and outpost establishment. Drag and drop cards, press N to quick-add, or use Alt+arrows to move stages."
          chips={
            <>
              <Badge status="Verified">
                {user?.district || 'Dedza'} District ({currentDistrictRecord?.rainfallAnnualMm || 950} mm/yr rain)
              </Badge>
              <Badge status="Estimate">
                {readinessBreakdown.totalScorePct}% readiness score
              </Badge>
              <span className="font-mono text-[12px] tabular-nums text-[var(--ink-muted)] px-2 py-0.5 rounded-[var(--radius-control)] bg-[var(--surface)] border border-[var(--border)]">
                {overallPct}% complete ({totalCompleted}/{tasks.length})
              </span>
            </>
          }
          actions={
            <Button
              variant="secondary"
              size="sm"
              icon={Sparkles}
              onClick={() => setShowWizard(true)}
            >
              Update profile quiz
            </Button>
          }
        />

        {/* Toolbar: View Switch, Search, Tag Filter, Due Filter, Quick Add */}
        <TrackerToolbar
          currentView={currentView}
          onViewChange={handleViewChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTag={selectedTag}
          onTagChange={setSelectedTag}
          selectedDue={selectedDue}
          onDueChange={setSelectedDue}
          onQuickAdd={() => {
            setQuickAddDefaultCol('todo');
            setIsQuickAddOpen(true);
          }}
          onExport={handleExport}
          onReset={handleReset}
          confirmingReset={confirmingReset}
          totalTasks={tasks.length}
          filteredCount={filteredTasks.length}
        />

        {/* VIEW 1: KANBAN BOARD */}
        {currentView === 'kanban' && (
          <section aria-label="Kanban task board">
            <div className="flex gap-4 items-start overflow-x-auto pb-4">
              {KANBAN_COLUMNS.map((col) => {
                const colTasks = filteredTasks.filter((t) => t.columnId === col.id);
                const isCollapsed = collapsedColumns.includes(col.id);

                return (
                  <div
                    key={col.id}
                    className={cn(
                      'transition-all duration-200 shrink-0',
                      isCollapsed ? 'w-12' : 'flex-1 min-w-[270px] max-w-[340px] xl:max-w-none'
                    )}
                  >
                    <KanbanColumn
                      column={col}
                      tasks={colTasks}
                      isCollapsed={isCollapsed}
                      onToggleCollapse={handleToggleCollapse}
                      onQuickAdd={(colId) => {
                        setQuickAddDefaultCol(colId as any);
                        setIsQuickAddOpen(true);
                      }}
                      onToggleComplete={handleToggleComplete}
                      onUpdateTask={handleUpdateTask}
                      onDeleteTask={handleDeleteTask}
                      onMoveStage={handleMoveStage}
                      onDragStartTask={handleDragStartTask}
                      onDropTask={handleDropTask}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* VIEW 2: LIST VIEW */}
        {currentView === 'list' && (
          <section aria-label="Task list table">
            <TrackerListView
              tasks={filteredTasks}
              onToggleComplete={handleToggleComplete}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              onQuickAdd={(colId) => {
                setQuickAddDefaultCol((colId as any) || 'todo');
                setIsQuickAddOpen(true);
              }}
            />
          </section>
        )}

        {/* VIEW 3: THIS WEEK VIEW */}
        {currentView === 'this-week' && (
          <section aria-label="This week schedule">
            <TrackerThisWeekView
              tasks={filteredTasks}
              onToggleComplete={handleToggleComplete}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              onMoveStage={handleMoveStage}
              onQuickAdd={(colId) => {
                setQuickAddDefaultCol((colId as any) || 'todo');
                setIsQuickAddOpen(true);
              }}
            />
          </section>
        )}

        {/* VIEW 4: READINESS LEDGER (Kept for 5-stage transition continuity) */}
        {currentView === 'readiness-ledger' && (
          <section aria-label="Transition readiness ledger">
            <TransitionReadinessLedger />
          </section>
        )}

        {/* Quick Add Modal (press N) */}
        <QuickAddTaskModal
          isOpen={isQuickAddOpen}
          onClose={() => setIsQuickAddOpen(false)}
          defaultColumnId={quickAddDefaultCol}
          onAddTask={handleAddTask}
        />

        {/* Onboarding Wizard Modal */}
        {showWizard && (
          <OnboardingWizard
            isOpen={showWizard}
            onClose={() => setShowWizard(false)}
            onComplete={() => {
              setShowWizard(false);
              toast({ message: 'Homestead profile updated', variant: 'success' });
            }}
          />
        )}
      </div>
    </div>
  );
}
