/**
 * ChooseItemsScreen — multi-select screen
 * ใช้สำหรับ: เลือกภาษา (346:6782 / 1729:44280) และเลือกพื้นที่รับงาน
 *
 * Design specs:
 * - Header: back arrow + title
 * - Subtitle: "เพิ่มสูงสุดได้ N รายการ"
 * - Each entry: ลำดับที่ X | [ลบ button] + AppDropdown
 * - Add button: green, "+ เพิ่ม{itemLabel}"
 * - Confirm button: blue, "ยืนยัน"
 */

'use client';

import { useState } from 'react';
import { ChevronLeft, Plus } from 'lucide-react';
import { AppButton } from '@/components/ui/app-button';
import { AppDropdown, type DropdownOption } from '@/components/ui/app-dropdown';

type Props = {
  title: string;
  subtitle: string;
  fieldLabel: string;
  addLabel: string;
  options: DropdownOption[];
  initialItems?: string[];
  maxItems?: number;
  onConfirm: (items: string[]) => void;
  onBack: () => void;
};

export function ChooseItemsScreen({
  title,
  subtitle,
  fieldLabel,
  addLabel,
  options,
  initialItems = [],
  maxItems = 5,
  onConfirm,
  onBack,
}: Props) {
  const [items, setItems] = useState<string[]>(
    initialItems.length > 0 ? initialItems : [''],
  );

  const handleAdd = () => {
    if (items.length < maxItems) setItems([...items, '']);
  };

  const handleRemove = (index: number) => {
    const next = items.filter((_, i) => i !== index);
    setItems(next.length > 0 ? next : ['']);
  };

  const handleChange = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    setItems(next);
  };

  const handleConfirm = () => {
    onConfirm(items.filter(Boolean));
  };

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      {/* Header */}
      <div className="bg-white flex items-center gap-6 h-14 pl-6 pr-[72px] sticky top-0 z-10">
        <button
          type="button"
          onClick={onBack}
          className="shrink-0 w-6 h-6 flex items-center justify-center"
          aria-label="ย้อนกลับ"
        >
          <ChevronLeft className="w-6 h-6 text-[#101828]" />
        </button>
        <h1 className="flex-1 text-center text-xl font-semibold text-[#1b3045]">
          {title}
        </h1>
      </div>

      {/* Subtitle */}
      <p className="text-center text-sm text-[#1b3045] py-2 leading-[22px]">
        {subtitle}
      </p>

      {/* Items list */}
      <div className="flex-1">
        {items.map((item, i) => (
          <div key={i}>
            {/* Row header: ลำดับที่ + ลบ */}
            <div className="flex items-center justify-between px-6 py-3 h-16">
              <span className="text-base text-[var(--color-brand-blue)] leading-6">
                ลำดับที่ {i + 1}
              </span>
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemove(i)}
                  className="border border-[#2f4b67] text-[#2f4b67] text-sm font-medium px-4 py-1.5 rounded-lg leading-5"
                >
                  ลบ
                </button>
              )}
            </div>

            {/* Dropdown */}
            <div className="px-6 pb-2">
              <AppDropdown
                label={fieldLabel}
                placeholder="กรุณาเลือก"
                options={options}
                value={item}
                onChange={(val) => handleChange(i, val)}
              />
            </div>

            {/* Divider */}
            <div className="mx-6 border-b border-[#d1d4da]" />
          </div>
        ))}

        {/* Add button */}
        {items.length < maxItems && (
          <div className="flex justify-center py-4">
            <button
              type="button"
              onClick={handleAdd}
              className="bg-[var(--color-btn-success)] text-white text-xs font-medium flex items-center gap-1 px-4 py-1.5 rounded-lg leading-5"
            >
              <Plus className="w-5 h-5" />
              {addLabel}
            </button>
          </div>
        )}
      </div>

      {/* Confirm button */}
      <div className="px-6 pt-6 pb-12">
        <AppButton type="button" size="l" fullWidth onClick={handleConfirm}>
          ยืนยัน
        </AppButton>
      </div>
    </div>
  );
}
