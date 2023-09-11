import { Providers } from '@/shared/components';
import './globals.css';
import type { Metadata } from 'next';
import { Capriola } from 'next/font/google';

const capriola = Capriola({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Spotity clone App',
  description: 'Spotity clone App'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <Providers>
        <body className={capriola.className}>{children}</body>
      </Providers>
    </html>
  );
}
