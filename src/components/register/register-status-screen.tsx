'use client';

import { useRouter } from 'next/navigation';
import type { GuideApproveStatus } from '@/types';

// ── Status badge ──────────────────────────────────────────────────────────────

type StatusBadgeProps = { status: GuideApproveStatus | null };

function StatusBadge({ status }: StatusBadgeProps) {
  if (status === 'approve') {
    return (
      <span className="bg-[#ecfdf3] text-[#12b76a] text-xs px-2 py-0.5 rounded-full leading-[18px]">
        ได้รับการอนุมัติ
      </span>
    );
  }
  if (status === 'reject') {
    return (
      <span className="bg-[#fef3f2] text-[#f04438] text-xs px-2 py-0.5 rounded-full leading-[18px]">
        มีข้อมูลต้องแก้ไข
      </span>
    );
  }
  return (
    <span className="bg-[#fffaeb] text-[#f79009] text-xs px-2 py-0.5 rounded-full leading-[18px]">
      รอการอนุมัติ
    </span>
  );
}

// ── Section icons (inline SVG) ────────────────────────────────────────────────

function ProfileIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="48" height="48" rx="12" fill="#e0f2fe" />
      <circle cx="28" cy="22" r="8" fill="#38bdf8" />
      <circle cx="28" cy="22" r="5" fill="#fff" />
      <path d="M14 44c0-7.7 6.3-14 14-14s14 6.3 14 14" fill="#0284c7" />
      <path d="M14 44c0-7.7 6.3-14 14-14s14 6.3 14 14" fill="#38bdf8" opacity="0.5" />
    </svg>
  );
}

function LicenseIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="48" height="48" rx="12" fill="#fef9c3" />
      <rect x="12" y="18" width="32" height="22" rx="4" fill="#fbbf24" />
      <rect x="12" y="18" width="32" height="8" rx="4" fill="#f59e0b" />
      <rect x="12" y="22" width="32" height="4" fill="#f59e0b" />
      <circle cx="21" cy="32" r="4" fill="#fff" opacity="0.9" />
      <rect x="28" y="30" width="12" height="2" rx="1" fill="#fff" opacity="0.8" />
      <rect x="28" y="33" width="8" height="2" rx="1" fill="#fff" opacity="0.6" />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="48" height="48" rx="12" fill="#dcfce7" />
      <rect x="12" y="16" width="24" height="30" rx="3" fill="#86efac" />
      <rect x="12" y="16" width="24" height="8" rx="3" fill="#22c55e" />
      <rect x="12" y="20" width="24" height="4" fill="#22c55e" />
      <rect x="16" y="28" width="10" height="2" rx="1" fill="#fff" opacity="0.8" />
      <rect x="16" y="32" width="8" height="2" rx="1" fill="#fff" opacity="0.6" />
      <circle cx="36" cy="36" r="10" fill="#fbbf24" />
      <path
        d="M36 30v12M34 31.5h3.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5H34M34 34.5H38"
        stroke="#92400e"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Status row ────────────────────────────────────────────────────────────────

type StatusRowProps = {
  index: number;
  label: string;
  status: GuideApproveStatus | null;
  icon: React.ReactNode;
  onClick?: () => void;
};

function StatusRow({ index, label, status, icon, onClick }: StatusRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex gap-5 items-center w-full text-left"
    >
      <div className="shrink-0">{icon}</div>
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <p className="text-base text-black leading-6">
          <span className="mr-1">{index}.</span>
          {label}
        </p>
        <div className="pl-2">
          <StatusBadge status={status} />
        </div>
      </div>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0 text-[#afb4bc]">
        <path d="M8.25 16.5L13.75 11L8.25 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

type Props = {
  statusGeneral: GuideApproveStatus | null;
  statusLicense: GuideApproveStatus | null;
  statusBank: GuideApproveStatus | null;
};

export function RegisterStatusScreen({ statusGeneral, statusLicense, statusBank }: Props) {
  const router = useRouter();

  return (
    <div className="min-h-dvh bg-[#f5f7fa] flex flex-col">

      {/* ── Navbar ── */}
      <div className="bg-white flex items-center h-14 px-4 sticky top-0 z-10 border-b border-[#f2f4f7]">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#1b3045" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="flex-1 text-center text-[#1b3045] text-base font-semibold leading-6 pr-9">
          ติดตามสถานะการสมัคร
        </p>
      </div>

      {/* ── Card ── */}
      <div className="flex-1 flex items-start justify-center pt-6 px-6 pb-10">
        <div className="w-full bg-white rounded-2xl shadow-[0px_8px_8px_rgba(0,0,0,0.04)] px-6 py-10 flex flex-col gap-8">

          {/* Title */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-[#1b3045] text-lg font-semibold leading-[26px] text-center">
              สถานะการสมัคร
            </p>
            <div className="w-[100px] h-1 bg-[#026aa2] rounded-full" />
          </div>

          {/* Rows */}
          <StatusRow
            index={1}
            label="ข้อมูลทั่วไป"
            status={statusGeneral}
            icon={<ProfileIcon />}
          />
          <StatusRow
            index={2}
            label="ข้อมูลมัคคุเทศก์"
            status={statusLicense}
            icon={<LicenseIcon />}
          />
          <StatusRow
            index={3}
            label="ข้อมูลบัญชีธนาคาร"
            status={statusBank}
            icon={<BankIcon />}
          />
        </div>
      </div>

    </div>
  );
}
