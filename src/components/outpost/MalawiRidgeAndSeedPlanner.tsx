import React, { useState } from 'react';
import { Sprout, MapPin, CheckCircle2, Layers, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompanionGuild {
  id: string;
  title: string;
  chichewaTitle: string;
  bestZones: string;
  ridgeSpacingCm: number;
  centerCrop: { name: string; chichewa: string; spacing: string; role: string; color: string };
  interCrop: { name: string; chichewa: string; spacing: string; role: string; color: string };
  groundCover: { name: string; chichewa: string; spacing: string; role: string; color: string };
  borderBarrier: { name: string; chichewa: string; spacing: string; role: string; color: string };
  agronomyBenefit: string;
}

const MALAWI_COMPANION_GUILDS: CompanionGuild[] = [
  {
    id: 'three-sisters-mw',
    title: 'Malawi Highland & Mid-Elevation Staple Guild',
    chichewaTitle: 'Chimanga + Nandolo + Nkhwani (Gule wa Mbewu)',
    bestZones: 'Dedza, Ntcheu, Mzimba, Lilongwe, Zomba, Thyolo (800m–1,600m)',
    ridgeSpacingCm: 75,
    centerCrop: {
      name: 'Heirloom Flint Maize',
      chichewa: 'Chimanga cha Makolo',
      spacing: 'Every 25 cm (1 seed per Sasakawa station)',
      role: 'Tall vertical stalk structure & grain staple',
      color: '#F59E0B'
    },
    interCrop: {
      name: 'Pigeon Pea (Deep Taproot)',
      chichewa: 'Nandolo',
      spacing: 'Every 90 cm between maize stations',
      role: 'Breaks clay hardpan to 2m deep & fixes 60 kg N/ha after maize harvest',
      color: '#10B981'
    },
    groundCover: {
      name: 'Pumpkin / Squash Leaves',
      chichewa: 'Nkhwani / Maungu',
      spacing: 'Every 2 meters along furrow base',
      role: 'Broad leaves shade out witchweed (Kaufiti) & lock in soil moisture',
      color: '#16A34A'
    },
    borderBarrier: {
      name: 'Vetiver Grass & Lemon Grass',
      chichewa: 'Chisale &mp; Udzu waimu',
      spacing: 'Along A-frame contour marker ridge (Mitumbira ya mizere)',
      role: 'Stops storm sheet erosion & repels stemborer moths',
      color: '#0D9488'
    },
    agronomyBenefit:
      'Doubles total protein and calorie output per acre while naturally suppressing Striga witchweed (Kaufiti) and rebuilding topsoil nitrogen without synthetic chemical fertilizer.'
  },
  {
    id: 'drought-resilient-guild',
    title: 'Lakeshore & Rift Valley Heat-Resilient Guild',
    chichewaTitle: 'Chinangwa + Mapemba + Khobwe',
    bestZones: 'Salima, Mangochi, Balaka, Chikwawa, Karonga, Nkhata Bay (50m–650m)',
    ridgeSpacingCm: 90,
    centerCrop: {
      name: 'Sweet Cassava Cuttings',
      chichewa: 'Chinangwa (Manyokola)',
      spacing: 'Every 90 cm on crest of raised ridge',
      role: 'Drought-proof calorie bank that survives 40°C dry spells',
      color: '#D97706'
    },
    interCrop: {
      name: 'Sorghum / Pearl Millet',
      chichewa: 'Mapemba / Mchewere',
      spacing: 'Alternating rows at 45 cm spacing',
      role: 'Quick 100-day grain harvest before dry winds peak',
      color: '#FBBF24'
    },
    groundCover: {
      name: 'Drought-Hardy Cowpeas',
      chichewa: 'Khobwe / Nseula',
      spacing: 'Every 20 cm along ridge shoulders',
      role: 'Rapid 65-day edible leaf relish (Masamba) + nitrogen fixation',
      color: '#22C55E'
    },
    borderBarrier: {
      name: 'Sisal & Tephrosia Boundary',
      chichewa: 'Khonje &amp; Ombwe (Tephrosia)',
      spacing: 'Perimeter living fence every 100 cm',
      role: 'Livestock-proof barrier & natural botanical pest spray leaves',
      color: '#059669'
    },
    agronomyBenefit:
      'Provides guaranteed food security even during El Niño mid-season dry spells when shallow-rooted hybrid maize fails.'
  },
  {
    id: 'orchard-alley-guild',
    title: 'Perennial Fruit Orchard Alley-Cropping Guild',
    chichewaTitle: 'Mapeyala + Nthochi + Nzama',
    bestZones: 'Misuku, Viphya, Mulanje, Zomba, Ntchisi, Thyolo',
    ridgeSpacingCm: 75,
    centerCrop: {
      name: 'Grafted Avocado & Mango Trees',
      chichewa: 'Mapeyala &amp; Manga (3×3×3 ft Pits)',
      spacing: '6 meters × 6 meters grid',
      role: 'Long-term canopy shade & high-value homestead oil/fruit harvest',
      color: '#15803D'
    },
    interCrop: {
      name: 'Banana & Plantain Circle',
      chichewa: 'Nthochi &amp;Matoki',
      spacing: '3 meters around greywater/mulch trench',
      role: 'Windbreak for young grafted trees & year-round potassium source',
      color: '#84CC16'
    },
    groundCover: {
      name: 'Bambara Groundnuts & Sweet Potato',
      chichewa: 'Nzama &amp; Mbatata',
      spacing: 'Alley ridges (30 cm spacing) between young fruit trees',
      role: 'Living weed-suppressing carpet + underground tubers during years 1–4',
      color: '#F97316'
    },
    borderBarrier: {
      name: 'Moringa & Mulberry Hedgerow',
      chichewa: 'Chamwamba (Moringa) &amp; Mapuleni',
      spacing: 'Every 1.5 meters on windward boundary',
      role: 'Nutrient-dense leaf powder & high-calcium chop-and-drop mulch',
      color: '#10B981'
    },
    agronomyBenefit:
      'Turns the 4-year waiting period before fruit trees bear into productive seasonal harvests of sweet potatoes (Mbatata), Bambara nuts (Nzama), and bananas.'
  }
];

export const MALAWI_SEED_AND_NURSERY_DIRECTORY = [
  {
    name: 'Chitedze Agricultural Research Station (DARS)',
    location: 'Lilongwe West (Mchinji Road, Central Region)',
    specialty: 'Open-pollinated maize (OPV), groundnuts (Chalimbana / CG7), cowpeas (Sudan 1), pigeon peas, and national gene bank heirloom seeds.',
    accessTip: 'Visit before October to inquire about Breeder/Basic OPV seed multipliers and legume starter packs.'
  },
  {
    name: 'Bvumbwe Agricultural Research Station',
    location: 'Thyolo / Limbe Highway (Southern Highlands)',
    specialty: 'Certified disease-free grafted fruit tree seedlings (Hass Avocado, Kent/Keitt Mango, Citrus, Macadamia, Peach, Apple) & potato seed.',
    accessTip: 'Book grafted fruit tree saplings in May–July for transplanting at the onset of the November rains.'
  },
  {
    name: 'Lunyangwa Agricultural Research Station',
    location: 'Mzuzu / Ekwendeni Corridor (Northern Region)',
    specialty: 'Highland cassava cuttings (Manyokola), sweet potato vines (Zondeni orange-fleshed), temperate fruit trees, and pasture legumes.',
    accessTip: 'Ideal northern hub for clean cassava bundles free of Cassava Mosaic Virus.'
  },
  {
    name: 'ICRAF / World Agroforestry & FRIM Seed Centre',
    location: 'Zomba (Forestry Research Institute of Malawi) & Chitedze',
    specialty: 'Agroforestry nitrogen-fixing tree seeds (Gliricidia sepium, Faidherbia albida / Msangu, Tephrosia, Moringa, Bamboo).',
    accessTip: 'Request small-holder seed packets with scarification and nursery germination instructions.'
  }
];

export function MalawiRidgeAndSeedPlanner() {
  const [selectedGuildId, setSelectedGuildId] = useState<string>(MALAWI_COMPANION_GUILDS[0].id);
  const activeGuild = MALAWI_COMPANION_GUILDS.find((g) => g.id === selectedGuildId) || MALAWI_COMPANION_GUILDS[0];

  return (
    <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B1C12] border border-stone-200/90 dark:border-emerald-900/60 shadow-xs flex flex-col gap-8">
      {/* PART 1: INTERACTIVE 75CM RIDGE & COMPANION PLANNER */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-stone-200/80 dark:border-emerald-900/50 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-amber-300 flex items-center gap-1.5">
              <Layers size={14} /> Interactive 75cm Ridge &amp; Companion Guild Planner
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
              Malawian Intercropping &amp; Ridge Layout Visualizer
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl mt-1">
              Select your climate guild below to see exact 75 cm–90 cm ridge spacing (<em>Mitumbira</em>), companion stations, and Chichewa crop pairings.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {MALAWI_COMPANION_GUILDS.map((guild) => (
              <button
                key={guild.id}
                type="button"
                onClick={() => setSelectedGuildId(guild.id)}
                className={cn(
                  'px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border',
                  selectedGuildId === guild.id
                    ? 'bg-emerald-900 text-white border-emerald-700 shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-emerald-900/50 hover:border-emerald-600/40'
                )}
              >
                {guild.chichewaTitle.split('(')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* SVG Top-Down & Cross-Section Ridge Diagram */}
          <div className="lg:col-span-6 bg-[#091910] rounded-2xl p-4 sm:p-5 border border-emerald-900/80">
            <div className="flex items-center justify-between text-xs font-mono text-amber-300 mb-2">
              <span>{activeGuild.chichewaTitle}</span>
              <span>Ridge Spacing: {activeGuild.ridgeSpacingCm} cm</span>
            </div>
            <svg
              viewBox="0 0 540 260"
              className="w-full h-auto select-none"
              role="img"
              aria-label={`Top-down ridge spacing diagram for ${activeGuild.title}`}
            >
              <rect x="0" y="0" width="540" height="260" rx="12" fill="#14261C" />

              {/* Contour Vetiver Hedgerow at Top */}
              <rect x="20" y="16" width="500" height="26" rx="6" fill="#065F46" stroke="#10B981" strokeDasharray="4 2" />
              <text x="270" y="33" textAnchor="middle" fill="#A7F3D0" fontSize="10" fontWeight="bold" fontFamily="monospace">
                CONTOUR BARRIER: {activeGuild.borderBarrier.chichewa}
              </text>

              {/* Ridge 1 (y=62 to 122) */}
              <rect x="20" y="62" width="500" height="60" rx="16" fill="#3E2723" stroke="#78350F" strokeWidth="2" />
              {/* Maize / Center stations */}
              {[65, 145, 225, 305, 385, 465].map((cx, idx) => (
                <g key={`r1-c-${idx}`}>
                  <circle cx={cx} cy="92" r="10" fill={activeGuild.centerCrop.color} />
                  <text x={cx} y="96" textAnchor="middle" fill="#091910" fontSize="9" fontWeight="bold">
                    C
                  </text>
                </g>
              ))}
              {/* Intercrop stations (Nandolo / Legume) */}
              {[105, 265, 425].map((cx, idx) => (
                <g key={`r1-i-${idx}`}>
                  <circle cx={cx} cy="92" r="9" fill={activeGuild.interCrop.color} stroke="#ECFDF5" strokeWidth="1.5" />
                  <text x={cx} y="96" textAnchor="middle" fill="#052E16" fontSize="9" fontWeight="bold">
                    N
                  </text>
                </g>
              ))}

              {/* Mulched Furrow (Swale) */}
              <text x="270" y="146" textAnchor="middle" fill="#6EE7B7" fontSize="10" fontFamily="monospace">
                ↕ {activeGuild.ridgeSpacingCm} cm Mulched Water-Catchment Furrow (Udzu Wofunda) ↕
              </text>

              {/* Ridge 2 (y=162 to 222) */}
              <rect x="20" y="162" width="500" height="60" rx="16" fill="#3E2723" stroke="#78350F" strokeWidth="2" />
              {[65, 145, 225, 305, 385, 465].map((cx, idx) => (
                <g key={`r2-c-${idx}`}>
                  <circle cx={cx} cy="192" r="10" fill={activeGuild.centerCrop.color} />
                  <text x={cx} y="196" textAnchor="middle" fill="#091910" fontSize="9" fontWeight="bold">
                    C
                  </text>
                </g>
              ))}
              {/* Ground Cover stations */}
              {[125, 345].map((cx, idx) => (
                <g key={`r2-g-${idx}`}>
                  <rect x={cx - 12} y="180" width="24" height="24" rx="6" fill={activeGuild.groundCover.color} stroke="#FEF08A" strokeWidth="1.5" />
                  <text x={cx} y="196" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">
                    G
                  </text>
                </g>
              ))}

              {/* Legend Bar */}
              <text x="270" y="246" textAnchor="middle" fill="#E2E8F0" fontSize="10" fontFamily="monospace">
                [C] {activeGuild.centerCrop.chichewa}   •   [N] {activeGuild.interCrop.chichewa}   •   [G] {activeGuild.groundCover.chichewa}
              </text>
            </svg>
          </div>

          {/* Guild Station Cards */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            <div className="text-xs font-mono text-stone-500 dark:text-stone-400">
              Best Agro-Ecological Districts: <strong className="text-stone-800 dark:text-stone-200">{activeGuild.bestZones}</strong>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200/80 dark:border-emerald-900/50">
                <span className="text-caption font-mono font-bold text-amber-700 dark:text-amber-300 uppercase">
                  1. Primary Ridge Crop [C]
                </span>
                <h4 className="font-display text-sm font-bold text-stone-900 dark:text-white mt-0.5">
                  {activeGuild.centerCrop.name} ({activeGuild.centerCrop.chichewa})
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">{activeGuild.centerCrop.spacing}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200/80 dark:border-emerald-900/50">
                <span className="text-caption font-mono font-bold text-emerald-700 dark:text-emerald-300 uppercase">
                  2. Nitrogen / Taproot Partner [N]
                </span>
                <h4 className="font-display text-sm font-bold text-stone-900 dark:text-white mt-0.5">
                  {activeGuild.interCrop.name} ({activeGuild.interCrop.chichewa})
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">{activeGuild.interCrop.spacing}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200/80 dark:border-emerald-900/50">
                <span className="text-caption font-mono font-bold text-emerald-800 dark:text-emerald-400 uppercase">
                  3. Living Ground Carpet [G]
                </span>
                <h4 className="font-display text-sm font-bold text-stone-900 dark:text-white mt-0.5">
                  {activeGuild.groundCover.name} ({activeGuild.groundCover.chichewa})
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">{activeGuild.groundCover.spacing}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200/80 dark:border-emerald-900/50">
                <span className="text-caption font-mono font-bold text-teal-700 dark:text-teal-300 uppercase">
                  4. Contour Hedge Barrier
                </span>
                <h4 className="font-display text-sm font-bold text-stone-900 dark:text-white mt-0.5">
                  {activeGuild.borderBarrier.name}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">{activeGuild.borderBarrier.role}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 text-xs text-stone-700 dark:text-stone-200">
              <strong className="text-emerald-900 dark:text-amber-300">Why This Guild Works:</strong> {activeGuild.agronomyBenefit}
            </div>
          </div>
        </div>
      </div>

      {/* PART 2: VERIFIED MALAWI SEED & GRAFTED TREE NURSERY DIRECTORY */}
      <div className="pt-6 border-t border-stone-200/80 dark:border-emerald-900/50 flex flex-col gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-amber-300 flex items-center gap-1.5">
            <Sprout size={14} /> Verified Malawi Seed &amp; Scion Reference Directory
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-900 dark:text-white mt-0.5">
            Where to Source Non-GMO Open-Pollinated Seeds (<em>Mbewu za Makolo</em>) &amp; Grafted Trees
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MALAWI_SEED_AND_NURSERY_DIRECTORY.map((station) => (
            <div
              key={station.name}
              className="p-4 rounded-2xl bg-stone-50 dark:bg-[#08150D] border border-stone-200/90 dark:border-emerald-900/60 flex flex-col justify-between gap-2.5"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-display text-base font-bold text-stone-900 dark:text-white">
                    {station.name}
                  </h4>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-800 dark:text-amber-300 mt-0.5">
                  <MapPin size={12} />
                  <span>{station.location}</span>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-200 mt-2 leading-relaxed">
                  {station.specialty}
                </p>
              </div>
              <div className="pt-2 border-t border-stone-200/60 dark:border-emerald-900/40 text-xs text-stone-600 dark:text-stone-300 flex items-start gap-2">
                <CheckCircle2 size={13} className="text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Field Tip:</strong> {station.accessTip}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
