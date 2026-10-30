import React, { useState } from 'react';
import { CalculatorShell } from './CalculatorShell';
import { Field, Slider } from '@/components/ui';

export interface LandZoningCalculatorProps {
  initialAcres?: number;
  onSaveToVault?: (data: any) => void;
}

export function LandZoningCalculator({
  initialAcres = 2.5,
  onSaveToVault
}: LandZoningCalculatorProps) {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [acres, setAcres] = useState<number>(initialAcres);

  // Unchanged zoning proportions
  const zoneDwelling = Math.round(acres * 0.08 * 100) / 100; // 8%
  const zoneGarden = Math.round(acres * 0.15 * 100) / 100; // 15%
  const zoneOrchard = Math.round(acres * 0.22 * 100) / 100; // 22%
  const zoneCrops = Math.round(acres * 0.40 * 100) / 100; // 40%
  const zoneLivestockWater = Math.round(acres * 0.15 * 100) / 100; // 15%

  const hectares = (acres * 0.404686).toFixed(2);
  const sqMeters = Math.round(acres * 4046.86);

  const handleReset = () => {
    setAcres(initialAcres);
  };

  const copySummaryText = () => {
    return `HOMESTEAD LAND ALLOCATION BREAKDOWN
Total Area: ${acres} Acres (${hectares} Hectares / ${sqMeters.toLocaleString()} m²)
----------------------------------------
Zone 1 (Dwelling & Rain Roof): ${zoneDwelling} Acres
Zone 1 (Intensive Kitchen Garden): ${zoneGarden} Acres
Zone 2 (Orchard & Agroforestry): ${zoneOrchard} Acres
Zone 3 (Field Crops & Legumes): ${zoneCrops} Acres
Zone 4 (Swales, Ponds & Livestock): ${zoneLivestockWater} Acres`;
  };

  return (
    <CalculatorShell
      title="Homestead land zoning & allocation"
      category="Soil & permaculture"
      description="Divide customary estate or leasehold rural acreage into five functional permaculture sectors for food security and water capture."
      mainAnswer={{
        label: 'Field staple crops & legume rotation (Zone 3)',
        value: `${zoneCrops}`,
        unit: 'Acres',
        subtext: `Allocates 40% of total land (${(zoneCrops * 0.404686).toFixed(2)} Ha) to maize, pigeon peas, groundnuts, and sweet potatoes.`
      }}
      unitSystem={unitSystem}
      onUnitSystemChange={setUnitSystem}
      onReset={handleReset}
      onSaveToVault={() =>
        onSaveToVault?.({
          acres,
          zoneDwelling,
          zoneGarden,
          zoneOrchard,
          zoneCrops,
          zoneLivestockWater
        })
      }
      copySummaryText={copySummaryText}
      formulaDescription="Dwelling = 8%, Garden = 15%, Orchard = 22%, Field Crops = 40%, Swales & Livestock = 15%."
      assumptions={[
        'Permaculture sector planning places high-frequency labor zones closest to the dwelling.',
        'Intensive kitchen garden requires daily access within 30 meters of kitchen greywater output.',
        'Agroforestry windbreak shields vegetable beds from prevailing easterly dry-season winds.'
      ]}
      inputs={
        <Field
          label={`Total homestead land area (${unitSystem === 'metric' ? 'acres' : 'hectares'})`}
          helperText={`Equivalent to ${hectares} Hectares (${sqMeters.toLocaleString()} square meters).`}
        >
          <Slider
            value={acres}
            min={0.5}
            max={20}
            step={0.5}
            unit=" ac"
            onChangeValue={setAcres}
          />
        </Field>
      }
      results={
        <div className="flex flex-col gap-3 text-[13px]">
          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <div>
              <span className="font-medium text-[var(--ink)] block">Zone 1: Cottage, Tanks & Yard</span>
              <span className="text-[12px] text-[var(--ink-muted)]">Dwelling, solar shed, rainwater cisterns</span>
            </div>
            <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
              {zoneDwelling} ac
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <div>
              <span className="font-medium text-[var(--ink)] block">Zone 1: Deep-bed kitchen garden</span>
              <span className="text-[12px] text-[var(--ink-muted)]">Daily leafy greens, tomatoes, herbs</span>
            </div>
            <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
              {zoneGarden} ac
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <div>
              <span className="font-medium text-[var(--ink)] block">Zone 2: Orchard & agroforestry</span>
              <span className="text-[12px] text-[var(--ink-muted)]">Fruit trees, macadamia, live windbreak</span>
            </div>
            <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
              {zoneOrchard} ac
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <div>
              <span className="font-medium text-[var(--ink)] block">Zone 3: Staple grain rotations</span>
              <span className="text-[12px] text-[var(--ink-muted)]">Maize, groundnuts, pigeon peas, cassava</span>
            </div>
            <span className="font-mono tabular-nums font-semibold text-[var(--accent)]">
              {zoneCrops} ac
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5">
            <div>
              <span className="font-medium text-[var(--ink)] block">Zone 4: Swales, ponds & forage</span>
              <span className="text-[12px] text-[var(--ink-muted)]">Infiltration trenches, pasture, apiary</span>
            </div>
            <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
              {zoneLivestockWater} ac
            </span>
          </div>
        </div>
      }
    />
  );
}
