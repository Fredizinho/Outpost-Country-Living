import React, { useState } from 'react';
import { CalculatorShell } from './CalculatorShell';
import { OffGridSizingTools } from '@/components/outpost/OffGridSizingTools';

export interface SolarPowerCalculatorProps {
  onSaveToVault?: (data: any) => void;
}

export function SolarPowerCalculator({ onSaveToVault }: SolarPowerCalculatorProps) {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  const copySummaryText = () => {
    return `HOMESTEAD OFF-GRID ELECTRICAL SIZING
System Type: 48V LiFePO4 Inverter/Charger & Monocrystalline PV
Recommended Array: 2,400 W (8 × 300W Panels)
Battery Storage: 4.8 kWh LiFePO4 (100Ah @ 48V)
Daily Harvest: 12.0 kWh/day (5.0 Peak Sun Hours)`;
  };

  return (
    <CalculatorShell
      title="Off-grid photovoltaic & battery sizer"
      category="Energy independence"
      description="Size homestead household electrical loads, inverter continuous wattage, and LiFePO4 battery storage reserve."
      mainAnswer={{
        label: 'Recommended lithium storage battery',
        value: '4.8',
        unit: 'kWh capacity',
        subtext: 'Configured as 48V 100Ah LiFePO4 rack mount with 80% maximum depth of discharge.'
      }}
      unitSystem={unitSystem}
      onUnitSystemChange={setUnitSystem}
      onReset={() => {}}
      onSaveToVault={() => onSaveToVault?.({ system: '48V LiFePO4 4.8kWh' })}
      copySummaryText={copySummaryText}
      formulaDescription="Battery kWh = (Daily Watt-Hours × Days of Autonomy) / (Battery Voltage × DoD × Inverter Efficiency)."
      assumptions={[
        'LiFePO4 chemistry safely supports 4,000+ charge cycles at 80% depth of discharge.',
        'High-voltage 48V architecture reduces copper conductor cable diameter and line losses.',
        'Separates heavy inductive motor loads (water pumps) onto dedicated DC pump controllers.'
      ]}
      inputs={
        <div className="w-full">
          <OffGridSizingTools />
        </div>
      }
      results={
        <div className="flex flex-col gap-3 text-[13px]">
          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <span className="text-[var(--ink-muted)]">Solar panel array power</span>
            <span className="font-mono tabular-nums font-semibold text-[var(--accent)]">
              2,400 W peak
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <span className="text-[var(--ink-muted)]">Pure sine-wave inverter</span>
            <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
              3,000 W continuous (6,000W surge)
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <span className="text-[var(--ink-muted)]">System bus voltage</span>
            <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
              48 V DC
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5">
            <span className="text-[var(--ink-muted)]">Days of cloudy autonomy</span>
            <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
              2.0 days
            </span>
          </div>
        </div>
      }
    />
  );
}
