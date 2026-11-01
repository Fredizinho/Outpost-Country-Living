import React, { useState, useMemo } from 'react';
import { Calculator, Printer, RefreshCw, CheckCircle2 } from 'lucide-react';
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
    chichewaTerm: 'Mabatire a Lithium (LiFePO4 48V)',
    unit: 'Battery Module',
    qty: 2,
    unitCostUsd: 890,
    notes: '10.24 kWh total storage rated for 6,000+ cycles (15-year off-grid longevity)',
  },
  {
    id: 'boq-7',
    category: 'Solar & Power',
    item: '48V 5kW Pure Sine Wave Hybrid Solar Inverter + MPPT',
    chichewaTerm: 'Inverter ya Magetsi (5kW 48V)',
    unit: 'Unit',
    qty: 1,
    unitCostUsd: 680,
    notes: 'Built-in 80A MPPT charge controller + 230V AC output for solar borehole pump',
  },
  {
    id: 'boq-8',
    category: 'Shelter & Storage',
    item: 'Hydraform Stabilized Interlocking Soil-Cement Blocks (Compressed Earth)',
    chichewaTerm: 'Njerwa Zapadera Za Dothi Losakazinga',
    unit: 'Blocks (1,000 pcs)',
    qty: 4,
    unitCostUsd: 220,
    notes: 'Zero-firewood ecological construction block (90% red subsoil + 10% cement)',
  },
  {
    id: 'boq-9',
    category: 'Shelter & Storage',
    item: '0.4mm Corrugated Galvanized Iron (CGI) Roofing Sheets + Timber Trusses',
    chichewaTerm: 'Mataulo a Malata ndi Matabwa a Phiri',
    unit: 'Sheets (20 pcs bundle)',
    qty: 3,
    unitCostUsd: 240,
    notes: 'Treated pine trusses + rain-catchment pitch configured for clean drinking runoff',
  },
  {
    id: 'boq-10',
    category: 'Seeds & Soil',
    item: 'Open-Pollinated Heritage Seed Vault (14 Sub-Saharan Crops)',
    chichewaTerm: 'Mbewu Zachilengedwe (OPV)',
    unit: 'Seed Vault Pack',
    qty: 1,
    unitCostUsd: 110,
    notes: 'Bambara groundnuts, cowpeas, sweet potatoes, pigeon peas, butternut, amaranth',
  },
  {
    id: 'boq-11',
    category: 'Seeds & Soil',
    item: 'Soil Inoculant (Rhizobium Legume Mycorrhizae) & Vetiver Grass Stock',
    chichewaTerm: 'Chonde ndi Udzu wa Vetiver',
    unit: 'Kit',
    qty: 2,
    unitCostUsd: 45,
    notes: 'Biological nitrogen-fixing bacteria for Katondo red loam + 500 vetiver slips',
  },
];

export function HomesteadBoQEstimator() {
  const [items, setItems] = useState<BoQLineItem[]>(DEFAULT_BOQ_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currency] = useState<'USD' | 'MWK'>('USD');
  const exchangeRate = 1750; // Indicative Malawi Kwacha rate

  const categories = useMemo(() => {
    return ['All', 'Land & Legal', 'Water & Irrigation', 'Solar & Power', 'Shelter & Storage', 'Seeds & Soil'];
  }, []);

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
    <section className="lg:col-span-12 bg-[var(--surface)] rounded-[var(--radius-sheet)] p-6 sm:p-8 md:p-10 border border-[var(--border)] text-[var(--ink)] shadow-sm flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans text-[var(--accent)] font-semibold">
            <Calculator size={14} />
            <span>Itemized field bill of quantities (BoQ) · Malawi market benchmark</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--ink)] mt-1">
            Homestead Materials &amp; Hardware Schedule (<em>Ndondomeko ya Zipangizo</em>)
          </h3>
          <p className="text-xs sm:text-sm text-[var(--ink-muted)] max-w-3xl mt-1">
            Adjust item quantities below to generate a real-time Bill of Quantities in{' '}
            <strong>{currency === 'USD' ? 'US Dollars ($)' : 'Malawian Kwacha (MWK)'}</strong> for hardware stores in Lilongwe, Blantyre, or Mzuzu.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 rounded-[var(--radius-control)] bg-[var(--ground)] hover:bg-[var(--ground)]/80 border border-[var(--border)] text-xs font-sans font-semibold text-[var(--ink)] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw size={13} />
            <span>Reset quantities</span>
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 rounded-[var(--radius-control)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-sans font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer size={14} />
            <span>Print BoQ sheet</span>
          </button>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 bg-[var(--ground)] p-1.5 rounded-[var(--radius-control)] border border-[var(--border)]">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-3 py-1.5 rounded-[var(--radius-control)] text-xs font-sans font-semibold transition-all cursor-pointer',
                selectedCategory === cat
                  ? 'bg-[var(--accent)] text-white shadow-xs'
                  : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs font-sans bg-[var(--success)]/10 border border-[var(--success)]/30 px-4 py-2 rounded-[var(--radius-control)]">
          <span className="text-[var(--success)] font-medium">BoQ Schedule Total:</span>
          <span className="text-base font-mono font-bold text-[var(--accent)]">
            {currency === 'USD' ? `$${totalUsd.toLocaleString()}` : `K${totalMwk.toLocaleString()}`}
          </span>
        </div>
      </div>

      {/* Responsive BoQ Table / Cards */}
      <div className="overflow-x-auto rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)] text-caption font-sans font-medium text-[var(--ink-muted)] bg-[var(--ground)]">
              <th className="py-3.5 px-4">Item &amp; Chichewa field term</th>
              <th className="py-3.5 px-3">Category</th>
              <th className="py-3.5 px-3">Unit</th>
              <th className="py-3.5 px-3 w-28">Qty</th>
              <th className="py-3.5 px-3 text-right">Unit rate</th>
              <th className="py-3.5 px-4 text-right">Line subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)] text-xs font-sans">
            {filteredItems.map((row) => {
              const lineTotalUsd = row.qty * row.unitCostUsd;
              return (
                <tr key={row.id} className="hover:bg-[var(--ground)]/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[var(--ink)]">{row.item}</div>
                    <div className="text-caption text-[var(--accent)] mt-0.5">
                      {row.chichewaTerm} · <span className="text-[var(--ink-muted)] font-sans">{row.notes}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-caption text-[var(--ink-muted)] whitespace-nowrap">
                    {row.category}
                  </td>
                  <td className="py-3.5 px-3 text-[var(--ink-muted)] whitespace-nowrap">
                    {row.unit}
                  </td>
                  <td className="py-3.5 px-3">
                    <input
                      type="number"
                      min={0}
                      max={500}
                      value={row.qty}
                      onChange={(e) => handleQtyChange(row.id, Number(e.target.value))}
                      className="w-20 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] px-2.5 py-1.5 text-xs font-mono font-bold text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    />
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-[var(--ink-muted)] whitespace-nowrap">
                    {formatMoney(row.unitCostUsd)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-[var(--accent)] whitespace-nowrap">
                    {formatMoney(lineTotalUsd)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[var(--ink-muted)] bg-[var(--ground)] p-4 rounded-[var(--radius-card)] border border-[var(--border)]">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={15} className="text-[var(--success)] shrink-0" />
          <span>
            <strong>Stewardship procurement tip:</strong> Purchase HDPE pipe, solar panels, and LiFePO4 batteries from authorized distributors in Lilongwe (Area 4 / Kanengo) or Blantyre (Limbe) before transporting to rural districts.
          </span>
        </div>
        <span className="font-mono text-caption text-[var(--ink-muted)] shrink-0">
          Rate: 1 USD = K{exchangeRate.toLocaleString()} MWK
        </span>
      </div>
    </section>
  );
}
