'use client';

import { useLoadImage } from '@/app/(site)/hooks';
import { type ISong } from '@/app/(site)/types';
import { PlayCircle, FavoriteBorder } from '@mui/icons-material';
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';

interface Props {
  song: ISong;
  forSearch?: boolean;
}

function MediaItem({ song, forSearch }: Props): JSX.Element {
  const imagePath = useLoadImage(song.image_path);

  const handleClick = (): void => {};

  return (
    <ListItem disablePadding onClick={handleClick}>
      <ListItemButton disableGutters sx={{ px: 0.5 }}>
        <ListItemAvatar sx={{ minWidth: 50 }}>
          <Avatar sx={{ width: 40, height: 40 }} alt={song.title} src={imagePath} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography sx={{ fontSize: '0.8rem' }}>{song.title}</Typography>
                <Typography sx={{ fontSize: '0.7rem' }} color='secondary.main'>
                  {song.author}
                </Typography>
              </Box>
              {forSearch && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <FavoriteBorder fontSize='large' />
                  <PlayCircle fontSize='large' />
                </Box>
              )}
              {!forSearch && <PlayCircle fontSize='large' />}
            </Box>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
export default MediaItem;
