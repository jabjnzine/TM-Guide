import { cn } from '@/lib/utils';

type Props = {
  count?: number;
  height?: string;
  className?: string;
};

export function SkeletonList({ count = 3, height = 'h-24', className }: Props) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={cn('bg-white rounded-2xl animate-pulse', height)} />
      ))}
    </div>
  );
}

export function SkeletonProfile() {
  return (
    <div className="flex flex-col items-center gap-3 mb-6 mt-8 px-4">
      <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse" />
      <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
      <div className="h-3.5 w-28 bg-gray-100 rounded animate-pulse" />
      <div className="mt-4 w-full space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-14 bg-white rounded-2xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}
