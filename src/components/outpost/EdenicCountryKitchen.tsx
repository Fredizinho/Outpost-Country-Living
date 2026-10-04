import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Flame,
  Sun,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  Scale,
  Wheat,
  Droplets,
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
      '2 tablespoons ground flaxseed or chia soaked in 4 tablespoons warm water',
      'Pinch of salt and 1/2 teaspoon grated fresh ginger or cinnamon',
    ],
    steps: [
      'Steam the sweet potato until tender, peel, and mash until completely smooth while warm.',
      'Fold in the flaxseed gel, salt, and sorghum flour to form a soft, non-sticky dough without any baking powder or soda.',
      'Pat into 1cm-thick rounds on a dry cast-iron skillet over a rocket stove and cook slowly for 7–8 minutes per side until fragrant and toasted.',
    ],
    digestiveScienceNote: 'Orange sweet potato provides natural beta-carotene and moisture that keeps gluten-free sorghum tender without needing refined vegetable oil or chemical leaveners.',
  },
  {
    id: 'sinjiro-groundnut-emulsion',
    category: 'Nut & Seed Emulsions',
    title: 'Traditional Oil-Free Groundnut Cream (Nsinjiro Emulsion)',
    chichewaSubtitle: 'Nsinjiro za Mtedza Wosakazinga mu Mafuta',
    prepTime: '15 min',
    egwCitation: '“Nuts and nut foods are coming largely into use to take the place of flesh meats. With nuts may be combined grains, fruits, and some roots, to make foods that are healthful and nourishing. Care should be taken, however, not to use too large a proportion of nuts.” — The Ministry of Healing, p. 298',
    ingredients: [
      '1 cup raw shelled Malawi Chalimbana or CG7 groundnuts (checked carefully to discard any discolored/moldy kernels)',
      '1.5 cups warm filtered water or tomato-onion broth',
      '1 medium ripe tomato, finely grated',
      '1/4 teaspoon salt',
    ],
    steps: [
      'Inspect every groundnut kernel carefully in bright light and discard any shriveled or discolored nuts (preventing aflatoxin exposure).',
      'Lightly dry-warm the nuts in a clay or iron pan for 3–4 minutes just until the skins loosen (do not deep-roast or burn the oils), then rub off skins and pound in a clean wooden mortar (mtondo) into a fine meal.',
      'Slowly whisk warm water into the groundnut meal until it forms a milky white emulsion, then simmer gently with grated tomato for 10 minutes before folding into pumpkin leaves (nkhwani) or pigeon peas.',
    ],
    digestiveScienceNote: 'Whole groundnut emulsion retains natural phospholipids, Vitamin E, and arginine while avoiding the oxidized free radicals of bottled refined seed oils.',
  },
  {
    id: 'homestead-soy-milk-tofu',
    category: 'Nut & Seed Emulsions',
    title: 'Homestead Soybean Milk & Lemon-Coagulated Country Tofu',
    chichewaSubtitle: 'Mkaka wa Soya ndi Tchizi wa Zomera',
    prepTime: '45 min (+ overnight soaking)',
    egwCitation: '“The time will come when we may have to discard some of the articles of diet we now use, such as milk and cream and eggs; but my message is that you must not bring yourself to a time of trouble beforehand... Teach the people how to prepare healthful food without the use of milk or butter.” — Counsels on Diet and Foods, p. 206',
    ingredients: [
      '2 cups dry non-GMO Malawi soybeans (soaked 8–10 hours in cool spring water)',
      '7 cups clean water for grinding and boiling',
      '3 tablespoons fresh Malawi lemon juice (for curdling into tofu) or pinch of salt and vanilla/honey for drinking milk',
    ],
    steps: [
      'Drain the soaked soybeans, rub off the hulls in water, and grind or pound with 4 cups of water into a smooth white mash.',
      'Stir in the remaining 3 cups of water, bring to a rolling boil in a deep pot for 15 minutes (boiling thoroughly deactivates trypsin inhibitors), and strain through a clean cotton cloth.',
      'For Country Tofu: While the strained soy milk is at 80°C, gently stir in fresh lemon juice diluted in 1/2 cup warm water, cover for 10 minutes until curds separate from clear whey, and press in a cloth-lined wooden mold for 25 minutes.',
    ],
    digestiveScienceNote: 'Boiling soy milk for a full 15 minutes ensures complete digestibility of plant proteins while providing a sterile, shelf-stable replacement for dairy milk and cheese.',
  },
  {
    id: 'sabbath-friday-savory-millet-bake',
    category: 'Sabbath Friday Prep',
    title: 'Friday Preparation Savory Millet, Pigeon Pea & Squash Loaf',
    chichewaSubtitle: 'Chakudya cha Lachisanu Chokonzera Sabata (Exod. 16:23)',
    prepTime: '50 min (Baked Friday Morning)',
    egwCitation: '“On Friday let the preparation for the Sabbath be completed. See that all the clothing is in readiness and that all the cooking is done... The Sabbath is not to be given to the repairing of garments, to the cooking of food, to pleasure seeking, or to any other worldly employment.” — Testimonies for the Church, vol. 6, p. 355',
    ingredients: [
      '2 cups cooked pigeon peas (nandolo) or red kidney beans',
      '1.5 cups cooked finger millet (mawere) or brown rice',
      '1 cup grated butternut squash or pumpkin',
      '1/2 cup groundnut sinjiro meal + 1 onion sautéed in water + thyme & garlic',
    ],
    steps: [
      'Cook the pigeon peas and millet on Friday morning while the kitchen stove is hot.',
      'Combine the cooked grains, mashed pigeon peas, grated squash, onion, herbs, and groundnut meal in a lightly oiled earthenware or iron baking dish.',
      'Bake for 35 minutes until firm and golden on top. Slice cleanly on Sabbath midday and serve alongside fresh avocados or ripe fruits without lighting a cooking fire on the Sabbath.',
    ],
    digestiveScienceNote: 'Combining legumes (high lysine) with millet/rice (high methionine) forms a complete amino acid profile that remains delicious at room temperature or gently warmed in a haybox/insulated thermal basket on Sabbath.',
  },
];

const SOLAR_DEHYDRATION_TABLE = [
  {
    crop: 'Ripe Mangoes (Boloma / Kent)',
    prep: 'Peel, slice into 6mm cheeks, dip briefly in lemon water to preserve beta-carotene color',
    tempRange: '52°C–57°C',
    hours: '8–12 hrs',
    storageLife: '9–12 months in dark glass jars',
  },
  {
    crop: 'Pumpkin Leaves & Amaranth (Mfutso / Bonongwe)',
    prep: 'Steam-blanch for 3 minutes over boiling water (inactivates peroxidase enzymes), spread thin in shade/solar cabinet',
    tempRange: '48°C–52°C',
    hours: '5–7 hrs',
    storageLife: '12 months in airtight clay/glass vessels',
  },
  {
    crop: 'Plum Tomatoes (Mapuno)',
    prep: 'Halve lengthwise, remove excess seed gel, sprinkle lightly with sea salt, place skin-side down on mesh',
    tempRange: '55°C–60°C',
    hours: '10–14 hrs',
    storageLife: '12 months',
  },
  {
    crop: 'Highland Bananas & Apples',
    prep: 'Slice 5mm rounds, dip in diluted pineapple or lemon juice',
    tempRange: '52°C–56°C',
    hours: '7–10 hrs',
    storageLife: '8–12 months',
  },
];

export function EdenicCountryKitchen() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | KitchenRecipe['category']>('All');

  const filteredRecipes =
    selectedCategory === 'All'
      ? EDENIC_RECIPES
      : EDENIC_RECIPES.filter((r) => r.category === selectedCategory);

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-950 via-[#082214] to-stone-950 text-white border border-emerald-600/30 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
            <UtensilsCrossed size={14} />
            <span>COUNSELS ON DIET AND FOODS · THE EDENIC COUNTRY KITCHEN</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mt-1">
            Unfermented Whole-Grain Breads, Nut Emulsions &amp; Solar Harvest Preservation
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1.5 leading-relaxed">
            “It is a religious duty for those who cook to learn how to prepare healthful food in different ways, so that it may be eaten with enjoyment.” — <em>Counsels on Diet and Foods, p. 251</em>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-black/35 p-1.5 rounded-xl border border-white/15 shrink-0">
          {(['All', 'Unfermented Breads', 'Nut & Seed Emulsions', 'Sabbath Friday Prep'] as const).map(
            (cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                  selectedCategory === cat
                    ? 'bg-amber-400 text-stone-950 font-bold'
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
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
            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#091810] border border-stone-200/90 dark:border-emerald-900/60 shadow-xs flex flex-col justify-between gap-4"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-700 dark:text-amber-300">
                    {recipe.category} · {recipe.chichewaSubtitle}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-stone-900 dark:text-white mt-0.5">
                    {recipe.title}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-black/40 border border-stone-200 dark:border-white/10 text-xs font-mono text-stone-600 dark:text-stone-300 shrink-0 flex items-center gap-1">
                  <Clock size={12} className="text-amber-500" />
                  {recipe.prepTime}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/50 text-xs italic text-stone-700 dark:text-stone-200">
                {recipe.egwCitation}
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900 dark:text-amber-300 mb-1.5">
                  Malawi Homestead Ingredients
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-700 dark:text-stone-300">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900 dark:text-amber-300 mb-1.5">
                  Preparation Steps
                </h4>
                <ol className="space-y-1.5 text-xs text-stone-700 dark:text-stone-200">
                  {recipe.steps.map((st, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-mono font-bold text-emerald-800 dark:text-amber-300">
                        {idx + 1}.
                      </span>
                      <span>{st}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200/70 dark:border-white/10 text-xs text-stone-600 dark:text-stone-300">
              <strong className="text-emerald-800 dark:text-amber-300">Physiological Note:</strong>{' '}
              {recipe.digestiveScienceNote}
            </div>
          </div>
        ))}
      </div>

      {/* Fruit vs. Vegetable Meal Partition & Solar Dehydration Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-[#091810] border border-stone-200/90 dark:border-emerald-900/60 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-emerald-800 dark:text-amber-300">
            <Scale size={14} />
            <span>DIGESTIVE HARMONY · COUNSELS ON DIET AND FOODS, P. 112</span>
          </div>
          <h3 className="font-display text-lg font-bold text-stone-900 dark:text-white">
            Why Fruits &amp; Vegetables Belong at Separate Meals
          </h3>
          <p className="text-xs italic text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-black/30 p-3 rounded-xl border border-stone-200 dark:border-white/10">
            “Fruit and vegetables taken at one meal produce acidity of the stomach; then impurity of the blood results, and the mind is not clear because the digestion is imperfect. Do not have too great a variety at a meal; three or four dishes are a plenty.” — <em>CD 112</em>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/35 border border-amber-200 dark:border-amber-800/50">
              <strong className="font-mono uppercase text-amber-900 dark:text-amber-300 block mb-1">
                Morning Meal (7:00 AM)
              </strong>
              <p className="text-stone-700 dark:text-stone-200">
                Whole-grain millet/oats porridge + Unfermented wafer rolls + Fresh pawpaw, mango, or bananas + Groundnut/macadamia cream.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/35 border border-emerald-200 dark:border-emerald-800/50">
              <strong className="font-mono uppercase text-emerald-900 dark:text-emerald-300 block mb-1">
                Midday Meal (1:00 PM)
              </strong>
              <p className="text-stone-700 dark:text-stone-200">
                Whole-grain mgaiwa or brown rice + Pigeon peas (nandolo) or beans + Steamed pumpkin leaves (nkhwani) &amp; squash.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 p-5 rounded-2xl bg-white dark:bg-[#091810] border border-stone-200/90 dark:border-emerald-900/60 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-emerald-800 dark:text-amber-300">
            <Sun size={14} />
            <span>SOLAR CABINET DEHYDRATOR SCHEDULE · CHILIMWE RESERVE</span>
          </div>
          <h3 className="font-display text-lg font-bold text-stone-900 dark:text-white">
            Preserving Malawi’s Harvest Without Electricity or Canning Sugar
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 dark:border-emerald-900/60 text-stone-500 dark:text-stone-400 font-mono">
                  <th className="py-2 pr-3">Crop</th>
                  <th className="py-2 px-3">Pre-Treatment</th>
                  <th className="py-2 px-3">Temp / Time</th>
                  <th className="py-2 pl-3">Shelf Life</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/70 dark:divide-white/10 text-stone-700 dark:text-stone-200">
                {SOLAR_DEHYDRATION_TABLE.map((row) => (
                  <tr key={row.crop}>
                    <td className="py-2.5 pr-3 font-bold text-stone-900 dark:text-white">{row.crop}</td>
                    <td className="py-2.5 px-3">{row.prep}</td>
                    <td className="py-2.5 px-3 font-mono whitespace-nowrap text-emerald-800 dark:text-amber-300">
                      {row.tempRange} · {row.hours}
                    </td>
                    <td className="py-2.5 pl-3 font-mono">{row.storageLife}</td>
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
