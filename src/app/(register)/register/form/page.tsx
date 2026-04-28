'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useEffect } from 'react';
import { RegisterFormScreen } from '@/components/register/register-form-screen';

export default function RegisterFormPage() {
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

  return <RegisterFormScreen lineProfile={pendingLineProfile} />;
}
