import React, { useState } from 'react';
import {
  RotateCcw,
  Copy,
  Save,
  Printer,
  ChevronDown,
  ChevronUp,
  Info,
  Check
} from 'lucide-react';
import { Button, Badge, useToast } from '@/components/ui';
import { cn } from '@/lib/utils';

export interface CalculatorShellProps {
  title: string;
  category: string;
  description: string;
  mainAnswer: {
    label: string;
    value: string | number;
    unit?: string;
    subtext?: string;
  };
  inputs: React.ReactNode;
  results: React.ReactNode;
  formulaDescription: string;
  assumptions: string[];
  unitSystem: 'metric' | 'imperial';
  onUnitSystemChange: (system: 'metric' | 'imperial') => void;
  onReset: () => void;
  onSaveToVault?: () => void;
  copySummaryText: () => string;
  className?: string;
}

export function CalculatorShell({
  title,
  category,
  description,
  mainAnswer,
  inputs,
  results,
  formulaDescription,
  assumptions,
  unitSystem,
  onUnitSystemChange,
  onReset,
  onSaveToVault,
  copySummaryText,
  className
}: CalculatorShellProps) {
  const { toast } = useToast();
  const [showFormula, setShowFormula] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const text = copySummaryText();
      await navigator.clipboard.writeText(text);
      setHasCopied(true);
      toast({ message: 'Result copied to clipboard', variant: 'success' });
      setTimeout(() => setHasCopied(false), 2000);
    } catch {
      toast({ message: 'Could not copy to clipboard', variant: 'destructive' });
    }
  };

  const handleSave = () => {
    if (onSaveToVault) {
      onSaveToVault();
    }
    toast({ message: 'Calculation saved to sanctuary vault', variant: 'success' });
  };

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {/* Header with Title, Category, Estimate Badge, and Metric/Imperial Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-sans font-medium text-[var(--accent)]">
              {category}
            </span>
            <Badge status="Estimate" />
          </div>
          <h2 className="font-serif text-[22px] sm:text-[26px] font-bold text-[var(--ink)] leading-snug">
            {title}
          </h2>
          <p className="text-[13px] text-[var(--ink-muted)] max-w-[70ch] leading-relaxed">
            {description}
          </p>
        </div>

        {/* Top Controls: Metric/Imperial switch & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto shrink-0">
          {/* Unit System Switch */}
          <div className="flex items-center p-0.5 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)] text-[12px] font-sans font-medium">
            <button
              type="button"
              onClick={() => onUnitSystemChange('metric')}
              className={cn(
                'px-2.5 py-1 rounded-[calc(var(--radius-control)-2px)] transition-all cursor-pointer',
                unitSystem === 'metric'
                  ? 'bg-[var(--surface)] text-[var(--ink)] font-semibold shadow-2xs'
                  : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
              )}
            >
              Metric
            </button>
            <button
              type="button"
              onClick={() => onUnitSystemChange('imperial')}
              className={cn(
                'px-2.5 py-1 rounded-[calc(var(--radius-control)-2px)] transition-all cursor-pointer',
                unitSystem === 'imperial'
                  ? 'bg-[var(--surface)] text-[var(--ink)] font-semibold shadow-2xs'
                  : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
              )}
            >
              Imperial
            </button>
          </div>

          <Button variant="secondary" size="sm" icon={RotateCcw} onClick={onReset}>
            Reset
          </Button>
          <Button variant="secondary" size="sm" icon={hasCopied ? Check : Copy} onClick={handleCopy}>
            {hasCopied ? 'Copied' : 'Copy'}
          </Button>
          <Button variant="secondary" size="sm" icon={Save} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" size="sm" icon={Printer} onClick={() => window.print()}>
            Print
          </Button>
        </div>
      </div>

      {/* Two-Pane Workspace: Inputs on Left, Results on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs Pane */}
        <div className="lg:col-span-7 flex flex-col gap-5 p-5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)]">
          <h3 className="font-serif text-[17px] font-semibold text-[var(--ink)] border-b border-[var(--border)] pb-2.5">
            Parameters and site inputs
          </h3>
          <div className="flex flex-col gap-4">
            {inputs}
          </div>
        </div>

        {/* Right Sticky Results Pane */}
        <div className="lg:col-span-5 sticky top-16 flex flex-col gap-4">
          {/* Main Large Sticky Answer Box */}
          <div className="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-xs flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-sans font-medium text-[var(--ink-muted)]">
                {mainAnswer.label}
              </span>
              <Badge status="Estimate" />
            </div>

            <div className="flex items-baseline gap-1.5 font-mono tabular-nums">
              <span className="text-[32px] sm:text-[38px] font-bold text-[var(--accent)] tracking-tight">
                {mainAnswer.value}
              </span>
              {mainAnswer.unit && (
                <span className="text-[14px] font-sans font-medium text-[var(--ink-muted)]">
                  {mainAnswer.unit}
                </span>
              )}
            </div>

            {mainAnswer.subtext && (
              <p className="text-[12px] font-sans text-[var(--ink-muted)] border-t border-[var(--border)] pt-2 mt-1 leading-relaxed">
                {mainAnswer.subtext}
              </p>
            )}
          </div>

          {/* Breakdown Results */}
          <div className="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-xs flex flex-col gap-4">
            <h4 className="font-serif text-[16px] font-semibold text-[var(--ink)] border-b border-[var(--border)] pb-2">
              Engineering breakdown
            </h4>
            {results}
          </div>
        </div>
      </div>

      {/* "Show formula and assumptions" Collapsible Disclosure */}
      <div className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)]">
        <button
          type="button"
          onClick={() => setShowFormula(!showFormula)}
          className="w-full flex items-center justify-between text-left text-[13px] font-sans font-medium text-[var(--ink)] hover:text-[var(--accent)] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Info size={15} className="text-[var(--accent)]" />
            <span>Show formula and assumptions</span>
          </div>
          {showFormula ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>

        {showFormula && (
          <div className="mt-3 pt-3 border-t border-[var(--border)] flex flex-col gap-2.5 text-[13px] text-[var(--ink-muted)] leading-relaxed">
            <div className="font-mono text-[12px] p-2.5 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)] text-[var(--ink)]">
              {formulaDescription}
            </div>
            <div>
              <strong className="text-[var(--ink)] font-sans text-[12px] uppercase tracking-wider block mb-1">
                Baseline assumptions:
              </strong>
              <ul className="list-disc pl-5 flex flex-col gap-1 text-[12px]">
                {assumptions.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
