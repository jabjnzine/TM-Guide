import type { Metadata, Viewport } from 'next';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';
import { Noto_Sans_Thai } from 'next/font/google';
import { cn } from '@/lib/utils';
import ErudaInit from '@/components/dev/eruda-init';

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TourMaster — Guide Portal',
  description: 'ระบบจัดการทัวร์สำหรับไกด์',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={cn('h-full', notoSansThai.variable)}>
      <body className="min-h-dvh flex flex-col antialiased">
          <ErudaInit />
          {children}
          <Toaster position="top-center" richColors />
        </body>
    </html>
  );
}
