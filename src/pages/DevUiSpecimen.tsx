import React, { useState } from 'react';
import {
  PageHeader,
  Button,
  IconButton,
  Chip,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Tabs,
  SplitPane,
  Dialog,
  Drawer,
  Tooltip,
  useToast,
  EmptyState,
  Skeleton,
  SkeletonText,
  SkeletonCard,
  Field,
  Input,
  Select,
  Slider,
  Toggle,
  DataTable,
  Column
} from '@/components/ui';
import {
  Compass,
  Download,
  Trash2,
  Bookmark,
  Share2,
  Search,
  Filter,
  CheckCircle,
  FolderOpen,
  SlidersHorizontal,
  Info,
  Calendar,
  Layers,
  MapPin,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface OutpostRecord {
  id: string;
  name: string;
  region: string;
  elevation: number;
  acres: number;
  rainfall: number;
  status: 'Draft' | 'Reviewed' | 'Verified' | 'Estimate' | 'Illustrative';
}

const SAMPLE_RECORDS: OutpostRecord[] = [
  {
    id: 'OUT-101',
    name: 'Dedza Highlands Outpost',
    region: 'Central Region',
    elevation: 1640,
    acres: 42.5,
    rainfall: 1150,
    status: 'Verified'
  },
  {
    id: 'OUT-102',
    name: 'Viphya Forest Farm',
    region: 'Northern Region',
    elevation: 1720,
    acres: 88.0,
    rainfall: 1320,
    status: 'Reviewed'
  },
  {
    id: 'OUT-103',
    name: 'Mulanje Foothill Sanitarium',
    region: 'Southern Region',
    elevation: 890,
    acres: 15.0,
    rainfall: 1600,
    status: 'Draft'
  },
  {
    id: 'OUT-104',
    name: 'Zomba Plateau Retreat',
    region: 'Southern Region',
    elevation: 1450,
    acres: 27.3,
    rainfall: 1280,
    status: 'Estimate'
  },
  {
    id: 'OUT-105',
    name: 'Dowa Agricultural Training Site',
    region: 'Central Region',
    elevation: 1350,
    acres: 54.2,
    rainfall: 980,
    status: 'Verified'
  },
  {
    id: 'OUT-106',
    name: 'Nyika Northern Sanctuary',
    region: 'Northern Region',
    elevation: 2100,
    acres: 120.0,
    rainfall: 1450,
    status: 'Illustrative'
  },
  {
    id: 'OUT-107',
    name: 'Ntcheu Seed Bank & Apiary',
    region: 'Central Region',
    elevation: 1280,
    acres: 19.4,
    rainfall: 1040,
    status: 'Reviewed'
  }
];

export default function DevUiSpecimen() {
  const { toast } = useToast();

  // State for interactive components
  const [activeSegmentTab, setActiveSegmentTab] = useState('overview');
  const [activeUnderlineTab, setActiveUnderlineTab] = useState('components');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedChips, setSelectedChips] = useState<string[]>(['Agriculture', 'Highlands']);

  // Form states
  const [textInputVal, setTextInputVal] = useState('Dedza Highland Outpost #1');
  const [numberInputVal, setNumberInputVal] = useState(1640);
  const [selectVal, setSelectVal] = useState('temperate');
  const [sliderVal, setSliderVal] = useState(45);
  const [toggleVal, setToggleVal] = useState(true);

  // Destructive deletion state for Undo demonstration
  const [records, setRecords] = useState<OutpostRecord[]>(SAMPLE_RECORDS);
  const [recentlyDeleted, setRecentlyDeleted] = useState<{ item: OutpostRecord; index: number } | null>(null);

  const handleChipToggle = (name: string) => {
    setSelectedChips((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const handleChipDismiss = (name: string) => {
    setSelectedChips((prev) => prev.filter((c) => c !== name));
  };

  const handleDeleteFirstItem = () => {
    if (records.length === 0) return;
    const itemToDelete = records[0];
    const indexToDelete = 0;
    setRecentlyDeleted({ item: itemToDelete, index: indexToDelete });
    setRecords((prev) => prev.slice(1));

    toast({
      message: `Deleted "${itemToDelete.name}"`,
      variant: 'destructive',
      duration: 7000,
      undoLabel: 'Undo',
      undo: () => {
        setRecords((prev) => [itemToDelete, ...prev]);
        setRecentlyDeleted(null);
        toast({
          message: `Restored "${itemToDelete.name}" successfully`,
          variant: 'success'
        });
      }
    });
  };

  const tableColumns: Column<OutpostRecord>[] = [
    {
      key: 'id',
      header: 'Code',
      isNumeric: true,
      width: '100px'
    },
    {
      key: 'name',
      header: 'Site name',
      accessor: (row) => (
        <span className="font-medium text-[var(--ink)]">{row.name}</span>
      )
    },
    {
      key: 'region',
      header: 'Region'
    },
    {
      key: 'elevation',
      header: 'Elevation (m)',
      isNumeric: true,
      accessor: (row) => `${row.elevation.toLocaleString()} m`
    },
    {
      key: 'acres',
      header: 'Area (acres)',
      isNumeric: true,
      accessor: (row) => `${row.acres.toFixed(1)} ac`
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (row) => <Badge status={row.status} />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full flex flex-col gap-10">
      {/* 1. Page Header Specimen */}
      <PageHeader
        title="Shared UI kit & design tokens"
        eyebrow="System Specimen"
        summary="A production-ready component library built with Fraunces headings, Plus Jakarta Sans chrome, strict 6/10/16 radii, and accessible token-based palettes."
        chips={
          <>
            <Badge status="Verified" />
            <Chip label="13px chrome" />
            <Chip label="16px content" />
            <Chip label="6/10/16 radii" />
            <Chip label="No raw hex" />
          </>
        }
        actions={
          <>
            <Button
              variant="secondary"
              icon={Download}
              onClick={() =>
                toast({
                  message: 'Design token specification exported',
                  variant: 'success'
                })
              }
            >
              Export tokens
            </Button>
            {/* Exactly one primary button per view */}
            <Button
              variant="primary"
              icon={Compass}
              onClick={() => setIsDialogOpen(true)}
            >
              Open dialog
            </Button>
          </>
        }
      />

      {/* 2. Navigation Tabs Specimen */}
      <div className="flex flex-col gap-4">
        <h2 className="font-serif text-[20px] font-semibold text-[var(--ink)]">
          Navigation tabs
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Tabs
            variant="segmented"
            activeTab={activeSegmentTab}
            onChange={setActiveSegmentTab}
            tabs={[
              { id: 'overview', label: 'Overview' },
              { id: 'components', label: 'All components', badge: 16 },
              { id: 'guidelines', label: 'Guidelines' }
            ]}
          />
          <Tabs
            variant="underline"
            activeTab={activeUnderlineTab}
            onChange={setActiveUnderlineTab}
            tabs={[
              { id: 'components', label: 'Components' },
              { id: 'tokens', label: 'Tokens' },
              { id: 'accessibility', label: 'Accessibility' }
            ]}
          />
        </div>
      </div>

      {/* 3. Typography & 70-Character Measure Specimen */}
      <section className="flex flex-col gap-4">
        <h2 className="font-serif text-[20px] font-semibold text-[var(--ink)]">
          Typography & reading measure
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Editorial hierarchy and character bounds</CardTitle>
            <CardDescription>
              Titles set in Fraunces serif; interface elements in Plus Jakarta Sans; numbers and codes in JetBrains Mono.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="max-w-[70ch] text-[16px] leading-relaxed text-[var(--ink)]">
              This paragraph is constrained to a maximum of 70 characters per line. Optimal line length ensures comfortable reading without visual fatigue when studying extensive agricultural or prophetic literature.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-[var(--ground)] border border-[var(--border)] rounded-[var(--radius-control)] flex flex-col gap-1">
                <span className="text-[12px] font-sans font-medium text-[var(--ink-muted)]">Chrome size</span>
                <span className="text-[13px] font-sans font-semibold text-[var(--ink)]">13px Plus Jakarta Sans</span>
              </div>
              <div className="p-3 bg-[var(--ground)] border border-[var(--border)] rounded-[var(--radius-control)] flex flex-col gap-1">
                <span className="text-[12px] font-sans font-medium text-[var(--ink-muted)]">Content size</span>
                <span className="text-[16px] font-sans font-semibold text-[var(--ink)]">16px readable measure</span>
              </div>
              <div className="p-3 bg-[var(--ground)] border border-[var(--border)] rounded-[var(--radius-control)] flex flex-col gap-1">
                <span className="text-[12px] font-sans font-medium text-[var(--ink-muted)]">Numerics</span>
                <span className="font-mono tabular-nums text-[14px] font-semibold text-[var(--ink)]">1,640 m elevation</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <span>Strict compliance with typography floor</span>
            <span className="font-mono text-[12px]">Token: var(--ink)</span>
          </CardFooter>
        </Card>
      </section>

      {/* 4. Buttons, IconButtons, and Badges */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Buttons Card */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons & icon controls</CardTitle>
            <CardDescription>
              Primary, secondary, and ghost variants styled with 6px radius and visible focus rings.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" size="sm">Primary small</Button>
              <Button variant="primary" size="md">Primary medium</Button>
              <Button variant="primary" size="lg">Primary large</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="secondary" size="md" icon={Bookmark}>Secondary</Button>
              <Button variant="ghost" size="md" icon={Share2}>Ghost</Button>
              <Button variant="secondary" size="md" isLoading>Loading</Button>
              <Button variant="secondary" size="md" disabled>Disabled</Button>
            </div>
            <div className="flex items-center gap-3 pt-2 border-t border-[var(--border)]">
              <span className="text-[13px] text-[var(--ink-muted)]">Icon buttons:</span>
              <IconButton icon={Search} label="Search database" size="sm" />
              <IconButton icon={Filter} label="Filter records" size="md" />
              <IconButton icon={Share2} label="Share link" size="lg" />
              <IconButton icon={Trash2} label="Delete entry" variant="ghost" size="md" />
            </div>
          </CardContent>
        </Card>

        {/* Badges & Chips Card */}
        <Card>
          <CardHeader>
            <CardTitle>Badges & interactive chips</CardTitle>
            <CardDescription>
              Explicit status tags (Draft, Reviewed, Verified, Estimate, Illustrative) and dismissible chips.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge status="Draft" />
              <Badge status="Reviewed" />
              <Badge status="Verified" />
              <Badge status="Estimate" />
              <Badge status="Illustrative" />
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-[var(--border)]">
              <span className="text-[13px] text-[var(--ink-muted)]">Interactive filter chips (click to toggle):</span>
              <div className="flex flex-wrap items-center gap-2">
                {['Agriculture', 'Highlands', 'Sanitarium', 'Outpost', 'Irrigation'].map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    selected={selectedChips.includes(tag)}
                    onSelect={() => handleChipToggle(tag)}
                    onDismiss={() => handleChipDismiss(tag)}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Tooltip content="Quick command palette" shortcut="⌘K">
                <Button variant="secondary" size="sm">
                  Hover for tooltip
                </Button>
              </Tooltip>
              <Tooltip content="Close active window" shortcut="Esc">
                <Button variant="ghost" size="sm">
                  Escape shortcut
                </Button>
              </Tooltip>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 5. Form Controls Specimen */}
      <section className="flex flex-col gap-4">
        <h2 className="font-serif text-[20px] font-semibold text-[var(--ink)]">
          Form controls
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Standard inputs, select, slider, and toggle</CardTitle>
            <CardDescription>
              All inputs use 6px radii, 13px fonts, high-contrast borders, and tokenized variables.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field
              label="Site name"
              htmlFor="site-name-input"
              helperText="Descriptive label for this rural outpost candidate"
              required
            >
              <Input
                id="site-name-input"
                value={textInputVal}
                onChange={(e) => setTextInputVal(e.target.value)}
                placeholder="Enter outpost title"
              />
            </Field>

            <Field
              label="Elevation above sea level"
              htmlFor="elevation-input"
              helperText="Measured in meters for frost and crop planning"
            >
              <Input
                id="elevation-input"
                type="number"
                isMonospace
                value={numberInputVal}
                onChange={(e) => setNumberInputVal(Number(e.target.value))}
                icon={MapPin}
              />
            </Field>

            <Field
              label="Climate zone"
              htmlFor="climate-zone-select"
              helperText="Select predominant agro-ecological category"
            >
              <Select
                id="climate-zone-select"
                value={selectVal}
                onChange={(e) => setSelectVal(e.target.value)}
                options={[
                  { value: 'temperate', label: 'Highland sub-temperate' },
                  { value: 'tropical', label: 'Mid-altitude savannah' },
                  { value: 'subhumid', label: 'Lakeside sub-humid' }
                ]}
              />
            </Field>

            <Field
              label="Target agricultural acreage"
              helperText="Slide to balance production with available labor"
            >
              <Slider
                value={sliderVal}
                min={5}
                max={150}
                unit=" ac"
                onChangeValue={setSliderVal}
              />
            </Field>

            <div className="md:col-span-2 pt-2 border-t border-[var(--border)]">
              <Toggle
                checked={toggleVal}
                onChange={setToggleVal}
                label="Enable seasonal rainfall alerts"
                description="Receive notifications when local meteorological thresholds shift before planting seasons."
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 6. SplitPane Specimen */}
      <section className="flex flex-col gap-4">
        <h2 className="font-serif text-[20px] font-semibold text-[var(--ink)]">
          Split pane container
        </h2>
        <SplitPane
          defaultSplit={65}
          primary={
            <div className="flex flex-col gap-3">
              <h3 className="font-serif text-[18px] font-semibold text-[var(--ink)]">
                Primary assessment zone
              </h3>
              <p className="max-w-[70ch] text-[16px] text-[var(--ink)] leading-relaxed">
                The primary pane displays detailed land evaluations, soil profiles, and water source maps. It expands to occupy full width when the side drawer is collapsed.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  Open slide-out drawer
                </Button>
              </div>
            </div>
          }
          secondary={
            <div className="flex flex-col gap-3">
              <h4 className="font-serif text-[16px] font-semibold text-[var(--ink)]">
                Quick facts
              </h4>
              <ul className="text-[13px] text-[var(--ink-muted)] flex flex-col gap-2">
                <li className="flex justify-between border-b border-[var(--border)] pb-1">
                  <span>Soil acidity:</span>
                  <span className="font-mono tabular-nums text-[var(--ink)]">pH 6.4</span>
                </li>
                <li className="flex justify-between border-b border-[var(--border)] pb-1">
                  <span>Water table depth:</span>
                  <span className="font-mono tabular-nums text-[var(--ink)]">18 meters</span>
                </li>
                <li className="flex justify-between">
                  <span>Distance to market:</span>
                  <span className="font-mono tabular-nums text-[var(--ink)]">32 km</span>
                </li>
              </ul>
            </div>
          }
        />
      </section>

      {/* 7. DataTable & Destructive Action with Undo */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-[20px] font-semibold text-[var(--ink)]">
              Data table & destructive undo
            </h2>
            <p className="text-[13px] text-[var(--ink-muted)]">
              Sortable headers, tabular numbers, and full Undo support on any deletion.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={RefreshCw}
              onClick={() => {
                setRecords(SAMPLE_RECORDS);
                toast({
                  message: 'Restored sample records',
                  variant: 'default'
                });
              }}
            >
              Reset records
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={Trash2}
              onClick={handleDeleteFirstItem}
            >
              Delete first record (test undo)
            </Button>
          </div>
        </div>

        <DataTable
          data={records}
          columns={tableColumns}
          pageSize={4}
          emptyMessage="All outpost records have been removed."
        />
      </section>

      {/* 8. Empty State & Loading Skeletons */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-serif text-[18px] font-semibold text-[var(--ink)] mb-3">
            Empty state with next action
          </h3>
          <EmptyState
            icon={FolderOpen}
            title="No archived reports found"
            description="You do not have any saved regional assessments or property evaluations in this workspace yet."
            actionLabel="Create new assessment"
            onAction={() =>
              toast({
                message: 'Opening assessment wizard',
                variant: 'default'
              })
            }
          />
        </div>

        <div>
          <h3 className="font-serif text-[18px] font-semibold text-[var(--ink)] mb-3">
            Loading skeletons
          </h3>
          <SkeletonCard />
        </div>
      </section>

      {/* Modal Dialog */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Sanctuary site parameters"
        description="Review regional covenants and water security criteria for candidate relocation."
        actions={
          <>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setIsDialogOpen(false);
                toast({
                  message: 'Sanctuary parameters verified',
                  variant: 'success'
                });
              }}
            >
              Confirm parameters
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4 text-[16px] text-[var(--ink)] leading-relaxed">
          <p>
            This modal illustrates the 16px radius dialog container with accessible backdrop dismissal, keyboard escape handling, and Fraunces title styling.
          </p>
          <div className="p-3 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)] text-[13px] flex items-center gap-2">
            <Info size={16} className="text-[var(--accent)] shrink-0" />
            <span>All actions within modals follow the one-primary-button rule.</span>
          </div>
        </div>
      </Dialog>

      {/* Slide-out Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Regional property specs"
        description="Detailed terrain breakdown and municipal distance calculations."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsDrawerOpen(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setIsDrawerOpen(false);
                toast({
                  message: 'Saved drawer changes',
                  variant: 'success'
                });
              }}
            >
              Save details
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4 text-[16px] leading-relaxed">
          <p>
            The slide-in drawer is positioned along the right edge with a 16px rounded sheet boundary and an accessible overlay.
          </p>
          <Field label="Notes & observations">
            <Input placeholder="Enter scouting notes..." />
          </Field>
        </div>
      </Drawer>
    </div>
  );
}
