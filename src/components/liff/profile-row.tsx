import { cn } from '@/lib/utils';

type Props = {
  icon: string;
  label: string;
  value: string;
  className?: string;
};

export function ProfileRow({ icon, label, value, className }: Props) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className="text-xl w-7 text-center flex-shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-(--color-text-muted)">{label}</p>
        <p className="text-sm font-medium text-(--color-text-primary) break-all">{value}</p>
      </div>
    </div>
  );
}
