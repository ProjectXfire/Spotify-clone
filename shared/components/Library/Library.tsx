'use client';

import styles from './Library.module.css';
import { type ISong } from '@/app/(site)/types';
import { useDialog } from '@/shared/states';
import { useUser } from '@/app/(site)/hooks';
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
          <MediaItem key={song.id} song={song} />
        ))}
      </List>
    </div>
  );
}
export default Library;
