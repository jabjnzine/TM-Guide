'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useTourList } from '@/hooks/use-tour-list';
import { TourCard } from '@/components/tour/tour-card';

// ── Figma assets ──────────────────────────────────────────────────────────────
const logoSrc = 'https://www.figma.com/api/mcp/asset/078e7247-5ed5-4354-b0e3-cf589e8014d9';
const phoneIconSrc = 'https://www.figma.com/api/mcp/asset/4c90b692-9816-48a0-920a-39908be10c96';
const lineIconSrc = 'https://www.figma.com/api/mcp/asset/1b60e70f-6bd9-427b-92c8-f63cf52ad6bd';
const scanIconSrc = 'https://www.figma.com/api/mcp/asset/5d16ee0a-1d3e-4b87-8f95-21c51b79f769';
const penIconSrc = 'https://www.figma.com/api/mcp/asset/a7452fef-2e43-4f47-85d9-5bb6ac23ba0a';
const chevronRightSrc = 'https://www.figma.com/api/mcp/asset/0b7781c2-5ba9-4f66-94ce-def1902ceeae';
const emptyStateSrc = 'https://www.figma.com/api/mcp/asset/f53a4c0c-4558-4c9a-99d3-6cb059158123';
const adminIllustrationSrc = 'https://www.figma.com/api/mcp/asset/e5db521a-6aa2-4f54-beb9-0cf823e76bad';

// ── Service icons (from Design 2) ─────────────────────────────────────────────

function BriefcaseIcon() {
  return (
    <div className="overflow-clip relative size-[48px]">
      <div className="absolute inset-[8.01%_33.47%_72.76%_33.47%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/ae69c141-8b0b-4854-9ef5-cb2258c38185" />
      </div>
      <div className="absolute bottom-[72.76%] left-[33.47%] right-1/2 top-[8.01%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/17edf093-6290-4ddc-b231-d57b59b9d1d3" />
      </div>
      <div className="absolute inset-[20.78%_0_8.18%_0]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/17d71589-38ad-4986-81f6-d7be68dad839" />
      </div>
      <div className="absolute inset-[20.03%_0_32.2%_0]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/d147671b-7f5d-44da-8bc3-e2b65b00090a" />
      </div>
      <div className="absolute bottom-[8.18%] left-0 right-1/2 top-[20.78%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/3a63863e-5573-47ea-a80f-b54fd0070e29" />
      </div>
      <div className="absolute bottom-[32.2%] left-0 right-1/2 top-[20.03%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/1fa5ab66-99ae-41a7-86b4-bb569d14f698" />
      </div>
      <div className="absolute inset-[54.47%_41.72%_21%_41.72%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/4930fed4-5815-4f30-9ecd-c8fd897aa037" />
      </div>
      <div className="absolute bottom-[21%] left-[41.72%] right-1/2 top-[54.47%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/d6200bb5-f7a7-43a4-a785-a4c504c6ad4a" />
      </div>
    </div>
  );
}

function ContractIcon() {
  return (
    <div className="overflow-clip relative size-[48px]">
      <div className="absolute inset-[0_10.9%_22.83%_30.26%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/6f8c9410-38cd-4e91-9159-5b1a7abf72e2" />
      </div>
      <div className="absolute inset-[11.89%_20.92%_10.94%_20.23%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/dfcbd8c8-44b6-4010-991f-7efb36b01ff1" />
      </div>
      <div className="absolute inset-[22.83%_30.22%_0_10.94%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/ce614912-1e01-4f34-92f4-2c744e1af4d8" />
      </div>
      <div className="absolute inset-[22.83%_59.64%_0_10.94%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/bd5cf60d-7a63-4a6a-a906-287e86f9f970" />
      </div>
      <div className="absolute inset-[33.03%_38.08%_6.54%_18.8%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/e3412098-7423-43e4-9115-554f8d4a12db" />
      </div>
      <div className="absolute inset-[33.03%_59.64%_60.75%_20.16%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/9fb03303-f3cb-49d4-9f34-e00a5cb60da1" />
      </div>
      <div className="absolute inset-[45.07%_59.64%_48.71%_20.16%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/64248855-601a-4ad9-8954-f5fc3953b08e" />
      </div>
      <div className="absolute inset-[57.1%_59.64%_36.67%_20.16%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/9db7e9f4-3180-4f27-8e4a-b99dc54ccfb5" />
      </div>
      <div className="absolute inset-[69.14%_59.64%_24.64%_20.16%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/cf03538f-08e9-4489-bcdf-cdbda338440c" />
      </div>
      <div className="absolute inset-[79.36%_59.64%_6.54%_18.8%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/14cd8642-13f2-47b4-9d71-921ec8e64de0" />
      </div>
    </div>
  );
}

function TaxesIcon() {
  return (
    <div className="overflow-clip relative size-[48px]">
      <div className="absolute inset-[0_0_0_27.54%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/6c503e60-b038-4572-8615-a70e8f9e5222" />
      </div>
      <div className="absolute inset-[11.72%_31.45%_82.42%_39.26%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/2c2927a7-4b8e-4010-9450-dd75380cc33e" />
      </div>
      <div className="absolute inset-[11.72%_31.45%_82.42%_63.67%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/58030eae-1f08-4468-8051-14f760900a25" />
      </div>
      <div className="absolute inset-[25.78%_47.07%_0_0.2%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/68e8b57c-ab57-4e92-9809-6e77cc7e33fb" />
      </div>
    </div>
  );
}

function MoneyBagIcon() {
  return (
    <div className="overflow-clip relative size-[48px]">
      <div className="absolute inset-[29.49%_0_9.96%_31.65%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/417f0835-f08e-428f-b3ac-77b9e801171d" />
      </div>
      <div className="absolute inset-[29.49%_0_9.96%_65.82%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/d69e281a-f299-430e-a863-99824aa4f455" />
      </div>
      <div className="absolute inset-[2.15%_13.67%_76.37%_45.31%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/5effa48f-6033-454a-9869-be09005fd7df" />
      </div>
      <div className="absolute inset-[2.15%_13.67%_76.37%_65.82%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/13cc8660-dc84-4152-bc30-ebd77673f6e7" />
      </div>
      <div className="absolute inset-[84.18%_51.17%_2.15%_7.81%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/3b02706d-81c4-4f06-ae6b-e4f66fa63584" />
      </div>
      <div className="absolute inset-[84.18%_51.17%_2.15%_28.32%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/95f4e3e4-67dd-4d49-a09a-527ba8c7cef6" />
      </div>
      <div className="absolute inset-[70.51%_58.98%_15.82%_0]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/f8a9c71f-6fb1-4ab9-9448-fa0ca27ee5bf" />
      </div>
      <div className="absolute inset-[70.51%_58.98%_15.82%_20.51%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/84bb808c-82fb-4515-adb8-b91631d7edbe" />
      </div>
      <div className="absolute inset-[20.7%_15.62%_67.58%_47.27%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/04fe6568-fe7a-4cc1-af1e-059fd63bf70e" />
      </div>
      <div className="absolute inset-[20.7%_15.62%_67.58%_65.82%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/a5a7c3cb-8c06-4659-9c65-451a572894b4" />
      </div>
    </div>
  );
}

function RouteIcon() {
  return (
    <div className="overflow-clip relative size-[48px]">
      <div className="absolute inset-[6.07%_0_51.35%_68.13%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/b2844e38-e481-4e29-a065-fede3543676c" />
      </div>
      <div className="absolute inset-[6.07%_15.88%_51.35%_68.13%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/78161f05-9e83-42bc-81b0-d394baeed1f6" />
      </div>
      <div className="absolute inset-[87.22%_65.9%_6.07%_27.39%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/a4abeac0-1d11-4f31-a565-86066d67f4dd" />
      </div>
      <div className="absolute inset-[44.02%_6.6%_6.13%_61.66%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/e767411b-31b2-4845-87a6-846da6059620" />
      </div>
      <div className="absolute inset-[45.55%_37.7%_6.08%_36.38%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/2ce07df8-dd06-4c2b-aff0-6b1c9d4f7879" />
      </div>
      <div className="absolute inset-[62.53%_6.2%_23.57%_81.99%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/2103b0b4-93e9-451f-9853-a01a07652afc" />
      </div>
      <div className="absolute inset-[53.46%_38.94%_6.1%_45.36%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/fc58915a-b467-4225-af16-d563457b9963" />
      </div>
      <div className="absolute inset-[27.03%_55.42%_13.41%_0]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/9a868f43-d11a-4258-b255-e5488b281fd4" />
      </div>
      <div className="absolute inset-[27.03%_77.63%_13.41%_0]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/f444a5aa-249b-45f4-8287-02a55b0212b0" />
      </div>
    </div>
  );
}

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
    <div className="min-h-dvh bg-[#f5f7fa] overflow-y-auto pb-24">

      {/* ── Nav ── */}
      <div className="bg-gradient-to-r from-[#258ad8] to-[#85b7fe] px-6 py-4 flex items-center">
        <img src={logoSrc} className="w-8 h-8 shrink-0" alt="Tour System" />
        <div className="flex-1 flex justify-end gap-3 items-center">
          {/* Notification bell */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="white" />
            </svg>
          </div>
          {/* Profile picture */}
          {guide?.profile_image ? (
            <img
              src={guide.profile_image}
              alt={guide.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-white/40"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-white text-sm font-semibold">
              {firstName[0]}
            </div>
          )}
        </div>
      </div>

      {/* ── Blue section (greeting + actions + new jobs) ── */}
      <div className="bg-gradient-to-r from-[#258ad8] to-[#85b7fe] rounded-b-3xl px-8 pb-6 pt-2">
        {/* Greeting */}
        <div className="flex gap-2 text-white text-base leading-6 mb-6">
          <span className="font-normal">สวัสดี !</span>
          <span className="font-semibold">{firstName}</span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mb-6">
          <button className="bg-[#026aa2] flex flex-1 items-center justify-center gap-1 px-4 py-1.5 rounded-lg">
            <img src={scanIconSrc} alt="" className="w-5 h-5 shrink-0" />
            <span className="text-white text-xs font-medium">Scan Code</span>
          </button>
          <button className="border border-white flex items-center justify-center gap-1 px-4 py-1.5 rounded-lg w-[150px] shrink-0">
            <img src={penIconSrc} alt="" className="w-5 h-5 shrink-0" />
            <span className="text-white text-xs font-medium">Enter Code</span>
          </button>
        </div>

        {/* New jobs section */}
        <div className="flex flex-col gap-2">
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
              <img src={chevronRightSrc} alt="" className="w-6 h-6" />
            </button>
          </div>

          {isLoading ? (
            <div className="bg-white rounded-xl p-4 flex items-center justify-center h-20">
              <span className="inline-block w-5 h-5 border-2 border-[#026aa2] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : newTours.length === 0 ? (
            <div className="bg-white rounded-xl shadow-[0px_8px_8px_rgba(0,0,0,0.04)] flex flex-col items-center gap-4 py-4">
              <div className="relative w-[74px] h-[62px]">
                <img src={emptyStateSrc} alt="" className="w-full h-full object-contain" />
              </div>
              <p className="text-[#525a6a] text-xs text-center">ยังไม่มีงานใหม่เข้ามา</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {newTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          )}
        </div>
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
        <div className="absolute left-2 bottom-0 w-[96px] h-full">
          <img src={adminIllustrationSrc} alt="" className="absolute block inset-0 max-w-none size-full object-contain object-bottom" />
        </div>
        <div className="absolute left-[119px] top-4 flex flex-col gap-2">
          <div className="text-[#f9fafb]">
            <p className="text-sm font-semibold leading-[22px]">ติดต่อแอดมิน Tour System</p>
            <p className="text-xs leading-[18px]">เราพร้อมให้ความช่วยเหลือไกด์ทุกคน</p>
          </div>
          <div className="flex gap-2 items-center">
            <img src={phoneIconSrc} alt="โทรศัพท์" className="w-5 h-5" />
            <img src={lineIconSrc} alt="LINE" className="w-5 h-5" />
          </div>
        </div>
      </div>

    </div>
  );
}
