'use client';

import { useRouter } from 'next/navigation';
import styles from './Header.module.css';
import { ArrowCircleLeft, ArrowCircleRight, Home, Search } from '@mui/icons-material';
import { Button, IconButton, Box, Typography } from '@mui/material';
import { ListItems } from '..';

function Header(): JSX.Element {
  const router = useRouter();

  const onSignIn = (): void => {};

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
        <Button
          type='button'
          variant='contained'
          color='secondary'
          disableElevation
          onClick={onSignIn}
        >
          <Typography fontSize='0.8rem'>Sign Up</Typography>
        </Button>
        <Button type='button' variant='contained' color='info' disableElevation onClick={onSignIn}>
          <Typography fontSize='0.8rem'>Log In</Typography>
        </Button>
      </div>
      <Typography variant='h5' fontWeight='bold'>
        Welcome back
      </Typography>
      <ListItems image='/liked.png' name='Liked songs' href='' />
    </header>
  );
}
export default Header;
