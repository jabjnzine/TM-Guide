import { cn } from '@/lib/utils';
import type { GuideStatus } from '@/types';

const statusConfig: Record<
  GuideStatus,
  { label: string; className: string }
> = {
  pending: {
    label: 'รอจัดไกด์',
    className: 'bg-amber-100 text-amber-700',
  },
  arranged: {
    label: 'จัดแล้ว',
    className: 'bg-blue-100 text-blue-700',
  },
  waiting: {
    label: 'รอยืนยัน',
    className: 'bg-orange-100 text-orange-700',
  },
  approved: {
    label: 'ยืนยันแล้ว',
    className: 'bg-green-100 text-green-700',
  },
  cancelled: {
    label: 'ยกเลิก',
    className: 'bg-red-100 text-red-700',
  },
};

type Props = {
  status: GuideStatus;
  className?: string;
};

export function GuideStatusBadge({ status, className }: Props) {
  const config = statusConfig[status] ?? {
    label: status,
    className: 'bg-gray-100 text-gray-600',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
