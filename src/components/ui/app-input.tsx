/**
 * AppInput / AppSelect / AppTextarea / AppSearch
 * ออกแบบตาม Figma TextField component (node 100:7320)
 *
 * Types:   Text input | Multiline | Dropdowns | Calendar | Search
 * States:  Default | Standard | Active (focused) | Error | Success | Disabled
 */

import { forwardRef, type ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Shared field box class ────────────────────────────────

function fieldBoxClass(state: 'default' | 'standard' | 'error' | 'success' | 'disabled') {
  const base = [
    'w-full h-12 flex items-center gap-2 px-3 rounded-lg border transition-colors duration-150',
    'text-base text-[var(--color-input-text)]',
  ];
  const stateMap = {
    default:  'bg-[var(--color-input-bg-default)] border-[var(--color-input-border)]',
    standard: 'bg-[var(--color-input-bg-active)]  border-[var(--color-input-border)]',
    error:    'bg-[var(--color-input-bg-active)]  border-[var(--color-btn-error)]',
    success:  'bg-[var(--color-input-bg-active)]  border-[var(--color-btn-success)]',
    disabled: 'bg-[var(--color-input-bg-default)] border-[var(--color-input-border)] opacity-60 cursor-not-allowed',
  };
  return [...base, stateMap[state]].join(' ');
}

// focus ring ถูกจัดการที่ระดับ input tag เพื่อให้ border เปลี่ยนสีได้
const focusClass = [
  'outline-none',
  'focus:border-[var(--color-brand-blue)]',
  'focus:ring-2 focus:ring-[var(--color-brand-blue-ring)] focus:ring-offset-0',
].join(' ');

// ─── InputWrapper ─────────────────────────────────────────

type WrapperProps = {
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
};

export function InputWrapper({ label, required, error, hint, className, children }: WrapperProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <span className="text-sm font-normal text-[var(--color-input-label)] leading-6">
          {label}
          {required && <span className="text-[var(--color-btn-error)] ml-0.5">*</span>}
        </span>
      )}

      {children}

      {error ? (
        <span className="flex items-start gap-1 text-xs text-[var(--color-btn-error)] leading-[18px]">
          <AlertCircle className="w-4 h-4 shrink-0 mt-px" />
          {error}
        </span>
      ) : hint ? (
        <span className="text-xs text-[var(--color-input-helper)] leading-[18px]">{hint}</span>
      ) : null}
    </div>
  );
}

// ─── AppInput ─────────────────────────────────────────────

type AppInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  showSuccess?: boolean;
  wrapperClassName?: string;
};

export const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  (
    {
      label, error, hint, required,
      leftIcon, rightIcon, showSuccess,
      wrapperClassName, className,
      disabled, readOnly,
      ...props
    },
    ref,
  ) => {
    const state = disabled ? 'disabled' : error ? 'error' : showSuccess ? 'success' : 'standard';

    return (
      <InputWrapper label={label} required={required} error={error} hint={hint} className={wrapperClassName}>
        <div className={fieldBoxClass(state)}>
          {leftIcon && (
            <span className="shrink-0 text-[var(--color-input-placeholder)] w-6 h-6 flex items-center justify-center">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            disabled={disabled}
            readOnly={readOnly}
            className={cn(
              'flex-1 min-w-0 bg-transparent text-base',
              'placeholder:text-[var(--color-input-placeholder)]',
              'text-[var(--color-input-text)]',
              disabled || readOnly ? 'cursor-not-allowed' : focusClass,
              // ถ้า field box เป็น container focus ต้องขยาย focus ring ออกไป
              !disabled && !readOnly && 'focus:outline-none',
              className,
            )}
            {...props}
          />

          {showSuccess && !error && (
            <CheckCircle2 className="shrink-0 w-6 h-6 text-[var(--color-btn-success)]" />
          )}
          {error && (
            <AlertCircle className="shrink-0 w-6 h-6 text-[var(--color-btn-error)]" />
          )}
          {rightIcon && !showSuccess && !error && (
            <span className="shrink-0 text-[var(--color-input-placeholder)] w-6 h-6 flex items-center justify-center">
              {rightIcon}
            </span>
          )}
        </div>
      </InputWrapper>
    );
  },
);
AppInput.displayName = 'AppInput';

// ─── AppTextarea ──────────────────────────────────────────

type AppTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  wrapperClassName?: string;
};

export const AppTextarea = forwardRef<HTMLTextAreaElement, AppTextareaProps>(
  ({ label, error, hint, required, wrapperClassName, className, disabled, ...props }, ref) => {
    const borderClass = error
      ? 'border-[var(--color-btn-error)]'
      : 'border-[var(--color-input-border)] focus-within:border-[var(--color-brand-blue)]';

    return (
      <InputWrapper label={label} required={required} error={error} hint={hint} className={wrapperClassName}>
        <textarea
          ref={ref}
          disabled={disabled}
          className={cn(
            'w-full min-h-[108px] px-3 py-3 rounded-lg border bg-white',
            'text-base text-[var(--color-input-text)]',
            'placeholder:text-[var(--color-input-placeholder)]',
            'transition-colors duration-150 resize-none',
            'outline-none focus:ring-2 focus:ring-[var(--color-brand-blue-ring)] focus:ring-offset-0',
            borderClass,
            disabled && 'opacity-60 cursor-not-allowed bg-[var(--color-input-bg-default)]',
            className,
          )}
          {...props}
        />
      </InputWrapper>
    );
  },
);
AppTextarea.displayName = 'AppTextarea';

// ─── AppSelect ────────────────────────────────────────────

type AppSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  placeholder?: string;
  leftIcon?: ReactNode;
  wrapperClassName?: string;
  children: ReactNode;
};

export const AppSelect = forwardRef<HTMLSelectElement, AppSelectProps>(
  (
    {
      label, error, hint, required,
      placeholder, leftIcon,
      wrapperClassName, className,
      disabled, children,
      ...props
    },
    ref,
  ) => {
    const state = disabled ? 'disabled' : error ? 'error' : 'standard';

    return (
      <InputWrapper label={label} required={required} error={error} hint={hint} className={wrapperClassName}>
        <div className={cn(fieldBoxClass(state), 'relative pr-10')}>
          {leftIcon && (
            <span className="shrink-0 text-[var(--color-input-placeholder)] w-6 h-6 flex items-center justify-center">
              {leftIcon}
            </span>
          )}
          <select
            ref={ref}
            disabled={disabled}
            className={cn(
              'flex-1 min-w-0 bg-transparent text-base appearance-none',
              'text-[var(--color-input-text)]',
              'outline-none',
              // เมื่อ value = '' แสดง placeholder color
              'invalid:text-[var(--color-input-placeholder)]',
              disabled ? 'cursor-not-allowed' : 'cursor-pointer',
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>
          {/* Chevron */}
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-input-placeholder)]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </InputWrapper>
    );
  },
);
AppSelect.displayName = 'AppSelect';

// ─── AppSearch ────────────────────────────────────────────

type AppSearchProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  onClear?: () => void;
  wrapperClassName?: string;
};

export const AppSearch = forwardRef<HTMLInputElement, AppSearchProps>(
  ({ onClear, wrapperClassName, className, value, ...props }, ref) => (
    <div
      className={cn(
        'flex items-center gap-2 px-4 py-3 rounded-lg',
        'bg-[#fcfcfd] border border-[#f9fafb]',
        'transition-colors duration-150',
        'focus-within:border-[var(--color-brand-blue)] focus-within:ring-2 focus-within:ring-[var(--color-brand-blue-ring)]',
        wrapperClassName,
      )}
    >
      <Search className="w-6 h-6 shrink-0 text-[var(--color-input-placeholder)]" />
      <input
        ref={ref}
        value={value}
        className={cn(
          'flex-1 min-w-0 bg-transparent text-base outline-none',
          'text-[var(--color-input-text)] placeholder:text-[var(--color-input-placeholder)]',
          className,
        )}
        {...props}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="shrink-0 w-6 h-6 flex items-center justify-center text-[var(--color-input-placeholder)] hover:text-[var(--color-text-secondary)] transition"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  ),
);
AppSearch.displayName = 'AppSearch';
