import React, { useState, useEffect } from 'react';
import {
  HeartPulse,
  Droplets,
  Sun,
  Wind,
  Moon,
  Sparkles,
  UtensilsCrossed,
  Activity,
  Scale,
  Flame,
  ShieldAlert,
  CheckCircle2,
  BookOpen,
  Leaf,
  GraduationCap,
  Clock,
  Thermometer,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewstartLaw {
  id: string;
  letter: string;
  name: string;
  dailyHabitLabel: string;
  scriptureRef: string;
  scriptureText: string;
  egwQuote: string;
  egwSource: string;
  physiologyNote: string;
  malawiOutpostPractice: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accentClass: string;
}

const NEWSTART_LAWS: NewstartLaw[] = [
  {
    id: 'nutrition',
    letter: 'N',
    name: 'Nutrition (Edenic Plant Diet)',
    dailyHabitLabel: 'Whole grains, legumes, fruits & nuts; zero flesh or refined stimulants today',
    scriptureRef: 'Genesis 1:29 (KJV)',
    scriptureText: 'And God said, Behold, I have given you every herb bearing seed... and every tree, in the which is the fruit of a tree yielding seed; to you it shall be for meat.',
    egwQuote: 'Grains, fruits, nuts, and vegetables constitute the diet chosen for us by our Creator. These foods, prepared in as simple and natural a manner as possible, are the most healthful and nourishing.',
    egwSource: 'The Ministry of Healing, p. 296 (1905)',
    physiologyNote: 'High-fiber complex carbohydrates and plant antioxidants lower systemic inflammation, stabilize postprandial blood glucose, and nourish the gut microbiome without uric acid or cholesterol load.',
    malawiOutpostPractice: 'Pair whole-grain mgaiwa or millet with pigeon peas (nandolo), groundnut sinjiro emulsion, avocados, and solar-dried mangoes — keeping fruits and vegetables at separate meals (CD 112).',
    icon: UtensilsCrossed,
    accentClass: 'text-emerald-600 dark:text-emerald-300',
  },
  {
    id: 'exercise',
    letter: 'E',
    name: 'Exercise (Useful Open-Air Labor)',
    dailyHabitLabel: 'At least 60 minutes of purposeful outdoor agricultural or building labor',
    scriptureRef: 'Genesis 2:15 (KJV)',
    scriptureText: 'And the LORD God took the man, and put him into the garden of Eden to dress it and to keep it.',
    egwQuote: 'Action is a law of our being. Every organ of the body has its appointed work, upon the performance of which its development and strength depend.',
    egwSource: 'The Ministry of Healing, p. 237 (1905)',
    physiologyNote: 'Rhythmic outdoor muscular labor drives venous and lymphatic return, increases mitochondrial density, and equalizes blood circulation between the brain and extremities.',
    malawiOutpostPractice: 'Morning hoeing on 75cm contour ridges, turning 18-day compost piles, or shaping 3×3×3ft orchard pits before the midday sun.',
    icon: Activity,
    accentClass: 'text-amber-600 dark:text-amber-300',
  },
  {
    id: 'water',
    letter: 'W',
    name: 'Water (Internal Hydration & Hydrotherapy)',
    dailyHabitLabel: '6–8 glasses of pure water between meals (none during meals) + morning contrast wash',
    scriptureRef: 'Isaiah 12:3 (KJV)',
    scriptureText: 'Therefore with joy shall ye draw water out of the wells of salvation.',
    egwQuote: 'In health and in sickness, pure water is one of Heaven’s choicest blessings. Its proper use promotes health. It is the beverage which God provided to quench the thirst of animals and man.',
    egwSource: 'The Ministry of Healing, p. 237 (1905)',
    physiologyNote: 'Drinking pure water 30–45 minutes before meals hydrates gastric mucosa without diluting digestive enzymes; external hot/cold water applications direct white blood cells to congested tissues.',
    malawiOutpostPractice: 'Filter spring or borehole water through a household biosand and activated charcoal column; drink warm water upon waking before Morning Watch.',
    icon: Droplets,
    accentClass: 'text-sky-600 dark:text-sky-300',
  },
  {
    id: 'sunlight',
    letter: 'S',
    name: 'Sunlight (Solar Germicide & Vitamin D)',
    dailyHabitLabel: '30 minutes of early morning Malawi sunshine & open window shutters',
    scriptureRef: 'Malachi 4:2 (KJV)',
    scriptureText: 'But unto you that fear my name shall the Sun of righteousness arise with healing in his wings.',
    egwQuote: 'If you would have your homes sweet and inviting, make them bright with air and sunshine. Remove your heavy curtains, open the windows, throw back the blinds, and enjoy the rich sunlight.',
    egwSource: 'The Ministry of Healing, p. 274 (1905)',
    physiologyNote: 'Morning ultraviolet and near-infrared wavelengths stimulate cholecalciferol (Vitamin D3), synchronize circadian melatonin/cortisol rhythms, and sanitize bedding and earthen walls against mold.',
    malawiOutpostPractice: 'Orient cottage bedrooms and treatment rooms toward the east so morning sun floods the rooms; air blankets and mattresses outdoors weekly.',
    icon: Sun,
    accentClass: 'text-amber-500 dark:text-amber-300',
  },
  {
    id: 'temperance',
    letter: 'T',
    name: 'Temperance (Self-Control in All Things)',
    dailyHabitLabel: 'Complete abstinence from harmful substances & balanced moderation in work and eating',
    scriptureRef: '1 Corinthians 9:25 (KJV)',
    scriptureText: 'And every man that striveth for the mastery is temperate in all things.',
    egwQuote: 'True temperance teaches us to dispense entirely with everything hurtful and to use judiciously that which is healthful.',
    egwSource: 'Patriarchs and Prophets, p. 562 (1890)',
    physiologyNote: 'Avoiding alcohol, tobacco, caffeine, refined sugar, and overwork preserves adrenal reserves, protects hepatic detoxification pathways, and keeps the frontal lobe clear for moral discernment.',
    malawiOutpostPractice: 'Eat two unhurried meals per day 5–6 hours apart with nothing between meals save pure water; cease heavy labor before exhaustion.',
    icon: Scale,
    accentClass: 'text-teal-600 dark:text-teal-300',
  },
  {
    id: 'air',
    letter: 'A',
    name: 'Air (Deep Highland Oxygenation)',
    dailyHabitLabel: 'Deep diaphragmatic breathing outdoors & cross-ventilated sleeping rooms',
    scriptureRef: 'Genesis 2:7 (KJV)',
    scriptureText: 'And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life.',
    egwQuote: 'In order to have good blood, we must breathe well. Full, deep inspirations of pure air, which fill the lungs with oxygen, purify the blood.',
    egwSource: 'The Ministry of Healing, p. 272 (1905)',
    physiologyNote: 'Full diaphragmatic breathing oxygenates the lower pulmonary lobes, calms the vagus nerve, alkalizes blood pH, and soothes nervous irritability.',
    malawiOutpostPractice: 'Build cottages on elevated highland contours (Dedza, Mzimba, Zomba, Ntcheu) above stagnant dambo hollows, with high ridge vents for night-time air exchange.',
    icon: Wind,
    accentClass: 'text-cyan-600 dark:text-cyan-300',
  },
  {
    id: 'rest',
    letter: 'R',
    name: 'Rest (Nightly Sleep & Seventh-day Sabbath)',
    dailyHabitLabel: 'Early sleep before 9:30 PM & weekly Sabbath rest from all secular care',
    scriptureRef: 'Mark 6:31 (KJV)',
    scriptureText: 'And he said unto them, Come ye yourselves apart into a desert place, and rest a while.',
    egwQuote: 'Nature restores vigor during the hours of sleep, particularly the hours before midnight... And the Sabbath is a golden clasp that unites God and His people.',
    egwSource: 'Counsels on Health, p. 147 / Selected Messages Book 2',
    physiologyNote: 'Slow-wave sleep before midnight maximizes growth hormone tissue repair and glymphatic brain clearance; the 24-hour weekly Sabbath resets weekly cortisol and nervous tension.',
    malawiOutpostPractice: 'Complete all baking, bathing, and tool cleaning before Friday sunset; spend Sabbath afternoon observing God’s handiwork in the hills and orchards.',
    icon: Moon,
    accentClass: 'text-indigo-600 dark:text-indigo-300',
  },
  {
    id: 'trust',
    letter: 'T',
    name: 'Trust in Divine Power (Peace of Conscience)',
    dailyHabitLabel: 'Morning & Evening Family Altar, KJV Scripture meditation & gratitude in trial',
    scriptureRef: 'Proverbs 3:5–6 (KJV)',
    scriptureText: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding.',
    egwQuote: 'Courage, hope, faith, sympathy, love, promote health and prolong life. A contented mind, a cheerful spirit, is health to the body and strength to the soul.',
    egwSource: 'The Ministry of Healing, p. 241 (1905)',
    physiologyNote: 'Trust in God down-regulates sympathetic fight-or-flight catecholamines, boosts natural killer (NK) cell immunity, and guards the heart against anxiety.',
    malawiOutpostPractice: 'Gather the household at sunrise and sunset for hymn singing, Scripture reading, and prayer before stepping into the fields.',
    icon: Sparkles,
    accentClass: 'text-amber-600 dark:text-amber-300',
  },
];

interface HydrotherapyProtocol {
  id: string;
  title: string;
  indication: string;
  hotTemp: string;
  coldTemp: string;
  duration: string;
  equipment: string[];
  steps: string[];
  physiology: string;
  contraindications: string;
  egwCitation: string;
}

const HYDROTHERAPY_PROTOCOLS: HydrotherapyProtocol[] = [
  {
    id: 'contrast-fomentation',
    title: '01. Contrast Chest & Spine Fomentations',
    indication: 'Bronchitis, deep chest congestion, early pneumonia recovery, pleurisy, and intercostal neuralgia.',
    hotTemp: '60°C–70°C (140°F–158°F) wrung dry in heavy wool/flannel',
    coldTemp: '12°C–15°C (55°F–60°F) brisk linen friction rub (45 sec)',
    duration: '3 Hot / Cold cycles (3–4 min Hot, 45 sec Cold) · Total 18–22 min',
    equipment: [
      '3 thick cotton towels + 2 dry wool flannel wraps',
      'Large boiling pot over rocket stove',
      'Basin of cold spring/well water + washcloth for forehead',
      'Hot foot bath bucket (40°C–43°C) to draw blood downward',
    ],
    steps: [
      'Place patient’s feet in a warm-to-hot foot bath (40°C–43°C) and keep a cool, damp cloth on the forehead whenever the body heats up.',
      'Wring a folded towel out of boiling water until no drips remain, wrap it inside a dry wool flannel blanket, and place over the chest or spine over a dry towel layer.',
      'Leave the hot fomentation in place for 3 to 4 minutes until skin is briskly erythematous (pink/warm).',
      'Remove the hot pack and immediately wipe the chest briskly for 45 seconds with a cloth wrung out of cold water, then dry quickly.',
      'Repeat for 3 complete hot-and-cold cycles, always ending with the brief cold application and 30 minutes of dry rest under a sheet.',
    ],
    physiology: 'Alternating vaso-dilation (hot) and vaso-constriction (cold) acts as a vascular pump, tripling leukocytosis (white blood cell migration) and relieving pulmonary capillary stasis.',
    contraindications: 'Never apply intense heat to insensate skin (diabetic neuropathy), paralyzed limbs, active hemorrhage, or directly over suspected malignancy.',
    egwCitation: '“The application of water is a simple and effective means of relieving congestion and equalizing the circulation.” — Medical Ministry, p. 227',
  },
  {
    id: 'hot-foot-bath',
    title: '02. Derivative Hot Foot Bath',
    indication: 'Congestive throbbing headaches, early onset of colds/influenza, pelvic congestion, and insomnia.',
    hotTemp: 'Starting at 39°C (102°F), gradually raised to 43°C–45°C (110°F–113°F)',
    coldTemp: '12°C (55°F) cold pour over ankles at conclusion + cool compress to forehead',
    duration: '15 to 25 minutes, followed by 20 minutes of horizontal rest',
    equipment: [
      'Deep bucket or basin reaching mid-calf',
      'Kettle of hot water + pitcher of cold spring water',
      'Cold compress cloth for forehead and back of neck',
      'Sheet and blanket to drape patient from neck to floor',
    ],
    steps: [
      'Seat the patient comfortably wrapped in a sheet and blanket; immerse feet in 39°C (102°F) water up to mid-calf.',
      'Slowly add hot water along the side of the bucket (shielding the patient’s feet with your hand) until water reaches 43°C–45°C.',
      'As soon as the patient begins to perspire, apply a cold compress to the forehead and back of the neck to prevent cerebral congestion.',
      'After 15–20 minutes, lift the feet above the water, pour cold water briskly over the feet and ankles for 10 seconds, dry thoroughly between toes, and have patient rest in bed.',
    ],
    physiology: 'Dilates the large vascular beds of the feet and lower legs, drawing excess blood volume away from congested cerebral, nasal, pulmonary, or pelvic vessels.',
    contraindications: 'Contraindicated in peripheral arterial disease (PAD), diabetic loss of sensation, or severe varicose ulcers. Always test temperature with a thermometer or elbow.',
    egwCitation: '“A hot foot bath and a cool compress on the head will often relieve brain congestion without a single grain of poisonous drugs.” — Counsels on Health, p. 91',
  },
  {
    id: 'heating-compress',
    title: '03. Throat & Joint Heating Compress',
    indication: 'Sore throat, tonsillitis, laryngitis, earache, or sub-acute joint/muscle inflammation.',
    hotTemp: 'Body heat warms the compress naturally over 4–8 hours (overnight)',
    coldTemp: '15°C (60°F) initial cold linen strip wrung thoroughly dry',
    duration: 'Applied at bedtime and worn overnight (6–8 hours)',
    equipment: [
      '1 thin cotton or linen strip (2.5 inches wide for throat)',
      '1 wider dry wool flannel strip (3.5 inches wide) to overlap completely',
      'Safety pins to secure snugly so no air leaks in',
    ],
    steps: [
      'Wring the inner thin cotton strip out of cool water so it is damp but not dripping.',
      'Wrap the damp cotton strip smoothly around the throat (below the chin and up toward the ears below the jaw).',
      'Immediately cover the damp cotton completely with a wider, dry wool flannel strip, overlapping at least 1cm on top and bottom so no outside air can enter and chill the neck.',
      'Pin securely so it stays snug during sleep; by morning the inner cloth should be warm and nearly dry. Sponge neck with cool water upon removal.',
    ],
    physiology: 'Initial cool contact causes brief vasoconstriction followed by sustained, gentle reflex vasodilation trapped by the wool layer, bringing oxygenated blood and phagocytes to the pharynx all night.',
    contraindications: 'If the patient is too chilled or weak to warm the compress within 15 minutes, replace with a dry warm wrap.',
    egwCitation: '“Simple water treatments, skilfully applied, will save many a life that would otherwise be lost.” — The Ministry of Healing, p. 237',
  },
  {
    id: 'tepid-sponging',
    title: '04. Evaporative Tepid Sponging for High Fever',
    indication: 'High febrile states (>39°C / 102.2°F) where skin is hot, dry, and flushed ( only when patient is NOT shivering).',
    hotTemp: 'Keep feet warm with a hot water bottle if feet feel cool!',
    coldTemp: 'Tepid water at 30°C–34°C (86°F–93°F) — never ice-cold water',
    duration: '15–20 minutes, exposing and sponging one limb at a time',
    equipment: [
      'Basin of tepid water (30°C–34°C)',
      '2 soft cotton washcloths + dry sheet',
      'Hot water bottle wrapped in towel for the feet',
    ],
    steps: [
      'Check the patient’s feet first: if the feet are cool or the patient is shivering, warm the feet first before any cooling sponge.',
      'Keep the patient covered with a sheet; uncover only ONE arm at a time, sponge with long slow strokes of tepid water, and allow moisture to evaporate for 30 seconds before patting dry and re-covering.',
      'Proceed systematically: Right arm → Left arm → Chest & Abdomen → Right leg → Left leg → Back and Spine.',
      'Offer sips of pure water or warm lemon-grass herbal infusion every 15 minutes to replace insensible fluid loss.',
    ],
    physiology: 'Tepid water avoids cutaneous vasoconstriction and shivering (which would trap internal core heat), allowing gentle evaporative heat transfer from dilated surface capillaries.',
    contraindications: 'Never apply cold or tepid sponging during a rigor/chill phase or when extremities are cold and cyanotic.',
    egwCitation: '“Water can be used in many ways to relieve suffering. Drafts of clear, warm water taken before eating... and outward applications of water are safe and rational.” — 2SM 296',
  },
];

interface ApothecaryRemedy {
  id: string;
  name: string;
  chichewaName: string;
  partUsed: string;
  primaryUses: string;
  preparationProtocol: string;
  egwOrScientificNote: string;
}

const APOTHECARY_REMEDIES: ApothecaryRemedy[] = [
  {
    id: 'activated-charcoal',
    name: 'Pulverized Hardwood Charcoal (Poultice & Slurry)',
    chichewaName: 'Makala a Mtengo Wouma',
    partUsed: 'Cleanly burned non-toxic hardwood (Eucalyptus, Acacia, or Fruitwood) ground to a superfine powder',
    primaryUses: 'Poisonous insect/snake bites, infected wounds, severe gastroenteritis/diarrhea, eye inflammation (poultice), and abdominal bloating.',
    preparationProtocol: 'Slurry: Stir 1–2 tablespoons superfine charcoal into a tall glass of pure water; drink supernatant or full slurry between meals (keep 2 hours away from needed medications). Poultice: Mix 3 tbsp charcoal + 3 tbsp ground flaxseed or cassava starch with boiling water into a paste, spread between thin cotton gauze, cover with plastic wrap to retain moisture, and apply over inflamed tissue for 4–8 hours.',
    egwOrScientificNote: '“One of the most beneficial remedies is pulverized charcoal, placed in a bag and used in fomentations. This is a most successful remedy.” — Ellen G. White, 2 Selected Messages, p. 294.',
  },
  {
    id: 'moringa-leaf',
    name: 'Moringa Oleifera Shade-Dried Leaf Powder',
    chichewaName: 'Chamwamba / Kangaluni',
    partUsed: 'Fresh pinnae leaves harvested in the morning and dried indoors in the shade (never in direct harsh sun, which destroys Vitamin A/C)',
    primaryUses: 'Iron-deficiency anemia, maternal lactation support, childhood micronutrient recovery, and dry-season greens reserve.',
    preparationProtocol: 'Strip leaflets from stems, wash in clean water, spread on mesh racks in a ventilated shaded room for 48–72 hours until crisp, pound in a clean mortar, and store in dark airtight jars. Stir 1 teaspoon into warm porridge or sinjiro sauce *after* removing the pot from the fire.',
    egwOrScientificNote: 'Contains 7x the Vitamin C of oranges, 4x the calcium of milk, and complete plant amino acids — thriving across Malawi’s Lakeshore, Shire Valley, and Mid-Elevation zones.',
  },
  {
    id: 'ginger-turmeric-poultice',
    name: 'Ginger & Turmeric Circulatory Compress',
    chichewaName: 'Chikasu & Tsobola Wamtengo (Thandizo la Magazi)',
    partUsed: 'Freshly grated Zingiber officinale (Ginger) and Curcuma longa (Turmeric) rhizomes',
    primaryUses: 'Sluggish peripheral circulation, arthritic joint stiffness, sore muscles after heavy hoeing, and non-broken sprains.',
    preparationProtocol: 'Simmer 2 tablespoons grated fresh ginger and 1 tablespoon turmeric in 1 liter of water for 10 minutes (covered). Dip a folded cotton cloth into the hot decoction, wring out, and apply over the stiff joint or kidney/lumbar region for 15 minutes, followed by a brisk cool wipe.',
    egwOrScientificNote: 'Gingerols and curcuminoids inhibit COX-2 inflammatory pathways locally while stimulating cutaneous micro-circulation without gastric irritation.',
  },
  {
    id: 'guava-leaf-tea',
    name: 'Young Guava Leaf Astringent Decoction',
    chichewaName: 'Masamba a Gwafa',
    partUsed: 'Young, tender apical leaves of Psidium guajava',
    primaryUses: 'Acute watery diarrhea, mild dysentery, sore gums/mouthwash, and cleansing superficial skin abrasions.',
    preparationProtocol: 'Wash 6–8 young tender guava leaves, tear into pieces, steep in 500ml boiling water for 12 minutes, strain, and sip 1/2 cup warm every 2–3 hours alongside oral rehydration water and charcoal.',
    egwOrScientificNote: 'Rich in quercetin and natural plant tannins that tighten inflamed intestinal mucosa and inhibit enteropathogenic bacteria.',
  },
  {
    id: 'aloe-honey-dressing',
    name: 'Fresh Aloe Vera & Raw Forest Honey Dressing',
    chichewaName: 'Chinziri & Uchi Weniweni',
    partUsed: 'Clear inner mucilaginous fillet of Aloe barbadensis + raw unheated Malawi forest honey',
    primaryUses: 'First- and second-degree kitchen/fire burns, sunburn, and clean granulating wounds.',
    preparationProtocol: 'After cooling a burn immediately under cool running water for 15 minutes, slice a fresh Aloe leaf with a sterilized knife, rinse off the yellow bitter latex, and apply the clear inner gel or a thin layer of raw unheated honey under sterile gauze.',
    egwOrScientificNote: 'Raw honey’s high osmolarity and enzymatic hydrogen peroxide release create a moist, antimicrobial barrier that accelerates epithelial regeneration.',
  },
];

interface YouthMilestone {
  id: string;
  ageBand: 'Ages 6–9 · Garden Observers' | 'Ages 10–13 · Soil & Bread Stewards' | 'Ages 14–18 · Outpost Builders';
  title: string;
  practicalTask: string;
  counselRef: string;
}

const YOUTH_CURRICULUM_MILESTONES: YouthMilestone[] = [
  {
    id: 'ym-1',
    ageBand: 'Ages 6–9 · Garden Observers',
    title: 'Seed Germination & Birds of the Air',
    practicalTask: 'Maintain a personal 1m × 2m raised bed of lettuce, carrots, and beans; identify 10 local Malawi birds and beneficial insects.',
    counselRef: 'Child Guidance, p. 51',
  },
  {
    id: 'ym-2',
    ageBand: 'Ages 6–9 · Garden Observers',
    title: 'Morning Order & Tool Care',
    practicalTask: 'Air bed linens in morning sunlight, sweep veranda, and clean/oil small hand trowels before sunset.',
    counselRef: 'Education, p. 214',
  },
  {
    id: 'ym-3',
    ageBand: 'Ages 10–13 · Soil & Bread Stewards',
    title: 'Unfermented Bread & Sinjiro Mastery',
    practicalTask: 'Mill whole grain, bake unfermented Zwischenbrot wafer rolls, and prepare oil-free groundnut sinjiro and soy milk from scratch.',
    counselRef: 'Counsels on Diet and Foods, p. 316',
  },
  {
    id: 'ym-4',
    ageBand: 'Ages 10–13 · Soil & Bread Stewards',
    title: 'A-Frame Contour & 18-Day Hot Compost',
    practicalTask: 'Build and calibrate a wooden A-frame level, peg a 75cm contour ridge, and monitor a 60°C hot compost pile.',
    counselRef: 'Education, p. 219',
  },
  {
    id: 'ym-5',
    ageBand: 'Ages 14–18 · Outpost Builders',
    title: '3×3×3 ft Orchard Pit & Grafting',
    practicalTask: 'Excavate and layer a complete 3×3×3ft Ellen White orchard pit and successfully whip-graft an avocado or peach scion.',
    counselRef: '3 Selected Messages, p. 328',
  },
  {
    id: 'ym-6',
    ageBand: 'Ages 14–18 · Outpost Builders',
    title: 'Hydrotherapy, Charcoal & Off-Grid Sizing',
    practicalTask: 'Administer a safe contrast fomentation and hot foot bath, prepare a charcoal poultice, and wire a 12V/24V solar pump circuit.',
    counselRef: 'Medical Ministry, p. 227',
  },
];

const NEWSTART_STORAGE_KEY = 'outpost_newstart_habits_v1';
const YOUTH_STORAGE_KEY = 'outpost_youth_curriculum_v1';

export function MedicalMissionarySanitarium({
  initialSection = 'newstart',
}: {
  initialSection?: 'newstart' | 'hydrotherapy' | 'apothecary' | 'education';
}) {
  const [activeSubTab, setActiveSubTab] = useState<'newstart' | 'hydrotherapy' | 'apothecary' | 'education'>(
    initialSection
  );
  const [selectedHydroId, setSelectedHydroId] = useState<string>(HYDROTHERAPY_PROTOCOLS[0].id);
  const [checkedNewstart, setCheckedNewstart] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem(NEWSTART_STORAGE_KEY);
      return raw ? JSON.parse(raw) : { nutrition: true, water: true, air: true, trust: true };
    } catch {
      return { nutrition: true, water: true, air: true, trust: true };
    }
  });
  const [checkedYouth, setCheckedYouth] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem(YOUTH_STORAGE_KEY);
      return raw ? JSON.parse(raw) : { 'ym-1': true, 'ym-3': true };
    } catch {
      return { 'ym-1': true, 'ym-3': true };
    }
  });

  useEffect(() => {
    setActiveSubTab(initialSection);
  }, [initialSection]);

  const toggleNewstart = (id: string) => {
    setCheckedNewstart((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(NEWSTART_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const toggleYouth = (id: string) => {
    setCheckedYouth((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(YOUTH_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const completedNewstartCount = NEWSTART_LAWS.filter((l) => checkedNewstart[l.id]).length;
  const activeHydro =
    HYDROTHERAPY_PROTOCOLS.find((p) => p.id === selectedHydroId) || HYDROTHERAPY_PROTOCOLS[0];

  return (
    <div className="flex flex-col gap-6">
      {/* Sub-Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200/80 dark:border-emerald-900/50">
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-stone-100 dark:bg-[#08150E] border border-stone-200 dark:border-emerald-800/60">
          {([
            { id: 'newstart', label: '01. 8 NEWSTART Laws Tracker', icon: HeartPulse },
            { id: 'hydrotherapy', label: '02. Rational Hydrotherapy Protocols', icon: Droplets },
            { id: 'apothecary', label: '03. Charcoal & Botanical Apothecary', icon: Leaf },
            { id: 'education', label: '04. True Education & Youth Curriculum', icon: GraduationCap },
          ] as const).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSubTab(tab.id)}
                className={cn(
                  'px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer',
                  isActive
                    ? 'bg-emerald-900 dark:bg-amber-400 text-white dark:text-stone-950 font-bold shadow-xs'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-white/10'
                )}
              >
                <Icon size={13} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/70 text-xs font-mono">
          <CheckCircle2 size={13} className="text-emerald-700 dark:text-amber-300" />
          <span className="text-stone-700 dark:text-stone-200">
            Daily NEWSTART Vitality: <strong className="text-emerald-800 dark:text-amber-300">{completedNewstartCount}/8 Laws</strong>
          </span>
        </div>
      </div>

      {/* ====================================================================
          TAB 1: 8 NEWSTART PHYSIOLOGICAL LAWS OF HEALTH (MH 127)
      ==================================================================== */}
      {activeSubTab === 'newstart' && (
        <div className="flex flex-col gap-6">
          <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <BookOpen size={18} className="text-amber-700 dark:text-amber-300 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                  THE MINISTRY OF HEALING, P. 127 · THE EIGHT NATURAL REMEDIES
                </span>
                <p className="font-display text-sm sm:text-base italic text-stone-800 dark:text-stone-100 mt-0.5">
                  “Pure air, sunlight, abstemiousness, rest, exercise, proper diet, the use of water, trust in divine power—these are the true remedies. Every person should have a knowledge of nature’s remedial agencies and how to apply them.”
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NEWSTART_LAWS.map((law) => {
              const Icon = law.icon;
              const isChecked = Boolean(checkedNewstart[law.id]);
              return (
                <div
                  key={law.id}
                  className={cn(
                    'p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4',
                    isChecked
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/35 border-emerald-400/60 dark:border-emerald-600/50 shadow-sm'
                      : 'bg-white dark:bg-[#091810] border-stone-200/90 dark:border-emerald-900/60'
                  )}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-black/40 border border-stone-200 dark:border-white/10 flex items-center justify-center font-display font-bold text-lg text-emerald-900 dark:text-amber-300 shrink-0">
                          {law.letter}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <Icon size={14} className={law.accentClass} />
                            <h3 className="font-display text-base font-bold text-stone-900 dark:text-white">
                              {law.name}
                            </h3>
                          </div>
                          <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                            {law.scriptureRef}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleNewstart(law.id)}
                        className={cn(
                          'px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer shrink-0',
                          isChecked
                            ? 'bg-emerald-800 dark:bg-amber-400 text-white dark:text-stone-950 border-emerald-700 dark:border-amber-300'
                            : 'bg-stone-100 dark:bg-white/5 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-white/10 hover:border-amber-400'
                        )}
                      >
                        <CheckCircle2 size={13} />
                        <span>{isChecked ? 'Practiced Today' : 'Mark Today'}</span>
                      </button>
                    </div>

                    <p className="text-xs italic text-stone-700 dark:text-stone-200 bg-stone-50 dark:bg-black/25 p-3 rounded-xl border border-stone-200/70 dark:border-white/10">
                      “{law.egwQuote}” <strong className="not-italic block mt-1 text-emerald-800 dark:text-amber-300">— {law.egwSource}</strong>
                    </p>

                    <div className="text-xs text-stone-600 dark:text-stone-300 space-y-1.5">
                      <p>
                        <strong className="text-stone-900 dark:text-white">Physiology:</strong> {law.physiologyNote}
                      </p>
                      <p>
                        <strong className="text-emerald-800 dark:text-amber-300">Malawi Homestead Practice:</strong> {law.malawiOutpostPractice}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-stone-200/70 dark:border-white/10 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                    <span className="truncate">{law.dailyHabitLabel}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ====================================================================
          TAB 2: RATIONAL HYDROTHERAPY CLINICAL PROTOCOLS
      ==================================================================== */}
      {activeSubTab === 'hydrotherapy' && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {HYDROTHERAPY_PROTOCOLS.map((proto) => {
              const isSelected = proto.id === selectedHydroId;
              return (
                <button
                  key={proto.id}
                  type="button"
                  onClick={() => setSelectedHydroId(proto.id)}
                  className={cn(
                    'p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2',
                    isSelected
                      ? 'bg-emerald-900 dark:bg-emerald-800 text-white border-amber-400 shadow-md'
                      : 'bg-white dark:bg-[#091810] border-stone-200 dark:border-emerald-900/60 text-stone-800 dark:text-stone-100 hover:border-emerald-500/50'
                  )}
                >
                  <div>
                    <span className={cn('text-[10px] font-mono font-bold uppercase block', isSelected ? 'text-amber-300' : 'text-emerald-700 dark:text-amber-300')}>
                      Clinical Hydrotherapy
                    </span>
                    <h4 className="font-display text-sm font-bold mt-0.5">{proto.title}</h4>
                  </div>
                  <p className={cn('text-xs line-clamp-2', isSelected ? 'text-emerald-100' : 'text-stone-500 dark:text-stone-400')}>
                    {proto.indication}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#091810] border border-stone-200/90 dark:border-emerald-900/60 shadow-sm flex flex-col gap-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-emerald-900/50">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-emerald-800 dark:text-amber-300">
                  SANITARIUM TREATMENT ROOM PROTOCOL
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-900 dark:text-white mt-0.5">
                  {activeHydro.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1">
                  <strong>Primary Indications:</strong> {activeHydro.indication}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 shrink-0">
                <div className="px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 text-xs">
                  <span className="text-[10px] font-mono uppercase text-amber-800 dark:text-amber-300 flex items-center gap-1">
                    <Flame size={11} /> Hot Phase
                  </span>
                  <strong className="text-stone-900 dark:text-white block mt-0.5">{activeHydro.hotTemp}</strong>
                </div>
                <div className="px-3 py-2 rounded-xl bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/60 text-xs">
                  <span className="text-[10px] font-mono uppercase text-sky-800 dark:text-sky-300 flex items-center gap-1">
                    <Thermometer size={11} /> Cold / Contrast Phase
                  </span>
                  <strong className="text-stone-900 dark:text-white block mt-0.5">{activeHydro.coldTemp}</strong>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 flex flex-col gap-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-amber-300">
                  Step-by-Step Clinical Execution ({activeHydro.duration})
                </h4>
                <ol className="space-y-2.5">
                  {activeHydro.steps.map((step, idx) => (
                    <li
                      key={idx}
                      className="p-3.5 rounded-xl bg-stone-50 dark:bg-black/30 border border-stone-200/80 dark:border-white/10 flex items-start gap-3 text-xs sm:text-sm text-stone-700 dark:text-stone-200"
                    >
                      <span className="w-6 h-6 rounded-lg bg-emerald-900 dark:bg-amber-400 text-white dark:text-stone-950 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-black/30 border border-stone-200/80 dark:border-white/10">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900 dark:text-amber-300 mb-2">
                    Required Homestead Equipment
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                    {activeHydro.equipment.map((eq, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{eq}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-stone-700 dark:text-stone-200 space-y-2">
                  <strong className="text-emerald-900 dark:text-emerald-300 block font-mono uppercase">
                    Physiological Mechanism
                  </strong>
                  <p>{activeHydro.physiology}</p>
                  <p className="italic text-stone-600 dark:text-amber-200/90 pt-1 border-t border-emerald-200/60 dark:border-emerald-800/60">
                    {activeHydro.egwCitation}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-xs text-rose-950 dark:text-rose-200 flex items-start gap-2.5">
                  <ShieldAlert size={16} className="text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-mono uppercase block">Safety &amp; Contraindications</strong>
                    <p className="mt-0.5">{activeHydro.contraindications}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          TAB 3: MALAWI BOTANICAL & CHARCOAL APOTHECARY (2SM 294)
      ==================================================================== */}
      {activeSubTab === 'apothecary' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {APOTHECARY_REMEDIES.map((rem) => (
            <div
              key={rem.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#091810] border border-stone-200/90 dark:border-emerald-900/60 shadow-xs flex flex-col justify-between gap-4"
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-700 dark:text-amber-300">
                      Chichewa: {rem.chichewaName}
                    </span>
                    <h3 className="font-display text-lg font-bold text-stone-900 dark:text-white">
                      {rem.name}
                    </h3>
                  </div>
                  <Leaf size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300">
                  <strong className="text-stone-900 dark:text-white">Part Used:</strong> {rem.partUsed}
                </p>
                <p className="text-xs text-stone-600 dark:text-stone-300">
                  <strong className="text-stone-900 dark:text-white">Indications:</strong> {rem.primaryUses}
                </p>

                <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-black/30 border border-stone-200/70 dark:border-white/10 text-xs text-stone-700 dark:text-stone-200">
                  <strong className="text-emerald-800 dark:text-amber-300 block mb-1 font-mono uppercase">
                    Field Preparation &amp; Dosage Protocol
                  </strong>
                  {rem.preparationProtocol}
                </div>
              </div>

              <div className="pt-2.5 border-t border-stone-200/70 dark:border-white/10 text-xs italic text-stone-600 dark:text-stone-300">
                {rem.egwOrScientificNote}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ====================================================================
          TAB 4: TRUE EDUCATION & MADISON / AVONDALE YOUTH CURRICULUM
      ==================================================================== */}
      {activeSubTab === 'education' && (
        <div className="flex flex-col gap-6">
          <div className="p-5 rounded-2xl bg-emerald-950 text-white border border-emerald-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="max-w-3xl">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 block">
                EDUCATION, P. 218 · THE AVONDALE &amp; MADISON HARMONIOUS MODEL
              </span>
              <h3 className="font-display text-xl font-bold mt-0.5">
                Combining Morning Sacred Study with Afternoon Agricultural &amp; Mechanical Trades
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-1">
                “In the study of agriculture, let pupils be given not only theory, but practice. While they learn what science can teach in regard to the nature and preparation of the soil, the value of different crops, and the best methods of production, let them put their knowledge to use.” — <em>Education, p. 219</em>
              </p>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs font-mono shrink-0">
              <Clock size={14} className="text-amber-300 inline mr-1.5" />
              <span>50% Study · 50% Open-Air Labor</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(
              [
                'Ages 6–9 · Garden Observers',
                'Ages 10–13 · Soil & Bread Stewards',
                'Ages 14–18 · Outpost Builders',
              ] as const
            ).map((band) => {
              const items = YOUTH_CURRICULUM_MILESTONES.filter((m) => m.ageBand === band);
              return (
                <div
                  key={band}
                  className="p-5 rounded-2xl bg-white dark:bg-[#091810] border border-stone-200/90 dark:border-emerald-900/60 flex flex-col gap-3.5"
                >
                  <div className="pb-2.5 border-b border-stone-200 dark:border-emerald-900/50">
                    <span className="text-[11px] font-mono font-bold uppercase text-emerald-700 dark:text-amber-300">
                      True Education Track
                    </span>
                    <h4 className="font-display text-base font-bold text-stone-900 dark:text-white">
                      {band}
                    </h4>
                  </div>

                  {items.map((item) => {
                    const done = Boolean(checkedYouth[item.id]);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleYouth(item.id)}
                        className={cn(
                          'p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-1.5',
                          done
                            ? 'bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-400/60'
                            : 'bg-stone-50 dark:bg-black/25 border-stone-200/70 dark:border-white/10 hover:border-amber-400/60'
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <strong className="text-xs font-bold text-stone-900 dark:text-white">
                            {item.title}
                          </strong>
                          <CheckCircle2
                            size={14}
                            className={cn(
                              done
                                ? 'text-emerald-600 dark:text-amber-300'
                                : 'text-stone-300 dark:text-stone-600'
                            )}
                          />
                        </div>
                        <p className="text-xs text-stone-600 dark:text-stone-300">
                          {item.practicalTask}
                        </p>
                        <span className="text-[10px] font-mono text-emerald-800 dark:text-amber-300/80">
                          Ref: {item.counselRef}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
