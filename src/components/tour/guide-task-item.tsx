import { cn } from '@/lib/utils';
import type { GuideTask } from '@/types';

type Props = {
  guide: GuideTask;
  isMe?: boolean;
  className?: string;
};

export function GuideTaskItem({ guide, isMe = false, className }: Props) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 p-2.5 rounded-xl',
        isMe ? 'bg-(--color-line-green-light) border border-(--color-line-green)/20' : 'bg-gray-50',
        className,
      )}
    >
      <div
        className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0',
          isMe ? 'bg-(--color-line-green) text-white' : 'bg-(--color-line-green-light)',
        )}
      >
        👤
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-medium text-(--color-text-primary) truncate">{guide.name}</p>
          {isMe && (
            <span className="flex-shrink-0 text-xs bg-(--color-line-green) text-white px-1.5 py-0.5 rounded-full">
              ฉัน
            </span>
          )}
        </div>
        <p className="text-xs text-(--color-text-secondary)">
          {[guide.phone, guide.position].filter(Boolean).join(' · ')}
        </p>
      </div>
    </div>
  );
}
