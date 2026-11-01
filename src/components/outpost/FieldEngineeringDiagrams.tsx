import React from 'react';
import { Wrench } from 'lucide-react';
import { StandardDiagramGallery, DiagramSymbolsDefs } from '@/components/common/StandardDiagram';

export function FieldEngineeringDiagrams() {
  return (
    <section className="p-6 sm:p-10 rounded-[var(--radius-sheet)] bg-[var(--surface)] border border-[var(--border)] shadow-sm flex flex-col gap-6">
      {/* SVG Symbol Definitions container */}
      <DiagramSymbolsDefs />

      <div className="flex flex-col gap-2 border-b border-[var(--border)] pb-5">
        <div className="flex items-center gap-2 text-xs font-sans text-[var(--accent)] font-semibold">
          <Wrench size={14} />
          <span>Standardized field schematics · Illustrated cross-sections</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--ink)]">
          Step-by-Step Illustrated Homestead Blueprints
        </h2>
        <p className="text-sm text-[var(--ink-muted)] max-w-3xl leading-relaxed">
          Clear cross-sectional blueprints drawn with high-contrast labels (16+ units on 720-wide viewBox), leader lines, metric measurements with imperial equivalents in brackets, and sequential field steps.
        </p>
      </div>

      {/* Standard Diagram Gallery (5 Diagrams in strict order: Planting Pit, Ridge Spacing, Swale, Roof Catchment & Tank, Zeer Pot) */}
      <StandardDiagramGallery defaultType="planting-pit" />
    </section>
  );
}
