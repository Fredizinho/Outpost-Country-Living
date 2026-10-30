import React, { useState } from 'react';
import { CalculatorShell } from './CalculatorShell';
import { Field, Slider } from '@/components/ui';

export interface FoodReserveCalculatorProps {
  initialAdults?: number;
  initialChildren?: number;
  initialMonths?: number;
  onSaveToVault?: (data: any) => void;
}

export function FoodReserveCalculator({
  initialAdults = 2,
  initialChildren = 2,
  initialMonths = 12,
  onSaveToVault
}: FoodReserveCalculatorProps) {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [adults, setAdults] = useState<number>(initialAdults);
  const [children, setChildren] = useState<number>(initialChildren);
  const [months, setMonths] = useState<number>(initialMonths);

  // Conversion factor
  const kgToLbs = 2.20462;
  const weightUnit = unitSystem === 'metric' ? 'kg' : 'lbs';
  const formatWeight = (kg: number) =>
    unitSystem === 'metric' ? `${kg.toLocaleString()} kg` : `${Math.round(kg * kgToLbs).toLocaleString()} lbs`;

  // Unchanged formulas
  const totalPeopleFactor = adults + children * 0.65;
  const maizeKg = Math.round(totalPeopleFactor * 14 * months);
  const beansKg = Math.round(totalPeopleFactor * 3.5 * months);
  const groundnutsKg = Math.round(totalPeopleFactor * 2.2 * months);
  const tubersKg = Math.round(totalPeopleFactor * 9 * months);
  const saltKg = Math.round(totalPeopleFactor * 0.4 * months * 10) / 10;
  const waterLiters = Math.round(totalPeopleFactor * 300 * months);

  const handleReset = () => {
    setAdults(initialAdults);
    setChildren(initialChildren);
    setMonths(initialMonths);
  };

  const copySummaryText = () => {
    return `${months}-MONTH HOMESTEAD GRAIN & FOOD RESERVE MATRIX
Household: ${adults} Adults, ${children} Children (Equiv. ${totalPeopleFactor.toFixed(1)} Adult Factors)
----------------------------------------
Maize / Staple Grain: ${formatWeight(maizeKg)} (≈ ${Math.ceil(maizeKg / 50)} × 50kg sacks)
Legumes / Beans: ${formatWeight(beansKg)} (≈ ${Math.ceil(beansKg / 50)} × 50kg sacks)
Groundnuts / Oilseeds: ${formatWeight(groundnutsKg)} (≈ ${Math.ceil(groundnutsKg / 50)} × 50kg sacks)
Sweet Potatoes / Tubers: ${formatWeight(tubersKg)}
Mineral Salt: ${formatWeight(saltKg)}
Emergency Pure Water Reserve: ${waterLiters.toLocaleString()} Liters`;
  };

  return (
    <CalculatorShell
      title="12-month grain & food reserve sizer"
      category="Planting & sustenance"
      description="Calculate nutritional staple grain, legume, oilseed, and mineral reserves for complete household food independence across lean seasons."
      mainAnswer={{
        label: `Total staple grain reserve (${months} months)`,
        value: unitSystem === 'metric' ? maizeKg.toLocaleString() : Math.round(maizeKg * kgToLbs).toLocaleString(),
        unit: weightUnit,
        subtext: `Equivalent to approx. ${Math.ceil(maizeKg / 50)} × 50kg sacks sealed in triple-layer hermetic PICS bags with dried neem leaves.`
      }}
      unitSystem={unitSystem}
      onUnitSystemChange={setUnitSystem}
      onReset={handleReset}
      onSaveToVault={() =>
        onSaveToVault?.({
          adults,
          children,
          months,
          totalPeopleFactor,
          maizeKg,
          beansKg,
          groundnutsKg,
          tubersKg,
          saltKg,
          waterLiters
        })
      }
      copySummaryText={copySummaryText}
      formulaDescription="Adult Factor = Adults + (Children × 0.65). Grain = Factor × 14kg × Months. Beans = Factor × 3.5kg × Months. Water = Factor × 300L × Months."
      assumptions={[
        '14 kg/month staple grain allocation provides approx. 1,600 kcal/day baseline carbohydrate energy.',
        'Legume and oilseed ratios supply complete plant-based protein balance and essential lipids.',
        '12 months reserve ensures resilience through agricultural drought or delayed monsoon onset.'
      ]}
      inputs={
        <>
          <Field label="Number of adults in household" helperText="Ages 14 and older.">
            <Slider
              value={adults}
              min={1}
              max={10}
              step={1}
              unit=" adults"
              onChangeValue={setAdults}
            />
          </Field>

          <Field label="Number of children in household" helperText="Ages 0 to 13 (calculated at 0.65 adult nutritional factor).">
            <Slider
              value={children}
              min={0}
              max={12}
              step={1}
              unit=" children"
              onChangeValue={setChildren}
            />
          </Field>

          <Field
            label="Target self-reliance duration (months)"
            helperText="12 months bridges an entire annual harvest cycle through the February hunger gap."
          >
            <Slider
              value={months}
              min={3}
              max={24}
              step={3}
              unit=" mo"
              onChangeValue={setMonths}
            />
          </Field>
        </>
      }
      results={
        <div className="flex flex-col gap-3 text-[13px]">
          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <div>
              <span className="font-medium text-[var(--ink)] block">Beans & legumes</span>
              <span className="text-[12px] text-[var(--ink-muted)]">Protein staple (pigeon peas, cowpeas, soya)</span>
            </div>
            <div className="text-right">
              <span className="font-mono tabular-nums font-semibold text-[var(--ink)] block">
                {formatWeight(beansKg)}
              </span>
              <span className="text-[11px] font-mono text-[var(--ink-muted)]">
                ≈ {Math.ceil(beansKg / 50)} × 50kg bags
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <div>
              <span className="font-medium text-[var(--ink)] block">Groundnuts & oilseeds</span>
              <span className="text-[12px] text-[var(--ink-muted)]">Essential lipids, fats & energy</span>
            </div>
            <div className="text-right">
              <span className="font-mono tabular-nums font-semibold text-[var(--ink)] block">
                {formatWeight(groundnutsKg)}
              </span>
              <span className="text-[11px] font-mono text-[var(--ink-muted)]">
                ≈ {Math.ceil(groundnutsKg / 50)} × 50kg bags
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <div>
              <span className="font-medium text-[var(--ink)] block">Sweet potatoes & tubers</span>
              <span className="text-[12px] text-[var(--ink-muted)]">Continuous harvest root bank</span>
            </div>
            <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
              {formatWeight(tubersKg)}
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <div>
              <span className="font-medium text-[var(--ink)] block">Pure drinking water reserve</span>
              <span className="text-[12px] text-[var(--ink-muted)]">Emergency storage (sealed containers)</span>
            </div>
            <div className="text-right">
              <span className="font-mono tabular-nums font-semibold text-[var(--accent)] block">
                {unitSystem === 'metric'
                  ? `${waterLiters.toLocaleString()} L`
                  : `${Math.round(waterLiters * 0.264172).toLocaleString()} gal`}
              </span>
              <span className="text-[11px] font-mono text-[var(--ink-muted)]">
                ≈ {Math.ceil(waterLiters / 20)} × 20L jerrycans
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center py-1.5">
            <div>
              <span className="font-medium text-[var(--ink)] block">Mineral salt reserve</span>
              <span className="text-[12px] text-[var(--ink-muted)]">Keeps indefinitely when stored dry</span>
            </div>
            <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
              {formatWeight(saltKg)}
            </span>
          </div>
        </div>
      }
    />
  );
}
