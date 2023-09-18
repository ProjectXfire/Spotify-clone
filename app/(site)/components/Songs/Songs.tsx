'use client';

import styles from './Songs.module.css';
import { type ISong } from '../../types';
import { useOnPlay } from '../../hooks';
import { Typography } from '@mui/material';
import { SongItem } from '..';

interface Props {
  songs: ISong[];
  title: string;
}

function Songs({ songs, title }: Props): JSX.Element {
  const onPlay = useOnPlay(songs);

  return (
    <section className={styles['songs-container']}>
      <Typography sx={{ mb: 2 }} variant='h5'>
        {title}
      </Typography>
      {songs.length === 0 ? (
        <Typography sx={{ mt: 2 }} color='secondary.main' variant='body2'>
          No songs available
        </Typography>
      ) : (
        <ul className={styles['songs-list']}>
          {songs.map((song) => (
            <SongItem key={song.id} song={song} onPlay={onPlay} />
          ))}
        </ul>
      )}
    </section>
  );
}
export default Songs;
