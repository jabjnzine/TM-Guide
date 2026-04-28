'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { authApi } from '@/lib/api';

type LiffState = {
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
};

/**
 * liff.init() ต้องเรียกแค่ครั้งเดียวต่อ browser session
 * module-level singleton ป้องกัน re-init เมื่อ component unmount/remount
 */
let liffInitPromise: Promise<void> | null = null;

function getLiffInitPromise(liffId: string): Promise<void> {
  if (!liffInitPromise) {
    liffInitPromise = import('@line/liff').then(({ default: liff }) =>
      liff.init({ liffId }),
    );
  }
  return liffInitPromise;
}

export function useLiff() {
  const router = useRouter();
  const { setAuth, setPendingLineProfile, setPendingGuide, isAuthenticated, pendingLineProfile } = useAuthStore();
  const [state, setState] = useState<LiffState>({
    isLoading: true,
    isReady: false,
    error: null,
  });
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    async function init() {
      try {
        const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
        if (!liffId) throw new Error('NEXT_PUBLIC_LIFF_ID is not set');

        console.log('[LIFF] init — liffId:', liffId);
        const liff = (await import('@line/liff')).default;

        await getLiffInitPromise(liffId);
        console.log('[LIFF] ready — isLoggedIn:', liff.isLoggedIn());

        if (!liff.isLoggedIn()) {
          console.log('[LIFF] not logged in → liff.login()');
          liff.login();
          return;
        }

        if (!isAuthenticated && !pendingLineProfile) {
          const lineAccessToken = liff.getAccessToken();
          if (!lineAccessToken) throw new Error('ไม่สามารถดึง LINE access token ได้');

          console.log('[API] POST /auth/liff ...');
          const { data } = await authApi.liffLogin(lineAccessToken);
          console.log('[API] /auth/liff →', data);

          if (data.registered) {
            if (data.guide.status_general === 'pending') {
              // ลงทะเบียนแล้วแต่รอ admin อนุมัติ — เก็บ guide data ไว้แสดง status
              console.log('[LIFF] guide pending approval → /register');
              setPendingGuide(data.guide);
              setState({ isLoading: false, isReady: true, error: null });
              router.replace('/register');
              return;
            }
            setAuth(data.guide, data.access_token);
            setState({ isLoading: false, isReady: true, error: null });
          } else {
            setPendingLineProfile(data.line_profile);
            setState({ isLoading: false, isReady: true, error: null });
            router.replace('/register');
          }
          return;
        }

        if (pendingLineProfile && !isAuthenticated) {
          setState({ isLoading: false, isReady: true, error: null });
          router.replace('/register');
          return;
        }

        console.log('[LIFF] already authenticated — skip API call');
        setState({ isLoading: false, isReady: true, error: null });
      } catch (err: unknown) {
        console.error('[LIFF] error:', err);
        const message =
          err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการเชื่อมต่อ LINE';
        setState({ isLoading: false, isReady: false, error: message });
      }
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
