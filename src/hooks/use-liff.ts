'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { authApi } from '@/lib/api';

type LiffState = {
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
};

export function useLiff() {
  const { setAuth, isAuthenticated } = useAuthStore();
  const [state, setState] = useState<LiffState>({
    isLoading: true,
    isReady: false,
    error: null,
  });
  const initialized = useRef(false);

  const init = useCallback(async () => {
    if (initialized.current) return;
    initialized.current = true;

    try {
      const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
      if (!liffId) throw new Error('NEXT_PUBLIC_LIFF_ID is not set');

      const liff = (await import('@line/liff')).default;
      await liff.init({ liffId });

      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }

      if (!isAuthenticated) {
        const lineAccessToken = liff.getAccessToken();
        if (!lineAccessToken) throw new Error('ไม่สามารถดึง LINE access token ได้');

        const { data } = await authApi.liffLogin(lineAccessToken);
        setAuth(data.guide, data.access_token);
      }

      setState({ isLoading: false, isReady: true, error: null });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการเชื่อมต่อ LINE';
      setState({ isLoading: false, isReady: false, error: message });
    }
  }, [isAuthenticated, setAuth]);

  useEffect(() => {
    init();
  }, [init]);

  return state;
}
