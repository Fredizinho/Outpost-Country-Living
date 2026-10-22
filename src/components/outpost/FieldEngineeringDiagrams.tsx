import React from 'react';
import { Wrench } from 'lucide-react';
import { StandardDiagramGallery, DiagramSymbolsDefs } from '@/components/common/StandardDiagram';

export function FieldEngineeringDiagrams() {
  return (
    <section className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0B1C12] border border-stone-200/90 dark:border-emerald-900/60 shadow-sm flex flex-col gap-6">
      {/* SVG Symbol Definitions container */}
      <DiagramSymbolsDefs />

      <div className="flex flex-col gap-2 border-b border-stone-200/80 dark:border-emerald-900/50 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#B4531F] dark:text-amber-300 font-bold">
          <Wrench size={14} />
          <span>Standardized Field Schematics · Illustrated Cross-Sections</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
          Step-by-Step Illustrated Homestead Blueprints
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          Clear cross-sectional blueprints drawn with high-contrast labels (16+ units on 720-wide viewBox), leader lines, metric measurements with imperial equivalents in brackets, and sequential field steps.
        </p>
      </div>

      {/* Standard Diagram Gallery (5 Diagrams in strict order: Planting Pit, Ridge Spacing, Swale, Roof Catchment & Tank, Zeer Pot) */}
      <StandardDiagramGallery defaultType="planting-pit" />
    </section>
  );
}
