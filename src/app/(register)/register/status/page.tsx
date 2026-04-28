'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { RegisterStatusScreen } from '@/components/register/register-status-screen';

export default function RegisterStatusPage() {
  const router = useRouter();
  const { pendingGuide, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/tours');
      return;
    }
    if (!pendingGuide) {
      router.replace('/');
    }
  }, [isAuthenticated, pendingGuide, router]);

  if (!pendingGuide) return null;

  return (
    <RegisterStatusScreen
      statusGeneral={pendingGuide.status_general}
      statusLicense={pendingGuide.status_license}
      statusBank={pendingGuide.status_bank}
    />
  );
}
