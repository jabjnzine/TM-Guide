'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { guidePortalApi } from '@/lib/api';
import type { GuidePortalTour, CheckInStatus, UpdateCheckInPayload, TourItem } from '@/types';
import { toast } from 'sonner';

export function useTourDetail(tourId: number) {
  const router = useRouter();
  const [tour, setTour] = useState<GuidePortalTour | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAccepting, setIsAccepting] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await guidePortalApi.getTourDetail(tourId);
        setTour(data);
      } catch {
        router.replace('/tours');
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [tourId, router]);

  const acceptTour = useCallback(async () => {
    if (!tour) return;
    setIsAccepting(true);
    try {
      await guidePortalApi.acceptTour(tour.id);
      setTour((prev) => prev ? { ...prev, guide_status: 'approved' } : prev);
      toast.success('ยืนยันรับงานสำเร็จ');
    } catch {
      toast.error('ไม่สามารถยืนยันรับงานได้');
    } finally {
      setIsAccepting(false);
    }
  }, [tour]);

  const updateCheckIn = useCallback(
    async (item: TourItem, newStatus: CheckInStatus) => {
      if (!tour || updatingItemId !== null) return;

      setUpdatingItemId(item.id);
      try {
        const payload: UpdateCheckInPayload = {
          check_in_status: newStatus,
          check_in_pax: newStatus === 'check-in' ? item.pax : undefined,
          no_show_pax: newStatus === 'no-show' ? item.pax : undefined,
        };
        await guidePortalApi.updateCheckIn(tour.id, item.id, payload);

        setTour((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            tour_items: prev.tour_items.map((i) =>
              i.id === item.id
                ? {
                    ...i,
                    check_in_status: newStatus,
                    check_in_pax: newStatus === 'check-in' ? i.pax : i.check_in_pax,
                    check_in_time:
                      newStatus === 'check-in' ? new Date().toISOString() : i.check_in_time,
                  }
                : i,
            ),
          };
        });

        toast.success(newStatus === 'check-in' ? 'เช็คอินสำเร็จ' : 'บันทึกสำเร็จ', {
          description: item.customer_name ?? undefined,
        });
      } catch {
        toast.error('เกิดข้อผิดพลาด ลองอีกครั้ง');
      } finally {
        setUpdatingItemId(null);
      }
    },
    [tour, updatingItemId],
  );

  // Derived stats
  const stats = tour
    ? {
        checkedIn: tour.tour_items.filter((i) => i.check_in_status === 'check-in').length,
        noShow: tour.tour_items.filter((i) => i.check_in_status === 'no-show').length,
        pending: tour.tour_items.filter((i) => i.check_in_status === 'pending').length,
        total: tour.tour_items.length,
      }
    : null;

  return {
    tour,
    isLoading,
    isAccepting,
    updatingItemId,
    stats,
    acceptTour,
    updateCheckIn,
  };
}
