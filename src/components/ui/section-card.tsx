import { cn } from '@/lib/utils';

type Props = {
  title?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
};

export function SectionCard({ title, children, className, titleClassName }: Props) {
  return (
    <div className={cn('bg-white rounded-2xl border border-(--color-border) p-4', className)}>
      {title && (
        <h2 className={cn('text-sm font-semibold text-(--color-text-secondary) mb-3', titleClassName)}>
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
