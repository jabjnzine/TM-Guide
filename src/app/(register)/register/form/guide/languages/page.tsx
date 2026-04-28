'use client';

import { useRouter } from 'next/navigation';
import { ChooseItemsScreen } from '@/components/register/choose-items-screen';
import { useRegisterFormStore } from '@/store/register-form.store';
import { LANGUAGE_OPTIONS } from '@/lib/constants';

export default function ChooseLanguagePage() {
  const router = useRouter();
  const { step2, setStep2 } = useRegisterFormStore();

  return (
    <ChooseItemsScreen
      title="เลือกภาษา"
      subtitle="เพิ่มสูงสุดได้ 5 ภาษา"
      fieldLabel="ภาษา"
      addLabel="เพิ่มภาษา"
      options={LANGUAGE_OPTIONS}
      initialItems={step2.languages ?? []}
      maxItems={5}
      onConfirm={(items) => {
        setStep2({ languages: items });
        router.back();
      }}
      onBack={() => router.back()}
    />
  );
}
