import React from 'react';
import { cn } from '@/lib/utils';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  unit?: string;
  onChangeValue?: (val: number) => void;
}

export function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
  unit = '',
  onChangeValue,
  onChange,
  className,
  disabled,
  ...props
}: SliderProps) {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseFloat(e.target.value);
    onChangeValue?.(num);
    onChange?.(e);
  };

  return (
    <div className={cn('flex flex-col gap-2 w-full', className)}>
      <div className="flex items-center gap-3 w-full">
        <div className="relative flex-1 flex items-center">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            disabled={disabled}
            onChange={handleChange}
            className={cn(
              'w-full h-2 bg-[var(--ground)] border border-[var(--border)] rounded-[var(--radius-control)] appearance-none cursor-pointer ' +
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ' +
                'disabled:opacity-50 disabled:cursor-not-allowed ' +
                '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 ' +
                '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:border-2 ' +
                '[&::-webkit-slider-thumb]:border-[var(--surface)] [&::-webkit-slider-thumb]:shadow-xs'
            )}
            {...props}
          />
        </div>

        {showValue && (
          <span className="font-mono tabular-nums text-[13px] font-medium text-[var(--ink)] min-w-[3.5rem] text-right">
            {value}
            {unit && <span className="text-[12px] font-sans text-[var(--ink-muted)] ml-0.5">{unit}</span>}
          </span>
        )}
      </div>

      <div className="flex justify-between items-center text-[11px] font-mono text-[var(--ink-muted)] px-0.5">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}
