'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronLeft, Plus, Upload } from 'lucide-react';
import { AppButton } from '@/components/ui/app-button';
import { AppInput } from '@/components/ui/app-input';
import { AppDropdown } from '@/components/ui/app-dropdown';
import { useRegisterFormStore } from '@/store/register-form.store';
import type { LineProfile } from '@/types';

const TITLE_OPTIONS = [
  { value: 'นาย', label: 'นาย' },
  { value: 'นาง', label: 'นาง' },
  { value: 'นางสาว', label: 'นางสาว' },
  { value: 'ดร.', label: 'ดร.' },
  { value: 'อื่นๆ', label: 'อื่นๆ' },
];

const TOTAL_STEPS = 3;

const schema = z.object({
  title: z.string().min(1, 'กรุณาเลือกคำนำหน้า'),
  firstName: z.string().min(1, 'กรุณากรอกชื่อ'),
  lastName: z.string().min(1, 'กรุณากรอกนามสกุล'),
  nickname: z.string().optional(),
  phone: z
    .string()
    .min(9, 'เบอร์โทรศัพท์ไม่ถูกต้อง')
    .regex(/^[0-9\-+\s]+$/, 'กรุณากรอกเฉพาะตัวเลข'),
  nationalId: z
    .string()
    .min(13, 'เลขบัตรประชาชนต้องมี 13 หลัก')
    .max(17, 'รูปแบบไม่ถูกต้อง'),
});

type FormValues = z.infer<typeof schema>;

type Props = { lineProfile: LineProfile };

export function RegisterFormScreen({ lineProfile }: Props) {
  const router = useRouter();
  const { setStep1 } = useRegisterFormStore();
  const [idCardPreview, setIdCardPreview] = useState<string | null>(null);
  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  void lineProfile; // used in step 2 submission

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      firstName: '',
      lastName: '',
      nickname: '',
      phone: '',
      nationalId: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIdCardFile(file);
    setIdCardPreview(URL.createObjectURL(file));
  };

  const onSubmit = (values: FormValues) => {
    setStep1({
      title: values.title,
      firstName: values.firstName,
      lastName: values.lastName,
      nickname: values.nickname ?? '',
      phone: values.phone,
      nationalId: values.nationalId,
      nationalIdImageFile: idCardFile,
    });
    router.push('/register/form/guide');
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
          <ChevronLeft className="w-6 h-6 text-[var(--color-input-text)]" />
        </button>

        {/* Step progress */}
        <div className="flex-1 flex items-center justify-center p-2">
          <div className="flex gap-2 items-center">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <div
                key={i}
                className="h-1 w-12 rounded-full"
                style={{ background: i === 0 ? '#026aa2' : '#afb4bc' }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Section title */}
      <div className="px-6 py-2">
        <p className="text-[#1b3045] text-lg font-semibold text-center leading-[26px]">
          1. ข้อมูลทั่วไป
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col items-center px-6 gap-0">

          {/* Title dropdown */}
          <div className="w-full pb-2">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <AppDropdown
                  label="คำนำหน้าชื่อ"
                  placeholder="กรุณาเลือก"
                  required
                  options={TITLE_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.title?.message}
                />
              )}
            />
          </div>

          {/* First name */}
          <div className="w-full pb-2">
            <AppInput
              label="ชื่อ"
              placeholder="กรอกชื่อ"
              required
              error={errors.firstName?.message}
              {...register('firstName')}
            />
          </div>

          {/* Last name */}
          <div className="w-full pb-2">
            <AppInput
              label="นามสกุล"
              placeholder="กรอกนามสกุล"
              required
              error={errors.lastName?.message}
              {...register('lastName')}
            />
          </div>

          {/* Nickname */}
          <div className="w-full pb-2">
            <AppInput
              label="ชื่อเล่น"
              placeholder="กรอกชื่อเล่น"
              error={errors.nickname?.message}
              {...register('nickname')}
            />
          </div>

          {/* Phone */}
          <div className="w-full pb-2">
            <AppInput
              type="tel"
              inputMode="tel"
              label="เบอร์โทรศัพท์"
              placeholder="xxx-xxx-xxxx"
              required
              error={errors.phone?.message}
              {...register('phone')}
            />
          </div>

          {/* National ID */}
          <div className="w-full pb-2">
            <AppInput
              inputMode="numeric"
              label="เลขบัตรประชาชน"
              placeholder="x-xxxx-xxxxx-xx-x"
              required
              error={errors.nationalId?.message}
              {...register('nationalId')}
            />
          </div>

          {/* ID Card upload */}
          <div className="w-full flex flex-col gap-1 pb-2">
            <label className="text-sm font-normal text-black h-6 flex items-center leading-[18px]">
              อัปโหลดหน้าบัตรประชาชน
            </label>

            {idCardPreview ? (
              <div className="relative rounded-lg overflow-hidden border border-[var(--color-border)] h-[150px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={idCardPreview} alt="ID Card" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => { setIdCardPreview(null); setIdCardFile(null); }}
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
                    อัปโหลดรูปภาพที่นี่
                  </p>
                  <p className="text-xs text-[#525a6a] text-center">
                    กรุณาอัปโหลดไฟล์ ตามประเภทและขนาดที่กำหนด
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
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
            {/* suppress unused warning */}
            {idCardFile && <span className="sr-only">{idCardFile.name}</span>}
          </div>
        </div>

        {/* Submit */}
        <div className="px-6 pt-6 pb-12 bg-[var(--color-background)]">
          <AppButton
            type="submit"
            size="l"
            fullWidth
            className="drop-shadow-[0px_8px_8px_rgba(0,0,0,0.04)]"
          >
            ถัดไป
          </AppButton>
        </div>
      </form>
    </div>
  );
}
