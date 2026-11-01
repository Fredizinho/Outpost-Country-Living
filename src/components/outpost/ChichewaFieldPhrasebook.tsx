import React, { useState, useMemo } from 'react';
import { MessageSquare, Search, ShieldCheck } from 'lucide-react';
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
    chichewa: 'Kodi pansi pano pali madzi a dambo kapena dongo lofiira la Katondo?',
    phonetic: 'Koh-dee pahn-see pah-noh pah-lee mah-dzee ah dahm-boh kah-peh-nah dohn-goh loh-fee-ee-rah lah Kah-tohn-doh?',
    englishMeaning: 'Is there dambo sub-surface water or fertile Katondo red clay loam here?',
    culturalContext:
      'Dambo land provides year-round moisture for green vegetables (Dimba), while Katondo red loam supports perennial fruit trees without waterlogging.',
  },
  {
    id: 'phr-7',
    category: 'Seeds & Fellowship',
    chichewa: 'Tabweretsa mbewu zachilengedwe za mtedza wa Nzama ndi Nkhwani kuti tigawane.',
    phonetic: 'Tah-bweh-ret-sah mbeh-woo zah-chee-len-ged-weh zah mtehd-zah wah N-zah-mah ndee N-khwah-nee koo-tee tee-gah-wah-neh.',
    englishMeaning: 'We have brought heirloom Bambara groundnuts and pumpkin seeds to share with the village.',
    culturalContext:
      'Sharing seeds immediately cements friendship and signals mutual agricultural cooperation with rural neighbors.',
  },
  {
    id: 'phr-8',
    category: 'Seeds & Fellowship',
    chichewa: 'Mulungu akudalitseni kwambiri chifukwa cha mtima wanu wachikondi ndi kulandira alendo.',
    phonetic: 'Moo-loon-goo ah-koo-dah-leet-seh-nee kwahm-bee-ree chee-foo-kwah chah mtee-mah wah-noo wah-chee-kohn-dee ndee koo-lahn-dee-rah ah-len-doh.',
    englishMeaning: 'May God richly bless you for your generous heart and warm hospitality.',
    culturalContext:
      'The traditional parting blessing after meetings with village elders, expressing genuine Christian gratitude.',
  },
];

export function ChichewaFieldPhrasebook() {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [query, setQuery] = useState<string>('');

  const categories = useMemo(() => {
    return [
      'All',
      'Chief & Village Protocol',
      'Land & Boundaries',
      'Water & Soil Scouting',
      'Seeds & Fellowship',
    ];
  }, []);

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
    <section className="p-6 sm:p-8 rounded-[var(--radius-sheet)] bg-[var(--surface)] text-[var(--ink)] border border-[var(--border)] shadow-xs flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans font-semibold text-[var(--accent)]">
            <MessageSquare size={14} />
            <span>Malawi cultural protocol &amp; phonetic field guide</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--ink)] mt-1">
            Chichewa Chief (<em>Mfumu</em>) Etiquette &amp; Land Scouting Phrasebook
          </h3>
          <p className="text-xs sm:text-sm text-[var(--ink-muted)] max-w-3xl mt-1">
            Essential Chichewa expressions with phonetic pronunciation and cultural etiquette for visiting a Village Headman (<em>Nyakwawa</em>), verifying <em>Mwini Mbumba</em> clan consent, and scouting perennial water.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--accent)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Chichewa or English..."
            className="w-full pl-9 pr-3 py-2 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] text-xs text-[var(--ink)] placeholder:text-[var(--ink-muted)] focus:outline-none focus:border-[var(--accent)] font-sans"
          />
        </div>
      </div>

      {/* Interactive Category Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 bg-[var(--ground)] p-1.5 rounded-[var(--radius-control)] border border-[var(--border)] self-start">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCat(cat)}
            className={cn(
              'px-3 py-1.5 rounded-[var(--radius-control)] text-xs font-sans font-semibold transition-all cursor-pointer',
              selectedCat === cat
                ? 'bg-[var(--accent)] text-white shadow-xs'
                : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
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
            className="p-5 rounded-[var(--radius-card)] bg-[var(--ground)] border border-[var(--border)] hover:border-[var(--accent)] transition-all flex flex-col justify-between gap-3"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2 text-caption font-sans font-semibold text-[var(--accent)]">
                <span>{p.category}</span>
                <span className="text-[var(--success)] font-medium">Chichewa Standard</span>
              </div>

              <p className="font-serif text-lg sm:text-xl font-bold text-[var(--ink)] leading-snug">
                “{p.chichewa}”
              </p>

              <p className="text-xs font-sans italic text-[var(--ink-muted)] bg-[var(--surface)] px-3 py-1.5 rounded-[var(--radius-control)] border border-[var(--border)]">
                Pronunciation: {p.phonetic}
              </p>

              <p className="text-xs sm:text-sm font-semibold text-[var(--moss)] dark:text-[var(--gold)] mt-1">
                Meaning: “{p.englishMeaning}”
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--border)] text-xs text-[var(--ink-muted)] leading-relaxed flex items-start gap-2">
              <ShieldCheck size={14} className="text-[var(--accent)] shrink-0 mt-0.5" />
              <span>{p.culturalContext}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
