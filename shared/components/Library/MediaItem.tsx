'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { type ISong } from '@/app/(site)/types';
import { getLikedSong, removeLikedSong, setLikedSong } from '@/app/(site)/services/client';
import { useLoadImage, useUser } from '@/app/(site)/hooks';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';
import { useDialog } from '@/shared/states';
import { AuthDialog } from '@/app/(site)/components';

interface Props {
  song: ISong;
  likedButton?: boolean;
  onPlay?: (id: string) => void;
}

function MediaItem({ song, likedButton, onPlay }: Props): JSX.Element {
  const imagePath = useLoadImage(song.image_path);
  const { user } = useUser();
  const { supabaseClient } = useSessionContext();
  const router = useRouter();
  const open = useDialog((state) => state.open);
  const setComponent = useDialog((state) => state.setComponent);
  const [liked, setLiked] = useState(false);

  const startPlaying = (): void => {
    if (onPlay) onPlay(song.id);
  };

  const handleFavorite = async (value: boolean) => {
    if (!user) {
      setComponent(<AuthDialog />);
      open();
      return;
    }
    if (value) {
      const { errorMessage } = await setLikedSong(user.id, song.id, supabaseClient);
      if (errorMessage) {
        toast.error(errorMessage);
        return;
      }
      setLiked(value);
      toast.success('Liked!');
    } else {
      const { errorMessage } = await removeLikedSong(user.id, song.id, supabaseClient);
      if (errorMessage) {
        toast.error(errorMessage);
        return;
      }
      setLiked(value);
    }
    router.refresh();
  };

  const onGetLikedSong = async () => {
    if (user) {
      const { data } = await getLikedSong(user.id, song.id, supabaseClient);
      data ? setLiked(true) : setLiked(false);
    }
  };

  useEffect(() => {
    if (likedButton) onGetLikedSong();
  }, [user]);

  return (
    <ListItem
      disablePadding
      onClick={startPlaying}
      secondaryAction={
        likedButton && (
          <Box sx={{ display: 'flex', mr: 0 }}>
            {liked ? (
              <IconButton color='error' type='button' onClick={() => handleFavorite(false)}>
                <Favorite fontSize='large' />
              </IconButton>
            ) : (
              <IconButton color='error' type='button' onClick={() => handleFavorite(true)}>
                <FavoriteBorder fontSize='large' />
              </IconButton>
            )}
          </Box>
        )
      }
    >
      <ListItemButton sx={{ px: 0.5 }}>
        <ListItemAvatar sx={{ minWidth: 50 }}>
          <Avatar sx={{ width: 40, height: 40 }} alt={song.title} src={imagePath} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontSize: '0.8rem' }}>{song.title}</Typography>
              <Typography sx={{ fontSize: '0.7rem' }} color='secondary.main'>
                {song.author}
              </Typography>
            </Box>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}

export default MediaItem;
