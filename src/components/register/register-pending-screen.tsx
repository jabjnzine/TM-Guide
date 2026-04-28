'use client';

import { CheckCircle2 } from 'lucide-react';

export function RegisterPendingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-6 text-center bg-[var(--color-background)]">
      {/* Icon */}
      <div className="w-24 h-24 rounded-full bg-[var(--color-brand-blue-light)] flex items-center justify-center mb-6">
        <CheckCircle2 className="w-12 h-12 text-[var(--color-brand-blue)]" />
      </div>

      {/* Text */}
      <h1 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
        ส่งคำขอสมัครสำเร็จ!
      </h1>
      <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed max-w-xs">
        คำขอของคุณได้รับการบันทึกแล้ว
        <br />
        กรุณารอการอนุมัติจากแอดมิน
        <br />
        ระบบจะแจ้งเตือนผ่าน LINE เมื่อได้รับการอนุมัติ
      </p>

      {/* Status card */}
      <div className="mt-8 w-full max-w-xs bg-white rounded-2xl shadow-[var(--shadow-card)] p-5 space-y-3">
        <StatusRow label="สถานะ" value="รอการอนุมัติ" valueClass="text-amber-600 font-semibold" />
        <StatusRow label="ระยะเวลาดำเนินการ" value="1–3 วันทำการ" />
        <StatusRow label="การแจ้งเตือน" value="ผ่าน LINE" />
      </div>

      {/* Illustration */}
      <div className="mt-10 text-6xl animate-bounce">⏳</div>

      <p className="mt-6 text-xs text-[var(--color-text-muted)]">
        หากมีข้อสงสัยกรุณาติดต่อแอดมิน Tour System
      </p>
    </div>
  );
}

function StatusRow({
  label,
  value,
  valueClass = 'text-[var(--color-text-primary)]',
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-[var(--color-text-secondary)]">{label}</span>
      <span className={`text-sm ${valueClass}`}>{value}</span>
    </div>
  );
}
