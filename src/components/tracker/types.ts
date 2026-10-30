export type KanbanColumnId = 'todo' | 'inprogress' | 'scouting' | 'completed';

export type TrackerTag =
  | 'Water'
  | 'Solar'
  | 'Soil'
  | 'Land'
  | 'Finance'
  | 'Food'
  | 'Shelter'
  | 'Sanctuary'
  | 'General';

export interface TrackerTask {
  id: string;
  stepId: string;
  stepTitle: string;
  title: string;
  completed: boolean;
  columnId: KanbanColumnId;
  tag: TrackerTag;
  dueDate?: string; // YYYY-MM-DD
  priority?: 'high' | 'medium' | 'normal';
  createdAt?: string;
  order?: number;
}

export interface KanbanColumnSpec {
  id: KanbanColumnId;
  stageNumber: string;
  label: string;
  description: string;
}

export const KANBAN_COLUMNS: KanbanColumnSpec[] = [
  {
    id: 'todo',
    stageNumber: '01',
    label: 'To do',
    description: 'City exit, finance clearance & staple food reserves'
  },
  {
    id: 'inprogress',
    stageNumber: '02',
    label: 'In progress',
    description: 'Active works: solar arrays, deep pits & water piping'
  },
  {
    id: 'scouting',
    stageNumber: '03',
    label: 'Site scouting',
    description: 'Traditional authority, soil percolation & aquifer testing'
  },
  {
    id: 'completed',
    stageNumber: '04',
    label: 'Completed',
    description: 'Verified milestones grounded on the homestead'
  }
];

export const ALL_TAGS: TrackerTag[] = [
  'Water',
  'Solar',
  'Soil',
  'Land',
  'Finance',
  'Food',
  'Shelter',
  'Sanctuary',
  'General'
];

export type DueFilter = 'all' | 'overdue' | 'this-week' | 'this-month' | 'no-date';
export type TrackerView = 'kanban' | 'list' | 'this-week';

export function inferTagFromText(text: string): TrackerTag {
  const lower = text.toLowerCase();
  if (lower.includes('water') || lower.includes('borehole') || lower.includes('aquifer') || lower.includes('rain') || lower.includes('well') || lower.includes('pipe') || lower.includes('pump')) {
    return 'Water';
  }
  if (lower.includes('solar') || lower.includes('battery') || lower.includes('inverter') || lower.includes('pv') || lower.includes('energy') || lower.includes('panel')) {
    return 'Solar';
  }
  if (lower.includes('soil') || lower.includes('pit') || lower.includes('compost') || lower.includes('biochar') || lower.includes('bed') || lower.includes('orchard') || lower.includes('edenic')) {
    return 'Soil';
  }
  if (lower.includes('land') || lower.includes('chief') || lower.includes('customary') || lower.includes('deed') || lower.includes('tenure') || lower.includes('boundary') || lower.includes('scout')) {
    return 'Land';
  }
  if (lower.includes('debt') || lower.includes('budget') || lower.includes('fund') || lower.includes('bank') || lower.includes('reserve') || lower.includes('finance') || lower.includes('liquidity')) {
    return 'Finance';
  }
  if (lower.includes('food') || lower.includes('grain') || lower.includes('pantry') || lower.includes('maize') || lower.includes('beans') || lower.includes('ration') || lower.includes('storage') || lower.includes('flour')) {
    return 'Food';
  }
  if (lower.includes('tent') || lower.includes('shelter') || lower.includes('house') || lower.includes('roof') || lower.includes('woodlot') || lower.includes('block') || lower.includes('brick')) {
    return 'Shelter';
  }
  if (lower.includes('sanctuary') || lower.includes('sabbath') || lower.includes('prayer') || lower.includes('curriculum') || lower.includes('family') || lower.includes('devotion') || lower.includes('prophetic')) {
    return 'Sanctuary';
  }
  return 'General';
}

export function inferDueDateFromOffset(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

export function isDateOverdue(dateStr?: string): boolean {
  if (!dateStr) return false;
  const today = new Date().toISOString().slice(0, 10);
  return dateStr < today;
}

export function isDateThisWeek(dateStr?: string): boolean {
  if (!dateStr) return false;
  const target = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  
  // Set to beginning of current week (Monday)
  const currentDay = now.getDay();
  const diffToMonday = (currentDay === 0 ? -6 : 1) - currentDay;
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() + diffToMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  // Set to end of current week (Sunday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return target >= startOfWeek && target <= endOfWeek;
}

export function isDateThisMonth(dateStr?: string): boolean {
  if (!dateStr) return false;
  const now = new Date();
  const currentYearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  return dateStr.startsWith(currentYearMonth);
}

export function formatDueDate(dateStr?: string): string {
  if (!dateStr) return 'No due date';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return dateStr;
  } catch {
    return dateStr;
  }
}
