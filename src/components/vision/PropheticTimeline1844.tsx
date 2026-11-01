import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Compass,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SANCTUARY_BLUEPRINT_THEME } from '@/theme';
import { getQuoteById } from '@/data/sources/quotes';

export interface PropheticEpoch {
  id: string;
  stageNumber: string;
  eraLabel: string;
  shortTitle: string;
  title: string;
  subtitle: string;
  scriptureRef: string;
  scriptureText: string;
  scriptureSource: string;
  quoteId: string;
  standardEgwCode: string;
  egwUrl: string;
  imageSrc: string;
  imageCaption: string;
  summary: string;
  theologicalSignificance: string;
  countryLivingDirective: string;
  actionLink: {
    label: string;
    to: string;
  };
}

export const PROPHETIC_EPOCHS_1844: PropheticEpoch[] = [
  {
    id: '1844-sanctuary',
    stageNumber: '01',
    eraLabel: 'October 22, 1844',
    shortTitle: '1844 Sanctuary judgment',
    title: 'The cleansing of the heavenly sanctuary & investigative judgment',
    subtitle: 'Fulfillment of Daniel 8:14 (457 BC – AD 1844) & opening of the Most Holy Place',
    scriptureRef: 'Daniel 8:14; Revelation 11:19',
    scriptureText: 'Unto two thousand and three hundred days; then shall the sanctuary be cleansed.',
    scriptureSource: 'Daniel 8:14 (KJV)',
    quoteId: 'gc-480-investigative-judgment',
    standardEgwCode: 'GC 480.1',
    egwUrl: 'https://m.egwwritings.org/en/book/132.2215#2215',
    imageSrc: '/assets/images/sanctuary_1844_judgment_1790840528333.jpg',
    imageCaption: 'Christ entering the Most Holy Place before the Ark of the Testament on October 22, 1844.',
    summary:
      'In 1844, at the end of the 2,300 prophetic days of Daniel 8:14, Jesus entered the Most Holy Place of the heavenly sanctuary to begin the work of investigative judgment. This pivotal moment established the Seventh-day Adventist theological foundation and initiated God’s final call for a prepared people.',
    theologicalSignificance:
      'The investigative judgment reveals God’s righteousness before the entire universe. It demonstrates that salvation is grounded in Christ’s atonement while validating the faith of all who have received His grace. The sanctuary doctrine forms the architectural key that unlocks prophetic timelines.',
    countryLivingDirective:
      'Understanding that probation is moving toward its close impels families to simplify their lives, escape the artificial complexities of modern cities, and establish homesteads where characters can be purified under God’s direct hand.',
    actionLink: {
      label: 'Explore 1844 timeline',
      to: '/vision',
    },
  },
  {
    id: 'three-angels',
    stageNumber: '02',
    eraLabel: '1844 – Present Day',
    shortTitle: 'Three angels’ messages',
    title: 'The everlasting gospel & call out of Babylon',
    subtitle: 'Proclamation of Revelation 14:6–12 across every nation, kindred, tongue & people',
    scriptureRef: 'Revelation 14:6–12',
    scriptureText: 'Fear God, and give glory to him; for the hour of his judgment is come: and worship him that made heaven, and earth.',
    scriptureSource: 'Revelation 14:7 (KJV)',
    quoteId: '9t-11-three-angels-last-message',
    standardEgwCode: '9T 19.1',
    egwUrl: 'https://m.egwwritings.org/en/book/114.73#73',
    imageSrc: '/assets/images/three_angels_proclamation_1790840540260.jpg',
    imageCaption: 'The three angels proclaiming the everlasting gospel and judgment hour to every tribe and people.',
    summary:
      'The three angels’ messages of Revelation 14 represent heaven’s final warning to planet Earth. Calling all souls to worship the Creator, reject the false worship systems of Babylon, and keep the commandments of God and the faith of Jesus.',
    theologicalSignificance:
      'These messages restore the forgotten biblical Sabbath as the seal of the Creator, unmask the spiritual deceptions of apostate religion, and commission an international movement of medical missionary workers and truth-bearers.',
    countryLivingDirective:
      'Country outposts serve as training bases and launchpads for sharing the three angels’ messages with urban populations. Ministry from rural centers prevents families from being contaminated by urban secularism while serving the cities.',
    actionLink: {
      label: 'Inspect outpost blueprints',
      to: '/outpost',
    },
  },
  {
    id: 'sunday-law',
    stageNumber: '03',
    eraLabel: 'Approaching Crisis',
    shortTitle: 'National Sunday law',
    title: 'The enforcement of false worship & constitutional crisis',
    subtitle: 'Legislative compulsion in fulfillment of Revelation 13:11–17',
    scriptureRef: 'Revelation 13:11–17; 5T 464.3',
    scriptureText: 'And that no man might buy or sell, save he that had the mark, or the name of the beast.',
    scriptureSource: 'Revelation 13:17 (KJV)',
    quoteId: '5t-464-leaving-cities-signal',
    standardEgwCode: '5T 464.3',
    egwUrl: 'https://m.egwwritings.org/en/book/119.2311#2311',
    imageSrc: '/assets/images/buying_selling_1790182041804.jpg',
    imageCaption: 'Urban legislative decree restricting food, commerce, and movement for dissenters.',
    summary:
      'Prophecy warns of a coming worldwide crisis where civil governments mandate religious observance contrary to God’s law. This legislative act triggers economic boycotts, loss of civil liberties, and an explicit test of loyalty to God.',
    theologicalSignificance:
      'The Sunday law tests every living soul between human tradition and God’s immutable law. It serves as the sovereign signal for God’s people that physical departure from cities is no longer merely advantageous, but mandatory.',
    countryLivingDirective:
      'As the siege of Jerusalem was the signal for early Christians to flee to Pella, so the enactment of Sunday laws is God’s signal to abandon city centers entirely and occupy rural havens with food, water, and shelter already secured.',
    actionLink: {
      label: 'Scout rural districts',
      to: '/scout',
    },
  },
  {
    id: 'loud-cry',
    stageNumber: '04',
    eraLabel: 'The Latter Rain',
    shortTitle: 'The loud cry',
    title: 'Outpouring of the Holy Spirit & final global invitation',
    subtitle: 'Revelation 18:1–4 · The earth lightened with God’s glory during planetary crisis',
    scriptureRef: 'Revelation 18:1–4; Joel 2:28–32',
    scriptureText: 'And after these things I saw another angel come down from heaven, having great power; and the earth was lightened with his glory.',
    scriptureSource: 'Revelation 18:1 (KJV)',
    quoteId: 'gc-611-loud-cry-latter-rain',
    standardEgwCode: 'GC 611.1',
    egwUrl: 'https://m.egwwritings.org/en/book/132.2811#2811',
    imageSrc: '/assets/images/open_air_labor_1790182055111.jpg',
    imageCaption: 'Rural workers preaching with Holy Spirit power in fields, villages, and towns.',
    summary:
      'Under the power of the Latter Rain, the message of truth swells into a global loud cry. Thousands respond simultaneously, stepping out from religious confusion into the clear light of obedience and faith.',
    theologicalSignificance:
      'The loud cry demonstrates that God never executes final judgment without granting every human being a clear, convicting opportunity to choose life. Miraculous healings, spiritual power, and unmistakable truth accompany this work.',
    countryLivingDirective:
      'Outposts in Malawi and across the nations become spiritual sanctuaries where newly convinced believers can gather, receive medical missionary training, and find shelter from the collapsing urban social systems.',
    actionLink: {
      label: 'Review agricultural skills',
      to: '/skills',
    },
  },
  {
    id: 'probation-closes',
    stageNumber: '05',
    eraLabel: 'The Solemn Moment',
    shortTitle: 'Close of probation',
    title: 'Christ finishes heavenly intercession',
    subtitle: 'Revelation 22:11 · The census of heaven is complete & the sanctuary doors close',
    scriptureRef: 'Revelation 22:11; Daniel 12:1',
    scriptureText: 'He that is unjust, let him be unjust still: and he which is filthy, let him be filthy still: and he that is righteous, let him be righteous still: and he that is holy, let him be holy still.',
    scriptureSource: 'Revelation 22:11 (KJV)',
    quoteId: 'gc-613-probation-closes',
    standardEgwCode: 'GC 613.2',
    egwUrl: 'https://m.egwwritings.org/en/book/132.2825#2825',
    imageSrc: '/assets/images/second_coming_deliverance_1790840555721.jpg',
    imageCaption: 'The golden censer cast down; Christ removes His priestly garments and prepares to deliver His people.',
    summary:
      'When every individual has settled into either loyalty or rebellion, Jesus completes His intercession in the heavenly sanctuary. He casts down the golden censer, and the solemn declaration of Revelation 22:11 echoes through creation.',
    theologicalSignificance:
      'The close of probation marks the end of human opportunity to accept salvation. The righteous are permanently sealed with God’s holy name, and the wicked are confirmed in their chosen path.',
    countryLivingDirective:
      'Those who delayed country living until this moment find themselves trapped in chaotic cities without food, water, or spiritual peace. Those who obeyed early rest securely on rural land under divine protection.',
    actionLink: {
      label: 'Assess property readiness',
      to: '/calculators',
    },
  },
  {
    id: 'time-of-trouble',
    stageNumber: '06',
    eraLabel: 'Seven Last Plagues',
    shortTitle: 'Time of trouble & jacob’s night',
    title: 'Planetary collapse & the deliverance of the saints',
    subtitle: 'Daniel 12:1 & Jeremiah 30:5–7 · The seven last plagues poured out upon the unrepentant',
    scriptureRef: 'Daniel 12:1; Jeremiah 30:7; GC 616',
    scriptureText: 'And at that time shall Michael stand up... and there shall be a time of trouble, such as never was since there was a nation.',
    scriptureSource: 'Daniel 12:1 (KJV)',
    quoteId: 'gc-616-jacobs-trouble',
    standardEgwCode: 'GC 616.1',
    egwUrl: 'https://m.egwwritings.org/en/book/132.2841#2841',
    imageSrc: '/assets/images/mountain_flight_1790181985596.jpg',
    imageCaption: 'The faithful sheltered in mountain clefts, forests, and remote hills while plagues strike.',
    summary:
      'Without heavenly restraint, the elements and nations erupt in unprecedented conflict. God’s faithful people pass through the refining crucible of Jacob’s time of trouble, wrestling with God in deep faith until deliverance arrives.',
    theologicalSignificance:
      'This final trial purifies God’s remnant from every remaining trace of self-reliance. Divine angels guard every humble mountain retreat, ensuring that bread and water are made sure as promised in Isaiah 33:16.',
    countryLivingDirective:
      'Homesteads nestled among mountain ranges (like Dedza, Mulanje, or Nyika) provide isolation from angry mobs and access to perennial gravity springs, deep soil, and natural rock shelters.',
    actionLink: {
      label: 'Review highland microclimates',
      to: '/almanac',
    },
  },
  {
    id: 'second-coming',
    stageNumber: '07',
    eraLabel: 'Consummation & Glory',
    shortTitle: 'Second coming of Christ',
    title: 'The king of kings appears in the clouds of heaven',
    subtitle: '1 Thessalonians 4:16–17 & Revelation 1:7 · Resurrection of the righteous & eternal home',
    scriptureRef: '1 Thessalonians 4:16–17; Revelation 1:7; GC 640',
    scriptureText: 'For the Lord himself shall descend from heaven with a shout, with the voice of the archangel, and with the trump of God: and the dead in Christ shall rise first.',
    scriptureSource: '1 Thessalonians 4:16 (KJV)',
    quoteId: 'gc-640-second-coming-glory',
    standardEgwCode: 'GC 640.3',
    egwUrl: 'https://m.egwwritings.org/en/book/132.2965#2965',
    imageSrc: '/assets/images/second_coming_deliverance_1790840555721.jpg',
    imageCaption: 'The small black cloud expands into the blazing glory of Christ surrounded by ten thousand times ten thousand angels.',
    summary:
      'The heavens part like a scroll as Jesus returns in supreme majesty. The righteous dead are raised incorruptible, the living saints are transformed in the twinkling of an eye, and all are caught up together to meet the Lord in the air.',
    theologicalSignificance:
      'This is the climax of the great controversy between Christ and Satan. Sin, disease, death, and oppression are forever banished as God’s children are welcomed into their edenic inheritance.',
    countryLivingDirective:
      'Every sacrifice made to live quietly in the country, every seed planted in rural soil, and every hardship endured is eclipsed ten thousandfold by the eternal joy of looking up into the face of our Redeemer.',
    actionLink: {
      label: 'Explore homestead goals',
      to: '/getting-started',
    },
  },
];

/**
 * Bespoke Vector Diagram for each of the 7 Prophetic Epochs from 1844 to the Second Coming
 */
function EpochVectorSchematic({ epochId }: { epochId: string }) {
  const epoch =
    PROPHETIC_EPOCHS_1844.find((e) => e.id === epochId) || PROPHETIC_EPOCHS_1844[0];

  return (
    <div className="w-full h-full min-h-[210px] rounded-[var(--radius-card)] bg-[var(--surface-muted)] border border-[var(--border)] p-4 sm:p-5 flex flex-col justify-between gap-3 text-[var(--ink)] select-none shadow-sm">
      {/* Top Header: Stage badge, era label, standard EGW reference */}
      <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-7 h-7 rounded-[var(--radius-control)] bg-[var(--accent)] text-white flex items-center justify-center font-mono text-xs font-bold shrink-0">
            {epoch.stageNumber}
          </span>
          <span className="text-xs font-sans font-semibold text-[var(--gold)] truncate">
            {epoch.eraLabel}
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] text-xs font-mono text-[var(--moss)] dark:text-[var(--gold)] font-bold shrink-0">
          {epoch.standardEgwCode}
        </span>
      </div>

      {/* Main Content: Title & Plain-Language Summary */}
      <div className="flex flex-col gap-1.5">
        <h4 className="font-serif text-sm sm:text-base font-bold text-[var(--ink)] line-clamp-1">
          {epoch.shortTitle}
        </h4>
        <p className="text-xs text-[var(--ink-muted)] leading-relaxed line-clamp-3">
          {epoch.summary}
        </p>
      </div>

      {/* Footer: Scripture badge & Stage index */}
      <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between gap-2 text-xs">
        <span className="font-mono text-xs text-[var(--moss)] dark:text-[var(--gold)] truncate">
          📖 {epoch.scriptureRef}
        </span>
        <span className="text-xs font-mono tabular-nums text-[var(--ink-muted)] font-semibold shrink-0">
          Stage {epoch.stageNumber}/07
        </span>
      </div>
    </div>
  );
}

export function PropheticTimeline1844() {
  const [activeEpochId, setActiveEpochId] = useState<string>('1844-sanctuary');
  const [viewMode, setViewMode] = useState<'interactive' | 'sanctuary-blueprint' | 'panorama-grid'>('interactive');
  const [lightboxEpoch, setLightboxEpoch] = useState<PropheticEpoch | null>(null);

  const activeIndex = PROPHETIC_EPOCHS_1844.findIndex((e) => e.id === activeEpochId);
  const activeEpoch = PROPHETIC_EPOCHS_1844[activeIndex] || PROPHETIC_EPOCHS_1844[0];

  const handlePrev = () => {
    const nextIdx =
      (activeIndex - 1 + PROPHETIC_EPOCHS_1844.length) % PROPHETIC_EPOCHS_1844.length;
    setActiveEpochId(PROPHETIC_EPOCHS_1844[nextIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % PROPHETIC_EPOCHS_1844.length;
    setActiveEpochId(PROPHETIC_EPOCHS_1844[nextIdx].id);
  };

  return (
    <section
      id="prophetic-timeline-1844"
      aria-label="1844 to Second Coming Prophetic Timeline and Vector Atlas"
      className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8"
    >
      {/* 1. INTERACTIVE 1844–ENDTIME PROPHETIC TIMELINE & DOSSIER */}
      <div className="rounded-[var(--radius-sheet)] bg-[var(--surface)] border border-[var(--border)] p-5 sm:p-8 shadow-sm flex flex-col gap-6 relative overflow-hidden transition-colors">
        {/* Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-5 border-b border-[var(--border)]">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-sans text-[var(--moss)] dark:text-[var(--gold)] font-semibold">
              <Sparkles size={13} className="text-[var(--accent)]" />
              <span>Prophetic sanctuary &amp; country living sequence · 1844 to consummation</span>
              <span aria-hidden="true" className="text-[var(--ink-muted)]">
                ·
              </span>
              <span className="font-mono">Daniel 8:14 · Revelation 13–18 · 5T 464.3</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[var(--ink)] tracking-tight">
              End-time prophetic milestones from 1844 to the second coming
            </h2>
            <p className="text-xs sm:text-sm text-[var(--ink-muted)] max-w-3xl leading-relaxed">
              Explore seven key prophetic milestones in the timeline cards below to inspect their biblical foundation, standard EGW reference codes, and practical country living directives.
            </p>
          </div>

          {/* 3-Mode View Switcher + Prev/Next Controls */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto shrink-0">
            <div className="inline-flex items-center p-1 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)]">
              <button
                type="button"
                onClick={() => setViewMode('interactive')}
                className={cn(
                  'px-3.5 py-1.5 rounded-[var(--radius-control)] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap font-sans',
                  viewMode === 'interactive'
                    ? 'bg-[var(--color-moss-light)] text-white shadow-xs'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                )}
              >
                Interactive dossier
              </button>
              <button
                type="button"
                onClick={() => setViewMode('sanctuary-blueprint')}
                className={cn(
                  'px-3.5 py-1.5 rounded-[var(--radius-control)] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap font-sans',
                  viewMode === 'sanctuary-blueprint'
                    ? 'bg-[var(--color-moss-light)] text-white shadow-xs'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                )}
              >
                Sanctuary schematic
              </button>
              <button
                type="button"
                onClick={() => setViewMode('panorama-grid')}
                className={cn(
                  'px-3.5 py-1.5 rounded-[var(--radius-control)] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap font-sans',
                  viewMode === 'panorama-grid'
                    ? 'bg-[var(--color-moss-light)] text-white shadow-xs'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                )}
              >
                All 7 illustrated plates
              </button>
            </div>

            {viewMode === 'interactive' && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-2.5 py-1.5 rounded-[var(--radius-control)] bg-[var(--ground)] hover:bg-[var(--ground)]/80 border border-[var(--border)] text-xs font-semibold text-[var(--ink)] flex items-center gap-1 transition-colors cursor-pointer font-sans"
                  title="Previous milestone"
                >
                  <ChevronLeft size={14} />
                  <span>Prev</span>
                </button>
                <span className="px-2.5 py-1.5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] font-mono text-xs font-bold text-[var(--moss)] dark:text-[var(--gold)] tabular-nums">
                  {activeEpoch.stageNumber}/07
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-2.5 py-1.5 rounded-[var(--radius-control)] bg-[var(--color-moss-light)] hover:bg-[var(--color-moss)] text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer font-sans"
                  title="Next milestone"
                >
                  <span>Next</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* VIEW MODE B: 2300-DAY & TWO-APARTMENT SANCTUARY ARCHITECTURAL VECTOR BLUEPRINT */}
        {viewMode === 'sanctuary-blueprint' && (
          <div className="rounded-[var(--radius-card)] bg-[var(--surface-muted)] border border-[var(--border)] p-4 sm:p-6 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border)] pb-3">
              <div>
                <span className="text-xs font-sans text-[var(--gold)] font-bold">
                  Architectural &amp; prophetic schematic · Daniel 8:14 &amp; Hebrews 8:1–5
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--ink)]">
                  The 2,300 Prophetic Days (457 BC – AD 1844) &amp; Two-Apartment Heavenly Sanctuary
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewMode('interactive')}
                className="px-3.5 py-2 rounded-[var(--radius-control)] bg-[var(--ground)] hover:bg-[var(--ground)]/80 text-[var(--ink)] text-xs font-semibold cursor-pointer self-start sm:self-auto font-sans border border-[var(--border)]"
              >
                ← Back to interactive dossier
              </button>
            </div>

            <div className="w-full overflow-x-auto custom-scrollbar">
              <svg
                viewBox="0 0 920 420"
                className="w-full min-w-[760px] h-auto select-none block"
                role="img"
                aria-label="Detailed Vector Chart of the 2300 Days of Daniel 8:14 and the Heavenly Sanctuary Most Holy Place entered in 1844"
              >
                <rect width="920" height="420" rx="16" fill={SANCTUARY_BLUEPRINT_THEME.bg} />

                {/* TOP HALF: THE 2,300 PROPHETIC YEARS MATHEMATICAL DIAGRAM (457 BC TO 1844) */}
                <rect x="24" y="20" width="872" height="155" rx="12" fill={SANCTUARY_BLUEPRINT_THEME.cardBg} stroke={SANCTUARY_BLUEPRINT_THEME.strokeGreen} strokeWidth="1.5" />
                <text x="44" y="44" fill={SANCTUARY_BLUEPRINT_THEME.textGold} fontSize="14" fontFamily="monospace" fontWeight="bold">
                  I. THE 2,300 PROPHETIC DAYS / YEARS OF DANIEL 8:14 &amp; 9:24–27 (DAY-FOR-A-YEAR PRINCIPLE)
                </text>

                {/* Main 2300-Year Span Bracket */}
                <path d="M 60 72 L 60 60 L 660 60 L 660 72" fill="none" stroke={SANCTUARY_BLUEPRINT_THEME.strokeGold} strokeWidth="2" />
                <text x="360" y="55" textAnchor="middle" fill={SANCTUARY_BLUEPRINT_THEME.textSoftYellow} fontSize="13" fontFamily="monospace" fontWeight="bold">
                  2,300 PROPHETIC YEARS: 490 YEARS (70 WEEKS) + 1,810 YEARS → ENDS OCT 22, 1844
                </text>

                {/* Primary Timeline Axis */}
                <line x1="60" y1="105" x2="860" y2="105" stroke={SANCTUARY_BLUEPRINT_THEME.lineGreen} strokeWidth="4" strokeLinecap="round" />

                {/* 490 Years Sub-Bracket */}
                <path d="M 60 120 L 60 132 L 340 132 L 340 120" fill="none" stroke={SANCTUARY_BLUEPRINT_THEME.strokeSky} strokeWidth="1.8" />
                <text x="200" y="146" textAnchor="middle" fill={SANCTUARY_BLUEPRINT_THEME.textSky} fontSize="12.5" fontFamily="monospace" fontWeight="bold">
                  70 WEEKS (490 YEARS) TO ISRAEL (DAN 9:24)
                </text>

                {/* 1810 Years Sub-Bracket */}
                <path d="M 340 120 L 340 132 L 660 132 L 660 120" fill="none" stroke={SANCTUARY_BLUEPRINT_THEME.strokeAmber} strokeWidth="1.8" />
                <text x="500" y="146" textAnchor="middle" fill={SANCTUARY_BLUEPRINT_THEME.textAmber} fontSize="12.5" fontFamily="monospace" fontWeight="bold">
                  REMAINING 1,810 YEARS TO 1844 (DAN 8:14)
                </text>

                {/* Prophetic Time Nodes */}
                {[
                  { x: 60, year: '457 BC', event: 'Decree', sub: 'Ezra 7', color: SANCTUARY_BLUEPRINT_THEME.nodeDecree },
                  { x: 185, year: 'AD 27', event: 'Anointed', sub: 'Luke 3', color: SANCTUARY_BLUEPRINT_THEME.nodeAnointed },
                  { x: 262, year: 'AD 31', event: 'Cross', sub: 'Mid-Week', color: SANCTUARY_BLUEPRINT_THEME.nodeCross },
                  { x: 340, year: 'AD 34', event: 'Gentiles', sub: 'End 70 Wk', color: SANCTUARY_BLUEPRINT_THEME.nodeGentiles },
                  { x: 660, year: 'OCT 22, 1844', event: 'Sanctuary Cleansed', sub: 'Judgment', color: SANCTUARY_BLUEPRINT_THEME.nodeSanctuary },
                  { x: 845, year: 'CONSUMMATION', event: 'Second Coming', sub: 'Rev 14:14', color: SANCTUARY_BLUEPRINT_THEME.nodeSecondComing },
                ].map((pt) => (
                  <g key={pt.year}>
                    <circle cx={pt.x} cy={105} r="8" fill={pt.color} stroke={SANCTUARY_BLUEPRINT_THEME.nodeWhite} strokeWidth="2" />
                    <text x={pt.x} y={84} textAnchor="middle" fill={SANCTUARY_BLUEPRINT_THEME.nodeWhite} fontSize="13" fontFamily="monospace" fontWeight="bold">
                      {pt.year}
                    </text>
                    <text x={pt.x} y={97} textAnchor="middle" fill={pt.color} fontSize="12" fontFamily="sans-serif" fontWeight="bold">
                      {pt.event}
                    </text>
                    <text x={pt.x} y={165} textAnchor="middle" fill={SANCTUARY_BLUEPRINT_THEME.nodeSubText} fontSize="12" fontFamily="monospace">
                      {pt.sub}
                    </text>
                  </g>
                ))}

                {/* BOTTOM HALF: ARCHITECTURAL CUTAWAY OF THE TWO-APARTMENT SANCTUARY & END-TIME PREPARATION */}
                <rect x="24" y="190" width="872" height="210" rx="12" fill={SANCTUARY_BLUEPRINT_THEME.courtBg} stroke={SANCTUARY_BLUEPRINT_THEME.strokeAmber} strokeWidth="1.5" />
                <text x="44" y="214" fill={SANCTUARY_BLUEPRINT_THEME.textGold} fontSize="14" fontFamily="monospace" fontWeight="bold">
                  II. PLAN OF SALVATION: EARTHLY COURT → HOLY PLACE (AD 31–1844) → MOST HOLY PLACE (SINCE OCT 22, 1844)
                </text>

                {/* Zone 1: Outer Courtyard (AD 31 Cross) */}
                <rect x="44" y="230" width="210" height="148" rx="10" fill={SANCTUARY_BLUEPRINT_THEME.outerCourtBg} stroke={SANCTUARY_BLUEPRINT_THEME.lineGreen} strokeWidth="1.5" />
                <text x="149" y="250" textAnchor="middle" fill={SANCTUARY_BLUEPRINT_THEME.lineGreen} fontSize="13.5" fontFamily="monospace" fontWeight="bold">
                  1. OUTER COURT (EARTH)
                </text>
                {/* Altar of Sacrifice & Laver */}
                <rect x="75" y="278" width="46" height="40" rx="4" fill={SANCTUARY_BLUEPRINT_THEME.altarFill} stroke={SANCTUARY_BLUEPRINT_THEME.altarStroke} strokeWidth="1.8" />
                <path d="M88 278 Q98 256 108 278" fill={SANCTUARY_BLUEPRINT_THEME.altarStroke} />
                <text x="98" y="334" textAnchor="middle" fill={SANCTUARY_BLUEPRINT_THEME.altarText} fontSize="12" fontFamily="monospace" fontWeight="bold">
                  ALTAR (AD 31)
                </text>
                <circle cx="185" cy="298" r="20" fill={SANCTUARY_BLUEPRINT_THEME.laverFill} fillOpacity="0.35" stroke={SANCTUARY_BLUEPRINT_THEME.strokeSky} strokeWidth="1.8" />
                <text x="185" y="334" textAnchor="middle" fill={SANCTUARY_BLUEPRINT_THEME.textSky} fontSize="12" fontFamily="monospace" fontWeight="bold">
                  LAVER OF WATER
                </text>
                <text x="149" y="362" textAnchor="middle" fill={SANCTUARY_BLUEPRINT_THEME.textMint} fontSize="12" fontFamily="sans-serif">
                  Calvary Sacrifice &amp; Rebirth
                </text>

                {/* Arrow 1 -> 2 */}
                <path d="M 256 304 L 284 304" stroke={SANCTUARY_BLUEPRINT_THEME.strokeGold} strokeWidth="2.5" />
                <polygon points="284,299 294,304 284,309" fill={SANCTUARY_BLUEPRINT_THEME.strokeGold} />

                {/* Zone 2: First Apartment / Holy Place (AD 31 – 1844) */}
                <rect x="298" y="230" width="250" height="148" rx="10" fill={SANCTUARY_BLUEPRINT_THEME.holyPlaceBg} stroke={SANCTUARY_BLUEPRINT_THEME.strokeSky} strokeWidth="1.5" />
                <text x="423" y="250" textAnchor="middle" fill={SANCTUARY_BLUEPRINT_THEME.textSky} fontSize="13.5" fontFamily="monospace" fontWeight="bold">
                  2. HOLY PLACE (AD 31 – 1844)
                </text>

                {/* 7-Branched Lampstand, Table of Showbread, Golden Altar of Incense */}
                <g transform="translate(335, 275)">
                  <line x1="20" y1="5" x2="20" y2="42" stroke={SANCTUARY_BLUEPRINT_THEME.strokeGold} strokeWidth="2.5" />
                  <path d="M6 12 Q20 28 34 12" fill="none" stroke={SANCTUARY_BLUEPRINT_THEME.strokeGold} strokeWidth="2" />
                  <path d="M12 8 Q20 20 28 8" fill="none" stroke={SANCTUARY_BLUEPRINT_THEME.strokeGold} strokeWidth="2" />
                  <text x="20" y="56" textAnchor="middle" fill={SANCTUARY_BLUEPRINT_THEME.textAmber} fontSize="12" fontFamily="monospace">7 LAMPS</text>
                </g>
                <g transform="translate(405, 280)">
                  <rect x="0" y="10" width="42" height="26" rx="3" fill={SANCTUARY_BLUEPRINT_THEME.breadFill} stroke={SANCTUARY_BLUEPRINT_THEME.textGold} strokeWidth="1.5" />
                  <text x="21" y="51" textAnchor="middle" fill={SANCTUARY_BLUEPRINT_THEME.textAmber} fontSize="12" fontFamily="monospace">SHOWBREAD</text>
                </g>
                <g transform="translate(482, 278)">
                  <rect x="6" y="8" width="28" height="30" rx="3" fill={SANCTUARY_BLUEPRINT_THEME.incenseFill} stroke={SANCTUARY_BLUEPRINT_THEME.textGold} strokeWidth="1.5" />
                  <path d="M20 8 Q15 -4 25 -8" stroke={SANCTUARY_BLUEPRINT_THEME.incenseSmoke} strokeWidth="1.5" fill="none" />
                  <text x="20" y="53" textAnchor="middle" fill={SANCTUARY_BLUEPRINT_THEME.textAmber} fontSize="12" fontFamily="monospace">INCENSE</text>
                </g>
                <text x="423" y="362" textAnchor="middle" fill={SANCTUARY_BLUEPRINT_THEME.textLightSky} fontSize="12" fontFamily="sans-serif">
                  Daily Intercession of Christ our High Priest
                </text>

                {/* Arrow 2 -> 3 (Oct 22, 1844 Transition through the Second Veil) */}
                <path d="M 550 304 L 584 304" stroke={SANCTUARY_BLUEPRINT_THEME.strokeGold} strokeWidth="3" />
                <polygon points="584,299 596,304 584,310" fill={SANCTUARY_BLUEPRINT_THEME.strokeGold} />
                <text x="573" y="290" textAnchor="middle" fill={SANCTUARY_BLUEPRINT_THEME.textGold} fontSize="12" fontFamily="monospace" fontWeight="bold">
                  1844
                </text>

                {/* Zone 3: Second Apartment / Most Holy Place (Oct 22, 1844 – Close of Probation) */}
                <rect x="600" y="230" width="276" height="148" rx="10" fill={SANCTUARY_BLUEPRINT_THEME.mostHolyPlaceBg} stroke={SANCTUARY_BLUEPRINT_THEME.strokeGold} strokeWidth="2.2" />
                <text x="738" y="250" textAnchor="middle" fill={SANCTUARY_BLUEPRINT_THEME.textGold} fontSize="13.5" fontFamily="monospace" fontWeight="bold">
                  3. MOST HOLY PLACE (SINCE OCT 22, 1844)
                </text>
                {/* Shekinah Glory & Ark of the Covenant with Ten Commandments */}
                <circle cx="738" cy="296" r="36" fill={SANCTUARY_BLUEPRINT_THEME.strokeAmber} fillOpacity="0.22" />
                <rect x="718" y="268" width="18" height="24" rx="2" fill={SANCTUARY_BLUEPRINT_THEME.tabletFill} stroke={SANCTUARY_BLUEPRINT_THEME.tabletStroke} strokeWidth="1.4" />
                <rect x="740" y="268" width="18" height="24" rx="2" fill={SANCTUARY_BLUEPRINT_THEME.tabletFill} stroke={SANCTUARY_BLUEPRINT_THEME.tabletStroke} strokeWidth="1.4" />
                <rect x="692" y="294" width="92" height="32" rx="4" fill={SANCTUARY_BLUEPRINT_THEME.arkFill} stroke={SANCTUARY_BLUEPRINT_THEME.arkStroke} strokeWidth="2" />
                <line x1="674" y1="310" x2="802" y2="310" stroke={SANCTUARY_BLUEPRINT_THEME.arkStave} strokeWidth="2.8" />
                <text x="738" y="342" textAnchor="middle" fill={SANCTUARY_BLUEPRINT_THEME.textSoftYellow} fontSize="12.5" fontFamily="monospace" fontWeight="bold">
                  ARK OF THE TESTAMENT &amp; LAW OF GOD (REV 11:19)
                </text>
                <text x="738" y="362" textAnchor="middle" fill={SANCTUARY_BLUEPRINT_THEME.textAmber} fontSize="12" fontFamily="sans-serif">
                  Investigative Judgment · Three Angels · Country Living Preparation
                </text>
              </svg>
            </div>
          </div>
        )}

        {/* VIEW MODE C: ALL 7 ILLUSTRATED PLATES PANORAMA GALLERY */}
        {viewMode === 'panorama-grid' && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border)] pb-3">
              <div>
                <span className="text-xs font-sans text-[var(--gold)] font-bold">
                  Complete 7-plate visual sequence · 1844 to the earth made new
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--ink)]">
                  All 7 End-Time Prophetic Paintings &amp; Vector Schematics
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewMode('interactive')}
                className="px-3.5 py-2 rounded-[var(--radius-control)] bg-[var(--ground)] hover:bg-[var(--ground)]/80 text-[var(--ink)] text-xs font-semibold cursor-pointer self-start sm:self-auto font-sans border border-[var(--border)]"
              >
                ← Back to interactive dossier
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROPHETIC_EPOCHS_1844.map((epoch) => (
                <div
                  key={epoch.id}
                  className="rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] overflow-hidden flex flex-col justify-between transition-all shadow-sm group"
                >
                  <div>
                    {/* Top Painting */}
                    <div
                      onClick={() => setLightboxEpoch(epoch)}
                      className="relative h-44 overflow-hidden cursor-pointer bg-black"
                    >
                      <img
                        src={epoch.imageSrc}
                        alt={epoch.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-[var(--radius-control)] bg-black/75 border border-amber-400/40 font-mono text-caption font-bold text-amber-300">
                        Stage {epoch.stageNumber} · {epoch.eraLabel.split('·')[0].trim()}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxEpoch(epoch);
                        }}
                        className="absolute top-2.5 right-2.5 p-1.5 rounded-[var(--radius-control)] bg-black/70 hover:bg-[var(--accent)] text-white border border-white/15 transition-colors cursor-pointer"
                        title="Enlarge Prophetic Painting"
                      >
                        <Maximize2 size={12} />
                      </button>
                      <div className="absolute bottom-2.5 left-3 right-3">
                        <h4 className="font-serif text-base font-bold text-white leading-snug">
                          {epoch.shortTitle}
                        </h4>
                        <p className="text-xs font-mono text-[var(--moss)] dark:text-[var(--gold)]">
                          {epoch.scriptureRef} · {epoch.standardEgwCode}
                        </p>
                      </div>
                    </div>

                    {/* Middle Custom Vector Schematic */}
                    <div className="p-3 bg-[var(--ground)] border-y border-[var(--border)] h-36">
                      <EpochVectorSchematic epochId={epoch.id} />
                    </div>

                    {/* Summary & References */}
                    <div className="p-4 flex flex-col gap-2">
                      <p className="text-xs text-[var(--ink)] line-clamp-3 leading-relaxed">
                        {epoch.summary}
                      </p>
                      <div className="flex items-center justify-between text-xs font-mono text-[var(--ink-muted)]">
                        <span>Standard EGW code: {epoch.standardEgwCode}</span>
                        <span>{epoch.scriptureRef.split(';')[0]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-4 pt-2 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveEpochId(epoch.id);
                        setViewMode('interactive');
                      }}
                      className="text-xs font-semibold text-[var(--moss)] dark:text-[var(--gold)] hover:underline inline-flex items-center gap-1 cursor-pointer font-sans"
                    >
                      <span>Open full dossier</span>
                      <ArrowRight size={12} />
                    </button>

                    <Link
                      to={epoch.actionLink.to}
                      className="text-xs font-sans text-[var(--ink-muted)] hover:text-[var(--ink)] underline"
                    >
                      {epoch.actionLink.label}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW MODE A: HORIZONTAL HTML CARD TIMELINE */}
        {viewMode === 'interactive' && (
          <>
            {/* Node Rail */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--ink-muted)]">
                <span>Prophetic sequence progression</span>
                <span className="font-mono text-xs tabular-nums">Stage {activeEpoch.stageNumber} of 07</span>
              </div>

              {/* Horizontal Stepper Rail */}
              <div className="w-full overflow-x-auto pb-2 custom-scrollbar">
                <div className="min-w-[680px] flex items-center justify-between relative px-2">
                  <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-[var(--border)] -z-0" />
                  {PROPHETIC_EPOCHS_1844.map((epoch) => {
                    const isSelected = epoch.id === activeEpochId;
                    return (
                      <button
                        key={epoch.id}
                        type="button"
                        onClick={() => setActiveEpochId(epoch.id)}
                        className="relative z-10 flex flex-col items-center gap-1.5 cursor-pointer group focus:outline-hidden"
                      >
                        <div
                          className={cn(
                            'w-11 h-11 min-w-[44px] min-h-[44px] rounded-[var(--radius-control)] flex items-center justify-center font-mono text-sm font-bold transition-all duration-200 border',
                            isSelected
                              ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-sm scale-105'
                              : 'bg-[var(--surface)] text-[var(--ink)] border-[var(--border)] hover:border-[var(--accent)] hover:scale-102'
                          )}
                        >
                          {epoch.stageNumber}
                        </div>
                        <span
                          className={cn(
                            'text-xs font-medium whitespace-nowrap text-center transition-colors font-sans',
                            isSelected
                              ? 'text-[var(--accent)] font-bold'
                              : 'text-[var(--ink-muted)] group-hover:text-[var(--ink)]'
                          )}
                        >
                          {epoch.shortTitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Horizontal Scroll of HTML Cards */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs text-[var(--ink-muted)]">
                <span className="font-semibold">Horizontal timeline cards</span>
                <span>Scroll or click any card to inspect dossier</span>
              </div>

              <div className="w-full overflow-x-auto flex gap-4 pb-4 pt-1 snap-x scroll-smooth custom-scrollbar">
                {PROPHETIC_EPOCHS_1844.map((epoch) => {
                  const isSelected = epoch.id === activeEpochId;

                  return (
                    <article
                      key={epoch.id}
                      onClick={() => setActiveEpochId(epoch.id)}
                      className={cn(
                        'min-w-[320px] sm:min-w-[360px] max-w-[400px] flex-shrink-0 snap-start rounded-[var(--radius-card)] p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4 text-left select-none',
                        isSelected
                          ? 'bg-[var(--surface)] border-2 border-[var(--accent)] ring-2 ring-[var(--accent)]/20 shadow-md'
                          : 'bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-subtle)] shadow-xs'
                      )}
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-3 border-b border-[var(--border)] pb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              'w-11 h-11 min-w-[44px] min-h-[44px] rounded-[var(--radius-control)] flex items-center justify-center font-mono text-sm font-bold border shrink-0',
                              isSelected
                                ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                                : 'bg-[var(--ground)] text-[var(--ink)] border-[var(--border)]'
                            )}
                          >
                            {epoch.stageNumber}
                          </div>
                          <div>
                            <span className="text-xs font-mono font-bold text-[var(--ink-muted)]">
                              Stage {epoch.stageNumber}
                            </span>
                            <h3 className="font-serif text-base sm:text-lg font-normal text-[var(--ink)] leading-snug line-clamp-1">
                              {epoch.shortTitle}
                            </h3>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="px-2 py-0.5 rounded-[var(--radius-control)] bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 text-xs font-semibold whitespace-nowrap font-sans">
                            Active
                          </span>
                        )}
                      </div>

                      {/* Content Template: 1. Summary */}
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-[var(--ink-muted)]">
                          Summary
                        </span>
                        <p className="text-xs sm:text-sm text-[var(--ink)] leading-relaxed line-clamp-3">
                          {epoch.summary}
                        </p>
                      </div>

                      {/* Content Template: 2. Timeline */}
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-[var(--ink-muted)]">
                          Timeline
                        </span>
                        <span className="font-sans text-xs font-medium text-[var(--moss)] dark:text-[var(--gold)]">
                          {epoch.eraLabel}
                        </span>
                      </div>

                      {/* Content Template: 3. References */}
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-[var(--ink-muted)]">
                          References
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] text-[var(--ink)]">
                            {epoch.standardEgwCode}
                          </span>
                          <span className="font-mono text-xs text-[var(--ink-muted)]">
                            {epoch.scriptureRef}
                          </span>
                        </div>
                      </div>

                      {/* Content Template: 4. Application for country living */}
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-[var(--moss)] dark:text-[var(--gold)]">
                          Application for country living
                        </span>
                        <p className="text-xs text-[var(--ink-muted)] leading-relaxed line-clamp-2">
                          {epoch.countryLivingDirective}
                        </p>
                      </div>

                      {/* Content Template: 5. Adventist perspective */}
                      <div className="flex flex-col gap-1 pt-2 border-t border-[var(--border)]">
                        <span className="text-xs font-semibold text-[var(--ink-muted)]">
                          Adventist perspective
                        </span>
                        <p className="text-xs text-[var(--ink-muted)] leading-relaxed line-clamp-2">
                          {epoch.theologicalSignificance}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* 2. ACTIVE EPOCH ILLUSTRATED DOSSIER */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEpoch.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 items-stretch"
              >
                {/* Left Column (5 Cols): Prophetic Painting + Vector Schematic */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div
                    onClick={() => setLightboxEpoch(activeEpoch)}
                    className="group relative rounded-[var(--radius-card)] overflow-hidden border border-[var(--border)] bg-stone-950 h-60 sm:h-68 cursor-pointer shadow-sm"
                  >
                    <img
                      src={activeEpoch.imageSrc}
                      alt={activeEpoch.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxEpoch(activeEpoch);
                      }}
                      className="absolute top-3 right-3 px-2.5 py-1.5 rounded-[var(--radius-control)] bg-black/70 hover:bg-[var(--accent)] text-white border border-white/20 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer font-sans"
                    >
                      <Maximize2 size={12} />
                      <span>Enlarge plate</span>
                    </button>
                    <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col gap-1">
                      <span className="text-xs font-mono font-bold text-stone-200">
                        Prophetic plate {activeEpoch.stageNumber} · {activeEpoch.scriptureRef}
                      </span>
                      <p className="text-xs text-stone-300 leading-snug">
                        {activeEpoch.imageCaption}
                      </p>
                    </div>
                  </div>

                  {/* Companion Custom Vector Schematic */}
                  <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-3 flex flex-col gap-1.5 shadow-2xs">
                    <div className="flex items-center justify-between text-xs text-[var(--ink-muted)] px-1">
                      <span className="font-sans font-semibold">Prophetic vector diagram</span>
                      <span className="font-mono font-bold">{activeEpoch.standardEgwCode}</span>
                    </div>
                    <div className="w-full h-44">
                      <EpochVectorSchematic epochId={activeEpoch.id} />
                    </div>
                  </div>
                </div>

                {/* Right Column (7 Cols): Scripture, EGW Reference Counsel & Outpost Directive */}
                <div className="lg:col-span-7 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] p-5 sm:p-7 flex flex-col justify-between gap-5 shadow-xs">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-3">
                      <span className="text-xs font-sans font-semibold text-[var(--moss)] dark:text-[var(--gold)]">
                        Stage {activeEpoch.stageNumber} · {activeEpoch.eraLabel}
                      </span>
                      <a
                        href={activeEpoch.egwUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-sans text-[var(--moss)] dark:text-[var(--gold)] hover:underline"
                      >
                        <span>Standard EGW reference code: <span className="font-mono">{activeEpoch.standardEgwCode}</span></span>
                        <ExternalLink size={12} />
                      </a>
                    </div>

                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[var(--ink)] leading-tight">
                        {activeEpoch.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--ink-muted)] font-medium mt-1">
                        {activeEpoch.subtitle}
                      </p>
                    </div>

                    {/* Scripture Block */}
                    <div className="p-4 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-[var(--moss)] dark:text-[var(--gold)]">
                        {activeEpoch.scriptureSource} · <span className="font-mono">{activeEpoch.scriptureRef}</span>
                      </span>
                      <p className="font-serif text-sm italic text-[var(--ink)] leading-relaxed">
                        “{activeEpoch.scriptureText}”
                      </p>
                    </div>

                    {/* Standard EGW Quote Verification Block */}
                    {(() => {
                      const q = getQuoteById(activeEpoch.quoteId);
                      if (q && q.verifiedBy !== null) {
                        return (
                          <blockquote className="border-l-2 border-[var(--moss)] dark:border-[var(--gold)] pl-4 py-1 flex flex-col gap-1.5">
                            <p className="font-serif text-sm sm:text-base italic text-[var(--ink)] leading-relaxed">
                              “{q.text}”
                            </p>
                            <footer className="text-xs text-[var(--ink-muted)]">
                              — Ellen G. White, {q.source} (<span className="font-mono font-semibold">{q.standardEgwCode}</span>) · <span className="text-[var(--moss)] dark:text-[var(--gold)]">Verified by {q.verifiedBy}</span>
                            </footer>
                          </blockquote>
                        );
                      }
                      return (
                        <div className="p-4 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-2">
                          <div className="flex items-center justify-between gap-2 text-xs">
                            <span className="font-semibold text-[var(--ink)]">
                              Standard EGW reference code: <span className="font-mono font-bold text-[var(--moss)] dark:text-[var(--gold)]">{activeEpoch.standardEgwCode}</span>
                            </span>
                            <span className="px-2 py-0.5 rounded-[var(--radius-control)] bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300 font-sans text-xs">
                              Pending verification
                            </span>
                          </div>
                          <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                            This passage is registered in the verified quote store (<code className="font-mono">src/data/sources/quotes.ts</code>) and listed in <code className="font-mono font-semibold">QUOTES_TO_VERIFY.md</code>. In accordance with strict verification policy, the quote text remains hidden until verified against standard print editions.
                          </p>
                          <a
                            href={activeEpoch.egwUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-[var(--moss)] dark:text-[var(--gold)] hover:underline font-medium self-start pt-1 font-sans"
                          >
                            <span>Review {activeEpoch.standardEgwCode} on EGW Writings</span>
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      );
                    })()}

                    {/* Historical & Prophetic Explanation */}
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold text-[var(--ink-muted)]">
                        Adventist perspective
                      </span>
                      <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
                        {activeEpoch.theologicalSignificance}
                      </p>
                    </div>
                  </div>

                  {/* Practical Malawi Homestead Action Box */}
                  <div className="p-4 rounded-[var(--radius-card)] bg-[var(--ground)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold text-[var(--moss)] dark:text-[var(--gold)] flex items-center gap-1.5">
                        <Compass size={13} />
                        <span>Application for country living</span>
                      </span>
                      <p className="text-xs text-[var(--ink)] leading-relaxed">
                        {activeEpoch.countryLivingDirective}
                      </p>
                    </div>

                    <Link
                      to={activeEpoch.actionLink.to}
                      className="px-4 py-2.5 rounded-[var(--radius-control)] bg-[var(--color-moss-light)] hover:bg-[var(--color-moss)] text-white font-semibold text-xs flex items-center gap-1.5 shrink-0 transition-colors whitespace-nowrap cursor-pointer shadow-xs font-sans"
                    >
                      <span>{activeEpoch.actionLink.label}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>

      {/* 3. FULLSCREEN PROPHETIC PLATE LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxEpoch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxEpoch(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full rounded-[var(--radius-sheet)] bg-[var(--surface-muted)] border border-[var(--border)] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-4 bg-[var(--surface)] border-b border-[var(--border)] flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-sans text-[var(--gold)] font-bold">
                    Prophetic plate {lightboxEpoch.stageNumber} · {lightboxEpoch.eraLabel}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--ink)]">
                    {lightboxEpoch.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxEpoch(null)}
                  className="p-2 rounded-[var(--radius-control)] bg-[var(--ground)] hover:bg-[var(--ground)]/80 text-[var(--ink)] cursor-pointer border border-[var(--border)]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="relative bg-black max-h-[65vh] overflow-hidden flex items-center justify-center">
                <img
                  src={lightboxEpoch.imageSrc}
                  alt={lightboxEpoch.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full max-h-[65vh] object-contain"
                />
              </div>

              <div className="p-5 bg-[var(--surface)] border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[var(--ink)]">
                <div className="flex flex-col gap-1 max-w-3xl">
                  {(() => {
                    const q = getQuoteById(lightboxEpoch.quoteId);
                    if (q && q.verifiedBy !== null) {
                      return (
                        <p className="font-serif italic text-sm text-[var(--ink)]">
                          “{q.text}” — {q.source} ({q.standardEgwCode})
                        </p>
                      );
                    }
                    return (
                      <p className="text-xs text-[var(--ink-muted)]">
                        Standard EGW reference code: <span className="font-mono font-bold text-[var(--ink)]">{lightboxEpoch.standardEgwCode}</span> · Pending verification in QUOTES_TO_VERIFY.md
                      </p>
                    );
                  })()}
                  <p className="text-xs text-[var(--ink-muted)]">{lightboxEpoch.imageCaption}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxEpoch(null)}
                  className="px-4 py-2 rounded-[var(--radius-control)] bg-[var(--color-moss-light)] hover:bg-[var(--color-moss)] text-white font-semibold text-xs shrink-0 cursor-pointer shadow-xs font-sans"
                >
                  Close plate
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
