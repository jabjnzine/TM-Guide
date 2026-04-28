'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useEffect } from 'react';
import { RegisterIntroScreen } from '@/components/register/register-intro-screen';

export default function RegisterPage() {
  const router = useRouter();
  const { pendingLineProfile, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/tours');
      return;
    }
    if (!pendingLineProfile) {
      router.replace('/');
    }
  }, [isAuthenticated, pendingLineProfile, router]);

  if (!pendingLineProfile) return null;

  return <RegisterIntroScreen lineProfile={pendingLineProfile} />;
}
