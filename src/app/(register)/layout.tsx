import type { ReactNode } from 'react';

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-[var(--color-background)] flex flex-col">
      {children}
    </div>
  );
}
