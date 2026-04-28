'use client';

import { useRouter } from 'next/navigation';
import { ChooseAreaScreen } from '@/components/register/choose-area-screen';
import { useRegisterFormStore } from '@/store/register-form.store';
import { WORK_AREA_OPTIONS } from '@/lib/constants';

export default function ChooseAreasPage() {
  const router = useRouter();
  const { step2, setStep2 } = useRegisterFormStore();

  return (
    <ChooseAreaScreen
      areas={WORK_AREA_OPTIONS.map((o) => o.label)}
      initialSelected={step2.workAreas ?? []}
      onConfirm={(selected) => {
        setStep2({ workAreas: selected });
        router.back();
      }}
      onBack={() => router.back()}
    />
  );
}
