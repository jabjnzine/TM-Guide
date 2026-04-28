/**
 * RegisterGuideInfoScreen — Step 2: ข้อมูลมัคคุเทศก์
 * ออกแบบตาม Figma node 425:7618
 *
 * Fields:
 * - เลขที่ใบอนุญาต (Licence No.)
 * - วันหมดอายุ (date picker)
 * - ภาษา → navigates to /register/form/guide/languages
 * - พื้นที่รับงาน → navigates to /register/form/guide/areas
 * - อัปโหลดรูปหน้าใบอนุญาต
 */

'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, Calendar, Plus, Upload } from 'lucide-react';
import { authApi } from '@/lib/api';
import { AppButton } from '@/components/ui/app-button';
import { AppInput, InputWrapper } from '@/components/ui/app-input';
import { useAuthStore } from '@/store/auth.store';
import { useRegisterFormStore } from '@/store/register-form.store';
import { cn } from '@/lib/utils';

const TOTAL_STEPS = 3;

const schema = z.object({
  licenceNo: z.string().min(1, 'กรุณากรอกเลขที่ใบอนุญาต'),
  licenceExpiry: z.string().min(1, 'กรุณาเลือกวันหมดอายุ'),
});

type FormValues = z.infer<typeof schema>;

// ─── NavigableField — clickable field that shows selected values ───────────

type NavigableFieldProps = {
  label: string;
  required?: boolean;
  placeholder: string;
  value?: string;
  error?: string;
  onClick: () => void;
};

function NavigableField({
  label,
  required,
  placeholder,
  value,
  error,
  onClick,
}: NavigableFieldProps) {
  return (
    <InputWrapper label={label} required={required} error={error}>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'w-full h-12 flex items-center gap-2 px-3 rounded-lg border transition-colors duration-150',
          'bg-white text-left',
          error
            ? 'border-[var(--color-btn-error)]'
            : 'border-[var(--color-input-border)]',
        )}
      >
        <span
          className={cn(
            'flex-1 min-w-0 truncate text-base leading-5',
            value ? 'text-[#101828]' : 'text-[var(--color-input-placeholder)]',
          )}
        >
          {value || placeholder}
        </span>
        <ChevronRight className="shrink-0 w-6 h-6 text-[var(--color-input-placeholder)]" />
      </button>
    </InputWrapper>
  );
}

// ─── Main screen ───────────────────────────────────────────────

export function RegisterGuideInfoScreen() {
  const router = useRouter();
  const { clearPendingLineProfile, pendingLineProfile } = useAuthStore();
  const { step1, step2, setStep2, resetForm } = useRegisterFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [licencePreview, setLicencePreview] = useState<string | null>(null);
  const [licenceFile, setLicenceFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const languages: string[] = step2.languages ?? [];
  const workAreas: string[] = step2.workAreas ?? [];
  const [langError, setLangError] = useState('');
  const [areaError, setAreaError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { licenceNo: '', licenceExpiry: '' },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLicenceFile(file);
    setLicencePreview(URL.createObjectURL(file));
  };

  const onSubmit = async (values: FormValues) => {
    let valid = true;
    if (languages.length === 0) {
      setLangError('กรุณาเลือกอย่างน้อย 1 ภาษา');
      valid = false;
    } else {
      setLangError('');
    }
    if (workAreas.length === 0) {
      setAreaError('กรุณาเลือกพื้นที่รับงาน');
      valid = false;
    } else {
      setAreaError('');
    }
    if (!valid) return;

    if (!pendingLineProfile) {
      toast.error('ไม่พบข้อมูล LINE กรุณาเริ่มต้นใหม่');
      router.replace('/register');
      return;
    }

    setStep2({
      licenceNo: values.licenceNo,
      licenceExpiry: values.licenceExpiry,
      languages,
      workAreas,
      licenceImageFile: licenceFile,
    });

    setIsSubmitting(true);
    try {
      await authApi.liffRegister({
        line_id: pendingLineProfile.userId,
        line_display_name: pendingLineProfile.displayName,
        title: step1.title ?? '',
        name: `${step1.firstName ?? ''} ${step1.lastName ?? ''}`.trim(),
        nickname: step1.nickname,
        phone: step1.phone ?? '',
        national_id: step1.nationalId ?? '',
        licence_no: values.licenceNo,
        licence_expiry: values.licenceExpiry,
        languages: languages,
        work_areas: workAreas,
      });
      resetForm();
      clearPendingLineProfile();
      router.replace('/register/pending');
    } catch {
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-dvh bg-[var(--color-background)]">
      {/* Header with step indicator */}
      <div className="bg-white flex items-center gap-6 h-14 pl-6 pr-[72px] sticky top-0 z-10">
        <button
          type="button"
          onClick={() => router.back()}
          className="shrink-0 w-6 h-6 flex items-center justify-center"
          aria-label="ย้อนกลับ"
        >
          <ChevronLeft className="w-6 h-6 text-[#101828]" />
        </button>

        <div className="flex-1 flex items-center justify-center p-2">
          <div className="flex gap-2 items-center">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <div
                key={i}
                className="h-1 w-12 rounded-full"
                style={{ background: i <= 1 ? '#026aa2' : '#afb4bc' }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Section title */}
      <div className="px-6 py-2">
        <p className="text-[#1b3045] text-lg font-semibold text-center leading-[26px]">
          2. ข้อมูลมัคคุเทศก์
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col items-center px-6 gap-0">

          {/* Licence No. */}
          <div className="w-full pb-2">
            <AppInput
              label="เลขที่ใบอนุญาต (Licence No.)"
              placeholder="xxxxxxx"
              required
              error={errors.licenceNo?.message}
              {...register('licenceNo')}
            />
          </div>

          {/* Licence Expiry */}
          <div className="w-full pb-2">
            <InputWrapper
              label="วันหมดอายุ"
              required
              error={errors.licenceExpiry?.message}
            >
              <div
                className={cn(
                  'w-full h-12 flex items-center gap-2 px-3 rounded-lg border bg-white transition-colors duration-150',
                  errors.licenceExpiry
                    ? 'border-[var(--color-btn-error)]'
                    : 'border-[var(--color-input-border)]',
                )}
              >
                <input
                  type="date"
                  className="flex-1 min-w-0 bg-transparent text-base text-[#101828] outline-none"
                  {...register('licenceExpiry')}
                />
                <Calendar className="shrink-0 w-6 h-6 text-[var(--color-input-placeholder)]" />
              </div>
            </InputWrapper>
          </div>

          {/* ภาษา — navigates to /register/form/guide/languages */}
          <div className="w-full pb-2">
            <NavigableField
              label="ภาษา"
              required
              placeholder="เลือกภาษา"
              value={
                languages.length > 0 ? languages.join(' / ') : undefined
              }
              error={langError}
              onClick={() => router.push('/register/form/guide/languages')}
            />
          </div>

          {/* พื้นที่รับงาน — navigates to /register/form/guide/areas */}
          <div className="w-full pb-2">
            <NavigableField
              label="พื้นที่รับงาน"
              required
              placeholder="เลือกพื้นที่รับงาน"
              value={
                workAreas.length > 0 ? workAreas.join(', ') : undefined
              }
              error={areaError}
              onClick={() => router.push('/register/form/guide/areas')}
            />
          </div>

          {/* Licence image upload */}
          <div className="w-full flex flex-col gap-1 pb-2">
            <label className="text-sm font-normal text-black h-6 flex items-center">
              อัปโหลดรูปหน้าใบอนุญาตมัคคุเทศก์
            </label>

            {licencePreview ? (
              <div className="relative rounded-lg overflow-hidden border border-[var(--color-border)] h-[150px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={licencePreview}
                  alt="Licence"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setLicencePreview(null);
                    setLicenceFile(null);
                  }}
                  className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-[#525a6a] rounded-lg h-[150px] flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col items-center gap-2">
                  <Plus className="w-8 h-8 text-[#026aa2]" strokeWidth={2} />
                  <p className="text-base text-[#1d2939] text-center">
                    อัปโหลดไฟล์ที่นี่
                  </p>
                  <p className="text-xs text-[#525a6a] text-center">
                    กรุณาอัปโหลดไฟล์ ตามประเภทและขนาดที่กำหนด
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="border border-[#525a6a] rounded-lg px-4 py-1.5 text-xs text-[#2f4b67] font-medium flex items-center gap-1 hover:bg-gray-100 transition"
                >
                  <Upload className="w-3 h-3" />
                  อัปโหลด
                </button>
              </div>
            )}

            <p className="text-xs text-[#afb4bc] leading-[18px]">
              ไฟล์ที่รองรับ : JPG, PNG, Heic, JPEG ขนาดไม่เกิน 5 MB
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/heic,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />
            {licenceFile && <span className="sr-only">{licenceFile.name}</span>}
          </div>
        </div>

        {/* Submit */}
        <div className="px-6 pt-6 pb-12 bg-[var(--color-background)]">
          <AppButton
            type="submit"
            size="l"
            fullWidth
            isLoading={isSubmitting}
            className="drop-shadow-[0px_8px_8px_rgba(0,0,0,0.04)]"
          >
            {isSubmitting ? 'กำลังส่งข้อมูล...' : 'ถัดไป'}
          </AppButton>
        </div>
      </form>
    </div>
  );
}
