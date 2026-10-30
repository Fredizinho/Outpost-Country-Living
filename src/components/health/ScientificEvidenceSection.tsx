import React from 'react';
import {
  FlaskConical,
  Activity,
  Trees,
  Car,
  Beef,
  Sprout,
  AlertCircle,
  TrendingDown,
  Globe,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { SCIENTIFIC_EVIDENCE_DATA } from '@/data/eightLawsComprehensiveData';
import { Badge } from '@/components/ui';

export function ScientificEvidenceSection() {
  const { schaussSchoenthalerStudies, robertLandTraceElements, faoEnvironmentalData } =
    SCIENTIFIC_EVIDENCE_DATA;

  return (
    <div className="flex flex-col gap-8 text-[var(--ink)]">
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[var(--radius-control)] bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center">
            <FlaskConical size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-sans font-medium text-[var(--accent)]">
                Empirical research synthesis
              </span>
              <Badge status="Verified">Peer-reviewed clinical &amp; UN FAO data</Badge>
            </div>
            <h3 className="font-serif text-[18px] sm:text-[22px] font-bold text-[var(--ink)]">
              Scientific, behavioral, and environmental evidence
            </h3>
          </div>
        </div>
      </div>

      {/* PART 1: CRIMINOLOGICAL & BEHAVIORAL DIET STUDIES */}
      <div className="p-5 sm:p-6 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[var(--border)] pb-3">
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-sans font-medium text-[var(--accent)]">
              Institutional juvenile delinquency research
            </span>
            <h4 className="font-serif text-[18px] sm:text-[20px] font-bold text-[var(--ink)]">
              {schaussSchoenthalerStudies.title}
            </h4>
          </div>
          <div className="p-2 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)] text-[12px] font-mono tabular-nums text-[var(--ink)] shrink-0 self-start">
            Sample: {schaussSchoenthalerStudies.scope}
          </div>
        </div>

        <p className="text-[13.5px] text-[var(--ink-muted)] leading-relaxed">
          {schaussSchoenthalerStudies.objective}
        </p>

        {/* Diagnostic Intervention vs Results Table */}
        <div className="rounded-[var(--radius-control)] border border-[var(--border)] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)] bg-[var(--ground)]">
            {/* Dietary Intervention Column */}
            <div className="p-4 sm:p-5 flex flex-col gap-3">
              <span className="font-serif font-bold text-[14px] text-[var(--ink)] flex items-center gap-2">
                <FlaskConical size={14} className="text-[var(--accent)]" />
                <span>Dietary Intervention Protocol</span>
              </span>
              <ul className="space-y-2 text-[13px] text-[var(--ink)]">
                {schaussSchoenthalerStudies.intervention.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[var(--accent)] font-bold shrink-0">&middot;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Behavioral & Neurological Outcome */}
            <div className="p-4 sm:p-5 flex flex-col gap-3 bg-[var(--surface)]">
              <span className="font-serif font-bold text-[14px] text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <TrendingDown size={14} />
                <span>Behavioral &amp; Neurological Outcome</span>
              </span>
              <ul className="space-y-2 text-[13px] text-[var(--ink)]">
                {schaussSchoenthalerStudies.results.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* PART 2: TRACE ELEMENTS & NEURO-BIOCHEMISTRY */}
      <div className="p-5 sm:p-6 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-sans font-medium text-[var(--accent)]">
              Micro-elemental biochemistry
            </span>
            <h4 className="font-serif text-[18px] sm:text-[20px] font-bold text-[var(--ink)]">
              {robertLandTraceElements.title}
            </h4>
          </div>
          <Badge status="Verified">20 Elements &middot; 96 Siblings</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-2">
            <span className="font-serif font-bold text-[14px] text-[var(--ink)]">
              Sibling Comparison Findings
            </span>
            <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
              {robertLandTraceElements.findings}
            </p>
          </div>

          <div className="p-4 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-2">
            <span className="font-serif font-bold text-[14px] text-[var(--ink)]">
              Iron Deficiency &amp; Prefrontal Hypoxia
            </span>
            <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
              {robertLandTraceElements.ironDeficiencyMechanism}
            </p>
          </div>
        </div>
      </div>

      {/* PART 3: UN FAO ENVIRONMENTAL & ECOLOGICAL METRICS */}
      <div className="p-5 sm:p-6 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Globe size={15} className="text-emerald-700 dark:text-emerald-400" />
              <span className="text-[12px] font-sans font-medium text-[var(--accent)]">
                Global planetary footprint
              </span>
            </div>
            <h4 className="font-serif text-[18px] sm:text-[20px] font-bold text-[var(--ink)]">
              {faoEnvironmentalData.title}
            </h4>
          </div>
          <span className="text-[12px] font-mono text-[var(--ink-muted)]">
            FAO: Tackling Climate Change Through Livestock
          </span>
        </div>

        {/* 4 Telemetry Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {faoEnvironmentalData.metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-4 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col justify-between gap-2"
            >
              <span className="text-[12px] font-sans font-medium text-[var(--ink-muted)]">
                {m.label}
              </span>
              <div className="flex flex-col">
                <span className="font-mono text-[22px] sm:text-[26px] font-bold text-[var(--accent)] tabular-nums">
                  {m.value}
                </span>
                <span className="text-[11px] text-[var(--ink-muted)] leading-relaxed mt-1">
                  {m.subtext}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Visual GHG Sector Comparison Bar */}
        <div className="p-4 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-3">
          <div className="flex items-center justify-between text-[13px]">
            <span className="font-serif font-bold text-[var(--ink)]">
              Global Greenhouse Gas Emissions Comparison (UN FAO)
            </span>
            <span className="text-[12px] font-mono text-[var(--ink-muted)]">
              Anthropogenic Emissions
            </span>
          </div>

          <div className="flex flex-col gap-2 text-[12px] font-sans">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between font-mono text-[11px] tabular-nums">
                <span>Animal Agriculture (7.1 Gt CO₂-eq)</span>
                <span className="font-bold text-amber-700 dark:text-amber-300">14.5%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[var(--border)] overflow-hidden">
                <div className="h-full bg-amber-600 dark:bg-amber-500 rounded-full w-[72.5%]" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between font-mono text-[11px] tabular-nums">
                <span>Entire Global Transportation Sector (All cars, planes, trains, ships)</span>
                <span className="font-bold text-[var(--ink-muted)]">13.0%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[var(--border)] overflow-hidden">
                <div className="h-full bg-[var(--accent)]/70 rounded-full w-[65%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Agricultural Production Yield per Acre Comparison */}
        <div className="flex flex-col gap-2 pt-2 border-t border-[var(--border)]">
          <h5 className="font-serif font-bold text-[14px] text-[var(--ink)]">
            Land efficiency: Crop yield per acre comparison
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {faoEnvironmentalData.cropYieldPerAcre.map((crop, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-[13px] text-[var(--ink)]">
                    {crop.crop}
                  </span>
                  <Sprout size={13} className="text-emerald-700 dark:text-emerald-400" />
                </div>
                <span className="font-mono text-[13px] font-bold text-[var(--accent)] tabular-nums">
                  {crop.yieldLbsPerAcre}
                </span>
                <span className="text-[11px] text-[var(--ink-muted)] leading-tight">
                  {crop.density}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
