/**
 * AppButton — ปุ่มหลักของ LIFF App
 * ออกแบบตาม Figma node 449:7426 (Button component)
 *
 * Hierarchy: primary | success | error
 * Size:      s | m | l
 * States handled via CSS (hover/focus/disabled)
 */

import { forwardRef, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const appButtonVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center gap-x-1 rounded-lg font-medium',
    'transition-all duration-150 active:scale-[0.98]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
    'disabled:pointer-events-none disabled:bg-[var(--color-btn-disabled)] disabled:text-white/70',
    'select-none whitespace-nowrap',
  ].join(' '),
  {
    variants: {
      /** สี/ความสำคัญ */
      hierarchy: {
        primary: [
          'bg-[var(--color-brand-blue)] text-white',
          'hover:bg-[var(--color-brand-blue-hover)]',
          'focus-visible:bg-[var(--color-brand-blue-focused)] focus-visible:ring-[var(--color-brand-blue-ring)]',
        ].join(' '),
        success: [
          'bg-[var(--color-btn-success)] text-white',
          'hover:bg-[var(--color-btn-success-hover)]',
          'focus-visible:ring-[var(--color-btn-success-ring)]',
        ].join(' '),
        error: [
          'bg-[var(--color-btn-error)] text-white',
          'hover:bg-[var(--color-btn-error-hover)]',
          'focus-visible:ring-[var(--color-btn-error-ring)]',
        ].join(' '),
      },
      /** ขนาด — S/M/L ตาม Figma */
      size: {
        s: 'px-4 py-1.5 text-xs gap-1',   // px-16 py-6 text-12 icon-20
        m: 'px-4 py-2 text-sm gap-2',      // px-16 py-8 text-14 icon-24
        l: 'px-4 py-3 text-base gap-2',    // px-16 py-12 text-16 icon-24
      },
      /** ความกว้าง */
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      hierarchy: 'primary',
      size: 'm',
      fullWidth: false,
    },
  },
);

export type AppButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof appButtonVariants> & {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    isLoading?: boolean;
  };

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      className,
      hierarchy,
      size,
      fullWidth,
      leftIcon,
      rightIcon,
      isLoading,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const iconSize = size === 's' ? 'w-5 h-5' : 'w-6 h-6';

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(appButtonVariants({ hierarchy, size, fullWidth }), className)}
        {...props}
      >
        {isLoading ? (
          <span className={cn('animate-spin rounded-full border-2 border-white/30 border-t-white', iconSize)} />
        ) : (
          leftIcon && <span className={cn('shrink-0', iconSize)}>{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className={cn('shrink-0', iconSize)}>{rightIcon}</span>
        )}
      </button>
    );
  },
);

AppButton.displayName = 'AppButton';
