'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import BottomNav from '@/components/liff/bottom-nav';

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, _hasHydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (_hasHydrated && !isAuthenticated) {
      router.replace('/');
    }
  }, [_hasHydrated, isAuthenticated, router]);

  // รอให้ zustand persist โหลดข้อมูลจาก localStorage ก่อนตัดสินใจ redirect
  if (!_hasHydrated) return null;
  if (!isAuthenticated) return null;

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1 pb-20">{children}</main>
      <BottomNav />
    </div>
  );
}
