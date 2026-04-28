'use client';

import { use } from 'react';
import Link from 'next/link';
import { useTourDetail } from '@/hooks/use-tour-detail';
import { PageHeader } from '@/components/liff/page-header';
import { SectionCard } from '@/components/ui/section-card';
import { SkeletonList } from '@/components/ui/skeleton-list';
import { GuideStatusBadge } from '@/components/tour/guide-status-badge';
import { DetailItem } from '@/components/tour/detail-item';
import { StatCard } from '@/components/tour/stat-card';
import { GuideTaskItem } from '@/components/tour/guide-task-item';
import { useAuthStore } from '@/store/auth.store';
import { formatDate, formatTime } from '@/lib/utils';

type Props = { params: Promise<{ id: string }> };

export default function TourDetailPage({ params }: Props) {
  const { id } = use(params);
  const { guide } = useAuthStore();
  const { tour, isLoading, isAccepting, stats, acceptTour } = useTourDetail(Number(id));

  if (isLoading) return <SkeletonList count={4} height="h-24" className="px-4 pt-4" />;
  if (!tour || !stats) return null;

  return (
    <div className="min-h-full bg-(--color-background)">
      <PageHeader
        title={tour.program_name ?? 'ไม่ระบุโปรแกรม'}
        subtitle={tour.program_list_name ?? tour.trip_code}
        backHref
        rightSlot={<GuideStatusBadge status={tour.guide_status} />}
        bottomSlot={
          <p className="text-xs text-(--color-text-muted) font-mono">{tour.trip_code}</p>
        }
      />

      <div className="px-4 py-4 space-y-4">
        {/* Tour Info */}
        <SectionCard title="ข้อมูลทัวร์">
          <div className="grid grid-cols-2 gap-3">
            <DetailItem icon="📅" label="วันที่" value={formatDate(tour.tour_date)} />
            <DetailItem icon="🕐" label="เวลา" value={formatTime(tour.tour_time)} />
            <DetailItem icon="🚌" label="รถ" value={tour.group_type_name ?? '-'} />
            <DetailItem icon="👥" label="ผู้โดยสาร" value={`${tour.total_pax} คน`} />
            <DetailItem icon="🗺️" label="ประเภท" value={tour.tour_type ?? '-'} />
            <DetailItem icon="↔️" label="ทิศทาง" value={tour.tour_direction ?? '-'} />
          </div>
          {tour.check_in_remark && (
            <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-xs text-amber-700 font-medium mb-0.5">หมายเหตุ</p>
              <p className="text-sm text-amber-900">{tour.check_in_remark}</p>
            </div>
          )}
        </SectionCard>

        {/* Check-in Stats */}
        <SectionCard title="สถานะ Check-in">
          <div className="grid grid-cols-3 gap-2">
            <StatCard value={stats.checkedIn} label="เช็คอินแล้ว" color="text-green-600" bg="bg-green-50" />
            <StatCard value={stats.noShow} label="ไม่มา" color="text-red-500" bg="bg-red-50" />
            <StatCard value={stats.pending} label="รอ" color="text-gray-500" bg="bg-gray-50" />
          </div>
          <Link
            href={`/tours/${tour.id}/checkin`}
            className="mt-3 flex items-center justify-center gap-2 w-full py-3 bg-(--color-line-green) text-white font-medium rounded-xl"
          >
            <span>✏️</span>
            จัดการ Check-in ({stats.total} booking)
          </Link>
        </SectionCard>

        {/* Guides */}
        {tour.guide_task?.filter((g) => g.id != null).length > 0 && (
          <SectionCard title="ไกด์ในทัวร์">
            <div className="space-y-2">
              {tour.guide_task.filter((g) => g.id != null).map((g, i) => (
                <GuideTaskItem
                  key={i}
                  guide={g}
                  isMe={g.id === guide?.id}
                />
              ))}
            </div>
          </SectionCard>
        )}

        {/* Accept Button */}
        {tour.guide_status === 'waiting' && (
          <button
            onClick={acceptTour}
            disabled={isAccepting}
            className="w-full py-3.5 bg-(--color-line-green) text-white font-semibold rounded-2xl disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isAccepting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                กำลังยืนยัน...
              </>
            ) : (
              '✅ ยืนยันรับงาน'
            )}
          </button>
        )}
      </div>
    </div>
  );
}
