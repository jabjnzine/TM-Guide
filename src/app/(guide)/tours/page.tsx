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

// ── Figma assets (images only — illustrations that cannot be SVG) ─────────────
const logoSrc = 'https://www.figma.com/api/mcp/asset/b25dfc44-5f72-4eb8-81fa-5e62398a7061';
const phoneIconSrc = 'https://www.figma.com/api/mcp/asset/4c90b692-9816-48a0-920a-39908be10c96';
const lineIconSrc = 'https://www.figma.com/api/mcp/asset/1b60e70f-6bd9-427b-92c8-f63cf52ad6bd';
const adminIllustrationSrc = 'https://www.figma.com/api/mcp/asset/e5db521a-6aa2-4f54-beb9-0cf823e76bad';

function EmptyJobsIllustration() {
  return (
    <svg width="77" height="77" viewBox="0 0 77 77" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_5260_4415" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="77" height="77">
        <path d="M77 0H0V77H77V0Z" fill="white"/>
      </mask>
      <g mask="url(#mask0_5260_4415)">
        <path d="M38.5002 69.0434C55.5105 69.0434 69.3002 55.2537 69.3002 38.2434C69.3002 21.233 55.5105 7.44336 38.5002 7.44336C21.4899 7.44336 7.7002 21.233 7.7002 38.2434C7.7002 55.2537 21.4899 69.0434 38.5002 69.0434Z" fill="url(#paint0_linear_5260_4415)"/>
        <path d="M26.9504 16.3127H50.7016C52.9697 16.3127 54.8082 18.1512 54.8082 20.4194V51.9969C54.8082 54.265 52.9697 56.1035 50.7016 56.1035H26.9504C24.6823 56.1035 22.8438 54.265 22.8438 51.9969V20.4194C22.8438 18.1512 24.6823 16.3127 26.9504 16.3127Z" fill="url(#paint1_linear_5260_4415)"/>
        <path d="M26.9247 21.446H37.2427C37.9372 21.446 38.5003 22.0092 38.5003 22.7037C38.5003 23.3982 37.9372 23.9614 37.2427 23.9614H26.9247C26.2301 23.9614 25.667 23.3982 25.667 22.7037C25.667 22.0092 26.2301 21.446 26.9247 21.446Z" fill="black"/>
        <path d="M26.9247 28.5813H50.076C50.7705 28.5813 51.3337 29.1444 51.3337 29.839C51.3337 30.5335 50.7705 31.0966 50.076 31.0966H26.9247C26.2301 31.0966 25.667 30.5335 25.667 29.839C25.667 29.1444 26.2301 28.5813 26.9247 28.5813Z" fill="#D5D5D5"/>
        <path d="M26.9247 35.7168H50.076C50.7705 35.7168 51.3337 36.2799 51.3337 36.9745C51.3337 37.669 50.7705 38.2321 50.076 38.2321H26.9247C26.2301 38.2321 25.667 37.669 25.667 36.9745C25.667 36.2799 26.2301 35.7168 26.9247 35.7168Z" fill="#D5D5D5"/>
        <path d="M26.9247 42.8521H50.076C50.7705 42.8521 51.3337 43.4152 51.3337 44.1097C51.3337 44.8043 50.7705 45.3674 50.076 45.3674H26.9247C26.2301 45.3674 25.667 44.8043 25.667 44.1097C25.667 43.4152 26.2301 42.8521 26.9247 42.8521Z" fill="#D5D5D5"/>
        <path d="M26.9247 49.9873H50.076C50.7705 49.9873 51.3337 50.5504 51.3337 51.245C51.3337 51.9395 50.7705 52.5026 50.076 52.5026H26.9247C26.2301 52.5026 25.667 51.9395 25.667 51.245C25.667 50.5504 26.2301 49.9873 26.9247 49.9873Z" fill="#D5D5D5"/>
        <path d="M73.9591 11.9155H58.5383C57.8199 11.9155 57.2373 12.5284 57.2373 13.2848V20.9127C57.2373 21.6689 57.8199 22.282 58.5383 22.282H73.9591C74.6778 22.282 75.2602 21.6689 75.2602 20.9127V13.2848C75.2602 12.5284 74.6778 11.9155 73.9591 11.9155Z" fill="white"/>
        <path d="M61.0869 18.7367C61.9375 18.7367 62.6269 18.0473 62.6269 17.1967C62.6269 16.3461 61.9375 15.6567 61.0869 15.6567C60.2363 15.6567 59.5469 16.3461 59.5469 17.1967C59.5469 18.0473 60.2363 18.7367 61.0869 18.7367Z" fill="#CCC6D9"/>
        <path d="M66.2207 15.6567H71.354C72.2046 15.6567 72.894 16.3461 72.894 17.1967C72.894 18.0473 72.2046 18.7367 71.354 18.7367H66.2207C65.3701 18.7367 64.6807 18.0473 64.6807 17.1967C64.6807 16.3461 65.3701 15.6567 66.2207 15.6567Z" fill="#D5D5D5"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M47.5124 57.8946C50.818 57.8946 53.8903 56.8946 56.4431 55.1806L66.8892 65.1526L70.6778 60.7572L60.5978 51.1348C62.4594 48.5147 63.554 45.3118 63.554 41.8529C63.554 32.9936 56.3717 25.8113 47.5124 25.8113C38.6527 25.8113 31.4707 32.9936 31.4707 41.8529C31.4707 50.7126 38.6527 57.8946 47.5124 57.8946ZM61.195 41.8529C61.195 49.3538 55.1143 55.4342 47.6138 55.4342C40.1132 55.4342 34.0327 49.3538 34.0327 41.8529C34.0327 34.3524 40.1132 28.2719 47.6138 28.2719C55.1143 28.2719 61.195 34.3524 61.195 41.8529Z" fill="#CCC6D9"/>
        <path d="M47.6124 55.6968C55.338 55.6968 61.6007 49.4914 61.6007 41.8368C61.6007 34.1822 55.338 27.9768 47.6124 27.9768C39.8867 27.9768 33.624 34.1822 33.624 41.8368C33.624 49.4914 39.8867 55.6968 47.6124 55.6968Z" fill="white" fillOpacity="0.3"/>
        <path d="M50.0309 41.8368L53.416 38.4647C53.7333 38.131 53.907 37.6877 53.9004 37.2288C53.894 36.7699 53.7076 36.3318 53.3811 36.0071C53.0547 35.6827 52.6137 35.4973 52.152 35.4909C51.6902 35.4845 51.2441 35.657 50.9084 35.9722L47.5158 39.3443L44.1306 35.9722C43.9676 35.801 43.7718 35.6639 43.5547 35.569C43.3375 35.4742 43.1034 35.4237 42.8663 35.4203C42.6291 35.417 42.3938 35.4609 42.174 35.5494C41.9543 35.6383 41.7547 35.7697 41.5868 35.9365C41.4192 36.1031 41.2867 36.3015 41.1977 36.5199C41.1084 36.7383 41.0642 36.9724 41.0676 37.2083C41.0709 37.4439 41.1217 37.6764 41.2172 37.8923C41.3124 38.1082 41.4505 38.3027 41.623 38.4647L45.0138 41.8368L41.623 45.2088C41.4505 45.3708 41.3124 45.5654 41.2172 45.7812C41.1217 45.9971 41.0709 46.2296 41.0676 46.4652C41.0642 46.7011 41.1084 46.9349 41.1977 47.1536C41.2867 47.372 41.4192 47.5704 41.5868 47.737C41.7547 47.9036 41.9543 48.0353 42.174 48.1241C42.3938 48.2126 42.6291 48.2565 42.8663 48.2532C43.1034 48.2498 43.3375 48.1993 43.5547 48.1046C43.7718 48.0096 43.9676 47.8725 44.1306 47.7013L47.5232 44.3292L50.9161 47.7013C51.2549 47.9978 51.6946 48.1549 52.1461 48.1402C52.5973 48.1259 53.0259 47.9408 53.3447 47.623C53.6635 47.305 53.8483 46.8785 53.8616 46.4301C53.875 45.9814 53.7156 45.5446 53.416 45.2088L50.0309 41.8368Z" fill="black"/>
        <path d="M66.8877 65.153L70.6763 60.7573L71.2469 61.3022C71.8005 61.8307 72.1319 62.5689 72.1683 63.3548C72.2048 64.1404 71.943 64.9092 71.441 65.4918C70.9387 66.0744 70.2372 66.4232 69.4905 66.4615C68.7439 66.4997 68.0134 66.2243 67.4598 65.6958L66.8892 65.1512L66.8877 65.153Z" fill="#E1DCEB"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M14.454 23.4009C14.4494 23.0349 14.4034 22.6655 14.3116 22.2939C13.9894 20.9895 12.5526 20.152 11.0234 19.9551C9.49495 19.7583 7.90516 20.2064 7.29249 21.3411C6.94214 21.9897 6.89389 22.5488 7.03711 23.0202C7.17956 23.4892 7.51785 23.8778 7.97702 24.1809C9.25728 25.0246 11.4995 25.1968 12.5226 24.8441C12.9956 24.6806 13.4579 24.4838 13.9078 24.2584C13.6506 25.7332 12.6917 27.1303 11.412 28.3892C8.63075 31.1255 4.31516 33.2025 1.96486 33.9661C1.83858 34.0071 1.76851 34.147 1.80778 34.2789C1.84705 34.4109 1.98129 34.4848 2.10757 34.4437C4.50432 33.665 8.9041 31.5439 11.7403 28.7534C13.2056 27.3122 14.2494 25.6896 14.4278 23.9838C17.7401 22.1355 20.46 18.7822 22.7857 15.9599C22.8722 15.8559 22.8606 15.6976 22.7603 15.6072C22.6599 15.5176 22.509 15.5289 22.4225 15.6336C20.1915 18.3404 17.6025 21.5601 14.454 23.4009ZM13.9725 23.6691C13.9907 23.2577 13.952 22.8398 13.8475 22.4184C13.569 21.2893 12.2888 20.6217 10.9649 20.4513C10.1536 20.3471 9.31913 20.433 8.66463 20.7385C8.2532 20.9302 7.9144 21.2084 7.71009 21.587C7.44187 22.0837 7.38387 22.5085 7.49372 22.8688C7.60383 23.2317 7.87692 23.5233 8.23266 23.7574C9.39947 24.5266 11.441 24.6901 12.3722 24.3688C12.9212 24.1796 13.4543 23.9435 13.9725 23.6691Z" fill="black"/>
        <path d="M73.1504 48.7668C74.0009 48.7668 74.6904 48.0773 74.6904 47.2268C74.6904 46.3762 74.0009 45.6868 73.1504 45.6868C72.2998 45.6868 71.6104 46.3762 71.6104 47.2268C71.6104 48.0773 72.2998 48.7668 73.1504 48.7668Z" fill="#E3E3E3"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M14.9856 57.8512C15.2605 57.7482 15.5497 57.6112 15.7728 57.4128C16.0377 57.1774 16.1455 56.874 16.2176 56.5547C16.3105 56.1443 16.3477 55.7075 16.4604 55.2966C16.502 55.1438 16.5823 55.0861 16.6167 55.0607C16.7037 54.996 16.7917 54.9785 16.8744 54.9852C16.9724 54.9927 17.1072 55.0317 17.196 55.2047C17.2086 55.2296 17.225 55.2673 17.236 55.3189C17.244 55.3569 17.2494 55.4752 17.2578 55.5242C17.2792 55.6446 17.2969 55.765 17.3138 55.8859C17.3695 56.2886 17.4016 56.6307 17.5777 57.0008C17.8166 57.5031 18.0561 57.8103 18.3808 57.9466C18.6949 58.0783 19.0702 58.0534 19.5499 57.9502C19.5956 57.9387 19.6407 57.9287 19.6854 57.9205C19.8969 57.8817 20.0991 58.0277 20.1407 58.2495C20.1823 58.471 20.0478 58.6869 19.8381 58.7356C19.7945 58.7459 19.7514 58.7554 19.7088 58.7644C19.0604 58.9333 18.3099 59.5359 17.8738 60.0636C17.7396 60.2264 17.5427 60.6814 17.342 60.9715C17.1939 61.1858 17.0274 61.3267 16.8875 61.3767C16.7938 61.4104 16.715 61.405 16.6498 61.388C16.5548 61.3636 16.4763 61.3095 16.416 61.2235C16.3831 61.1765 16.3526 61.1136 16.338 61.033C16.331 60.9943 16.3303 60.896 16.3305 60.8513C16.2894 60.7032 16.2394 60.5587 16.2029 60.4094C16.1159 60.0526 15.9453 59.827 15.7425 59.5287C15.5528 59.2497 15.349 59.0742 15.0503 58.9343C15.0115 58.9243 14.6979 58.8434 14.5872 58.7972C14.4255 58.7292 14.3483 58.6152 14.3203 58.5539C14.2728 58.45 14.2679 58.3591 14.2774 58.2831C14.2916 58.1712 14.3393 58.0755 14.424 57.9982C14.4764 57.9502 14.5546 57.9035 14.6596 57.8807C14.7405 57.863 14.9555 57.8527 14.9856 57.8512ZM16.8251 57.2701C16.8395 57.3042 16.8551 57.3383 16.8716 57.373C17.2214 58.1086 17.6128 58.5195 18.0887 58.7187L18.1046 58.7251C17.7863 58.9738 17.4981 59.2518 17.2781 59.5182C17.1873 59.6281 17.0674 59.856 16.9375 60.0895C16.8197 59.6866 16.6272 59.4017 16.3849 59.0449C16.1996 58.7728 16.0058 58.568 15.7674 58.4012C15.9524 58.3013 16.1288 58.1843 16.2825 58.0478C16.5384 57.8201 16.7076 57.5565 16.8251 57.2701Z" fill="#CCC6D9"/>
      </g>
      <defs>
        <linearGradient id="paint0_linear_5260_4415" x1="38.2621" y1="-2.58586" x2="38.8929" y2="105.579" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F2F2F2"/>
          <stop offset="1" stopColor="#EFEFEF"/>
        </linearGradient>
        <linearGradient id="paint1_linear_5260_4415" x1="38.826" y1="16.3127" x2="38.826" y2="56.1035" gradientUnits="userSpaceOnUse">
          <stop stopColor="white"/>
          <stop offset="0.7188" stopColor="#FAFAFA"/>
        </linearGradient>
      </defs>
    </svg>
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
