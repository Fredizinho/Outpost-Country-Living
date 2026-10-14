import React, { useState, useMemo } from 'react';
import {
  Sprout,
  Trees,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  Copy,
  Check,
  Compass,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface OrchardGuildPitDesignerProps {
  className?: string;
}

type SoilCategory = 'katondo-clay' | 'sandy-plateau' | 'dambo-alluvial';

interface GuildPlant {
  tier: string;
  species: string;
  chichewa: string;
  role: string;
  spacing: string;
}

const GUILD_PRESETS: Record<string, { name: string; description: string; plants: GuildPlant[] }> = {
  avocado: {
    name: 'Highland Avocado & Pigeon Pea Guild',
    description: 'Deep-rooted perennial oil and protein guild optimized for cool Malawian highland slopes (Dedza, Ntcheu, Mulanje, Viphya).',
    plants: [
      { tier: 'Canopy (Tier 1)', species: 'Grafted Hass / Fuerte Avocado', chichewa: 'Mapeyala', role: 'Caloric density, monounsaturated fats, long-term shade', spacing: '6m × 6m along contour' },
      { tier: 'Sub-Canopy (Tier 2)', species: 'Dwarf Solo Papaya / Lime', chichewa: 'Mapapaya / Ndimu', role: 'Rapid 9-month harvest, papain digestive enzymes, vitamins A/C', spacing: '2.5m from avocado trunk' },
      { tier: 'Nitrogen Shrub (Tier 3)', species: 'Perennial Pigeon Pea (Nandolo) & Moringa', chichewa: 'Nandolo & Chamwamba', role: 'Atmospheric N2 fixation, dense leaf mulch, complete plant protein', spacing: '1.2m spacing along basin rim' },
      { tier: 'Dynamic Accumulator (Tier 4)', species: 'Russian Comfrey / Lemongrass', chichewa: 'Kamsikisi / Lemongrass', role: 'Deep taproot potassium mining, pest repellent barrier', spacing: '0.6m perimeter circle' },
      { tier: 'Erosion Barrier (Tier 5)', species: 'Vetiver Grass (Chrysopogon zizanioides)', chichewa: 'Kandjeje / Vetiver', role: 'Permanent 3-meter deep subsoil root barrier, stops runoff', spacing: 'Contour swale edge (10cm spacing)' },
    ],
  },
  mango: {
    name: 'Plateau Mango & Legume Savanna Guild',
    description: 'Drought-hardy guild thriving in warm plateau districts (Lilongwe, Kasungu, Mzimba, Salima).',
    plants: [
      { tier: 'Canopy (Tier 1)', species: 'Improved Tommy Atkins / Kent Mango', chichewa: 'Maimbe a Makono', role: 'Summer fruit drought security, livestock leaf shelter', spacing: '8m × 8m grid' },
      { tier: 'Sub-Canopy (Tier 2)', species: 'Guava (Psidium guajava)', chichewa: 'Mapwera', role: 'High pectin fruit, medicinal respiratory leaves', spacing: '3m spacing' },
      { tier: 'Biomass Shrub (Tier 3)', species: 'Gliricidia sepium / Sesbania sesban', chichewa: 'Mchewere wamoyo', role: 'Chop-and-drop green manure rich in nitrogen', spacing: '1.5m intervals' },
      { tier: 'Living Mulch (Tier 4)', species: 'Orange-Fleshed Sweet Potato', chichewa: 'Mbambaira yofiira', role: 'Beta-carotene rich ground cover suppressing weeds', spacing: 'Covering inter-basin soil' },
      { tier: 'Erosion Barrier (Tier 5)', species: 'Vetiver Grass', chichewa: 'Kandjeje', role: 'Water-spreading contour hedgerow', spacing: '10cm continuous row' },
    ],
  },
};

export function OrchardGuildPitDesigner({ className = '' }: OrchardGuildPitDesignerProps) {
  const [selectedSoil, setSelectedSoil] = useState<SoilCategory>('katondo-clay');
  const [selectedGuild, setSelectedGuild] = useState<'avocado' | 'mango'>('avocado');
  const [pitCount, setPitCount] = useState<number>(24);
  const [copied, setCopied] = useState(false);

  const activeGuild = GUILD_PRESETS[selectedGuild];

  // Soil-Specific Amendments Recipe per 3x3x3ft pit
  const amendments = useMemo(() => {
    switch (selectedSoil) {
      case 'katondo-clay':
        return {
          soilName: 'Katondo Red Clay Loam (Nitisol/Ferralsol, pH 5.2–6.2)',
          biocharKg: 18,
          compostWheelbarrows: 3,
          woodAshCups: 4,
          boneMealGrams: 500,
          notes: 'Acidic, high in iron/aluminum oxides. Requires wood ash or agricultural lime to raise pH to 6.2–6.8 and unlock phosphorus.',
        };
      case 'sandy-plateau':
        return {
          soilName: 'Sandy Loam Plateau Soil (Arenosol/Luvisol, pH 5.6–6.8)',
          biocharKg: 22,
          compostWheelbarrows: 4,
          woodAshCups: 2,
          boneMealGrams: 400,
          notes: 'Low clay and low cation exchange capacity. Heavily benefit from extra biochar and manure to act as an organic nutrient sponge.',
        };
      case 'dambo-alluvial':
        return {
          soilName: 'Valley-Bottom Dambo Fringe (Fluvisol/Gleysol, pH 6.2–7.2)',
          biocharKg: 14,
          compostWheelbarrows: 2.5,
          woodAshCups: 1,
          boneMealGrams: 300,
          notes: 'High natural organic matter and moisture. Requires basalt drainage rocks at the bottom to prevent seasonal root waterlogging.',
        };
    }
  }, [selectedSoil]);

  const totalBiocharTotalKg = Math.round(amendments.biocharKg * pitCount);
  const totalCompostTons = +((amendments.compostWheelbarrows * 0.03 * pitCount)).toFixed(1);

  const handleCopyRecipe = () => {
    const text = `ELLEN G. WHITE 3×3×3FT DEEP PLANTING PIT SPECIFICATION
Guild Archetype: ${activeGuild.name}
Soil Profile: ${amendments.soilName}
Scale: ${pitCount} Pits (Total Biochar: ${totalBiocharTotalKg} kg | Compost: ~${totalCompostTons} tons)

STRATIFIED CROSS-SECTION RECIPE (PER 1M³ PIT):
• Depth 2.5–3.0 ft (Base): Coarse basalt rocks, weathered animal bones & hardwood branches for subsoil aeration and slow mineral release.
• Depth 1.5–2.5 ft (Matrix): Native subsoil blended with ${amendments.biocharKg}kg inoculated biochar, ${amendments.compostWheelbarrows} wheelbarrows aerobic compost, ${amendments.woodAshCups} cups wood ash, and ${amendments.boneMealGrams}g bone meal.
• Depth 0.5–1.5 ft (Root Zone): Fine Katondo topsoil blended with cured worm castings/compost.
• Surface (0–0.5 ft): Mounded 2 inches above ground level with a 4-inch dry grass mulch ring kept 3 inches from tree trunk.
• Companion Barrier: Vetiver grass (Kandjeje) planted along contour edge.`;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={cn('p-5 sm:p-6 rounded-2xl bg-stone-900 border border-stone-800 text-stone-100 flex flex-col gap-6 shadow-xl', className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold mb-1">
            <Sprout size={14} />
            <span>Ellen White 3×3×3ft Method &amp; Agroforestry Guilds</span>
            <span>·</span>
            <span className="text-stone-400">Living Soil Architecture</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Biochar Orchard Pit Designer &amp; Companion Stacking
          </h3>
        </div>

        <button
          type="button"
          onClick={handleCopyRecipe}
          className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-mono inline-flex items-center gap-1.5 transition-colors border border-stone-700 self-start sm:self-auto cursor-pointer"
        >
          {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          <span>{copied ? 'Copied Recipe' : 'Copy Pit Recipe'}</span>
        </button>
      </div>

      {/* Control Bar: Soil & Guild Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-stone-950/60 p-4 rounded-xl border border-stone-800/80">
        <div>
          <label className="text-stone-400 font-mono block mb-1">Soil Classification</label>
          <select
            value={selectedSoil}
            onChange={(e) => setSelectedSoil(e.target.value as SoilCategory)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-white font-medium focus:ring-1 focus:ring-emerald-400 focus:outline-none cursor-pointer"
          >
            <option value="katondo-clay">Katondo Red Clay (Highlands / Hills)</option>
            <option value="sandy-plateau">Sandy Loam Plateau (Central Plains)</option>
            <option value="dambo-alluvial">Dambo Fringe (Valley Alluvium)</option>
          </select>
        </div>

        <div>
          <label className="text-stone-400 font-mono block mb-1">Orchard Guild Archetype</label>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedGuild('avocado')}
              className={cn(
                'py-1.5 px-2 rounded font-mono text-center transition-colors cursor-pointer',
                selectedGuild === 'avocado'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              )}
            >
              Avocado Guild
            </button>
            <button
              type="button"
              onClick={() => setSelectedGuild('mango')}
              className={cn(
                'py-1.5 px-2 rounded font-mono text-center transition-colors cursor-pointer',
                selectedGuild === 'mango'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              )}
            >
              Mango Guild
            </button>
          </div>
        </div>

        <div>
          <label className="text-stone-400 font-mono block mb-1">
            Pit Quantity: <span className="text-emerald-400 font-bold">{pitCount} Pits</span>
          </label>
          <input
            type="range"
            min={8}
            max={64}
            step={4}
            value={pitCount}
            onChange={(e) => setPitCount(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer py-1"
          />
        </div>
      </div>

      {/* Cross-Section Stratification Diagram & Recipe */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left (5 Cols): Stratified Cross-Section Visualizer */}
        <div className="lg:col-span-5 bg-stone-950/80 p-4 rounded-xl border border-stone-800 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              3×3×3ft (0.91m³) Pit Cross-Section
            </span>
            <span className="text-caption font-mono text-stone-400">Scale: 1m Deep</span>
          </div>

          {/* Visual Stratified Layers */}
          <div className="flex flex-col gap-1.5">
            {/* Surface Mulch Ring */}
            <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/40 text-xs">
              <div className="flex justify-between items-center font-mono text-caption font-bold text-amber-300">
                <span>0.0 ft · Surface Mulch Ring</span>
                <span>4-inch dry grass</span>
              </div>
              <p className="text-caption text-stone-300 mt-0.5">
                Mulched with dry veld grass, kept 3 inches from tree trunk to stop fungal collar rot.
              </p>
            </div>

            {/* Root Zone Mound */}
            <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-xs">
              <div className="flex justify-between items-center font-mono text-caption font-bold text-emerald-300">
                <span>0.0 – 1.0 ft · Friable Topsoil Mound</span>
                <span>Root Zone</span>
              </div>
              <p className="text-caption text-stone-300 mt-0.5">
                Topsoil mound set 2 inches above ground level to compensate for settling.
              </p>
            </div>

            {/* Living Matrix */}
            <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-700/80 text-xs">
              <div className="flex justify-between items-center font-mono text-caption font-bold text-emerald-400">
                <span>1.0 – 2.5 ft · Biochar &amp; Humus Matrix</span>
                <span>Water Sponge</span>
              </div>
              <p className="text-caption text-stone-300 mt-0.5">
                {amendments.biocharKg}kg inoculated biochar + {amendments.compostWheelbarrows} wheelbarrows compost + {amendments.woodAshCups} cups wood ash.
              </p>
            </div>

            {/* Base Subsoil Aeration */}
            <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-xs">
              <div className="flex justify-between items-center font-mono text-caption font-bold text-stone-300">
                <span>2.5 – 3.0 ft · Drainage &amp; Bones Base</span>
                <span>Mineral Bed</span>
              </div>
              <p className="text-caption text-stone-400 mt-0.5">
                Basalt granite stones, animal bone fragments, and coarse woody chunks for subsoil aeration.
              </p>
            </div>
          </div>

          <div className="text-caption text-stone-400 font-mono pt-2 border-t border-stone-800">
            Total Amendments for {pitCount} Pits: <strong className="text-white">{totalBiocharTotalKg} kg Biochar</strong> · <strong className="text-white">~{totalCompostTons} Tons Compost</strong>
          </div>
        </div>

        {/* Right (7 Cols): 5-Tier Companion Stacking Grid */}
        <div className="lg:col-span-7 bg-stone-950/40 p-4 rounded-xl border border-stone-800 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">{activeGuild.name}</h4>
              <p className="text-xs text-stone-400">{activeGuild.description}</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            {activeGuild.plants.map((plant, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-stone-900/60 border border-stone-800 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-emerald-400 text-caption">
                    {plant.tier}
                  </span>
                  <span className="font-mono text-stone-400 text-caption">
                    {plant.spacing}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-stone-200 font-semibold">
                  <span>{plant.species}</span>
                  <span className="text-stone-400 font-normal">({plant.chichewa})</span>
                </div>
                <p className="text-stone-400 text-caption">{plant.role}</p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/30 text-xs text-emerald-300 flex items-start gap-2">
            <Info size={14} className="shrink-0 mt-0.5 text-emerald-400" />
            <span>
              <strong>Soil Note for {amendments.soilName}:</strong> {amendments.notes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
