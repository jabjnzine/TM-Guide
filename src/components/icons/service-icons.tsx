import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function BriefcaseIcon({ className, ...props }: IconProps) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Handle */}
      <path
        d="M18 20V17C18 15.9 18.9 15 20 15H28C29.1 15 30 15.9 30 17V20"
        stroke="#0284c7"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Body */}
      <rect x="7" y="20" width="34" height="22" rx="5" fill="#bae6fd" />
      {/* Top section */}
      <rect x="7" y="20" width="34" height="9" rx="5" fill="#38bdf8" />
      <rect x="7" y="25" width="34" height="4" fill="#38bdf8" />
      {/* Clasp */}
      <rect x="20" y="26" width="8" height="7" rx="2" fill="#0369a1" />
      <rect x="22.5" y="28" width="3" height="3" rx="1" fill="#7dd3fc" />
    </svg>
  );
}

export function ContractIcon({ className, ...props }: IconProps) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Shadow paper */}
      <rect x="16" y="12" width="22" height="28" rx="3" fill="#bae6fd" />
      {/* Main paper */}
      <rect x="10" y="8" width="22" height="30" rx="3" fill="#e0f2fe" />
      {/* Header */}
      <rect x="10" y="8" width="22" height="9" rx="3" fill="#0ea5e9" />
      <rect x="10" y="13" width="22" height="4" fill="#0ea5e9" />
      {/* Title line */}
      <rect x="14" y="10.5" width="14" height="2" rx="1" fill="rgba(255,255,255,0.7)" />
      {/* Text lines */}
      <rect x="14" y="22" width="14" height="2" rx="1" fill="#7dd3fc" />
      <rect x="14" y="26" width="12" height="2" rx="1" fill="#7dd3fc" />
      <rect x="14" y="30" width="9" height="2" rx="1" fill="#bae6fd" />
    </svg>
  );
}

export function TaxesIcon({ className, ...props }: IconProps) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Receipt body */}
      <path
        d="M12 8H36V40L33 37.5L30 40L27 37.5L24 40L21 37.5L18 40L15 37.5L12 40V8Z"
        fill="#f0fdf4"
      />
      {/* Header */}
      <path d="M12 8H36V17H12V8Z" fill="#16a34a" />
      {/* Currency symbol in header */}
      <path
        d="M24 10.5V15.5M22 11.5H25.5C26.3 11.5 27 12.2 27 13C27 13.8 26.3 14.5 25.5 14.5H22"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Amount lines */}
      <rect x="15" y="20" width="8" height="1.5" rx="0.75" fill="#86efac" />
      <rect x="25" y="20" width="8" height="1.5" rx="0.75" fill="#4ade80" />
      <rect x="15" y="24" width="8" height="1.5" rx="0.75" fill="#86efac" />
      <rect x="25" y="24" width="8" height="1.5" rx="0.75" fill="#4ade80" />
      <rect x="15" y="28" width="6" height="1.5" rx="0.75" fill="#bbf7d0" />
      <rect x="25" y="28" width="6" height="1.5" rx="0.75" fill="#86efac" />
      {/* Refund arrow */}
      <path
        d="M24 33C26.2 33 28 31.2 28 29H26C26 30.1 25.1 31 24 31C22.9 31 22 30.1 22 29H20C20 31.2 21.8 33 24 33Z"
        fill="#16a34a"
      />
      <path
        d="M21 27L24 24L27 27"
        stroke="#16a34a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MoneyBagIcon({ className, ...props }: IconProps) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Bag shadow */}
      <ellipse cx="25" cy="33" rx="14" ry="11" fill="#fcd34d" />
      {/* Bag body */}
      <ellipse cx="23" cy="31" rx="14" ry="11" fill="#fbbf24" />
      {/* Highlight */}
      <ellipse cx="19" cy="26" rx="4" ry="3" fill="#fde68a" opacity="0.7" />
      {/* Neck */}
      <rect x="18" y="19" width="10" height="7" rx="3" fill="#f59e0b" />
      {/* Knot */}
      <circle cx="23" cy="19" r="4.5" fill="#d97706" />
      <circle cx="23" cy="19" r="3" fill="#fbbf24" />
      {/* Coin symbol overlay */}
      <circle cx="23" cy="31" r="6" fill="#d97706" opacity="0.3" />
      {/* ฿ path */}
      <path
        d="M23 27V35M21 28.5H24.5C25.3 28.5 25.5 29.2 25.5 30C25.5 30.8 25.3 31.5 24.5 31.5H21M21 31.5H25"
        stroke="#92400e"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CalendarIcon({ className, ...props }: IconProps) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Body */}
      <rect x="6" y="12" width="36" height="30" rx="5" fill="#f0f9ff" />
      {/* Header */}
      <rect x="6" y="12" width="36" height="13" rx="5" fill="#0284c7" />
      <rect x="6" y="19" width="36" height="6" fill="#0284c7" />
      {/* Pins */}
      <rect x="15" y="7" width="3" height="9" rx="1.5" fill="#0369a1" />
      <rect x="30" y="7" width="3" height="9" rx="1.5" fill="#0369a1" />
      {/* Header decoration */}
      <rect x="14" y="15.5" width="20" height="2" rx="1" fill="rgba(255,255,255,0.5)" />
      {/* Grid row 1 */}
      <rect x="10" y="30" width="6" height="5" rx="1.5" fill="#bae6fd" />
      <rect x="21" y="30" width="6" height="5" rx="1.5" fill="#7dd3fc" />
      <rect x="32" y="30" width="6" height="5" rx="1.5" fill="#38bdf8" />
      {/* Grid row 2 */}
      <rect x="10" y="37" width="6" height="3" rx="1" fill="#e0f2fe" />
      <rect x="21" y="37" width="6" height="3" rx="1" fill="#bae6fd" />
      <rect x="32" y="37" width="6" height="3" rx="1" fill="#e0f2fe" />
    </svg>
  );
}

export function RouteIcon({ className, ...props }: IconProps) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Map background */}
      <rect x="6" y="8" width="36" height="32" rx="5" fill="#e0f2fe" />
      {/* Route path */}
      <path
        d="M13 36C13 36 15 28 21 24C27 20 28 14 34 13"
        stroke="#0284c7"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="3 2.5"
      />
      {/* Start point */}
      <circle cx="13" cy="36" r="4.5" fill="#0284c7" />
      <circle cx="13" cy="36" r="2" fill="white" />
      {/* End pin */}
      <path
        d="M34 5C30.7 5 28 7.7 28 11C28 15.5 34 22 34 22C34 22 40 15.5 40 11C40 7.7 37.3 5 34 5Z"
        fill="#f97316"
      />
      <circle cx="34" cy="11" r="3" fill="white" />
    </svg>
  );
}
