'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { AppButton } from '@/components/ui/app-button';

const PDPA_TEXT = `บริษัทมีนโยบายคุ้มข้อมูลส่วนบุคคล เพื่อดูแลข้อมูลส่วนบุคคลของท่านที่ได้มอบหมายให้บริษัทเก็บรักษาไว้อย่างปลอดภัย บริษัทจะไม่เปิดเผยข้อมูลส่วนบุคคลของท่านต่อบุคคลที่สามโดยไม่ได้รับความยินยอมจากท่าน ยกเว้นในกรณีที่จำเป็นตามกฎหมาย

ข้อมูลที่บริษัทเก็บรวบรวม ได้แก่ ชื่อ-นามสกุล, เบอร์โทรศัพท์, เลขบัตรประชาชน, บัญชีธนาคาร และข้อมูลที่เกี่ยวข้องกับการทำงานเป็นมัคคุเทศก์

ท่านมีสิทธิ์ในการเข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลของท่านได้ตามที่กฎหมายกำหนด`;

export function RegisterPdpaScreen() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-dvh bg-[var(--color-background)]">
      {/* Header */}
      <div className="bg-white flex items-center gap-6 h-14 pl-6 pr-[72px] sticky top-0 z-10">
        <button
          type="button"
          onClick={() => router.back()}
          className="shrink-0 w-6 h-6 flex items-center justify-center"
          aria-label="ย้อนกลับ"
        >
          <ChevronLeft className="w-6 h-6 text-[var(--color-input-text)]" />
        </button>
        <p className="flex-1 text-center text-[#1b3045] text-xl font-semibold leading-[30px]">
          ข้อมูลส่วนบุคคล
        </p>
      </div>

      {/* Card */}
      <div className="flex flex-col items-center px-6 pt-6">
        <div className="bg-white w-full rounded-2xl drop-shadow-[0px_8px_8px_rgba(0,0,0,0.04)] px-6 py-10 flex flex-col gap-8">
          {/* Card title */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-[#1b3045] text-lg font-semibold text-center leading-[26px]">
              การคุ้มครองข้อมูลส่วนบุคคล
            </p>
            <div className="bg-[#026aa2] h-1 w-[100px] rounded-full" />
          </div>

          {/* PDPA text */}
          <div className="px-2">
            <p className="text-xs text-black font-normal leading-[18px] whitespace-pre-line">
              {PDPA_TEXT}
            </p>
          </div>
        </div>
      </div>

      {/* Footer button */}
      <div className="px-6 pt-6 pb-12">
        <AppButton
          size="l"
          fullWidth
          onClick={() => router.push('/register/form')}
          className="drop-shadow-[0px_8px_8px_rgba(0,0,0,0.04)]"
        >
          รับทราบ
        </AppButton>
      </div>
    </div>
  );
}
