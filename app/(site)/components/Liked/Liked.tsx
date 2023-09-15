'use client';

import NextImage from 'next/image';
import styles from './Liked.module.css';
import { Typography } from '@mui/material';

function Liked(): JSX.Element {
  return (
    <div className={styles.liked}>
      <NextImage src='/liked.png' width={130} height={130} alt='liked' />
      <div className={styles['liked__text']}>
        <Typography sx={{ display: { xs: 'none', sm: 'block' } }} variant='body2'>
          Playlist
        </Typography>
        <Typography textAlign='center' variant='h3' fontWeight='bold'>
          Liked Songs
        </Typography>
      </div>
    </div>
  );
}
export default Liked;
