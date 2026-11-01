import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Sun,
  CheckCircle2,
  Clock,
  Scale,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface KitchenRecipe {
  id: string;
  category: 'Unfermented Breads' | 'Nut & Seed Emulsions' | 'Sabbath Friday Prep';
  title: string;
  chichewaSubtitle: string;
  prepTime: string;
  egwCitation: string;
  ingredients: string[];
  steps: string[];
  digestiveScienceNote: string;
}

const EDENIC_RECIPES: KitchenRecipe[] = [
  {
    id: 'zwischenbrot-wafer-rolls',
    category: 'Unfermented Breads',
    title: 'Unfermented Whole-Grain Wafer Rolls (Zwischenbrot)',
    chichewaSubtitle: 'Mkate Wopanda Chofufumitsa wa Tirigu ndi Mapira',
    prepTime: '35 min (12 min mixing · 22 min baking)',
    egwCitation: '“Bread should be light and sweet. Not the least taint of sourness should be tolerated. The loaves should be small, and so thoroughly baked that, so far as possible, the yeast germs shall be destroyed... Unleavened bread, or gems, baked in a well-heated oven, are wholesome and digestible.” — Counsels on Diet and Foods, p. 316–317',
    ingredients: [
      '2 cups freshly milled whole wheat or finger millet (mawere) flour',
      '1 cup rolled oats ground fine',
      '3 tablespoons finely ground roasted groundnuts or sesame seeds',
      '1/2 teaspoon natural sea salt',
      '3/4 cup ice-cold spring water (aerates the batter when beaten briskly)',
    ],
    steps: [
      'Whisk the whole-grain flour, ground oats, groundnut meal, and salt together in a cool mixing bowl so air is trapped between the dry particles.',
      'Pour in cold water gradually while beating briskly with a wooden spoon to incorporate air (air + steam is the natural leavening agent instead of baking soda or yeast).',
      'Knead for 3 minutes until elastic, roll into finger-thick cylinders or thin crackers, prick with a fork, and place on a preheated cast-iron pan or clay oven tray.',
      'Bake in a brisk oven (200°C / 400°F) for 20–25 minutes until crisp, golden-brown all the way through, and completely dry inside.',
    ],
    digestiveScienceNote: 'Crisp unfermented rolls require thorough chewing, which mixes the starch with salivary ptyalin (amylase) in the mouth and avoids introducing live fermentative yeast or alkaline baking soda (which neutralizes stomach hydrochloric acid).',
  },
  {
    id: 'malawi-sorghum-sweet-potato-flatbread',
    category: 'Unfermented Breads',
    title: 'Malawi Sorghum & Orange Sweet Potato Unleavened Rounds',
    chichewaSubtitle: 'Chikondamoyo Chopanda Soda cha Mapira ndi Mbatata',
    prepTime: '30 min',
    egwCitation: '“The use of soda or baking powder in breadmaking is harmful and unnecessary. Soda causes inflammation of the stomach and often poisons the entire system.” — The Ministry of Healing, p. 300',
    ingredients: [
      '1.5 cups stone-ground red or white sorghum (mapira) flour',
      '1 cup steamed and smoothly mashed orange-fleshed sweet potato (mbatata)',
      '1/4 cup ground sesame or sunflower seed butter',
      '1/2 teaspoon ground coriander seed',
      '1/4 cup warm spring water',
    ],
    steps: [
      'Combine warm mashed sweet potato with seed butter until a smooth emulsion forms.',
      'Fold in sorghum flour and coriander, adding water as needed to form a pliable, non-sticky dough.',
      'Press out into 5mm flat rounds on a baking sheet lined with banana leaf or parchment.',
      'Bake at 190°C (375°F) for 18–20 minutes until edges are firm and fragrant.',
    ],
    digestiveScienceNote: 'Beta-carotene from orange sweet potatoes combined with complex unrefined starch from sorghum provides slow-burning glycogen without blood sugar spikes or fungal yeast fermentation in the intestines.',
  },
  {
    id: 'groundnut-macadamia-emulsion',
    category: 'Nut & Seed Emulsions',
    title: 'Rich Groundnut & Macadamia Cream (Dairy-Free Butter Replacement)',
    chichewaSubtitle: 'Kirimu Wachilengedwe wa Mtedza ndi Macadamia',
    prepTime: '15 min',
    egwCitation: '“Grains, fruits, nuts, and vegetables constitute the diet chosen for us by our Creator... In a short time milk and butter will be unsafe. God will give His people ability and tact to prepare wholesome food without these things.” — Counsels on Diet and Foods, p. 81, 268',
    ingredients: [
      '1 cup raw or lightly sun-dried local groundnuts (shelled)',
      '1/2 cup raw Thyolo / Ntchisi macadamia nuts',
      '1.5 cups warm pure spring water',
      '1 pinch sea salt',
      '1 teaspoon pure mountain honey (optional)',
    ],
    steps: [
      'Soak groundnuts and macadamias in spring water for 4 hours to deactivate enzyme inhibitors and soften phytates.',
      'Rinse thoroughly and blend on high with 1.5 cups fresh warm water until completely silky and white (no graininess).',
      'Strain through a fine cotton cloth if milk consistency is desired, or leave unstrained as a thick table cream for porridge and wafer rolls.',
      'Store in a cool Zeer pot earthenware cooler; use within 36 hours.',
    ],
    digestiveScienceNote: 'Cold-pressed nut lipids provide bioavailable oleic and linoleic essential fatty acids without animal cholesterol, oxidized butter lipids, or bovine zoonotic pathogens.',
  },
  {
    id: 'sabbath-friday-preparation-stew',
    category: 'Sabbath Friday Prep',
    title: 'Friday Preparation Day Legume & Root Vegetable Hotpot',
    chichewaSubtitle: 'Chakudya cha Tsiku Lokonzekera Sabata (Nandolo & Mbatata)',
    prepTime: '55 min (completely finished before sunset on Friday)',
    egwCitation: '“On Friday let the preparation for the Sabbath be completed. See that all the clothing is in readiness and that all the cooking is done. Let the boots be blacked and the meals be prepared. On the Sabbath there should not be even a fire kindled in the dwelling.” — Testimonies for the Church, Vol. 6, p. 355',
    ingredients: [
      '2 cups dried pigeon peas (nandolo) or cowpeas (khobwe), soaked Thursday night',
      '2 large sweet potatoes and 1 cup diced pumpkin (maungu)',
      '1 bunch finely chopped pumpkin leaves (nkhwani)',
      '3 tablespoons crushed groundnut powder (sinjiro)',
      '1 teaspoon minced ginger and mild natural sea salt',
    ],
    steps: [
      'Simmer soaked pigeon peas on Friday morning until tender (approx. 40 minutes).',
      'Add sweet potatoes, pumpkin, and ginger; cook until roots are soft and stew is thick.',
      'Stir in nkhwani greens and crushed groundnut powder (sinjiro) 3 minutes before removing from heat so greens remain vibrant green.',
      'Allow to cool and store in a covered earthenware vessel. On Sabbath, serve at ambient temperature or warm gently without turning Sabbath into a day of heavy culinary labor.',
    ],
    digestiveScienceNote: 'Digestive tract rests on the Sabbath when meals are light, unhurried, and prepared in advance, freeing nervous energy for spiritual contemplation and outdoor fellowship.',
  },
];

const SOLAR_DEHYDRATION_TABLE = [
  {
    crop: 'Mango (Zitonda / Amango)',
    prep: 'Sliced 4mm thick, dipped in lemon spring water',
    tempRange: '50–55°C',
    hours: '12–16 hrs',
    storageLife: '9–12 months in airtight glass or clay jars',
  },
  {
    crop: 'Tomato (Mapwetekere)',
    prep: 'Halved, cored, sprinkled lightly with sea salt',
    tempRange: '55–60°C',
    hours: '14–18 hrs',
    storageLife: '8–10 months; rehydrates in warm water',
  },
  {
    crop: 'Pumpkin Leaves (Nkhwani / Mfutso)',
    prep: 'Lightly steamed for 90 sec, spread thin on reed mats',
    tempRange: '45–50°C',
    hours: '6–8 hrs',
    storageLife: '12 months; essential dry-season mineral reserve',
  },
  {
    crop: 'Bananas (Nthochi)',
    prep: 'Cut lengthwise in half, dipped in citrus water',
    tempRange: '50–55°C',
    hours: '16–20 hrs',
    storageLife: '6–8 months; high potassium energy chew',
  },
];

export function EdenicCountryKitchen() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredRecipes =
    selectedCategory === 'All'
      ? EDENIC_RECIPES
      : EDENIC_RECIPES.filter((r) => r.category === selectedCategory);

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-[var(--radius-card)] bg-[var(--surface)] text-[var(--ink)] border border-[var(--border)] flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xs">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-sans font-semibold text-[var(--accent)]">
            <UtensilsCrossed size={14} />
            <span>Counsels on diet and foods · The edenic country kitchen</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
            Unfermented Whole-Grain Breads, Nut Emulsions &amp; Solar Harvest Preservation
          </h2>
          <p className="text-xs sm:text-sm text-[var(--ink-muted)] mt-1.5 leading-relaxed">
            “It is a religious duty for those who cook to learn how to prepare healthful food in different ways, so that it may be eaten with enjoyment.” — <em>Counsels on Diet and Foods, p. 251</em>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-[var(--ground)] p-1.5 rounded-[var(--radius-control)] border border-[var(--border)] shrink-0">
          {(['All', 'Unfermented Breads', 'Nut & Seed Emulsions', 'Sabbath Friday Prep'] as const).map(
            (cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'px-3 py-1.5 rounded-[var(--radius-control)] text-xs font-sans font-semibold transition-all cursor-pointer',
                  selectedCategory === cat
                    ? 'bg-[var(--accent)] text-white font-bold shadow-xs'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                )}
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Recipe Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="p-5 sm:p-6 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col justify-between gap-4"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-sans font-semibold text-[var(--accent)]">
                    {recipe.category} · {recipe.chichewaSubtitle}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--ink)] mt-0.5">
                    {recipe.title}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] text-xs font-mono text-[var(--ink-muted)] shrink-0 flex items-center gap-1">
                  <Clock size={12} className="text-[var(--gold)]" />
                  {recipe.prepTime}
                </span>
              </div>

              <div className="p-3.5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] text-xs italic text-[var(--ink-muted)]">
                {recipe.egwCitation}
              </div>

              <div>
                <h4 className="text-xs font-sans font-semibold text-[var(--ink)] mb-1.5">
                  Malawi homestead ingredients
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[var(--ink-muted)]">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 size={13} className="text-[var(--success)] shrink-0 mt-0.5" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-sans font-semibold text-[var(--ink)] mb-1.5">
                  Preparation steps
                </h4>
                <ol className="space-y-1.5 text-xs text-[var(--ink)]">
                  {recipe.steps.map((st, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-mono font-bold text-[var(--accent)]">
                        {idx + 1}.
                      </span>
                      <span>{st}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border)] text-xs text-[var(--ink-muted)]">
              <strong className="text-[var(--accent)]">Physiological note:</strong>{' '}
              {recipe.digestiveScienceNote}
            </div>
          </div>
        ))}
      </div>

      {/* Fruit vs. Vegetable Meal Partition & Solar Dehydration Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5 p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-sans font-semibold text-[var(--success)]">
            <Scale size={14} />
            <span>Digestive harmony · Counsels on Diet and Foods, p. 112</span>
          </div>
          <h3 className="font-serif text-lg font-bold text-[var(--ink)]">
            Why Fruits &amp; Vegetables Belong at Separate Meals
          </h3>
          <p className="text-xs italic text-[var(--ink-muted)] bg-[var(--ground)] p-3 rounded-[var(--radius-control)] border border-[var(--border)]">
            “Fruit and vegetables taken at one meal produce acidity of the stomach; then impurity of the blood results, and the mind is not clear because the digestion is imperfect. Do not have too great a variety at a meal; three or four dishes are a plenty.” — <em>CD 112</em>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-sans">
            <div className="p-3 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)]">
              <strong className="font-sans font-semibold text-[var(--accent)] block mb-1">
                Morning meal (7:00 AM)
              </strong>
              <p className="text-[var(--ink-muted)]">
                Whole-grain millet/oats porridge + Unfermented wafer rolls + Fresh pawpaw, mango, or bananas + Groundnut/macadamia cream.
              </p>
            </div>
            <div className="p-3 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)]">
              <strong className="font-sans font-semibold text-[var(--success)] block mb-1">
                Midday meal (1:00 PM)
              </strong>
              <p className="text-[var(--ink-muted)]">
                Whole-grain mgaiwa or brown rice + Pigeon peas (nandolo) or beans + Steamed pumpkin leaves (nkhwani) &amp; squash.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-sans font-semibold text-[var(--gold)]">
            <Sun size={14} />
            <span>Solar cabinet dehydrator schedule · Chilimwe reserve</span>
          </div>
          <h3 className="font-serif text-lg font-bold text-[var(--ink)]">
            Preserving Malawi’s Harvest Without Electricity or Canning Sugar
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] text-[var(--ink-muted)] font-sans font-medium">
                  <th className="py-2 pr-3">Crop</th>
                  <th className="py-2 px-3">Pre-treatment</th>
                  <th className="py-2 px-3">Temp / time</th>
                  <th className="py-2 pl-3">Shelf life</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] text-[var(--ink)]">
                {SOLAR_DEHYDRATION_TABLE.map((row) => (
                  <tr key={row.crop}>
                    <td className="py-2.5 pr-3 font-bold text-[var(--ink)]">{row.crop}</td>
                    <td className="py-2.5 px-3 text-[var(--ink-muted)]">{row.prep}</td>
                    <td className="py-2.5 px-3 font-mono whitespace-nowrap text-[var(--accent)]">
                      {row.tempRange} · {row.hours}
                    </td>
                    <td className="py-2.5 pl-3 font-mono text-[var(--ink-muted)]">{row.storageLife}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
