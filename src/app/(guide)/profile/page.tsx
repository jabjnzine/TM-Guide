'use client';

import Image from 'next/image';
import { useProfile } from '@/hooks/use-profile';
import { SectionCard } from '@/components/ui/section-card';
import { SkeletonProfile } from '@/components/ui/skeleton-list';
import { ProfileRow } from '@/components/liff/profile-row';

const GUIDE_TYPE_LABEL: Record<string, string> = {
  local: 'ไกด์ท้องถิ่น',
  foreign: 'ไกด์ต่างประเทศ',
  general: 'ไกด์ทั่วไป',
};

export default function ProfilePage() {
  const { profile, isLoading, logout } = useProfile();

  if (isLoading) return <SkeletonProfile />;
  if (!profile) return null;

  return (
    <div className="min-h-full bg-(--color-background)">
      {/* Avatar section */}
      <div className="bg-white border-b border-(--color-border) px-4 py-8 safe-area-top flex flex-col items-center">
        <div className="relative mb-3">
          {profile.image ? (
            <Image
              src={profile.image}
              alt={profile.name}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover border-4 border-(--color-line-green-light)"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-(--color-line-green-light) flex items-center justify-center text-4xl border-4 border-white shadow-md">
              👤
            </div>
          )}
          <span className="absolute bottom-0 right-0 bg-(--color-line-green) text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
            LINE
          </span>
        </div>

        <h1 className="text-xl font-bold text-(--color-text-primary)">{profile.name}</h1>
        {profile.nickname && (
          <p className="text-sm text-(--color-text-secondary) mt-0.5">"{profile.nickname}"</p>
        )}
        <span className="mt-2 text-xs bg-(--color-line-green-light) text-(--color-line-green-dark) px-3 py-1 rounded-full font-medium">
          {GUIDE_TYPE_LABEL[profile.guide_type] ?? profile.guide_type}
        </span>
      </div>

      {/* Details */}
      <div className="px-4 py-4 space-y-3">
        <SectionCard title="ข้อมูลติดต่อ" className="space-y-3">
          <ProfileRow icon="📞" label="เบอร์โทร" value={profile.phone} />
          <ProfileRow icon="🔖" label="LINE ID" value={profile.line_id} />
          {profile.license && (
            <ProfileRow icon="🪪" label="ใบอนุญาต" value={profile.license.license_no} />
          )}
        </SectionCard>

        <button
          onClick={logout}
          className="w-full py-3.5 border-2 border-red-200 text-red-500 font-semibold rounded-2xl bg-white active:bg-red-50 transition-colors"
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
}
