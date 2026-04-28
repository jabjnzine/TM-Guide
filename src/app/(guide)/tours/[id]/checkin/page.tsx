'use client';

import { use } from 'react';
import { useTourDetail } from '@/hooks/use-tour-detail';
import { PageHeader } from '@/components/liff/page-header';
import { ProgressBar } from '@/components/ui/progress-bar';
import { SkeletonList } from '@/components/ui/skeleton-list';
import { EmptyState } from '@/components/ui/empty-state';
import { CheckInItemCard } from '@/components/tour/check-in-item-card';

type Props = { params: Promise<{ id: string }> };

export default function CheckInPage({ params }: Props) {
  const { id } = use(params);
  const { tour, isLoading, updatingItemId, stats, updateCheckIn } = useTourDetail(Number(id));

  if (isLoading) return <SkeletonList count={6} height="h-20" className="px-4 pt-4" />;
  if (!tour || !stats) return null;

  return (
    <div className="min-h-full bg-(--color-background)">
      <PageHeader
        title="Check-in ผู้โดยสาร"
        subtitle={`${tour.program_name} · ${tour.tour_date}`}
        backHref
        bottomSlot={
          <ProgressBar
            value={stats.checkedIn}
            max={stats.total}
            label="ความคืบหน้า"
            size="md"
          />
        }
      />

      <div className="px-4 py-3 space-y-2">
        {tour.tour_items.length === 0 ? (
          <EmptyState title="ไม่มีรายการผู้โดยสาร" />
        ) : (
          tour.tour_items.map((item) => (
            <CheckInItemCard
              key={item.id}
              item={item}
              isUpdating={updatingItemId === item.id}
              onCheckIn={(status) => updateCheckIn(item, status)}
            />
          ))
        )}
      </div>
    </div>
  );
}
