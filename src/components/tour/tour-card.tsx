'use client';

import Link from 'next/link';
import { GuideStatusBadge } from './guide-status-badge';
import { InfoRow } from './info-row';
import { ProgressBar } from '@/components/ui/progress-bar';
import { formatDate, formatTime } from '@/lib/utils';
import type { GuidePortalTour } from '@/types';

type Props = {
  tour: GuidePortalTour;
};

export function TourCard({ tour }: Props) {
  const checkedIn = tour.tour_items.filter(
    (i) => i.check_in_status === 'check-in',
  ).length;
  const totalItems = tour.tour_items.length;

  return (
    <Link href={`/tours/${tour.id}`}>
      <div className="bg-white rounded-2xl p-(--shadow-card) border border-(--color-border) p-4 hover:shadow-md transition-shadow active:scale-[0.99]">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-(--color-text-muted) font-medium uppercase tracking-wide">
              {tour.trip_code}
            </p>
            <h3 className="font-semibold text-(--color-text-primary) mt-0.5 leading-tight">
              {tour.program_name ?? 'ไม่ระบุโปรแกรม'}
            </h3>
            {tour.program_list_name && (
              <p className="text-sm text-(--color-text-secondary) mt-0.5">
                {tour.program_list_name}
              </p>
            )}
          </div>
          <GuideStatusBadge status={tour.guide_status} />
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <InfoRow icon="📅" label="วันที่" value={formatDate(tour.tour_date)} />
          <InfoRow icon="🕐" label="เวลา" value={formatTime(tour.tour_time)} />
          <InfoRow icon="🚌" label="รถ" value={tour.group_type_name ?? '-'} />
          <InfoRow icon="👥" label="ผู้โดยสาร" value={`${tour.total_pax} คน`} />
        </div>

        {/* Check-in progress */}
        {totalItems > 0 && (
          <div className="mt-3 pt-3 border-t border-(--color-border)">
            <ProgressBar value={checkedIn} max={totalItems} label="Check-in" />
          </div>
        )}
      </div>
    </Link>
  );
}

