import { Loading, Providers, Sidebar } from '@/shared/components';
import './globals.css';
import type { Metadata } from 'next';
import { Capriola } from 'next/font/google';
import CustomDialog from '@/shared/components/CustomDialog';

const capriola = Capriola({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Spotify clone App',
  description: 'Spotify clone App'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={capriola.className}>
        <Providers>
          <Loading />
          <CustomDialog />
          <Sidebar>{children}</Sidebar>
        </Providers>
      </body>
    </html>
  );
}
