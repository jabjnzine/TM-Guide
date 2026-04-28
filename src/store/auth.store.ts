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
  setAuth: (guide: GuideProfile, token: string) => void;
  setPendingLineProfile: (profile: LineProfile) => void;
  clearPendingLineProfile: () => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      guide: null,
      accessToken: null,
      isAuthenticated: false,
      pendingLineProfile: null,
      setAuth: (guide, accessToken) =>
        set({ guide, accessToken, isAuthenticated: true, pendingLineProfile: null }),
      setPendingLineProfile: (profile) =>
        set({ pendingLineProfile: profile }),
      clearPendingLineProfile: () =>
        set({ pendingLineProfile: null }),
      clear: () =>
        set({ guide: null, accessToken: null, isAuthenticated: false, pendingLineProfile: null }),
    }),
    {
      name: 'guide-auth',
      partialize: (state) => ({
        guide: state.guide,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        pendingLineProfile: state.pendingLineProfile,
      }),
    },
  ),
);
