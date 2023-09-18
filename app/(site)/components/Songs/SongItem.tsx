'use client';

import NextImage from 'next/image';
import styles from './Songs.module.css';
import { type ISong } from '../../types';
import { useLoadImage } from '../../hooks';
import { PlayCircle } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';

interface Props {
  song: ISong;
  onPlay: (id: string) => void;
}

function SongItem({ song, onPlay }: Props): JSX.Element {
  const imagePath = useLoadImage(song.image_path);

  return (
    <li className={styles['song-item']}>
      <div className={styles['song-item__image']}>
        <NextImage fill src={imagePath} alt={song.title} />
        <IconButton
          type='button'
          sx={{ position: 'absolute', bottom: 0, right: 0 }}
          size='small'
          onClick={() => onPlay(song.id)}
        >
          <PlayCircle color='primary' sx={{ fontSize: 55 }} />
        </IconButton>
      </div>
      <div className={styles['song-item__text']}>
        <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
          {song.title}
        </Typography>
        <Typography color='secondary.main' sx={{ fontSize: '0.7rem' }}>
          by {song.author}
        </Typography>
      </div>
    </li>
  );
}
export default SongItem;
