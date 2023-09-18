import { Loading, Providers, Sidebar } from '@/shared/components';
import './globals.css';
import type { Metadata } from 'next';
import { Capriola } from 'next/font/google';
import CustomDialog from '@/shared/components/CustomDialog';
import { getSongsBySessionId } from './(site)/services/server';
import { Player } from './(site)/components';

const capriola = Capriola({ subsets: ['latin'], weight: '400' });
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Spotify clone App',
  description: 'Spotify clone App'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const { data } = await getSongsBySessionId();

  return (
    <html lang='en'>
      <body className={capriola.className}>
        <Providers>
          <Loading />
          <CustomDialog />
          <Sidebar songs={data}>{children}</Sidebar>
          <Player />
        </Providers>
      </body>
    </html>
  );
}
