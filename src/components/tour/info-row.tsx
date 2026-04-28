import { cn } from '@/lib/utils';

type Props = {
  icon: string;
  label: string;
  value: string;
  className?: string;
};

export function InfoRow({ icon, label, value, className }: Props) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <span className="text-base flex-shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-(--color-text-muted)">{label}</p>
        <p className="text-sm font-medium text-(--color-text-primary) truncate">{value}</p>
      </div>
    </div>
  );
}
