'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GuideProfile, LineProfile } from '@/types';

type AuthState = {
  guide: GuideProfile | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  /** LINE profile สำหรับไกด์ที่ยังไม่ได้ลงทะเบียน */
  pendingLineProfile: LineProfile | null;
  /** Guide ที่ลงทะเบียนแล้วแต่ยังรอ admin อนุมัติ */
  pendingGuide: GuideProfile | null;
  /** true หลังจาก zustand persist โหลดข้อมูลจาก localStorage เสร็จแล้ว */
  _hasHydrated: boolean;
  setAuth: (guide: GuideProfile, token: string) => void;
  setPendingLineProfile: (profile: LineProfile) => void;
  clearPendingLineProfile: () => void;
  setPendingGuide: (guide: GuideProfile) => void;
  clearPendingGuide: () => void;
  clear: () => void;
  _setHasHydrated: (v: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      guide: null,
      accessToken: null,
      isAuthenticated: false,
      pendingLineProfile: null,
      pendingGuide: null,
      _hasHydrated: false,
      setAuth: (guide, accessToken) =>
        set({ guide, accessToken, isAuthenticated: true, pendingLineProfile: null, pendingGuide: null }),
      setPendingLineProfile: (profile) =>
        set({ pendingLineProfile: profile }),
      clearPendingLineProfile: () =>
        set({ pendingLineProfile: null }),
      setPendingGuide: (guide) =>
        set({ pendingGuide: guide }),
      clearPendingGuide: () =>
        set({ pendingGuide: null }),
      clear: () =>
        set({ guide: null, accessToken: null, isAuthenticated: false, pendingLineProfile: null, pendingGuide: null }),
      _setHasHydrated: (v) => set({ _hasHydrated: v }),
    }),
    {
      name: 'guide-auth',
      partialize: (state) => ({
        guide: state.guide,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        pendingLineProfile: state.pendingLineProfile,
        pendingGuide: state.pendingGuide,
      }),
      onRehydrateStorage: () => (state) => {
        state?._setHasHydrated(true);
      },
    },
  ),
);
