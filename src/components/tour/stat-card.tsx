import { cn } from '@/lib/utils';

type Props = {
  value: number;
  label: string;
  color?: string;
  bg?: string;
  className?: string;
};

export function StatCard({ value, label, color = 'text-gray-700', bg = 'bg-gray-50', className }: Props) {
  return (
    <div className={cn('rounded-xl p-3 text-center', bg, className)}>
      <p className={cn('text-2xl font-bold', color)}>{value}</p>
      <p className="text-xs text-(--color-text-secondary) mt-0.5">{label}</p>
    </div>
  );
}
