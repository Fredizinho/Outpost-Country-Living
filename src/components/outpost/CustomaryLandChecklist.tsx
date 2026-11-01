import React, { useState, useEffect } from 'react';
import { Scale, CheckCircle2, Circle, Printer, ShieldAlert } from 'lucide-react';
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
    stepNumber: 'Step 01',
    title: 'Introductory Protocol Visit to the Village Headman',
    chichewaTerm: 'Mfumu ya Mudzi / Nyakwawa',
    authorityLevel: 'Village Level',
    description:
      'Introduce your family’s peaceful country-living and agricultural mission to the local Village Headman (Nyakwawa) and elders before negotiating price with any individual.',
    warningNote: 'Never pay cash advances to brokers or relatives claiming ownership without the Village Headman’s knowledge.'
  },
  {
    id: 'cl-step-2',
    stepNumber: 'Step 02',
    title: 'Lineage & Family Clan Verification (Matrilineal / Patrilineal)',
    chichewaTerm: 'Chikamwini / Mwini Mbumba vs. Lobola Clan Elders',
    authorityLevel: 'Extended Family Clan',
    description:
      'Verify that all senior maternal uncles (Ankhoswe / Mwini Mbumba in Central & Southern regions) or patrilineal elders (in Northern region) consent to the allocation and have no pending inheritance disputes.',
    warningNote: 'In Chewa, Yao, Lomwe, and Mang’anja areas, a husband cannot sell maternal clan land without the Mwini Mbumba’s signed consent.'
  },
  {
    id: 'cl-step-3',
    stepNumber: 'Step 03',
    title: 'Physical Boundary Walk with All Adjacent Neighbors',
    chichewaTerm: 'Kuyenda Malire & Mboni za Malire',
    authorityLevel: 'Boundary Witnesses & Customary Land Committee (CLC)',
    description:
      'Walk the entire perimeter with the Village Headman, all 4 neighboring landholders, and the Customary Land Committee (Komiti ya Malo). Plant permanent sisal (Khonje) or stone beacons and record GPS corner coordinates.',
    warningNote: 'Ensure every adjoining neighbor signs or thumbprints the boundary sketch map as a witness (Mboni).'
  },
  {
    id: 'cl-step-4',
    stepNumber: 'Step 04',
    title: 'Group Village Headman (GVH) & Traditional Authority (T/A) Endorsement',
    chichewaTerm: 'Chizindikiro cha GVH ndi Traditional Authority (T/A)',
    authorityLevel: 'Chieftaincy & Traditional Authority Stamp',
    description:
      'Obtain the official stamped consultation letter from the Group Village Headman (GVH) and counter-signature from the Senior Chief / Traditional Authority (T/A) confirming the parcel is free of dispute.',
    warningNote: 'Ensure the official T/A ink stamp and registration book entry number are recorded on your copy.'
  },
  {
    id: 'cl-step-5',
    stepNumber: 'Step 05',
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
    <section className="p-6 sm:p-8 rounded-[var(--radius-sheet)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans font-semibold text-[var(--accent)]">
            <Scale size={14} />
            <span>Malawi Customary Land Act (2016) · Legal verification protocol</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--ink)] mt-1">
            5-Step Customary Land Acquisition Tracker (<em>Ndondomeko ya Malo</em>)
          </h3>
          <p className="text-xs sm:text-sm text-[var(--ink-muted)] max-w-2xl mt-1">
            Follow these 5 steps in strict order before paying for rural land in Malawi so your family is protected from double-sales and clan boundary disputes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-[var(--radius-control)] bg-[var(--success)]/10 border border-[var(--success)]/30 text-xs font-mono font-bold text-[var(--success)]">
            {completedStepIds.length} / {CUSTOMARY_LAND_STEPS.length} Verified
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-[var(--radius-control)] bg-[var(--accent)] text-white text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-[var(--accent-hover)] transition-colors cursor-pointer font-sans"
          >
            <Printer size={14} />
            <span>Print field sheet</span>
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
                'p-4 sm:p-5 rounded-[var(--radius-card)] border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-start justify-between gap-4',
                isDone
                  ? 'bg-[var(--success)]/10 border-[var(--success)]/40'
                  : 'bg-[var(--ground)] border-[var(--border)] hover:border-[var(--accent)]'
              )}
            >
              <div className="flex items-start gap-3.5">
                <button
                  type="button"
                  aria-label={`Mark ${step.title} completed`}
                  className="mt-0.5 text-[var(--success)] shrink-0"
                >
                  {isDone ? <CheckCircle2 size={22} /> : <Circle size={22} className="text-[var(--ink-muted)] opacity-60" />}
                </button>
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
                    <span className="font-mono font-bold text-[var(--accent)]">{step.stepNumber}</span>
                    <span aria-hidden="true" className="text-[var(--ink-muted)]">·</span>
                    <span className="font-semibold text-[var(--ink)]">{step.chichewaTerm}</span>
                    <span aria-hidden="true" className="text-[var(--ink-muted)]">·</span>
                    <span className="text-[var(--ink-muted)]">{step.authorityLevel}</span>
                  </div>
                  <h4
                    className={cn(
                      'font-serif text-base sm:text-lg font-bold text-[var(--ink)]',
                      isDone && 'line-through opacity-80'
                    )}
                  >
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
                    {step.description}
                  </p>
                  <div className="mt-1 p-2.5 rounded-[var(--radius-control)] bg-[var(--warning)]/10 border border-[var(--warning)]/30 text-xs text-[var(--ink)] flex items-start gap-2">
                    <ShieldAlert size={14} className="text-[var(--warning)] shrink-0 mt-0.5" />
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
