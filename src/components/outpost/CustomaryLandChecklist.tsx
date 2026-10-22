import React, { useState, useEffect } from 'react';
import { Scale, CheckCircle2, Circle, Printer, ShieldAlert, FileCheck2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomaryStep {
  id: string;
  stepNumber: string;
  title: string;
  chichewaTerm: string;
  authorityLevel: string;
  description: string;
  warningNote: string;
}

const CUSTOMARY_LAND_STEPS: CustomaryStep[] = [
  {
    id: 'cl-step-1',
    stepNumber: 'STEP 01',
    title: 'Introductory Protocol Visit to the Village Headman',
    chichewaTerm: 'Mfumu ya Mudzi / Nyakwawa',
    authorityLevel: 'Village Level',
    description:
      'Introduce your family’s peaceful country-living and agricultural mission to the local Village Headman (Nyakwawa) and elders before negotiating price with any individual.',
    warningNote: 'Never pay cash advances to brokers or relatives claiming ownership without the Village Headman’s knowledge.'
  },
  {
    id: 'cl-step-2',
    stepNumber: 'STEP 02',
    title: 'Lineage & Family Clan Verification (Matrilineal / Patrilineal)',
    chichewaTerm: 'Chikamwini / Mwini Mbumba vs. Lobola Clan Elders',
    authorityLevel: 'Extended Family Clan',
    description:
      'Verify that all senior maternal uncles (Ankhoswe / Mwini Mbumba in Central & Southern regions) or patrilineal elders (in Northern region) consent to the allocation and have no pending inheritance disputes.',
    warningNote: 'In Chewa, Yao, Lomwe, and Mang’anja areas, a husband cannot sell maternal clan land without the Mwini Mbumba’s signed consent.'
  },
  {
    id: 'cl-step-3',
    stepNumber: 'STEP 03',
    title: 'Physical Boundary Walk with All Adjacent Neighbors',
    chichewaTerm: 'Kuyenda Malire & Mboni za Malire',
    authorityLevel: 'Boundary Witnesses &amp; Customary Land Committee (CLC)',
    description:
      'Walk the entire perimeter with the Village Headman, all 4 neighboring landholders, and the Customary Land Committee (Komiti ya Malo). Plant permanent sisal (Khonje) or stone beacons and record GPS corner coordinates.',
    warningNote: 'Ensure every adjoining neighbor signs or thumbprints the boundary sketch map as a witness (Mboni).'
  },
  {
    id: 'cl-step-4',
    stepNumber: 'STEP 04',
    title: 'Group Village Headman (GVH) & Traditional Authority (T/A) Endorsement',
    chichewaTerm: 'Chizindikiro cha GVH ndi Traditional Authority (T/A)',
    authorityLevel: 'Chieftaincy &amp; Traditional Authority Stamp',
    description:
      'Obtain the official stamped consultation letter from the Group Village Headman (GVH) and counter-signature from the Senior Chief / Traditional Authority (T/A) confirming the parcel is free of dispute.',
    warningNote: 'Ensure the official T/A ink stamp and registration book entry number are recorded on your copy.'
  },
  {
    id: 'cl-step-5',
    stepNumber: 'STEP 05',
    title: 'District Land Registry Filing for Customary Estate',
    chichewaTerm: 'Kalata ya Umwini wa Malo (Customary Land Act 2016)',
    authorityLevel: 'District Commissioner / District Land Registrar',
    description:
      'Submit your CLC demarcation form, T/A endorsement, and GPS survey sketch to the District Land Office to register a formal Customary Estate or Leasehold Deed.',
    warningNote: 'Under the Malawi Customary Land Act (2016), a registered Customary Estate gives legal tenure security for your family.'
  }
];

const STORAGE_KEY = 'outpost_customary_land_steps_v1';

export function CustomaryLandChecklist() {
  const [completedStepIds, setCompletedStepIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedStepIds));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('outpost:progress-updated'));
      }
    } catch {
      // Ignore storage errors
    }
  }, [completedStepIds]);

  const toggleStep = (id: string) => {
    setCompletedStepIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B1C12] border border-stone-200/90 dark:border-emerald-900/60 shadow-xs flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200/80 dark:border-emerald-900/50 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-amber-300">
            <Scale size={14} />
            <span>Malawi Customary Land Act (2016) · Legal Verification Protocol</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
            5-Step Customary Land Acquisition Tracker (<em>Ndondomeko ya Malo</em>)
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl mt-1">
            Follow these 5 steps in strict order before paying for rural land in Malawi so your family is protected from double-sales and clan boundary disputes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-mono font-bold text-emerald-900 dark:text-emerald-300">
            {completedStepIds.length} / {CUSTOMARY_LAND_STEPS.length} Verified
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950 text-xs font-bold inline-flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Printer size={14} />
            <span>Print Field Sheet</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {CUSTOMARY_LAND_STEPS.map((step) => {
          const isDone = completedStepIds.includes(step.id);
          return (
            <div
              key={step.id}
              onClick={() => toggleStep(step.id)}
              className={cn(
                'p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-start justify-between gap-4',
                isDone
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-500/60'
                  : 'bg-stone-50/80 dark:bg-[#08150D] border-stone-200/90 dark:border-emerald-900/50 hover:border-emerald-600/40'
              )}
            >
              <div className="flex items-start gap-3.5">
                <button
                  type="button"
                  aria-label={`Mark ${step.title} completed`}
                  className="mt-0.5 text-emerald-700 dark:text-emerald-400 shrink-0"
                >
                  {isDone ? <CheckCircle2 size={22} /> : <Circle size={22} className="text-stone-400 dark:text-stone-600" />}
                </button>
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="font-bold text-emerald-800 dark:text-amber-300">{step.stepNumber}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-stone-700 dark:text-stone-300">{step.chichewaTerm}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-stone-500 dark:text-stone-400">{step.authorityLevel}</span>
                  </div>
                  <h4
                    className={cn(
                      'font-display text-base sm:text-lg font-bold text-stone-900 dark:text-white',
                      isDone && 'line-through opacity-80'
                    )}
                  >
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {step.description}
                  </p>
                  <div className="mt-1 p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2">
                    <ShieldAlert size={14} className="text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Protection Rule:</strong> {step.warningNote}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
