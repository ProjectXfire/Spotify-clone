import { type ILikedSong } from '../../types';
import { List, Typography } from '@mui/material';
import { MediaItem } from '@/shared/components';

interface Props {
  songs: ILikedSong[];
}

function LikedSongs({ songs }: Props): JSX.Element {
  if (songs.length === 0)
    return (
      <Typography sx={{ ml: 1, mt: 2, textAlign: { xs: 'center', sm: 'start' } }} variant='h5'>
        No favorites songs found
      </Typography>
    );

  return (
    <List disablePadding>
      {songs.map((song) => (
        <MediaItem key={song.songs?.id} song={song.songs} likedButton />
      ))}
    </List>
  );
}
export default LikedSongs;
