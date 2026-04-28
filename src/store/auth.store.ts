'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GuideProfile } from '@/types';

type AuthState = {
  guide: GuideProfile | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (guide: GuideProfile, token: string) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      guide: null,
      accessToken: null,
      isAuthenticated: false,
      setAuth: (guide, accessToken) =>
        set({ guide, accessToken, isAuthenticated: true }),
      clear: () =>
        set({ guide: null, accessToken: null, isAuthenticated: false }),
    }),
    {
      name: 'guide-auth',
      partialize: (state) => ({
        guide: state.guide,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
