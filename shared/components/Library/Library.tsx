'use client';

import styles from './Library.module.css';
import { type ISong } from '@/app/(site)/types';
import { useDialog } from '@/shared/states';
import { useOnPlay, useUser } from '@/app/(site)/hooks';
import { LibraryMusic, Add } from '@mui/icons-material';
import { List } from '@mui/material';
import { LibItem, MediaItem } from '..';
import { AuthDialog, UploadDialog } from '@/app/(site)/components';

interface Props {
  songs: ISong[];
}

function Library({ songs }: Props): JSX.Element {
  const open = useDialog((state) => state.open);
  const setComponent = useDialog((state) => state.setComponent);
  const onPlay = useOnPlay(songs);
  const { user } = useUser();

  const onAddModal = (): void => {
    if (!user) {
      setComponent(<AuthDialog />);
    } else {
      // Check subscription
      setComponent(<UploadDialog />);
    }
    open();
  };

  return (
    <div className={styles.library}>
      <LibItem
        startIcon={<LibraryMusic />}
        text='Your library'
        actionIcon={<Add />}
        onClick={onAddModal}
      />
      <List dense disablePadding>
        {songs.map((song) => (
          <MediaItem key={song.id} song={song} onPlay={onPlay} />
        ))}
      </List>
    </div>
  );
}
export default Library;
