'use client';

import { useAuthStore } from '@/store/auth.store';
import { useTourList } from '@/hooks/use-tour-list';
import { TourCard } from '@/components/tour/tour-card';
import { DateFilter } from '@/components/ui/date-filter';
import { SkeletonList } from '@/components/ui/skeleton-list';
import { EmptyState } from '@/components/ui/empty-state';

export default function ToursPage() {
  const { guide } = useAuthStore();
  const { tours, isLoading, error, selectedDate, setSelectedDate, quickDates, retry } = useTourList();

  return (
    <div className="min-h-full bg-(--color-background)">
      {/* Header */}
      <div className="bg-white border-b border-(--color-border) px-4 pt-4 pb-0 safe-area-top">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-(--color-text-primary)">ทัวร์ของฉัน</h1>
            <p className="text-sm text-(--color-text-secondary)">
              สวัสดี, {guide?.nickname ?? guide?.name}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-(--color-line-green-light) flex items-center justify-center text-xl">
            🗓️
          </div>
        </div>

        <DateFilter
          options={quickDates}
          selected={selectedDate}
          onChange={setSelectedDate}
        />
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-3">
        {isLoading ? (
          <SkeletonList count={3} height="h-36" />
        ) : error ? (
          <EmptyState
            icon="⚠️"
            title={error}
            action={
              <button onClick={retry} className="text-sm text-(--color-line-green) font-medium">
                ลองอีกครั้ง
              </button>
            }
          />
        ) : tours.length === 0 ? (
          <EmptyState
            title="ไม่มีทัวร์ในวันนี้"
            description="เลือกวันอื่นเพื่อดูทัวร์"
          />
        ) : (
          <>
            <p className="text-xs text-(--color-text-muted) font-medium">{tours.length} ทัวร์</p>
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
