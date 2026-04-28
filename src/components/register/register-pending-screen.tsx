'use client';

import { useRouter } from 'next/navigation';

// ── Figma assets ──────────────────────────────────────────────────────────────
const illustrationSrc = 'https://www.figma.com/api/mcp/asset/e460c8cc-ea26-41b7-8487-e2a8847b29a6';

export function RegisterPendingScreen() {
  const router = useRouter();

  return (
    <div className="relative min-h-dvh bg-white flex flex-col items-center">

      {/* ── Illustration ── */}
      <div className="mt-[15%] w-[327px] aspect-[327/230] relative">
        <img
          src={illustrationSrc}
          alt="บันทึกข้อมูลสำเร็จ"
          className="w-full h-full object-contain"
        />
      </div>

      {/* ── Text ── */}
      <div className="mt-4 flex flex-col items-center gap-2 px-6">
        <h1 className="text-[#026aa2] text-xl font-semibold leading-[30px] whitespace-nowrap">
          บันทึกข้อมูลสำเร็จ
        </h1>
        <p className="text-[#525a6a] text-sm text-center leading-[22px]">
          คุณสามารถติดตามสถานะการสมัคร
          <br />
          เพื่อรอการอนุมัติได้แล้ว
        </p>
      </div>

      {/* ── Button ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[327px]">
        <button
          onClick={() => router.push('/register/status')}
          className="w-full h-12 bg-[#026aa2] rounded-lg flex items-center justify-center gap-2 shadow-[0px_8px_8px_rgba(0,0,0,0.08)]"
        >
          <span className="text-white text-base font-medium leading-6">
            ติดตามสถานะ
          </span>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0">
            <path
              d="M8.25 16.5L13.75 11L8.25 5.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

    </div>
  );
}
