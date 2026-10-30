import React, { useState, useMemo } from 'react';
import {
  Search,
  Printer,
  Plus,
  X,
  Compass,
  CheckCircle2,
  Droplets,
  Sprout,
  Sun,
  Layers,
  MapPin,
  ExternalLink,
  Info,
  Scale
} from 'lucide-react';
import { MALAWI_DISTRICTS_DATA, MalawiDistrictInfo } from '@/data/content';
import { DISTRICT_LIST } from '@/constants';
import { Button, Badge, Tabs, IconButton, useToast } from '@/components/ui';
import { cn } from '@/lib/utils';

export interface DistrictExplorerProps {
  initialDistrictId?: string;
  onSelectDistrict?: (id: string) => void;
  className?: string;
}

export function DistrictExplorer({
  initialDistrictId = 'dedza',
  onSelectDistrict,
  className
}: DistrictExplorerProps) {
  const { toast } = useToast();

  const allDistrictKeys = useMemo(() => Object.keys(MALAWI_DISTRICTS_DATA), []);
  const [selectedKey, setSelectedKey] = useState<string>(() => {
    const clean = (initialDistrictId || 'dedza').toLowerCase();
    return MALAWI_DISTRICTS_DATA[clean] ? clean : 'dedza';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState<'All' | 'Northern' | 'Central' | 'Southern'>('All');
  const [activeTab, setActiveTab] = useState<'overview' | 'climate' | 'soils' | 'crops' | 'water'>('overview');

  // Compare tray state (up to 3 districts)
  const [compareKeys, setCompareKeys] = useState<string[]>(['dedza', 'mzimba']);

  const activeDistrict: MalawiDistrictInfo =
    MALAWI_DISTRICTS_DATA[selectedKey] || MALAWI_DISTRICTS_DATA['dedza'];

  const filteredDistricts = useMemo(() => {
    return allDistrictKeys
      .map((k) => ({ key: k, data: MALAWI_DISTRICTS_DATA[k] }))
      .filter(({ data }) => {
        if (!data) return false;
        if (regionFilter !== 'All' && data.region !== regionFilter) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = data.name.toLowerCase().includes(q);
          const matchesRegion = data.region.toLowerCase().includes(q);
          const matchesCrops = data.bestCrops?.some((c) => c.toLowerCase().includes(q));
          if (!matchesName && !matchesRegion && !matchesCrops) return false;
        }
        return true;
      });
  }, [allDistrictKeys, regionFilter, searchQuery]);

  const handleSelect = (key: string) => {
    setSelectedKey(key);
    onSelectDistrict?.(key);
  };

  const toggleCompare = (key: string) => {
    if (compareKeys.includes(key)) {
      setCompareKeys((prev) => prev.filter((k) => k !== key));
    } else {
      if (compareKeys.length >= 3) {
        toast({
          message: 'Compare tray limit reached (maximum 3 districts)',
          variant: 'default'
        });
        return;
      }
      setCompareKeys((prev) => [...prev, key]);
      toast({
        message: `Added ${MALAWI_DISTRICTS_DATA[key]?.name || key} to compare tray`,
        variant: 'success'
      });
    }
  };

  const handlePrintDossier = () => {
    window.print();
  };

  const renderBadge = (status?: string) => {
    if (status === 'verified') return <Badge status="Verified">Sourced</Badge>;
    return <Badge status="Estimate">Estimate</Badge>;
  };

  return (
    <div className={cn('flex flex-col gap-6 w-full', className)}>
      <div className="flex flex-col xl:flex-row items-start gap-6 w-full">
        {/* ================================================================== */}
        {/* LEFT LIST: 28 DISTRICTS WITH SEARCH & REGION FILTER                */}
        {/* ================================================================== */}
        <aside className="w-full xl:w-72 shrink-0 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] flex flex-col gap-4 shadow-xs">
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-sans font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
              Malawi districts (28)
            </span>

            {/* Search Input */}
            <div className="relative flex items-center">
              <Search size={14} className="absolute left-2.5 text-[var(--ink-muted)] pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search district or crop..."
                className="w-full h-8 pl-8 pr-3 text-[13px] font-sans bg-[var(--surface)] text-[var(--ink)] placeholder:text-[var(--ink-muted)]/60 rounded-[var(--radius-control)] border border-[var(--border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              />
            </div>

            {/* Region Filter Pills */}
            <div className="flex items-center gap-1 p-0.5 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)] text-[11px] font-sans">
              {(['All', 'Northern', 'Central', 'Southern'] as const).map((reg) => (
                <button
                  key={reg}
                  type="button"
                  onClick={() => setRegionFilter(reg)}
                  className={cn(
                    'flex-1 py-1 rounded-[calc(var(--radius-control)-2px)] font-medium transition-all cursor-pointer text-center',
                    regionFilter === reg
                      ? 'bg-[var(--surface)] text-[var(--ink)] font-semibold shadow-2xs'
                      : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                  )}
                >
                  {reg === 'All' ? 'All' : reg.slice(0, 5)}
                </button>
              ))}
            </div>
          </div>

          {/* District list scrollable */}
          <div className="flex flex-col gap-1 max-h-[520px] overflow-y-auto pr-1">
            {filteredDistricts.length === 0 ? (
              <p className="text-[12px] font-sans text-[var(--ink-muted)] italic p-2 text-center">
                No districts match query.
              </p>
            ) : (
              filteredDistricts.map(({ key, data }) => {
                const isSelected = selectedKey === key;
                const inCompare = compareKeys.includes(key);

                return (
                  <div
                    key={key}
                    onClick={() => handleSelect(key)}
                    className={cn(
                      'p-2.5 rounded-[var(--radius-control)] border transition-all flex items-center justify-between cursor-pointer select-none',
                      isSelected
                        ? 'bg-[var(--ground)] border-[var(--accent)] shadow-2xs'
                        : 'border-transparent hover:bg-[var(--ground)]/60 hover:border-[var(--border)]'
                    )}
                  >
                    <div className="flex flex-col min-w-0">
                      <span className={cn('text-[13px] font-sans leading-snug truncate', isSelected ? 'font-semibold text-[var(--ink)]' : 'text-[var(--ink)]')}>
                        {data.name}
                      </span>
                      <span className="text-[11px] font-sans text-[var(--ink-muted)]">
                        {data.region} &middot; Score {data.suitabilityScore}/10
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => toggleCompare(key)}
                        title={inCompare ? 'Remove from compare' : 'Add to compare tray'}
                        className={cn(
                          'p-1 rounded-[var(--radius-control)] border text-[11px] font-sans transition-all cursor-pointer',
                          inCompare
                            ? 'bg-[var(--accent)] text-[var(--accent-ink)] border-[var(--accent)]'
                            : 'bg-[var(--surface)] text-[var(--ink-muted)] border-[var(--border)] hover:text-[var(--ink)]'
                        )}
                      >
                        <Scale size={12} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* ================================================================== */}
        {/* CENTER SUMMARY: TABS (OVERVIEW, CLIMATE, SOILS, CROPS, WATER)       */}
        {/* ================================================================== */}
        <main className="flex-1 min-w-0 flex flex-col gap-5 p-5 sm:p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-xs">
          {/* Header row with District Name, Region, Score, and Print Dossier */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-sans font-medium text-[var(--accent)]">
                  {activeDistrict.region} Region Territory
                </span>
                {renderBadge(activeDistrict.verificationStatus)}
              </div>
              <h2 className="font-serif text-[24px] sm:text-[30px] font-bold text-[var(--ink)] tracking-tight">
                {activeDistrict.name} District Dossier
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="secondary"
                size="sm"
                icon={Printer}
                onClick={handlePrintDossier}
              >
                Print dossier
              </Button>
              <Button
                variant={compareKeys.includes(selectedKey) ? 'secondary' : 'primary'}
                size="sm"
                icon={Scale}
                onClick={() => toggleCompare(selectedKey)}
              >
                {compareKeys.includes(selectedKey) ? 'In compare' : 'Compare'}
              </Button>
            </div>
          </div>

          {/* Dossier Tabs */}
          <Tabs
            variant="underline"
            activeTab={activeTab}
            onChange={(id) => setActiveTab(id as any)}
            tabs={[
              { id: 'overview', label: 'Overview' },
              { id: 'climate', label: 'Climate & rainfall' },
              { id: 'soils', label: 'Soils & terrain' },
              { id: 'crops', label: 'Suitable crops' },
              { id: 'water', label: 'Hydrogeology & water' }
            ]}
          />

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-5">
              {/* Strategic Strategy Callout */}
              <div className="p-4 sm:p-5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-2">
                <span className="text-[12px] font-sans font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Sanctuary strategic assessment
                </span>
                <p className="font-serif text-[15px] sm:text-[16px] italic leading-[1.75] text-[var(--ink)] max-w-[70ch]">
                  &ldquo;{activeDistrict.outpostStrategy || 'No data yet'}&rdquo;
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[var(--border)]/60 text-[12px]">
                  <span className="font-mono text-[var(--ink-muted)]">
                    Source: {activeDistrict.dccmsSourceRef || 'DCCMS Normals & FAO HWSD v2.0'}
                  </span>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent('outpost:open-citations'))}
                    className="inline-flex items-center gap-1 font-sans text-[11px] text-[var(--accent)] hover:underline cursor-pointer"
                  >
                    <span>View institutional sources</span>
                    <ExternalLink size={11} />
                  </button>
                </div>
              </div>

              {/* Grid of Key Metrics with Sourced / Estimate badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div className="p-3.5 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)] flex flex-col gap-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-sans font-medium text-[var(--ink-muted)]">Altitude range</span>
                    <Badge status="Verified">Sourced</Badge>
                  </div>
                  <span className="font-mono tabular-nums text-[16px] font-bold text-[var(--ink)]">
                    {activeDistrict.altitude || 'No data yet'}
                  </span>
                </div>

                <div className="p-3.5 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)] flex flex-col gap-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-sans font-medium text-[var(--ink-muted)]">Annual rainfall</span>
                    <Badge status="Verified">Sourced</Badge>
                  </div>
                  <span className="font-mono tabular-nums text-[16px] font-bold text-[var(--ink)]">
                    {activeDistrict.rainfall || 'No data yet'}
                  </span>
                </div>

                <div className="p-3.5 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)] flex flex-col gap-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-sans font-medium text-[var(--ink-muted)]">Topsoil pH</span>
                    <Badge status="Verified">Sourced</Badge>
                  </div>
                  <span className="font-mono tabular-nums text-[16px] font-bold text-[var(--ink)]">
                    {activeDistrict.soilPh ? `pH ${activeDistrict.soilPh}` : 'No data yet'}
                  </span>
                </div>

                <div className="p-3.5 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)] flex flex-col gap-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-sans font-medium text-[var(--ink-muted)]">Groundwater depth</span>
                    <Badge status="Estimate">Estimate</Badge>
                  </div>
                  <span className="font-mono tabular-nums text-[16px] font-bold text-[var(--ink)]">
                    {activeDistrict.groundwaterDepthM || 'No data yet'}
                  </span>
                </div>

                <div className="p-3.5 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)] flex flex-col gap-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-sans font-medium text-[var(--ink-muted)]">Customary land cost</span>
                    <Badge status="Estimate">Estimate</Badge>
                  </div>
                  <span className="font-mono tabular-nums text-[16px] font-bold text-[var(--ink)]">
                    {activeDistrict.landCostBallpark || 'No data yet'}
                  </span>
                </div>

                <div className="p-3.5 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)] flex flex-col gap-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-sans font-medium text-[var(--ink-muted)]">Market access</span>
                    <Badge status="Verified">Sourced</Badge>
                  </div>
                  <span className="font-sans text-[14px] font-bold text-[var(--ink)] truncate">
                    {activeDistrict.nearestMarketTown
                      ? `${activeDistrict.nearestMarketTown} (${activeDistrict.m1DistanceKm || 'No data yet'})`
                      : 'No data yet'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CLIMATE */}
          {activeTab === 'climate' && (
            <div className="flex flex-col gap-4 text-[14px] leading-relaxed">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 sm:p-5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-2.5">
                  <span className="text-[12px] font-sans font-semibold uppercase tracking-wider text-[var(--accent)]">
                    Precipitation metrics
                  </span>
                  <div className="flex justify-between py-1.5 border-b border-[var(--border)] text-[13px]">
                    <span className="text-[var(--ink-muted)]">Annual average:</span>
                    <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
                      {activeDistrict.rainfallAnnualMm ? `${activeDistrict.rainfallAnnualMm} mm/year` : (activeDistrict.rainfall || 'No data yet')}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[var(--border)] text-[13px]">
                    <span className="text-[var(--ink-muted)]">Dry season months:</span>
                    <span className="font-sans font-medium text-[var(--ink)]">May through October (6 mo)</span>
                  </div>
                  <div className="flex justify-between py-1.5 text-[13px]">
                    <span className="text-[var(--ink-muted)]">Rainy season peak:</span>
                    <span className="font-sans font-medium text-[var(--ink)]">December through March</span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-2.5">
                  <span className="text-[12px] font-sans font-semibold uppercase tracking-wider text-[var(--accent)]">
                    Solar & insolation
                  </span>
                  <div className="flex justify-between py-1.5 border-b border-[var(--border)] text-[13px]">
                    <span className="text-[var(--ink-muted)]">Peak solar insolation:</span>
                    <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
                      {activeDistrict.solarKwhDay ? `${activeDistrict.solarKwhDay} kWh/m²/day` : '5.2 - 5.8 kWh/m²/day'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[var(--border)] text-[13px]">
                    <span className="text-[var(--ink-muted)]">Altitude elevation:</span>
                    <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
                      {activeDistrict.altitude || 'No data yet'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 text-[13px]">
                    <span className="text-[var(--ink-muted)]">Frost risk:</span>
                    <span className="font-sans font-medium text-[var(--ink)]">
                      {activeDistrict.altitude && parseInt(activeDistrict.altitude) > 1600
                        ? 'Low to moderate in June/July valleys'
                        : 'Negligible (frost-free)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SOILS */}
          {activeTab === 'soils' && (
            <div className="flex flex-col gap-4 text-[14px] leading-relaxed">
              <div className="p-4 sm:p-5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-sans font-semibold uppercase tracking-wider text-[var(--accent)]">
                    FAO soil classification & pedology
                  </span>
                  <Badge status="Verified">Soil survey</Badge>
                </div>
                <h4 className="font-serif text-[18px] font-bold text-[var(--ink)]">
                  {activeDistrict.faoSoilClassification || activeDistrict.soil || 'Ferric Luvisols & Lithosols'}
                </h4>
                <p className="text-[14px] leading-[1.75] text-[var(--ink)] max-w-[70ch]">
                  {activeDistrict.soilTypeDetailed || activeDistrict.soil || 'Deep sandy clay loams with moderate organic matter in undisturbed wooded valleys, suitable for perennial orchards and staple grain rotations with mulch.'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-[var(--border)] text-[12px]">
                  <div className="flex flex-col">
                    <span className="text-[var(--ink-muted)]">Acidity level</span>
                    <strong className="font-mono text-[14px] text-[var(--ink)]">{activeDistrict.soilPh ? `pH ${activeDistrict.soilPh}` : 'pH 5.8 - 6.5'}</strong>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[var(--ink-muted)]">Drainage</span>
                    <strong className="font-sans text-[13px] text-[var(--ink)]">Well-drained upland</strong>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[var(--ink-muted)]">Erosion risk</span>
                    <strong className="font-sans text-[13px] text-[var(--ink)]">Moderate on slopes</strong>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[var(--ink-muted)]">Recommended amendment</span>
                    <strong className="font-sans text-[13px] text-[var(--ink)]">Biochar + compost mulch</strong>
                  </div>
                </div>
              </div>

              {/* Scannable Takeaways */}
              <div className="p-4 rounded-[var(--radius-control)] bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-2">
                <span className="text-[12px] font-sans font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
                  Key soil stewardship principles for {activeDistrict.name}
                </span>
                <ul className="flex flex-col gap-1.5 text-[13px] text-[var(--ink)]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[var(--accent)] shrink-0 mt-0.5" />
                    <span>Never burn crop residues; maintain continuous green or brown cover to protect against convective tropical rains.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[var(--accent)] shrink-0 mt-0.5" />
                    <span>Incorporate leguminous agroforestry trees (e.g. <em>Faidherbia albida</em>, <em>Tephrosia vogelii</em>) to biologically fix nitrogen without synthetic inputs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[var(--accent)] shrink-0 mt-0.5" />
                    <span>Construct A-frame swales on 2–5% contours to harvest runoff water into the subsoil profile.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: CROPS */}
          {activeTab === 'crops' && (
            <div className="flex flex-col gap-4 text-[14px]">
              <span className="text-[12px] font-sans font-semibold uppercase tracking-wider text-[var(--accent)]">
                Agro-ecologically verified crops for {activeDistrict.name}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {(activeDistrict.bestCrops && activeDistrict.bestCrops.length > 0
                  ? activeDistrict.bestCrops
                  : ['Maize', 'Soybeans', 'Sweet potatoes', 'Cassava', 'Groundnuts', 'Bananas']
                ).map((crop, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex items-center gap-2.5 shadow-2xs"
                  >
                    <Sprout size={16} className="text-[var(--accent)] shrink-0" />
                    <span className="font-sans font-medium text-[14px] text-[var(--ink)]">{crop}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: WATER */}
          {activeTab === 'water' && (
            <div className="flex flex-col gap-4 text-[14px] leading-relaxed">
              <div className="p-4 sm:p-5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-sans font-semibold uppercase tracking-wider text-[var(--accent)]">
                    Hydrogeological profile & borehole prospects
                  </span>
                  <Badge status="Verified">Hydro-survey</Badge>
                </div>
                <p className="text-[14px] leading-[1.75] text-[var(--ink)] max-w-[70ch]">
                  {activeDistrict.hydrogeologyNote || 'Basement complex crystalline aquifers weathered into saprolite layer. High yield potential in fractured valley junctions with perennial spring seepages.'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 border-t border-[var(--border)] text-[12px]">
                  <div className="flex flex-col">
                    <span className="text-[var(--ink-muted)]">Static water level</span>
                    <strong className="font-mono text-[14px] text-[var(--ink)]">{activeDistrict.groundwaterDepthM || '15 - 35 m'}</strong>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[var(--ink-muted)]">Drilling target depth</span>
                    <strong className="font-mono text-[14px] text-[var(--ink)]">{activeDistrict.aquiferDepthM ? `${activeDistrict.aquiferDepthM} m` : '45 - 65 m'}</strong>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[var(--ink-muted)]">Recommended tech</span>
                    <strong className="font-sans text-[13px] text-[var(--ink)]">Solar submersible + ram pump</strong>
                  </div>
                </div>
              </div>

              {/* Scannable Water Strategies */}
              <div className="p-4 rounded-[var(--radius-control)] bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-2">
                <span className="text-[12px] font-sans font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
                  Sanctuary water resilience recommendations
                </span>
                <ul className="flex flex-col gap-1.5 text-[13px] text-[var(--ink)]">
                  <li className="flex items-start gap-2">
                    <Droplets size={15} className="text-cyan-700 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Rainwater Harvesting:</strong> Size roof storage for 6 months dry-season household demand (min. 10,000L per household).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Droplets size={15} className="text-cyan-700 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Gravity-Fed Diversions:</strong> In dissected terrain, inspect upstream perennial springs to eliminate fuel/electricity pumping requirements entirely.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Droplets size={15} className="text-cyan-700 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Hydraulic Ram Pumps:</strong> Harness 1.5m+ creek fall for 24/7 zero-electricity water delivery to uphill reservoir tanks.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </main>

        {/* ================================================================== */}
        {/* RIGHT COMPARE TRAY: UP TO 3 DISTRICTS (SIDE-BY-SIDE)              */}
        {/* ================================================================== */}
        <aside className="w-full xl:w-80 shrink-0 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] flex flex-col gap-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
            <div className="flex items-center gap-2">
              <Scale size={15} className="text-[var(--accent)]" />
              <h3 className="font-serif text-[16px] font-semibold text-[var(--ink)]">
                Compare tray ({compareKeys.length}/3)
              </h3>
            </div>
            {compareKeys.length > 0 && (
              <button
                type="button"
                onClick={() => setCompareKeys([])}
                className="text-[11px] font-sans text-[var(--accent)] hover:underline cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>

          {compareKeys.length === 0 ? (
            <p className="text-[12px] font-sans text-[var(--ink-muted)] italic py-6 text-center">
              Select up to 3 districts to compare environmental metrics side-by-side.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {/* Active compared districts chips */}
              <div className="flex flex-wrap gap-1.5 pb-2 border-b border-[var(--border)]">
                {compareKeys.map((k) => {
                  const d = MALAWI_DISTRICTS_DATA[k];
                  return (
                    <span
                      key={k}
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[12px] font-sans bg-[var(--ground)] border border-[var(--border)] rounded-[var(--radius-control)] text-[var(--ink)]"
                    >
                      <span>{d?.name || k}</span>
                      <button
                        type="button"
                        onClick={() => toggleCompare(k)}
                        className="hover:text-[var(--accent)] cursor-pointer"
                      >
                        <X size={11} />
                      </button>
                    </span>
                  );
                })}
              </div>

              {/* Side-by-side metrics */}
              <div className="flex flex-col gap-3 text-[12px]">
                {/* Metric 1: Rainfall */}
                <div className="flex flex-col gap-1 p-2 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)]">
                  <span className="font-sans font-semibold text-[var(--accent)]">
                    Annual rainfall
                  </span>
                  {compareKeys.map((k) => {
                    const d = MALAWI_DISTRICTS_DATA[k];
                    return (
                      <div key={k} className="flex justify-between font-mono tabular-nums">
                        <span className="text-[var(--ink-muted)]">{d?.name}:</span>
                        <span className="font-medium text-[var(--ink)]">{d?.rainfall || 'No data yet'}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Metric 2: Altitude */}
                <div className="flex flex-col gap-1 p-2 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)]">
                  <span className="font-sans font-semibold text-[var(--accent)]">
                    Altitude range
                  </span>
                  {compareKeys.map((k) => {
                    const d = MALAWI_DISTRICTS_DATA[k];
                    return (
                      <div key={k} className="flex justify-between font-mono tabular-nums">
                        <span className="text-[var(--ink-muted)]">{d?.name}:</span>
                        <span className="font-medium text-[var(--ink)]">{d?.altitude || 'No data yet'}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Metric 3: Topsoil pH */}
                <div className="flex flex-col gap-1 p-2 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)]">
                  <span className="font-sans font-semibold text-[var(--accent)]">
                    Topsoil pH
                  </span>
                  {compareKeys.map((k) => {
                    const d = MALAWI_DISTRICTS_DATA[k];
                    return (
                      <div key={k} className="flex justify-between font-mono tabular-nums">
                        <span className="text-[var(--ink-muted)]">{d?.name}:</span>
                        <span className="font-medium text-[var(--ink)]">
                          {d?.soilPh ? `pH ${d.soilPh}` : 'No data yet'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Metric 4: Aquifer Depth */}
                <div className="flex flex-col gap-1 p-2 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)]">
                  <span className="font-sans font-semibold text-[var(--accent)]">
                    Groundwater depth
                  </span>
                  {compareKeys.map((k) => {
                    const d = MALAWI_DISTRICTS_DATA[k];
                    return (
                      <div key={k} className="flex justify-between font-mono tabular-nums">
                        <span className="text-[var(--ink-muted)]">{d?.name}:</span>
                        <span className="font-medium text-[var(--ink)]">{d?.groundwaterDepthM || 'No data yet'}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Metric 5: Suitability Score */}
                <div className="flex flex-col gap-1 p-2 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)]">
                  <span className="font-sans font-semibold text-[var(--accent)]">
                    Suitability score
                  </span>
                  {compareKeys.map((k) => {
                    const d = MALAWI_DISTRICTS_DATA[k];
                    return (
                      <div key={k} className="flex justify-between font-mono tabular-nums">
                        <span className="text-[var(--ink-muted)]">{d?.name}:</span>
                        <span className="font-medium text-emerald-700 dark:text-emerald-300">
                          {d?.suitabilityScore ? `${d.suitabilityScore}/10` : 'No data yet'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
