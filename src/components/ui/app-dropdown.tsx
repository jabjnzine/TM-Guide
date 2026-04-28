/**
 * AppDropdown — Custom dropdown ตาม Figma node 116:5460
 *
 * Design specs:
 * - Trigger: white bg, border #afb4bc, rounded-8px, h-48px, p-12px
 * - Menu: float below, shadow lg, border #f9fafb, rounded-8px
 * - Item: px-6px py-2px wrapper, p-10px inner, hover bg-[#f9fafb]
 * - Scrollbar: #eaecf0, w-4px
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InputWrapper } from '@/components/ui/app-input';

export type DropdownOption = {
  value: string;
  label: string;
};

type AppDropdownProps = {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  placeholder?: string;
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  wrapperClassName?: string;
  className?: string;
};

export function AppDropdown({
  label,
  error,
  hint,
  required,
  placeholder = 'กรุณาเลือก',
  options,
  value,
  onChange,
  disabled,
  wrapperClassName,
  className,
}: AppDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  // Close on outside click
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  const handleSelect = (opt: DropdownOption) => {
    onChange?.(opt.value);
    setOpen(false);
  };

  return (
    <InputWrapper label={label} required={required} error={error} hint={hint} className={wrapperClassName}>
      <div ref={containerRef} className={cn('relative w-full', className)}>
        {/* Trigger */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setOpen((prev) => !prev)}
          className={cn(
            'w-full h-12 flex items-center gap-2 px-3 rounded-lg border transition-colors duration-150',
            'bg-white text-base text-left',
            open
              ? 'border-[var(--color-brand-blue)]'
              : error
                ? 'border-[var(--color-btn-error)]'
                : 'border-[var(--color-input-border)]',
            disabled && 'opacity-60 cursor-not-allowed bg-[var(--color-input-bg-default)]',
          )}
        >
          <span className={cn('flex-1 min-w-0 truncate leading-[20px]', selected ? 'text-[#101828]' : 'text-[var(--color-input-placeholder)]')}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown
            className={cn(
              'shrink-0 w-6 h-6 text-[var(--color-input-placeholder)] transition-transform duration-200',
              open && 'rotate-180',
            )}
          />
        </button>

        {/* Dropdown menu */}
        {open && (
          <div
            className={cn(
              'absolute left-0 right-0 z-50 mt-0.5',
              'bg-white rounded-lg overflow-hidden',
              'border border-[#f9fafb]',
              'shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)]',
            )}
          >
            {/* Scrollable list */}
            <div className="relative max-h-[200px] overflow-y-auto scrollbar-thin">
              <ul className="py-1">
                {options.map((opt) => (
                  <li key={opt.value} className="px-1.5 py-0.5">
                    <button
                      type="button"
                      onClick={() => handleSelect(opt)}
                      className={cn(
                        'w-full text-left px-2.5 py-2.5 rounded-md text-base text-[#101828]',
                        'transition-colors duration-100',
                        'hover:bg-[#f9fafb]',
                        opt.value === value && 'bg-[var(--color-brand-blue-light)] text-[var(--color-brand-blue)] font-medium',
                      )}
                    >
                      {opt.label}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Scrollbar track indicator (decorative, matches Figma) */}
              <div className="absolute top-0 right-0 bottom-0 w-1 pr-1 py-1 pointer-events-none">
                <div className="h-1/2 w-full bg-[#eaecf0] rounded-lg" />
              </div>
            </div>
          </div>
        )}
      </div>
    </InputWrapper>
  );
}
