'use client';

import { cn } from '@/lib/utils';

type DateOption = {
  iso: string;
  label: string;
};

type Props = {
  options: DateOption[];
  selected: string;
  onChange: (iso: string) => void;
  className?: string;
};

export function DateFilter({ options, selected, onChange, className }: Props) {
  return (
    <div
      className={cn(
        'flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide',
        className,
      )}
    >
      {options.map((d) => (
        <button
          key={d.iso}
          onClick={() => onChange(d.iso)}
          className={cn(
            'flex-shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all',
            selected === d.iso
              ? 'bg-(--color-line-green) text-white shadow-sm'
              : 'bg-gray-100 text-(--color-text-secondary)',
          )}
        >
          {d.label}
        </button>
      ))}
    </div>
  );
}
