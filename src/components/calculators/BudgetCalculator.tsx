import React, { useState } from 'react';
import { CalculatorShell } from './CalculatorShell';
import { Field, Input, Slider } from '@/components/ui';
import { HomesteadBoQEstimator } from '@/components/outpost/HomesteadBoQEstimator';

export interface BudgetCalculatorProps {
  initialAcres?: number;
  onSaveToVault?: (data: any) => void;
}

export function BudgetCalculator({
  initialAcres = 2.5,
  onSaveToVault
}: BudgetCalculatorProps) {
  const [currency, setCurrency] = useState<'USD' | 'MWK'>('USD');
  const exchangeRate = 1750; // 1 USD ~ 1,750 MWK

  const [acres, setAcres] = useState<number>(initialAcres);
  const [pricePerAcreUsd, setPricePerAcreUsd] = useState<number>(1000);
  const [landCostUsd, setLandCostUsd] = useState<number>(() => Math.round(initialAcres * 1000));
  const [waterSetupUsd, setWaterSetupUsd] = useState<number>(2800);
  const [solarSystemUsd, setSolarSystemUsd] = useState<number>(2200);
  const [fencingUsd, setFencingUsd] = useState<number>(650);
  const [cottageUsd, setCottageUsd] = useState<number>(4500);
  const [seedsToolingUsd, setSeedsToolingUsd] = useState<number>(500);

  const handleAcresChange = (newAcres: number) => {
    setAcres(newAcres);
    setLandCostUsd(Math.round(newAcres * pricePerAcreUsd));
  };

  // Unchanged formulas
  const totalBudgetUsd = landCostUsd + waterSetupUsd + solarSystemUsd + fencingUsd + cottageUsd + seedsToolingUsd;
  const totalBudgetMwk = totalBudgetUsd * exchangeRate;

  const formatCurrency = (usdAmount: number) => {
    if (currency === 'USD') {
      return `$${usdAmount.toLocaleString()}`;
    }
    return `K${(usdAmount * exchangeRate).toLocaleString()}`;
  };

  const handleReset = () => {
    setAcres(initialAcres);
    setPricePerAcreUsd(1000);
    setLandCostUsd(Math.round(initialAcres * 1000));
    setWaterSetupUsd(2800);
    setSolarSystemUsd(2200);
    setFencingUsd(650);
    setCottageUsd(4500);
    setSeedsToolingUsd(500);
  };

  const copySummaryText = () => {
    return `SANCTUARY ESTABLISHMENT CAPITAL BUDGET
Currency: ${currency} (Exchange: 1 USD = ${exchangeRate.toLocaleString()} MWK)
----------------------------------------
Land Acquisition (${acres} Acres): ${formatCurrency(landCostUsd)}
Water Security (Borehole + Solar Pump): ${formatCurrency(waterSetupUsd)}
Off-Grid Solar PV & Battery: ${formatCurrency(solarSystemUsd)}
Perimeter Fencing & Hedgerow: ${formatCurrency(fencingUsd)}
Earth Block Cottage Build: ${formatCurrency(cottageUsd)}
Heirloom Seeds & Hand Tools: ${formatCurrency(seedsToolingUsd)}
========================================
TOTAL CAPITAL REQUIRED: $${totalBudgetUsd.toLocaleString()} USD (K${totalBudgetMwk.toLocaleString()} MWK)`;
  };

  return (
    <CalculatorShell
      title="Outpost setup capital budget & BoQ"
      category="Financial stewardship"
      description="Calculate comprehensive capital expenditures and bills of quantities for acquiring rural land, drilling water security, and building an off-grid sanctuary."
      mainAnswer={{
        label: `Estimated total establishment capital (${currency})`,
        value: currency === 'USD' ? `$${totalBudgetUsd.toLocaleString()}` : `K${totalBudgetMwk.toLocaleString()}`,
        unit: currency === 'USD' ? 'USD' : 'MWK',
        subtext:
          currency === 'USD'
            ? `Equivalent to K${totalBudgetMwk.toLocaleString()} MWK (Exchange rate: 1 USD = 1,750 MWK).`
            : `Equivalent to $${totalBudgetUsd.toLocaleString()} USD.`
      }}
      unitSystem="metric"
      onUnitSystemChange={() => {}}
      onReset={handleReset}
      onSaveToVault={() =>
        onSaveToVault?.({
          acres,
          totalBudgetUsd,
          totalBudgetMwk,
          landCostUsd,
          waterSetupUsd,
          solarSystemUsd,
          fencingUsd,
          cottageUsd,
          seedsToolingUsd
        })
      }
      copySummaryText={copySummaryText}
      formulaDescription="Total Budget = Land Cost + Water Setup + Solar System + Fencing + Cottage + Seeds & Tools."
      assumptions={[
        'Land price of $1,000/acre reflects average customary or freehold rural parcels in Central/Northern Malawi.',
        'Borehole cost assumes 40–50 meter depth with casing, gravel packing, and submersible brushless solar pump.',
        'Compressed earth block cottage utilizes on-site clay subsoil with 6% cement stabilization.'
      ]}
      inputs={
        <>
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
            <span className="text-[13px] font-sans font-medium text-[var(--ink)]">
              Display currency:
            </span>
            <div className="flex items-center p-0.5 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)] text-[12px] font-sans font-medium">
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 rounded-[calc(var(--radius-control)-2px)] transition-all cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-[var(--surface)] text-[var(--ink)] font-semibold shadow-2xs'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                }`}
              >
                USD ($)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('MWK')}
                className={`px-3 py-1 rounded-[calc(var(--radius-control)-2px)] transition-all cursor-pointer ${
                  currency === 'MWK'
                    ? 'bg-[var(--surface)] text-[var(--ink)] font-semibold shadow-2xs'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                }`}
              >
                MWK (K)
              </button>
            </div>
          </div>

          <Field
            label="Land acreage to acquire"
            helperText={`Calculated at $${pricePerAcreUsd.toLocaleString()} / acre customary rural land guideline.`}
          >
            <Slider
              value={acres}
              min={0.5}
              max={20}
              step={0.5}
              unit=" ac"
              onChangeValue={handleAcresChange}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Field label="Borehole drilling & pump (USD)">
              <Input
                type="number"
                isMonospace
                value={waterSetupUsd}
                onChange={(e) => setWaterSetupUsd(Number(e.target.value))}
              />
            </Field>

            <Field label="Off-grid solar & battery (USD)">
              <Input
                type="number"
                isMonospace
                value={solarSystemUsd}
                onChange={(e) => setSolarSystemUsd(Number(e.target.value))}
              />
            </Field>

            <Field label="Perimeter fencing & live hedge (USD)">
              <Input
                type="number"
                isMonospace
                value={fencingUsd}
                onChange={(e) => setFencingUsd(Number(e.target.value))}
              />
            </Field>

            <Field label="Compressed earth block cottage (USD)">
              <Input
                type="number"
                isMonospace
                value={cottageUsd}
                onChange={(e) => setCottageUsd(Number(e.target.value))}
              />
            </Field>

            <Field label="Heirloom seeds & hand tools (USD)">
              <Input
                type="number"
                isMonospace
                value={seedsToolingUsd}
                onChange={(e) => setSeedsToolingUsd(Number(e.target.value))}
              />
            </Field>
          </div>
        </>
      }
      results={
        <div className="flex flex-col gap-3 text-[13px]">
          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <span className="text-[var(--ink-muted)]">Land title ({acres} acres)</span>
            <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
              {formatCurrency(landCostUsd)}
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <span className="text-[var(--ink-muted)]">Water borehole & solar pump</span>
            <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
              {formatCurrency(waterSetupUsd)}
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <span className="text-[var(--ink-muted)]">Solar PV & LiFePO4 batteries</span>
            <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
              {formatCurrency(solarSystemUsd)}
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <span className="text-[var(--ink-muted)]">Perimeter fencing & hedgerows</span>
            <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
              {formatCurrency(fencingUsd)}
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <span className="text-[var(--ink-muted)]">Earth block dwelling</span>
            <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
              {formatCurrency(cottageUsd)}
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
            <span className="text-[var(--ink-muted)]">Heirloom seeds & tools</span>
            <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
              {formatCurrency(seedsToolingUsd)}
            </span>
          </div>

          <div className="pt-2">
            <HomesteadBoQEstimator currency={currency} exchangeRate={exchangeRate} />
          </div>
        </div>
      }
    />
  );
}
