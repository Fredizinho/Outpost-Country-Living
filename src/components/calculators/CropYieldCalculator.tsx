import React, { useState } from 'react';
import { CalculatorShell } from './CalculatorShell';
import { YieldComparisonChart } from '@/components/calculators/YieldComparisonChart';
import { Field, Slider } from '@/components/ui';

export interface CropYieldCalculatorProps {
  initialAcres?: number;
  onSaveToVault?: (data: any) => void;
}

export function CropYieldCalculator({
  initialAcres = 2.0,
  onSaveToVault
}: CropYieldCalculatorProps) {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [cropAcres, setCropAcres] = useState<number>(initialAcres);

  // Yield constants (bags per acre: Sasakawa ~45 bags/acre vs conventional ridge ~14 bags/acre)
  const conventionalBags = Math.round(cropAcres * 14);
  const edenicSasakawaBags = Math.round(cropAcres * 45);
  const yieldDifferenceBags = edenicSasakawaBags - conventionalBags;
  const yieldPercentageIncrease = Math.round(((edenicSasakawaBags - conventionalBags) / conventionalBags) * 100);

  const handleReset = () => {
    setCropAcres(initialAcres);
  };

  const copySummaryText = () => {
    return `CROP YIELD COMPARISON & SASAKAWA GAINS
Cultivated Land: ${cropAcres} Acres (${(cropAcres * 0.404686).toFixed(2)} Hectares)
----------------------------------------
Conventional Ridges (without mulch): ${conventionalBags} × 50kg bags (${(conventionalBags * 50).toLocaleString()} kg)
Edenic / Sasakawa Pits (mulched): ${edenicSasakawaBags} × 50kg bags (${(edenicSasakawaBags * 50).toLocaleString()} kg)
Net Yield Surplus: +${yieldDifferenceBags} bags (+${yieldPercentageIncrease}%)`;
  };

  return (
    <CalculatorShell
      title="Crop yield & Sasakawa comparative sizer"
      category="Planting & sustenance"
      description="Compare field crop harvest yields between conventional chemical ridge farming and mulched deep-bed edenic pit cultivation."
      mainAnswer={{
        label: 'Edenic mulched pit harvest projection',
        value: `${edenicSasakawaBags}`,
        unit: 'sacks (50kg)',
        subtext: `Projected harvest of ${(edenicSasakawaBags * 50).toLocaleString()} kg from ${cropAcres} acres with 300% root volume expansion.`
      }}
      unitSystem={unitSystem}
      onUnitSystemChange={setUnitSystem}
      onReset={handleReset}
      onSaveToVault={() =>
        onSaveToVault?.({
          cropAcres,
          conventionalBags,
          edenicSasakawaBags,
          yieldDifferenceBags
        })
      }
      copySummaryText={copySummaryText}
      formulaDescription="Conventional = Acres × 14 bags/acre. Edenic Deep-Pit = Acres × 45 bags/acre. Net Gain = Edenic - Conventional."
      assumptions={[
        'Baseline conventional yield of 14 bags/acre represents Malawi smallholder rainfed maize with fertilizer.',
        'Deep-pit Sasakawa system with permanent organic soil cover and compost generates 40–50 bags/acre even in dry years.',
        'Reduces synthetic fertilizer expenditure to zero within three seasons of continuous mulching.'
      ]}
      inputs={
        <>
          <Field
            label={`Field grain cultivated area (${unitSystem === 'metric' ? 'acres' : 'hectares'})`}
            helperText="Acreage planted to open-pollinated heirloom maize, sorghum, and companion legumes."
          >
            <Slider
              value={cropAcres}
              min={0.5}
              max={15}
              step={0.5}
              unit=" ac"
              onChangeValue={setCropAcres}
            />
          </Field>
          <div className="pt-3 border-t border-[var(--border)]">
            <YieldComparisonChart />
          </div>
        </>
      }
      results={
        <div className="flex flex-col gap-3 text-[13px]">
          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <div>
              <span className="font-medium text-[var(--ink)] block">Conventional single ridge</span>
              <span className="text-[12px] text-[var(--ink-muted)]">Bare soil, high runoff</span>
            </div>
            <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
              {conventionalBags} bags ({(conventionalBags * 50).toLocaleString()} kg)
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <div>
              <span className="font-medium text-[var(--ink)] block">Edenic pit / Sasakawa</span>
              <span className="text-[12px] text-[var(--ink-muted)]">Deep aeration, permanent mulch</span>
            </div>
            <span className="font-mono tabular-nums font-semibold text-[var(--accent)]">
              {edenicSasakawaBags} bags ({(edenicSasakawaBags * 50).toLocaleString()} kg)
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <div>
              <span className="font-medium text-[var(--ink)] block">Surplus harvest gain</span>
              <span className="text-[12px] text-[var(--ink-muted)]">Food security cushion</span>
            </div>
            <span className="font-mono tabular-nums font-semibold text-emerald-700 dark:text-emerald-300">
              +{yieldDifferenceBags} bags (+{yieldPercentageIncrease}%)
            </span>
          </div>
        </div>
      }
    />
  );
}
