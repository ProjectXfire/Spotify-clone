'use client';

import NextImage from 'next/image';
import { useEffect, useState } from 'react';
// @ts-ignore
import useSound from 'use-sound';
import styles from './Player.module.css';
import { type ISong } from '../../types';
import { usePlayer } from '@/shared/states';
import { useLoadImage } from '../../hooks';
import { Box, IconButton, Slider, Stack, Typography } from '@mui/material';
import {
  SkipPrevious,
  SkipNext,
  VolumeDown,
  VolumeUp,
  PauseCircle,
  PlayCircle
} from '@mui/icons-material';

interface Props {
  song: ISong;
}

function PlayerContent({ song }: Props) {
  const imagePath = useLoadImage(song.image_path);
  const ids = usePlayer((state) => state.ids);
  const activeId = usePlayer((state) => state.activeId);
  const setId = usePlayer((state) => state.setId);

  const [volume, setVolume] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { pause, sound }] = useSound(song.public_song_url, {
    volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ['mp3']
  });

  const handleVolume = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const handlePlay = (): void => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const onPlayNext = (): void => {
    if (ids.length === 0) return;
    const currentSongIndex = ids.findIndex((id) => id === activeId);
    const nextSong = ids[currentSongIndex + 1];
    if (!nextSong) {
      setId(ids[0]);
      return;
    }
    setId(nextSong);
  };

  const onPlayPrevious = (): void => {
    if (ids.length === 0) return;
    const currentSongIndex = ids.findIndex((id) => id === activeId);
    const previouSong = ids[currentSongIndex - 1];
    if (!previouSong) {
      setId(ids[ids.length - 1]);
      return;
    }
    setId(previouSong);
  };

  useEffect(() => {
    sound?.play();
    return () => {
      sound?.unload();
    };
  }, [sound]);

  return (
    <div className={styles['player-content']}>
      <div className={styles['player-content__info']}>
        <NextImage src={imagePath} width={40} height={40} alt={song.title} />
        <div>
          <Typography sx={{ fontSize: '0.8rem' }}>{song.title}</Typography>
          <Typography sx={{ fontSize: '0.7rem' }} color='secondary.main'>
            {song.author}
          </Typography>
        </div>
      </div>
      <div className={styles['player-content__controls']}>
        <IconButton type='button' size='medium' onClick={onPlayPrevious}>
          <SkipPrevious fontSize='large' />
        </IconButton>
        <IconButton type='button' size='medium' onClick={handlePlay}>
          {isPlaying ? <PauseCircle fontSize='large' /> : <PlayCircle fontSize='large' />}
        </IconButton>
        <IconButton type='button' size='medium' onClick={onPlayNext}>
          <SkipNext fontSize='large' />
        </IconButton>
      </div>
      <Box sx={{ width: 150, display: { xs: 'none', sm: 'block' } }}>
        <Stack spacing={2} direction='row' sx={{ mb: 1 }} alignItems='center'>
          <VolumeDown />
          <Slider size='medium' value={volume} onChange={handleVolume} />
          <VolumeUp />
        </Stack>
      </Box>
    </div>
  );
}
export default PlayerContent;
