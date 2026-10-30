import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
  MapPin,
  CheckCircle2,
  Scale,
  FileText,
  Calculator,
  Compass,
  Printer
} from 'lucide-react';
import { PageHeader, Badge, Chip, Tabs } from '@/components/ui';
import { DistrictExplorer } from '@/components/where/DistrictExplorer';
import { PropertySuitabilityCalculator } from '@/components/outpost/PropertySuitabilityCalculator';
import { CustomaryLandTenureWizard } from '@/components/land/CustomaryLandTenureWizard';
import { LandReadinessCards } from '@/components/outpost/LandReadinessCards';
import { ActiveDistrictContextBar } from '@/components/common/ActiveDistrictContextBar';
import { getActiveHomesteadDistrictId, setActiveHomesteadDistrictId } from '@/lib/activeDistrictSync';

export default function Where() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState<'districts' | 'evaluator' | 'tenure' | 'readiness'>(() => {
    if (
      location.pathname.startsWith('/suitability') ||
      location.pathname.startsWith('/property-evaluator') ||
      searchParams.get('tab') === 'evaluator'
    ) {
      return 'evaluator';
    }
    if (searchParams.get('tab') === 'tenure' || searchParams.get('tab') === 'customary-law') {
      return 'tenure';
    }
    if (searchParams.get('tab') === 'readiness') {
      return 'readiness';
    }
    return 'districts';
  });

  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(() =>
    getActiveHomesteadDistrictId('dedza')
  );

  useEffect(() => {
    if (
      location.pathname.startsWith('/suitability') ||
      location.pathname.startsWith('/property-evaluator') ||
      searchParams.get('tab') === 'evaluator'
    ) {
      setActiveTab('evaluator');
    } else if (searchParams.get('tab') === 'tenure' || searchParams.get('tab') === 'customary-law') {
      setActiveTab('tenure');
    } else if (searchParams.get('tab') === 'readiness') {
      setActiveTab('readiness');
    } else if (searchParams.get('tab') === 'districts') {
      setActiveTab('districts');
    }
  }, [location.pathname, searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as any);
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);
      updated.set('tab', tabId);
      return updated;
    });
  };

  const handleDistrictChange = (key: string) => {
    setSelectedDistrictId(key);
    setActiveHomesteadDistrictId(key);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 w-full flex flex-col gap-6">
      {/* Page Header */}
      <PageHeader
        title="Territorial district explorer & land readiness"
        eyebrow="Geographic Assessment"
        summary="Explore Malawi’s 28 districts across rainfall patterns, aquifer static water levels, FAO soil classifications, and customary land tenure acquisition protocols."
        chips={
          <>
            <Badge status="Verified" />
            <Chip label="28 districts registered" />
            <Chip label="DCCMS rainfall telemetry" />
            <Chip label="FAO Nitisols & Vertisols" />
            <Chip label="Act No. 19 customary tenure" />
          </>
        }
      />

      {/* Active District Telemetry Bar */}
      <ActiveDistrictContextBar onDistrictSelect={handleDistrictChange} />

      {/* Primary Tool View Tabs */}
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
        <Tabs
          variant="segmented"
          activeTab={activeTab}
          onChange={handleTabChange}
          tabs={[
            { id: 'districts', label: '01. District explorer & compare' },
            { id: 'evaluator', label: '02. Property suitability scoring' },
            { id: 'tenure', label: '03. Customary land tenure wizard' },
            { id: 'readiness', label: '04. Land readiness checklist' }
          ]}
        />
      </div>

      {/* Active Tool Perspective */}
      {activeTab === 'districts' && (
        <DistrictExplorer
          initialDistrictId={selectedDistrictId}
          onSelectDistrict={handleDistrictChange}
        />
      )}

      {activeTab === 'evaluator' && (
        <section className="p-5 sm:p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)]">
          <PropertySuitabilityCalculator />
        </section>
      )}

      {activeTab === 'tenure' && (
        <section className="p-5 sm:p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)]">
          <CustomaryLandTenureWizard />
        </section>
      )}

      {activeTab === 'readiness' && (
        <section className="p-5 sm:p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)]">
          <LandReadinessCards />
        </section>
      )}
    </div>
  );
}
