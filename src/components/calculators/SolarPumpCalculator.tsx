import React, { useState } from 'react';
import { CalculatorShell } from './CalculatorShell';
import { Field, Input, Slider } from '@/components/ui';

export interface SolarPumpCalculatorProps {
  initialDepth?: number;
  initialWaterNeeded?: number;
  initialSunHours?: number;
  onSaveToVault?: (data: any) => void;
}

export function SolarPumpCalculator({
  initialDepth = 35,
  initialWaterNeeded = 2000,
  initialSunHours = 5.5,
  onSaveToVault
}: SolarPumpCalculatorProps) {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  // Realistic defaults
  const [depthMeters, setDepthMeters] = useState<number>(initialDepth);
  const [waterNeededLiters, setWaterNeededLiters] = useState<number>(initialWaterNeeded);
  const [sunHours, setSunHours] = useState<number>(initialSunHours);

  // Conversion helpers
  const displayDepth = unitSystem === 'metric' ? depthMeters : Math.round(depthMeters * 3.28084);
  const depthUnit = unitSystem === 'metric' ? 'm' : 'ft';

  const displayWater = unitSystem === 'metric' ? waterNeededLiters : Math.round(waterNeededLiters * 0.264172);
  const waterUnit = unitSystem === 'metric' ? 'L/day' : 'gal/day';

  // Inline validation
  const depthError = depthMeters < 3 ? 'Depth must be at least 3 meters (10 ft)' : depthMeters > 150 ? 'Exceeds standard 150m pump ratings' : undefined;
  const waterError = waterNeededLiters < 200 ? 'Minimum household baseline is 200 L/day' : undefined;

  // Unchanged formulas
  const volumeM3 = waterNeededLiters / 1000;
  const hydraulicEnergyKWh = (1000 * 9.81 * depthMeters * volumeM3) / 3600000;
  const requiredPvWattHours = (hydraulicEnergyKWh / 0.45) * 1000;
  const recommendedPvWatts = Math.round((requiredPvWattHours / sunHours) * 1.35);
  const recommendedTankSize = Math.round(waterNeededLiters * 2);
  const minimumBoreholeFlow = (waterNeededLiters / (sunHours * 60)).toFixed(1);
  const controllerSpec =
    recommendedPvWatts > 600 || depthMeters > 45 || waterNeededLiters > 3500
      ? '48V Controller'
      : '24V Controller';

  const handleReset = () => {
    setDepthMeters(initialDepth);
    setWaterNeededLiters(initialWaterNeeded);
    setSunHours(initialSunHours);
  };

  const copySummaryText = () => {
    return `SOLAR BOREHOLE PUMP SPECIFICATIONS
Target Depth: ${depthMeters} m (${Math.round(depthMeters * 3.28084)} ft)
Daily Water Demand: ${waterNeededLiters.toLocaleString()} L/day (${Math.round(waterNeededLiters * 0.264172)} gal/day)
Peak Sun Hours: ${sunHours} hrs/day
----------------------------------------
Recommended Solar Array: ${recommendedPvWatts} W
Elevated Storage Tank: ${recommendedTankSize.toLocaleString()} L
Min Borehole Flow Speed: ${minimumBoreholeFlow} L/min
Pump Drive: ${controllerSpec}`;
  };

  return (
    <CalculatorShell
      title="Solar borehole pump sizer"
      category="Water security"
      description="Calculate photovoltaic array capacity, minimum borehole yield, and elevated gravity storage tank sizing for off-grid homestead wells."
      mainAnswer={{
        label: 'Recommended solar array capacity',
        value: recommendedPvWatts.toLocaleString(),
        unit: 'Watts peak',
        subtext: `Requires approx. ${Math.ceil(recommendedPvWatts / 300)} × 300W monocrystalline solar panels with 35% safety margin.`
      }}
      unitSystem={unitSystem}
      onUnitSystemChange={setUnitSystem}
      onReset={handleReset}
      onSaveToVault={() =>
        onSaveToVault?.({
          depthMeters,
          waterNeededLiters,
          sunHours,
          recommendedPvWatts,
          recommendedTankSize,
          minimumBoreholeFlow,
          controllerSpec
        })
      }
      copySummaryText={copySummaryText}
      formulaDescription="Hydraulic Energy = (ρ × g × h × V) / 3.6×10⁶ kWh. Array Watts = (Hydraulic Wh / 0.45 sub-pump eff) / Sun Hours × 1.35 safety."
      assumptions={[
        'Overall motor and pump sub-surface wire efficiency estimated at 45%.',
        '35% oversizing factor handles morning/late-afternoon solar irradiance drop.',
        'Storage tank accommodates 2 days of zero-pumping cloudy weather buffer.',
        'Direct solar pumping to an elevated tank eliminates costly battery replacements.'
      ]}
      inputs={
        <>
          <Field
            label={`Well / borehole depth (${depthUnit})`}
            errorMessage={depthError}
            helperText="Shallow wells: 10–25m (30–80ft). Deep boreholes: 30–75m (100–250ft)."
          >
            <Slider
              value={depthMeters}
              min={5}
              max={120}
              step={1}
              unit=" m"
              onChangeValue={setDepthMeters}
            />
          </Field>

          <Field
            label={`Daily water needed (${waterUnit})`}
            errorMessage={waterError}
            helperText="Domestic household: 300–800 L/day. Vegetable garden & orchard: 2,000–5,000 L/day."
          >
            <Slider
              value={waterNeededLiters}
              min={300}
              max={8000}
              step={100}
              unit=" L"
              onChangeValue={setWaterNeededLiters}
            />
          </Field>

          <Field
            label="Daily sunshine hours (peak sun)"
            helperText="Malawi dry season average: 5.5 to 6.5 peak sun hours per day."
          >
            <Slider
              value={sunHours}
              min={3.5}
              max={7.0}
              step={0.1}
              unit=" hrs"
              onChangeValue={setSunHours}
            />
          </Field>
        </>
      }
      results={
        <div className="flex flex-col gap-3 text-[13px]">
          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <span className="text-[var(--ink-muted)]">Elevated storage tank (2-day buffer)</span>
            <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
              {unitSystem === 'metric'
                ? `${recommendedTankSize.toLocaleString()} L`
                : `${Math.round(recommendedTankSize * 0.264172).toLocaleString()} gal`}
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <span className="text-[var(--ink-muted)]">Minimum well flow yield</span>
            <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
              {minimumBoreholeFlow} L/min
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <span className="text-[var(--ink-muted)]">Recommended controller</span>
            <span className="font-mono tabular-nums font-semibold text-[var(--accent)]">
              {controllerSpec}
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5">
            <span className="text-[var(--ink-muted)]">Estimated panel count</span>
            <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
              {Math.ceil(recommendedPvWatts / 300)} × 300W modules
            </span>
          </div>
        </div>
      }
    />
  );
}
