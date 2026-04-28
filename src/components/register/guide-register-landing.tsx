'use client';

import { useRouter } from 'next/navigation';
import {
  BriefcaseIcon,
  ContractIcon,
  TaxesIcon,
  MoneyBagIcon,
  CalendarIcon,
  RouteIcon,
} from '@/components/icons/service-icons';

import {
  AdminIllustration,
  FacebookIcon,
  LineIcon,
} from '@/components/icons/contact-icons';

// ── Figma assets (images only — illustrations that cannot be SVG) ─────────────
const logoSrc = 'https://www.figma.com/api/mcp/asset/8c5d6ed1-bf94-43ee-a80c-a7bd93b8ae33';
const heroSrc = 'https://www.figma.com/api/mcp/asset/dc376bc9-fd94-471f-bdda-0f8a10fdfd74';

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
        {badge && (
          <div className="flex flex-col items-end justify-center h-[17px] w-full">
            <span className="bg-[#f04438] text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full leading-none">
              {badge}
            </span>
          </div>
        )}
        {!badge && <div className="h-[17px]" />}
        <div className="bg-[#f5fbff] flex items-center justify-center p-2 rounded-full size-[80px]">
          {icon}
        </div>
      </div>
      <p className="font-medium text-[#52535a] text-base text-center w-full leading-6">{label}</p>
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

type Props = {
  /** ชื่อที่แสดงในคำทักทาย */
  displayName: string;
  /** register = ยังไม่สมัคร, pending = สมัครแล้วรอ admin อนุมัติ */
  mode: 'register' | 'pending';
};

export function GuideRegisterLanding({ displayName, mode }: Props) {
  const router = useRouter();
  const firstName = displayName.split(' ')[0] ?? displayName;

  return (
    <div className="min-h-dvh bg-[#f5f7fa] overflow-y-auto">

      {/* ── Nav ── */}
      <div className="bg-gradient-to-r from-[#258ad8] to-[#85b7fe] px-6 py-4 flex items-center">
        <img src={logoSrc} className="w-8 h-8 shrink-0" alt="One Asia" />
        <div className="flex-1 flex justify-end">
          <button className="bg-[#f0f9ff] border border-[#d1d4da] flex items-center gap-1 px-4 py-1.5 rounded-lg">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <path d="M14 2H2C1.45 2 1 2.45 1 3V11C1 11.55 1.45 12 2 12H5V15L9 12H14C14.55 12 15 11.55 15 11V3C15 2.45 14.55 2 14 2Z" fill="#0284c7" />
              <rect x="4" y="6" width="8" height="1.5" rx="0.75" fill="white" opacity="0.9" />
              <rect x="4" y="8.5" width="5" height="1.5" rx="0.75" fill="white" opacity="0.7" />
            </svg>
            <span className="text-xs font-medium text-[#2f4b67]">ติดต่อเรา</span>
          </button>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="relative h-[200px] overflow-hidden">
        <img src={heroSrc} alt="" className="absolute inset-0 w-full h-full object-cover object-left" />
        <div className="absolute right-0 top-7 w-[188px] pr-4 flex flex-col gap-6">
          <div className="text-white">
            <div className="flex gap-2 text-base font-semibold leading-6">
              <span>สวัสดี :</span>
              <span className="flex-1 min-w-0 truncate">{firstName}</span>
            </div>
            <p className="text-xs leading-[18px] mt-1">
              สมัครเป็นไกด์กับ One Asia<br />
              เพื่อเริ่มรับงานกับเรา
            </p>
          </div>
          <button
            onClick={() =>
              mode === 'pending'
                ? router.push('/register/status')
                : router.push('/register/pdpa')
            }
            className="bg-[#026aa2] text-white flex items-center justify-center gap-2 h-12 px-3 rounded-lg font-medium text-base shadow-[0px_8px_8px_rgba(0,0,0,0.08)] w-full"
          >
            {mode === 'pending' ? 'ติดตามสถานะ' : 'สมัครเป็นไกด์'}
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0">
              <path d="M9 15L13 11L9 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Services ── */}
      <div className="px-8 pt-6 pb-4 flex flex-col gap-4 bg-white mx-0">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-[#0ba5ec] rounded-lg shrink-0" />
          <p className="text-[#2f4b67] font-semibold text-base leading-6">บริการทั้งหมด</p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <ServiceCard icon={<BriefcaseIcon />} label="งานของฉัน" badge="1" />
          <ServiceCard icon={<ContractIcon />} label="จัดงานไกด์" badge="99+" />
          <ServiceCard icon={<TaxesIcon />} label="รายการคืนเงิน" />
          <ServiceCard icon={<MoneyBagIcon />} label="รายรับ" />
          <ServiceCard icon={<CalendarIcon />} label="ปฏิทิน" />
          <ServiceCard icon={<RouteIcon />} label="โปรแกรมทัวร์" />
        </div>
      </div>

      {/* ── Admin contact banner ── */}
      <div className="mx-8 my-6 rounded-2xl bg-gradient-to-r from-[#0f6bac] to-[#258bd6] relative overflow-hidden h-[101px]">
        <div className="absolute left-2 bottom-0 w-[96px] h-full flex items-end">
          <AdminIllustration />
        </div>
        <div className="absolute left-[119px] top-4 flex flex-col gap-2">
          <div className="text-[#f9fafb]">
            <p className="text-sm font-semibold leading-[22px]">ติดต่อแอดมิน One Asia</p>
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
