/**
 * AppBottomSheet + AppBottomSheetSelect
 *
 * AppBottomSheet — generic bottom sheet container
 *   - slide-up / slide-down animation (Framer Motion)
 *   - backdrop dismiss
 *   - drag handle + optional title + close button
 *   - scroll-lock body เมื่อเปิด
 *
 * AppBottomSheetSelect — checklist variant (single / multi)
 *   - ใช้ pattern เดียวกับ ChooseAreaScreen (346:6342)
 *   - green checkmark ที่ item ที่เลือก
 *   - "ยืนยัน" button
 */

'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { AppButton } from '@/components/ui/app-button';
import { cn } from '@/lib/utils';

// ─── AppBottomSheet ────────────────────────────────────────

type AppBottomSheetProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
};

export function AppBottomSheet({
  open,
  onClose,
  title,
  children,
  className,
}: AppBottomSheetProps) {
  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className={cn(
              'fixed bottom-0 left-0 right-0 z-50',
              'bg-white rounded-t-2xl',
              'max-h-[85dvh] flex flex-col',
              'safe-area-bottom',
              className,
            )}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-8 h-1 bg-[#d1d4da] rounded-full" />
            </div>

            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-6 pt-2 pb-4 shrink-0">
                <h2 className="text-lg font-semibold text-[#1b3045]">{title}</h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center text-[#afb4bc] hover:text-[#667085] transition"
                  aria-label="ปิด"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── AppBottomSheetSelect ──────────────────────────────────

export type BottomSheetOption = {
  value: string;
  label: string;
};

type AppBottomSheetSelectProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  options: BottomSheetOption[];
  /** Single select: string, Multi select: string[] */
  value?: string | string[];
  multiple?: boolean;
  confirmLabel?: string;
  onConfirm: (value: string[]) => void;
};

export function AppBottomSheetSelect({
  open,
  onClose,
  title,
  options,
  value,
  multiple = false,
  confirmLabel = 'ยืนยัน',
  onConfirm,
}: AppBottomSheetSelectProps) {
  const normalizeInitial = (): Set<string> => {
    if (!value) return new Set();
    if (Array.isArray(value)) return new Set(value);
    return new Set([value]);
  };

  const [selected, setSelected] = useState<Set<string>>(normalizeInitial);

  // Sync when value prop changes (re-open)
  useEffect(() => {
    if (open) setSelected(normalizeInitial());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const toggle = (val: string) => {
    setSelected((prev) => {
      if (!multiple) {
        // single select: replace
        return new Set([val]);
      }
      const next = new Set(prev);
      if (next.has(val)) {
        next.delete(val);
      } else {
        next.add(val);
      }
      return next;
    });
  };

  const handleConfirm = () => {
    onConfirm([...selected]);
    onClose();
  };

  return (
    <AppBottomSheet open={open} onClose={onClose} title={title}>
      {/* Options list */}
      <div>
        {options.map((opt) => {
          const isSelected = selected.has(opt.value);
          return (
            <div key={opt.value}>
              <button
                type="button"
                onClick={() => toggle(opt.value)}
                className="w-full flex items-center gap-4 h-16 px-4 py-3 text-left hover:bg-[#f9fafb] transition-colors"
              >
                <span
                  className={cn(
                    'flex-1 text-base leading-6',
                    isSelected ? 'text-[var(--color-brand-blue)] font-medium' : 'text-black',
                  )}
                >
                  {opt.label}
                </span>
                {isSelected && (
                  <CheckCircle2
                    className="shrink-0 w-6 h-6 text-[var(--color-btn-success)]"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                )}
              </button>
              <div className="mx-4 border-b border-[#d1d4da]" />
            </div>
          );
        })}
      </div>

      {/* Confirm */}
      <div className="px-6 pt-4 pb-8">
        <AppButton type="button" size="l" fullWidth onClick={handleConfirm}>
          {confirmLabel}
        </AppButton>
      </div>
    </AppBottomSheet>
  );
}
