import { MediaItem } from '@/shared/components';
import { type ISong } from '../../types';
import { List } from '@mui/material';

interface Props {
  songs: ISong[];
}

function SongsResult({ songs }: Props): JSX.Element {
  return (
    <List disablePadding>
      {songs.map((song) => (
        <MediaItem key={song.id} song={song} forSearch />
      ))}
    </List>
  );
}
export default SongsResult;
