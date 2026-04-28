'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useEffect } from 'react';
import { GuideRegisterLanding } from '@/components/register/guide-register-landing';

export default function RegisterPage() {
  const router = useRouter();
  const { pendingLineProfile, pendingGuide, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/tours');
      return;
    }
    // ต้องมีข้อมูลอย่างใดอย่างหนึ่ง
    if (!pendingLineProfile && !pendingGuide) {
      router.replace('/');
    }
  }, [isAuthenticated, pendingLineProfile, pendingGuide, router]);

  // user ใหม่ ยังไม่ได้ลงทะเบียน
  if (pendingLineProfile) {
    return (
      <GuideRegisterLanding
        displayName={pendingLineProfile.displayName}
        mode="register"
      />
    );
  }

  // ลงทะเบียนแล้ว รอ admin อนุมัติ
  if (pendingGuide) {
    return (
      <GuideRegisterLanding
        displayName={pendingGuide.nickname ?? pendingGuide.name}
        mode="pending"
      />
    );
  }

  return null;
}
