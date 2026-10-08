import React, { useState } from 'react';
import {
  HeartPulse,
  Flame,
  Droplets,
  Sprout,
  UtensilsCrossed,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  FileText,
  Clock,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TropicalSanitariumDispensaryProps {
  className?: string;
}

type TabMode = 'botanicals' | 'hydrotherapy' | 'kitchen';

interface BotanicalProtocol {
  id: string;
  name: string;
  chichewa: string;
  scientific: string;
  indications: string;
  preparationMethod: string;
  dosageSchedule: string;
  safetyCautions: string;
}

const BOTANICAL_REMEDIES: BotanicalProtocol[] = [
  {
    id: 'charcoal',
    name: 'Activated Hardwood Charcoal',
    chichewa: 'Makala Ogwira Ntchito',
    scientific: 'Carbo Activatus',
    indications: 'Acute food poisoning, waterborne bacterial dysentery, toxic ingestions, venomous insect/spider bites, and infected ulcers.',
    preparationMethod: 'Internal Slurry: Stir 1 to 2 tablespoons of finely powdered hardwood charcoal into 1 glass of clean boiled water. External Poultice: Mix equal parts charcoal powder and crushed ground flaxseed / cassava starch with warm water into a thick paste, wrap in clean flannel.',
    dosageSchedule: 'Internal: Drink 1 full glass immediately upon symptoms, followed by 1 glass every 2 hours until nausea and abdominal cramping subside. External: Apply poultice over affected area, cover with plastic wrap to maintain moisture, replace every 6 to 8 hours.',
    safetyCautions: 'Charcoal adsorbs all substances indiscriminately; do not administer within 2 hours of any essential prescribed medication. Never use briquettes containing chemical lighter fluid.',
  },
  {
    id: 'moringa',
    name: 'Moringa Leaf Powder & Seed Clarifier',
    chichewa: 'Chamwamba / Moringa',
    scientific: 'Moringa oleifera',
    indications: 'Chronic malnutrition, anemia, immune weakness, lactation support, and natural river water flocculation.',
    preparationMethod: 'Harvest fresh green leaves, wash in clean water, and dry in shade (never direct sun to preserve vitamins). Pound into fine green powder. For Water: Crush 2 mature dry seeds per 1 liter of turbid water.',
    dosageSchedule: 'Nutrition: 1 to 2 tablespoons daily stirred into morning porridge (Phala) or relish. Water Purification: Stir crushed seed powder vigorously for 5 minutes, let stand for 1 hour; decant pure clarified water.',
    safetyCautions: 'Root bark contains toxic alkaloids; use ONLY leaves and seeds.',
  },
  {
    id: 'guava-eucalyptus',
    name: 'Guava Leaf & Eucalyptus Inhalation',
    chichewa: 'Masamba a Mapwera & Bulugama',
    scientific: 'Psidium guajava & Eucalyptus globulus',
    indications: 'Upper respiratory infections, bronchitis, chest congestion, and chronic cough.',
    preparationMethod: 'Boil 10 fresh guava leaves and 5 bruised eucalyptus leaves in 2 liters of water in an open galvanized pot until fragrant aromatic steam rises.',
    dosageSchedule: 'Steam Inhalation: Sit with head draped under a heavy cotton blanket over the steaming pot for 10–15 minutes, inhaling deeply through nose and mouth twice daily.',
    safetyCautions: 'Do not place face closer than 30cm to avoid steam scalding. Keep eyes closed.',
  },
  {
    id: 'papaya-seed',
    name: 'Papaya Seed Vermifuge',
    chichewa: 'Mbeu za Papaya',
    scientific: 'Carica papaya',
    indications: 'Intestinal parasites (roundworms, pinworms) and digestive enzyme insufficiency.',
    preparationMethod: 'Scoop seeds from ripe papaya, rinse gelatinous sac, sun-dry, and crush into coarse black pepper powder. Blend with pure raw local honey.',
    dosageSchedule: 'Adults: 1 tablespoon of seed powder mixed with 1 tablespoon honey taken on an empty stomach in the morning for 7 consecutive days, followed by plenty of water.',
    safetyCautions: 'Avoid in early pregnancy.',
  },
];

interface HydrotherapyProtocol {
  id: string;
  title: string;
  chichewa: string;
  purpose: string;
  equipment: string[];
  steps: string[];
  duration: string;
}

const HYDROTHERAPY_PROTOCOLS: HydrotherapyProtocol[] = [
  {
    id: 'fomentations',
    title: 'Hot & Cold Chest Fomentations',
    chichewa: 'Kukanikiza Madzi Otentha ndi Ozizira pa Chifuwa',
    purpose: 'Relieves deep pulmonary congestion, pneumonia, bronchial inflammation, and intercostal muscle pain.',
    equipment: [
      'Pot of boiling water on wood stove',
      '3 large wool or heavy flannel towels (fomentation pads)',
      '1 basin of cold mountain water with washcloth',
      'Heavy blanket to cover patient and prevent chilling',
    ],
    steps: [
      'Fold the fomentation towel lengthwise and wring out thoroughly from boiling water inside a dry towel to prevent scalding.',
      'Apply hot towel over patient’s bare chest, layered with dry towels to retain heat. Verify temperature with patient.',
      'Maintain hot compress for 3 to 4 minutes until skin develops a warm, pink arterial hyperemia.',
      'Remove hot pad and briskly rub the chest with the washcloth wrung out from ice-cold water for exactly 30 seconds.',
      'Repeat the cycle 3 to 4 times (3 minutes hot, 30 seconds cold), always finishing with a brief cold friction rub and drying thoroughly.',
    ],
    duration: '20 minutes total treatment; patient must rest quietly under wool blankets for 1 hour post-treatment.',
  },
  {
    id: 'foot-bath',
    title: 'Hot Foot Bath with Cold Head Compress',
    chichewa: 'Kusambitsa Mapazi m’Madzi Otentha',
    purpose: 'Draws excess blood away from congested head and lungs, relieves tension headaches, aborts early head colds, and aids sleep.',
    equipment: [
      'Deep galvanized basin or bucket filled with water at 40°C–44°C',
      'Pitcher of boiling water to maintain temperature',
      'Basin of cold water with head compress cloth',
      'Large blanket draped around patient from shoulders to floor to trap heat',
    ],
    steps: [
      'Immerse patient’s feet and ankles in the hot foot basin.',
      'Drape patient completely in wool blanket covering the basin to create a sweat tent.',
      'Place cold, wet compress over patient’s forehead and neck, renewing it frequently as it warms.',
      'Gradually pour hot water from pitcher along the side of the basin every 5 minutes to keep temperature rising.',
      'After 15–20 minutes, lift feet out and immediately pour cold water over feet to tone cutaneous circulation, dry thoroughly.',
    ],
    duration: '15 to 20 minutes.',
  },
];

export function TropicalSanitariumDispensary({ className = '' }: TropicalSanitariumDispensaryProps) {
  const [activeTab, setActiveTab] = useState<TabMode>('botanicals');
  const [copied, setCopied] = useState(false);

  const handleCopyProtocol = () => {
    const text = `OUTPOST SANITARIUM FIELD PROTOCOL & BOTANICAL DISPENSARY
(Avondale Model & Tropical Medical Missionary Guidelines)

1. ACTIVATED HARDWOOD CHARCOAL:
• Internal Slurry: 1–2 tbsp finely powdered charcoal in 1 glass clean water every 2 hours for acute poisoning/dysentery.
• External Poultice: Equal parts charcoal & ground flaxseed/starch paste on flannel for venomous bites and ulcers.

2. MORINGA OLEIFERA (CHAMWAMBA):
• 1–2 tbsp dried shade-cured leaf powder in daily meals.
• Water clarification: 2 crushed seeds per 1L turbid river water.

3. GUAVA & EUCALYPTUS STEAM INHALATION:
• Boil 10 guava leaves + 5 eucalyptus leaves; inhale steam under blanket for 15 minutes twice daily.

4. HYDROTHERAPY FOMENTATIONS:
• 3 minutes hot compress followed by 30 seconds cold friction rub (repeat 3–4 cycles) for respiratory congestion.`;

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
          <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-semibold mb-1">
            <HeartPulse size={14} />
            <span>Tropical Sanitarium Dispensary &amp; Natural Remedies</span>
            <span>·</span>
            <span className="text-stone-400">Rational Hydrotherapy</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Outpost Natural Pharmacy &amp; Edenic Kitchen Protocols
          </h3>
        </div>

        <button
          type="button"
          onClick={handleCopyProtocol}
          className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-mono inline-flex items-center gap-1.5 transition-colors border border-stone-700 self-start sm:self-auto cursor-pointer"
        >
          {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          <span>{copied ? 'Copied Protocol' : 'Copy Natural Protocols'}</span>
        </button>
      </div>

      {/* 3 Tab Mode Switcher */}
      <div className="grid grid-cols-3 gap-1.5 bg-stone-950/60 p-1 rounded-xl border border-stone-800 text-xs font-mono">
        <button
          type="button"
          onClick={() => setActiveTab('botanicals')}
          className={cn(
            'py-2 px-3 rounded-lg text-center transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5 font-bold',
            activeTab === 'botanicals'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              : 'text-stone-400 hover:text-stone-200'
          )}
        >
          <Sprout size={13} />
          <span>1. Botanicals</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hydrotherapy')}
          className={cn(
            'py-2 px-3 rounded-lg text-center transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5 font-bold',
            activeTab === 'hydrotherapy'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
              : 'text-stone-400 hover:text-stone-200'
          )}
        >
          <Droplets size={13} />
          <span>2. Hydrotherapy</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('kitchen')}
          className={cn(
            'py-2 px-3 rounded-lg text-center transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5 font-bold',
            activeTab === 'kitchen'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-stone-400 hover:text-stone-200'
          )}
        >
          <UtensilsCrossed size={13} />
          <span>3. Edenic Hearth</span>
        </button>
      </div>

      {/* TAB 1: BOTANICAL DISPENSARY */}
      {activeTab === 'botanicals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BOTANICAL_REMEDIES.map((remedy) => (
            <div key={remedy.id} className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                <div>
                  <h4 className="font-bold text-white text-sm tracking-tight">{remedy.name}</h4>
                  <span className="text-stone-400 font-mono text-[11px]">
                    {remedy.chichewa} · <em className="text-rose-400">{remedy.scientific}</em>
                  </span>
                </div>
              </div>

              <div>
                <strong className="text-rose-300 block mb-0.5">Indications:</strong>
                <p className="text-stone-300 leading-relaxed">{remedy.indications}</p>
              </div>

              <div>
                <strong className="text-emerald-300 block mb-0.5">Preparation &amp; Application:</strong>
                <p className="text-stone-300 leading-relaxed">{remedy.preparationMethod}</p>
              </div>

              <div>
                <strong className="text-sky-300 block mb-0.5">Dosage Schedule:</strong>
                <p className="text-stone-300 leading-relaxed">{remedy.dosageSchedule}</p>
              </div>

              <div className="p-2 rounded-lg bg-rose-950/20 border border-rose-900/30 text-rose-300 text-[11px]">
                <strong>Safety Caution:</strong> {remedy.safetyCautions}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: RATIONAL HYDROTHERAPY */}
      {activeTab === 'hydrotherapy' && (
        <div className="space-y-4">
          {HYDROTHERAPY_PROTOCOLS.map((protocol) => (
            <div key={protocol.id} className="p-4 sm:p-5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-stone-800">
                <div>
                  <h4 className="font-bold text-white text-base tracking-tight">{protocol.title}</h4>
                  <span className="text-stone-400 font-mono text-[11px]">{protocol.chichewa}</span>
                </div>
                <span className="text-sky-400 font-mono text-[11px] flex items-center gap-1">
                  <Clock size={12} /> {protocol.duration}
                </span>
              </div>

              <p className="text-stone-300 leading-relaxed">
                <strong className="text-white">Physiological Purpose:</strong> {protocol.purpose}
              </p>

              <div>
                <strong className="text-amber-300 block mb-1">Equipment Needed:</strong>
                <ul className="list-disc list-inside space-y-0.5 text-stone-300">
                  {protocol.equipment.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1.5 pt-1">
                <strong className="text-emerald-300 block">Step-by-Step Procedure:</strong>
                {protocol.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-stone-300 bg-stone-900/60 p-2 rounded-lg border border-stone-800/60">
                    <span className="w-4 h-4 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0 font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: EDENIC HEARTH NUTRITION */}
      {activeTab === 'kitchen' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Card 1: Unfermented Hearth Bread */}
          <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-2">
            <h4 className="font-bold text-white text-sm">Unfermented Hearth Bread (Mkate wa Mgaiwa)</h4>
            <span className="text-stone-400 font-mono text-[11px] block">100% Whole Grain · Leaven-Free</span>
            <p className="text-stone-300 leading-relaxed">
              Mix 4 cups freshly milled whole wheat or sorghum flour (*Mphale / Mgaiwa*) with 1.5 cups ice-cold mountain water and 1/2 tsp salt into stiff dough.
            </p>
            <p className="text-stone-300 leading-relaxed">
              Knead for 10 minutes until elastic, incorporate air mechanically rather than via chemical yeast. Roll 1cm thick and bake on a dry cast iron skillet over coals for 15 minutes.
            </p>
          </div>

          {/* Card 2: Sinjiro Groundnut Sauce */}
          <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-2">
            <h4 className="font-bold text-white text-sm">Sinjiro Seed &amp; Mineral Sauce</h4>
            <span className="text-stone-400 font-mono text-[11px] block">High Protein &amp; Zinc Emulsion</span>
            <p className="text-stone-300 leading-relaxed">
              Lightly roast heirloom groundnuts (*Mtedza*) and sunflower seeds. Pound in traditional wooden mortar (*Mtondo*) into a fine oily meal without added vegetable oil.
            </p>
            <p className="text-stone-300 leading-relaxed">
              Stir into simmering vegetable broths to create a rich creamy sauce providing complete amino acids and bio-available zinc for children.
            </p>
          </div>

          {/* Card 3: Pounded Cassava Leaves */}
          <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-2">
            <h4 className="font-bold text-white text-sm">Chigwada (Pounded Cassava Greens)</h4>
            <span className="text-stone-400 font-mono text-[11px] block">Vitamin A &amp; Iron Powerhouse</span>
            <p className="text-stone-300 leading-relaxed">
              Pick tender young cassava leaves (*Chigwada*). Pound thoroughly with garlic and fresh ginger to break down fibrous cells and remove cyanogenic glucosides.
            </p>
            <p className="text-stone-300 leading-relaxed">
              Boil uncovered with fresh tomatoes and *Sinjiro* groundnut powder for 30 minutes until deep emerald green. Serve with unrefined *Mgaiwa Nsima*.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
