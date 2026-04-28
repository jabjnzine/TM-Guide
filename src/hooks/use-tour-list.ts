'use client';

import { useEffect, useState, useCallback } from 'react';
import { guidePortalApi } from '@/lib/api';
import { formatDateShort } from '@/lib/utils';
import type { GuidePortalTour } from '@/types';

export type QuickDate = { iso: string; label: string };

function buildQuickDates(): QuickDate[] {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const iso = d.toISOString().split('T')[0];
    const label = i === 0 ? 'วันนี้' : i === 1 ? 'พรุ่งนี้' : formatDateShort(iso);
    return { iso, label };
  });
}

export const QUICK_DATES = buildQuickDates();

type State = {
  tours: GuidePortalTour[];
  isLoading: boolean;
  error: string | null;
};

export function useTourList(initialDate?: string) {
  const [selectedDate, setSelectedDate] = useState(initialDate ?? QUICK_DATES[0].iso);
  const [state, setState] = useState<State>({ tours: [], isLoading: true, error: null });

  const load = useCallback(async (date: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const { data } = await guidePortalApi.getTours(date);
      setState({ tours: data, isLoading: false, error: null });
    } catch {
      setState({ tours: [], isLoading: false, error: 'ไม่สามารถโหลดข้อมูลได้' });
    }
  }, []);

  useEffect(() => {
    load(selectedDate);
  }, [selectedDate, load]);

  return {
    ...state,
    selectedDate,
    setSelectedDate,
    quickDates: QUICK_DATES,
    retry: () => load(selectedDate),
  };
}
