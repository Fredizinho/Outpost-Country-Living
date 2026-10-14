import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  BookOpen,
  ExternalLink,
  Compass,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  CheckCircle2,
  Scale,
  Flame,
  Mountain,
  Crown,
  ScrollText,
  Home,
} from 'lucide-react';
import { COUNTRY_IMAGES } from '@/assets/images';
import { cn } from '@/lib/utils';

export interface PropheticEpoch {
  id: string;
  stageNumber: string;
  eraLabel: string;
  shortTitle: string;
  title: string;
  subtitle: string;
  scriptureRef: string;
  scriptureText: string;
  egwQuote: string;
  egwSource: string;
  egwCode: string;
  egwUrl: string;
  imageSrc: string;
  imageCaption: string;
  theologicalSignificance: string;
  countryLivingDirective: string;
  actionLink: {
    label: string;
    to: string;
  };
  chartX: number;
  accentColor: string;
}

export const PROPHETIC_EPOCHS_1844: PropheticEpoch[] = [
  {
    id: '1844-sanctuary',
    stageNumber: '01',
    eraLabel: 'Oct 22, 1844 · End of 2300 Days',
    shortTitle: '1844 Sanctuary Judgment',
    title: 'The Cleansing of the Heavenly Sanctuary & Investigative Judgment',
    subtitle: 'Fulfillment of Daniel 8:14 (457 BC – AD 1844) & Opening of the Most Holy Place',
    scriptureRef: 'Daniel 8:14; Revelation 11:19',
    scriptureText:
      'And he said unto me, Unto two thousand and three hundred days; then shall the sanctuary be cleansed... And the temple of God was opened in heaven, and there was seen in his temple the ark of his testament.',
    egwQuote:
      'At the termination of the 2300 days, in 1844, Christ entered the most holy place of the heavenly sanctuary to perform the closing work of atonement, preparatory to His coming.',
    egwSource: 'The Great Controversy, p. 422 (1911)',
    egwCode: 'GC 422.1',
    egwUrl: 'https://m.egwwritings.org/en/search?query=GC+422.1',
    imageSrc: COUNTRY_IMAGES.sanctuary1844Judgment,
    imageCaption:
      'The Most Holy Place of the Heavenly Sanctuary opened in 1844—revealing the Ark of the Covenant and the immutable Law of God (Rev. 11:19).',
    theologicalSignificance:
      'The 2,300 prophetic years of Daniel 8:14 began in 457 BC with the decree of Artaxerxes to restore Jerusalem and terminated on October 22, 1844. On the antitypical Day of Atonement, Christ our High Priest entered the Second Apartment (Most Holy Place) before the Ark of the Testament to conduct the pre-advent Investigative Judgment.',
    countryLivingDirective:
      'As Christ ministers in the Most Holy Place, His people on earth are called to align every habit of home, diet, family worship, and stewardship with the standard of God’s holy Law.',
    actionLink: {
      label: 'Open Daily Sanctuary Devotionals',
      to: '/devotional',
    },
    chartX: 85,
    accentColor: '#F59E0B',
  },
  {
    id: 'three-angels',
    stageNumber: '02',
    eraLabel: '1844 – Present · Rev 14:6–12',
    shortTitle: "Three Angels' Messages",
    title: "Proclamation of the Three Angels' Messages & The Sabbath Seal",
    subtitle: 'Calling Every Nation back to the Creator of Heaven and Earth',
    scriptureRef: 'Revelation 14:6–7, 12',
    scriptureText:
      'Fear God, and give glory to him; for the hour of his judgment is come: and worship him that made heaven, and earth, and the sea, and the fountains of waters... Here is the patience of the saints: here are they that keep the commandments of God, and the faith of Jesus.',
    egwQuote:
      'In a special sense Seventh-day Adventists have been set in the world as watchmen and light bearers. To them has been entrusted the last warning for a perishing world... They have been given a work of the most solemn import—the proclamation of the first, second, and third angels’ messages.',
    egwSource: 'Testimonies for the Church, Vol. 9, p. 19 (1909)',
    egwCode: '9T 19.1',
    egwUrl: 'https://m.egwwritings.org/en/search?query=9T+19.1',
    imageSrc: COUNTRY_IMAGES.threeAngelsProclamation,
    imageCaption:
      'The Three Angels of Revelation 14 flying in midheaven—proclaiming the Everlasting Gospel, the fall of Babylon, and the seal of the Living God.',
    theologicalSignificance:
      'Following 1844, the First Angel announces that the hour of God’s investigative judgment has arrived and calls humanity back to the Creator (quoting the fourth commandment of Exodus 20:11). The Second Angel declares the moral fall of spiritual Babylon, and the Third Angel warns against receiving the Mark of the Beast.',
    countryLivingDirective:
      'Nature itself is God’s lesson book testifying of the Creator. Living in the countryside surrounds families with the living works of Him who made heaven, earth, and the fountains of water.',
    actionLink: {
      label: 'Explore Outpost Evangelism Blueprints',
      to: '/blueprints',
    },
    chartX: 215,
    accentColor: '#38BDF8',
  },
  {
    id: 'country-outposts',
    stageNumber: '03',
    eraLabel: 'Preparatory Window · Now',
    shortTitle: 'Out of the Cities',
    title: 'Orderly Exodus from the Cities & Rural Outpost Preparation',
    subtitle: 'Establishing Self-Sustaining Homes, Gardens, and Sanitariums Before the Crisis',
    scriptureRef: 'Isaiah 32:18; Matthew 24:15–16',
    scriptureText:
      'And my people shall dwell in a peaceable habitation, and in sure dwellings, and in quiet resting places.',
    egwQuote:
      'Again and again the Lord has instructed that our people are to take their families away from the cities, into the country, where they can raise their own provisions; for in the future the problem of buying and selling will be a very serious one.',
    egwSource: 'Country Living, p. 9 (1904)',
    egwCode: 'CL 9.5',
    egwUrl: 'https://m.egwwritings.org/en/search?query=CL+9.5',
    imageSrc: COUNTRY_IMAGES.malawiHomesteadSanctuary,
    imageCaption:
      'Preparatory Country Living—cultivating heirloom food reserves, pure spring water, and rural mission centers while pathways remain open.',
    theologicalSignificance:
      'Before the final conflict over buying and selling breaks upon the world, God graciously grants a preparatory window for families to relocate out of congested cities, learn practical agriculture, educate their children away from urban corruption, and work the cities from rural outpost centers.',
    countryLivingDirective:
      'Use this peaceful window in Malawi to scout perennial water, verify Customary Land tenure, plant 3×3×3ft fruit tree pits, and build heirloom seed reserves.',
    actionLink: {
      label: 'Scout 28 Malawi Districts on GIS Map',
      to: '/scout-map',
    },
    chartX: 345,
    accentColor: '#10B981',
  },
  {
    id: 'sunday-law-siege',
    stageNumber: '04',
    eraLabel: 'Prophetic Signal · Rev 13:11–17',
    shortTitle: 'Sunday Law & Boycott',
    title: 'The Siege Signal: Sunday Legislation & Economic Decree',
    subtitle: 'The Prophetic Counterpart to Cestius Gallus Surrounding Jerusalem in AD 66',
    scriptureRef: 'Revelation 13:16–17; Luke 21:20–21',
    scriptureText:
      'And that no man might buy or sell, save he that had the mark, or the name of the beast, or the number of his name.',
    egwQuote:
      'As the siege of Jerusalem by the Roman armies was the signal for flight to the Judean Christians, so the assumption of power on the part of our nation in the decree enforcing the papal sabbath will be a warning to us. It will then be time to leave the large cities, preparatory to leaving the smaller ones for retired homes in secluded places among the mountains.',
    egwSource: 'Testimonies for the Church, Vol. 5, p. 464 (1885)',
    egwCode: '5T 464.3',
    egwUrl: 'https://m.egwwritings.org/en/search?query=5T+464.3',
    imageSrc: COUNTRY_IMAGES.buyingSelling,
    imageCaption:
      'The Prophetic Siege Signal (5T 464.3) and Economic Restriction (Rev. 13:17)—why off-grid water, solar, and soil independence must be prepared beforehand.',
    theologicalSignificance:
      'Ellen G. White identifies two distinct stages of urban departure: (1) purposeful relocation now to raise provisions and establish outposts, and (2) urgent departure from large cities when legislative enforcement of Sunday observance fulfills the prophetic sign of Luke 21:20, followed by economic sanctions against Sabbath-keepers.',
    countryLivingDirective:
      'A debt-free rural homestead with independent borehole/spring water, solar energy, and perennial crops shields the family when urban commerce and labor unions restrict Sabbath-keepers.',
    actionLink: {
      label: 'Open 15-Milestone Exodus Ledger',
      to: '/tracker',
    },
    chartX: 475,
    accentColor: '#F97316',
  },
  {
    id: 'latter-rain-loud-cry',
    stageNumber: '05',
    eraLabel: 'Final Witness · Rev 18:1–4',
    shortTitle: 'Latter Rain & Loud Cry',
    title: 'The Shaking, The Latter Rain & The Loud Cry',
    subtitle: 'The Earth Lightened with God’s Glory as the Final Call Sounds',
    scriptureRef: 'Revelation 18:1, 4; Joel 2:23',
    scriptureText:
      'And after these things I saw another angel come down from heaven, having great power; and the earth was lightened with his glory... Come out of her, my people, that ye be not partakers of her sins.',
    egwQuote:
      'The great work of the gospel is not to close with less manifestation of the power of God than marked its opening. The prophecies which were fulfilled in the outpouring of the former rain at the opening of the gospel are again to be fulfilled in the latter rain at its close.',
    egwSource: 'The Great Controversy, p. 611 (1911)',
    egwCode: 'GC 611.3',
    egwUrl: 'https://m.egwwritings.org/en/search?query=GC+611.3',
    imageSrc: COUNTRY_IMAGES.jerusalemSiege,
    imageCaption:
      'The Loud Cry of Revelation 18—medical missionary outposts and faithful stewards proclaiming the final call in the power of the Latter Rain.',
    theologicalSignificance:
      'As persecution intensifies, a spiritual sifting ("the Shaking") separates superficial professors from faithful stewards. Simultaneously, the Latter Rain of the Holy Spirit ripens the spiritual harvest, empowering the Loud Cry of the Fourth Angel (Revelation 18) to call multitudes out of Babylon into the truth.',
    countryLivingDirective:
      'Rural outpost centers, treatment rooms, and humble country homes become refuges of truth and healing where honest souls find light during the final proclamation.',
    actionLink: {
      label: 'Master 25 Practical Country & Medical Skills',
      to: '/skills',
    },
    chartX: 605,
    accentColor: '#EAB308',
  },
  {
    id: 'time-of-trouble',
    stageNumber: '06',
    eraLabel: 'Close of Probation · Dan 12:1',
    shortTitle: 'Mountain Refuge',
    title: 'Close of Probation & Flight to the Mountain Strongholds',
    subtitle: '“His Place of Defense Shall Be the Munitions of Rocks: Bread and Water Shall Be Sure”',
    scriptureRef: 'Daniel 12:1; Isaiah 33:16',
    scriptureText:
      'And at that time shall Michael stand up, the great prince which standeth for the children of thy people: and there shall be a time of trouble, such as never was... He shall dwell on high: his place of defence shall be the munitions of rocks: bread shall be given him; his waters shall be sure.',
    egwQuote:
      'As the decree issued by the various rulers of Christendom against commandment keepers shall withdraw the protection of government and abandon them to those who desire their destruction, the people of God will flee from the cities and villages and associate together in companies, dwelling in the most desolate and solitary places. Many will find refuge in the strongholds of the mountains.',
    egwSource: 'The Great Controversy, p. 626 (1911)',
    egwCode: 'GC 626.1',
    egwUrl: 'https://m.egwwritings.org/en/search?query=GC+626.1',
    imageSrc: COUNTRY_IMAGES.mountainFlight,
    imageCaption:
      'During the Time of Trouble after the Close of Probation, God’s sealed people find refuge in the mountain strongholds where heavenly angels minister to them.',
    theologicalSignificance:
      'When Christ ceases His intercession in the heavenly sanctuary (`Rev. 22:11`), human probation closes and the Seven Last Plagues fall upon the unrepentant world. During the death decree ("Time of Jacob’s Trouble"), God’s people leave even their rural villages for solitary mountain strongholds, sustained directly by ministering angels (`Isaiah 33:16`).',
    countryLivingDirective:
      'Physical endurance, familiarity with highland terrain, simple habits of life, and unshakable trust in God prepare families both physically and spiritually for this final test.',
    actionLink: {
      label: 'Evaluate Highland Plots & Water Security',
      to: '/suitability',
    },
    chartX: 735,
    accentColor: '#A855F7',
  },
  {
    id: 'second-coming',
    stageNumber: '07',
    eraLabel: 'Consummation · Rev 14:14–16',
    shortTitle: 'Second Coming & Eden',
    title: 'Glorious Deliverance, The Second Coming & Earth Made New',
    subtitle: '“They Shall Build Houses, and Inhabit Them; and They Shall Plant Vineyards”',
    scriptureRef: 'Revelation 14:14; Isaiah 65:21–22',
    scriptureText:
      'And I looked, and behold a white cloud, and upon the cloud one sat like unto the Son of man, having on his head a golden crown, and in his hand a sharp sickle.',
    egwQuote:
      'In the Bible the inheritance of the saved is called "a country." Heb. 11:14–16. There the heavenly Shepherd leads His flock to fountains of living waters. The tree of life yields its fruit every month, and the leaves of the tree are for the service of the nations.',
    egwSource: 'The Great Controversy, p. 675 (1911)',
    egwCode: 'GC 675.2',
    egwUrl: 'https://m.egwwritings.org/en/search?query=GC+675.2',
    imageSrc: COUNTRY_IMAGES.secondComingDeliverance,
    imageCaption:
      'The glorious appearing of Christ in the clouds of heaven to deliver His faithful people and restore the eternal Edenic Country Home.',
    theologicalSignificance:
      'At midnight God’s voice delivers His covenant people. Soon appears the small black cloud in the east, growing brighter until Jesus rides forth as King of kings and Lord of lords (`Rev. 19:16`). Earthly country living is the training school for the eternal New Earth, where the redeemed shall build houses and plant vineyards forever (`Isaiah 65:21`).',
    countryLivingDirective:
      'Every tree planted, every soil bed restored, and every child taught in nature today is a foretaste of the restored Edenic inheritance promised to the faithful.',
    actionLink: {
      label: 'Explore Edenic Agriculture Manuals',
      to: '/agriculture',
    },
    chartX: 865,
    accentColor: '#FACC15',
  },
];

/**
 * Bespoke Vector Diagram for each of the 7 Prophetic Epochs from 1844 to the Second Coming
 */
function EpochVectorSchematic({ epochId }: { epochId: string }) {
  switch (epochId) {
    case '1844-sanctuary':
      return (
        <svg viewBox="0 0 360 210" className="w-full h-full select-none" role="img" aria-label="1844 Heavenly Sanctuary and 2300 Days Vector Schematic">
          <rect width="360" height="210" rx="14" fill="#07150E" />
          {/* Shekinah Glory Radial Halo */}
          <circle cx="180" cy="78" r="56" fill="#F59E0B" fillOpacity="0.14" />
          <circle cx="180" cy="78" r="32" fill="#FBBF24" fillOpacity="0.24" />
          {/* Rays of Light */}
          <line x1="180" y1="18" x2="180" y2="54" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
          <line x1="135" y1="32" x2="160" y2="60" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="225" y1="32" x2="200" y2="60" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
          {/* Two Stone Tablets of Ten Commandments (I-IV & V-X) */}
          <path d="M156 54 C156 46, 178 46, 178 54 L178 88 L156 88 Z" fill="#1E293B" stroke="#FDE68A" strokeWidth="1.5" />
          <path d="M182 54 C182 46, 204 46, 204 54 L204 88 L182 88 Z" fill="#1E293B" stroke="#FDE68A" strokeWidth="1.5" />
          <line x1="162" y1="62" x2="172" y2="62" stroke="#FBBF24" strokeWidth="1.2" />
          <line x1="162" y1="69" x2="172" y2="69" stroke="#FBBF24" strokeWidth="1.2" />
          <line x1="162" y1="76" x2="172" y2="76" stroke="#34D399" strokeWidth="1.8" />
          <line x1="188" y1="62" x2="198" y2="62" stroke="#FBBF24" strokeWidth="1.2" />
          <line x1="188" y1="69" x2="198" y2="69" stroke="#FBBF24" strokeWidth="1.2" />
          <line x1="188" y1="76" x2="198" y2="76" stroke="#FBBF24" strokeWidth="1.2" />
          {/* Golden Ark of the Covenant & Cherubim Wings */}
          <path d="M118 92 Q148 64 174 82" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M242 92 Q212 64 186 82" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" />
          <rect x="122" y="92" width="116" height="42" rx="4" fill="#92400E" stroke="#FBBF24" strokeWidth="2" />
          <rect x="130" y="98" width="100" height="30" rx="2" fill="#78350F" stroke="#F59E0B" strokeWidth="1" />
          <line x1="96" y1="112" x2="264" y2="112" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" />
          {/* 2300 Days Prophetic Mathematical Bar at Bottom */}
          <rect x="24" y="152" width="312" height="40" rx="8" fill="#04100A" stroke="#10B981" strokeWidth="1.2" />
          <line x1="46" y1="170" x2="314" y2="170" stroke="#34D399" strokeWidth="2" />
          <circle cx="46" cy="170" r="4.5" fill="#10B981" />
          <circle cx="145" cy="170" r="4.5" fill="#38BDF8" />
          <circle cx="314" cy="170" r="5.5" fill="#FBBF24" stroke="#FEF08A" strokeWidth="1.5" />
          <text x="46" y="162" textAnchor="middle" fill="#A7F3D0" fontSize="8.5" fontFamily="monospace" fontWeight="bold">457 BC</text>
          <text x="145" y="162" textAnchor="middle" fill="#7DD3FC" fontSize="8.5" fontFamily="monospace" fontWeight="bold">AD 31/34</text>
          <text x="302" y="162" textAnchor="middle" fill="#FDE047" fontSize="9" fontFamily="monospace" fontWeight="bold">OCT 22, 1844</text>
          <text x="180" y="185" textAnchor="middle" fill="#6EE7B7" fontSize="8" fontFamily="monospace">
            2,300 PROPHETIC YEARS (DANIEL 8:14) → SANCTUARY CLEANSED
          </text>
        </svg>
      );

    case 'three-angels':
      return (
        <svg viewBox="0 0 360 210" className="w-full h-full select-none" role="img" aria-label="Three Angels Messages of Revelation 14 Vector Schematic">
          <rect width="360" height="210" rx="14" fill="#07150E" />
          {/* Globe & Fountains of Waters Below */}
          <path d="M40 195 Q180 135 320 195" fill="#064E3B" stroke="#34D399" strokeWidth="2" />
          <path d="M90 195 Q180 160 270 195" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 3" />
          {/* Three Radiant Angelic Heralds in Midheaven */}
          {[
            { cx: 92, cy: 76, label: '1ST ANGEL', sub: 'Rev 14:6–7 · Judgment Hour', color: '#FBBF24' },
            { cx: 180, cy: 56, label: '2ND ANGEL', sub: 'Rev 14:8 · Babylon Fallen', color: '#38BDF8' },
            { cx: 268, cy: 76, label: '3RD ANGEL', sub: 'Rev 14:9–12 · Commandments', color: '#34D399' },
          ].map((a) => (
            <g key={a.label}>
              <circle cx={a.cx} cy={a.cy} r="24" fill={a.color} fillOpacity="0.15" stroke={a.color} strokeWidth="1.5" />
              {/* Wings & Trumpet Vector */}
              <path d={`M${a.cx - 18} ${a.cy + 4} Q${a.cx - 6} ${a.cy - 14} ${a.cx} ${a.cy - 2} Q${a.cx + 6} ${a.cy - 14} ${a.cx + 18} ${a.cy + 4}`} fill="none" stroke={a.color} strokeWidth="2" strokeLinecap="round" />
              <line x1={a.cx} y1={a.cy + 2} x2={a.cx + 14} y2={a.cy + 10} stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
              <text x={a.cx} y={a.cy + 38} textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontFamily="monospace" fontWeight="bold">{a.label}</text>
              <text x={a.cx} y={a.cy + 49} textAnchor="middle" fill={a.color} fontSize="7" fontFamily="monospace">{a.sub}</text>
            </g>
          ))}
          <text x="180" y="185" textAnchor="middle" fill="#FDE68A" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
            “WORSHIP HIM THAT MADE HEAVEN, EARTH &amp; FOUNTAINS OF WATERS”
          </text>
        </svg>
      );

    case 'country-outposts':
      return (
        <svg viewBox="0 0 360 210" className="w-full h-full select-none" role="img" aria-label="Out of the Cities to Rural Outpost Vector Schematic">
          <rect width="360" height="210" rx="14" fill="#07150E" />
          {/* Left: Congested City Skyline */}
          <rect x="22" y="72" width="22" height="72" fill="#334155" stroke="#64748B" strokeWidth="1.2" />
          <rect x="48" y="54" width="26" height="90" fill="#1E293B" stroke="#64748B" strokeWidth="1.2" />
          <rect x="78" y="84" width="20" height="60" fill="#334155" stroke="#64748B" strokeWidth="1.2" />
          <text x="60" y="160" textAnchor="middle" fill="#94A3B8" fontSize="8.5" fontFamily="monospace" fontWeight="bold">URBAN BABYLON</text>
          {/* Arrow of Orderly Exodus */}
          <path d="M114 104 L196 104" stroke="#FBBF24" strokeWidth="2.5" strokeDasharray="5 3" />
          <polygon points="196,99 208,104 196,109" fill="#FBBF24" />
          <text x="160" y="94" textAnchor="middle" fill="#FDE68A" fontSize="8" fontFamily="monospace" fontWeight="bold">CL 9.5 EXODUS</text>
          {/* Right: Rural Mountain Outpost Sanctuary, Orchard & Spring */}
          <path d="M215 144 L255 62 L295 110 L325 74 L348 144 Z" fill="#064E3B" stroke="#10B981" strokeWidth="1.5" />
          <polygon points="245,144 245,118 268,102 291,118 291,144" fill="#78350F" stroke="#FBBF24" strokeWidth="1.5" />
          <circle cx="315" cy="126" r="11" fill="#059669" stroke="#6EE7B7" strokeWidth="1.2" />
          <text x="280" y="160" textAnchor="middle" fill="#6EE7B7" fontSize="8.5" fontFamily="monospace" fontWeight="bold">RURAL OUTPOST</text>
          <text x="180" y="188" textAnchor="middle" fill="#A7F3D0" fontSize="8" fontFamily="monospace">
            RAISE OWN PROVISIONS • TRUE EDUCATION • MEDICAL MISSION
          </text>
        </svg>
      );

    case 'sunday-law-siege':
      return (
        <svg viewBox="0 0 360 210" className="w-full h-full select-none" role="img" aria-label="Sunday Law Siege Signal and Economic Boycott Vector Schematic">
          <rect width="360" height="210" rx="14" fill="#07150E" />
          {/* Two Parallel Prophetic Signposts: AD 66 Cestius Siege -> 5T 464.3 Sunday Decree */}
          <rect x="24" y="34" width="142" height="108" rx="10" fill="#1C1917" stroke="#F97316" strokeWidth="1.5" />
          <text x="95" y="54" textAnchor="middle" fill="#FDBA74" fontSize="9" fontFamily="monospace" fontWeight="bold">TYPE: AD 66 SIEGE</text>
          <text x="95" y="70" textAnchor="middle" fill="#E7E5E4" fontSize="8" fontFamily="monospace">Roman Standards</text>
          <text x="95" y="84" textAnchor="middle" fill="#E7E5E4" fontSize="8" fontFamily="monospace">Surrounding Jerusalem</text>
          <text x="95" y="106" textAnchor="middle" fill="#34D399" fontSize="8" fontFamily="monospace" fontWeight="bold">→ Flee to Pella Hills</text>
          <text x="95" y="124" textAnchor="middle" fill="#A8A29E" fontSize="7.5" fontFamily="monospace">(Luke 21:20–21)</text>

          <path d="M172 88 L190 88" stroke="#FBBF24" strokeWidth="2" />

          <rect x="194" y="34" width="142" height="108" rx="10" fill="#0F172A" stroke="#FBBF24" strokeWidth="1.8" />
          <text x="265" y="54" textAnchor="middle" fill="#FDE047" fontSize="9" fontFamily="monospace" fontWeight="bold">ANTITYPE: 5T 464.3</text>
          <text x="265" y="70" textAnchor="middle" fill="#F8FAFC" fontSize="8" fontFamily="monospace">National Sunday Decree</text>
          <text x="265" y="84" textAnchor="middle" fill="#FCA5A5" fontSize="8" fontFamily="monospace">No Buy or Sell (Rev 13:17)</text>
          <text x="265" y="106" textAnchor="middle" fill="#6EE7B7" fontSize="8" fontFamily="monospace" fontWeight="bold">→ Leave Large Cities</text>
          <text x="265" y="124" textAnchor="middle" fill="#93C5FD" fontSize="7.5" fontFamily="monospace">For Secluded Outposts</text>

          <text x="180" y="176" textAnchor="middle" fill="#FDE68A" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
            OFF-GRID WATER, SOLAR &amp; HEIRLOOM SEED SOVEREIGNTY
          </text>
        </svg>
      );

    case 'latter-rain-loud-cry':
      return (
        <svg viewBox="0 0 360 210" className="w-full h-full select-none" role="img" aria-label="Latter Rain and Loud Cry of Revelation 18 Vector Schematic">
          <rect width="360" height="210" rx="14" fill="#07150E" />
          {/* Clouds Pouring Latter Rain & Golden Beams of Rev 18 Glory */}
          <path d="M70 46 Q110 24 155 42 Q195 20 240 42 Q275 28 300 48 L60 48 Z" fill="#065F46" stroke="#34D399" strokeWidth="1.5" />
          {[90, 125, 160, 195, 230, 265].map((x) => (
            <g key={x}>
              <line x1={x} y1="56" x2={x - 10} y2="112" stroke="#38BDF8" strokeWidth="1.8" strokeDasharray="4 4" />
              <line x1={x + 12} y1="56" x2={x + 2} y2="118" stroke="#FBBF24" strokeWidth="1.5" />
            </g>
          ))}
          {/* Ripened Golden Harvest Sheaves Below */}
          {[95, 150, 205, 260].map((x) => (
            <g key={x}>
              <path d={`M${x - 10} 150 L${x} 118 L${x + 10} 150`} stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" />
              <circle cx={x} cy="116" r="5" fill="#FDE047" />
            </g>
          ))}
          <text x="180" y="175" textAnchor="middle" fill="#FDE047" fontSize="9" fontFamily="monospace" fontWeight="bold">
            LATTER RAIN (JOEL 2:23) &amp; LOUD CRY (REV 18:1–4)
          </text>
          <text x="180" y="190" textAnchor="middle" fill="#A7F3D0" fontSize="8" fontFamily="monospace">
            “THE EARTH WAS LIGHTENED WITH HIS GLORY”
          </text>
        </svg>
      );

    case 'time-of-trouble':
      return (
        <svg viewBox="0 0 360 210" className="w-full h-full select-none" role="img" aria-label="Time of Trouble and Mountain Munitions of Rocks Vector Schematic">
          <rect width="360" height="210" rx="14" fill="#07150E" />
          {/* High Mountain Strongholds ("Munitions of Rocks" - Isaiah 33:16) */}
          <polygon points="20,156 95,48 165,126 235,38 335,156" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.8" />
          <polygon points="75,156 145,74 215,134 275,68 340,156" fill="#064E3B" fillOpacity="0.7" stroke="#34D399" strokeWidth="1.5" />
          {/* Protective Heavenly Light & Living Stream in the Rock */}
          <circle cx="235" cy="38" r="22" fill="#FBBF24" fillOpacity="0.25" />
          <path d="M235 65 Q215 105 190 156" stroke="#38BDF8" strokeWidth="3" fill="none" strokeLinecap="round" />
          <text x="180" y="175" textAnchor="middle" fill="#BAE6FD" fontSize="9" fontFamily="monospace" fontWeight="bold">
            ISAIAH 33:16 · MUNITIONS OF ROCKS (GC 626.1)
          </text>
          <text x="180" y="190" textAnchor="middle" fill="#FDE68A" fontSize="8" fontFamily="monospace">
            “BREAD SHALL BE GIVEN HIM; HIS WATERS SHALL BE SURE”
          </text>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 360 210" className="w-full h-full select-none" role="img" aria-label="Second Coming of Christ and New Earth Vector Schematic">
          <rect width="360" height="210" rx="14" fill="#07150E" />
          {/* Radiant Glory Cloud & Golden Crown */}
          <circle cx="180" cy="72" r="52" fill="#FACC15" fillOpacity="0.2" />
          <circle cx="180" cy="72" r="32" fill="#FEF08A" fillOpacity="0.35" />
          {/* Golden Crown Vector */}
          <polygon points="154,78 160,54 173,68 180,48 187,68 200,54 206,78" fill="#FACC15" stroke="#FEF9C3" strokeWidth="1.5" />
          {/* Restored Edenic Mountains & Tree of Life on Both Sides of the River */}
          <path d="M20 155 Q100 115 180 145 Q260 115 340 155" fill="#065F46" stroke="#34D399" strokeWidth="2" />
          <path d="M180 105 C170 125 165 140 155 158 L205 158 C195 140 190 125 180 105 Z" fill="#38BDF8" />
          <text x="180" y="176" textAnchor="middle" fill="#FEF08A" fontSize="9" fontFamily="monospace" fontWeight="bold">
            REVELATION 14:14 &amp; ISAIAH 65:21 · EDEN RESTORED
          </text>
          <text x="180" y="191" textAnchor="middle" fill="#6EE7B7" fontSize="8" fontFamily="monospace">
            “THEY SHALL BUILD HOUSES AND PLANT VINEYARDS”
          </text>
        </svg>
      );
  }
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
      {/* ====================================================================
          1. INTERACTIVE 1844–ENDTIME PROPHETIC PANORAMA VECTOR CHART
      ==================================================================== */}
      <div className="rounded-3xl bg-[#091810] border border-amber-500/35 p-5 sm:p-8 shadow-2xl flex flex-col gap-6 relative overflow-hidden">
        {/* Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-5 border-b border-emerald-900/70">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-amber-300 font-mono">
              <Sparkles size={13} className="text-amber-400" />
              <span>Prophetic Sanctuary &amp; Country Living Chart (1844 – Consummation)</span>
              <span aria-hidden="true" className="text-stone-600">
                ·
              </span>
              <span className="text-emerald-300">Daniel 8:14 · Revelation 13–18 · 5T 464.3</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              End-Time Events from 1844 to the Second Coming
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
              Click any prophetic milestone on the interactive vector chart below to inspect its biblical foundation, Spirit of Prophecy counsel, illustrated artwork, and practical Malawi homestead preparation step.
            </p>
          </div>

          {/* 3-Mode View Switcher + Prev/Next Controls */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto shrink-0">
            <div className="inline-flex items-center p-1 rounded-xl bg-black/40 border border-emerald-800/80">
              <button
                type="button"
                onClick={() => setViewMode('interactive')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap',
                  viewMode === 'interactive'
                    ? 'bg-amber-400 text-stone-950 font-bold'
                    : 'text-stone-300 hover:text-white'
                )}
              >
                Interactive Dossier
              </button>
              <button
                type="button"
                onClick={() => setViewMode('sanctuary-blueprint')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap',
                  viewMode === 'sanctuary-blueprint'
                    ? 'bg-amber-400 text-stone-950 font-bold'
                    : 'text-stone-300 hover:text-white'
                )}
              >
                1844 Sanctuary Vector Chart
              </button>
              <button
                type="button"
                onClick={() => setViewMode('panorama-grid')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap',
                  viewMode === 'panorama-grid'
                    ? 'bg-amber-400 text-stone-950 font-bold'
                    : 'text-stone-300 hover:text-white'
                )}
              >
                All 7 Illustrated Plates
              </button>
            </div>

            {viewMode === 'interactive' && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-xs font-semibold text-stone-200 flex items-center gap-1 transition-colors cursor-pointer"
                  title="Previous Prophetic Milestone"
                >
                  <ChevronLeft size={14} />
                  <span>Prev</span>
                </button>
                <span className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-400/40 font-mono text-xs font-bold text-amber-300 tabular-nums">
                  {activeEpoch.stageNumber}/07
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-2.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  title="Next Prophetic Milestone"
                >
                  <span>Next</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ====================================================================
            VIEW MODE B: 2300-DAY & TWO-APARTMENT SANCTUARY ARCHITECTURAL VECTOR BLUEPRINT
        ==================================================================== */}
        {viewMode === 'sanctuary-blueprint' && (
          <div className="rounded-2xl bg-[#041009] border border-amber-500/35 p-4 sm:p-6 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-900/70 pb-3">
              <div>
                <span className="text-xs font-mono text-amber-300 font-bold">
                  ARCHITECTURAL &amp; PROPHETIC SCHEMATIC · DANIEL 8:14 &amp; HEBREWS 8:1–5
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  The 2,300 Prophetic Days (457 BC – AD 1844) &amp; Two-Apartment Heavenly Sanctuary
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewMode('interactive')}
                className="px-3.5 py-2 rounded-xl bg-emerald-900/70 hover:bg-emerald-800 text-emerald-100 text-xs font-semibold cursor-pointer self-start sm:self-auto"
              >
                ← Back to Interactive 7-Epoch Dossier
              </button>
            </div>

            <div className="w-full overflow-x-auto custom-scrollbar">
              <svg
                viewBox="0 0 920 420"
                className="w-full min-w-[760px] h-auto select-none block"
                role="img"
                aria-label="Detailed Vector Chart of the 2300 Days of Daniel 8:14 and the Heavenly Sanctuary Most Holy Place entered in 1844"
              >
                <rect width="920" height="420" rx="16" fill="#05110A" />

                {/* TOP HALF: THE 2,300 PROPHETIC YEARS MATHEMATICAL DIAGRAM (457 BC TO 1844) */}
                <rect x="24" y="20" width="872" height="155" rx="12" fill="#081C11" stroke="#10B981" strokeWidth="1.5" />
                <text x="44" y="44" fill="#FDE047" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  I. THE 2,300 PROPHETIC DAYS / YEARS OF DANIEL 8:14 &amp; 9:24–27 (DAY-FOR-A-YEAR PRINCIPLE · NUMBERS 14:34; EZEKIEL 4:6)
                </text>

                {/* Main 2300-Year Span Bracket */}
                <path d="M 60 72 L 60 60 L 660 60 L 660 72" fill="none" stroke="#FBBF24" strokeWidth="2" />
                <text x="360" y="55" textAnchor="middle" fill="#FEF08A" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  2,300 PROPHETIC YEARS = 490 YEARS (70 WEEKS) + 1,810 YEARS → TERMINATING OCTOBER 22, 1844
                </text>

                {/* Primary Timeline Axis */}
                <line x1="60" y1="105" x2="860" y2="105" stroke="#34D399" strokeWidth="4" strokeLinecap="round" />

                {/* 490 Years Sub-Bracket */}
                <path d="M 60 120 L 60 132 L 340 132 L 340 120" fill="none" stroke="#38BDF8" strokeWidth="1.8" />
                <text x="200" y="146" textAnchor="middle" fill="#7DD3FC" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  70 WEEKS (490 YEARS) CUT OFF FOR ISRAEL (DAN 9:24)
                </text>

                {/* 1810 Years Sub-Bracket */}
                <path d="M 340 120 L 340 132 L 660 132 L 660 120" fill="none" stroke="#F59E0B" strokeWidth="1.8" />
                <text x="500" y="146" textAnchor="middle" fill="#FDE68A" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  REMAINING 1,810 YEARS TO 1844 (DAN 8:14)
                </text>

                {/* Prophetic Time Nodes */}
                {[
                  { x: 60, year: '457 BC', event: 'Artaxerxes Decree', sub: 'Ezra 7:11–26', color: '#10B981' },
                  { x: 185, year: 'AD 27', event: 'Messiah Anointed', sub: 'Luke 3:21–22', color: '#38BDF8' },
                  { x: 262, year: 'AD 31', event: 'Crucifixion', sub: 'Midst of Week', color: '#F43F5E' },
                  { x: 340, year: 'AD 34', event: 'Gospel to Gentiles', sub: 'End of 70 Weeks', color: '#38BDF8' },
                  { x: 660, year: 'OCT 22, 1844', event: 'Sanctuary Cleansed', sub: 'Investigative Judgment', color: '#FBBF24' },
                  { x: 845, year: 'CONSUMMATION', event: 'Second Coming', sub: 'Rev 14:14–16', color: '#FACC15' },
                ].map((pt) => (
                  <g key={pt.year}>
                    <circle cx={pt.x} cy={105} r="8" fill={pt.color} stroke="#FFFFFF" strokeWidth="2" />
                    <text x={pt.x} y={84} textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
                      {pt.year}
                    </text>
                    <text x={pt.x} y={95} textAnchor="middle" fill={pt.color} fontSize="8" fontFamily="sans-serif" fontWeight="bold">
                      {pt.event}
                    </text>
                    <text x={pt.x} y={164} textAnchor="middle" fill="#A7F3D0" fontSize="7.5" fontFamily="monospace">
                      {pt.sub}
                    </text>
                  </g>
                ))}

                {/* BOTTOM HALF: ARCHITECTURAL CUTAWAY OF THE TWO-APARTMENT SANCTUARY & END-TIME PREPARATION */}
                <rect x="24" y="190" width="872" height="210" rx="12" fill="#07170E" stroke="#F59E0B" strokeWidth="1.5" />
                <text x="44" y="214" fill="#FDE047" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  II. ARCHITECTURAL PLAN OF SALVATION: EARTHLY COURTYARD → HOLY PLACE (AD 31–1844) → MOST HOLY PLACE (SINCE OCT 22, 1844)
                </text>

                {/* Zone 1: Outer Courtyard (AD 31 Cross) */}
                <rect x="44" y="230" width="210" height="148" rx="10" fill="#0B2115" stroke="#34D399" strokeWidth="1.5" />
                <text x="149" y="250" textAnchor="middle" fill="#6EE7B7" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  1. OUTER COURT (EARTH)
                </text>
                {/* Altar of Sacrifice & Laver */}
                <rect x="75" y="278" width="46" height="40" rx="4" fill="#78350F" stroke="#F97316" strokeWidth="1.8" />
                <path d="M88 278 Q98 256 108 278" fill="#F97316" />
                <text x="98" y="334" textAnchor="middle" fill="#FDBA74" fontSize="8" fontFamily="monospace" fontWeight="bold">
                  ALTAR (AD 31)
                </text>
                <circle cx="185" cy="298" r="20" fill="#0284C7" fillOpacity="0.35" stroke="#38BDF8" strokeWidth="1.8" />
                <text x="185" y="334" textAnchor="middle" fill="#7DD3FC" fontSize="8" fontFamily="monospace" fontWeight="bold">
                  LAVER OF WATER
                </text>
                <text x="149" y="362" textAnchor="middle" fill="#D1FAE5" fontSize="8" fontFamily="sans-serif">
                  Calvary Sacrifice &amp; Rebirth
                </text>

                {/* Arrow 1 -> 2 */}
                <path d="M 256 304 L 284 304" stroke="#FBBF24" strokeWidth="2.5" />
                <polygon points="284,299 294,304 284,309" fill="#FBBF24" />

                {/* Zone 2: First Apartment / Holy Place (AD 31 – 1844) */}
                <rect x="298" y="230" width="250" height="148" rx="10" fill="#0D2618" stroke="#38BDF8" strokeWidth="1.5" />
                <text x="423" y="250" textAnchor="middle" fill="#7DD3FC" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  2. HOLY PLACE (AD 31 – 1844)
                </text>
                {/* 7-Branched Lampstand, Table of Showbread, Golden Altar of Incense */}
                <g transform="translate(335, 275)">
                  <line x1="20" y1="5" x2="20" y2="42" stroke="#FBBF24" strokeWidth="2.5" />
                  <path d="M6 12 Q20 28 34 12" fill="none" stroke="#FBBF24" strokeWidth="2" />
                  <path d="M12 8 Q20 20 28 8" fill="none" stroke="#FBBF24" strokeWidth="2" />
                  <text x="20" y="56" textAnchor="middle" fill="#FDE68A" fontSize="7.5" fontFamily="monospace">7 LAMPS</text>
                </g>
                <g transform="translate(405, 280)">
                  <rect x="0" y="10" width="42" height="26" rx="3" fill="#92400E" stroke="#FDE047" strokeWidth="1.5" />
                  <text x="21" y="51" textAnchor="middle" fill="#FDE68A" fontSize="7.5" fontFamily="monospace">SHOWBREAD</text>
                </g>
                <g transform="translate(482, 278)">
                  <rect x="6" y="8" width="28" height="30" rx="3" fill="#B45309" stroke="#FDE047" strokeWidth="1.5" />
                  <path d="M20 8 Q15 -4 25 -8" stroke="#A7F3D0" strokeWidth="1.5" fill="none" />
                  <text x="20" y="53" textAnchor="middle" fill="#FDE68A" fontSize="7.5" fontFamily="monospace">INCENSE</text>
                </g>
                <text x="423" y="362" textAnchor="middle" fill="#BAE6FD" fontSize="8" fontFamily="sans-serif">
                  Daily Intercession of Christ our High Priest
                </text>

                {/* Arrow 2 -> 3 (Oct 22, 1844 Transition through the Second Veil) */}
                <path d="M 550 304 L 584 304" stroke="#FBBF24" strokeWidth="3" />
                <polygon points="584,298 596,304 584,310" fill="#FBBF24" />
                <text x="573" y="290" textAnchor="middle" fill="#FDE047" fontSize="8" fontFamily="monospace" fontWeight="bold">
                  1844
                </text>

                {/* Zone 3: Second Apartment / Most Holy Place (Oct 22, 1844 – Close of Probation) */}
                <rect x="600" y="230" width="276" height="148" rx="10" fill="#182210" stroke="#FBBF24" strokeWidth="2.2" />
                <text x="738" y="250" textAnchor="middle" fill="#FDE047" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  3. MOST HOLY PLACE (SINCE OCT 22, 1844)
                </text>
                {/* Shekinah Glory & Ark of the Covenant with Ten Commandments */}
                <circle cx="738" cy="296" r="36" fill="#F59E0B" fillOpacity="0.22" />
                <rect x="718" y="268" width="18" height="24" rx="2" fill="#1E293B" stroke="#FDE68A" strokeWidth="1.4" />
                <rect x="740" y="268" width="18" height="24" rx="2" fill="#1E293B" stroke="#FDE68A" strokeWidth="1.4" />
                <rect x="692" y="294" width="92" height="32" rx="4" fill="#92400E" stroke="#FDE047" strokeWidth="2" />
                <line x1="674" y1="310" x2="802" y2="310" stroke="#FEF08A" strokeWidth="2.8" />
                <text x="738" y="342" textAnchor="middle" fill="#FEF08A" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
                  ARK OF THE TESTAMENT &amp; LAW OF GOD (REV 11:19)
                </text>
                <text x="738" y="362" textAnchor="middle" fill="#FDE68A" fontSize="8" fontFamily="sans-serif">
                  Investigative Judgment · Three Angels · Country Living Preparation
                </text>
              </svg>
            </div>
          </div>
        )}

        {/* ====================================================================
            VIEW MODE C: ALL 7 ILLUSTRATED PLATES PANORAMA GALLERY
        ==================================================================== */}
        {viewMode === 'panorama-grid' && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-900/70 pb-3">
              <div>
                <span className="text-xs font-mono text-amber-300 font-bold">
                  COMPLETE 7-PLATE VISUAL SEQUENCE · 1844 TO THE EARTH MADE NEW
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  All 7 End-Time Prophetic Paintings &amp; Vector Schematics
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewMode('interactive')}
                className="px-3.5 py-2 rounded-xl bg-emerald-900/70 hover:bg-emerald-800 text-emerald-100 text-xs font-semibold cursor-pointer self-start sm:self-auto"
              >
                ← Back to Interactive 7-Epoch Dossier
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROPHETIC_EPOCHS_1844.map((epoch) => (
                <div
                  key={epoch.id}
                  className="rounded-2xl bg-[#05120B] border border-emerald-800/70 hover:border-amber-400/60 overflow-hidden flex flex-col justify-between transition-all shadow-lg group"
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
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/75 border border-amber-400/40 font-mono text-caption font-bold text-amber-300">
                        STAGE {epoch.stageNumber} · {epoch.eraLabel.split('·')[0].trim()}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxEpoch(epoch);
                        }}
                        className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/70 hover:bg-amber-400 text-amber-200 hover:text-stone-950 border border-white/15 transition-colors cursor-pointer"
                        title="Enlarge Prophetic Painting"
                      >
                        <Maximize2 size={12} />
                      </button>
                      <div className="absolute bottom-2.5 left-3 right-3">
                        <h4 className="font-display text-base font-bold text-white leading-snug">
                          {epoch.shortTitle}
                        </h4>
                        <p className="text-caption font-mono text-emerald-300">
                          {epoch.scriptureRef} · {epoch.egwCode}
                        </p>
                      </div>
                    </div>

                    {/* Middle Custom Vector Schematic */}
                    <div className="p-3 bg-[#040E08] border-y border-emerald-900/70 h-36">
                      <EpochVectorSchematic epochId={epoch.id} />
                    </div>

                    {/* Quote & Summary */}
                    <div className="p-4 flex flex-col gap-2">
                      <p className="font-serif text-xs italic text-stone-200 line-clamp-3 leading-relaxed">
                        “{epoch.egwQuote}”
                      </p>
                      <p className="text-caption text-amber-300 font-semibold">
                        — {epoch.egwSource}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 pb-4 pt-2 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveEpochId(epoch.id);
                        setViewMode('interactive');
                      }}
                      className="text-xs font-bold text-emerald-300 hover:text-amber-300 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Open Full Dossier</span>
                      <ArrowRight size={12} />
                    </button>

                    <Link
                      to={epoch.actionLink.to}
                      className="text-caption font-mono text-stone-400 hover:text-white underline"
                    >
                      {epoch.actionLink.label}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Master Panoramic SVG Prophetic Chart (960 x 210) */}
        {viewMode === 'interactive' && (
          <>
            <div className="w-full overflow-x-auto custom-scrollbar rounded-2xl bg-[#05100A] border border-emerald-900/80 p-3">
          <svg
            viewBox="0 0 950 215"
            className="w-full min-w-[760px] h-auto select-none block"
            role="img"
            aria-label="Interactive Prophetic Timeline from 457 BC and 1844 to the Second Coming"
          >
            <defs>
              <linearGradient id="propheticLineGrad" x1="0" y1="0" x2="950" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="35%" stopColor="#10B981" />
                <stop offset="70%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#FACC15" />
              </linearGradient>
            </defs>

            {/* Subtle Chart Grid */}
            <line x1="20" y1="45" x2="930" y2="45" stroke="#064E3B" strokeWidth="0.6" strokeDasharray="4 4" />
            <line x1="20" y1="165" x2="930" y2="165" stroke="#064E3B" strokeWidth="0.6" strokeDasharray="4 4" />

            {/* Pre-1844 2300-Day Lead-In Arc */}
            <path
              d="M 18 110 Q 52 75 85 110"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
            <text x="48" y="76" textAnchor="middle" fill="#FDE68A" fontSize="8" fontFamily="monospace" fontWeight="bold">
              2300 DAYS
            </text>
            <text x="48" y="86" textAnchor="middle" fill="#A7F3D0" fontSize="7" fontFamily="monospace">
              457 BC–1844
            </text>

            {/* Main Prophetic Timeline Axis */}
            <line
              x1="85"
              y1="110"
              x2="865"
              y2="110"
              stroke="url(#propheticLineGrad)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* 7 Interactive Milestone Nodes */}
            {PROPHETIC_EPOCHS_1844.map((epoch) => {
              const isSelected = epoch.id === activeEpochId;
              const cx = epoch.chartX;

              return (
                <g
                  key={epoch.id}
                  onClick={() => setActiveEpochId(epoch.id)}
                  className="cursor-pointer group"
                >
                  {/* Vertical Connector Stem */}
                  <line
                    x1={cx}
                    y1={isSelected ? 52 : 66}
                    x2={cx}
                    y2={152}
                    stroke={isSelected ? epoch.accentColor : '#1E293B'}
                    strokeWidth={isSelected ? '2' : '1.2'}
                  />

                  {/* Top Stage Pill on Chart */}
                  <rect
                    x={cx - 54}
                    y={18}
                    width="108"
                    height="32"
                    rx="8"
                    fill={isSelected ? '#1C2D22' : '#081810'}
                    stroke={isSelected ? epoch.accentColor : '#064E3B'}
                    strokeWidth={isSelected ? '2' : '1'}
                  />
                  <text
                    x={cx}
                    y={31}
                    textAnchor="middle"
                    fill={isSelected ? '#FDE047' : '#A7F3D0'}
                    fontSize="8"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    STAGE {epoch.stageNumber}
                  </text>
                  <text
                    x={cx}
                    y={43}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="8.5"
                    fontFamily="sans-serif"
                    fontWeight="bold"
                  >
                    {epoch.shortTitle}
                  </text>

                  {/* Center Glowing Node on Axis */}
                  {isSelected && (
                    <circle
                      cx={cx}
                      cy={110}
                      r="18"
                      fill={epoch.accentColor}
                      fillOpacity="0.25"
                    />
                  )}
                  <circle
                    cx={cx}
                    cy={110}
                    r={isSelected ? '10' : '7'}
                    fill={isSelected ? epoch.accentColor : '#0B2417'}
                    stroke={isSelected ? '#FFFFFF' : epoch.accentColor}
                    strokeWidth="2.2"
                  />

                  {/* Bottom Reference Label */}
                  <rect
                    x={cx - 56}
                    y={152}
                    width="112"
                    height="38"
                    rx="7"
                    fill={isSelected ? '#132A1D' : '#07140D'}
                    stroke={isSelected ? epoch.accentColor : '#064E3B'}
                    strokeWidth="1"
                  />
                  <text
                    x={cx}
                    y={167}
                    textAnchor="middle"
                    fill={isSelected ? '#FDE68A' : '#94A3B8'}
                    fontSize="7.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {epoch.eraLabel.split('·')[0].trim()}
                  </text>
                  <text
                    x={cx}
                    y={180}
                    textAnchor="middle"
                    fill={isSelected ? '#6EE7B7' : '#64748B'}
                    fontSize="7.5"
                    fontFamily="monospace"
                  >
                    {epoch.scriptureRef.split(';')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* 7 Quick Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {PROPHETIC_EPOCHS_1844.map((epoch) => {
            const isSelected = epoch.id === activeEpochId;
            return (
              <button
                key={epoch.id}
                type="button"
                onClick={() => setActiveEpochId(epoch.id)}
                className={cn(
                  'p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1',
                  isSelected
                    ? 'bg-amber-400 text-stone-950 border-amber-300 font-bold shadow-md'
                    : 'bg-white/[0.04] hover:bg-white/[0.09] text-stone-200 border-white/10'
                )}
              >
                <span
                  className={cn(
                    'text-caption font-mono font-bold',
                    isSelected ? 'text-stone-900' : 'text-amber-300'
                  )}
                >
                  {epoch.stageNumber} · {epoch.eraLabel.split('·')[0].trim()}
                </span>
                <span className="text-xs font-semibold truncate">{epoch.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* ====================================================================
            2. ACTIVE EPOCH ILLUSTRATED DOSSIER (PAINTING + VECTOR SCHEMATIC + COUNSEL)
        ==================================================================== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEpoch.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 items-stretch"
          >
            {/* Left Column (5 Cols): High-Res Prophetic Painting + Vector Schematic */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Prophetic Painting Card with Fullscreen Lightbox Trigger */}
              <div
                onClick={() => setLightboxEpoch(activeEpoch)}
                className="group relative rounded-2xl overflow-hidden border border-amber-500/35 bg-stone-950 h-60 sm:h-68 cursor-pointer shadow-lg"
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
                  className="absolute top-3 right-3 px-2.5 py-1.5 rounded-lg bg-black/70 hover:bg-amber-400 text-amber-200 hover:text-stone-950 border border-white/20 text-caption font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Maximize2 size={12} />
                  <span>Enlarge Plate</span>
                </button>
                <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col gap-1">
                  <span className="text-caption font-mono uppercase tracking-wider text-amber-300 font-bold">
                    Prophetic Plate {activeEpoch.stageNumber} · {activeEpoch.scriptureRef}
                  </span>
                  <p className="text-xs text-stone-200 leading-snug">
                    {activeEpoch.imageCaption}
                  </p>
                </div>
              </div>

              {/* Companion Custom Vector Schematic */}
              <div className="rounded-2xl border border-emerald-800/70 bg-[#05110A] p-3 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-caption font-mono text-emerald-300 px-1">
                  <span>PROPHETIC VECTOR DIAGRAM</span>
                  <span className="text-amber-300">{activeEpoch.egwCode}</span>
                </div>
                <div className="w-full h-44">
                  <EpochVectorSchematic epochId={activeEpoch.id} />
                </div>
              </div>
            </div>

            {/* Right Column (7 Cols): Scripture, Verbatim EGW Counsel & Malawi Outpost Directive */}
            <div className="lg:col-span-7 rounded-2xl bg-[#06140D] border border-emerald-900/80 p-5 sm:p-7 flex flex-col justify-between gap-5">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/70 pb-3">
                  <span className="text-xs font-mono font-bold text-amber-300">
                    STAGE {activeEpoch.stageNumber} · {activeEpoch.eraLabel}
                  </span>
                  <a
                    href={activeEpoch.egwUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-emerald-300 hover:text-amber-300 hover:underline"
                  >
                    <span>Verify {activeEpoch.egwCode} on EGW Estate</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {activeEpoch.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-300 font-medium mt-1">
                    {activeEpoch.subtitle}
                  </p>
                </div>

                {/* KJV Scripture Block */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col gap-1">
                  <span className="text-caption font-mono font-bold text-amber-300">
                    BIBLICAL FOUNDATION · {activeEpoch.scriptureRef} (KJV)
                  </span>
                  <p className="font-serif text-sm italic text-stone-100 leading-relaxed">
                    “{activeEpoch.scriptureText}”
                  </p>
                </div>

                {/* Verbatim Spirit of Prophecy Counsel */}
                <blockquote className="border-l-2 border-emerald-400 pl-4 py-1 flex flex-col gap-1.5">
                  <p className="font-serif text-sm sm:text-base italic text-stone-100 leading-relaxed">
                    “{activeEpoch.egwQuote}”
                  </p>
                  <footer className="text-xs text-amber-300 font-semibold">
                    — Ellen G. White, {activeEpoch.egwSource} ({activeEpoch.egwCode})
                  </footer>
                </blockquote>

                {/* Historical & Prophetic Explanation */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono font-bold text-emerald-300">
                    Prophetic Fulfillment &amp; Context
                  </span>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {activeEpoch.theologicalSignificance}
                  </p>
                </div>
              </div>

              {/* Practical Malawi Homestead Action Box */}
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-caption font-mono font-bold text-amber-300 flex items-center gap-1.5">
                    <Compass size={13} />
                    <span>Malawi Country Living Application</span>
                  </span>
                  <p className="text-xs text-stone-200 leading-relaxed">
                    {activeEpoch.countryLivingDirective}
                  </p>
                </div>

                <Link
                  to={activeEpoch.actionLink.to}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors whitespace-nowrap"
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

      {/* ====================================================================
          3. FULLSCREEN PROPHETIC PLATE LIGHTBOX MODAL
      ==================================================================== */}
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
              className="max-w-5xl w-full rounded-3xl bg-[#07150E] border border-amber-500/40 overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-4 bg-[#040E08] border-b border-emerald-900/80 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-mono text-amber-300 font-bold">
                    PROPHETIC PLATE {lightboxEpoch.stageNumber} · {lightboxEpoch.eraLabel}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                    {lightboxEpoch.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxEpoch(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
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

              <div className="p-5 bg-[#07150E] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-stone-200">
                <div className="flex flex-col gap-1 max-w-3xl">
                  <p className="font-serif italic text-amber-200 text-sm">
                    “{lightboxEpoch.egwQuote}” — {lightboxEpoch.egwSource}
                  </p>
                  <p className="text-stone-400">{lightboxEpoch.imageCaption}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxEpoch(null)}
                  className="px-4 py-2 rounded-xl bg-amber-400 text-stone-950 font-bold shrink-0 cursor-pointer"
                >
                  Close Plate
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
