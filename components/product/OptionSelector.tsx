// ==================================
// Option Selector
// ==================================
// Renders options for a product variant (e.g. Size or Color).
// It highlights the selected option.

'use client';

import { cn } from '@/lib/utils';
import type { ProductOption } from '@/types/shopify';

interface OptionSelectorProps {
  option: ProductOption;
  selectedValue: string;
  onChange: (value: string) => void;
}

export default function OptionSelector({
  option,
  selectedValue,
  onChange,
}: OptionSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-[0.05em] text-gray-900">
          {option.name}
        </h3>
        {/* If option is Size, maybe show a link to size guide */}
        {option.name.toLowerCase() === 'size' && (
          <button className="text-xs text-gray-500 underline underline-offset-4 hover:text-primary transition-colors">
            Size Guide
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {option.values.map((value) => {
          const isSelected = selectedValue === value;
          return (
            <button
              key={value}
              onClick={() => onChange(value)}
              className={cn(
                'min-w-[3rem] h-12 px-4 flex items-center justify-center border font-medium text-sm transition-all',
                isSelected
                  ? 'border-primary bg-primary text-secondary'
                  : 'border-gray-200 bg-transparent text-primary hover:border-gray-900'
              )}
              aria-label={`Select ${option.name} ${value}`}
              aria-pressed={isSelected}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
}
