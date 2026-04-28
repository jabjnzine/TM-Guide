import { cn } from '@/lib/utils';

type Props = {
  value: number;
  max: number;
  label?: string;
  showCount?: boolean;
  size?: 'sm' | 'md';
  className?: string;
};

export function ProgressBar({ value, max, label, showCount = true, size = 'sm', className }: Props) {
  const percent = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  return (
    <div className={cn('w-full', className)}>
      {(label || showCount) && (
        <div className="flex items-center justify-between text-xs mb-1.5">
          {label && <span className="text-(--color-text-secondary)">{label}</span>}
          {showCount && (
            <span className="font-semibold text-(--color-text-primary)">
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div className={cn('bg-gray-100 rounded-full overflow-hidden', size === 'sm' ? 'h-1.5' : 'h-2')}>
        <div
          className="h-full bg-(--color-line-green) rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
