import React, { useState } from 'react';
import { CalculatorShell } from './CalculatorShell';
import { Field, Select, Slider, Button } from '@/components/ui';
import { PLANTING_PIT_SPECS } from '@/constants';
import { StandardDiagram } from '@/components/common/StandardDiagram';
import { Layers } from 'lucide-react';

export interface PlantingPitCalculatorProps {
  initialOrchardAcres?: number;
  initialPitType?: keyof typeof PLANTING_PIT_SPECS;
  onSaveToVault?: (data: any) => void;
}

export function PlantingPitCalculator({
  initialOrchardAcres = 0.55,
  initialPitType = 'egwDeepPit',
  onSaveToVault
}: PlantingPitCalculatorProps) {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [selectedPitType, setSelectedPitType] = useState<keyof typeof PLANTING_PIT_SPECS>(initialPitType);
  const [orchardAcres, setOrchardAcres] = useState<number>(initialOrchardAcres);
  const [showDiagram, setShowDiagram] = useState<boolean>(false);

  const pitSpec = PLANTING_PIT_SPECS[selectedPitType] || PLANTING_PIT_SPECS.egwDeepPit;

  // Unchanged formulas
  const estPits = Math.max(8, Math.round(orchardAcres * 45));
  const biocharNeededKg = Math.round(estPits * pitSpec.biocharKgPerPit);
  const waterRetentionLiters = Math.round(estPits * pitSpec.waterRetentionLiters);

  const handleReset = () => {
    setSelectedPitType(initialPitType);
    setOrchardAcres(initialOrchardAcres);
  };

  const copySummaryText = () => {
    return `PLANTING PIT & MOISTURE BANK ESTIMATE
Orchard Acreage: ${orchardAcres} Acres (${(orchardAcres * 0.404686).toFixed(2)} Ha)
Pit Specification: ${pitSpec.name} (${pitSpec.dimensionString})
----------------------------------------
Excavated Pit Count: ${estPits} pits
Inoculated Biochar Needed: ${biocharNeededKg.toLocaleString()} kg
Soil Moisture Sponge Capacity: ${waterRetentionLiters.toLocaleString()} Liters`;
  };

  return (
    <CalculatorShell
      title="Planting pit & soil moisture bank sizer"
      category="Soil & permaculture"
      description="Size deep biochar-charged tree planting pits, organic matter amendment volumes, and subterranean moisture reservoirs."
      mainAnswer={{
        label: 'Total excavated tree pits needed',
        value: estPits.toLocaleString(),
        unit: 'pits',
        subtext: `Based on 45 pits/acre spacing for ${orchardAcres} acres of fruit trees and agroforestry.`
      }}
      unitSystem={unitSystem}
      onUnitSystemChange={setUnitSystem}
      onReset={handleReset}
      onSaveToVault={() =>
        onSaveToVault?.({
          selectedPitType,
          orchardAcres,
          estPits,
          biocharNeededKg,
          waterRetentionLiters
        })
      }
      copySummaryText={copySummaryText}
      formulaDescription="Pits = Max(8, Round(Orchard Acres × 45 pits/acre)). Biochar = Pits × kg/pit. Moisture Bank = Pits × Retention L/pit."
      assumptions={[
        'Standard 90×90×90 cm (3×3×3 ft) pit creates a 5-year perennial root moisture sponge.',
        'Inoculated biochar charged with livestock manure leachate increases cation exchange capacity 300%.',
        'Retains subsoil moisture 4 to 6 weeks longer into the dry season than conventional plow furrows.'
      ]}
      inputs={
        <>
          <Field
            label="Planting pit excavation specification"
            helperText={pitSpec.description}
          >
            <Select
              value={selectedPitType}
              onChange={(e) => setSelectedPitType(e.target.value as keyof typeof PLANTING_PIT_SPECS)}
              options={Object.values(PLANTING_PIT_SPECS).map((p) => ({
                value: p.key,
                label: `${p.name} (${p.dimensionString})`
              }))}
            />
          </Field>

          <Field
            label={`Orchard & agroforestry area (${unitSystem === 'metric' ? 'acres' : 'hectares'})`}
            helperText="Tree planting zone dedicated to fruit, nuts, firewood coppice, and windbreak."
          >
            <Slider
              value={orchardAcres}
              min={0.1}
              max={10}
              step={0.1}
              unit=" ac"
              onChangeValue={setOrchardAcres}
            />
          </Field>
        </>
      }
      results={
        <div className="flex flex-col gap-3 text-[13px]">
          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <span className="text-[var(--ink-muted)]">Inoculated biochar required</span>
            <span className="font-mono tabular-nums font-semibold text-[var(--accent)]">
              {biocharNeededKg.toLocaleString()} kg
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <span className="text-[var(--ink-muted)]">Subterranean water retention</span>
            <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
              {waterRetentionLiters.toLocaleString()} L
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <span className="text-[var(--ink-muted)]">Excavation volume per pit</span>
            <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
              {pitSpec.dimensionString}
            </span>
          </div>

          <div className="pt-2">
            <Button
              variant="secondary"
              size="sm"
              icon={Layers}
              onClick={() => setShowDiagram(!showDiagram)}
            >
              {showDiagram ? 'Hide pit diagram' : 'View excavation diagram'}
            </Button>
            {showDiagram && (
              <div className="mt-3 p-2 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)]">
                <StandardDiagram type="planting-pit" className="bg-transparent border-0" />
              </div>
            )}
          </div>
        </div>
      }
    />
  );
}
