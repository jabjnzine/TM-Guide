'use client';

import { cn } from '@/lib/utils';
import { CheckInStatusBadge } from './check-in-status-badge';
import type { TourItem, CheckInStatus } from '@/types';

type Props = {
  item: TourItem;
  isUpdating: boolean;
  onCheckIn: (status: CheckInStatus) => void;
};

export function CheckInItemCard({ item, isUpdating, onCheckIn }: Props) {
  const statusClass = {
    'check-in': 'border-green-200 bg-green-50/30',
    'no-show': 'border-red-200 bg-red-50/30',
    pending: 'border-(--color-border)',
  }[item.check_in_status as CheckInStatus] ?? 'border-(--color-border)';

  return (
    <div className={cn('bg-white rounded-2xl border p-3.5 transition-all', statusClass)}>
      {/* Customer header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-(--color-text-primary) truncate">
            {item.customer_name ?? '(ไม่ระบุชื่อ)'}
          </p>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span className="text-xs text-(--color-text-secondary)">{item.booking_code}</span>
            {!!item.pax && (
              <Chip>{item.pax} คน</Chip>
            )}
            {item.language && (
              <Chip className="bg-blue-50 text-blue-600">{item.language}</Chip>
            )}
          </div>
        </div>
        <CheckInStatusBadge
          status={item.check_in_status as CheckInStatus}
          className="ml-2 flex-shrink-0"
        />
      </div>

      {/* Extra info */}
      {(item.pick_up_time || item.zone || item.option) && (
        <div className="flex flex-wrap gap-3 mb-2.5 text-xs text-(--color-text-secondary)">
          {item.pick_up_time && <span>🕐 {item.pick_up_time}</span>}
          {item.zone && (
            <span>📍 {item.zone}{item.zone_item ? ` · ${item.zone_item}` : ''}</span>
          )}
          {item.option && <span>🎫 {item.option}</span>}
        </div>
      )}

      {/* Check-in time */}
      {item.check_in_status === 'check-in' && item.check_in_time && (
        <p className="text-xs text-green-600 mb-2">
          ✓ เช็คอิน {new Date(item.check_in_time).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.
        </p>
      )}

      {/* Actions */}
      {item.check_in_status !== 'check-in' && (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => onCheckIn('check-in')}
            disabled={isUpdating}
            className="flex-1 py-2 bg-(--color-line-green) text-white text-sm font-medium rounded-xl disabled:opacity-60 flex items-center justify-center gap-1"
          >
            {isUpdating ? (
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              '✅ เช็คอิน'
            )}
          </button>
          {item.check_in_status !== 'no-show' && (
            <button
              onClick={() => onCheckIn('no-show')}
              disabled={isUpdating}
              className="px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-xl disabled:opacity-60 border border-red-100"
            >
              No-show
            </button>
          )}
        </div>
      )}

      {/* Undo check-in */}
      {item.check_in_status === 'check-in' && (
        <button
          onClick={() => onCheckIn('pending')}
          disabled={isUpdating}
          className="mt-2 w-full py-2 text-xs text-(--color-text-muted) border border-(--color-border) rounded-xl"
        >
          ยกเลิกเช็คอิน
        </button>
      )}
    </div>
  );
}

function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('text-xs bg-gray-100 text-(--color-text-secondary) px-1.5 py-0.5 rounded-md', className)}>
      {children}
    </span>
  );
}
