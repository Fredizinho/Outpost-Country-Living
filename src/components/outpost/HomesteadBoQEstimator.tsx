import React, { useState, useMemo } from 'react';
import { Calculator, Printer, RefreshCw, Layers, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BoQLineItem {
  id: string;
  category: 'Land & Legal' | 'Water & Irrigation' | 'Solar & Power' | 'Shelter & Storage' | 'Seeds & Soil';
  item: string;
  chichewaTerm: string;
  unit: string;
  qty: number;
  unitCostUsd: number;
  notes: string;
}

const DEFAULT_BOQ_ITEMS: BoQLineItem[] = [
  {
    id: 'boq-1',
    category: 'Land & Legal',
    item: 'Customary Land Committee (CLC) Demarcation & T/A Stamp Fee',
    chichewaTerm: 'Chizindikiro cha Mfumu / T/A',
    unit: 'Parcel',
    qty: 1,
    unitCostUsd: 180,
    notes: 'Includes boundary walk witness allowances and official T/A registry book entry',
  },
  {
    id: 'boq-2',
    category: 'Land & Legal',
    item: 'Sisal Boundary Beacons (Khonje) & Vetiver Contour Slips',
    chichewaTerm: 'Khonje wa Malire & Chisale',
    unit: 'Bundles (100 slips)',
    qty: 8,
    unitCostUsd: 12,
    notes: 'Living perimeter fence and contour erosion barrier along 75cm ridges',
  },
  {
    id: 'boq-3',
    category: 'Water & Irrigation',
    item: '32mm HDPE Gravity / Solar Pipe Roll (PN10 · 100m)',
    chichewaTerm: 'Mpope wa Madzi (HDPE 100m)',
    unit: '100m Roll',
    qty: 3,
    unitCostUsd: 95,
    notes: 'UV-stabilized food-grade polyethylene pipe from spring or borehole to tank',
  },
  {
    id: 'boq-4',
    category: 'Water & Irrigation',
    item: '5,000L Ferrocement / Food-Grade Polyethylene Cistern + First-Flush',
    chichewaTerm: 'Thanki ya Madzi a Mvula (5,000L)',
    unit: 'Tank Kit',
    qty: 2,
    unitCostUsd: 420,
    notes: 'Includes 20L PVC first-flush diverter pipe, brass tap, and mosquito mesh screen',
  },
  {
    id: 'boq-5',
    category: 'Solar & Power',
    item: 'Monocrystalline Solar PV Panels (450W Tier-1)',
    chichewaTerm: 'Mapanelo a Dzuwa (450W)',
    unit: 'Panel',
    qty: 6,
    unitCostUsd: 145,
    notes: '2.7 kWp array sized for Malawi 5.4–5.9 peak sun hours + cloudy Gule Wamkulu buffer',
  },
  {
    id: 'boq-6',
    category: 'Solar & Power',
    item: 'LiFePO4 Deep-Cycle Lithium Battery Module (48V 100Ah · 5.12 kWh)',
    chichewaTerm: 'Batire ya LiFePO4 (5.12 kWh)',
    unit: 'Module',
    qty: 2,
    unitCostUsd: 1150,
    notes: '6,000+ cycle life at 80% DoD with integrated BMS and 5kW hybrid MPPT inverter',
  },
  {
    id: 'boq-7',
    category: 'Shelter & Storage',
    item: 'Stabilized Soil Brick (SSB) Press & Lime Mortar Cottage Package',
    chichewaTerm: 'Njerwa za Dothi Lolimba (SSB)',
    unit: 'Core Cottage',
    qty: 1,
    unitCostUsd: 2400,
    notes: 'Includes iron roofing sheets (Malata 28-gauge), treated timber trusses, and gutters',
  },
  {
    id: 'boq-8',
    category: 'Seeds & Soil',
    item: 'OPV Heirloom Maize (Chimanga), Nzama, Khobwe & Fruit Tree Scions',
    chichewaTerm: 'Mbewu Zosinthika (OPV) & Mitengo ya Zipatso',
    unit: 'Homestead Seed Pack',
    qty: 1,
    unitCostUsd: 165,
    notes: 'Includes 20 grafted fruit trees (3x3x3ft EGW pits), Chitedze OPV maize, and legumes',
  },
  {
    id: 'boq-9',
    category: 'Seeds & Soil',
    item: 'Forged Hand Hoes (Makasu), Pickaxe, A-Frame Level & Wheelbarrow',
    chichewaTerm: 'Makasu, Pikisi & Ngolo',
    unit: 'Tool Set',
    qty: 1,
    unitCostUsd: 140,
    notes: 'Heavy-duty forged 2.5lb hoes, digging mattock for deep pits, and pruning shears',
  },
];

interface HomesteadBoQEstimatorProps {
  currency: 'USD' | 'MWK';
  exchangeRate: number;
}

export function HomesteadBoQEstimator({ currency, exchangeRate }: HomesteadBoQEstimatorProps) {
  const [items, setItems] = useState<BoQLineItem[]>(DEFAULT_BOQ_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Land & Legal', 'Water & Irrigation', 'Solar & Power', 'Shelter & Storage', 'Seeds & Soil'];

  const handleQtyChange = (id: string, nextQty: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: Math.max(0, nextQty) } : item))
    );
  };

  const handleReset = () => {
    setItems(DEFAULT_BOQ_ITEMS);
  };

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return items;
    return items.filter((i) => i.category === selectedCategory);
  }, [items, selectedCategory]);

  const totalUsd = useMemo(() => {
    return items.reduce((sum, item) => sum + item.qty * item.unitCostUsd, 0);
  }, [items]);

  const totalMwk = Math.round(totalUsd * exchangeRate);

  const formatMoney = (usdVal: number) => {
    if (currency === 'USD') {
      return `$${usdVal.toLocaleString()}`;
    }
    return `K${Math.round(usdVal * exchangeRate).toLocaleString()}`;
  };

  return (
    <section className="lg:col-span-12 bg-stone-900/95 dark:bg-[#08160E] rounded-[2.5rem] p-6 sm:p-8 md:p-10 border border-amber-500/25 text-white shadow-2xl flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-500/20 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-300 uppercase tracking-wider">
            <Calculator size={14} />
            <span>Itemized Field Bill of Quantities (BoQ) · Malawi Market Benchmark</span>
          </div>
          <h3 className="serif text-2xl sm:text-3xl font-bold text-[#FAF8F5] mt-1">
            Homestead Materials & Hardware Schedule (<em>Ndondomeko ya Zipangizo</em>)
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/80 max-w-3xl mt-1">
            Adjust item quantities below to generate a real-time Bill of Quantities in{' '}
            <strong>{currency === 'USD' ? 'US Dollars ($)' : 'Malawian Kwacha (MWK)'}</strong> for hardware stores in Lilongwe, Blantyre, or Mzuzu.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono font-bold text-emerald-200 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw size={13} />
            <span>Reset Quantities</span>
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-black uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer size={14} />
            <span>Print BoQ Sheet</span>
          </button>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer',
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-emerald-200/80 hover:text-white'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs font-mono bg-emerald-950/60 border border-emerald-700/50 px-4 py-2 rounded-2xl">
          <span className="text-emerald-300">BoQ Schedule Total:</span>
          <span className="text-base font-extrabold text-amber-300">
            {currency === 'USD' ? `$${totalUsd.toLocaleString()}` : `K${totalMwk.toLocaleString()}`}
          </span>
        </div>
      </div>

      {/* Responsive BoQ Table / Cards */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/25">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-caption font-mono uppercase tracking-wider text-amber-300/90 bg-black/40">
              <th className="py-3.5 px-4">Item & Chichewa Field Term</th>
              <th className="py-3.5 px-3">Category</th>
              <th className="py-3.5 px-3">Unit</th>
              <th className="py-3.5 px-3 w-28">Qty</th>
              <th className="py-3.5 px-3 text-right">Unit Rate</th>
              <th className="py-3.5 px-4 text-right">Line Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-xs">
            {filteredItems.map((row) => {
              const lineTotalUsd = row.qty * row.unitCostUsd;
              return (
                <tr key={row.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{row.item}</div>
                    <div className="text-caption font-mono text-amber-300/90 mt-0.5">
                      {row.chichewaTerm} · <span className="text-stone-400 font-sans">{row.notes}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-caption text-emerald-300 whitespace-nowrap">
                    {row.category}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-stone-300 whitespace-nowrap">
                    {row.unit}
                  </td>
                  <td className="py-3.5 px-3">
                    <input
                      type="number"
                      min={0}
                      max={500}
                      value={row.qty}
                      onChange={(e) => handleQtyChange(row.id, Number(e.target.value))}
                      className="w-20 rounded-xl bg-[#0E2A1B] border border-amber-500/30 px-2.5 py-1.5 text-xs font-mono font-bold text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-stone-300 whitespace-nowrap">
                    {formatMoney(row.unitCostUsd)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-extrabold text-amber-300 whitespace-nowrap">
                    {formatMoney(lineTotalUsd)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-emerald-200/80 bg-white/[0.03] p-4 rounded-2xl border border-white/10">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
          <span>
            <strong>Stewardship Procurement Tip:</strong> Purchase HDPE pipe, solar panels, and LiFePO4 batteries from authorized distributors in Lilongwe (Area 4 / Kanengo) or Blantyre (Limbe) before transporting to rural districts.
          </span>
        </div>
        <span className="font-mono text-caption text-amber-300 shrink-0">
          Rate: 1 USD = K{exchangeRate.toLocaleString()} MWK
        </span>
      </div>
    </section>
  );
}
