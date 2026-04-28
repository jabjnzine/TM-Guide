'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/tours', label: 'ทัวร์ของฉัน', icon: '🗓️' },
  { href: '/profile', label: 'โปรไฟล์', icon: '👤' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-(--color-border) safe-area-bottom">
      <div className="flex items-stretch h-16">
        {navItems.map((item) => {
          const isActive =
            item.href === '/tours'
              ? pathname.startsWith('/tours')
              : pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors',
                isActive
                  ? 'text-(--color-line-green)'
                  : 'text-(--color-text-muted)',
              )}
            >
              <span className="text-2xl leading-none">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
