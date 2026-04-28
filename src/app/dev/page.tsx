/**
 * /dev — UI Preview page (development only)
 * เข้าถึงได้ที่ http://localhost:3000/dev
 */

'use client';

import { useState } from 'react';
import { RegisterIntroScreen } from '@/components/register/register-intro-screen';
import { RegisterPdpaScreen } from '@/components/register/register-pdpa-screen';
import { RegisterFormScreen } from '@/components/register/register-form-screen';
import { RegisterGuideInfoScreen } from '@/components/register/register-guide-info-screen';
import { RegisterPendingScreen } from '@/components/register/register-pending-screen';
import { ChooseItemsScreen } from '@/components/register/choose-items-screen';
import { ChooseAreaScreen } from '@/components/register/choose-area-screen';
import { AppBottomSheet, AppBottomSheetSelect } from '@/components/ui/app-bottom-sheet';
import { AppButton } from '@/components/ui/app-button';
import { LANGUAGE_OPTIONS, WORK_AREA_OPTIONS } from '@/lib/constants';

const MOCK_LINE_PROFILE = {
  userId: 'Uabc1234567890',
  displayName: 'สุนทรี ใจดี',
  pictureUrl: 'https://profile.line-scdn.net/0h00000000000000000000000000000000000000',
};

const SCREENS = [
  { id: 'intro',        label: 'เตรียมตัวสมัคร' },
  { id: 'pdpa',         label: 'ข้อมูลส่วนบุคคล' },
  { id: 'form',         label: '1. ข้อมูลทั่วไป' },
  { id: 'guide',        label: '2. มัคคุเทศก์' },
  { id: 'languages',    label: 'เลือกภาษา' },
  { id: 'areas',        label: 'เลือกพื้นที่' },
  { id: 'pending',      label: 'รอ Approve' },
  { id: 'bottomsheet',  label: '⬆ BottomSheet' },
] as const;

type ScreenId = typeof SCREENS[number]['id'];

export const dynamic = 'force-dynamic';

// ─── BottomSheet Demo ──────────────────────────────────────

function BottomSheetDemo() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [singleOpen, setSingleOpen] = useState(false);
  const [multiOpen, setMultiOpen] = useState(false);

  const [selectedLang, setSelectedLang] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  return (
    <div className="min-h-dvh bg-[var(--color-background)] flex flex-col gap-4 p-6 pt-8">
      <h2 className="text-lg font-semibold text-[#1b3045]">AppBottomSheet</h2>

      {/* Generic bottom sheet */}
      <div className="bg-white rounded-xl p-4 flex flex-col gap-3">
        <p className="text-sm text-[#667085] font-medium">Generic Sheet</p>
        <AppButton size="m" fullWidth onClick={() => setSheetOpen(true)}>
          เปิด Bottom Sheet ทั่วไป
        </AppButton>
      </div>

      {/* Single select */}
      <div className="bg-white rounded-xl p-4 flex flex-col gap-3">
        <p className="text-sm text-[#667085] font-medium">Single Select</p>
        <p className="text-sm text-[#afb4bc]">
          เลือก: {selectedLang[0] ?? '—'}
        </p>
        <AppButton size="m" fullWidth onClick={() => setSingleOpen(true)}>
          เลือกภาษา (single)
        </AppButton>
      </div>

      {/* Multi select */}
      <div className="bg-white rounded-xl p-4 flex flex-col gap-3">
        <p className="text-sm text-[#667085] font-medium">Multi Select</p>
        <p className="text-sm text-[#afb4bc]">
          เลือก: {selectedAreas.length > 0 ? selectedAreas.join(', ') : '—'}
        </p>
        <AppButton size="m" fullWidth onClick={() => setMultiOpen(true)}>
          เลือกพื้นที่รับงาน (multi)
        </AppButton>
      </div>

      {/* ── Generic Sheet ── */}
      <AppBottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="ตัวอย่าง Bottom Sheet"
      >
        <div className="px-6 py-4 flex flex-col gap-3">
          <p className="text-base text-[#1b3045]">
            นี่คือ content ภายใน AppBottomSheet
          </p>
          <p className="text-sm text-[#667085]">
            สามารถใส่ content อะไรก็ได้ — form, list, map, etc.
          </p>
          <div className="flex gap-3 pt-4 pb-4">
            <AppButton
              hierarchy="error"
              size="m"
              fullWidth
              onClick={() => setSheetOpen(false)}
            >
              ยกเลิก
            </AppButton>
            <AppButton size="m" fullWidth onClick={() => setSheetOpen(false)}>
              ตกลง
            </AppButton>
          </div>
        </div>
      </AppBottomSheet>

      {/* ── Single Select ── */}
      <AppBottomSheetSelect
        open={singleOpen}
        onClose={() => setSingleOpen(false)}
        title="เลือกภาษา"
        options={LANGUAGE_OPTIONS}
        value={selectedLang[0]}
        multiple={false}
        onConfirm={(vals) => setSelectedLang(vals)}
      />

      {/* ── Multi Select ── */}
      <AppBottomSheetSelect
        open={multiOpen}
        onClose={() => setMultiOpen(false)}
        title="เลือกพื้นที่รับงาน"
        options={WORK_AREA_OPTIONS}
        value={selectedAreas}
        multiple={true}
        onConfirm={(vals) => setSelectedAreas(vals)}
      />
    </div>
  );
}

// ─── Dev Page ─────────────────────────────────────────────

function DevPageContent() {
  const [screen, setScreen] = useState<ScreenId>('intro');

  return (
    <div className="min-h-dvh bg-gray-100">
      {/* Dev toolbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur text-white px-4 py-2 flex items-center gap-2 text-xs flex-wrap">
        <span className="font-mono text-yellow-400 mr-2">DEV</span>
        {SCREENS.map((s) => (
          <button
            key={s.id}
            onClick={() => setScreen(s.id)}
            className={[
              'px-3 py-1 rounded-full transition',
              screen === s.id
                ? 'bg-white text-black font-semibold'
                : 'bg-white/10 hover:bg-white/20',
            ].join(' ')}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Phone frame */}
      <div className="flex items-start justify-center pt-14 pb-8 px-4">
        <div className="w-[390px] min-h-dvh bg-white shadow-2xl rounded-3xl overflow-hidden mt-2">
          {screen === 'intro'       && <RegisterIntroScreen lineProfile={MOCK_LINE_PROFILE} />}
          {screen === 'pdpa'        && <RegisterPdpaScreen />}
          {screen === 'form'        && <RegisterFormScreen lineProfile={MOCK_LINE_PROFILE} />}
          {screen === 'guide'       && <RegisterGuideInfoScreen />}
          {screen === 'languages'   && (
            <ChooseItemsScreen
              title="เลือกภาษา"
              subtitle="เพิ่มสูงสุดได้ 5 ภาษา"
              fieldLabel="ภาษา"
              addLabel="เพิ่มภาษา"
              options={LANGUAGE_OPTIONS}
              initialItems={[]}
              maxItems={5}
              onConfirm={(items) => { console.log('Selected languages:', items); setScreen('guide'); }}
              onBack={() => setScreen('guide')}
            />
          )}
          {screen === 'areas'       && (
            <ChooseAreaScreen
              areas={WORK_AREA_OPTIONS.map((o) => o.label)}
              initialSelected={[]}
              onConfirm={(items) => { console.log('Selected areas:', items); setScreen('guide'); }}
              onBack={() => setScreen('guide')}
            />
          )}
          {screen === 'pending'     && <RegisterPendingScreen />}
          {screen === 'bottomsheet' && <BottomSheetDemo />}
        </div>
      </div>
    </div>
  );
}

export default function DevPage() {
  const allowed =
    process.env.NODE_ENV !== 'production' ||
    process.env.NEXT_PUBLIC_DEV_PAGE === 'true';

  if (!allowed) {
    return <div className="p-8 text-center text-red-500">ไม่สามารถเข้าถึงหน้านี้ใน production ได้</div>;
  }
  return <DevPageContent />;
}
