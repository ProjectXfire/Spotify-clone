'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';
import { ISong } from '@/app/(site)/types';
import { Home, Search } from '@mui/icons-material';
import { Box, Library, RouteItem } from '..';

interface Props {
  children: React.ReactNode;
  songs: ISong[];
}

function Sidebar({ children, songs }: Props): JSX.Element {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      { label: 'Home', href: '/', icon: Home, active: pathname !== '/search' },
      { label: 'Search', href: '/search', icon: Search, active: pathname === '/search' }
    ],
    [pathname]
  );

  return (
    <div className={styles['main-container']}>
      <nav className={styles['sidebar-container']}>
        <Box>
          {routes.map((item) => (
            <RouteItem key={item.label} route={item} />
          ))}
        </Box>
        <Box fullHeight>
          <Library songs={songs} />
        </Box>
      </nav>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
export default Sidebar;
