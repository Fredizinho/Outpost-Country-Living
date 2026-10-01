import React, { useState, useMemo } from 'react';
import { MessageSquare, Search, ShieldCheck, Users, Compass, Sprout } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChichewaPhraseItem {
  id: string;
  category: 'Chief & Village Protocol' | 'Land & Boundaries' | 'Water & Soil Scouting' | 'Seeds & Fellowship';
  chichewa: string;
  phonetic: string;
  englishMeaning: string;
  culturalContext: string;
}

const CHICHEWA_FIELD_PHRASES: ChichewaPhraseItem[] = [
  {
    id: 'phr-1',
    category: 'Chief & Village Protocol',
    chichewa: 'Odi! Tikupempha kulowa pa bwalo la Mfumu.',
    phonetic: 'Oh-dee! Tee-koo-pem-pah koo-loh-wah pah bwah-loh lah Mfoo-moo.',
    englishMeaning: 'Excuse us / May we approach the Chief’s courtyard?',
    culturalContext:
      'Always announce "Odi!" respectfully and wait to be invited before stepping onto a Village Headman’s (Nyakwawa) or Traditional Authority’s homestead.',
  },
  {
    id: 'phr-2',
    category: 'Chief & Village Protocol',
    chichewa: 'Moni Bambo Mfumu, tabwera mwamtendere kudzafuna malo a ulimi ndi banja lathu.',
    phonetic: 'Moh-nee Bam-boh Mfoo-moo, tah-bweh-rah mwahm-ten-deh-reh koo-dzah-foo-nah mah-loh ah oo-lee-mee ndee bahn-jah lah-thoo.',
    englishMeaning: 'Greetings Chief, we have come in peace seeking agricultural land for our family.',
    culturalContext:
      'Clarifies immediately that you are a peaceful family seeking homestead farming land—not speculative middlemen.',
  },
  {
    id: 'phr-3',
    category: 'Land & Boundaries',
    chichewa: 'Mwini mbumba ndi ankhoswe onse akugwirizana ndi kugawa kwa malo amenewa?',
    phonetic: 'Mwee-nee mboom-bah ndee ahn-khoh-sweh ohn-seh ah-koo-gwee-ree-zah-nah ndee koo-gah-wah kwah mah-loh ah-meh-neh-wah?',
    englishMeaning: 'Do the senior clan head (Mwini Mbumba) and all maternal guardians consent to this land allocation?',
    culturalContext:
      'Critical under the Customary Land Act (2016) in Central & Southern Malawi (matrilineal Chikamwini areas) to prevent future clan disputes.',
  },
  {
    id: 'phr-4',
    category: 'Land & Boundaries',
    chichewa: 'Tiyeni tiyende malire onse pamodzi ndi eni malo oyandikana nawo.',
    phonetic: 'Tee-yeh-nee tee-yen-deh mah-lee-reh ohn-seh pah-moh-dzee ndee eh-nee mah-loh oh-yahn-dee-kah-nah nah-woh.',
    englishMeaning: 'Let us walk the entire perimeter boundary together with all adjoining neighbors.',
    culturalContext:
      'Never rely on pointed fingers from a distance. Walk every corner and plant Khonje (sisal) beacons with neighbors present as witnesses (Mboni).',
  },
  {
    id: 'phr-5',
    category: 'Water & Soil Scouting',
    chichewa: 'Kodi kasupe kapena mtsinje uwu umauma m’mwezi wa Okutobala (Chilimwe)?',
    phonetic: 'Koh-dee kah-soo-peh kah-peh-nah mtseen-jeh oo-woo oo-mah-oo-mah mm-weh-zee wah Oh-koo-toh-bah-lah?',
    englishMeaning: 'Does this spring or stream dry up in the month of October (peak dry season)?',
    culturalContext:
      'Many streams flow strongly in March (Dzinja) but dry completely by October. Ask elders specifically about October flow.',
  },
  {
    id: 'phr-6',
    category: 'Water & Soil Scouting',
    chichewa: 'Dothi lofiira lachonde (Katondo) ndi dambo losunga chinyezi.',
    phonetic: 'Doh-thee loh-fee-ee-rah lah-chohn-deh (Kah-tohn-doh) ndee dahm-boh loh-soon-gah chee-nyeh-zee.',
    englishMeaning: 'Fertile red clay-loam upland soil (Katondo) and moisture-retaining valley soil (Dambo).',
    culturalContext:
      'An ideal Malawi outpost parcel combines upland Katondo soil for orchards/rainfed maize and a lower Dambo margin for dry-season Dimba gardening.',
  },
  {
    id: 'phr-7',
    category: 'Seeds & Fellowship',
    chichewa: 'Tikufuna mbewu za makolo zosinthika (OPV) monga chimanga, nzama, ndi khobwe.',
    phonetic: 'Tee-koo-foo-nah mbeh-woo zah mah-koh-loh zoh-seen-thee-kah mohn-gah chee-mahn-gah, nzah-mah, ndee khoh-bweh.',
    englishMeaning: 'We are looking for open-pollinated heirloom seeds (OPV) such as local maize, Bambara groundnuts, and cowpeas.',
    culturalContext:
      'Helps connect with local seed-saving grandmothers and extension officers who preserve non-hybrid varieties.',
  },
  {
    id: 'phr-8',
    category: 'Seeds & Fellowship',
    chichewa: 'Zikomo kwambiri, Mulungu adalitse mudzi uno ndi mabanja anu.',
    phonetic: 'Zee-koh-moh kwahm-bee-ree, Moo-loon-goo ah-dah-lee-tseh moo-dzee oo-noh ndee mah-bahn-jah ah-noo.',
    englishMeaning: 'Thank you very much; may God bless this village and your families.',
    culturalContext:
      'A warm, respectful closing blessing when concluding a meeting with the Village Headman and Customary Land Committee.',
  },
];

export function ChichewaFieldPhrasebook() {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [query, setQuery] = useState('');

  const categories = [
    'All',
    'Chief & Village Protocol',
    'Land & Boundaries',
    'Water & Soil Scouting',
    'Seeds & Fellowship',
  ];

  const filteredPhrases = useMemo(() => {
    return CHICHEWA_FIELD_PHRASES.filter((item) => {
      const matchesCategory = selectedCat === 'All' || item.category === selectedCat;
      if (!matchesCategory) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        item.chichewa.toLowerCase().includes(q) ||
        item.englishMeaning.toLowerCase().includes(q) ||
        item.culturalContext.toLowerCase().includes(q)
      );
    });
  }, [selectedCat, query]);

  return (
    <section className="p-6 sm:p-8 rounded-3xl bg-[#0B2517] text-white border border-emerald-800 shadow-xl flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
            <MessageSquare size={14} />
            <span>Malawi Cultural Protocol & Phonetic Field Guide</span>
          </div>
          <h3 className="serif text-2xl sm:text-3xl font-bold text-white mt-1">
            Chichewa Chief (<em>Mfumu</em>) Etiquette & Land Scouting Phrasebook
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/80 max-w-3xl mt-1">
            Essential Chichewa expressions with phonetic pronunciation and cultural etiquette for visiting a Village Headman (<em>Nyakwawa</em>), verifying <em>Mwini Mbumba</em> clan consent, and scouting perennial water.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-300" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Chichewa or English..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#06180E] border border-emerald-700/70 text-xs text-white placeholder:text-emerald-200/40 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Interactive Category Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 bg-[#06180E] p-1.5 rounded-2xl border border-emerald-800/80 self-start">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCat(cat)}
            className={cn(
              'px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer',
              selectedCat === cat
                ? 'bg-amber-400 text-stone-950 shadow-xs'
                : 'text-emerald-200/80 hover:text-white'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Phrase Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPhrases.map((p) => (
          <div
            key={p.id}
            className="p-5 rounded-2xl bg-[#06180E] border border-emerald-800/80 hover:border-amber-400/50 transition-all flex flex-col justify-between gap-3"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-wider text-amber-300">
                <span>{p.category}</span>
                <span className="text-emerald-300">Chichewa Standard</span>
              </div>

              <p className="serif text-lg sm:text-xl font-bold text-white leading-snug">
                “{p.chichewa}”
              </p>

              <p className="text-xs font-mono text-amber-200/90 bg-black/30 px-3 py-1.5 rounded-lg border border-white/5">
                Pronunciation: {p.phonetic}
              </p>

              <p className="text-xs sm:text-sm font-semibold text-emerald-200 mt-1">
                Meaning: “{p.englishMeaning}”
              </p>
            </div>

            <div className="pt-3 border-t border-emerald-900/80 text-xs text-stone-300 leading-relaxed flex items-start gap-2">
              <ShieldCheck size={14} className="text-amber-400 shrink-0 mt-0.5" />
              <span>{p.culturalContext}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
