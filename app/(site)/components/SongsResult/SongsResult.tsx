'use client';

import { MediaItem } from '@/shared/components';
import { type ISong } from '../../types';
import { useOnPlay } from '../../hooks';
import { List } from '@mui/material';

interface Props {
  songs: ISong[];
}

function SongsResult({ songs }: Props): JSX.Element {
  const onPlay = useOnPlay(songs);

  return (
    <List sx={{ mt: 2, mb: 6.5 }} disablePadding>
      {songs.map((song) => (
        <MediaItem key={song.id} song={song} likedButton onPlay={onPlay} />
      ))}
    </List>
  );
}
export default SongsResult;
