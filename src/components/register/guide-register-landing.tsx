'use client';

import { useRouter } from 'next/navigation';
import type { LineProfile } from '@/types';

// ── Figma assets ─────────────────────────────────────────────────────────────
const logoSrc = 'https://www.figma.com/api/mcp/asset/8c5d6ed1-bf94-43ee-a80c-a7bd93b8ae33';
const heroSrc = 'https://www.figma.com/api/mcp/asset/dc376bc9-fd94-471f-bdda-0f8a10fdfd74';
const chatIconSrc = 'https://www.figma.com/api/mcp/asset/ce5ac826-361a-410a-9891-efa9da81eccb';
const adminIllustrationXmlid329 = 'https://www.figma.com/api/mcp/asset/bf83019f-2d31-4f7b-97c9-cb68ed4b9282';
const phoneIconSrc = 'https://www.figma.com/api/mcp/asset/cf296590-7fa8-4260-8156-35823673c020';
const lineIconSrc = 'https://www.figma.com/api/mcp/asset/62b23de3-f86b-4e29-b91a-1e56f6b69d62';

// ── Service icon assets ───────────────────────────────────────────────────────

function BriefcaseIcon() {
  return (
    <div className="overflow-clip relative size-[48px]">
      <div className="absolute inset-[8.01%_33.47%_72.76%_33.47%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/2c21102c-ed8e-4df1-a05b-1a0b3a054e0e" />
      </div>
      <div className="absolute bottom-[72.76%] left-[33.47%] right-1/2 top-[8.01%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/48bf4442-b90b-41b4-9f39-4cdc6d6435af" />
      </div>
      <div className="absolute inset-[20.78%_0_8.18%_0]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/fba215fc-376d-496a-81a6-e63a936f92f4" />
      </div>
      <div className="absolute inset-[20.03%_0_32.2%_0]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/2ce5dc24-a56d-436a-bfd2-489a5d7422b4" />
      </div>
      <div className="absolute bottom-[8.18%] left-0 right-1/2 top-[20.78%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/ac20d7a1-8e50-4f16-8548-031958862469" />
      </div>
      <div className="absolute bottom-[32.2%] left-0 right-1/2 top-[20.03%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/f30c410d-12d2-4a35-9264-a54381401c1a" />
      </div>
      <div className="absolute inset-[54.47%_41.72%_21%_41.72%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/4fb83986-d99f-409c-9472-6634eb9541dc" />
      </div>
      <div className="absolute bottom-[21%] left-[41.72%] right-1/2 top-[54.47%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/94f66721-eae8-4d2c-b8b2-c2c1b1802310" />
      </div>
    </div>
  );
}

function ContractIcon() {
  return (
    <div className="overflow-clip relative size-[48px]">
      <div className="absolute inset-[0_10.9%_22.83%_30.26%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/2a7a3825-4781-443b-8b13-43d1eb194c13" />
      </div>
      <div className="absolute inset-[11.89%_20.92%_10.94%_20.23%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/3154a61b-fe5f-4782-a61d-c9aa4b1202b1" />
      </div>
      <div className="absolute inset-[22.83%_30.22%_0_10.94%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/d63e0086-72c7-4792-acc4-e98ae6ab053f" />
      </div>
      <div className="absolute inset-[22.83%_59.64%_0_10.94%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/db1eb832-6ab2-489e-9f15-884550d899fe" />
      </div>
      <div className="absolute inset-[33.03%_38.08%_6.54%_18.8%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/1d13ffaa-0eb2-4e8b-8238-1a97b65654bd" />
      </div>
      <div className="absolute inset-[33.03%_59.64%_60.75%_20.16%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/24ac80c6-ae2d-45a8-b4f0-b23cc5002441" />
      </div>
      <div className="absolute inset-[45.07%_59.64%_48.71%_20.16%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/7fc1ad60-7270-4898-9128-17512ba778df" />
      </div>
      <div className="absolute inset-[57.1%_59.64%_36.67%_20.16%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/d0791376-9413-4bbc-9a69-c270f3f27cac" />
      </div>
      <div className="absolute inset-[69.14%_59.64%_24.64%_20.16%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/cff4dd24-f342-497b-8bc4-8e63751a15f3" />
      </div>
      <div className="absolute inset-[79.36%_59.64%_6.54%_18.8%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/e90671dc-0ccd-455e-a8e0-ea8df2facf85" />
      </div>
    </div>
  );
}

function TaxesIcon() {
  return (
    <div className="overflow-clip relative size-[48px]">
      <div className="absolute inset-[0_0_0_27.54%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/63026b9e-5e31-4d33-93e3-086b9adbdd47" />
      </div>
      <div className="absolute inset-[11.72%_31.45%_82.42%_39.26%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/b2b47e84-dfd1-4683-882b-12ea912aa78d" />
      </div>
      <div className="absolute inset-[11.72%_31.45%_82.42%_63.67%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/25c8946b-309e-4642-8aa9-3d7f6418654b" />
      </div>
      <div className="absolute inset-[25.78%_47.07%_0_0.2%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/2f238ce0-d2fb-4459-9463-d5eb88c66b9d" />
      </div>
    </div>
  );
}

function MoneyBagIcon() {
  return (
    <div className="overflow-clip relative size-[48px]">
      <div className="absolute inset-[29.49%_0_9.96%_31.65%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/d3056fca-4617-4c77-b2ee-cbc877255323" />
      </div>
      <div className="absolute inset-[29.49%_0_9.96%_65.82%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/c7b8fe8b-f650-4d60-995b-8a84f5fef44d" />
      </div>
      <div className="absolute inset-[2.15%_13.67%_76.37%_45.31%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/abbb66ed-ca24-4dbc-a1f8-b408195b09de" />
      </div>
      <div className="absolute inset-[2.15%_13.67%_76.37%_65.82%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/54630da3-1100-4e1b-83fc-8e38f5419f24" />
      </div>
      <div className="absolute inset-[84.18%_51.17%_2.15%_7.81%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/e049e34c-e818-40e8-9168-1894ae746506" />
      </div>
      <div className="absolute inset-[84.18%_51.17%_2.15%_28.32%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/241cc9a5-e90f-402c-ae42-615c910fd226" />
      </div>
      <div className="absolute inset-[70.51%_58.98%_15.82%_0]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/3ac7f9c5-3c88-411e-b1bf-85765a91def6" />
      </div>
      <div className="absolute inset-[70.51%_58.98%_15.82%_20.51%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/2b2266cd-d545-4b51-9a26-ce9e40d96d3d" />
      </div>
      <div className="absolute inset-[20.7%_15.62%_67.58%_47.27%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/84c33fb1-c6e3-4ff9-af52-2f10ecec7119" />
      </div>
      <div className="absolute inset-[20.7%_15.62%_67.58%_65.82%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/a0d77fe3-803a-4433-ab71-b84c3b83ae47" />
      </div>
    </div>
  );
}

function CalendarIcon() {
  return (
    <div className="overflow-clip relative size-[48px]">
      <div className="absolute inset-[11.72%_0.2%_58.59%_0.2%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/3f31a4c5-f864-4a70-a0d9-c5cb8850b573" />
      </div>
      <div className="absolute inset-[38.48%_0.2%_0_0.2%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/68a5c2f2-b34f-4f27-a59b-c1b19b72fe67" />
      </div>
      <div className="absolute bottom-0 left-1/2 right-[0.2%] top-[38.48%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/65f5d07c-4c42-4d2d-9afe-54a4b65ac927" />
      </div>
      <div className="absolute inset-[50.92%_53.13%_34.93%_32.72%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/7b8b463a-1ecc-4085-9240-79d64aa24a4a" />
      </div>
      <div className="absolute inset-[73.21%_53.13%_12.64%_32.72%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/69f71850-1aa8-4feb-8547-f16570fd1106" />
      </div>
      <div className="absolute inset-[50.92%_12.32%_12.64%_53.13%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/1e2bb369-c5b4-499e-af61-f0abe9b37695" />
      </div>
      <div className="absolute inset-[50.92%_73.54%_34.93%_12.32%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/bf83019f-2d31-4f7b-97c9-cb68ed4b9282" />
      </div>
      <div className="absolute inset-[73.21%_73.54%_12.64%_12.32%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/f2f78097-5efc-4e11-9667-18bf5126b8f0" />
      </div>
    </div>
  );
}

function RouteIcon() {
  return (
    <div className="overflow-clip relative size-[48px]">
      <div className="absolute inset-[6.07%_0_51.35%_68.13%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/b56ace9a-a5d2-459f-97db-b868a68ec065" />
      </div>
      <div className="absolute inset-[6.07%_15.88%_51.35%_68.13%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/944eeca5-5f3a-451f-b398-88eb6eb50975" />
      </div>
      <div className="absolute inset-[87.22%_65.9%_6.07%_27.39%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/b57a9e9f-b00a-4fd3-b7a3-e678fc0026dc" />
      </div>
      <div className="absolute inset-[44.02%_6.6%_6.13%_61.66%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/97c99765-3de6-4613-a59e-1cff00d16bd9" />
      </div>
      <div className="absolute inset-[45.55%_37.7%_6.08%_36.38%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/7d036ca2-371f-442d-b0d5-d56badffbecf" />
      </div>
      <div className="absolute inset-[62.53%_6.2%_23.57%_81.99%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/8fa2145e-dea8-4c96-83ec-5734af05a592" />
      </div>
      <div className="absolute inset-[53.46%_38.94%_6.1%_45.36%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/dbd86ded-df1a-4be7-946b-f68af7cddd8d" />
      </div>
      <div className="absolute inset-[27.03%_55.42%_13.41%_0]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/63c29900-e9a6-41b8-a0db-60fb3c4e1127" />
      </div>
      <div className="absolute inset-[27.03%_77.63%_13.41%_0]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="https://www.figma.com/api/mcp/asset/9a5a8426-743d-4702-9d45-a09822979c01" />
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

type Props = { lineProfile: LineProfile };

export function GuideRegisterLanding({ lineProfile }: Props) {
  const router = useRouter();
  const firstName = lineProfile.displayName.split(' ')[0] ?? lineProfile.displayName;

  return (
    <div className="min-h-dvh bg-[#f5f7fa] overflow-y-auto">

      {/* ── Nav ── */}
      <div className="bg-gradient-to-r from-[#258ad8] to-[#85b7fe] px-6 py-4 flex items-center">
        <img src={logoSrc} className="w-8 h-8 shrink-0" alt="One Asia" />
        <div className="flex-1 flex justify-end">
          <button className="bg-[#f0f9ff] border border-[#d1d4da] flex items-center gap-1 px-4 py-1.5 rounded-lg">
            <img src={chatIconSrc} className="w-4 h-4" alt="" />
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
            onClick={() => router.push('/register/pdpa')}
            className="bg-[#026aa2] text-white flex items-center justify-center gap-2 h-12 px-3 rounded-lg font-medium text-base shadow-[0px_8px_8px_rgba(0,0,0,0.08)] w-full"
          >
            สมัครเป็นไกด์
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
        <div className="absolute left-2 bottom-0 w-[96px] h-full">
          <img src={adminIllustrationXmlid329} alt="" className="absolute block inset-0 max-w-none size-full object-contain object-bottom" />
        </div>
        <div className="absolute left-[119px] top-4 flex flex-col gap-2">
          <div className="text-[#f9fafb]">
            <p className="text-sm font-semibold leading-[22px]">ติดต่อแอดมิน One Asia</p>
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
