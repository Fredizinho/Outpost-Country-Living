import React, { useState, useEffect } from 'react';
import {
  HeartPulse,
  Droplets,
  Leaf,
  Sparkles,
  GraduationCap,
  FlaskConical,
  Heart,
  ShieldAlert,
  BookOpen,
  Thermometer,
  Clock,
  CheckCircle2,
  Copy,
  Check,
  Activity,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SpiritualSanctuaryBanner } from '@/components/health/SpiritualSanctuaryBanner';
import { EightLawsDetailedView } from '@/components/health/EightLawsDetailedView';
import { ScientificEvidenceSection } from '@/components/health/ScientificEvidenceSection';
import { MedicalMissionaryOutreachView } from '@/components/health/MedicalMissionaryOutreachView';
import { TropicalSanitariumDispensary } from '@/components/health/TropicalSanitariumDispensary';
import { Badge } from '@/components/ui';

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
    title: '01. Contrast chest & spine fomentations',
    indication: 'Bronchitis, deep chest congestion, early pneumonia recovery, pleurisy, and intercostal neuralgia.',
    hotTemp: '60°C–70°C (140°F–158°F) wrung dry in heavy wool/flannel',
    coldTemp: '12°C–15°C (55°F–60°F) brisk linen friction rub (45 sec)',
    duration: '3 Hot / Cold cycles (3–4 min Hot, 45 sec Cold) · Total 18–22 min',
    equipment: [
      '3 thick cotton towels + 2 dry wool flannel wraps',
      'Large boiling pot over rocket stove or cooktop',
      'Basin of cold spring/well water + washcloth for forehead',
      'Hot foot bath bucket (40°C–43°C) to draw blood downward'
    ],
    steps: [
      'Place patient’s feet in a warm-to-hot foot bath (40°C–43°C) and keep a cool, damp cloth on the forehead whenever the body heats up.',
      'Wring a folded towel out of boiling water until no drips remain, wrap inside dry wool flannel, and place over the chest or spine over a dry towel layer.',
      'Leave the hot fomentation in place for 3 to 4 minutes until skin is briskly erythematous (pink and warm).',
      'Remove the hot pack and immediately wipe the chest briskly for 45 seconds with a cloth wrung out of cold water, then dry quickly.',
      'Repeat for 3 complete hot-and-cold cycles, always ending with the brief cold application and 30 minutes of dry horizontal rest under a sheet.'
    ],
    physiology: 'Alternating vasodilation (hot) and vasoconstriction (cold) acts as a vascular pump, tripling leukocytosis (white blood cell migration) and relieving pulmonary capillary stasis.',
    contraindications: 'Never apply intense heat to insensate skin (diabetic neuropathy), paralyzed limbs, active hemorrhage, or directly over suspected malignancy.',
    egwCitation: '“The application of water is a simple and effective means of relieving congestion and equalizing the circulation.” — Medical Ministry, p. 227'
  },
  {
    id: 'hot-foot-bath',
    title: '02. Derivative hot foot bath',
    indication: 'Congestive throbbing headaches, early onset colds/influenza, pelvic congestion, and insomnia.',
    hotTemp: 'Starting at 39°C (102°F), gradually raised to 43°C–45°C (110°F–113°F)',
    coldTemp: '12°C (55°F) cold pour over ankles at conclusion + cool compress to forehead',
    duration: '15 to 25 minutes, followed by 20 minutes of horizontal rest',
    equipment: [
      'Deep bucket or basin reaching mid-calf',
      'Kettle of hot water + pitcher of cold spring water',
      'Cold compress cloth for forehead and back of neck',
      'Sheet and blanket to drape patient from neck to floor'
    ],
    steps: [
      'Seat the patient comfortably wrapped in a sheet and blanket; immerse feet in 39°C (102°F) water up to mid-calf.',
      'Slowly add hot water along the side of the bucket (shielding the patient’s feet with your hand) until water reaches 43°C–45°C.',
      'As soon as the patient begins to perspire, apply a cold compress to the forehead and back of neck to prevent cerebral congestion.',
      'After 15–20 minutes, lift the feet above the water, pour cold water briskly over the feet and ankles for 10 seconds, dry thoroughly between toes, and have patient rest in bed.'
    ],
    physiology: 'Dilates the large vascular beds of the feet and lower legs, drawing excess blood volume away from congested cerebral, nasal, pulmonary, or pelvic vessels.',
    contraindications: 'Contraindicated in peripheral arterial disease (PAD), diabetic sensory loss, or severe varicose ulcers. Always test temperature first.',
    egwCitation: '“A hot foot bath and a cool compress on the head will often relieve brain congestion without a single grain of poisonous drugs.” — Counsels on Health, p. 91'
  },
  {
    id: 'heating-compress',
    title: '03. Throat & joint heating compress',
    indication: 'Sore throat, tonsillitis, laryngitis, earache, or sub-acute joint/muscle inflammation.',
    hotTemp: 'Body heat warms the compress naturally over 4–8 hours (overnight)',
    coldTemp: '15°C (60°F) initial cold linen strip wrung thoroughly dry',
    duration: 'Applied at bedtime and worn overnight (6–8 hours)',
    equipment: [
      '1 thin cotton or linen strip (2.5 inches wide for throat)',
      '1 wider dry wool flannel strip (3.5 inches wide) to overlap completely',
      'Safety pins to secure snugly so no air leaks in'
    ],
    steps: [
      'Wring the inner thin cotton strip out of cool water so it is damp but not dripping.',
      'Wrap the damp cotton strip smoothly around the throat (below the chin and up toward the ears below the jaw).',
      'Immediately cover the damp cotton completely with a wider, dry wool flannel strip, overlapping at least 1cm on top and bottom so no outside air can enter.',
      'Pin securely so it stays snug during sleep; by morning the inner cloth should be warm and nearly dry. Sponge neck with cool water upon removal.'
    ],
    physiology: 'Initial cool contact causes brief vasoconstriction followed by sustained, gentle reflex vasodilation trapped by the wool layer, bringing oxygenated blood and phagocytes to the pharynx all night.',
    contraindications: 'If the patient is too chilled or weak to warm the compress within 15 minutes, replace with a dry warm wrap.',
    egwCitation: '“Simple water treatments, skilfully applied, will save many a life that would otherwise be lost.” — The Ministry of Healing, p. 237'
  },
  {
    id: 'tepid-sponging',
    title: '04. Evaporative tepid sponging for high fever',
    indication: 'High febrile states (>39°C / 102.2°F) where skin is hot, dry, and flushed (only when patient is NOT shivering).',
    hotTemp: 'Keep feet warm with a hot water bottle if feet feel cool!',
    coldTemp: 'Tepid water at 30°C–34°C (86°F–93°F) — never ice-cold water',
    duration: '15–20 minutes, exposing and sponging one limb at a time',
    equipment: [
      'Basin of tepid water (30°C–34°C)',
      '2 soft cotton washcloths + dry sheet',
      'Hot water bottle wrapped in towel for the feet'
    ],
    steps: [
      'Check the patient’s feet first: if the feet are cool or the patient is shivering, warm the feet first before any cooling sponge.',
      'Keep the patient covered with a sheet; uncover only ONE arm at a time, sponge with long slow strokes of tepid water, and allow moisture to evaporate for 30 seconds before patting dry and re-covering.',
      'Proceed systematically: Right arm → Left arm → Chest & Abdomen → Right leg → Left leg → Back and Spine.',
      'Offer sips of pure water or warm lemongrass herbal infusion every 15 minutes to replace insensible fluid loss.'
    ],
    physiology: 'Tepid water avoids cutaneous vasoconstriction and shivering (which would trap internal core heat), allowing gentle evaporative heat transfer from dilated surface capillaries.',
    contraindications: 'Never apply cold or tepid sponging during a rigor/chill phase or when extremities are cold and cyanotic.',
    egwCitation: '“Water can be used in many ways to relieve suffering. Drafts of clear, warm water taken before eating... and outward applications of water are safe and rational.” — 2SM 296'
  }
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
    name: 'Pulverized hardwood charcoal (poultice & slurry)',
    chichewaName: 'Makala a Mtengo Wouma',
    partUsed: 'Cleanly burned non-toxic hardwood (Eucalyptus, Acacia, or Fruitwood) ground to superfine powder',
    primaryUses: 'Poisonous insect/snake bites, infected wounds, severe gastroenteritis/diarrhea, eye inflammation (poultice), and abdominal bloating.',
    preparationProtocol: 'Slurry: Stir 1–2 tablespoons superfine charcoal into a tall glass of pure water; drink supernatant or full slurry between meals (keep 2 hours away from needed medications). Poultice: Mix 3 tbsp charcoal + 3 tbsp ground flaxseed or cassava starch with boiling water into a paste, spread between thin cotton gauze, cover with plastic wrap to retain moisture, and apply over inflamed tissue for 4–8 hours.',
    egwOrScientificNote: '“One of the most beneficial remedies is pulverized charcoal, placed in a bag and used in fomentations. This is a most successful remedy.” — Ellen G. White, 2 Selected Messages, p. 294.'
  },
  {
    id: 'moringa-leaf',
    name: 'Moringa oleifera shade-dried leaf powder',
    chichewaName: 'Chamwamba / Kangaluni',
    partUsed: 'Fresh pinnae leaves harvested in morning and dried indoors in shade (never direct sun to protect Vitamins A and C)',
    primaryUses: 'Iron-deficiency anemia, maternal lactation support, childhood micronutrient recovery, and dry-season greens reserve.',
    preparationProtocol: 'Strip leaflets from stems, wash in clean water, spread on mesh racks in ventilated shaded room for 48–72 hours until crisp, pound in clean mortar, and store in dark airtight jars. Stir 1 teaspoon into warm porridge or sinjiro sauce after removing the pot from fire.',
    egwOrScientificNote: 'Contains 7x the Vitamin C of oranges, 4x the calcium of milk, and complete plant amino acids — thriving across Malawi’s Lakeshore, Shire Valley, and Mid-Elevation zones.'
  },
  {
    id: 'ginger-turmeric-poultice',
    name: 'Ginger & turmeric circulatory compress',
    chichewaName: 'Chikasu & Tsobola Wamtengo (Thandizo la Magazi)',
    partUsed: 'Freshly grated Zingiber officinale (Ginger) and Curcuma longa (Turmeric) rhizomes',
    primaryUses: 'Sluggish peripheral circulation, arthritic joint stiffness, sore muscles after heavy hoeing, and non-broken sprains.',
    preparationProtocol: 'Simmer 2 tablespoons grated fresh ginger and 1 tablespoon turmeric in 1 liter of water for 10 minutes (covered). Dip folded cotton cloth into hot decoction, wring out, and apply over stiff joint or lumbar region for 15 minutes, followed by a brisk cool wipe.',
    egwOrScientificNote: 'A traditional warm compress stimulating local blood flow. Stop if skin gets sore, and seek clinical care if pain or swelling continues.'
  },
  {
    id: 'guava-leaf-tea',
    name: 'Young guava leaf astringent decoction',
    chichewaName: 'Masamba a Gwafa',
    partUsed: 'Young, tender apical leaves of Psidium guajava',
    primaryUses: 'Acute watery diarrhea, mild dysentery, sore gums/mouthwash, and cleansing superficial skin abrasions.',
    preparationProtocol: 'Wash 6–8 young tender guava leaves, tear into pieces, steep in 500ml boiling water for 12 minutes, strain, and sip 1/2 cup warm every 2–3 hours alongside oral rehydration water and charcoal.',
    egwOrScientificNote: 'Rich in quercetin and natural plant tannins that tighten inflamed intestinal mucosa and inhibit enteropathogenic bacteria.'
  },
  {
    id: 'aloe-honey-dressing',
    name: 'Fresh aloe vera & raw forest honey dressing',
    chichewaName: 'Chinziri & Uchi Weniweni',
    partUsed: 'Clear inner mucilaginous fillet of Aloe barbadensis + raw unheated Malawi forest honey',
    primaryUses: 'First- and second-degree kitchen/fire burns, sunburn, and clean granulating wounds.',
    preparationProtocol: 'After cooling a burn immediately under cool running water for 15 minutes, slice fresh Aloe leaf with sterilized knife, rinse off yellow bitter latex, and apply clear inner gel or a thin layer of raw unheated honey under sterile gauze.',
    egwOrScientificNote: 'Raw honey’s high osmolarity and enzymatic hydrogen peroxide release create a moist, antimicrobial barrier that accelerates epithelial regeneration.'
  }
];

export type HealthSectionTab =
  | 'eight-laws'
  | 'evidence'
  | 'hydrotherapy'
  | 'apothecary'
  | 'outreach';

export function MedicalMissionarySanitarium({
  initialSection = 'eight-laws'
}: {
  initialSection?: HealthSectionTab;
}) {
  const [activeTab, setActiveTab] = useState<HealthSectionTab>(initialSection);
  const [selectedHydroId, setSelectedHydroId] = useState<string>(HYDROTHERAPY_PROTOCOLS[0].id);

  useEffect(() => {
    setActiveTab(initialSection);
  }, [initialSection]);

  const activeHydro =
    HYDROTHERAPY_PROTOCOLS.find((p) => p.id === selectedHydroId) || HYDROTHERAPY_PROTOCOLS[0];

  const tabs = [
    { id: 'eight-laws' as const, label: 'Eight Laws of Health', icon: HeartPulse },
    { id: 'evidence' as const, label: 'Scientific & Ecological Evidence', icon: FlaskConical },
    { id: 'hydrotherapy' as const, label: 'Hydrotherapy Protocols', icon: Droplets },
    { id: 'apothecary' as const, label: 'Charcoal & Botanical Apothecary', icon: Leaf },
    { id: 'outreach' as const, label: 'Medical Missionary & Home', icon: Heart }
  ];

  return (
    <div className="flex flex-col gap-6 text-[var(--ink)]">
      {/* 1. Calm Medical Safety Disclaimer */}
      <div
        role="alert"
        className="p-4 rounded-[var(--radius-card)] bg-amber-500/10 border border-amber-600/25 flex items-start gap-3 shadow-xs"
      >
        <ShieldAlert size={18} className="text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
        <p className="text-[13px] leading-relaxed text-[var(--ink)]">
          Home-care stewardship and rational remedies guide, not a substitute for emergency medicine. For acute poisoning, venomous snakebite, internal hemorrhage, high unremitting fever, or infant illness, seek the nearest clinical health facility immediately.
        </p>
      </div>

      {/* 2. Spiritual Foundation & 1844 Sanctuary Cleansing Banner */}
      <SpiritualSanctuaryBanner />

      {/* 3. Main Health Section Navigation Tabs */}
      <div className="border-b border-[var(--border)] pb-1">
        <div
          role="tablist"
          aria-label="Health Section Navigation"
          className="flex flex-nowrap items-center gap-1.5 p-1 rounded-[var(--radius-control)] bg-[var(--surface)] border border-[var(--border)] overflow-x-auto no-scrollbar scroll-smooth"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-3.5 py-2 rounded-[var(--radius-control)] text-[12px] font-sans font-medium whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-all cursor-pointer select-none',
                  isActive
                    ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-semibold shadow-xs'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--ground)]'
                )}
              >
                <Icon size={14} className="shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ====================================================================
          TAB 1: EIGHT LAWS OF HEALTH (DETAILED THEOLOGICAL & SCIENTIFIC VIEW)
      ==================================================================== */}
      {activeTab === 'eight-laws' && <EightLawsDetailedView />}

      {/* ====================================================================
          TAB 2: SCIENTIFIC, BEHAVIORAL & ECOLOGICAL EVIDENCE (UN FAO & CLINICAL)
      ==================================================================== */}
      {activeTab === 'evidence' && <ScientificEvidenceSection />}

      {/* ====================================================================
          TAB 3: HYDROTHERAPY PROTOCOLS (CLINICAL CONTRAST MECHANICS)
      ==================================================================== */}
      {activeTab === 'hydrotherapy' && (
        <div className="flex flex-col gap-6">
          <div className="p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-2">
            <span className="text-[12px] font-sans font-medium text-[var(--accent)]">
              Autogenous vascular modulation
            </span>
            <h3 className="font-serif text-[18px] sm:text-[22px] font-bold text-[var(--ink)]">
              Clinical rational hydrotherapy protocols
            </h3>
            <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed max-w-[80ch]">
              Water therapy manipulates systemic hemodynamics without depositing synthetic chemical residues within hepatic and renal filtration tissues. Alternating hot and cold applications stimulates arterial circulation to congested visceral organs and accelerates lymphatic clearance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Protocol Selector List */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              {HYDROTHERAPY_PROTOCOLS.map((protocol) => {
                const isSelected = selectedHydroId === protocol.id;
                return (
                  <button
                    key={protocol.id}
                    type="button"
                    onClick={() => setSelectedHydroId(protocol.id)}
                    className={cn(
                      'p-3.5 rounded-[var(--radius-control)] border text-left transition-all cursor-pointer flex flex-col gap-1',
                      isSelected
                        ? 'bg-[var(--surface)] border-[var(--accent)] ring-1 ring-[var(--accent)] shadow-xs'
                        : 'bg-[var(--surface)] border-[var(--border)] hover:border-[var(--accent)]/50'
                    )}
                  >
                    <span className="font-serif font-bold text-[13px] text-[var(--ink)]">
                      {protocol.title}
                    </span>
                    <span className="text-[12px] text-[var(--ink-muted)] line-clamp-1">
                      {protocol.indication}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Protocol Detailed Card */}
            <div className="lg:col-span-8 p-5 sm:p-6 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-5 text-[13px]">
              <div className="flex flex-col gap-1 border-b border-[var(--border)] pb-3">
                <span className="text-[12px] font-mono text-[var(--accent)] font-semibold">
                  Protocol Specification
                </span>
                <h4 className="font-serif text-[20px] font-bold text-[var(--ink)]">
                  {activeHydro.title}
                </h4>
                <p className="text-[13px] text-[var(--ink-muted)]">
                  <strong>Indication: </strong>
                  {activeHydro.indication}
                </p>
              </div>

              {/* Temperature & Duration Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] font-mono text-[12px] tabular-nums">
                <div>
                  <span className="text-[11px] text-[var(--ink-muted)] block">Hot phase:</span>
                  <span className="font-semibold text-amber-700 dark:text-amber-300">
                    {activeHydro.hotTemp}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-[var(--ink-muted)] block">Cold phase:</span>
                  <span className="font-semibold text-sky-700 dark:text-sky-300">
                    {activeHydro.coldTemp}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-[var(--ink-muted)] block">Duration:</span>
                  <span className="font-semibold text-[var(--ink)]">
                    {activeHydro.duration}
                  </span>
                </div>
              </div>

              {/* Equipment */}
              <div className="flex flex-col gap-1.5">
                <span className="font-serif font-bold text-[14px] text-[var(--ink)]">
                  Required equipment &amp; supplies:
                </span>
                <ul className="space-y-1 text-[var(--ink-muted)]">
                  {activeHydro.equipment.map((eq, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[var(--accent)] font-bold">&middot;</span>
                      <span>{eq}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step by Step Execution */}
              <div className="flex flex-col gap-1.5">
                <span className="font-serif font-bold text-[14px] text-[var(--ink)]">
                  Step-by-step treatment procedure:
                </span>
                <ol className="space-y-2 text-[var(--ink)]">
                  {activeHydro.steps.map((st, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded-xs bg-[var(--ground)] border border-[var(--border)] shrink-0 mt-0.5">
                        0{i + 1}
                      </span>
                      <span className="leading-relaxed">{st}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Physiological Mechanism */}
              <div className="p-3.5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-1 text-[12px]">
                <strong className="text-[var(--ink)]">Physiological vascular mechanism:</strong>
                <p className="text-[var(--ink-muted)] leading-relaxed">
                  {activeHydro.physiology}
                </p>
              </div>

              {/* Contraindications */}
              <div className="p-3.5 rounded-[var(--radius-control)] bg-rose-500/10 border border-rose-500/25 flex flex-col gap-1 text-[12px]">
                <strong className="text-rose-800 dark:text-rose-200">Contraindications &amp; cautions:</strong>
                <p className="text-rose-900/80 dark:text-rose-200/80 leading-relaxed">
                  {activeHydro.contraindications}
                </p>
              </div>

              <span className="italic text-[12px] text-[var(--ink-muted)]">
                {activeHydro.egwCitation}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          TAB 4: BOTANICAL APOTHECARY & TROPICAL DISPENSARY
      ==================================================================== */}
      {activeTab === 'apothecary' && (
        <div className="flex flex-col gap-8">
          <div className="p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-2">
            <span className="text-[12px] font-sans font-medium text-[var(--accent)]">
              God's simple remedies
            </span>
            <h3 className="font-serif text-[18px] sm:text-[22px] font-bold text-[var(--ink)]">
              Charcoal, botanical poultices, and tropical dispensary
            </h3>
            <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed max-w-[80ch]">
              God has placed in the soil, trees, and simple plants medicinal agencies capable of neutralizing toxins and supporting cellular repair without the toxic residues of synthetic commercial pharmaceuticals.
            </p>
          </div>

          {/* 5 Core Apothecary Remedies Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {APOTHECARY_REMEDIES.map((rem) => (
              <div
                key={rem.id}
                className="p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col justify-between gap-4 text-[13px]"
              >
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-start justify-between gap-2 border-b border-[var(--border)] pb-2.5">
                    <div>
                      <h4 className="font-serif text-[16px] font-bold text-[var(--ink)] leading-snug">
                        {rem.name}
                      </h4>
                      <span className="text-[12px] text-[var(--accent)] font-medium italic">
                        {rem.chichewaName}
                      </span>
                    </div>
                    <Leaf size={16} className="text-[var(--accent)] shrink-0 mt-0.5" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-sans text-[var(--ink-muted)] font-semibold">
                      Primary indications:
                    </span>
                    <p className="text-[var(--ink)] leading-relaxed">
                      {rem.primaryUses}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-sans text-[var(--ink-muted)] font-semibold">
                      Preparation &amp; dosage protocol:
                    </span>
                    <p className="text-[var(--ink-muted)] leading-relaxed">
                      {rem.preparationProtocol}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)] text-[12px] text-[var(--ink-muted)] italic">
                  {rem.egwOrScientificNote}
                </div>
              </div>
            ))}
          </div>

          {/* Full Tropical Sanitarium Dispensary Table */}
          <div className="pt-4 border-t border-[var(--border)] flex flex-col gap-4">
            <h4 className="font-serif text-[18px] font-bold text-[var(--ink)]">
              Tropical Sanitarium Dispensary Compendium
            </h4>
            <TropicalSanitariumDispensary />
          </div>
        </div>
      )}

      {/* ====================================================================
          TAB 5: MEDICAL MISSIONARY MINISTRY & HOME HEALTH STEWARDSHIP
      ==================================================================== */}
      {activeTab === 'outreach' && <MedicalMissionaryOutreachView />}
    </div>
  );
}
