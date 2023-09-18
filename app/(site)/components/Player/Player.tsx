'use client';

import { useEffect, useState } from 'react';
import NextImage from 'next/image';
import styles from './Player.module.css';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { type ISong } from '../../types';
import { usePlayer } from '@/shared/states';
import { getSongById } from '../../services/client';
import toast from 'react-hot-toast';
import { PlayerContent } from '..';

function Player(): JSX.Element {
  const [song, setSong] = useState<ISong | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { supabaseClient } = useSessionContext();
  const activeId = usePlayer((state) => state.activeId);

  const fetchSong = async (): Promise<void> => {
    if (!activeId) return;
    setIsLoading(true);
    const { data, errorMessage } = await getSongById(activeId, supabaseClient);
    if (errorMessage) {
      toast.error(errorMessage);
    } else {
      setSong(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSong();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  return (
    <div className={`${styles.player} ${activeId && song ? styles['show-player'] : ''}`}>
      {song && !isLoading && <PlayerContent song={song} />}
    </div>
  );
}
export default Player;
