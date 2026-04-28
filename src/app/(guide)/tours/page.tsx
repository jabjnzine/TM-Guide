'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useTourList } from '@/hooks/use-tour-list';
import { TourCard } from '@/components/tour/tour-card';
import {
  BriefcaseIcon,
  ContractIcon,
  TaxesIcon,
  MoneyBagIcon,
  RouteIcon,
} from '@/components/icons/service-icons';
import {
  AdminIllustration,
  FacebookIcon,
  LineIcon,
} from '@/components/icons/contact-icons';
import { EmptyJobsIllustration } from '@/components/icons/empty-state-icons';

// ── Figma assets (images only — illustrations that cannot be SVG) ─────────────
const logoSrc = 'https://www.figma.com/api/mcp/asset/b25dfc44-5f72-4eb8-81fa-5e62398a7061';

// ── ServiceCard ───────────────────────────────────────────────────────────────

type ServiceCardProps = {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  onClick?: () => void;
};

function ServiceCard({ icon, label, badge, onClick }: ServiceCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white flex flex-col gap-2 items-center justify-center overflow-clip pb-4 pt-2 px-2 rounded-2xl shadow-[0px_8px_16px_0px_rgba(0,0,0,0.04)] w-full"
    >
      <div className="flex flex-col h-[97px] items-center justify-end w-full">
        {badge ? (
          <div className="flex flex-col items-end justify-center h-[17px] w-full">
            <span className="bg-[#f04438] text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full leading-none">
              {badge}
            </span>
          </div>
        ) : (
          <div className="h-[17px]" />
        )}
        <div className="bg-[#f5fbff] flex items-center justify-center p-2 rounded-full size-[80px]">
          {icon}
        </div>
      </div>
      <p className="font-medium text-[#52535a] text-base text-center w-full leading-6">{label}</p>
    </button>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ToursPage() {
  const router = useRouter();
  const { guide } = useAuthStore();
  const { tours, isLoading } = useTourList();

  const firstName = guide?.nickname ?? guide?.name?.split(' ')[0] ?? 'ไกด์';
  const newTours = tours.slice(0, 3);

  return (
    <div className="min-h-dvh bg-[#f5f7fa] overflow-y-auto pb-8">

      {/* ── Nav ── */}
      <div className="bg-gradient-to-r from-[#258ad8] to-[#85b7fe] px-6 py-4 flex items-center">
        <img src={logoSrc} className="w-8 h-8 shrink-0 object-contain" alt="Tour System" />
        <div className="flex-1 flex justify-end gap-3 items-center">
          {/* Notification bell with badge */}
          <button className="relative w-8 h-8 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 19H19V18L17 16V11C17 7.93 15.37 5.36 12.5 4.68V4C12.5 3.17 11.83 2.5 11 2.5C10.17 2.5 9.5 3.17 9.5 4V4.68C6.64 5.36 5 7.92 5 11V16L3 18V19H5ZM11 22C12.1 22 13 21.1 13 20H9C9 21.1 9.9 22 11 22Z" fill="white" />
            </svg>
            {/* Red badge */}
            <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-[#f04438] rounded-full border-2 border-[#258ad8]" />
          </button>
          {/* Profile picture */}
          {guide?.image ? (
            <img
              src={guide.image}
              alt={guide.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-white/40"
            />
          ) : (
            <div className="w-8 h-8 rounded-full overflow-hidden bg-white/30 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="13" r="5" fill="white" fillOpacity="0.9" />
                <path d="M6 26C6 21.582 10.477 18 16 18C21.523 18 26 21.582 26 26" stroke="white" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* ── Blue section (greeting + actions + jobs header) ── */}
      <div className="bg-gradient-to-r from-[#258ad8] to-[#85b7fe] rounded-b-[24px] px-8 pt-2 pb-16">
        {/* Greeting */}
        <div className="flex gap-2 text-white text-base leading-6 mb-6">
          <span className="font-normal">สวัสดี !</span>
          <span className="font-semibold">{firstName}</span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mb-6">
          <button className="bg-[#026aa2] flex flex-1 items-center justify-center gap-1 px-4 py-1.5 rounded-lg">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
              <rect x="2" y="2" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
              <rect x="12" y="2" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
              <rect x="2" y="12" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
              <rect x="13" y="13" width="2" height="2" fill="white"/>
              <rect x="13" y="16" width="2" height="2" fill="white"/>
              <rect x="16" y="13" width="2" height="2" fill="white"/>
              <rect x="16" y="16" width="2" height="2" fill="white"/>
            </svg>
            <span className="text-white text-xs font-medium">Scan Code</span>
          </button>
          <button className="border border-white flex items-center justify-center gap-1 px-4 py-1.5 rounded-lg w-[150px] shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
              <path d="M14.5 2.5L17.5 5.5L7 16H4V13L14.5 2.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-white text-xs font-medium">Enter Code</span>
          </button>
        </div>

        {/* Jobs row header */}
        <div className="flex items-center">
          <div className="flex flex-1 items-center gap-2">
            <div className="w-1 h-6 bg-white rounded-lg shrink-0" />
            <p className="text-white font-semibold text-base leading-6">งานใหม่</p>
          </div>
          <button
            onClick={() => router.push('/tours/list')}
            className="flex items-center gap-1"
          >
            <span className="text-white text-xs font-medium">ดูทั้งหมด</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6 shrink-0">
              <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Job card — overlaps the bottom of the blue section ── */}
      <div className="mx-8 -mt-10">
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-[0px_8px_8px_rgba(0,0,0,0.04)] p-4 flex items-center justify-center h-20">
            <span className="inline-block w-5 h-5 border-2 border-[#026aa2] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : newTours.length === 0 ? (
          <div className="bg-white rounded-xl shadow-[0px_8px_8px_rgba(0,0,0,0.04)] flex flex-col items-center gap-4 py-4 px-[106px]">
            <EmptyJobsIllustration />
            <p className="text-[#525a6a] text-xs text-center whitespace-nowrap">ยังไม่มีงานใหม่เข้ามา</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {newTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}
      </div>

      {/* ── Services ── */}
      <div className="px-8 pt-6 pb-4 flex flex-col gap-4 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-[#0ba5ec] rounded-lg shrink-0" />
          <p className="text-[#2f4b67] font-semibold text-base leading-6">บริการทั้งหมด</p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <ServiceCard
            icon={<BriefcaseIcon />}
            label="งานของฉัน"
            badge="1"
            onClick={() => router.push('/tours/list')}
          />
          <ServiceCard icon={<ContractIcon />} label="จัดงานไกด์" badge="99+" />
          <ServiceCard icon={<TaxesIcon />} label="ค่าใช้จ่ายออกทัวร์" />
          <ServiceCard icon={<MoneyBagIcon />} label="รายรับ" />
        </div>

        {/* Extra: โปรแกรมทัวร์ */}
        <div className="grid grid-cols-2 gap-5">
          <ServiceCard icon={<RouteIcon />} label="โปรแกรมทัวร์" />
          <div />
        </div>
      </div>

      {/* ── Admin contact banner ── */}
      <div className="mx-8 my-6 rounded-2xl bg-gradient-to-r from-[#174266] to-[#045384] relative overflow-hidden h-[101px]">
        <div className="absolute left-2 bottom-0 w-[96px] h-full flex items-end">
          <AdminIllustration />
        </div>
        <div className="absolute left-[119px] top-4 flex flex-col gap-2">
          <div className="text-[#f9fafb]">
            <p className="text-sm font-semibold leading-[22px]">ติดต่อแอดมิน Tour System</p>
            <p className="text-xs leading-[18px]">เราพร้อมให้ความช่วยเหลือไกด์ทุกคน</p>
          </div>
          <div className="flex gap-2 items-center">
            <FacebookIcon />
            <LineIcon />
          </div>
        </div>
      </div>

    </div>
  );
}
