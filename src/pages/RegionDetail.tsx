import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeader, Badge, Chip } from '@/components/ui';
import { DistrictExplorer } from '@/components/where/DistrictExplorer';
import { getCachedRegions } from '@/lib/offlineStorage';

export default function RegionDetail() {
  const { id } = useParams<{ id: string }>();
  const regions = getCachedRegions();

  // If the id matches a region like 'northern', 'central', 'southern'
  const matchedRegion = regions.find(
    (r) => r.id.toLowerCase() === id?.toLowerCase() || (id && r.name.toLowerCase().includes(id.toLowerCase()))
  );

  // Map region id to default district
  const initialDistrictId = (() => {
    const clean = (id || '').toLowerCase();
    if (clean.includes('north') || clean === 'viphya' || clean === 'nyika') return 'mzimba';
    if (clean.includes('south') || clean === 'mulanje' || clean === 'shire') return 'zomba';
    if (clean.includes('central') || clean === 'dedza' || clean === 'dowa') return 'dedza';
    return clean || 'dedza';
  })();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 w-full flex flex-col gap-6">
      {/* Back link */}
      <div>
        <Link
          to="/where"
          className="inline-flex items-center gap-1.5 text-[13px] font-sans font-medium text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to territorial overview</span>
        </Link>
      </div>

      {/* Page Header */}
      <PageHeader
        title={matchedRegion ? `${matchedRegion.name} territorial exploration` : 'District & regional explorer'}
        eyebrow="Regional Analysis"
        summary={
          matchedRegion?.description ||
          'Comprehensive agro-ecological assessment across rainfall patterns, altitude zones, soil pedology, and aquifer depths.'
        }
        chips={
          <>
            <Badge status="Verified" />
            <Chip label="28 districts registered" />
            {matchedRegion && <Chip label={`Region: ${matchedRegion.name}`} />}
          </>
        }
      />

      {/* District Explorer Unified Layout */}
      <DistrictExplorer initialDistrictId={initialDistrictId} />
    </div>
  );
}
