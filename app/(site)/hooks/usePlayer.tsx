import { type ISong } from '../types';
import { useDialog, usePlayer } from '@/shared/states';
import { useUser } from '.';
import { AuthDialog } from '../components';

export function useOnPlay(songs: ISong[]) {
  const setId = usePlayer((state) => state.setId);
  const setIds = usePlayer((state) => state.setIds);
  const open = useDialog((state) => state.open);
  const setComponent = useDialog((state) => state.setComponent);
  const { user } = useUser();

  const onPlay = (id: string): void => {
    if (!user) {
      setComponent(<AuthDialog />);
      open();
    } else {
      setId(id);
      setIds(songs.map((song) => song.id));
    }
  };

  return onPlay;
}
