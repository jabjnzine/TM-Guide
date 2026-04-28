import { cn } from '@/lib/utils';

type Props = {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({ icon = '📭', title, description, action, className }: Props) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-16 px-6', className)}>
      <span className="text-5xl mb-3">{icon}</span>
      <p className="font-medium text-(--color-text-primary)">{title}</p>
      {description && (
        <p className="text-sm text-(--color-text-secondary) mt-1">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
