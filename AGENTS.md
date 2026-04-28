# TourSystem LIFF — Agent Guidelines

## Project Overview

Guide Portal สำหรับไกด์ทัวร์เข้าถึงผ่าน **LINE LIFF** (LINE Front-end Framework)
ไกด์สามารถดูทัวร์ที่ได้รับมอบหมาย, ยืนยันรับงาน, และ check-in ลูกค้าได้

---

## Tech Stack

| Technology | Version | Notes |
|---|---|---|
| TypeScript | latest | ภาษาหลัก — `strict` mode เสมอ |
| Next.js (App Router) | 16.x | ใช้ App Router ทุกครั้ง ห้ามใช้ Pages Router |
| Tailwind CSS | 4.x | CSS-first config (`@import "tailwindcss"`) — ห้ามใช้ `tailwind.config.js` |
| shadcn/ui | latest | UI Component Library |
| Framer Motion | latest | Animation บนหน้า public เท่านั้น |
| Zustand | latest | Global State Management |
| React Hook Form + Zod | latest | Form Validation ทุก form |
| @line/liff | latest | LINE LIFF SDK |
| Axios | latest | HTTP Client |

---

## Project Structure

```
TourSystem-LIFF/
├── app/
│   ├── layout.tsx             # Root layout + LIFF provider
│   ├── page.tsx               # Root redirect / loading
│   ├── (guide)/               # Route group สำหรับ authenticated guides
│   │   ├── layout.tsx         # Guard: redirect ถ้า guide ยัง login ไม่สำเร็จ
│   │   ├── tours/
│   │   │   ├── page.tsx       # รายการทัวร์
│   │   │   └── [id]/
│   │   │       ├── page.tsx   # รายละเอียดทัวร์
│   │   │       └── checkin/
│   │   │           └── page.tsx  # Check-in ลูกค้า
│   │   └── profile/
│   │       └── page.tsx       # โปรไฟล์ไกด์
│   └── not-found.tsx
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── liff/                  # LIFF-specific components
│   └── tour/                  # Tour-related components
├── hooks/
│   ├── use-liff.ts            # LIFF SDK hook
│   └── use-auth.ts            # Guide auth state
├── lib/
│   ├── api.ts                 # Axios instance + interceptors
│   ├── liff.ts                # LIFF utilities
│   └── utils.ts               # cn() และ utilities อื่นๆ
├── store/
│   └── auth.store.ts          # Zustand: guide auth state
├── types/
│   └── index.ts               # TypeScript types ทั้งหมด
└── app/globals.css            # Tailwind CSS 4.x entry
```

---

## Core Rules

### TypeScript
- ใช้ `strict: true` เสมอ — ห้าม `any` โดยไม่มีเหตุผล
- Export types ด้วย `type` keyword: `export type { MyType }`
- ใช้ `interface` สำหรับ object shapes, `type` สำหรับ unions/aliases
- ไม่ใช้ `namespace` หรือ `enum` — ใช้ `as const` objects แทน

```typescript
// ✅ GOOD
const TOUR_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
} as const;
type TourStatus = (typeof TOUR_STATUS)[keyof typeof TOUR_STATUS];

// ❌ BAD
enum TourStatus { PENDING = 'pending' }
```

### Next.js App Router
- ใช้ `'use client'` เฉพาะ component ที่ต้องการ interactivity จริงๆ
- Server Components ดึง data โดยตรงถ้าไม่ต้อง client-side state
- ใช้ `loading.tsx` และ `error.tsx` ทุก route segment
- ใช้ `next/image` เสมอสำหรับรูปภาพ

```typescript
// ✅ GOOD — Server Component
export default async function ToursPage() {
  const tours = await fetchTours(); // server-side fetch
  return <TourList tours={tours} />;
}

// ✅ GOOD — Client Component (เมื่อจำเป็น)
'use client';
export function TourCard({ tour }: { tour: Tour }) { ... }
```

### Tailwind CSS 4.x
- ใช้ CSS-first config — กำหนด theme ใน `globals.css` ผ่าน `@theme`
- ไม่ใช้ `tailwind.config.js` หรือ `tailwind.config.ts`
- ใช้ CSS variables สำหรับ design tokens

```css
/* ✅ globals.css */
@import "tailwindcss";

@theme {
  --color-primary: #06c755;   /* LINE Green */
  --color-primary-dark: #05a847;
  --font-sans: "Noto Sans Thai", sans-serif;
}
```

### shadcn/ui
- ใช้ CLI เพิ่ม component: `npx shadcn@latest add <component>`
- ห้าม import จาก `@/components/ui` โดยตรงใน page — ให้ wrap ใน feature component
- ปรับ variant ผ่าน `cva` เสมอ ไม่ใช้ inline Tailwind override

### Zustand
- แยก store ตาม domain (auth, tour, ui)
- ใช้ `immer` middleware สำหรับ nested state
- ห้าม store ข้อมูลที่ derive ได้จาก state อื่น

```typescript
// ✅ GOOD
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      guide: null,
      accessToken: null,
      setGuide: (guide, token) => set({ guide, accessToken: token }),
      clear: () => set({ guide: null, accessToken: null }),
    }),
    { name: 'guide-auth' }
  )
);
```

### React Hook Form + Zod
- ทุก form ใช้ `useForm` + `zodResolver` เสมอ
- กำหนด schema ใน `lib/schemas/` แยกไฟล์

```typescript
// ✅ GOOD
const schema = z.object({
  check_in_status: z.enum(['pending', 'check-in', 'no-show']),
  check_in_pax: z.number().min(0).optional(),
});

const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
});
```

### Framer Motion
- ใช้ **เฉพาะ public pages** และ transition animations
- ห้ามใช้ใน check-in flow หรือ data-heavy components (เพิ่ม bundle ไม่จำเป็น)
- ใช้ `AnimatePresence` สำหรับ route transitions

### LIFF Integration
- Init LIFF ใน root layout ผ่าน custom hook `useLiff()`
- ตรวจสอบ `liff.isLoggedIn()` ก่อน API call ทุกครั้ง
- เก็บ access token ใน Zustand + localStorage (`persist` middleware)
- Handle `liff.login()` อัตโนมัติถ้ายังไม่ได้ login

```typescript
// hooks/use-liff.ts
export function useLiff() {
  const { setGuide } = useAuthStore();
  
  const init = async () => {
    await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! });
    if (!liff.isLoggedIn()) {
      liff.login();
      return;
    }
    const token = liff.getAccessToken();
    // POST /api/auth/liff → get JWT
  };
  
  return { init };
}
```

---

## API Convention

Backend URL: `NEXT_PUBLIC_API_URL` (เช่น `https://api.tourmaster.com/api`)
Header required: `x-tenant-id: <tenant>`

```typescript
// lib/api.ts
const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  const tenant = process.env.NEXT_PUBLIC_TENANT_ID;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (tenant) config.headers['x-tenant-id'] = tenant;
  return config;
});
```

### Endpoints ที่ใช้ใน LIFF App

| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/liff` | LINE Login → JWT |
| GET | `/guide-portal/profile` | โปรไฟล์ไกด์ |
| GET | `/guide-portal/tours` | รายการทัวร์ (`?date=YYYY-MM-DD`) |
| GET | `/guide-portal/tours/:id` | รายละเอียดทัวร์ |
| PATCH | `/guide-portal/tours/:id/accept` | ยืนยันรับงาน |
| PATCH | `/guide-portal/tours/:tourId/check-in/:itemId` | Check-in ลูกค้า |

---

## Environment Variables

```bash
NEXT_PUBLIC_LIFF_ID=          # LINE LIFF ID
NEXT_PUBLIC_API_URL=          # Backend API URL
NEXT_PUBLIC_TENANT_ID=        # Tenant ID สำหรับ x-tenant-id header
```

---

## Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Component | PascalCase | `TourCard.tsx` |
| Hook | camelCase + `use` prefix | `useTourList.ts` |
| Store | camelCase + `.store.ts` | `auth.store.ts` |
| Type/Interface | PascalCase | `type GuideProfile` |
| Constant | SCREAMING_SNAKE_CASE | `TOUR_STATUS` |
| CSS class | Tailwind utilities only | — |

---

## UI/UX Conventions

- **Primary color**: LINE Green (`#06c755`) สำหรับ buttons และ highlights
- **Mobile-first**: ออกแบบสำหรับ mobile 375px เป็นหลัก (LIFF context)
- **Loading state**: ทุก async action ต้องมี skeleton หรือ spinner
- **Error state**: แสดง user-friendly message + retry button
- **ภาษา**: Thai เป็นหลัก, fallback English สำหรับ technical errors
- **ห้ามใช้ alert/confirm**: ใช้ shadcn/ui `Dialog` หรือ `Toast` แทนเสมอ

---

## Do / Don't

### ✅ DO
- Server Components ก่อนเสมอ เปลี่ยนเป็น Client เมื่อจำเป็น
- ใช้ `Suspense` + `loading.tsx` ทุก async boundary
- Type ทุก API response ด้วย TypeScript interface
- ใช้ `cn()` จาก `lib/utils.ts` สำหรับ conditional classes
- Handle error ทุก API call ด้วย try/catch

### ❌ DON'T
- ห้ามใช้ `pages/` directory
- ห้ามใช้ `useEffect` สำหรับ data fetching (ใช้ Server Component หรือ SWR/React Query)
- ห้าม hardcode API URL หรือ token
- ห้าม store sensitive data ใน `localStorage` โดยตรง (ใช้ Zustand persist)
- ห้ามใช้ `index.ts` re-export ที่ทำให้ circular dependency
