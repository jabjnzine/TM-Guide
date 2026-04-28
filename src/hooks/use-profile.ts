'use client';

import { useEffect, useState } from 'react';
import { guidePortalApi } from '@/lib/api';
import { useAuthStore } from '@/store/auth.store';
import type { GuideProfile } from '@/types';

export function useProfile() {
  const { guide: storeGuide, clear } = useAuthStore();
  const [profile, setProfile] = useState<GuideProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await guidePortalApi.getProfile();
        setProfile(data);
      } catch {
        setProfile(storeGuide);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [storeGuide]);

  function logout() {
    clear();
    window.location.href = '/';
  }

  return { profile: profile ?? storeGuide, isLoading, logout };
}
