import { cn } from '@/lib/utils';
import type { CheckInStatus } from '@/types';

const statusConfig: Record<CheckInStatus, { label: string; className: string; icon: string }> = {
  pending: { label: 'รอเช็คอิน', className: 'bg-gray-100 text-gray-600', icon: '⏳' },
  'check-in': { label: 'เช็คอินแล้ว', className: 'bg-green-100 text-green-700', icon: '✅' },
  'no-show': { label: 'ไม่มาแสดงตัว', className: 'bg-red-100 text-red-600', icon: '❌' },
};

type Props = { status: CheckInStatus; className?: string };

export function CheckInStatusBadge({ status, className }: Props) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
        config.className,
        className,
      )}
    >
      <span>{config.icon}</span>
      {config.label}
    </span>
  );
}
