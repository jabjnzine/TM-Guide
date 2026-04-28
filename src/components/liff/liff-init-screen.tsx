'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLiff } from '@/hooks/use-liff';

export default function LiffInitScreen() {
  const { isLoading, isReady, error } = useLiff();
  const router = useRouter();

  useEffect(() => {
    if (isReady) {
      router.replace('/tours');
    }
  }, [isReady, router]);

  if (error) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-4 px-6 bg-(--color-background)">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-3xl">
          ⚠️
        </div>
        <div className="text-center">
          <p className="font-semibold text-(--color-text-primary) mb-1">เกิดข้อผิดพลาด</p>
          <p className="text-sm text-(--color-text-secondary)">{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-6 py-2.5 bg-(--color-line-green) text-white text-sm font-medium rounded-xl"
        >
          ลองอีกครั้ง
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-5 bg-(--color-background)">
      <div className="flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-2xl bg-(--color-line-green) flex items-center justify-center shadow-lg">
          <span className="text-4xl">🗺️</span>
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold text-(--color-text-primary)">TourMaster</h1>
          <p className="text-sm text-(--color-text-secondary) mt-0.5">Guide Portal</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-(--color-text-secondary)">
        <span className="inline-block w-4 h-4 border-2 border-(--color-line-green) border-t-transparent rounded-full animate-spin" />
        กำลังเชื่อมต่อ LINE...
      </div>
    </div>
  );
}
