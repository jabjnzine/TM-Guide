/**
 * ChooseAreaScreen — เลือกพื้นที่รับงาน
 * ออกแบบตาม Figma node 346:6342
 *
 * Design: full-page checklist — tap row เพื่อ select/deselect
 * - Header: back arrow + title
 * - List: h-64px rows, area name + green checkmark (ถ้าเลือก), divider
 * - "ยืนยัน" button ด้านล่าง
 */

'use client';

import { useState } from 'react';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';
import { AppButton } from '@/components/ui/app-button';

type Props = {
  title?: string;
  areas: string[];
  initialSelected?: string[];
  onConfirm: (selected: string[]) => void;
  onBack: () => void;
};

export function ChooseAreaScreen({
  title = 'เลือกพื้นที่รับงาน',
  areas,
  initialSelected = [],
  onConfirm,
  onBack,
}: Props) {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(initialSelected),
  );

  const toggle = (area: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(area)) {
        next.delete(area);
      } else {
        next.add(area);
      }
      return next;
    });
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

      {/* List */}
      <div className="flex-1">
        {areas.map((area) => {
          const isSelected = selected.has(area);
          return (
            <div key={area}>
              <button
                type="button"
                onClick={() => toggle(area)}
                className="w-full flex items-center gap-4 h-16 px-4 py-3 text-left"
              >
                <span className="flex-1 text-base text-black leading-6">
                  {area}
                </span>
                {isSelected && (
                  <CheckCircle2
                    className="shrink-0 w-6 h-6 text-[var(--color-btn-success)]"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                )}
              </button>
              {/* Divider */}
              <div className="mx-4 border-b border-[#d1d4da]" />
            </div>
          );
        })}
      </div>

      {/* Confirm button */}
      <div className="px-6 pt-6 pb-12">
        <AppButton
          type="button"
          size="l"
          fullWidth
          onClick={() => onConfirm([...selected])}
        >
          ยืนยัน
        </AppButton>
      </div>
    </div>
  );
}
