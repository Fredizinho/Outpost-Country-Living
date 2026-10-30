import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { saveStoredSavedSpecs } from '@/lib/offlineStorage';
import { getActiveHomesteadDistrictId, setActiveHomesteadDistrictId } from '@/lib/activeDistrictSync';
import { ActiveDistrictContextBar } from '@/components/common/ActiveDistrictContextBar';
import { PageHeader, Badge, Chip, Button, useToast } from '@/components/ui';
import { CALCULATOR_GROUPS, CalculatorId } from '@/components/calculators/calculatorGroups';
import { SolarPumpCalculator } from '@/components/calculators/SolarPumpCalculator';
import { RainwaterCalculator } from '@/components/calculators/RainwaterCalculator';
import { LandZoningCalculator } from '@/components/calculators/LandZoningCalculator';
import { PlantingPitCalculator } from '@/components/calculators/PlantingPitCalculator';
import { SolarPowerCalculator } from '@/components/calculators/SolarPowerCalculator';
import { FoodReserveCalculator } from '@/components/calculators/FoodReserveCalculator';
import { CropYieldCalculator } from '@/components/calculators/CropYieldCalculator';
import { BudgetCalculator } from '@/components/calculators/BudgetCalculator';
import { cn } from '@/lib/utils';

export default function Calculators() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [showWizard, setShowWizard] = useState(false);
  const { toast } = useToast();

  const mapLegacyTabToId = (tab: string | null): CalculatorId => {
    switch (tab) {
      case 'solar':
        return 'solar-pump';
      case 'rainwater':
        return 'rainwater';
      case 'land':
        return 'land-zoning';
      case 'food':
        return 'food-reserve';
      case 'yield':
        return 'crop-yield';
      case 'offgrid':
        return 'solar-power';
      case 'budget':
        return 'budget';
      default:
        return 'solar-pump';
    }
  };

  const [activeCalcId, setActiveCalcId] = useState<CalculatorId>(() =>
    mapLegacyTabToId(tabParam)
  );

  const initialDistrict = (
    searchParams.get('district') ||
    getActiveHomesteadDistrictId(user?.district || 'dedza')
  ).toLowerCase();

  const [currentDistrict, setCurrentDistrict] = useState(initialDistrict);

  useEffect(() => {
    if (tabParam) {
      setActiveCalcId(mapLegacyTabToId(tabParam));
    }
  }, [tabParam]);

  const handleSelectCalculator = (id: CalculatorId) => {
    setActiveCalcId(id);
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);
      updated.set('tab', id);
      return updated;
    });
  };

  const handleSaveToVault = (specsData: any) => {
    saveStoredSavedSpecs({
      calculatorId: activeCalcId,
      timestamp: new Date().toISOString(),
      ...specsData
    });
    toast({
      message: 'Calculation saved to your Outpost Vault',
      variant: 'success'
    });
  };

  const handleDistrictChange = (key: string) => {
    setCurrentDistrict(key);
    setActiveHomesteadDistrictId(key);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 w-full flex flex-col gap-6">
      {/* Page Header */}
      <PageHeader
        title="Homestead engineering & sizing calculators"
        eyebrow="Precision Planning Tools"
        summary="Engineering models calibrated for off-grid sanctuaries in Southern Africa: solar borehole pumps, rainwater catchment cisterns, edenic grain reserves, and capital budgets."
        chips={
          <>
            <Badge status="Verified" />
            <Chip label="8 precision calculators" />
            <Chip label={`Synced outpost: ${user?.district || 'Dedza'}`} />
            <Chip label={`${user?.landSizeAcres || 2.5} acres`} />
          </>
        }
        actions={
          <Button variant="secondary" onClick={() => setShowWizard(true)}>
            Edit household profile
          </Button>
        }
      />

      {/* Active District Telemetry Bar */}
      <ActiveDistrictContextBar onDistrictSelect={handleDistrictChange} />

      {/* Two-Pane Layout: Left Selector, Right Workspace */}
      <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
        {/* Left Navigation: Grouped Calculators List */}
        <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-4 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)]">
          <span className="text-[12px] font-sans font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
            Calculator suites
          </span>

          <div className="flex flex-col gap-4">
            {CALCULATOR_GROUPS.map((group) => (
              <div key={group.groupName} className="flex flex-col gap-1.5">
                <span className="text-[11px] font-sans font-semibold text-[var(--accent)] px-1">
                  {group.groupName}
                </span>

                <div className="flex flex-col gap-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeCalcId === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectCalculator(item.id)}
                        className={cn(
                          'w-full text-left p-2.5 rounded-[var(--radius-control)] border transition-all flex items-center justify-between cursor-pointer',
                          isActive
                            ? 'bg-[var(--ground)] border-[var(--accent)] text-[var(--ink)] font-semibold shadow-2xs'
                            : 'border-transparent text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--ground)]/60'
                        )}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon
                            size={16}
                            className={isActive ? 'text-[var(--accent)]' : 'text-[var(--ink-muted)]'}
                          />
                          <div className="flex flex-col min-w-0">
                            <span className="text-[13px] font-sans leading-snug truncate">
                              {item.title}
                            </span>
                            <span className="text-[11px] font-sans text-[var(--ink-muted)] truncate">
                              {item.description}
                            </span>
                          </div>
                        </div>
                        <ChevronRight
                          size={14}
                          className={cn(
                            'shrink-0 transition-transform',
                            isActive ? 'text-[var(--accent)] translate-x-0.5' : 'opacity-40'
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Active Calculator Workspace */}
        <main className="flex-1 w-full min-w-0">
          {activeCalcId === 'solar-pump' && (
            <SolarPumpCalculator onSaveToVault={handleSaveToVault} />
          )}

          {activeCalcId === 'rainwater' && (
            <RainwaterCalculator
              initialDistrict={currentDistrict}
              onSaveToVault={handleSaveToVault}
            />
          )}

          {activeCalcId === 'land-zoning' && (
            <LandZoningCalculator
              initialAcres={user?.landSizeAcres || 2.5}
              onSaveToVault={handleSaveToVault}
            />
          )}

          {activeCalcId === 'planting-pit' && (
            <PlantingPitCalculator onSaveToVault={handleSaveToVault} />
          )}

          {activeCalcId === 'solar-power' && (
            <SolarPowerCalculator onSaveToVault={handleSaveToVault} />
          )}

          {activeCalcId === 'food-reserve' && (
            <FoodReserveCalculator
              initialAdults={Math.max(1, Math.floor((user?.familyMembers || 4) / 2))}
              initialChildren={Math.max(0, (user?.familyMembers || 4) - 2)}
              onSaveToVault={handleSaveToVault}
            />
          )}

          {activeCalcId === 'crop-yield' && (
            <CropYieldCalculator
              initialAcres={user?.landSizeAcres || 2.0}
              onSaveToVault={handleSaveToVault}
            />
          )}

          {activeCalcId === 'budget' && (
            <BudgetCalculator
              initialAcres={user?.landSizeAcres || 2.5}
              onSaveToVault={handleSaveToVault}
            />
          )}
        </main>
      </div>

      <OnboardingWizard isOpen={showWizard} onClose={() => setShowWizard(false)} />
    </div>
  );
}
