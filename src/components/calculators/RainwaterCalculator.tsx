import React, { useState } from 'react';
import { CalculatorShell } from './CalculatorShell';
import { Field, Select, Slider, Button } from '@/components/ui';
import { DISTRICT_RAINFALL_PRESETS, HOMESTEAD_WATER_CONSTANTS } from '@/constants';
import { SeasonalWaterBalanceSimulator } from '@/components/water/SeasonalWaterBalanceSimulator';
import { StandardDiagram } from '@/components/common/StandardDiagram';
import { Layers } from 'lucide-react';

export interface RainwaterCalculatorProps {
  initialDistrict?: string;
  initialRoofArea?: number;
  initialAnnualRainfall?: number;
  dailyWaterBaseline?: number;
  onSaveToVault?: (data: any) => void;
}

export function RainwaterCalculator({
  initialDistrict = 'dedza',
  initialRoofArea = 120,
  initialAnnualRainfall = 1100,
  dailyWaterBaseline = 2000,
  onSaveToVault
}: RainwaterCalculatorProps) {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [districtPreset, setDistrictPreset] = useState<string>(initialDistrict);
  const [roofAreaM2, setRoofAreaM2] = useState<number>(initialRoofArea);
  const [annualRainfallMm, setAnnualRainfallMm] = useState<number>(initialAnnualRainfall);
  const [dimbaAreaSqm, setDimbaAreaSqm] = useState<number>(200);
  const [showDiagram, setShowDiagram] = useState<boolean>(false);

  const handleDistrictChange = (d: string) => {
    setDistrictPreset(d);
    const preset = DISTRICT_RAINFALL_PRESETS[d];
    if (preset) {
      setAnnualRainfallMm(preset.rainfall);
    }
  };

  // Formulas unchanged
  const harvestableVolumeLiters = Math.round(
    roofAreaM2 * (annualRainfallMm / 1000) * HOMESTEAD_WATER_CONSTANTS.runoffEfficiency * 1000
  );
  const recommendedCisternLiters = Math.min(
    harvestableVolumeLiters,
    Math.round(dailyWaterBaseline * HOMESTEAD_WATER_CONSTANTS.reserveBufferDays)
  );

  const dimbaDailyLiters = Math.round(dimbaAreaSqm * 4.5);
  const dimbaWateringCans20L = Math.ceil(dimbaDailyLiters / 20);
  const dimbaDripLinesMeters = Math.round(dimbaAreaSqm / 0.75);

  const handleReset = () => {
    setRoofAreaM2(initialRoofArea);
    setAnnualRainfallMm(initialAnnualRainfall);
    setDimbaAreaSqm(200);
    setDistrictPreset(initialDistrict);
  };

  const copySummaryText = () => {
    return `RAINWATER HARVESTING & CISTERN SPECIFICATIONS
Roof Area: ${roofAreaM2} m² (${Math.round(roofAreaM2 * 10.7639)} sq ft)
Annual Rainfall: ${annualRainfallMm} mm/yr
----------------------------------------
Annual Harvest Potential: ${harvestableVolumeLiters.toLocaleString()} Liters (${Math.round(harvestableVolumeLiters * 0.264172).toLocaleString()} gal)
Recommended Cistern Storage: ${recommendedCisternLiters.toLocaleString()} Liters (${Math.round(recommendedCisternLiters * 0.264172).toLocaleString()} gal)
Dry-Season Dimba (${dimbaAreaSqm} m²): ${dimbaDailyLiters.toLocaleString()} L/day (${dimbaWateringCans20L} × 20L cans)`;
  };

  return (
    <CalculatorShell
      title="Rainwater harvesting & cistern sizer"
      category="Water security"
      description="Estimate annual rainwater catchment volume from corrugated iron roofs into storage cisterns and plan dry-season dimba garden irrigation."
      mainAnswer={{
        label: 'Annual harvestable rainwater potential',
        value: (unitSystem === 'metric'
          ? harvestableVolumeLiters
          : Math.round(harvestableVolumeLiters * 0.264172)
        ).toLocaleString(),
        unit: unitSystem === 'metric' ? 'Liters / year' : 'Gallons / year',
        subtext: `Based on 85% runoff sheet efficiency across ${roofAreaM2} m² [${Math.round(roofAreaM2 * 10.7639)} sq ft] corrugated iron roof.`
      }}
      unitSystem={unitSystem}
      onUnitSystemChange={setUnitSystem}
      onReset={handleReset}
      onSaveToVault={() =>
        onSaveToVault?.({
          roofAreaM2,
          annualRainfallMm,
          harvestableVolumeLiters,
          recommendedCisternLiters,
          dimbaAreaSqm,
          dimbaDailyLiters
        })
      }
      copySummaryText={copySummaryText}
      formulaDescription="Harvest Volume = Roof Area (m²) × Rainfall (m) × Runoff Efficiency (0.85) × 1000 L/m³."
      assumptions={[
        'Runoff coefficient of 0.85 accounts for evaporation, gutter splash, and first-flush diversion.',
        'Recommended cistern capacity stores a 90-day buffer of essential homestead water needs.',
        'Dimba irrigation rate of 4.5 L/m²/day assumes heavy organic mulching in mid-altitude valleys.'
      ]}
      inputs={
        <>
          <Field label="District / rainfall preset">
            <Select
              value={districtPreset}
              onChange={(e) => handleDistrictChange(e.target.value)}
              options={Object.entries(DISTRICT_RAINFALL_PRESETS).map(([k, v]) => ({
                value: k,
                label: `${v.name} (${v.rainfall} mm/yr)`
              }))}
            />
          </Field>

          <Field
            label={`Annual rainfall (${unitSystem === 'metric' ? 'mm/year' : 'in/year'})`}
            helperText="Regional precipitation average across wet season months."
          >
            <Slider
              value={annualRainfallMm}
              min={600}
              max={2200}
              step={25}
              unit=" mm"
              onChangeValue={setAnnualRainfallMm}
            />
          </Field>

          <Field
            label={`Corrugated iron roof area (${unitSystem === 'metric' ? 'm²' : 'sq ft'})`}
            helperText="Small cottage: 50–80 m². Standard home + shed: 120–200 m²."
          >
            <Slider
              value={roofAreaM2}
              min={30}
              max={500}
              step={10}
              unit=" m²"
              onChangeValue={setRoofAreaM2}
            />
          </Field>

          <div className="pt-3 border-t border-[var(--border)] flex flex-col gap-2">
            <Field
              label="Dry-season dimba (valley garden) area"
              helperText="Size of mulched vegetable plots irrigated through May–October."
            >
              <Slider
                value={dimbaAreaSqm}
                min={50}
                max={1000}
                step={50}
                unit=" m²"
                onChangeValue={setDimbaAreaSqm}
              />
            </Field>
          </div>
        </>
      }
      results={
        <div className="flex flex-col gap-3 text-[13px]">
          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <span className="text-[var(--ink-muted)]">Recommended cistern capacity</span>
            <span className="font-mono tabular-nums font-semibold text-[var(--accent)]">
              {unitSystem === 'metric'
                ? `${recommendedCisternLiters.toLocaleString()} L`
                : `${Math.round(recommendedCisternLiters * 0.264172).toLocaleString()} gal`}
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <span className="text-[var(--ink-muted)]">Tank requirement (5,000L units)</span>
            <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
              {Math.ceil(recommendedCisternLiters / 5000)} × 5,000 L tanks
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <span className="text-[var(--ink-muted)]">Dimba daily irrigation water</span>
            <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
              {dimbaDailyLiters.toLocaleString()} L/day ({dimbaWateringCans20L} cans)
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <span className="text-[var(--ink-muted)]">Drip line length (75cm spacing)</span>
            <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
              {dimbaDripLinesMeters} m
            </span>
          </div>

          <div className="pt-2">
            <Button
              variant="secondary"
              size="sm"
              icon={Layers}
              onClick={() => setShowDiagram(!showDiagram)}
            >
              {showDiagram ? 'Hide roof schematic' : 'View roof tank schematic'}
            </Button>
            {showDiagram && (
              <div className="mt-3 p-2 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)]">
                <StandardDiagram type="roof-tank" className="bg-transparent border-0" />
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-[var(--border)]">
            <SeasonalWaterBalanceSimulator
              initialDistrictId={districtPreset}
              initialFamilySize={4}
              initialRoofAreaSqm={roofAreaM2}
            />
          </div>
        </div>
      }
    />
  );
}
