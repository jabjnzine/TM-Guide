'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  subtitle?: string;
  backHref?: boolean;
  rightSlot?: React.ReactNode;
  bottomSlot?: React.ReactNode;
  className?: string;
};

export function PageHeader({ title, subtitle, backHref = false, rightSlot, bottomSlot, className }: Props) {
  const router = useRouter();

  return (
    <div className={cn('bg-white border-b border-(--color-border) px-4 py-4 safe-area-top', className)}>
      {backHref && (
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-(--color-text-secondary) mb-3 -ml-0.5"
        >
          <span className="text-base">←</span>
          <span>กลับ</span>
        </button>
      )}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-(--color-text-primary) leading-tight">{title}</h1>
          {subtitle && (
            <p className="text-sm text-(--color-text-secondary) mt-0.5 truncate">{subtitle}</p>
          )}
        </div>
        {rightSlot && <div className="ml-3 flex-shrink-0">{rightSlot}</div>}
      </div>
      {bottomSlot && <div className="mt-3">{bottomSlot}</div>}
    </div>
  );
}
