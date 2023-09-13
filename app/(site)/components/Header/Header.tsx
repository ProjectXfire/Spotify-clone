'use client';

import { useRouter } from 'next/navigation';
import styles from './Header.module.css';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useDialog } from '@/shared/states';
import { useUser } from '../../hooks';
import { ArrowCircleLeft, ArrowCircleRight, Home, Search, Person } from '@mui/icons-material';
import { Button, IconButton, Box, Typography } from '@mui/material';
import { AuthDialog, ListItems } from '..';
import toast from 'react-hot-toast';

function Header(): JSX.Element {
  const router = useRouter();
  const open = useDialog((state) => state.open);
  const setComponent = useDialog((state) => state.setComponent);

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const onNavigate = (path: string): void => {
    router.push(path);
  };

  const onSignIn = (): void => {
    open();
    setComponent(<AuthDialog />);
  };

  const onLogout = async (): Promise<void> => {
    const { error } = await supabaseClient.auth.signOut();
    // Reset any playing song
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out');
    }
    router.refresh();
  };

  return (
    <header className={styles.header}>
      <div className={styles['header__navbar']}>
        <div className={styles['header__navigations']}>
          <IconButton
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
            type='button'
            size='small'
            onClick={() => router.back()}
          >
            <Home sx={{ fontSize: 40 }} />
          </IconButton>
          <IconButton
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
            type='button'
            size='small'
            onClick={() => router.back()}
          >
            <Search sx={{ fontSize: 40 }} />
          </IconButton>
          <IconButton
            sx={{ display: { xs: 'none', md: 'inline-flex' } }}
            type='button'
            size='small'
            onClick={() => router.back()}
          >
            <ArrowCircleLeft sx={{ fontSize: 40 }} />
          </IconButton>
          <IconButton
            sx={{ display: { xs: 'none', md: 'inline-flex' } }}
            type='button'
            size='small'
            onClick={() => router.forward()}
          >
            <ArrowCircleRight sx={{ fontSize: 40 }} />
          </IconButton>
        </div>
        <Box sx={{ flex: 1 }} />
        {user ? (
          <>
            <Button
              sx={{ borderRadius: 20 }}
              type='button'
              variant='contained'
              color='info'
              disableElevation
              onClick={onLogout}
            >
              <Typography fontSize='0.8rem'>Logout</Typography>
            </Button>
            <IconButton type='button' onClick={() => onNavigate('/account')}>
              <Person />
            </IconButton>
          </>
        ) : (
          <>
            <Button
              sx={{ borderRadius: 20 }}
              type='button'
              variant='contained'
              color='secondary'
              disableElevation
              onClick={onSignIn}
            >
              <Typography fontSize='0.8rem'>Sign Up</Typography>
            </Button>
            <Button
              sx={{ borderRadius: 20 }}
              type='button'
              variant='contained'
              color='info'
              disableElevation
              onClick={onSignIn}
            >
              <Typography fontSize='0.8rem'>Log In</Typography>
            </Button>
          </>
        )}
      </div>
      <Typography variant='h5' fontWeight='bold'>
        Welcome back
      </Typography>
      <ListItems image='/liked.png' name='Liked songs' href='' />
    </header>
  );
}
export default Header;
