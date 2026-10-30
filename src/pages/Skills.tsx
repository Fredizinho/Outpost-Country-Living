import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { getCachedSkills, isItemBookmarked, toggleOfflineBookmark } from '@/lib/offlineStorage';
import { SKILL_TECHNICAL_PROTOCOLS } from '@/data/skillsTechnicalProtocols';
import { PageHeader, Button, Badge, Chip, EmptyState } from '@/components/ui';
import { SkillCard } from '@/components/skills/SkillCard';
import { SkillFilterRail, FilterState } from '@/components/skills/SkillFilterRail';
import { SkillSearchSortBar, SortOption } from '@/components/skills/SkillSearchSortBar';
import { SkillSdaFoundations } from '@/components/skills/SkillSdaFoundations';
import { TropicalSanitariumDispensary } from '@/components/health/TropicalSanitariumDispensary';
import { cn } from '@/lib/utils';

export default function Skills() {
  const allSkills = getCachedSkills();
  const [bookmarksTick, setBookmarksTick] = useState(0);

  const [activePerspective, setActivePerspective] = useState<
    'all-guides' | 'sda-foundations' | 'dispensary'
  >('all-guides');

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('title-asc');

  const [filters, setFilters] = useState<FilterState>({
    pillar: 'All',
    district: 'All',
    season: 'All',
    level: 'All',
    status: 'All',
    bookmarkedOnly: false
  });

  const handleToggleBookmark = (e: React.MouseEvent, skillId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const item = allSkills.find((s) => s.id === skillId);
    toggleOfflineBookmark({ id: skillId, type: 'skill', title: item?.title || skillId });
    setBookmarksTick((p) => p + 1);
  };

  const handleClearFilters = () => {
    setFilters({
      pillar: 'All',
      district: 'All',
      season: 'All',
      level: 'All',
      status: 'All',
      bookmarkedOnly: false
    });
    setSearchQuery('');
  };

  // Determine status badge for each skill
  const getStatusBadge = (id: string, skill: (typeof allSkills)[0]): 'Verified' | 'Reviewed' | 'Draft' => {
    if (skill.detailedProtocol || SKILL_TECHNICAL_PROTOCOLS[id]) return 'Verified';
    if (skill.difficulty === 'Advanced' || (skill.steps && skill.steps.length > 5)) return 'Reviewed';
    return 'Draft';
  };

  // Filter and sort skills
  const filteredSkills = useMemo(() => {
    return allSkills.filter((skill) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = skill.title.toLowerCase().includes(q);
        const matchesSummary = skill.summary.toLowerCase().includes(q);
        const matchesTools = skill.toolsNeeded?.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSummary && !matchesTools) return false;
      }

      // Pillar / Category
      if (filters.pillar !== 'All' && skill.category !== filters.pillar) return false;

      // Season
      if (filters.season !== 'All' && skill.seasonalTag !== filters.season) return false;

      // Level
      if (filters.level !== 'All' && skill.difficulty !== filters.level) return false;

      // Status badge
      const badge = getStatusBadge(skill.id, skill);
      if (filters.status !== 'All' && badge !== filters.status) return false;

      // Bookmark
      if (filters.bookmarkedOnly && !isItemBookmarked(skill.id, 'skill')) return false;

      return true;
    });
  }, [allSkills, searchQuery, filters, bookmarksTick]);

  const sortedSkills = useMemo(() => {
    const list = [...filteredSkills];
    if (sortBy === 'title-asc') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'time-asc') {
      list.sort((a, b) => a.timeToMaster.localeCompare(b.timeToMaster));
    } else if (sortBy === 'level-asc') {
      const order: Record<string, number> = { Beginner: 1, Intermediate: 2, Advanced: 3 };
      list.sort((a, b) => (order[a.difficulty] || 1) - (order[b.difficulty] || 1));
    } else if (sortBy === 'category-asc') {
      list.sort((a, b) => a.category.localeCompare(b.category));
    }
    return list;
  }, [filteredSkills, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 w-full flex flex-col gap-6">
      {/* Page Header */}
      <PageHeader
        title="Off-grid country living skills & field manuals"
        eyebrow="Practical Homestead Library"
        summary="A comprehensive library of 25 offline-ready field blueprints covering edenic agriculture, solar pumps, hermetic grain storage, natural remedies, and Avondale true education."
        chips={
          <>
            <Badge status="Verified" />
            <Chip label={`${allSkills.length} total manuals`} />
            <Chip label="100% offline ready" />
            <Chip label="Zero cloud dependency" />
          </>
        }
        actions={
          <Link to="/calculators">
            <Button variant="primary" icon={Compass}>
              Sizing calculators
            </Button>
          </Link>
        }
      />

      {/* Perspective Switcher */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)] self-start">
        {[
          { id: 'all-guides', label: `All ${allSkills.length} field manuals` },
          { id: 'sda-foundations', label: 'True education & sustenance' },
          { id: 'dispensary', label: 'Tropical sanitarium dispensary' }
        ].map((tab) => {
          const isActive = activePerspective === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActivePerspective(tab.id as any)}
              className={cn(
                'px-3.5 py-1.5 text-[12px] font-sans font-medium rounded-[calc(var(--radius-control)-2px)] transition-all cursor-pointer',
                isActive
                  ? 'bg-[var(--surface)] text-[var(--ink)] font-semibold shadow-2xs'
                  : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* View Perspectives */}
      {activePerspective === 'sda-foundations' && <SkillSdaFoundations />}

      {activePerspective === 'dispensary' && (
        <section className="rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] p-5 sm:p-6 shadow-xs">
          <TropicalSanitariumDispensary />
        </section>
      )}

      {activePerspective === 'all-guides' && (
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Left Filter Rail */}
          <SkillFilterRail
            filters={filters}
            onChange={setFilters}
            onClear={handleClearFilters}
            totalCount={allSkills.length}
            filteredCount={sortedSkills.length}
          />

          {/* Master Detail Library Area */}
          <main className="flex-1 w-full flex flex-col gap-4">
            {/* Search and Sort Toolbar */}
            <SkillSearchSortBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            {/* Guides Results Grid or Empty State */}
            {sortedSkills.length === 0 ? (
              <EmptyState
                icon={BookOpen}
                title="No guides match. Clear filters"
                description="We couldn't find any field manuals matching your search query or selected filter constraints."
                actionLabel="Reset all filters"
                onAction={handleClearFilters}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {sortedSkills.map((skill) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    isBookmarked={isItemBookmarked(skill.id, 'skill')}
                    onToggleBookmark={handleToggleBookmark}
                    statusBadge={getStatusBadge(skill.id, skill)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}
