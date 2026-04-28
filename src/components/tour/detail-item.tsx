import { cn } from '@/lib/utils';

type Props = {
  icon: string;
  label: string;
  value: string;
  className?: string;
};

export function DetailItem({ icon, label, value, className }: Props) {
  return (
    <div className={cn('flex items-start gap-2', className)}>
      <span className="text-base mt-0.5 flex-shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-(--color-text-muted)">{label}</p>
        <p className="text-sm font-medium text-(--color-text-primary) break-words">{value}</p>
      </div>
    </div>
  );
}
